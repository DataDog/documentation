1. Descarga el [archivo de valores del Helm chart][601] para Amazon EKS.
1. Haz clic en **Select API key** (Seleccionar clave de API) para elegir la clave de API de Datadog que quieres utilizar.
1. Añade el repositorio de gráficos de Datadog a Helm:
    ```shell
    helm repo add datadog https://helm.datadoghq.com
    ```
   Si ya dispones del repositorio de gráficos de Datadog, ejecuta el siguiente comando para asegurarte de que está actualizado:
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
    **Nota**: Por defecto, el servicio de Kubernetes Service asigna el puerto entrante `<SERVICE_PORT>` al puerto en el que escuchas al worker (`<TARGET_PORT>`). Si quieres asignar el puerto del pod del worker a un puerto entrante diferente de Kubernetes Service, utiliza los siguientes valores `service.ports[0].port` y `service.ports[0].targetPort` en el comando:
    ```
    --set service.ports[0].protocol=TCP,service.ports[0].port=8088,service.ports[0].targetPort=8282
    ```
1. Vuelve a la página de instalación de Observability Pipelines y haz clic en **Deploy** (Desplegar).

Si quieres realizar cambios en la configuración de tu pipeline, consulta [Actualizar pipelines existentes][602].

[601]: /resources/yaml/observability_pipelines/v2/setup/aws_eks.yaml
[602]: /es/observability_pipelines/update_existing_pipelines