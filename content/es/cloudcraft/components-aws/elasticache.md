---
title: Componente ElastiCache
---
## Información general

Utiliza el componente ElastiCache para representar la caché en memoria o los almacenes de datos de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/elasticache/component-elasticache-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente "ElastiCache" de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Colors** (Colores): selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Engine** (Motor): selecciona el motor utilizado para alimentar la instancia de ElastiCache.
- **Instance type** (Tipo de instancia): selecciona el tipo de instancia. Al cambiar el tipo de instancia se modifican los detalles de hardware que aparecen en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Size** (Tamaño): selecciona el tamaño de la instancia de ElastiCache. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.
- **Billing option** (Opción de facturación): el modelo de precios utilizado para la instancia.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

El siguiente es un ejemplo de objeto JSON de un componente ElastiCache:

```json
{
  "type": "elasticache",
  "id": "a1cebccc-d9ed-481f-b5e6-1088818ab2c6",
  "region": "us-east-1",
  "mapPos": [-1,12],
  "engine": "memcached",
  "instanceType": "m4",
  "instanceSize": "large",
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  },
  "color": {
    "isometric": "#d82f27",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#ffffff",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/elasticache/",
  "locked": true
}
```

- **type: elasticache**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de RDS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **engine: string**: el motor de base de datos utilizado para la instancia de ElastiCache. Los valores aceptados son `redis` y `memcached`.
- **instanceType: string**: el tipo de la instancia. Consulta [Valores aceptados para `instanceType`](#accepted-values-for-instancetype) para obtener más información.
- **instanceSize: string**: el tamaño de la instancia. Consulta [Valores aceptados para `instanceSize`](#accepted-values-for-instancesize) para obtener más información.
- **billingOptions: object**: el modelo de precios utilizado para la instancia. Consulta [Valores aceptados para `instanceSize`](#accepted-values-for-billingoptions) para obtener más información.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es true, los cambios en el componente a través de la aplicación se desactivan hasta que se desbloquee.

El componente ElastiCache puede ser agregado a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
c1, m1, m2, m3, m4, m5, m6g, r3, r4, r5, r6g, t1, t2, t3
```

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 10xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Valores aceptados para `billingOptions`

La clave `billingOptions` admite todas las opciones de facturación que son aceptadas por la aplicación web de Cloudcraft:

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

- **type: od**: el valor de la opción de facturación para bajo demanda es siempre `od`.
- **utilization: number**: un número flotante que representa cuánto se utiliza la instancia en un mes determinado.

### Instancia reservada

```json
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Heavy Utilization"
  }
}
```

- **type: ri**: el valor de la opción de facturación para una instancia reservada es siempre `ri`.
- **leaseContractLenght**: el tiempo por el que se reserva la instancia. Los valores aceptados son `12` o `36`.
- **purchaseOption: string**: la opción de compra de la instancia. Los valores aceptados son `Heavy Utilization`, `No Upfront`, `Partial Upfront` y `All Upfront`.

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/subnet/