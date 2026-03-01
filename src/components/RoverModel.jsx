import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Environment, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════
   AUTONOMOUS NAVIGATION ROVER — Intricate 3D Model
   Built with procedural geometry for maximum detail
   ═══════════════════════════════════════════════════════ */

const BROWN = '#5C4A38'
const TAUPE = '#D4B896'
const PEACH = '#FEE0C6'
const DARK = '#2F281E'
const METAL = '#8b7d72'

function Wheel({ position, scale = 1 }) {
  const wheelRef = useRef()

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x += 0.01
    }
  })

  return (
    <group position={position} scale={scale}>
      <group ref={wheelRef} rotation={[0, 0, Math.PI / 2]}>
        {/* Main tire */}
        <mesh>
          <torusGeometry args={[0.32, 0.14, 16, 32]} />
          <meshStandardMaterial color="#2a2220" roughness={0.85} />
        </mesh>
        {/* Tire treads */}
        {Array.from({ length: 20 }).map((_, i) => {
          const angle = (i / 20) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.32, Math.sin(angle) * 0.32, 0]}
              rotation={[0, 0, angle]}>
              <boxGeometry args={[0.04, 0.06, 0.28]} />
              <meshStandardMaterial color="#1e1a16" roughness={0.9} />
            </mesh>
          )
        })}
        {/* Hub */}
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 6]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Hub center bolt */}
        <mesh>
          <cylinderGeometry args={[0.06, 0.06, 0.16, 16]} />
          <meshStandardMaterial color={TAUPE} metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Spokes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const angle = (i / 6) * Math.PI * 2
          return (
            <mesh key={`spoke-${i}`}
              position={[Math.cos(angle) * 0.13, Math.sin(angle) * 0.13, 0]}
              rotation={[0, 0, angle]}>
              <boxGeometry args={[0.12, 0.025, 0.06]} />
              <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.35} />
            </mesh>
          )
        })}
      </group>

      {/* Suspension arm */}
      <mesh position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.4} />
      </mesh>
      {/* Suspension spring */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={`spring-${i}`}
          position={[0.06 * Math.sin(i * 0.8), 0.08 + i * 0.05, 0.06 * Math.cos(i * 0.8)]}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color={PEACH} metalness={0.9} roughness={0.1} emissive={PEACH} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  )
}

function Chassis() {
  return (
    <group>
      {/* Main body - layered for depth */}
      <mesh position={[0, 0.52, 0]}>
        <boxGeometry args={[1.6, 0.18, 0.9]} />
        <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.5} />
      </mesh>
      {/* Top platform */}
      <mesh position={[0, 0.64, 0]}>
        <boxGeometry args={[1.4, 0.06, 0.8]} />
        <meshStandardMaterial color={BROWN} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Side panels */}
      {[-1, 1].map((side) => (
        <group key={`panel-${side}`}>
          <mesh position={[0, 0.52, side * 0.48]}>
            <boxGeometry args={[1.5, 0.22, 0.04]} />
            <meshStandardMaterial color={BROWN} metalness={0.35} roughness={0.45} />
          </mesh>
          {/* Panel accent lines */}
          {Array.from({ length: 4 }).map((_, i) => (
            <mesh key={i} position={[-0.5 + i * 0.33, 0.52, side * 0.505]}>
              <boxGeometry args={[0.22, 0.01, 0.01]} />
              <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={0.5} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Front bumper */}
      <mesh position={[0.82, 0.46, 0]}>
        <boxGeometry args={[0.06, 0.28, 0.85]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Rear bumper */}
      <mesh position={[-0.82, 0.46, 0]}>
        <boxGeometry args={[0.06, 0.28, 0.75]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* Undercarriage details */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.2, 0.04, 0.6]} />
        <meshStandardMaterial color="#1a150e" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Cross beams */}
      {[-0.4, 0, 0.4].map((x) => (
        <mesh key={x} position={[x, 0.42, 0]}>
          <boxGeometry args={[0.04, 0.06, 0.7]} />
          <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.4} />
        </mesh>
      ))}
    </group>
  )
}

