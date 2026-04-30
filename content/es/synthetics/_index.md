---
algolia:
  tags:
  - synthetics
aliases:
- /es/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: Utiliza pruebas automatizadas para asegurar que las partes más críticas
  de tus sistemas y aplicaciones estén funcionando desde diversas ubicaciones alrededor
  del mundo.
further_reading:
- link: /synthetics/guide/
  tag: Documentation
  text: Guías de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Learning Center
  text: 'Centro de Aprendizaje de Datadog: Introducción a las pruebas de navegador
    Synthetic'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únete a una sesión interactiva para mejorar tus capacidades de Synthetic Testing
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Cómo asegurar los encabezados HTTP con pruebas Synthetic
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Obtén información clave sobre las experiencias de los usuarios más rápido
    con Synthetic Monitoring de Datadog
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Cómo crear pruebas de humo de UX eficientes con Synthetic Monitoring
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejora la precisión y el rendimiento del SLO con Synthetic Monitoring de Datadog
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Cómo construir pruebas Synthetic confiables y precisas para tus aplicaciones
    móviles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatizando tu infraestructura de pruebas Synthetic con Datadog Synthetic
    Monitoring y Terraform
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificando la resolución de problemas a lo largo del recorrido del usuario
    con Synthetic Monitoring de Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De rendimiento a impacto: Conectando equipos de frontend a través de un contexto
    compartido'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Release Notes
  text: ¡Consulta las últimas versiones de Synthetic Monitoring de Datadog! (Se requiere
    inicio de sesión en la aplicación)
title: Synthetic Testing y Synthetic Monitoring
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explora y regístrate para las sesiones de Habilitación de Fundación. Aprende cómo Datadog Synthetic Monitoring es una solución de monitoreo proactiva que te permite crear pruebas de API, de navegador y móviles sin código para simular automáticamente flujos y solicitudes de usuario a tus aplicaciones, puntos de conexión clave y capas de red.
{{< /learning-center-callout >}}

