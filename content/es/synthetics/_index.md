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
  de sus sistemas y aplicaciones estén funcionando desde diversas ubicaciones alrededor
  del mundo.
further_reading:
- link: /synthetics/guide/
  tag: Documentación
  text: Guías de Monitoreo Sintético
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de Aprendizaje
  text: 'Centro de Aprendizaje de Datadog: Comenzando con Pruebas de Navegador Sintético'
- link: https://dtdg.co/fe
  tag: Habilitación de Fundación
  text: Únase a una sesión interactiva para mejorar sus capacidades de pruebas sintéticas
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Cómo asegurar los encabezados HTTP con pruebas sintéticas
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Obtenga información clave sobre las experiencias de los usuarios más rápido
    con el Monitoreo Sintético de Datadog
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Cómo crear pruebas de humo de UX eficientes con Monitoreo Sintético
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejore la precisión y el rendimiento de SLO con el Monitoreo Sintético de
    Datadog
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Cómo construir pruebas sintéticas confiables y precisas para sus aplicaciones
    móviles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatizando su infraestructura de pruebas sintéticas con el Monitoreo Sintético
    de Datadog y Terraform
- link: https://www.datadoghq.com/blog/simplifying-troubleshooting-with-synthetic-monitoring
  tag: Blog
  text: Simplificando la solución de problemas a lo largo del viaje del usuario con
    el Monitoreo Sintético de Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'De rendimiento a impacto: Conectando equipos de frontend a través de un contexto
    compartido'
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notas de la versión
  text: ¡Consulte los últimos lanzamientos del Monitoreo Sintético de Datadog! (Se
    requiere inicio de sesión en la aplicación)
title: Pruebas y Monitoreo Sintético
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrese" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
  Explore y regístrese para las sesiones de Habilitación de Fundación. Aprenda cómo el Monitoreo Sintético de Datadog es una solución de monitoreo proactiva que le permite crear pruebas de API, navegador y móvil sin código para simular automáticamente flujos de usuarios y solicitudes a sus aplicaciones, puntos de conexión clave y capas de red.
{{< /learning-center-callout >}}

