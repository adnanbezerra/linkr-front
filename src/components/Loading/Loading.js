import styled from 'styled-components'

import { MutatingDots } from 'react-loader-spinner'

function Loading() {
    return (

        < MutatingDots
            height="100"
            width="100"
            color='#FFFFFF'
            secondaryColor="#FFFFFF"
            ariaLabel='loading'
            radius={12}
        />

    )
}

export default Loading;