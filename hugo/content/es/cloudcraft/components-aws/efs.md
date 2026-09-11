---
title: Componente EFS
---
## Información general

Utiliza el componente de bloque EFS para representar sistemas de archivos elásticos de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/efs/component-efs-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'EFS'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Storage** (Almacenamiento): la clase de almacenamiento utilizada para la carga de trabajo del sistema de archivos.
- **Storage (GiB)** (Almacenamiento (GiB)): cantidad de datos almacenados al mes.
- **Access Requests (GiB)** (Solicitudes de acceso (GiB)): cantidad de datos solicitados al mes. Solo disponible para las clases de almacenamiento Infrequent Access.
- **Throughput mode** (Modo de rendimiento): selecciona un modo de rendimiento para el sistema de archivos.
- **Throughput (MiB/s)** (Rendimiento (MiB/s)): cantidad de rendimiento adicional proporcionado. Solo disponible para el modo de rendimiento aprovisionado.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. 

### Esquema

A continuación, se muestra un ejemplo JSON de un componente EFS:

```json
{
  "type": "efs",
  "id": "c7031016-107f-4bc7-a18a-b86321a135b7",
  "region": "us-east-1",
  "availabilityZone": "us-east-1a",
  "mapPos": [1,2],
  "usageGb": 10,
  "readWriteGb": 0,
  "infrequentAccess": false,
  "throughputMode": "bursting",
  "throughput": 0,
  "color": {
    "isometric": "#e05243",
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

- **type: efs**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el componente EFS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **availabilityZone: string**: la zona de disponibilidad de AWS en la que está desplegado el sistema de archivos elástico. Solo aplicable para una zona de almacenamiento.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **usageGb: number**: la cantidad de datos almacenados en EFS por mes, en gibibytes.
- **readWriteGb: number**: la cantidad de datos solicitados al mes. Sólo aplicable si `infrequentAccess` está configurado como `true`.
- **infrequentAccess: boolean**: si es `true`, el sistema de archivos elástico utiliza la clase de almacenamiento Infrequent Access. Por defecto es `false`.
- **throughputMode: string**: selecciona un modo de rendimiento para el sistema de archivos elástico. Los valores aceptados son `bursting` o `provisioned`.
- **throughput: number**: la cantidad de rendimiento adicional en mebibytes por segundos al mes aprovisionado al sistema de archivos, basado en su tamaño. Sólo aplicable si `throughputMode` se establece en `provisioned`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente EFS puede añadirse a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/