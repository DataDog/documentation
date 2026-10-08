---
description: Implemente el monitoreo RUM en tiendas Squarespace para comprender el
  comportamiento del cliente, realizar un seguimiento del rendimiento y optimizar
  la experiencia del usuario.
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentación
  text: Utilice RUM y Session Replay para Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentación
  text: Alerting con tasas de conversión
title: Habilite RUM en su tienda Squarespace
---
## Descripción general {#overview}

Comprender cómo interactúan los clientes con sus páginas web es crucial para el éxito de su tienda en línea.

Esta guía explica cómo puede configurar Real User Monitoring en su tienda impulsada por Squarespace.

## Configuración {#setup}

1. Regístrese en su panel de administración de Squarespace y haga clic en {{< ui >}}Settings{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Habilite RUM en su tienda Squarespace" style="width:30%;">}}

2. En {{< ui >}}Settings{{< /ui >}}, haga clic en {{< ui >}}Advanced{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Habilite RUM en su tienda Squarespace" style="width:30%;">}}

3. En el menú abierto, haga clic en {{< ui >}}Code Injection{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Habilite RUM en su tienda Squarespace" style="width:30%;">}}

4. Inicialice el Browser RUM SDK agregando el fragmento de código del SDK dentro de la sección {{< ui >}}Header{{< /ui >}}. Consulte más información sobre qué método de instalación elegir en la [documentación de RUM Browser Monitoring][1].

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Habilite RUM en su tienda Squarespace" >}}

5. Haga clic en el botón {{< ui >}}Save{{< /ui >}} para guardar sus cambios.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Habilite RUM en su tienda Squarespace" style="width:50%;">}}

Consulte más información sobre la inyección de código en la [documentación de Squarespace][2].

## Comience a explorar {#start-exploring}

Una vez que haya inicializado el Browser RUM SDK, puede comenzar a usar Real User Monitoring con su tienda Squarespace.

Por ejemplo, puede:

- Obtenga información valiosa sobre el comportamiento de sus clientes al
tomar decisiones basadas en datos para mejorar su tienda
- Aumente la conversión observando sesiones enriquecidas con grabaciones del navegador mediante [Session Replay][3]
- Utilice el [análisis de embudo][4] para comprender mejor el recorrido del cliente, o
- [Genere métricas][5] a partir de esas sesiones recién capturadas

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /es/session_replay/
[4]: /es/product_analytics/journeys/funnel_analysis/
[5]: /es/real_user_monitoring/generate_metrics/