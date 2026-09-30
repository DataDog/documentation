---
title: Componente Carga de trabajo de EKS
---
## Información general

<div class="alert alert-info">Para analizar los componentes de Amazon EKS es necesario <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autorizar un rol de IAM de Cloudcraft para el acceso de solo visualización</a>.</div>

Utiliza el componente Carga de trabajo de EKS para visualizar las cargas de trabajo de Amazon EKS desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-workload/component-eks-workload-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para la parte superior del componente y un color de énfasis para la parte inferior. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Name** (Nombre): ingresa un nombre para la carga de trabajo.
- **Type** (Tipo): selecciona el tipo de carga de trabajo a utilizar.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Carga de trabajo de EKS:

```json
{
    "type": "eksworkload",
    "id": "a5cad956-3366-4582-a73a-2709d53e975f",
    "region": "us-east-1",
    "mapPos": [3.5,-0.75],
    "name": "EKS Workload",
    "workloadType": "deployment",
    "nodes": [
        "cadf6a3f-67d2-4df9-ad40-f892030af58b",
        "a9437fdf-56f9-4c3b-8acf-6f0f37f70980",
        "b15e51da-b99b-4072-b4c4-e9e85df7e285",
        "b5878fa9-bf1a-44d0-bc8d-336f99763fce"
    ],
    "color": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `eksworkload` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **name: string**: el nombre de la carga de trabajo. El valor predeterminado es `EKS Workload`.
- **workloadType: string**: el tipo de carga de trabajo en el clúster. Consulta [Valores aceptados para `workloadType`](#accepted-values-for-workloadType) para obtener más información. Por defecto es `deployment`.
- **nodes: array**: los pods que se ejecutan en esta carga de trabajo. Acepta una matriz de identificadores únicos de pods de EKS.
- **color: object**: el color de relleno para la parte superior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#FFFFFF`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **accentColor: object**: el color de énfasis para la parte inferior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286C5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#693CC5`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para `workloadType`

La clave `workloadType` acepta uno de los siguientes valores de cadena:

```
deployment, statefulSet, daemonSet, job, cronJob
```

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/