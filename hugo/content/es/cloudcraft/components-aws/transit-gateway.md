---
title: Componente Transit Gateway
---
## Información general

Utiliza el componente Transit Gateway para representar anexos de pasarelas de tránsito desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/transit-gateway/component-transit-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Transit Gateway' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.
- **Conexiones**: Número de anexos conectados a la pasarela de tránsito.
- **Datos procesados**: Volumen total de datos procesados al mes en gigabytes.
- **Girar**: Gira el componente para cambiar su dirección.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente Transit Gateway:

```json
{
  "type": "transitgateway",
  "id": "72a56c65-c453-41c4-85d5-e6bda4b03275",
  "region": "us-east-1",
  "mapPos": [-0.5,14],
  "connections": 2,
  "dataGb": "10",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "direction": "down",
  "link":"blueprint://1127e451-7e09-44bd-9dac-12eef90775c6",
  "locked":true
}
```

- **type: transitgateway**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **region: string**: Región de AWS en la que se despliega la pasarela de tránsito. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **connections: number**: Número de anexos conectados a la pasarela de tránsito.
- **dataGb: number**: Volumen de datos procesados al mes por la pasarela en gigabytes.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: Color de realce para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal.
- **direction: string**: Rotación o dirección del componente. Los valores aceptados son `down` o `right`. Por defecto es `down`.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/