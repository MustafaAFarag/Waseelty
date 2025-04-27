"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { Points as ThreePoints } from "three";

function ParticleField() {
  const points = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      temp.push(x, y, z);
    }
    return new Float32Array(temp);
  }, []);

  const pointsRef = useRef<ThreePoints>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += Math.sin(state.clock.elapsedTime + i) * 0.0003;
        positions[i + 1] += Math.cos(state.clock.elapsedTime + i) * 0.0003;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={points} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#00ADB5"
        size={0.01}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

export function ParticlesBackground() {
  return (
    <Canvas className="absolute inset-0 z-0" camera={{ position: [0, 0, 1] }}>
      <ParticleField />
    </Canvas>
  );
}
