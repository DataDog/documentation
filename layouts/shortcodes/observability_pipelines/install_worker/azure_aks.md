1. Download the [Helm chart values file][701] for Azure AKS.
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have the Datadog chart repository, run the following command to make sure it is up to date:
    ```shell
    helm repo update
    ```
 1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    helm upgrade --install opw \
	-f azure_aks.yaml \
	--set datadog.apiKey=<DATADOG_API_KEY> \
	--set datadog.pipelineId=<PIPELINE_ID> \
	--set <SOURCE_ENV_VARIABLES> \
	--set <DESTINATION_ENV_VARIABLES> \
	--set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
	datadog/observability-pipelines-worker
    ```
    **Note**: By default, the Kubernetes Service maps incoming port `<SERVICE_PORT>` to the port the Worker is listening on (`<TARGET_PORT>`). If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][702] if you want to make changes to your pipeline's configuration.

[701]: /resources/yaml/observability_pipelines/v2/setup/azure_aks.yaml
[702]: /observability_pipelines/update_existing_pipelines