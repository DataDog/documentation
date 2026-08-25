---
title: Región
---

## Información general

Utiliza el componente Región para representar la ubicación física desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-AWS/region/component-region-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft en el cual se muestra el componente 'Región' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Visibilidad**. Alterna la visibilidad del componente en el diagrama.
- **Color**. Selecciona un color de relleno para el cuerpo del componente y un color de acento para su símbolo. Puedes utilizar los mismos colores en las vistas 2D y 3D o colores diferentes para cada una.
- **Relleno**. Introduce el valor de relleno para ajustar el espacio entre el borde del componente y su contenido.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un JSON de ejemplo de un componente Región:

```json
{
    "type": "region",
    "id": "1063814395",
    "arn":"arn:aws::us-east-1::",
    "region": "us-east-1",
    "visible": true,
    "padding": 2,
    "shape": "rectangular",
    "nodes": [
        "6acd2c2e-60aa-44bd-93e8-aca071ef85ff"
    ],
    "color": {
        "isometric": "#a991e1",
        "2d": "#a991e1"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **Tipo: cadena**: El tipo de componente.
- **id: cadena**: Identificador único del componente formado por 10 dígitos aleatorios.
- **arn: cadena**: El identificador único a nivel mundial para el componente en AWS, denominado [Nombres de recursos de Amazon](https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html). El componente de región toma un valor de ARN ficticio que siempre es igual a `arn:aws::region::`.
- **Región: cadena**: La propia región de AWS. Se admiten todas las regiones mundiales excepto las regiones `cn-`.
- **Visible: booleano**: Si `false`, el componente se hace semitransparente en el diagrama.
- **Relleno: número**: El valor de relleno para el componente.
- **Forma: cadena**: La forma del componente. El componente de región sólo admite la forma `rectangular`.
- **Nodos: matriz**: Una matriz de ID de nodos que están dentro de la región. Los ID de los nodos tienen el formato `uuid`.
- **Color: objeto**: El color de relleno para el cuerpo del componente.
  - **Isométrico: cadena**: El color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal. En forma predeterminada es `#ECECED`.
  - **2d: cadena**: El color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal. En forma predeterminada es `#CC2264`.
- **Enlace: uri**: Vincula el componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **Bloqueado: booleano**: Si `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloqueen.