---
aliases:
- /es/agent/autodiscovery/management
- /es/agent/kubernetes/management
- /es/agent/guide/autodiscovery-management
- /es/containers/guide/autodiscovery-management
description: Controle qué contenedores monitorea el Datadog Agent configurando reglas
  de descubrimiento y patrones de inclusión/exclusión.
further_reading:
- link: /containers/kubernetes/integrations/
  tag: Documentación
  text: Configure integraciones con Autodiscovery en Kubernetes
- link: /containers/docker/integrations/
  tag: Documentación
  text: Configure integraciones con Autodiscovery en Docker
title: Gestión de descubrimiento de contenedores
---
De forma predeterminada, el Datadog Agent descubre automáticamente todos los contenedores disponibles. Este documento describe cómo restringir el perímetro de descubrimiento del Datadog Agent y limitar la recopilación de datos a un subconjunto de contenedores.

## Patrones de descubrimiento de contenedores {#container-discovery-patterns}

En un entorno contenedorizado, debe implementar el Datadog Agent una vez por servidor. Cada Datadog Agent implementado descubre y monitorea automáticamente todos los contenedores en su servidor respectivo. Cuando la opción de registro [`containerCollectAll` option][1] está habilitada, el Agent recopila registros de todos los contenedores descubiertos.

Puede ajustar las reglas de descubrimiento para que el Agent restrinja la recopilación de métricas y registros. Cualquier contenedor restringido de la recopilación de métricas también está restringido para cualquier integración del Agent basada en [Autodiscovery][2].

Puede establecer excepciones de dos maneras:

- Proporcione variables de entorno al contenedor del Datadog Agent como una lista de permitidos/bloqueados de contenedores. Recomendado si tiene una lista de nombres de contenedores, imágenes o espacios de nombres para excluir de todo el clúster.
- Agregue anotaciones a sus pods de Kubernetes para bloquear pods o contenedores individuales. Recomendado si necesita exclusiones detalladas.

**Nota**: Las métricas `kubernetes.containers.running`, `kubernetes.pods.running`, `docker.containers.running`, `.stopped`, `.running.total` y `.stopped.total` no se ven afectadas por estos ajustes y siempre cuentan todos los contenedores.

## Coincidencia de patrones simple {#simple-pattern-matching}

Utilice las variables de entorno en la tabla a continuación para configurar el filtrado de contenedores. Cada inclusión o exclusión se define como una lista de cadenas de regex separadas por espacios. Puede incluir o excluir contenedores según su:

- nombre del contenedor (`name`)
- nombre de la imagen de contenedor (`image`)
- espacio de nombres de Kubernetes (`kube_namespace`)

<div class="alert alert-danger">

El parámetro `name` solo se aplica a nombres de contenedores, no a nombres de pods, incluso si el contenedor se ejecuta en un pod de Kubernetes.

</div>

### Variables de entorno {#environment-variables}

En **Agent v7.20+**, utilice las siguientes variables de entorno para excluir contenedores por nombre de imagen, nombre de contenedor o espacio de nombres de Kubernetes. Los registros y las métricas no se recopilan de los contenedores excluidos.

| Variable de entorno           | Descripción                                         |
| ------------------------------ | --------------------------------------------------- |
| `DD_CONTAINER_EXCLUDE`         | Lista de bloqueo de contenedores para excluir.                 |
| `DD_CONTAINER_EXCLUDE_METRICS` | Lista de bloqueo de contenedores cuyas métricas se excluyen. |
| `DD_CONTAINER_EXCLUDE_LOGS`    | Lista de bloqueo de contenedores cuyos registros se excluyen.    |
| `DD_CONTAINER_INCLUDE`         | Lista de permitidos de contenedores para incluir.                 |
| `DD_CONTAINER_INCLUDE_METRICS` | Lista de permitidos de contenedores cuyas métricas se incluyen. |
| `DD_CONTAINER_INCLUDE_LOGS`    | Lista de permitidos de contenedores cuyos registros se incluyen.    |

