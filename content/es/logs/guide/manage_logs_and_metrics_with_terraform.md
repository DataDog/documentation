---
disable_toc: false
kind: Terraform
title: Administra logs y métricas con la guía de
---

## Información general
Puedes utilizar [Terraform][1] para interactuar con la API Datadog y administrar tus logs y métricas. Esta guía proporciona ejemplos de casos de uso e incluye enlaces a recursos y fuentes de datos de uso común de Datadog en el registro de Terraform.

También puedes [importar][2] tus recursos existentes en tu configuración de Terraform y hacer referencia a los recursos existentes como [fuentes de datos][3] de Terraform.

## Configura el proveedor de Terraform Datadog 

Si aún no lo has hecho, configura el [proveedor de Terraform Datadog][4] para interactuar con APIs Datadog a través de una configuración de Terraform.

## Configuración de logs

### Configura varios índices

Configura [varios índices][5] si quieres segmentar tus logs para diferentes periodos de retención o cuotas diarias, monitorización de uso y facturación. Por ejemplo, si tienes logs que solo deben conservarse durante 7 días, mientras que otros logs deben conservarse durante 30 días, utiliza varios índices para separar los logs por los dos periodos de retención. Consulta la documentación [filtros de inclusión][6] y [filtros de exclusión][7] para obtener información sobre cómo definir consultas para ellos. Dado que los logs ingestados van al primer índice con cuyo filtro coinciden, [ordena tus índices][8] en función de tu caso de uso.

### Configura un pipeline personalizado.

Los pipelines de logs son una cadena de procesadores secuenciales que extraen información o atributos significativos del contenido para reutilizarlos como facetas. Cada log que pasa por los pipelines se compara con cada filtro de pipeline. Si coincide con el filtro, todos los procesadores se aplican al log antes de pasar al siguiente pipeline. Configura un [pipeline personalizado][9] para analizar y enriquecer tus logs. Consulta la [documentación sobre procesadores][10] para obtener más información sobre los procesadores disponibles. También puedes [reordenar tus pipelines][11] para asegurarte de que los logs se procesen en el orden correcto.

Los pipelines de integraciones (integrations) se instalan automáticamente cuando envías logs desde ciertas fuentes (por ejemplo, la integración con NGINX). Puedes reordenar estos pipelines con el [recurso de pipelines de integraciones de logs][12].

### Configura varios archivos para el almacenamiento prolongado.

Configura [archivos de logs][13] si quieres almacenar tus logs durante más tiempo. Los archivos de logs envían tus logs a un sistema de almacenamiento optimizado, como Amazon S3, Azure Storage o Google Cloud Storage. También puedes [reordenar tus archivos][14] según sea necesario.

### Genera métricas a partir de logs ingestados.

[Genera métricas basadas en logs][15] para resumir los datos de tus logs ingestados. Por ejemplo, puedes generar una métrica de recuento de logs que coincidan con una consulta o que coincidan con una métrica de distribución de un valor numérico contenido en los logs, como la duración de la solicitud. Consulta [Genera métricas a partir de logs ingestados][16] para obtener más información.

## Configuración de métrica

Los metadatos de métrica incluyen el nombre, la descripción y la unidad de métrica. Utiliza el [recurso de metadatos de métrica][17] para modificar la información.

Las etiquetas (tags) agregan dimensiones a tus métricas para que puedan filtrarse, agregarse y compararse en visualizaciones. Utiliza el [recurso de configuración de etiquetas de métricas][18] para modificar tus etiquetas de métricas en Terraform. Consulta [tareas iniciales con etiquetas][19] para obtener más información sobre el uso de etiquetas.


[1]: https://www.terraform.io/
[2]: https://developer.hashicorp.com/terraform/cli/import
[3]: https://developer.hashicorp.com/terraform/language/data-sources
[4]: /es/integrations/terraform/
[5]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index
[6]: /es/logs/log_configuration/indexes/#indexes-filters
[7]: /es/logs/log_configuration/indexes/#exclusion-filters
[8]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_index_order
[9]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_custom_pipeline
[10]: /es/logs/log_configuration/processors/?tab=ui
[11]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_pipeline_order
[12]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_integration_pipeline
[13]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive
[14]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_archive_order
[15]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/logs_metric
[16]: https://docs.datadoghq.com/es/logs/log_configuration/logs_to_metrics/
[17]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_metadata
[18]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/metric_tag_configuration
[19]: /es/getting_started/tagging/