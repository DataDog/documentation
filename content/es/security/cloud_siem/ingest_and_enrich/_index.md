---
disable_toc: false
further_reading:
- link: https://docs.datadoghq.com/getting_started/security/cloud_siem/
  tag: Documentación
  text: Empezando con Cloud SIEM
- link: https://www.datadoghq.com/blog/monitoring-cloudtrail-logs/
  tag: Blog
  text: Prácticas recomendadas para monitorizar los logs de CloudTrail de AWS
- link: https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/
  tag: Blog
  text: Prácticas recomendadas para monitorizar los logs de autenticación
- link: https://www.datadoghq.com/blog/ocsf-common-data-model//
  tag: Blog
  text: Normaliza tus datos con el OCSF Common Data Model en Cloud SIEM de Datadog
title: Ingerir y enriquecer
---

## Información general

Con las reglas de detección de Cloud SIEM, se analizan los logs y los datos de seguridad para generar señales de seguridad cuando se detectan amenazas. Una vez activado Cloud SIEM, configura Datadog para que ingiera y enriquezca los logs de las fuentes que desees monitorizar.

## Ingesta de datos de seguridad
La forma más sencilla de enviar datos a Datadog es utilizando [Paquetes de contenido][1], que son integraciones diseñadas específicamente para Cloud SIEM. Cada paquete de contenido contiene instrucciones sobre cómo configurar la integración para que ingiera esos logs y proporciona información sobre lo que incluye, como por ejemplo:

- Reglas de detección
- Dashboards interactivos predefinidos
- Analizadores
- Workflows (UI) / Procesos (generic) de SOAR

Existen [Paquetes de contenido][1] para muchas tecnologías de seguridad populares.

Si tienes logs personalizados o dispones de datos source (fuente) que no figuran en la page (págiona) del [Paquete de contenido][2] de Cloud SIEM, check si la integración está disponible en la amplia [biblioteca de integraciones][3] de Datadog. Si no está disponible, puedes enviar esos logs como [logs personalizados][4] a Cloud SIEM para su análisis.

## Enriquecer logs

### Información sobre amenazas

Datadog proporciona [Inteligencia de amenazas][5] integrada para los logs de Cloud SIEM y también admite el enriquecimiento y la búsqueda mediante indicadores de compromiso (IoC) de inteligencia de amenazas almacenados en las tablas de referencia de Datadog. Consulta [Trae tu propia inteligencia de amenazas][6] para obtener más información.

### Open Cybersecurity Framework (OCSF)

[Open Cybersecurity Framework (OCSF)][7] se integra directamente en Cloud SIEM, de modo que los logs de seguridad entrantes se enriquezcan automáticamente con atributos conformes al OCSF mediante pipelines predefinidos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/security/cloud_siem/content_packs/
[2]: https://app.datadoghq.com/security/content-packs
[3]: /es/integrations/
[4]: /es/logs/log_collection/
[5]: /es/security/threat_intelligence/#threat-intelligence-sources
[6]: /es/security/cloud_siem/threat_intelligence#bring-your-own-threat-intelligence
[7]: /es/security/cloud_siem/open_cybersecurity_schema_framework