---
description: Envíe eventos personalizados desde su servidor para complementar los
  datos del lado del cliente en Product Analytics.
further_reading:
- link: /api/latest/product-analytics/#send-server-side-events
  tag: Referencia de la API
  text: Product Analytics API
- link: /product_analytics/
  tag: Documentación
  text: Product Analytics
- link: /product_analytics/data_collected/
  tag: Documentación
  text: Datos de Product Analytics recopilados
title: Realizar seguimiento de eventos del lado del servidor
---
## Descripción general {#overview}

Los eventos del lado del servidor son eventos personalizados enviados a través de la [Product Analytics API][1] desde su servidor. A diferencia de los eventos del lado del cliente capturados por el SDK de RUM, como las visualizaciones de página o los clics en botones, los eventos del lado del servidor realizan un seguimiento de las acciones que ocurren en su backend, como una compra completada o un pago procesado.

Utilice eventos del lado del servidor para:

- Capturar eventos en la fuente de verdad en el servidor, independientemente del comportamiento del lado del cliente
- Realizar seguimiento de acciones de backend sin equivalente en el lado del cliente, como una confirmación de pago o una renovación de suscripción
- Complemente los datos del lado del cliente con contexto del lado del servidor

## Requisitos previos {#prerequisites}

Antes de enviar eventos del lado del servidor, [configure el SDK de Datadog][2] para su aplicación y [habilite Product Analytics][3].

## Enviar eventos del lado del servidor {#send-server-side-events}

Utilice la [Product Analytics API][1] para enviar eventos desde su servidor. Para asociar un evento del lado del servidor con una sesión de cliente, incluya el `session_id` de la sesión RUM activa del cliente. Incluir el ID de sesión vincula los eventos del lado del servidor con los datos del lado del cliente para obtener una vista completa del recorrido del usuario.

Para obtener la referencia completa de la API, incluida la autenticación, los campos obligatorios y los parámetros de solicitud, consulte [Enviar eventos del lado del servidor][1].

## Analizar eventos del lado del servidor {#analyze-server-side-events}

Después de enviar eventos del lado del servidor, estos estarán disponibles en cualquier gráfico de Product Analytics. En el selector de eventos, seleccione **Server Events** para establecer el contexto de su análisis en los datos del lado del servidor.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/api/latest/product-analytics/#send-server-side-events
[2]: /es/product_analytics/#track-client-side-events-sdk
[3]: /es/product_analytics/#enable-product-analytics