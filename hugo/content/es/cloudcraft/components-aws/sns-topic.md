---
title: Componente SNS Topic
---
## Información general

Utiliza el componente SNS Topic para representar y visualizar temas SNS de tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/sns-topic/component-sns-topic-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color de realce para su símbolo. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Solicitudes/mes (K)**: Introduce el número de solicitudes al mes en miles.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente SNS Topic:

```
{
    "type": "snstopic",
    "id": "2bb4357c-7f18-45ba-9cde-37cc8f9717aa",
    "region": "us-east-1",
    "mapPos": [6,9],
    "requests": 1,
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

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `snstopic` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: Identificador único global del componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: Región AWS del componente. Se admiten todas las regiones globales, [excepto AWS China][3].
- **mapPos: array**: Posición del componente en el plano, expresada como par de coordenadas X e Y.
- **requests: number**: Número de solicitudes al mes en miles. Por defecto es `1`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#CC2264`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos, `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/