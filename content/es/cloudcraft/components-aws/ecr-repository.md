---
title: Componente Repositorio de ECR
---
## Información general

Utiliza el componente Repositorio de ECR para visualizar los repositorios de contenedor de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ecr-repository/component-ecr-repository-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes interconectados de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
- **Data stored (GB)** (Datos almacenados (GB)): ingresa la cantidad de datos que almacenas en tus repositorios.
- **Private** (Privado): selecciona si tu repositorio es público o privado.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un componente Repositorio de ECR:

```json
{
    "type": "ecr",
    "id": "15e88546-33f3-40d5-b88c-e7cdae335da8",
    "arn": "arn:aws:ecr:us-east-1:728720640411:repository/cloudcraft",
    "region": "us-east-1",
    "mapPos": [7.5,6],
    "storageGB": 1,
    "private": true,
    "color": {
        "isometric": "#ff9800",
        "2d": "#ff9800"
    },
    "accentColor": {
        "isometric": "#ffffff",
        "2d": "#ffffff"
    },
    "link": "https://aws.amazon.com/ecr/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `ecr` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. La API admite todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **storageGB: number**: la cantidad de datos almacenados en los repositorios dentro del registro, en gigabytes. Por defecto es `1`.
- **private: boolean**: si el repositorio es privado. Por defecto es `true`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#3F7DDE`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#D86613`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#052048`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/