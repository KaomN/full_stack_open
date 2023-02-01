import { CoursePart } from "../types";

const Part = ({ part }: { part: CoursePart }) => {

	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandled discriminated union member: ${JSON.stringify(value)}`
		);
	};

	switch (part.type) {
		case "normal":
			return (
				<>
					<div>
						<i>{part.description}</i>
					</div>
					<br/>
				</>
			);
		case "groupProject":
			return (
				<>
					<div>
						{ "project exercises " + part.groupProjectCount}
					</div>
					<br/>
				</>
			);
		case "submission":
			return (
				<>
					<div>
						<i>{part.description}</i>
						<br/>
						{ "submit to " + part.exerciseSubmissionLink}
					</div>
					<br/>
				</>
			);
		case "special":
			return (
				<>
					<div>
						<i>{part.description}</i>
						<br/>
						{ "required skills: " + part.requirements.join(", ")}
					</div>
				</>
			);
		default:
			return assertNever(part);
	}
};

export default Part;