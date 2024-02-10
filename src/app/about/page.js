export default function About() {
	return (
		<main className="grid auto-rows-auto mx-5">
			<div className="inline-flex w-full">
				<h1 className="text-5xl text-center w-full font-bold italic">About Us</h1>
			</div>
			<div className="grid grid-rows-subgrid gap-3 row-span-3 justify-self-center max-w-2/3">
				<div>
					<p className="text-lg underline">Features:</p>
				</div>
				<div>
					<p>
						Fleet Ease is a complete vehicle fleet management system, allowing easy
						use for companies of any size.
					</p>
				</div>
				<div>
					<ol className="list-decimal list-inside ps-3">
						<li>Vehicle information management</li>
						<li>Vehicle maintenance storage</li>
						<li>
							Scheduling
							<ol className="list-decimal list-inside ps-3 text-sm">
								<li>Single driver scheduling</li>
								<li>Block driver scheduling</li>
							</ol>
						</li>
					</ol>
				</div>
			</div>
		</main>
	);
}
