export default {
    login : user =>{
        console.log(user);
        return fetch('/user/login',{
            method : "post",
            body : JSON.stringify(user),
            headers : {
                'Content-Type' : 'application/json'
            }
        }).then(res => {
            console.log(res)
            if(res.status === 400)
                return { isAuthenticated : false, user : {username : ""},message:{msgBody:'Hmm did U enter username and password...', msgError:true}};
            if(res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated : false, user : {username : ""},message:{msgBody:'Oh no, check your username and password...', msgError:true}};
        })
    },

    register: user => {
        return fetch('/user/register',{
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
        .then(data => data)
    },
    logout: ()=> {
        return fetch('/user/logout')
        .then(res => res.json())
        .then(data => data)
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
        .then(res => {
            if(res.status !== 401){
                return res.json()
                .then(data=>data)
            }else{
                return {isAuthenticated: false, user: {username:''}}
            }
        })
    }
}