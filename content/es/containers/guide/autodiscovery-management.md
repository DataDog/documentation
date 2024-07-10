---
aliases:
- /es/agent/autodiscovery/management
- /es/agent/kubernetes/management
- /es/agent/guide/autodiscovery-management
further_reading:
- link: /agent/kubernetes/integrations/
  tag: Documentación
  text: Crea y carga una plantilla de integración de Autodiscovery
title: Gestión de detección de contenedores
---

Por defecto, el Datadog Agent detecta automáticamente todos los contenedores disponibles. Para restringir su perímetro de detección y limitar la recopilación de datos únicamente a un subconjunto de contenedores, inclúyelos o exclúyelos a través de una configuración exclusiva.

## Patrones de Autodiscovery

El Datadog Agent debe desplegarse una vez por cada host dentro de entornos contenedorizados. Esto se hace normalmente con un DaemonSet en Kubernetes (gestionado por Helm o por el Operator) o por ECS Daemon Services. Cada Datadog Agent desplegado automáticamente detecta y monitoriza todos los contenedores en su respectivo host.

Puedes ajustar las reglas de detección del Agent para restringir la recopilación de métricas y logs. Cualquier contenedor con la recopilación de métricas restringida también tiene restringida cualquier integración del Agent basada en Autodiscovery. Cuando la [función para logs "Recopilar todos los contenedores"][1] está activada, se recopilan los logs de todos los contenedores detectados, a menos que sea bloqueada por las reglas descritas a continuación.

Estas restricciones pueden ser establecidas por cualquiera de las dos siguientes acciones:
- Proporcionar variables de entorno al contenedor del Datadog Agent en forma de lista de contenedores permitidos/bloqueados.
- Añadir anotaciones a tus pods Kubernetes para permitir/bloquear contenedores individuales.

La primera opción funciona bien como lista de nombres de contenedores, imágenes o espacios de nombres de Kubernetes a excluir para todo el clúster. La segunda opción funciona bien para exclusiones más precisas en Kubernetes.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se verán afectadas por estos ajustes y siempre tienen en cuenta todos los contenedores.

## Configuración del Agent

### Variables de entorno
En el **Agent v7.20+**, utiliza las siguientes variables de entorno para excluir contenedores por nombre de imagen, nombre de contenedor o espacio de nombre de Kubernetes. Los logs y las métricas no se recopilan de los contenedores excluidos.

| Variable de entorno | Descripción |
| ------------ | ----------- |
| `DD_CONTAINER_EXCLUDE` | Lista de contenedores a excluir. |
| `DD_CONTAINER_EXCLUDE_METRICS` | Lista de contenedores cuyas métricas están excluidas. |
| `DD_CONTAINER_EXCLUDE_LOGS` | Lista de contenedores cuyos logs están excluidos. |
| `DD_CONTAINER_INCLUDE` | Lista de contenedores a incluir. |
| `DD_CONTAINER_INCLUDE_METRICS` | Lista de contenedores cuyas métricas están incluidas. |
| `DD_CONTAINER_INCLUDE_LOGS` | Lista de contenedores cuyos logs están incluidos. |

En el **Agent v7.19 o anteriores**, utiliza las variables de entorno `DD_AC_INCLUDE` y `DD_AC_EXCLUDE` para incluir o excluir un contenedor por imagen o nombre. Estas variables de entorno están obsoletas en versiones posteriores del Agent.

Cada inclusión o exclusión se define como lista de cadenas regex separadas por espacios. Puedes incluir o excluir contenedores según su nombre (`name`), nombre de imagen (`image`) o espacio de nombre de Kubernetes (`kube_namespace`).

#### Ejemplos
Para excluir el contenedor con el nombre `dd-agent`:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

Para excluir dos contenedores con los nombres de imagen `dockercloud/network-daemon` y `dockercloud/logrotate`:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon$ image:^dockercloud/logrotate$"
```

Para excluir cada contenedor:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

También puedes utilizar `image:.*` o `kube_namespace:.*`. La configuración de `.*` sin un prefijo `name:`, `image:` o `kube_namespace:` no funciona.

### Comportamiento de inclusión y exclusión

La inclusión tiene prioridad sobre la exclusión. Por ejemplo, para incluir sólo las imágenes de monitor `ubuntu` o `debian`, excluye primero todas las demás imágenes y luego especifica las que quieres incluir:

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:ubuntu image:debian"
```

