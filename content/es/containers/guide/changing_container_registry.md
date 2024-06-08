---
aliases:
- /es/agent/guide/changing_container_registry
kind: guía
title: Cambiar tu registro de contenedores
---

Datadog publica imágenes de contenedores en gcr.io de Google, ECR de AWS y en Docker Hub:

{{% container-images-table %}}

La extracción desde el registro ECR o GCR funciona igual (excepto para Notary) que la extracción desde Docker Hub. Puedes utilizar el mismo comando (con diferentes parámetros) y obtener la misma imagen.

**Nota**: ECR y GCR no son compatibles con Notary. Si verificas la firma de imágenes extraídas de Docker, esta característica no funcionará en GCR o en ECR.

Si quieres actualizar tu registro, necesitarás actualizar sus valores según el tipo de entorno de contenedor estés usando para la implementación.

**Nota**: También puedes utilizar un registro privado, pero tendrás que crear un secreto pull para poder extraer las imágenes del registro privado.
Para obtener más información sobre cómo crear un secreto pull, consulta la [documentación de Kubernetes][1].

## Docker

### Actualizar tu registro

Para actualizar tu registro de contenedores, ejecuta el comando pull para el nuevo registro. Para ver los comandos pull de Docker para diferentes registros de contenedores, consulta los ejemplos en la [página de información general sobre la documentación Docker][2].

## Kubernetes con Helm chart

Para actualizar tu registro de contenedores al implementar el Datadog Agent (o Datadog Cluster Agent) con el Datadog Helm chart en Kubernetes (incluidos GKE, EKS, AKS y OpenShift) actualiza `values.yaml` para especificar un registro diferente:

### Datadog Helm chart >= v2.7.0

1. Actualiza tu `values.yaml`:
    ```yaml
    registry: gcr.io/datadoghq
    ```
2. Elimina todas las anulaciones de `agents.image.repository`, `clusterAgent.image.repository` o `clusterChecksRunner.image.repository` en el `values.yaml`.

### Charts de Helm v2.7.0 o anteriores en Datadog

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

Para más información sobre el uso de charts de Helm en Datadog, consulta la [documentación de Kubernetes Datadog][3] y el archivo de ejemplo [`values.yaml`][4].

Si utilizas un registro privado, deberás añadir un secreto pull en el campo `[key].image.pullSecrets` de cada imagen.
```yaml
agents:
  image:
    pullSecrets:
      - name: PrivateRegistrySecret

clusterAgent:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret

clusterChecksRunner:
  image:
    pullSecrets:
    - name: PrivateRegistrySecret
```

## Kubernetes con el Datadog Operator

Para actualizar tu registro durante el despliegue del Datadog Agent (o el Datadog Cluster Agent) con el Datadog Operator:

1. Actualiza el archivo de manifiesto del Datadog Agent para anular el registro por defecto (`gcr.io/datadoghq`). Por ejemplo, con `public.ecr.aws/datadog`:
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
3. Si utilizas un registro privado, deberás añadir un secreto pull en el campo `[key].image.pullSecrets` de cada imagen.
```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterAgent:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
    clusterChecksRunner:
      image:
        pullSecrets:
          - name: PrivateRegistrySecret
  // ..
```

Para obtener más información sobre el Datadog Operator, consulte [Desplegar el Agent con el Operator][5].


### Usar el registro public.ecr.aws/datadog con Helm

También puedes cambiar del registro `gcr.io/datadoghq` por defecto al registro `public.ecr.aws/datadog` cuando instales el Operator con el Helm chart. Para cambiar al registro `public.ecr.aws/datadog`:

Actualiza [`values.yaml`][6] con la nueva imagen:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS

Para actualizar tu registro durante el despliegue en ECS, en el archivo `datadog-agent-ecs.json`, cambia el valor de la clave `"image"` en `containerDefinitions` por `"public.ecr.aws/datadog/agent:latest"`:

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Para obtener más información sobre el despliegue de Datadog en ECS, consulta la [documentación de ECS en Datadog][7] y el archivo de ejemplo [`datadog-agent-ecs.json`][7].

## Fargate

Para actualizar tu registro mientras llevas a cabo el despliegue en Fargate, actualiza la imagen en la definición de tareas de Fargate para usar `public.ecr.aws`:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

La próxima vez que se inicie la tarea, se extraerá de `public.ecr.aws` en lugar de Docker Hub. Para obtener más información sobre el despliegue en Fargate, consulta [Desplegar el Agent en ECS][8] y [Desplegar el Agent en EKS][9].

## Cluster Agent

Si estás utilizando el chart de Helm para desplegar el Datadog Agent y el Datadog Cluster Agent, sigue las instrucciones en [Kubernetes con chart de Helm](#Kubernetes-with-helm-chart) y no necesitarás realizar ninguna otra actualización. El cambio de `values.yaml` de Helm descrito anteriormente cambia el repositorio del que se extraen tanto el Cluster Agent como el Datadog Agent.

Si estás utilizando el Datadog Operator para desplegar el Datadog Cluster Agent, sigue las instrucciones en [Kubernetes con el Datadog Operator](#Kubernetes-with-the-Datadog-operator) y no necesitarás realizar ninguna otra actualización. Las instrucciones para actualizar la configuración del Operator actualizan el repositorio del que se extraen tanto el Cluster Agent como el Datadog Agent.

Para obtener más información sobre el Datadog Cluster Agent, consulte la [documentación del Cluster Agent][10], y la [documentación para la configuración][11].

## Kubernetes Helm para el worker de localizaciones privadas de Datadog

Para actulaizar tu registro para el worker de localizaciones privadas, actualiza la imagen de `datadog/synthetics-private-location-worker` a las de `public.ecr.aws/datadog/synthetics-private-location-worker` o `gcr.io/datadoghq/synthetics-private-location-worker`.

Para cambiar el repositorio por defecto (`gcr.io/datadoghq`), actualiza `values.yaml` con la nueva imagen:

```yaml
image:
  repository: gcr.io/datadoghq/synthetics-private-location-worker
```

[1]: https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/#registry-secret-existing-credentials
[2]: https://docs.datadoghq.com/es/agent/docker/?tab=standard
[3]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=helm
[4]: https://github.com/DataDog/helm-charts/blob/dae884481c5b3c9b67fc8dbd69c944bf3ec955e9/charts/datadog/values.yaml#L19
[5]: https://docs.datadoghq.com/es/agent/kubernetes/?tab=operator#deploy-an-agent-with-the-operator
[6]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog-operator/values.yaml#L28
[7]: https://docs.datadoghq.com/es/agent/amazon_ecs/?tab=awscli
[8]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-ecs
[9]: https://www.datadoghq.com/blog/aws-fargate-monitoring-with-datadog/#deploy-the-agent-on-eks
[10]: https://docs.datadoghq.com/es/agent/cluster_agent/
[11]: https://docs.datadoghq.com/es/agent/cluster_agent/setup/?tab=helm