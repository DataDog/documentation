---
description: Aprenda a usar aserciones de JavaScript personalizadas en sus pruebas
  de navegador Synthetic.
further_reading:
- link: /synthetics/browser_tests/test_steps/
  tag: Documentación
  text: Aprenda sobre los pasos de prueba de navegador.
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Aprenda a configurar opciones avanzadas para los pasos de prueba.
- link: /synthetics/guide/popup/#moving-popups
  tag: Documentación
  text: Aprenda a manejar ventanas emergentes activadas en momentos desconocidos
- link: https://www.datadoghq.com/blog/ambassador-browser-tests/
  tag: Blog
  text: Cómo ayudé a mi cliente a escalar sus pruebas de navegador con Datadog.
title: Utilice aserciones de JavaScript personalizadas en pruebas de navegador.
---
## Descripción general {#overview}

Esta guía describe cómo puede probar una interfaz de usuario (UI) usando JavaScript personalizado en una [prueba de navegador][1]. Las aserciones de JavaScript admiten código síncrono y asíncrono.

Para crear una aserción usando JavaScript personalizado:

1. Haga clic en {{< ui >}}Assertion{{< /ui >}} y seleccione {{< ui >}}Test custom JavaScript assertion{{< /ui >}}.
2. Escriba el cuerpo de su aserción.
3. Opcionalmente, seleccione un elemento de destino en la interfaz de usuario. 
4. Haga clic en {{< ui >}}Apply{{< /ui >}}.

Para obtener más información sobre las aserciones, consulte [Pasos de prueba de navegador][2].

## Aserte que un elemento no está en la página {#assert-that-an-element-is-not-on-the-page}

Para verificar que un elemento con un ID específico *no* está en la página, utilice `return !document.getElementById("<ELEMENT_ID>");`.

Para verificar que los elementos *no* están en la página y devolver el número de elementos en el error de consola, agregue lo siguiente en el cuerpo de la aserción:

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

Los resultados de su prueba de navegador incluyen `console.error` registros, con un máximo de 4 registros permitidos por función de JavaScript. Considere combinar los registros para mejorar la claridad y la eficiencia.

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="Registros de error de consola que aparecen en la pestaña Errores y advertencias en el panel lateral del paso de prueba de navegador." style="width:80%;" >}}

## Aserte que un botón de opción está marcado {#assert-that-a-radio-button-is-checked}

Para verificar que un botón de opción está marcado, utilice `return document.querySelector("<SELECTORS>").checked === true;` en el cuerpo de la aserción.

## Establezca el valor de un elemento de almacenamiento local especificado {#set-the-value-of-a-specified-local-storage-item}

Para establecer el valor de un elemento de almacenamiento local especificado, agregue lo siguiente en el cuerpo de la aserción:

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

Por ejemplo, para establecer el número de milisegundos transcurridos desde el 1 de enero de 1970, 00:00:00 UTC en \"mytime\":

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

`localStorage` se puede acceder en otras aserciones de JavaScript si necesita comparar valores específicos:

{{< code-block lang="javascript" >}}
localStorage.getItem("mytime");
return true
{{< /code-block >}}

## Aserte que el texto contenido en un PDF renderizado {#assert-on-text-contained-in-a-rendered-pdf}

Puede utilizar una biblioteca externa para probar el contenido de un PDF renderizado. 

Para cargar bibliotecas externas, utilice una promesa en el cuerpo de la aserción:

{{< code-block lang="javascript" filename="Custom JavaScript" collapsible="true" >}}
const script = document.createElement('script');
script.type = 'text/javascript';
//load external library
script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
const promise = new Promise((r) => script.onload = r)
document.head.appendChild(script)

await promise

var loadingTask = pdfjsLib.getDocument("<PDF_URL>");
return await loadingTask.promise.then(function(pdf) {
    return pdf.getPage(1).then(function(page) {
        return page.getTextContent().then(function(content) {
            return content.items[0].str.includes("<CONTENT_STRING>")
        })
    })
});
{{< /code-block >}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/
[2]: /es/synthetics/browser_tests/test_steps/?tab=testanelementontheactivepage#assertion