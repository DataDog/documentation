---
further_reading:
- link: /real_user_monitoring/explorer/search/
  tag: Documentación
  text: Buscar tus eventos
title: Panel lateral de eventos
---

## Información general

El Product Analytics Explorer muestra eventos individualmente en un formato de panel lateral:

{{< img src="real_user_monitoring/explorer/events/performance_side_panel.png" alt="Gráfico de rendimiento de la aplicación y Core Web Vitals en la pestaña Rendimiento" width="80%" >}}

En la parte superior se proporciona información general sobre el contexto. Desplázate hacia la cascada para ver el contenido real del evento.

El contexto de tus usuarios y aplicaciones, incluyendo el sistema operativo, el país, la versión del código, etc., se captura cuando se genera el evento. El contexto también se refiere al propio evento, que incluye información específica del tipo de evento. Por ejemplo, el panel lateral de eventos muestra la ruta de visualización, mientras que el panel lateral **Errores** muestra el mensaje de error.

## Panel lateral de eventos

Para abrir el panel lateral de eventos en el [Analytics Explorer][1], haz clic en una fila de la tabla, en el tipo de visualización **Lista**. Alternativamente, haz clic en la lista del panel lateral que aparece una vez que se hace clic en **Show related events** (Mostrar relacionados eventos).

El panel lateral de eventos muestra toda la información relativa a un evento de Product Analytics. La cascada muestra vistas y acciones relacionadas.

## Atributos

Product Analytics recopila información contextual por defecto. También puedes añadir atributos de contexto adicionales con la [API de contexto global][2].

{{< img src="real_user_monitoring/explorer/events/attributes.png" alt="Pestaña de atributos" width="80%" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/product-analytics/explorer
[2]: /es/real_user_monitoring/browser/advanced_configuration/?tab=npm#global-context