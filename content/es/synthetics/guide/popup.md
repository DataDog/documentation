---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitorizar la experiencia de usuario con los tests de navegador de Datadog
- link: synthetics/browser_tests
  tag: Documentación
  text: Información sobre los tests de navegador Synthetic
title: Controlar ventanas emergentes en tests de navegador
---
## Información general

En esta guía se describe cómo administrar ventanas emergentes como modales o ventanas de aplicaciones en un [test de navegador][5] de Sintético.

## Modales

### JavaScript

Los tests de navegador de Synthetics gestionan los [modales JavaScript][1] automáticamente:

 - `alert` los modales se descartan inmediatamente para OK. 
 - `prompt` los modales se llenan con `Lorem Ipsum` para los tests en Google Chrome o Microsoft Edge.
 - `confirm` se aceptan los modales que piden confirmación.

### Autenticación básica

Para las ventanas emergentes de autenticación básica, especifica las credenciales asociadas en las [**Opciones avanzadas**][2] de tu configuración de test de navegador.

{{< img src="synthetics/guide/popup/http_authentication.png" alt="Ventana emergente de autenticación básica" style="width:90%" >}}

## Ventanas emergentes de aplicación

### Ventanas emergentes ancladas

Si aparecen ventanas emergentes en algún punto de tu recorrido, puedes grabar un paso para cerrarla y contemplar la posibilidad de que este paso no funcione usando la [opción correspondiente][3]. De este modo, el test sabrá cómo comportarse si aparecen ventanas emergentes. Si no aparecen, el paso no funcionará, pero el resto del test se desarrollará correctamente.

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Permitir que el paso no controle la ventana emergente" style="width:60%" >}}

### Ventanas emergentes móviles

Si el momento en que aparecen estas ventanas emergentes en una sesión no es predecible, check con el tercero que provee la ventana emergente para ver si puede crear una regla que impida que la ventana emergente aparezca durante la ejecución de tu test de navegador. Puede, por ejemplo, proveerte una cookie que puedes introducir en la [sección **Opciones avanzadas**][2] de tu test.

Otra alternativa es aplicar uno de estos métodos para que la ventana emergente se cierre y el test siga su camino:
  * Crear una [aserción JavaScript][4] al principio del test de navegador para tratar de cerrar la ventana emergente con regularidad:

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

  * Añadir pasos para cerrar la ventana emergente entre todos los demás pasos del test de navegador y seleccionar la [opción **Allow this step to fail**][3] (Este paso puede no funcionar) en cada uno de ellos.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /es/synthetics/browser_tests/#test-configuration
[3]: /es/synthetics/browser_tests/advanced_options/#optional-step
[4]: /es/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript
[5]: /es/synthetics/browser_tests