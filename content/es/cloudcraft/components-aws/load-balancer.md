---
title: Componente del equilibrador de carga
---
## Información general

Utiliza el componente del equilibrador de carga para representar los equilibradores de carga de aplicaciones y red de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/load-balancer/component-load-balancer-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente Equilibrador de carga de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Type** (Tipo): selecciona el tipo de equilibrador de carga elástico, clásico, de aplicación o red.
- **Data processed** (Datos procesados): el volumen total de datos procesados por hora, en gigabytes. Sólo disponible para el tipo `classic`.
- **LCUs**: el número de unidades de capacidad del equilibrador de carga. Solo disponible para los equilibradores de carga de tipo aplicación y red.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente del equilibrador de carga:

```json
{
  "type": "elb",
  "id": "811ac6d8-bd6b-4d19-8504-d68d6c8381a9",
  "region": "us-east-2",
  "mapPos": [0,10],
  "elbType": "application",
  "dataGb": 10,
  "lcu": 1,
  "color": {
    "2d": "#693cc5",
    "isometric": "#ececed"
  },
  "accentColor": {
    "2d": "#ffffff",
    "isometric": "#4286c5"
  },
  "link": "blueprint://e2fd00f6-84d9-4a40-acf0-ff2ea01ae59c",
  "locked": true
}
```

- **type: elb**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el equilibrador de carga. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **elbType: string**: tipo de equilibrador de carga elástico. Acepta `classic`, `application` o `network` como valores.
- **dataGb: number**: el volumen de datos procesados por hora por el equilibrador de carga, en gigabytes. Solo aplicable a equilibradores de carga de tipo `classic`.
- **lcu: number**: el número de unidades de capacidad del equilibrador de carga. Solo aplicable a los equilibradores de carga de tipo aplicación o red.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis que se usa para mostrar el logotipo del componente sobre el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: https://developers.cloudcraft.co/