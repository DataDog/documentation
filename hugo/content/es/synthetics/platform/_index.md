---
description: Aprenda a aprovechar las funcionalidades de la plataforma Datadog para
  maximizar las funcionalidades de Synthetics.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
title: Plataforma
---

## Información general

Una vez que hayas empezado a recopilar datos de tus tests Synthetic, puedes aprovechar las funcionalidades de la plataforma Datadog para visualizar, monitorizar y analizar datos en tests Synthetic y en el resto de tu stack tecnológico conectado.

## Crear y ver dashboards
Utiliza [dashboards][1] para rastrear, analizar y mostrar el rendimiento clave y las métricas de uso en tus tests Synthetics.

{{< img src="synthetics/platform/synthetics_dashboards_2.png" alt="Imagen de una pantalla donde se muestran las principales opciones de navegación en Synthetics con los dashboards resaltados" >}}

## Visualizar monitores
Visualiza los [monitores][2] asociados que se crean automáticamente a partir de tus tests Synthetics para notificar a tus equipos y gestiona las alertas de forma fácil en la plataforma de alertas.

{{< img src="synthetics/guide/synthetics_test_monitors/synthetic_test_monitor.png" alt="Monitor de tests Synthetic" style="width:100%;">}}

## Ver métricas
Visualiza las [métricas][3] generadas por los tests de monitorización Synthetic y los parámetros de tests continuos.

## Explorar la cobertura de los tests

Para obtener más información sobre la cobertura general de los tests de tus aplicaciones RUM, consulta la página [Cobertura de tests][4].

{{< img src="synthetics/test_coverage/browser_actions.png" alt="Página de la cobertura de tests con una sección de Información general, una sección de Acciones no anidadas y una sección de Acciones probadas" style="width:100%" >}}

## Conectar los tests Synthetic con APM
[Conecta APM][4] para identificar los motivos de los tests Synthetic fallidos, profundizando en las trazas (traces) relacionadas.

{{< img src="tracing/index/Synthetics.png" alt="Tests Synthetic" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/platform/dashboards
[2]: /es/synthetics/guide/synthetic-test-monitors/
[3]: /es/synthetics/platform/metrics
[4]: /es/synthetics/platform/test_coverage
[5]: /es/synthetics/platform/apm