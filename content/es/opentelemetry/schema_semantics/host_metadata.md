---
aliases:
- /opentelemetry/guide/host_metadata/
further_reading:
- link: /opentelemetry/
  tag: Documentación
  text: Soporte de OpenTelemetry en Datadog
title: Asignación de las convenciones semánticas de OpenTelemetry a información de
  host de la lista de infraestructura
---

<div class="alert alert-info">
Esta función está en fase beta. Si tienes algún comentario, ponte en contacto con <a href="/help/">el servicio de soporte de Datadog</a>.
</div>

## Información general

El exportador de Datadog admite el envío de información del sistema sobre tus hosts a Datadog, que puedes ver en la [lista de infraestructura][6]. Puedes enviar esta información en OTLP a través del [campo 'Resource'][1] como parte de cualquiera de las señales existentes. Esto es compatible con cualquier [patrón de despliegue][9] incluidos despliegues de gateway.

Datadog utiliza [convenciones semánticas de OpenTelemetry][2] para reconocer la información del sistema sobre tus hosts. Sigue las instrucciones de [configuración para métricas de host][3] para enviar los atributos necesarios de métricas y recursos a Datadog. También puedes enviar manualmente esta información de la forma que mejor se adapte a tu infraestructura.

## Elección de la función

Para elegir la **función beta pública**, establece el atributo de recurso `datadog.host.use_as_metadata` en `true` en todas las cargas útiles OTLP que contengan información sobre hosts.

Los recursos rellenan la información de la lista de infraestructura si tienen un [atributo que identifica hosts][10] y el atributo `datadog.host.use_as_metadata` establecido en `true`.

Para declarar explícitamente qué recursos utilizar para los metadatos, añade el atributo de recurso booleano `datadog.host.use_as_metadata` a todos los recursos que tengan información relevante de host.

Por ejemplo, para establecer esto para todos los recursos en métricas, trazas (traces) y logs, utiliza el [procesador de transformación][7] con la siguiente configuración:

```yaml
processors:
  transform:
    metric_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    trace_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
    log_statements:
      - context: resource
        statements:
          - set(attributes["datadog.host.use_as_metadata"], true)
```

Añade este procesador a la lista `processors` de todos tus pipelines.

Debes etiquetar explícitamente todos tus recursos con un atributo que identifica hosts. Esto lo hace por defecto la [configuración recomendada para métricas de host][3].

## Convenciones admitidas

El exportador de Datadog admite tanto convenciones semánticas de recurso a nivel de atributo como convenciones semánticas de sistema a nivel de métricas. Las convenciones semánticas de atributos de recursos compatibles se encuentran principalmente en [el espacio de nombres `host.`][4] y [el espacio de nombres `os.`][8]. Todas las convenciones semánticas de sistema a nivel de métricas compatibles están en el [espacio de nombres `system.`][5].

### Convenciones generales del sistema

| Convención semántica                         | Tipo               | Campo en la aplicación |
|---------------------------------------------|--------------------|--------------|
| [*Varios atributos que identifican hosts*][10] | Atributo de recurso | Nombre de host     |
| `os.description`                            | Atributo de recurso | Sistema operativo           |

### Convenciones de la CPU

| Convención semántica         | Tipo               | Campo en la aplicación       |
|-----------------------------|--------------------|--------------------|
| `host.cpu.vendor.id`        | Atributo de recurso | ID de proveedor          |
| `host.cpu.model.name`       | Atributo de recurso | Nombre del modelo         |
| `host.cpu.cache.l2.size`    | Atributo de recurso | Tamaño de la caché         |
| `host.cpu.family`           | Atributo de recurso | Familia             |
| `host.cpu.model.id`         | Atributo de recurso | Modelo              |
| `host.cpu.stepping`         | Atributo de recurso | Pasos           |
| `system.cpu.logical.count`  | Métrica del sistema      | Procesadores lógicos |
| `system.cpu.physical.count` | Métrica del sistema      | Núcleos              |
| `system.cpu.frequency`      | Métrica del sistema      | MHz                |

### Convenciones de red

| Convención semántica | Tipo               | Campo en la aplicación              |
|---------------------|--------------------|---------------------------|
| `host.ip`           | Atributo de recurso | Dirección IP y dirección IPv6 |
| `host.mac`          | Atributo de recurso | Dirección Mac               |

### Recopilación de estas convenciones con el OpenTelemetry Collector

Para recopilar estas convenciones con el OpenTelemetry Collector, usa la [configuración recomendada para métricas de host][3]. El receptor de métricas de host recopila todas las métricas, mientras que el procesador de detección de recursos recopila todos los atributos relevantes de los recursos.

**Nota:** Es necesario añadir estos procesadores y receptores en el Collector que se ejecuta en el host que deseas monitorizar. Un host de gateway no recopila esta información de hosts remotos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/docs/concepts/glossary/#resource
[2]: https://opentelemetry.io/docs/concepts/semantic-conventions/
[3]: /es/opentelemetry/collector_exporter/host_metrics
[4]: https://opentelemetry.io/docs/specs/semconv/resource/host/
[5]: https://opentelemetry.io/docs/specs/semconv/system/system-metrics/
[6]: /es/infrastructure/list/
[7]: https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/processor/transformprocessor#transform-processor
[8]: https://opentelemetry.io/docs/specs/semconv/resource/os/
[9]: https://opentelemetry.io/docs/collector/deployment/
[10]: /es/opentelemetry/schema_semantics/hostname/