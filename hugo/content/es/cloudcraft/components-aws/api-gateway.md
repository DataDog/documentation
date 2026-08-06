---
title: Componente de API Gateway
---
## Información general

Usa el componente de API Gateway para representar las APIs RESTful, HTTP y WebSocket de tu arquitectura de Amazon Web Services.

{{< img src="cloudcraft/components-aws/api-gateway/component-api-gateway-diagram.png" alt="Captura de pantalla de un diagrama isométrico de Cloudcraft que muestra el componente de AWS «API gateway»." responsive="true" style="width:60%;">}}

## Barra de herramientas

Usa la barra de herramientas para configurar y personalizar tu componente. Se encuentran disponibles las siguientes opciones:

- **Color**: selecciona un color predefinido o ingresa el valor hexadecimal del color para el componente y su énfasis. El componente puede usar el mismo color para la vista 2D y 3D, o colores diferentes para cada una.
- **Rotate item** (Girar elemento): gira el componente y cambia su dirección.
- **API Type** (Tipo de API): selecciona el tipo de API para la gateway.
- **M req./month** (Solicitudes en millones/mes): ingresa la cantidad de solicitudes enviadas por mes, en millones.
- **M min./month** (Minutos en millones/mes): ingresa la cantidad de mensajes enviados por minuto, en millones. Solo disponible para las APIs de tipo `websocket`.
- **Cache Memory (GB)** (Memoria caché [GB]): selecciona la cantidad de memoria que se usa para almacenar en caché las respuestas de la API, en gigabytes. Solo disponible para las APIs de tipo `rest`.

## API

Usa la [API de Cloudcraft][1] para acceder y representar de forma programática tus diagramas de arquitectura como objetos JSON.

### Esquema

El siguiente es un ejemplo de objeto JSON de una API Gateway:

```json
{
  "type": "apigateway",
  "id": "5635395f-9441-494d-bcc7-5dd4f5c93ce1",
  "region": "us-east-1",
  "mapPos": [0,10],
  "direction": "down",
  "apiType": "rest",
  "apiCalls": "10",
  "connectionMinutes": 0,
  "cache": 1.6,
  "color": {
    "isometric": "#3c3c3c",
    "2d": "#693cc5"
  },
  "accentColor": {
    "isometric": "#f4b934",
    "2d": "#ffffff"
  },
  "link": "https://aws.amazon.com/api-gateway/",
  "locked": true
}
```

- **type: apigateway**: el tipo de componente.
- **id: string**: un identificador único para el componente en el formato `uuid`.
- **region: string**: la región de AWS donde se despliega API Gateway. Se admiten todas las regiones globales, excepto las regiones `cn-`.
- **mapPos: [number, number]**: la posición del componente en el plano, expresada como un par de coordenadas x e y.
- **direction: string**: la rotación o dirección del componente. Los valores aceptados son `down` o `right`. El valor predeterminado es `down`.
- **apiType: string**: el tipo de API que se usa para la gateway. Los valores aceptados son `rest`, `http` y `websocket`.
- **apiCalls: number**: la cantidad de llamadas a la API realizadas por mes, en millones. El valor predeterminado es `5`.
- **connectionMinutes: number**: la cantidad de mensajes enviados por minuto, en millones. Solo se aplica si se ha establecido `apiType` en `websocket`. El valor predeterminado es `0`.
- **cache: number**: la cantidad de memoria usada para almacenar en caché las respuestas de la API, en gigabytes. Solo se aplica si se ha establecido `apiType` en `rest`. Consulta [Valores aceptados para la memoria caché](#accepted-values-for-cache) a fin de obtener más información.
- **color: object**: el color de relleno para el cuerpo del componente.
  - **isometric: string**: el color de relleno del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de relleno del componente en la vista 2D. Debe ser un color hexadecimal.
- **accentColor: object**: el color de énfasis que se usa para mostrar el logotipo del componente en el bloque.
  - **isometric: string**: el color de énfasis del componente en la vista 3D. Debe ser un color hexadecimal.
  - **2d: string**: el color de énfasis del componente en la vista 2D. Debe ser un color hexadecimal.
- **link: uri**: vincula el componente a otro diagrama con el formato `blueprint://ID` o a un sitio web externo con el formato `https://LINK`.
- **locked: boolean**: si es `true`, los cambios que se realizan en el componente mediante la aplicación se deshabilitan hasta que se desbloquea.

## Valores aceptados para la caché

La clave `cache` tiene como valor predeterminado `1.6` y acepta los siguientes valores:

```
0, 0.5, 1.6, 6.1, 13.5, 28.4, 58.2, 118.0, 237.0
```

[1]: https://developers.cloudcraft.co/