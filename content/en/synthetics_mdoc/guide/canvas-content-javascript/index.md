---
title: Asserting canvas content with JavaScript
description: >-
  Learn how to test and assert canvas content in Synthetic Browser Tests using
  JavaScript pixel analysis, color detection, and simulated user interactions.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Asserting canvas content with JavaScript
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/canvas-content-javascript/index.html
---

# Asserting canvas content with JavaScript

## Overview{% #overview %}

Canvas content is rendered as raw pixel data rather than as structured HTML elements. This means you cannot target elements within a canvas using traditional selectors like XPath or CSS, since there is no underlying DOM representation of the visual content. As a result, actions such as **click** or **hover** cannot interact with elements drawn inside a canvas.

To address this, you can leverage [custom JavaScript assertions](https://docs.datadoghq.com/synthetics/guide/custom-javascript-assertion/) to analyze the canvas's pixel data and verify that the expected content is present.

## What is an HTML canvas?{% #what-is-an-html-canvas %}

The [`canvas`](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) element is an HTML tag that provides a drawable region in the browser, allowing you to render dynamic graphics using JavaScript. It's commonly used for displaying visual content such as charts, graphs, image editing tools, and animations.

Supported by all major modern browsers, the `<canvas>` element is versatile. When combined with JavaScript libraries such as `Chart.js` or `D3.js`, it can render interactive visualizations that respond to user actions like clicks or hovers, enabling features such as custom tooltips or highlighting datapoints.

{% video
   url="https://datadog-docs.imgix.net/images//synthetics/guide/canvas-content-javascript/graph.mp4" /%}

## Interacting with a canvas{% #interacting-with-a-canvas %}

To work with a canvas element in JavaScript:

- Select the canvas using `document.getElementById()` or `document.querySelector()` and assign it to a variable.
- Get the rendering context by calling the `.getContext()` method on the canvas element, specifying the context type. The most common is `'2d'` for [two-dimensional graphics](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext#parameters).

For example, define your canvas element:

```javascript
<canvas id="canvas_ID"></canvas>
```

Then, adjust its content with JavaScript:

```javascript
//Store the canvas in a variable using its identifier
const canvas_variable = document.getElementById("canvas_ID");
//Obtain the context
const ctx = canvas_variable.getContext("2d");
//This code draws a green rectangle
ctx.fillStyle = "green";
ctx.fillRect(10, 10, 150, 100);
```

Mozilla offers this [playground](https://developer.mozilla.org/en-US/play), where you can experiment with, copy, and modify this example.

## Finding a pixel based on a color{% #finding-a-pixel-based-on-a-color %}

Confirm that the following graph uses the expected colors coral and green:

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/canvas-content-javascript/canvas_screenshot.8153df6fc2ea21689212c662b8ffdc8f.png?auto=format"
   alt="Example site traffic graph." /%}

- The most effective approach is to locate at least one pixel rendered in coral and one in green. Start by identifying a pixel that matches the coral color.

- The following script demonstrates how to loop through the `x, y` coordinates of the canvas to assert that at least one of its pixels matches the target color:

{% collapsible-section #JavaScript_assertion %}
#### Example JavaScript assertion

```javascript
// Defining the canvas element as a Variable
const canvas = document.querySelector('canvas_ID');

// Obtain the context
const ctx = canvas.getContext('2d');

/* 
 Collect the full canvas area starting at coordinates 0,0

 The variable imageData will contain:
  - width: the width of the canvas
  - height: the height of the canvas
  - data: an array containing the RGBA values of every pixel within the canvas
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
```

**Notes**:

`maxDistance`: This variable indicates how similar the current pixel's color is to the target color.

- A distance of 0 means an exact match.
- A distance of 20 means a small visual variation, not noticeable to the human eye.

`const data = imageData.data;`: The `imageData.data` variable is a typed array where each pixel is represented by four consecutive values: `[R, G, B, A, R, G, B, A, ...]`. This means every pixel occupies 4 bytes, regardless of whether the canvas uses transparency.

- The first pixel's data is at indexes `0–3: data[0] = red, data[1] = green, data[2] = blue, data[3] = alpha`

- The second pixel begins at index 4, and so on. This is why you should use the following expression to loop through the canvas:

`const index = (y * canvas.width + x) * 4;` and then evaluate non opaque contents with a > 0.

If you know your canvas is fully opaque, you can skip checking the alpha (a) value in your code. However, remember that the alpha channel is still present in the array.
{% /collapsible-section %}

## Clicking on canvas{% #clicking-on-canvas %}

JavaScript allows you to programmatically trigger events on elements, enabling you to simulate user interactions. You can use the `addEventListener()` method to make HTML elements respond to specific actions, such as clicks.

After a listener is set up, you can dispatch (or trigger) a click event. With this approach, you can create a custom function to simulate a user click at specific coordinates:

{% collapsible-section #Custom_function %}
#### Custom function example

```javascript
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
```

{% /collapsible-section %}

## Asserting on elements triggered by clicks{% #asserting-on-elements-triggered-by-clicks %}

Now that the key pieces are in place, you can build a complete flow that includes a Synthetics assertion. In the following example, the test:

- Scans the canvas for the first pixel matching a target color
- Simulates a click at that location

{% collapsible-section #Canvas_interaction %}
#### Canvas interaction

```javascript
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
```

{% /collapsible-section %}

Based on the behavior of your app, **click** actions display or add a new HTML element (such as a `div`) that you can assert against.

## Troubleshooting{% #troubleshooting %}

Working with `<canvas>` elements and JavaScript interactions can be complex, especially for users unfamiliar with browser scripting. The examples in this article are provided as general guidance and can be adapted to fit specific use cases.

**Note**: Datadog support can assist with issues related to how Synthetic Monitoring interacts with `<canvas>`, but cannot provide debugging support for custom JavaScript implementations.

Below are tips and common questions that may help guide you through troubleshooting.

### Get exact coordinates{% #get-exact-coordinates %}

To determine the x and y coordinates of where you clicked on the `<canvas>`, use `console.log` to add a print statement to the `addEventListener` method. This will print the coordinates to the browser's [DevTools Console](https://developer.chrome.com/docs/devtools/console/log#javascript).

{% collapsible-section id="Add listener" %}
#### Add listener with console.log

```javascript
const canvas = document.querySelector('canvas_selector');
canvas.addEventListener('click', function(event) {
  const canvasRect = canvas.getBoundingClientRect();
  const x = event.clientX - canvasRect.left;
  const y = event.clientY - canvasRect.top;
  console.log('Clicked at relative canvas position:', x, y);
});
```

{% /collapsible-section %}

### Choosing the right color{% #choosing-the-right-color %}

A good starting point is to inspect CSS styles using your browser's Developer Tools. Most styles include the color's RGB definition.

The canvas element only supports RGBA color values. Formats like HEX are not supported. If you have a HEX color, you need to convert it to RGBA using an online tool or a conversion script.

## Need help?{% #need-help %}

Contact [Datadog support](https://docs.datadoghq.com/help) for further assistance.

## Further Reading{% #further-reading %}

- [Learn about Browser Tests](https://docs.datadoghq.com/synthetics/browser_tests)
