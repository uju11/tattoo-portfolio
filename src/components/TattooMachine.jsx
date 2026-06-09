import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Box, Cylinder, Torus } from '@react-three/drei'
import * as THREE from 'three'

const steelMaterial = new THREE.MeshStandardMaterial({
  color: '#888',
  metalness: 0.9,
  roughness: 0.2,
})

const brassMaterial = new THREE.MeshStandardMaterial({
  color: '#b5a642',
  metalness: 0.8,
  roughness: 0.3,
})

const coilMaterial = new THREE.MeshStandardMaterial({
  color: '#c41e3a',
  metalness: 0.3,
  roughness: 0.8,
})

const blackMatte = new THREE.MeshStandardMaterial({
  color: '#111',
  metalness: 0.2,
  roughness: 0.9,
})

export default function TattooMachine(props) {
  const group = useRef()
  const armatureRef = useRef()
  const needleRef = useRef()

  // Slow motion animation loop
  useFrame((state) => {
    // Machine floats slightly
    group.current.position.y = Math.sin(state.clock.elapsedTime * 1.5) * 0.1
    group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

    // Armature bar and needle hammering in slow motion
    // High frequency sine wave with slow time multiplier
    const hammer = Math.sin(state.clock.elapsedTime * 20) 
    armatureRef.current.rotation.z = -0.1 + (hammer * 0.05)
    needleRef.current.position.y = -2.5 + (hammer * 0.1)
  })

  return (
    <group ref={group} {...props} dispose={null} rotation={[0, -Math.PI / 4, 0]}>
      {/* Base Frame (L-shape) */}
      <Box args={[0.3, 2, 0.4]} position={[-0.8, 0, 0]} material={steelMaterial} />
      <Box args={[1.5, 0.3, 0.4]} position={[-0.2, -0.85, 0]} material={steelMaterial} />

      {/* Coils */}
      <group position={[0.2, -0.2, 0]}>
        {/* Rear Coil */}
        <Cylinder args={[0.3, 0.3, 1, 32]} position={[-0.4, -0.2, 0]} material={coilMaterial} />
        {/* Front Coil */}
        <Cylinder args={[0.3, 0.3, 1, 32]} position={[0.4, -0.2, 0]} material={coilMaterial} />
        {/* Core rods */}
        <Cylinder args={[0.1, 0.1, 1.1, 16]} position={[-0.4, -0.2, 0]} material={steelMaterial} />
        <Cylinder args={[0.1, 0.1, 1.1, 16]} position={[0.4, -0.2, 0]} material={steelMaterial} />
      </group>

      {/* Yoke / Base Plate */}
      <Box args={[1.2, 0.1, 0.5]} position={[0.2, -0.75, 0]} material={steelMaterial} />

      {/* Binding Posts (Top & Back) */}
      <Cylinder args={[0.08, 0.08, 0.6, 16]} position={[-0.8, 1, 0]} rotation={[0, 0, Math.PI/2]} material={brassMaterial} />
      <Cylinder args={[0.08, 0.08, 0.4, 16]} position={[-0.9, -0.5, 0]} rotation={[0, 0, Math.PI/2]} material={brassMaterial} />
      
      {/* Contact Screw */}
      <Cylinder args={[0.03, 0.03, 0.5, 16]} position={[-0.4, 0.8, 0]} rotation={[0, 0, -Math.PI/6]} material={brassMaterial} />

      {/* Armature Bar */}
      <group ref={armatureRef} position={[-0.8, 0.5, 0]}>
        <Box args={[1.6, 0.1, 0.3]} position={[0.8, 0, 0]} material={steelMaterial} />
        {/* Front Spring */}
        <Box args={[0.8, 0.02, 0.2]} position={[1.8, 0.05, 0]} rotation={[0, 0, 0.1]} material={steelMaterial} />
      </group>

      {/* Tube Vise / Grip Holder */}
      <Cylinder args={[0.2, 0.2, 0.6, 32]} position={[0.8, -1.1, 0]} rotation={[0, 0, Math.PI/2]} material={brassMaterial} />
      
      {/* Grip / Tube */}
      <Cylinder args={[0.15, 0.15, 2, 32]} position={[0.8, -2, 0]} material={steelMaterial} />
      
      {/* Rubber Band */}
      <Torus args={[0.25, 0.02, 16, 32]} position={[0.8, -0.5, 0]} rotation={[Math.PI/2, Math.PI/4, 0]} material={blackMatte} />

      {/* Needle Bar */}
      <group ref={needleRef}>
        <Cylinder args={[0.02, 0.02, 3.5, 8]} position={[0.8, 0, 0]} material={steelMaterial} />
        {/* Needle Tip (hitting canvas) */}
        <Cylinder args={[0.005, 0.02, 0.2, 8]} position={[0.8, -1.8, 0]} material={steelMaterial} />
      </group>

    </group>
  )
}
