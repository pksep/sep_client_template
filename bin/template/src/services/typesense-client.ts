// typesense-client.ts
import Typesense from 'typesense';
import {
  TYPESENSE_URL,
  TYPESENSE_API_KEY,
  TYPESENSE_TIMEOUT_SECONDS
} from '@/utils/path';
import { ActionEntityTypes } from '@pksep/zod-shared';

export interface IGlobalSearchSchema {
  id: string;
  type: ActionEntityTypes;
  name: string;
  ban: boolean;
  designation?: string;
  articl?: string;
  child_id?: string;
}

let client = null;

try {
  client = new Typesense.Client({
    nodes: [
      {
        url: TYPESENSE_URL
      }
    ],
    apiKey: TYPESENSE_API_KEY, // Search-only API key
    connectionTimeoutSeconds: TYPESENSE_TIMEOUT_SECONDS
  });
} catch (error) {
  console.error('❌ Failed to initialize Typesense client:', error);
}

export { client };
