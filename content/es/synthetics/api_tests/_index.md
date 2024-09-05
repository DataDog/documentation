---
aliases:
- /es/synthetics/uptime_check
- /es/synthetics/api_test
description: Simular solicitudes en tus servicios públicos e internos
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://www.datadoghq.com/blog/api-test-coverage-monitoring-datadog-synthetics/
  tag: Blog
  text: Mejorar la cobertura de tus tests de API con la monitorización Synthetic de
    Datadog
- link: https://www.datadoghq.com/blog/monitor-apis-with-datadog
  tag: Blog
  text: Monitorizar tus flujos (flows) de trabajo con tests SSL, TLS y de API de varios
    pasos de Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests de API
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests de API en endpoints internos
- link: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
  tag: Sitio externo
  text: Crear y gestionar tests de API Synthetic con Terraform
title: Tests de API
---

## Información general

Los tests de API te ayudan a **monitorizar de forma proactiva** tus servicios más importantes para que estén disponibles en cualquier momento y desde cualquier lugar.

Genera solicitudes en las diferentes capas de red de tus sistemas con estos subtipos:

{{< partial name="synthetics/network-layers.html" >}}

Si tu servicio comienza a responder más lentamente o de forma inesperada (como por ejemplo un cuerpo de respuesta inesperado o un registro A erróneo), tu test puede [alertar a tu equipo][1], [bloquear tu pipeline CI][2] y [revertir el despliegue defectuoso][2].

Los tests de API se ejecutan desde [localizaciones gestionadas][3] o [localizaciones privadas][4] de Datadog, lo que permite la **cobertura interna y externa** de tus sistemas.

**Nota:** Los tests de API son solicitudes ejecutadas a tus servicios. Si quieres monitorizar transacciones empresariales sofisticadas a nivel de API o de endpoint que requieren autenticación, encadena tus solicitudes con [tests de API de varios pasos][5].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests?tab=requestoptions#configure-the-test-monitor
[2]: /es/continuous_testing/cicd_integrations
[3]: /es/synthetics/api_tests/http_tests/#select-locations
[4]: /es/synthetics/private_locations
[5]: /es/synthetics/multistep/