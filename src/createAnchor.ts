        const anchorData = {
            handle: "111222333", // e.g., "tel:+15551234567"
            wallet: "writechoice1", // e.g., "wallet:primary"
            target: "svgs:12345@mybank.io", // e.g., "svgs:12345@mybank.io"
            custom: {
                aliasType: "normal",
                documentType: "id",
                documentNumber: "<document-number>",
                accountType: "999999",
                accountNumber: "12345",
                firstName: "John",
                lastName: "Doe",
                entityType: "individual", // Use "business" for organizations
            },
            access: [
                { action: "any", signer: { $record: "owner" } }
            ],
            schema: "person" // Use "business" for organizations
        };

    async function createAnchor() {
        try {
            const response = await sdk.anchor
                .init()
                .data(anchorData)
                .meta({
                    labels: ["nidn:<document-number>"], // e.g., "nidn:0801198607268"
                    proofs: []
                })
                .hash()
                .sign([{
                    keyPair, // From your SDK configuration
                    custom: {
                        status: "ACTIVE"
                    }
                }])
                .send();

            console.log('Alias created successfully:', response.data);
            return response.data;
        } catch (error) {
            console.error('Error creating alias:', error.message);
            // Handle specific error cases:
            // - 400: Invalid data format
            // - 409: Alias already exists
            // - 401: Authentication failed
            throw error;
        }
    }

    // Execute the function
    createAnchor();

