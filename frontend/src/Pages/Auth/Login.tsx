import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify'
import {
    hindEmail,
    hindPass,
} from "../../validator/validator";

interface ILoginProps {
    setUser: (user: { name: string, email: string, role: string }) => void;
    setToken: (token: string) => void;
}

interface IErrorText {
    email: string[];
    password: string[]
}

export default function Login(props: ILoginProps) {
    const { setUser, setToken } = props;

    const [showPass, setShowPass] = useState<boolean>(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    const [errTxt, setErrTxt] = useState<IErrorText>({
        email: [],
        password: [],
    });

    const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value });
        if (e.currentTarget.name === "email") {
            setErrTxt({ ...errTxt, email: hindEmail(e.currentTarget.value) });
        }
        if (e.currentTarget.name === "password") {
            setErrTxt({ ...errTxt, password: hindPass(e.currentTarget.value) });
        }
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.email.length < 3) return toast.error("email is invalid");
        if (formData.password.length < 8) return toast.error("password is invalid");
        try {
            const respons = await fetch('http://localhost:5000/api/auth', {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
                },
                body: JSON.stringify({
                    email: formData.email.toLowerCase(),
                    password: formData.password,
                })
            })
            respons.json().then(res => {
                if (res.ok === false) {
                    toast.error(res.message)
                    return;
                }
                setUser({ name: res.name, email: res.email, role: res.role })
                setToken(res['x-auth-token'])
                window.localStorage.setItem('user-auth', res['x-auth-token'])
            })
        } catch (error) {
            console.log(error);
            toast.error((error as Error).message);
        }
    };
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4 mt-5">
                        <div className="card p-4">
                            <h2 className="text-center">Sign In</h2>
                            <form onSubmit={(e) => submitHandler(e)}>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputEmail1" className="form-label">
                                        Email address
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control bg-light"
                                        placeholder="Enter your email"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        onChange={changeHandler}
                                        value={formData.email}
                                        name="email"
                                    />
                                    {errTxt.email && (
                                        <ul id="emailHelp" className="form-text">
                                            {errTxt.email.map((item, index) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleInputPassword1" className="form-label">
                                        Password
                                    </label>
                                    <input
                                        type={showPass ? "text" : "password"}
                                        className="form-control bg-light"
                                        id="exampleInputPassword1"
                                        placeholder="Enter your password"
                                        onChange={changeHandler}
                                        value={formData.password}
                                        name="password"
                                    />
                                </div>
                                {errTxt.password && (
                                    <ul id="emailHelp" className="form-text">
                                        {errTxt.password.map((item, index) => (
                                            <li key={index}>{item}</li>
                                        ))}
                                    </ul>
                                )}
                                <div className="mb-3 form-check">
                                    <input
                                        type="checkbox"
                                        className="form-check-input"
                                        id="exampleCheck1"
                                        checked={showPass}
                                        onChange={() => setShowPass(!showPass)}
                                    />
                                    <label className="form-check-label" htmlFor="exampleCheck1">
                                        show password
                                    </label>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    style={{ width: "100%" }}
                                >
                                    SIGN IN
                                </button>
                                <div role="button" className="d-block text-center p-3" onClick={() => alert("If you have forgotten your password, please contact your system administrator. \n https://t.me/Qobulov_Asror")} >Forgot password?</div>
                                <Link
                                    className="btn"
                                    style={{ width: "100%", boxShadow: "0 0 4px 0" }}
                                    to="/regis"
                                >
                                    CREATE AN ACCOUNT
                                </Link>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        </>
    )
}