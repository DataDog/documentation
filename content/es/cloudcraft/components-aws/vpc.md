---
title: Componente VPC
---
## Información general

Utiliza el componente VPC para representar redes virtuales aisladas de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/vpc/component-vpc-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'VPC' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Name** (Nombre): de un nombre a la VPC.
- **Shape** (Forma): selecciona una forma para la VPC.
- **Padding** (Relleno): aumenta o disminuye la cantidad de espacio dentro de la VPC.
- **Peering** (Interconexión): ver, eliminar o añadir conexiones de interconexión a otras VPCs.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente VPC:

```json
{
  "type": "vpc",
  "id": "5631f2ca-3d93-4591-a7d9-85d5f0d011eb",
  "region": "us-east-1",
  "name": "cloudcraft-vpc-example",
  "shape": "rectangular",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "locked": true
}
```

- **type: vpc**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que está desplegada esta VPC. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **name: string**: el nombre para la VPC.
- **shape: string**: la forma de la VPC. Los valores aceptados son `dynamic` o `rectangular`.
- **padding: number**: el relleno interno para la VPC. Por defecto es `1.5`.
- **nodes: array**: los componentes dentro de la VPC. Consulta [Valores aceptados para `nodes`](#accepted-values-for-nodes) para más información.
- **peeringConnections: array**: las VPC que realizan interconexiones a esta VPC. Consulta [Valores aceptados para `peeringConnections`](#accepted-values-for-peeringconnections) para obtener más información.
- **color: object**: el color de relleno para el componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

### Valores aceptados para `nodes`

La clave `nodes` acepta una matriz de identificadores únicos para los componentes dentro de la VPC.

Los siguientes componentes de AWS pueden añadirse dentro de una VPC:

```
asg, ec2, lambda, efs, fsx, elb, subnet, sg, rds, docdb, elasticache, redshift, es, natgateway, internetgateway, vpngateway, customergateway
```

Además de los componentes de AWS, también se pueden añadir los siguientes componentes comunes dentro de una VPC:

```
block, isotext, icon, image, area
```

### Valores aceptados para `peeringConnections`

La clave `peeringConnections` acepta una matriz, en la que cada interconexión está representada por un objeto JSON.

```
{
  "peeringConnections": [
    {
      "id": "1a367d09-beea-4a87-9740-1831c1809d00",
      "name": "Example Peering",
      "accepterVpc": "f38bc8ae-98c1-45c5-b7ad-54e9bb9ee166",
      "hidden": false
    }
  ]
}
```

- **id: string**: un identificador único en el formato `uuid` para esta interconexión.
- **name: string**: el nombre de esta conexión. Consulta la imagen del componente en la parte superior de la página para ver cómo se muestra.
- **accepterVpc: string**: la `id` de la VPC aceptante.
- **hidden: boolean**: si es `true`, la interconexión no se muestra en el diagrama. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/