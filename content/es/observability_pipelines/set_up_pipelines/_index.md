---
disable_toc: false
further_reading:
- link: observability_pipelines/update_existing_pipelines/
  tag: Documentación
  text: Actualizar un pipeline existente
- link: observability_pipelines/advanced_configurations/
  tag: Documentación
  text: Configuraciones avanzadas para Observability Pipelines
- link: observability_pipelines/set_up_pipelines/run_multiple_pipelines_on_a_host/
  tag: Documentación
  text: Ejecutar múltiples pipelines en un host
- link: observability_pipelines/troubleshooting/
  tag: Documentation
  text: Solucionar problemas con Observability Pipelines
title: Configurar pipelines
---

## Información general

<div class="alert alert-info">Los pipelines y procesadores descritos en esta documentación son específicos para entornos de registro on-premises. Para agregar, proceso y enrutar logs basados en la nube, consulta <a href="https://docs.datadoghq.com/logs/log_configuration/pipelines/?tab=source">Pipelines de Log Management</a>.</div>

En Observability Pipelines, un pipeline es una ruta secuencial con tres tipos de componentes: origen, procesadores y destinos. El [origen][1] de Observability Pipeline recibe logs de tu fuente de logs (por ejemplo, el Datadog Agent ). Los [procesadores][2] enriquecen y transforman tus datos, y el [destino][3] es donde se envían tus logs procesados. En algunas plantillas, tus logs se envían a más de un destino. Por ejemplo, si utilizas la plantilla de Archivar logs, tus logs se envían a un proveedor de almacenamiento en la nube y a otro destino especificado.

## Establecer un pipeline

{{< tabs >}}
{{% tab "Pipeline UI" %}}

Configura tus pipelines y sus [fuentes][1], [procesadores][2] y [destinos][3] en la interfaz de usuario de Observability Pipelines. Los pasos generales de configuración son:

1. Navega hasta [Observability Pipelines][13].
1. Selecciona una plantilla.
1. Selecciona y configura tu fuente.
1. Selecciona y configura tus destinos.
1. Configura tus procesadores.
1. [Instala el worker de Observability Pipelines][12].
1. Habilita monitores para tu pipeline.

Para obtener instrucciones detalladas de configuración, selecciona una documentación específica de la plantilla y, a continuación, selecciona tu fuente en esa página:
  - [Control de volumen de logs][4]
  - [Envío doble de logs][5]
  - [Dividir logs][6]
  - [Archivar logs en Archivos de Datadog][7]
  - [Redacción de datos confidenciales][8]
  - [Enriquecimiento de logs][9]
  - [Generar métricas][10]

Una vez que hayas configurado tu pipeline, consulta [Actualizar pipelines existentes][11] si deseas realizar algún cambio en él.

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
[11]: /es/observability_pipelines/update_existing_pipelines/
[12]: /es/observability_pipelines/install_the_worker/
[13]: https://app.datadoghq.com/observability-pipelines

{{% /tab %}}
{{% tab "API" %}}

<div class="alert alert-warning">La creación de pipelines utilizando la API de Datadog está en vista previa. Rellena el <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> formulario</a> para solicitar acceso.</div>

Puedes utilizar la API de Datadog para [crear un pipeline][1]. Una vez creado el pipeline, [instala el worker][2] para empezar a enviar logs a través del pipeline.

Los pipelines creados mediante la API son de sólo lectura en la interfaz de usuario. Utiliza el endpoint [actualizar un pipeline][3] para realizar cambios en un pipeline existente.

[1]: /es/api/latest/observability-pipelines/#create-a-new-pipeline
[2]: /es/observability_pipelines/install_the_worker/
[3]: /es/api/latest/observability-pipelines/#update-a-pipeline

{{% /tab %}}
{{% tab "Terraform" %}}

<div class="alert alert-warning">Crear pipelines usando Terraform está en Vista previa. Rellena el <a href="https://www.datadoghq.com/product-preview/observability-pipelines-api-and-terraform-support/"> formulario</a> para solicitar acceso.</div>

Puedes usar el módulo [datadog_observability_pipeline][1] para crear un pipeline usando Terraform. Una vez creado el pipeline, [instala el worker][2] para empezar a enviar logs a través del pipeline.

Los pipelines creados con Terraform son de sólo lectura en la interfaz de usuario. Utiliza el módulo [datadog_observability_pipeline][1] para realizar cambios en un pipeline existente.

[1]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs
[2]: /es/observability_pipelines/install_the_worker/

{{% /tab %}}
{{< /tabs >}}

Consulta [Configuraciones avanzadas][5] para conocer las opciones de arranque.

### Indexar los logs del worker

Asegúrate de que tus logs del worker están [indexados][6] en Log Management para una funcionalidad óptima. Los logs proporcionan información de despliegue, como el estado del worker, la versión y cualquier error, que se muestra en la interfaz de usuario. Los logs también son útiles para solucionar problemas del worker o de pipelines. Todos los logs del worker tienen la etiqueta `source (fuente):op_worker`.

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
[4]: https://app.datadoghq.com/observability-pipelines
[5]: /es/observability_pipelines/advanced_configurations/
[6]: /es/logs/log_configuration/indexes/