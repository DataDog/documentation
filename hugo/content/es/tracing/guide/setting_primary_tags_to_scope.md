---
aliases:
- /es/tracing/advanced/setting_primary_tags_to_scope/
description: Aprenda a configurar etiquetas principales para definir el contexto y
  filtrar datos de APM en diferentes entornos, servicios y versiones para una mejor
  organización.
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: Documentación
  text: Conecte sus registros y trazas juntos
- link: /tracing/manual_instrumentation/
  tag: Documentación
  text: Instrumente manualmente su aplicación para crear trazas.
- link: /tracing/opentracing/
  tag: Documentación
  text: Implemente Opentracing en sus aplicaciones.
- link: /tracing/glossary/
  tag: Documentación
  text: Explore sus servicios, recursos y trazas
title: Configurar etiquetas principales para definir el contexto
---
## Definición {#definition}

Existen varias dimensiones disponibles para definir el contexto de una aplicación completa de Datadog APM. Estos incluyen estadísticas agregadas (como solicitudes/segundo, latencia, tasa de error, puntuación Apdex) y [traces][1] visibles. Estas dimensiones se configuran mediante etiquetas principales que le permiten obtener una vista aún más detallada del comportamiento de su aplicación. Los casos de uso para las etiquetas principales incluyen entorno, zona de disponibilidad, centro de datos, etc.

Las etiquetas principales deben seguir un conjunto de reglas diferente al de las [etiquetas de Datadog][2] convencionales.

## Configuración {#setup}

### Entorno {#environment}

La etiqueta principal predeterminada y obligatoria es el entorno del cual se recopilan sus trazas. Su clave de etiqueta es `env`, y su valor predeterminado para datos sin etiquetas es `env:none`.

#### Entorno del tracer {#tracer-environment}

Datadog recomienda que el SDK configure `env`. También permite una mayor flexibilidad porque la definición de `env` reside dentro del tiempo de ejecución real del servicio.

Si `DD_ENV` está expuesto al proceso de su servicio, el SDK lo usará automáticamente. Consulte [Unified Service Tagging][3] para obtener información sobre cómo configurar `DD_ENV` y otras variables de entorno de servicio estándar.

También puede configurar manualmente `env` como una etiqueta global para el SDK en el código. Consulte [asignación de etiquetas en APM][4] para obtener más información.

#### Entorno del Agent {#agent-environment}

La etiqueta `env` se puede configurar en la configuración de su Agent.
**No configure etiquetas `env` diferentes en el Tracer y el Agent. Esto puede causar una duplicación de etiquetas en las [métricas de traza][5].**

Opciones:

1. Configuración del Agente de nivel superior:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Containerized environments**: The Agent also supports configuration of the top-level `env` through the environment variable `DD_ENV`.

2. Etiqueta de host del Agente:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Containerized environments**: The Agent also supports configuration of top-level `tags` through the environment variable `DD_TAGS`.

#### Datos por entorno {#data-by-environment}

Los entornos aparecen en la parte superior de las páginas de APM. Use el menú desplegable `env` para limitar los datos mostrados en la página actual.

## Agregue etiquetas principales adicionales en Datadog {#add-additional-primary-tags-in-datadog}

Si necesita agregar sus métricas de traza a través de dimensiones adicionales, Datadog recomienda configurar etiquetas principales adicionales además de la etiqueta principal obligatoria `env:<ENVIRONMENT>`. Una vez configurado, un segundo menú desplegable estará disponible en la pestaña {{< ui >}}Catalog Performance{{< /ui >}}. 

Vaya a la página de [APM Settings][6] para definir, cambiar o eliminar sus etiquetas principales.

**Nota**:

