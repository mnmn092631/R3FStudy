import React from "react";

const Three = () => {
	return (
		<>
			{/* Ball */}
			<mesh>
				<sphereGeometry args={[1, 32, 32]} />
				<meshStandardMaterial color="#fff" />
			</mesh>

			<ambientLight args={["#fff", 1]} />
		</>
	);
};

export default Three;
