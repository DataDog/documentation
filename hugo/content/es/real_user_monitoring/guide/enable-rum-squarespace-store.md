---
further_reading:
- link: /real_user_monitoring/guide/rum-for-product-analytics/
  tag: Documentación
  text: Uso de RUM y Session Replay para el análisis de productos
- link: /real_user_monitoring/guide/alerting-with-conversion-rates/
  tag: Documentación
  text: Generación de alertas con tasas de conversión
title: Habilitar RUM en tu tienda Squarespace
---

## Información general

Comprender cómo interactúan los clientes con tus páginas web es esencial para el éxito de tu tienda en línea.

Esta guía te explica cómo puedes configurar Real User Monitoring en tu tienda con tecnología Squarespace.

## Configuración

1. Inicia sesión en tu panel de administración de Squarespace y haz clic en **Configuración**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-1.png" alt="Habilitar RUM en tu tienda Squarespace" style="width:30%;">}}

2. En **Configuración**, haz clic en **Avanzado**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-2.png" alt="Habilitar RUM en tu tienda Squarespace" style="width:30%;">}}

3. En el menú abierto, haz clic en **Inyección de código**.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-3.png" alt="Habilitar RUM en tu tienda Squarespace" style="width:30%;">}}

4. Inicializa el SDK del Navegador RUM añadiendo el fragmento de código SDK en la sección **Cabecera*. Para ver más información sobre qué método de instalación elegir, consulta la [documentación de monitorización del Navegador RUM][1].

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-4.png" alt="Habilitar RUM en tu tienda Squarespace" >}}

5. Haz clic en el botón **Guardar** para guardar los cambios.

   {{< img src="real_user_monitoring/guide/enable-rum-squarespace-store/enable-rum-squarespace-5.png" alt="Habilitar RUM en tu tienda Squarespace" style="width:50%;">}}

Para ver más información sobre la inyección de código, consulta la [documentación de Squarespace][2].

## Para empezar a explorar

Una vez que hayas inicializado el SDK del Navegador RUM, puedes empezar a utilizar Real User Monitoring con tu tienda Squarespace.

Por ejemplo, podrás:

- Obtener información valiosa sobre el comportamiento de tus clientes
tomando decisiones basadas en datos para mejorar tu tienda
- Aumentar la conversión viendo las sesiones enriquecidas de grabaciones del navegador utilizando [Session Replay][3]
- Utilizar el [análisis de embudo][4] para comprender mejor el recorrido del cliente o
- [Generar métricas][5] a partir de esas sesiones recién capturadas.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/setup/#choose-the-right-installation-method/
[2]: https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection
[3]: /es/real_user_monitoring/session_replay/browser/
[4]: /es/product_analytics/journeys/funnel_analysis/
[5]: /es/real_user_monitoring/generate_metrics/