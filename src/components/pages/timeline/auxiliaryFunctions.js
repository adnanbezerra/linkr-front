import { useState } from "react";
import Loading from "../../Loading/Loading";
import DeletePost from "../EditPost/DeletePost";
import EditPost from "../EditPost/EditPost";
import Repost from "../EditPost/Repost.jsx";
import LikePost from "../LikePost/LikePost";
import { Infos, LoadSpinner, NewPost, Perfil, Post, PostContent, Preview } from "./TimelineStyle";

export function GetPosts({ item, loading, setPosts, modalIsOpen, setIsOpen, navigate }) {

    const [message, setMessage] = useState(item.description);
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {
                loading ?
                    <LoadSpinner>
                        < Loading />
                    </LoadSpinner > :
                    <Post>
                        <Perfil>
                            <img src={item.imageUrl} alt={item.name} />
                            <LikePost id={item.id} />
                            <Repost />
                        </Perfil>
                        <PostContent>
                            <h3 onClick={() => navigate(`/user/${item.userId}`)}>{item.name} </h3>

                            <EditPost description={item.description} editMode={editMode} setEditMode={setEditMode} message={message} setMessage={setMessage} id={item.id} setPosts={setPosts} />

                            <Preview onClick={() => { window.open(item.url, '_blank') }}>
                                <Infos>
                                    <h2>{item.titlePreview}</h2>
                                    <h3>{item.descriptionPreview}</h3>
                                    <h4>{item.url}</h4>
                                </Infos>
                                <img src={item.imagePreview} alt="" />
                            </Preview>
                            {
                                item.isMyPost === "true" ?
                                    <DeletePost id={item.id} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} setPosts={setPosts} setEditMode={setEditMode} editMode={editMode} /> :
                                    ``
                            }
                        </PostContent>
                    </Post>
            }
        </>
    )
}

export function CreateNewPost({ userInfo, publish, setUrl, url, setDescription, description, disable, setDisable }) {
    return (
        <NewPost>
            <Perfil>
                <img src={userInfo === undefined ? "" : userInfo.imageUrl} alt="" />
            </Perfil>
            <PostContent>
                <h2>What are you going to share today?</h2>
                <form onSubmit={publish}>
                    <input type='text' placeholder="http://..." onChange={(e) => { setUrl(e.target.value) }} value={url} />
                    <textarea placeholder="Awesome article about #javascript" onChange={(e) => { setDescription(e.target.value) }} value={description}></textarea>
                    <button type={"submit"} disabled={disable}>{disable ? 'Publishing' : 'Publish'}</button>

                </form>
            </PostContent>
        </NewPost>
    )
}
