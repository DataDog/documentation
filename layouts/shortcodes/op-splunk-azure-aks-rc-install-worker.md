### Remote Configuration

1. Navigate to [Observability Pipelines][101].
1. Click **Add New Pipeline**.
1. Enter a name for the pipeline.
1. Click **Next**.
1. Select the **Splunk** tile.
1. Select the **Kubernetes** tile.
1. Select the **Azure AKS** tab.
1. Select a remote configuration enabled API key.
1. Download the [Remote Configuration Helm chart][101] for Azure AKS.
1. In the Helm chart:
    - Replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline.
    - Replace `site` with the [Datadog site parameter][103].
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```
1. Replace the values for `SPLUNK_HEC_ENDPOINT` and `SPLUNK_HEC_TOKEN` to match your Splunk deployment, including the token you created in [Set up the Splunk Index](#set-up-the-splunk-index):
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```
1. Make sure to specify any ports that your configuration uses in the `service.ports` section. The provided Helm chart already opens the default Splunk HEC port, `8088`.
1. Install the Helm chart in your cluster with the following commands:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f azure_aks_rc.yaml
    ```
1. Click **Deploy**.

[101]: https://hub.docker.com/r/datadog/observability-pipelines-worker
[102]: /resources/yaml/observability_pipelines/splunk/azure_aks_rc.yaml
[103]: /getting_started/site/#access-the-datadog-site