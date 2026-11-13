---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitoreo de la experiencia del usuario con Datadog Browser Tests
- link: synthetics/browser_tests
  tag: Documentación
  text: Obtenga más información sobre las pruebas Synthetic de navegador
title: Maneje ventanas emergentes en pruebas de navegador
---
## Descripción general {#overview}

Esta guía describe cómo administrar ventanas emergentes como modales o ventanas de aplicación en una [prueba de navegador][5] sintética.

## Modales {#modals}

### JavaScript {#javascript}

Las pruebas de navegador sintéticas manejan automáticamente los [modales de JavaScript][1]:

 - `alert` los modales se cierran inmediatamente con OK. 
 - `prompt` los modales se completan con `Lorem Ipsum` para pruebas en Google Chrome o Microsoft Edge.
 - `confirm` los modales que solicitan confirmación son aceptados.

### Autenticación básica {#basic-authentication}

Para las ventanas emergentes de autenticación básica, especifique las credenciales correspondientes en [{{< ui >}}Advanced Options{{< /ui >}}][2] de la configuración de su prueba de navegador.

{{< img src="synthetics/guide/popup/http_authentication.png" alt="Ventana emergente de autenticación básica" style="width:90%" >}}

## Ventanas emergentes de aplicación {#application-pop-ups}

### Ventanas emergentes ancladas {#anchored-pop-ups}

Si aparece una ventana emergente en un punto específico de su recorrido, grabe un paso para cerrarla. En las opciones avanzadas del paso, seleccione {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Luego, desmarque {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (seleccionado de forma predeterminada). Si la ventana emergente no aparece, el paso falla sin hacer fallar toda la prueba. Para obtener más información, consulte la sección [Paso opcional][3].

{{< img src="synthetics/browser_tests/advanced_options/optional_step_2.png" alt="Opciones avanzadas del paso con \"Continue to next step\" seleccionado y \"Mark test as failed\" desmarcado." style="width:60%" >}}

### Ventanas emergentes móviles {#moving-pop-ups}

Si el momento en el que aparecen estas ventanas emergentes en una sesión no es predecible, consulte con el tercero que proporciona la ventana emergente para ver si puede crear una regla que impida que aparezca durante la ejecución de su prueba de navegador. Por ejemplo, pueden proporcionarle una cookie que puede ingresar en la [sección {{< ui >}}Advanced Options{{< /ui >}}][2] de su prueba.

Alternativamente, utilice uno de estos métodos para asegurarse de que su ventana emergente se cierre y su prueba pueda continuar su recorrido:
  * Cree una [aserción de JavaScript][4] al principio de su prueba de navegador para intentar cerrar regularmente la ventana emergente:

    ```javascript
    if (document.querySelector("<ELEMENT>")) {
      return true;
    } else {
      return new Promise((resolve, reject) => {
        const isPopupDisplayed = () => {
          if (document.querySelector("<ELEMENT>")) {
            clearInterval(popup);
            resolve(true);
          }
        };
        let popup = setInterval(isPopupDisplayed, 500);
      });
    }
    ```

  * Grabe los pasos para cerrar la ventana emergente y agréguelos entre todos los demás pasos de su prueba de navegador. Para cada paso, seleccione {{< ui >}}If this step fails, continue to next step{{< /ui >}}. Luego, desmarque {{< ui >}}If this step fails, mark test as failed{{< /ui >}} (seleccionado de forma predeterminada).

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /es/synthetics/browser_tests/#test-configuration
[3]: /es/synthetics/browser_tests/advanced_options/#optional-step
[4]: /es/synthetics/browser_tests/test_steps#test-your-ui-with-custom-javascript
[5]: /es/synthetics/browser_tests