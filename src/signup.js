import { Link } from "react-router-dom";

function Signup() {

    return (
        <div class="bg-yellow">
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

                </div>
            </div>
        </div>

    );
}

export default Signup;