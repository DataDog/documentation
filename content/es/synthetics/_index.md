---
algolia:
  tags:
  - synthetics
aliases:
- /es/integrations/synthetics/
cascade:
  algolia:
    rank: 70
description: Utiliza tests automatizados para asegurarte de que las zonas más críticas
  de tus sistemas y aplicaciones funcionan en distintos lugares del mundo.
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Synthetic%20Monitoring
  tag: Notas de la versión
  text: Echa un vistazo a las últimas versiones de la monitorización Synthetic en
    Datadog. (Es necesario iniciar sesión en la aplicación)
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: 'Centro de aprendizaje de Datadog: Empezando con los tests de navegador Synthetic'
- link: /synthetics/guide/
  tag: Documentación
  text: Guías para la monitorización Synthetic
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para mejorar tus capacidades de ejecutar
    tests synthetic
- link: https://www.datadoghq.com/blog/http-security-headers-synthetic-tests/
  tag: Blog
  text: Proteger las cabeceras HTTP con tests Synthetic
- link: https://www.datadoghq.com/blog/synthetic-monitoring-updates/
  tag: Blog
  text: Obtener información clave sobre las experiencias de los usuarios más rápidamente
    con la monitorización Synthetic en Datadog
- link: https://www.datadoghq.com/blog/smoke-testing-synthetic-monitoring/
  tag: Blog
  text: Crear tests de humo UX eficaces con la monitorización Synthetic
- link: https://www.datadoghq.com/blog/slo-synthetic-monitoring/
  tag: Blog
  text: Mejorar la precisión y el rendimiento de los SLOs con la monitorización Synthetic
    en Datadog
- link: https://www.datadoghq.com/blog/mobile-apps-synthetic-tests/
  tag: Blog
  text: Creación de tests Synthetic fiables y precisos para tus aplicaciones móviles
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a ampliar sus tests de navegador con Datadog
- link: https://www.datadoghq.com/blog/datadog-terraform-synthetic-testing/
  tag: Blog
  text: Automatización de tu infraestructura de synthetic tests con Datadog Synthetic
    Monitoring y Terraform
title: Tests y monitorización Synthetic
---

