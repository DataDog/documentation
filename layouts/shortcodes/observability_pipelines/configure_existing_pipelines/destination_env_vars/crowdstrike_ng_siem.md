- CrowdStrike HEC ingestion URL:
     - **Note**: Do **not** include the suffix `/services/collector` in the URL. The URL must follow this format: `https://<your_instance_id>.ingest.us-1.crowdstrike.com`. 
     - Stored in the environment variable `DD_OP_DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_ENDPOINT_URL`.

- CrowdStrike HEC API token:
    - Stored in the environment variable `DD_OP_DESTINATION_CROWDSTRIKE_NEXT_GEN_SIEM_TOKEN`.