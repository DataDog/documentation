---
description: Aprende a probar y afirmar el contenido del lienzo en tests de navegador
  Synthetic utilizando el análisis de píxeles, la detección de colores y las interacciones
  simuladas de usuarios de JavaScript.
further_reading:
- link: /synthetics/browser_tests
  tag: Documentación
  text: Más información sobre los tests de navegador
title: Afirmación del contenido del lienzo con JavaScript
---

## Información general

El contenido del lienzo se representa como datos de píxeles sin procesar, en lugar de elementos HTML estructurados. Esto significa que no puedes apuntar a elementos dentro de un lienzo utilizando selectores tradicionales como XPath o CSS, ya que no existe una representación DOM subyacente del contenido visual. Como resultado, acciones como **hacer clic** o **pasar el cursor por encima** no pueden interactuar con elementos dibujados dentro de un lienzo.

Para solucionarlo, puedes utilizar [aserciones personalizadas de JavaScript][1] para analizar los datos de píxeles del lienzo y verificar que el contenido esperado está presente.

## ¿Qué es un lienzo HTML?

El elemento [`canvas`][2] es una etiqueta (tag) HTML que proporciona una región dibujable en el navegador, lo que permite representar gráficos dinámicos mediante JavaScript. Se utiliza habitualmente para mostrar contenido visual, como tablas, gráficos, herramientas de edición de imágenes y animaciones.

Compatible con los principales navegadores modernos, el elemento `<canvas>` es versátil. Cuando se combina con bibliotecas JavaScript como `Chart.js` o `D3.js`, puede mostrar visualizaciones interactivas que responden a acciones del usuario como hacer clic o pasar el cursor por encima de un elemento, lo que permite funciones como información sobre tooltips personalizados o el resaltado de puntos de datos.

{{< img src="/synthetics/guide/canvas-content-javascript/graph.mp4" alt="Gráfica de una métrica en Datadog utilizando el Metrics Explorer." video=true >}}

## Interacción con un lienzo

Para trabajar con un elemento lienzo en JavaScript:

- Seleccione el lienzo utilizando `document.getElementById()` o `document.querySelector()` y asígnalo a una variable.
- Obtén el contexto de presentación llamando al método `.getContext()` en el elemento lienzo, especificando el tipo de contexto. El más frecuente es `'2d'` para [gráficos bidimensionales][4].

Por ejemplo, define tu elemento lienzo:

```javascript
<canvas id="canvas_ID"></canvas>
```

A continuación, ajusta su contenido con JavaScript:

```javascript
//Store the canvas in a variable using its identifier
const canvas_variable = document.getElementById("canvas_ID");
//Obtain the context
const ctx = canvas_variable.getContext("2d");
//This code draws a green rectangle
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```

Mozilla ofrece este [parque de juegos][5], donde puedes experimentar, copiar y modificar este ejemplo.

## Buscar un píxel en función de un color

Confirma que el siguiente gráfico utiliza los colores coral y verde esperados:

{{< img src="/synthetics/guide/canvas-content-javascript/canvas_screenshot.png" alt="Gráfico de tráfico de sitio de ejemplo." >}}

- La estrategia más eficaz consiste en localizar al menos un píxel de color coral y otro de color verde. Empieza por identificar un píxel que coincida con el color coral.

- El siguiente script muestra cómo recorrer las coordenadas `x, y` del lienzo para afirmar que al menos uno de sus píxeles coincide con el color de destino:

{{% collapse-content title="Comprobación JavaScript de ejemplo" level="h4" expanded=false id="JavaScript_assertion" %}}
{{< code-block lang="javascript" >}}

// Defining the canvas element as a Variable
const canvas = document.querySelector('canvas_ID');

// Obtain the context
const ctx = canvas.getContext('2d');

/* 
 Recopila el área completa del lienzo comenzando en las coordenadas 0,0

 La variable imageData contendrá:
  - ancho: el ancho del lienzo
  - altura: la altura del lienzo
  - datos: una matriz que contiene los valores RGBA de cada píxel del lienzo
*/
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Variable that stores the array of RGBA values
const data = imageData.data;

