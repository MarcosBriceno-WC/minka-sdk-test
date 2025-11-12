import { LedgerSdk } from '@minka/ledger-sdk';

// This is the ledger's public key, used to verify responses.

const sdk = new LedgerSdk({
    ledger: 'writechoice-laas',
    server: 'https://writechoice-laas.ldg-stg.one/api/v2',
    secure: {
        iss: 'marcos@writechoice.io',         // Your signer handle or public key
        sub: 'signer:marcos@writechoice.io',       // e.g., 'signer:my-app'
        aud: 'writechoice-laas',     // The ledger handle or public key
        exp: 3600,                     // Token expiration in seconds (e.g., 1 hour)
        keyPair: {
            format: 'ed25519-raw',
            public: 'OOKjXsnfj0yRBQHlSodIoVT4FaClNFDu9FKNJQ8oVCk=',
            secret: 'wwtGwFB+FSwh9LVWPSjKPobG03uZJ3/KR12PWvk4sQs=',
        }       // The key pair from Step 2
    },
});

export default sdk

