1. Download the [Helm chart values file][601]. If you are not using a managed service such as Amazon EKS, Google GKE, or Azure AKS, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
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
	-f values.yaml \
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
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.<br><br>

See [Update Existing Pipelines][602] if you want to make changes to your pipeline's configuration.

#### Self-hosted and self-managed Kubernetes clusters

If you are running a self-hosted and self-managed Kubernetes cluster, and have defined zones with node labels using `topology.kubernetes.io/zone`, then you can use the Helm chart values file as is. However, if you are not using the label `topology.kubernetes.io/zone`, you need to update the `topologyKey` in the `values.yaml` file to match the key you are using. Or if you run your Kubernetes install without zones, remove the entire `topology.kubernetes.io/zone` section.

[601]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[602]: /observability_pipelines/update_existing_pipelines