---
further_reading:
- link: https://www.datadoghq.com/blog/browser-tests/
  tag: Blog
  text: Monitorizar la experiencia de usuario con los tests de navegador de Datadog
- link: synthetics/browser_tests
  tag: Documentación
  text: Configurar un test de navegador
title: Gestionar las ventanas emergentes en los tests de navegador
---
## Información general

En este artículo te enseñamos a gestionar las ventanas emergentes, tanto modales como de aplicación, en un test de navegador de Synthetics.

## Modales

### JavaScript

Los tests de navegador de Synthetics gestionan los [modales JavaScript][1] automáticamente:

 - Los modales `alert` se cierran.
 - Los modales `prompt` y `confirm` se responden con `Lorem Ipsum`.

### Autenticación básica

Para el caso de las ventanas emergentes de autenticación básica, especifica las credenciales correspondientes en los parámetros de configuración de los tests de navegador que encontrarás en el apartado [**Advanced Options > HTTP Auth**][2] (Opciones avanzadas > Autenticación HTTP):

{{< img src="synthetics/guide/popup/http_auth_option.png" alt="Ventana emergente de autenticación básica">}}

## Ventanas emergentes de aplicación

### Ventanas emergentes ancladas

Si aparecen ventanas emergentes en algún punto de tu recorrido, puedes grabar un paso para cerrarla y contemplar la posibilidad de que este paso no funcione usando la [opción correspondiente][3]. De este modo, el test sabrá cómo comportarse si aparecen ventanas emergentes. Si no aparecen, el paso no funcionará, pero el resto del test se desarrollará correctamente.

{{< img src="synthetics/guide/popup/allow_fail_option.png" alt="Incluye la posibilidad de que el paso falle para gestionar las ventanas emergentes" width="90%">}}

### Ventanas emergentes móviles

Si no se puede prever cuándo aparecerá una ventana así en una sesión, pregunta a quien la proporciona si puede crear una regla que impida que aparezca mientras se ejecuta tu test de navegador. Por ejemplo, una posibilidad es que te facilite una cookie para introducirla en el [apartado de opciones avanzadas pertinente][2] del test.

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://javascript.info/alert-prompt-confirm
[2]: /es/synthetics/browser_tests/#test-configuration
[3]: /es/synthetics/browser_tests/advanced_options/#optional-step
[4]: /es/synthetics/browser_tests/actions#test-your-ui-with-custom-javascript