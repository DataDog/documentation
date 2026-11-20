---
title: Componente de Block
---
## Información general

El Block es el más básico de los componentes disponibles. Junto con las imágenes y los íconos, puede utilizarse para representar componentes de la nube que todavía no están disponibles.

{{< img src="cloudcraft/components-common/block/component-block.png" alt="Captura de pantalla de una representación 3D del componente de bloque en Cloudcraft" responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: Selecciona un color predefinido o introduce el valor hexadecimal del color que desees. Puedes utilizar el mismo color para la vista 2D y 3D o elegir colores diferentes para cada una.
- **Ancho**: Elige el ancho de tu componente de bloque.
- **Altura**: Elige la altura de tu componente de bloque.
- **Profundidad**: Elige la profundidad de tu componente de bloque.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos de JSON. El siguiente es un ejemplo de objeto de JSON de un componente de Block:

```json
{
  "type": "block",
  "id": "76cddb57-6368-4e8b-805f-1306f558812b",
  "mapPos": [3, 9],
  "width": 2,
  "height": 1,
  "depth": 2,
  "color": {
    "isometric": "#ececed",
    "2d": "#4286c5"
  },
  "locked": true,
  "link": "blueprint://34b7a049-e92b-4146-b937-7eee9ae788b5"
}
```

- **Tipo: bloque**: El tipo de componente.
- **id: cadena**: Un identificador único para el componente en el formato `uuid`.
- **mapPos: [número, número]**: La posición del componente en el plano, expresada como un par de coordenadas x,y.
- **Ancho: número**: El ancho del componente del bloque. El valor predeterminado es 2.
- **Altura: número**: La altura del componente del bloque. El valor predeterminado es 1.
- **Profundidad: número**: La profundidad del componente de bloque. El valor predeterminado es 2.
- **color: objeto**: El color de relleno para el cuerpo del componente.
  - **isométrico: cadena**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**: Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **Vínculo: uri**: Componente de vínculo a otro diagrama en el formato `blueprint://ID` o a un sitio web externo en el formato `https://LINK`.
- **Bloqueado: booleano**: Si es true, los cambios en el componente a través de la aplicación se desactivan hasta que se desbloquee.

El componente de bloque puede añadirse a [VPC][2], [grupos de seguridad][3] y [subredes][4].

[1]: https://developers.cloudcraft.co/
[2]: https://help.cloudcraft.co/article/118-component-vpc
[3]: https://help.cloudcraft.co/article/119-component-security-group
[4]: /es/cloudcraft/components-aws/subnet/