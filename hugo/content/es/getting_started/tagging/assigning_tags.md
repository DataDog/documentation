---
aliases:
- /es/agent/tagging
- /es/tagging/assigning_tags/
description: Aprenda a asignar etiquetas en Datadog.
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Primeros pasos con las etiquetas
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Aprenda a usar etiquetas en Datadog
title: Asignación de etiquetas
---
## Descripción general {#overview}

El etiquetado se utiliza en todo Datadog para consultar las máquinas y métricas que monitoriza. Sin la capacidad de asignar y filtrar basándose en etiquetas, encontrar problemas en su entorno y reducirlos lo suficiente como para descubrir las causas reales podría ser difícil. Aprenda a [definir etiquetas][1] en Datadog antes de continuar.

Las etiquetas pueden configurarse de varias formas diferentes:

- En el [archivo de configuración](#configuration-file) del Datadog Agent o en cada archivo de configuración de integración individual
- A través de la [UI](#ui) de Datadog
- Con la [API](#api) de Datadog
- Con [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Entornos sin contenedores" %}}
En entornos sin contenedores, el Agent asigna automáticamente la [etiqueta de servidor](#host-tags) y hereda etiquetas de las integraciones. Estas etiquetas, junto con etiquetas adicionales que puede añadir manualmente, se configuran en el [archivo de configuración del Datadog Agent](#configuration-file).
{{% /tab %}}

{{% tab "Entornos en contenedores" %}}
En entornos en contenedores, Datadog recomienda usar [Autodiscovery][1], ya que permite el [etiquetado de servicio unificado][2], la forma recomendada de lograr un punto único de configuración en toda su telemetría de Datadog.

El objetivo de Autodiscovery es aplicar una configuración de integración de Datadog al ejecutar una verificación del Agent en un contenedor determinado. Al usar Autodiscovery, el Datadog Agent identifica automáticamente qué servicios se están ejecutando en este nuevo contenedor, busca la configuración de monitorización correspondiente y comienza a recopilar métricas. Las etiquetas pueden configurarse desde la [plantilla de configuración][3] de Autodiscovery.

Si no se utiliza Autodiscovery, el Agent asigna automáticamente la [etiqueta de servidor](#host-tags) y hereda etiquetas de las integraciones de la misma manera que en entornos sin contenedores. Estas etiquetas, junto con las etiquetas añadidas manualmente, se configuran en el [archivo de configuración del Datadog Agent](#configuration-file).


[1]: /es/getting_started/agent/autodiscovery/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Métodos para asignar etiquetas {#methods-to-assign-tags}

### Archivo de configuración {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

#### Ubicación del archivo {#file-location}

El archivo de configuración del Agent (`datadog.yaml`) se utiliza para establecer etiquetas de servidor que se aplican a todas las métricas, trazas y registros reenviados por el Datadog Agent.

Las etiquetas para las [integraciones][1] instaladas con el Agent se configuran con archivos YAML ubicados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulte [Archivos de configuración del Agent][2].

#### Formato YAML {#yaml-format}

En los archivos YAML, utilice una lista de cadenas bajo la clave `tags` para asignar una lista de etiquetas. En YAML, las listas se definen con dos formas diferentes pero funcionalmente equivalentes:

```yaml
tags: ["<KEY_1>:<VALUE_1>", "<KEY_2>:<VALUE_2>", "<KEY_3>:<VALUE_3>"]
```

o

```yaml
tags:
    - "<KEY_1>:<VALUE_1>"
    - "<KEY_2>:<VALUE_2>"
    - "<KEY_3>:<VALUE_3>"
```

Se recomienda asignar etiquetas como pares `<KEY>:<VALUE>`, pero también se aceptan etiquetas que consisten solo en claves (`<KEY>`). Consulte [definición de etiquetas][3] para obtener más detalles.

#### Etiquetas de servidor {#host-tags}

El nombre de servidor (clave de etiqueta `host`) es [asignado automáticamente][4] por el Datadog Agent. Para personalizar el nombre de servidor, utilice el archivo de configuración del Agent, `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambio del nombre de servidor {#changing-the-hostname}

* El nombre de servidor antiguo permanece en la UI durante dos horas, pero no muestra nuevas métricas.
* Cualquier dato de servidores con el nombre de servidor antiguo puede consultarse con la API.
* Para graficar métricas con los nombres de servidor antiguo y nuevo en un mismo gráfico, utilice [aritmética entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Ubicación del archivo {#file-location-1}

El archivo de configuración del Agent (`datadog.conf`) se utiliza para establecer etiquetas de servidor que se aplican a todas las métricas, trazas y registros reenviados por el Datadog Agent.

Las etiquetas para las [integraciones][1] instaladas con el Agent se configuran con archivos YAML ubicados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulte [Archivos de configuración del Agent][2].

#### Formato YAML {#yaml-format-1}

En los archivos YAML, utilice una lista de cadenas bajo la clave `tags` para asignar una lista de etiquetas. En YAML, las listas se definen con dos formas diferentes pero funcionalmente equivalentes:

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Se recomienda asignar etiquetas como pares `<KEY>:<VALUE>`, pero también se aceptan etiquetas que consisten solo en claves (`<KEY>`). Consulte [definición de etiquetas][3] para obtener más detalles.

#### Etiquetas de servidor {#host-tags-1}

El nombre de servidor (clave de etiqueta `host`) es [asignado automáticamente][4] por el Datadog Agent. Para personalizar el nombre de servidor, utilice el archivo de configuración del Agent, `datadog.conf`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambio del nombre de servidor {#changing-the-hostname-1}

* El nombre de servidor anterior permanece en la UI durante 2 horas, pero no muestra nuevas métricas.
* Cualquier dato de servidores con el nombre de servidor anterior puede consultarse con la API.
* Para graficar métricas con los nombres de servidor anterior y nuevo en un mismo gráfico, utilice [aritmética entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Herencia de integración {#integration-inheritance}

El método más eficiente para asignar etiquetas es confiar en la herencia de integración. Las etiquetas que asigna a sus instancias de AWS, recetas de Chef y otras integraciones son heredadas automáticamente por los servidores y las métricas que envía a Datadog.

Para entornos en contenedores, se recomienda seguir la documentación de [etiquetado de servicio unificado][2] para lograr un punto único de configuración en toda su telemetría de Datadog.

##### Integraciones de nube {#cloud-integrations}

Las [integraciones de nube][3] se basan en la autenticación. Datadog recomienda utilizar el mosaico principal de integración en la nube (AWS, Azure, Google Cloud, etc.) e [instalar el Agent][4] siempre que sea posible. **Nota**: Si elige utilizar solo el Agent, algunas etiquetas de integración no están disponibles.

##### Integraciones web {#web-integrations}

Las [integraciones web][5] se basan en la autenticación. Las métricas se recopilan con llamadas a la API. **Nota**: Datadog convierte los espacios de las etiquetas `CamelCase` en guiones bajos, por ejemplo, `TestTag` --> `test_tag`.

#### Variables de entorno {#environment-variables}

Después de instalar el Datadog Agent en un contenedor, puede configurar las etiquetas de su servidor mediante la variable de entorno `DD_TAGS` en el archivo de configuración principal de su Agent. Si especifica varias etiquetas, separe cada una con un espacio.

**Nota**: La variable de entorno `DD_TAGS` utiliza espacios en blanco para separar las etiquetas. Por ejemplo, `DD_TAGS="key1:val1 key2:val2"` establece dos etiquetas. Un valor como `DD_TAGS="test:this is a test"` produce cuatro etiquetas separadas (`test:this`, `is`, `a`, `test`) porque cada token separado por espacios se trata como su propia etiqueta. Para incluir espacios en los valores de las etiquetas, configure las etiquetas a través de la configuración YAML o mediante anotaciones de integración. Esos métodos convierten los espacios en blanco en guiones bajos (por ejemplo, `test:this is a test` se convierte en `test:this_is_a_test`).

Datadog recopila automáticamente etiquetas comunes de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][6]. Para extraer aún más etiquetas, utilice las siguientes opciones:

| Variable de entorno               | Descripción                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraer etiquetas de contenedor. Esta variable de entorno es equivalente a la antigua variable `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraer variables de entorno de contenedor. Esta variable de entorno es equivalente a la antigua variable `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraer etiquetas de pod.                                                                                     |
| `DD_CHECKS_TAG_CARDINALITY`        | Agregar etiquetas a las métricas de verificación (low, orchestrator, high).                                                    |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Agregar etiquetas a las métricas personalizadas (low, orchestrator, high).                                                   |

**Ejemplos:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Al usar `DD_KUBERNETES_POD_LABELS_AS_TAGS`, puede usar comodines en el formato:

```text
{"foo": "bar_%%label%%"}
```

Por ejemplo, `{"app*": "kube_%%label%%"}` se resuelve en el nombre de etiqueta `kube_application` para la etiqueta `application`. Además, `{"*": "kube_%%label%%"}` agrega todas las etiquetas de pod como etiquetas con el prefijo `kube_`.

Al usar la variable `DD_CONTAINER_LABELS_AS_TAGS` dentro de un archivo `docker-compose.yaml` de Docker Swarm, elimine los apóstrofos; por ejemplo:

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Al agregar etiquetas a los contenedores de Docker, la ubicación de la palabra clave `labels:` dentro del archivo `docker-compose.yaml` es importante. Para evitar problemas, siga la documentación de [etiquetado de servicio unificado de Docker][2].

Si el contenedor necesita ser etiquetado fuera de esta configuración, coloque la palabra clave `labels:` **dentro** de la sección `services:`, **no** dentro de la sección `deploy:`. Coloque la palabra clave `labels:` dentro de la sección `deploy:` solo cuando el servicio necesite ser etiquetado. El Datadog Agent no tiene etiquetas que extraer de los contenedores sin esta ubicación.

A continuación se muestra un archivo `docker-compose.yaml` de muestra funcional que ilustra esta ubicación de etiquetas. En el ejemplo siguiente, las etiquetas en la sección `myapplication:`, `my.custom.label.project` y `my.custom.label.version` tienen cada una valores únicos. El uso de la variable de entorno `DD_CONTAINER_LABELS_AS_TAGS` en la sección `datadog:` extrae las etiquetas y genera estas etiquetas para el contenedor `myapplication`:

Dentro del contenedor `myapplication`, las etiquetas son: `my.custom.label.project` y `my.custom.label.version`

Después de que el Agent extrae las etiquetas del contenedor, las etiquetas son:
`projecttag:projectA`
`versiontag:1`

**Ejemplo de docker-compose.yaml:**

```yaml
services:
  datadog:
    volumes:
      - '/var/run/docker.sock:/var/run/docker.sock:ro'
      - '/proc:/host/proc:ro'
      - '/sys/fs/cgroup/:/host/sys/fs/cgroup:ro'
    environment:
      - DD_API_KEY= "<DATADOG_API_KEY>"
      - DD_CONTAINER_LABELS_AS_TAGS={"my.custom.label.project":"projecttag","my.custom.label.version":"versiontag"}
      - DD_TAGS="key1:value1 key2:value2 key3:value3"
    image: 'registry.datadoghq.com/agent:latest'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
  myapplication:
    image: 'myapplication'
    labels:
      my.custom.label.project: 'projectA'
      my.custom.label.version: '1'
    deploy:
      restart_policy:
        condition: on-failure
      mode: replicated
      replicas: 1
```

Defina las variables en su `datadog.yaml` personalizado o establézcalas como mapas JSON en estas variables de entorno. La clave del mapa es el nombre de la fuente (`label/envvar`) y el valor del mapa es el nombre de la etiqueta de Datadog.

##### Cardinalidad de etiquetas {#tags-cardinality}

Existen dos variables de entorno que establecen la cardinalidad de las etiquetas: `DD_CHECKS_TAG_CARDINALITY` y `DD_DOGSTATSD_TAG_CARDINALITY`. Debido a que DogStatsD tiene un precio diferente, la configuración de cardinalidad de etiquetas de DogStatsD está separada para brindar la oportunidad de una configuración más precisa. Por lo demás, estas variables funcionan de la misma manera: pueden tener los valores `low`, `orchestrator` o `high`. Ambas tienen como valor predeterminado `low`, el cual incluye etiquetas a nivel de clúster de Kubernetes.

Las diferentes configuraciones de cardinalidad se aplican a:
* `low`: Etiquetas a nivel de clúster de Kubernetes, tales como `kube_namespace`.
* `orchestrator`: Etiquetas a nivel de pod, tales como `pod_name`.
* `high`: Etiquetas a nivel de contenedor, tales como `container_id`.

Dependiendo de la cardinalidad, existe un conjunto diferente de etiquetas predeterminadas para [Kubernetes y OpenShift][7], y para [Docker, Rancher y Mesos][8]. Para ECS y Fargate, establecer la variable en `orchestrator` añade la etiqueta `task_arn`.

**Notas**:
- El envío de etiquetas de contenedor para métricas de DogStatsD puede crear más métricas (una por contenedor en lugar de una por servidor). Esto puede afectar su facturación de métricas personalizadas.
- En las métricas, las marcas de tiempo se redondean al segundo más cercano. Si algunos puntos tienen la misma marca de tiempo, el punto más reciente sobrescribe a los anteriores. Establecer una cardinalidad más alta puede ayudar a prevenir este problema.

#### Trazas {#traces}

El SDK de Datadog se puede configurar con variables de entorno, propiedades del sistema o mediante configuración en el código. La documentación de [configuración del rastreo de Datadog][9] contiene información sobre las opciones de etiquetado y la configuración para cada SDK. También puede seguir la documentación de [etiquetado unificado de servicios][2] para configurar su SDK para el etiquetado unificado de servicios.

Independientemente del SDK utilizado, los metadatos de los tramos deben respetar una estructura de árbol tipada. Cada nodo del árbol está dividido por un `.` y es de un solo tipo.

Por ejemplo, un nodo no puede ser tanto un objeto (con subnodos) como una cadena:

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

Los metadatos del tramo anterior no son válidos, ya que el valor de `key` no puede hacer referencia a una cadena (`"value"`) y también a un subárbol (`{"subkey": "value_2"}`).

### UI {#ui}

{{< tabs >}}
{{% tab "Mapa de servidores" %}}

Asigne etiquetas de servidor en la interfaz de usuario mediante la [página Host Map][1]. Haga clic en cualquier hexágono (servidor) para mostrar el panel del servidor en la parte inferior de la página. Luego, en la sección {{< ui >}}User{{< /ui >}}, haga clic en el botón {{< ui >}}Add Tags{{< /ui >}}. Ingrese las etiquetas como una lista separada por comas y luego haga clic en {{< ui >}}Save Tags{{< /ui >}}. Los cambios realizados en las etiquetas de servidor en la interfaz de usuario pueden tardar hasta cinco minutos en aplicarse.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Mapa de servidores con los detalles de un servidor abiertos y el botón Add Tags resaltado" style="width:80%;">}}


[1]: /es/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Lista de infraestructura" %}}

Asigne etiquetas de servidor en la interfaz de usuario mediante la [página Infrastructure List][1]. Haga clic en cualquier servidor para mostrar el panel del servidor a la derecha de la página. Luego, en la sección {{< ui >}}User{{< /ui >}}, haga clic en el botón {{< ui >}}Add Tags{{< /ui >}}. Ingrese las etiquetas como una lista separada por comas y luego haga clic en {{< ui >}}Save Tags{{< /ui >}}. Los cambios realizados en las etiquetas de servidor en la interfaz de usuario pueden tardar hasta cinco minutos en aplicarse. Después de agregar etiquetas, asegúrese de que sean visibles en la interfaz de usuario antes de intentar agregar más etiquetas.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Infrastructure List con un panel de detalles de Infrastructure abierto en el que se resalta el botón Add Tags" style="width:80%;">}}


[1]: /es/infrastructure/
{{% /tab %}}
{{% tab "Seguimientos" %}}

Desde la página [Manage Monitors][1], seleccione la casilla de verificación junto a cada monitor para agregar etiquetas (seleccione uno o varios monitores). Haga clic en el botón {{< ui >}}Edit Tags{{< /ui >}}. Ingrese una etiqueta o seleccione una utilizada anteriormente. Luego haga clic en {{< ui >}}Add Tag `tag:name`{{< /ui >}} o {{< ui >}}Apply Changes{{< /ui >}}. Si las etiquetas se agregaron anteriormente, se pueden asignar varias etiquetas a la vez usando las casillas de verificación de etiquetas. Para obtener más información, consulte la [documentación de Manage Monitors][2].

Al crear un monitor, asigne etiquetas de monitor en el paso 4 {{< ui >}}Say what's happening{{< /ui >}} o {{< ui >}}Notify your Team{{< /ui >}}:

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="Vista de la configuración de etiquetas de política. Debajo de 'Etiquetas de política' hay tres etiquetas de ejemplo, cost_center, product_id y env, junto a un menú desplegable 'Seleccionar valor'." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /es/monitors/manage/
{{% /tab %}}
{{% tab "Distribution Metrics" %}}

Cree agregaciones de percentiles en [Distribution Metrics][1] aplicando a una métrica una lista de hasta diez etiquetas permitidas. Esto crea una serie temporal para cada combinación potencialmente consultable de valores de etiqueta. Para obtener más información sobre el conteo de Custom Metrics y series temporales emitidas desde métricas de distribución, consulte [Custom Metrics][2].

**Aplique hasta diez etiquetas. No se aceptan etiquetas de exclusión**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Create Monitor Tags" style="width:80%;">}}

[1]: /es/metrics/distributions/
[2]: /es/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integrations" %}}

El mosaico de integración de [AWS][1] le permite asignar etiquetas adicionales a todas las métricas a nivel de cuenta, así como a los registros enviados a través de [activadores de suscripción automática][2]. Utilice una lista de etiquetas separada por comas en el formato `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Etiquetas de AWS" style="width:80%;">}}

[1]: /es/integrations/amazon_web_services/
[2]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Service Level Objectives" %}}

Al crear un SLO, asigne etiquetas en el paso 3, {{< ui >}}Add name and tags{{< /ui >}}:

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Crear etiquetas de SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "Asignación" %}}

Las etiquetas se pueden asignar de varias maneras con la [Datadog API][1]. Consulte la lista a continuación para obtener enlaces a esas secciones:

* [Publicar una ejecución de comprobación][1]
* [Publicar un evento][2]
* [Integración de AWS][3]
* [Publicar un punto de series temporales][4]
* [Crear][5] o [editar][6] un monitor
* [Agregar][7] o [Actualizar][8] etiquetas de servidor
* [Enviar trazas][9]
* [Crear][10] o [Actualizar][11] un objetivo de nivel de servicio

[1]: /es/api/v1/service-checks/#submit-a-service-check
[2]: /es/api/v1/events/#post-an-event
[3]: /es/api/v1/aws-integration/
[4]: /es/api/latest/metrics/#submit-metrics
[5]: /es/api/v1/monitors/#create-a-monitor
[6]: /es/api/v1/monitors/#edit-a-monitor
[7]: /es/api/v1/tags/#add-tags-to-a-host
[8]: /es/api/v1/tags/#update-host-tags
[9]: /es/tracing/guide/send_traces_to_agent_by_api/
[10]: /es/api/v1/service-level-objectives/#create-a-slo-object
[11]: /es/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Ejemplo" %}}

El etiquetado dentro de Datadog es una forma eficaz de recopilar sus métricas. Como ejemplo rápido, supongamos que quiere sumar las siguientes métricas de su sitio web (example.com):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recomienda agregar la etiqueta `domain:example.com` y omitir el nombre de servidor (la Datadog API determina el nombre de servidor automáticamente):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Con la etiqueta `domain:example.com`, las vistas de página se pueden sumar entre servidores:

```text
sum:page.views{domain:example.com}
```

Para obtener un desglose por servidor, utilice:

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD {#dogstatsd}

Agregue etiquetas a cualquier métrica, evento o verificación de servicio que envíe a [DogStatsD][10]. Por ejemplo, compare el rendimiento de dos algoritmos etiquetando una métrica de temporizador con la versión del algoritmo:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Nota**: El etiquetado es una [extensión específica de Datadog][11] para StatsD.

Se requiere una consideración especial al asignar la etiqueta `host` a las métricas de DogStatsD. Para obtener más información sobre la clave de etiqueta de servidor, consulte la documentación de [Envío de métricas: DogStatsD][12].

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/#define-tags
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/integrations/#cat-cloud
[4]: /es/getting_started/agent/#setup
[5]: /es/integrations/#cat-web
[6]: /es/agent/docker/?tab=standard#tagging
[7]: /es/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /es/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /es/tracing/setup/
[10]: /es/extend/dogstatsd/
[11]: /es/extend/community/libraries/
[12]: /es/metrics/dogstatsd_metrics_submission/#host-tag