// RGBA definition of the color we are looking for (coral color)
const targetColor = { r: 240, g: 128, b: 128 };

// Tolerance threshold (see note at the bottom)
const maxDistance = 20;

// Function that calculates Euclidean distance
function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt(
    (r1 - r2) ** 2 +
    (g1 - g2) ** 2 +
    (b1 - b2) ** 2
  );
}

// Flag that tells if the pixel color has been found or not
let found = false;

// Loop over the X axis of the canvas
for (let x = 0; x < canvas.width && !found; x++) {

  // Loop over the Y axis of the canvas
  for (let y = 0; y < canvas.height; y++) {

    //See note at the bottom.
    const index = (y * canvas.width + x) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];

    if (a > 0 && colorDistance(r, g, b, targetColor.r, targetColor.g, targetColor.b) < maxDistance) {
      found = true;
      break;
    }
  }
}

// Return the boolean variable to tell if the Step was successful (true) or not (false)
return found;
{{< /code-block >}}

**Notas**:

`maxDistance`: Esta variable indica la similitud entre el color del píxel actual y el color objetivo.

- Una distancia de 0 significa una coincidencia exacta.
- Una distancia de 20 significa una pequeña variación visual, imperceptible para el ojo humano.

`const data = imageData.data;`:
La variable `imageData.data` es una matriz de tipo donde cada píxel está representado por cuatro valores consecutivos: `[R, G, B, A, R, G, B, A, ...]`. Esto significa que cada píxel ocupa 4 bytes, independientemente de si el lienzo utiliza transparencia.

- Los datos del primer píxel están en los índices `0–3: data[0] = red, data[1] = green, data[2] = blue, data[3] = alpha`
- El segundo píxel comienza en el índice 4, y así sucesivamente. Por eso debes utilizar la siguiente expresión para recorrer el lienzo:

    `const index = (y * canvas.width + x) * 4;` y luego evaluar los contenidos no opacos con a > 0.

Si sabes que tu lienzo es totalmente opaco, puedes omitir la comprobación del valor alfa (a) en tu código. Sin embargo, recuerda que el canal alfa sigue presente en la matriz.

{{% /collapse-content %}}

## Hacer clic en el lienzo

JavaScript permite activar eventos mediante programación en elementos, lo que permite simular interacciones de usuario. Puedes utilizar el método `addEventListener()` para hacer que los elementos HTML respondan a acciones específicas, como los clics.

Después de configurar un escuchador, puedes enviar (o activar) un evento de clic. Con esta estrategia, puedes crear una función personalizada para simular un clic del usuario en coordenadas específicas:

{{% collapse-content title="Custom function example" level="h4" expanded=false id="Custom_function" %}}
{{< code-block lang="javascript" >}}
//Store the canvas in a variable using its selector
const canvas = document.querySelector('canvas_selector')

//Add a JavaScript Listener for 'Click' actions.
canvas.addEventListener('click', function(event) {

  //Obtain the bounding box of the canvas to calculate the click position.
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;
});

//Function that simulates a User's Click - expects a canvas and coordinates X,Y.
function simulateCanvasClick(user_canvas, x, y) {

  //Obtain the bounding box of the canvas to calculate the click position.
  const rect = user_canvas.getBoundingClientRect();

  //Define the Click event using the received coordinates
  const click_event = new MouseEvent('click', {
    clientX: rect.left + x,
    clientY: rect.top + y
  });

  // Perform the click
  // Using dispatch will fire the event in line 20
  user_canvas.dispatchEvent(click_event);
}

//Clicks on an element inside a canvas in coordinates 620, 8
simulateCanvasClick(canvas, 620, 8);

{{< /code-block >}}
{{% /collapse-content %}}

## Afirmación de elementos activados por clics

Ahora que las piezas clave están en su lugar, puedes crear un flujo completo que incluya una aserción Synthetic. En el siguiente ejemplo, el test:

- Busca en el lienzo el primer píxel que coincida con un color objetivo
- Simula un clic en esa ubicación

{{% collapse-content title="Canvas interaction" level="h4" expanded=false id="Canvas_interaction" %}}
{{< code-block lang="javascript" >}}
// Defining the canvas element as a Variable
const canvas = document.querySelector('canvas_selector');

