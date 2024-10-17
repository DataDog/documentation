---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentación
  text: Uso de RUM y Session Replay para el análisis de productos
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentación
  text: Generación de alertas con tasas de conversión
title: Habilitación de RUM en tu tienda Shopify
---

## Información general

Comprender cómo interactúan los clientes con tus páginas web es esencial para el éxito de tu tienda en línea.

Esta guía te explica cómo puedes configurar Real User Monitoring en tu tienda con tecnología Shopify.

## Configuración

1. Inicia sesión en tu panel de administración de Shopify.
2. En **Canales de venta**, haz clic en **Tienda en línea**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-1.png" alt="Habilitar RUM en tu tienda Shopify" style="width:30%;">}}

3. Esto abre un nuevo menú. Allí haz clic en **Temas**.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-2.png" alt="Habilitar RUM en tu tienda Shopify" style="width:30%;">}}

4. Haz clic en el botón **Editar código** de tu tema actual.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-3.png" alt="Habilitar RUM en tu tienda Shopify" >}}

5. En el directorio **Diseño**, busca el archivo principal de tu tema **theme.liquid**. Haz clic en el archivo para editarlo.

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-4.png" alt="Habilitar RUM en tu tienda Shopify" style="width:30%;">}}

6. Inicializa el SDK del Navegador RUM añadiendo el fragmento de código SDK en la etiqueta (tag) `<head>`. Para ver más información sobre qué método de instalación elegir, consulta la [documentación de monitorización del Navegador RUM][1].

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-5.png" alt="Habilitar RUM en tu tienda Shopify" >}}

7. Haz clic en el botón **Guardar** para guardar los cambios.

El aspecto actualizado en la interfaz de usuario de Shopify es el siguiente:

   {{< img src="real_user_monitoring/guide/enable-rum-shopify-store/enable-rum-shopify-6.png" alt="Habilitar RUM en tu tienda Shopify" style="width:50%;">}}

Para ver más información sobre la edición de códigos de temas, consulta la [documentación de Shopify][2].

## Para empezar a explorar

Una vez que hayas inicializado el SDK del Navegador RUM, puedes empezar a utilizar Real User Monitoring con tu tienda Shopify.

Por ejemplo, podrás:

- Obtener información valiosa sobre el comportamiento de tus clientes
tomando decisiones basadas en datos para mejorar tu tienda
- Aumentar la conversión viendo las sesiones enriquecidas de grabaciones del navegador utilizando [Session Replay][3]
- Utilizar el [análisis de embudo][4] para comprender mejor el recorrido del cliente o
- [Generar métricas][5] a partir de esas sesiones recién capturadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://help.shopify.com/en/manual/online-store/themes/theme-structure/extend/edit-theme-code
[3]: /es/real_user_monitoring/session_replay/browser/
[4]: /es/product_analytics/journeys/funnel_analysis
[5]: /es/real_user_monitoring/platform/generate_metrics/