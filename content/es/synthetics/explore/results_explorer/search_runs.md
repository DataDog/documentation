---
aliases:
- /es/continuous_testing/explorer/search_runs/
description: Examina todas las ejecuciones de test y resuelve los problemas de los
  resultados con errores.
further_reading:
- link: /synthetics/explore/results_explorer
  tag: Documentación
  text: Más información sobre la Monitorización Synthetic y el Explorador de resultados
    de tests
title: Buscar ejecuciones de test
---

## Información general

Después de seleccionar un marco temporal en el menú desplegable de la parte superior derecha, puedes buscar las ejecuciones de test haciendo clic en el tipo de evento **Test Runs** (Ejecuciones de test) en el [Explorador de monitorización Synthetic y resultados de tests][1].

{{< img src="continuous_testing/explorer/explorer_test_runs_2.png" alt="Busca y gestiona tus tests en el Explorador de monitorización Synthetic y resultados de tests" style="width:100%;">}}

Puedes utilizar facetas para realizar las siguientes acciones:

- Observar las últimas ejecuciones de test que requirieron reintentos.
- Añadir las ejecuciones de test de API con errores por código de estado HTTP y tendencias de diagramas. 

## Explorar facetas

En el panel de facetas de la izquierda, se enumeran varias facetas que puedes utilizar para buscar entre tus ejecuciones de test. Para comenzar a personalizar la consulta de búsqueda, haz clic en lista para ver las facetas a partir de **Common** (Comunes).

<div class="alert alert-info">La siguiente lista de facetas disponibles puede variar en función de tu sitio y región.</a></div>

### Atributos comunes de las ejecuciones de test

{{< tabs >}}
{{% tab "v0" %}}

| Faceta                            | Descripción                                                                                                    |
|----------------------------------|----------------------------------------------------------------------------------------------------------------|
| `Batch ID`                       | El ID de lote asociado a la ejecución del test.                                                                     |
| <code>Execution&nbsp;Rule</code> | La regla de ejecución asociada al resultado del test del lote de CI: `Blocking`, `Non Blocking` y `Skipped`. |
| `Location`                       | La localización asociada al resultado del test del lote.                                                     |
| `Passed`                         | El estado general de la ejecución del test.                                                                            |
| `Run Type`                       | El tipo de ejecución del test. Puede ser programada, de CI o activada manualmente.                                  |

{{% /tab %}}

{{% tab "v1" %}}

| Faceta                              | Descripción                                                                                             |
|------------------------------------|---------------------------------------------------------------------------------------------------------|
| `Failure Code`                     | El código que indica el motivo del error del test.                                                                  |
| `Test Type`                        | El tipo de test que se está ejecutando.                                                                               |
| `Test Subtype`                     | El subtipo específico del test.                                                                             |
| `Location Version`                 | La versión de la localización privada del test.                                                                     |
| `Location Platform`                | El nombre de la plataforma de la localización privada.                                                                    |
| `Test ID`                          | El identificador del test.                                                                                |
| `Failure Message`                  | El mensaje en el que se detalla el error.                                                                          |
| `Result Retry Number`              | El número de reintentos del test.                                                                   |
| `Test Finished At`                 | La marca temporal de la finalización del test.                                                                       |
| `Test Started At`                  | La marca temporal del inicio del test.                                                                        |
| `Test Triggered At`                | La marca temporal de la activación del test.                                                                  |
| `Test Will Retry At`               | La marca temporal del siguiente reintento del test.                                                               |
| `Trace ID`                         | El identificador de rastreo para hacer el seguimiento.                                                                          |
| `Open Telemetry ID`                | El identificador de Open Telemetry.                                                                              |
| `Variable Name`                    | El nombre de una variable utilizada en el test.                                                                    |

{{% /tab %}}
{{< /tabs >}}

### Atributos de tiempo

Las facetas de **tiempo** permiten filtrar los atributos relacionados con el tiempo de las ejecuciones de test de API.