Las pruebas sintéticas le permiten observar cómo están funcionando sus sistemas y aplicaciones utilizando **solicitudes y acciones simuladas de todo el mundo**. Datadog rastrea el rendimiento de sus páginas web y APIs desde el backend hasta el frontend y en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`) de manera controlada y estable, alertándole sobre comportamientos defectuosos como regresiones, funcionalidades rotas, tiempos de respuesta elevados y códigos de estado inesperados. 

**Calcular SLOs** en sus puntos de conexión clave y flujos de usuario facilita cumplir con sus objetivos de rendimiento de la aplicación y, en última instancia, proporcionar una experiencia coherente al cliente.

Puede crear pruebas sintéticas en la [aplicación de Datadog][1], con la [API][2] o con [Terraform][3].

## Configure pruebas de API y pruebas de API en varios pasos {#set-up-api-tests-and-multistep-api-tests}

Las pruebas de API le permiten lanzar [solicitudes individuales][4] o [encadenadas][5] para realizar verificaciones en sus sistemas clave en varios niveles de red: [prueba HTTP][6], [prueba SSL][7], [prueba DNS][8], [prueba WebSocket][9], [prueba TCP][10], [prueba UDP][11], [prueba ICMP][12] y [prueba gRPC][13]. 

{{< img src="synthetics/api_test.png" alt="Pruebas de API" style="width:100%;">}}

## Grabe pruebas de navegador {#record-browser-tests}

Utilice [pruebas de navegador sintéticas][14] para monitorear cómo sus clientes experimentan sus páginas web de principio a fin desde todo el mundo.

{{< img src="synthetics/browser_test.mp4" alt="Pruebas de navegador" video=true style="width:100%;">}}

## Grabe pruebas de aplicaciones móviles {#record-mobile-application-tests}

Utilice [pruebas de aplicaciones móviles sintéticas][21] para monitorear cómo sus clientes experimentan sus aplicaciones iOS y Android de principio a fin desde diferentes tipos de dispositivos.

{{< img src="synthetics/mobile_app_tests.png" alt="Ejemplos del flujo de trabajo de grabación para una prueba móvil sintética" style="width:100%;">}}

## Cree pruebas de ruta de red {#create-network-path-tests}

Cree [pruebas de ruta de red Synthetic][25] desde ubicaciones administradas para realizar verificaciones TCP, UDP e ICMP y visualizar rutas de paquetes a través de puntos de conexión globales.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Ejemplos de una prueba de red TCP sintética" style="width:100%;">}}
## Conjuntos de pruebas {#test-suites}

Utilice [Conjuntos de Pruebas Sintéticas][26] para organizar múltiples pruebas en colecciones lógicas agrupadas por recorrido del usuario, entorno, ubicación, servicio o equipo para una gestión y solución de problemas más eficientes. 

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del Conjunto de Pruebas de Monitoreo Sintético" style="width:100%;">}}

## Inicie ubicaciones privadas {#launch-private-locations}

Utilice [ubicaciones privadas sintéticas][15] para monitorear APIs y sitios web internos o crear ubicaciones personalizadas en áreas que son críticas para su negocio.

{{< img src="synthetics/private_locations.png" alt="Ubicaciones privadas" style="width:100%;">}}

## Conecte datos y trazas {#connect-data-and-traces}

Utilice la [integración entre pruebas sintéticas y trazas APM][16] para encontrar la causa raíz de fallas en solicitudes de frontend, red y backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Monitoreo Sintético" video=true style="width:100%;">}}

## Acceda a los tableros listos para usar {#access-out-of-the-box-dashboards}

Analice la información de rendimiento sobre sus pruebas de API, pruebas de API en varios pasos, pruebas de navegador y ubicaciones privadas, así como eventos de Datadog, con [tableros Synthetic listos para usar][17]. 

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Panel de Resumen de Monitoreo Sintético y Pruebas Continuas" style="width:100%;">}}

## Utilice el Explorador de Resultados de Monitoreo y Pruebas Sintéticas {#use-the-synthetic-monitoring-testing-results-explorer}

Cree [consultas de búsqueda y visualizaciones][20] para sus ejecuciones de prueba sintéticas o lotes de pruebas que se ejecutan en pipelines de CI/CD. 

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorador de Pruebas Continuas" style="width:100%;">}}

## Rastree la cobertura de pruebas {#track-testing-coverage}

Optimice su conjunto de pruebas [asegurándose de que los flujos de trabajo más críticos de su aplicación estén siendo probados][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorador de Pruebas Continuas" style="width:100%;">}}

## Notificaciones de Synthetic Monitoring {#synthetic-monitoring-notifications}

Utilice y enriquezca los monitores Synthetic para enviar notificaciones cuando una prueba de Synthetic Monitoring esté fallando. Las siguientes características están disponibles:

Mensajes de monitor prellenados
: Los mensajes de monitor Synthetic prellenados proporcionan un punto de partida estructurado para las alertas de pruebas Synthetic. Cada mensaje incluye un título estandarizado, un resumen y un pie de página que contiene metadatos de la prueba, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: Las variables de plantilla le permiten inyectar datos específicos de la prueba en las notificaciones de los monitores de manera dinámica. Estas variables extraen datos del objeto `synthetics.attributes`.

Uso avanzado
: El uso avanzado incluye técnicas para resaltar información más profunda de las pruebas o estructurar mensajes complejos utilizando plantillas de handlebars.

Alertas condicionales
: Las alertas condicionales le permiten cambiar el contenido de una notificación de monitor según resultados específicos de la prueba o condiciones de falla.

Para más información, consulte [notificaciones de Synthetic Monitoring][24].

## Historial de versiones {#version-history}

Utilice [Historial de versiones en Synthetic Monitoring][23] para ejecutar una versión anterior de una prueba, restaurar su prueba a cualquier versión guardada o clonar una versión para crear una nueva prueba de Synthetic Monitoring.

## ¿Listo para comenzar? {#ready-to-start}

Consulte [Introducción a Synthetic Monitoring][18] para obtener instrucciones sobre cómo crear su primera prueba sintética y monitorear sus aplicaciones web. Luego, consulte [Comenzando con Ubicaciones Privadas][19] para obtener instrucciones sobre cómo crear su ubicación privada y ejecutar pruebas sintéticas con su ubicación privada.

## Lectura Adicional {#further-reading}

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