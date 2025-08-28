---
title: Componente Lambda
---
## Información general

Utiliza el componente Lambda para representar instancias Lambda desde tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/lambda/component-lambda-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Lambda' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Arquitectura**: Tipo de procesador de cálculo utilizado por la instancia.
- **Memoria**: Cantidad de memoria asignada a la instancia.
- **Solicitudes al mes**: Número de solicitudes al mes en millones.
- **Segundos por solicitud**: Duración de cada solicitud en segundos.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente Lambda:

```json
{
  "type": "lambda",
  "id": "1bc08394-f884-497b-ae7f-fecc5e23d731",
  "region": "us-east-2",
  "mapPos": [-3, 10],
  "architecture":"x86_64",
  "memory": 128,
  "mRequests": 0.5,
  "computeDuration": 60,
  "color": {
    "2d": "#d86613",
    "isometric": "#3c3c3c"
  },
  "accentColor": {
    "2d": "#4286c5",
    "isometric": "#4286c5"
  },
  "link": "https://aws.amazon.com/lambda/",
  "locked": true
}
```

- **type: lambda**: Tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: Región de AWS en la que se despliega la instancia Lambda. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el blueprint, expresada como un par de coordenadas x e y.
- **architecture: string**: Tipo de procesador de cálculo utilizado por la instancia. Acepta uno de los siguientes valores, `x86_64` o `arm64`.
- **memory: number**: Cantidad de memoria asignada para la instancia en megabytes.
- **mRequests: number**: Número de solicitudes al mes en millones.
- **computeDuration: number**: Duración de cada solicitud en segundos.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno del componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: Color de realce utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios que se realizan en el componente mediante la aplicación se deshabilitan hasta que se desbloquea.

[1]: https://developers.cloudcraft.co/