---
title: Componente SNS (obsoleto)
---
## Información general

Utiliza el componente SNS para representar servicios de notificación desde tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns/component-sns-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'SNS' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.
- **Girar elemento**: Gira el componente para cambiar su dirección.
- **Solicitudes/mes (K)**: Introduce el número de solicitudes enviadas al mes en miles.
- **Notificaciones/mes (K)**: Introduce el número de notificaciones enviadas al mes en miles.
- **Tipo de notificación**: Selecciona el tipo de notificación para el componente SNS.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente SNS:

```json
{
  "type": "sns",
  "id": "76b1a724-2617-48e8-9be5-c71ccf5689cb",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "requests": 20,
  "notifications": 20,
  "notificationType": "email",
  "color": {
    "isometric": "#333333",
    "2d": "#333333"
  },
  "accentColor": {
    "isometric": "#f5b720",
    "2d": "#f5b720"
  },
  "link": "https://aws.amazon.com/sns/",
  "locked": true
}
```

- **type: sns**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **region: string**: Región de AWS en la que se despliega la instancia SNS. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **direction: string**: Rotación o dirección del componente. Los valores aceptados son `down`, `up`, `right` o `left`. Por defecto es `down`.
- **requests: number**: Número de solicitudes enviadas al mes en millones. Por defecto es `1`.
- **notifications: number**: Número de notificaciones enviadas al mes en miles. Por defecto es `1`.
- **notificationType: string**: Tipo de notificación utilizada por SNS. Para obtener más información, consulta [Valores aceptados para `notificationType`](#accepted-values-for-notificationtype).
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

## Valores aceptados para `notificationType`

La clave `notificationType` acepta los siguientes valores:

```
email, email-json, http, https, lambda, mobile, sms, sqs
```

[1]: https://developers.cloudcraft.co/