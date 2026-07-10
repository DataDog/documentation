---
title: Componente Kinesis Stream
---
## Información general

Utiliza el componente Kinesis Stream para representar flujos de datos en tiempo real desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/kinesis-stream/component-kinesis-stream-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Kinesis Stream' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Rotate item** (Rotar elemento): rota el componente Kinesis y cambia su dirección.
- **Shards** (Fragmentos): introduce el número de fragmentos para los datos de flujo de datos de Kinesis.
- **PUT units (M)** (Unidades de carga útil (M)): introduce el número de unidades de carga útil de `PUT` para los flujos de datos de Kinesis, en millones.
- **Extended data retention** (Retención de datos ampliada): amplía el almacenamiento de los flujos de datos de Kinesis más allá de 24 horas.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente Kinesis Stream:

```json
{
  "type": "kinesisstream",
  "id": "cc3c417b-3b09-4dff-bc22-52398b86adb6",
  "region": "us-west-2",
  "mapPos": [0,10],
  "direction": "down",
  "shards": 1,
  "putUnits": 500,
  "extendedRetention": true,
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/kinesis/data-streams/",
  "locked": true
}
```

- **type: kinesisstream**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de Kinesis stream. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **direction: string**: la rotación o dirección del componente. Los valores aceptados son `down` y `right`. Por defecto es `down`.
- **shards: number**: el número de fragmentos para los flujos de datos de Kinesis. Por defecto es `1`.
- **putUnits: number**: el número de unidades de carga útil `PUT` para los flujos de datos de Kinesis, en millones. Por defecto es `500`.
- **extendedRetention: boolean**: si es `true`, almacena flujos de datos de Kinesis durante más de 24 horas. Por defecto es `false`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/