No puedes mezclar reglas de inclusión/exclusión entre categorías. Por ejemplo, si quieres incluir un contenedor con el nombre de imagen `foo` y excluir sólo las métricas de un contenedor con el nombre de imagen `bar`, lo siguiente **no es suficiente**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE = "image:^foo$"
```

En su lugar, utiliza:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^bar$"
DD_CONTAINER_INCLUDE_METRICS = "image:^foo$"
DD_CONTAINER_INCLUDE_LOGS = "image:^foo$"
```

No existe una interacción entre las listas globales y las selectivas (logs y métricas). En otras palabras, no se puede excluir un contenedor globalmente (`DD_CONTAINER_EXCLUDE`) y luego incluirlo con `DD_CONTAINER_INCLUDE_logs` y `DD_CONTAINER_INCLUDE_METRICS`.

### Configuración de variables entorno 
{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator, configura estas variables de entorno como `spec.override.nodeAgent.env`.

##### Ejemplo

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_CONTAINER_EXCLUDE
        value: "image:<IMAGE_NAME>"
```
{{% /tab %}}
{{% tab "Helm" %}}

En tu chart de Helm, proporciona una cadena separada por espacios a `datadog.containerExclude`, `datadog.containerInclude`, `datadog.containerExcludelogs`, `datadog.containerIncludelogs`, `datadog.containerExcludeMetrics` o `datadog.containerIncludeMetrics`.

##### Ejemplo

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Containerized Agent" (Agent contenedorizado) %}}

En los entornos en los que no utilizas Helm o el Operator, puedes transferir las siguientes variables de entorno al contenedor del Agent en el inicio.

##### Ejemplo de Docker
```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### Ejemplo de ECS
```json
"environment": [
  {
    "name": "DD_CONTAINER_EXCLUDE",
    "value": "image:<IMAGE_NAME>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

#### Pausar contenedores

El Datadog Agent excluye los contenedores de Kubernetes y OpenShift pausados por defecto. Esto impide la recopilación de sus métricas y su recuento como contenedores facturables. Se siguen contabilizando en las métricas de recuento de contenedores como `kubernetes.containers.running` y `docker.containers.running`.

Para desactivar este comportamiento e incluir la monitorización de los contenedores pausados:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator, configura estas variables de entorno como `spec.override.nodeAgent.env`.

##### Ejemplo

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  global:
    credentials:
      apiKey: <DATADOG_API_KEY>
  override:
    nodeAgent:
      env:
      - name: DD_EXCLUDE_PAUSE_CONTAINER
        value: "false"
```
{{% /tab %}}
{{% tab "Helm" %}}

En tu chart de Helm, establece `datadog.excludePauseContainer` en `true` o `false`.

##### Ejemplo

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Containerized Agent" (Agent contenedorizado) %}}

En los entornos en los que no utilizas Helm o el Operator, puedes transferir las siguientes variables de entorno al contenedor del Agent en el inicio.

Establece `DD_EXCLUDE_PAUSE_CONTAINER` como `false`.
{{% /tab %}}
{{< /tabs >}}

## Configuración de exclusión de pod

En el **Agent v7.45 o posterior** puedes incluir anotaciones en tus pods de Kubernetes para controlar Autodiscovery. Configura las siguientes anotaciones con el valor `"true"` para añadir reglas de exclusión.

| Anotación | Descripción |
| ------------ | ----------- |
| `ad.datadoghq.com/exclude` | Excluye todo el pod |
| `ad.datadoghq.com/logs_exclude` | Excluye la recopilación de logs de todo el pod |
| `ad.datadoghq.com/metrics_exclude` | Excluye la recopilación de métricas de todo el pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude` | Excluye el contenedor con `<CONTAINER_NAME>` en el pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude` | Excluye la recopilación de logs del contenedor con `<CONTAINER_NAME>` en el pod |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Excluye la recopilación de métricas del contenedor con `<CONTAINER_NAME>` en el pod |

#### Excluir todo el pod:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/exclude: "true"
    spec:
      containers:
        #(...)
```

#### Excluir la recopilación de logs de un contenedor:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: example
spec:
  template:
    metadata:
      annotations:
        ad.datadoghq.com/helper.logs_exclude: "true"
    spec:
      containers:
        - name: app
          #(...)
        - name: helper
          #(...)
```

### Tolerar pods no listos

Por defecto, los pods `unready` se ignoran cuando el Datadog Agent programa checks. Por lo tanto, las métricas, los checks de servicios y los logs no se recopilan de estos pods. Para anular este comportamiento, configura la anotación `ad.datadoghq.com/tolerate-unready` como `"true"`. Por ejemplo:

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/tolerate-unready: "true"
  ...
```

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/log/?tab=helm#log-collection