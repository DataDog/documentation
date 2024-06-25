1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the one-step command provided in the UI to install the Worker:
    ```shell
    DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> <SOURCE_ENV_VARIABLES> <DESTINATION_ENV_VARIABLES> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker2.sh)"
    ```

If you prefer not to use the one-line installation script, follow these step-by-step instructions:
1. Set up APT transport for downloading using HTTPS:
    ```shell
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
1. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:
    ```shell
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-2' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_06462314.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
1. Run the following commands to update your local `apt` repo and install the Worker:
    ```shell
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<DATADOG_API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<DATADOG_SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

See [Update Existing Pipelines][9001] if you want to make changes to your pipeline's configuration.

[9001]: /observability_pipelines/update_existing_pipelines
