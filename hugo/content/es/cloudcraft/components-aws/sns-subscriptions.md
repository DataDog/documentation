---
title: Componente de suscripciones SNS
---
## Información general

Utiliza el componente Suscripción SNS para visualizar las suscripciones SNS de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns-subscriptions/component-sns-subscriptions-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Notifications/mo (K)** (Notificaciones/mes (miles)): introduce el número de notificaciones al mes, en miles.
- **Notification type** (Tipo de notificación): selecciona el tipo de notificación para el componente SNS.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente de suscripción SNS:

```
{
    "type": "snssubscriptions",
    "id": "ba29170b-5015-419f-b617-86fe788bafcb",
    "region": "us-east-1",
    "mapPos": [0,8],
    "notifications": 1,
    "notificationType": "mobile"
    "color": {
        "isometric": "#ECECED",
        "2d": "#CC2264"
    },
    "accentColor": {
        "isometric": "#4286C5",
        "2d": "#FFFFFF"
    },
    "link": "https://aws.amazon.com/sns/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `snssubscriptions` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **notifications: number**: Número de notificaciones al mes en miles. Por defecto es `1`.
- **notificationType: string**: el tipo de notificación para SNS. Consulta [Valores aceptados para `notificationType`](#accepted-values-for-notificationType) para obtener más información. Por defecto es `mobile`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#CC2264`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para `notificationType`

La clave `notificationType` acepta los siguientes valores:

```
mobile, sms, email, emil-json, http, https, sqs, lambda
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: https://help.cloudcraft.co/article/110-scan-error-aws-china-region