| Faceta          | Descripción                                                     |
|----------------|-----------------------------------------------------------------|
| `DNS`          | El tiempo empleado en resolver el nombre de DNS para una ejecución de test de API.      |
| `Download`     | El tiempo empleado en descargar la respuesta de una ejecución de test de API.    |
| `First Byte`   | El tiempo de espera para recibir el primer byte de la respuesta de una ejecución de test de API. |
| `Open`         | El tiempo total que un websocket ha permanecido abierto durante una ejecución de test de WebSocket. |
| `Received`     | El tiempo total que una conexión websocket pasó recibiendo datos para una ejecución de test de WebSocket. |
| `TCP`          | El tiempo empleado en establecer una conexión TCP para una ejecución de test de API. |
| `Total`        | El tiempo total de respuesta de una ejecución de test de API.                    |

### Atributos HTTP

Las facetas **HTTP** permiten filtrar por atributos HTTP.

| Faceta                  | Descripción                                 |
|------------------------|---------------------------------------------|
| `HTTP Status Code`     | El código de estado HTTP para la ejecución del test.      |

### Atributos de gRPC

Las facetas de **gRPC** están relacionadas con las ejecuciones de test de gRPC.

| Faceta                   | Descripción                                                            |
|-------------------------|------------------------------------------------------------------------|
| `Health Check Status`   | El estado del check del test de gRPC. Los estados son `Serving` o `Failing`. |

### Atributos SSL

Las facetas **SSL** están relacionadas con las ejecuciones de test de SSL.

| Faceta     | Descripción                                                      |
|-----------|------------------------------------------------------------------|
| `AltNames`| Los nombres de registro alternativos asociados a un certificado SSL.     |

### Atributos TCP

Las facetas **TCP** están relacionadas con las conexiones TCP durante las ejecuciones de test.

| Faceta                 | Descripción                                                                           |
|-----------------------|---------------------------------------------------------------------------------------|
| `Connection Outcome`  | El estado de la conexión TCP. Los resultados pueden ser `established`, `timeout` o `refused`. |

### Atributos de los dispositivos

Las facetas de los **dispositivos** están relacionadas con los dispositivos utilizados durante las ejecuciones de test.


{{< tabs >}}
{{% tab "v1" %}}

| Faceta                    | Descripción                                                  |
|--------------------------|--------------------------------------------------------------|
| `Device Name`            | El nombre del dispositivo utilizado para hacer el test.                         |
| `Device Resolution Width`| El ancho de la resolución del dispositivo.                              |
| `Device Resolution Height`| La altura de la resolución del dispositivo.                            |
| `Device Type`            | El tipo de dispositivo utilizado para hacer el test.                         |

{{% /tab %}}
{{< /tabs >}}

### Atributos del navegador

Las facetas del **navegador** están relacionadas con los test del navegador.

{{< tabs >}}
{{% tab "v1" %}}
| Faceta | Descripción |
|------------------------|-----------------------------------------------------------------|
| `Browser Type` | El tipo de navegador utilizado en el test.                                  |
| `Browser Version` | La versión del navegador utilizado en el test.                        |
| `Browser User Agent` | El Agent del usuario del navegador utilizado.                                 |

{{% /tab %}}
{{< /tabs >}}

### Atributos de API

Las facetas de **API** están relacionadas con las ejecuciones de test de API.

{{< tabs >}}
{{% tab "v1" %}}

| Faceta                         | Descripción                                                 |
|-------------------------------|-------------------------------------------------------------|
| `Resolved IP`                 | La IP resuelta por la resolución de DNS.                              |
| `DNS Resolution Server`       | El servidor utilizado para la resolución de DNS.                             |
| `Request Body`                | El cuerpo de la solicitud HTTP.                                   |
| `Request Headers`             | Los encabezados de la solicitud HTTP.                                |
| `Request Host`                | El host en la solicitud HTTP.                                   |
| `Request Message`             | El mensaje en la solicitud HTTP.                                |
| `Request Metadata`            | Los metadatos relacionados con la solicitud HTTP.                       |
| `Request URL`                 | La URL de la solicitud HTTP.                                    |
| `Response Body`               | El cuerpo de la respuesta HTTP.                                  |
| `Body Size`                   | El tamaño del cuerpo de la respuesta.                                  |
| `Cache Headers Server`        | El servidor de encabezados de caché en la respuesta.                      |
| `Cache Headers Vary`          | El campo variable de los encabezados de caché en la respuesta.                  |
| `Cache Headers Via`           | El campo de paso de los encabezados de caché en la respuesta.                   |
| `CDN Provider`                | El proveedor de CDN utilizado en la entrega de la respuesta.                     |
| `Response Close Status Code`  | El código de estado del momento en que se cerró la respuesta.                       |
| `Response Is Body Truncated`  | Indica si el cuerpo de la respuesta está truncado.                   |
| `Response Is Message Truncated`| Indica si el mensaje de la respuesta está truncado.               |
| `Response Message`            | El mensaje en la respuesta HTTP.                               |
| `Response Metadata`           | Los metadatos relacionados con la respuesta HTTP.                      |
| `Response Close Reason`       | El motivo del cierre de la respuesta.                                  |
| `Response Redirects`          | La información de redirección en la respuesta.                       |
| `Response Status Code`        | El código de estado HTTP de la ejecución del test.                      |
| `Healthcheck Message Service` | La información del servicio de mensajes de checks de estado.                    |
| `Handshake Request Message`   | El mensaje durante la solicitud de reconocimiento.                           |
| `Handshake Response Headers`  | Los encabezados durante la respuesta de reconocimiento.                          |
| `Handshake Response Status Code` | El código de estado durante la respuesta de reconocimiento.                   |

