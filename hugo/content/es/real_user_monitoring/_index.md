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
description: Visualice, observe y analice el rendimiento de sus aplicaciones front-end
  tal como lo ven sus usuarios.
disable_sidebar: true
further_reading:
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos de navegador de RUM recopilados
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Únase a una sesión interactiva para obtener información a través de Real User
    Monitoring (RUM)
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de aprendizaje
  text: Introducción a Real User Monitoring (RUM)
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenda las sesiones de Session Replay más rápido con resúmenes de IA y
    capítulos inteligentes
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Presentación de Datadog Real User Monitoring (RUM)
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Mejore la experiencia del usuario móvil con Datadog Mobile Real User Monitoring
    (RUM)
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para el seguimiento del rendimiento de aplicaciones móviles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Entienda los problemas de las aplicaciones con Datadog Error Tracking
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifique los datos de APM y RUM para obtener visibilidad full-stack
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utilice mapas geográficos para visualizar los datos de su aplicación por ubicación
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: Blog
  text: Obtenga mejores datos de RUM con nuestros componentes personalizados de React
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: Blog
  text: Haga un seguimiento de sus aplicaciones móviles híbridas con Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Cómo el equipo de Soluciones Técnicas de Datadog utiliza RUM, Session Replay
    y Error Tracking para resolver problemas de los clientes
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para el seguimiento de aplicaciones web estáticas
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: Blog
  text: Mejores prácticas para el seguimiento de aplicaciones web progresivas
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseñe dashboards ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: conectando a los equipos de frontend a través
    de un contexto compartido.'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notas de la versión
  text: ¡Eche un vistazo a los últimos lanzamientos de Datadog RUM! (Se requiere inicio
    de sesión en la aplicación).
