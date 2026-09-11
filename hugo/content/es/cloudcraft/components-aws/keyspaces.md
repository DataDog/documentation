---
title: Componente Keyspaces
---
## Información general

Utiliza el componente Keyspaces para visualizar servicios de bases de datos Apache compatibles con Cassandra desde tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/keyspaces/component-keyspaces-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color de realce para su símbolo. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Modo de capacidad**: Selecciona el modo de capacidad de tu base de datos Keyspaces.
- **Escrituras (millones)**: Introduce el volumen total de escrituras en la base de datos en millones.
- **Lecturas (millones)**: Introduce el volumen total de lecturas de la base de datos en millones.
- **% quórum**: Introduce el porcentaje de tus lecturas que utilizan la constante `LOCAL_QUORUM`.
- **Conjunto de datos (GB)**: Introduce el volumen total de datos de tu base de datos en gigabytes.
- **Eliminaciones TTL (millones)**: Introduce el volumen total de operaciones `DELETE` activadas por el proceso TTL en millones.
- **Recuperación puntual**: Si utilizar o no la recuperación puntual para tu base de datos.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente Keyspaces:

```json
{
    "type": "keyspaces",
    "id": "bd6da627-e07c-497e-bdbc-bec11655112a",
    "region": "us-east-1",
    "mapPos": [6,6],
    "capacityMode": "on-demand",
    "writeUnits": 5,
    "readUnits": 5,
    "quorumPercentage": 0,
    "datasetGb": 10,
    "ttlDeletes": 0,
    "pointInTimeRecoveryEnabled": false,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/keyspaces/",
    "locked": true
}
```

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `keyspaces` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: Identificador único global del componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: Región AWS del componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **capacityMode: string**: Modo de capacidad de la base de datos Keyspaces. Acepta uno de los siguientes valores, `on-demand` o `provisioned`. Por defecto es `on-demand`.
- **writeUnits: number**: Volumen total de escrituras en la base de datos en millones. Por defecto es `5`.
- **readUnits: number**: Volumen total de lecturas de la base de datos en millones. Por defecto es `5`.
- **quorumPercentage: number**: Porcentaje de lecturas que utilizan la constante `LOCAL_QUORUM`. Por defecto es `0`.
- **datasetGb: number**: Volumen total de datos de la base de datos en gigabytes. Por defecto es `10`.
- **ttlDeletes: number**: Volumen total de operaciones `DELETE` activadas por el proceso TTL en millones. Por defecto es `0`.
- **pointInTimeRecoveryEnabled: boolean**: Si utilizar o no la recuperación puntual para la base de datos. Por defecto es `false`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#3B48CC`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos, `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/