{{< learning-center-callout header="Unirse a una sesión de un seminario web de habilitación" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/session/synthetics/">}}
Explora e inscríbete en las sesiones de habilitación de los fundamentos. Aprende cómo la Monitorización Synthetic en Datadog es una solución de monitorización proactiva que te permite crear una API sin código, un navegador y tests móviles para simular automáticamente flujos y solicitudes de usuarios en tu aplicación, endpoints clave y capas de red.
{{< /learning-center-callout >}}

Los tests Synthetic te permiten observar el rendimiento de tus sistemas y aplicaciones utilizando **simulaciones de peticiones y acciones procedentes de todo el mundo**. Datadog rastrea el rendimiento de tus páginas web y APIs desde el backend hasta el frontend, y en varios niveles de red (`HTTP`,`SSL`,`DNS`,`WebSocket`,`TCP`,`UDP`,`ICMP` y  `gRPC`) de forma controlada y estable, alertándote sobre comportamientos defectuosos tales como regresiones, funciones rotas, tiempos de respuesta elevados y códigos de estado inesperados.

**Computar los SLO** en tus endpoints y recorridos de usuario más importantes facilita el cumplimiento de los objetivos de rendimiento de tu aplicación y, en última instancia, proporciona una experiencia de cliente coherente.

Puedes crear tests Synthetic en la [aplicación Datadog][1], con la [API][2], o con [Terraform][3].

## Configurar tests de API y tests de API multupaso

Los tests de la API te permiten lanzar solicitudes [únicas][4] o [encadenadas][5] para realizar verificaciones en tus sistemas principales en varios niveles de red: [test HTTP][6], [test SSL][7], [test DNS][8], [test WebSocket][9], [test TCP][10], [test UDP][11], [test ICMP][12] y [test gRPC][13].

{{< img src="synthetics/api_test.png" alt="API tests" style="width:100%;">}}

## Grabar tests de navegación

Utiliza [tests de navegador Synthetic][14] para monitorizar las experiencias de tus clientes con tus páginas web de extremo a extremo desde cualquier lugar del mundo.

{{< img src="synthetics/browser_test.mp4" alt="Browser tests" video=true style="width:100%;">}}

## Grabar tests de aplicaciones móviles

Utiliza [tests de aplicaciones móviles Synthetic][21] para monitorizar las experiencias de tus clientes con tus aplicaciones iOS y Android de extremo a extremo desde distintos tipos de dispositivos.

{{< img src="synthetics/mobile_app_tests.png" alt="Ejemplos de grabaciones de flujos de trabajo de un test móvil Synthetic" style="width:100%;">}}

## Crear tests de ruta de red

Crea [tests de ruta de red de Synthetic Monitoring][25] desde ubicaciones gestionadas para realizar checks TCP, UDP e ICMP y visualizar rutas de paquetes a través de endpoints globales.

{{< img src="synthetics/network_tests/syn_network_path.png" alt="Ejemplos de un test de red TCP de Synthetic" style="width:100%;">}}
## Conjuntos de tests

Utiliza [conjuntos de tests de Synthetic Monitoring][25] para organizar múltiples tests en colecciones lógicas agrupadas por recorrido del usuario, entorno, ubicación, servicio o equipo para una gestión y resolución de problemas racionalizados.

{{< img src="synthetics/test_suites/test_suite_summary.png" alt="Página de resumen del conjunto de tests de Synthetic Monitoring" style="width:100%;">}}

## Lanzar localizaciones privadas

Utiliza [Localizaciones privadas sintéticas][15] para monitorizar APIs y sitios web internos, o crea localizaciones personalizadas en áreas críticas para tu negocio.

{{< img src="synthetics/private_locations.png" alt="Private locations" style="width:100%;">}}

## Conectar datos y trazas (traces)

Utiliza la [integración entre tests sintéticos y trazas de APM][16] para encontrar la causa raíz de los fallos en las peticiones de frontend, red y backend.

{{< img src="synthetics/synthetics_traces.mp4" alt="Synthetic Monitoring" video=true style="width:100%;">}}

## Accede a dashboards preconfigurados

Analiza la información de rendimiento de tus tests de API, tests de API multipaso, tests de navegador y localizaciones privadas, así como los eventos de Datadog, con [dashboards sintéticos listos para usar][17].

{{< img src="synthetics/dashboards/test_dashboard.png" alt="Dashboard de monitorización Synthetic y del resumen de tests continuos" style="width:100%;">}}

## Utiliza la monitorización Synthetic y el Explorador de resultados de tests

Crea [buscar consultas y visualizaciones][20] para tus ejecuciones de test sintético o lotes de tests que se ejecutan en pipelines CI/CD.

{{< img src="continuous_testing/explorer_ci_batches_1.png" alt="Explorador de tests continuos" style="width:100%;">}}

## Seguimiento de la cobertura de los tests

Optimiza tu conjunto de tests [asegurándote de que se prueban los flujos de trabajo más críticos de tu aplicación][22].

{{< img src="synthetics/test_coverage/test_coverage.png" alt="Explorador de tests continuos" style="width:100%;">}}

## Notificaciones de Synthetic Monitoring

Utiliza y enriquece los monitores de monitorización Synthetic para enviar notificaciones cuando un test de monitorización Synthetic está fallando. Están disponibles las siguientes funciones:

Mensajes de monitor prerellenados 
: los mensajes de monitor prerellenados proporcionan un punto de partida estructurado para las alertas de Synthetic test. Cada mensaje incluye un título normalizado, un resumen y un pie de página con metadatos de test, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: las variables de plantilla permiten inyectar datos específicos de test en las notificaciones de monitor de forma dinámica. Estas variables se extraen del objeto `synthetics.attributes`.

Uso avanzado
: el uso avanzado incluye técnicas para profundizar en el test o estructurar mensajes complejos utilizando plantillas de identificadores.

Alerta condicional
: las alertas condicionales te permiten cambiar el contenido de una notificación de monitor en función de resultados específicos de test o de condiciones de fallo.

Para obtener más información, consulta las [notificaciones de monitorización Synthetic][24].

## Historial de versiones

Utiliza el [historial de versiones en la monitorización Synthetic][23] para ejecutar una versión anterior de un test, restaurar tu test a cualquier versión guardada o clonar una versión para crear un nuevo test de Synthetic Monitoring.

## ¿Estás listo para comenzar?

Consulta el apartado [Empezando con la monitorización Synthetic][18] para obtener instrucciones sobre cómo crear tu primer test Synthetic y la monitorización tus aplicaciones web. A continuación, explora [Empezando con localizaciones privadas][19] para obtener instrucciones sobre cómo crear tu localización privada y ejecutar tests Synthetic con tu localización privada.

## Referencias adicionales

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
[25]: /es/synthetics/test_suites/