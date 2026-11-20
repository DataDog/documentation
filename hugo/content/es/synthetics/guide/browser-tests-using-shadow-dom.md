---
further_reading:
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre las pruebas de navegador
title: Ejecutar tests en aplicaciones utilizando un Shadow DOM
---

## Información general

La API del Shadow Objeto de documento de objeto (DOM) es un componente web que permite adjuntar un árbol del DOM encapsulado a un elemento de HTML. El [DOM de sombra][1] es autónomo y permanece aislado del DOM del documento principal.

Puedes utilizar un DOM de sombra para los siguientes casos de uso:

- Formularios y componentes de librerías de terceros
- Contenido incrustado (como vídeo o una imagen)
- Integraciones de chats emergentes

<div class="alert alert-info">
La <a href="https://chrome.google.com/webstore/detail/Datadog-test-recorder/kkbncfpddhdmkfmalecgnphegacgejoa">extensión del grabador de tests del navegador Datadog </a> no es capaz de capturar el <a href="https://docs.datadoghq.com/synthetics/guide/browser-test-self-maintenance">conjunto completo de localizadores necesarios para apuntar al elemento en</a> las ejecuciones de tests, lo que provoca que el paso falle en las ejecuciones de tests.
</div>

En función del [modo de encapsulación][2] y del objetivo del paso, aprovecha las acciones de tests del navegador para configurar un test que interactúe y valide elementos representados en un DOM de sombra. En esta guía se destacan estas acciones y tipos de aserción.

## Modo abierto

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/open-shadow-dom.png" alt="Shadow DOM abierto" style="width:50%;" >}}

En el modo `open`, las aserciones normales no están disponibles. Puedes utilizar las aserciones de JavaScript para interactuar y validar elementos representados en un DOM de sombra con la propiedad `Element.shadowRoot`.

### Aserción de la presencia de texto

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-in-shadow-dom.png" alt="Validar un texto representado en un DOM de sombra" style="width:90%;" >}}

Para validar que el texto "TODO" aparece en una página, consulta la propiedad `innerHTML` directamente desde el elemento `<body>` del documento principal.

```HTML
return document.querySelector("body").innerHTML.includes("TODO")
```

### Validar el texto representado

Para validar que el texto está representado en un elemento dado representado en un DOM de sombra, utiliza la propiedad `shadowRoot` para acceder al elemento respectivo y las propiedades `innerHTML` o `textContent` para validar que el texto está representado.

Por ejemplo, el siguiente fragmento de código valida el texto "TODO" representado en una etiqueta (tag) `<h3>`:

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <h3> element in the Shadow DOM:
let shadowDomElement = element.shadowRoot.querySelector("div > h3")

// check textContent of the Shadow DOM element:
return shadowDomElement.textContent.includes("TODO")
```

### Introducir texto en los campos de entrada

Cuando los campos de entrada de texto se representan en el árbol del DOM del documento principal, el grabador de tests del navegador Datadog graba automáticamente los valores introducidos y crea un paso de test [Escribir texto][3].

Cuando se trabaja con campos de entrada representados en un DOM de sombra, es posible que el grabador no pueda capturar un conjunto completo de puntos de referencia al elemento, lo que provoca que el paso falle en las ejecuciones de tests. Como solución para introducir texto en un campo de entrada de texto representado en un DOM de sombra, añade una aserción de JavaScript que localice el elemento `<input>` respectivo y configure el campo `value`.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-text-type.png" alt="Validar el texto introducido representado en un DOM de sombra" style="width:90%;" >}}

Por ejemplo, el siguiente fragmento de código añade el texto "elemento añadido con aserción de JS" en el campo de entrada:

```js
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <input> element in the Shadow DOM:
let shadowDomInput = element.shadowRoot.querySelector("input")

// set the value property of the <input> element:
shadowDomInput.value = "Item added with JS assertion"

return true
```

### Haz clic en un elemento

Para activar un clic en un elemento representado en un DOM de sombra, localiza el elemento respectivo y ejecuta `.click()` sobre él.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/validate-trigger-click.png" alt="Validar el clic activado sobre un elemento representado en un DOM de sombra" style="width:90%;" >}}

Por ejemplo, el siguiente fragmento de código activa un clic en un elemento de botón.

```
// find element to which the Shadow DOM is attached:
let element = document.querySelector("body > editable-list")

// use the shadowRoot property to locate the <button> element in the Shadow DOM:
let shadowDomButton = element.shadowRoot.querySelector("button.editable-list-add-item")

// trigger a click on the button:
shadowDomButton.click()

return true
```

## Modo cerrado

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/closed-shadow-dom.png" alt="Shadow DOM cerrado" style="width:30%;" >}}

En el modo `closed`, las aserciones normales no están disponibles. Además, los elementos representados en un DOM de sombra no son accesibles con JavaScript, por lo que no puedes utilizar aserciones de JavaScript en tus tests de navegador.

Puedes utilizar la acción `Press Key` para seleccionar las opciones adecuadas. Por ejemplo, para ir a una página diferente seleccionando una opción de un menú de navegación y que el menú se represente en un DOM de sombra, utiliza la tecla `tab` para ir a la opción respectiva y haz clic en la tecla `enter` para seleccionar una opción.

{{< img src="synthetics/guide/browser-tests-using-shadow-dom/using-tab-keys-for-shadow-dom.mp4" alt="Utilizar teclas de pestañas para solucionar un DOM de sombra en un test de navegador" video=true >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://developers.google.com/web/fundamentals/web-components/shadowdom
[2]: https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_shadow_DOM#basic_usage
[3]: https://docs.datadoghq.com/es/synthetics/browser_tests/actions#type-text
