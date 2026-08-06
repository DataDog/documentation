---
title: Componente de SQS
---
## Información general

Utiliza el componente de SQS para representar colas de mensajes de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/sqs/component-sqs-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'SQS'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Rotate item** (Girar elemento): gira el componente y cambia su dirección.
- **Type** (Tipo): selecciona el tipo de cola de mensajes para la instancia de SQS.
- **Req./month (M)** (Solicitudes/mes (millones)): introduce el número de solicitudes enviadas al mes, en millones.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente de SQS:

```json
{
  "type": "sqs",
  "id": "c671ec0c-3103-4312-9c85-286a58dbc457",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "queueType": "standard",
  "requests": 1,
  "color": {
    "isometric": "#ececed",
    "2d": "#cc2264"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/sqs/",
  "locked": true
}
```

- **type: sqs**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega SQS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **direction: string**: La rotación o dirección del componente. Los valores aceptados son `down`, `up`, `right` o `left`. Por defecto es `down`.
- **queueType: string**: el tipo de cola de mensajes para la instancia de SQS. Los valores aceptados son `standard` o `fifo`.
- **requests: number**: el número de solicitudes enviadas al mes, en millones. Por defecto es `1`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/