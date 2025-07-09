---
categories:
- cloud
custom_kind: integration
dependencies: []
description: Seguimiento de actores y eventos de dispatcher para aplicaciones basadas
  en Akka
doc_link: https://docs.datadoghq.com/integrations/lightbendrp/
draft: false
git_integration_title: lightbendrp
has_logo: true
integration_id: lightbendrp
integration_title: Lightbend
integration_version: ''
is_public: true
manifest_version: '1.0'
name: lightbendrp
public_title: Integración de Lightbend con Datadog
short_description: Seguimiento de actores y eventos de dispatcher para aplicaciones
  basadas en Akka
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/lightbendrp/dashboard_lightbendrp.png" alt="Dashboard de Lightbend Reactive Platform" popup="true">}}

## Información general

Obtén métricas de tu [aplicación Lightbend Reactive Platform][1] en tiempo real para:

- Visualizar las métricas de rendimiento de tus actores.
- Realizar un seguimiento de los eventos imprevistos (excepciones, mensajes no gestionados, mensajes fallidos, etc.).
- Obtener una visión de las características remotas de tu aplicación.
- Profundizar en las métricas del despachador para ajustar el rendimiento de la aplicación.

## Configuración

### Instalación

Esta integración utiliza la monitorización de Lightbend que requiere una [suscripción][2].

La forma más sencilla de integrar la monitorización de Lightbend con Datadog es utilizar el [complemento Datadog][3].

Por defecto, la monitorización de Lightbend envía todas las métricas a través del cable, pero es posible limitar los campos informados mediante configuración (consulta el siguiente ejemplo).

El complemento Datadog utiliza una configuración predeterminada que puede modificarse:

```text
cinnamon.datadog {
  statsd {
    host = "192.168.0.1"
    port = 8888
    frequency = 60s
  }

  report {
    histogram = ["min", "max", "p98", "p99", "p999"]
  }
}
```

Los valores de configuración explicados:

- `cinnamon.datadog.statsd.host`: Dirección IP de tu instancia DogStatsD.
- `cinnamon.datadog.statsd.port`: Número de puerto de tu instancia DogStatsD.
- `cinnamon.datadog.statsd.frequency`: Frecuencia con la que se envían los datos desde Cinnamon a la instancia DogStatsD.
- `cinnamon.datadog.report.histogram`Instrucción para filtrar los datos de histograma enviados a DogStatsD. En el ejemplo anterior sólo se envían `max` y `p99`.

Para obtener más información sobre la configuración, consulta la [documentación de la monitorización de Lightbend][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "lightbendrp" >}}


### Eventos

La integración de Lightbend Reactive Platform no incluye eventos.

### Checks de los servicios

La integración de Lightbend Reactive Platform no incluye no incluye checks de servicios.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://www.lightbend.com/platform
[2]: https://www.lightbend.com/platform/subscription
[3]: https://developer.lightbend.com/docs/monitoring/2.3.x/plugins/datadog/datadog.html
[4]: https://developer.lightbend.com/docs/monitoring/2.3.x/home.html
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/lightbendrp/lightbendrp_metadata.csv
[6]: https://docs.datadoghq.com/es/help/