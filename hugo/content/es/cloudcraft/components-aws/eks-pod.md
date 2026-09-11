---
title: Componente Pod de EKS
---
## Información general

<div class="alert alert-info">Para analizar los componentes de Amazon EKS es necesario <a href="https://docs.datadoghq.com/cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/">autorizar un rol de IAM de Cloudcraft para el acceso de solo visualización</a>.</div>

Utiliza el componente Pod de EKS para visualizar los contenedores de Amazon EKS desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/eks-pod/component-eks-pod-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para el símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Compute** (Computación): selecciona el tipo de nodo de trabajo. Las opciones admitidas son Fargate y Grupo de nodos.
- **CPU**: selecciona el valor de vCPU para tu pod. Esta opción no está disponible para los grupos de nodos.
- **Memory (GB)** (Memoria (GB)): selecciona la cantidad de memoria disponible para el pod. Esta opción no está disponible para grupos de nodos.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Pod de EKS:

```
{
    "type": "ekspod",
    "id": "cc5104b0-1747-441c-a7b7-b760796d475b",
    "region": "us-east-1",
    "mapPos": [6.5,2.5],
    "compute": "fargateProfile",
    "cpu": "0.25",
    "memoryGB": "0.5",
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/eks/",
    "locked": true
}
```

La representación del esquema del componente **Pod de EKS** sigue el formato anterior y define todos los campos dentro de un diagrama para este componente.

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ekspod` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **compute: string**: el tipo de nodo de trabajo para el pod. Acepta uno de los siguientes valores: `fargateProfile` o `nodeGroup`. Por defecto es `nodeGroup`.
- **cpu: number**: el número de vCPUs disponibles para el pod. Consulta [Valores aceptados para `cpu`](#accepted-values-for-cpu) para obtener más información. Por defecto es `0.25`.
- **memoryGB: number**: la cantidad de memoria disponible para el pod. Consulta [Valores aceptados para `memoryGB`](#accepted-values-for-memorygb) para obtener más información. Por defecto es `0.5`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#3C3C3C`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#D86613`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#FF9800`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para `cpu`

La clave `cpu` acepta los siguientes valores:

```
0.25, 0.5, 1, 2, 4
```

**Nota**: Esta clave sólo afecta a los pods cuando `compute` está configurado como `fargateProfile`.

## Valores aceptados para `memoryGB`

La clave `memoryGB` acepta los siguientes valores:

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Nota**: Esta tecla sólo afecta a los pods cuando `compute` está configurado como `fargateProfile`.

## Combinaciones válidas para `cpu` y `memoryGB`

Las claves `cpu` y `memoryGB` determinan conjuntamente los recursos asignados a cada contenedor en un pod, pero debes proporcionar una combinación válida de valores.

En la tabla siguiente, se indican las combinaciones válidas.

la cpu   | memoryGB
----  | ---------
0.25  | 0.5, 1, 2
0.5   | {1..4}
1     | {2..8}
2     | {4..16}
4     | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/