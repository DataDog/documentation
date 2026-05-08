---
aliases:
- /es/agent/autodiscovery/management
- /es/agent/kubernetes/management
- /es/agent/guide/autodiscovery-management
- /es/containers/guide/autodiscovery-management
description: Controla qué contenedores monitoriza el Datadog Agent mediante la configuración
  de reglas de detección y patrones de inclusión/exclusión.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Kubernetes
- link: /containers/docker/integrations/
  tag: Documentación
  text: Configurar integraciones con Autodiscovery en Docker
title: Gestión de detección de contenedores
---

En forma predeterminada, el Datadog Agent detecta automáticamente todos los contenedores disponibles. En este documento se describe cómo restringir el perímetro de detección del Datadog Agent y limitar la recopilación de datos a un subconjunto de contenedores.

## Patrones de detección de contenedores

En un entorno de contenedores, debes desplegar el Datadog Agent una vez por host. Cada Datadog Agent desplegado detecta y monitoriza en forma automática todos los contenedores en tu respectivo host. Cuando se activa la [opción `containerCollectAll`][1] de logs, el Agent recopila los logs de todos los contenedores detectados.

Puedes ajustar las reglas de detección del Agent para restringir la recopilación de métricas y logs. Cualquier contenedor que tenga restringida la recopilación de métricas también está restringido para cualquier integración del Agent basada en [Autodiscovery][2].

Puedes establecer excepciones de dos maneras:

- Proporciona variables de entorno al contenedor del Datadog Agent como una lista de contenedores permitidos/bloqueados. Recomendado si tienes una lista de nombres de contenedores, imágenes o espacios de nombres que excluir para todo el clúster.
- Añade anotaciones a tus pods de Kubernetes para bloquear pods o contenedores individuales. Recomendado si necesitas exclusiones precisas.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se verán afectadas por estos ajustes y siempre contabilizan todos los contenedores.

## Concordancia de patrones simple

Utiliza las variables de entorno de la tabla siguiente para configurar el filtrado de contenedores. Cada inclusión o exclusión se define como una lista de cadenas de expresiones regulares separadas por espacios. Puedes incluir o excluir contenedores en función de su:

- nombre del contenedor (`name`)
- nombre de la imagen del contenedor (`image`)
- Espacio de nombres (`kube_namespace`) de Kubernetes

<div class="alert alert-danger">

El parámetro `name` solo se aplica a los nombres de contenedor, no a los nombres de pod, aunque el contenedor se ejecute en un pod de Kubernetes.

</div>

### Variables de entorno

En el **Agent v7.20 o posterior**, utiliza las siguientes variables de entorno para excluir contenedores por nombre de imagen, nombre de contenedor o espacio de nombres de Kubernetes. Los logs y las métricas no se recopilan de los contenedores excluidos.

| Variable de entorno           | Descripción                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | Lista de contenedores a excluir.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | Lista de contenedores cuyas métricas están excluidas. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Lista de contenedores cuyos logs están excluidos.    |
| `DD_CONTAINER_INCLUDE`         | Lista de contenedores a incluir.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | Lista de contenedores cuyas métricas están incluidas. |
| `DD_CONTAINER_INCLUDE_LOGS`    | Lista de contenedores cuyos logs están incluidos.    |

