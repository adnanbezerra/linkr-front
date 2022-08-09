import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar } from "./TimelineStyle";

import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'

function TimeLine() {

    return (
        <Container>
            <Main>
                <h1>timeline</h1>
                <Panel>
                    <Posts>
                        <NewPost>
                            <Perfil>
                                <img src="https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg" alt="" />
                            </Perfil>
                            <PostContent>
                                <h2>What are you going to share today?</h2>
                                <form>
                                    <input />
                                    <input />
                                    <button>Publish</button>
                                </form>
                            </PostContent>
                        </NewPost>
                        <Post>
                            <Perfil>
                                <img src="https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg" alt="" />
                                <AiOutlineHeart color="#FFFFFF" size={20} />
                                <p>115 likes</p>
                            </Perfil>
                            <PostContent>
                                {/* mudar para p dps */}
                                <h4>Juvenal </h4>
                                <h3>palavras</h3>
                                <h3>preview</h3>
                            </PostContent>
                        </Post>
                        <Post>
                            <Perfil>
                                <img src="https://rd1.com.br/wp-content/uploads/2022/08/20220805-neymargol-300x300.jpg" alt="" />
                                <AiFillHeart color="red" size={20} />
                                <p>115 likes</p>
                            </Perfil>
                            <PostContent>
                                {/* mudar para p dps */}
                                <h4>Juvenal </h4>
                                <h3>palavras</h3>
                                <h3>preview</h3>
                            </PostContent>
                        </Post>
                    </Posts>
                    <Sidebar>
                        sidebar
                    </Sidebar>
                </Panel>
            </Main>
        </Container>
    )
}

export default TimeLine;