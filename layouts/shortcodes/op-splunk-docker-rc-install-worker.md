### Remote configuration

1. Run the following command to start the Observability Pipelines Worker with Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
    -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
    -e DD_SITE=<SITE> \
    -e DD_OP_REMOTE_CONFIGURATION_ENABLED=true \
    -e SPLUNK_HEC_ENDPOINT=<SPLUNK_URL> \
    -e SPLUNK_TOKEN=<SPLUNK_TOKEN> \
    -p 8088:8088 \
    datadog/observability-pipelines-worker run
    ```
    - Replace `<API_KEY>` with your Datadog API key.
    - Replace `<PIPELINES_ID>` with your Observability Pipelines configuration ID.
    - Replace `<SITE>` with the [Datadog site parameter][101]. 
    - Replace `SPLUNK_HEC_ENDPOINT` and `SPLUNK_TOKEN` with values that match the Splunk deployment you created in [Set up the Splunk Index](#set-up-the-splunk-index). 
    - Any ports that your configuration uses must be manually specified. Use `-p <PORT>:<PORT>` to forward them from the local host to the Docker container. The sample command given above opens the default Splunk HEC port.
2. Click **Deploy and View Pipelines**.
3. In the **Installation and Deployment Overview**, review the pipeline configuration.
4. Click **Deploy**.

[101]: /getting_started/site/#access-the-datadog-site