import React, { useEffect, useRef } from "react";
import { angleToRadians } from "../lib/angle";
import {
	Environment,
	OrbitControls,
	PerspectiveCamera,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import * as THREE from "three";
import gsap from "gsap";

const Three = () => {
	// Code to move the camera around
	const orbitControlsRef = useRef<OrbitControlsImpl>(null);
	useFrame((state) => {
		if (orbitControlsRef.current) {
			const { x, y } = state.mouse;
			// 방위각 설정
			orbitControlsRef.current.setAzimuthalAngle(-x * angleToRadians(45));
			// 극각 설정
			orbitControlsRef.current.setPolarAngle((y + 0.5) * angleToRadians(60));
			// 수동으로 설정하는 것이기 때문에 업데이트 해줘야 함
			orbitControlsRef.current.update();
		}
	});

	// Animation
	const ballRef = useRef<THREE.Mesh>(null);
	useEffect(() => {
		if (!ballRef.current) return;
		console.log(ballRef.current);

		// Timeline
		const timeline = gsap.timeline({ paused: true });

		// x-axis motion
		timeline.to(ballRef.current.position, {
			x: 1,
			duration: 2,
			ease: "power2.out",
		});

		// y-axis motion
		timeline.to(
			ballRef.current.position,
			{
				y: 0.5,
				duration: 1.5,
				ease: "bounce.out",
			},
			"<"
		);

		// const coefficient = 0.8;
		// for (let i = 1; i <= 4; i++) {
		// 	// Going up
		// 	timeline.to(
		// 		ballRef.current.position,
		// 		{
		// 			y: Math.pow(coefficient, i) * 1.5,
		// 			duration: 0.2,
		// 			ease: "power.out",
		// 		},
		// 		">"
		// 	);

		// 	// Coming back down
		// 	timeline.to(
		// 		ballRef.current.position,
		// 		{
		// 			y: 0.5,
		// 			duration: 0.3,
		// 			ease: "power.in",
		// 		},
		// 		">"
		// 	);
		// }

		//Play
		timeline.play();

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ballRef.current]);

	return (
		<>
			{/* 원근 카메라 */}
			<PerspectiveCamera makeDefault position={[0, 1, 5]} />
			{/* 궤도 제어 */}
			<OrbitControls
				ref={orbitControlsRef}
				minPolarAngle={angleToRadians(40)}
				maxPolarAngle={angleToRadians(80)}
			/>

			{/* Ball */}
			<mesh position={[-2, 1.5, 0]} castShadow ref={ballRef}>
				<sphereGeometry args={[0.5, 32, 32]} />
				{/* metalness 속성을 증가시키면 금속처럼 보임 */}
				<meshStandardMaterial color="#ffffff" metalness={0.6} roughness={0.2} />
			</mesh>

			{/* Floor */}
			<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
				<planeGeometry args={[20, 20]} />
				<meshStandardMaterial color="#1ea3d8" />
			</mesh>

			{/* Light */}
			{/* 주변광 */}
			<ambientLight args={["#ffffff", 0.25]} />
			{/* 방향성 조명 */}
			{/* <directionalLight args={["#ffffff", 1]} position={[-3, 1, 0]} /> */}
			{/* 스포트라이트 */}
			<spotLight
				args={["#ffffff", 10, 7, angleToRadians(45), 0.4]}
				position={[-3, 1, 0]}
				castShadow
			/>

			{/* Environment */}
			<Environment background>
				<mesh>
					<sphereGeometry args={[50, 100, 100]} />
					{/* 구의 내부를 보려면 BackSide를 활성화해야 함 */}
					<meshBasicMaterial color="#bcd681" side={THREE.BackSide} />
				</mesh>
			</Environment>
		</>
	);
};

export default Three;
