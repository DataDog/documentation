---
aliases:
- /es/real_user_monitoring/product_analytics
- /es/real_user_monitoring/guide/rum-for-product-analytics
description: Análisis de productos te ayuda a comprender el uso de tus aplicaciones
  de un vistazo.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tomar decisiones de diseño basadas en datos con el Análisis de productos
- link: /product_analytics/analytics_explorer/
  tag: Documentación
  text: Analytics Explorer
- link: https://www.datadoghq.com/blog/datadog-product-analytics/
  tag: Blog
  text: Tomar decisiones de diseño basadas en datos con el Análisis de productos
title: Análisis de productos
---

## Información general

{{< img src="product_analytics/overview-1.png" alt="Página de inicio del Análisis de productos.">}}

Análisis de productos te ayuda a conocer mejor el comportamiento de los usuarios y a tomar decisiones basadas en datos. Puede ayudar a resolver los siguientes tipos de casos de uso en tu aplicación:

- [Comprender la adopción de productos](#understand-product-adoption)
- [Seguimiento de las tasas de conversión y su evolución en el tiempo](#track-conversion-rates-and-their-evolution-over-time)
- [Seguimiento de patrones clave de comportamiento de los usuarios](#track-key-user-behavior-patterns)
- [Visualizar los botones con los que más y con los que menos se has interactuado en una página](#visualize-the-most-and-least-interacted-with-buttons-on-a-given-page)

## Empezando

Para empezar a utilizar el Análisis de productos, actívalo para cada aplicación en la que desees monitorizar el comportamiento de los usuarios:

1. Selecciona la aplicación que deseas monitorizar en la lista de [Gestión de aplicaciones][9].
2. En PRODUCT SETTINGS (CONFIGURACIÓN DEL PRODUCTO), haz clic en **Product Analytics** (Análisis de productos).
3. Haz clic en el botón **Enable** (Habilitar).

{{< img src="product_analytics/enable-product-analytics.png" alt="Habilitar el Análisis de productos desde la página de Gestión de aplicaciones.">}}

Por defecto, los datos de Product Analytics se conservan durante 15 meses. Más información sobre [periodos de retención de datos de Datadog][1].

## Navegación por la interfaz de usuario de Product Analytics 
Cada una de las funciones de Product Analytics proporciona información contextual sobre el recorrido de los usuarios. En esta sección, se describe el contexto que cada función puede proporcionar para tu caso de uso individual.

### Entendimiento de la adopción del producto
La página de [Inicio][3] te ofrece una vista detallada de la actividad de tus usuarios y el estado de la adopción de tu producto. Este es el lugar más habitual de acceso a Product Analytics.

{{< img src="/product_analytics/pana_home_page.png" alt="Comprender las conversiones de extremo a extremo con Funnel Analysis.">}}

Por defecto, esta página muestra los gráficos `active users`, `Page ( página) views` y `average time spent by user`, pero tienes la posibilidad de añadir gráficos adicionales o un dashboard. Puedes navegar a cualquier parte de Product Analytics desde la página de inicio.

### Seguimiento de las tasas de conversión y su evolución en el tiempo
Los gráficos de Product Analytics te ayudan a visualizar el recorrido de los usuarios a medida que utilizan tu producto.

{{< img src="/product_analytics/pana_charts_video.mp4" alt="Visualiza el recorrido de los usuarios con gráficos." video="true">}}

Cada tipo de gráfico ofrece una visión diferente del recorrido del usuario:

[Rutas
: puedes visualizar todos los recorridos de los usuarios en tu aplicación para analizar la ruta crítica.

[Embudo][4]
: seguimiento de las tasas de conversión en los flujos de trabajo clave para identificar y abordar los cuellos de botella en los recorridos integrales de los usuarios. <br> Por ejemplo, puedes ver si los clientes abandonan en un punto determinado debido a un rendimiento deficiente del sitio web o medir cómo afecta a la tasa de abandono añadir nuevos pasos al proceso.

[Retención][2]
: mide la frecuencia con la que los usuarios vuelven a la página o acción para obtener información sobre la satisfacción general del usuario.

[Análisis][13]
: contiene vistas de agregación de datos para comprender cómo se utiliza tu producto.

<br>

### Seguimiento de los principales patrones de comportamiento de los usuarios
Es posible que desees comprender mejor a un grupo específico de usuarios. Esto podría ser con el fin de mejorar tu experiencia de usuario, o empujarlos a comprar el contenido en su carrito. Independientemente del propósito, puedes utilizar la sección [Usuarios y segmentos][6] para agrupar a tus usuarios en función de una característica deseada.

{{< img src="/product_analytics/segmentation/userprofiles_pana-ga.png" alt="Consulta los perfiles individuales de los usuarios y crea un segmento de estos perfiles.">}}

Puedes ver los perfiles individuales de los usuarios y crear un segmento, o una agrupación específica, a partir de estos perfiles para que se ajusten al comportamiento que deseas observar. Por ejemplo, puedes crear un segmento de usuarios que tienen artículos en sus carritos pero que aún no han realizado la compra para enviarles un correo electrónico animándoles a realizar una compra.


### Visualización de los botones con los que más y menos se interactúa en una página determinada
Supongamos que quieres hacer cambios en la interfaz de tu aplicación, pero primero quieres entender cómo navegan los usuarios en la página. ¿Hay algún camino específico que sigan más que otros? ¿Puedes hacer que las acciones y los flujos de los usuarios sean más fluidos? Las siguientes funciones pueden ayudarte a capturar y reproducir la experiencia de navegación de tus usuarios para fundamentar tus decisiones de cambio de producto. 

{{< img src="/product_analytics/pana_session_replay_page.png" alt="Capturar y reproducir tu experiencia de navegación de usuarios para informar tus decisiones de diseño del producto.">}}

[Session replay][11] 
: amplía la supervisión de la experiencia del usuario permitiéndote capturar y reproducir visualmente la navegación web o la experiencia de la aplicación móvil de tus usuarios. <br><br>Esto es beneficioso para la _identificación de errores_, la _reproducción_ y la _resolución_, y proporciona información sobre los patrones de uso de la aplicación y los errores de diseño.

[Heatmaps][10]
: se trata de una visualización de las interacciones de los usuarios superpuesta a los datos de Session Replay. Product Analytics dispone de tres tipos diferentes de heatmaps: mapas de clics, elementos principales, mapas de desplazamiento. <br><br> Utiliza los heatmaps para revisar datos complejos de un vistazo y obtener información para optimizar la experiencia del usuario.

[Lista de reproducción][12]
: puedes crear una lista de reproducción de Session Replays para organizarlos según los patrones que observes. Más información sobre [Listas de reproducción de Session Replay][12].
<br>


## Referencias adicionales
{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/data_security/data_retention_periods/
[2]: /es/product_analytics/charts/user_retention
[3]: https://app.datadoghq.com/product-analytics
[4]: /es/product_analytics/charts/funnel_analysis
[5]: /es/product_analytics/charts/pathways
[6]: /es/product_analytics/segmentation/
[8]: https://app.datadoghq.com/rum/
[9]: https://app.datadoghq.com/rum/list
[10]: /es/product_analytics/session_replay/heatmaps
[11]: /es/product_analytics/session_replay/
[12]: /es/product_analytics/session_replay/playlists
[13]: /es/product_analytics/charts/analytics_explorer