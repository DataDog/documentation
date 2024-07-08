---
aliases:
- /es/logs/processing
description: Procesa, mejora, controla y gestiona tus logs desde la página de configuración
  de logs
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Configura una organización de Datadog que cumpla con la normativa PCI
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Más información sobre Logging without Limits*
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: Blog
  text: Investiga el procesamiento de log con el Datadog Log Pipeline Scanner
- link: /logs/guide/
  tag: Guía
  text: Guías adicionales sobre el registro con Datadog
kind: Documentación
title: Configuración de log
---

## Información general

Datadog Logging without Limits* desacopla la ingestión y la indexación de logs. Elige qué logs indexar y conservar, o archivar, y gestiona la configuración y los controles a nivel general desde la página de configuración de log en [**Logs > Pipelines**][1].

**Nota**: Consulta [Cumplimiento de PCI DSS][2] para obtener información sobre configurar una organización de Datadog que cumpla con PCI.

## Opciones de configuración

- Controla cómo se procesan tus logs con [pipelines][3] y [procesadores][4].
- Configura [atributos y alias][5] para unificar tu entorno de logs.
- [Genera métricas a partir de la ingesta de logs][6] como forma rentable de resumir los datos de log a partir de todo un flujo (stream) ingerido.
- Establece un control detallado de tu presupuesto de gestión de logs con [índices de log][7].
- Reenvía el contenido de logs a tu propio bucket de almacenamiento alojado en la nube para conservarlo como [archivo][8] para futuras auditorías de cumplimiento o para solucionar problemas.
- [Recupera un archivo][9] para analizar o investigar eventos de log antiguos o excluidos de la indexación.
- Restringe [el acceso a datos de logs][10] con consultas de restricción.

## Log Explorer

Una vez que hayas completado la configuración, comienza a investigar y solucionar problemas de logs en el [Log Explorer][11].

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits es una marca registrada de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /es/data_security/pci_compliance/
[3]: /es/logs/log_configuration/pipelines
[4]: /es/logs/log_configuration/processors
[5]: /es/logs/log_configuration/attributes_naming_convention/
[6]: /es/logs/log_configuration/logs_to_metrics/
[7]: /es/logs/log_configuration/indexes
[8]: /es/logs/log_configuration/archives/
[9]: /es/logs/log_configuration/rehydrating
[10]: /es/logs/guide/logs-rbac/
[11]: /es/logs/explorer/