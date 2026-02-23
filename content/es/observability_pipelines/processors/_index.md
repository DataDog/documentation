---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/observability-pipelines-transform-and-enrich-logs/
  tag: Blog
  text: Transformar y enriquecer tus logs con Datadog Observability Pipelines
title: Procesadores
---

## Información general

<div class="alert alert-info">Los procesadores descritos en esta documentación son específicos de los entornos de registro local. Para analizar, estructurar y enriquecer los logs basados en la nube, consulta la documentación de <a href="https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics">Log Management</a>.</div>

Utiliza los procesadores de Observability Pipelines para analizar, estructurar y enriquecer tus logs. Todos los procesadores están disponibles para todas las plantillas. Configura tus procesadores en la interfaz de usuario de Observability Pipelines después de haber seleccionado una plantilla, una fuente y unos destinos. Este es el paso 5 del proceso de configuración del pipeline:

1. Navega hasta [Observability Pipelines][1].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. Instala el worker de Observability Pipelines.
1. Habilita monitores para tu pipeline.

{{% observability_pipelines/processors/intro %}}

{{% observability_pipelines/processors/filter_syntax %}}

[1]: https://app.datadoghq.com/observability-pipelines

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}