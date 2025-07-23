---
title: Componente WAF
---
## Información general

Utiliza el componente WAF para representar los firewalls de aplicaciones web de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/waf/component-waf-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra componentes de AWS interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar el componente. Se encuentran disponibles las siguientes opciones:

-  **Color**: selecciona un color de relleno para el cuerpo del componente y un color de énfasis para su símbolo. Puedes usar los mismos colores para las vistas 2D y 3D o colores diferentes para cada una.
-  **Rules & Groups** (Reglas y grupos): introduce el número de reglas y grupos que deseas por ACL web.
-  **Requests (millions/mo)** (Solicitudes (millones/mes)): introduce el número de solicitudes web que recibe tu WAF al mes, en millones.

## API

Utiliza la [API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON.

### Esquema

A continuación, se muestra un ejemplo de objeto JSON de un componente WAF:

```json
{
    "type": "waf",
    "id": "7334ebd8-e980-45c6-9211-e8f090089c6e",
    "arn": "arn:aws:wafv2:us-east-1:746399320916:global/webacl/webacl-test-cdn/793709d6-e353-4cce-aeb7-b1fa5d8845d4",
    "region": "us-east-1",
    "mapPos": [-1,9],
    "aclCount": 5,
    "ruleCount": 5,
    "requestMillions": 5,
    "color": {
        "isometric": "#000000",
        "2d": "#000000"
    },
    "accentColor": {
        "isometric": "#f44336",
        "2d": "#f44336"
    },
    "link": "https://aws.amazon.com/waf/",
    "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena con el valor `waf` para este componente.
- **id: string, uuid**: identificador único del componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **arn: string**: el identificador único global para el componente dentro de AWS, conocido como los [Nombres de recursos de Amazon][2].
- **region: string**: la región de AWS para el componente. Se admiten todas las regiones del mundo, [excepto AWS China][3].
- **mapPos: array**: la posición del componente en el proyecto, expresada como un par de coordenadas x e y.
- **aclCount: number**: el número de listas de control de acceso web utilizadas. Por defecto es `1`.
- **ruleCount: number**: el número de reglas añadidas por lista de control de acceso web. Por defecto es `0`.
- **requestMillions: number**: el número de solicitudes web recibidas al mes, en millones. Por defecto es `0`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#607D8B`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. Por defecto es `#D6242D`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#FF5722`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `#FFFFFF`.
- **link: string, uri**: URI que enlaza el componente a otro diagrama o a un sitio web externo. Acepta uno de los siguientes formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

[1]: https://developers.cloudcraft.co/
[2]: https://docs.aws.amazon.com/general/latest/gr/aws-arns-and-namespaces.html
[3]: /es/cloudcraft/faq/scan-error-aws-china-region/