1. Run the following commands to set up APT to download through HTTPS:
    ```
    sudo apt-get update
    sudo apt-get install apt-transport-https curl gnupg
    ```
2. Run the following commands to set up the Datadog `deb` repo on your system and create a Datadog archive keyring:
    ```
    sudo sh -c "echo 'deb [signed-by=/usr/share/keyrings/datadog-archive-keyring.gpg] https://apt.datadoghq.com/ stable observability-pipelines-worker-1' > /etc/apt/sources.list.d/datadog-observability-pipelines-worker.list"
    sudo touch /usr/share/keyrings/datadog-archive-keyring.gpg
    sudo chmod a+r /usr/share/keyrings/datadog-archive-keyring.gpg
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_CURRENT.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_F14F620E.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    curl https://keys.datadoghq.com/DATADOG_APT_KEY_C0962C7D.public | sudo gpg --no-default-keyring --keyring /usr/share/keyrings/datadog-archive-keyring.gpg --import --batch
    ```
3. Run the following commands to update your local `apt` repo and install the Worker:
    ```
    sudo apt-get update
    sudo apt-get install observability-pipelines-worker datadog-signing-keys
    ```
4. Add your Datadog API key, pipeline ID, [Datadog site parameter][101], and Splunk URL and token to the Worker's environment variables. The Splunk URL and token are from the Splunk deployment you created in [Set up the Splunk Index](#set-up-the-splunk-index).

    For manual configuration:
    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```
    Also, download the [sample configuration file][102] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

    For Remote Configuration:
    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    DD_OP_REMOTE_CONFIGURATION_ENABLED=true
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker

[101]: /getting_started/site/#access-the-datadog-site
[102]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml

