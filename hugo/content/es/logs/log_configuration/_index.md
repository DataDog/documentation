---
aliases:
- /es/logs/processing
description: Procese, enriquezca, controle y gestione sus registros desde la página
  Logs Configuration
further_reading:
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centro de aprendizaje
  text: Depuración de pipelines de registros
- link: /data_security/pci_compliance/
  tag: Documentación
  text: Compliance de PCI DSS
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: Obtenga más información sobre Logging without Limits*
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: Blog
  text: Investigue el procesamiento de sus registros con el Datadog Log Pipeline Scanner
- link: /logs/guide/
  tag: Guía
  text: Guías adicionales sobre el registro con Datadog
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centro de arquitectura
  text: Una guía sobre estrategias de indexación para Log Management con Datadog
title: Configuración de registros
---
## Descripción general {#overview}

Datadog Logging without Limits* desacopla la ingesta y la indexación de registros. Elija qué registros indexar y retener, o archivar, y gestione la configuración y los controles a nivel superior desde la página de configuración de registros en [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Pipelines{{< /ui >}}][1].

También puede gestionar pipelines, índices y archivos de registro a través de un agente de IA conectado al Datadog MCP Server. Habilite el conjunto de herramientas `logs-configuration` para visualizar, crear, actualizar, eliminar y reordenar estos recursos. Consulte [Set Up the Datadog MCP Server][13] para conectar su agente. Para conocer las herramientas disponibles y ver ejemplos de prompts, consulte [Logs Configuration tools][14].

## Opciones de configuración {#configuration-options}

- Controle cómo se procesan sus registros con [pipelines][3] y [procesadores][4].
- Establezca [atributos y asignación de alias][5] para unificar su entorno de registros.
- [Genere métricas a partir de los registros ingeridos][6] como una forma rentable de resumir los datos de registro de todo un flujo ingerido.
- Establezca un control detallado sobre su presupuesto de gestión de registros con [índices de registros][7].
- Reenvíe los registros ingeridos a su propio bucket de almacenamiento en la nube para conservarlos como un [archivo][8] para futuras tareas de solución de problemas o auditorías de cumplimiento.
- [Busque en un archivo][12] con Archive Search para consultar registros en tiempo real directamente desde el almacenamiento. Use el modo **Search & Rehydration** cuando necesite acceso completo a la plataforma o una retención más larga.
- Restrinja el [acceso a los datos de los registros][10] con consultas de restricción.

## Log Explorer {#log-explorer}

Una vez que haya completado la configuración, comience a investigar y solucionar problemas de registros en el [Explorador de registros][11].

## Lecturas adicionales {#further-reading}

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
[10]: /es/logs/guide/logs-rbac/
[11]: /es/logs/explorer/
[12]: /es/logs/explorer/archive_search/
[13]: /es/mcp_server/setup/
[14]: /es/mcp_server/tools/#logs-configuration