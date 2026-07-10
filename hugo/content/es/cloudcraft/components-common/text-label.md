---
title: Componente Etiqueta de texto
---

## Información general

El componente Etiqueta de texto puede utilizarse para etiquetar componentes, iconos y áreas en un diagrama, aumentando la legibilidad y el atractivo visual.

{{< img src="cloudcraft/components-common/text-label/component-text-label.png" alt="Captura de pantalla de una representación 3D del componente Etiqueta de texto en Cloudcraft" responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color predefinido o introduce el valor hexadecimal del color. Acepta el mismo color para las vistas 2D y 3D, o colores diferentes para cada una.
- **Toggle 3D/2D projection** (Conmutar entre proyección 3D/2D): muestra la etiqueta en vista 3D o 2D.
- **Toggle flat/standing projection** (Conmutar entre proyección plana y vertical): muestra la etiqueta en plano o vertical. No disponible cuando la proyección 2D está activada.
- **Size** (Tamaño): el tamaño de la etiqueta de texto. Acepta un valor máximo de 112.
- **Rotate item** (Girar elemento): gira el componente de etiqueta de texto y cambia su dirección.
- **Outline** (Contorno): añade un contorno a la etiqueta de texto para aumentar el contraste de color.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de etiqueta de texto:

```json
{
  "type": "isotext",
  "id": "8f2a0f5f-c373-42dd-b4df-f06f455f5f94",
  "mapPos": [3.5, 9],
  "text": "Hello world!",
  "textSize": 56,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "outline": true,
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "https://blog.cloudcraft.co/welcome-to-cloudcraft/",
  "locked": true
}
```

- **type: isotext**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **mapPos: [number, number]**: la posición del componente en el plano, expresada como un par de coordenadas x,y.
- **text: string**: el texto utilizado para la etiqueta.
- **textSize: number**: el tamaño de la etiqueta de texto. Por defecto es 25.
- **isometric: boolean**: si es true, la etiqueta se muestra utilizando una proyección 3D, mientras que false muestra la etiqueta en una proyección 2D. Por defecto es true.
- **standing: boolean**: si es true, muestra la etiqueta vertical en lugar de plano. Por defecto es false.
- **direction: string**: la rotación o dirección de la etiqueta. Acepta `down, up, right, left` como valor, con `down` por defecto.
- **outline: booleano**: si es true, añade un contorno al texto para aumentar el contraste de color. Por defecto es false.
- **color: object**: el color de relleno para el componente.
  - **isometric: string**: color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: componente de enlace a otro diagrama en el formato `blueprint://ID` o a un sitio web externo en el formato `https://LINK`.
- **locked: boolean**: si es true, los cambios en el componente a través de la aplicación se desactivan hasta que se desbloquee.

[1]: https://developers.cloudcraft.co/