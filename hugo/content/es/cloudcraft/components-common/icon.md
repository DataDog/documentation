---
title: Componente Icono
---

## Información general

El componente Icono es uno de los componentes básicos disponibles. Junto con Imágenes** y Bloques, puede utilizarse para representar componentes de nube aún no disponibles.

{{< img src="cloudcraft/components-common/icon/component-icon.png" alt="Captura de pantalla de una representación 3D del componente Icono en Cloudcraft" responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color de fondo y de icono predefinido o introduce el valor hexadecimal del color. Acepta el mismo color para las vistas 2D y 3D, o colores diferentes para cada una.
- **Icon set** (Conjunto de iconos): selecciona el conjunto de iconos que contiene el icono necesario. Los conjuntos disponibles son AWS, AWS (legacy), Azure y Font Awesome.
- **Icon name** (Nombre del icono): nombre del icono utilizado en el diagrama. Este campo también se puede utilizar para buscar iconos disponibles.
- **Toggle 3D/2D projection** (Conmutar proyección 3D/2D): muestra el icono en una vista 3D o 2D cuando el propio diagrama está en vista 3D. No disponible para diagramas 2D.
- **Toggle flat/standing projection** (Conmutar entre proyección plana y proyección vertical): muestra la etiqueta en plano o vertical. No disponible cuando la proyección 2D está activada o en diagramas 2D.
- **Size** (Tamaño): aumenta o disminuye el tamaño de un icono.
- **Rotate item** (Girar elemento): gira un icono y cambia su dirección.
- **Raise** (Elevar): eleva el componente del icono por encima de otros iconos.
- **Lower** (Bajar): baja el componente del icono debajo de otros iconos.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Icono:

```json
{
  "type": "icon",
  "id": "a65bf697-3f17-46dd-8801-d38fcc3827b6",
  "mapPos": [4.5, 13.5],
  "iconSet": "fa",
  "name": "firefox",
  "iconSize": 6,
  "isometric": true,
  "standing": false,
  "direction": "down",
  "color": {
    "2d": "#ffffff",
    "isometric": "#ffffff"
  },
  "background": {
    "2d": "#000000",
    "isometric": "#0e141f"
  },
  "link": "blueprint://5dccf526-bb9b-44ba-abec-3b5e7c8076a6",
  "locked": true
}
```

- **type: icon**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **mapPos: [number, number]**: la posición del componente en el plano, expresada como un par de coordenadas x,y.
- **iconSet: string**: nombre del conjunto de iconos utilizado. Acepta uno de `aws, aws2, azure, fa` como valor.
- **name: string**: nombre del icono dentro del conjunto de iconos. Los nombres se pueden encontrar dentro de la aplicación utilizando la barra de herramientas de componentes.
- **iconSize: number**: tamaño del icono. Por defecto es 3.
- **isometric: boolean**: si es true, el icono se muestra utilizando una proyección 3D, mientras que false muestra la etiqueta en una proyección 2D. Por defecto es true.
- **standing: boolean**: si es true, muestra el icono vertical en lugar de plano. Por defecto es false.
- **direction: string**: la rotación o dirección del icono. Acepta `down, up, right, left` como valor, con `down` por defecto.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **background: object**: el color de fondo del componente.
  - **isometric: string**: color de fondo para el icono en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: color de fondo para el icono en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: componente de enlace a otro diagrama en el formato `blueprint://ID` o a un sitio web externo en el formato `https://LINK`.
- **locked: boolean**: si es true, los cambios en el componente a través de la aplicación se desactivan hasta que se desbloquee.

[1]: https://developers.cloudcraft.co/