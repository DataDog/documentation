---
disable_toc: false
further_reading:
- link: universal_service_monitoring/
  tag: Documentación
  text: Pipelines de observabilidad
- link: observability_pipelines/update_existing_pipelines/
  tag: Documentación
  text: Actualizar un pipeline existente
- link: observability_pipelines/advanced_configurations/
  tag: Documentación
  text: Configuraciones avanzadas para Observability Pipelines
- link: observability_pipelines/troubleshooting/
  tag: Documentation
  text: Solucionar problemas con Observability Pipelines
title: Configurar pipelines
---

## Información general

En Observability Pipelines, un pipeline es una ruta secuencial con tres tipos de componentes: origen, procesadores y destinos. El [origen][1] de Observability Pipeline recibe logs de tu fuente de logs (por ejemplo, el Datadog Agent ). Los [procesadores][2] enriquecen y transforman tus datos, y el [destino][3] es donde se envían tus logs procesados. En algunas plantillas, tus logs se envían a más de un destino. Por ejemplo, si utilizas la plantilla de Archivar logs, tus logs se envían a un proveedor de almacenamiento en la nube y a otro destino especificado.

## Configurar un pipeline

Configura tus pipelines y sus [fuentes][1], [procesadores][2] y [destinos][3] en la interfaz de usuario de Observability Pipelines. Los pasos generales de configuración son:

1. Navega hasta [Observability Pipelines][4].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. Instala Observability Pipelines Worker.
1. Activa monitores para tu pipeline.

Para obtener instrucciones detalladas de configuración, selecciona una documentación específica de la plantilla y, a continuación, selecciona tu fuente en esa página:
  - [Control de volumen de logs][4]
  - [Envío doble de logs][5]
  - [Dividir logs][6]
  - [Archivar logs en Archivos de Datadog][7]
  - [Redacción de datos confidenciales][8]
  - [Enriquecimiento de logs][9]
  - [Generar métricas][10]

Consulta [Configuraciones avanzadas][11] para las opciones de arranque y para obtener más detalles sobre la configuración del worker con Kubernetes.

Una vez que hayas configurado tu pipeline, consulta [Actualizar pipelines existentes][12] si deseas realizar algún cambio.

## Clonar un pipeline

1. Navega hasta [Observability Pipelines][4].
1. Selecciona el pipeline que deseas clonar.
1. Haz clic en el engranaje de la parte superior derecha de la página y selecciona **Clone** (Clonar).

## Eliminar un pipeline

1. Navega hasta [Observability Pipelines][4].
1. Selecciona el pipeline que deseas eliminar.
1. Haz clic en el engranaje situado en la parte superior derecha de la página y selecciona **Delete** (Eliminar).

**Nota**: No puedes eliminar un pipeline activo. Debes detener todos los workers de un pipeline antes de poder eliminarlo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/observability_pipelines/sources/
[2]: /es/observability_pipelines/processors/
[3]: /es/observability_pipelines/destinations/
[4]: /es/observability_pipelines/set_up_pipelines/log_volume_control/
[5]: /es/observability_pipelines/set_up_pipelines/dual_ship_logs/
[6]: /es/observability_pipelines/set_up_pipelines/split_logs/
[7]: /es/observability_pipelines/set_up_pipelines/archive_logs/
[8]: /es/observability_pipelines/set_up_pipelines/sensitive_data_redaction/
[9]: /es/observability_pipelines/set_up_pipelines/log_enrichment/
[10]: /es/observability_pipelines/set_up_pipelines/generate_metrics/
[11]: /es/observability_pipelines/advanced_configurations/
[12]: /es/observability_pipelines/update_existing_pipelines/