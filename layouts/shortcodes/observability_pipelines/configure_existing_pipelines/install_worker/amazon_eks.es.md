1. Descarga el [archivo de valores de Helm chart][4001] para AWS EKS.
1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que quieres utilizar.
1. Actualiza el Datadog Helm chart a la última versión:
    ```shell
    helm repo update
    ```
1. Ejecuta el comando proporcionado en la interfaz de usuario para instalar el worker. El comando se rellena automáticamente con las variables de entorno que introdujiste anteriormente.
    ```shell
    helm upgrade --install opw \
    -f aws_eks.yaml \
    --set datadog.apiKey=<DATADOG_API_KEY> \
    --set datadog.pipelineId=<PIPELINE_ID> \
    --set <SOURCE_ENV_VARIABLES> \
    --set <DESTINATION_ENV_VARIABLES> \
    --set service.ports[0].protocol=TCP,service.ports[0].port=<SERVICE_PORT>,service.ports[0].targetPort=<TARGET_PORT> \
    datadog/observability-pipelines-worker
    ```
   **Nota**: Por defecto, Kubernetes Service asigna el puerto entrante `<SERVICE_PORT>` al puerto en el que escuchas al worker (`<TARGET_PORT>`). Si quieres asignar el puerto del pod del worker a un puerto entrante diferente de Kubernetes Service, utiliza los siguientes valores `service.ports[0].port` y `service.ports[0].targetPort`:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Haz clic en **Navigate Back** (Volver atrás) para volver a la página de edición de pipelines de Observability Pipelines.
1. Haz clic en **Deploy Changes** (Desplegar cambios).

[4001]: /resources/yaml/observability_pipelines/v2/setup/aws_eks.yaml