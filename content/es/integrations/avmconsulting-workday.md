---
algolia:
  subcategory: Integraciones de Marketplace
aliases:
- /es/integrations/avmconsulting_workday
app_id: avmconsulting-workday
categories:
- recopilación de logs
- marketplace
custom_kind: integración
description: Proporciona observabilidad del estado de las integraciones de Workday
further_reading:
- link: https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/
  tag: blog
  text: Monitoriza Workday con la integración de AVM Consulting en Datadog Marketplace
integration_version: 1.0.2
media:
- caption: Resumen de integraciones de Workday
  image_url: images/Workday_integration_trends.png
  media_type: imagen
- caption: Resumen de integraciones de Workday
  image_url: images/Workday_integration_trends_2.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Workday
---
## Información general

Esta integración de Workday monitoriza el estado de tus integraciones en Workday y ofrece métricas detalladas sobre las ejecuciones de trabajos, incluidas las ejecuciones totales de trabajos, las ejecuciones de trabajos fallidas y la duración de cada ejecución de trabajo. Esta integración también recupera logs de ejecución de trabajos y proporciona monitores que alertan sobre el estado de cada integración.

### Monitores

Esta integración incluye los siguientes monitores recomendados:

1. Connect to Workday, que monitoriza tu conexión a Workday.
1. Workday Integration Status, un monitor múltiple que está agrupado por integraciones y verifica el estado del último evento de integración de Workday.

### Dashboards

Esta integración incluye un dashboard listo para usar llamado **Workday Integrations Trends** que proporciona un resumen visual de las ejecuciones de trabajos de Workday, así como el estado de los monitores configurados para cada integración de Workday.

### Recopilación de logs

Esta integración utiliza la API de Workday para recopilar logs para ejecuciones de integración y enviar esos logs a Datadog a través de la API REST de Datadog. Las etiquetas (tags) relacionadas con la ejecución se asignan dinámicamente a esos logs.

## Soporte

Para solicitar asistencia o funciones, ponte en contacto con AVM Consulting a través de los siguientes canales:

- Correo electrónico: [integrations@avmconsulting.net](mailto:integrations@avmconsulting.net)
- Teléfono: 855-AVM-0555

### Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Monitoriza Workday con la integración de AVM Consulting en Datadog Marketplace](https://www.datadoghq.com/blog/workday-monitoring-with-avm-and-datadog/)

---
Esta aplicación está disponible a través de Marketplace y cuenta con el respaldo de un socio tecnológico de Datadog. <a href="https://app.datadoghq.com/marketplace/app/avmconsulting-workday" target="_blank">Haz clic aquí</a> para adquirir esta aplicación.