import React from "react";
import { ActivityIndicator} from "react-native";
import styled from "styled-components/native";



const Wrapper = styled.View`
    flex:1;
    justify-content: center;
    align-items: center;
    background-color: #FFFFFF;
`

const LoadImage = styled.Image``

const Loader = ()=>(
    <Wrapper>
        {/* <ActivityIndicator size="small" color="#FF7900"/> */}
        <LoadImage source={require('../assets/icons/heartLoading.gif')}/>
    </Wrapper>
)

export default Loader;