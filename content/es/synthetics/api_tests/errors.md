---
description: Descripción detallada de los errores en tests de API
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic Datadog
- link: /synthetics/
  tag: Documentación
  text: Gestión de tus checks
- link: /synthetics/browser_tests/
  tag: Documentación
  text: Configurar un test de navegador
title: Errores en tests de API
---
## Errores HTTP

Los errores HTTP más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 250px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AUTHENTICATION_ERROR</code></td>
<td>Synthetic Monitoring desactiva automáticamente los reintentos de test cuando se producen fallos de autenticación. Esta medida de seguridad permanece vigente hasta que se actualiza el test con credenciales válidas. Esto evita ejecuciones innecesarias de test que generarían falsas alertas y aumentarían el uso facturable.</td>
</tr>
<tr>
<td><code>CONNREFUSED</code></td>
<td>No se ha podido realizar ninguna conexión porque la máquina de destino la ha rechazado activamente.</td>
</tr>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Las posibles causas incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>Error al realizar la solicitud HTTP/2</code></td>
<td>No se ha podido realizar la solicitud. Esto puede ocurrir cuando el soporte HTTP de un servidor remoto es inconsistente. Por ejemplo, supón que ejecutas un test que llega a un endpoint en un servidor que admite HTTP 2. En la siguiente ejecución, si el test se encuentra con el mismo endpoint en un servidor que solo admite HTTP 1.1, el test falla al establecer una conexión HTTP 2 y devuelve un error. En este caso, el cambio a HTTP/1.1 evita el error.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>No se ha podido realizar la conexión SSL. Consulta la sección de <a href="#ssl-errors">errores SSL</a> para obtener más información.</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>La solicitud no ha podido completarse en un tiempo razonable. Hay dos tipos de errores de tiempo de espera:<br><br><strong>Tiempo de espera de la solicitud</strong>: la duración de la solicitud ha superado el tiempo de espera configurado para el test (por defecto: 60s). La cascada de la red solo muestra las etapas completadas. Por ejemplo, si solo aparece <code>Tiempo de respuesta total</code>, el tiempo de espera se produjo durante la resolución DNS.<br><br><strong>Tiempo de espera total</strong>: la duración combinada del test (solicitud + aserciones) superó el tiempo máximo permitido (60s).</td>
</tr>
<tr>
<td><code>MALFORMED_RESPONSE</code></td>
<td>El servidor remoto respondió con una carga útil que no cumple con las especificaciones HTTP. Este error puede producirse cuando los servidores remotos difieren en su compatibilidad con HTTP. Para evitar problemas, ejecuta los tests con una versión HTTP coherente: HTTP/2 (si está disponible) o HTTP/1.1.</td>
</tr>
<tr>
<td><code>INCORRECT_ASSERTION</code></td>
<td>El valor esperado de la aserción no coincide con el valor real. Por ejemplo, cuando se realiza una aserción sobre un código de estado de respuesta HTTP, si se espera <code>200</code> pero la respuesta devuelve <code>400</code>, se produce el error INCORRECT_ASSERTION.</td>
</tr>
</tbody>
</table>
</div>

## Errores SSL