function SensorArray() {
  const lidarRef = useRef()

  useFrame((state) => {
    if (lidarRef.current) {
      lidarRef.current.rotation.y += 0.03
    }
  })

  return (
    <group>
      {/* LIDAR tower */}
      <group position={[0, 0.82, 0]}>
        <mesh>
          <cylinderGeometry args={[0.06, 0.08, 0.14, 16]} />
          <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Spinning LIDAR head */}
        <group ref={lidarRef} position={[0, 0.12, 0]}>
          <mesh>
            <cylinderGeometry args={[0.1, 0.1, 0.08, 16]} />
            <meshStandardMaterial color={BROWN} metalness={0.6} roughness={0.3} transparent opacity={0.85} />
          </mesh>
          {/* LIDAR emitter ring */}
          <mesh position={[0, 0, 0]}>
            <torusGeometry args={[0.1, 0.008, 8, 32]} />
            <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={1} />
          </mesh>
          {/* Laser beams (visual) */}
          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i / 8) * Math.PI * 2
            return (
              <mesh key={i} position={[Math.cos(angle) * 0.15, 0, Math.sin(angle) * 0.15]}
                rotation={[0, -angle, Math.PI / 2]}>
                <cylinderGeometry args={[0.003, 0.003, 0.2, 4]} />
                <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={2} transparent opacity={0.4} />
              </mesh>
            )
          })}
        </group>
      </group>

      {/* Front ultrasonic sensors */}
      {[-0.25, 0, 0.25].map((z) => (
        <group key={z} position={[0.86, 0.52, z]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 12]} />
            <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.2} />
          </mesh>
          <mesh position={[0.02, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.025, 0.03, 0.015, 12]} />
            <meshStandardMaterial color="#1a150e" />
          </mesh>
        </group>
      ))}

      {/* Side IR sensors */}
      {[-1, 1].map((side) => (
        <group key={`ir-${side}`} position={[0.3, 0.52, side * 0.5]}>
          <mesh>
            <boxGeometry args={[0.06, 0.03, 0.03]} />
            <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.4} />
          </mesh>
          <mesh position={[0, 0, side * 0.02]}>
            <sphereGeometry args={[0.012, 8, 8]} />
            <meshStandardMaterial color="#ff3333" emissive="#ff3333" emissiveIntensity={1} />
          </mesh>
        </group>
      ))}
    </group>
  )
}

function Camera() {
  return (
    <group position={[0.55, 0.82, 0]}>
      {/* Camera mount */}
      <mesh position={[0, -0.08, 0]}>
        <boxGeometry args={[0.04, 0.14, 0.04]} />
        <meshStandardMaterial color={METAL} metalness={0.6} roughness={0.3} />
      </mesh>
      {/* Camera body */}
      <mesh>
        <boxGeometry args={[0.14, 0.1, 0.08]} />
        <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Lens */}
      <mesh position={[0.06, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.03, 0.035, 0.06, 16]} />
        <meshStandardMaterial color="#111" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Lens glass */}
      <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.005, 16]} />
        <meshStandardMaterial color="#223" metalness={0.9} roughness={0.05} />
      </mesh>
      {/* Status LED */}
      <mesh position={[0.04, 0.055, 0.03]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial color="#00ff44" emissive="#00ff44" emissiveIntensity={2} />
      </mesh>
    </group>
  )
}

function Antenna() {
  return (
    <group position={[-0.45, 0.68, 0.25]}>
      {/* Base */}
      <mesh>
        <cylinderGeometry args={[0.04, 0.04, 0.04, 8]} />
        <meshStandardMaterial color={DARK} metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Mast sections */}
      {Array.from({ length: 4 }).map((_, i) => (
        <mesh key={i} position={[0, 0.06 + i * 0.1, 0]}>
          <cylinderGeometry args={[0.008 - i * 0.001, 0.01 - i * 0.001, 0.1, 6]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.2} />
        </mesh>
      ))}
      {/* Antenna tip */}
      <mesh position={[0, 0.48, 0]}>
        <sphereGeometry args={[0.015, 8, 8]} />
        <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={1.5} />
      </mesh>
      {/* Signal rings (decorative) */}
      {[0, 1, 2].map((i) => (
        <mesh key={`ring-${i}`} position={[0, 0.48, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.04 + i * 0.03, 0.002, 4, 24]} />
          <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={0.6} transparent opacity={0.3 - i * 0.08} />
        </mesh>
      ))}
    </group>
  )
}

function SolarPanel() {
  return (
    <group position={[-0.15, 0.72, 0]} rotation={[0.15, 0, 0]}>
      {/* Panel frame */}
      <mesh>
        <boxGeometry args={[0.65, 0.02, 0.5]} />
        <meshStandardMaterial color={METAL} metalness={0.5} roughness={0.35} />
      </mesh>
      {/* Solar cells grid */}
      {Array.from({ length: 3 }).map((_, row) =>
        Array.from({ length: 4 }).map((_, col) => (
          <mesh key={`cell-${row}-${col}`}
            position={[-0.22 + col * 0.15, 0.012, -0.15 + row * 0.15]}>
            <boxGeometry args={[0.12, 0.005, 0.12]} />
            <meshStandardMaterial color="#1a1a3a" metalness={0.8} roughness={0.15} />
          </mesh>
        ))
      )}
      {/* Cell grid lines */}
      {Array.from({ length: 5 }).map((_, i) => (
        <mesh key={`hline-${i}`} position={[-0.22 + i * 0.15 - 0.075, 0.015, 0]}>
          <boxGeometry args={[0.002, 0.002, 0.5]} />
          <meshStandardMaterial color="#444488" emissive="#444488" emissiveIntensity={0.3} />
        </mesh>
      ))}
      {/* Mount */}
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[0.04, 0.06, 0.04]} />
        <meshStandardMaterial color={DARK} metalness={0.4} roughness={0.4} />
      </mesh>
    </group>
  )
}

