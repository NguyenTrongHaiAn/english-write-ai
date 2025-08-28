const knexConfig = require('../knexfile'); 
const knex = require('knex')(knexConfig.development);
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS, },
});

// REGISTER USER FUNCTION
const registerUser = async (req, res) => {
   const { fullName, email, password } = req.body;
   if (!fullName || !email || !password) { return res.status(400).json({ message: 'Please provide full name, email, and password.' }); }
   try {
      const existingUser = await knex('users').where({ email }).first();
      if (existingUser) {
         if (existingUser.is_verified) { return res.status(400).json({ message:'This email is already in use.' }); } 
         else { return res.status(400).json({ message: 'This email is already registered but not yet activated.' });}
      }
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const hashedPass = await bcrypt.hash(password, 10);
      const [newUser] = await knex('users')
         .insert({ full_name: fullName, email, password: hashedPass, is_verified: false, verification_token: verificationToken })
         .returning(['id','email','full_name']);
      const verificationURL = `http://localhost:5173/verify-email/${verificationToken}`;
      const mailOptions = {
        from: `"Hamster English" <${process.env.EMAIL_USER}>`,
        to: newUser.email,
        subject: 'Verify your Hamster English account',
        html: `<p>Welcome! Please click the link below to activate your account:</p><a href="${verificationURL}">${verificationURL}</a>`
      };
      await transporter.sendMail(mailOptions);
      return res.status(201).json({ message: 'Registration successful! Please check your email to activate your account.' });
   } catch (error){
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'Server error while registering user.' });
   }
}

// LOGIN USER FUNCTION
const loginUser = async (req, res) => {
   const { email, password } = req.body;
   if (!email || !password) { return res.status(400).json({ message: 'Please provide email and password.' }); }
   try {
      const existingUser = await knex('users').where({ email }).first();
      if (!existingUser) { return res.status(404).json({ message: 'Email not found.' }); }
      if(!existingUser.is_verified){ return res.status(403).json({message:'Your account has not been activated. Please check your email.'});}
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) { return res.status(401).json({ message: 'Incorrect password.' }); }
      const token = jwt.sign({ userId: existingUser.id, email: existingUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ message: 'Login successful.', user: { id: existingUser.id, fullName: existingUser.full_name, email: existingUser.email }, token: token });
   }
   catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Server error while logging in.' });
   };
}

// VERIFY EMAIL FUNCTION (WITH DEBUG LOGS)
const verifyEmail = async (req, res) => {
   const { token } = req.params; 
   console.log('\n--- STARTING EMAIL VERIFICATION PROCESS ---');
   if (!token) {
      console.log('Error: No token provided in URL.');
      return res.status(400).json({ message: 'Verification token is missing.' });
   }
   console.log(`1. Token received from URL: "${token}" (Length: ${token.length})`);
   try {
      console.log('2. Searching for user with this token in DB...');
      const user = await knex('users').where({ verification_token: token }).first();
      if(!user) {
         console.log('3. !!! ERROR: No user found matching this token.');
         const allUsers = await knex('users').select('id', 'email', 'verification_token');
         console.log('   List of all users in DB:');
         allUsers.forEach(u => {
            console.log(`   - User ID ${u.id}: "${u.verification_token}" (Length: ${u.verification_token ? u.verification_token.length : 0})`);
            if (u.verification_token === token) {
                console.log(`     ==> DIRECT COMPARISON WITH THIS TOKEN IS: TRUE`);
            }
         });
         return res.status(400).json({ message: 'Invalid or expired token.' });
      }
      console.log('3. SUCCESS: Found user:', user.email);
      console.log('4. Updating user status to verified...');
      await knex('users').where({ id: user.id }).update({ 
         is_verified: true, 
         verification_token: null
      });
      console.log('5. Update successful!');
      res.status(200).json({ message: 'Email verified successfully! You can now log in.' });
   } catch (error) {
      console.error('!!! 500 ERROR DURING EMAIL VERIFICATION:', error);
      return res.status(500).json({ message: 'An error occurred during the verification process.' });
   }
}

//FORGOT PASSWORD FUNCTION (OPTIONAL)
const forgotPassword = async (req, res) => {
   const { email } = req.body;
   if (!email) { return res.status(400).json({ message: 'Please provide your email.' }); }

   try {
      const user = await knex('users').where({ email }).first();
      

      if (!user) { 
        return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
      }

     
      const resetToken = crypto.randomBytes(32).toString('hex');
      

      const resetTokenExpires = new Date(Date.now() + 10 * 60 * 1000); 


      await knex('users').where({ id: user.id }).update({ 
        password_reset_token: resetToken,
        password_reset_expires: resetTokenExpires,
      });

 
      const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
      const mailOptions = {
         from: `"Hamster English" <${process.env.EMAIL_USER}>`,
         to: user.email,
         subject: 'Password Reset Request',
         html: `<p>You requested a password reset. Please click the link below to set a new password:</p>
                <a href="${resetURL}">${resetURL}</a>
                <p>This link will expire in 10 minutes.</p>`
      };
          
      await transporter.sendMail(mailOptions);
      
      return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });

   } catch (error){
      console.error('Error during forgot password process:', error);
      return res.status(500).json({ message: 'An error occurred. Please try again later.' });
   }
};
//RESET PASSWORD FUNCTION (OPTIONAL)
const resetPassword = async (req, res) => {

    const { token } = req.params;

    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword) {
        return res.status(400).json({ message: 'Please provide and confirm your new password.' });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Passwords do not match.' });
    }

    try {
      
        const user = await knex('users')
            .where({ password_reset_token: token })
            .andWhere('password_reset_expires', '>', new Date()) // So sánh với thời gian hiện tại
            .first();

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }


        const hashedPass = await bcrypt.hash(password, 10);

        
        await knex('users').where({ id: user.id }).update({
            password: hashedPass,
            password_reset_token: null, 
            password_reset_expires: null, 
        });

        res.status(200).json({ message: 'Your password has been updated successfully. Please log in.' });

    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'An error occurred while resetting the password.' });
    }
};
// EXPORTS
module.exports = {
    registerUser,
    loginUser,
    verifyEmail,
    forgotPassword,
    resetPassword,
};