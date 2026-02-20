---
aliases:
- /es/tracing/advanced/setting_primary_tags_to_scope/
description: Aprende a establecer etiquetas primarias para delimitar y filtrar los
  datos de APM en diferentes entornos, servicios y versiones para una mejor organización.
further_reading:
- link: /tracing/other_telemetry/connect_logs_and_traces/
  tag: Documentación
  text: Conectar tus logs y trazas (traces)
- link: /tracing/manual_instrumentation/
  tag: Documentación
  text: Instrumenta manualmente tu aplicación para crear trazas.
- link: /tracing/opentracing/
  tag: Documentación
  text: Implementa Opentracing en todas tus aplicaciones.
- link: /tracing/glossary/
  tag: Documentación
  text: Explora tus servicios, recursos y trazas
title: Configurar etiquetas (tags) primarias como contexto
---

## Definición

Hay varias dimensiones disponibles para limitar una aplicación completa de Datadog APM. Estas incluyen estadísticas agregadas (como solicitudes/segundo, latencia, tasa de error, puntuación de Apdex) y [trazas][1] visibles. Estas dimensiones se configuran a través de etiquetas (tags) primarias que te permiten obtener una visión aún más detallada del comportamiento de tu aplicación. Los casos de uso para etiquetas primarias incluyen entorno, zona de disponibilidad, centro de datos, etc.

Las etiquetas deben seguir una serie de reglas diferentes a las de [etiquetas de Datadog][2].

## Configuración

### Entorno

La etiqueta (tag) primaria predeterminada y obligatoria es el entorno del que se recopilan tus trazas. Su clave de etiqueta es `env`, y su valor por defecto para datos no etiquetados es `env:none`.

#### Entorno del rastreador

Datadog recomienda que el rastreador defina `env`. También permite una mayor flexibilidad porque la definición de `env` se encuentra dentro del tiempo de ejecución real del servicio.

Si `DD_ENV` está expuesto al proceso de tu servicio, el rastreador lo utilizará automáticamente. Consulta [etiquetado de servicios unificado][3] para aprender a configurar `DD_ENV` y otras variables de entorno de servicio estándar.

También puedes establecer manualmente `env` como una etiqueta (tag) global para el rastreador en código. Consulta [asignar etiquetas en APM][4] para más información.

#### Entorno de Agent

La etiqueta (tag) `env` se puede establecer en tu configuración del Agent.
**No configures diferentes etiquetas `env` en el rastreador y el Agent. Esto puede causar etiquetado duplicado en [métricas de rastreo][5].**

Opciones:

1. Configuración del Agent de nivel superior:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Entornos contenedorizados**: el Agent también admite la configuración del `env` de nivel superior a través de la variable de entorno `DD_ENV`.

2. Etiqueta (tag) de host del Agent:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Contenedor entornos**: El Agent también admite Configuración de nivel superior `tags` a través de la variable entorno `DD_TAGS` .

#### Datos por entorno

Los entornos aparecen en la parte superior de las páginas de APM. Utiliza el menú desplegable `env` para limitar los datos que aparecen en la página actual.

## Añadir etiquetas (tags) primarias adicionales en Datadog

Si necesitas añadir tus métricas de rastreo en dimensiones adicionales, Datadog recomienda configurar una etiquetas (tags) primarias adicionales, además de la etiqueta primaria predeterminada y obligatoria `env:<ENVIRONMENT>`. Una vez configurada, hay disponible un segundo menú desplegable en la pestaña **Rendimiento del Catálogo de servicios**.

Ve a la página [Configuración de APM][6] para definir, cambiar o eliminar tus etiquetas (tags) primarias.

**Nota**:

* Solo los administradores de la organización tienen acceso a esta página.
* Los cambios pueden tardar hasta dos horas en reflejarse en la interfaz de usuario.
* El rastreador siempre añade etiquetas (tags) `resource`, `name` y `service` a los tramos (spans). Datadog recomienda no añadirlas nunca como etiquetas a nivel de host para evitar confusiones.
* Las etiquetas (tags) primarias adicionales admiten hasta 100 valores únicos por etiqueta. Para ver más detalles, consulta las [directrices sobre volúmenes de datos de APM][9].
* Las etiquetas primarias adicionales pueden ser etiquetas de host o de contenedor. Las etiquetas de tramo añadidas por el rastreador no pueden utilizarse como etiquetas primarias.

