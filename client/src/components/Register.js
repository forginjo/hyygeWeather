import React, {useState, useRef, useEffect} from 'react';
import Auth from '../endpoints/Auth';
import Message from '../components/Message';

const Register = (props) => {
    const [user, setUser] = useState({username:'', password:''});
    const [message, setMessage] = useState(null);
    let timer = useRef(null);

    //something like lifecycle CDU
    useEffect(() => {
        return () => {
            clearTimeout(timer)
        }
    },[])

    const onChangeHandler = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const resetForm = () => {
        setUser({username:'', password:''})
    }
    const formSubmit = e =>{
        e.preventDefault();
        Auth.register(user).then(data=>{
            const { message } = data;
            setMessage(message);
            resetForm();
            if(!message.msgError){
                timer = setTimeout(()=>{
                    props.history.push('/login');
                },2000)
            }
        });
    }


    return (
        <div>
            <form onSubmit={formSubmit}>
            <h3 className='mt-5 mb-3 ml-2'>Please fill register details</h3>
            <div className='container mt-5 mb-3 ml-2'>
            <label htmlFor='username' className='sr-only'>Username:</label>
            <input type='text' name='username' value={user.username} placeholder='Enter Username' className='form-control' onChange={onChangeHandler} minLength={6} maxLength={100}/>
            <label htmlFor='password' className='sr-only'>Password:</label>
            <input type='password' name='password' value={user.password} placeholder='Enter Password' className='form-control' onChange={onChangeHandler} minLength={6} maxLength={100} />
            <button className='btn btn-large btn-warning' type='submit'>Register</button>
            </div>
            </form>
            {message ? <Message message={message} /> : null}
        </div>
    )
}

export default Register