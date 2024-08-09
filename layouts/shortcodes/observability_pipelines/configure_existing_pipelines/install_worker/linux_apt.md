
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the one-step command provided in the UI to re-install the Worker:
    ```shell
    DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINES_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLES> <DESTINATION_ENV_VARIABLES> bash -c "$(curl -L https://install.datadoghq.com/scripts/install_script_op_worker2.sh)"
    ```

If you prefer not to use the one-line installation script, follow these step-by-step instructions:
1. Run the following commands to update your local `apt` repo and install the latest Worker version:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Add your keys, site (for example `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Restart the worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Click **Navigate Back** to go back to the Observability Pipelines edit pipeline page.
1. Click **Deploy Changes**.