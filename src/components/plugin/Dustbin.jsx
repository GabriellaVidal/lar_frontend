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
  display: 'flex',
  alignItems: 'end',
  flexWrap: 'wrap',
}
const styleButtons = {
  display: 'flex',
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
    <div id="selectedBox" ref={drop} style={{ ...style, backgroundColor }}>
      <p>{isActive
        ? 'Solte o comando na área selecionada'
        : 'Arraste para montar Função'}</p>

      {lastDroppedItem && (
        <div style={{ display: 'flex', flexDirection: 'row', margin: 'auto', alignItems: 'center'}}>
          {(() => {
            const buttons = [];
            for (let i = 0; i < droppedBoxNames.length; i++) {
              buttons.push(<button 
                name={droppedBoxNames[i].name} 
                className={droppedBoxNames[i].classeName}
                dangerouslySetInnerHTML={{__html: droppedBoxNames[i].html}}
                ></button>);
              if(droppedBoxNames[i].name == 'multiple'){
                buttons.push(<input type="number" className="form-control" name="numero"/>);
              }
              if(i != droppedBoxNames.length - 1){
                buttons.push(<div className="linha" style={{ color: '#DDDDDD', marginLeft: '15px' }}><i class="fa fa-long-arrow-right" aria-hidden="true"></i></div>);
              }
            }
            console.log(buttons);
            return buttons;
          })()}
        </div>
      )}
    </div>
  )
}
export default Dustbin

