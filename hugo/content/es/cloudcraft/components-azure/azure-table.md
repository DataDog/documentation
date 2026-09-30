---
title: Componente de tabla de Azure
---

## Información general

Puedes utilizar el componente de Azure Table para representar y visualizar almacenes de clave-valor de NoSQL desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/azure-table/component-azure-table-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Redundancy**: selecciona cómo se replicarán tus datos en las regiones principal y secundaria.
- **Storage (GiB)**: ingresa el volumen total de datos disponibles para el almacén de clave-valor.
- **Request Units (10k)**: ingresa el número de solicitudes en unidades de solicitud de 10 mil.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de tabla de Azure:

### Esquema

```json
{
    "type": "azuretable",
    "id": "e3b7f697-3ae6-4d3b-bd7f-bac3e0cc05ae",
    "region": "northcentralus",
    "mapPos": [1,7.75],
    "redundancy": "LRS",
    "storageGb": 10,
    "requestUnits": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/tables/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `azuretable` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global para el componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **redundancy: string**: la opción de redundancia para la replicación de datos entre regiones. Acepta uno de tres valores: `LRS`, `ZRS`, `GRS`, `GZRS`, `RA-GRS` y `RA-GRS`. El valor predeterminado es `LRS`.
- **storageGb: number**: el volumen total de datos disponibles para el almacén de clave-valor en gibibytes. El valor predeterminado es `0`.
- **requestUnits: number**: la cantidad de solicitudes en unidades de 10 mil. El valor predeterminado es `0`.
- **color: objeto**: el color de relleno para el cuerpo del componente.
  - **isometric: cadena**: un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#CEE0F5`.
  - **2d: cadena**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: objeto**: el color de énfasis para el logotipo del componente.
  - **isometric: cadena**: un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#0078D4`.
  - **2d: cadena**: un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/