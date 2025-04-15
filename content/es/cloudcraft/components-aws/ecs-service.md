---
title: Componente Servicio de ECS
---
## Información general

Utiliza el componente Servicio de ECS para visualizar servicios de Amazon ECS en tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-service/component-ecs-service-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para la parte superior del componente y un color de énfasis para la parte inferior. Puedes utilizar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Name (Nombre)**: ingresa un nombre para el servicio.

También puedes añadir el componente **ECS Service** (Servicio de ECS) a [VPCs][1], [grupos de seguridad][2] y [subredes][3].

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un componente Servicio de ECS:

```json
{
    "type": "ecsservice",
    "id": "58c88e1f-b9c7-47a0-aed1-ee8324bf0fd0",
    "arn": "arn:aws:ecs:us-east-1:746399320916:service/ecs-service",
    "region": "us-east-1",
    "mapPos": [6,1],
    "name": "ECS Service",
    "nodes": [
        "1005e737-2ccc-4325-abdf-b0f6c5c78ea1",
        "319c40a5-d5f2-4394-8784-f613aa1d313b"
    ],
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#03a9f4",
        "2d": "#03a9f4"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ecsservice` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][5].
- **region: string**: la región de AWS para el componente. La API admite todas las regiones del mundo, [excepto AWS China][6].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **name: string**: el nombre del servicio. Por defecto es `ECS Service`.
- **nodes: array**: las tareas que se ejecutan dentro del servicio. Acepta una matriz de identificadores únicos para tareas de tipo de lanzamiento de EC2 o Fargate.
- **color: object**: el color de relleno para la parte superior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ffffff`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#ffffff`.
- **accentColor: object**: el color de énfasis para la parte inferior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286c5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#693cc5`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: /es/cloudcraft/components-aws/vpc/
[2]: /es/cloudcraft/components-aws/security-group/
[3]: /es/cloudcraft/components-aws/subnet/
[4]: https://developers.cloudcraft.co/
[5]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[6]: /es/cloudcraft/faq/scan-error-aws-china-region/