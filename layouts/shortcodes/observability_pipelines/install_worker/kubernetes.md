The Observability Pipelines Worker supports all major Kubernetes distributions, such as:

- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Google Kubernetes Engine (GKE)
- Red Hat Openshift
- Rancher

1. Download the [Helm chart values file][601]. See the [full list of configuration options][603] available.
    - If you are not using a managed service, see [Self-hosted and self-managed Kubernetes clusters](#self-hosted-and-self-managed-kubernetes-clusters) before continuing to the next step.
1. Click **Select API key** to choose the Datadog API key you want to use.
    - **Note**: The API key must be [enabled for Remote Configuration][604].
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
1. Navigate back to the Observability Pipelines installation page and click **Deploy**.

See [Update Existing Pipelines][602] if you want to make changes to your pipeline's configuration.

**Note**: If you enable [disk buffering][605] for destinations, you must enable Kubernetes [persistent volumes][606] in the Observability Pipelines helm chart .

#### Kubernetes services

When you install the Observability Pipelines Worker on Kubernetes, the Helm chart creates two services:

- **Headless service**: Provides stable DNS names per pod and direct Pod IP resolution without load balancing. This service is for the Worker itself and is not intended for end users.
- **Load balancer service**: Provides load balancing for both internal and external cluster communications.

**Use the load balancer service** (non-headless service) to send logs to the Observability Pipelines Worker.

#### Self-hosted and self-managed Kubernetes clusters

If you are running a self-hosted and self-managed Kubernetes cluster, and defined zones with node labels using `topology.kubernetes.io/zone`, then you can use the Helm chart values file as is. However, if you are not using the label `topology.kubernetes.io/zone`, you need to update the `topologyKey` in the `values.yaml` file to match the key you are using. Or if you run your Kubernetes install without zones, remove the entire `topology.kubernetes.io/zone` section.

[601]: /resources/yaml/observability_pipelines/v2/setup/values.yaml
[602]: /observability_pipelines/configuration/update_existing_pipelines/
[603]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml
[604]: https://app.datadoghq.com/organization-settings/remote-config/setup
[605]: /observability_pipelines/scaling_and_performance/handling_load_and_backpressure/#destination-buffer-behavior
[606]: https://github.com/DataDog/helm-charts/blob/23624b6e49eef98e84b21689672bb63a7a5df48b/charts/observability-pipelines-worker/values.yaml#L268