---
title: Componente de Espacio de nombres del bus de servicio
---

## Información general

Puedes utilizar el componente Espacio de nombres del bus de servicio para representar y visualizar la mensajería en la nube como integraciones de servicio desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/service-bus-namespace/component-service-bus-namespace-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra los componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona los colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Name** (Nombre): introduzce el nombre de tu espacio de nombres.
- **Tier** (Nivel): selecciona el nivel de servicio para tu espacio de nombres del bus de servicio.
- **Messaging units** (Unidades de mensajería): selecciona el número de unidades de mensajería disponibles para tu espacio de nombres. Sólo disponible para el nivel **Premium**.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Espacio de nombres del bus de servicio:

### Esquema

```json
{
    "type": "azuresbnamespace",
    "id": "5a5b710a-2a36-421b-9ac9-f94f545f8c46",
    "region": "northcentralus",
    "mapPos": [3,-1],
    "mapSize": [5,5],
    "nodes": [
        "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
        "7f836b25-2a69-4be4-8b35-c0f67480eafd",
        "6bf0b7c5-20c4-46ac-8afb-48ea207c3961",
        "afb6e41c-32c6-4e6f-b11d-6606957e4588"
    ],
    "name": "Namespace",
    "tier": "Basic",
    "messagingUnits": 1,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/service-bus",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azuresbnamespace` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global para el componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **mapSize: array**: el tamaño del componente en el plano. La API utiliza un único par de coordenadas X e Y para expresar el tamaño.
- **nodes: array**: los servicios que se ejecutan dentro del espacio de nombres. Acepta una matriz de identificadores únicos para los componentes [Cola del bus de servicio][2] y [Tema del bus de servicio][3].
- **name: string**: el nombre de espacio de nombres. Por defecto es `Namespace`.
- **tier: string**: el nivel de servicio para el espacio de nombres. Acepta uno de tres valores: `Basic`, `Standard` y `Premium`. Por defecto es `Basic`.
- **messagingUnits: number**: el número de unidades de mensajería disponibles para el espacio de nombres. Acepta un número de `1` a `16`. Por defecto `1`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/189-component-service-bus-queue
[3]: https://help.cloudcraft.co/article/190-component-service-bus-topic