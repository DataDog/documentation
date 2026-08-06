---
title: Componente Elasticsearch
---
## Información general

Utiliza el componente Elasticsearch para representar los clústeres de Elasticsearch desde tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/elasticsearch/component-elasticsearch-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente Elasticsearch de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Role** (Rol): selecciona el rol de la instancia de Elasticsearch.
- **Instance count** (Recuento de instancias): introduce el número de instancias para el clúster de Elasticsearch.
- **Instance type** (Tipo de instancia): selecciona el tipo de instancia. Al cambiar el tipo de instancia, se modifican los detalles de hardware que aparecen en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Size** (Tamaño): selecciona el tamaño de la instancia. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.
- **Billing option** (Opción de facturación): el modelo de precios utilizado para la instancia.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente Elasticsearch:

```json
{
  "type": "es",
  "id": "5f8df311-0641-410e-b427-89b7dc5e5b84",
  "region": "us-west-2",
  "mapPos": [0,10],
  "role": "data",
  "instanceCount": 2,
  "instanceType": "t3",
  "instanceSize": "medium",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticsearch-service/",
  "locked": true
}
```

- **type: es**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de Elastisearch. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **role: string**: el rol utilizado para la instancia de Elasticsearch. Los valores aceptados son `data` y `master`.
- **instanceCount: number**: el número de instancias en el clúster de Elasticsearch. Por defecto es `1`.
- **instanceType: string**: el tipo de la instancia. Consulta [Valores aceptados para `instanceType`](#accepted-values-for-instancetype) para obtener más información.
- **instanceSize: string**: el tamaño de la instancia. Consulta [Valores aceptados para `instanceSize`](#accepted-values-for-instancesize) para obtener más información.
- **billingOptions: object**: el modelo de precios utilizado para la instancia. Consulta [Valores aceptados para `billingOptions`](#accepted-values-for-billingoptions) para obtener más información.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente Elasticsearch puede añadirse a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
c4, c5, i2, i3, m3, m4, m5, r3, r4, r5, t2, t3, ultrawarm1
```

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 9xlarge, 10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge
```

## Valores aceptados para `billingOptions`

La clave `billingOptions` admite todas las opciones de facturación aceptadas por la aplicación web de Cloudcraft:

- Bajo demanda
- Instancia reservada

Cada opción se representa de forma diferente dentro del objeto `billingOptions`.

### Bajo demanda

```json
{
  "billingOptions": {
    "type": "od",
    "utilization": 1
  }
}
```

- **type: od**: el valor de la opción de facturación Bajo demanda es siempre `od`.
- **utilization: number**: un número flotante que representa cuánto se utiliza la instancia en un mes determinado.

### Instancia reservada

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront"
  }
}
```

- **type: ri**: el valor de la opción de facturación para una instancia reservada es siempre `ri`.
- **leaseContractLength**: el tiempo por el que se reserva la instancia. Los valores aceptados son `12` o `36`.
- **purchaseOption: string**: la opción de compra de la instancia. Los valores aceptados son `No Upfront`, `Partial Upfront` y `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/