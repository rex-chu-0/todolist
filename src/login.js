import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";


function Login() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);


    return (

        <div className="bg-yellow">
            <div className="conatiner loginPage vhContainer ">
                <div className="side">
                    <Link to="/"><img
                        className="logoImg"
                        src={'https://github.com/hexschool/webLayoutTraining1st/blob/master/%E5%85%AC%E7%9B%8A%E9%AB%94%E9%A9%97%E7%87%9F-Todolist/logo.png?raw=true'}
                        alt="" /></Link>
                    <img className="d-m-n"
                        src={'https://github.com/hexschool/webLayoutTraining1st/blob/master/公益體驗營-Todolist/empty%201.png?raw=true'}
                        alt="workImg" />
                </div>
                <div>

                    <form className="formControls" onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="formControls_txt">最實用的線上代辦事項服務</h2>
                        <label className="formControls_label" for="email">Email</label>
                        <input className="formControls_input" type="email" placeholder="Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                        <label className="formControls_label" for="email">密碼</label>
                        <input className="formControls_input" type="password" placeholder="密碼" {...register("密碼", { required: true, min: 8 })} />
                        <input className="formControls_btnSubmit" type="submit" />
                        <Link style={{
                            display: 'block',
                            color: '#333333',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }} to="/signup" element="signup.js">註冊帳號</Link>
                    </form>


                </div>
            </div>
        </div>

    );
}

export default Login;