---
title: Componente Tarea de ECS
---
## Información general

Utiliza el componente Tarea de ECS para visualizar tareas de Amazon ECS en tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-task/component-ecs-task-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Launch type** (Tipo de lanzamiento): selecciona el tipo de lanzamiento para tu tarea independiente. Las opciones admitidas son Fargate y EC2.
- **CPU**: selecciona la CPU a nivel de tarea. Esta opción no está disponible para EC2.
- **Memory (GB)** (Memoria (GB)): selecciona la cantidad de memoria disponible a nivel de tarea. Esta opción no está disponible para EC2.
- **Storage (GiB)** (Almacenamiento (GiB)): ingresa la cantidad de almacenamiento aprovisionado para la tarea, en gibibytes. Esta opción no está disponible para EC2.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. 

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Tarea de ECS:

```json
{
    "type": "ecstask",
    "id": "d76098b3-0d07-4362-80c9-018e474bb910",
    "arn": "arn:aws:ecs:us-east-1:746399320916:task/ecs-cluster/9790893504785954834",
    "region": "us-west-2",
    "mapPos": [7.5,3],
    "launchType": "fargate",
    "cpu": "256",
    "memoryGB": "0.5",
    "storageGB": 20,
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ecstask` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. La API admite todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **launchType: string**: el tipo de lanzamiento para la tarea independiente. Acepta uno de los siguientes valores: `fargate` o `ec2`. Por defecto es `ec2`.
- **cpu: number**: el número de vCPUs a nivel de tarea. Consulta [Valores aceptados para cpu](#accepted-values-for-cpu) para obtener más información. Por defecto es `256`.
- **memoryGB: number**: la cantidad de memoria a nivel de tarea. Consulta [Valores aceptados para memoryGB](#accepted-values-for-memorygb) para obtener más información. Por defecto es `0.5`.
- **storageGB: numbe**: la cantidad de almacenamiento provisionado para la tarea, en gibibytes. Acepta un valor entre `20` y `200`. Por defecto es `20`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed` para EC2 y `#3c3c3c` para Fargate.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#d86613`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para `cpu`

La clave `cpu` acepta los siguientes valores:

```
256, 512, 1024, 2048, 4096
```

**Nota**: Esta clave no hace nada si se configura `launchType` en `ec2`.

## Valores aceptados para `memoryGB`

La clave `memoryGB` acepta los siguientes valores:

```
0.5, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
```

**Nota**: Esta clave no hace nada si se configura `launchType` en `ec2`.

## Combinaciones válidas para `cpu` y `memoryGB`

Las claves `cpu` y `memoryGB` juntas determinan el tamaño de tu tarea, pero debes proporcionar una combinación válida de valores.

En la tabla siguiente, se indican las combinaciones válidas.

CPU  | memoryGB
---- | ---------
256  | 0.5, 1, 2
512  | {1..4}
1024 | {2..8}
2048 | {4..16}
4096 | {8..30}

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/