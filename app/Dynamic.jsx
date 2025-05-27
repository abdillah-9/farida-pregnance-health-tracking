"use client"
import React from 'react'
import useWindowSize from './reusables/CUSTOM_hooks/useWindowSize'

export default function DynamicPage({children}) {

const {windowSize} = useWindowSize();

let viewportWidth = windowSize.windowWidth;

//Css
const dynamicPage={
  width:"100%",
  maxWidth: viewportWidth >= 1024 ? "85vw" : "100%",
  height:"90vh",
  padding:"15px 30px",
}

  return (
    <div style={dynamicPage}>
      {children}      
    </div>
  )
}