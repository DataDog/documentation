---
algolia:
  tags:
  - synthetics
further_reading:
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /synthetics/api_tests
  tag: Documentación
  text: Más información sobre los tests de API
- link: /synthetics/multistep
  tag: Documentación
  text: Más información sobre los tests de API multipaso
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre los tests Synthetic en el pipeline de integración continua
    (CI)
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para mejorar tus capacidades de synthetic
    testing
title: Empezando con la monitorización Synthetic
---

## Información general

Las pruebas Synthetic te permiten observar el rendimiento de tus sistemas y aplicaciones mediante **simulaciones de solicitudes y acciones procedentes de todo el mundo**. Datadog rastrea el rendimiento de tus páginas web y API desde el backend hasta el frontend, así como en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`), de forma controlada y estable, y te alerta sobre cualquier problema, como regresiones, funciones defectuosas, tiempos de respuesta altos y códigos de estado inesperados.

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Tests de monitorización de Synthetic" style="width:100%;" >}}

## Tipos de tests Synthetic

Datadog ofrece **tests de API**, **tests de API multipaso** y **tests de navegador**.

Para monitorizar aplicaciones internas, lleva a cabo tus tests desde localizaciones gestionadas o privadas. Los tests Synthetic pueden activarse manualmente, de manera programada o directamente desde tus pipelines de integración/distribución continuas (CI/CD).

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1].

## Configura tu primer test

Para configurar tu primer test Synthetic con Datadog, elige alguna de las siguientes opciones:

- [Crea un test de API][2] para empezar a monitorizar el tiempo de actividad de los endpoints de tu API.
- [Crea un test de API multipaso][3] para vincular varias solicitudes HTTP y empezar a monitorizar flujos de trabajo clave en la API.
- [Crea un test de navegador][4] para empezar a testar transacciones empresariales críticas en tus aplicaciones.
- [Crea una localización privada][5] para empezar a monitorizar aplicaciones internas con todos los tipos de tests Synthetic.

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /es/getting_started/synthetics/api_test/
[3]: /es/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /es/getting_started/synthetics/browser_test/
[5]: /es/getting_started/synthetics/private_location/