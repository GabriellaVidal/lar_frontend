import React from 'react'
import { useDrop } from 'react-dnd'
const style = {
  border: '1px dashed gray',
  width: '100%',
  minHeight: '200px',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: '#222',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left',
}
const Dustbin = ({ accept, lastDroppedItem, onDrop, droppedBoxNames}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  })
  const isActive = isOver && canDrop
  let backgroundColor = 'white'
  if (isActive) {
    backgroundColor = 'darkgreen'
  } else if (canDrop) {
    backgroundColor = 'darkkhaki'
  }
  return (
    <div ref={drop} style={{ ...style, backgroundColor }}>
      {isActive
        ? 'Solte o comando na área selecionada'
        : `Arraste novos camandos`}

      {lastDroppedItem && (
        <div>
          {(() => {
            const buttons = [];
            for (let i = 0; i < droppedBoxNames.length; i++) {
              console.log(droppedBoxNames[i]);
              buttons.push(<button 
                name={droppedBoxNames[i].name} 
                class={droppedBoxNames[i].classeName}
                dangerouslySetInnerHTML={{__html: droppedBoxNames[i].html}}
                ></button>);
            }
            return buttons;
          })()}
        </div>
      )}
    </div>
  )
}
export default Dustbin

