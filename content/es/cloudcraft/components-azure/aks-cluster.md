---
title: Componente de clúster de AKS
---

## Información general

Puedes usar el componente de clúster de AKS para representar y visualizar clústeres de Kubernetes de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/aks-cluster/component-aks-cluster-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Name** (Nombre): ingresa un nombre para el clúster de AKS.
- **Tier** (Nivel): selecciona un nivel de servicio para tu clúster.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de clúster de AKS:

### Esquema

```json
{
    "type": "azureakscluster",
    "id": "9f8c8ee5-7828-4efc-8b34-fd26e69d1118",
    "resourceId":"/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster",
    "region": "eastus",
    "mapPos": [1,2.25],
    "mapSize": [11,6],
    "nodes": [
        "3511ff78-f94e-4830-88d7-54ffe91ecc28",
        "f0b6c469-26a2-49bd-8707-626cb513ea50"
    ],
    "name": "AKS Cluster",
    "tier": "standard",
    "color": {
        "isometric": "#CEE0F5",
        "2d": "#CEE0F5"
    },
    "accentColor": {
        "isometric": "#0078D4",
        "2d": "#0078D4"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `azureakscluster` para este componente.
- **id: string, uuid**: el identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **mapSize: array**: el tamaño del componente en el plano. La API usa un par único de ancho y alto para expresar el tamaño.
- **nodes: array**: las cargas de trabajo que se ejecutan en el clúster. Acepta una matriz de identificadores únicos para [el componente de carga de trabajo de AKS][2].
- **name: string**: el nombre del clúster. El valor predeterminado es `AKS Cluster`.
- **tier: string**: el nivel del clúster. Acepta uno de tres valores: `free`, `standard` o `premium`. El valor predeterminado es `standard`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `#CEE0F5`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `#0078D4`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/217-component-aks-workload