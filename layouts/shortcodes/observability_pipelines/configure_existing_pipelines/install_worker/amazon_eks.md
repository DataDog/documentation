1. Download the [Helm chart values file][4001] for AWS EKS.
1. Click **Select API key** to choose the Datadog API key you want to use.
1. Update Datadog Helm chart to the latest version:
    ```shell
    helm repo update
    ```
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.   
    **Note**: By default, the Kubernetes Service maps incoming port `<service_port>` to the port the Worker is listening on (`<target_port>`). If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values in the command:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Run the command provided in the UI to install the Worker. The command is automatically populated with the environment variables you entered earlier.
    ```shell
    helm upgrade --install opw \
    -f aws_eks.yaml \
    --set datadog.apiKey=<datadog_api_key> \
    --set datadog.pipelineId=<pipeline_id> \
    --set <source_env_variables> \
    --set <destination_env_variables> \
    --set service.ports[0].protocol=TCP,service.ports[0].port=<service_port>,service.ports[0].targetPort=<target_port> \
    datadog/observability-pipelines-worker
    ```
    **Note**: By default, the Kubernetes Service maps incoming port `<service_port>` to the port the Worker is listening on `(<target_port>)`. If you want to map the Worker's pod port to a different incoming port of the Kubernetes Service, use the following `service.ports[0].port` and `service.ports[0].targetPort` values: `--set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282`
1. Click **Navigate Back** to go back to the Observability Pipelines edit pipeline page.
1. Click **Deploy Changes**.

[4001]: /resources/yaml/observability_pipelines/v2/setup/aws_eks.yaml