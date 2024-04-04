1. Download the [Helm chart values file][101] for Google GKE.
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Add the Datadog chart repository to Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
    If you already have Datadog chart repository, run the following command to make sure it is up to date:
    ```shell
    helm repo update
    ```
 1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    helm upgrade --install opw \
	-f google_gke.yaml \
	--set datadog.apiKey=<datadog_api_key> \
	--set datadog.pipelineId=<pipeline_id> \
	--set <source_env_variables> \
	--set <destination_env_variables> \
	--set service.ports[0].protocol=TCP,service.ports[0].port=<service_port>,service.ports[0].targetPort=<target_port> \
	datadog/observability-pipelines-worker
    ```
    **Note**: By default, the Kubernetes Service maps incoming port `<service_port>` to the port the Worker is listening on `<target_port>`. If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

[101]: /resources/yaml/observability_pipelines/v2/setup/google_gke.yaml