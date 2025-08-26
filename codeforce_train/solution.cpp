
#include <iostream>
#include <string>
#include <vector>
using namespace std;
string solve(){
    vector<char> name;
    string s;
    getline(cin,s);
    while (s.empty()) getline(cin, s);
    name.push_back(s[0]);
    for(int i=1;i<s.length();i++){
        if(s[i-1] == ' '){
            name.push_back(s[i]);
        }
    }
    return string(name.begin(),name.end());
}
int main() {
    int t;
    cin>>t;
    cin.ignore();
    while(t--){
        cout<<solve()<<endl;
    }
    
    return 0;
}