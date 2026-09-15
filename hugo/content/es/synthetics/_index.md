---
algolia:
  tags:
  - synthetics
aliases:
- /es/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: Utilice pruebas automatizadas para garantizar que las partes más críticas
  de sus sistemas y aplicaciones estén en funcionamiento desde varias ubicaciones
  alrededor del mundo.
further_reading:
- link: /synthetics/guide/
  tag: Documentación
  text: Guías de Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: 'Centro de aprendizaje de Datadog: Introducción a Synthetic Browser Testing'
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para mejorar sus capacidades de prueba Synthetic
- link: https://www.datadoghq.com/blog/network-test-protocols/
  tag: Blog
  text: Pruebe rutas de red con TCP, UDP e ICMP en Datadog
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Cómo proteger los encabezados HTTP con pruebas Synthetic
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Obtenga información clave sobre las experiencias de los usuarios más rápido
    con Datadog Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Cómo crear pruebas de humo de UX eficientes con Synthetic Monitoring
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejore la precisión y el rendimiento de los SLO con Datadog Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Cómo crear pruebas Synthetic confiables y precisas para sus aplicaciones móviles.
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog.
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatización de su infraestructura de pruebas Synthetic con Datadog Synthetic
    Monitoring y Terraform.
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificación de la resolución de problemas a lo largo del recorrido del
    usuario con Datadog Synthetic Monitoring.
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: conectando a los equipos de frontend a través
    de un contexto compartido.'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notas de la versión
  text: ¡Eche un vistazo a las últimas versiones de Datadog Synthetic Monitoring!
    (Se requiere inicio de sesión en la aplicación).
title: Synthetic Testing y Monitoring
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explore y regístrese en las sesiones de Foundation Enablement. Aprenda cómo Datadog Synthetic Monitoring es una solución de monitoreo proactiva que le permite crear pruebas de API, navegador y móviles sin código para simular automáticamente flujos de usuario y solicitudes a sus aplicaciones, endpoints clave y capas de red.
{{< /learning-center-callout >}}

