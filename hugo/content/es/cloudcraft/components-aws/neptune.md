---
title: Componente Neptune
---
## Información general

Utiliza el componente Neptune para visualizar bases de datos gráficas serverless de tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/neptune/component-neptune-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color de realce para su símbolo. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Rol**: Selecciona el rol de la base de datos Neptune.
- **Tipo de instancia**: Selecciona el tipo de instancia Neptune. Al cambiar el tipo de instancia, cambia la información del hardware mostrada en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Tamaño**: Selecciona el tamaño de la instancia Neptune. Al igual que con el tipo de instancia, la información del hardware mostrada en la barra de herramientas cambia para reflejar el tamaño.
- **Almacenamiento (GB)**: Introduce la cantidad total de almacenamiento disponible para la base de datos en gigabytes. No está disponible para el rol de lectura.
- **Snapshot (GB)**: Introduce la cantidad total de almacenamiento aprovisionado para snapshots en gigabytes. No está disponible para el rol de lectura.
- **IOPS (millones)**: Introduce el límite mensual de E/S para la instancia, en millones. No está disponible para el rol de lectura.
- **Instancias**: Introduce el número de instancias Neptune. Sólo está disponible para el rol serverless.
- **Mín. de NCU**: Introduce la cantidad mínima de NCU disponibles para la base de datos. Sólo está disponible para el rol serverless.
- **Máx. de NCU**: Introduce la cantidad máxima de NCU disponibles para la base de datos. Sólo está disponible para el rol serverless.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente Neptune:

```json
{
    "type": "neptune",
    "id": "7d2ac4f8-2b7d-4617-98cb-ff792963df6d",
    "region": "us-east-1",
    "mapPos": [-2,12],
    "role": "writer",
    "instanceType": "r5",
    "instanceSize": "large",
    "storage": 10,
    "snapshots": 0,
    "iops": 0,
    "instances": "1",
    "minNCUs": 1,
    "maxNCUs": 2.5,
    "color": {
        "isometric": "#ECECED",
        "2d": "#3B48CC"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/neptune/",
    "locked": true
}
```

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `neptune` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: Identificador único global del componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: Región AWS del componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: Posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **role: string**: Rol de la base de datos Neptune. Acepta uno de los siguientes valores: `serverless`, `writer` o `reader`. Por defecto es `writer`.
- **instanceType: string**: Tipo de la instancia Neptune. Para obtener más información, consulta [Valores aceptados para `instanceType`](#accepted-values-for-instancetype). Por defecto es `r5`.
- **instanceSize: string**: Tamaño de la instancia Neptune. No aplicable si el `role` es `reader`. Por defecto es `large`.
- **storage: number**: Cantidad total de almacenamiento disponible para la base de datos en gigabytes. No aplicable si el `role` es `reader`. Por defecto es `10`.
- **snapshots: number**: Cantidad total de almacenamiento aprovisionado para snapshots en gigabytes. No aplicable si el `role` es `reader`. Por defecto es `0`.
- **iops: number**: Límite mensual de E/S para la instancia, en millones. No aplicable si el `role` es `reader`. Por defecto es `0`.
- **instances: number**: Número de instancias Neptune. Sólo aplicable si el `role` es `serverless. Defaults to `1`.
- **minNCUs: number**: Cantidad mínima de NCU disponibles para la base de datos. Sólo aplicable si el `role` es `serverless`. Por defecto es `1`.
- **maxNCUs: number**: Cantidad máxima de NCU disponibles para la base de datos. Sólo aplicable si el `role` es `serverless`. Por defecto es `2.5`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#3B48CC`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o sitio web externo. Acepta uno de los siguientes formatos `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
t4g, t3, x2g, x2iedn, r6g, r6i, r5, r5d, r4
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/