const Total = (props: { parts: { name: string; exerciseCount: number }[] }) => {
	return (
		<p>
			Number of exercises{" "}
			{props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
		</p>
	);
};

export default Total;