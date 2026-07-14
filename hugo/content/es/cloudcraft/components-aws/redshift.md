---
title: Componente de Redshift
---
## Información general

Utiliza el componente de Redshift para representar almacenes de datos de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/redshift/component-redshift-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS 'Redshift'." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Nodos**: introduce el número de nodos para el clúster de Redshift.
- **Instance type** (Tipo de instancia): selecciona el tipo de instancia de Redshift. Al cambiar el tipo de instancia se modifican los detalles de hardware que aparecen en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Size** (Tamaño): selecciona el tamaño de la instancia de Redshift. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un componente de Redshift:

```json
{
  "type": "redshift",
  "id": "c1aa0ae1-8e0d-466d-a8a8-51cc9b8a6b35",
  "region": "us-west-2",
  "mapPos": [1,2],
  "nodeCount": 2,
  "instanceType": "ra3",
  "instanceSize": "xlplus",
  "color": {
    "isometric": "#80b1dc",
    "2d": "#000000"
  },
  "accentColor": {
    "isometric": "#03a9f4",
    "2d": "#03a9f4"
  },
  "link": "https://aws.amazon.com/redshift/",
  "locked": true
}
```

- **type: redshift**: el tipo de componente.
- **id: string**: identificador único del componente en formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de Redshift. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **nodeCount: number**: el número de nodos para el clúster de Redshift. Por defecto es `1`.
- **instanceType: string**: el tipo de la instancia. Consulta [Valores aceptados para `instanceType`](#accepted-values-for-instancetype) para obtener más información.
- **instanceSize: string**: el tamaño de la instancia. Consulta [Valores aceptados para `instanceSize`](#accepted-values-for-instancesize) para obtener más información.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente de Redshift puede añadirse a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
dc1, dc2, ds1, ds2, ra3
```

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
large, xlarge, xlplus, 4xlarge, 8xlarge, 16xlarge
```

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/