function ComputeModule() {
  return (
    <group position={[-0.35, 0.72, -0.12]}>
      {/* PCB board */}
      <mesh>
        <boxGeometry args={[0.3, 0.04, 0.22]} />
        <meshStandardMaterial color="#0a3a0a" metalness={0.3} roughness={0.6} />
      </mesh>
      {/* Heat sink */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[0, 0.035, -0.08 + i * 0.028]}>
          <boxGeometry args={[0.12, 0.03, 0.004]} />
          <meshStandardMaterial color={METAL} metalness={0.7} roughness={0.25} />
        </mesh>
      ))}
      {/* Chips */}
      <mesh position={[0.08, 0.025, 0.04]}>
        <boxGeometry args={[0.06, 0.01, 0.06]} />
        <meshStandardMaterial color="#111" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Status LEDs */}
      {[0, 1, 2].map((i) => (
        <mesh key={`led-${i}`} position={[-0.1, 0.025, -0.06 + i * 0.03]}>
          <sphereGeometry args={[0.006, 6, 6]} />
          <meshStandardMaterial
            color={i === 0 ? '#00ff44' : i === 1 ? PEACH : '#ff4444'}
            emissive={i === 0 ? '#00ff44' : i === 1 ? PEACH : '#ff4444'}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  )
}

function GlowRing() {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * 0.2
      ref.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime) * 0.05
    }
  })

  return (
    <mesh ref={ref} position={[0, 0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[1.8, 0.005, 4, 64]} />
      <meshStandardMaterial color={PEACH} emissive={PEACH} emissiveIntensity={1} transparent opacity={0.15} />
    </mesh>
  )
}

function GroundGrid() {
  const gridPoints = useMemo(() => {
    const pts = []
    for (let i = -3; i <= 3; i += 0.5) {
      for (let j = -3; j <= 3; j += 0.5) {
        const dist = Math.sqrt(i * i + j * j)
        if (dist < 3) {
          pts.push([i, 0, j, dist])
        }
      }
    }
    return pts
  }, [])

  return (
    <group position={[0, -0.05, 0]}>
      {gridPoints.map(([x, y, z, dist], i) => (
        <mesh key={i} position={[x, y, z]}>
          <circleGeometry args={[0.02, 6]} />
          <meshStandardMaterial
            color={BROWN}
            emissive={BROWN}
            emissiveIntensity={0.4}
            transparent
            opacity={Math.max(0, 0.3 - dist * 0.08)}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  )
}

function RoverAssembly() {
  const groupRef = useRef()

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.03
    }
  })

  return (
    <Float speed={0.6} rotationIntensity={0.1} floatIntensity={0.2}>
      <group ref={groupRef} scale={1.4}>
        <Chassis />
        <SensorArray />
        <Camera />
        <Antenna />
        <SolarPanel />
        <ComputeModule />

        {/* Wheels - FR, FL, BR, BL */}
        <Wheel position={[0.55, 0.15, 0.58]} />
        <Wheel position={[0.55, 0.15, -0.58]} />
        <Wheel position={[-0.55, 0.15, 0.58]} />
        <Wheel position={[-0.55, 0.15, -0.58]} />

        {/* Headlights */}
        <mesh position={[0.86, 0.57, 0.3]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>
        <mesh position={[0.86, 0.57, -0.3]}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
        </mesh>

        {/* Tail lights */}
        <mesh position={[-0.86, 0.5, 0.28]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[-0.86, 0.5, -0.28]}>
          <sphereGeometry args={[0.02, 8, 8]} />
          <meshStandardMaterial color="#ff2200" emissive="#ff2200" emissiveIntensity={1.5} />
        </mesh>

        <GlowRing />
        <GroundGrid />
      </group>
    </Float>
  )
}

export default function RoverModel() {
  return (
    <div className="rover-canvas-wrapper">
      <Canvas
        camera={{ position: [3.5, 2.5, 3.5], fov: 35 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#FEE0C6" />
        <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#D4B896" />
        <pointLight position={[0, 3, 0]} intensity={0.5} color="#FEE0C6" />
        <pointLight position={[2, 1, 0]} intensity={0.3} color="#5C4A38" />

        <RoverAssembly />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.8}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2.2}
        />

        <Environment preset="night" />
        <fog attach="fog" args={['#2F281E', 6, 14]} />
      </Canvas>

      <style>{`
        .rover-canvas-wrapper {
          width: 100%;
          height: 500px;
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }
        .rover-canvas-wrapper canvas {
          cursor: grab;
        }
        .rover-canvas-wrapper canvas:active {
          cursor: grabbing;
        }
        @media (max-width: 768px) {
          .rover-canvas-wrapper {
            height: 350px;
          }
        }
      `}</style>
    </div>
  )
}
