'use client'; 

import { useRef, Suspense, useMemo } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, Preload } from '@react-three/drei';

function NavLogoModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/royalvet.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, -1.5, 0]}>
        <primitive object={clonedScene} scale={3} />
      </group>
    </Float>
  );
}

useGLTF.preload('/royalvet.glb');

export default function Nav3D({ inView = true }: { inView?: boolean }) {
  return (
    <Canvas frameloop={inView ? "always" : "demand"} dpr={[1, 1.2]} camera={{ position: [0, 0, 6], fov: 45 }} className="w-full h-full transform-gpu" style={{ pointerEvents: 'none' }}>
      <Suspense fallback={null}>
        <NavLogoModel />
        <ambientLight intensity={0.8} />
        <directionalLight position={[0, 2, 5]} intensity={1.5} color="#D4AF37" />
        <directionalLight position={[5, 5, 2]} intensity={0.8} color="#F3E5AB" />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
