1. Download the [Helm chart values file][4001].
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Update the Datadog Helm chart to the latest version:
    ```shell
    helm repo update
    ```
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    helm upgrade --install opw \
    -f values.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    --set <SOURCE_ENV_VARIABLES> \
    --set <DESTINATION_ENV_VARIABLES> \
    datadog/observability-pipelines-worker
    ```
1. Click **Navigate Back** to go back to the Observability Pipelines edit pipeline page.
1. Click **Deploy Changes**.

[4001]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
