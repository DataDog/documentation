---
title: Componente de Glacier
---
## Información general

Utiliza el componente de Glacier para visualizar las clases de almacenamiento a largo plazo de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/glacier/component-glacier-diagram.png" alt="Captura de pantalla de un diagrama isomético de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Storage (GB)** (Almacenamiento (GB)): introduce el volumen total de almacenamiento disponible para tu bóveda en gigabytes.
- **Retrieval Type** (Tipo de recuperación): elige el tipo de recuperación para tu bóveda.
- **Retrieval Req. / mo (K)** (Requerimiento de recuperación/mes (miles)): introduce el número de solicitudes de recuperación por mes en miles.
- **Retrieval Data (GB)** (Datos recuperados (GB)): introduce el volumen de datos recuperados en gigabytes.
- **Upload Req. / mo (K)** (Req. de carga/mes (miles): introduce el número de solicitudes de carga de recuperación por mes en miles.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente de Glacier:

```json
{
    "type": "glaciervault",
    "id": "a3dd25ed-5508-43f3-9041-8bd480906514",
    "region": "us-east-1",
    "mapPos": [4,6],
    "storageDataGb": 10,
    "retrievalType": "standard",
    "retrievalDataGb": 0,
    "retrievalRequests": 0,
    "uploadRequests": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3F8624"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/glacier/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `glaciervault` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][6].
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **storageDataGb: number**: el volumen total de almacenamiento disponible para la bóveda de Glacier en gigabytes. Por defecto es `10`.
- **retrievalType: string**: el tipo de recuperación para la bóveda de Glacier. Acepta una de tres opciones: `expedited`, `standard` o `bulk`. Por defecto es `standard`.
- **retrievalDataGb: number**: el volumen de datos recuperados en gigabytes. Por defecto es `0`.
- **retrievalRequests: number**: el número de solicitudes de recuperación por mes en miles. Por defecto es `0`.
- **uploadRequests: number**: el número de solicitudes de carga por mes en miles. Por defecto es `0`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#3F8624`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/