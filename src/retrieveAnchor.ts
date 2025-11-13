
import { sdk , myKeyPair} from "./initialize.js"

type AnchorRecord = {
        hash: string;
        luid: string;
        data: Record<string, unknown>;
        meta: Record<string, unknown>;
    };

    async function getAnchor(aliasHandle: string): Promise<AnchorRecord> {
        try {
            const anchorResponse = (await sdk.anchor.read(aliasHandle)).response.data as AnchorRecord;

            console.log('Retrieved anchor details:', JSON.stringify(anchorResponse, null, 4));
            return anchorResponse;
        } catch (error: any) {
            console.error('Error retrieving alias:', error.message);
            // Handle specific error cases:
            // - 404: Alias not found
            // - 401: Authentication failed
            throw error;
        }
    }

getAnchor('writechoice1');