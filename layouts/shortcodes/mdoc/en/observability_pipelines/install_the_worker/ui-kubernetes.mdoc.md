3. Download the [Helm chart values file][101]. See the [full list of configuration options][k8s-ui-3] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
4. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][102].
5. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to make sure it is up to date:
    ```shell
    helm repo update
    ```

[101]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[102]: https://app.datadoghq.com/organization-settings/remote-config/setup