* Solo los administradores de la organización tienen acceso a esta página.
* Los cambios pueden tardar hasta dos horas en reflejarse en la interfaz de usuario.
* El SDK siempre añade las etiquetas `resource`, `name` y `service` a los tramos. Datadog recomienda no añadirlas nunca como etiquetas a nivel de host para evitar confusiones.
* Las etiquetas principales adicionales admiten hasta 100 valores únicos por etiqueta. Consulte las [APM data volume guidelines][9] para obtener más detalles.
* Las etiquetas principales adicionales pueden ser etiquetas de host o de contenedor. Las etiquetas a nivel de tramo añadidas por el SDK no pueden utilizarse como etiquetas principales.

Si cambia una etiqueta principal establecida anteriormente, tenga en cuenta lo siguiente:

* Los datos históricos de APM agregados por la etiqueta establecida anteriormente ya no son accesibles.
* Cualquier Monitor de APM con alcance a la etiqueta anterior mostrará un estado de {{< ui >}}No Data{{< /ui >}}.

## Etiquetas principales adicionales basadas en contenedores {#container-based-additional-primary-tags}

Puede indexar sus métricas de traza basándose en las etiquetas derivadas de los contenedores Docker y los metadatos de pods de Kubernetes en plataformas basadas en Linux.

Las etiquetas principales basadas en contenedores están habilitadas de forma predeterminada en las versiones 7.65.0 y posteriores del Datadog Agent. Vaya a la página de [APM Settings][6] y seleccione la etiqueta principal adicional que desea utilizar. Los cambios en esta configuración pueden tardar hasta dos horas en surtir efecto.

Puede filtrar sus servicios en el [Catalog][7] por la etiqueta que envían sus servicios en contenedores. Las métricas de traza utilizadas por los Dashboards y Monitors también pueden agregarse mediante la etiqueta principal de contenedor.

**Nota**: Los valores de las etiquetas principales no deben contener letras mayúsculas ni caracteres especiales (además de guiones bajos, guiones, dos puntos, puntos y barras). Si lo hacen, es posible que algunas funciones no funcionen correctamente.

### Deshabilitar etiquetas principales basadas en contenedores {#disable-container-based-primary-tags}

Para desactivar las etiquetas principales basadas en contenedores, configure la función `disable_cid_stats` APM y reinicie el Agent. Si `DD_APM_FEATURES` ya está configurado, agregue `disable_cid_stats` a su lista separada por comas. El procedimiento depende de cómo instaló el Agent:

{{< tabs >}}
{{% tab "Helm" %}}

Agregue lo siguiente a su archivo de valores:

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}

{{% tab "Kubernetes (sin Helm)" %}}

Use la siguiente variable de entorno en el DaemonSet del Agent. Si está ejecutando un contenedor por proceso del Agent, agregue la siguiente variable de entorno a todos los contenedores. De lo contrario, agréguela al contenedor del Agent.

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'disable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Agregue lo siguiente a su archivo [docker-compose.yml][1]:

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES=disable_cid_stats
```


[1]: /es/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "Variables de entorno" %}}

Si configura el Agent con variables de entorno, como es común en las instalaciones de Docker y ECS, pase la siguiente variable de entorno al trace Agent.

```
DD_APM_FEATURES=disable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

### Etiquetas personalizadas como tags {#custom-labels-as-tags}

Si aún no lo ha hecho, también puede configurar el Agent para enviar etiquetas de contenedor o pod como etiquetas personalizadas para sus trazas con [Asignación de Etiquetas][8].

## Ver datos por etiqueta principal {#view-data-by-primary-tag}

Las etiquetas principales aparecen en la parte superior de las páginas de APM. Utilice estos selectores para filtrar los datos mostrados en la página actual. Para ver todos los datos independientemente de una etiqueta principal, elija `<TAG_NAME>:*` en el menú desplegable.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="El menú desplegable que muestra las opciones para seleccionar un contexto con la segunda etiqueta principal" style="width:90%;">}}


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/getting_started/tagging/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/getting_started/tagging/assigning_tags/#traces
[5]: /es/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings/default-settings
[7]: https://app.datadoghq.com/services
[8]: /es/getting_started/tagging/assigning_tags
[9]: /es/tracing/troubleshooting/#data-volume-guidelines