Los errores SSL pueden producirse durante la ejecución de un test de API. Son diferentes de las aserciones que fallan en los tests SSL y pueden ocurrir en todos los tipos de tests de API.

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 340px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CERT_CHAIN_TOO_LONG</code></td>
<td>La longitud de la cadena del certificado es mayor que la profundidad máxima suministrada.</td>
</tr>
<tr>
<td><code>CERT_HAS_EXPIRED</code></td>
<td>El certificado ha caducado.</td>
</tr>
<tr>
<td><code>CERT_NOT_YET_VALID</code></td>
<td>El certificado no es válido hasta una fecha futura.</td>
</tr>
<tr>
<td><code>CERT_REJECTED</code></td>
<td>La CA raíz está marcada para rechazar el propósito especificado.</td>
</tr>
<tr>
<td><code>CERT_REVOKED</code></td>
<td>El certificado ha sido revocado por el emisor.</td>
</tr>
<tr>
<td><code>CERT_UNTRUSTED</code></td>
<td>La CA raíz no está marcada como de confianza para el propósito previsto.</td>
</tr>
<tr>
<td><code>CERT_SIGNATURE_FAILURE</code></td>
<td>La firma del certificado no es válida.</td>
</tr>
<tr>
<td><code>CRL_HAS_EXPIRED</code></td>
<td>La lista de revocación de certificados (CRL) ha caducado.</td>
</tr>
<tr>
<td><code>CRL_NOT_YET_VALID</code></td>
<td>La lista de revocación de certificados (CRL) no es válida hasta una fecha futura.</td>
</tr>
<tr>
<td><code>CRL_SIGNATURE_FAILURE</code></td>
<td>La firma del certificado de CRL no es válida.</td>
</tr>
<tr>
<td><code>DEPTH_ZERO_SELF_SIGNED_CERT</code></td>
<td>El certificado pasado es autofirmado y no se puede encontrar el mismo certificado en la lista de certificados de confianza.</td>
</tr>
<tr>
<td><code>ERROR_IN_CERT_NOT_AFTER_FIELD</code></td>
<td>Hay un error de formato en el campo notAfter del certificado.</td>
</tr>
<tr>
<td><code>ERROR_IN_CERT_NOT_BEFORE_FIELD</code></td>
<td>Hay un error de formato en el campo notBefore del certificado.</td>
</tr>
<tr>
<td><code>ERROR_IN_CRL_LAST_UPDATE_FIELD</code></td>
<td>El campo lastUpdate de la CRL contiene una hora no válida.</td>
</tr>
<tr>
<td><code>ERROR_IN_CRL_NEXT_UPDATE_FIELD</code></td>
<td>El campo nextUpdate de la CRL contiene una hora no válida.</td>
</tr>
<tr>
<td><code>INVALID_CA</code></td>
<td>Un certificado de CA no es válido porque no es una CA o sus extensiones no son coherentes con el propósito previsto.</td>
</tr>
<tr>
<td><code>INVALID_PURPOSE</code></td>
<td>El certificado proporcionado no puede utilizarse para el propósito previsto.</td>
</tr>
<tr>
<td><code>OUT_OF_MEM</code></td>
<td>Se ha producido un error al asignar memoria.</td>
</tr>
<tr>
<td><code>PATH_LENGTH_EXCEEDED</code></td>
<td>Se ha superado el parámetro de longitud de ruta de basicConstraints.</td>
</tr>
<tr>
<td><code>SELF_SIGNED_CERT_IN_CHAIN</code></td>
<td>Existe un certificado autofirmado en la cadena de certificados. La cadena de certificados se puede construir utilizando los certificados no fiables, pero la CA raíz no se puede encontrar localmente.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY</code></td>
<td>No se puede leer la clave pública del certificado.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECRYPT_CERT_SIGNATURE</code></td>
<td>No se puede descifrar la firma del certificado.</td>
</tr>
<tr>
<td><code>UNABLE_TO_DECRYPT_CRL_SIGNATURE</code></td>
<td>No se puede descifrar la firma de la CRL. (No se puede determinar el valor real de la firma).</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_CRL</code></td>
<td>No se encuentra la lista de revocación de certificados (CRL).</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_ISSUER_CERT</code></td>
<td>No se ha podido encontrar el certificado de una de las autoridades de certificación (CA) de la jerarquía de firma y la aplicación local no confía en esa CA. Por ejemplo, este error puede producirse cuando la CA raíz autofirmada, pero no la CA intermedia, no aparece en la lista de certificados de confianza.</td>
</tr>
<tr>
<td><code>UNABLE_TO_GET_ISSUER_CERT_LOCALLY</code></td>
<td>No se encuentra el certificado emisor de un certificado encontrado localmente. Esto suele significar que la lista de certificados de confianza no está completa. Por ejemplo, este error puede producirse cuando la CA raíz autofirmada y la CA intermedia no aparecen en la lista de certificados de confianza.</td>
</tr>
<tr>
<td><code>UNABLE_TO_VERIFY_LEAF_SIGNATURE</code></td>
<td>No se verifica ninguna firma porque la cadena de certificados solo contiene un certificado, que no está autofirmado, y el emisor no es de confianza.</td>
</tr>
</tbody>
</table>
</div>

## Errores DNS

