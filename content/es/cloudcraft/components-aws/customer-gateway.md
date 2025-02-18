---
title: Componente Customer Gateway
---
## Información general

Utiliza el componente Customer Gateway para representar el dispositivo de puerta de enlace de clientes de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/customer-gateway/component-customer-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'Customer gateway'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Rotate**: rota el componente y cambia su dirección.
- **Connections**: ver, eliminar o añadir conexiones VPN a esta puerta de enlace.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Customer Gateway:

```json
{
  "type": "customergateway",
  "id": "677145c5-aeb4-4560-8459-112bcfc21ce3",
  "region": "us-east-1",
  "mapPos": [20,10],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "direction": "down",
  "link": " blueprint://58c2aeae-d5b7-4a50-83ea-b3fa9d17d3f5",
  "locked": true
}
```

- **type: customergateway**: el tipo de componente.
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
- **Enlace: uri**: enlaza el componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente Customer Gateway sólo puede añadirse a [VPCs][2].

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc