---
title: Componente VPN Gateway
---

## Información general

Puedes utilizar el componente **VPN Gateway** para representar y visualizar conexiones privadas desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/vpn-gateway/component-vpn-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}


## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Gateway type** (Tipo de gateway): selecciona el tipo de gateway de red virtual que deseas representar.
- **SKU**: selecciona el SKU del gateway de red virtual que deseas representar.
- **S2S tunnels** (Túneles S2S): introduce el número de túneles S2S para el gateway de red virtual. Solo disponible para VPN Gateways.
- **P2S tunnels** (Túneles P2S): introduce el número de túneles P2S para el gateway de red virtual. Solo disponible para VPN Gateways.
- **Rotate item** (Girar elemento): gira el componente en 90 grados y cambia su dirección.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente VPN Gateway:

### Esquema

```json
{
    "type": "azurevngw",
    "id": "817a218d-8556-4e8f-b32c-b13e454b9106",
    "region": "eastus",
    "mapPos": [6,9.25],
    "gatewayType": "Vpn",
    "tier": "Basic",
    "s2sTunnels": 0,
    "p2sTunnels": 0,
    "direction": "down",
    "color": {
        "isometric": "#CEE0F5",
        "2d": null
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/vpn-gateway",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azurevngw` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **gatewayType: string**: el tipo de gateway de red virtual que deseas representar. Acepta uno de dos valores: `Vpn` o `ExpressRoute`. Por defecto es `Vpn`.
- **tier: string**: el nivel de gateway de red virtual. [Consulta Microsoft Learn para obtener más información][2]. Por defecto es `Basic` o `Standard`, según el `gatewayType`.
- **s2sTunnels: number**: el número de túneles S2S para el gateway de red virtual. Por defecto es `0`.
- **p2sTunnels: number**: el número de túneles P2S para el gateway de red virtual. Por defecto es `0`.
- **direction: string**: la dirección del componente. Acepta uno de dos valores: `right` o `down`. Por defecto es `down`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/vpn-gateway/vpn-gateway-about-vpn-gateway-settings#gwsku