1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
        -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
        -e DD_SITE=<DATADOG_SITE> \
        -e <SOURCE_ENV_VARIABLE> \
        -e <DESINATION_ENV_VARIABLE> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```
    **Note**: By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker's container port to a different port on the Docker host, use the `-p | --publish` option:
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Click **Navigate Back** to go back to the Observability Pipelines edit pipeline page.
1. Click **Deploy Changes**.