---
further_reading:
- link: https://learn.datadoghq.com/courses/dd-101-dev
  tag: Centro de aprendizaje
  text: 'Introducción a Datadog: desarrollador'
- link: https://learn.datadoghq.com/courses/dd-101-sre
  tag: Centro de aprendizaje
  text: 'Introducción a Datadog: ingeniero de confiabilidad de sitios'
- link: https://dtdg.co/fe
  tag: Habilitar los fundamentos
  text: Participa en una sesión interactiva para construir una base sólida de Datadog
- link: https://www.datadoghq.com/blog/datadog-quick-nav-menu/
  tag: Blog
  text: Introducción al menú de navegación rápida de Datadog
- link: https://www.datadoghq.com/blog/engineering/druids-the-design-system-that-powers-datadog/
  tag: Blog
  text: DRUIDS, el sistema de diseño que impulsa a Datadog
kind: documentación
title: Empezando en Datadog
---

## Información general

Esta página ofrece información general de alto nivel sobre las funciones disponibles en el [sitio de Datadog][1].

La experiencia de navegación en el sitio de Datadog varía en función del ancho que tenga tu navegador. Hay hasta tres tipos de navegación disponibles y, para cambiar de uno a otro, es necesario que ajustes el ancho de tu navegador.

## Integraciones

{{< img src="getting_started/integrations.png" alt="Integrations (Integraciones)" >}}

- Datadog tiene más de {{< translate key="integration_count" >}} integraciones [oficiales][2].
- Las integraciones personalizadas están disponibles a través de la [API de Datadog][3].
- El Agent es de [código abierto][4].
- Una vez que se hayan configurado las integraciones, Datadog tratará todos los datos de la misma manera, independientemente de si están en un centro de datos o en un servicio en línea.

## Log Management

{{< img src="getting_started/logs.png" alt="Logs" >}}

La herramienta [Log Management de Datadog][5] te permite enviar y procesar todos los logs producidos por tus aplicaciones e infraestructura. Puedes consultar tus logs en tiempo real con Live Tail, sin necesidad de indexarlos. Asimismo, puedes ingerir todos los logs de tus aplicaciones e infraestructura, decidir cuáles indexar dinámicamente con filtros y, luego, almacenarlos en un archivo.

## APM y Continuous Profiler

{{< img src="getting_started/apm.png" alt="Dashboard de APM" >}}

La herramienta [Application Performance Monitoring de Datadog][6] (APM o rastreo) te ofrece información pormenorizada sobre el rendimiento de tu aplicación, desde dashboards generados automáticamente para monitorizar métricas clave, como el volumen o la latencia de las solicitudes, hasta trazas detalladas de solicitudes individuales, junto a la monitorización de tus logs e infraestructura. Cuando se realiza una solicitud a una aplicación, Datadog puede detectar las trazas en un sistema distribuido y mostrarte datos sistemáticos sobre lo que se está haciendo exactamente con esa solicitud.

## Infrastructure (Infraestructura)

{{< img src="getting_started/infrastructure.png" alt="Infrastructure (Infraestructura)" >}}

- La [lista de la infraestructura][7] muestra todas las máquinas.
- Puedes ver las etiquetas (tags) que tiene cada máquina. El etiquetado te permite indicar qué máquinas tienen un objetivo concreto.
- Datadog trata de clasificar tus servidores automáticamente. Si se etiqueta una máquina nueva, verás de inmediato que las estadísticas de esa máquina variarán en función de cómo se haya configurado previamente esa etiqueta. [Más información sobre el etiquetado][8].

## Host map (Mapa del host)

{{< img src="getting_started/hostmap-overview.png" alt="Información general del mapa del host" >}}

El [mapa del host][9] se puede encontrar en el menú Infrastructure. Con él, puedes:

- Visualizar rápidamente tu entorno
- Identificar outliers
- Detectar patrones de uso
- Optimizar recursos

Para más información, consulta [Mapa del host][9].

## Events (Eventos)

{{< img src="service_management/eventos/explorer/eventos-overview.png" alt="Eventos Explorer" style="width:100%;" >}}

El [Event Explorer][10] (Navegador de eventos) muestra los últimos eventos generados por tus servicios e infraestructura.

Entre los diferentes tipos de eventos, se pueden citar los siguientes:

- Implementaciones de código
- Cambios en el estado de un servicio
- Cambios en la configuración
- Alertas de monitorización

El Event Explorer agrupa los eventos automáticamente en función del Agent y de las integraciones instaladas.

También puedes enviar tus propios eventos personalizados usando la API de Datadog, los checks de Agent personalizados, DogStatsD o la API de correo electrónico de los eventos. 

En el Event Explorer, filtra tus eventos por facetas o por consultas de búsqueda. Agrupa o filtra los eventos por atributo y represéntalos gráficamente con [Event Analytics][11].

## Dashboards

{{< img src="getting_started/dashboard.png" alt="Dashboards" >}}

Los [dashboards][12] contienen gráficos con métricas de rendimiento en tiempo real.

- El cursor se mueve de forma sincronizada por todos los gráficos de un [screenboard][13].
- Las barras verticales son eventos. Sirven para aportar contexto a la métrica.
- Haz clic en un gráfico y arrástralo para ampliar un intervalo de tiempo en concreto.
- Cuando pases el cursor sobre el gráfico, el flujo de eventos se moverá al mismo tiempo.
- Vistas disponibles por zona, host o uso total.
- Datadog expone un editor JSON para el gráfico, con el que se pueden someter las métricas a [cálculos aritméticos][14] y [funciones][15].
- Puedes compartir un snapshot del gráfico que aparezca en el flujo (stream).
- Los gráficos pueden estar integrados en un iframe. Si se da el caso, puedes permitir que un tercero acceda a un gráfico en tiempo real sin necesidad de darle acceso a tus datos ni a ningún otro tipo de información.

