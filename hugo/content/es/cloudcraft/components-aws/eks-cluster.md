---
title: Componente Clúster de EKS
---
## Información general

<div class="alert alert-info">Para analizar los componentes de Amazon EKS es necesario <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autorizar un rol de IAM de Cloudcraft para el acceso de solo visualización</a>.</div>

Utiliza el componente Clúster de EKS para visualizar clústeres de Amazon EKS desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-cluster/component-eks-cluster-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para la parte superior del componente y un color de énfasis para la parte inferior y el logotipo. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Name** (Nombre): ingresa un nombre para el clúster.

También puedes añadir el componente **EKS Cluster** (Clúster de EKS) a [VPCs][1], [grupos de seguridad][2] y [subredes][3].

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Clúster de EKS:

```json
{
    "type": "ekscluster",
    "id": "0b9f9ea3-2ba7-46fd-bd40-cd694dc38af6",
    "arn": "arn:aws:eks:us-east-1:987867537671:cluster/eks-cluster",
    "region": "us-east-1",
    "mapPos": [2.5,-1.75],
    "name": "EKS Cluster",
    "nodes": [
        "c00c8af0-d409-4a1c-9db4-e2f96128ad56",
        "3d911e8b-2d8e-4cb7-8eb8-61b2e96c75b3"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#ff5722",
        "2d": "#ff5722"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ekscluster` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][5].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][6].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **name: string**: el nombre del clúster. Por defecto es `EKS Cluster`.
- **nodes: array**: las cargas de trabajo que se ejecutan en el clúster. Acepta una matriz de identificadores únicos para [el componente de carga de trabajo de EKS][2].
- **color: object**: el color de relleno para la parte superior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ECECED`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#ECECED`.
- **accentColor: object**: el color de énfasis para la parte inferior del cuerpo del componente y su logotipo.
  - **isometric: string**: un color hexadecimal para la parte inferior del cuerpo del componente y su logotipo en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#693CC5`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: /es/cloudcraft/components-aws/vpc/
[2]: /es/cloudcraft/components-aws/security-group/
[3]: /es/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /es/cloudcraft/faq/scan-error-aws-china-region/
[7]: /es/cloudcraft/components-aws/eks-workload/