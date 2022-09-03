import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signupAPI } from "./callAPI";

function Signup() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const Navigate = useNavigate();
    const onSubmit = ({ email, nickname, password }) => {
        const data = JSON.stringify({
            user: { email, nickname, password }
        })

        signupAPI(data)
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (res.error) {
                    alert(`${res.message},${res.error}`);
                } else {
                    alert(`${res.message},即將轉跳至登入畫面！`);
                    Navigate("/login");
                }
            });

    }

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
                        <input className="formControls_input" type="email" placeholder="email" id="email" name="email" {...register("email", { required: { value: true, message: <span>此欄位必須填寫</span> }, pattern: { value: /^\S+@\S+$/i, message: <span>請輸入有效的Email</span> } })} />
                        {errors.email?.message}
                        <label className="formControls_label" for="nickname">您的暱稱</label>
                        <input className="formControls_input" type="text" placeholder="請輸入您的暱稱" id="nickname" name="nickname" {...register("nickname", { required: { value: true, message: <span>請輸入您的暱稱</span> } })} />
                        {errors.nickname?.message}
                        <label className="formControls_label" for="password">密碼</label>
                        <input className="formControls_input" type="password" placeholder="密碼" id="password" name="password" {...register("password", { required: { value: true, message: <span>請輸入密碼</span> }, minLength: { value: 6, message: <span>密碼需大於6碼</span> } })} />
                        {errors.password?.message}
                        <label className="formControls_label" for="valPassword">再次輸入密碼</label>
                        <input className="formControls_input" type="password" placeholder="請再次輸入密碼" id="valPassword" name="valPassword" {...register("valPassword", {
                            required: { value: true, message: <span>請再次輸入密碼</span> },
                            validate: val => {
                                if (watch("password") !== val)
                                    return <span>內容需與密碼一致</span>;
                            }
                        })} />
                        {errors.valPassword?.message}

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