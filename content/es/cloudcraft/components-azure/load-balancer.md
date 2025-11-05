---
title: Componente balanceador de carga
---

## Información general

Puedes utilizar el componente balanceador de carga para representar y visualizar balanceadores de carga desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/load-balancer/component-load-balancer-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de una máquina virtual interconectados con un componente balanceador de carga de Azure." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona los colores de realce y de relleno para el cuerpo del componente en la vista 3D.
- **SKU**: Selecciona el nivel servicio para tu balanceador de carga.
- **Nivel**: Selecciona el nivel red para tu balanceador de carga. Esta opción no está disponible para SKU Basic y Gateway.
- **Número de reglas**: Introduce el número de reglas del balanceador de carga configuradas. Esta opción no está disponible para SKU Gateway.
- **Cadenas**: Introduce el número de horas de cadena para el balanceador de carga. Esta opción no está disponible para SKU Basic y Standard.
- **Datos procesados (GB)**: Introduce el volumen total de datos procesados al mes por tu balanceador de carga en gigabytes.

## API

Utiliza [la API Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente balanceador de carga:

### Esquema

```json
{
  "type": "azurelb",
  "id": "e0faf7c6-546b-44b3-a9c3-82f1c7f6d58f",
  "resourceId": "/subscriptions/6e0770d5-22cb-476a-98e3-3a46b2b2aa8d/resourceGroups/CLOUDCRAFT/providers/Microsoft.Network/loadBalancers/doc-team-lb",
  "region": "eastus",
  "mapPos": [1, 5],
  "skuName": "Standard",
  "tier": "Regional",
  "numberOfRules": 1,
  "chains": 0,
  "dataGb": 0,
  "color": {
    "isometric": "#ECECED",
    "2d": "null"
  },
  "accentColor": {
    "isometric": "#0078D4",
    "2d": "null"
  },
  "link": "https://azure.microsoft.com/products/load-balancer/",
  "locked": true
}
```

- **type: string**: Tipo de componente. Debe ser una cadena de valor `azurelb` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: Identificador único global del componente dentro de Azure.
- **region: string**. Región Azure del componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: Posición del componente en el plano. La API utiliza un par de coordenadas X e Y único para expresar la posición.
- **skuName: string**: Nivel de servicio para el balanceador de carga. Acepta uno de tres valores, `Basic`, `Standard` o `Gateway`. Por defecto es `Standard`.
- **tier: string**: Nivel red para el balanceador de carga. Acepta uno de dos valores, `Regional` o `Global`. Por defecto es `Regional`.
- **numberOfRules: number**: Número de reglas para el balanceador de carga. Por defecto es `1`.
- **chains: number**: Número de horas de cadena para el balanceador de carga. Por defecto es `0`.
- **dataGb: number**: Volumen total de datos mensuales procesados por el balanceador de carga en gigabytes. Por defecto es `0`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078d4`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o sitio web externo. Acepta uno de los siguientes formatos `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/