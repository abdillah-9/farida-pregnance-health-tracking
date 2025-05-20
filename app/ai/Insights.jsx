import Button from '@app/reusables/UI_components/Button'
import Icon from '@app/reusables/UI_components/Icon'
import { HiLightBulb } from '@node_modules/react-icons/hi2'
import { PiChartLineUp } from '@node_modules/react-icons/pi'
import React from 'react'

export default function Insights() {
  return (
    <div style={main}>
        <div style={header}>AI Insights</div>
        <div style={cardsBody}>
            <div style={cards}>
                <Icon iconStyle={iconStyle}><PiChartLineUp/></Icon>
                <div style={desc}>
                    <div style={title}>
                        You're over budget
                    </div>
                    <div style={paragraph}>
                        Your entertainment budget was $100, but you've spent $140. Consider pausing subscriptions.
                    </div>
                    <div style={buttons}>
                        <Button buttonStyle={{...buttonStyle, 
                            backgroundColor:"rgba(79, 8, 161, 0.76)",
                            color:"white",
                            border:"none",
                            }}>
                            Apply tip
                        </Button>
                        <Button buttonStyle={buttonStyle}>Dismiss</Button>
                    </div>
                </div>
            </div>
        </div>
        <div style={header}>Smart Assistant</div>
        <div style={chat}>
        <div style={paragraph}>
                        Your entertainment budget was $100, but you've spent $140. Consider pausing subscriptions.
                    </div>
                    <div style={buttons}>
                        <Button buttonStyle={{...buttonStyle, 
                            backgroundColor:"rgba(79, 8, 161, 0.76)",
                            color:"white",
                            border:"none",
                            }}>
                            Apply tip
                        </Button>
                        <Button buttonStyle={buttonStyle}>Dismiss</Button>
                    </div>
        </div>
      
    </div>
  )
}

//CSS
const main ={
    backgroundColor:"rgba(255, 255, 255, 0.5)",
    padding:"20px",
    display:"flex",
    flexDirection:"column",
    gap:"15px",
}
const header={
    fontWeight:500,
    fontSize:"17px",
}
const cardsBody={
    display:"flex",
    flexDirection:"column",
    fontSize:"14px",
    gap:"20px",
}
const cards={
    backgroundColor:"white",
    display:"flex",
    gap:"20px",
    padding:"20px",
}
const iconStyle={
    fontSize:"30px",
    color:"rgba(79, 8, 161, 0.76)",
}
const chat={
    display:"flex",
    flexDirection:"column",
    gap:"10px",   
}
const desc={
    display:"flex",
    flexDirection:"column",
    gap:"10px",
}
const title={
    fontWeight:500,
    fontSize:"22px",
}
const paragraph={
    fontSize:"14px",
}
const buttons={
    display:"flex",
    gap:"20px",
}
const buttonStyle={
    padding:"10px",
    color:"rgba(79, 8, 161, 0.76)",
    fontWeight:500,
    border:"1px solid rgba(79, 8, 161, 0.76)",
    borderRadius:"5px",
}