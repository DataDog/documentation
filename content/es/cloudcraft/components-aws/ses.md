---
title: Componente SES
---
## Información general

Utiliza el componente SES para representar servicios de correo electrónico, transaccionales y de marketing, desde tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns/component-ses-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'SES' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.
- **Mensajes/mes (K)**: Introduce el número de mensajes de correo electrónico enviados al mes en miles.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente SES:

```json
{
  "type": "ses",
  "id": "11f3e4bc-f827-48b6-9d9c-73e99ca3e289",
  "region": "us-west-2",
  "mapPos": [0,10],
  "emailsOut": 400,
  "color": {
    "isometric": "#0a1538",
    "2d": "#0a1538"
  },
  "accentColor": {
    "isometric": "#2457f2",
    "2d": "#2457f2"
  },
  "link": "https://aws.amazon.com/ses/",
  "locked": true
}
```

- **type: ses**: Tipo de componente.
- **id: cadena**: Identificador único del componente en formato `uuid`.
- **region: string**: Región de AWS en la que se despliega SES. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **emailsOut: number**: Número de mensajes de correo electrónico enviados por mes en miles. Por defecto es `10`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**. Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: Color de realce para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de realce para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **bloqueado: booleano**. Si es `true`, los cambios realizados en el componente utilizando la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/