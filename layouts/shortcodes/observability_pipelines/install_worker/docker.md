1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    docker run -i -e DD_API_KEY=<datadog_api_key> \
        -e DD_OP_PIPELINE_ID=<pipeline_id> \
        -e DD_SITE=<datadog_site> \
        -e <source_env_variable> \
        -e <destination_env_variable> \
        -p 8088:8088 \
        datadog/observability-pipelines-worker run
    ```   
    **Note**: By default, the `docker run` command exposes the same port the Worker is listening on. If you want to map the Worker’s container port to a different port on the Docker host, use the `-p | --publish` option in the command: 
    ```
    -p 8282:8088 datadog/observability-pipelines-worker run
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.
