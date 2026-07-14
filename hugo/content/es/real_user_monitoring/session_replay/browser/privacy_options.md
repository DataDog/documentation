---
aliases:
- /es/real_user_monitoring/session_replay/privacy_options
description: Describe los controles de privacidad disponibles en Session Replay y
  cómo configurar las opciones de privacidad
further_reading:
- link: /real_user_monitoring/session_replay
  tag: Documentación
  text: Session Replay
- link: https://www.datadoghq.com/blog/default-privacy-session-replay/
  tag: Blog
  text: Enmascarar los datos de usuarios con los parámetros de privacidad predeterminados
    de Session Replay
title: Opciones de privacidad del Navegador Session Replay
---

## Información general

Session Replay proporciona controles de privacidad para garantizar que las organizaciones de cualquier escala no expongan datos confidenciales o personales. Los datos se almacenan en instancias en la nube gestionadas por Datadog y se cifran en reposo.

Las opciones de privacidad predeterminadas de Session Replay están diseñadas para proteger la privacidad del usuario final y evitar que se recopile información confidencial de la organización.

Al habilitar Session Replay para móviles puedes enmascarar automáticamente los elementos confidenciales para que no se registren a través del SDK del Navegador RUM. Cuando se enmascaran los datos, los SDK de Datadog no los recopilan en su formato original y, por lo tanto, no se envían al backend.

## Configuración

<div class="alert alert-danger"><code>defaultPrivacyLevel</code> y <code>mask-user-input</code> están disponibles en el SDK v3.6.0 o posterior.</div>

Para habilitar tus parámetros de privacidad, configura `defaultPrivacyLevel` como `mask`, `mask-user-input` o `allow` en tu configuración de JavaScript.

**Nota:** Si no se especifica la configuración de privacidad al activar la reproducción de la sesión, `mask` se activa en forma predeterminada.

```javascript
import { datadogRum } from '@datadog/browser-rum';

datadogRum.init({
    applicationId: '<DATADOG_APPLICATION_ID>',
    clientToken: '<DATADOG_CLIENT_TOKEN>',
    site: '<DATADOG_SITE>',
    //  servicio: 'my-web-application',
    //  entorno: 'production',
    //  versión: '1.0.0',
    sessionSampleRate: 100,
    sessionReplaySampleRate: 100,
    trackResources: true,
    trackLongTasks: true,
    trackUserInteractions: true,
    defaultPrivacyLevel: 'mask' | 'mask-user-input' | 'allow'
});
```

Después de actualizar tu configuración, puedes anular elementos de tus documentos HTML con las siguientes opciones de privacidad.

### Modo máscara

La configuración de `defaultPrivacyLevel` con el modo `mask` enmascara todo el texto HTML, las entradas de los usuarios, las imágenes, los enlaces y los [atributos `data-*`][1]. El texto de tu aplicación se sustituye por `X`, convirtiendo la página en un wireframe.

{{< img src="real_user_monitoring/session_replay/browser-privacy-mask-all.png" alt="Modo de enmascaramiento" style="width:100%;">}}

**Nota**: Los datos enmascarados no se almacenan en los servidores de Datadog.

### Enmascarar el modo de entrada del usuario

Enmascara la mayoría de los campos de formulario, como las entradas, las áreas de texto y los valores de las casillas de verificación, al tiempo que registra el resto del texto tal cual aparece. Las entradas se sustituyen por tres asteriscos (`***`) y las áreas de texto se ocultan con caracteres `x` que conservan el espacio.

{{< img src="real_user_monitoring/session_replay/browser-privacy-mask-input.png" alt="Enmascarar el modo de entrada de usuario" style="width:100%;">}}

### Permitir modo

Registra todo desenmascarado.

{{< img src="real_user_monitoring/session_replay/browser-privacy-allow-all.png" alt="Permitir modo" style="width:100%;">}}

## Opciones de privacidad

### Anular un elemento HTML

Puedes definir un valor predeterminado para toda la aplicación y etiquetar (tag) el nivel de privacidad de un elemento HTML individual utilizando uno de estos dos métodos:

1. Un atributo HTML como `data-dd-privacy="allow" | "mask" | "hidden" | "mask-user-input"` o
2. Un nombre de clase HTML como `class="dd-privacy-allow" | "dd-privacy-mask-user-input" | "dd-privacy-mask" | "dd-privacy-hidden"`.

El siguiente ejemplo demuestra cómo puedes anular ciertos elementos en tu HTML para personalizar tu método de ofuscación:

```
<div class="line-item" data-dd-privacy="allow">
    <div class="label">Valor del pedido</div>
    <div class="value">
        $<span data-dd-privacy="mask">50.00</span>
    </div>
</div>
```

El importe en dólares del carro de compras se sustituye por asteriscos.

{{< img src="real_user_monitoring/session_replay/example-mask.png" alt="Ejemplo de modo máscara para ofuscar el importe en dólares" style="width:70%;">}}

## Restricciones de privacidad

Para proteger la privacidad del usuario final, independientemente de tu configuración de privacidad, los siguientes elementos HTML están **siempre enmascarados**:
- Elementos de entrada de tipo `password`, `email` y `tel`
- Elementos con atributos `autocomplete`, como números de tarjetas de crédito, fechas de caducidad y códigos de seguridad

## Opciones avanzadas de privacidad

### Ocultar completamente un elemento


`hidden` es una configuración de privacidad avanzada que oculta completamente elementos específicos, en lugar de oscurecer el texto.

Si te preocupa el número de elementos visibles en los campos confidenciales, habilita `hidden` para estos elementos específicos. Los elementos HTML se sustituyen por un bloque gris en el momento de la grabación.

En este ejemplo de repetición de sesión, el nombre de usuario en la navegación de Datadog está ofuscado.

{{< img src="real_user_monitoring/session_replay/hidden.png" alt="Ejemplo de modo oculto para ofuscar un nombre de usuario" style="width:60%;">}}

### Anular el nombre de la acción

Para ocultar el nombre predeterminado de la acción y actualizar la convención de nomenclatura de acciones individuales, configura la anulación de los nombres de tus acciones individuales.

Puedes cambiar el nombre predeterminado de la acción sustituyendo el nombre de un elemento HTML específico por un nombre más general. Por defecto, Datadog muestra el nombre de anulación personalizado.

Por ejemplo, anula el siguiente nombre con `<div data-dd-action-name="Address" > → Action: "Click on Address"`.

Otros casos de uso para anular el nombre predeterminado de la acción incluyen enmascarar datos confidenciales en el Explorador RUM y agilizar tus análisis y búsquedas con convenciones de nomenclatura personalizadas.

### Enmascarar nombres de acciones
Por defecto, si quieres enmascarar todos los nombres de acciones, puedes utilizar la opción `enablePrivacyForActionName` junto con la configuración de privacidad `mask`. Esta operación sustituye automáticamente todos los nombres de acciones no anulados por el parámetro `Masked Element`. Esta configuración también está diseñada para ser compatible con [atributos de anulación HTML](#override-an-html-element) existentes.

<div class="alert alert-info">

Datadog está trabajando para añadir más funciones de privacidad a RUM y Session Replay. ¿Hay alguna otra cosa que te gustaría ver? <a href="/help">Ponte en contacto con el servicio de asistencia Datadog</a>.

</div>

## Para leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes