---
title: Componente Managed Disk
---

## Información general

Puedes utilizar el componente Managed Disk para representar y visualizar volúmenes de almacenamiento de bloques administrados desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/managed-disk/component-managed-disk-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft en el cual se muestran componentes interconectados de Azure." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona los colores de acento y de relleno para el cuerpo del componente en la vista 3D.
- **Tipo**: Selecciona el tipo de tu disco.
- **Tamaño**: Selecciona el tamaño de tu disco.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos de JSON. El siguiente es un ejemplo de objeto de JSON de un componente de Managed disk:

### Esquema

```json
{
    "type": "azuredisk",
    "id": "17e69a0d-4632-42bd-a6c1-f3b9213604ea",
    "resourceId": "/subscriptions/b59a176b-3a5d-4cc6-ab8c-585984717c32/resourceGroups/CLOUDCRAFT/providers/Microsoft.Compute/disks/documentation-volume",
    "region": "eastus",
    "mapPos": [-2,12],
    "tier": "P4",
    "diskSizeGb": 32,
    "color": {
        "isometric": "#CEE0F5",
        "2d": "null"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "null"
    },
    "link": "https://azure.microsoft.com/products/storage/disks",
    "locked": true
}
```

- **Tipo: cadena**: El tipo de componente. Debe ser una cadena de valor `azuredisk` para este componente.
- **id: cadena, uuid**: El identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **ID de recurso: cadena**: El identificador único a nivel mundial para el componente en Azure.
- **Región: cadena**: La región de Azure para el componente. La API admite todas las regiones del mundo, excepto China.
- **MapPos: matriz**: La posición del componente en el plano. La API utiliza un único par de coordenadas X e Y para expresar el posicionamiento.
- **Nivel: cadena**: El nivel para el tipo de disco.
- **Gb de tamaño de disco: número**: La cantidad de almacenamiento disponible para su uso en el disco en gigabytes.
- **color: objeto**: El color de relleno para el cuerpo del componente.
  - **isométrico: cadena**: Un color hexadecimal para el cuerpo del componente en la vista 3D. En forma predeterminada es `#CEE0F5`.
  - **2d: cadena**: Un color hexadecimal para el cuerpo del componente en la vista 2D. En forma predeterminada es `null`.
- **Color de acento: objeto**: El color de acento para el logotipo del componente.
  - **isométrico: cadena**: Un color hexadecimal para el logotipo del componente en la vista 3D. En forma predeterminada es `#0078D4`.
  - **2d: cadena**: Un color hexadecimal para el logotipo del componente en la vista 2D. En forma predeterminada es `null`.
- **Enlace: cadena, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos, `blueprint://` o `https://`.
- **Bloqueado: booleano**: Si se permite cambiar la posición del componente a través de la interfaz web. En forma predeterminada es `false`.

[1]: https://developers.cloudcraft.co/