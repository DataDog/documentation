---
title: Componente Clúster de ECS
---
## Información general

Utiliza el componente Clúster de ECS para visualizar clústeres de Amazon ECS en tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecs-cluster/component-ecs-cluster-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para la parte superior del componente y un color de énfasis para la parte inferior. Puedes utilizar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Name** (Nombre): ingresa un nombre para el clúster. Puedes utilizar hasta 255 letras, números, guiones y guiones bajos.

También puedes añadir el componente Clúster de ECS a [VPCs][1] y [subredes][2].

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Clúster de ECS:

```json
{
    "type": "ecscluster",
    "id": "c28296e2-01b1-463c-be6d-fe748a3dba05",
    "arn": "arn:aws:ecs:us-east-1:746399320916:cluster/ecs-cluster",
    "region": "us-east-1",
    "mapPos": [3,-1.75],
    "name": "ECS Cluster",
    "nodes": [
        "35578835-bb50-43f6-b9bc-d9a7ff20f667",
        "adad4f6e-b1dc-4e90-a860-e6c34d1d707a",
        "6321a7c4-db1f-4b47-a2dd-2d4c1a3deaff",
        "bafdae24-a6af-47ad-896d-846d790c8b23",
        "117a0f24-a115-4f12-8627-e8c8b9665d86",
        "c4af84a8-a02d-400e-9277-ad1ed886390f",
        "93a34859-a6ef-451d-96c2-4cfccab86d70",
        "b0e607e8-8b01-492b-b4a0-f4eea35d19f1",
        "085ca535-3b23-420c-a19c-27ae3d11a2ab",
        "eb7cc62b-db25-4ce4-97dd-130bb288512a"
    ],
    "color": {
        "isometric": "#ffeb3b",
        "2d": "#ffeb3b"
    },
    "accentColor": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "link": "https://aws.amazon.com/ecs/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ecscluster` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][4].
- **region: string**: la región de AWS para el componente. La API admite todas las regiones del mundo, [excepto AWS China][5].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **name: string**: el nombre del clúster. Acepta hasta 255 letras, números, guiones y guiones bajos.
- **nodes: array**: los servicios y las tareas que se ejecutan dentro del clúster. Acepta una matriz de identificadores únicos para servicios y los componentes de las tareas.
- **color: object**: el color de relleno para la parte superior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#ececed`.
- **accentColor: object**: el color de énfasis para la parte inferior del cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286c5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#693cc5`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: /es/cloudcraft/components-aws/vpc/
[2]: /es/cloudcraft/components-aws/subnet/
[3]: https://developers.cloudcraft.co/
[4]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[5]: /es/cloudcraft/faq/scan-error-aws-china-region/