---
cascade:
  algolia:
    category: Guía
    rank: 20
    subcategory: Guías de RUM y Session Replay
description: Guías completas para la implementación, optimización y mejores prácticas
  de RUM y Session Replay para aplicaciones web y móviles.
disable_toc: true
private: true
title: Guías de Real User Monitoring y Session Replay
---

{{< whatsnext desc="Generalidades de RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/understanding-the-rum-event-hierarchy" >}}Entender la jerarquía de eventos de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/compute-apdex-with-rum-data" >}}Calcular puntuaciones Apdex e indicadores de rendimiento personalizados utilizando datos de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/alerting-with-rum" >}}Crear alertas utilizando datos de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-your-rum-usage" >}}Monitorizar tu uso de RUM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/track-rum-usage-with-attribution-tags" >}}Realizar un seguimiento del uso de RUM con etiquetas (tags) de atribución de uso{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/remotely-configure-rum-using-launchdarkly" >}}Configurar RUM de forma remota utilizando LaunchDarkly{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-rum-deployment-tracking" >}}Empezando con el Seguimiento de despliegues en RUM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/getting-started-feature-flags" >}}Empezando con el Seguimiento de indicadores de funciones{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-kiosk-sessions-using-rum" >}}Monitorizar sesiones de quiosco utilizando RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-for-rum-sampling" >}}Prácticas recomendadas para el muestreo RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/debug-symbols" >}}Investigar trazas (traces) de stack tecnológico ofuscadas con símbolos de depuración de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/retention_filter_best_practices" >}}Prácticas recomendadas para los filtros de retención{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/best-practices-tracing-native-ios-android-apps" >}}Prácticas recomendadas para el rastreo de aplicaciones iOS y Android nativas{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Browser RUM:" >}}
    {{< nextlink href="real_user_monitoring/guide/send-custom-user-actions" >}}Enviar acciones de usuario personalizadas{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/identify-bots-in-the-ui" >}}Identificar bots en el RUM Explorer{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/upload-javascript-source-maps" >}}Cargar mapas fuente de JavaScript {{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/sampling-browser-plans" >}}Controlar el volumen de la sesión utilizando la configuración de muestreo para RUM del navegador y RUM y Session Replay del navegador{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/enrich-and-control-rum-data" >}}Mejorar y controlar los datos de RUM de navegador{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/browser-sdk-upgrade" >}}Actualizar el SDK de RUM del navegador{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-rum-data" >}}Hacer proxy los datos RUM de tu navegador{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/devtools-tips" >}}Consejos para utilizar las herramientas de desarrollo del navegador{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/define-servicios-and-track-ui-components-in-your-browser-application/" >}}Definir servicios y realizar un seguimiento de los componentes de la interfaz de usuario en tu aplicación de navegador {{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-shopify-store/" >}}Habilitar RUM en tu tienda Shopify{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-squarespace-store/" >}}Activar RUM en tu tienda Squarespace{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/enable-rum-woocommerce-store/" >}}Activar RUM en tu tienda WordPress + WooCommerce{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-your-nextjs-app-with-rum/" >}}Monitorizar tu aplicación Next.js con RUM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-electron-applications-using-browser-sdk/" >}}Monitorizar aplicaciones Electron con el SDK del navegador{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/monitor-capacitor-applications-using-browser-sdk/" >}}Monitorizar aplicaciones de Capacitor con el SDK del navegador{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="RUM móvil:" >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-deprecation-policy" >}}Política de obsolescencia de los SDK móviles de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-upgrade" >}}Actualizar los SDK móviles de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/mobile-sdk-multi-instance" >}}Utilizar varias instancias de SDK móviles de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/proxy-mobile-rum-data" >}}Aplicar proxies a tus datos móviles de RUM{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/initialize-your-native-sdk-before-react-native-starts" >}}Inicializar tu SDK nativo antes de que se inicie React Native{{< /nextlink >}}
    {{< nextlink href="real_user_monitoring/guide/monitor-hybrid-react-native-applications" >}}Monitorizar aplicaciones React Native híbridas{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Session Replay:" >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-service-worker" >}}Permitir workers de servicios de terceros en Session Replay{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/session-replay-for-solutions" >}}Utilizar Session Replay en tus flujos de trabajo de asistencia{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/shadow-dom" >}}Enriquecer tus Session Replays con componentes de Shadow DOM{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/connect-session-replay-to-your-third-party-tools" >}}Conectar Session Replay con tus herramientas de terceros{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/using-session-replay-as-a-key-tool-in-post-mortems" >}}Uso de Session Replay como herramienta clave en los análisis retrospectivos{{< /nextlink >}}
    {{< nextlink href="/synthetics/guide/rum-to-synthetics" >}}Generar tests de navegador Synthetic a partir de Session Replay{{< /nextlink >}}
    {{< nextlink href="/real_user_monitoring/guide/investigate-zendesk-tickets-with-session-replay" >}}Investigar tickets de Zendesk con Session Replay{{< /nextlink >}}
{{< /whatsnext >}}