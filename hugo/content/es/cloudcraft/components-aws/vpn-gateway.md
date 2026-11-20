---
title: Componente de VPN Gateway
---
## Información general

Utiliza el componente VPN Gateway para representar conexiones de VPN de sitio a sitio en tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpn-gateway/component-vpn-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS VPN Gateway." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Rotate** (Rotar): rota el componente y cambia su dirección.
- **Connections**: ver, eliminar o añadir conexiones VPN a esta gateway.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente VPN Gateway:

```json
{
  "type": "vpngateway",
  "id": "1a4851fe-8357-4896-876b-f2d3040d108c",
  "region": "us-east-1",
  "mapPos": [11.5,12],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link":" blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: vpngateway**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la puerta de enlace. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **direction: string**: la rotación o dirección del componente. Acepta `down` o `right`. Por defecto es `down`.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente VPN Gateway sólo puede añadirse a [VPCs][2].

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/