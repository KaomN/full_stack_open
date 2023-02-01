import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ parts }: { parts: CoursePart[] }) => {
	return (
		<>
			{parts.map((part) => (
				<div key={part.name}>
					<b>{part.name + " " + part.exerciseCount}</b>
					<Part part={part} />
				</div>
			))}
		</>
	);
};

export default Content;