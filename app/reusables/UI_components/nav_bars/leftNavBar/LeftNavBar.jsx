"use client";
import React, { useEffect, useState } from 'react';
import NavBarTemp from '../NavBarTemp';
import { GiCycle } from '@node_modules/react-icons/gi';
import { HiOutlineUserCircle } from '@node_modules/react-icons/hi2';
import { RiHeartPulseLine, RiHomeHeartLine } from '@node_modules/react-icons/ri';
import useWindowSize from '@app/reusables/CUSTOM_hooks/useWindowSize';
import { useDispatch, useSelector } from '@node_modules/react-redux/dist/react-redux';
import Link from '@node_modules/next/link';
import { setReduxState } from '@app/provider/redux/reducer';
import { BsRobot } from '@node_modules/react-icons/bs';
import {FaBaby} from "@node_modules/react-icons/fa"

const LeftNavBar = () => {

const dispatch = useDispatch(); 
const isVisible = useSelector((store)=>store.ReduxState.showNavBar);
const [extraStyle,setExtraStyle] = useState({width:"15vw", position:"relative"});
const {windowSize} = useWindowSize();

const windowWidth = windowSize.windowWidth; 

const linkClickEvent= ()=>{
   dispatch(setReduxState({overlay:false,showNavBar:windowWidth < 1024 && false}));
}

useEffect(() => {
  if (windowWidth < 1024 && windowWidth > 480) { setExtraStyle({width:"50vw", position:"fixed"})}
  else if(windowWidth <= 480){setExtraStyle({width:"60vw", position:"fixed"})}
  else{setExtraStyle({width:"15vw", position:"relative"})}
}, [windowWidth]);

  //CSS objects
  const navBarTempStyle = {
    display:"flex",
    flexDirection:"column",
    gap:"20px",
    ...extraStyle,
    minWidth:"180px",
    backgroundColor:"white",
    height:"100vh",
    padding:"10px 30px",
    zIndex:1,
    top:0,left:0,
  }

  return (  

    windowSize.windowWidth >= 1024 || (windowSize.windowWidth <= 1024 && isVisible == true) ?
    <NavBarTemp navBarTempStyle={navBarTempStyle}>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle_Logo}>
        <NavBarTemp.NavImage imageAttributes={imageAttributes} 
        imageStyle={{color:"red"}}/>
        <NavBarTemp.NavText navTextStyle={navTextStyle_Logo}>BLOOM-NEST APP</NavBarTemp.NavText>        
      </NavBarTemp.NavContainer> 

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><RiHomeHeartLine/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/dashboard" onClick={linkClickEvent}>Home</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><GiCycle/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/ovulation" onClick={linkClickEvent}>Ovulation Tracker</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><RiHeartPulseLine/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/pregnance" onClick={linkClickEvent}>Pregnance Monitor</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><FaBaby/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/childcare" onClick={linkClickEvent}>Childcare</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><HiOutlineUserCircle/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/user" onClick={linkClickEvent}>User</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

      <NavBarTemp.NavContainer navContainerStyle={navContainerStyle}>
        <NavBarTemp.NavIcon navIconStyle={navIconStyle}><BsRobot/></NavBarTemp.NavIcon>
          <NavBarTemp.NavText navTextStyle={navTextStyle}>
            <Link href="/dashboardDesign" onClick={linkClickEvent}>AI Assistant</Link>
          </NavBarTemp.NavText>        
      </NavBarTemp.NavContainer>

    </NavBarTemp> :""
  )

};


const navContainerStyle_Logo ={
  display:"flex",
  gap:"0px",
  paddingBottom:"15px",
  alignItems:"center",
  flexDirection:"column",
  width:"fit-content"
}

const navContainerStyle ={
  display:"flex",
  gap:"7px",
  width:"fit-content",
}

const navTextStyle_Logo ={
  color:"rgba(8, 161, 28, 0.76)",
  textAlign:"center",
  fontWeight:500,
  fontSize:"12px",
}

const navTextStyle ={
  color:"rgb(2, 51, 8)",
  textAlign:"left",
  fontSize:"12px",
}

const imageAttributes ={
  src:"/assets/images/logo.svg",
  height: 80,
  width:60,
  alt:"logo",
}

const navIconStyle ={
  fontSize:"21px",
  color:"rgba(8, 161, 28, 0.76)",
}

export default LeftNavBar;
