---
title: Componente de subred
---

## Información general

Utiliza el componente de subred para representar subredes de tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/subnet/component-subnet.png" alt="Captura de pantalla de una representación 3D del componente de subred AWS" responsive="true" style="width:60%;">}}


## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su realce. El componente puede utilizar el mismo color para las vistas 2D y 3D o colores diferentes para cada una.
- **Nombre**: Dale un nombre a la subred.
- **Forma**: Selecciona una forma para la subred.
- **Relleno**: Aumenta o disminuye la cantidad de espacio dentro de la subred.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo de objeto JSON de un componente de subred:

```json
{
  "type": "subnet",
  "id": "838f6f30-9cdd-4c6b-9eb2-dd71b9c64047",
  "region": "us-east-1",
  "name": "example-cloudcraft-sb",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "link": "blueprint://90fb6b0b-f66e-4196-8d16-d68921448fdb",
  "locked": true
}
```

- **type: subnet**: Tipo de componente.
- **id: string**: Identificador único del componente en formato `uuid`.
- **region: string**: Región de AWS en la que se despliega esta subred. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **name: string**: Nombre de la subred.
- **shape: string**: Forma de la subred. Acepta los valores `dynamic` o `rectangular`.
- **padding: number**: Relleno interno de la subred. Por defecto es `1.5`.
- **nodes: array**: Componentes dentro de la subred. Consulta [Valores aceptados para `nodes`](#accepted-values-for-nodes) para obtener más información.
- **color: object**: Color de relleno del componente.
  - **isometric: string**: Color de relleno del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: Color de relleno del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: Vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

### Valores aceptados para `nodes`

La clave `nodes` acepta una matriz de identificadores únicos para los componentes dentro de la subred.

Los siguientes componentes de AWS pueden añadirse dentro de una subred:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es, natgateway
```

Además de los componentes de AWS, también se pueden añadir los siguientes componentes comunes dentro de una subred:

```
block, isotext, icon, image, area
```

[1]: https://developers.cloudcraft.co/