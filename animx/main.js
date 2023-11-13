
//import { useLoader } from "@react-three/fiber";
//import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Suspense } from "react";
import { Environment,  OrbitControls  } from "@react-three/drei";
import {Canvas} from '@react-three/fiber';
import { Html, useProgress } from '@react-three/drei';
import { degToRad } from "three/src/math/MathUtils.js";
import {useGLTF,useAnimations} from '@react-three/drei'
import React, { useRef, useEffect } from 'react'

//                      0               1       2       3     4       5         6       7         8     9
const actionName = ["combopunch","fight-idle","idle","jump","kick","lowkick","naruto","t-pose","turn","walk"];
window.action = actionName[4];

export function Model(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/caza-v1.glb')
  const { actions, mixer, ref, names, clips } = useAnimations(animations, group)
  console.log(animations) 
  //highlight-start
  //const actio = "fight-idle"

  useEffect(() => {
    console.log(window.action)
    actions[window.action].play();
  }, [mixer]);


  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="caza-rigg"  scale={1} position={[0, -0.5 , 0]}  rotation={[Math.PI / 2, 0, 0]}>
          <primitive object={nodes.mixamorigHips} />
          <skinnedMesh name="Armas_0001" geometry={nodes.Armas_0001.geometry} material={materials.Armas} skeleton={nodes.Armas_0001.skeleton} />
          <skinnedMesh name="Balas_0001" geometry={nodes.Balas_0001.geometry} material={materials.Balas} skeleton={nodes.Balas_0001.skeleton} />
          <skinnedMesh name="Bolcillos_0001" geometry={nodes.Bolcillos_0001.geometry} material={materials.Bolsillos} skeleton={nodes.Bolcillos_0001.skeleton} />
          <skinnedMesh name="Botas_0001" geometry={nodes.Botas_0001.geometry} material={materials.Botas} skeleton={nodes.Botas_0001.skeleton} />
          <skinnedMesh name="Cabeza_0001" geometry={nodes.Cabeza_0001.geometry} material={materials.Cabeza} skeleton={nodes.Cabeza_0001.skeleton} />
          <skinnedMesh name="Calavera_0001" geometry={nodes.Calavera_0001.geometry} material={materials.Calavera} skeleton={nodes.Calavera_0001.skeleton} />
          <skinnedMesh name="Cartucheras_0001" geometry={nodes.Cartucheras_0001.geometry} material={materials.Cartucheras} skeleton={nodes.Cartucheras_0001.skeleton} />
          <skinnedMesh name="Cinturon_0001" geometry={nodes.Cinturon_0001.geometry} material={materials.Cinturon} skeleton={nodes.Cinturon_0001.skeleton} />
          <skinnedMesh name="Cuerpo_0001" geometry={nodes.Cuerpo_0001.geometry} material={materials.Cuerpo} skeleton={nodes.Cuerpo_0001.skeleton} />
          <skinnedMesh name="Manos_0001" geometry={nodes.Manos_0001.geometry} material={materials.Manos} skeleton={nodes.Manos_0001.skeleton} />
          <skinnedMesh name="MateGranadas_0001" geometry={nodes.MateGranadas_0001.geometry} material={materials.MateGranada} skeleton={nodes.MateGranadas_0001.skeleton} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/caza-v1.glb')






function Loader() {
  const { progress } = useProgress()
  return <Html center>{progress} % loaded</Html>
}



export  function Cazador() {
  return (
    <div className='float-left justify-center items-center h-screen' >

      <Canvas  /* frameloop="demand"*/ camera={{rotateY:degToRad(90), position: [0, 1, 4], fov: 50 }}>
        <OrbitControls />
        <ambientLight intensity={0.9}  />
        <spotLight intensity={0.9} angle={0.1} penumbra={1} position={[10, 15, 10]} castShadow />
        <pointLight position={[10, 10, 10]} />
        <Suspense fallback={<Loader />}>
          <Model  />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
};
