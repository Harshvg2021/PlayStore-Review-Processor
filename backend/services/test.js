import { classifyReview } from "./reviewService";

async function testClassification() {
    const testReviews = [
        "The app keeps crashing every time I try to open it",
        "Great game, love the graphics and gameplay!",
        "There's a bug where my progress doesn't save",
        "This update made everything worse, please fix it",
        "Amazing work by the developers, best game ever!"
    ];

    console.log("Testing review classification...\n");

    for (const review of testReviews) {
        const category = await classifyReview(review);
        console.log(`Review: "${review}"\nClassified as: ${category}\n`);
    }
}

testClassification().catch(console.error);