title: RUM y Session Replay
---
{{< learning-center-callout header="Únase a una sesión de seminario web de habilitación" hide_image="true" btn_title="Registrarse" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Descubra cómo crear acciones de usuario personalizadas adaptadas a necesidades comerciales específicas, lo que permite un seguimiento preciso del comportamiento del usuario.
{{< /learning-center-callout >}}

## ¿Qué es Real User Monitoring? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="RUM Dashboard" >}}

*Real User Monitoring (RUM)* de Datadog le brinda visibilidad de extremo a extremo sobre la actividad y la experiencia en tiempo real de los usuarios individuales. RUM resuelve cuatro tipos de casos de uso para el seguimiento de aplicaciones web y móviles:

* **Rendimiento**: Realice un seguimiento del rendimiento de páginas web, pantallas de aplicaciones móviles, acciones de usuario, solicitudes de red y su código frontend.
* **Gestión de errores**: Haga un seguimiento de los errores y problemas en curso, y realice un seguimiento de ellos a lo largo del tiempo y las versiones.
* **Análisis / Uso**Comprenda quién está utilizando su aplicación (país, dispositivo, sistema operativo), haga un seguimiento de los recorridos individuales de los usuarios y analice cómo interactúan los usuarios con su aplicación (página más visitada, clics, interacciones y uso de funciones).
* **Soporte**: Recupere toda la información relacionada con una sesión de usuario para solucionar un problema (duración de la sesión, páginas visitadas, interacciones, recursos cargados y errores).

### Definición de sesión {#session-definition}

Una sesión de usuario es el recorrido de un usuario en su aplicación web o móvil. Una sesión incluye todos los eventos de navegación relacionados (RUM Views), acciones de usuario (RUM Actions), solicitudes de red (RUM Resources), bloqueos y errores (RUM Errors), y otros eventos y señales que colectivamente producen una representación fiel de la experiencia del usuario.

Una sesión de RUM puede durar hasta 4 horas y expira después de 15 minutos de inactividad. Si el usuario interactúa con la aplicación después de cualquiera de los dos límites, se inicia una nueva sesión automáticamente.

### Limitaciones técnicas {#technical-limitations}

| Propiedad                                   | Limitación               |
| ------------------------------------------ | ------------------------ |
| Duración máxima de una sesión              | 4 horas                  |
| Tiempo de espera de una sesión                       | 15 minutos de inactividad |
| Número máximo de eventos por sesión       | 10 millones              |
| Número máximo de atributos por evento     | 1,000                    |
| Profundidad máxima de atributos por evento          | 20                       |
| Tamaño máximo de evento                         | 1 MB                     |
| Tamaño máximo de carga útil de ingesta                | 5 MB                     |
| Tamaño máximo de mapas de origen y archivos de mapeo | 500 MB por archivo          |
| Tamaño máximo de archivos dSYM                    | 2 GB por archivo            |
| Retraso máximo en la ingesta                 | 24 horas                 |

Si un evento supera cualquiera de las limitaciones técnicas enumeradas anteriormente, es rechazado por la ingesta de Datadog.

## ¿Qué es Session Replay? {#what-is-session-replay}

*Session Replay* de Datadog le permite capturar y reproducir visualmente la experiencia de navegación web de sus usuarios.

Combinado con los datos de rendimiento de RUM, Session Replay es beneficioso para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso y las deficiencias en el diseño de su aplicación web.

## Comience {#get-started}

Seleccione un tipo de aplicación para comenzar a recopilar datos de RUM:

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/" src="integrations_logos/javascript_large.svg" alt="Navegador" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="Android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/ios_large.svg" alt="iOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup" src="integrations_logos/react-native_large.svg" alt="React Native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup" src="integrations_logos/flutter_large.svg" alt="Flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="Android TV" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/tv_os_large.svg" alt="tvOS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
{{< /card-grid >}}

### Capacidades y soporte de plataforma {#capabilities-and-platform-support}

**Nota**: El SDK de Datadog para Flutter no es compatible con MacOS, Windows o Linux.

La siguiente tabla muestra qué capacidades de RUM son compatibles en cada plataforma:

| Feature                               | Browser | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  Notes |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Enviar registros a Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Rastreo distribuido de solicitudes de red | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** solo puede rastrear algunos tipos de solicitudes HTTP.<br> - **Unity** utiliza un contenedor alrededor de `UnityWebRequest` para realizar el rastreo de solicitudes. |
| Track Views and Actions (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - Todas las acciones rastreadas en **Flutter Web** se registran como `custom`. <br> - **Roku** y **Unity** solo admiten el seguimiento manual de acciones. |
| Feature Flags tracking and release tracking | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Error Tracking and source mapping | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Crash tracking, symbolication, and deobfuscation | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| Stop sessions (Kiosk Monitoring) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| Track Events in WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Monitor platform-specific vitals | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Global context/attribute tracking in Logs  | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Client side tracing |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay is in Preview. |
| Frustration signals | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | Only partially supported for all **mobile** and **Roku** devices. |

## Supported endpoints for SDK domains {#supported-endpoints-for-sdk-domains}

Todo el tráfico de los SDK de Datadog se transmite a través de SSL (443 por defecto) a los siguientes dominios:

| Site | Site URL |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |
| UK1  | `https://browser-intake-uk1-datadoghq.com`    |

### Additional endpoints for Browser Profiling {#additional-endpoints-for-browser-profiling}

Cuando [Browser Profiling][19] está habilitado, el SDK también contacta a una API de cuota para determinar si el perfilado está permitido para la sesión actual. Esto utiliza un `quota.` subdominio del origen de ingesta estándar:

| Site | Quota API URL |
|------|-----------------------------------------------------------|
| US1  | `https://quota.browser-intake-datadoghq.com`             |
| US3  | `https://quota.browser-intake-us3-datadoghq.com`         |
| US5  | `https://quota.browser-intake-us5-datadoghq.com`         |
| EU1  | `https://quota.browser-intake-datadoghq.eu`              |
| US1-FED  | `https://quota.browser-intake-ddog-gov.com`          |
| US2-FED  | `https://quota.browser-intake-us2-ddog-gov.com`      |
| AP1  | `https://quota.browser-intake-ap1-datadoghq.com`         |
| AP2  | `https://quota.browser-intake-ap2-datadoghq.com`         |
| UK1  | `https://quota.browser-intake-uk1-datadoghq.com`         |

Si utiliza un [proxy][20] o tiene una [Política de Seguridad de Contenido (CSP)][21], asegúrese de que estos dominios `quota.` también estén permitidos. Consulte la página [Browser Profiling setup][19] para obtener más detalles.

## Explore Datadog RUM {#explore-datadog-rum}

Acceda a RUM navegando a [{{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Performance Summary{{< /ui >}}][1].

Seleccione una aplicación en la navegación superior o siga las instrucciones de configuración para [browser][15] o [mobile][16] para agregar su primera aplicación.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Seleccione una aplicación RUM" >}}

**Consejo**: Para abrir RUM desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `real user monitoring`.

## Resumen de monitoreo de rendimiento {#performance-monitoring-summary}

| Resumen de rendimiento del navegador | Resumen de rendimiento móvil |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Página de resumen de monitoreo de rendimiento de RUM para una aplicación de navegador" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Página de resumen de monitoreo de rendimiento de RUM para una aplicación móvil" >}} | 

La página [Resumen de monitoreo de rendimiento de RUM][1] proporciona información relevante y procesable tanto para aplicaciones web como móviles. Tiene una experiencia personalizada para cada plataforma que le ayuda a:

- **Céntrese en los puntos de datos clave** por plataforma, como la latencia de la interfaz de usuario para web o los bloqueos móviles
- **Monitoree el estado de la aplicación** a través de KPI conocidos, como Core Web Vitals para aplicaciones web o la tasa de bloqueos para iOS, para evaluar la confiabilidad de la aplicación
- **Profundice en las investigaciones directamente** desde widgets interactivos sin salir de la página

Para **aplicaciones web**, utilice la barra de búsqueda para filtrar datos, identificar páginas lentas y seguir la interfaz de usuario hasta la página [RUM Optimization Inspect][17].

Para **aplicaciones móviles**, revise los bloqueos recientes en la parte inferior de la página y utilice el panel lateral [Error Tracking][6] para la resolución de problemas.

### Tableros preconfigurados {#out-of-the-box-dashboards}

Analice información sobre sus sesiones de usuario, rendimiento, aplicaciones móviles, señales de frustración, recursos de red y errores recopilados automáticamente con [tableros de RUM preconfigurados][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Tablero de RUM" >}}

### Explorador de RUM y visualizaciones {#rum-explorer-and-visualizations}

Vea las sesiones de usuario en segmentos, como verificar cuándo la latencia afecta a sus clientes premium, con [visualizaciones][3]. Explore datos, guarde vistas y cree [monitors][4] en sus búsquedas personalizadas.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="Análisis de RUM" video=true >}}

### Integración con registros, APM y profiler {#integration-with-logs-apm-and-profiler}

Vea sus trazas de backend, registros y métricas de infraestructura hasta la línea exacta de código que afecta el rendimiento de su aplicación, correspondiente a las experiencias de los usuarios y los problemas reportados.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM y APM" >}}

### Error Tracking y reportes de fallos {#error-tracking-and-crash-reporting}

Reciba alertas automatizadas sobre valores atípicos y grupos de errores, tiempos de espera y fallos para reducir significativamente su MTTR con [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="Error Tracking de RUM" video=true >}}

### Vitals web y móviles {#web-and-mobile-vitals}

Vea las puntuaciones de rendimiento y la telemetría de [browser applications][7], como Core Web Vitals y Mobile Vitals para [iOS, iPadOS, tvOS, and visionOS][8] o [Android and Android TV applications][9].

### Seguimiento de vistas web {#web-view-tracking}

Recopile información de sus aplicaciones web nativas y explore vistas híbridas con el seguimiento de vistas web para [iOS, iPadOS, and visionOS][10] o [Android and Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Vistas web capturadas en una sesión de usuario en el RUM Explorer" >}}

## Explore Datadog Session Replay {#explore-datadog-session-replay}

### Reproducciones de sesiones {#session-replays}

Vea [browser recordings][12] de usuarios reales interactuando con su sitio web y establezca [privacy controls][13] para su organización.

### Developer Tools {#developer-tools}

Acceda a registros, errores e información de rendimiento activados al solucionar problemas de la aplicación mediante [Browser Dev Tools][14].


## Permisos {#permissions}

De forma predeterminada, todos los usuarios pueden cambiar la configuración de RUM de una aplicación.

Utilice controles de acceso granulares para limitar los [roles][18] que pueden editar la configuración de RUM de una aplicación en particular:
1. Mientras visualiza la configuración de RUM de una aplicación, haga clic en el botón {{< ui >}}Edit application{{< /ui >}} en la parte superior de la pantalla. Aparece un menú desplegable.
1. Seleccione {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restrict Access{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen acceso {{< ui >}}Viewer{{< /ui >}} de forma predeterminada.
1. Utilice el menú desplegable para seleccionar uno o más roles, equipos o usuarios que puedan editar el notebook.
1. Haga clic en {{< ui >}}Add{{< /ui >}}.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso {{< ui >}}Editor{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

**Nota:** Para mantener su acceso de edición a la aplicación, el sistema requiere que incluya al menos un rol del cual usted sea miembro antes de guardar.

Debe tener acceso de edición para restaurar el acceso general a una aplicación restringida. Complete los siguientes pasos:
1. Mientras visualiza la configuración de RUM de una aplicación, haga clic en el botón {{< ui >}}Edit application{{< /ui >}} en la parte superior de la pantalla. Aparece un menú desplegable.
1. Seleccione {{< ui >}}Manage App Permissions{{< /ui >}}.
1. Haga clic en {{< ui >}}Restore Full Access{{< /ui >}}.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.


## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/performance-monitoring
[2]: /es/real_user_monitoring/platform/dashboards/
[3]: /es/real_user_monitoring/explorer/visualize/
[4]: /es/monitors/types/real_user_monitoring/
[5]: /es/real_user_monitoring/correlate_with_other_telemetry/apm/
[6]: /es/real_user_monitoring/error_tracking/
[7]: /es/real_user_monitoring/application_monitoring/browser/monitoring_page_performance/#event-timings-and-core-web-vitals
[8]: /es/real_user_monitoring/application_monitoring/ios/mobile_vitals/
[9]: /es/real_user_monitoring/application_monitoring/android/mobile_vitals/
[10]: /es/real_user_monitoring/application_monitoring/ios/web_view_tracking/
[11]: /es/real_user_monitoring/application_monitoring/android/web_view_tracking/
[12]: /es/session_replay/browser/
[13]: /es/session_replay/privacy_options?platform=browser
[14]: /es/session_replay/dev_tools
[15]: /es/real_user_monitoring/application_monitoring/browser/setup/
[16]: /es/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /es/account_management/rbac/
[19]: /es/real_user_monitoring/correlate_with_other_telemetry/profiling
[20]: /es/real_user_monitoring/guide/proxy-rum-data
[21]: /es/integrations/content_security_policy_logs