---
description: Configure el monitoreo de RUM en tiendas Shopify para realizar un seguimiento
  de las interacciones de los clientes, el rendimiento y las tasas de conversión para
  la optimización del comercio electrónico.
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentación
  text: Utilice RUM y Session Replay para Product Analytics
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentación
  text: Alerting con tasas de conversión
private: true
title: Habilite RUM en su tienda Shopify
---
<div class="alert alert-danger">
<a href="https://www.shopify.com/plus/upgrading-to-checkout-extensibility">Checkout Extensibility de Shopify</a> no es compatible con el seguimiento de RUM. Si esta función es fundamental para las necesidades de su negocio, cree un ticket con <a href="https://docs.datadoghq.com/help/">Soporte de Datadog</a>.
</div>

## Descripción general {#overview}

Comprender cómo interactúan los clientes con sus páginas web es crucial para el éxito de su tienda en línea.

Esta guía explica cómo puede configurar Real User Monitoring en su tienda impulsada por Shopify.

## Configuración {#setup}

1. Inicie sesión en su panel de administración de Shopify.
2. En {{< ui >}}Sales channels{{< /ui >}}, haga clic en {{< ui >}}Online Store{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Habilite RUM en su tienda Shopify" style="width:30%;">}}

3. Esto abre un nuevo menú, haga clic en {{< ui >}}Themes{{< /ui >}}.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Habilite RUM en su tienda Shopify" style="width:30%;">}}

4. Haga clic en el botón {{< ui >}}Edit code{{< /ui >}} para su tema actual.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Habilite RUM en su tienda Shopify" >}}

5. En el directorio {{< ui >}}Layout{{< /ui >}}, busque el archivo principal de su tema `theme.liquid`. Haga clic en el archivo para editarlo.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Habilite RUM en su tienda Shopify" style="width:30%;">}}

6. Inicialice el Browser RUM SDK agregando el fragmento de código del SDK dentro de la etiqueta `<head>`. Para obtener más información sobre qué método de instalación elegir, consulte la [RUM Browser Monitoring documentation][1].

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Habilite RUM en su tienda Shopify" >}}

7. Haga clic en el botón {{< ui >}}Save{{< /ui >}} para guardar sus cambios.

La actualización se ve de la siguiente manera en la interfaz de usuario de Shopify:

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Habilite RUM en su tienda Shopify" style="width:50%;">}}

Consulte más información sobre la edición del código del tema en la [documentación de Shopify][2].

## Comience a explorar {#start-exploring}

Una vez que haya inicializado el Browser RUM SDK, puede comenzar a usar Real User Monitoring con su tienda Shopify.

Por ejemplo, puede:

- Obtenga información valiosa sobre el comportamiento de sus clientes al
tomar decisiones basadas en datos para mejorar su tienda
- Aumente la conversión observando sesiones enriquecidas con grabaciones del navegador mediante [Session Replay][3]
- [Genere métricas][5] a partir de sesiones recién capturadas

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /es/session_replay/
[5]: /es/real_user_monitoring/platform/generate_metrics/