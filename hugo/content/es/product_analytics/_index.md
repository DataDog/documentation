---
aliases:
- /es/real_user_monitoring/product_analytics
- /es/real_user_monitoring/guide/rum-for-product-analytics
description: Product Analytics le ayuda a comprender el uso de su aplicación de un
  vistazo.
further_reading:
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Explorador de Analytics
- link: https://learn.datadoghq.com/courses/getting-started-product-analytics
  tag: Centro de aprendizaje
  text: Introducción a Product Analytics
- link: https://learn.datadoghq.com/courses/define-user-behavior-with-labeled-actions-in-product-analytics
  tag: Centro de aprendizaje
  text: Defina el comportamiento del usuario con acciones etiquetadas en Product Analytics
- link: https://www.datadoghq.com/blog/product-signal-latency-gap/
  tag: Blog
  text: La brecha de latencia de la señal del producto que ralentiza su crecimiento
- link: https://www.datadoghq.com/blog/ai-summaries-and-smart-chapters/
  tag: Blog
  text: Comprenda Session Replay más rápido con resúmenes de IA y capítulos inteligentes
- link: https://www.datadoghq.com/blog/product-data-best-practices
  tag: Blog
  text: Lo que los datos de su producto realmente dicen
- link: https://www.datadoghq.com/blog/guardrail-metrics
  tag: Blog
  text: Utilice métricas de protección y deje de supervisar manualmente sus lanzamientos
- link: https://www.datadoghq.com/blog/product-analytics-faster-decisions
  tag: Blog
  text: Tome decisiones de producto más rápidas y mejores con Datadog Product Analytics
- link: https://www.datadoghq.com/blog/rum-product-analytics-bridging-teams
  tag: Blog
  text: 'Del rendimiento al impacto: conectando a los equipos de frontend a través
    de un contexto compartido.'
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tome decisiones de diseño basadas en datos con Product Analytics
title: Product Analytics
---
{{< learning-center-callout header="Pruebe comenzar con Product Analytics en el Centro de Aprendizaje" btn_title="Inscríbase ahora" btn_url="https://learn.datadoghq.com/courses/getting-started-product-analytics">}}
  Aprenda a definir métricas digitales de producto significativas y a visualizarlas en Product Analytics con una cuenta de prueba en Datadog. ¡Regístrese gratis hoy mismo!
{{< /learning-center-callout >}}

## Descripción general {#overview}

Product Analytics le ayuda a obtener información sobre el comportamiento del usuario y a tomar decisiones basadas en datos. Admite los siguientes casos de uso en su aplicación:

