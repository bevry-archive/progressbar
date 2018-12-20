import ProgressBar from "../";

const progress = ProgressBar.create().step("the task you are currently performing");

// use an array of steps that execute one second after each other
// as if we do them all instantly
// you won't see the progress bar as it will be instant
const steps = [
	() => progress.setTotal(5),
	() => progress.setTick(1),
	() => progress.setTick(2),
	() => progress.setTick(3),
	() => progress.addTick(),
	() => progress.addTick(),
	() => progress.finish(),  // remove and destroy the progress bar
];

steps.forEach((step, index) => {
	setTimeout(step, index * 1000);
});
