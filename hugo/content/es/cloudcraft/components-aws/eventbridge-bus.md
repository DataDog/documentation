---
title: Componente de EventBridge Bus
---

## Información general

Utiliza el componente de EventBridge Bus para representar buses de eventos serverless de tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/eventbridge-bus/component-eventbridge-bus-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de 'EventBridge Bus'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color de realce para su símbolo. Puedes utilizar los mismos colores en las vistas 2D y 3D o colores diferentes en cada una.
- **Tipo**: Selecciona el tipo de tu bus de evento.
- **Tamaño del evento**: Introduce el tamaño de tu evento en kilobytes.
- **Eventos personalizados/mes**: Introduce el número de eventos personalizados procesados por mes en millones.
- **Eventos de socios/mes**: Introduce el número de eventos de socios procesados por mes en millones.
- **Eventos entre regiones/mes**: Introduce el número de eventos entre regiones procesados por mes en millones.
- **Eventos bus-2-bus/mes**: Introduce el número de eventos de bus a bus procesados por mes en millones.
- **Girar elemento**: Gira el componente para cambiar su dirección.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente de EventBridge Bus:

```json
{
    "type": "eventbus",
    "id": "2791cea2-f727-428f-a504-3358bfcba66f",
    "region": "us-east-1",
    "mapPos": [-2,11],
    "direction": "down",
    "eventBusType": "default",
    "eventSize": 1,
    "numCustomEvents": 0,
    "numPartnerEvents": 0,
    "numCrossRegionEvents": 0,
    "numBus2BusEvents": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/eventbridge/",
    "locked": true
}
```

- **type: string**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **arn: string**: Identificador único global del componente dentro de AWS, conocido como [Nombre de recurso de Amazon](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html).
- **region: string**: Región de AWS en la que se despliega el balanceador de carga. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **direction: string**: Rotación del dispositivo en el plano. Acepta uno de dos valores, `down` o `right`. Por defecto es `down`.
- **eventBusType: string**: Tipo de bus de evento. Acepta uno de dos valores, `default` o `custom`. Por defecto es `default`.
- **eventSize: number**: Tamaño del evento en kilobytes. Por defecto es `1`.
- **numCustomEvents: number**: Número de eventos personalizados procesados por mes en millones. Por defecto es `0`.
- **numPartnerEvents: number**: Número de eventos de socios procesados por mes en millones. Por defecto es `0`.
- **numCrossRegionEvents: number**: Número de eventos entre regiones procesados por mes en millones. Por defecto es `0`.
- **numBus2BusEvents: number**: Número de eventos de bus a bus procesados por mes en millones. Por defecto es `0`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal. Por defecto es `#ECECED`.
  - **2d: string**: Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal. Por defecto es `#CC2264`.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente sobre el bloque.
  - **isometric: string**: Color de realce para el componente en la vista 3D. Debe ser un color hexadecimal. Por defecto es `#4286C5`.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal. Por defecto es `#FFFFFF`.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.