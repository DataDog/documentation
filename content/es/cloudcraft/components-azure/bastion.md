---
title: Componente de bastión
---

## Información general

Puedes utilizar el componente bastión para representar y visualizar servidores bastión en tu entorno de Azure.

{{< img src="cloudcraft/components-azure/bastion/component-bastion-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona los colores de énfasis y de relleno para el cuerpo del componente en la vista 3D.
- **Tier** (Nivel): selecciona el nivel de servicio para tu servidor bastión.
- **Scale units** (unidades de escala): introduce el número de unidades de escala para tu servidor bastión. Esta opción solo está disponible para el nivel estándar.
- **Outbound data transfer (GB)** (Transferencia de datos salientes (GB)): introduce el volumen total de datos salientes transferidos por tu servidor bastión en gigabytes.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos de JSON. El siguiente es un ejemplo de objeto de JSON de un componente de bastión:

### Esquema

```json
{
    "type": "azurebastion",
    "id": "efe6a642-dc6d-4ea3-ab3c-465358f10e15",
    "resourceId": "/subscriptions/14cc8259-0159-45d7-801b-2b209bac6e98/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/bastionHosts/BastionDoc",
    "region": "eastus",
    "mapPos": [2,10],
    "tier": "Basic",
    "scaleUnits": 1,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/azure-bastion/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azurebastion` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **tier: string**: el nivel de servicio para el servidor bastión. Acepta uno de dos valores, `Basic` o `Standard`. Por defecto es `Standard`.
- **scaleUnits: number**: el número de unidades de escala para el servidor bastión.
- **outboundDataTransfer: number**: el volumen total de datos saliente transferidos por el servidor bastión en gigabytes. Por defecto es `0`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/