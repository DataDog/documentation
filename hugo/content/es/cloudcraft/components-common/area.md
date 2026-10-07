---
title: Componente de área
---
## Información general

El componente Área es uno de los mejores componentes disponibles para diseñar y organizar diagramas de gran tamaño. Junto con el componente Etiqueta de texto, se puede utilizar para representar visualmente subredes y direcciones IP, separar arquitecturas de nubes públicas y privadas, entre otros usos.

{{< img src="cloudcraft/components-common/area/component-area.png" alt="Captura de pantalla de una representación 3D del componente de Área en Cloudcraft" responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color de relleno**: selecciona un color predefinido para rellenar el centro del componente de área, o introduce el valor hexadecimal del color. Acepta el mismo color para las vistas 2D y 3D, o colores diferentes para cada una.
- **Elevar**: eleva el componente de área por encima de otras áreas.
- **Bajar**: baja el componente de área por debajo de otras áreas.
- **Color de los bordes**: selecciona un color predefinido para rellenar los bordes del componente de área, o introduce el valor hexadecimal del color. Acepta el mismo color para las vistas 2D y 3D, o colores diferentes para cada una.
- **Añadir sombra**: añade o quita sombra de los bordes para aumentar el contraste.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de Área:

```json
{
  "type": "area",
  "id": "09659366-c3b1-479f-9b4d-37c5753e1674",
  "mapPos": [2, 9],
  "points": [
    [0, 0],
    [4, 0],
    [4, 3],
    [0, 3]
  ],
  "shadow": true,
  "color": {
    "2d": "#e6e7e8",
    "isometric": "#e6e7e8"
  },
  "borderColor": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "link": "blueprint://6f6b20d9-1332-4141-bb74-0e3af3f61801",
  "locked": true
}
```

- **type: area**: El tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **mapPos: [number, number]**: la posición del componente en el plano, expresada como un par de coordenadas x,y.
- **shadow: boolean**: si es true, añade una sombra al borde del área para aumentar el contraste. Por defecto es false.
- **points: [number, number]**: la posición de los puntos utilizados para crear los bordes del área.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **borderColor: object**: el color para el borde del área.
  - **isometric: string**: color del borde para el área en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: color del borde para el área en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: componente de enlace a otro diagrama en el formato `blueprint://ID` o a un sitio web externo en el formato `https://LINK`.
- **locked: boolean**: si es true, los cambios en el componente a través de la aplicación se desactivan hasta que se desbloquee.

[1]: https://developers.cloudcraft.co/