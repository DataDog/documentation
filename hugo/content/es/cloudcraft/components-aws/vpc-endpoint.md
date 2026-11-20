---
title: Componente Endpoint de VPC
---
## Información general

Utiliza el componente Endpoint de VPC para visualizar los endpoints de VPC de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpc-endpoint/component-vpc-endpoint-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Type** (Tipo): selecciona el tipo para tu endpoint de VPC.
- **Data processed (GB)** (Datos procesados (GB)): introduce el volumen total de datos procesados por el endpoint, en gigabytes. No disponible para el tipo de gateway.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Endpoint de VPC:

```json
{
    "type": "vpcendpoint",
    "id": "b1c1f99c-4b2b-437c-bcf4-36597da7e369",
    "region": "us-east-1",
    "mapPos": [17,4],
    "endpointType": "interface",
    "dataGb": 10,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `vpcendpoint` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **endpointType: string**: el tipo de endpoint. Acepta una de las siguientes opciones: `interface`, `gateway` o `gatewayloadbalancer`. Por defecto es `interface`.
- **dataGb: number**: el volumen total de datos procesados por el endpoint, en gigabytes. Por defecto es `10`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#CC2264`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/