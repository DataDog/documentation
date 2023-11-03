### Manual configuration

The Observability Pipelines Worker Docker image is published to Docker Hub [here][101].

1. Download the [sample pipeline configuration file][102].

2. Run the following command to start the Observability Pipelines Worker with Docker:
    ```
    docker run -i -e DD_API_KEY=<API_KEY> \
      -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
      -e DD_SITE=<SITE> \
      -e SPLUNK_HEC_ENDPOINT=<SPLUNK_URL> \
      -e SPLUNK_TOKEN=<SPLUNK_TOKEN> \
      -p 8088:8088 \
      -v ./pipeline.yaml:/etc/observability-pipelines-worker/pipeline.yaml:ro \
      datadog/observability-pipelines-worker run
    ```
    - Replace `<API_KEY>` with your Datadog API key.
    - Replace `<PIPELINES_ID>` with your Observability Pipelines configuration ID.
    - Replace `<SITE>` with the [Datadog site parameter][103]. 
    - Replace `SPLUNK_HEC_ENDPOINT` and `SPLUNK_TOKEN` with values that match the Splunk deployment you created in [Set up the Splunk Index](#set-up-the-splunk-index). 
    - `./pipeline.yaml` must be the relative or absolute path to the configuration you downloaded in step 1.

[101]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[102]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
[103]: /getting_started/site/#access-the-datadog-site

