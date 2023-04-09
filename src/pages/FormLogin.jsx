import { useState, useEffect } from "react";
import { useAuthentication } from "../hooks/useAuthentication";
import LoadingCircle from "../components/LoadingCircle";

const FormLogin= () => {
  const [email, setEmail] = useState('');
  const [password, setPassowrd] = useState('');
  const [error, setError] = useState(false)
  const {login, error : authError, loading} = useAuthentication()

  const handleSubmit = (e)=>{
    e.preventDefault()

    const user = {
      email,
      password,
    }

    const res = login(user)

    console.log(res)

  }
  useEffect(() => {
    if(error){
      console.log(error)
    }
  }, [error])

  useEffect(()=>{
    setError(authError)
  }, [authError])

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>

        <label htmlFor="email">Email</label>
        <input
          placeholder="Type your email"
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e)=> setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          placeholder="Type your password"
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e)=> setPassowrd(e.target.value)}
        />
        {!loading && <div className="btnDiv"><button>Login</button></div>}
        {loading && <LoadingCircle/>}
      </form>
      {error && <span className="error"><p>{error}</p></span>}
      
    </div>
  );
};

export default FormLogin;
