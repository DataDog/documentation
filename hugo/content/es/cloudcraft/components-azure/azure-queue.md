---
title: Componente de cola de Azure
---

## Información general

Puedes usar el componente de cola de Azure para representar y visualizar el almacenamiento de cola de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/azure-queue/component-azure-queue-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}


## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona colores de énfasis y relleno para el cuerpo del componente en la vista 3D.
- **Kind** (Tipo): selecciona el tipo de cuenta de almacenamiento.
- **Redundancy** (Redundancia): selecciona cómo se replicarán tus datos en las regiones principal y secundaria.
- **Storage (GiB)** (Almacenamiento [GiB]): ingresa el volumen total de datos disponibles para la cola en gibibytes.
- **Class 1 Requests (10k)** (Solicitudes de clase 1 [10 mil]): ingresa la cantidad de solicitudes de clase 1 en 10 mil unidades de solicitud.
- **Class 2 Requests (10k)** (Solicitudes de clase 2 [10 mil]): ingresa la cantidad de solicitudes de clase 2 en 10 mil unidades de solicitud.
- **Replication (GiB)** (Replicación [GiB]): ingresa el volumen total de transferencia de datos de georeplicación para la cola.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de cola de Azure:

### Esquema

```json
{
    "type": "azurequeue",
    "id": "6cc7f504-a5a5-4354-ad34-0d250b462ce2",
    "region": "westeurope",
    "mapPos": [0,6],
    "kind": "Storage",
    "redundancy": "LRS",
    "storageGb": 1,
    "requestUnitsC1": 0,
    "requestUnitsC2": 0,
    "replicationGb": 0,
    "color": {
        "isometric": null,
        "2d": null
    },
    "accentColor": {
        "isometric": null,
        "2d": null
    },
    "link": "https://azure.microsoft.com/en-us/products/storage/queues/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `azurequeue` para este componente.
- **id: string, uuid**: el identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **kind: string**: el tipo de cuenta de almacenamiento. Acepta uno de dos valores: `Storage` y `StorageV2`. El valor predeterminado es `Storage`.
- **redundancy: string**: la opción de redundancia para la replicación de datos entre regiones. Acepta uno de seis valores: `LRS`, `ZRS`, `GRS`, `GZRS`, `RA-GRS` y `RA-GZRS`. El valor predeterminado es `LRS`.
- **storageGb: number**: El volumen total de datos disponibles para la cola en gibibytes. El valor predeterminado es `0`.
- **requestUnitsC1: number**: la cantidad de solicitudes de clase 1 en 10 mil unidades. El valor predeterminado es `0`
- **requestUnitsC2: number**: la cantidad de solicitudes de clase 2 en 10 mil unidades. El valor predeterminado es `0`
- **replicationGb: number**: el volumen total de transferencia de datos de georeplicación para la cola. El valor predeterminado es `0`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/