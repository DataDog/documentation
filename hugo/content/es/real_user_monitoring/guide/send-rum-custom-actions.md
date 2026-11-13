---
algolia:
  tags:
  - addaction
aliases:
- /es/real_user_monitoring/guide/send-custom-user-actions/
beta: true
description: Aprenda a enviar acciones personalizadas para ampliar su colección de
  interacciones de usuario.
further_reading:
- link: /real_user_monitoring/explorer
  tag: Documentación
  text: Visualice sus datos de RUM en el Explorador de RUM
- link: https://learn.datadoghq.com/courses/custom-data-rum-javascript
  tag: Centro de aprendizaje
  text: Recopile datos personalizados con RUM para aplicaciones web de JavaScript
private: true
title: Enviar acciones personalizadas de RUM
---
## Descripción general {#overview}

Real User Monitoring [recopila automáticamente acciones][1] en su aplicación web. Puede recopilar eventos y tiempos adicionales, como finalizaciones de formularios y transacciones comerciales.

Las acciones de RUM personalizadas le permiten hacer un seguimiento de eventos interesantes con todo el contexto relevante adjunto. Por ejemplo, el SDK de navegador de Datadog puede recopilar la información de pago de un usuario (como la cantidad de artículos en el carrito, la lista de artículos y el valor total de los artículos del carrito) cuando hace clic en el botón de pago en un sitio web de comercio electrónico.

## Instrumente su código {#instrument-your-code}

Cree una acción de RUM utilizando la `addAction` API. Asigne un nombre a su acción y adjunte atributos de contexto en forma de objeto de JavaScript.

El siguiente ejemplo crea una `checkout` acción con detalles sobre el carrito del usuario cuando este hace clic en el botón de pago.

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

Asegúrese de envolver la llamada a la API con la devolución de llamada `onReady`:

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

Asegúrese de verificar `window.DD_RUM` antes de la llamada a la API:

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

Todo el contexto de RUM, como la información de la vista de página actual, los datos de geoIP y la información del navegador, se adjunta automáticamente junto con los atributos adicionales proporcionados con la [API de contexto global][2].

## Cree facetas y medidas en atributos {#create-facets-and-measures-on-attributes}

Después de implementar el código que crea sus acciones personalizadas, estas aparecen en la pestaña {{< ui >}}Actions{{< /ui >}} del [Explorador de RUM][3].

Para filtrar por sus acciones personalizadas, utilice el atributo `Action Target Name`: `@action.target.name:<ACTION_NAME>`.

El siguiente ejemplo utiliza el siguiente filtro: `@action.target.name:checkout`.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/facet-from-user-action-3.mp4" alt="Cree una faceta para acciones de RUM personalizadas" video=true style="width:100%;">}}

Después de hacer clic en una acción, aparece un panel lateral con metadatos. Puede encontrar los atributos de su acción en la sección {{< ui >}}Custom Attributes{{< /ui >}} y crear facetas o medidas para estos atributos haciendo clic en ellos.

Utilice facetas para valores distintivos (IDs) y medidas para valores cuantitativos como tiempos y latencia. Por ejemplo, cree una faceta para los artículos del carrito y una medida para el valor del carrito.

## Utilice atributos en el Explorador de RUM {#use-attributes-in-the-rum-explorer}

Puede utilizar atributos de acción junto con facetas y medidas en el [Explorador de RUM][3] para crear dashboard widgets, monitors y consultas avanzadas.

El siguiente ejemplo muestra el valor promedio del carrito por país en los últimos dos días. Haga clic en el botón {{< ui >}}Export{{< /ui >}} para exportar la consulta de búsqueda a un dashboard widget o monitor.

{{< img src="real_user_monitoring/guide/send-custom-user-actions/custom-action-analytics-2.png" alt="Utilice acciones de RUM en el Explorador de RUM" style="width:100%;">}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/real_user_monitoring/application_monitoring/browser/data_collected/?tab=useraction#action-attributes
[2]: /es/real_user_monitoring/application_monitoring/browser/advanced_configuration/#replace-global-context
[3]: /es/real_user_monitoring/explorer