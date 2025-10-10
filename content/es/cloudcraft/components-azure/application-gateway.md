---
title: Componente de Application Gateway
---

## Información general

Puedes utilizar el componente Application Gateway para representar y visualizar gateways de aplicaciones desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/application-gateway/component-application-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrica de Cloudcraft que muestra componentes de aplicación web interconectados a un componentes de puerta de enlace de aplicación de Azure." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Nivel**: selecciona el nivel de servicio para tu puerta de enlace de aplicaciones.
- **Tamaño**: selecciona el tamaño de tu puerta de enlace de aplicaciones. Esta opción solo está disponible para los niveles Estándar y WAF.
- **Instancias**: introduce el número de instancias para escenarios de alta disponibilidad. Esta opción solo está disponible para los niveles Estándar y WAF.
- **Unidades de cálculo**: ingresa la medida de capacidad de cómputo utilizada por tu puerta de enlace de aplicaciones. Esta opción solo está disponible para los niveles Estándar V2 y WAF V2.
- **Conexiones persistentes**: introduce el número de conexiones persistentes a tu puerta de enlace de aplicaciones. Esta opción solo está disponible para los niveles Estándar V2 y WAF V2.
- **Rendimiento (Mbps)**: introduce el rendimiento de tu puerta de enlace de aplicaciones en megabits por segundo. Esta opción solo está disponible para los niveles Estándar V2 y WAF V2.
- **Datos procesados (GB)**: introduce el volumen total de datos procesados al mes por tu puerta de enlace de aplicaciones en gigabytes.
- **Datos salientes procesados (GB)**: introduce el volumen total de datos salientes procesados al mes por tu puerta de enlace de aplicaciones en gigabytes.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Application Gateway:

### Esquema

```json
{
    "type": "azureappgw",
    "id": "900c9832-31d6-460a-9065-762fe63ec83c",
    "resourceId": "/subscriptions/c74c5de5-0170-405b-954a-e6491cf0c838/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/applicationGateways/DocTeamGateway",
    "region": "eastus",
    "mapPos": [1, 8],
    "tier": "Standard",
    "size": "Small",
    "instances": 2,
    "computeUnits": 0,
    "persistentConnections": 0,
    "throughput": 0,
    "dataProcessed": 0,
    "outboundDataTransfer": 0,
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/application-gateway",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azureappgw` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global para el componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API utiliza un único par de coordenadas X e Y para expresar el posicionamiento.
- **tier: string**: el nivel de servicio para la puerta de enlace de aplicación. Acepta uno de cuatro valores: `Standard`, `Standard V2`, `WAF`, o `WAF V2`. Por defecto es `Standard V2`.
- **size: string**: el tamaño de la puerta de enlace de la aplicación. Acepta uno de tres valores: `Small`, `Medium`, o `Large`. Por defecto es `Medium`.
- **instances: number**: el número de instancias de la puerta de enlace de aplicaciones. Por defecto `2`.
- **computeUnits: number**: la medida de capacidad de cómputo utilizada por la puerta de enlace de aplicación. Por defecto es `0`.
- **persistentConnections: number**: el número de conexiones persistentes a tu puerta de enlace de aplicación. Por defecto es `0`.
- **throughput: number**: el rendimiento de la puerta de enlace de aplicaciones en megabits por segundo. Por defecto es `0`.
- **dataProcessed: number**: el volumen total de datos mensuales procesados por la puerta de enlace de aplicaciones en gigabytes. Por defecto es `0`.
- **outboundDataTransfer: number**: el volumen total de datos salientes mensuales procesados por la puerta de enlace de aplicaciones en gigabytes. Por defecto es `0`.
- **color: objetc**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/