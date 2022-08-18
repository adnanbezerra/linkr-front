import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import axios from 'axios';
import { BASE_URL, config } from '../../../mock/data';
import { useContext, useEffect, useState } from 'react';
import UserContext from '../../contexts/UserContext.js';
import ReactTooltip from 'react-tooltip';

export default function LikePost({ id }) {
    const { user } = useContext(UserContext);
    const [infoLikes, setInfoLikes] = useState({liked: false, likes: [], total: 0})
    const [liked, setLiked] = useState();
    const [text, setText ] = useState('');


    function searchLike() {
        const likeInfo = axios.get(`${BASE_URL}/likes/${id}`, config(user.token))
        likeInfo
        .then((res) => { setInfoLikes(res.data); setLiked(res.data.liked);
            const textInf = Text(res.data); setText(textInf)})
        .catch((err)=> { console.log(err)})
    }

    function postLike() {
        const request = axios.post(`${BASE_URL}/like/${id}`, null, config(user.token))
        request
            .then(() => {
                setLiked(!liked)
                searchLike()
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
                searchLike()
            })
            .catch((err) => {
                console.log(err)
                alert("nao foi possivel descurtir o post")
            })
    }
    const quantityLikes = infoLikes.liked ? infoLikes.total+1 : infoLikes.total

    function Text(inf) {
        let info;
        if (inf.liked && inf.total > 2){
            info = `Você, ${inf.likes[0].whoLiked} e outras ${inf.total - 1} pessoas`;
        } else if (inf.liked && inf.total === 1) {
          info = `Você e ${inf.likes[0].whoLiked} curtiram`;
        } else if (inf.liked && inf.total === 2) {
          info = `Você, ${inf.likes[0].whoLiked}  e mais uma pessoa curtiram`;
        } else if (inf.liked && inf.total === 0) {
          info = `Você curtiu`;
        } else if (!inf.liked && inf.total > 2) {
          info = `${inf.likes[0].whoLiked} , ${inf.likes[1].whoLiked}  e outras ${ inf.total - 1} pessoas curtiram`;
        } else if (!inf.liked && inf.total === 1) {
          info = `${inf.likes[0].whoLiked}  curtiu`;
        } else if (!inf.liked && inf.total === 2) {
          info = `${inf.likes[0].whoLiked}  e ${inf.likes[1].whoLiked}  curtiram`;
        }
    
        return info;
    }
    
    useEffect(() => { searchLike() }, []);
    return (
        <>
            {(!liked) ?
                <AiOutlineHeart color="#FFFFFF" size={20} cursor='pointer' onClick={() => postLike()} />
                :
                <AiFillHeart color="red" size={20} cursor='pointer' onClick={() => postDeslike()} />
            }
            <p data-tip={quantityLikes === 0? '': text }>{quantityLikes} {quantityLikes === 1 ? 'like' : 'likes'}</p>
            <ReactTooltip
                effect="solid"
                place="bottom"
                type="light"
                resizeHide={true}
                delayUpdate={300}
            />

        </>
    )
}