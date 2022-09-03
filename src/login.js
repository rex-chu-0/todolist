import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { loginAPI } from "./callAPI";
import { UpdateAuth } from "./Auth";



function Login() {


    const { register, handleSubmit, formState: { errors } } = useForm();
    const Navigate = useNavigate();
    const { setToken, setUser } = UpdateAuth();
    const onSubmit = (data) => {
        const userData = JSON.stringify({ user: data });

        loginAPI(userData)
            .then((res) => {
                setToken(res.headers.get("authorization"));
                return res.json();
            })
            .then((res) => {
                if (res.message === "登入失敗") {
                    alert(`${res.message}`);
                } else {
                    setUser(res.nickname);
                    Navigate("/todolist");
                }
            });



    };

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
                        <label className="formControls_label">Email</label>
                        <input className="formControls_input" type="email" placeholder="email" id="email" name="email" {...register("email", { required: { value: true, message: <span>此欄位必須填寫</span> }, pattern: { value: /^\S+@\S+$/i, message: <span>請輸入有效的Email</span> } })} />
                        {errors.email?.message}
                        <label className="formControls_label">密碼</label>
                        <input className="formControls_input" type="password" placeholder="密碼" id="password" name="password" {...register("password", { required: { value: true, message: <span>請輸入密碼</span> }, minLength: { value: 6, message: <span>密碼需大於6碼</span> } })} />
                        {errors.password?.message}
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