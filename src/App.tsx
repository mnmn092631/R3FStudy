import "./App.css";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Html } from "@react-three/drei";
import Three from "./component/Three";

function App() {
	return (
		// Canvas의 id는 스타일을 지정하기 위한 것
		<Canvas id="three-canvas-container">
			{/* Suspense : 렌더링이 준비되지 않은 컴포넌트가 있을 때 fallback을 보여주고 로딩이 완료되면 해당 컴포넌트를 보여줌 */}
			<Suspense
				fallback={
					<Html>
						<div>TEXT</div>
					</Html>
				}
			>
				<Three />
			</Suspense>
		</Canvas>
	);
}

export default App;
