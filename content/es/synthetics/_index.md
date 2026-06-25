---
algolia:
  tags:
  - synthetics
aliases:
- /es/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: Utiliza pruebas automatizadas para garantizar que las partes más críticas
  de tus sistemas y aplicaciones estén en funcionamiento desde diversas ubicaciones
  en todo el mundo.
further_reading:
- link: /synthetics/guide/
  tag: Documentación
  text: Guías de Monitoreo Sintético
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de Aprendizaje
  text: 'Centro de Aprendizaje de Datadog: Comenzando con pruebas de navegador sintéticas'
- link: https://dtdg.co/fe
  tag: Habilitación de Fundación
  text: Únete a una sesión interactiva para potenciar tus capacidades de pruebas sintéticas
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Cómo asegurar los encabezados HTTP con pruebas sintéticas
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Obtén información clave sobre las experiencias de tus usuarios de manera más
    rápida con Monitoreo Sintético de Datadog
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Cómo crear pruebas de humo de UX eficientes con Monitoreo Sintético
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejora la precisión y el rendimiento de los SLO con Monitoreo Sintético de
    Datadog
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Cómo construir pruebas sintéticas confiables y precisas para tus aplicaciones
    móviles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatizando tu infraestructura de pruebas sintéticas con Monitoreo Sintético
    de Datadog y Terraform
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplifica la resolución de problemas a lo largo del recorrido del usuario
    con Monitoreo Sintético de Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De rendimiento a impacto: Conectando equipos de frontend a través de un contexto
    compartido'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notas de la versión
  text: ¡Consulta los últimos lanzamientos de Monitoreo Sintético de Datadog! (Se
    requiere inicio de sesión en la aplicación)
title: Pruebas sintéticas y Monitoreo Sintético
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explora y regístrate para las sesiones de Habilitación de Fundación. Aprende cómo el Monitoreo Sintético de Datadog es una solución de monitoreo proactiva que te permite crear pruebas de API, navegador y móvil sin código para simular automáticamente flujos de usuario y solicitudes a tus aplicaciones, puntos de conexión clave y capas de red.
{{< /learning-center-callout >}}

