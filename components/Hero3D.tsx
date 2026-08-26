'use client'; 

import { useRef, Suspense, useMemo, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, useGLTF, Preload, PresentationControls, Environment, PerformanceMonitor } from '@react-three/drei';

function MajesticLogoModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF('/royal_vet_logo_3d.glb');
  const clonedScene = useMemo(() => scene.clone(), [scene]);
  const [isInteracting, setIsInteracting] = useState(false);
  const currentSpeed = useRef(0);
  
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Clamping delta to prevent huge jumps during lag spikes
      const clampedDelta = Math.min(delta, 0.1);
      // Target speed: 0.08 radians per second when free, 0 when interacting (slower)
      const targetSpeed = isInteracting ? 0 : 0.08;
      // Smoothly interpolate current speed for a luxurious ease-in/out effect with lower damping for fluidity
      currentSpeed.current = THREE.MathUtils.damp(currentSpeed.current, targetSpeed, 1.5, clampedDelta);
      // Frame-rate independent rotation guarantees zero lag feeling
      groupRef.current.rotation.y += currentSpeed.current * clampedDelta;
    }
  });

  return (
    <group 
      onPointerDown={() => setIsInteracting(true)} 
      onPointerUp={() => setIsInteracting(false)} 
      onPointerLeave={() => setIsInteracting(false)}
    >
      <Float speed={1.2} rotationIntensity={0.05} floatIntensity={0.4}>
        <group ref={groupRef} position={[0, 0.15, 0]}>
          <primitive object={clonedScene} scale={17.5} />
        </group>
      </Float>
      
      <Sparkles 
        count={70} 
        scale={13} 
        size={2.5} 
        speed={0.4} 
        opacity={0.4} 
        color="#F3E5AB" 
      />
      
      {/* Premium Low-Key Lighting to preserve true color and prevent white glare */}
      <Environment preset="city" resolution={256} blur={1} environmentIntensity={0.3} />
      <ambientLight intensity={0.2} />
      
      {/* Softer Rim Lights to avoid blown-out highlights */}
      <spotLight position={[15, 20, 5]} angle={0.3} penumbra={1} intensity={0.4} color="#D4AF37" />
      <directionalLight position={[-15, 0, -10]} intensity={1.5} color="#D4AF37" />
      <directionalLight position={[10, -10, -5]} intensity={1.0} color="#D4AF37" />
      
      {/* Extremely subtle front light to show natural color without glare */}
      <directionalLight position={[0, 0, 10]} intensity={0.08} color="#F3E5AB" />
    </group>
  );
}

useGLTF.preload('/royal_vet_logo_3d.glb');

export default function Hero3D({ inView = true }: { inView?: boolean }) {
  const [dpr, setDpr] = useState(1.5);

  return (
    <Canvas 
      frameloop={inView ? "always" : "demand"} 
      dpr={dpr}
      camera={{ position: [0, 0, 7], fov: 45 }} 
      className="w-full h-full transform-gpu" 
      style={{ touchAction: 'none' }}
      gl={{ antialias: false, powerPreference: "high-performance" }}
    >
      <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} />
      <Suspense fallback={null}>
        <PresentationControls
          global
          cursor={true}
          speed={1.5}
          zoom={1.1}
          rotation={[0, 0, 0]}
        >
          <MajesticLogoModel />
        </PresentationControls>
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