// Obtain the context
const ctx = canvas.getContext('2d');

// Add a JavaScript Listener for 'Click' actions.
canvas.addEventListener('click', function(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;
  console.log('Clicked at relative canvas position:', x, y);
});

// Function that simulates a User's Click - expects a canvas and coordinates X,Y.
function simulateCanvasClick(user_canvas, x, y) {
  const rect = user_canvas.getBoundingClientRect();
  const click_event = new MouseEvent('click', {
    clientX: rect.left + x,
    clientY: rect.top + y
  });
  user_canvas.dispatchEvent(click_event);
}

// Collect the full canvas area starting in coordinates 0,0
const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

// Variable that stores the array of RGBA values
const data = imageData.data;

// RGBA definition of the color we are looking for (adjust the RGB values)
const targetColor = { r: A, g: B, b: C };

// Tolerance threshold
const maxDistance = 20;

// Function that calculates Euclidean distance
function colorDistance(r1, g1, b1, r2, g2, b2) {
  return Math.sqrt(
    (r1 - r2) ** 2 +
    (g1 - g2) ** 2 +
    (b1 - b2) ** 2
  );
}

// Flag that tells if the pixel color has been found or not
let found = false;

// Loop over the canvas
for (let x = 0; x < canvas.width && !found; x++) {
  for (let y = 0; y < canvas.height; y++) {
    const index = (y * canvas.width + x) * 4;
    const r = data[index];
    const g = data[index + 1];
    const b = data[index + 2];
    const a = data[index + 3];

    if (colorDistance(r, g, b, targetColor.r, targetColor.g, targetColor.b) < maxDistance) {
      found = true;
      simulateCanvasClick(canvas, x, y);
      break;
    }
  }
}

return found;
{{< /code-block >}}
{{% /collapse-content %}}

 En función del comportamiento de tu aplicación, las acciones de **clic** muestran o añaden un nuevo elemento HTML (como `div`) con el que puedes hacer afirmaciones.

## Solucionar problemas

Trabajar con elementos de `<canvas>` e interacciones de JavaScript puede resultar complejo, especialmente para los usuarios que no están familiarizados con scripts de navegador. Los ejemplos de este artículo se ofrecen como guía general y pueden adaptarse a casos de uso específicos.

**Nota**: El servicio de asistencia de Datadog puede ayudar con problemas relacionados con cómo la monitorización Synthetic interactúa con `<canvas>`, pero no puede proporcionar ayuda para depurar despliegues personalizados de JavaScript.

A continuación encontrarás consejos y preguntas habituales que pueden servirte de guía para la resolución de problemas.

### Obtener coordenadas exactas

Para determinar las coordenadas x e y del lugar donde hiciste clic en `<canvas>`, utiliza `console.log` para añadir una sentencia de impresión al método [`addEventListener`](#clicking-on-canvas). Esto imprimirá las coordenadas en la [consola de DevTools][8] del navegador.

{{% collapse-content title="Agregar escuchador con console.log" level="h4" expanded=false id="Add listener" %}}
{{< code-block lang="javascript" >}}
const canvas = document.querySelector('canvas_selector');
canvas.addEventListener('click', function(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;
  console.log('Clicked at relative canvas position:', x, y);
});
{{< /code-block >}}
{{% /collapse-content %}}

### Elegir el color adecuado

Un buen punto de partida es inspeccionar los estilos CSS utilizando las herramientas de desarrollo de tu navegador. La mayoría de los estilos incluyen la definición RGB del color.

El elemento lienzo solo admite valores de color RGBA. Formatos como HEX no son compatibles. Si tienes un color HEX, necesitas convertirlo a RGBA utilizando una herramienta online o un script de conversión.

## ¿Necesitas ayuda?

Ponte en contacto con el [servicio de asistencia de Datadog][7] para obtener más ayuda.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/guide/custom-javascript-assertion/
[2]: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
[4]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#parameters
[5]: https://developer.mozilla.org/en-US/play
[6]: https://julinvictus.github.io/canvas_example/
[7]: /es/help
[8]: https://developer.chrome.com/docs/devtools/console/log#javascript