import { useState } from 'react';
import './Login.scss';
import axios from 'axios';
import { BASE_URL } from '../../../constants/constants';
import { useNavigate } from 'react-router';

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('frank@kunde.de');
    const [password, setPassword] = useState('123456');

    const [error, setError] = useState('');

    const setKunde = () => {
        setEmail('frank@kunde.de');
        setPassword('123456');
    }

    const setMitarbeiter = () => {
        setEmail('eyad@agido.de');
        setPassword('123456');
    }

    const login = async () => {
        try {
            const response = await axios.post(`${BASE_URL}/login`, { email: email, password: password }, {});
            if(response){
                const token = response.data.token;
                if (email.includes('agido')) {
                    localStorage.setItem('mitarbeiterToken', token);
                    navigate('/employee');
                } else {
                    localStorage.setItem('kunde1Token', token);
                    navigate('/customer');
                }
            }
        }
        catch (error){
            setError(error);
        }
    }


    return (
        <div className="login-container">
            <div className="login">

                <div className="">
                    <span className="txt-headline txt-700 c-txt">E-<span className="c-prim-700">Pay</span></span>
                </div>

                <div className="login-headline-container">
                    <span className="txt-title txt-500 c-txt">Einloggen</span>
                </div>

                <div className="input-container">
                    <input type="email" className="input-field" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="input-container">
                    <input type="password" className="input-field" required placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>



                <button className="btn-outlined" onClick={() => setKunde()}>Autofill Kunde</button>
                <button className="btn-outlined" onClick={() => setMitarbeiter()}>Autofill Mitarbeiter</button>

                <button className="btn-filled-prim-700" onClick={() => login()}>Einloggen</button>

                <span className="txt-title txt-700 c-danger-700">{error}</span>

            </div>
        </div>
    )
}