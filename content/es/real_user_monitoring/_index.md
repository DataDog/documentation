---
algolia:
  tags:
  - rum
  - real user monitoring
aliases:
- /es/real_user_monitoring/installation
- /es/real_user_monitoring/faq/
cascade:
  algolia:
    rank: 70
description: Visualiza, observa y analiza el rendimiento de tus aplicaciones de front-end
  tal como las ven tus usuarios.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notas de la versión
  text: Consulta las últimas versiones de Datadog RUM. (Es necesario iniciar sesión
    en la aplicación)
- link: https://dtdg.co/fe
  tag: Habilitación de los fundamentos
  text: Participa en una sesión interactiva para obtener información a través de Real
    User Monitoring
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Presentamos Datadog Real User Monitoring
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Mejora la experiencia móvil del usuario con Real User Monitoring móvil de
    Datadog
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Prácticas recomendadas para monitorizar el rendimiento de aplicaciones móviles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entiende los problemas de las aplicaciones con el seguimiento de errores de
    Datadog
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifica los datos de APM y RUM para una visibilidad completa del stack tecnológico
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliza geomapas para ver los datos de tu aplicación por ubicación
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: Blog
  text: Obtén datos de RUM mejorados con nuestros componentes de React personalizados
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: Blog
  text: Monitoriza tus aplicaciones móviles híbridas con Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Cómo el equipo de Soluciones técnicas de Datadog utiliza RUM, Session Replay
    y el seguimiento de errores para solucionar los problemas de los clientes
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de aplicaciones web estáticas
- link: /real_user_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos del navegador de RUM recopilados
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: Blog
  text: Prácticas recomendadas para la monitorización de aplicaciones web progresivas
title: RUM y Session Replay
---


