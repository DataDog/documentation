---
title: Componente RDS
---
## Información general

Utilice el componente RDS para representar bases de datos relacionales de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/rds/component-rds-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente RDS de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas
Utiliza la barra de herramientas para configurar y personalizar el componente. Dispone de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Role** (Rol): el rol de la instancia de RDS.
- **Engine** (Motor): selecciona el motor de base de datos utilizado para la instancia de RDS.
- **Min capacity unit** (Unidad de capacidad mínima): la cantidad mínima de unidades de capacidad de Aurora. Solo disponible para el rol serverless.
- **Max capacity unit** (Unidad de capacidad máxima): la cantidad máxima de unidades de capacidad de Aurora. Solo disponible para el rol serverless.
- **Instance type** (Tipo de instancia): el tipo de la instancia. Al cambiar el tipo de instancia se modifican los detalles de hardware mostrados en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Tamaño**: el tamaño de la instancia. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.
- **Deployment option** (Opción de despliegue): el tipo de despliegue para la instancia, Single-AZ o Multi-AZ Standby.
- **Billing option** (Opción de facturación): el modelo de precios utilizado para la instancia.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un JSON de ejemplo de un componente RDS:

```json
{
  "type": "rds",
  "id": "f184b0b6-c732-4881-841c-68477f7eb365",
  "region": "us-east-1",
  "mapPos": [-3,3],
  "role": "primary",
  "engine": "mariadb",
  "instanceType": "r6g",
  "instanceSize": "large",
  "multiAZ": false,
  "minimumCapacityUnit": 2,
  "maximumCapacityUnit": 2,
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 12,
    "purchaseOption": "No Upfront"
  },
  "color": {
    "isometric": "#ececed",
    "2d": "#3b48cc"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/rds/",
  "locked": true
}
```

- **type: rds**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de RDS. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **rol: string**: el rol utilizado para la instancia de RDS. Los valores aceptados son `primary`, `standby`, `readReplica` y `serverless`.
- **engine: string**: el motor de base de datos utilizado para la instancia de RDS. Consulta [Valores aceptados para `engine`](#accepted-values-for-engine) para obtener más información.
- **instanceType: string**: el tipo de la instancia. Consulta [Valores aceptados para `instanceType`](#accepted-values-for-instancetype) para obtener más información.
- **instanceSize: string**: el tamaño de la instancia. Consulta [Valores aceptados para `instanceSize`](#accepted-values-for-instancesize) para obtener más información.
- **multiAZ: boolean**: si es `true`, la base de datos se despliega en múltiples zonas de disponibilidad de AWS. No disponible si `role` se establece en `serverless`.
- **minimumCapacityUnit: number**: la cantidad mínima de unidades de capacidad de Aurora. Sólo aplicable si `role` se establece en `serverless`.
- **maximumCapacityUnit: number**: la cantidad máxima de unidades de capacidad de Aurora. Sólo aplicable si `role` está configurado como `serverless`.
- **billingOptions: object**: el modelo de precios utilizado para la instancia. Consulta [Valores aceptados para `billingOptions`](#accepted-values-for-billingoptions) para obtener más información.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis utilizado para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente RDS puede añadirse a [VPCs][2], [grupos de seguridad][3] y [subredes][4].

## Valores aceptados para `engine`

La clave `engine` acepta los siguientes valores:

```
none, aurora-mysql, aurora-postgresql, mysql, mariadb, postgresql, oracle, sqlserver-ex, sqlserver-web, sqlserver-se, sqlserver-ee
```

**Nota**: Si `role` está configurado como `serverless`, la clave `engine` sólo acepta `none`, `aurora-mysql` y `aurora-postgresql`.

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
m1, m2, m3, m4, m6g, r5, r5b, r6g, t1, t2, t3, x1, x1e, z1d
```

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
micro, small, medium, large, xlarge, 2xlarge, 4xlarge, 8xlarge, 12xlarge, 16xlarge, 24xlarge, 32xlarge
```

## Valores aceptados para `billingOptions`

La clave `billingOptions` acepta todas las opciones de facturación aceptadas actualmente por la aplicación web de Cloudcraft:

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