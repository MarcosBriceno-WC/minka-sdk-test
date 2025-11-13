

import { sdk , myKeyPair}  from "./initialize.js"

async function createAnchor() {
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
};

  await sdk.anchor
    .init()
    .data(anchorData)
    .meta({
      labels: ["nidn:0801198607268"],
      proofs: []
    })
    .hash()
    .sign([{
      keyPair: myKeyPair,
      custom: {
        status:"created"
      }
    }])
    .send();
}


// Execute the function
createAnchor();