Las pruebas Synthetic te permiten observar cómo están funcionando tus sistemas y aplicaciones utilizando **solicitudes y acciones simuladas de todo el mundo**. Datadog rastrea el rendimiento de tus páginas web y APIs desde el backend hasta el frontend, y en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`) de manera controlada y estable, alertándote sobre comportamientos defectuosos como regresiones, características rotas, tiempos de respuesta altos y códigos de estado inesperados. 

**Calcular SLOs** en tus puntos de conexión clave y recorridos de usuario facilita cumplir con tus objetivos de rendimiento de la aplicación y, en última instancia, proporcionar una experiencia de cliente consistente.

Puedes crear pruebas Synthetic en la [aplicación de Datadog][1], con la [API][2] o con [Terraform][3].

## Configura pruebas de API y pruebas de API en varios pasos {#set-up-api-tests-and-multistep-api-tests}

Las pruebas de API te permiten lanzar [solicitudes individuales][4] o [encadenadas][5] para realizar verificaciones en tus sistemas clave en varios niveles de red: [prueba HTTP][6], [prueba SSL][7], [prueba DNS][8], [prueba WebSocket][9], [prueba TCP][10], [prueba UDP][11], [prueba ICMP][12] y [prueba gRPC][13]. 

{{< img src="synthetics/api_test.png" alt="Pruebas de API" style="width:100%;">}}

## Grabar pruebas de navegador {#record-browser-tests}

Utiliza [pruebas de navegador sintéticas][14] para monitorear cómo tus clientes experimentan tus páginas web de extremo a extremo desde todo el mundo.

{{< img src="synthetics/browser_test.mp4" alt="Pruebas de navegador" video=true style="width:100%;">}}

## Grabar pruebas de aplicaciones móviles {#record-mobile-application-tests}

Utiliza [pruebas de aplicaciones móviles sintéticas][21] para monitorear cómo tus clientes experimentan tus aplicaciones de iOS y Android de extremo a extremo desde diferentes tipos de dispositivos.

{{< img src="synthetics/mobile_app_tests.png" alt="Ejemplos del flujo de trabajo de grabación para una Prueba Móvil Sintética" style="width:100%;">}}

## Crear pruebas de ruta de red {#create-network-path-tests}

Crea [pruebas de ruta de red sintéticas][25] desde ubicaciones gestionadas para realizar verificaciones TCP, UDP e ICMP y visualizar rutas de paquetes a través de puntos finales globales.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Ejemplos de una prueba de red TCP sintética" style="width:100%;">}}
## Conjuntos de pruebas {#test-suites}

Utiliza [Conjuntos de Pruebas Sintéticas][26] para organizar múltiples pruebas en colecciones lógicas agrupadas por recorrido de usuario, entorno, ubicación, servicio o equipo para una gestión y resolución de problemas más eficientes. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del Conjunto de Pruebas de Monitoreo Sintético" style="width:100%;">}}

## Lanzar ubicaciones privadas {#launch-private-locations}

Utiliza [ubicaciones privadas sintéticas][15] para monitorear APIs internas y sitios web o crear ubicaciones personalizadas en áreas que son críticas para tu negocio.

{{< img src="synthetics/private_locations.png" alt="Ubicaciones privadas" style="width:100%;">}}

## Conectar datos y trazas {#connect-data-and-traces}

Utiliza la [integración entre pruebas sintéticas y trazas APM][16] para encontrar la causa raíz de fallas en solicitudes de frontend, red y backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## Acceder a tableros predefinidos {#access-out-of-the-box-dashboards}

Analiza la información de rendimiento sobre tus pruebas de API, pruebas de API de múltiples pasos, pruebas de navegador y ubicaciones privadas, así como eventos de Datadog, con [tableros sintéticos predefinidos][17]. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Resumen del tablero de Synthetic Monitoring y Continuous Testing" style="width:100%;">}}

## Utiliza el Synthetic Monitoring & Testing Results Explorer {#use-the-synthetic-monitoring-testing-results-explorer}

Crea [consultas de búsqueda y visualizaciones][20] para tus ejecuciones de pruebas Synthetic o lotes de pruebas que se ejecutan en pipelines de CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Rastrear la cobertura de pruebas {#track-testing-coverage}

Optimiza tu conjunto de pruebas [asegurándote de que los flujos de trabajo más críticos de tu aplicación estén siendo probados][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Continuous Testing Explorer" style="width:100%;">}}

## Synthetic Monitoring notifications {#synthetic-monitoring-notifications}

Utiliza y enriquece los Synthetic monitors para enviar notificaciones cuando una prueba de Synthetic Monitoring esté fallando. Las siguientes características están disponibles:

Mensajes de monitor prellenados
: Los mensajes de monitor prellenados proporcionan un punto de partida estructurado para las alertas de prueba Synthetic. Cada mensaje incluye un título, resumen y pie de página estandarizados que contienen metadatos de la prueba, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: Las variables de plantilla te permiten inyectar datos específicos de la prueba en las notificaciones de monitor de manera dinámica. Estas variables extraen datos del objeto `synthetics.attributes`.

Uso avanzado
: El uso avanzado incluye técnicas para obtener información más profunda sobre las pruebas o estructurar mensajes complejos utilizando plantillas de handlebars.

Alertas condicionales
: Las alertas condicionales te permiten cambiar el contenido de una notificación de monitor según resultados específicos de pruebas o condiciones de falla.

Para más información, consulta [Synthetic Monitoring notifications][24].

## Historial de versiones {#version-history}

Utiliza [Version History in Synthetic Monitoring][23] para ejecutar una versión anterior de una prueba, restaurar tu prueba a cualquier versión guardada o clonar una versión para crear una nueva prueba de Synthetic Monitoring.

## ¿Listo para comenzar? {#ready-to-start}

Consulta [Getting Started with Synthetic Monitoring][18] para obtener instrucciones sobre cómo crear tu primera prueba Synthetic y monitorear tus aplicaciones web. Luego, explora [Getting Started with Private Locations][19] para obtener instrucciones sobre cómo crear tu ubicación privada y ejecutar pruebas Synthetic con tu ubicación privada.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/synthetics/create#
[2]: /es/api/latest/synthetics/#create-an-api-test
[3]: https://registry.terraform.io/providers/DataDog/datadog/latest/docs/resources/synthetics_test
[4]: /es/synthetics/api_tests/
[5]: /es/synthetics/multistep
[6]: /es/synthetics/api_tests/http_tests
[7]: /es/synthetics/api_tests/ssl_tests
[8]: /es/synthetics/api_tests/dns_tests
[9]: /es/synthetics/api_tests/websocket_tests
[10]: /es/synthetics/api_tests/tcp_tests
[11]: /es/synthetics/api_tests/udp_tests
[12]: /es/synthetics/api_tests/icmp_tests
[13]: /es/synthetics/api_tests/grpc_tests
[14]: /es/synthetics/browser_tests
[15]: /es/synthetics/private_locations
[16]: /es/synthetics/apm/
[17]: /es/synthetics/dashboards/
[18]: /es/getting_started/synthetics
[19]: /es/getting_started/synthetics/private_location
[20]: /es/continuous_testing/explorer/
[21]: /es/mobile_testing
[22]: /es/synthetics/test_coverage
[23]: /es/synthetics/guide/version_history/
[24]: /es/synthetics/notifications/
[25]: /es/synthetics/network_path_tests/
[26]: /es/synthetics/test_suites/