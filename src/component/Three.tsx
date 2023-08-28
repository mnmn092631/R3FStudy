import React, { useRef } from "react";
import { angleToRadians } from "../lib/angle";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const Three = () => {
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

	// useEffect(() => {
	// 	if (orbitControlsRef.current) {
	// 		console.log(orbitControlsRef.current);
	// 	}
	// }, [orbitControlsRef.current]);

	return (
		<>
			{/* 원근 카메라 */}
			<PerspectiveCamera makeDefault position={[0, 1, 5]} />
			{/* 궤도 제어 */}
			<OrbitControls
				ref={orbitControlsRef}
				minPolarAngle={angleToRadians(40)}
				maxPolarAngle={angleToRadians(60)}
			/>

			{/* Ball */}
			<mesh position={[0, 0.5, 0]} castShadow>
				<sphereGeometry args={[0.5, 32, 32]} />
				<meshStandardMaterial color="#ffffff" />
			</mesh>

			{/* Floor */}
			<mesh rotation={[-angleToRadians(90), 0, 0]} receiveShadow>
				<planeGeometry args={[7, 7]} />
				<meshPhongMaterial color="#b7e2f3" />
			</mesh>

			{/* Light */}
			{/* 주변광 */}
			<ambientLight args={["#ffffff", 0.25]} />
			{/* 방향성 조명 */}
			{/* <directionalLight args={["#ffffff", 1]} position={[-3, 1, 0]} /> */}
			{/* 스포트라이트 */}
			<spotLight
				args={["#ffffff", 1.5, 7, angleToRadians(45), 0.4]}
				position={[-3, 1, 0]}
				castShadow
			/>
		</>
	);
};

export default Three;
