---
aliases:
- /es/agent/guide/changing_container_registry
description: Cambie entre los registros de Container Images de Datadog para diferentes
  entornos y requisitos de implementación.
title: Cambio de su Container Registry
---
Datadog publica Container Images en Datadog Container Registry, Google Artifact Registry (GAR), Amazon ECR, Azure ACR y Docker Hub:

{{% container-images-table %}}

## Elección de un Container Registry {#choosing-a-container-registry}

Al seleccionar un Container Registry, Datadog recomienda el siguiente enfoque:

1. **Pull-through cache privada**: Configure un pull-through cache en su propia infraestructura. Esto proporciona el mejor control sobre las dependencias de sus Container Images. Consulte la documentación de su proveedor de nube:
   - AWS: [Amazon ECR pull-through cache][12]
   - GCP: [Artifact Registry remote repositories][13]
   - Azure: [Azure Container Registry cache][14]

2. **Registros de proveedores de nube**: Si su implementación se encuentra en un proveedor de nube específico (AWS, GCP o Azure), utilice el registro público de Datadog correspondiente:
   - Implementaciones en AWS: `public.ecr.aws/datadog`
   - Implementaciones en GCP: `gcr.io/datadoghq`, `eu.gcr.io/datadoghq` o `asia.gcr.io/datadoghq`
   - Implementaciones en Azure: `datadoghq.azurecr.io`

3. **Datadog Container Registry**: Utilice `registry.datadoghq.com` para mayor simplicidad. Este registro no requiere configuración adicional y tiene límites de tasa muy altos. Asegúrese de que su firewall permita el tráfico hacia `us-docker.pkg.dev/datadog-prod/public-images`, ya que el registro puede redirigir las solicitudes a esta URL.

4. **Docker Hub**: Evítelo a menos que tenga una suscripción a Docker Hub, ya que está sujeto a límites de tasa.

<div class="alert alert-info">El chart de Helm del Datadog Agent determina el registro de imagen del Agent predeterminado a partir de su sitio de Datadog, el tipo de clúster y <code>registryMigrationMode</code>. El Datadog Operator chart se incluye como una dependencia del Datadog Agent Helm chart de forma predeterminada. A partir de la versión 2.19.0 del Datadog Operator chart, cuando instala el Datadog Operator a través de esa dependencia, el Datadog Agent Helm chart <code>registryMigrationMode</code> se aplica a las imágenes del Agent administradas por el Datadog Operator. El Datadog Operator Helm chart en sí no define <code>registryMigrationMode</code>; la imagen del pod del Datadog Operator se controla por separado mediante el Datadog Operator chart <code>image.repository</code> valor.</div>

Para actualizar su registro, actualice los valores de su registro según el tipo de entorno de Container en el que esté realizando la implementación. También puede usar un registro privado, pero necesita [crear un secreto de extracción][1] para extraer las imágenes.

## Docker {#docker}

### Actualización de su Container Registry {#updating-your-registry}

Para actualizar su Container Registry, ejecute el comando pull para el nuevo registro. Para ver los comandos pull de Docker para diferentes registros de Container, consulte los ejemplos en la [página de descripción general de la documentación de Docker][2].

## Kubernetes con Helm chart {#kubernetes-with-helm-chart}

Para actualizar su Container Registry al implementar el Datadog Agent (o el Datadog Cluster Agent) con el Datadog Helm chart en Kubernetes (incluidos GKE, EKS, AKS y OpenShift), actualice el `values.yaml` para especificar un registro diferente:

### Datadog Helm chart >= v2.7.0 {#datadog-helm-chart-v270}

1. Actualice su `values.yaml`. Por ejemplo, para usar Amazon ECR:
    ```yaml
    registry: public.ecr.aws/datadog
    ```
2. Elimine cualquier anulación para `agents.image.repository`, `clusterAgent.image.repository` o `clusterChecksRunner.image.repository` en el `values.yaml`.

### Datadog Helm chart < v2.7.0 {#datadog-helm-chart-v270-1}

Cambie el repositorio al Container Registry de su elección. Por ejemplo, usando el Datadog Container Registry:

```yaml
agents:
  image:
    repository: registry.datadoghq.com/agent

clusterAgent:
  image:
    repository: registry.datadoghq.com/cluster-agent

clusterChecksRunner:
  image:
    repository: registry.datadoghq.com/agent
```

Para obtener más información sobre el uso del Datadog Helm chart, consulte la [documentación de Datadog Kubernetes][3] y el archivo de ejemplo [`values.yaml`][4].

Si utiliza un registro privado, deberá agregar un secreto de extracción al campo `[key].image.pullSecrets` para cada imagen.

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

## Kubernetes con el Datadog Operator {#kubernetes-with-the-datadog-operator}