- [Comprenda la adopción del producto](#understand-product-adoption)
- [Haga un seguimiento de las tasas de conversión y su evolución a lo largo del tiempo](#track-conversion-rates-and-their-evolution-over-time)
- [Haga un seguimiento de los patrones clave de comportamiento del usuario](#track-key-user-behavior-patterns)
- [Visualice las interacciones del usuario](#visualize-user-interactions)

## Instrumente su aplicación {#instrument-your-application}

Product Analytics recopila datos de actividad del usuario en el lado del cliente a través del SDK de Datadog. También puede enviar eventos del lado del servidor a través de la API para complementar sus datos del lado del cliente.

Para empezar, [agregue el SDK de Datadog](#track-client-side-events-sdk) a su aplicación y [habilite Product Analytics](#enable-product-analytics) en Datadog. También puede [enviar eventos del lado del servidor a través de la API](#track-server-side-events-api).

<div class="alert alert-info">Product Analytics utiliza los mismos SDKs y configuración que <a href="/real_user_monitoring/#what-is-real-user-monitoring">Real User Monitoring (RUM)</a>, y conserva los datos durante 15 meses por defecto. Consulte los <a href="/data_security/data_retention_periods/">períodos de retención de datos de Datadog</a> para obtener más información.</div>

### Haga un seguimiento de los eventos del lado del cliente (SDK) {#track-client-side-events-sdk}

Recopile eventos, como vistas de página o clics en botones, desde los dispositivos de sus usuarios y envíelos a Datadog.

Agregue el SDK de Datadog a su aplicación para comenzar a recopilar datos de actividad del usuario. Si ya configuró RUM, no necesita instrumentar su aplicación nuevamente para Product Analytics.

Si aún no tiene una aplicación configurada en Datadog, siga las instrucciones para su plataforma:

- [Navegador][14]
- [iOS][15]
- [Android][16]

Para configurar su aplicación con un asistente de codificación, consulte [Agentic onboarding][17].

### Haga un seguimiento de los eventos del lado del servidor (API) {#track-server-side-events-api}

Después de configurar la recopilación del lado del cliente, puede usar la [Product Analytics API][21] para enviar eventos personalizados desde su servidor, como compras finalizadas o pagos procesados. Para obtener más información, consulte [Track Server-Side Events][22].

<div class="alert alert-warning">Datadog factura los eventos del lado del servidor por separado. Consulte la <a href="https://www.datadoghq.com/pricing/?product=product-analytics#products">página de precios</a> para obtener más detalles y comuníquese con su Customer Success Manager si tiene preguntas adicionales.</div>

## Habilitar Product Analytics {#enable-product-analytics}

Para cada aplicación en la que desee hacer un seguimiento del comportamiento del usuario, habilite Product Analytics:

1. En Datadog, vaya a {{< ui >}}Digital Experience{{< /ui >}} > {{< ui >}}Real User Monitoring{{< /ui >}} > [{{< ui >}}Manage Applications{{< /ui >}}][9]. En la lista de aplicaciones en {{< ui >}}Active{{< /ui >}}, seleccione la aplicación para la cual desea hacer un seguimiento del comportamiento del usuario.
2. En {{< ui >}}PRODUCT SETTINGS{{< /ui >}}, haga clic en {{< ui >}}Product Analytics{{< /ui >}}.
3. Haga clic en el botón {{< ui >}}Enable{{< /ui >}}.

{{< img src="product_analytics/enable-product-analytics.png" alt="Habilite Product Analytics desde la página de administración de aplicaciones (Application Management).">}}

## Comprenda sus datos {#understand-your-data}
El SDK de Datadog recopila automáticamente tres niveles de datos de usuario del lado del cliente: Sesiones, Vistas y Acciones. Para obtener un desglose completo de los tipos de eventos de RUM, consulte [Understanding the RUM Event Hierarchy][19]. Después de configurar el SDK, también puede enviar eventos del lado del servidor a través de la [Product Analytics API][21].

**Sesiones**
: Una sesión es el recorrido completo de un solo usuario a través de su aplicación, desde el momento en que la abre hasta que la abandona.

**Vistas**
: Una vista representa cada página o pantalla que un usuario visita dentro de una sesión.

**Acciones**
: Una acción es algo que un usuario hace en una página, como un clic, un toque o un desplazamiento. Las acciones son recopiladas automáticamente por el SDK de RUM. Al configurar funciones como [Funnels][4] y [Segments][6], puede seleccionar acciones específicas como pasos o filtros. Para ver qué acciones están disponibles, abra el [RUM Explorer][20] y filtre por {{< ui >}}Actions{{< /ui >}}.

**Eventos del lado del servidor**
: Un evento del lado del servidor es un evento personalizado enviado a través de la [Product Analytics API][21], como una compra completada o un pago procesado. En el selector de eventos, seleccione {{< ui >}}Server Events{{< /ui >}} para contextualizar su análisis a los datos del lado del servidor.

## Navegue por la interfaz de usuario de Product Analytics {#navigate-the-product-analytics-ui}
Cada función de Product Analytics proporciona contexto sobre los recorridos de sus usuarios.

### Comprenda la adopción del producto {#understand-product-adoption}
La página [Home][3] le ofrece una vista panorámica de la actividad de sus usuarios y la adopción de su producto. Aquí es donde generalmente llega al acceder a Product Analytics.

{{< img src="/product_analytics/pana_home_page.png" alt="Comprenda las conversiones de extremo a extremo con el análisis de embudo.">}}

De forma predeterminada, esta página muestra los gráficos `active users`, `page views` y `average time spent by user`, pero puede agregar gráficos adicionales o un tablero. La página de inicio también incluye las siguientes subsecciones listas para usar que proporcionan contexto adicional sobre los usuarios y el uso de su producto:

[Usuarios](https://app.datadoghq.com/product-analytics/user-trends)
: De un vistazo, vea quién está usando su producto.

[Aplicación y dispositivos](https://app.datadoghq.com/product-analytics/app-and-devices)
: Visualice la división entre el uso de escritorio y móvil, detecte qué versiones están en uso e identifique qué se puede dejar de usar.

[Interacción](https://app.datadoghq.com/product-analytics/engagement-and-features)
: Comprenda cómo los usuarios interactúan con su producto, respondiendo preguntas como cuánto tiempo permanecen los usuarios en las páginas y cuáles son sus acciones principales. 

[Tráfico](https://app.datadoghq.com/product-analytics/traffic-and-acquisition)
: Vea las tasas de rebote, las principales fuentes de tráfico y de dónde proviene realmente su crecimiento.

[Rendimiento](https://app.datadoghq.com/product-analytics/performance)
: Visualice los errores y frustraciones más comunes, y observe exactamente a qué vistas afectan.

<br>


### Haga un seguimiento de las tasas de conversión y su evolución a lo largo del tiempo {#track-conversion-rates-and-their-evolution-over-time}
Los gráficos de Product Analytics le ayudan a visualizar los recorridos de sus usuarios a medida que utilizan su producto.

{{< img src="/product_analytics/pana_charts_video.mp4" alt="Visualice el recorrido de sus usuarios con gráficos." video="true">}}

Cada tipo de gráfico proporciona una vista diferente del recorrido del usuario:

[Pathways][5]
: Visualice todos los recorridos de los usuarios a través de su aplicación para analizar la ruta crítica.

[Funnels][4]
: Realice un seguimiento de las tasas de conversión en flujos de trabajo clave para identificar y abordar cualquier cuello de botella en los recorridos de usuario de extremo a extremo. <br> Por ejemplo, puede ver si los clientes abandonan en un punto determinado debido al bajo rendimiento del sitio web, o medir cómo la adición de nuevos pasos a un flujo de trabajo afecta la tasa de abandono.

[Retention][2]
: Mida con qué frecuencia los usuarios regresan con éxito a una página o acción para obtener información sobre la satisfacción general del usuario.

[Analytics][13]
: Agrega datos de uso para mostrar cómo interactúan los usuarios con su producto.

<br>

### Haga un seguimiento de los patrones clave de comportamiento del usuario {#track-key-user-behavior-patterns}
Utilice [Users & Segments][6] para agrupar a sus usuarios según características compartidas. Por ejemplo, si nota que los usuarios agregan artículos a su carrito pero no finalizan la compra, cree un segmento para esos usuarios y envíeles un correo electrónico de recordatorio para que completen su compra.

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="Vea perfiles individuales de usuarios y cree un segmento a partir de estos perfiles.">}}

### Visualice las interacciones de los usuarios {#visualize-user-interactions}
Utilice las siguientes funciones para fundamentar sus decisiones de cambio de producto, como cambios en la interfaz de usuario de su aplicación, observando cómo los usuarios navegan por sus páginas, si hay una ruta que siguen más que otras, o dónde las acciones y los flujos podrían ser más fluidos.

{{< img src="/product_analytics/pana_session_replay_page.png" alt="Capture y reproduzca la experiencia de navegación de sus usuarios para fundamentar sus decisiones de diseño de producto.">}}

[Session replay][11] 
: Capture y reproduzca la experiencia de navegación web o de aplicación móvil de sus usuarios.<br><br>Esto es beneficioso para la identificación, reproducción y resolución de errores, y proporciona información sobre los patrones de uso de su aplicación y los escollos de diseño.

[Mapas de calor][10]
: Visualice las interacciones de sus usuarios superpuestas en los datos de Session Replay. Product Analytics tiene tres tipos de mapas de calor: Mapas de clics, Elementos principales y Mapas de desplazamiento. <br><br> Utilice los mapas de calor para revisar datos complejos de un vistazo, obteniendo información sobre cómo optimizar su experiencia de usuario.

[Lista de reproducción][12]
: Cree una lista de Session Replays para organizarlas según los patrones que observe. Obtenga más información sobre [Listas de Session Replay][12].
<br>


## Lecturas adicionales {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}

[2]: /es/product_analytics/charts/retention_analysis
[3]: https://app.datadoghq.com/product-analytics
[4]: /es/product_analytics/charts/funnel_analysis
[5]: /es/product_analytics/charts/pathways
[6]: /es/product_analytics/segmentation/
[9]: https://app.datadoghq.com/rum/list
[10]: /es/session_replay/heatmaps
[11]: /es/session_replay/
[12]: /es/session_replay/playlists
[13]: /es/product_analytics/charts/analytics_explorer
[14]: /es/real_user_monitoring/application_monitoring/browser
[15]: /es/real_user_monitoring/application_monitoring/ios
[16]: /es/real_user_monitoring/application_monitoring/android
[17]: /es/product_analytics/agentic_onboarding
[19]: /es/real_user_monitoring/guide/understanding-the-rum-event-hierarchy
[20]: https://app.datadoghq.com/rum/sessions?query=%40type%3Aaction
[21]: /es/api/latest/product-analytics/#send-server-side-events
[22]: /es/product_analytics/data_collected/server_side_events/