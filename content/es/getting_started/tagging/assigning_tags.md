---
aliases:
- /es/agent/tagging
- /es/tagging/assigning_tags/
description: Aprende a asignar tags en Datadog.
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Introducción a los tags
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Aprende a usar tags en Datadog
title: Asignación de tags
---
## Descripción general {#overview}

El etiquetado se utiliza en todo Datadog para consultar las máquinas y métricas que monitoreas. Sin la capacidad de asignar y filtrar según tags, encontrar problemas en tu entorno y reducirlos lo suficiente para descubrir las verdaderas causas podría ser difícil. Aprende a [definir tags][1] en Datadog antes de continuar.

Los tags se pueden configurar de varias maneras diferentes:

- En el archivo de configuración del Agente de Datadog [o en cada archivo de configuración de integración individual](#configuration-file)
- A través de la [interfaz de usuario](#ui) de Datadog
- Con la [API](#api) de Datadog
- Con [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Entornos no contenerizados" %}}
En entornos no contenerizados, el Agent asigna automáticamente el tag de [host](#host-tags) y hereda tags de las integraciones. Estas tags, junto con tags adicionales que puedes agregar manualmente, se configuran en el [archivo de configuración del Agent de Datadog](#configuration-file).
{{% /tab %}}

{{% tab "Entornos contenerizados" %}}
En entornos contenerizados, Datadog recomienda usar [Autodiscovery][1] ya que permite [unified service tagging][2], la forma recomendada de lograr un único punto de configuración en toda tu telemetría de Datadog.

El objetivo de Autodiscovery es aplicar una configuración de integración de Datadog al ejecutar una verificación del Agent contra un contenedor dado. Al utilizar Autodiscovery, el Agent de Datadog identifica automáticamente qué servicios se están ejecutando en este nuevo contenedor, busca la configuración de seguimiento correspondiente y comienza a recopilar métricas. Los tags pueden ser configurados desde dentro de la plantilla de configuración de Autodiscovery.

Si Autodiscovery no está en uso, el Agent asigna automáticamente el tag de [host](#host-tags) y hereda tags de integraciones de la misma manera que en entornos no contenerizados. Estos tags, junto con los tags añadidos manualmente, se configuran en el [archivo de configuración del Agent de Datadog](#configuration-file).


[1]: /es/getting_started/agent/autodiscovery/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Métodos para asignar tags {#methods-to-assign-tags}

### Archivo de configuración {#configuration-file}

{{< tabs >}}
{{% tab "Agent v6 & v7" %}}

#### Ubicación del archivo {#file-location}

El archivo de configuración del Agent (`datadog.yaml`) se utiliza para establecer tags de host que se aplican a todas las métricas, trazas y registros enviados por el Agent de Datadog.

Los tags para las [integraciones][1] instaladas con el Agent se configuran con archivos YAML ubicados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulte [Agent configuration files][2].

#### Formato YAML {#yaml-format}

En los archivos YAML, use una lista de cadenas bajo la clave `tags` para asignar una lista de tags. En YAML, las listas se definen con dos formas diferentes pero funcionalmente equivalentes:

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

Se recomienda asignar tags como pares `<KEY>:<VALUE>`, pero también se aceptan tags que consisten únicamente en claves (`<KEY>`). Consulte [defining tags][3] para más detalles.

#### Tags de host {#host-tags}

El nombre de host (clave de etiqueta `host`) es [asignado automáticamente][4] por el Agent de Datadog. Para personalizar el nombre de host, utiliza el archivo de configuración del Agent, `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambiando el nombre de host {#changing-the-hostname}

* El antiguo nombre de host permanece en la interfaz de usuario durante dos horas, pero no muestra nuevas métricas.
* Cualquier dato de hosts con el antiguo nombre de host puede ser consultado con la API.
* Para graficar métricas con el antiguo y nuevo nombre de host en un solo gráfico, utiliza [aritmética entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Ubicación del archivo {#file-location-1}

El archivo de configuración del Agent (`datadog.conf`) se utiliza para establecer tags de host que se aplican a todas las métricas, trazas y registros enviados por el Agent de Datadog.

Los tags para las [integraciones][1] instaladas con el Agent se configuran con archivos YAML ubicados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulte [Agent configuration files][2].

#### Formato YAML {#yaml-format-1}

En los archivos YAML, use una lista de cadenas bajo la clave `tags` para asignar una lista de tags. En YAML, las listas se definen con dos formas diferentes pero funcionalmente equivalentes:

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Se recomienda asignar tags como pares `<KEY>:<VALUE>`, pero también se aceptan tags que consisten únicamente en claves (`<KEY>`). Consulte [defining tags][3] para más detalles.

#### Tags de host {#host-tags-1}

El nombre de host (clave de etiqueta `host`) es [asignado automáticamente][4] por el Agent de Datadog. Para personalizar el nombre de host, utiliza el archivo de configuración del Agent, `datadog.conf`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambiando el nombre de host {#changing-the-hostname-1}

* El antiguo nombre de host permanece en la interfaz de usuario durante 2 horas, pero no muestra nuevas métricas.
* Cualquier dato de hosts con el antiguo nombre de host puede ser consultado con la API.
* Para graficar métricas con el antiguo y nuevo nombre de host en un solo gráfico, utiliza [aritmética entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Herencia de integración {#integration-inheritance}

El método más eficiente para asignar tags es confiar en la herencia de integración. Los tags que asignes a tus AWS instances, recetas de Chef y otras integraciones son heredados automáticamente por los hosts y métricas que envías a Datadog.

Para entornos contenedorizados, se recomienda seguir la documentación de [unified service tagging][2] para lograr un único punto de configuración en toda tu telemetría de Datadog.

##### Integraciones en la nube {#cloud-integrations}

[Las integraciones en la nube][3] se basan en autenticación. Datadog recomienda utilizar el mosaico principal de integración en la nube (AWS, Azure, Google Cloud, etc.) y [instalar el Agente][4] donde sea posible. **Nota**: Si decides usar solo el Agent, algunos tags de integración no están disponibles.

##### Web integrations {#web-integrations}

[Web integrations][5] se basan en autenticación. Las métricas se recopilan mediante llamadas a la API. **Nota**: los `CamelCase` tags se convierten en guiones bajos por Datadog, por ejemplo `TestTag` --> `test_tag`.

#### Variables de entorno {#environment-variables}

Después de instalar el Datadog Agent en entornos contenerizados, puedes establecer tus tags de host utilizando la variable de entorno `DD_TAGS` en el archivo de configuración principal de tu Agent. Si especificas múltiples tags, sepáralos con un espacio.

**Nota**: La variable de entorno `DD_TAGS` utiliza espacios en blanco para separar tags. Por ejemplo, `DD_TAGS="key1:val1 key2:val2"` establece dos tags. Un valor como `DD_TAGS="test:this is a test"` produce cuatro tags separados (`test:this`, `is`, `a`, `test`) porque cada token separado por espacios se trata como su propio tag. Para incluir espacios en los valores de los tags, establece los tags a través de la configuración YAML o mediante anotaciones de integración, en su lugar. Esos métodos convierten los espacios en blanco en guiones bajos (por ejemplo, `test:this is a test` se convierte en `test:this_is_a_test`).

Datadog recopila automáticamente tags comunes de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][6]. Para extraer aún más tags, utiliza las siguientes opciones:

| Variable de entorno               | Descripción                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extraer etiquetas de contenedor. Este env es equivalente al antiguo `DD_DOCKER_LABELS_AS_TAGS` env.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extraer variables de entorno del contenedor. Este env es equivalente al antiguo `DD_DOCKER_ENV_AS_TAGS` env. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extraer etiquetas de pod.                                                                                     |
| `DD_CHECKS_TAG_CARDINALITY`        | Agregar etiquetas a métricas de verificación (bajo, orquestador, alto).                                                    |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Agregar etiquetas a métricas personalizadas (bajo, orquestador, alto).                                                   |

**Ejemplos:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Al usar `DD_KUBERNETES_POD_LABELS_AS_TAGS`, puedes usar comodines en el formato:

```text
{"foo": "bar_%%label%%"}
```

Por ejemplo, `{"app*": "kube_%%label%%"}` se resuelve al nombre de etiqueta `kube_application` para la etiqueta `application`. Además, `{"*": "kube_%%label%%"}` agrega todas las etiquetas de pod como etiquetas con el prefijo `kube_`.

Al usar la variable `DD_CONTAINER_LABELS_AS_TAGS` dentro de un archivo de Docker Swarm `docker-compose.yaml`, elimina los apóstrofes, por ejemplo:

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Al agregar etiquetas a los contenedores de Docker, la colocación de la palabra clave `labels:` dentro del archivo `docker-compose.yaml` es importante. Para evitar problemas, sigue la documentación de [Docker unified service tagging][2].

Si el contenedor necesita ser etiquetado fuera de esta configuración, coloca la palabra clave `labels:` **dentro** de la sección `services:`, **no** dentro de la sección `deploy:`. Coloca la palabra clave `labels:` dentro de la sección `deploy:` solo cuando el servicio necesita ser etiquetado. El Agente de Datadog no tiene etiquetas para extraer de los contenedores sin esta colocación.

A continuación se muestra un archivo de muestra `docker-compose.yaml` que muestra esta colocación de etiquetas. En el ejemplo a continuación, las etiquetas en la sección `myapplication:`, `my.custom.label.project` y `my.custom.label.version` tienen valores únicos. Usar la variable de entorno `DD_CONTAINER_LABELS_AS_TAGS` en la sección `datadog:` extrae las etiquetas y produce estas etiquetas para el contenedor `myapplication`:

Dentro del contenedor `myapplication` las etiquetas son: `my.custom.label.project` y `my.custom.label.version`

Después de que el Agente extrae las etiquetas del contenedor, las etiquetas son:
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

Define las variables en tu `datadog.yaml` personalizado, o configúralas como mapas JSON en estas variables de entorno. La clave del mapa es el nombre de la fuente (`label/envvar`), y el valor del mapa es el nombre de la etiqueta de Datadog.

##### Cardinalidad de etiquetas {#tags-cardinality}

Hay dos variables de entorno que establecen la cardinalidad de etiquetas: `DD_CHECKS_TAG_CARDINALITY` y `DD_DOGSTATSD_TAG_CARDINALITY`. Debido a que DogStatsD tiene un precio diferente, la configuración de cardinalidad de etiquetas de DogStatsD se separa para proporcionar la oportunidad de una configuración más detallada. De lo contrario, estas variables funcionan de la misma manera: pueden tener valores `low`, `orchestrator` o `high`. Ambas tienen como valor predeterminado `low`, que incluye etiquetas a nivel de clúster de Kubernetes.

Las diferentes configuraciones de cardinalidad apuntan a:
* `low`: etiquetas a nivel de clúster de Kubernetes, como `kube_namespace`.
* `orchestrator`: etiquetas a nivel de pod, como `pod_name`.
* `high`: etiquetas a nivel de contenedor, como `container_id`.

Dependiendo de la cardinalidad, hay un conjunto diferente de etiquetas listas para usar para [Kubernetes y OpenShift][7], y para [Docker, Rancher y Mesos][8]. Para ECS y Fargate, establecer la variable en `orchestrator` agrega la etiqueta `task_arn`.

**Notas**:
- Enviar etiquetas de contenedor para métricas de DogStatsD puede crear más métricas (una por contenedor en lugar de una por host). Esto puede afectar la facturación de sus métricas personalizadas.
- En métricas, las marcas de tiempo se redondean al segundo más cercano. Si hay puntos con la misma marca de tiempo, el punto más reciente sobrescribe los anteriores. Establecer una mayor cardinalidad puede ayudar a prevenir este problema.

#### Trazas {#traces}

El SDK de Datadog se puede configurar con variables de entorno, propiedades del sistema o a través de la configuración en el código. La documentación de [configuración de trazado de Datadog][9] tiene información sobre opciones de etiquetado y configuración para cada SDK. También puede seguir la documentación de [etiquetado de servicio unificado][2] para configurar su SDK para el etiquetado de servicio unificado.

Independientemente del SDK utilizado, los metadatos de span deben respetar una estructura de árbol tipada. Cada nodo del árbol se divide por un `.` y es de un solo tipo.

Por ejemplo, un nodo no puede ser tanto un objeto (con sub-nodos) como una cadena:

```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```

Los metadatos de span anteriores son inválidos ya que el valor de `key` no puede referirse a una cadena (`"value"`) y también a un subárbol (`{"subkey": "value_2"}`).

### INTERFAZ DE USUARIO {#ui}

{{< tabs >}}
{{% tab "Mapa de servidores" %}}

Asigne etiquetas de servidor en la interfaz de usuario utilizando la página [Mapa de servidores][1]. Haga clic en cualquier hexágono (servidor) para mostrar la superposición del servidor en la parte inferior de la página. Luego, en la sección *Usuario*, haga clic en el botón **Agregar etiquetas**. Ingrese las etiquetas como una lista separada por comas, luego haga clic en **Guardar etiquetas**. Los cambios realizados en las etiquetas de servidor en la interfaz de usuario pueden tardar hasta cinco minutos en aplicarse.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Mapa de servidores con detalles de un servidor abierto resaltando el botón Agregar Etiquetas" style="width:80%;">}}


[1]: /es/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Lista de infraestructura" %}}

Asigne etiquetas de servidor en la interfaz de usuario utilizando la [página de Lista de infraestructura][1]. Haga clic en cualquier servidor para mostrar la superposición del servidor a la derecha de la página. Luego, en la sección *Usuario*, haga clic en el botón **Agregar etiquetas**. Ingrese las etiquetas como una lista separada por comas, luego haga clic en **Guardar etiquetas**. Los cambios realizados en las etiquetas de host en la interfaz de usuario pueden tardar hasta cinco minutos en aplicarse. Después de agregar etiquetas, asegúrese de que sean visibles en la interfaz de usuario antes de intentar agregar más etiquetas.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Lista de infraestructura con un panel de detalles de infraestructura abierto resaltando el botón Agregar Etiquetas" style="width:80%;">}}


[1]: /es/infrastructure/
{{% /tab %}}
{{% tab "Monitores" %}}

Desde la página de [Administrar Monitores][1], seleccione la casilla de verificación junto a cada monitor para agregar etiquetas (seleccione uno o varios monitores). Haga clic en el botón **Editar Etiquetas**. Ingrese una etiqueta o seleccione una utilizada anteriormente. Luego haga clic en **Agregar Etiqueta `tag:name`** o **Aplicar Cambios**. Si se agregaron etiquetas anteriormente, se pueden asignar múltiples etiquetas a la vez utilizando las casillas de verificación de etiquetas. Para más información, consulte la [documentación de Administrar Monitores][2].

Al crear un monitor, asigne etiquetas de monitor en el paso 4 *Diga lo que está sucediendo* o *Notifique a su Equipo*:

{{< img src="monitors/notifications/notifications_add_required_tags.png" alt="Vista de la configuración de etiquetas de política. Debajo de 'Etiquetas de política' hay tres etiquetas de ejemplo, cost_center, product_id y env, junto a un menú desplegable 'Seleccionar valor'." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /es/monitors/manage/
{{% /tab %}}
{{% tab "Métricas de distribución" %}}

Cree agregaciones percentiles dentro de [Métricas de Distribución][1] aplicando una lista permitida de hasta diez etiquetas a una métrica. Esto crea una serie temporal para cada combinación potencialmente consultable de valores de etiquetas. Para más información sobre cómo contar métricas personalizadas y series temporales emitidas desde métricas de distribución, consulte [Métricas personalizadas][2].

**Aplique hasta diez etiquetas. No se aceptan etiquetas excluyentes**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Crear Etiquetas de Monitor" style="width:80%;">}}

[1]: /es/metrics/distributions/
[2]: /es/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integraciones" %}}

El mosaico de integración de [AWS][1] le permite asignar etiquetas adicionales a todas las métricas a nivel de cuenta, así como a los registros enviados a través de [disparadores de suscripción automática][2]. Utilice una lista de etiquetas separadas por comas en la forma `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Etiquetas de AWS" style="width:80%;">}}

[1]: /es/integrations/amazon_web_services/
[2]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Objetivos de Nivel de Servicio" %}}

Al crear un SLO, asigne etiquetas en el paso 3, **Agregar nombre y etiquetas**:

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Crear Etiquetas de SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API {#api}

{{< tabs >}}
{{% tab "Asignación" %}}

Las etiquetas se pueden asignar de varias maneras con la [API de Datadog][1]. Consulte la lista a continuación para enlaces a esas secciones:

* [Publicar una ejecución de verificación][1]
* [Publicar un evento][2]
* [Integración de AWS][3]
* [Publicar punto de serie temporal][4]
* [Crear][5] o [Editar][6] un monitor
* [Agregar][7] o [Actualizar][8] etiquetas de servidor
* [Enviar trazas][9]
* [Crear][10] o [Actualizar][11] un Objetivo de Nivel de Servicio

[1]: /es/api/v1/service-checks/#submit-a-service-check
[2]: /es/api/v1/events/#post-an-event
[3]: /es/api/v1/aws-integration/
[4]: /es/api/v1/metrics/#submit-metrics
[5]: /es/api/v1/monitors/#create-a-monitor
[6]: /es/api/v1/monitors/#edit-a-monitor
[7]: /es/api/v1/tags/#add-tags-to-a-host
[8]: /es/api/v1/tags/#update-host-tags
[9]: /es/tracing/guide/send_traces_to_agent_by_api/
[10]: /es/api/v1/service-level-objectives/#create-a-slo-object
[11]: /es/api/v1/service-level-objectives/#update-a-slo
{{% /tab %}}
{{% tab "Ejemplo" %}}

Etiquetar dentro de Datadog es una forma poderosa de reunir tus métricas. Para un ejemplo rápido, quizás estés buscando una suma de las siguientes métricas provenientes de tu sitio web (example.com):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recomienda agregar la etiqueta `domain:example.com` y omitir el servidor (la API de Datadog determina el servidor automáticamente):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Con la etiqueta `domain:example.com`, las vistas de página pueden sumarse entre servidores:

```text
sum:page.views{domain:example.com}
```

Para obtener un desglose por servidor, usa:

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD {#dogstatsd}

Agrega etiquetas a cualquier métrica, evento o verificación de servicio que envíes a [DogStatsD][10]. Por ejemplo, compara el rendimiento de dos algoritmos etiquetando una métrica de temporizador con la versión del algoritmo:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Do fancy things here ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Do fancy things (maybe faster?) here ...
```

**Nota**: Etiquetar es una [extensión específica de Datadog][11] a StatsD.

Se requiere una consideración especial al asignar la etiqueta `host` a las métricas de DogStatsD. Para más información sobre la clave de etiqueta del servidor, consulta la documentación de [Envío de Métricas: DogStatsD][12].

## Lectura Adicional {#further-reading}

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