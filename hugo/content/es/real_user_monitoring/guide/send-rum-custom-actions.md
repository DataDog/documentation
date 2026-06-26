---
algolia:
  tags:
  - addaction
aliases:
- /es/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: Aprende a enviar acciones personalizadas para ampliar tu recopilación
  de interacciones de usuarios.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualización de tus datos RUM en el Explorador RUM
private: true
title: Enviar acciones RUM personalizadas
---
## Información general

Real User Monitoring [recopila acciones automáticamente][1] en tu aplicación web. Puedes recopilar eventos y tiempos adicionales, como rellenado de formularios y transacciones comerciales.

Las acciones RUM personalizadas te permiten monitorizar eventos interesantes con todo su contexto relevante adjunto. Por ejemplo, el SDK del Navegador Datadog puede recopilar la información de pago de un usuario (como la cantidad de artículos en el carro de compras, la lista de artículos y su precio) cuando hace clic en el botón de pago en un sitio web de comercio electrónico.

## Instrumentar tu código

Crea una acción RUM utilizando la API `addAction`. Dale un nombre a tu acción y adjunta atributos de contexto en forma de objeto de JavaScript.

El siguiente ejemplo crea una acción `checkout` con información del carro de compras del usuario cuando éste hace clic en el botón de pago.

{{< tabs >}}
{{% tab "NPM" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

function onCheckoutButtonClick(cart) {
    datadogRum.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{% tab "CDN asíncrono" %}}

Asegúrate de envolver la llamada a la API con la devolución de llamada `onReady`:

```javascript
function onCheckoutButtonClick(cart) {
    window.DD_RUM.onReady(function() {
        window.DD_RUM.addAction('checkout', {
            'value': cart.value, // for example, 42.12
            'items': cart.items, // for example, ['tomato', 'strawberries']
        })
    })
}
```

{{% /tab %}}
{{% tab "CDN síncrono" %}}

Asegúrate de comprobar `window.DD_RUM` antes de la llamada a la API:

```javascript
window.DD_RUM && window.DD_RUM.addAction('<NAME>', '<JSON_OBJECT>');

function onCheckoutButtonClick(cart) {
    window.DD_RUM && window.DD_RUM.addAction('checkout', {
        'value': cart.value, // for example, 42.12
        'items': cart.items, // for example, ['tomato', 'strawberries']
    })
}
```

{{% /tab %}}
{{< /tabs >}}

Todo el contexto RUM, como la información de visualización de la página actual, los datos geoIP y la información del navegador, se adjunta automáticamente junto con atributos adicionales proporcionados con la [API de contexto global][2].

## Creación de facetas y medidas sobre atributos

Después de desplegar el código que crea tus acciones personalizadas, éstas aparecen en la pestaña **Acciones** del [Explorador RUM][3].

Para filtrar tus acciones personalizadas, utiliza el atributo `Action Target Name`: `@action.target.name:<ACTION_NAME>`.

El ejemplo a continuación utiliza el siguiente filtro: `@action.target.name:checkout`.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action.mp4" alt="Crear una faceta para acciones RUM personalizadas" video=true style="width:100%;">}}

Al hacer clic en una acción, aparece un panel lateral con metadatos. Puedes encontrar los atributos de tu acción en la sección **Atributos personalizados** y crear facetas o medidas para estos atributos haciendo clic en ellos.

Utiliza facetas para valores distintivos (ID) y medidas para valores cuantitativos, como tiempos y latencia. Por ejemplo, crea una faceta para los artículos del carro de compras y una medida para el valor del carro de compras.

## Uso de atributos en el Explorador RUM

Puedes utilizar atributos de acción junto con facetas y medidas en [Explorador RUM][3] para crear monitors, consultas avanzadas y widgets de dashboards.

El siguiente ejemplo muestra el valor medio de los carros de compras por país en los dos últimos días. Haz clic en el botón **Exportar** para exportar la consulta de búsqueda a un monitor o widget de dashboard.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics.png" alt="Uso de acciones RUM en el Explorador RUM" style="width:100%;">}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /es/real_user_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /es/real_user_monitoring/explorer