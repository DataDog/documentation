---
algolia:
  tags:
  - synthetics
description: Monitoriza el rendimiento del sistema con solicitudes simuladas de API,
  navegador y tests móviles en ubicaciones globales.
further_reading:
- link: https://learn.datadoghq.com/courses/getting-started-with-synthetic-browser-testing
  tag: Centro de aprendizaje
  text: Primeros pasos con Synthetic Monitoring Browser Testing
- link: /synthetics/api_tests
  tag: Documentación
  text: Más información sobre los tests de API
- link: /synthetics/multistep
  tag: Documentación
  text: Más información sobre los tests de API multipaso
- link: /synthetics/mobile_app_testing
  tag: Documentación
  text: Más información sobre tests de móviles
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
- link: /synthetics/private_locations
  tag: Documentación
  text: Más información sobre las localizaciones privadas
- link: /continuous_testing/cicd_integrations
  tag: Documentación
  text: Más información sobre los tests Synthetic en la canalización de integración
    continua (CI)
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para mejorar tus capacidades de ejecutar
    tests synthetic
title: Empezando con la monitorización Synthetic
---

## Información general

Las pruebas Synthetic te permiten observar el rendimiento de tus sistemas y aplicaciones mediante **simulaciones de solicitudes y acciones procedentes de todo el mundo**. Datadog rastrea el rendimiento de tus páginas web y API desde el backend hasta el frontend, así como en varios niveles de red (`HTTP`, `SSL`, `DNS`, `WebSocket`, `TCP`, `UDP`, `ICMP` y `gRPC`), de forma controlada y estable, y te alerta sobre cualquier problema, como regresiones, funciones defectuosas, tiempos de respuesta altos y códigos de estado inesperados.

{{< img src="getting_started/synthetics/synthetic-monitoring-overview.png" alt="Tests de monitorización de Synthetic" style="width:100%;" >}}

## Tipos de tests Synthetic

Datadog ofrece **tests de API**, **tests de API multipaso**, **tests de navegador** y **tests de móviles**.

Para monitorizar aplicaciones internas, ejecute tus tests desde localizaciones gestionadas o privadas. Los tests Synthetic se pueden activar manualmente, en un horario, o [directamente desde tus pipelines CI/CD][7].

## Requisitos previos

Si aún no lo has hecho, crea una [cuenta de Datadog][1].

## Configura tu primer test

Para configurar tu primer test Synthetic con Datadog, elige alguna de las siguientes opciones:

- [Crea un test de API][2] para empezar a monitorizar el tiempo de actividad de los endpoints de tu API.
- [Crea un test de API multipaso][3] para vincular varias solicitudes HTTP y empezar a monitorizar flujos de trabajo clave en la API.
- [Crea un test de navegador][4] para empezar a testar transacciones empresariales críticas en tus aplicaciones.
- [Crea un test de móvil][6] para empezar a probar flujos de trabajo empresariales clave en tus aplicaciones Android e iOS.
- [Crea una localización privada][5] para empezar a monitorizar aplicaciones internas con todos los tipos de tests Synthetic.

## Notificaciones de Synthetic Monitoring

Utiliza y mejora los monitores de Synthetic para enviar notificaciones cuando un test de Synthetic Monitoring esté fallando. Están disponibles los siguientes casos de uso:

Mensajes de monitor prerellenados 
: los mensajes de monitor prerellenados proporcionan un punto de partida estructurado para las alertas de Synthetic test. Cada mensaje incluye un título normalizado, un resumen y un pie de página con metadatos de test, lo que facilita la comprensión de la alerta de un vistazo.

Variables de plantilla
: las variables de plantilla permiten inyectar datos específicos de test en las notificaciones de monitor de forma dinámica. Estas variables se extraen del objeto `synthetics.attributes`.

Uso avanzado
: el uso avanzado incluye técnicas para profundizar en el test o estructurar mensajes complejos utilizando plantillas de identificadores.

Alerta condicional
: las alertas condicionales te permiten cambiar el contenido de una notificación de monitor en función de resultados específicos de test o de condiciones de fallo.

Para más información, consulta [notificaciones de Synthetic Monitoring][9].

## Historial de versiones

Utiliza [Historial de versiones en Synthetic Monitoring][8] para ejecutar una versión anterior de un test, restaurar tu test a cualquier versión guardada o clonar una versión para crear un nuevo test de Synthetic Monitoring.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/
[2]: /es/getting_started/synthetics/api_test/
[3]: /es/getting_started/synthetics/api_test/#create-a-multistep-api-test
[4]: /es/getting_started/synthetics/browser_test/
[5]: /es/getting_started/synthetics/private_location/
[6]: /es/getting_started/synthetics/mobile_app_testing/
[7]: /es/getting_started/continuous_testing/
[8]: /es/synthetics/guide/version_history/
[9]: /es/synthetics/notifications/