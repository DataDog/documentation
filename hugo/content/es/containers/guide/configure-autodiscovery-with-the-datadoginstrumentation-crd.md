---
description: Configure las verificaciones y los registros de Autodiscovery para las
  cargas de trabajo de Kubernetes a través del recurso personalizado DatadogInstrumentation
  en lugar de anotaciones de pod.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentación
  text: Configure integraciones con Autodiscovery
- link: /getting_started/containers/autodiscovery/
  tag: Documentación
  text: Introducción a Autodiscovery
- link: /containers/guide/autodiscovery-examples/
  tag: Documentación
  text: Escenarios y ejemplos de Autodiscovery
- link: /containers/cluster_agent/
  tag: Documentación
  text: Datadog Cluster Agent
title: Configure Autodiscovery con el CRD DatadogInstrumentation
---
## Descripción general {#overview}

El recurso personalizado (CR) `DatadogInstrumentation` le permite configurar las verificaciones y los registros de [Autodiscovery][1] con un único recurso de Kubernetes en lugar de [anotaciones de pod][2]. Con este enfoque, puede habilitar, actualizar y eliminar configuraciones de integración sin editar su Agent o aplicación y activar un despliegue.

Utilice el CR `DatadogInstrumentation` cuando desee:

- Configure las verificaciones y los registros sin modificar los manifiestos de carga de trabajo ni agregar anotaciones.
- Utilice una especificación de recurso estructurada con validación en lugar de JSON sin formato en las anotaciones.
- Administre de forma centralizada la configuración de Autodiscovery por carga de trabajo como un recurso de Kubernetes dedicado y con control de versiones.
- Actualice o elimine la configuración de Autodiscovery sin reiniciar los pods de su aplicación.

Cuando crea o actualiza un recurso `DatadogInstrumentation`, el [Datadog Cluster Agent][3] valida el destino, informa el estado del recurso y aplica la configuración de Autodiscovery a la carga de trabajo seleccionada.

## Requisitos {#requirements}

Actualice a la **v7.82+** del Datadog Agent y Cluster Agent e instale el CRD `DatadogInstrumentation` con una de las siguientes opciones:
- Datadog Operator **v1.29** o posterior.
- Datadog Helm chart **v3.236.0** o posterior.

## Configuración {#setup}

El controlador `DatadogInstrumentation` se ejecuta en el Cluster Agent y está deshabilitado de forma predeterminada. Habilítelo con Datadog Operator o Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Actualice sus repositorios de Helm:

```shell
helm repo update
```

2. Actualice el Datadog Operator:

```shell
helm upgrade datadog-operator datadog/datadog-operator
```

3. Agregue la anotación `agent.datadoghq.com/instrumentation-crd-enabled` a su recurso `DatadogAgent`. El Cluster Agent debe ser v7.82.0 o posterior.

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/instrumentation-crd-enabled: "true"
spec:
  global:
    [...]
```

4. Aplique el cambio:

```shell
kubectl apply -f datadog-agent.yaml
```

El Operator establece automáticamente las variables de entorno necesarias para el Cluster Agent y el Node Agent, y configura el RBAC necesario para el Cluster Agent.

{{% /tab %}}
{{% tab "Helm" %}}

1. Actualice sus repositorios de Helm:

```shell
helm repo update
```

2. En su archivo `datadog-values.yaml`, habilite el controlador:

```yaml
datadog:
  instrumentationCrd:
    enabled: true
```

3. Actualice su versión:

```shell
helm upgrade -f datadog-values.yaml <RELEASE_NAME> datadog/datadog
```

{{% /tab %}}
{{< /tabs >}}

Asegúrese de que el CRD `DatadogInstrumentation` esté instalado antes de crear recursos:

```shell
kubectl get crd datadoginstrumentations.datadoghq.com
```

Si administra los CRD de Datadog por separado, instale o actualice el chart de Helm de los CRD de Datadog:

```shell
helm upgrade --install datadog-crds datadog/datadog-crds
```

## Cargas de trabajo de destino {#target-workloads}

`DatadogInstrumentation` (DDI) para Autodiscovery consta de tres partes:

- `spec.targetRef`: identifica la carga de trabajo que se va a configurar, mediante `apiVersion`, `kind` y `name`. Su recurso personalizado y la carga de trabajo de destino deben estar en el mismo espacio de nombres.
- `spec.config.checks`: define las verificaciones de integración que se ejecutarán en su carga de trabajo.
- `spec.config.logs`: define los registros que se recopilarán de su carga de trabajo.

Puede dirigirse a los siguientes recursos de Kubernetes:

| Destino | Grupo/versión/recurso | Versión mínima del Agent | Notas |
|---|---|---|---|
| Deployment | `apps/v1/deployments` | 7.82.0 | |
| DaemonSet | `apps/v1/daemonsets` | 7.82.0 | |
| StatefulSet | `apps/v1/statefulsets` | 7.82.0 | |
| CronJob | `batch/v1/cronjobs` | 7.82.0 | |
| Job | `batch/v1/jobs` | 7.82.0 | |
| Service | `core/v1/services` | 7.82.0 | Solo admite verificaciones. Consulte [Servicios de destino](#target-services). |
| Rollout | `argoproj.io/v1alpha1/rollouts` | 7.83.0 | Requiere [Argo Rollouts][7]. |

Este ejemplo configura una [integración de Redis][4] para un `StatefulSet` llamado `redis`, replicando este [ejemplo basado en anotaciones][2].

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_TARGETS_NAMESPACE>
spec:
  targetRef:
    apiVersion: apps/v1
    kind: StatefulSet
    name: redis
  config:
    checks:
      - integration: redisdb
        containerName: redis
        initConfig: {}
        instances:
          - host: "%%host%%"
            port: "6379"
            password: "%%env_REDIS_PASSWORD%%"
    logs:
      - containerName: redis
        tags:
          - env:demo
```