A partir de la versión 2.19.0 del Datadog Operator chart, cuando instala el Datadog Operator a través de la dependencia del Datadog Agent Helm chart, el `registryMigrationMode` del Datadog Agent Helm chart puede usar `registry.datadoghq.com` para las imágenes del Agent administradas por el Operator. Las versiones anteriores extraían las imágenes del Agent de registros específicos del sitio (`gcr.io/datadoghq`, `eu.gcr.io/datadoghq`, `asia.gcr.io/datadoghq` o `datadoghq.azurecr.io`). Para usar los registros específicos del sitio anteriores para las imágenes del Agent en esta ruta de implementación, establezca `registryMigrationMode: ""` en su Datadog Agent Helm chart `values.yaml`. Esta configuración no tiene efecto cuando se establece explícitamente un registro, y no es una configuración en el Datadog Operator Helm chart independiente. Para usar un registro diferente para la imagen del pod del Operator, establezca `image.repository` en su Operator Helm chart `values.yaml`.

Para actualizar su registro mientras implementa el Datadog Agent (o Datadog Cluster Agent) con el Datadog Operator:

1. Actualice el archivo de manifiesto del Datadog Agent para anular el registro resuelto. Por ejemplo, con `public.ecr.aws/datadog`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    registry: public.ecr.aws/datadog
  // ..
```

2. Elimine cualquier anulación para los campos `spec.override.nodeAgent.image.name`, `spec.override.clusterAgent.image.name` y `spec.override.clusterChecksRunner.image.name`.
3. Si utiliza un registro privado, deberá agregar un secreto de extracción al campo `[key].image.pullSecrets` para cada imagen.

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

Para obtener más información sobre el Datadog Operator, consulte [Implementación de un Agent con el Operator][5].


### Uso de otro Container Registry con Helm {#using-another-container-registry-with-helm}

Para usar otro registro para la imagen del pod del Operator, como `public.ecr.aws/datadog`, al instalar el Operator Helm chart independiente:

Actualice [`values.yaml`][6] con la nueva imagen:

```yaml
image:
  repository: public.ecr.aws/datadog
```

## ECS {#ecs}

Para actualizar su Container Registry mientras implementa en ECS, en el archivo `datadog-agent-ecs.json`, cambie el valor de la clave `"image"` bajo `containerDefinitions` a `"public.ecr.aws/datadog/agent:latest"`:

```json
"image": "public.ecr.aws/datadog/agent:latest",
```

Para obtener más información sobre la implementación de Datadog en ECS, consulte la [documentación de Datadog ECS][7] y el archivo de ejemplo [`datadog-agent-ecs.json`][7].

## Fargate {#fargate}

Para actualizar su Container Registry mientras implementa en Fargate, actualice la imagen en la definición de tarea de Fargate para usar `public.ecr.aws`:

```json
"image": "public.ecr.aws/datadog/agent:latest"
```

La próxima vez que se inicie la tarea, se extraerá de `public.ecr.aws` en lugar de Docker Hub. Para obtener más información sobre la implementación en Fargate, consulte [Implementación del Agent en ECS][8] y [Implementación del Agent en EKS][9].

## Cluster Agent {#cluster-agent}

Si está utilizando el Datadog Helm chart para implementar el Datadog Agent y el Datadog Cluster Agent, siga las instrucciones en [Kubernetes con Helm chart](#kubernetes-with-helm-chart), y no se requieren otras actualizaciones. El cambio en el `values.yaml` de Helm descrito anteriormente cambia el repositorio del cual se extraen tanto el Cluster Agent como el  Datadog Agent.

Si está utilizando el Datadog Operator para implementar el Datadog Cluster Agent, siga las instrucciones en [Kubernetes con el Datadog Operator](#kubernetes-with-the-datadog-operator), y no se requieren otras actualizaciones. Las instrucciones para actualizar la configuración del Datadog Operator actualizan el repositorio del cual se extraen tanto el Cluster Agent como el Datadog Agent.

Para obtener más información sobre el Datadog Cluster Agent, consulte la [documentación del Cluster Agent][10] y la [documentación de configuración][11].

## Kubernetes Helm para el trabajador de Datadog Private Location {#kubernetes-helm-for-the-datadog-private-location-worker}

Para actualizar su registro para el trabajador de Datadog Private Location, actualice la imagen `datadog/synthetics-private-location-worker` a un registro diferente, como `public.ecr.aws/datadog/synthetics-private-location-worker` o `gcr.io/datadoghq/synthetics-private-location-worker`.

Para cambiar el repositorio predeterminado (`gcr.io/datadoghq`), actualice el `values.yaml` con la nueva imagen:

```yaml
image:
  repository: public.ecr.aws/datadog/synthetics-private-location-worker
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
[12]: https://docs.aws.amazon.com/AmazonECR/latest/userguide/pull-through-cache.html
[13]: https://cloud.google.com/artifact-registry/docs/repositories/remote-repo
[14]: https://learn.microsoft.com/en-us/azure/container-registry/container-registry-artifact-cache