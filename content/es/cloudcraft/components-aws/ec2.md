---
title: Componente de EC2
---
## Información general

Utiliza el componente de EC2 para representar instancias informáticas elásticas de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/ec2/component-ec2-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS EC2." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su color de énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Transparencia**: elige si el bloque de EC2 es sólido o semitransparente.
- **Plataforma**: selecciona la plataforma utilizada en la instancia de computación elástica. Al elegir una plataforma con una tarifa de licencia, la estimación de costes se incluye en la tarifa.
- **Tipo de instancia**: el tipo de la instancia. Al cambiar el tipo de instancia se modifican los detalles de hardware mostrados en la barra de herramientas para reflejar lo que utiliza el hipervisor.
- **Tamaño**: el tamaño de la instancia. Al igual que con el tipo de instancia, los detalles de hardware mostrados en la barra de herramientas cambian para reflejar el tamaño.
- ** Opción de facturación**: el modelo de precios utilizado para la instancia. Por el momento, las opciones admitidas son Instancia bajo demanda, Instancia reservada e Instancia de spot.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un bloque de EC2:

```json
{
  "type": "ec2",
  "id": "d2ee1b7c-4368-4384-81dc-19c9c7866623",
  "region": "us-west-1",
  "mapPos": [3, 9],
  "transparent": false,
  "platform": "linux",
  "instanceType": "t3a",
  "instanceSize": "xlarge",
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  },
  "color": {
    "isometric": "#e6e7e8",
    "2d": "#e6e7e8"
  },
  "accentColor": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://ae6349e1-fa15-41c8-8e89-d201f9fa3cc9",
  "locked": true
}
```

- **type: ec2**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega la instancia de EC2. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **mapPos: [número, número]**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **transparent: boolean**: si es `true`, el componente es semitransparente en la vista 3D. No tiene efecto en la vista 2D.
- **platform: string**: la plataforma utilizada para la instancia. Consulta [Valores aceptados para la plataforma](#accepted-values-for-the-platform) para obtener más información.
- **instanceType: string**: el tipo de la instancia. Consulta [Valores aceptados para instanceType](#accepted-values-for-instancetype) para obtener más información.
- **instanceSize: string**: el tamaño utilizado para la instancia. Consulta [Valores aceptados para instanceSize](#accepted-values-for-instancesize) para obtener más información.
- **billingOptions: objeto**: el modelo de precios utilizado para la instancia en AWS. Consulta [Valores aceptados para billingOptions](#accepted-values-for-billingoptions) para obtener más información.
- **color: objeto**: el color de relleno para el cuerpo del componente.
  - **isometric: cadena**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: objeto**: el color de énfasis que se usa para mostrar el logotipo del componente sobre el bloque.
  - **isometric: cadena**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: cadena**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

El componente de EC2 puede añadirse a [VPCs][2], [grupos de seguridad][3], [grupos de autoescalado][4] y [subredes][5].

## Valores aceptados para `platform`

La clave `platform` acepta los siguientes valores:

```
linux, linuxSQL, linuxSQLWeb, linuxSQLEnterprise, rhel, sles, mswin, mswinSQL, mswinSQLWeb, mswinSQLEnterprise
```

## Valores aceptados para `instanceType`

La clave `instanceType` acepta los siguientes valores:

```
a1, c1, c3, c4, c5, c5a, c5ad, c5d, c5n, c6g, c6gd, c6gn, cc2, cr1, d2, d3, d3en, f1, g2, g3, g3s, g4ad, g4dn, h1, hs1, i2, i3, i3en, inf1, m1, m2, m3, m4, m5, m5a, m5ad, m5d, m5dn, m5n, m5zn, m6g, m6gd, p2, p3, p3dn, p4d, r3, r4, r5, r5a, r5ad, r5b, r5d, r5dn, r5n, r6g, r6gd, t1, t2, t3, t3a, t4g, x1, x1e, z1d
```

## Valores aceptados para `instanceSize`

La clave `instanceSize` acepta los siguientes valores:

```
micro, nano, small, medium, large, xlarge, 2xlarge, 3xlarge, 4xlarge, 6xlarge, 8xlarge, 9xlarge,  10xlarge, 12xlarge, 16xlarge, 18xlarge, 24xlarge, 32xlarge, metal
```

## Valores aceptados para `billingOptions`

La clave `billingOptions` admite todas las opciones de facturación aceptadas por Cloudcraft:

- Bajo demanda
- Instancia reservada
- Instancia de spot

Cada opción se representa de forma diferente en el objeto `billingOptions`.

### Bajo demanda

```
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

```
{
  "billingOptions": {
    "type": "ri",
    "leaseContractLength": 36,
    "purchaseOption": "Partial Upfront",
    "offeringClass": "convertible"
  }
}
```

- **type: ri**: el valor de la opción de facturación para una instancia reservada es siempre `ri`.
- **leaseContractLength: number**: la duración de la reserva de la instancia. Los valores aceptados son 12 o 36.
- **purchaseOption: string**: la opción de compra de la instancia. Los valores aceptados son `No Upfront`, `Partial Upfront` y `All Upfront`.
- **offeringClass: string**: la clase de oferta para la instancia. Los valores aceptados son `standard` y `convertible`.

### Instancia de spot

```
{
  "billingOptions": {
    "type": "si",
    "utilization": 0.42
  }
}
```

- **type: si**: el valor de la opción de facturación para la instancia de spot es siempre `si`.
- **utilization: number**: un número flotante que representa cuánto se utiliza la instancia en un mes determinado.

[1]: https://developers.cloudcraft.co/
[2]: /es/cloudcraft/components-aws/vpc/
[3]: /es/cloudcraft/components-aws/security-group/
[4]: /es/cloudcraft/components-aws/auto-scaling-group/
[5]: /es/cloudcraft/components-aws/subnet/