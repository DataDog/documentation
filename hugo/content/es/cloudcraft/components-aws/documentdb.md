---
title: Componente DocumentDB
---
## Información general

Utiliza el componente DocumentDB para representar clústeres de DocumentDB desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/documentdb/component-documentdb-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'DocumentDB'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Role** (Rol): selecciona el rol de la instancia de DocumentDB. Puede ser escritor o lector.
- **Instance type** (Tipo de instancia): el tipo de la instancia. Al cambiar el tipo de instancia se modifican los detalles de hardware mostrados en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Size** (Tamaño): el tamaño del clúster de base de datos. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.
- **Storage (GiB)** (Almacenamiento (GiB)): cantidad de almacenamiento prevista para el clúster, en gibibytes. Sólo disponible para el rol de escritor.
- **Snapshots (GiB)**: cantidad de almacenamiento aprovisionado para snapshots, en gibibytes. Solo disponible para el rol de escritor.
- **IOPS (millones)**: el límite mensual de E/S para el clúster, en millones. Solo disponible para el rol de escritor.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente DocumentDB:

```json
{
  "type": "docdb",
  "id": "36f18266-2d25-4003-9719-ee64899e2c4e",
  "region": "us-east-1",
  "mapPos": [2,4],
  "role": "writer",
  "instanceType": "t3",
  "instanceSize": "medium",
  "storage": 10,
  "snapshots": 4,
  "iops": "200",
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: docdb**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de RDS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **role: string**: el rol utilizado para la instancia de DocumentDB. Los valores aceptados son `writer` y `reader`.
- **instanceType: string**: el tipo de la instancia. Los valores aceptados son `r4`, `r5` y `t3`.
- **instanceSize: string**: el tamaño del clúster de base de datos. Consulta [Valores aceptados para instanceSize](#accepted-values-for-instancesize) para obtener más información.
- **storage: number**: cantidad de almacenamiento aprovisionado para el clúster, en gibibytes. Sólo aplicable si `role` está configurado como `writer`.
- **snapshots: number**: cantidad de almacenamiento aprovisionado para snapshots, en gibibytes. Sólo aplicable si `role` está configurado como `writer`.
- **iops: number**: el límite mensual de E/S para el clúster, en millones. Sólo aplicable si `role` está configurado como `writer`.
- **color: object**. el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: enlaza el componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente DocumentDB puede añadirse a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/