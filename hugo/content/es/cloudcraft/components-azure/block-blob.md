---
title: Componente Block Blob
---

## Información general

Puedes utilizar el componente Block Blob para representar y visualizar blobs de bloques de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/block-blob/component-block-blob-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft en el cual se muestran componentes interconectados de Azure" responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona los colores de énfasis y de relleno para el cuerpo del componente en la vista 3D.
- **Nivel**: Selecciona el nivel de almacenamiento para tu blob.
- **Redundancia**: Selecciona cómo se replican tus datos en las regiones primaria y secundaria.
- **Almacenamiento (GiB)**: Introduce el volumen total de datos disponibles para el blob en gibibytes.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos de JSON. El siguiente es un ejemplo de objeto de JSON de un componente Block Blob:

### Esquema

```json
{
    "type": "azureblob",
    "id": "c198aeb5-b774-496d-9802-75e6d2407ab1",
    "region": "eastus",
    "mapPos": [0,7],
    "tier": "Standard",
    "redundancy": "LRS",
    "storageGb": 1,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/blobs/",
    "locked": true
}
```

- **Tipo: cadena**: El tipo de componente. Debe ser una cadena de valor `azureblob` para este componente.
- **id: cadena, uuid**: El identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **ID de recursos: cadena**: El identificador único global para el componente en Azure.
- **Región: cadena**: La región de Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **MapPos: matriz**: La posición del componente en el plano. La API utiliza un par único de coordenadas X e Y para expresar el posicionamiento.
- **Nivel: cadena**: El nivel de almacenamiento del blob. Acepta uno de cuatro valores, `Premium`, `Hot`, `Cool` o `Standard`. El valor predeterminado es `Standard`.
- **Redundancia: cadena**: La opción de redundancia para la manera en que se replican los datos entre regiones. Acepta uno de cuatro valores, `LRS`, `ZRS`, `GRS` y `RA-GRS`. El valor predeterminado es `LRS`.
- **storageGb: número**: El volumen total de datos disponibles para el blob en gibibytes. El valor predeterminado es `0`.
- **color: objeto**: El color de relleno para el cuerpo del componente.
  - **isométrico: cadena**: Un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#CEE0F5`.
  - **2d: cadena**: Un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **Color de énfasis: objeto**: El color de énfasis para el logotipo del componente.
  - **isométrico: cadena**: Un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#0078D4`.
  - **2d: cadena**: Un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `null`.
- **Vínculo: cadena, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **Bloqueado: booleano**: Si se permite cambiar la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/