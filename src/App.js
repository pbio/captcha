import * as React from 'react';

import './App.css';

function App() {
  const [ target, setTarget ] = React.useState(computeRandInt())
  const [ grid, setGrid ] = React.useState([...Array(9)].map(()=> {return computeRandInt() }));
  const [ isGameWon, setIsGameWon ] = React.useState(false);

  function computeRandInt(){
    return Math.floor(Math.random()*3);
  }

  function isComplete(){
    const didWin = grid.every((item) => {
      if (item === target) return true;
      return false;
    })
    setIsGameWon(didWin);
  }
  function set(){

  }

  function reset(){
    setTarget(computeRandInt());
    setGrid([...Array(9).fill(false).map(()=> {return computeRandInt() })]);
    setIsGameWon(false);
  }
  React.useEffect(()=>{
    console.log(grid);
  }, [grid])

  if (isGameWon) return <div> 
                                  success 
                                  <button onClick={()=>{reset()}} > reset</button>
                                </div>
  function setTargetTitle(){
    if (target === 0) return 'dogs'
    else if (target === 1) return 'cats'
    return 'monkey';
  }
  return (
    <div className="App">
      Show all {setTargetTitle()}
      
      <div className='container'>
        { grid.map((tile, tileIdx) => {
          return <Tile key={tileIdx} grid= {grid} setGrid= {setGrid} tileId= {tileIdx} />
        })}
      </div>
      <button onClick = {()=>isComplete()} > submit </button>
    </div>
  );
}

export default App;
function computeRandInt(){
  return Math.floor(Math.random()*3);
}

function Tile({ grid, setGrid, tileId}){
  function invertTile(grid, id){
    const newGrid = [...grid ];
    newGrid[id] = computeRandInt();
    setGrid(newGrid);
  }
  function setTargetUrl(){
    if (grid[tileId] === 0) return '/dogs'
    else if (grid[tileId] === 1) return '/cats'
    return '/monkey';
  }
 
  const picDogOrCat = grid[tileId] ? '/dog' : '/cat';
  return <img 
            src={`https://loremflickr.com/200/200${setTargetUrl()}?random=${tileId}`} 
            key={tileId}
            className='tile' 
            onClick={()=>invertTile(grid, tileId)} />
}
