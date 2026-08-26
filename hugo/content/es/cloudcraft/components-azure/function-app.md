---
title: Componente Function App
---

## Información general

Puedes utilizar el componente Function App para representar y visualizar un grupo de Azure Functions desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/function-app/component-function-app-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra funciones de Azure interconectadas." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Color**: Selecciona los colores de realce y de relleno para el cuerpo del componente en la vista 3D.
- **Nivel**: Selecciona el plan de alojamiento para la aplicación de la función.
- **vCPU**: Introduce el número medio de unidades de cálculo utilizadas por las funciones.
- **Memoria (GB)**: Introduce la cantidad media de memoria en gigabytes utilizada por las funciones.
- **Duración (ms)**: Introduce la duración media de las funciones en milisegundos.
- **Ejecuciones (MM/m)**: Introduce el número de invocaciones de funciones por mes en millones.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Function App:

### Esquema

```json
{
  "type": "azurefunctionapp",
  "id": "939f0381-96aa-4e44-bc04-7993a121384e",
  "resourceId": "/subscriptions/76f00a52-98a8-4e61-892c-bb327ded2352/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/doc-functions",
  "region": "eastus",
  "mapPos": [1, 8],
  "tier": "consumption",
  "vcpu": 1,
  "memoryGB": 0.5,
  "durationMS": 1000,
  "executionsMM": 3,
  "color": {
    "isometric": "#ececed",
    "2d": null
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": null
  },
  "link": "https://azure.microsoft.com/en-us/products/functions/",
  "locked": true
}
```

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `azurefunctionapp` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: Identificador único global para el componente dentro de Azure.
- **region: string**. Región Azure del componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: Posición del componente en el plano. La API utiliza un par de coordenadas X e Y único para expresar la posición.
- **tier: string**: Nivel de servicio para la aplicación. Acepta uno de dos valores, `consumption` o `premium`. Por defecto es `consumption`.
- **vcpu: number**: Número medio de unidades de cálculo utilizadas por las funciones. Por defecto es `1`.
- **memoryGB: number**: Cantidad media de memoria utilizada por las funciones en gigabytes. Por defecto es `0.5`.
- **durationMS: number**: Duración media de las funciones en milisegundos. Por defecto es `1000`.
- **executionsMM: number**: Recuento de invocaciones por mes en millones. Por defecto es `3`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#1490df`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/