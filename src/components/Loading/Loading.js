import styled from 'styled-components'

import { MutatingDots } from 'react-loader-spinner'

function Loading() {
    return (
        <LoadSpinner>
            < MutatingDots
                height="100"
                width="100"
                color='#FFFFFF'
                secondaryColor="#FFFFFF"
                ariaLabel='loading'
                radius={12}
            />
        </LoadSpinner>
    )
}

export default Loading;

export const LoadSpinner = styled.div`
position: absolute;
width: 100%;
height: 240px;
display: flex;
justify-content: center;
align-items: center;
z-index: 1;
margin-top: 240px;
`