{{% collapse-content title="Configuración de variables de entorno" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En el Datadog Operator, configure estas variables de entorno bajo `spec.override.nodeAgent.env`.

##### Ejemplo {#example}

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

En su chart de Helm, proporcione una cadena separada por espacios a uno o más de los siguientes:
- `datadog.containerExclude`
- `datadog.containerInclude`
- `datadog.containerExcludeLogs`
- `datadog.containerIncludeLogs`
- `datadog.containerExcludeMetrics`
- `datadog.containerIncludeMetrics`

##### Ejemplo {#example-1}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
```

{{% /tab %}}
{{% tab "Agent contenedorizado" %}}

En entornos donde no utiliza el Datadog Operator o Helm, las siguientes variables de entorno se pueden pasar al contenedor del Agent al iniciarse.

##### Ejemplo Docker {#example-docker}

```shell
docker run -e DD_CONTAINER_EXCLUDE=image:<IMAGE_NAME> ...
```

##### Ejemplo ECS {#example-ecs}

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

Los filtros de nombre de imagen (`image`) se comparan con el nombre completo de la imagen, incluyendo el registro y la etiqueta o el resumen de la imagen (por ejemplo, `dockerhub.io/nginx:1.13.1`).

</div>

#### Ejemplos {#examples}

Para excluir el contenedor con el nombre `dd-agent`:

```
DD_CONTAINER_EXCLUDE = "name:^dd-agent$"
```

Para excluir contenedores que utilizan la imagen `dockercloud/network-daemon`, incluyendo todas las etiquetas y resúmenes:

```
DD_CONTAINER_EXCLUDE = "image:^dockercloud/network-daemon(@sha256)?:.*
```

Para excluir contenedores que utilizan la imagen `dockercloud/network-daemon:1.13.0`:

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

Alternativamente, también puede usar `image:.*` o `kube_namespace:.*`. Configurar `.*` sin un prefijo `name:`, `image:` o `kube_namespace:` no funciona.

### Comportamiento de inclusión y exclusión {#inclusion-and-exclusion-behavior}

Por lo general, la inclusión tiene prioridad sobre la exclusión. Por ejemplo, para hacer un seguimiento solo de las imágenes `ubuntu` o `debian`, primero excluya todas las demás imágenes y luego especifique qué imágenes incluir:

```
DD_CONTAINER_EXCLUDE = "image:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/ubuntu(@sha256)?:.* image:^docker.io/library/debian(@sha256)?:.*"
```

La única excepción a esta regla son las anotaciones de exclusión de pods como `ad.datadoghq.com/exclude`. Cuando una aplicación tiene una anotación de exclusión establecida en `true`, esto tiene prioridad y el contenedor se excluye de ser descubierto automáticamente para el monitoreo. Por ejemplo, tener una condición que incluya todos los contenedores como `DD_CONTAINER_INCLUDE = "image:.*"` no garantiza que un contenedor se incluya si tiene una anotación de exclusión establecida en él. Consulte [Gestión de descubrimiento de contenedores - Configuración de exclusión de pods](#pod-exclude-configuration) para obtener más información.

No puede mezclar reglas de inclusión/exclusión entre categorías. Por ejemplo, si desea incluir un contenedor con el nombre de imagen `foo` y excluir solo las métricas de un contenedor con el nombre de imagen `bar`, lo siguiente **no es suficiente**:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE = "image:^docker.io/library/foo(@sha256)?:.*"
```

En su lugar, utilice:

```
DD_CONTAINER_EXCLUDE_METRICS = "image:^docker.io/library/bar(@sha256)?:.*"
DD_CONTAINER_INCLUDE_METRICS = "image:^docker.io/library/foo(@sha256)?:.*"
DD_CONTAINER_INCLUDE_LOGS = "image:^docker.io/library/foo(@sha256)?:.*"
```

No existe interacción entre las listas globales y las listas selectivas (de registros y métricas). En otras palabras, no puede excluir un contenedor globalmente (`DD_CONTAINER_EXCLUDE`) y luego incluirlo con `DD_CONTAINER_INCLUDE_LOGS` y `DD_CONTAINER_INCLUDE_METRICS`.

### Contenedores de pausa {#pause-containers}

El Datadog Agent excluye los contenedores de pausa de Kubernetes y OpenShift de forma predeterminada. Esto evita su recolección de métricas y que cuenten como contenedores facturables. Aún así, se cuentan en las métricas de conteo de contenedores como `kubernetes.containers.running` y `docker.containers.running`.

Para deshabilitar este comportamiento e incluir el monitoreo de los contenedores de pausa:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator, establezca estas variables de entorno en `spec.override.nodeAgent.env`.

##### Ejemplo {#example-2}

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

En su gráfico de Helm, establezca `datadog.excludePauseContainer` en `true` o `false`.

##### Ejemplo {#example-3}

```yaml
datadog:
  containerExclude: "image:<IMAGE_NAME_1> image:<IMAGE_NAME_2>"
  containerInclude: "image:<IMAGE_NAME_3> image:<IMAGE_NAME_4>"
  excludePauseContainer: false
```

{{% /tab %}}
{{% tab "Agent contenedorizado" %}}

En entornos donde no utiliza Helm, las siguientes variables de entorno pueden pasarse al contenedor del Agente al iniciarse.

Establezca `DD_EXCLUDE_PAUSE_CONTAINER` en `false`.
{{% /tab %}}
{{< /tabs >}}

## Exclusión avanzada de CEL {#advanced-cel-exclusion}

En **Agent v7.73+**, puede utilizar la opción de configuración `cel_workload_exclude` para filtrar contenedores de Autodiscovery. Esta función le permite definir reglas de [Common Expression Language][3] para seleccionar contenedores que se excluirán de la recopilación de telemetría.

Utilice los siguientes atributos para representar el objeto contenedor en sus reglas de filtrado:

| Atributo                   | Descripción                                                             |
|-----------------------------|-------------------------------------------------------------------------|
| `container.name`            | El nombre del contenedor.                                              |
| `container.image.reference` | La referencia completa de la imagen del contenedor (registro, repositorio, etiqueta/resumen). |
| `container.pod.name`        | El nombre del pod que ejecuta el contenedor.                              |
| `container.pod.namespace`   | El espacio de nombres de Kubernetes del pod.                                    |
| `container.pod.annotations` | Las anotaciones aplicadas al pod (mapa de clave-valor).                     |

### Estructura de configuración {#configuration-structure}

La opción de configuración `cel_workload_exclude` está estructurada como una lista de conjuntos de reglas evaluados como OR lógicos, donde un contenedor se excluye si coincide con alguna regla. Cada conjunto de reglas define el `products` a excluir y la `rules` CEL correspondiente para comparar con los contenedores.

El campo `products` acepta `metrics`, `logs` y `global` (excluir el contenedor de todos los productos enumerados).

<div class="alert alert-danger">
Si la configuración contiene errores estructurales o problemas de sintaxis CEL, el Agent finaliza con un error para evitar la recopilación de telemetría no deseada que podría afectar la facturación.
</div>

En el ejemplo a continuación, las métricas y los registros se excluyen para cualquier contenedor con `nginx` en su nombre que se ejecute en el espacio de nombres `staging`. Además, los registros se excluyen para cualquier contenedor que ejecute la imagen `redis`, O cualquier contenedor dentro de un pod que tenga la anotación `low_priority: "true"`. El [archivo de configuración del Agent][4] puede actualizarse directamente como se ve en este ejemplo.

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

También puede configurar la exclusión de cargas de trabajo respaldada por CEL utilizando uno de los siguientes métodos:
- Establezca la variable de entorno `DD_CEL_WORKLOAD_EXCLUDE` con una cadena con formato JSON que contenga sus reglas, en cualquier configuración de Agent en contenedor.
- Para Datadog Operator o Helm Chart, agregue sus reglas CEL a la opción de configuración adecuada (como se muestra en los ejemplos a continuación).

{{% collapse-content title="Configuración de reglas de exclusión CEL" level="h4" expanded=false id="setting-environment-variables" %}}

{{< tabs >}}
{{% tab "Datadog Operator" %}}

En Datadog Operator (>=v1.23.0), use las opciones `spec.override.nodeAgent.celWorkloadExclude` y `spec.override.clusterAgent.celWorkloadExclude`.

##### Ejemplo {#example-4}

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

En su Helm chart, use la `datadog.celWorkloadExclude` opción de configuración.

##### Ejemplo {#example-5}

```yaml
datadog:
  celWorkloadExclude:
  - products: [global]
    rules:
      containers:
        - container.name == "redis"
```

{{% /tab %}}
{{% tab "Agent contenedorizado" %}}

En entornos donde no utilice Helm o el Datadog Operator, las siguientes variables de entorno se pueden pasar al contenedor del Agent al inicio.

##### Ejemplo Docker {#example-docker-1}

```shell
docker run -e DD_CEL_WORKLOAD_EXCLUDE=<JSON_CEL_RULES> ...
```

##### Ejemplo ECS {#example-ecs-1}

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

{{% collapse-content title="Validación de la opción de configuración" level="h4" expanded=false id="validating-configuration-option" %}}

Use el comando `agent workloadfilter verify-cel` para validar la sintaxis de su configuración antes de la implementación. Acepta entradas en formato YAML o JSON a través de stdin. El siguiente ejemplo demuestra cómo la validación detecta un error de campo no definido:

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

#### Reglas de ejemplo {#example-rules}

Para excluir el contenedor con una anotación de pod específica:

```yaml
container.pod.annotations["monitoring"] == "false"
```

Para excluir el contenedor en espacios de nombres sin la subcadena `-dev`:

```yaml
!container.pod.namespace.matches("-dev")
```

Para excluir el contenedor con el nombre `nginx-server` solo en el espacio de nombres `prod`:

```yaml
container.name == "nginx-server" && container.pod.namespace == "prod"
```

Para excluir el contenedor que ejecuta una imagen con la subcadena `nginx`:

```yaml
container.image.reference.matches("nginx")
```

Para excluir el contenedor usando lógica agrupada (por ejemplo, un nombre de contenedor específico en cualquiera de dos espacios de nombres):

```yaml
container.name == "redis" && (container.pod.namespace == "production" || container.pod.namespace == "staging")
```

Para excluir contenedores según el nombre del propietario de su pod (por ejemplo, apuntando a todos los contenedores creados por un Deployment o CronJob llamado `my-app`):

```yaml
container.pod.name.startsWith("my-app")
```

Para **incluir únicamente** contenedores en un conjunto particular de espacios de nombres:

```yaml
!(container.pod.namespace in ["foo", "bar", "baz"])
```

## Configuración de exclusión de pod {#pod-exclude-configuration}

En **Agent v7.45+** puede establecer anotaciones en sus pods de Kubernetes para controlar Autodiscovery. Establezca las siguientes anotaciones con el valor `"true"` para agregar reglas de exclusión.

| Anotación                                          | Descripción                                                                      |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `ad.datadoghq.com/exclude`                          | Excluye todo el pod                                                          |
| `ad.datadoghq.com/logs_exclude`                     | Excluye la recopilación de registros de todo el pod                                      |
| `ad.datadoghq.com/metrics_exclude`                  | Excluye la recopilación de métricas de todo el pod                                   |
| `ad.datadoghq.com/<CONTAINER_NAME>.exclude`         | Excluye el contenedor con `<CONTAINER_NAME>` en el pod                        |
| `ad.datadoghq.com/<CONTAINER_NAME>.logs_exclude`    | Excluye la recopilación de registros del contenedor con `<CONTAINER_NAME>` en el pod    |
| `ad.datadoghq.com/<CONTAINER_NAME>.metrics_exclude` | Excluye la recopilación de métricas del contenedor con `<CONTAINER_NAME>` en el pod |

La `ad.datadoghq.com/exclude` anotación establecida en el pod de la aplicación tiene la prioridad más alta. Esto significa que incluso si un contenedor coincide con la inclusión a través de `DD_CONTAINER_INCLUDE`, el Agent sigue ignorando la supervisión de ese contenedor. Lo mismo se aplica a las configuraciones de filtrado específicas para métricas y registros.

Al aplicar exclusiones basadas en anotaciones, el Agent verifica todas las anotaciones de exclusión relevantes en el contenedor. Por ejemplo, al configurar registros para un contenedor NGINX, el Agent buscará que las anotaciones `ad.datadoghq.com/exclude`, `ad.datadoghq.com/logs_exclude`, `ad.datadoghq.com/nginx.exclude` o `ad.datadoghq.com/nginx.logs_exclude` sean `true` en el pod. Lo mismo se aplica a las métricas.

#### Excluir todo el pod {#exclude-the-entire-pod}

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

#### Excluir la recopilación de registros de un contenedor {#exclude-log-collection-from-a-container}

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

### Tolerar pods no listos {#tolerate-unready-pods}

De forma predeterminada, `unready` los pods se ignoran cuando el Datadog Agent programa las comprobaciones. Por lo tanto, las métricas, las comprobaciones de servicio y los registros no se recopilan de estos pods. Para anular este comportamiento, establezca la anotación `ad.datadoghq.com/tolerate-unready` en `"true"`. Por ejemplo:

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

## Configuración de Security {#security-configuration}

En **Agent v7.70+**, puede restringir el monitoreo de Security para contenedores específicos, de modo que solo se le facture por los contenedores que desea monitorear.

{{< tabs >}}
{{% tab "Helm" %}}

| Característica                               | Incluir contenedor                                   | Excluir contenedor                                   |
|---------------------------------------|-----------------------------------------------------|-----------------------------------------------------|
| [Configuraciones erróneas de Cloud Security][1] | `datadog.securityAgent.compliance.containerInclude` | `datadog.securityAgent.compliance.containerExclude` |
| [Cloud Security Vulnerabilities][2]   | `datadog.sbom.containerImage.containerInclude`      | `datadog.sbom.containerImage.containerExclude`      |
| [Workload Protection][3]              | `datadog.securityAgent.runtime.containerInclude`    | `datadog.securityAgent.runtime.containerExclude`    |

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/cloud_security_management/vulnerabilities
[3]: /es/security/workload_protection/
{{% /tab %}}
{{% tab "Archivo de configuración" %}}
Para [Cloud Security Vulnerabilities][1], puede usar el siguiente formato en su archivo de configuración para incluir o excluir contenedores:

```
---
sbom:
  container_image:
    container_include: ...
    container_exclude: ...
```
[1]: /es/security/cloud_security_management/vulnerabilities
{{% /tab %}}
{{% tab "Agent contenedorizado" %}}
En entornos donde no utiliza Helm o el archivo de configuración, las siguientes variables de entorno se pueden configurar o pasar al contenedor del Agent al iniciarse.

| Característica                               | Incluir contenedor                                   | Excluir contenedor                                   |
|---------------------------------------|------------------------------------------------|------------------------------------------------|
| [Configuraciones erróneas de Cloud Security][1] | `DD_COMPLIANCE_CONFIG_CONTAINER_INCLUDE`       | `DD_COMPLIANCE_CONFIG_CONTAINER_EXCLUDE`       |
| [Cloud Security Vulnerabilities][2]   | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_INCLUDE`    | `DD_SBOM_CONTAINER_IMAGE_CONTAINER_EXCLUDE`    |
| [Workload Protection][3]              | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_INCLUDE` | `DD_RUNTIME_SECURITY_CONFIG_CONTAINER_EXCLUDE` |

[1]: /es/security/cloud_security_management/misconfigurations/
[2]: /es/security/cloud_security_management/vulnerabilities
[3]: /es/security/workload_protection/
{{% /tab %}}
{{< /tabs >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/containers/kubernetes/log/?tab=helm#log-collection
[2]: /es/getting_started/containers/autodiscovery
[3]: https://github.com/google/cel-spec/blob/master/doc/langdef.md
[4]: /es/agent/configuration/agent-configuration-files/#agent-main-configuration-file