Las pruebas sintéticas te permiten observar cómo están funcionando tus sistemas y aplicaciones utilizando **solicitudes y acciones simuladas de todo el mundo**. Datadog rastrea el rendimiento de tus páginas web y APIs desde el backend hasta el frontend, y en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP`, y `gRPC`) de manera controlada y estable, alertándote sobre comportamientos defectuosos como regresiones, características rotas, altos tiempos de respuesta y códigos de estado inesperados. 

**Calcula SLOs** en tus puntos de conexión clave y recorridos de usuario, lo que facilita alcanzar tus objetivos de rendimiento de la aplicación y, en última instancia, ofrecer una experiencia del cliente consistente.

Puedes crear pruebas sintéticas en la [aplicación de Datadog][1], con la [API][2], o con [Terraform][3].

## Configura pruebas de API y pruebas de API en varios pasos {#set-up-api-tests-and-multistep-api-tests}

Las pruebas de API te permiten lanzar [solicitudes individuales][4] o [encadenadas][5] para realizar verificaciones en tus sistemas clave en varios niveles de red: [prueba HTTP][6], [prueba SSL][7], [prueba DNS][8], [prueba WebSocket][9], [prueba TCP][10], [prueba UDP][11], [prueba ICMP][12], y [prueba gRPC][13]. 

{{< img src="synthetics/api_test.png" alt="Pruebas de API" style="width:100%;">}}

## Graba pruebas de navegador {#record-browser-tests}

Utiliza [pruebas de navegador sintéticas][14] para monitorear cómo tus clientes experimentan tus páginas web de principio a fin desde todo el mundo.

{{< img src="synthetics/browser_test.mp4" alt="Pruebas de navegador" video=true style="width:100%;">}}

## Graba pruebas de aplicaciones móviles {#record-mobile-application-tests}

Utiliza [pruebas de aplicaciones móviles sintéticas][21] para monitorear cómo tus clientes experimentan tus aplicaciones de iOS y Android de principio a fin desde diferentes tipos de dispositivos.

{{< img src="synthetics/mobile_app_tests.png" alt="Ejemplos del flujo de trabajo de grabación para una Prueba Móvil Sintética" style="width:100%;">}}

## Crea pruebas de ruta de red {#create-network-path-tests}

Crea [pruebas de ruta de red sintéticas][25] desde ubicaciones gestionadas para realizar verificaciones TCP, UDP e ICMP y visualizar rutas de paquetes a través de puntos finales globales.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Ejemplos de una prueba de red TCP sintética" style="width:100%;">}}
## Conjuntos de pruebas {#test-suites}

Utiliza [conjuntos de pruebas sintéticas][26] para organizar múltiples pruebas en colecciones lógicas agrupadas por recorrido del usuario, entorno, ubicación, servicio o equipo para una gestión y resolución de problemas más eficientes. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del Conjunto de Pruebas de Monitoreo Sintético" style="width:100%;">}}

## Lanza ubicaciones privadas {#launch-private-locations}

Usa [ubicaciones privadas sintéticas][15] para monitorear APIs y sitios web internos o crear ubicaciones personalizadas en áreas críticas para tu negocio.

{{< img src="synthetics/private_locations.png" alt="Ubicaciones privadas" style="width:100%;">}}

## Conecta datos y trazas {#connect-data-and-traces}

Usa la [integración entre pruebas sintéticas y trazas APM][16] para identificar la causa raíz de las fallas en solicitudes de frontend, red y backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Monitoreo Sintético" video=true style="width:100%;">}}

## Accede a tableros listos para usar {#access-out-of-the-box-dashboards}

Analiza la información de rendimiento sobre tus pruebas de API, pruebas de API en varios pasos, pruebas de navegador y ubicaciones privadas, así como eventos de Datadog, con [tableros sintéticos listos para usar][17]. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Tablero de resumen de Monitoreo Sintético y Pruebas Continuas" style="width:100%;">}}

## Usa el Explorador de Resultados de Monitoreo y Pruebas Sintéticas {#use-the-synthetic-monitoring-testing-results-explorer}

Crea [consultas de búsqueda y visualizaciones][20] para tus ejecuciones de pruebas sintéticas o grupos de pruebas que se ejecutan en pipelines de CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorador de Pruebas Continuas" style="width:100%;">}}

## Rastrea la cobertura de pruebas {#track-testing-coverage}

Optimiza tu conjunto de pruebas [asegurándote de que los flujos de trabajo más críticos de tu aplicación estén siendo probados][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorador de Pruebas Continuas" style="width:100%;">}}

## Notificaciones de Monitoreo Sintético {#synthetic-monitoring-notifications}

Utilice y enriquezca los monitores sintéticos para enviar notificaciones cuando una prueba de Monitoreo Sintético esté fallando. Las siguientes características están disponibles:

Mensajes de seguimiento predefinidos
: Los mensajes de seguimiento predefinidos proporcionan un punto de partida estructurado para las alertas de pruebas sintéticas. Cada mensaje incluye un título estandarizado, un resumen y un pie de página que contiene metadatos de prueba, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: Las variables de plantilla te permiten inyectar datos específicos de la prueba en las notificaciones de seguimiento de manera dinámica. Estas variables se extraen del objeto `synthetics.attributes`.

Uso avanzado
: El uso avanzado incluye técnicas para resaltar información más profunda de las pruebas o estructurar mensajes complejos utilizando plantillas de handlebars.

Alertas condicionales
: Las alertas condicionales te permiten cambiar el contenido de una notificación de seguimiento según resultados específicos de pruebas o condiciones de fallo.

Para más información, consulta [las notificaciones de Monitoreo Sintético][24].

## Historial de versiones {#version-history}

Usa [Historial de versiones en Monitoreo Sintético][23] para ejecutar una versión anterior de una prueba, restaurar tu prueba a cualquier versión guardada o clonar una versión para crear una nueva prueba de Monitoreo Sintético.

## ¿Listo para comenzar? {#ready-to-start}

Consulta [Introducción a Monitoreo Sintético][18] para obtener instrucciones sobre cómo crear tu primera prueba sintética y monitorear tus aplicaciones web. Luego, explora [Introducción a Ubicaciones Privadas][19] para obtener instrucciones sobre cómo crear tu ubicación privada y ejecutar pruebas sintéticas con tu ubicación privada.

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