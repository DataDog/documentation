### Manual configuration

1. Download the [Helm chart][101] for AWS EKS.
2. In the Helm chart:
    - Replace the `datadog.apiKey` and `datadog.pipelineId` values to match your pipeline.
    - Replace `site` with the [Datadog site parameter][102].
    ```yaml
    datadog:
      apiKey: "<datadog_api_key>"
      pipelineId: "<observability_pipelines_configuration_id>"
      site: "<site>"
    ```
3. Replace the values for `SPLUNK_HEC_ENDPOINT` and `SPLUNK_HEC_TOKEN` to match your Splunk deployment, including the token you created in [Set up the Splunk Index](#set-up-the-splunk-index):
    ```yaml
    env:
      - name: SPLUNK_HEC_ENDPOINT
        value: <https://your.splunk.index:8088/>
      - name: SPLUNK_TOKEN
        value: <a_random_token_usually_a_uuid>
    ```
4. Install the Helm chart in your cluster with the following commands:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    ```shell
    helm repo update
    ```
    ```shell
    helm upgrade --install \
        opw datadog/observability-pipelines-worker \
        -f aws_eks.yaml
    ```

[101]: /resources/yaml/observability_pipelines/splunk/aws_eks.yaml
[102]: /getting_started/site/#access-the-datadog-site