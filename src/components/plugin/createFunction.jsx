import React, { useState, useCallback } from 'react'
import Dustbin from './Dustbin'
import Box from './Box'
import ItemTypes from './ItemTypes'
import update from 'immutability-helper'
const style = {
  display: 'flex', 
  flexWrap: 'wrap', 
  justifyContent: 'space-between', 
  flexDirection: 'row'
}
const Container = () => {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.BOX], lastDroppedItem: null },
  ])
  const [boxes] = useState([
    { name: 'function', classeName: 'btn btn-info', html: '<i class="fa fa-cog" aria-hidden="true"></i>', type: ItemTypes.BOX },
  ])
  const [droppedBoxNames, setDroppedBoxNames] = useState([])
  function isDropped(boxName) {
    return droppedBoxNames.indexOf(boxName) > -1
  }
  const handleDrop = useCallback(
    (index, item) => {
      const { name } = item
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [item] } : { $push: [] }),
      )
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      )
    },
    [droppedBoxNames, dustbins],
  )
  return (
    <div class="container" style={{ ...style}}>
      <div id="function-box" style={{ display:'none'}}>
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) => (
            <Dustbin
              accept={accepts}
              lastDroppedItem={lastDroppedItem}
              droppedBoxNames={droppedBoxNames}
              onDrop={item => handleDrop(index, item)}
              key={index}
            />
          ))}
        </div>
      </div>

      <div style={{ overflow: 'hidden', clear: 'both', display: 'flex' }}>
        {boxes.map(({ name, classeName, html, type }, index) => (
          <Box
            name={name}
            classeName={classeName}
            html={html}
            type={type}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  )
}
export default Container
