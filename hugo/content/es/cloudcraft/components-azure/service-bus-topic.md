---
title: Componente de tema Service Bus
---

## Información general

Puedes utilizar el componente de tema Service Bus para representar y visualizar la mensajería en la nube como integraciones de un servicio desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/service-bus-topic/component-service-bus-topic-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona los colores de realce y de relleno para el cuerpo del componente en la vista 3D.
- **Nivel**: Selecciona el nivel de servicio para tu tema Service Bus.
- **Operaciones (M/mes)**: Introduce el número de operaciones mensuales en millones. No está disponible para el nivel de servicio Premium.
- **Conexiones intermediadas**: Introduce el número de conexiones intermediadas para tu tema. Solo está disponible para el nivel de servicio Standard.
- **Conexiones híbridas**: Introduce el número de conexiones híbridas para tu tema. Solo está disponible para el nivel de servicio Standard.
- **Transferencia de datos (GB)**: Introduce el volumen total de datos transferidos mensualmente en gigabytes. Solo está disponible para el nivel de servicio Standard.
- **Horas de retransmisión**: Introduce el número de horas de retransmisión para tu tema. Solo está disponible para el nivel de servicio Standard.
- **Mensajes retransmitidos (K/mes)**: Introduce el número de mensajes mensuales retransmitidos en miles. Sólo está disponible para el nivel de servicio Standard.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de tema Service Bus:

### Esquema

```json
{
    "type": "azuresbtopic",
    "id": "3c9f4d24-3653-4da5-a6a5-e375448aff4e",
    "region": "northcentralus",
    "mapPos": [4,2],
    "tier": "Standard",
    "operationsPerMonth": 0,
    "brokeredConnections": 0,
    "hybridConnections": 0,
    "dataTransferGb": 0,
    "relayHours": 0,
    "relayMessages": 0,
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

- **type: string**: Tipo de componente. Debe ser una cadena con el valor `azuresbtopic` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: Identificador único global para el componente dentro de Azure.
- **region: string**. Región Azure del componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: Posición del componente en el plano. La API utiliza un par de coordenadas X e Y único para expresar la posición.
- **tier: string**: Nivel de servicio para el tema. Acepta uno de tres valores, `Standard` o `Premium`. Por defecto es `Standard`.
- **operationsPerMonth: number**: Número de operaciones por mes en millones. Por defecto es `0`.
- **brokeredConnections: number**: Número de conexiones intermediadas para el tema. Por defecto es `0`.
- **hybridConnections: number**: Número de conexiones híbridas para el tema. Por defecto es `0`.
- **dataTransferGb: number**: Volumen total de datos transferidos mensualmente en gigabytes. Por defecto es `0`.
- **relayHours: number**: Número de horas retransmitidas para el tema. Por defecto es `0`.
- **relayMessages: number**: Número de mensajes retransmitidos por mes en miles. Por defecto es `0`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/