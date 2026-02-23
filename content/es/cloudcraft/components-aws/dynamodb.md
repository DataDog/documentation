---
title: Componente DynamoDB
---
## Información general

Utiliza el componente DynamoDB para representar y visualizar bases de datos NoSQL serverless gestionadas desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/dynamodb/component-dynamodb-diagram.png" alt="Captura de pantalla de un diagrama de Cloudcraft isométrico que muestra el 'componente DynamoDB' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar el componente. Las opciones disponibles son:

- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Clase de tabla**: Selecciona la clase de la tabla de DynamoDB.
- **Modo de capacidad**: Selecciona el modo de capacidad de la tabla de DynamoDB.
- **Conjunto de datos (GiB)**: Introduce el tamaño del conjunto de datos en GiB.
- **Unidades de lectura**: Introduce el número de unidades de capacidad de lectura.
- **Unidades de escritura**: Introduce el número de unidades de capacidad de escritura.
- **Consistencia de lectura**: Selecciona la consistencia de lectura de la tabla de DynamoDB.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente DynamoDB:

```json
{
    "type": "dynamodb",
    "id": "29c1f0fa-3f1c-4566-ad33-ae307feee4f0-0",
    "region": "us-east-1",
    "mapPos": [39,148],
    "tableClass": "standard",
    "capacityMode": "on-demand",
    "datasetGb": 0,
    "readUnits": 0,
    "writeUnits": 0,
    "readConsistency": "strong",
    "color": {
        "isometric": "#ececed",
        "2d": "#ececed"
    },
    "accentColor": {
        "isometric": "#4286c5",
        "2d": "#4286c5"
    },
    "link": "https://aws.amazon.com/dynamodb/",
    "locked": true
}
```

- **type: string**: El tipo de componente. Debe ser `dynamodb`.
- **id: string, uuid**: El identificador único del componente. Normalmente un UUID v4.
- **arn: string**: El [Nombre de recurso de Amazon (ARN)][2] del componente.
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: La posición del componente en el plano, definida como un par de coordenadas `[x, y]`.
- **tableClass: string**: La clase de la tabla de DynamoDB. Acepta `standard` o `standardInfrequentAccess`. Por defecto es `standard`.
- **capacityMode: string**: El modo de capacidad de la tabla de DynamoDB. Acepta `provisioned` o `on-demand`. Por defecto es `provisioned`.
- **datasetGb: number**: El tamaño del conjunto de datos en GiB. Por defecto es `10`.
- **readUnits: number**: El número de unidades de capacidad de lectura. Por defecto es `5`.
- **writeUnits: number**: El número de unidades de capacidad de escritura. Por defecto es `5`.
- **readConsistency: string**: La consistencia de lectura de la tabla de DynamoDB. Acepta `strong` o `eventual`. Por defecto es `strong`.
- **color: objeto**: el color de relleno para el cuerpo del componente.
  - **isometric: cadena**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: cadena**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#ECECED`.
- **accentColor: objeto**: el color de énfasis para el logotipo del componente.
  - **isometric: cadena**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: cadena**: Un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#4286C5`.
- **link: string, uri**: Un URI que vincula el componente con otro diagrama o con un sitio web externo. Acepta los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/