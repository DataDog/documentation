---
title: Componente de carga de trabajo de AKS
---

## Información general

Puedes usar el componente de carga de trabajo de AKS para representar y visualizar cargas de trabajo de Kubernetes de tu entorno de Azure.

{{< img src="cloudcraft/components-azure/aks-workload/component-aks-workload-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Name** (Nombre): ingresa un nombre para la carga de trabajo de AKS.
- **Type** (Tipo): selecciona el tipo de carga de trabajo en el clúster.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de carga de trabajo de AKS:

### Esquema

```json
{
    "type": "azureaksworkload",
    "id": "2d432a67-4b2b-4040-8e4b-19c513bc2491",
    "resourceId": "/subscriptions/2dedf330-e79d-4b8e-82b9-13f6fa619bbb/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/workloads/default/deployment/doc-agent",
    "region": "eastus",
    "mapPos": [2,3.25],
    "mapSize": [4,4],
    "nodes": [
        "375083c7-8212-4af6-859b-15fdc9da777d",
        "42062b69-bb14-4e05-87db-fa10cb408d5a",
        "26440a62-c06e-48f0-8c03-c5a3a2004050",
        "28efba36-1f3f-48ef-a1df-0d5473bcbf6e"
    ],
    "name": "AKS Workload",
    "workloadType": "deployment",
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

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `azureaksworkload` para este componente.
- **id: string, uuid**: el identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **mapSize: array**: el tamaño del componente en el plano. La API usa un par único de ancho y alto para expresar el tamaño.
- **nodes: array**: los contenedores de aplicaciones en la carga de trabajo. Acepta una matriz de identificadores únicos para [el componente de pod de AKS][2].
- **name: string**: el nombre de la carga de trabajo. El valor predeterminado es `AKS Workload`.
- **workloadType: string**: el tipo de carga de trabajo en el clúster. [A continuación encontrarás más información](#accepted-values-for-workloadType). El valor predeterminado es `deployment`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#CEE0F5`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `#CEE0F5`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#0078D4`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `#0078D4`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

## Valores aceptados para `workloadType`

La clave `workloadType` acepta uno de los siguientes valores de cadena:

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/218-component-aks-pod