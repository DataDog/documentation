---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/getting_started/security/cloud_siem/
  tag: Documentación
  text: Primeros pasos con Cloud SIEM
- link: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de los registros de AWS CloudTrail
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: Blog
  text: Prácticas recomendadas para el seguimiento de los registros de autenticación
- link: https://www.datadoghq.com/blog/ocsf-common-data-model//
  tag: Blog
  text: Normalice sus datos con el Modelo de Datos Común OCSF en Datadog Cloud SIEM
title: Ingesta y enriquecimiento
---
## Descripción general {#overview}

Las reglas de detección de Cloud SIEM analizan los registros y los datos de seguridad para generar señales de seguridad cuando se detectan amenazas. Después de haber habilitado Cloud SIEM, configure Datadog para ingerir y enriquecer los registros de las fuentes de las que desea hacer un seguimiento.

## Ingerir datos de seguridad {#ingest-security-data}
La forma más sencilla de enviar datos a Datadog es mediante el uso de [Content Packs][1], que son integraciones diseñadas específicamente para Cloud SIEM. Cada Content Pack contiene instrucciones sobre cómo configurar la integración para ingerir esos registros y proporciona información sobre lo que se incluye, como:

- Reglas de detección
- Paneles interactivos listos para usar
- Analizadores
- Flujos de trabajo de SOAR

Los [Content Packs][1] están disponibles para muchas tecnologías de seguridad populares.

Si tiene registros personalizados o una fuente de datos que no aparece en la página de [Content Pack][2] de Cloud SIEM, verifique si la integración está disponible en la extensa [biblioteca de integraciones][3] de Datadog. Si no está disponible, puede enviar esos registros como [registros personalizados][4] a Cloud SIEM para su análisis.

## Enriquecer registros {#enrich-logs}

### Inteligencia de amenazas {#threat-intelligence}

Datadog proporciona [Threat Intelligence][5] integrada para los registros de Cloud SIEM y también admite el enriquecimiento y la búsqueda mediante indicadores de compromiso (IoCs) de inteligencia de amenazas almacenados en tablas de referencia de Datadog. Consulte [Bring Your Own Threat Intelligence][6] para obtener más información.

### Indicadores silenciados {#muted-indicators}

Si un indicador de inteligencia de amenazas es benigno para su organización, puede silenciarlo para que Cloud SIEM lo califique como `benign` en el enriquecimiento de registros y en IOC Explorer (explorador de IOC). Datadog también mantiene una lista de solo lectura de indicadores conocidos como benignos que están silenciados para todas las organizaciones. Consulte [Muted Indicators][7] para obtener más información.

### Open Cybersecurity Framework (OCSF) {#open-cybersecurity-framework-ocsf}

[Open Cybersecurity Framework (OCSF)][8] está integrado directamente en Cloud SIEM, por lo que los registros de seguridad entrantes se enriquecen automáticamente con atributos compatibles con OCSF mediante pipelines listos para usar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/siem/content-packs
[3]: /es/integrations/
[4]: /es/logs/log_collection/
[5]: /es/security/threat_intelligence/#threat-intelligence-sources
[6]: /es/security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /es/security/cloud_siem/ingest_and_enrich/muted_indicators/
[8]: /es/security/cloud_siem/open_cybersecurity_schema_framework