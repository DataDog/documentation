---
title: Network ACL (Lista de control de acceso a la red)
---

## Información general

Utiliza el componente Network ACL para visualizar las listas de control de acceso a la red de tu arquitectura Amazon Web Services.

{{< img src="cloudcraft/components-aws/network-acl/component-network-acl-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente 'Network ACL' de AWS." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Están disponibles las siguientes opciones:

- **Visibilidad**: Cambia la visibilidad del componente en el diagrama.
- **Color**: Selecciona un color de relleno para el cuerpo del componente y un color acentuado para su símbolo. Puedes utilizar los mismos colores en las vistas 2D y 3D o colores diferentes en cada una.
- **Nombre**: Dale un nombre a la NACL (lista de control de acceso a la red).
- **Forma**: Selecciona una forma para el componente.
- **Relleno**: Aumenta o disminuye la cantidad de espacio dentro del componente.
- **Reglas**: Consulta las reglas de entrada y salida de la NACL.

## API

Utiliza la [API Cloudcraft][1] para acceder mediante programación y representar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación se muestra un ejemplo JSON de un componente de ACL a la red:

```json
{
    "type": "networkacl",
    "id": "acl-0mqj0d4dxpmf9iru3",
    "arn": "arn:aws:ec2:us-east-1:762056483071:network-acl/acl-0mqj0d4dxpmf9iru3",
    "region": "us-east-1",
    "visible": true,
    "name": "acl-0mqj0d4dxpmf9iru3",
    "shape": "rectangular",
    "padding": 2,
    "nodes": [
        "1ae68ef4-f3cb-4e07-8660-2a4a4bc30e36",
        "subnet-0752f314ffbf0126e"
    ],
    "inboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "outboundRules": [
        {
            "ruleNumber": 100,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "allow"
        },
        {
            "ruleNumber": 32767,
            "protocol": "-1",
            "portRange": "0",
            "target": "0.0.0.0/0",
            "targetType": "ip",
            "access": "deny"
        }
    ],
    "color": {
        "isometric": "#5698ff",
        "2d": "#5698ff"
    },
    "link": "https://aws.amazon.com/",
    "locked": true
}
```

- **type: string**: Tipo de componente.
- **id: string**: Identificador único del componente formado por la cadena `acl-` seguida de una cadena alfanumérica aleatoria de 17 caracteres.
- **arn: string**: Identificador único global del componente en AWS, conocido como [Nombre de recurso de Amazon][2].
- **region: string**: Región AWS del componente. Se admiten todas las regiones globales excepto las regiones `cn-`.
- **visible: boolean**: Si es `false`, el componente se vuelve semitransparente en el diagrama. Por defecto es `true`.
- **name: string**: Nombre de la NACL.
- **shape: string**: Forma del componente. Acepta `dynamic` o `rectangular`. Por defecto es `retangular`.
- **padding: number**: Valor de relleno del componente. Por defecto es `2`.
- **nodes: array**: Matriz de los ID de componentes que están dentro de la NACL.
- **inboundRules: array**: Reglas para el tráfico entrante de los componentes dentro de la NACL.
  - **ruleNumber: number**: Número de la regla para la NACL.
  - **protocol: string**: Protocolo de la regla. Acepta `-1`, que significa "Todo", o un protocolo específico.
  - **portRange: string**: Puerto de escucha o rango de puertos para el tráfico.
  - **target: string**: Origen del tráfico (rango CIDR).
  - **targetType: string**: Tipo de destino de la regla. Acepta `ip` o `ipv6`.
  - **access: string**: Tipo de acceso de la regla. Acepta `allow` o `deny`.
- **outboundRules: array**: Reglas para el tráfico saliente de los componentes dentro de la NACL.
  - **ruleNumber: number**: Número de regla para la NACL.
  - **protocol: string**: Protocolo de la regla. Acepta `-1`, que significa "Todo", o un protocolo específico.
  - **portRange: string**: Puerto de escucha o rango de puertos para el tráfico.
  - **target: string**: Destino del tráfico (rango CIDR).
  - **targetType: string**: Tipo de destino de la regla. Acepta `ip` o `ipv6`.
  - **access: string**: Tipo de acceso de la regla. Acepta `allow` o `deny`.
- **color: object**: Color de relleno para el cuerpo del componente.
  - **isometric: string**: Color de relleno para el componente en la vista 3D. Debe ser un color hexadecimal. Por defecto es `#ECECED`.
  - **2d: string**: Color de relleno para el componente en la vista 2D. Debe ser un color hexadecimal. Por defecto es `#CC2264`.
- **link: uri**: Enlace del componente a otro diagrama utilizando el formato `blueprint://ID` o a un sitio web externo utilizando el formato `https://LINK`.
- **locked: boolean**: Si es `true`, los cambios realizados en el componente mediante la aplicación se desactivan hasta que se desbloquean.

[1]: /es/cloudcraft/api/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html