Las pruebas Synthetic le permiten observar cómo funcionan sus sistemas y aplicaciones mediante **solicitudes y acciones simuladas de todo el mundo**. Datadog rastrea el rendimiento de sus páginas web y API desde el backend hasta el frontend, y en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`) de una manera controlada y estable, alertándole sobre comportamientos defectuosos como regresiones, funciones rotas, tiempos de respuesta altos y códigos de estado inesperados. 

**Calcular SLOs** en sus endpoints clave y recorridos de usuario facilita el cumplimiento de sus objetivos de rendimiento de aplicaciones y, en última instancia, brindar una experiencia al cliente consistente.

Puede crear pruebas Synthetic en la [aplicación de Datadog][1], con la [API][2] o con [Terraform][3].

## Configurar pruebas de API y pruebas de API de varios pasos {#set-up-api-tests-and-multistep-api-tests}

Las pruebas de API le permiten lanzar solicitudes [únicas][4] o [encadenadas][5] para realizar verificaciones en sus sistemas clave en varios niveles de red: [prueba HTTP][6], [prueba SSL][7], [prueba DNS][8], [prueba WebSocket][9], [prueba TCP][10], [prueba UDP][11], [prueba ICMP][12] y [prueba gRPC][13]. 

{{< img src="synthetics/api_tests/api_test_shopist.png" alt="Página de detalles de la prueba de API HTTP que muestra la pestaña Actividad con tiempo de actividad global, una línea de tiempo de alertas y una lista de las últimas ejecuciones de prueba" style="width:100%;">}}

## Grabar pruebas de navegador {#record-browser-tests}

Utilice [Synthetic browser tests][14] para monitorear cómo sus clientes experimentan sus páginas web de principio a fin desde todo el mundo.

{{< img src="synthetics/browser_test.mp4" alt="Pruebas de navegador" video=true style="width:100%;">}}

## Grabar pruebas de aplicaciones móviles {#record-mobile-application-tests}

Utilice [Synthetic mobile application tests][21] para monitorear cómo sus clientes experimentan sus aplicaciones iOS y Android de principio a fin desde diferentes tipos de dispositivos.

{{< img src="synthetics/mobile_app_tests.png" alt="Ejemplos del flujo de trabajo de grabación para una prueba móvil sintética" style="width:100%;">}}

## Crear pruebas de Network Path {#create-network-path-tests}

Cree [Synthetic network path tests][25] desde ubicaciones administradas para realizar verificaciones TCP, UDP e ICMP y visualizar rutas de paquetes a través de endpoints globales.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Ejemplos de Synthetic TCP network test" style="width:100%;">}}
## Conjuntos de pruebas {#test-suites}

Utilice [prueba Synthetic Suites][26] para organizar múltiples pruebas en colecciones lógicas agrupadas por recorrido del usuario, entorno, ubicación, servicio o equipo para una gestión y resolución de problemas optimizadas. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del conjunto de pruebas de Synthetic Monitoring" style="width:100%;">}}

## Explore Bits Testing y Goal-Based Testing {#explore-bits-testing-and-goal-based-testing}

Utilice [Bits Testing][27] para explorar su aplicación, asignar recorridos críticos del usuario y generar pruebas Synthetic que los cubran, incluidas las [pruebas basadas en objetivos][28] que verifican que los usuarios puedan alcanzar un objetivo mediante pruebas no deterministas y basadas en agentes.

{{< img src="synthetics/bits_testing/bits_testing_landing.png" alt="La página de inicio de Bits Testing con un aviso para describir la cobertura de pruebas que desea" style="width:100%;">}}

## Inicie ubicaciones privadas {#launch-private-locations}

Utilice [Synthetic private locations][15] para monitorear API y sitios web internos o crear ubicaciones personalizadas en áreas que son críticas para su negocio.

{{< img src="synthetics/private_locations.png" alt="Ubicaciones privadas" style="width:100%;">}}

## Conecte datos y trazas {#connect-data-and-traces}

Utilice la [integración entre las pruebas Synthetic y las trazas de APM][16] para encontrar la causa raíz de las fallas en las solicitudes de frontend, red y backend.

{{< img src="synthetics/apm/synthetics_apm_new.mp4" alt="Una prueba de API fallida con el panel lateral abierto en la pestaña traza, que muestra la traza de APM generada por la ejecución de prueba con intervalos codificados por colores en todos los servicios" video=true style="width:100%;">}}

## Acceda a tableros preconfigurados {#access-out-of-the-box-dashboards}

Analice la información de rendimiento sobre sus pruebas de API, pruebas de API de varios pasos, pruebas de navegador y ubicaciones privadas, así como eventos de Datadog, con [tableros de Synthetic preconfigurados][17]. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Tablero de resumen de Synthetic Monitoring & Continuous Testing" style="width:100%;">}}

## Utilice el explorador de resultados de Synthetic Monitoring & Testing {#use-the-synthetic-monitoring-testing-results-explorer}

Cree [consultas de búsqueda y visualizaciones][20] para sus ejecuciones de prueba de Synthetic o lotes de pruebas Synthetic que se ejecutan en canalizaciones de CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorador de Continuous Testing" style="width:100%;">}}

## Realice un seguimiento de la cobertura de pruebas {#track-testing-coverage}

Optimice su conjunto de pruebas [asegurándose de que se estén probando los flujos de trabajo más críticos de su aplicación][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorador de Continuous Testing" style="width:100%;">}}

## Notificaciones de Synthetic Monitoring {#synthetic-monitoring-notifications}

Utilice y enriquezca los Synthetic monitors para enviar notificaciones cuando una prueba de Synthetic Monitoring esté fallando. Las siguientes funciones están disponibles:

Mensajes de monitor prellenados
: Los mensajes de monitor prellenados proporcionan un punto de partida estructurado para alertas de prueba Synthetic. Cada mensaje incluye un título, un resumen y un pie de página estandarizados que contienen metadatos de la prueba, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: Las variables de plantilla le permiten insertar datos específicos de la prueba en las notificaciones del monitor de forma dinámica. Estas variables se obtienen del objeto `synthetics.attributes`.

Uso avanzado
: El uso avanzado incluye técnicas para obtener información más profunda de las pruebas o estructurar mensajes complejos mediante el uso de plantillas de handlebars.

Alerta condicional
: La alerta condicional le permite cambiar el contenido de una notificación de monitor según resultados de prueba o condiciones de falla específicos.

Para obtener más información, consulte [Notificaciones de Synthetic Monitoring][24].

## Historial de versiones {#version-history}

Utilice [Historial de versiones en Synthetic Monitoring][23] para ejecutar una versión anterior de una prueba, restaurar su prueba a cualquier versión guardada o clonar una versión para crear una nueva prueba de Synthetic Monitoring.

## ¿Listo para comenzar? {#ready-to-start}

Consulte [Introducción a Synthetic Monitoring][18] para obtener instrucciones sobre cómo crear su primera prueba Synthetic y monitorear sus aplicaciones web. Luego, explore [Introducción a Private Locations][19] para obtener instrucciones sobre cómo crear su ubicación privada y ejecutar pruebas Synthetic con su ubicación privada.

## Lecturas adicionales {#further-reading}

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
[27]: /es/synthetics/bits_testing/
[28]: /es/synthetics/goal_based_testing/