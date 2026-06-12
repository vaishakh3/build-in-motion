"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

const CYAN = new THREE.Color("#00d6c9");
const BLUE = new THREE.Color("#5b7cff");
const LIME = new THREE.Color("#b7f241");

function TunnelRings({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  const COUNT = 14;
  const SPACING = 6;
  const DEPTH = COUNT * SPACING;

  useFrame((_, delta) => {
    if (paused || !group.current) return;
    group.current.children.forEach((ring) => {
      ring.position.z += delta * 7;
      if (ring.position.z > 6) ring.position.z -= DEPTH;
    });
  });

  return (
    <group ref={group}>
      {Array.from({ length: COUNT }).map((_, i) => (
        <mesh key={i} position={[0, 1.2, -i * SPACING]} rotation={[0, 0, Math.PI / 4]}>
          <torusGeometry args={[7.5, 0.02, 8, 4]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? BLUE : CYAN}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}

function Particles({ paused }: { paused: boolean }) {
  const points = useRef<THREE.Points>(null);
  const COUNT = 700;
  const positions = useMemo(() => {
    let seed = 1337;
    const rand = () => {
      seed = (seed * 1664525 + 1013904223) % 4294967296;
      return seed / 4294967296;
    };
    const arr = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const r = 3 + rand() * 9;
      const a = rand() * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * r;
      arr[i * 3 + 1] = Math.sin(a) * r + 1.2;
      arr[i * 3 + 2] = -rand() * 80;
    }
    return arr;
  }, []);

  useFrame((_, delta) => {
    if (paused || !points.current) return;
    const pos = points.current.geometry.attributes.position;
    for (let i = 0; i < COUNT; i++) {
      let z = pos.getZ(i) + delta * 16;
      if (z > 4) z -= 80;
      pos.setZ(i, z);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={CYAN}
        size={0.05}
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function RailLines() {
  const rails = useMemo(() => {
    const make = (x: number, y: number) => {
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x, y, 4),
        new THREE.Vector3(x, y, -90),
      ]);
      return geo;
    };
    return [make(-1.1, -1.05), make(1.1, -1.05), make(-7, 4), make(7, 4)];
  }, []);
  return (
    <>
      {rails.map((geo, i) => (
        <line key={i}>
          <primitive object={geo} attach="geometry" />
          <lineBasicMaterial color={i < 2 ? CYAN : BLUE} transparent opacity={i < 2 ? 0.6 : 0.25} />
        </line>
      ))}
    </>
  );
}

function Coach({ z }: { z: number }) {
  return (
    <group position={[0, -0.45, z]}>
      <mesh>
        <boxGeometry args={[1.7, 1.1, 4.6]} />
        <meshStandardMaterial color="#101b30" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* glowing windows */}
      {[-1.55, -0.55, 0.55, 1.55].map((wz) => (
        <mesh key={`r${wz}`} position={[0.86, 0.12, wz]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.72, 0.4]} />
          <meshBasicMaterial color={LIME} side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
      ))}
      {[-1.55, -0.55, 0.55, 1.55].map((wz) => (
        <mesh key={`l${wz}`} position={[-0.86, 0.12, wz]} rotation={[0, Math.PI / 2, 0]}>
          <planeGeometry args={[0.72, 0.4]} />
          <meshBasicMaterial color={LIME} side={THREE.DoubleSide} transparent opacity={0.85} />
        </mesh>
      ))}
      {/* cyan roof line */}
      <mesh position={[0, 0.57, 0]}>
        <boxGeometry args={[1.72, 0.02, 4.62]} />
        <meshBasicMaterial color={CYAN} />
      </mesh>
    </group>
  );
}

function Train({ paused }: { paused: boolean }) {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (paused || !group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = -0.6 + Math.sin(t * 1.6) * 0.035;
    group.current.rotation.z = Math.sin(t * 0.9) * 0.008;
  });
  return (
    <group ref={group} position={[5.2, -0.6, -12]} rotation={[0, -0.4, 0]}>
      <Coach z={0} />
      <Coach z={-5} />
      <Coach z={-10} />
      {/* headlights */}
      {[-0.45, 0.45].map((x) => (
        <mesh key={x} position={[x, -0.75, 2.32]}>
          <sphereGeometry args={[0.07, 10, 10]} />
          <meshBasicMaterial color={CYAN} />
        </mesh>
      ))}
      <pointLight position={[0, 0.4, 3.4]} intensity={6} color={CYAN} distance={12} />
    </group>
  );
}

function Rig({ paused }: { paused: boolean }) {
  useFrame(({ camera, pointer, clock }) => {
    if (paused) return;
    const t = clock.getElapsedTime();
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.9 + Math.sin(t * 0.2) * 0.4, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 0.6 + pointer.y * 0.4, 0.04);
    camera.lookAt(2.2, -0.2, -16);
  });
  return null;
}

export default function MetroScene({ reduced = false }: { reduced?: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0">
      <Canvas
        dpr={[1, 1.5]}
        frameloop={reduced ? "demand" : "always"}
        camera={{ position: [0, 0.6, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#05070a", 14, 70]} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]} intensity={0.8} color={BLUE} />
        <TunnelRings paused={reduced} />
        <Particles paused={reduced} />
        <RailLines />
        <Train paused={reduced} />
        <Rig paused={reduced} />
      </Canvas>
    </div>
  );
}
