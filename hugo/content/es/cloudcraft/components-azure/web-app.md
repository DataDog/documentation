---
title: Componente de aplicación web
---

## Información general

Puedes utilizar el componente de aplicación web para representar y visualizar aplicaciones web desde tu entorno de Azure.

{{< img src="cloudcraft/components-azure/web-app/component-web-app-diagram.png" alt="Captura de pantalla de un diagrama de Cloudcraft que muestra componentes de aplicación web de Azure interconectados." responsive="true" style="width:60%;">}}

## Barra de herramientas

Utiliza la barra de herramientas para configurar y personalizar el componente. Dispones de las siguientes opciones:

- **Color**: selecciona los colores de énfasis y de relleno para el cuerpo del componente en la vista 3D.
- **Plataform** (Plataforma): selecciona la plataforma para tu aplicación web. Las opciones compatibles son Windows y Linux.
- **Tier** (Nivel): selecciona el nivel de servicio para tu aplicación web.
- **Instance** (Instancia): selecciona un tipo de instancia para tu aplicación web.

## API

Utiliza [la API de Cloudcraft][1] para acceder mediante programación y renderizar tus diagramas de arquitectura como objetos JSON. El siguiente es un ejemplo de objeto JSON de un componente de aplicación web:

### Esquema

```json
{
  "type": "azurewebapp",
  "id": "274993bf-646d-4046-a20a-063a243e22b7",
  "resourceId": "/subscriptions/4f02467b-945a-4d06-8789-66b52d1c92a3/resourceGroups/CLOUDCRAFT/providers/Microsoft.Web/sites/docsite#componentType=azurewebapp",
  "region": "eastus",
  "mapPos": [0, 8],
  "platform": "Windows",
  "tier": "Basic",
  "instance": "B1",
  "color": {
      "isometric": "#ececed",
      "2d": null
  },
  "accentColor": {
      "isometric": "#4286c5",
      "2d": null
  },
  "link": "https://azure.microsoft.com/products/app-service/web/",
  "locked": true
}
```

- **type: string**: el tipo de componente. Debe ser una cadena de valor `azurewebapp` para este componente.
- **id: string, uuid**: el identificador único para el componente. La API utiliza un UUID v4 internamente, pero acepta cualquier cadena única.
- **resourceId: string**: el identificador único global del componente dentro de Azure.
- **region: string**: la región de Azure para el componente. La API admite todas las regiones globales, excepto China.
- **mapPos: array**: la posición del componente en el plano. La API usa un par de coordenadas X e Y único para expresar la posición.
- **platform: string**: la plataforma para la aplicación web. Acepta uno de dos valores: `Windows` o `Linux`. Por defecto es `Linux`.
- **tier: string**: el nivel de servicio para la aplicación web. [Más abajo puedes obtener más información](#accepted-values-for-tier). Por defecto es `Basic`.
- **instance: string**: el tipo de instancia para la aplicación web. [Más abajo puedes obtener más información](#accepted-values-for-instance). Por defecto es `B1`.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: un color hexadecimal para el cuerpo del componente en la vista 3D. Por defecto es `#ececed`.
  - **2d: string**: un color hexadecimal para el cuerpo del componente en la vista 2D. El valor predeterminado es `null`.
- **accentColor: object**: el color de énfasis para el logotipo del componente.
  - **isometric: string**: un color hexadecimal para el logotipo del componente en la vista 3D. Por defecto es `#4286c5`.
  - **2d: string**: un color hexadecimal para el logotipo del componente en la vista 2D. Por defecto es `null`.
- **link: string, uri**: URI que vincula el componente a otro diagrama o a un sitio web externo. Acepta uno de dos formatos: `blueprint://` o `https://`.
- **locked: boolean**: si se permite cambiar la posición del componente a través de la interfaz web. Por defecto es `false`.

## Valores aceptados para el nivel

La clave `tier` acepta los siguientes valores:

```
Basic, Free, Isolated, "Isolated v2", "Premium v2", "Premium v3", Shared, Standard
```

## Valores aceptados para la instancia

La clave `instance` acepta los siguientes valores:

```
B1, B2, B3, F1, I1, I2, I3, "I1 v2", "I2 v2", "I3 v2", "I4 v2", "I5 v2",
"I6 v2", "P1 v2", "P2 v2", "P3 v2", P0v3, "P1 v3", P1mv3, "P2 v3",
P2mv3, "P3 v3", P3mv3, P4mv3, P5mv3, D1, S1, S2, S3
```

## Combinaciones válidas de nivel e instancia

Las claves `tier` y `instance` funcionan conjuntamente para definir los recursos asignados a una aplicación, pero debes proporcionar una combinación válida de valores.

La siguiente tabla muestra qué combinaciones son válidas.

nivel        | instancia
----------- | ---------
Basic       | B1, B2, B3
Free        | F1
Isolated    | I1, I2, I3
Isolated v2 | I1 v2, I2 v2, I3 v2, I4 v2, I5 v2, I6 v2
Premium v2  | P1 v2, P2 v2, P3 v2
Premium v3  | P0v3, P1 v3, P1mv3, P2 v3, P2mv3, P3 v3, P3mv3, P4mv3, P5mv3
Shared      | D1
Standard (Estándar)    | S1, S2, S3

[1]: https://developers.cloudcraft.co/