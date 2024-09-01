import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Home from "./page";

describe("Make sure card are acting as expected", () => {
    test("Check that the cards render properly with a question mark", () => {
        render(<Home />)
        const cards = screen.getAllByText("?")
        expect(cards.length).toBe(12)
    })

    test("Check that the cards render an image when clicked", () => {
        render(<Home />)

        const card = screen.getByTestId("card-0")
        let cardImage = screen.queryByTestId("card-image")
        expect(cardImage).toBe(null)

        fireEvent.click(card)
        cardImage = screen.queryByTestId("card-image")
        expect(cardImage).toBeInTheDocument()
    })

    test("Check that only two cards can be 'flipped' at the same time", () => {
        render(<Home />)
        const cards = screen.getAllByText("?")
        let cardImages = screen.queryAllByTestId("card-image")

        fireEvent.click(cards[0])
        fireEvent.click(cards[1])
        fireEvent.click(cards[2])

        cardImages = screen.queryAllByTestId("card-image")
        expect(cardImages.length).toBe(2)
    })

    test("Find a match by systematically clicking the first card with each other card", async () => {
        render(<Home />);

        const cards = screen.getAllByText("?");
        let matched = false;

        for (let i = 1; i < cards.length; i++) {
            fireEvent.click(cards[0]);

            fireEvent.click(cards[i]);

            await waitFor(() => {
                const visibleImages = screen.queryAllByTestId("card-image");
                if (visibleImages.length === 2) {
                    
                    const firstImage = visibleImages[0] as HTMLImageElement;
                    const secondImage = visibleImages[1] as HTMLImageElement;

                    if (firstImage.src === secondImage.src) {
                        matched = true;
                    }
                }
            }, { timeout: 1100 });

            if (matched) {
                break;
            }
        }

        expect(matched).toBe(true);
    });

})
