import { Container, Main, Panel, Posts, NewPost, Post, Perfil, PostContent, Sidebar } from "./TimelineStyle";

import { AiOutlineHeart } from 'react-icons/ai'

function TimeLine() {

    return (
        <Container>
            <Main>
                <h1>timeline</h1>
                <Panel>
                    <Posts>
                        <NewPost>
                            <Perfil>
                                <p></p>
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
                                <p></p>
                                <AiOutlineHeart />
                                <h5>115 likes</h5>
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