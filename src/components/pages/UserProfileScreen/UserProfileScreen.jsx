import { Container, Main, Panel, Posts, Post, Perfil, PostContent, Sidebar, Line, Hashtags, LoadSpinner, Preview, Infos, Follow } from ".//UserProfileScreenStyle.jsx";
import UserContext from '../../contexts/UserContext.js'
import { useEffect, useState, useContext } from "react";
import Loading from "../../Loading/Loading.js";
import axios from 'axios';
import DeletePost from "../EditPost/DeletePost.jsx";
import Header from "../../templates/Header/Header";
import { getCookieByName, config, BASE_URL } from "../../../mock/data";
import { useNavigate, Link, useParams } from "react-router-dom";
import LikePost from "../LikePost/LikePost.jsx";
import { ReactTagify } from "react-tagify";
import SearchBox from "../../templates/SearchBox/SearchBox.jsx";
import FollowerButton from "./Follower.jsx";

export default function UserPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(false)
    const [updatePage, setUpdatePage] = useState(true);
    const [trends, setTrends] = useState([]);
    const [posts, setPosts] = useState([])
    const [modalIsOpen, setIsOpen] = useState(false);
    const { user, setUser } = useContext(UserContext)
    const [userData, setUserData] = useState(undefined);
    const navigate = useNavigate();
    const verifyUser = user === undefined;
    const [userInfo, setUserInfo] = useState();

    const [follower, setFollower] = useState(false);


    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate(`/user/${id}`, { replace: true });
        }
        if (verifyUser) {
            navigate('/', { replace: true });
        } else {
            getUserInfo();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    function getUserInfo() {
        const userToken = verifyUser ? "" : user.token;
        const token = config(userToken);

        axios.get(`${BASE_URL}/user/me`, token)
            .then(response => {
                setUserInfo(response.data);
            })
            .catch(error => {
                console.error(error);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };


    useEffect(() => {
        const tokenCookie = getCookieByName('token');
        if (tokenCookie) {
            setUser({ token: tokenCookie });
            navigate(`/user/${id}`, { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //requisição de dados do usuario
    useEffect(() => {


        const promise = axios.get(`${BASE_URL}/user/${id}`, config(user.token));

        promise.then((res) => {
            console.log(res.data)
            setUserData(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);

    //requisição de posts com o id usuario
    useEffect(() => {


        const promise = axios.get(`${BASE_URL}/UserPosts/${id}`, config(user.token));

        promise.then((res) => {
            console.log(res.data)
            setPosts(res.data)
            setLoading(false)
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);


    //requisição de trends
    useEffect(() => {
        const trends = axios.get(`${BASE_URL}/trends`, config(user.token));
        trends.then((r) => {
            setTrends(r.data);
        }).catch((err) => {
            console.log(err)
        })

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [updatePage]);


    function GetHashtags({ item, updatePage }) {

        let name = (item.name).replace('#', '')

        return (
            <Link to={`/hashtag/${name}`} onClick={() => setUpdatePage(!updatePage)}>
                <p> {item.name}</p>
            </Link>

        )
    }

    function GetPosts({ item, updatePage }) {
        //variaveis para uso na biblioteca tagify
        const tagStyle = {
            fontWeight: 900,
            color: 'white',
            cursor: 'pointer'
        }
        const [contentString, setContentString] = useState(item.description);
        //

        //requisição de hashtags por post
        useEffect(() => {
            axios.get(`${BASE_URL}/hashtags/${item.id}`, config(user.token)).then((r) => {
                let hashs = '';
                for (let i = 0; i < r.data.length; i++) {
                    hashs += ' #' + r.data[i].name;
                }
                setContentString(contentString + hashs);
            }).catch((err) => {
                console.log(err)
            })

            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);
        //
        return (
            <Post>
                <Perfil>
                    <img src={item.imageUrl} alt={item.name} />
                    <LikePost id={item.id} />
                </Perfil>
                <PostContent>
                    <h3 onClick={() => {
                        navigate(`/user/${item.userId}`);
                        setUpdatePage(!updatePage);
                    }}>{item.name} </h3>
                    {/*o item.description foi incorporado no contentString*/}
                    <ReactTagify
                        tagStyle={tagStyle}
                        tagClicked={(tag) => {
                            navigate(`/hashtag/${tag.substring(1, tag.length)}`);
                            setUpdatePage(!updatePage);
                        }}>
                        <p>
                            {contentString}
                        </p>
                    </ReactTagify>

                    <Preview onClick={() => { window.open(item.url, '_blank') }}>
                        <Infos>
                            <h2>{item.titlePreview}</h2>
                            <h3>{item.descriptionPreview}</h3>
                            <h4>{item.url}</h4>
                        </Infos>
                        <img src={item.imagePreview} alt="" />
                    </Preview>
                    <DeletePost id={item.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setPosts={setPosts} setLoading={setLoading} />
                </PostContent>
            </Post>
        )
    }

    function ShowPosts() {

        if (posts.length === 0) {
            return (
                <h1>There are no posts yet</h1>
            )
        }
        else {
            return (
                posts.map((item, index) => { return (<GetPosts key={index} item={item} updatePage={updatePage} />) })
            )
        }
    }

    return (
        <Container>
            <Header userInfo={verifyUser ? "" : userInfo} />
            <SearchBox setUpdatePage={setUpdatePage} updatePage={updatePage} />
            <Main>
                <div>
                    <img src={userData === undefined ? '' : userData.imageUrl} alt={userData === undefined ? '' : userData.name} />
                    <h1>{userData === undefined ? '' : `${userData.name}'s posts`}</h1>
                    {<FollowerButton follower={follower} setFollower={setFollower} />}
                </div>
                <Panel>
                    <Posts>
                        {!loading ?
                            <ShowPosts /> :
                            <LoadSpinner>
                                <Loading />
                            </LoadSpinner>}
                    </Posts>
                    <Sidebar>
                        <h2>Trendings</h2>
                        <Line></Line>
                        <Hashtags>
                            {trends.length === 0 ? 'No trends at the moment' : trends.map((item, index) => { return (<GetHashtags key={index} item={item} updatePage={updatePage} />) })}
                        </Hashtags>
                    </Sidebar>
                </Panel>
            </Main>
        </Container>
    )
}