Si cambias una etiqueta (tag) primaria previamente configurada, ten en cuenta lo siguiente:

* Ya no se puede acceder a los datos históricos de APM agregados por la etiqueta (tag) establecida anteriormente.
* Los monitores de APM asignados a la etiqueta (tag) anterior muestran el estado _No Data_ (Sin datos).

## Etiquetas (tags) primarias adicionales basadas en contenedores

Puedes indexar tus métricas de rastreo en función de las etiquetas (tags) derivadas de contenedores de Docker y metadatos de pods de Kubernetes en plataformas Linux. Las etiquetas primarias basadas en contenedores están disponibles en el Datadog Agent versión 7.35.0 y posteriores.

Para habilitar etiquetas (tags) primarias basadas en contenedores, instala el Agent versión 7.35.0 o posterior, actualiza la configuración de las estadísticas CID como se describe a continuación y reinicia el Agent. El procedimiento de activación depende del método de instalación del Agent:

{{< tabs >}}
{{% tab "Helm" %}}

Con la Datadog Helm chart versión 2.26.2 o posterior, añade lo siguiente a tu archivo de valores:

```yaml
#...
datadog:
  #...
  env:
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{% /tab %}}

{{% tab "Kubernetes (without Helm)" %}}

Utiliza la siguiente variable de entorno en el DaemonSet del Agent. Si estás ejecutando un contenedor por proceso de Agent, añade la siguiente variable de entorno a todos los contenedores. De lo contrario, añádela al contenedor del Agent.

```yaml
# (...)
  env:
    # (...)
    - name: DD_APM_FEATURES
      value: 'enable_cid_stats'
```

{{% /tab %}}
{{% tab "Docker Compose" %}}

Añade lo siguiente a tu archivo [Docker-compose.yml][1]:

```yaml
services:
  #...
  datadog:
    #...
    environment:
     - DD_APM_FEATURES: 'enable_cid_stats'
```


[1]: /es/agent/guide/compose-and-the-datadog-agent/
{{% /tab %}}
{{% tab "Variables de entorno" %}}

Si configuras el Agent con variables de entorno, como es común con instalaciones de Docker y ECS, pasa la siguiente variable de entorno al Agent de traza después de actualizar la imagen de Docker.

```
DD_APM_FEATURES=enable_cid_stats
```

{{% /tab %}}
{{< /tabs >}}

Reinicia el Agent. Ve a la página de [configuración de APM][6] y selecciona la etiqueta (tag) primaria adicional que quieres utilizar. Los cambios en esta configuración pueden tardar hasta dos horas en surtir efecto.

Ahora puedes filtrar tus servicios en el [Catálogo de servicios][7] por la etiqueta (tag) enviada por tus servicios en contenedores. Las métricas de rastreo utilizadas por dashboards y monitores también pueden ser agregadas por la etiqueta primaria del contenedor.

**Nota**: Los valores de las etiquetas (tags) primarias no deben contener mayúsculas ni caracteres especiales (aparte de guiones bajos, signo menos, dos puntos, puntos y barras). Si lo hacen, es posible que algunas características no funcionen correctamente.

### Etiquetas (labels) personalizadas como etiquetas (tags)

Si aún no lo has hecho, también puedes configurar el Agent para enviar etiquetas (labels) de contenedor o pod como etiquetas (tags) personalizadas para tus trazas con [Asignación de etiquetas (tags)][8].

## Ver datos por etiqueta (tag) primaria

Las etiquetas (tags) principales aparecen en la parte superior de las páginas de APM. Utiliza estos selectores para filtrar los datos mostrados en la página actual. Para ver todos los datos independientemente de una etiqueta primaria, selecciona `<TAG_NAME>:*` en el menú desplegable.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="El menú desplegable que muestra opciones para seleccionar un contexto con la segunda etiqueta (tag) primaria" style="width:90%;">}}


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/glossary/#trace
[2]: /es/getting_started/tagging/
[3]: /es/getting_started/tagging/unified_service_tagging
[4]: /es/getting_started/tagging/assigning_tags/#traces
[5]: /es/tracing/metrics/metrics_namespace/
[6]: https://app.datadoghq.com/apm/settings
[7]: https://app.datadoghq.com/services
[8]: /es/getting_started/tagging/assigning_tags
[9]: /es/tracing/troubleshooting/#data-volume-guidelines