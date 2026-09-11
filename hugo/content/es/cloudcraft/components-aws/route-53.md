---
title: Componente Route 53
---
## Información general

Utiliza el componente Route 53 para representar dominios de tu arquitectura Amazon Web Services utilizando el servicio DNS de Route 53.

{{< img src="cloudcraft/components-aws/route-53/component-route-53-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Route 53' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente Route 53:

```json
{
  "type": "r53",
  "id": "c311184b-2d15-4d29-9a17-bb33778f04c8",
  "mapPos": [5,12],
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "link": "https://blog.cloudcraft.co/",
  "locked": true
}
```

- **type: r53**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: Color de realce para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://id` o a un sitio web externo con el formato `https://link`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/