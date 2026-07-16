---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/crest_data_systems_cofense_triage
app_id: crest-data-systems-cofense-triage
categories:
- marketplace
- seguridad
- recopilación de logs
custom_kind: integración
description: Monitorizar incidentes de Cofense Triage de phishing en Datadog
integration_version: 1.0.0
media:
- caption: 'Cofense Triage: información general'
  image_url: images/crest-data-systems-cofense-triage-overview.png
  media_type: imagen
- caption: 'Cofense Triage: estado del sistema'
  image_url: images/crest-data-systems-cofense-triage-system-status.png
  media_type: imagen
- caption: 'Cofense Triage: resumen'
  image_url: images/crest-data-systems-cofense-triage-executive-summary.png
  media_type: imagen
- caption: 'Cofense Triage: generación de informes'
  image_url: images/crest-data-systems-cofense-triage-reporting-output.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Cofense Triage
---
## Información general

Cofense Triage es una plataforma de gestión de amenazas de phishing que automatiza la detección, el análisis y la respuesta a correos electrónicos de phishing aprovechando los datos notificados por los usuarios. Esta integración mejora los flujos de trabajo de seguridad al proporcionar visibilidad en tiempo real de los incidentes de phishing identificados por Cofense Triage directamente en Datadog para ofrecer respuestas más rápidas y coordinadas.

Esta integración recopila lo siguiente:

### Métricas

| | |
| --- | --- |
| **cds.cofense_triage.health.cpu_usage_percent** <br>(gauge) | Porcentaje de uso de la CPU del servidor de Cofense Triage<br>_Se muestra en porcentaje_ |
| **cds.cofense_triage.health.memory_in_kilobytes.active_memory** <br>(gauge) | Memoria activa del servidor de Cofense Triage<br>_Se muestra como kilobyte_ |
| **cds.cofense_triage.health.memory_in_kilobytes.free_memory** <br>(gauge) | Memoria libre del servidor de Cofense Triage<br>_Se muestra en kilobytes_ |
| **cds.cofense_triage.health.memory_in_kilobytes.inactive_memory** <br>(gauge) | Memoria inactiva del servidor de Cofense Triage<br>_Se muestra como kilobyte_ |
| **cds.cofense_triage.health.memory_in_kilobytes.total_memory** <br>(gauge) | Memoria total del servidor de Cofense Triage<br>_Se muestra en kilobytes_ |
| **cds.cofense_triage.health.memory_in_kilobytes.used_memory** <br>(gauge) | Memoria utilizada del servidor de Cofense Triage<br>_Se muestra como kilobyte_ |
| **cds.cofense_triage.partition_used_percent** <br>(gauge) | partition_used_percentage del servidor de Cofense Triage<br>_Se muestra como porcentaje_ |
| **cds.cofense_triage.status** <br>(gauge) | Estado del sistema del servidor de Cofense Triage|
| **cds.cofense_triage.statistics.new_reports** <br>(gauge) | Nuevos informes sobre Cofense Triage|
| **cds.cofense_triage.statistics.processed_reports** <br>(gauge) | Informes procesados sobre Cofense Triage|
| **cds.cofense_triage.statistics.unprocessed_reports** <br>(gauge) | Informes no procesados sobre Cofense Triage|
| **cds.cofense_triage.statistics.unparsed_emails** <br>(gauge) | Correos electrónicos sin analizar en Cofense Triage|
| **cds.cofense_triage.top_categories.count** <br>(gauge) | Recuentos de las principales categorías|
| **cds.cofense_triage.top_processing_api_applications.count** <br>(gauge) | Recuentos de las principales aplicaciones de api|
| **cds.cofense_triage.top_processing_operators.count** <br>(gauge) | Recuentos de los principales operadores de procesamiento|
| **cds.cofense_triage.top_reporters.count** <br>(gauge) | Recuentos de los principales generadores de informes|
| **cds.cofense_triage.top_rules.count** <br>(gauge) | Recuentos de las reglas principales|

### Logs

- Informes
- Indicadores de amenaza
- Urls
- Dominios
- Archivos adjuntos
- Cargas útiles adjuntas
- Clústeres
- Encabezados
- Nombres de host
- Cuadernos de estrategias
- Reglas
- Categorías
- Comentarios
- Proveedores de identidad
- Integraciones
- Informes dinámicos

### Eventos

- Autenticación
- Validación de la configuración

### Dashboards

Esta integración incluye los siguientes dashboards predefinidos:

1. **Estado**: proporciona información sobre el estado del sistema, incluido el uso de la CPU y de la partición del servidor de Cofense Triage.
1. **Resumen ejecutivo**: ofrece un resumen de los datos de informes de Cofense Triage.
1. **Generación de informes**: muestra una generación de informes detallada, que incluye los informes y sus datos correspondientes.
1. **Información general**: incluye detalles seleccionados de los dashboards mencionados.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con Crest Data a través de los siguientes canales:

- Correo electrónico de asistencia: [datadog.integrations@crestdata.ai](mailto:datadog.integrations@crestdata.ai)
- Correo electrónico de ventas: [datadog-sales@crestdata.ai](mailto:datadog-sales@crestdata.ai)
- Página web: [crestdata.ai](https://www.crestdata.ai/)
- PREGUNTAS FRECUENTES: [Crest Data Datadog Marketplace Integrations FAQ](https://www.crestdatasys.com/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf)

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog](https://docs.datadoghq.com/help/).

---
Esta aplicación está disponible a través de Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-cofense-triage" target="_blank">Haz clic aquí</a> para comprar esta aplicación.