Los errores DNS más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración de test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>La solicitud no ha podido completarse en un tiempo razonable. Hay dos tipos de errores de tiempo de espera:<br><br><strong>Tiempo de espera de la solicitud</strong>: la duración de la solicitud ha superado el tiempo de espera configurado en el test (por defecto: 60s). La cascada de red solo muestra las etapas completadas. Por ejemplo, si solo aparece <code>Tiempo de respuesta total</code>, el tiempo de espera se produjo durante la resolución DNS.<br><br><strong>Tiempo de espera total</strong>: la duración combinada del test (solicitud + aserciones) superó el tiempo máximo permitido (60s).</td>
</tr>
</tbody>
</table>
</div>

## Errores TCP

Los errores TCP más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>La solicitud no ha podido completarse en un tiempo razonable. Hay dos tipos de errores de tiempo de espera:<br><br><strong>Tiempo de espera de la solicitud</strong>: la duración de la solicitud ha superado el tiempo de espera configurado en el test (por defecto: 60s). La cascada de la red solo muestra las etapas completadas. Por ejemplo, si solo aparece <code>Tiempo de respuesta total</code>, el tiempo de espera se produjo durante la resolución DNS.<br><br><strong>Tiempo de espera total</strong>: la duración combinada del test (solicitud + aserciones) superó el tiempo máximo permitido (60s).</td>
</tr>
</tbody>
</table>
</div>

## Errores UDP

Los errores UDP más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>La solicitud no ha podido completarse en un tiempo razonable. Hay dos tipos de errores de tiempo de espera:<br><br><strong>Tiempo de espera de la solicitud</strong>: la duración de la solicitud ha superado el tiempo de espera configurado en el test (por defecto: 60s). La cascada de red solo muestra las etapas completadas. Por ejemplo, si solo aparece <code>Tiempo de respuesta total</code>, el tiempo de espera se produjo durante la resolución DNS.<br><br><strong>Tiempo de espera total</strong>: la duración combinada del test (solicitud + aserciones) superó el tiempo máximo permitido (60s).</td>
</tr>
</tbody>
</table>
</div>

## Errores ICMP

Los errores ICMP más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de tus entradas DNS.</td>
</tr>
</tbody>
</table>
</div>

## Errores gRPC

Los errores gRPC más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Errores específicos de gRPC</code></td>
<td>gRPC tiene una lista de códigos de estado específicos que se pueden encontrar en la <a href="https://grpc.github.io/grpc/core/md_doc_statuscodes.html">documentación oficial de gRPC</a>.</td>
</tr>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Las posibles causas incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o que se haya perdido la conectividad con el servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración de test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>No se ha podido realizar la conexión SSL. Consulta la sección de <a href="#ssl-errors">errores SSL</a> para más información.</td>
</tr>
<tr>
<td><code>TIMEOUT</code></td>
<td>La solicitud no ha podido completarse en un tiempo razonable. Hay dos tipos de errores de tiempo de espera:<br><br><strong>Tiempo de espera de la solicitud</strong>: la duración de la solicitud ha superado el tiempo de espera configurado en el test (por defecto: 60s). La cascada de red solo muestra las etapas completadas. Por ejemplo, si solo aparece <code>Tiempo de respuesta total</code>, el tiempo de espera se produjo durante la resolución DNS.<br><br><strong>Tiempo de espera total</strong>: la duración combinada del test (solicitud + aserciones) superó el tiempo máximo permitido (60s).</td>
</tr>
</tbody>
</table>
</div>

## Errores de WebSocket

Los errores WebSocket más comunes son los siguientes:

<div class="table-responsive">
<table>
<thead>
<tr>
<th style="min-width: 200px;">Error</th>
<th>Descripción</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>CONNRESET</code></td>
<td>El servidor remoto ha cerrado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o se haya bloqueado mientras respondía, o la pérdida de conectividad del servidor web.</td>
</tr>
<tr>
<td><code>DNS</code></td>
<td>No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.</td>
</tr>
<tr>
<td><code>INVALID_REQUEST</code></td>
<td>La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).</td>
</tr>
<tr>
<td><code>SSL</code></td>
<td>No se ha podido realizar la conexión SSL. Consulta la sección <a href="#ssl-errors">Errores SSL</a> para obtener más información.</td>
</tr>
<tr>
<td><code>WEBSOCKET</code></td>
<td>La conexión de WebSocket se cerró o no se puede abrir.<br><br><strong>WEBSOCKET: el mensaje recibido es más largo que la longitud máxima admitida</strong>: la longitud del mensaje de respuesta excede la longitud máxima (50kb).</td>
</tr>
</tbody>
</table>
</div>