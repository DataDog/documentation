---
title: Componente File Share
---

## Información general

Puedes utilizar el componente File Share para representar y visualizar servicios de almacenamiento de archivos desde tu entorno Azure.

{{< img src="cloudcraft/components-azure/file-share/component-file-share-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona los colores de realce y de relleno para el cuerpo del componente en la vista 3D.
- **Nivel**: Selecciona el nivel de almacenamiento para tu servicio de almacenamiento de archivos.
- **Redundancia**: Selecciona cómo se replican tus datos en las regiones primaria y secundaria.
- **Datos en reposo (GB)**: Introduce el tamaño provisionado del servicio de archivos.
- **Snapshots (GB)**: Introduce el volumen total de datos disponibles para snapshots.
- **Metadatos en reposo (GB)**: Introduce el volumen total de datos utilizados para los metadatos del sistema de archivos.

## API

Utiliza [la API Cloudcraft][1] para acceder mediante programación y presentar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente File Share:

### Esquema

```json
{
    "type": "azurefiles",
    "id": "70cc1d82-30e1-4c62-bd29-634f72cd21cf",
    "region": "eastus",
    "mapPos": [2,6],
    "tier": "Standard",
    "redundancy": "LRS",
    "dataGb": 0,
    "snapshotsGb": 0,
    "metadataGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/products/storage/files/",
    "locked": true
}

```

- **type: string**: Tipo de componente. Debe ser una cadena de valor `azurefiles` para este componente.
- **id: string, uuid**: Identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: Identificador único global del componente dentro de Azure.
- **region: string**. Región Azure del componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: Posición del componente en el plano. La API utiliza un par de coordenadas X e Y único para expresar la posición.
- **tier: string**: Nivel de almacenamiento para el servicio de almacenamiento. Acepta uno de cuatro valores, `Premium`, `Hot`, `Cool` y `Standard`. Por defecto es `Standard`.
- **redundancy: string**: Opción de redundancia para la forma en que se replican los datos entre regiones. Acepta uno de cuatro valores, `LRS`, `ZRS`, `GRS` y `GZRS`. Por defecto es `LRS`.
- **dataGb: number**: Tamaño provisionado del servicio de archivos en gigabytes. Por defecto es `0`.
- **snapshotGb: number**: Volumen total de datos disponibles para snapshots en gigabytes. Por defecto es `0`.
- **metadataGb: number**: Volumen total de datos utilizados para los metadatos del sistema de archivos en gigabytes. Por defecto es `0`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#CEE0F5`.
  - **2d: string**: Color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `null`.
- **accentColor: object**: Color de realce para el logotipo del componente.
  - **isometric: string**: Color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#0078D4`.
  - **2d: string**: Color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o sitio web externo. Acepta uno de los siguientes formatos `blueprint://` o `https://`.
- **locked: boolean**: Si permitir o no cambios en la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/