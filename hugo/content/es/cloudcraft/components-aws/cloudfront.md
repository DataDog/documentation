---
title: Componente CloudFront
---
## Información general

Utiliza el componente CloudFront para representar CloudFront desde tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/cloudfront/component-cloudfront-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'CloudFront' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente CloudFront:

```json
{
  "type": "cloudfront",
  "id": "215b4ef1-dfce-4360-a0d1-e109a2e58f0c",
  "mapPos": [1,2],
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/cloudfront/",
  "locked": true
}
```

- **type: cloudfront**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: Color de realce para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/