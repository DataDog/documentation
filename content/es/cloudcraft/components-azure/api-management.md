---
title: Componente de API Management
---

## Información general

Puedes usar el componente de API Management para representar y visualizar plataformas de gestión de APIs de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/api-management/component-api-management-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Tier** (Nivel): selecciona el nivel de servicio para tu plataforma de API Management.
- **Calls** (Llamadas): ingresa la cantidad total de llamadas a la API. Solo disponible para el nivel **Consumption** (Consumo).
- **Units** (Unidades): ingresa la cantidad de unidades para la plataforma de API Management. Solo disponible para el nivel **Premium**.
- **Self-hosted gateways** (Gateways autoalojadas): ingresa la cantidad de gateways de API autoalojadas. Solo disponible para el nivel **Premium**.
- **Rotate item** (Girar elemento): gira el componente en relación con el plano. Solo disponible en la vista 3D.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de API Management:

### Esquema

```json
{
    "type": "azureapimanagement",
    "id": "ccff5631-c1cd-4ed6-8d21-bb60e676fedf",
    "region": "northcentralus",
    "mapPos": [5,0.25],
    "tier": "Consumption",
    "calls": 0,
    "units": 1,
    "gateways": 0,
    "direction": "down",
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/api-management/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `azureapimanagement` para este componente.
- **id: string, uuid**: el identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **tier: string**: el nivel de servicio para la plataforma de API Management. [Consulta la documentación de Azure para obtener más información][2]. El valor predeterminado es `Consumption`.
- **calls: number**: la cantidad de llamadas a la API. El valor predeterminado es `0`.
- **units: number**: la cantidad de unidades para la plataforma de API Management. El valor predeterminado es `1`.
- **gateways: number**: la cantidad de gateways de API autoalojadas. El valor predeterminado es `0`.
- **direction: string**: la dirección del componente en relación con el plano. Acepta uno de dos valores: `down` o `right`. El valor predeterminado es `down`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#075693`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#2EC8EA`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://learn.microsoft.com/en-us/azure/api-management/api-management-features