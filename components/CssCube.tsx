
import React from 'react';

const CssCube: React.FC = () => {
  return (
    <>
      <style>{`
        .scene {
          width: 100px;
          height: 100px;
          perspective: 600px;
        }
        .cube {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: rotate 20s infinite linear;
        }
        .face {
          position: absolute;
          width: 100px;
          height: 100px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          background: rgba(0, 0, 0, 0.3);
        }
        .front  { transform: rotateY(  0deg) translateZ(50px); }
        .back   { transform: rotateY(180deg) translateZ(50px); }
        .right  { transform: rotateY( 90deg) translateZ(50px); }
        .left   { transform: rotateY(-90deg) translateZ(50px); }
        .top    { transform: rotateX( 90deg) translateZ(50px); }
        .bottom { transform: rotateX(-90deg) translateZ(50px); }
        @keyframes rotate {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to   { transform: rotateX(360deg) rotateY(360deg); }
        }
      `}</style>
      <div className="scene">
        <div className="cube">
          <div className="face front"></div>
          <div className="face back"></div>
          <div className="face right"></div>
          <div className="face left"></div>
          <div className="face top"></div>
          <div className="face bottom"></div>
        </div>
      </div>
    </>
  );
};

export default CssCube;
