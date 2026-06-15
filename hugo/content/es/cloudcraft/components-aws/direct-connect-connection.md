---
title: Componente de conexión con Direct Connect
---
## Información general

Utiliza el componente de conexión de Direct Connect para visualizar las conexiones entre tu red interna y una localización de AWS Direct Connect.

{{< img src="cloudcraft/components-aws/direct-connect-connection/component-direct-connect-connection-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Localization** (Localización): selecciona la localización de Direct Connect.
- **Number of Ports** (Número de puertos): ingresa el número de puertos utilizados por Direct Connect. Sólo disponible para conexiones dedicadas.
- **Type** (Tipo): selecciona el tipo de conexión.
- **Capacity (bps)** (Capacidad (bps)): selecciona la capacidad de conexión en bits por segundo.
- **Transfer from** (Transferir desde): selecciona la región de AWS desde la que deseas transferir.
- **Data out (GB)** (Datos de salida (GB)): introduce el volumen total de datos salientes en gigabytes.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente de conexión de Direct Connect:

```json
{
    "type": "dxconnection",
    "id": "cff376f0-b1e3-459b-af10-a7133ad10232",
    "region": "us-east-1",
    "mapPos": [36,21],
    "site": "165HS",
    "numberPorts": 1,
    "connectionType": "Dedicated",
    "capacity": "1G",
    "transferRegion1": "us-east-1",
    "transferDataGb1": 0,
    "color": {
        "isometric": "#ECECED",
        "2d": "#693CC5"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/directconnect/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `dxconnection` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. La API admite todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **site: string**: la localización de Direct Connect. [Consulta la documentación de AWS para obtener más información][4]. Por defecto es `165HS`.
- **numberPorts: number**: el número de puertos utilizados por Direct Connect. Por defecto es `1`.
- **connectionType: string**: el tipo de conexión de Direct Connect. Acepta uno de los siguientes valores: `Dedicated` o `Hosted`. Por defecto es `Dedicated`.
- **capacity: string**: la capacidad de conexión en bits por segundo. Acepta uno de los siguientes valores: `1G`, `10G` o `100G`. Por defecto es `1G`.
- **transferRegion1: string**: la región de AWS desde la que transferir. Acepta [todas las regiones de AWS admitidas por Cloudcraft][3]. Por defecto es `us-east-1`.
- **transferDataGb1: number**: el volumen total de datos salientes en gigabytes. Por defecto es `0`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#693CC5`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/
[4]: https://aws.amazon.com/directconnect/locations/