{{% collapse-content title="Setting environment variables" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator, configura estas variables de entorno en `spec.override.nodeAgent.env`.

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

En su gráfico de Helm, suministre una cadena separada por espacios a uno o más de los siguientes:
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### Ejemplo

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Agent en contenedores" %}}

En entornos en los que no se utiliza Datadog Operator ni Helm, se pueden pasar las siguientes variables de entorno al contenedor del Agent al inicio.

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

{{% /collapse-content %}}

<div class="alert alert-info">

Los filtros de nombre de imagen (`image`) coinciden en todos los nombres completos de la imagen, incluido el registro y la tag (etiqueta) o resumen de la imagen (por ejemplo, `dockerhub.io/NGINX:1.13.1`).

</div>

#### Ejemplos

Para excluir el contenedor con el nombre `dd-agent`:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

Para excluir los contenedores que utilizan la imagen `dockercloud/network-daemon`, incluidas todas las tags (etiquetas) y los resúmenes:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

Para excluir contenedores mediante la imagen `dockercloud/network-daemon:1.13.0`:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon:1.13.0$"
```

Para excluir cualquier contenedor cuya imagen contenga la palabra `agent`:

```
DD_CONTAINER_EXCLUDE = "image:agent"
```

Para excluir cualquier contenedor que utilice la imagen `foo` independientemente del registro:

```
DD_CONTAINER_EXCLUDE = "image:^.*/foo(@sha256)?:.*"
```

Para excluir todos los contenedores:

```
DD_CONTAINER_EXCLUDE = "name:.*"
```

También puedes utilizar `image:.*` o `kube_namespace:.*`. La configuración de `.*` sin un prefijo `name:`, `image:` o `kube_namespace:` no funciona.

### Comportamiento de inclusión y exclusión

En general, la inclusión tiene prioridad sobre la exclusión. Por ejemplo, para sólo monitorizar las imágenes `ubuntu` o `debian`, primero excluye todas las demás imágenes y luego especifique qué imágenes incluir:

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

La única excepción a esta regla son las anotaciones de exclusión de pods como `ad.datadoghq.com/exclude`. Cuando una aplicación tiene una anotación de exclusión configurada en `true`, esta tiene prioridad y el contenedor queda excluido de ser autodetectado para su monitorización. Por ejemplo, tener una condición que incluya cada contenedor como `DD_CONTAINER_INCLUDE = "image:.*"` no garantiza que un contenedor sea incluido si tiene una anotación de exclusión establecida en él. Consulta [Gestión de detección de contenedores - configuración de exclusión de pods](#pod-exclude-configuration) para obtener más información.

No puedes mezclar reglas de inclusión/exclusión entre categorías. Por ejemplo, si quieres incluir un contenedor con el nombre de imagen `foo` y excluir solo las métricas de un contenedor con el nombre de imagen `bar`, lo siguiente **no es suficiente**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

Será mejor que utilices lo siguiente:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

No existe una interacción entre las listas globales y las listas selectivas (logs y métricas). En otras palabras, no se puede excluir un contenedor globalmente (`DD_CONTAINER_EXCLUDE`) y luego incluirlo con `DD_CONTAINER_INCLUDE_LOGS` y `DD_CONTAINER_INCLUDE_METRICS`.

### Contenedores pausados

El Datadog Agent excluye los contenedores de Kubernetes y OpenShift pausados en forma predeterminada. Esto impide la recopilación de sus métricas y su recuento como contenedores facturables. De todas maneras, se siguen contabilizando en las métricas de count de contenedores como `kubernetes.containers.running` y `docker.containers.running`.

Para desactivar este comportamiento e incluir la monitorización de los contenedores pausados:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En el Datadog Operator, configura estas variables de entorno como `spec.override.nodeAgent.env`.

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

En tu gráfico de Helm, establece `datadog.excludePauseContainer` como `true` o `false`.

##### Ejemplo

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Agent en contenedores" %}}

En los entornos en los que no utilizas Helm o el Operator, puedes transferir las siguientes variables de entorno al contenedor del Agent en el inicio.

Establece `DD_EXCLUDE_PAUSE_CONTAINER` como `false`.
{{% /tab %}}
{{< /tabs >}}

## Exclusión anticipada del CEL

En el **Agent v7.73+**, puedes utilizar la opción de configuración `cel_workload_exclude` para filtrar contenedores de Autodiscovery. Esta función te permite definir reglas [Common Expression Langauge][3] para seleccionar contenedores que deben excluirse de la recopilación de telemetría.

Utiliza los siguientes atributos para representar el objeto de contenedor en tus reglas de filtrado:

| Atributo                   | Descripción                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | El nombre del contenedor.                                              |
| `container.image.reference` | La referencia completa de la imagen del contenedor (registro, repositorio, tag/resumen). |
| `container.pod.name`        | El nombre del pod que ejecuta el contenedor.                              |
| `container.pod.namespace`   | El espacio de nombres de Kubernetes del pod.                                    |
| `container.pod.annotations` | Las anotaciones aplicadas al pod (mapa clave-valor).                     |

### Estructura de la configuración

La opción de configuración `cel_workload_exclude` se estructura como una lista de conjuntos de reglas evaluadas como OR lógicos, donde un contenedor se excluye si coincide con alguna regla. Cada conjunto de reglas define los `products` que deben excluirse y el CEL correspondiente `rules` que debe coincidir con los contenedores.

El campo `products` acepta `metrics`, `logs` y `global` (excluye el contenedor de todos los productos de la lista).

<div class="alert alert-danger">
Si la configuración contiene errores estructurales o problemas de sintaxis de CEL, el Agent sale con un error para evitar la recopilación de telemetría no deseada que podría afectar a la facturación.
</div>

En el siguiente ejemplo, las métricas y los logs se excluyen para cualquier contenedor con `NGINX` en su nombre que se ejecute en el espacio de nombres `staging`. Además, se excluyen los logs de cualquier contenedor que ejecute la imagen `redis` O cualquier contenedor dentro de un pod que tenga la anotación `low_priority: "true"`. El [archivo de configuración del Agent][4] se puede actualizar directamente como se ve en este ejemplo.

```yaml
# datadog.yaml
cel_workload_exclude:
- products: [metrics, logs]
  rules:
    containers:
      - container.name.matches("nginx") && container.pod.namespace == "staging"
- products: [logs]
  rules:
    containers:
      - container.image.reference.matches("redis")
      - container.pod.annotations["low_priority"] == "true"
```

También puedes configurar la exclusión de cargas de trabajo respaldada por CEL utilizando uno de los siguientes métodos:
- Configura la variable de entorno `DD_CEL_WORKLOAD_EXCLUDE` con una cadena con formato JSON que contenga tus reglas, en cualquier configuración del Agent en contenedores.
- Para Datadog Operator o Helm Chart, añade tus reglas de CEL a la opción de configuración correspondiente (como se muestra en los ejemplos siguientes).

{{% collapse-content title="Configuring CEL exclusion rules" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator (>=v1.23.0), utiliza las opciones `spec.override.nodeAgent.celWorkloadExclude` y `spec.override.clusterAgent.celWorkloadExclude`.

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
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
    clusterAgent:
      celWorkloadExclude:
        - products: [ global ]
          rules:
            containers:
              - container.name == "redis"
```

{{% /tab %}}
{{% tab "Helm" %}}

En tu gráfico de Helm, utiliza la opción de configuración `datadog.celWorkloadExclude`.

##### Ejemplo

```yaml
datadog:
  celWorkloadExclude:
  - products: [global]
    rules:
      containers:
        - container.name == "redis"
```

{{% /tab %}}
{{% tab "Agent en contenedores" %}}

En los entornos en los que no utilizas Helm o el Operator, puedes transferir las siguientes variables de entorno al contenedor del Agent en el inicio.

##### Ejemplo de Docker

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES> ...
```

##### Ejemplo de ECS

```json
"environment": [
  {
    "name": "DD_CEL_WORKLOAD_EXCLUDE",
    "value": "<JSON_CEL_RULES>"
  },
  ...
]
```

{{% /tab %}}
{{< /tabs >}}

{{% /collapse-content %}}

{{% collapse-content title="Validating configuration option" level="h4" expanded=false id="validating-configuration-option" %}}

Utiliza el comando `agent workloadfilter verify-cel` para validar la sintaxis de tu configuración antes del despliegue. Acepta entradas de YAML o JSON a través de stdin. El siguiente ejemplo muestra cómo la validación detecta un error de campo no definido:

```json
### cel-config.json
[
  {
    "products": ["metrics"],
    "rules":
      {
        "containers":
          [
            'container.undefined_field == "test"',
            'container.name.startsWith("-agent")',
          ],
      },
  },
]
```

```bash
agent workloadfilter verify-cel < cel-config.json

-> Validating CEL Configuration
    Loading YAML file...
✓ YAML loaded successfully (1 bundle(s))

-> Validating configuration structure...
✓ Configuration structure is valid

-> Compiling CEL rules...

  -> metrics
    Resource: container (2 rule(s))
      ✗ Compilation failed: ERROR: <input>:1:10: undefined field 'undefined_field'
 | container.undefined_field == "test" || container.name.startsWith("-agent")
 | .........^
        Rule 1: container.undefined_field == "test"
        Rule 2: container.name.startsWith("-agent")

✗ Validation failed - some rules have errors
Error: CEL compilation failed
```

{{% /collapse-content %}}

#### Ejemplos de normas

Para excluir el contenedor con una anotación de pod específica:

```yaml
container.pod.annotations["monitoring"] == "false"
```

Para excluir el contenedor en espacios de nombres sin la subcadena `-dev`:

```yaml
!container.pod.namespace.matches("-dev")
```

Para excluir el contenedor con el nombre `NGINX-server` solo en el espacio de nombres `prod`:

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

Para excluir el contenedor que ejecuta una imagen con la subcadena `NGINX`:

```yaml
container.image.reference.matches("nginx")
```

Para excluir el contenedor utilizando la lógica agrupada (por ejemplo, un nombre de contenedor específico en cualquiera de los dos espacios de nombres):

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

Para excluir contenedores en función del nombre del propietario del pod (por ejemplo, dirigirse a todos los contenedores creados por un Deployment o CronJob llamado `my-app`):

```yaml
container.pod.name.startsWith("my-app")
```

## Configuración de exclusión de pods

En el **Agent v7.45 o posterior** puedes incluir anotaciones en tus pods de Kubernetes para controlar Autodiscovery. Configura las siguientes anotaciones con el valor `"true"` para añadir reglas de exclusión.

| Anotación                                          | Descripción                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Excluye todo el pod                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Excluye la recopilación de logs de todo el pod                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Excluye la recopilación de métricas de todo el pod                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Excluye el contenedor con `<CONTAINER_NAME>` en el pod                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Excluye la recopilación de logs del contenedor con `<CONTAINER_NAME>` en el pod    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Excluye la recopilación de métricas del contenedor con `<CONTAINER_NAME>` en el pod |

La anotación `ad.datadoghq.com/exclude` configurada en el pod de aplicación tiene la máxima prioridad. Esto significa que incluso si un contenedor coincide con la inclusión a través de `DD_CONTAINER_INCLUDE`, el Agent sigue ignorando la monitorización para ese contenedor. Lo mismo se aplica para las respectivas configuraciones de filtrado específicas para métricas y logs.

Cuando se aplican exclusiones basadas en anotaciones, el Agent check todas las anotaciones de exclusión relevantes en el contenedor. Por ejemplo, al configurar logs para un contenedor NGINX, el Agent buscará anotaciones `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/NGINX.exclude` o `ad.datadoghq.com/NGINX.logs_exclude` para ser `true` en el pod. Lo mismo se aplica a las métricas.

#### Excluir todo el pod

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

#### Excluir la recopilación de logs de un contenedor

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

## Configuración de seguridad

En el **Agent v7.70+**, puedes restringir la monitorización de la seguridad para contenedores específicos, de modo que solo se te facturen los contenedores que desees que se monitoricen. Esta funcionalidad no es compatible con Datadog Operator.

{{< tabs >}}
{{% tab "Helm" %}}

| Función                               | Incluir contenedor                                   | Excluir contenedor                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Errores de configuración de Cloud Security][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Vulnerabilidades de Cloud Security][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/cloud_security_management/vulnerabilities
[3]: /es/security/workload_protection/
{{% /tab %}}
{{% tab "Archivo de configuración" %}}
Para [Vulnerabilidades de Cloud Security][1], puedes utilizar el siguiente formato en tu archivo de configuración para incluir o excluir contenedores:

```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /es/security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "Agent en contenedores" %}}
En entornos donde no se utiliza Helm ni el Operator, las siguientes variables de entorno pueden pasarse al contenedor del Agent al inicio.

| Función                               | Incluir contenedor                              | Excluir contenedor                              |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Errores de configuración de Cloud Security][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Vulnerabilidades de Cloud Security][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/cloud_security_management/vulnerabilities
[3]: /es/security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/log/?tab=helm#log-collection
[2]: /es/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file