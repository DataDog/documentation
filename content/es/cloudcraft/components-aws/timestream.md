---
title: Componente Timestream
---
## Información general

Utiliza el componente Timestream para representar y visualizar bases de datos de series temporales serverless desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/timestream/component-timestream-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Written Data (GB)** (Datos escritos (GB)): introduce el volumen total de datos escritos, en gigabytes.
- **Queried Data (GB)** (Datos consultados (GB)): introduce el volumen total de datos consultados, en gigabytes.
- **Memory Storage/hr (GB)** (Almacenamiento de memoria/hora (GB)): introduce la cantidad total de almacenamiento de memoria por hora para tu base de datos de Timestream, en gigabytes.
- **Magnetic Storage/mo (GB)** (Almacenamiento magnético mensual (GB)): introduce la cantidad total de almacenamiento magnético mensual aprovisionado para tu base de datos de Timestream, en gigabytes.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Timestream:

```json
{
    "type": "timestream",
    "id": "1d939183-0078-440a-bcf6-6418c9c2e419",
    "region": "us-east-1",
    "mapPos": [6, 6],
    "writeDataGb": 1,
    "scanDataGb": 1,
    "memoryDataGbHr": 10,
    "magneticDataGbMo": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/timestream/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `timestream` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **writeDataGb: number**: el volumen total de datos escritos, en gigabytes. Por defecto es `100`.
- **scanDataGb: number**: el volumen total de datos consultados, en gigabytes. Por defecto es `100`.
- **memoryDataGbHr: number**: la cantidad total de almacenamiento de memoria disponible por hora para la base de datos, en gigabytes. Por defecto es `1`.
- **magneticDataGbMo: number**: la cantidad total de almacenamiento magnético mensual disponible para la base de datos, en gigabytes. Por defecto es `1000`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `##3B48CC`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/