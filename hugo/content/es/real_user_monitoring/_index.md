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
- link: /real_user_monitoring/application_monitoring/browser/data_collected/
  tag: Documentación
  text: Datos de RUM del navegador recopilados
- link: https://dtdg.co/fe
  tag: Habilitación de la fundación
  text: Únete a una sesión interactiva para obtener información a través de RUM
- link: https://www.datadoghq.com/blog/real-user-monitoring-with-datadog/
  tag: Blog
  text: Presentando Real User Monitoring de Datadog
- link: https://www.datadoghq.com/blog/datadog-mobile-rum/
  tag: Blog
  text: Mejora la experiencia del usuario móvil con Datadog Mobile Real User Monitoring
- link: https://www.datadoghq.com/blog/mobile-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para monitorear el rendimiento de aplicaciones móviles
- link: https://www.datadoghq.com/blog/error-tracking/
  tag: Blog
  text: Comprende los problemas de la aplicación con Datadog Error Tracking
- link: https://www.datadoghq.com/blog/unify-apm-rum-datadog/
  tag: Blog
  text: Unifica los datos de APM y RUM para una visibilidad de pila completa
- link: https://www.datadoghq.com/blog/datadog-geomaps/
  tag: Blog
  text: Utiliza geomapas para visualizar los datos de tu aplicación por ubicación
- link: https://www.datadoghq.com/blog/datadog-rum-react-components/#tune-up-your-react-data-collection
  tag: Blog
  text: Obtén mejores datos de RUM con nuestros componentes personalizados de React
- link: https://www.datadoghq.com/blog/hybrid-app-monitoring/
  tag: Blog
  text: Monitorea tus aplicaciones móviles híbridas con Datadog
- link: https://www.datadoghq.com/blog/how-datadogs-tech-solutions-team-rum-session-replay/
  tag: Blog
  text: Cómo el equipo de Soluciones Técnicas de Datadog utiliza RUM, Session Replay
    y Error Tracking para resolver problemas de clientes
- link: https://www.datadoghq.com/blog/static-web-application-monitoring-best-practices/
  tag: Blog
  text: Mejores prácticas para monitorear aplicaciones web estáticas
- link: https://www.datadoghq.com/blog/progressive-web-application-monitoring/
  tag: Blog
  text: Mejores prácticas para monitorear aplicaciones web progresivas
- link: https://www.datadoghq.com/blog/datadog-executive-dashboards
  tag: Blog
  text: Diseña tableros ejecutivos efectivos con Datadog
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: Conectando equipos de frontend a través de un
    contexto compartido'
- link: https://app.datadoghq.com/release-notes?category=Real%20User%20Monitoring
  tag: Notas de la versión
  text: ¡Consulta las últimas versiones de Datadog RUM! (Se requiere inicio de sesión
    en la aplicación)
- link: https://learn.datadoghq.com/courses/intro-to-rum
  tag: Centro de Aprendizaje
  text: Introducción a Real User Monitoring (RUM)