## Monitores

Los [monitores][16] envían alertas y notificaciones en función de los umbrales de métrica, la disponibilidad para la integración o los endpoints de la red, entre otros aspectos.

- Usa cualquier métrica que envíe información a Datadog
- Configura varias alertas por dispositivo, host, etc.
- Usa `@` en los mensajes de alerta para dirigir las notificaciones a las personas adecuadas
- Programa tiempos de inactividad para suprimir las notificaciones por cierre del sistema, mantenimiento sin conexión, etc.

{{< img src="getting_started/application/metric_monitor.png" alt="Configuración de alertas" >}}

## Network Performance Monitoring

{{< img src="getting_started/npm.png" alt="NPM" >}}

La herramienta [Network Performance Monitoring][17] (NPM) de Datadog te permite ver el tráfico de red de todos los objetos etiquetados en Datadog, independientemente de si son contenedores, hosts, servicios o zonas de disponibilidad. Agrúpalos como quieras, ya sea por centros de datos, equipos o contenedores individuales, y usa las etiquetas para filtrar el tráfico según la fuente y el destino. Acto seguido, los filtros se integrarán en los flujos, cada uno de los cuales mostrará el tráfico existente entre una fuente y un destino a través de una página de red y un mapa de red que se pueden personalizar. Todos los flujos contienen métricas de red, como la capacidad de procesamiento, el ancho de banda, el count de retransmisiones y la información de la fuente/destino relativa a la IP, el puerto y los niveles de PID. A continuación, se envían las métricas clave, como el volumen de tráfico y las retransmisiones de TCP.

## RUM y Session Replay

{{< img src="getting_started/rum.png" alt="RUM" >}}

La herramienta [Real User Monitoring][18] (RUM) de Datadog te permite visualizar y analizar la actividad y la experiencia de los usuarios en tiempo real. Con [Session Replay][19], puedes capturar y consultar las sesiones de navegación por la web de los usuarios para comprender mejor su comportamiento. Con el navegador RUM, no solo puedes visualizar los tiempos de carga, los errores frontend y las dependencias de las páginas, sino también correlacionar las métricas empresariales y de la aplicación para solucionar en un único dashboard los problemas presentes en las métricas de la aplicación, la infraestructura y el negocio.

## Serverless

La herramienta [Serverless][20] te permite redactar código dependiente de eventos y cargarlo a un proveedor de soluciones en la nube que se encargue de gestionar todos los recursos computacionales subyacentes. Datadog Serverless reúne en una sola vista las métricas, trazas y logs procedentes de las funciones de AWS Lambda que ejecutan aplicaciones serverless, lo que te permite filtrar las funciones que generan errores, niveles altos de latencia o arranques en frío para optimizar el rendimiento.

## Cloud SIEM

{{< img src="getting_started/security.png" alt="seguridad" >}}

La herramienta [Cloud SIEM][21] (que en inglés significa "Información de seguridad y gestión de eventos en la nube") de Datadog detecta automáticamente los elementos que suponen una amenaza para tu aplicación o infraestructura. Por ejemplo: un ataque dirigido, una IP que se comunique con tus sistemas y que forme parte de una lista de amenazas, o una configuración insegura. Datadog presenta estas amenazas como señales de seguridad, que se pueden correlacionar y evaluar en el navegador de seguridad.

## Synthetic Monitoring

{{< img src="getting_started/synthetics.png" alt="Synthetics" >}}

La herramienta [Synthetic Monitoring][22] de Datadog te permite crear y ejecutar tests de API y navegador que simulan de forma proactiva las transacciones que hacen los usuarios en tus aplicaciones. Asimismo, te permite monitorizar todos los endpoints de red internos y externos en todos los niveles del sistema. Por tanto, puedes detectar errores, identificar regresiones y automatizar reversiones para impedir que los problemas repercutan en la fase de producción.

## Datadog para dispositivos móviles

La [aplicación móvil de Datadog][23], disponible en el [App Store de Apple][24] y en [Google Play][25], ofrece datos clave para que tanto los ingenieros de servicio como los usuarios empresariales puedan seguir el estado de sus servicios y evaluar los problemas rápidamente sin necesidad de recurrir al ordenador. Accede a los dashboards, monitores, incidencias, SLOs, etc., de tu organización directamente desde tu dispositivo móvil.

{{< img src="getting_started/application/mobile-app-store-screens.png" style="width:100%; background:none; border:none; box-shadow:none;" alt="Aplicación móvil para iOS">}}

## Leer más
{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com
[2]: http://www.datadoghq.com/integrations
[3]: /es/api/
[4]: https://github.com/DataDog/datadog-agent
[5]: /es/logs/
[6]: /es/tracing/
[7]: /es/infrastructure/
[8]: /es/getting_started/tagging/
[9]: /es/infrastructure/hostmap/
[10]: /es/service_management/events/
[11]: /es/service_management/events/explorer/analytics
[12]: /es/dashboards/
[13]: /es/dashboards/#screenboards
[14]: /es/dashboards/functions/arithmetic/
[15]: /es/dashboards/functions/
[16]: /es/monitors/
[17]: /es/network_monitoring/performance/
[18]: /es/real_user_monitoring/
[19]: /es/real_user_monitoring/session_replay/browser/
[20]: /es/serverless
[21]: /es/security/cloud_siem/
[22]: /es/synthetics/
[23]: /es/service_management/mobile/
[24]: https://apps.apple.com/app/datadog/id1391380318
[25]: https://play.google.com/store/apps/details?id=com.datadog.app