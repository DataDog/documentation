---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentación
  text: Uso de RUM y Session Replay para el análisis de productos
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentación
  text: Generación de alertas con tasas de conversión
title: Habilitar RUM en tu tienda WooCommerce
---

## Información general

Comprender cómo interactúan los clientes con tus páginas web es esencial para el éxito de tu tienda en línea.



Esta guía te explica cómo puedes configurar Real User Monitoring en tu WordPress + tienda con tecnología WooCommerce.

## Configuración

1. Inicia sesión en tu panel de administración de WordPress.
2. En **Complementos**, haz clic en **Añadir nuevo**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-1.png" alt="Habilitar RUM en tu tienda WooCommerce" style="width:30%;">}}

3. Busca **WPCode** y haz clic en **Instalar ahora**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-2.png" alt="Habilitar RUM en tu tienda WooCommerce" style="width:50%;">}}

4. Una vez instalado WPCode, haz clic en **Activar**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-3.png" alt="Habilitar RUM en tu tienda WooCommerce" style="width:50%;">}}

5. Busca la nueva sección **Fragmentos de código** en el menú de WordPress y haz clic en **Header y Footer**.

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-4.png" alt="Habilitar RUM en tu tienda WooCommerce" style="width:30%;">}}

6. Inicializa el SDK RUM del navegador añadiendo el fragmento de código SDK dentro de la sección **Header** y guarda los cambios haciendo clic en el botón **Guardar**. Para obtener más información sobre qué método de instalación elegir, consulta la [documentación de monitorización del Navegador RUM][1].

   {{< img src="real_user_monitoring/guide/enable-rum-woocommerce-store/enable-rum-woocommerce-5.png" alt="Habilitar RUM en tu tienda WooCommerce" >}}

## Para empezar a explorar

Una vez que hayas inicializado el SDK del Navegador RUM, puedes empezar a utilizar Real User Monitoring con tu tienda WooCommerce.

Por ejemplo, podrás:

- Obtener información valiosa sobre el comportamiento de tus clientes
tomando decisiones basadas en datos para mejorar tu tienda
- Aumentar la conversión viendo las sesiones enriquecidas de grabaciones del navegador utilizando [Session Replay][2]
- Utilizar el [análisis de embudo][3] para comprender mejor el recorrido del cliente o
- [Generar métricas][4] a partir de esas sesiones recién capturadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: /es/real_user_monitoring/session_replay/
[3]: /es/product_analytics/journeys/funnel_analysis
[4]: /es/real_user_monitoring/platform/generate_metrics/