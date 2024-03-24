import React, { useEffect, useRef, useState } from 'react';
// import propTypes from 'prop-types';
const BodyMap = ({initialPoints,onChange,viewMode}) => {
  const canvasRef = useRef(null);
  const [points, setPoints] = useState([]);
  const[initial,setInitial]=useState(initialPoints|| [])
  const [relativePoints,setRelativePoints]=useState(initialPoints||[])
  const[imageSize,setImageSize]=useState({width:0,height:0})
  const[canvasSize,setCanvasSize]=useState({width:0,height:0})

  const loadImage = () => {
    const canvas = canvasRef.current;
  
    const context = canvas.getContext('2d');

    canvas.height = canvas.width;
    const image = new Image();
    image.src = 'https://printablemapjadi.com/wp-content/uploads/2019/07/free-human-body-outline-printable-download-free-clip-art-free-clip-printable-body-maps-1.jpg'; // Replace with the path to your image
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      initial?.forEach((item)=>{
        drawPoint(item.x/(image.width/canvas.width), item.y/(image.height/canvas.height));
        console.log(item.x, item.y)
      })  
      setImageSize({width:image.width,height:image.
        height})  
        setCanvasSize({width:canvas.width,height:canvas.
          height})
    };

   
  };

  const drawPoint = (x, y) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fillStyle = 'red';
    context.fill();
    context.stroke();
  };

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const relativeX = Math.round(x *(imageSize.width/canvasSize.width));
    const relativeY = Math.round(y *(imageSize.height/canvasSize.height));
    console.log(x,y)
    const newPoints = [...points, { x, y }];
    const newrelativePoints = [...relativePoints, { x:relativeX,y:relativeY }];
    console.log(newrelativePoints)
    setPoints(newPoints);
    setRelativePoints(newrelativePoints)
    onChange(newrelativePoints)
    drawPoint(x, y);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setPoints([]);
    setRelativePoints([]);
    setInitial([])
    onChange([])
    loadImage();
  };
  // const undo=()=>{

  // }
  useEffect (()=>{
    loadImage();
  
  } ,[]);



  return (
    <div id="BodyMap1" className='w-[100%] height-[100%]'>
      <canvas
        ref={canvasRef}
        style={{ border: '1px solid #000'}}
       
        onMouseDown={handleMouseDown}
      />
      {!viewMode &&   <button onClick={handleClear} className='text-[12px] md:text-[14px] px-[6px] md:px-[8px] disabled:opacity-[50%] py-[4px] h-[50px] md:h-[36px] cursor-pointer open-sans-700  text-blue-1000 border border-blue-1000 font-bold tracking-wider rounded-[8px] hover:border-blue-1000 hover:text-blue-1000 transtion duration-500 mt-1 mb-3'>Clear</button>}
    
    </div>
  );
};
// BodyMap.propTypes = {
//     initialPoints: propTypes.object,
//     viewMode:propTypes.bool,
//     onChange:propTypes.func,
//   }
export default BodyMap;