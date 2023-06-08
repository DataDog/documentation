---
kind: guía
title: Cambiar tu registro de contenedores
---

Datadog publica imágenes de contenedores en el gcr.io de Google, el ECR de AWS y en Docker Hub:

| dockerhub.io                               | gcr.io                                              | public.ecr.aws                                            |
|--------------------------------------------|-----------------------------------------------------|-----------------------------------------------------------|
| datadog/agent                              | gcr.io/datadoghq/agent                              | public.ecr.aws/datadog/agent                              |
| datadog/cluster-agent                      | gcr.io/datadoghq/cluster-agent                      | public.ecr.aws/datadog/cluster-agent                      |
| datadog/dogstatsd                          | gcr.io/datadoghq/dogstatsd                          | public.ecr.aws/datadog/dogstatsd                          |
| datadog/synthetics-private-location-worker | gcr.io/datadoghq/synthetics-private-location-worker | public.ecr.aws/datadog/synthetics-private-location-worker |


La extracción desde el registro de GCR o ECR funciona igual (menos para Notary) que la extracción desde Docker Hub. Se puede usar el mismo comando (con distintos parámetros) y conseguir la misma imagen. 

**Nota**: ECR y GCR no son compatibles con Notary. Si verificas la firma de imágenes extraídas de Docker, esta característica no funcionará en GCR o en ECR.

Si quieres actualizar tu registro, necesitarás actualizar sus valores según el tipo de entorno de contenedor estés usando para la implementación.

## Docker

### Actualizar tu registro

Para actualizar tu registro de contenedores, ejecuta el comando pull para el nuevo registro. Para ver los comandos pull de Docker para distintos registros de contenedores, consulta los ejemplos en [Información general de la página de documentos del Docker][1].

## Kubernetes con Helm chart

Para actualizar tu registro de contenedores al implementar el Datadog Agent (o Datadog Cluster Agent) con el Datadog Helm chart en Kubernetes (incluidos GKE, EKS, AKS y OpenShift) actualiza `values.yaml` para especificar un registro diferente:

### Datadog Helm chart >= v2.7.0

1. Actualiza tu `values.yaml`:
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. Elimina todas las anulaciones de `agents.image.repository`, `clusterAgent.image.repository` o `clusterChecksRunner.image.repository` en el `values.yaml`.

### Datadog Helm chart < v2.7.0 

Cambia el repositorio a `gcr.io`:

```yaml
agents:
  image:
    repository: gcr.io/datadoghq/agent  

clusterAgent:
  image:
    repository: gcr.io/datadoghq/cluster-agent

clusterChecksRunner:
  image:
    repository: gcr.io/datadoghq/agent
```

Para obtener más información sobre cómo usar el Datadog Helm chart, consulta la [Documentación de Datadog Kubernetes][2] y el archivo [`values.yaml`][3] de ejemplo.

## Kubernetes con el Datadog Operator

Para actualizar tu registro de contenedores al implementar el Datadog Agent (o Datadog Cluster Agent) con el Datadog Operator: 

1. Actualiza el archivo del manifiesto del Datadog Agent para anular el registro por defecto (`gcr.io/datadoghq`). Por ejemplo, con `public.ecr.aws/datadog`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: gcr.io/datadoghq
  // ..
```
2. Elimina todas las anulaciones de los campos `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name` y `spec.override.clusterChecksRunner.image.name`.

Para obtener más información sobre el Datadog Operator, consulta [Desplegar el Datadog Agent con el Operator][4].


### Usar el registro public.ecr.aws/datadog con Helm

También puedes cambiar del registro `gcr.io/datadoghq` por defecto al registro `public.ecr.aws/datadog` cuando instales el Operator con el Helm chart. Para cambiar al registro `public.ecr.aws/datadog`:

Actualiza [`values.yaml`][5] con la nueva imagen:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

Para actualizar tu registro al hacer el despliegue en ECS, en el archivo `datadog-agent-ecs.json`, cambia el valor de la clave `"image"` en `containerDefinitions` a `"public.ecr.aws/datadog/agent:latest"`: 

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Para obtener más información sobre cómo desplegar Datadog en ECS, consulta la [Documentación de Datadog ECS][6] y el archivo [`datadog-agent-ecs.json` de ejemplo][6].

## Fargate

Para actualizar tu registro mientras llevas a cabo el despliegue en Fargate, actualiza la imagen en la definición de tareas de Fargate para usar `public.ecr.aws`:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

La próxima vez que se inicie la tarea, se extraerá de `public.ecr.aws` en lugar de Docker Hub. Para obtener más información sobre cómo llevar a cabo el despliegue en Fargate, consulta [Despliegue del Agent en ECS][7] y [Despliegue del Agent en EKS][8].


## Cluster Agent

Si estás usando el Helm chart para desplegar el Datadog Agent y el Datadog Cluster Agent, sigue las instrucciones en [Kubernetes con Helm chart](#kubernetes-with-helm-chart). No son necesarias otras actualizaciones. El cambio a Helm `values.yaml`, descrito anteriormente, cambiará el repositorio usado para extraer tanto el Cluster Agent y el Datadog Agent.

Si estás usando el Datadog Operator para desplegar el Datadog Cluster Agent, sigue las instrucciones en [Kubernetes con el Datadog Operator](#kubernetes-with-the-datadog-operator). No son necesarias otras actualizaciones. Las instrucciones para actualizar la configuración del Operator modifican el repositorio usado para extraer tanto el Cluster Agent como el Datadog Agent.

Para obtener más información sobre el Datadog Cluster Agent, consulta los [Documentos del Cluster Agent][9] y los [Documentos de configuración][10].

## Kubernetes Helm para el worker de localizaciones privadas de Datadog

Para actulaizar tu registro para el worker de localizaciones privadas, actualiza la imagen de `datadog/synthetics-private-location-worker` a las de `public.ecr.aws/datadog/synthetics-private-location-worker` o `gcr.io/datadoghq/synthetics-private-location-worker`.

Para cambiar el repositorio por defecto (`gcr.io/datadoghq`), actualiza `values.yaml` con la nueva imagen:

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://docs.datadoghq.com/es/agent/docker/?tab=standard
[2]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm
[3]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[4]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[6]: https://docs.datadoghq.com/es/agent/amazon_ecs/?tab=awscli
[7]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[9]: https://docs.datadoghq.com/es/agent/cluster_agent/
[10]: https://docs.datadoghq.com/es/agent/cluster_agent/setup/?tab=helm