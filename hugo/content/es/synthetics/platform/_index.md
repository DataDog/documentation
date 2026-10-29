---
description: Aprenda a aprovechar las capacidades de la plataforma Datadog para maximizar
  Synthetic Monitoring.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentación
  text: Obtenga más información sobre el Explorador de resultados de Synthetic Monitoring
    & Testing.
title: Plataforma
---
## Descripción general {#overview}

Una vez que haya comenzado a recopilar datos para sus pruebas Synthetic, puede aprovechar las capacidades de la plataforma Datadog para visualizar, hacer un seguimiento y analizar datos en las pruebas Synthetic y en Synthetic Monitoring, así como en el resto de su stack conectado. 

## Crear y ver dashboards {#create-and-view-dashboards}
Utilice [dashboards][1] para realizar un seguimiento, analizar y mostrar métricas clave de rendimiento y uso de sus pruebas Synthetic.

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="Captura de pantalla que muestra la navegación superior de Synthetics con Dashboards resaltados" >}}

## Ver monitores {#view-monitors}
Vea los [monitores][2] asociados que se crean automáticamente a partir de sus pruebas Synthetic para notificar a sus equipos y gestionar alertas de un vistazo en la plataforma Alerting.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Monitor de prueba Synthetic" style="width:100%;">}}

## Ver métricas {#view-metrics}
Vea las [métricas][3] que generan las pruebas de Synthetic Monitoring y la configuración de Continuous Testing.

## Explorar la cobertura de prueba {#explore-test-coverage}

Explore la página [{{< ui >}}Test Coverage{{< /ui >}}][4] para obtener información sobre la cobertura de prueba general de sus aplicaciones RUM.

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Página de Cobertura de pruebas con una sección de Resumen, una sección de Acciones no probadas y una sección de Acciones probadas" style="width:100%" >}}

## Conecte las pruebas de Synthetic Monitoring y APM {#connect-synthetic-monitoring-testing-and-apm}
[Conecte APM][5] para identificar las pruebas Synthetic fallidas directamente hasta las causas raíz mediante el análisis de los traces relacionados.

{{< img src="tracing/index/Synthetics.png" alt="Pruebas Synthetic" style="width:100%;">}}

## Conecte Synthetic Monitoring y RUM {#connect-synthetic-monitoring-and-rum}

[Conecte RUM][6] para ver los datos de RUM, Session Replay y Error Tracking generados por las ejecuciones de prueba de navegador Synthetic.

{{< img src="synthetics/guide/rum_in_synthetics/view_session_in_rum_2.png" alt="Una sesión de RUM generada por una ejecución de prueba de navegador Synthetic, que muestra los errores, las acciones y las vistas cargadas." style="width:100%;" >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/platform/dashboards
[2]: /es/synthetics/guide/synthetic-test-monitors/
[3]: /es/synthetics/platform/metrics
[4]: /es/synthetics/platform/test_coverage
[5]: /es/synthetics/platform/apm
[6]: /es/synthetics/platform/rum