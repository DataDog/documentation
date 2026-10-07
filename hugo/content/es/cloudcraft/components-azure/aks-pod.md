---
title: Componente de pod de AKS
---

## Información general

Puedes usar el componente de pod de AKS para representar y visualizar contenedores de aplicaciones de tu entorno de Azure con Cloudcraft.

{{< img src="cloudcraft/components-azure/aks-pod/component-aks-pod-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.

## API

Usa [la API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de clúster de AKS:

### Esquema

```json
{
    "type": "azureakspod",
    "id": "28efba36-1f3f-48ef-a1df-0d5473bcbf6e",
    "resourceId":"/subscriptions/fd182fc4-48dc-4825-88da-1c1c59c7eab5/resourceGroups/DOC-RESOURCE-GROUP/providers/Microsoft.ContainerService/managedClusters/doc-cluster/pods/default/doc-agent-fdf8f8fb7",
    "region": "eastus",
    "mapPos": [4,5.25],
    "color": {
        "isometric": "#075693",
        "2d": "#075693"
    },
    "accentColor": {
        "isometric": "#2EC8EA",
        "2d": "#2EC8EA"
    },
    "link": "https://azure.microsoft.com/products/kubernetes-service",
    "locked": true
}
```

- **type: string**. El tipo de componente. Debe ser una cadena con el valor `azureakspod` para este componente.
- **id: string, uuid**. El identificador único del componente. La API usa un UUID versión 4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**. El identificador único global del componente dentro de Azure.
- **region: string**. La región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**. La posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **color: object**. El color de relleno para el cuerpo del componente.
  - **isometric: string**. Un color hexadecimal para el cuerpo del componente en la vista 3D. El valor predeterminado es `#075693`.
  - **2d: string**. Un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `#075693`.
- **accentColor: object**. El color de énfasis para el logotipo del componente.
  - **isometric: string**. Un color hexadecimal para el logotipo del componente en la vista 3D. El valor predeterminado es `#2EC8EA`.
  - **2d: string**. Un color hexadecimal para el logotipo del componente en la vista 2D. El valor predeterminado es `#2EC8EA`.
- **link: string, uri**. URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**. Si se permiten cambios en la posición del componente a través de la interfaz web. El valor predeterminado es `false`.

[1]: https://developers.cloudcraft.co/