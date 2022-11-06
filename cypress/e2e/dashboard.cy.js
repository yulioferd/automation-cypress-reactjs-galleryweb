describe("Dashboard Page Test Cases", () => {
    it("Do login with correct value", () =>{
        cy.visit('http://localhost:3000');
        const email = cy.get("input[name='email']");
        email.type("user@react.test");

        const password = cy.get("input[name='password']");
        password.type("password");

        const button = cy.get("button");
        button.click();

        cy.on("window:alert",(text) => {
            expect(text).to.contains("welcome");
        });

        cy.url().should('eq','http://localhost:3000/dashboard');
    });

    it("Found no post for the first time", () => {
        cy.contains("Found 0 photos")

    });

    it("Contains Images url and description input, and publish button", () => {
        const image = cy.get("input[name='image']");
        image.should("be.visible");
        image.should("have.attr","type","url");
        image.should("have.attr","required","required");
        image.should("have.attr","placeholder","Image URL");

        const description = cy.get("input[name='desc']");
        description.should("be.visible");
        description.should("have.attr","type","text");
        description.should("have.attr","required","required");
        description.should("have.attr","placeholder","What's on your mind?");

        const button = cy.get("button");
        button.should("be.visible");
        button.contains("Publish!");
        button.should("have.css","background-color","rgb(79, 70, 229)");
        button.should("have.css","color","rgb(255, 255, 255)");
    });

    it('Upload some photos', () => {
        const photos = [
            {
                imageValue: "https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?w=2000",
                descriptionValue: "Image 1 : Wallpaper",
            },
            {
                imageValue: "https://www.teahub.io/photos/full/295-2955135_stitch-walpaper.jpg",
                descriptionValue: "Image 2 : Wallpaper",
            }
        ];
        photos.forEach(({imageValue, descriptionValue}) => {
            const image = cy.get("input[name='image']");
            image.type(imageValue);

            const description = cy.get("input[name='desc']");
            description.type(descriptionValue);

            const button = cy.get("button");
            button.click();

            cy.get("img").should('have.attr', 'src', imageValue);
            cy.contains(descriptionValue);
        });
        cy.contains(`Found ${photos.length} photos`);
    });
});