title: RUM y Session Replay
---
{{< learning-center-callout header="Únete a una sesión de seminario web de habilitación" hide_image="true" btn_title="Regístrate" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=RUM">}}
  Descubre cómo crear acciones de usuario personalizadas adaptadas a necesidades comerciales específicas, lo que permite un seguimiento preciso del comportamiento del usuario.
{{< /learning-center-callout >}}

## ¿Qué es RUM? {#what-is-real-user-monitoring}

{{< img src="real_user_monitoring/performance-summary-browser.png" alt="Tablero de RUM" >}}

*Real User Monitoring (RUM)* de Datadog te brinda visibilidad de extremo a extremo sobre la actividad y experiencia en tiempo real de usuarios individuales. RUM resuelve cuatro tipos de casos de uso para la monitorización de aplicaciones web y móviles:

* **Rendimiento**: Realiza un seguimiento del rendimiento de las páginas web, pantallas de aplicaciones móviles, acciones de usuario, solicitudes de red y tu código frontend.
* **Gestión de Errores**: Monitorea los errores y problemas en curso y haz un seguimiento de ellos a lo largo del tiempo y las versiones.
* **Analítica / Uso**: Comprende quién está utilizando tu aplicación (país, dispositivo, SO), monitorea los recorridos de usuarios individuales y analiza cómo los usuarios interactúan con tu aplicación (página más visitada, clics, interacciones y uso de funciones).
* **Soporte**: Recupera toda la información relacionada con una sesión de usuario para solucionar un problema (duración de la sesión, páginas visitadas, interacciones, recursos cargados y errores).

### Definición de sesión {#session-definition}

Una sesión de usuario es un recorrido de usuario en tu aplicación web o móvil. Una sesión incluye todos los eventos de navegación relacionados (Vistas RUM), acciones de usuario (Acciones RUM), solicitudes de red (Recursos RUM), fallos y errores (Errores RUM), y otros eventos y señales que producen colectivamente una representación fiel de la experiencia del usuario.

Una sesión RUM puede durar hasta 4 horas y expira después de 15 minutos de inactividad. Si el usuario interactúa con la aplicación después de cualquiera de los límites, una nueva sesión comienza automáticamente.

### Limitaciones técnicas {#technical-limitations}

| Propiedad                                   | Limitación               |
| ------------------------------------------ | ------------------------ |
| Duración máxima de una sesión              | 4 horas                  |
| Tiempo de espera de una sesión             | 15 minutos de inactividad |
| Número máximo de eventos por sesión        | 10 millones              |
| Número máximo de atributos por evento      | 1,000                    |
| Profundidad máxima de atributos por evento  | 20                       |
| Tamaño máximo de evento                     | 1 MB                     |
| Tamaño máximo de carga útil de entrada      | 5 MB                     |
| Tamaño máximo de mapas del código fuente y archivos de mapeo | 500 MB por archivo      |
| Tamaño máximo de archivos dSYM              | 2 GB por archivo          |
| Retraso máximo en la ingestión             | 24 horas                 |

Si un evento supera cualquiera de las limitaciones técnicas mencionadas anteriormente, es rechazado por el sistema de ingestión de Datadog.

## ¿Qué es Session Replay? {#what-is-session-replay}

El *Session Replay* de Datadog te permite capturar y reproducir visualmente la experiencia de navegación web de tus usuarios.

Combinado con los datos de rendimiento de RUM, Session Replay es beneficioso para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso y fallas de diseño en tu aplicación web.

## Comenzar {#get-started}

Seleccione un tipo de aplicación para comenzar a recopilar datos de RUM:

{{< card-grid card_width="210" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/" src="integrations_logos/javascript_large.svg" alt="browser" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup" src="integrations_logos/react-native_large.svg" alt="react native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup" src="integrations_logos/kotlin-multiplatform_large.svg" alt="Kotlin Multiplatform" >}}
{{< /card-grid >}}

</br>

### Capacidades y soporte de plataforma {#capabilities-and-platform-support}

**Nota**: El SDK de Datadog Flutter no es compatible con MacOS, Windows o Linux.

La siguiente tabla muestra qué capacidades de RUM son compatibles en cada plataforma:

| Característica                               | Navegador | Android | iOS |   Flutter   | React Native | Roku | KMP | Unity |  Notas |
| ------------------------------------- | --------|---------|---------|---------|--------------|------|-----|-------|--------|
| Enviar registros a Datadog  | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  |
| Trazado distribuido de solicitudes de red | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - **Roku** solo puede rastrear algunos tipos de solicitudes HTTP.<br> - **Unity** utiliza un envoltorio alrededor de `UnityWebRequest` para realizar el rastreo de solicitudes. |
| Rastrear Visualizaciones y Acciones (RUM) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | - Todas las acciones rastreadas en **Flutter Web** se registran como `custom`. <br> - **Roku** y **Unity** solo admiten el rastreo manual de acciones. |
| Seguimiento de Feature Flags y lanzamientos | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Seguimiento de errores y mapa del código fuente | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | Solo parcialmente compatible con **React Native**. |
| Rastrear fallos, simbolización y desofuscación | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} |  |
| Detener sesiones (Monitoreo de Kiosco) | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}}  |  |
| Rastrear eventos en WebViews |  | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Monitorear métricas específicas de la plataforma | {{< X >}} | {{< X >}}  | {{< X >}}  | {{< X >}} | {{< X >}} |  | {{< X >}} |  |  |
| Seguimiento global de contexto/atributos en los registros | {{< X >}} | {{< X >}}  | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} | {{< X >}} |  |
| Trazado del lado del cliente |  | {{< X >}} |  {{< X >}}|  |  |  |  |  |  |  |
| Session Replay | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | {{< X >}} |  | **Flutter** Session Replay está en vista previa. |
| Señales de frustración | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} | {{< X >}} |  | Solo parcialmente compatible con todos los dispositivos **móviles** y **Roku**. |

