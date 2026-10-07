---
title: Componente de Grupo de seguridad
---
## Información general

Utiliza el componente Grupo de seguridad para representar grupos de seguridad de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/security-group/component-security-group-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Security group' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Name** (Nombre): de un nombre al grupo de seguridad.
- **Shape** (Forma): selecciona una forma para el grupo de seguridad, dinámica o rectangular.
- **Padding** (Relleno): aumenta o disminuye la cantidad de espacio dentro del grupo de seguridad.
- **Inbound/Outbound** (Entrada/Salida): ver, eliminar o añadir reglas de entrada y salida para los componentes dentro de este grupo de seguridad.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo JSON de un componente de Grupo de seguridad:

```json
{
  "type": "sg",
  "id": "a699dbeb-2fe5-49a5-beea-b24695c247e4",
  "region": "us-east-1",
  "name": "cloudcraft-sg-example",
  "shape": "dynamic",
  "padding": 1.5,
  "nodes": [
    "e99bad32-82f6-49a7-b145-11963a3d7775"
  ],
  "inboundRules": [
    {
      "portRange": "80",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTP Traffic",
      "hidden": false
    },
    {
      "portRange": "443",
      "protocol": "tcp",
      "target": "bc883fec-e97c-4c27-b9a7-64e3d154452b",
      "targetType": "sg",
      "description": "HTTPS Traffic",
      "hidden": false
    },
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "65e16268-d9ee-440a-9a4d-29b92520572e",
      "targetType": "sg",
      "description": "Bastion server",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ],
  "color": {
    "isometric": "#4286c5",
    "2d": "#4286c5"
  },
  "link": "blueprint://33a8bf46-7326-4999-ba0a-789bcd94f0a2",
  "locked": true
}
```

- **type: sg**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS en la que se despliega el grupo de seguridad. Se admiten todas las regiones globales excepto las regiones de `cn-`.
- **name: string**: el nombre para el grupo de seguridad.
- **shape: string**: la forma del grupo de seguridad. Los valores aceptados son `dynamic` o `rectangular`.
- **padding: number**: el relleno interno para el grupo de seguridad. Por defecto es `1.5`.
- **nodes: array**: los componentes dentro del grupo de seguridad. Consulta [Valores aceptados para `nodes`](#accepted-values-for-nodes) para más información.
- **inboundRules: matriz**: las reglas para el tráfico entrante para los componentes dentro de este grupo de seguridad. Consulta [Valores aceptados para `inboundRules` y `outboundRules`](#accepted-values-for-inboundrules-and-outboundrules) para obtener más información.
- **outboundRules: matriz**: las reglas para el tráfico saliente para los componentes dentro de este grupo de seguridad. Consulta [Valores aceptados para `inboundRules` y `outboundRules`](#accepted-values-for-inboundrules-and-outboundrules) para obtener más información.
- **color: object**: el color de relleno para el componente.
  - **isometric: string**: el color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

### Valores aceptados para `nodes`

La clave `nodes` acepta una matriz de identificadores únicos para los componentes dentro del grupo de seguridad.

Los siguientes componentes de AWS pueden añadirse a un grupo de seguridad:

```
asg, ec2, lambda, efs, fsx, elb, rds, docdb, elasticache, redshift, es
```

Además de los componentes de AWS, también pueden añadirse a los grupos de seguridad los siguientes componentes comunes:

```
block, isotext, icon, image, area
```

### Valores aceptados para `inboundRules` y `outboundRules`

Las claves `inboundRules` y `outboundRules` aceptan una matriz con reglas representadas por objetos JSON.

```json
{
  "inboundRules": [
    {
      "portRange": "22",
      "protocol": "tcp",
      "target": "192.0.2.0/24",
      "targetType": "ip",
      "description": "RFC 5737",
      "hidden": false
    }
  ],
  "outboundRules": [
    {
      "portRange": "25",
      "protocol": "tcp",
      "target": "199.255.192.0/22",
      "targetType": "ip",
      "description": "AWS SES",
      "hidden": false
    }
  ]
}

```

- **portRange: number**: el número del puerto afectado por esta regla. Acepta un único puerto o un rango de puertos, por ejemplo, `42000-42222`.
- **protocol: string**: el protocolo de red afectado por esta regla.
- **target: string**: el CIDR o `id` de un grupo de seguridad que es el origen del tráfico hacia los componentes.
- **targetType: string**: el tipo de fuente utilizado para `target`. Los valores aceptados son `ip` o `sg`.
- **description: string**: una breve descripción para la regla de entrada o salida.
- **hidden: boolean**: si es `true`, la regla de entrada o salida no se muestra en el diagrama. Consulta la imagen del componente en la parte superior de la página para ver cómo se muestra. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/