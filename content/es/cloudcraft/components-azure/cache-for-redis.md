---
title: Componente Cache for Redis
---

## Información general

Puedes utilizar el componente Cache for Redis para representar y visualizar las cachés de Redis de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/cache-for-redis/component-cache-for-redis-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft en el que se muestran los componentes interconectados de Azure." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona los colores de énfasis y de relleno para el cuerpo del componente en la vista 3D.
- **Tier** (Nivel): selecciona el nivel de rendimiento de tu caché de Redis.
- **Type** (Tipo): selecciona el tipo de instancia de tu caché de Redis. Al cambiar el tipo de instancia, se modifican los detalles de hardware que aparecen en la barra de herramientas para reflejar lo que utiliza el hipervisor.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente Cache for Redis:

### Esquema

```json
{
    "type": "azureredis",
    "id": "e73c3831-83bf-4bbc-98e9-f5731cb0e437",
    "region": "northcentralus",
    "mapPos": [5,0],
    "tier": "Basic",
    "instance": "C0"
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/cache",
    "locked": true
}
```

- **type: string**. El tipo de componente. Debe ser una cadena con el valor `azureredis` para este componente.
- **id: string, uuid**. El identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**. El identificador único global del componente dentro de Azure.
- **region: string**. La región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**. La posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **tier: string**. El nivel de rendimiento de la caché de Redis. Acepta uno de tres valores, `Basic`, `Standard` o `Premium`. El valor predeterminado es `Basic`.
- **instance: string**. El tipo de instancia de la caché de Redis. El valor predeterminado es `C0`.
- **color: object**. El color de relleno para el cuerpo del componente.
  - **isometric: string**. Un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#D82F27`.
  - **2d: string**. Un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**. El color de énfasis para el logotipo del componente.
  - **isometric: string**. Un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#FFFFFF`.
  - **2d: string**. Un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `null`.
- **link: string, uri**. URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**. Si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/