{{% /tab %}}
{{< /tabs >}}

### Atributos de dispositivos móviles

Las facetas de **dispositivos móviles** están relacionadas con los tests de dispositivos móviles.

{{< tabs >}}
{{% tab "v1" %}}
| Faceta | Descripción |
|---------------------------|-------------------------------------------------------------|
| `Mobile Platform` | El nombre de la plataforma del dispositivo móvil.                         |
| `Mobile Application` | El ID de versión de la aplicación del dispositivo móvil.                       |
| `Mobile Platform Version` | La versión de la plataforma del dispositivo móvil.                                 |
| `Device Resolution Pixel Ratio` | La proporción de píxeles de la pantalla del dispositivo.                            |
{{% /tab %}}
{{< /tabs >}}

### Atributos de tests continuos

Las facetas de **tests continuos** están relacionadas con los tests continuos.

{{< tabs >}}
{{% tab "v1" %}}

| Faceta                    | Descripción                                                                   |
|--------------------------|-------------------------------------------------------------------------------|
| `Concurrency Wait Time`  | El tiempo de espera en los tests de concurrencia.                                             |
| `Git Author Email`       | El correo electrónico del autor de la confirmación.                                            |
| `Git Author Name`        | El nombre del autor de la confirmación.                                             |
| `Git Branch`             | La rama del repositorio utilizado.                                                |
| `Git URL`                | La URL del repositorio de git.                                                    |
| `CI Job Name`            | El nombre del trabajo de CI.                                                           |
| `CI Job URL`             | La URL del trabajo de CI.                                                            |
| `CI Pipeline ID`         | El identificador del pipeline de CI.                                               |
| `CI Pipeline Name`       | El nombre del pipeline de CI.                                                      |
| `CI Pipeline Number`     | El número asignado al pipeline de CI.                                           |
| `CI Pipeline URL`        | La URL del pipeline de CI.                                                       |
| `CI Provider Name`       | El nombre del proveedor de IC.                                                      |
| `CI Stage Name`          | El nombre de la etapa en el proceso de CI.                                          |
| `CI Workspace Path`      | La ruta del espacio de trabajo en el proceso de CI.                                                 |

{{% /tab %}}
{{< /tabs >}}

### Atributos de pasos

Las facetas de **pasos** están relacionadas con los pasos del test.

{{< tabs >}}
{{% tab "v1" %}}

| Faceta         | Descripción                    |
|---------------|--------------------------------|
| `Step ID`     | El identificador de los pasos del test.     |
| `Step Name`   | El nombre de los pasos del test.        |
| `Step Status` | El estado de los pasos del test.      |

{{% /tab %}}
{{< /tabs >}}

Para filtrar las ejecuciones de test con reintentos, crea una consulta de búsqueda con `@result.isFastRetry:true`. También puedes recuperar la última ejecución de un test con reintentos mediante el campo `@result.isLastRetry:true`.

Para obtener más información sobre la búsqueda de ejecuciones de test, consulta [Sintaxis de búsqueda][2].

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/synthetics/explorer/
[2]: /es/continuous_testing/explorer/search_syntax