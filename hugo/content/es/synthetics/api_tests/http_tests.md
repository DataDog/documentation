---
algolia:
  category: Documentation
  rank: 70
  subcategory: Synthetic API Tests
  tags:
  - http
  - http test
  - http tests
aliases:
- /es/synthetics/http_test
- /es/synthetics/http_check
- /es/synthetics/guide/or-logic-api-tests-assertions
description: Simule solicitudes HTTP para hacer un seguimiento de los puntos finales
  de API públicos e internos.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: blog
  text: Introducción a Datadog Synthetic Monitoring
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a las pruebas Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Comience con las pruebas HTTP
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecute pruebas HTTP en puntos finales internos
- link: /synthetics/multistep
  tag: Documentación
  text: Ejecute pruebas HTTP de varios pasos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Obtenga información sobre los monitores de prueba Synthetic
title: Pruebas HTTP
---
## Descripción general {#overview}

Las pruebas HTTP le permiten enviar solicitudes HTTP a los puntos finales de API de sus aplicaciones para verificar las respuestas y las condiciones definidas, como el tiempo de respuesta general, el código de estado esperado, el encabezado o el contenido del cuerpo.

Las pruebas HTTP pueden ejecutarse desde ubicaciones [administradas](#select-locations) y [privadas][1] según su preferencia para ejecutar la prueba desde fuera o dentro de su red. Las pruebas HTTP pueden ejecutarse según un horario, bajo demanda o directamente dentro de sus [CI/CD pipelines][2].

## Configuración {#configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

   - **Cree una prueba a partir de una plantilla**:
   
     1. Pase el cursor sobre una de las plantillas precargadas y haga clic en {{< ui >}}View Template{{< /ui >}}. Esto abre un panel lateral que muestra información de configuración precargada, incluyendo: {{< ui >}}Test Details{{< /ui >}}, {{< ui >}}Request Details{{< /ui >}}, {{< ui >}}Assertions{{< /ui >}}, {{< ui >}}Alert Conditions{{< /ui >}} y {{< ui >}}Monitor Settings{{< /ui >}}. 
     2. Haga clic en {{< ui >}}+Create Test{{< /ui >}} para abrir la página {{< ui >}}Define Request{{< /ui >}}, donde puede revisar y editar las opciones de configuración prellenadas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
     3. Haga clic en {{< ui >}}Save Details{{< /ui >}} para enviar su prueba de API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video de la página de inicio de la prueba de API de Synthetics con plantillas" video="true" >}}

  - **Cree una prueba desde cero**:
    
     1. Para crear una prueba desde cero, haga clic en la plantilla {{< ui >}}+ Start from scratch{{< /ui >}}, luego seleccione el tipo de solicitud `HTTP` y especifique la {{< ui >}}URL{{< /ui >}} a consultar. 
        Los métodos disponibles son: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` y `OPTIONS`. Se admiten tanto URLs `http` como `https`.

        <div class="alert alert-info">Consulte <a href=#advanced-options>Opciones avanzadas</a> para ver más opciones.</div>

     2. {{< ui >}}Name{{< /ui >}} su prueba HTTP.

     3. Add Environment {{< ui >}}Tags{{< /ui >}} así como cualquier otra etiqueta para su prueba HTTP. Luego puede usar estas etiquetas para filtrar sus pruebas Synthetic en la [página de Synthetic Monitoring y Continuous Testing][3]. 
     
     4. Click {{< ui >}}Send{{< /ui >}} para probar la configuración de la solicitud. Se muestra una vista previa de la respuesta en el lado derecho de su pantalla.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Definir solicitud HTTP" style="width:90%;" >}}

     5. Click {{< ui >}}Create Test{{< /ui >}} to submit your API test.

### Fragmentos {#snippets}

{{% synthetics-api-tests-snippets %}}

### Opciones avanzadas {#advanced-options}

   {{< tabs >}}

   {{% tab "Opciones de solicitud" %}}
   * {{< ui >}}HTTP version{{< /ui >}}: Seleccione `HTTP/1.1 only`, `HTTP/2 only` o `HTTP/2 fallback to HTTP/1.1`.

     Para puntos finales protegidos por una CDN (como Akamai, CloudFront o Fastly), establezca la versión HTTP en `HTTP/2 only` o `HTTP/1.1 only` en lugar del valor predeterminado `HTTP/2 with fallback to HTTP/1.1`. La compatibilidad con la versión HTTP varía entre las sondas, y la configuración predeterminada puede causar [errores HTTP][1] intermitentes como:
     - `MALFORMED_RESPONSE: Unable to parse HTTP response`
     - `Session closed without receiving a SETTINGS frame`
     - `Error HTTP2: Error performing HTTP/2 request`
   * {{< ui >}}Follow redirects{{< /ui >}}: Seleccione para que su prueba HTTP siga hasta diez redirecciones al realizar la solicitud.
   * {{< ui >}}Ignore server certificate error{{< /ui >}}: Seleccione para que su prueba HTTP continúe con la conexión incluso si hay errores al validar el certificado SSL.
   * {{< ui >}}Timeout{{< /ui >}}: Especifique la cantidad de tiempo en segundos antes de que la prueba agote el tiempo de espera.
   * {{< ui >}}Request headers{{< /ui >}}: Defina los encabezados que se agregarán a su solicitud HTTP. También puede anular los encabezados predeterminados (por ejemplo, el encabezado `user-agent`).
   * {{< ui >}}Cookies{{< /ui >}}: Defina las cookies que se agregarán a su solicitud HTTP. Establezca varias cookies utilizando el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

[1]: /es/synthetics/api_tests/errors/#http-errors

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * {{< ui >}}Client Certificate{{< /ui >}}: Autentíquese mediante mTLS cargando su certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`. Puede utilizar la biblioteca `openssl` para convertir sus certificados. Por ejemplo, convierta un certificado `PKCS12` a claves privadas y certificados con formato `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * {{< ui >}}HTTP Basic Auth{{< /ui >}}: Agregue credenciales de autenticación básica HTTP.
   * {{< ui >}}Digest Auth{{< /ui >}}: Agregue credenciales de autenticación Digest.
   * {{< ui >}}NTLM{{< /ui >}}: Agregue credenciales de autenticación NTLM. Admite tanto NTLMv2 como NTLMv1.
   * {{< ui >}}AWS Signature v4{{< /ui >}}: Ingrese su ID de clave de acceso y su clave de acceso secreta. Datadog genera la firma para su solicitud. Esta opción utiliza la implementación básica de SigV4. Las firmas específicas como Amazon S3 no son compatibles de forma predeterminada.
     Para solicitudes de transferencia de "fragmento único" a buckets de Amazon S3, agregue `x-amz-content-sha256` que contenga el cuerpo de la solicitud codificado en sha256 como encabezado (para un cuerpo vacío: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * {{< ui >}}OAuth 2.0{{< /ui >}}: Elija entre otorgar credenciales de cliente o una contraseña de propietario de recurso e ingrese una URL de token de acceso. Dependiendo de su selección, ingrese un ID de cliente y una contraseña, o un nombre de usuario y una contraseña. En el menú desplegable, seleccione una opción para enviar el token de API como un encabezado de autenticación básica o enviar las credenciales de cliente en el cuerpo. Opcionalmente, puede proporcionar información adicional como la audiencia, el recurso y el contexto (así como el ID de cliente y la contraseña, si seleccionó {{< ui >}}Resource Owner Password{{< /ui >}}).
   * {{< ui >}}JWT{{< /ui >}}: Genere un token de portador JWT firmado para la autenticación. Seleccione un algoritmo de firma (`HS256`, `RS256` o `ES256`) y proporcione una clave de firma: ingrese un secreto de texto para `HS256`, o cargue una clave privada con formato PEM para `RS256` y `ES256`. Ambos aceptan `{{ GLOBAL_VARIABLE }}` references. Enter payload claims as a JSON object; claims can be strings, numbers, Booleans, arrays, or nested objects. The `iat` (issued at) and `exp` (expiration) claims are auto-added by default. If you include `iat` or `exp` in the payload JSON, those values take precedence over the auto-generated ones. Optionally, set the expiration window in seconds (default: `3600`), add custom JWT header fields such as `kid` or `x5t`, and customize the token prefix in the `Authorization` header (default: `Bearer`).

   {{% /tab %}}

   {{% tab "Parámetros de consulta" %}}

   * {{< ui >}}Encode parameters{{< /ui >}}: Agregue el nombre y el valor de los parámetros de consulta que requieren codificación.

   {{% /tab %}}

   {{% tab "Cuerpo de la solicitud" %}}

   * {{< ui >}}Body type{{< /ui >}}: Seleccione el tipo de cuerpo de la solicitud (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` o `None`) que desea agregar a su solicitud HTTP.
   * {{< ui >}}Request body{{< /ui >}}: Agregue el contenido del cuerpo de su solicitud HTTP.
       * El cuerpo de la solicitud está limitado a un tamaño máximo de 50 kilobytes para `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * El cuerpo de la solicitud está limitado a un archivo de 3 megabytes para `application/octet-stream`.
       * El cuerpo de la solicitud está limitado a tres archivos de 3 megabytes cada uno para `multipart/form-data`.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * {{< ui >}}Proxy URL{{< /ui >}}: Especifique la URL del proxy a través del cual debe pasar la solicitud HTTP (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * {{< ui >}}Proxy header{{< /ui >}}: Agregue encabezados para incluir en la solicitud HTTP al proxy.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   * {{< ui >}}Do not save response body{{< /ui >}}: Seleccione esta opción para evitar que el cuerpo de la respuesta se guarde en tiempo de ejecución y para truncar el mensaje de error de las aserciones de JavaScript fallidas. Esto ayuda a garantizar que no se muestren datos confidenciales en los resultados de sus pruebas, pero puede dificultar la resolución de problemas de fallas. Para obtener recomendaciones de Security completas, consulte [Synthetic Monitoring Data Security][1].


[1]: /es/data_security/synthetics
   {{% /tab %}}

   {{% tab "JavaScript" %}}

Defina variables para sus pruebas de API HTTP con JavaScript:

{{< img src="synthetics/api_tests/http_javascript.png" alt="Definir prueba de API HTTP con JavaScript" style="width:90%;" >}}

<div class="alert alert-info">Las capacidades de JavaScript no son compatibles con las pruebas de API en ubicaciones privadas de Windows.</div>

   {{% /tab %}}

   {{< /tabs >}}

### Defina aserciones {#define-assertions}

Las aserciones definen cuál es el resultado esperado de una prueba. Después de hacer clic en {{< ui >}}Test URL{{< /ui >}}, se agregan aserciones básicas sobre `response time`, `status code` y `header` `content-type` según la respuesta obtenida. Debe definir al menos una aserción para que su prueba haga un seguimiento.

<div class="alert alert-info">Las secciones de encabezado, cuerpo y JavaScript de las aserciones son solo para definir aserciones. No se pueden utilizar para realizar solicitudes HTTP adicionales.</div>

{{< tabs >}}
{{% tab "Aserciones de respuesta" %}}

| Tipo          | Operador                                                                                               | Tipo de valor                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| body          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5], <br> [`jsonschema`][7] | _String_ <br> _[Regex][6]_ <br> _String_, _[Regex][6]_ <br> _String_ |
| body hash     | `md5`, `sha1`, `sha256`                                                                                 | _String_                                                        |
| header        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> `does not exist`, <br> `is less than`, `is less than or equal`, `is more than`, `is more than or equal` | _String_ <br> _[Regex][6]_ <br> _None_ <br> _Integer_ |
| response time | `is less than`                                                                                         | _Integer (ms)_                                                  |
| status code   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Integer_ <br> _[Regex][6]_                                                     |

Las pruebas HTTP pueden descomprimir cuerpos con los siguientes encabezados `content-encoding`: `br`, `deflate`, `gzip` y `identity`.

Puede crear hasta 20 aserciones por prueba de API haciendo clic en {{< ui >}}New Assertion{{< /ui >}} o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_http.png" alt="Defina aserciones para que su prueba HTTP tenga éxito o falle" style="width:90%;" >}}

Para realizar lógica `OR` en una aserción, utilice el comparador `matches regex` para definir una expresión regular con múltiples valores esperados como `(200|302)`. Por ejemplo, es posible que desee que su prueba HTTP tenga éxito cuando un servidor deba responder con un código de estado `200` o `302`. La aserción `status code` tiene éxito si el código de estado es 200 o 302. También puede agregar lógica `OR` en una aserción `body` o `header` con el comparador `matches regex`.

Si una prueba no contiene una aserción sobre el cuerpo de la respuesta, la carga útil del cuerpo se descarta y devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo de espera establecido por el Synthetics Worker.

El cuerpo de la respuesta solo se devuelve si ha agregado aserciones sobre su contenido y estas aserciones han fallado. Si una prueba contiene una aserción en el cuerpo de la respuesta y tiene éxito, la carga útil del cuerpo se descarta y solo se muestra un fragmento de los primeros 50 caracteres del cuerpo de la respuesta.

Si una prueba contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: https://json-schema.org/

{{% /tab %}}
{{% tab "JavaScript" %}}

Use aserciones de JavaScript cuando las aserciones de respuesta estándar no satisfagan sus necesidades de validación. Synthetic Monitoring utiliza la [biblioteca de aserciones Chai][20], que proporciona `dd.expect()`, `dd.should` y `dd.assert()` para estilos de aserción flexibles.

Al trabajar con respuestas JSON, use `JSON.parse(dd.response.body)` para analizar el cuerpo de la respuesta antes de acceder a sus propiedades. Esto es necesario para todos los métodos de aserción (`dd.assert()`, `dd.expect()` y `dd.should`) al validar datos JSON.

{{< img src="synthetics/api_tests/JS_assertion.png" alt="Aserción de JavaScript para prueba de API HTTP" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Las capacidades de JavaScript no son compatibles para pruebas de API en ubicaciones privadas de Windows.</li>
    <li>Si el mensaje de error de una aserción de JavaScript fallida puede incluir datos confidenciales, en {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Privacy{{< /ui >}}, habilite {{< ui >}}Do not save response body{{< /ui >}}. Esto trunca el mensaje de error de la aserción.</li>
  </ul>
</div>

#### Uso de dd.assert() {#using-ddassert}

Use `dd.assert()` para la sintaxis de aserción tradicional:

Por ejemplo, para probar que un campo `status.code` sea uno de varios valores permitidos:

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
// Assert that the status code is 200, 210, 320, or 330
dd.assert.include([200, 210, 320, 330], response.status.code);
{{< /code-block >}}

Respuesta de ejemplo:

```json
{
  "status": {
    "code": 200,
    "message": "Success"
  }
}
```

Esta aserción:
- Analiza el cuerpo de la respuesta JSON
- Comprueba que `status.code` esté incluido en la matriz de valores permitidos (200, 210, 320 o 330)

La prueba **pasa** porque `status.code` es `200`, lo cual está incluido en la matriz de valores permitidos.

Para obtener más información sobre `assert.include()`, consulte la [documentación de Chai assert.include()][21].

#### Usando dd.expect() {#using-ddexpect}

Use `dd.expect()` para aserciones con validación de propiedades anidadas.

Por ejemplo, para probar que un campo `status.indicator` coincida con uno de varios valores esperados:

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
const regex = /^(major|critical|minor|none)$/;

dd.expect(response)
  .to.have.nested.property('status.indicator')
  .that.matches(regex);
{{< /code-block >}}

Respuesta de ejemplo:

```json
{
  "status": {
    "indicator": "none"
  }
}
```
Esta aserción:
- Analiza el cuerpo de la respuesta JSON
- Valida que la propiedad anidada `status.indicator` exista
- Comprueba que el valor coincida con el patrón regex (uno de: `major`, `critical`, `minor` o `none`)

Con el regex `/^(major|critical|minor|none)$/`, la prueba **pasa** porque `status.indicator` es `"none"`, lo cual coincide con el patrón.

Con el regex `/^(major|critical|minor)$/`, la prueba **falla** porque `"none"` no está incluido en los valores permitidos.

Para obtener más información sobre `expect()`, consulte la [documentación de Chai expect()][22].

#### Usando dd.should {#using-ddshould}

Use `dd.should` para escribir aserciones con sintaxis de lenguaje natural:

Por ejemplo, para probar que un campo `status.indicator` exista y sea igual a un valor específico:

{{< code-block lang="javascript" >}}
const response = JSON.parse(dd.response.body);
response.status.should.exist();
const indicator = response.status.indicator;
indicator.should.equal('none');
{{< /code-block >}}

Respuesta de ejemplo:

```json
{
  "status": {
    "indicator": "none"
  }
}
```

Esta aserción:
- Analiza el cuerpo de la respuesta JSON
- Verifica que la propiedad `status` exista
- Extrae el valor del indicador en una variable
- Comprueba que `status.indicator` sea igual a `"none"`

La prueba **pasa** porque `status` existe y `status.indicator` es `"none"`.

Para obtener más información sobre `should()`, consulte la [documentación de Chai should()][23].

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### Seleccione ubicaciones {#select-locations}

Seleccione la {{< ui >}}Locations{{< /ui >}} desde la cual ejecutar su prueba HTTP. Las pruebas HTTP pueden ejecutarse desde [ubicaciones privadas][1] y administradas, según su preferencia para ejecutar la prueba desde fuera o dentro de su red.

{{% managed-locations %}}

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Las pruebas HTTP pueden ejecutarse:

* **Según un horario** para garantizar que sus puntos de conexión más importantes estén siempre accesibles para sus usuarios. Seleccione la frecuencia con la que desea que Datadog ejecute su prueba HTTP.
* [**Dentro de sus CI/CD pipelines**][2] para comenzar a realizar entregas sin temor a que un código defectuoso pueda afectar la experiencia de sus usuarios.
* **Bajo demanda** para ejecutar sus pruebas cuando tenga más sentido para su equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## Un clic {#one-click}

La creación de pruebas de API sugiere puntos de conexión del [Catálogo][17] y pruebas de API existentes para rellenar previamente su formulario de prueba con opciones relevantes.
Utilice fuentes de datos de Datadog existentes, como trazas de APM, detección de puntos de conexión del Catálogo y pruebas Synthetic similares existentes creadas por los usuarios.

Comience a escribir en la entrada {{< ui >}}URL{{< /ui >}} de la prueba de API para obtener sugerencias de puntos de conexión o pruebas similares en Synthetic Monitoring:

   {{< img src="synthetics/api_tests/api-one-click.png" alt="Prueba de API HTTP que muestra una búsqueda GET de una prueba de API existente" style="width:90%;" >}}

Luego, seleccione una sugerencia para rellenar previamente la configuración de su prueba (opciones y encabezados de solicitud, autenticación y variables):

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="Select" style="width:90%;" >}}

{{% synthetics-variables %}}

### Usar variables {#use-variables}

Puede usar las [variables globales definidas en la página {{< ui >}}Settings{{< /ui >}}][11] en la URL, las opciones avanzadas y las aserciones de sus pruebas HTTP.

Para mostrar su lista de variables, escriba `{{` en el campo deseado:

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Uso de variables en una prueba HTTP" video="true" width="100%" >}}

## Falla de prueba {#test-failure}

Una prueba se considera `FAILED` si no cumple con una o más aserciones o si la solicitud falló prematuramente. En algunos casos, la prueba puede fallar sin probar las aserciones contra el punto de conexión.

{{< img src="synthetics/api_tests/api_test_summary_updated.png" alt="Página de detalles de la prueba de API HTTP que muestra la pestaña Actividad con tiempo de actividad global, una línea de tiempo de alertas y una lista de las ejecuciones de prueba recientes en estado de alerta" style="width:100%;">}}

### Resumen de la línea de tiempo {#timeline-summary}

El panel {{< ui >}}Summary{{< /ui >}} identifica problemas únicos que causan fallas en las ejecuciones de prueba en el período de tiempo seleccionado. Para cada problema, el panel muestra:

- {{< ui >}}First seen{{< /ui >}}: Cuándo apareció el problema por primera vez en las ejecuciones de prueba.
- {{< ui >}}Last seen{{< /ui >}}: Cuándo apareció el problema más recientemente en las ejecuciones de prueba.
- {{< ui >}}Classification{{< /ui >}}: Si el problema es un {{< ui >}}True failure{{< /ui >}} (un problema real con su aplicación) o un {{< ui >}}Test Misconfiguration{{< /ui >}} (un problema con la configuración de la prueba), según el resumen de fallas de IA.
- {{< ui >}}Description{{< /ui >}}: Una breve descripción del error.
- {{< ui >}}Latest alerts{{< /ui >}}: Una lista de las alertas más recientes relacionadas con el problema.

Para obtener una lista completa de los códigos de error HTTP y SSL, consulte [API Testing Errors][12].

## Inicie una Bits Investigation {#launch-a-bits-investigation}

Para identificar la causa raíz de una prueba HTTP sintética fallida, inicie una [Bits Investigation][18]. Bits Investigation analiza los resultados de las pruebas, las trazas, los logs y las métricas para determinar la causa raíz y marcar si el error es una regresión o una configuración incorrecta.

## Permisos {#permissions}

De forma predeterminada, solo los usuarios con los [Datadog Admin y Datadog Standard roles][13] pueden crear, editar y eliminar pruebas HTTP sintéticas. Para obtener acceso para crear, editar y eliminar pruebas HTTP sintéticas, actualice su usuario a uno de esos dos [default roles][13].

Si está utilizando la [custom role feature][14], agregue su usuario a cualquier custom role que incluya los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[7]: /es/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /es/synthetics/guide/synthetic-test-monitors
[11]: /es/synthetics/settings/#global-variables
[12]: /es/synthetics/api_tests/errors/
[13]: /es/account_management/rbac/
[14]: /es/account_management/rbac#custom-roles
[15]: /es/account_management/rbac/#create-a-custom-role
[16]: /es/synthetics/api_tests/errors/#http-errors
[17]: /es/api_catalog
[18]: /es/bits_ai/bits_investigation/investigate_issues/#from-the-synthetic-test-details-page