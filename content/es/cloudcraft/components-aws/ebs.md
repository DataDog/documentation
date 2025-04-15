---
title: Componente de EBS
---
## Información general

Utiliza el componente de EBS para representar volúmenes de EBS de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ebs/component-ebs-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'EBS'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Tipo de volumen**: el tipo de volumen utilizado.
- **Almacenamiento**: cantidad de almacenamiento del volumen en gibibytes.
- **IOPS**: límite de IOPS para el volumen. Solo disponible para volúmenes SSD.
- **Rendimiento**: límite de rendimiento del volumen. Sólo disponible para volúmenes `gp3`.
- **Solicitudes de E/S por segundo: límite de E/S para el volumen. Sólo disponible para volúmenes de discos duros magnéticos (HDD) de generaciones anteriores.
- **Snapshot**: cantidad de almacenamiento para snapshots en gibibytes.


## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un componente de volumen de EBS:

```json
{
  "type": "ebs",
  "id": "100b1d12-49e7-4dfb-8948-0e0abf0e5d33",
  "region": "us-east-1",
  "mapPos": [-1,9],
  "volume": "gp3",
  "storage": "200",
  "iops": "4000",
  "throughput": "500",
  "snapshots": "0",
  "color": {
    "isometric": "#000000",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#ffeb3b",
    "2d": "#ffeb3b"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ebs**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el volumen de EBS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **volume: string**: el tipo del volumen. Los valores aceptados son `gp3`, `gp2`, `io2`, `io1`, `st1`, `sc1` o `magnetic`.
- **storage: number**: cantidad de almacenamiento para el volumen en gibibytes.
- **iops: number**: límite de IOPS para el volumen. No aplicable para el tipo de volumen `st1` y `sc1`.
- **throughput: number**: límite de rendimiento para el volumen. Sólo aplicable para el tipo de volumen `gp3`.
- **snapshots: number**: cantidad de almacenamiento para snapshots en gibibytes.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: enlace del componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/