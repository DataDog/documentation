---
title: Componente del grupo de escalado automático
---
## Información general

Utiliza el componente del Grupo de escalado automático para representar grupos de escalado automático de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/auto-scaling-group/component-auto-scaling-group-diagram.png" alt="Captura de pantalla de un diagrama de Cloudcraft isomético que muestra el componente de AWS 'Grupo de escalado automático'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar tu componente. Dispone de las siguientes opciones:

- **Color**. Selecciona un color predefinido o introduce el valor hexadecimal del color para el componente. El componente puede utilizar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Disposición**. Selecciona la disposición para el grupo de escalado automático, "uniforme", donde los miembros se disponen uniformemente en el espacio disponible, o "manual", donde los miembros se colocan manualmente.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. 

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Grupo de escalado automático:

```json
{
  "type": "asg",
  "id": "0998cf01-d22e-4324-83a9-b06ffbd93188",
  "region": "us-east-2",
  "mapPos": [-2.75, 9],
  "mapSize": [3.25, 1],
  "layout": "even",
  "nodes": [
    "056b4f94-fe18-43de-9e55-325d31813a80",
    "d037dd26-252e-4ba0-95f7-e6656cd00413"
  ],
  "color": {
    "2d": "#f5b720",
    "isometric": "#f5b720"
  },
  "link": "blueprint://bbb22829-4abb-4fba-8a25-1896545eb9d1",
  "locked": true
}
```

- **type: asg**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el grupo de escalado automático. Se admiten todas las regiones globales excepto las regiones de `cn-`.
- **mapPos: [number, number]**: la posición del componente en el blueprint, expresada como un par de coordenadas x e y.
- **mapSize: [number, number]**: el tamaño del grupo de escalado automático en el blueprint.
- **layout: string**: el diseño del grupo de escalado automático. Los valores aceptados son `even` o `manual`.
- **nodos: array**: las instancias de EC2 dentro del grupo de escalado automático. Debe consistir en una matriz de identificadores únicos emitidos por Cloudcraft para las instancias de EC2.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **Enlace: uri**: enlaza el componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/