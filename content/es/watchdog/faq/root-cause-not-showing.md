---
further_reading:
- link: /watchdog/#root-cause-analysis-for-apm-beta
  tag: Documentación
  text: Análisis de causas raíz de Watchdog para APM
kind: faq
title: No se muestra la causa raíz
---

Watchdog busca tipos específicos de causas raíz. El análisis de causas raíz (ACR) de Watchdog detecta las siguientes causas raíz:

- Cambios de versión, según lo capturado por la etiqueta (tag) `version` en tus [servicios APM][1]
- Incrementos de tráfico, según lo lo capturado por las métricas de tasa de aciertos en tus servicios instrumentados por APM
- Fallos de instancia de AWS, según lo capturado por las [métricas de integraciones de Amazon EC2][2]
- Espacio en el disco que se agota, según lo capturado por las [métricas del sistema][3] del Datadog Agent

Si no ves una causa raíz, es probable que la causa raíz específica no corresponda a uno de los tipos descritos anteriormente o que no exista una instrumentación configurada para capturarla.

El análisis de causas raíz de Watchdog funciona mejor cuando:

- Utilizas el rastreo distribuido, para que Watchdog conozca la estructura de dependencia entre tus servicios.
- Utilizas el [etiquetado unificado de servicios][4], para que Watchdog sepa cuándo se implementa código nuevo y pueda vincular la infraestructura y las métricas de APM.

¿Crees que Watchdog debería haber encontrado algo que se le ha pasado por alto? O, ¿tienes otro tipo de causa raíz que te gustaría que se añadiera? Datadog siempre está intentando lograr que Watchdog sea más inteligente, así que [abre una solicitud de asistencia][5] para hacérnoslo saber.

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services
[2]: https://docs.datadoghq.com/es/integrations/amazon_ec2/#metrics
[3]: https://docs.datadoghq.com/es/integrations/system/#metrics
[4]: https://docs.datadoghq.com/es/getting_started/tagging/unified_service_tagging/?tab=kubernetes#overview
[5]: https://help.datadoghq.com/hc/en-us/requests/new