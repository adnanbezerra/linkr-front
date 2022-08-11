import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL, config } from '../../../mock/data';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext.js';

export default function LikePost({liked, setLiked, id}) {
    const { user } = useContext(UserContext);
    function postLike(){
        const request = axios.post(`${BASE_URL}/like/${id}`, null ,config(user.token))
        request
            .then(() => {
               setLiked(!liked) 
            })
            .catch((err) => {
                console.log(err)
                alert("nao foi possivel curtir o post")
            })
    }

    function postDeslike() {
        const request = axios.delete(`${BASE_URL}/like/${id}`, config(user.token))
        request
            .then(() => {
               setLiked(!liked) 
            })
            .catch((err) => {
                console.log(err)
                alert("nao foi possivel descurtir o post")
            })
    }



    return (
        <>
            {(!liked) ?
                <AiOutlineHeart color="#FFFFFF" size={20} cursor='pointer' onClick={() => postLike()} /> 
                :
                <AiFillHeart color="red" size={20} cursor='pointer' onClick={() => postDeslike()} />
            }
        </>
    )
}