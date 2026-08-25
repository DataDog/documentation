---
aliases:
- /es/tracing/api_catalog/monitor_apis/
- /es/api_catalog/monitor_apis/
- /es/service_catalog/endpoints/monitor_endpoints/
- /es/software_catalog/endpoints/monitor_endpoints/
further_reading:
- link: /tracing/api_catalog/get_started/
  tag: Documentación
  text: Información general de la lista de endpoints
- link: /monitors/
  tag: Documentación
  text: Alerta con monitores
- link: /synthetics/api_tests/
  tag: Documentación
  text: Tests de API Synthetic
- link: /security/application_security/
  tag: Documentación
  text: Monitorización de App and API Protection
title: Monitorización de endpoints
---

## Información general

La lista de endpoints te permite monitorizar y mantener el estado de tus endpoints. Puedes detectar APIs de bajo rendimiento, configurar alertas para métricas clave de rendimiento, realizar un seguimiento de la fiabilidad de la API mediante alertas y resultados de test, y establecer tests de API estandarizados y mejorar la cobertura de tests con Synthetic Monitoring.

## Monitorización del rendimiento de los endpoints

Crea y gestiona monitores para realizar un seguimiento del estado y el rendimiento de los endpoints y responder a los problemas de rendimiento. Puedes crear alertas para identificar la degradación intermitente del rendimiento o valores atípicos, como tiempos de respuesta inusualmente lentos o errores poco frecuentes. Las alertas también pueden realizar un seguimiento de las métricas, como las tasas de error, que superan los umbrales definidos.

Los monitores existentes se muestran en la columna **MONITORS** (MONITORES):

{{< img src="tracing/software_catalog/monitors.png" alt="El menú de estado del monitor y el botón Crear monitor en la Lista de endpoints" style="width:100%;" >}}


Para configurar un monitor para un endpoint:
1. Pasa el ratón por encima de la celda de la columna **MONITORS** (MONITORES).
1. Haz clic en **+ Create Monitor** (+ Crear monitor).
1. Completa la información de la página del monitor de APM.
1. Haz clic en **Create** (Crear).

Para más información, lee [Monitores][1].

## Gestión de la cobertura de tests de la API

Utiliza los tests Synthetic de la API para configurar los tests automatizados de tus endpoints. Estos tests te avisan de los fallos para que puedas diagnosticar y solucionar los problemas antes de que afecten a tus usuarios.

Para crear un test Synthetic de la API para un endpoint:

1. Pasa el ratón por encima de la celda de la columna **MONITORS** (MONITORES).
1. Haz clic en **+ Create Synthetic API Test** (+ Crear test Synthetic de la API).
1. Configura los ajustes de test en la página New API Test (Nuevo test de API).
1. Haz clic en **Create test** (Crear test).

Para más información, lee [Tests de HTTP][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/monitors/
[2]: /es/synthetics/api_tests/http_tests/