---
aliases:
- /es/tracing/advanced/setting_primary_tags_to_scope/
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
kind: documentación
title: Configurar etiquetas (tags) primarias como contexto
---

## Definición

Hay varias dimensiones disponibles para limitar una aplicación completa de Datadog APM. Estas incluyen estadísticas agregadas (como solicitudes/segundo, latencia, tasa de error, puntuación de Apdex) y [trazas][1] visibles. Estas dimensiones se configuran a través de etiquetas primarias que te permiten obtener una visión aún más detallada del comportamiento de tu aplicación. Los casos de uso para etiquetas primarias incluyen entorno, zona de disponibilidad, centro de datos, etc.

Las etiquetas deben seguir una serie de reglas diferentes a las de [etiquetas de Datadog][2].

## Configuración

### Entorno

La etiqueta primaria predeterminada y obligatoria es el entorno del que se recopilan tus trazas. Su clave de etiqueta es `env`, y su valor por defecto para datos no etiquetados es `env:none`.

#### Entorno de rastreador

Datadog recomienda que el rastreador defina `env`. También permite una mayor flexibilidad porque la definición de `env` se encuentra dentro del tiempo de ejecución real del servicio.

Si `DD_ENV` está expuesto al proceso de tu servicio, el rastreador lo utilizará automáticamente. Consulta [etiquetado de servicios unificado][3] para aprender a configurar `DD_ENV` y otras variables de entorno de servicio estándar.

También puedes establecer manualmente `env` como una etiqueta global para el rastreador en código. Consulta [asignar etiquetas en APM][4] para más información.

#### Entorno de Agent

La etiqueta `env` se puede establecer en tu configuración del Agent.
**No configures diferentes etiquetas `env` en el rastreador y el Agent. Esto puede causar etiquetado duplicado en [métricas de rastreo][5].**

Opciones:

1. Configuración del Agent de nivel superior:

    ```yaml
    env: <ENVIRONMENT>
    ...
    ```

    **Entornos contenedorizados**: el Agent también admite la configuración del `env` de nivel superior a través de la variable de entorno `DD_ENV`.

2. Etiqueta de host del Agent:

    ```yaml
    tags:
        env: <ENVIRONMENT>
        ...
    ```

    **Contenedor <txprotected>entornos</txprotected>**: El Agent también admite Configuración de nivel superior `tags` a través de la variable entorno `DD_TAGS` .

#### Datos por entorno

Los entornos aparecen en la parte superior de las páginas de APM. Utiliza el menú desplegable `env` para limitar los datos que aparecen en la página actual.

## Añadir una segunda etiqueta primaria en Datadog

Si necesitas añadir tus métricas de traza mediante dimensiones adicionales, te recomendamos que configures una segunda etiqueta primaria además de la
etiqueta primaria predeterminada y obligatoria `env:<ENVIRONMENT>`. Una vez configurada, hay disponible un segundo menú desplegable en la pestaña **Service Catalog Performance** (Rendimiento del Catálogo de servicios).

Ve a la página [Configuración de APM][6] para definir, cambiar o eliminar tus etiquetas primarias.

**Nota**:

* Solo los administradores de la organización tienen acceso a esta página.
* Los cambios pueden tardar hasta dos horas en reflejarse en la interfaz de usuario.
* El rastreador siempre añade etiquetas `resource`, `name` y `service` a los tramos (spans). Datadog recomienda no añadirlas nunca como etiquetas a nivel de host para evitar confusiones.
* La segunda etiqueta primaria admite hasta 30 valores únicos. Consulta [Directrices de volumen de datos de APM][9] para más detalles.

Si cambias una etiqueta primaria previamente configurada, ten en cuenta lo siguiente:

* Ya no se puede acceder a los datos históricos de APM agregados por la etiquetar establecida anteriormente.
* Los monitores de APM asignados a la etiqueta anterior muestran el estado _No Data_ (Sin datos).

## Segundas etiquetas primarias basadas en contenedores

Puedes indexar tus métricas de rastreo según las etiquetas derivadas de contenedores de Docker y metadatos de pod de Kubernetes en plataformas basadas en Linux. Las segundas etiquetas primarias basadas en contenedores están disponibles en el Datadog Agent versiones 7.35.0 y posteriores.

Para habilitar segundas etiquetas primarias basadas en contenedores, instala el Agent versión 7.35.0 o posterior, actualiza la configuración de estadísticas CID como se describe a continuación y reinicia Agent. El procedimiento de activación depende de cómo hayas instalado el Agent:

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

Reinicia el Agent. Ve a la página [Configuración de APM][6] y selecciona la segunda etiqueta primaria que deseas utilizar. Los cambios en esta configuración pueden tardar hasta dos horas en surtir efecto.

Ahora puedes filtrar tus servicios en el [Catálogo de servicios][7] por la etiqueta enviada por tus servicios de contenedor. Las métricas de rastreo utilizadas por dashboards y monitores también pueden ser agregados por la etiqueta primaria de contenedor.

### Etiquetas (labels) personalizadas como etiquetas

Si aún no lo has hecho, también puedes configurar el Agent para enviar etiquetas (labels) de contenedor o pod como etiquetas personalizadas para tus trazas con [Asignación de etiquetas][8].

## Ver datos por etiqueta primaria

Las etiquetas principales aparecen en la parte superior de las páginas de APM. Utiliza estos selectores para filtrar los datos mostrados en la página actual. Para ver todos los datos independientemente de una etiqueta primaria, selecciona `<TAG_NAME>:*` en el menú desplegable.

{{< img src="tracing/guide/setting_primary_tags/second-primary-tag-dropdown.png" alt="El menú desplegable que muestra opciones para seleccionar un contexto con la segunda etiqueta primaria" style="width:90%;">}}


## Leer más

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