## Install the Observability Pipelines Worker
1. Run the following commands to set up the Datadog `rpm` repo on your system:

    ```
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-1/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
           https://keys.datadoghq.com/DATADOG_RPM_KEY_FD4BF915.public
    EOF
    ```

   **Note:** If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration above.

2. Update your packages and install the Worker:

    ```
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```

3. Add your Datadog API key, pipeline ID, [Datadog site parameter][101], and Splunk URL and token to the Worker's environment variables. The Splunk URL and token are from the Splunk deployment you created in [Set up the Splunk Index](#set-up-the-splunk-index.

    ```
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    SPLUNK_HEC_ENDPOINT=<SPLUNK_URL>
    SPLUNK_TOKEN=<SPLUNK_TOKEN>
    EOF
    ```

4. Download the [sample configuration file][102] to `/etc/observability-pipelines-worker/pipeline.yaml` on the host.

5. Start the worker:
    ```
    sudo systemctl restart observability-pipelines-worker
    ```

[101]: /getting_started/site/#access-the-datadog-site
[102]: /resources/yaml/observability_pipelines/splunk/pipeline.yaml