## Puntos de conexión compatibles para dominios de SDK {#supported-endpoints-for-sdk-domains}

Todo el tráfico de los SDK de Datadog se transmite a través de SSL (puerto 443 por defecto) a los siguientes dominios:

| Sitio | URL del sitio                                      |
|------|-----------------------------------------------|
| US1  | `https://browser-intake-datadoghq.com`        |
| US3  | `https://browser-intake-us3-datadoghq.com`    |
| US5  | `https://browser-intake-us5-datadoghq.com`    |
| EU1  | `https://browser-intake-datadoghq.eu`         |
| US1-FED  | `https://browser-intake-ddog-gov.com`     |
| US2-FED  | `https://browser-intake-us2-ddog-gov.com` |
| AP1  | `https://browser-intake-ap1-datadoghq.com`    |
| AP2  | `https://browser-intake-ap2-datadoghq.com`    |

## Explorar Datadog RUM {#explore-datadog-rum}

Acceda a RUM navegando a [**Experiencia Digital > Resumen de Rendimiento**][1].

Seleccione una aplicación desde la navegación superior, o siga las instrucciones de configuración para [browser][15] o [mobile][16] para agregar su primera aplicación.

{{< img src="real_user_monitoring/rum-performance-application-selector.png" alt="Seleccione una aplicación RUM" >}}

**Consejo**: Para abrir RUM desde la búsqueda global de Datadog, presione <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> y busque `real user monitoring`.

## Resumen de seguimiento de rendimiento {#performance-monitoring-summary}

| Resumen de seguimiento de rendimiento del navegador | Resumen de seguimiento de rendimiento móvil |
|---------|---------|
| {{< img src="real_user_monitoring/performance-summary-browser.png" alt="Página de resumen de seguimiento de rendimiento RUM para una aplicación de navegador" >}} | {{< img src="real_user_monitoring/performance-summary-mobile-2.png" alt="Página de resumen de seguimiento de rendimiento RUM para una aplicación móvil" >}} | 

La página de [Resumen de Seguimiento de Rendimiento RUM][1] proporciona información relevante y procesable para aplicaciones web y móviles. Usted tiene una experiencia personalizada para cada plataforma que le ayuda a:

- **Concéntrese en puntos de datos clave** por plataforma, como la latencia de la UI para web o fallos en móviles.
- **Monitoree la salud de la aplicación** a través de KPIs familiares, como Core Web Vitals para aplicaciones web o tasa de cuelgues para iOS, para evaluar la confiabilidad de la aplicación.
- **Profundice en las investigaciones directamente** desde widgets interactivos sin salir de la página.

Para **aplicaciones web**, use la barra de búsqueda para filtrar datos, identificar páginas lentas y seguir la UI hasta la página de [RUM Optimization Inspect][17].

Para **aplicaciones móviles**, Revise los fallos recientes en la parte inferior de la página y use el panel lateral de [Error Tracking][6] para solucionar problemas.

### Tableros listos para usar {#out-of-the-box-dashboards}

Analiza información sobre las sesiones de usuario, rendimiento, aplicaciones móviles, señales de frustración, recursos de red y errores recopilados automáticamente con [tableros RUM listos para usar][2].

{{< img src="real_user_monitoring/rum-out-of-the-box-dashboard.png" alt="Tablero RUM" >}}

### Explorador RUM y visualizaciones {#rum-explorer-and-visualizations}