{{< learning-center-callout header="Únete a una sesión de capacitación web" hide_image="true" btn_title="Inscríbete" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Descubre cómo crear acciones de usuarios personalizadas que se adapten a necesidades empresariales específicas, lo que permite un seguimiento preciso del comportamiento de los usuarios.
{{< /learning-center-callout >}}

## ¿Qué es Real User Monitoring?

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Dashboard de RUM" >}}

Con Datadog Real User Monitoring (RUM)*, disfrutarás de una visibilidad de extremo a extremo de la actividad y la experiencia en tiempo real de cada usuario. RUM resuelve cuatro tipos de casos de uso para la monitorización de aplicaciones web y móviles:

* **Rendimiento**: Realiza un seguimiento del rendimiento de páginas web, pantallas de aplicaciones móviles, acciones de los usuarios, solicitudes de red y tu código frontend.
* **Gestión de errores**: Monitoriza los errores y problemas en curso y haz un seguimiento a lo largo del tiempo en las diferentes versiones.
* **Análisis/Uso**: Conoce quién utiliza tu aplicación (país, dispositivo, sistema operativo), controla los recorridos de cada usuario y analiza cómo interactúan los usuarios con tu aplicación (página que más suele visitarse, clics, interacciones y uso de funciones).
* **Asistencia**: Obtén toda la información relacionada con una sesión de usuario para solucionar un problema (duración de la sesión, páginas visitadas, interacciones, recursos cargados y errores).

Una sesión de usuario es un recorrido del usuario en tu aplicación web o móvil que dura hasta cuatro horas. Una sesión suele incluir las páginas vistas y la telemetría asociada. Si un usuario no interactúa con una aplicación durante 15 minutos, la sesión se considera terminada. Una nueva sesión comienza cuando el usuario vuelve a interactuar con la aplicación.

## ¿Qué es Session Replay?

*Session Replay* de Datadog te permite detectar y reproducir visualmente la experiencia de navegación web de tus usuarios.

Cuando se utiliza junto con los datos de rendimiento de RUM, Session Replay ayuda a identificar, reproducir y solucionar errores, además de ofrecer información sobre los patrones de uso de tu aplicación web y sus problemas de diseño.

## Para empezar

Selecciona un tipo de aplicación para empezar a recopilar datos de RUM:

{{< partial name="rum/rum-getting-started.html" >}}

</br>

### Funcionalidades y plataformas compatibles

**Nota**: El SDK de Datadog Flutter no es compatible con MacOS, Windows o Linux.

La siguiente tabla muestra las funcionalidades de RUM compatibles con cada plataforma:

| Función                               | Navegador | Android | iOS |   Flutter   | React Native | Roku | Notas |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-------|
| Enviar logs a Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Rastreo distribuido de solicitudes de red | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | El **SDK de Datadog Roku** sólo puede rastrear algunos tipos de solicitudes HTTP. |
| Rastrear vistas y acciones (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | - Todas las acciones rastreadas en **Flutter Web** se registran como `custom`<br> - **Roku** sólo admite el rastreo manual de acciones. |
| Seguimiento de marcadores de funciones y seguimiento de versiones | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Seguimiento de errores y asignación de orígenes | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Sólo parcialmente compatible con **React Native** |
| Seguimiento de fallos, simbolización y desofuscación | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Detener sesiones (monitorización de quioscos) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Rastrear eventos en vistas web |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Monitorizar indicadores vitales específicos de plataformas | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  |  |
| Seguimiento global de contexto/atributo en logs  | {{< X >}} |  |  |  |  |  |  |
| Rastreo del lado del cliente |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Señales de frustración | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Compatible sólo parcialmente con todos los dispositivos **móviles** y **Roku** |

## Endpoints compatibles para dominios de SDK

El tráfico de todos los SDK de Datadog se transmite a través de SSL (443 por defecto) a los siguientes dominios:

| Sitio | URL del sitio                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |

## Explorar RUM de Datadog

Accede a RUM yendo a [**Experiencia digital > Resumen del rendimiento**][1].

Selecciona una aplicación en la barra de navegación superior o sigue las instrucciones de configuración de [navegador][15] o [móvil][16] para añadir tu primera aplicación.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Selecciona una aplicación RUM" >}}

**Consejo**: Para abrir RUM a partir de la búsqueda global de Datadog, pulsa <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busca `real user monitoring`.

## Resumen de la monitorización del rendimiento

| Resumen del rendimiento del navegador | Resumen del rendimiento de los móviles |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Página de resumen de la Monitorización de rendimiento de RUM para una aplicación de navegador" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Página de resumen de la Monitorización de rendimiento de RUM para una aplicación móvil" >}} | 

La página [Resumen de monitorización del rendimiento de RUM][1] proporciona información relevante y procesable para aplicaciones web y móviles. Obtén una experiencia personalizada para cada plataforma que te ayudará a:

- **Centrarte en datos clave** por plataforma, como la latencia de la interfaz de usuario para fallos web o móviles.
- **Monitorizar el estado de las aplicaciones** a través de KPIs conocidos, como Core Web Vitals para aplicaciones web o la tasa de cuelgues para iOS, para evaluar la fiabilidad de las aplicaciones.
- **Analizar en detalle las investigaciones directamente** desde los widgets interactivos sin salir de la página

Para **aplicaciones web**, utiliza la barra de búsqueda para filtrar los datos, identificar las páginas lentas y seguir la interfaz de usuario hasta la página [RUM Optimization Inspect][17].

Para **aplicaciones móviles**, revisa los fallos recientes en la parte inferior de la página y utiliza el panel lateral [Error Tracking][6] para solucionar problemas.

### Dashboards predefinidos

Analiza la información sobre tus sesiones de usuario, rendimiento, aplicaciones móviles, señales de frustración, recursos de red y errores recopilados automáticamente utilizando [dashboards de RUM predefinidos][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Dashboard de RUM" >}}

### Explorador de RUM y visualizaciones

Consulta sesiones de usuario en segmentos, como por ejemplo para verificar cuándo afecta la latencia a tus clientes prémium, utilizando [visualizaciones][3]. Explora datos, guarda vistas y crea [monitores][4] en tus búsquedas personalizadas.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="Análisis de RUM" video=true >}}

### Integración con logs, APM y generador de perfiles

