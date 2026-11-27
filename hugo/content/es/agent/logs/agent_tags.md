---
further_reading:
- link: /getting_started/tagging/
  tag: Documentación
  text: Prácticas recomendadas de etiquetado
- link: /agent/configuration/agent-configuration-files/
  tag: Documentación
  text: Archivos de configuración del Agent
- link: /agent/docker/tag/
  tag: Documentación
  text: Etiquetado de contenedores
title: Etiquetas del Agent de registros
---
## Descripción general {#overview}

El Datadog Agent añade automáticamente ciertas etiquetas a todos los registros que recopila antes de enviarlos a Datadog. Estas etiquetas se añaden **antes de la ingesta** y se incluyen en la carga útil que se entrega a Datadog. Para eliminar etiquetas seleccionadas antes de que el Agent envíe los registros, consulte [Filtrar etiquetas antes de la ingesta](#filter-tags-before-ingestion).

## Procesamiento previo a la ingesta {#pre-ingestion-processing}

Dado que estas etiquetas se añaden antes de la ingesta:

* Se incluyen en todos los datos de los registros entregados a Datadog
* Aumentan el tamaño total de los datos de sus registros
* Están disponibles para filtrar, buscar y agregar en el Log Explorer
* Se pueden usar en métricas y consultas basadas en registros

## Etiquetas del Agent añadidas automáticamente a los registros {#agent-tags-automatically-added-to-logs}

El Datadog Agent añade automáticamente las siguientes etiquetas a los registros:

| Etiqueta | Descripción | Condiciones |
|-----|-------------|-------------|
| `source` | La fuente del registro (ruta del archivo, nombre de la integración, etc.) | Siempre que esté disponible |
| `service` | El nombre del servicio si está configurado en la recopilación de registros | Siempre que esté disponible |
| `env` | La etiqueta de entorno si está configurada globalmente | Siempre que esté disponible |
| `version` | La versión del Agent | Siempre que esté disponible |
| `filename` | Nombre base del archivo supervisado | Solo fuentes basadas en archivos |
| `dirname` | Directorio que contiene el archivo supervisado | Solo fuentes basadas en archivos |
| `source_host` | Dirección IP del servidor de origen del socket | Solo fuentes de socket (TCP/UDP) |
| `event_type` | Tipo de evento de Windows | Solo eventos de Windows |
| `event_source` | Fuente del evento de Windows | Solo eventos de Windows |
| `event_id` | ID de evento de Windows | Solo eventos de Windows, si `tag_event_id: true` |
| `sid` | Identificador de Windows Security | Solo eventos de Windows, si `tag_sid: true` |
| `truncated` | Fuente del truncamiento | Si `logs_config.tag_truncated_logs: true` |
| `multiline` | Fuente de la agregación de varias líneas | Si `logs_config.tag_multi_line_logs: true` |
| `aggregated_json` | Indica que el registro se agregó a partir de varias entradas de registro JSON | Si `logs_config.auto_multi_line.tag_aggregated_json: true` |

## Filtrar etiquetas antes de la ingesta {#filter-tags-before-ingestion}

El filtrado de etiquetas de registro requiere la versión 7.86.0 o posterior del Agent. Dependiendo de cómo utilice sus registros, es posible que algunas etiquetas añadidas por el Agent no sean necesarias para la búsqueda, el análisis, el enrutamiento o la correlación. Puede filtrar etiquetas seleccionadas antes de que el Agent envíe los registros a Datadog, lo que puede ayudar a reducir el tamaño de las cargas útiles de registro.

Elija el contexto del filtro según dónde desee aplicar la regla:

* Utilice un filtro global para aplicar las mismas reglas a cada fuente de registro compatible procesada por el Agent.
* Utilice un filtro por fuente para dirigirse a una fuente de registro o crear una excepción a un filtro global.

Los filtros de etiquetas se aplican a los registros recopilados por la canalización de registros del Agent. No se aplican a los registros de serverless-init, la ingesta de OTLP o el Datadog Distribution of OpenTelemetry (DDOT) Collector.

Antes de filtrar una etiqueta, verifique si alguna canalización, índice, archivo, monitor, panel u otro flujo de trabajo la utiliza.

### Sintaxis del patrón de filtro {#filter-pattern-syntax}

Los patrones utilizan la sintaxis `key:value`. Las claves deben coincidir exactamente, los valores pueden contener comodines `*` y la coincidencia no distingue entre mayúsculas y minúsculas. Un patrón `include` solo conserva las etiquetas que un patrón `exclude` eliminaría de otro modo. No elimina ninguna otra etiqueta.

**Nota**: El Agent envía `source`, `service` y `host` por separado de la lista de etiquetas. Filtrar estas etiquetas no elimina sus valores del registro.

### Filtros globales {#global-filters}

Configure los filtros globales en `datadog.yaml` o con la variable de entorno `DD_LOGS_CONFIG_TAG_FILTERS`. Los siguientes ejemplos eliminan todas las etiquetas `filename` y `dirname` excepto la etiqueta `filename:audit.log` de cada fuente de registro admitida:

{{< tabs >}}
{{% tab "Archivo de configuración" %}}

```yaml
logs_config:
  tag_filters:
    exclude:
      - "filename:*"
      - "dirname:*"
    include:
      - "filename:audit.log"
```

{{% /tab %}}
{{% tab "Docker" %}}

Pase `DD_LOGS_CONFIG_TAG_FILTERS` al contenedor del Agent. Por ejemplo, agregue la siguiente opción a su comando `docker run`:

```shell
--env DD_LOGS_CONFIG_TAG_FILTERS='{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Establezca `DD_LOGS_CONFIG_TAG_FILTERS` en el contenedor del Agent del nodo:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
spec:
  override:
    nodeAgent:
      env:
        - name: DD_LOGS_CONFIG_TAG_FILTERS
          value: '{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{% tab "Helm" %}}

Establezca `DD_LOGS_CONFIG_TAG_FILTERS` en los valores del gráfico de Helm:

```yaml
datadog:
  env:
    - name: DD_LOGS_CONFIG_TAG_FILTERS
      value: '{"exclude":["filename:*","dirname:*"],"include":["filename:audit.log"]}'
```

{{% /tab %}}
{{< /tabs >}}

### Filtros por fuente {#per-source-filters}

Agregue `tag_filters` a una fuente de registro en su archivo de configuración de integración, como `conf.d/<INTEGRATION_NAME>.d/conf.yaml`, para limitar el filtro a esa fuente. El siguiente ejemplo elimina la etiqueta `dirname` solo de los registros recopilados de `/var/log/my-app/*.log`:

```yaml
logs:
  - type: file
    path: /var/log/my-app/*.log
    service: my-app
    source: custom_log
    tag_filters:
      exclude:
        - "dirname:*"
```

Las reglas por fuente se evalúan antes que las reglas globales, por lo que una regla `include` por fuente puede preservar una etiqueta que una regla `exclude` global eliminaría de otro modo.

### Aplique y verifique los filtros {#apply-and-verify-filters}

Después de cambiar los filtros de etiquetas, [reinicie el Agent][1]. Para confirmar que los filtros se aplicaron:

* Ejecute `datadog-agent status -v`. La sección **Logs Agent** enumera los `Tag Filters` efectivos para cada fuente que tiene filtros aplicados.
* Ejecute `datadog-agent stream-logs`. Los registros transmitidos muestran etiquetas después del filtrado, lo que coincide con lo que el Agent envía a Datadog.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/agent/configuration/agent-commands/#restart-the-agent