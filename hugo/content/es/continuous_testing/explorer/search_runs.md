---
description: Examina todas tus ejecuciones de tests y corrige los resultados de tests
  fallidos.
further_reading:
- link: /continuous_testing/explorer
  tag: Documentación
  text: Más información sobre el Explorador de monitorización Synthetic y de resultados
    de tests
title: Buscar ejecuciones de tests
---

## Información general

Después de seleccionar un marco temporal en el menú desplegable de la parte superior derecha, puedes buscar ejecuciones de tests haciendo clic en el tipo de evento **Ejecuciones de tests** en el [Explorador de monitorización Synthetic y de resultados de tests][1].

{{< img src="continuous_testing/explorer_test_runs_1.png" alt="Busca y gestiona tus ejecuciones de tests en el Explorador de monitorización Synthetic y de resultados de tests" style="width:100%;">}}

Puedes utilizar facetas para realizar las siguientes acciones:

- Observar los últimos tests que requirieron reintentos.
- Agregar ejecuciones de tests de API fallidas por código de estado HTTP y líneas de tendencias. 

## Explorar facetas

El panel de facetas de la izquierda muestra varias facetas que puedes utilizar para buscar en tus ejecuciones de tests. Para empezar a personalizar la consulta de búsqueda, haz clic en la lista de las facetas que empiezan con **Frecuente**.

### Atributos frecuentes de los tests

Las facetas **frecuentes** te permiten filtrar los atributos de tus tests.

| Faceta            | Descripción                                                                                             |
|------------------|---------------------------------------------------------------------------------------------------------|
| `Batch ID`        | El ID de lote asociado a la ejecución del test.                                               |
| <code>Regla de ejecución</code> | La regla de ejecución asociada al resultado del test del lote CI: `Blocking`, `Non Blocking` y `Skipped`. |
| `Location`       | La localización asociada al resultado del test del lote.                                              |
| `Passed`        | El estado general de la ejecución del test.                                               |
| `Run Type`      | El tipo de ejecución del test. Puede ser programado, CI o activado manualmente.                                             |

### Atributos de plazo

Las facetas **Plazos** te permiten filtrar los atributos relacionados con los plazos de ejecución de tests de API.

| Faceta          | Descripción                                 |
|----------------|---------------------------------------------|
| `DNS`  | El tiempo empleado para resolver el nombre DNS de una ejecución de test de API.  |
| `Download`     | El tiempo empleado para descargar la respuesta de una ejecución de test de API.     |
| `First Byte`      | El tiempo de espera transcurrido para recibir el primer byte de la respuesta de una ejecución de test de API.      |
| `Open`  | El tiempo total durante el que un websocket permaneció abierto para una ejecución de test de WebSocket.  |
| `Received` | El tiempo total durante el que una conexión websocket estuvo recibiendo datos de una ejecución de test de WebSocket. |
| `TCP` | El tiempo de espera transcurrido para establecer una conexión TCP para una ejecución de test de API. |
| `Total` | El tiempo total de respuesta de una ejecución de test de API. |

### Atributos HTTP

Las facetas **HTTP** te permiten filtrar por atributos HTTP.

| Faceta          | Descripción                                 |
|----------------|---------------------------------------------|
| `HTTP Status Code`  | El código de estado HTTP para la ejecución del test.  |

### Atributos gRPC

Las facetas **gRPC** están relacionadas con las ejecuciones de tests gRPC.

| Faceta       | Descripción                               |
|-------------|-------------------------------------------|
| `Health Check Status`       | El estado del check de la situación de un test gRPC. Los estados son `Serving` o `Failing`.    |

### Atributos SSL

Las facetas **SSL** están relacionadas con los tests SSL.

| Faceta       | Descripción                               |
|-------------|-------------------------------------------|
| `AltNames`       |Nombres de registro alternativos asociados a un certificado SSL.    |

### Atributos TCP

Las facetas **TCP** están relacionadas con las conexiones TCP durante las ejecuciones de tests.

| Faceta       | Descripción                               |
|-------------|-------------------------------------------|
| `Connection Outcome`       | El estado de conexión de la conexión TCP. Los resultados pueden ser `established`, `timeout` o `refused`.    |

Para filtrar los tests con reintentos, crea una consulta de búsqueda utilizando `@result.isFastRetry:true`. También puedes recuperar la última ejecución de un test con reintentos utilizando el campo `@result.isLastRetry:true`.

Para obtener más información sobre la búsqueda de ejecuciones de tests, consulta [Sintaxis de búsqueda][2].

## Lectura adicional

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/explorer/search_syntax