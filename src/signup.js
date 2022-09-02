import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Signup() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div className="bg-yellow">
            <div className="conatiner signUpPage vhContainer">
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
                        <h2 className="formControls_txt">註冊帳號</h2>
                        <label className="formControls_label" for="email">Email</label>
                        <input className="formControls_input" type="email" placeholder="請輸入Email" {...register("Email", { required: true, pattern: /^\S+@\S+$/i })} />
                        <label className="formControls_label" for="name">您的暱稱</label>
                        <input className="formControls_input" type="text" placeholder="請輸入您的暱稱" {...register("您的暱稱", { required: true })} />
                        <label className="formControls_label" for="pwd">密碼</label>
                        <input className="formControls_input" type="password" placeholder="請輸入密碼" {...register("密碼", { required: true, min: 8 })} />
                        <label className="formControls_label" for="pwd">再次輸入密碼</label>
                        <input className="formControls_input" type="password" placeholder="請再次輸入密碼" {...register("再次輸入密碼", { required: true })} />

                        <input className="formControls_btnSubmit" type="submit" />
                        <Link to="/login" style={{
                            display: 'block',
                            color: '#333333',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            textAlign: 'center'
                        }} href="#loginPage">登入</Link>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default Signup;