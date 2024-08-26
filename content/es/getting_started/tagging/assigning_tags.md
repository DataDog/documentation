---
aliases:
- /es/agent/tagging
- /es/getting_started/tagging/assigning_tags
- /es/tagging/assigning_tags/
description: Descubre cómo asignar etiquetas (tags) en Datadog.
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Descubre cómo usar etiquetas (tags) en Datadog.
title: Asignar etiquetas (tags)
---

## Información general

En Datadog, el etiquetado sirve para realizar consultas sobre las máquinas y métricas monitorizadas. Si no existiese la posibilidad de asignar y filtrar elementos mediante etiquetas (tags), resultaría difícil buscar los problemas que afectan al entorno y acotar los resultados lo suficiente como para descubrir sus causas reales. Antes de continuar, obtén más información sobre cómo [definir las etiquetas (tags)][1] en Datadog.

Las etiquetas (tags) se pueden configurar de varias formas diferentes:

- En el [archivo de configuración](#configuration-file) del Datadog Agent o en el de cualquier integración particular
- A través de la [IU](#ui) de Datadog
- Con la [API](#api) de Datadog
- Con el [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Entornos no contenedorizados" %}}
En los entornos no contenedorizados, el Agent asigna automáticamente la [etiqueta (tag) del host](#host-tags) y hereda las etiquetas de las integraciones. Estas etiquetas, así como las etiquetas adicionales que puedes añadir manualmente, se configuran en el [archivo de configuración del Datadog Agent](#configuration-file).
{{% /tab %}}

{{% tab "Entornos contenedorizados" %}}
En los entornos contenedorizados, Datadog recomienda utilizar [Autodiscovery][1], puesto que permite emplear el [etiquetado de servicios unificado][2], que es el método recomendado para obtener un único punto de configuración en toda la telemetría de Datadog.

El objetivo de Autodiscovery consiste en aplicar la configuración de una integración de Datadog al efectuar un check de Agent en un contenedor determinado. Cuando se utiliza Autodiscovery, el Datadog Agent identifica automáticamente los servicios que se ejecutan en el nuevo contenedor, busca la configuración más adecuada para la monitorización e inicia la recopilación de métricas. A continuación, pueden configurarse las etiquetas (tags) desde la [plantilla de configuración][3] de Autodiscovery.

Si no se utiliza Autodiscovery, el Agent asigna automáticamente la [etiqueta (tag) del host](#host-tags) y hereda las etiquetas de las integraciones, al igual que ocurre en los entornos no contenedorizados. Estas etiquetas, así como las etiquetas que se hayan añadido manualmente, se configuran en el [archivo de configuración del Datadog Agent](#configuration-file).


[1]: /es/getting_started/agent/autodiscovery/
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/getting_started/agent/autodiscovery/?tab=docker#integration-templates
{{% /tab %}}
{{< /tabs >}}

## Métodos para asignar etiquetas (tags)

### Archivo de configuración

{{< tabs >}}
{{% tab "Agent v6 y v7" %}}

#### Localización de los archivos

El archivo de configuración del Agent (`datadog.yaml`) se usa para configurar las etiquetas (tags) de host que se aplican a todas las métricas, trazas y logs reenviados por el Datadog Agent.

Las etiquetas (tags) de las [integraciones][1] instaladas con el Agent se configuran con archivos YAML localizados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulta la sección [Archivos de configuración del Agent][2].

#### Formato YAML

En los archivos YAML, usa una de las listas de segmentos de la clave `tags` para asignar una lista de etiquetas (tags). En YAML, las listas se definen de dos formas diferentes, aunque funcionalmente equivalentes:

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

Aunque se recomienda asignar las etiquetas (tags) en pares con el formato `<KEY>:<VALUE>`, también se aceptan las etiquetas que solo constan de claves (`<KEY>`). Para obtener más información, consulta [cómo se definen las etiquetas][3].

#### Etiquetas (tags) de host

El nombre de host (clave de etiqueta `host`) lo [asigna automáticamente][4] el Datadog Agent. Para personalizarlo, usa el archivo de configuración del Agent: `datadog.yaml`. Ejemplo:

```yaml
# Establece el nombre de host (por defecto: detección automática)
# Debe seguir el formato RFC-1123, que solo permite:
# mayúsculas de la "A" a la "Z", minúsculas de la "a" a la "z", números del "0" al "9" y guiones (-)
hostname: mymachine.mydomain
```

##### Cambiar el nombre de host

* El nombre de host anterior permanecerá en la IU durante dos horas, pero no reflejará las nuevas métricas.
* Se podrá consultar con la API cualquier dato procedente de hosts que tenga el nombre de host anterior.
* Para representar las métricas en un gráfico con los nombres de host nuevo y antiguo, usa [cálculos aritméticos entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/guide/agent-configuration-files/
[3]: /es/getting_started/tagging/#defining-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Localización de los archivos

El archivo de configuración del Agent (`datadog.conf`) se usa para configurar las etiquetas (tags) de host que se aplican a todas las métricas, trazas y logs reenviados por el Datadog Agent.

Las etiquetas (tags) de las [integraciones][1] instaladas con el Agent se configuran con archivos YAML localizados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulta la sección [Archivos de configuración del Agent][2].

#### Formato YAML

En los archivos YAML, usa una de las listas de segmentos de la clave `tags` para asignar una lista de etiquetas (tags). En YAML, las listas se definen de dos formas diferentes, aunque funcionalmente equivalentes:

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Aunque se recomienda asignar las etiquetas (tags) en pares con el formato `<KEY>:<VALUE>`, también se aceptan las etiquetas que solo constan de claves (`<KEY>`). Para obtener más información, consulta [cómo se definen las etiquetas][3].

#### Etiquetas (tags) de host

El nombre de host (clave de etiqueta `host`) lo [asigna automáticamente][4] el Datadog Agent. Para personalizarlo, usa el archivo de configuración del Agent: `datadog.conf`. Ejemplo:

```yaml
# Establece el nombre de host (por defecto: detección automática)
# Debe seguir el formato RFC-1123, que solo permite:
# mayúsculas de la "A" a la "Z", minúsculas de la "a" a la "z", números del "0" al "9" y guiones (-)
hostname: mymachine.mydomain
```

##### Cambiar el nombre de host

* El nombre de host anterior permanecerá en la IU durante dos horas, pero no reflejará las nuevas métricas.
* Se podrá consultar con la API cualquier dato procedente de hosts que tenga el nombre de host anterior.
* Para representar las métricas en un gráfico con los nombres de host nuevo y antiguo, usa [cálculos aritméticos entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/guide/agent-configuration-files/
[3]: /es/getting_started/tagging/#defining-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Herencia de integraciones

El método más eficaz para asignar etiquetas (tags) consiste en basarse en la herencia de integraciones. Las etiquetas que asignes a instancias de AWS, recetas de Chef y otras integraciones las heredan automáticamente los hosts y las métricas que envíes a Datadog.

En los entornos contenedorizados, se recomienda seguir la documentación acerca del [etiquetado de servicios unificado][2] para conseguir un único punto de configuración en toda la telemetría de Datadog.

##### Integraciones con soluciones en la nube

Las [integraciones con soluciones en la nube][3] se basan en la autenticación. Datadog recomienda usar el cuadro de las principales integraciones con soluciones en la nube (AWS, Azure, Google Cloud, etc.) e [instalar el Agent][4] siempre que sea posible. **Nota**: Si decides usar solo el Agent, algunas etiquetas (tags) de integración no estarán disponibles.

##### Integraciones con soluciones web

Las [integraciones con soluciones web][5] se basan en la autenticación. Las métricas se recopilan con llamadas de la API. **Nota**: Datadog convierte las etiquetas (tags) `CamelCase` en guiones bajos; por ejemplo, `TestTag` --> `test_tag`.

#### Variables de entorno

Una vez que hayas instalado el Datadog Agent contenedorizado, podrás configurar tus etiquetas (tags) de host con la variable de entorno `DD_TAGS` en el archivo de configuración principal de tus Agents.

Datadog recopila automáticamente las etiquetas (tags) habituales de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][6]. Para extraer aún más etiquetas, utiliza las siguientes opciones:

| Variable de entorno               | Descripción                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extrae etiquetas (labels) del contenedor. Esta variable de entorno es equivalente a la antigua `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extrae variables de entorno del contenedor. Esta variable de entorno es equivalente a la antigua `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extrae etiquetas (labels) del pod                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Añade etiquetas (tags) a las métricas de los checks (bajas, orquestador, altas)                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Añade etiquetas (tags) a las métricas personalizadas (bajas, orquestador, altas)                                                    |

**Ejemplos:**

```shell
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Con `DD_KUBERNETES_POD_LABELS_AS_TAGS`, puedes usar comodines en este formato:

```text
{"foo": "bar_%%label%%"}
```

Por ejemplo: `{"app*": "kube_%%label%%"}` cambia el nombre de la etiqueta (tag) a `kube_application` en el caso de `application`. Asimismo, `{"*": "kube_%%label%%"}` añade todas las labels del pod como si fuesen tags con el prefijo `kube_`.

Cuando uses la variable `DD_CONTAINER_LABELS_AS_TAGS` en un archivo `docker-compose.yaml` de Docker Swarm, elimina los apóstrofes. Ejemplo:

```shell
DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Al añadir etiquetas (labels) a contenedores Docker, es importante tener en cuenta la posición de la palabra clave `labels:` dentro del archivo `docker-compose.yaml`. Para evitar problemas, sigue la documentación acerca de [etiquetado de servicios unificado de Docker][2].

 Si es necesario etiquetar con labels el contenedor fuera de esta configuración, sitúa la palabra clave `labels:` **dentro** de la sección `services:` y **no** dentro de `deploy:`. Sitúa la palabra clave `labels:` dentro de la sección `deploy:` solo en caso de que sea necesario etiquetar el servicio. De no hacerlo, el Datadog Agent no tendrá ninguna label que extraer de los contenedores.

Más abajo, te presentamos un archivo `docker-compose.yaml` funcional de muestra. En el ejemplo, puedes ver que las etiquetas (labels) de la sección `myapplication:`, `my.custom.label.project` y `my.custom.label.version`, presentan valores independientes. Al usar la variable de entorno `DD_CONTAINER_LABELS_AS_TAGS` en la sección `datadog:`, se extraen las labels y se producen estas tags para el contenedor `myapplication`:

Las etiquetas (labels) que hay dentro del contenedor `myapplication` son `my.custom.label.project` y `my.custom.label.version`

Cuando el Agent extrae las labels del contenedor, las tags son:
`projecttag:projectA`
`versiontag:1`

**docker-compose.yaml de muestra:**

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
    image: 'gcr.io/datadoghq/agent:latest'
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

Puedes definir las variables en tu `datadog.yaml` personalizado o configurarlas como mapas JSON en estas variables de entorno. La clave de los mapas es el nombre de la fuente (`label/envvar`), mientras que el valor de los mapas es el nombre de la etiqueta (tag) de Datadog.

##### Cardinalidad de las etiquetas (tags)

Hay dos variables de entorno que establecen la cardinalidad de las etiquetas (tags): `DD_CHECKS_TAG_CARDINALITY` y `DD_DOGSTATSD_TAG_CARDINALITY`. El precio de DogStatsD se fija de un modo diferente, por lo que se aparta el parámetro de cardinalidad de las etiquetas (tags) de DogStatsD para obtener una configuración más precisa. De lo contrario, estas variables funcionarían igual, es decir, podrían presentar valores `low`, `orchestrator` o `high`. En ambos casos, `low` es el valor predeterminado, lo que introduce etiquetas (tags) de nivel de host.

Dependiendo de la cardinalidad, existe un conjunto diferente de etiquetas (tags) predefinidas para [Kubernetes y OpenShift][7], y para [Docker, Rancher, y Mesos][8]. En el caso de ECS y Fargate, al establecer la variable `orchestrator`, se añade la etiqueta (tag) `task_arn`.

#### Trazas

El rastreador de Datadog se puede configurar con variables de entorno, propiedades del sistema o mediante configuración en código. La documentación acerca de la [configuración de trazas de Datadog][9] contiene información sobre las opciones de etiquetado y la configuración de cada rastreador. También puedes seguir la documentación acerca del [etiquetado de servicios unificado][2] en caso de que desees configurar tu rastreador con esta finalidad.

Independientemente del rastreador que se utilice, los metadatos del tramo (span) deben seguir una estructura en árbol de tipos. Cada nodo del árbol está dividido por un `.` y es de un tipo único. 

Por ejemplo, un nodo no puede ser un objeto (con subnodos) y una cadena:
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
Los metadatos del tramo (span) de arriba no son válidos, ya que el valor de `key` no puede hacer referencia a una cadena (`"value"`) y también a un subárbol (`{"subkey": "value_2"}`).

### IU

{{< tabs >}}
{{% tab "Mapa de hosts" %}}

Usa la [página Host Map][1] para asignar etiquetas (tags) de host en la IU. Haz clic en un hexágono (o host) cualquiera para mostrar la superposición de hosts en la parte inferior de la página. A continuación, en la sección *User* (Usuario), haz clic en el botón **Edit Tags** (Editar etiquetas). Introduce una lista de etiquetas (tags) separadas por comas entre sí y, luego, haz clic en **Save Tags** (Guardar etiquetas). Los cambios realizados en las etiquetas (tags) de host de la IU pueden tardar hasta cinco minutos en aplicarse.

{{< img src="tagging/assigning_tags/hostmapuitags.png" alt="Tags de Host Map" style="width:80%;">}}

[1]: /es/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Lista de infraestructuras" %}}

Usa la [página Infrastructure List][1] para asignar etiquetas (tags) de host en la IU. Haz clic en un host cualquiera para mostrar la superposición de hosts en el lado derecho de la página. A continuación, en la sección *User* (Usuario), haz clic en el botón **Edit Tags** (Editar etiquetas). Introduce una lista de etiquetas (tags) separadas por comas entre sí y, luego, haz clic en **Save Tags** (Guardar etiquetas). Los cambios realizados en las etiquetas (tags) de host de la IU pueden tardar hasta cinco minutos en aplicarse. Una vez que hayas añadido las etiquetas, asegúrate de que sean visibles en la IU antes de intentar añadir más.

{{< img src="tagging/assigning_tags/hostuitags.png" alt="Tags de Infrastructure List" style="width:80%;">}}

[1]: /es/infrastructure/
{{% /tab %}}
{{% tab "Monitores" %}}

En la página [Manage Monitors][1], selecciona la casilla que está situada junto a cada monitor para añadir etiquetas (tags); puedes seleccionar uno o varios monitores. Haz clic en el botón **Edit Tags** (Editar etiquetas). Introduce una etiqueta (tag) o selecciona una que ya hayas usado previamente. Después, haz clic en **Add Tag `tag:name`** (Añadir la etiqueta tag:name) o **Apply Changes** (Aplicar cambios). En caso de que ya se hubiesen añadido las etiquetas con anterioridad, ten en cuenta que es posible asignar varias etiquetas al mismo tiempo con las casillas de las etiquetas.

{{< img src="tagging/assigning_tags/monitortags.png" alt="Tags de Gestionar monitores" style="width:80%;">}}

Cuando crees un monitor, asigna las etiquetas (tags) del monitor en el paso 4 *Say what's happening* (Saber qué ocurre):

{{< img src="tagging/assigning_tags/monitorindivdualtags.png" alt="Tags de Crear monitor" style="width:80%;">}}

[1]: /es/monitors/manage/
{{% /tab %}}
{{% tab "Métricas de distribución" %}}

En [Distribution Metrics][1], crea agregaciones de percentiles aplicando una lista de permisos de hasta diez etiquetas (tags) a una métrica. De este modo, crearás una cronología por cada combinación de valores de etiquetas potencialmente consultable. Para obtener más información sobre cómo hacer un count de métricas personalizadas y cronologías emitidas a partir de métricas de distribución, consulta la sección [Métricas personalizadas][2].

**Aplica hasta diez etiquetas (tags). No se aceptan etiquetas restrictivas**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Tags de Crear monitor" style="width:80%;">}}

[1]: /es/metrics/distributions/
[2]: /es/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integraciones" %}}

El cuadro de integración de [AWS][1] te permite asignar etiquetas (tags) adicionales a todas las métricas en el nivel de cuenta. Utiliza una lista de etiquetas (tags) separadas por comas en formato `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Tags de AWS" style="width:80%;">}}

[1]: /es/integrations/amazon_web_services/
{{% /tab %}}
{{% tab "Objetivos de nivel de servicio" %}}

Cuando crees un SLO, asigna las etiquetas (tags) en el paso 3 *Add name and tags* (Añadir nombre y etiquetas):

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Tags de Crear SLO" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "Asignación" %}}

Las etiquetas (tags) pueden asignarse de diferentes formas con la [API de Datadog][1]. Consulta la lista de abajo para encontrar los enlaces a esas secciones:

* [Publicar la ejecución de un check][1]
* [Publicar un evento][2]
* [Integración de AWS][3]
* [Publicar un punto en una cronología][4]
* [Crear][5] o [editar][6] un monitor
* [Añadir][7] o [actualizar][8] etiquetas (tags) de host
* [Enviar trazas (traces)][9]
* [Crear][10] o [actualizar][11] un objetivo de nivel de servicio

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

El etiquetado de Datadog constituye una manera muy eficaz de agrupar tus métricas. Por poner un ejemplo rápido, imagínate que quieres obtener la suma de las siguientes métricas procedentes de tu sitio web (example.com):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], host="example_prod_1")
Web server 2: api.metric('page.views', [(1317652676, 500), ...], host="example_prod_2")
```

Datadog recomienda añadir la etiqueta (tag) `domain:example.com` en vez del nombre de host (la API de Datadog determina el nombre de host automáticamente):

```text
Web server 1: api.metric('page.views', [(1317652676, 100), ...], tags=['domain:example.com'])
Web server 2: api.metric('page.views', [(1317652676, 500), ...], tags=['domain:example.com'])
```

Con la etiqueta (tag) `domain:example.com`, las visitas de la página se pueden sumar en todos los hosts:

```text
sum:page.views{domain:example.com}
```

Para obtener un desglose por host, utiliza lo siguiente:

```text
sum:page.views{domain:example.com} by {host}
```

{{% /tab %}}
{{< /tabs >}}

### DogStatsD

Añade etiquetas (tags) a cualquier métrica, evento o check de servicio que envíes a [DogStatsD][9]. Por ejemplo, puedes comparar el rendimiento de dos algoritmos etiquetando una métrica de temporizador con la versión del algoritmo:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Haz algo elaborado aquí…

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Haz algo elaborado (¿más rápido?) aquí…
```

**Nota**: El etiquetado es una [extensión de Datadog][10] en StatsD.

Cabe destacar que hay que prestar especial atención cuando se asigna la etiqueta (tag) `host` a las métricas de DogStatsD. Para obtener más información sobre la clave de la etiqueta (tag) de host, consulta la [sección DogStatsD][11].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/getting_started/tagging/#defining-tags
[2]: /es/getting_started/tagging/unified_service_tagging
[3]: /es/integrations/#cat-cloud
[4]: /es/getting_started/agent/#setup
[5]: /es/integrations/#cat-web
[6]: /es/agent/docker/?tab=standard#tagging
[7]: /es/agent/kubernetes/tag/?tab=containerizedagent#out-of-the-box-tags
[8]: /es/agent/docker/tag/?tab=containerizedagent#out-of-the-box-tagging
[9]: /es/tracing/setup/
[10]: /es/developers/dogstatsd/
[11]: /es/developers/community/libraries/