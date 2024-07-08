---
description: Te contamos cómo usar aserciones JavaScript personalizadas en tests de
  navegador de Synthetics.
further_reading:
- link: /synthetics/browser_tests/actions/
  tag: Documentación
  text: Pasos de los tests de navegador
- link: /synthetics/browser_tests/advanced_options/
  tag: Documentación
  text: Configurar opciones avanzadas en los pasos de los tests
- link: /synthetics/guide/popup/#moving-popups
  tag: Documentación
  text: Gestionar las ventanas emergentes que aparecen de manera inesperada
title: Usar aserciones JavaScript personalizadas en tests de navegador
---

## Información general

En este artículo te explicamos cómo probar una interfaz de usuario (IU) usando código JavaScript personalizado en los [tests de navegador][1]. En las aserciones JavaScript se puede usar código tanto síncrono como asíncrono.

Para crear una aserción con JavaScript personalizado, sigue estos pasos:

1. Haz clic en **Assertion** (Aserción) y selecciona **Test your UI with custom JavaScript** (Prueba tu IU con JavaScript personalizado).
2. Escribe el cuerpo de la aserción.
3. Si quieres, puedes seleccionar un elemento objetivo de la IU.
4. Haz clic en **Apply** (Aplicar).

Para obtener más información sobre las aserciones, consulta [Pasos del test de navegador][2].

## Declarar que un elemento no está en la página

Para verificar que un elemento con un ID específico *no* está en la página, usa `return !document.getElementById("<ELEMENT_ID>");`.

Para verificar que los elementos *no* están en la página y devolver el número de elementos en el error de la consola, añade lo siguiente en la aserción del cuerpo:

{{< code-block lang="javascript" >}}
var element = document.querySelectorAll("<SELECTORS>");
if ( element.length > 0 ){
    console.error(element.length+"  "+"elements exist");
} 
return element.length === 0;
{{< /code-block >}}

Los resultados de los tests de navegador contienen logs `console.error`. 

{{< img src="synthetics/guide/custom-javascript-assertion/step_results.png" alt="Logs de error de la consola en la pestaña Errors & Warnings (Errores y avisos) junto a los pasos del test" style="width:80%;" >}}

## Declarar que un botón de opción está marcado

Para verificar que se ha marcado un botón de selección, introduce `return document.querySelector("<SELECTORS>").checked = true;` en la aserción del cuerpo.

## Establecer el valor de un elemento del almacenamiento local concreto

Para establecer el valor de un elemento del almacenamiento local concreto, añade lo siguiente a la aserción del cuerpo:

{{< code-block lang="javascript" >}}
localStorage.setItem(keyName, keyValue);
return true
{{< /code-block >}}

Por ejemplo, para darle el valor "mytime" al número de milisegundos que han transcurrido desde las 00:00:00 UTC del 1 de enero de 1970, utiliza lo siguiente:

{{< code-block lang="javascript" >}}
localStorage.setItem("mytime", Date.now());
return true
{{< /code-block >}}

## Hacer declaraciones sobre el texto que contiene un PDF

Puedes usar bibliotecas externas para probar el contenido de un PDF que se muestra.

Para cargar las bibliotecas externas, utiliza una promesa en la aserción del cuerpo:

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

## Leer más

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/browser_tests/
[2]: /es/synthetics/browser_tests/actions/?tab=testanelementontheactivepage#assertion