Aplique el recurso:

```shell
kubectl apply -f redis-instrumentation.yaml
```

Verifique el estado del recurso:

```shell
kubectl describe datadoginstrumentation <YOUR_CR_NAME> -n <YOUR_TARGETS_NAMESPACE>
```

Cada entrada en `checks` acepta los siguientes campos:

`integration`
: Obligatorio. El nombre de la integración de Datadog que se ejecutará, por ejemplo `redisdb`.

`containerName`
: Obligatorio para destinos de carga de trabajo. El valor debe coincidir con un nombre de contenedor en el pod. Omita este campo para destinos de servicio.

`initConfig`
: Opcional. La sección `init_config` para la integración.

`instances`
: Opcional. Verifique la configuración de la instancia. Cada instancia puede utilizar [variables de plantilla de Autodiscovery][5], incluyendo `%%host%%`.

Cada entrada en `logs` acepta las mismas opciones de recopilación de registros que las anotaciones de registro de Autodiscovery, tales como `tags`, `type` y `path`. Cada entrada requiere un `containerName` que coincida con un contenedor en el pod.

### Servicios objetivo {#target-services}

Apuntar a un `Service` configura una [verificación de punto de conexión][6] similar a una anotación en un servicio de Kubernetes.

- Datadog programa una verificación de punto de conexión para cada punto de conexión del Servicio.
- `%%host%%` se resuelve a la IP del punto de conexión.
- Si un punto de conexión está respaldado por un Pod de Kubernetes, Datadog añade las etiquetas de Pod recopiladas para ese Pod.
- Si un punto de conexión no está respaldado por un Pod, Datadog convierte la verificación en una verificación de clúster regular sin etiquetas específicas de Pod.

<div class="alert alert-info">

Los objetivos de servicio no utilizan `containerName`; omita ese campo.

</div>

A continuación se muestra un ejemplo de configuración de una verificación de nginx para un `Service` de Kubernetes:

```yaml
apiVersion: datadoghq.com/v1alpha1
kind: DatadogInstrumentation
metadata:
  name: <YOUR_CR_NAME>
  namespace: <YOUR_SERVICES_NAMESPACE>
spec:
  targetRef:
    apiVersion: v1
    kind: Service
    name: nginx
  config:
    checks:
      - integration: nginx
        initConfig: {}
        instances:
          - name: "My NGINX Service Endpoints"
            nginx_status_url: "http://%%host%%:%%port%%/status/"
```

## Precedencia {#precedence}

Cuando más de una fuente de configuración se aplica a una carga de trabajo, el Datadog Agent las resuelve en el siguiente orden (primero la mayor precedencia):

1. Anotaciones de Pod
2. `DatadogInstrumentation` recurso personalizado
3. Configuración estática, como auto-configuración o archivos montados

Si una carga de trabajo ya tiene una configuración de Autodiscovery basada en anotaciones para una verificación o recopilación de registros, su configuración de `DatadogInstrumentation` no la anula.

## Un recurso por destino {#one-resource-per-target}

Una carga de trabajo o un servicio puede ser el destino de solo un recurso `DatadogInstrumentation` dentro de un espacio de nombres. Un webhook de validación rechaza un recurso cuyo `targetRef` ya pertenece a otro recurso, o cuyo `targetRef` apunta a un tipo no admitido.

## Verifique las verificaciones programadas {#verify-scheduled-checks}

El estado del recurso muestra si el Cluster Agent aceptó la configuración. Para verificar que las verificaciones estén programadas, ejecute `agent configcheck` en el Node Agent donde se ejecuta la carga de trabajo de destino.

Las verificaciones configuradas a través de un recurso `DatadogInstrumentation` listan a `instrumentation-checks` como el proveedor de configuración y a `datadoginstrumentation:<NAMESPACE>/<CR_NAME>` como la fuente de configuración. El siguiente ejemplo muestra la salida para una verificación `redisdb` programada desde un recurso que tiene como destino una carga de trabajo de Redis:

```text
> agent configcheck
# other configs...

=== redisdb check ===
Configuration provider: instrumentation-checks
Configuration source: datadoginstrumentation:cache/redis-instrumentation
Config for instance ID: redisdb:d5dd267b580bc10e
host: 10.244.0.7
password: "********"
port: 6379
Init Config:
{}
Log Config:
- tags:
  - env:demo
Auto-discovery IDs:
* redis
```

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/containers/autodiscovery/
[2]: /es/containers/kubernetes/integrations/
[3]: /es/containers/cluster_agent/
[4]: /es/integrations/redisdb/
[5]: /es/containers/guide/template_variables/
[6]: /es/containers/cluster_agent/endpointschecks/
[7]: https://argoproj.github.io/rollouts/