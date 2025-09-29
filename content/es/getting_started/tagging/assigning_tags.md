---
aliases:
- /es/agent/tagging
- /es/tagging/assigning_tags/
description: Descubre cómo asignar etiquetas (tags) en Datadog.
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Empezando con las etiquetas (tags)
- link: /getting_started/tagging/using_tags/
  tag: Documentación
  text: Descubre cómo utilizar etiquetas (tags) en Datadog.
title: Asignar etiquetas (tags)
---

## Información general

En Datadog, el etiquetado (tag) sirve para realizar consultas sobre las máquinas y métricas monitorizadas. Si no existiese la posibilidad de asignar y filtrar elementos mediante etiquetas (tags), resultaría difícil buscar los problemas que afectan al entorno y acotar los resultados lo suficiente como para descubrir sus causas reales. Antes de continuar, obtén más información sobre cómo [definir las etiquetas][1] en Datadog.

Las etiquetas (tags) se pueden configurar de varias formas diferentes:

- En el [archivo de configuración](#configuration-file) del Datadog Agent o en el de cualquier integración particular
- A través de la [interfaz de usuario](#ui) de Datadog
- Con la [API](#api) de Datadog
- Con el [DogStatsD](#dogstatsd)

{{< tabs >}}
{{% tab "Entornos no contenedorizados" %}}
En los entornos no contenedorizados, el Agent asigna automáticamente la [etiqueta (tag) del host](#host-tags) y hereda las etiquetas de las integraciones. Estas etiquetas, así como las etiquetas adicionales que puedes añadir manualmente, se configuran en el [archivo de configuración del Datadog Agent](#configuration-file).
{{% /tab %}}

{{% tab "Entornos contenedorizados" %}}
En los entornos contenedorizados, Datadog recomienda utilizar [Autodiscovery][1], puesto que permite emplear el [etiquetado (tag) de servicios unificado][2], que es el método recomendado para definir un único punto de configuración en toda la telemetría de Datadog.

El objetivo de Autodiscovery consiste en aplicar la configuración de una integración de Datadog al efectuar un check del Agent en un contenedor determinado. Cuando se utiliza Autodiscovery, el Datadog Agent identifica automáticamente los servicios que se ejecutan en el nuevo contenedor, busca la configuración más adecuada para la monitorización e inicia la recopilación de métricas. A continuación, las etiquetas (tags) se pueden configurar desde la [plantilla de configuración][3] de Autodiscovery.

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

El archivo de configuración del Agent (`datadog.yaml`) se utiliza para configurar las etiquetas (tags) de host que se aplican a todas las métricas, trazas (traces) y logs reenviados por el Datadog Agent.

Las etiquetas (tags) de las [integraciones][1] instaladas con el Agent se configuran con archivos YAML localizados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulta la sección [Archivos de configuración del Agent][2].

#### Formato YAML

En los archivos YAML, utiliza una de las listas de cadenas de la clave `tags` para asignar una lista de etiquetas (tags). En YAML, las listas se definen de dos formas diferentes, aunque funcionalmente equivalentes:

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

Aunque se recomienda asignar las etiquetas (tags) en pares de `<KEY>:<VALUE>`, también se aceptan las etiquetas que sólo constan de claves (`<KEY>`). Para obtener más información, consulta [cómo se definen las etiquetas][3].

#### Etiquetas (tags) de host

El nombre de host (clave de etiqueta (tag) `host`) lo [asigna automáticamente][4] el Datadog Agent. Para personalizarlo, utiliza el archivo de configuración del Agent `datadog.yaml`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambiar el nombre de host

* El nombre de host anterior permanecerá en la interfaz de usuario durante dos horas, pero no reflejará las nuevas métricas.
* Con la API, se podrá consultar cualquier dato procedente de hosts que tengan el nombre de host anterior.
* Para representar las métricas en un gráfico con los nombres de host nuevo y antiguo, utiliza [cálculos aritméticos entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{% tab "Agent v5" %}}

#### Localización de los archivos

El archivo de configuración del Agent (`datadog.conf`) se utiliza para configurar las etiquetas (tags) de host que se aplican a todas las métricas, trazas y logs reenviados por el Datadog Agent.

Las etiquetas (tags) de las [integraciones][1] instaladas con el Agent se configuran con archivos YAML localizados en el directorio **conf.d** de la instalación del Agent. Para localizar los archivos de configuración, consulta la sección [Archivos de configuración del Agent][2].

#### Formato YAML

En los archivos YAML, utiliza una de las listas de cadenas de la clave `tags` para asignar una lista de etiquetas (tags). En YAML, las listas se definen de dos formas diferentes, aunque funcionalmente equivalentes:

```yaml
tags: <KEY_1>:<VALUE_1>, <KEY_2>:<VALUE_2>, <KEY_3>:<VALUE_3>
```

Aunque se recomienda asignar las etiquetas (tags) en pares de `<KEY>:<VALUE>`, también se aceptan las etiquetas que sólo constan de claves (`<KEY>`). Para obtener más información, consulta [cómo se definen las etiquetas][3].

#### Etiquetas (tags) de host

El nombre de host (clave de etiqueta (tag) `host`) lo [asigna automáticamente][4] el Datadog Agent. Para personalizarlo, utiliza el archivo de configuración del Agent `datadog.conf`:

```yaml
# Set the hostname (default: auto-detected)
# Must comply with RFC-1123, which permits only:
# "A" to "Z", "a" to "z", "0" to "9", and the hyphen (-)
hostname: mymachine.mydomain
```

##### Cambiar el nombre de host

* El nombre de host anterior permanecerá en la interfaz de usuario durante dos horas, pero no reflejará las nuevas métricas.
* Con la API, se podrá consultar cualquier dato procedente de hosts que tengan el nombre de host anterior.
* Para representar las métricas en un gráfico con los nombres de host nuevo y antiguo, utiliza [cálculos aritméticos entre dos métricas][5].


[1]: /es/getting_started/integrations/
[2]: /es/agent/configuration/agent-configuration-files/
[3]: /es/getting_started/tagging/#define-tags
[4]: /es/metrics/custom_metrics/dogstatsd_metrics_submission/#host-tag-key
[5]: /es/dashboards/querying/#arithmetic-between-two-metrics
{{% /tab %}}
{{< /tabs >}}

#### Herencia de integraciones

El método más eficaz para asignar etiquetas (tags) consiste en basarse en la herencia de integraciones. Las etiquetas que asignes a instancias de AWS, recetas de Chef y otras integraciones las heredan automáticamente los hosts y las métricas que envías a Datadog.

En los entornos contenedorizados, se recomienda seguir la documentación del [etiquetado (tag) de servicios unificado][2] para definir un único punto de configuración en toda la telemetría de Datadog.

##### Integraciones en la nube

Las [integraciones en la nube][3] se basan en la autenticación. Datadog recomienda utilizar el cuadro de las principales integraciones en la nube (AWS, Azure, Google Cloud, etc.) e [instalar el Agent][4] siempre que sea posible. **Nota**: Si decides utilizar sólo el Agent, algunas etiquetas (tags) de integracones no estarán disponibles.

##### Integraciones web

Las [integraciones web][5] se basan en la autenticación. Las métricas se recopilan con llamadas de la API. **Nota**: Datadog convierte las etiquetas (tags) `CamelCase` en guiones bajos; por ejemplo, `TestTag` --> `test_tag`.

#### Variables de entorno

Después de instalar el Datadog Agent contenedorizado, puedes configurar tus etiquetas de host utilizando la variable de entorno `DD_TAGS` en tu archivo de configuración principal del Agent. Si especificas varias etiquetas, separa cada una de ellas con un espacio.

Datadog recopila automáticamente las etiquetas (tags) habituales de [Docker, Kubernetes, ECS, Swarm, Mesos, Nomad y Rancher][6]. Para extraer aún más etiquetas, utiliza las siguientes opciones:

| Variable de entorno               | Descripción                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `DD_CONTAINER_LABELS_AS_TAGS`      | Extrae etiquetas (labels) del contenedor. Este entorno es equivalente al antiguo entorno `DD_DOCKER_LABELS_AS_TAGS`.             |
| `DD_CONTAINER_ENV_AS_TAGS`         | Extrae variables de entorno del contenedor. Este entorno es equivalente al antiguo entorno `DD_DOCKER_ENV_AS_TAGS`. |
| `DD_KUBERNETES_POD_LABELS_AS_TAGS` | Extracción de etiquetas (labels) del pod                                                                                      |
| `DD_CHECKS_TAG_CARDINALITY`        | Añadir etiquetas (tags) a las métricas de los checks (bajas, orquestador, altas)                                                     |
| `DD_DOGSTATSD_TAG_CARDINALITY`     | Añadir etiquetas (tags) a las métricas personalizadas (bajas, orquestador, altas)                                                    |

**Ejemplos:**

```bash
DD_KUBERNETES_POD_LABELS_AS_TAGS='{"app":"kube_app","release":"helm_release"}'
DD_CONTAINER_LABELS_AS_TAGS='{"com.docker.compose.service":"service_name"}'
```

Con `DD_KUBERNETES_POD_LABELS_AS_TAGS`, puedes utilizar comodines con este formato:

```text
{"foo": "bar_%%label%%"}
```

Por ejemplo: `{"app*": "kube_%%label%%"}` cambia el nombre de la etiqueta (tag) a `kube_application` en el caso de la etiqueta (label) `application`. Asimismo, `{"*": "kube_%%label%%"}` añade todas las etiquetas (labels) del pod como si fuesen etiquetas (tags) con el prefijo `kube_`.

Cuando utilices la variable `DD_CONTAINER_LABELS_AS_TAGS` en un archivo `docker-compose.yaml` de Docker Swarm, elimina los apóstrofes. Por ejemplo:

```yaml
- DD_CONTAINER_LABELS_AS_TAGS={"com.docker.compose.service":"service_name"}
```

Al añadir etiquetas (labels) a contenedores Docker, es importante tener en cuenta la posición de la palabra clave `labels:` dentro del archivo `docker-compose.yaml`. Para evitar problemas, sigue la documentación del [etiquetado (tag) de servicios unificado de Docker][2].

Si es necesario aplicar etiquetas (labels) al contenedor fuera de esta configuración, coloca la palabra clave `labels:` **dentro** de la sección `services:` y **no** dentro de `deploy:`. Coloca la palabra clave `labels:` dentro de la sección `deploy:` sólo en caso de que sea necesario etiquetar el servicio. De no hacerlo, el Datadog Agent no tendrá ninguna etiqueta que extraer de los contenedores.

A continuación podrás ver un archivo `docker-compose.yaml` funcional de muestra. En el ejemplo, las etiquetas (labels) de la sección `myapplication:`, `my.custom.label.project` y `my.custom.label.version`, presentan valores únicos. Al utilizar la variable de entorno `DD_CONTAINER_LABELS_AS_TAGS` de la sección `datadog:`, se extraen las etiquetas (labels) y se generan esas etiquetas (tags) para el contenedor `myapplication`:

Dentro del contenedor `myapplication` se encuentran las etiquetas (labels)`my.custom.label.project` y `my.custom.label.version`

Cuando el Agent extrae las etiquetas (labels) del contenedor, las etiquetas (tags) son:
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

Hay dos variables de entorno que establecen la cardinalidad de etiqueta: `DD_CHECKS_TAG_CARDINALITY` y `DD_DOGSTATSD_TAG_CARDINALITY`. Dado que DogStatsD tiene un precio diferente, el ajuste de cardinalidad de la etiqueta DogStatsD se separa para dar la oportunidad de una configuración más detallada. Por lo demás, estas variables funcionan de la misma manera: pueden tener los valores `low`, `orchestrator` o `high`. Ambas tienen por defecto `low`, que extrae etiquetas de nivel de clúster de Kubernetes.

Los diferentes ajustes de cardinalidad objetivo:
* `low`: etiquetas de nivel de clúster de Kubernetes, como `kube_namespace`.
* `orchestrator`: etiquetas de nivel de pod, como `pod_name`.
* `high`: etiquetas de nivel de contenedor, como `container_id`.

Dependiendo de la cardinalidad, existe un conjunto diferente de etiquetas (tags) predefinidas para [Kubernetes y OpenShift][7], y para [Docker, Rancher, y Mesos][8]. En el caso de ECS y Fargate, al definir la variable como `orchestrator`, se añade la etiqueta `task_arn`.

**Notas**:
- El envío de etiquetas de contenedor para las métricas de DogStatsD puede crear más métricas (una por contenedor en lugar de una por host). Esto puede afectar a la facturación de tus métricas personalizadas.
- En las métricas, las marcas de tiempo se redondean al segundo más próximo. Si algún punto tiene la misma marca de tiempo, el último punto sobrescribe a los anteriores. Una cardinalidad mayor puede ayudar a evitar este problema.

#### Trazas

El rastreador de Datadog se puede configurar con variables de entorno, propiedades del sistema o mediante la configuración en código. La documentación de la [configuración del rastreo en Datadog][9] contiene información sobre las opciones de etiquetado (tag) y la configuración de cada rastreador. También puedes seguir la documentación del [etiquetado de servicios unificado][2] en caso de que desees configurar tu rastreador con esta función.

Independientemente del rastreador que se utilice, los metadatos del tramo (span) deben seguir una estructura en árbol de tipos. Cada nodo del árbol está dividido por un `.` y es de tipo único. 

Por ejemplo, un nodo no puede ser un objeto (con subnodos) y una cadena:
```json
{
  "key": "value",
  "key.subkey": "value_2"
}
```
Los metadatos del tramo anterior no son válidos, ya que el valor de `key` no puede hacer referencia a una cadena (`"value"`) y también a un subárbol (`{"subkey": "value_2"}`).

### Interfaz de usuario

{{< tabs >}}
{{% tab "Mapa de host" %}}

Asigna etiquetas (tags) de host en la interfaz de usuario utilizando la [página del mapa de host][1]. Haz clic en cualquier hexágono (host) para mostrar la superposición de hosts en la parte inferior de la página. A continuación, en la sección *Usuario*, haz clic en el botón **Add Tags** (Añadir etiquetas). Introduce las etiquetas en forma de lista separada por comas y haz clic en **Save Tags** (Guardar etiquetas). Los cambios realizados en las etiquetas de host en la interfaz de usuario pueden tardar hasta cinco minutos en surtir efecto.

{{< img src="tagging/assigning_tags/host_add_tags.png" alt="Mapa de host con la información del host abierta, donde se resalta el botón Añadir etiquetas (tags)" style="width:80%;">}}


[1]: /es/infrastructure/hostmap/
{{% /tab %}}
{{% tab "Lista de infraestructuras" %}}

Asigna etiquetas (tags) de host en la interfaz de usuario utilizando la [página de la lista de infraestructuras][1]. Haz clic en un host cualquiera para mostrar la superposición de hosts en el lado derecho de la página. A continuación, en la sección *Usuario*, haz clic en el botón **Edit Tags** (Editar etiquetas). Introduce una lista de etiquetas separadas por comas entre sí y, luego, haz clic en **Save Tags** (Guardar etiquetas). Los cambios realizados en las etiquetas de host de la interfaz de usuario pueden tardar hasta cinco minutos en surtir efecto. Una vez que hayas añadido las etiquetas, asegúrate de que sean visibles en la interfaz de usuario antes de intentar añadir más.

{{< img src="tagging/assigning_tags/infrastructure_add_tags.png" alt="Lista de infraestructuras con un panel de información de las infraestructuras abierto, donde se resalta el botón Añadir etiquetas (tags)" style="width:80%;">}}


[1]: /es/infrastructure/
{{% /tab %}}
{{% tab "Monitores" %}}

En la página [Gestionar monitores][1], selecciona la casilla de verificación junto a cada monitor para añadir etiquetas (tags) (selecciona uno o varios monitores). Haz clic en el botón **Edit Tags** (Editar etiquetas). Introduce una etiqueta o selecciona una utilizada anteriormente. A continuación, haz clic en **Add Tag `tag:name`** (Añadir etiqueta [nombre]) o en **Apply Changes** (Aplicar cambios). Si ya se han añadido etiquetas, se pueden asignar varias a la vez utilizando sus casillas de verificación correspondientes. Para obtener más información, consulta la [documentación de gestión de monitores][2].

Al crear un monitor, asigna etiquetas (tags) de monitor en el paso 4, *Cuéntanos qué ocurre* o *Notifica a tu equipo*:

{{< img src="monitors/notificaciones/notifications_add_required_tags.png" alt="Vista de la configuración de una etiqueta (tag) de política. Debajo de 'Etiquetas de política', hay tres ejemplos de etiquetas: cost_center, product_id y env, junto al menú desplegable 'Seleccionar valor'." style="width:80%;" >}}

[1]: https://app.datadoghq.com/monitors/manage
[2]: /es/monitors/manage/
{{% /tab %}}
{{% tab "Métricas de distribución" %}}

En [Métricas de distribución][1], crea agregaciones de percentiles aplicando una lista de permisos de hasta diez etiquetas (tags) a una métrica. De este modo, crearás una cronología por cada combinación de valores de etiquetas potencialmente consultable. Para obtener más información sobre cómo hacer un recuento de métricas personalizadas y cronologías emitidas a partir de métricas de distribución, consulta [Métricas personalizadas][2].

**Aplica hasta diez etiquetas (tags). No se aceptan etiquetas restrictivas**:

{{< img src="tagging/assigning_tags/global_metrics_selection.png" alt="Crear etiquetas (tags) de monitor" style="width:80%;">}}

[1]: /es/metrics/distributions/
[2]: /es/metrics/custom_metrics/
{{% /tab %}}
{{% tab "Integraciones" %}}

El cuadro de integración de [AWS][1] te permite asignar etiquetas adicionales a todas las métricas a nivel de cuenta, así como a los logs enviados a través de [activadores automáticos de suscripción][2]. Utiliza una lista de etiquetas separadas por comas de la forma `<KEY>:<VALUE>`.

{{< img src="tagging/assigning_tags/integrationtags.png" alt="Etiquetas (tags) AWS" style="width:80%;">}}

[1]: /es/integrations/amazon_web_services/
[2]: /es/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/#automatically-set-up-triggers
{{% /tab %}}
{{% tab "Objetivos de nivel de servicio (SLOs)" %}}

Cuando crees un SLO, asigna las etiquetas (tags) en el paso 3, *Añadir nombre y etiquetas*:

{{< img src="tagging/assigning_tags/slo_individual_tags.png" alt="Crear etiquetas (tags) de SLOs" style="width:80%;">}}

{{% /tab %}}
{{< /tabs >}}

### API

{{< tabs >}}
{{% tab "Asignación" %}}

Las etiquetas (tags) pueden asignarse de diferentes formas con la [API de Datadog][1]. Consulta la siguiente lista para encontrar los enlaces a esas secciones:

* [Publicar la ejecución de un check][1]
* [Publicar un evento][2]
* [Integración de AWS][3]
* [Publicar un punto en una cronología][4]
* [Crear][5] o [editar][6] un monitor
* [Añadir][7] o [actualizar][8] etiquetas (tags) de host
* [Enviar trazas][9]
* [Crear][10] o [actualizar][11] un objetivo de nivel de servicio (SLO)

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

El etiquetado (tag) de Datadog constituye una manera muy eficaz de agrupar tus métricas. Por poner un ejemplo rápido, imagínate que quieres obtener la suma de las siguientes métricas procedentes de tu sitio web (example.com):

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

Añade etiquetas (tags) a cualquier métrica, evento o check de servicio que envíes a [DogStatsD][10]. Por ejemplo, puedes comparar el rendimiento de dos algoritmos etiquetando una métrica de temporizador con la versión del algoritmo:

```python

@statsd.timed('algorithm.run_time', tags=['algorithm:one'])
def algorithm_one():
    # Haz algo elaborado aquí ...

@statsd.timed('algorithm.run_time', tags=['algorithm:two'])
def algorithm_two():
    # Haz algo elaborado (tal vez más rápido) aquí ...
```

**Nota**: El etiquetado es una [extensión específica de Datadog][11] en StatsD.

Es necesario prestar especial atención cuando se asigna la etiqueta `host` a las métricas de DogStatsD. Para obtener más información sobre la clave de la etiqueta de host, consulta la documentación [Envío de métricas: DogStatsD][12].

## Referencias adicionales

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
[10]: /es/developers/dogstatsd/
[11]: /es/developers/community/libraries/
[12]: /es/metrics/dogstatsd_metrics_submission/#host-tag