Consulta tus [trazas (traces) de back-end, logs y métricas de infraestructura][5] hasta llegar a la línea de código exacta que afecta al rendimiento de la aplicación, que se corresponde con las experiencias del usuario y los problemas notificados.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM y APM" >}}

### Seguimiento de errores e informes de fallos

Obtén alertas automatizadas sobre outliers y grupos de errores, tiempos de espera y fallos para reducir significativamente tu MTTR utilizando el [seguimiento de errores][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Seguimiento de errores de RUM" video=true >}}

### Indicadores fundamentales web y móviles

Consulta las puntuaciones de rendimiento y la telemetría de [aplicaciones de navegador][7] como Core Web Vitals y Mobile Vitals para [iOS y tvOS][8] o [aplicaciones de Android y Android TV][9].

### Seguimiento de vistas web

Recopila información de tus aplicaciones web nativas y explora vistas híbridas haciendo un seguimiento de vistas web para [iOS y tvOS][10] o [Android y Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Vistas web capturadas en una sesión de usuario en el Explorador de RUM" >}}

## Explorar Datadog Session Replay

### Reproducciones de sesiones

Ve [grabaciones de navegador][12] de usuarios reales que interactúan con tu sitio web y define [controles de privacidad][13] para tu organización.

### Herramientas de desarrollador

Accede a información sobre logs activados, errores y rendimiento cuando soluciones problemas de aplicaciones con [herramientas de desarrollador de navegador[14].


## Permisos

Por defecto, todos los usuarios pueden cambiar la configuración RUM de una aplicación.

Utiliza controles de acceso granulares para limitar los [roles][18] que pueden editar la configuración RUM de una aplicación en particular:
1. Mientras visualizas la configuración RUM de una aplicación, haz clic en el botón **Edit application** (Editar aplicación) situado en la parte superior de la pantalla. Aparece un menú desplegable.
1. Selecciona **Manage App Permissions** (Gestionar permisos de aplicaciones).
1. Haz clic en **Restrict Access** (Restringir el acceso).
1. El cuadro de diálogo se actualiza para mostrar que los miembros de tu organización tienen por omisión el permiso de acceso **Viewer** (Visualización).
1. Utiliza el menú desplegable para seleccionar uno o varios roles, equipos o usuarios que pueden modificar el notebook.
1. Haz clic en **Add** (Añadir).
1. El cuadro de diálogo se actualiza para indicar que el rol que has seleccionado tiene el permiso **Editor** (Edición).
1. Haz clic en **Save** (Guardar).

**Nota:** Para mantener tu acceso de edición a la aplicación, el sistema requiere que incluyas al menos un rol del que seas miembro antes de guardar.

Debes tener acceso de edición para restaurar el acceso general a una aplicación restringida. Realiza los pasos siguientes:
1. Mientras visualizas la configuración RUM de una aplicación, haz clic en el botón **Edit application** (Editar aplicación) situado en la parte superior de la pantalla. Aparece un menú desplegable.
1. Selecciona **Manage App Permissions** (Gestionar permisos de aplicaciones).
1. Haz clic en **Restore Full Access** (Restablecer acceso completo).
1. Haz clic en **Save** (Guardar).


## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /es/real_user_monitoring/platform/dashboards/
[3]: /es/real_user_monitoring/explorer/visualize/
[4]: /es/monitors/types/real_user_monitoring/
[5]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /es/real_user_monitoring/error_tracking/
[7]: /es/real_user_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /es/real_user_monitoring/ios/mobile_vitals/
[9]: /es/real_user_monitoring/android/mobile_vitals/
[10]: /es/real_user_monitoring/ios/web_view_tracking/
[11]: /es/real_user_monitoring/android/web_view_tracking/
[12]: /es/real_user_monitoring/session_replay/browser/
[13]: /es/real_user_monitoring/session_replay/browser/privacy_options/
[14]: /es/real_user_monitoring/session_replay/browser/developer_tools/
[15]: /es/real_user_monitoring/browser/setup/
[16]: /es/real_user_monitoring/mobile_and_tv_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /es/account_management/rbac/