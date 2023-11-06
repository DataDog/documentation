### Remote configuration

1. Navigate to [Observability Pipelines][101].
1. Click **Add New Pipeline**.
1. Enter a name for the pipeline.
1. Click **Next**.
1. Select the **Splunk** tile.
1. Select the **Docker** tile.
1. Select a remote configuration enabled API key.
1. Run the Docker command provided in the UI or run the following command to start the Observability Pipelines Worker with Docker:
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
    - Replace `<API_KEY>` with your Datadog API key if you are not using the command provided in the UI.
    - Replace `<PIPELINES_ID>` with your Observability Pipelines configuration ID.
    - Replace `<SITE>` with the [Datadog site parameter][102]. 
    - Replace `SPLUNK_HEC_ENDPOINT` and `SPLUNK_TOKEN` with values that match the Splunk deployment you created in [Set up the Splunk Index](#set-up-the-splunk-index). 
    - Any ports that your configuration uses must be manually specified. Use `-p <PORT>:<PORT>` to forward them from the local host to the Docker container. The sample command given above opens the default Splunk HEC port.
1. Click **Deploy**.

[101]: https://app.datadoghq.com/observability-pipelines
[102]: /getting_started/site/#access-the-datadog-site