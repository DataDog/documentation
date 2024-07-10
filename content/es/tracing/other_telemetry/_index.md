---
description: Aprende a conectar los datos de APM con datos de telemetría recopilados
  por otros productos de Datadog.
further_reading:
- link: /logs/guide/ease-troubleshooting-with-cross-product-correlation/
  tag: Documentación
  text: Facilita la solución de problemas con una correlación entre productos
- link: https://www.datadoghq.com/blog/link-dbm-and-apm/
  tag: Blog
  text: Correlaciona sin problemas los datos de telemetría de DBM y APM para comprender
    el rendimiento de las consultas de extremo a extremo
kind: documentación
title: Correlacionar los datos de APM con otros datos de telemetría
---

La correlación de datos por varios productos de Datadog proporciona contexto para estimar el impacto empresarial y encontrar la causa raíz de un problema en unos pocos clics. Establece conexiones entre los datos entrantes para facilitar los cambios rápidos en tus exploradores y dashboards.

## Correlacionar la monitorización de base de datos y las trazas

Inyecta los IDs de traza (trace) en la recopilación de datos de DBM para correlacionar las dos fuentes de datos. Visualiza la información de la base de datos en APM y la información de APM en DBM para obtener una visión completa y unificada del rendimiento de tu sistema. Consulta [Conectar DBM y trazas][4] para configurarlo.

{{< img src="database_monitoring/dbm_filter_by_calling_service.png" alt="Filtra tus host de base de datos por los servicios de APM que los llaman.">}}


## Correlacionar logs y trazas

Inyecta IDs de traza en logs y aprovecha el etiquetado de servicios unificado para encontrar los logs exactos asociados con un servicio y versión específicos, o todos los logs correlacionados con una traza observada. Consulta [Conectar logs y trazas][1] para configurarlo.

{{< img src="tracing/index/ConnectLogsWithTraces.png" alt="Conectar logs y trazas" style="width:100%;">}}

## Correlacionar RUM y trazas

Correlaciona los datos recopilados en las vistas de frontend con trazas y tramos (spans) en el backend mediante [Conectar RUM y trazas][2]. Localiza los problemas en cualquier punto de tu stack y comprende lo que experimentan los usuarios.

{{< img src="tracing/index/RumTraces.png" alt="Conectar sesiones RUM y trazas" style="width:100%;">}}

## Correlacionar tests y trazas Synthetic

Sigue los datos de las tests Synthetic con errores directamente hasta las causas raíz, indagando en las trazas relacionadas. [Conecta Synthetics y trazas][3] para acelerar la solución de problemas en tu código.

{{< img src="tracing/index/Synthetics.png" alt="Test Synthetic" style="width:100%;">}}

## Correlacionar perfiles y trazas

Los datos de rendimiento del código de la aplicación, que tiene activados tanto el rastreo como el perfilado, se correlacionan automáticamente. Esto te permite moverte entre los dos tipos de análisis para solucionar problemas. Puedes pasar directamente de la información de tramo a los datos de perfiles en la pestaña Code Hotspots (Hotspots de código) y encontrar líneas específicas de código relacionadas con problemas de rendimiento. Del mismo modo, puedes depurar endpoints lentos y que consumen muchos recursos directamente en la interfaz de usuario de los perfiles.

Lee [Investigar trazas o endpoints lentos][5] para obtener más información.

{{< img src="profiler/code_hotspots_tab-2.mp4" alt="Pestaña Code Hotspots (Hotspots de código) que muestra información de perfiles para un tramo de traza de APM" video=true >}}

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/tracing/other_telemetry/connect_logs_and_traces/
[2]: /es/real_user_monitoring/platform/connect_rum_and_traces/
[3]: /es/synthetics/apm/
[4]: /es/database_monitoring/connect_dbm_and_apm/
[5]: /es/profiler/connect_traces_and_profiles/