Visualice las sesiones de usuario en segmentos, como verificar cuándo la latencia impacta a sus clientes premium, con [visualizations][3]. Explore datos, guarde vistas y cree [monitors][4] en sus búsquedas personalizadas.

{{< img src="real_user_monitoring/explorer/analytics/rum_analytics.mp4" alt="Analítica RUM" video=true >}}

### Integración con registros, APM y perfilador {#integration-with-logs-apm-and-profiler}

Visualice sus [trazas de backend, registros y métricas de infraestructura][5] hasta la línea exacta de código que impacta el rendimiento de su aplicación, correspondiente a las experiencias de usuario y problemas reportados.

{{< img src="real_user_monitoring/connect_rum_and_traces/rum_apm_logs-2.png" alt="RUM y APM" >}}

### Seguimiento de errores e informes de fallos {#error-tracking-and-crash-reporting}

Reciba alertas automáticas sobre valores anómalos y grupos de errores, tiempos de espera y fallos para reducir significativamente su MTTR con [Error Tracking][6].

{{< img src="real_user_monitoring/error_tracking/errors_rum.mp4" alt="RUM Error Tracking" video=true >}}

### Vitales web y móviles {#web-and-mobile-vitals}

Visualice puntajes de rendimiento y telemetría para [aplicaciones de navegador][7] como Core Web Vitals y Mobile Vitals para [iOS y tvOS][8] o [aplicaciones de Android y Android TV][9].

### Seguimiento de visualización web{#web-view-tracking}

Recopile información de sus aplicaciones web nativas y explore vistas híbridas con seguimiento de visualización web para [iOS y tvOS][10] o [Android y Android TV][11].

{{< img src="real_user_monitoring/webview_tracking/webview_tracking_light.png" alt="Visualizaciones web capturadas en una sesión de usuario en el Explorador RUM" >}}

## Explore la reproducción de sesión de Datadog{#explore-datadog-session-replay}

### Reproducciones de sesión{#session-replays}

Mire [grabaciones de navegador][12] de usuarios reales interactuando con su sitio web y establezca [controles de privacidad][13] para su organización.

### Herramientas para desarrolladores{#developer-tools}

Acceda a los registros, errores e información de rendimiento al solucionar problemas de la aplicación utilizando [Browser Dev Tools][14].


## Permisos {#permissions}

Por defecto, todos los usuarios pueden cambiar la configuración de RUM de una aplicación.

Utilice controles de acceso granulares para limitar los [roles][18] que pueden editar la configuración de RUM de una aplicación en particular:
1. Mientras visualiza la configuración de RUM de una aplicación, haga clic en el botón **Editar aplicación** en la parte superior de la pantalla. Aparece un menú desplegable.
1. Seleccione **Administrar permisos de la aplicación**.
1. Haga clic en **Restringir acceso**.
1. El cuadro de diálogo se actualiza para mostrar que los miembros de su organización tienen **[Viewer]** acceso por defecto.
1. Utilice el menú desplegable para seleccionar uno o más roles, equipos o usuarios que pueden editar el notebook.
1. Haga clic en **Agregar**.
1. El cuadro de diálogo se actualiza para mostrar que el rol que seleccionó tiene el permiso de **Editor**.
1. Haga clic en **Guardar**.

**Nota:** Para mantener su acceso de edición a la aplicación, el sistema requiere que incluya al menos un rol del cual sea miembro antes de guardar.

Debe tener acceso de edición para restaurar el acceso general a una aplicación restringida. Complete los siguientes pasos:
1. Mientras visualiza la configuración de RUM de una aplicación, haga clic en el botón **Editar aplicación** en la parte superior de la pantalla. Aparece un menú desplegable.
1. Seleccione **Administrar permisos de la aplicación**.
1. Haga clic en **Restaurar acceso completo**.
1. Haga clic en **Guardar**.


## Lectura adicional{#further-reading}

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
[13]: /es/session_replay/browser/privacy_options/
[14]: /es/session_replay/browser/dev_tools/
[15]: /es/real_user_monitoring/application_monitoring/browser/setup/
[16]: /es/real_user_monitoring/application_monitoring/
[17]: https://app.datadoghq.com/rum/optimization/inspect
[18]: /es/account_management/rbac/