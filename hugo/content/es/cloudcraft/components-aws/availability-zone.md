---
title: Componente Zona de disponibilidad
---
## Información general

Utiliza el componente Zona de disponibilidad para representar las zonas de disponibilidad de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/availability-zone/component-availability-zone-diagram.png" alt="Captura de un diagrama de Cloudcraft isométrico que muestra el componente 'Zona de disponibilidad' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar tu componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o introduce el valor hexadecimal del color para el componente. El componente puede utilizar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Elevar**: Eleva el componente Zona de disponibilidad por encima de otras zonas de disponibilidad.
- **Bajar**: Baja el componente Zona de disponibilidad por debajo de otras zonas de disponibilidad.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente Zona de disponibilidad:

```json
{
  "type": "zone",
  "id": "a46cfaf2-ce78-4d44-9a41-a55fc7cd4ceb",
  "region": "us-east-2",
  "mapPos": [-6.75, 10.25],
  "mapSize": [2.5, 2.5],
  "color": {
    "2d": "#000000",
    "isometric": "#000000"
  },
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5",
  "locked": true
}
```

- **tipo: zona**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **región: cadena**: Región AWS a la que pertenece la zona de disponibilidad. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **mapPos: [número, número]**. Posición del componente en el plano, expresada como un par de coordenadas x-y.
- **mapSize: [número, número]**. Tamaño de la zona de disponibilidad en el plano.
- **color: objeto**. Color de relleno de la zona de disponibilidad.
  - **isométrico: cadena**. Color de relleno del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno del componente en la vista 2D. Debe ser un color hexadecimal.
- **enlace: uri**. Vincula el componente a otro diagrama, utilizando el formato `blueprint://ID`, o a un sitio web externo, utilizando el formato `https://LINK`.
- **bloqueado: booleano**. Si es `true`, los cambios realizados en el componente utilizando la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/