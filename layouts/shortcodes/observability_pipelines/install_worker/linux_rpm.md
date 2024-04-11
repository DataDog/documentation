1. Click **Select API key** to choose the Datadog API key you want to use.
1. Run the one-step command provided in the UI to install the Worker:
    ```shell
    DD_API_KEY=<DATADOG_API_KEY> DD_OP_PIPELINE_ID=<PIPELINE_ID> DD_SITE=<DATADOG_SITE> bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_op_worker2.sh)"
    ```

If you prefer not to use the one-line installation script, follow these step-by-step instructions:
1. Set up the Datadog `rpm` repo on your system with the below command. **Note**: If you are running RHEL 8.1 or CentOS 8.1, use `repo_gpgcheck=0` instead of `repo_gpgcheck=1` in the configuration below.
    ```shell
    cat <<EOF > /etc/yum.repos.d/datadog-observability-pipelines-worker.repo
    [observability-pipelines-worker]
    name = Observability Pipelines Worker
    baseurl = https://yum.datadoghq.com/stable/observability-pipelines-worker-2/\$basearch/
    enabled=1
    gpgcheck=1
    repo_gpgcheck=1
    gpgkey=https://keys.datadoghq.com/DATADOG_RPM_KEY_CURRENT.public
        https://keys.datadoghq.com/DATADOG_RPM_KEY_B01082D3.public
    EOF
    ```
1. Update your packages and install the Worker:
    ```shell
    sudo yum makecache
    sudo yum install observability-pipelines-worker
    ```
1. Add your keys, site (for example, `datadoghq.com` for US1), source, and destination environment variables to the Worker's environment file:
    ```shell
    sudo cat <<-EOF > /etc/default/observability-pipelines-worker
    DD_API_KEY=<API_KEY>
    DD_OP_PIPELINE_ID=<PIPELINE_ID>
    DD_SITE=<SITE>
    <SOURCE_ENV_VARIABLES>
    <DESTINATION_ENV_VARIABLES>
    EOF
    ```
1. Start the worker:
    ```shell
    sudo systemctl restart observability-pipelines-worker
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][9001] if you want to make changes to your pipeline's configuration.

[9001]: /observability_pipelines/update_existing_pipelines