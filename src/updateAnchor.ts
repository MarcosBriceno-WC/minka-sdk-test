
import { sdk , myKeyPair}  from "./initialize.js"

const Change = 1

type AnchorRecord = {
    data: {
        handle: string;
        wallet: string;
        target: string;
        symbol?: string;
        custom: Record<string, unknown>;
        access: Array<Record<string, unknown>>;
        parent?: string;
    };
    meta: {
        status: string;
        proofs: Array<Record<string, unknown>>;
    };
    luid: string;
    hash: string;
};

async function updateAnchor(aliasHandle: string, newStatus: 'created' | 'blocked', reason?: string) {
    try {
        // Step 1: Retrieve the current record
        const record = (await sdk.anchor.read(aliasHandle)).response.data;

        // Step 2: Update the status
        const response = await sdk.anchor
            .from(record)
            .data({
                ...record.data
            })
            .meta({
                status: newStatus, // e.g., "SUSPENDED"
                proofs: []
            })
            .hash()
            .sign([{
                keyPair: myKeyPair,
                custom: {
                    status: newStatus,
                    moment: new Date().toISOString(),
                    ...(reason && { reason: reason }) // Optional reason code
                }
            }])
            .send();

        console.log('Alias updated successfully:', record.data);
        return record.data;
    } catch (error: any) {
        console.error('Error updating alias:', error.message);
        if (error.response?.status === 404) {
            throw new Error(`Alias not found: ${aliasHandle}`);
        }
        if (error.response?.status === 400) {
            throw new Error('Invalid status or data format');
        }
        if (error.response?.status === 401) {
            throw new Error('Authentication failed');
        }
        if (error.response?.status === 409) {
            throw new Error('Concurrent modification conflict');
        }
        throw error;
    }
}

// Execute the function
updateAnchor('acc1', 'blocked', 'SECURITY_AUDIT');