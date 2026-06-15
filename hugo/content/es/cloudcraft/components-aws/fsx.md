---
title: Componente FSx
---
## Información general

Utiliza el componente FSx para representar sistemas de archivos FSx de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/fsx/component-fsx-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'FSx' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **File system** (Sistema de archivos): el sistema de archivos utilizado para FSx.
- **Storage (GiB)** (Almacenamiento (GiB)): la cantidad de almacenamiento aprovisionado para el sistema de archivos.
- **Storage type** (Tipo de almacenamiento): selecciona un tipo de almacenamiento para el sistema de archivos. No disponible para el sistema de archivos de Lustre.
- **Throughput (MiB/s)** (Rendimiento (MiB/s)): la cantidad de capacidad de rendimiento agregada. No disponible para el sistema de archivos de Lustre.
- **Backup size (GiB)** (Tamaño de la copia de seguridad (GiB)): la cantidad de almacenamiento aprovisionado para la deduplicación de datos. No disponible para el sistema de archivos de Lustre.
- **Deployment type** (Tipo de despliegue): el tipo de despliegue para el sistema de archivos, único o multi AZ. No disponible para el sistema de archivos de Lustre.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

El siguiente es un JSON de ejemplo de un componente FSx:

```json
{
  "type": "fsx",
  "id": "df89904a-a53e-4c2d-b63c-757c7ad6b4aa",
  "region": "us-east-1",
  "mapPos": [0,10],
  "fileSystemType": "windows",
  "storageCapacity": 32,
  "storageType": "ssd",
  "throughputCapacity": 8,
  "backupCapacity": 600,
  "multiAZ": false,
  "color": {
    "isometric": "#3f8624",
    "2d": "#3f8624"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: fsx**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el componente FSx. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **fileSystemType: string**: el sistema de archivos utilizado para el componente FSx. Los valores aceptados son `windows` y `lustre`.
- **storageCapacity: number**: la cantidad de datos aprovisionados para el sistema de archivos en gibibytes.
- **storageType: string**: selecciona un tipo de almacenamiento para el sistema de archivos. Los valores aceptados son `ssd` y `hdd`. Sólo aplicable si `fileSystemType` está configurado como `windows`.
- **throughputCapacity: number**: la cantidad de capacidad de rendimiento agregada en mebibytes por segundo. Consulta [Valores aceptados para `throughputCapacity`](#accepted-values-for-throughputcapacity) para obtener más información.
- **backupCapacity: number**: la cantidad de almacenamiento aprovisionado para la deduplicación de datos, en gibibytes. Sólo aplicable si `fileSystemType` está configurado como `windows`.
- **multiAZ: boolean**: Si es `true`, el sistema de archivos FSx se despliega en múltiples zonas de disponibilidad de AWS. Sólo aplicable si `fileSystemType` está configurado como `windows`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente FSx puede ser añadido a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `throughputCapacity`

La clave `throughputCapacity` acepta los siguientes valores:

```
8, 16, 32, 64, 128, 256, 512, 1024, 2048
```

La clave `throughputCapacity` sólo es aplicable si `fileSystemType` está configurado como `windows`.

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/