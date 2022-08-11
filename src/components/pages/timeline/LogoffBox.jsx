import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import { LogoffContainer } from "../Header/HeaderStyle";

export default function LogoffBox({ displayBox }) {

    const { setUser } = useContext(UserContext);
    const navigate =  useNavigate();

    function logoffUser() {
        setUser();
        deleteAllCookies();
        navigate('/');
    }

    function deleteAllCookies() {
        let cookies = document.cookie.split(";");
    
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i];
            let eqPos = cookie.indexOf("=");
            let name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
        }
    }

    return (
        <LogoffContainer display={displayBox} onClick={logoffUser}>
            Logout
        </LogoffContainer>
    )
}