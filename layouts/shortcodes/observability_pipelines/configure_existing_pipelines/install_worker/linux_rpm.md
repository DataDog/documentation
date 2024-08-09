1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the one-step command provided in the UI to re-install the Worker.

    **Note**: If you want to update the environment variables, you need to update them in the `/etc/default/observability-pipelines-worker` file, and then restart the Worker. Running the one-step command does not update the environment variables in that file.

If you prefer not to use the one-line installation script, follow these step-by-step instructions:
1. Update your packages and install the latest version of Worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Add your keys, site (for example `datadoghq.com` for US1), source, and destination updated environment variables to the Worker's environment file:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
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