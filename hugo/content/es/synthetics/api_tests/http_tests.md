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
description: Simular solicitudes HTTP para monitorear puntos finales de API públicos
  e internos.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentamos el Monitoreo Sintético de Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de Aprendizaje
  text: Introducción a las Pruebas Sintéticas
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Comience con pruebas HTTP
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar pruebas HTTP en puntos finales internos
- link: /synthetics/multistep
  tag: Documentación
  text: Ejecutar pruebas HTTP de múltiples pasos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Aprenda sobre los monitores de prueba Synthetic
title: Pruebas HTTP
---
## Resumen {#overview}

Las pruebas HTTP le permiten enviar solicitudes HTTP a los puntos finales de la API de sus aplicaciones para verificar respuestas y condiciones definidas, como el tiempo de respuesta general, el código de estado esperado, el encabezado o el contenido del cuerpo.

Las pruebas HTTP pueden ejecutarse desde [ubicaciones gestionadas](#select-locations) y [ubicaciones privadas][1] dependiendo de su preferencia por ejecutar la prueba desde fuera o dentro de su red. Las pruebas HTTP pueden ejecutarse según un horario, a demanda o directamente dentro de sus [canalizaciones de CI/CD][2].

## Configuración {#configuration}

Puede crear una prueba utilizando una de las siguientes opciones:

   - **Crear una prueba a partir de una plantilla**:
   
     1. Pase el cursor sobre una de las plantillas predefinidas y haga clic en **Ver Plantilla**. Esto abre un panel lateral que muestra información de configuración predefinida, incluyendo: Detalles de la Prueba, Detalles de la Solicitud, Afirmaciones, Condiciones de Alerta y Configuraciones de Monitoreo. 
     2. Haga clic en **+Crear prueba** para abrir la página **Definir solicitud**, donde puede revisar y editar las opciones de configuración predefinidas. Los campos presentados son idénticos a los disponibles al crear una prueba desde cero.
     3. Haga clic en **Guardar detalles** para enviar su prueba de API. <br /><br>

        {{< img src="getting_started/synthetics/synthetics_templates_api_video.mp4" alt="Video de la página de inicio de prueba de API de Synthetics con plantillas" video="true" >}}

  - **Construya una prueba desde cero**:
    
     1. Para construir una prueba desde cero, haga clic en la plantilla **+ Comenzar desde cero**, luego seleccione el tipo de `HTTP`solicitud y especifique la **URL** a consultar. 
        Los métodos disponibles son: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` y `OPTIONS`. Se admiten tanto `http` como `https` URLs.

        <div class="alert alert-info">Vea <a href=#advanced-options>Opciones avanzadas</a> para más opciones.</div>

     2. **Name** your HTTP test.

     3. Add Environment **Tags** as well as any other tag to your HTTP test. You can then use these tags to filter through your Synthetic tests on the [Synthetic Monitoring & Continuous Testing page][3]. 
     
     4. Click **Send** to try out the request configuration. A response preview is displayed on the right side of your screen.<br /><br>

       {{< img src="getting_started/synthetics/api-test-config-4.png" alt="Definir solicitud HTTP" style="width:90%;" >}}

     5. Click **Create Test** to submit your API test.

### Fragmentos {#snippets}

{{% synthetics-api-tests-snippets %}}

### Opciones avanzadas {#advanced-options}

   {{< tabs >}}

   {{% tab "Opciones de solicitud" %}}
   * **Versión HTTP**: Seleccione `HTTP/1.1 only`, `HTTP/2 only` o `HTTP/2 fallback to HTTP/1.1`.
   * **Seguir redirecciones**: Seleccione para que su prueba HTTP siga hasta diez redirecciones al realizar la solicitud.
   * **Ignorar error de certificado del servidor**: Seleccione para que su prueba HTTP continúe con la conexión incluso si hay errores al validar el certificado SSL.
   * **Tiempo de espera**: Especifique la cantidad de tiempo en segundos antes de que la prueba exceda el tiempo límite.
   * **Encabezados de solicitud**: Define encabezados para agregar a tu solicitud HTTP. También puedes anular los encabezados predeterminados (por ejemplo, el encabezado `user-agent`).
   * **Cookies**: Define cookies para agregar a tu solicitud HTTP. Establece múltiples cookies utilizando el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`.

   {{% /tab %}}

   {{% tab "Autenticación" %}}

   * **Certificado de cliente**: Autentica a través de mTLS subiendo tu certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`. Puedes usar la biblioteca `openssl` para convertir tus certificados. Por ejemplo, convierte un certificado `PKCS12` a claves privadas y certificados en formato `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **Autenticación básica HTTP**: Agrega credenciales de autenticación básica HTTP.
   * **Autenticación Digest**: Agrega credenciales de autenticación Digest.
   * **NTLM**: Agrega credenciales de autenticación NTLM. Admite tanto NTLMv2 como NTLMv1.
   * **Firma AWS v4**: Ingresa tu ID de clave de acceso y clave de acceso secreta. Datadog genera la firma para tu solicitud. Esta opción utiliza la implementación básica de SigV4. Firmas específicas como Amazon S3 no son compatibles de forma predeterminada.
     Para solicitudes de transferencia "Single Chunk" a los buckets de Amazon S3, agrega `x-amz-content-sha256` que contenga el cuerpo de la solicitud codificado en sha256 como un encabezado (para un cuerpo vacío: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: Elige entre otorgar credenciales de cliente o una contraseña de propietario de recurso e ingresa una URL de token de acceso. Dependiendo de tu selección, ingresa un ID de cliente y secreto, o un nombre de usuario y contraseña. Desde el menú desplegable, selecciona una opción para enviar el token de API como un encabezado de autenticación básica, o enviar las credenciales del cliente en el cuerpo. Opcionalmente, puedes proporcionar información adicional como la audiencia, el recurso y el contexto (así como el ID y secreto del cliente, si seleccionaste **Recurso de Propietario de Contraseña**).

   {{% /tab %}}

   {{% tab "Parámetros de Consulta" %}}

   * **Codificar parámetros**: Agrega el nombre y valor de los parámetros de consulta que requieren codificación.

   {{% /tab %}}

   {{% tab "Cuerpo de la Solicitud" %}}

   * **Tipo de cuerpo**: Seleccione el tipo de cuerpo de la solicitud (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` o `None`) que desea agregar a su solicitud HTTP.
   * **Cuerpo de la solicitud**: Agrega el contenido de tu cuerpo de solicitud HTTP.
       * El cuerpo de la solicitud está limitado a un tamaño máximo de 50 kilobytes para `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * El cuerpo de la solicitud está limitado a un archivo de 3 megabytes para `application/octet-stream`.
       * El cuerpo de la solicitud está limitado a tres archivos de 3 megabytes cada uno para `multipart/form-data`.
   {{% /tab %}}

   {{% tab "Proxy" %}}

   * **URL del proxy**: Especifique la URL del proxy por el que debe pasar la solicitud HTTP (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Encabezado del proxy**: Agregue encabezados para incluir en la solicitud HTTP al proxy.

   {{% /tab %}}

   {{% tab "Privacidad" %}}

   * **No guardar el cuerpo de la respuesta**: Seleccione esta opción para evitar que el cuerpo de la respuesta se guarde en tiempo de ejecución y para truncar el mensaje de error de las afirmaciones de JavaScript fallidas. Esto ayuda a garantizar que no se muestre información sensible en los resultados de su prueba, pero puede dificultar la solución de problemas de fallos. Para recomendaciones de seguridad completas, consulte [Seguridad de Datos de Monitoreo Sintético][1].


[1]: /es/data_security/synthetics
   {{% /tab %}}

   {{% tab "Javascript" %}}

Defina variables para sus pruebas de API HTTP con JavaScript:

{{< img src="synthetics/api_tests/http_javascript.png" alt="Defina prueba de API HTTP con Javascript" style="width:90%;" >}}

<div class="alert alert-info">Las capacidades de JavaScript no son compatibles con las pruebas de API en ubicaciones privadas de Windows.</div>

   {{% /tab %}}

   {{< /tabs >}}

### Define afirmaciones {#define-assertions}

Las afirmaciones definen cuál es un resultado de prueba esperado. Después de hacer clic en **Probar URL**, se añaden afirmaciones básicas sobre `response time`, `status code` y `header` `content-type` basadas en la respuesta que se obtuvo. Debes definir al menos una afirmación para que tu prueba sea objeto de seguimiento.

<div class="alert alert-info">El encabezado de afirmaciones, el cuerpo y las secciones de JavaScript son solo para definir afirmaciones. No se pueden usar para hacer solicitudes HTTP adicionales.</div>

{{< tabs >}}
{{% tab "Afirmaciones de respuesta" %}}

| Tipo          | Operador                                                                                               | Tipo de valor                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| cuerpo          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _Cadena_ <br> _[Regex][6]_ |
| encabezado        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _Cadena_ <br> _[Regex][6]_                                      |
| tiempo de respuesta | `is less than`                                                                                         | _Entero (ms)_                                                  |
| código de estado   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Entero_ <br> _[Regex][6]_                                                     |

Las pruebas HTTP pueden descomprimir cuerpos con los siguientes `content-encoding` encabezados: `br`, `deflate`, `gzip` y `identity`.

Puedes crear hasta 20 afirmaciones por prueba de API haciendo clic en **Nueva Afirmación** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_http.png" alt="Define afirmaciones para que tu prueba HTTP tenga éxito o falle en" style="width:90%;" >}}

Para realizar `OR` lógica en una afirmación, usa el `matches regex` comparador para definir una expresión regular con múltiples valores esperados como `(200|302)`. Por ejemplo, puedes querer que tu prueba HTTP tenga éxito cuando un servidor deba responder con un código de estado `200` o `302`. La afirmación `status code` tiene éxito si el código de estado es 200 o 302. También puedes añadir lógica `OR` en una afirmación `body` o `header` con el comparador `matches regex`.

Si una prueba no contiene una afirmación sobre el cuerpo de la respuesta, la carga del cuerpo se descarta y se devuelve un tiempo de respuesta asociado para la solicitud dentro del límite de tiempo establecido por el Synthetics Worker.

El cuerpo de la respuesta solo se devuelve si ha agregado afirmaciones sobre su contenido y estas afirmaciones han fallado. Si una prueba contiene una afirmación sobre el cuerpo de la respuesta y tiene éxito, la carga del cuerpo se descarta y solo se muestra un fragmento de los primeros 50 caracteres del cuerpo de la respuesta.

Si una prueba contiene una afirmación sobre el cuerpo de la respuesta y se alcanza el límite de tiempo, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions

{{% /tab %}}
{{% tab "JavaScript" %}}

Utilice afirmaciones de JavaScript cuando las afirmaciones de respuesta estándar no satisfagan sus necesidades de validación. Synthetic Monitoring utiliza la [biblioteca de afirmaciones Chai][20], que proporciona `dd.expect()`, `dd.should` y `dd.assert()` para estilos de afirmación flexibles.

Al trabajar con respuestas JSON, utilice `JSON.parse(dd.response.body)` para analizar el cuerpo de la respuesta antes de acceder a sus propiedades. Esto es necesario para todos los métodos de afirmación (`dd.assert()`, `dd.expect()` y `dd.should`) al validar datos JSON.

{{< img src="synthetics/api_tests/JS_assertion.png" alt="Afirmación de JavaScript para prueba de API HTTP" style="width:90%;" >}}

<div class="alert alert-info">
  <ul>
    <li>Las capacidades de JavaScript no son compatibles con pruebas de API en ubicaciones privadas de Windows.</li>
    <li>Si el mensaje de error de una afirmación de JavaScript fallida puede incluir datos sensibles, bajo <strong>Opciones Avanzadas</strong> > <strong>Privacidad</strong>, habilite <strong>No guardar el cuerpo de la respuesta</strong>. Esto trunca el mensaje de error de la afirmación.</li>
  </ul>
</div>

#### Usando dd.assert() {#using-ddassert}

Utilice `dd.assert()` para la sintaxis tradicional de afirmaciones:

Por ejemplo, para afirmar que un campo `status.code` es uno de varios valores permitidos:

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

Esta afirmación:
- Analiza el cuerpo de la respuesta JSON
- Verifica que `status.code` esté incluido en el arreglo de valores permitidos (200, 210, 320 o 330)

La prueba **pasa** porque `status.code` es `200`, lo cual está incluido en el arreglo de valores permitidos.

Para más información sobre `assert.include()`, consulta la [documentación de Chai assert.include()][21].

#### Usando dd.expect() {#using-ddexpect}

Utilice `dd.expect()` para afirmaciones con validación de propiedades anidadas.

Por ejemplo, para afirmar que un campo `status.indicator` coincida con uno de los varios valores esperados:

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
Esta afirmación:
- Analiza el cuerpo de la respuesta JSON
- Valida que la propiedad anidada `status.indicator` exista
- Verifica que el valor coincida con el patrón regex (uno de: `major`, `critical`, `minor` o `none`)

Con el regex `/^(major|critical|minor|none)$/`, la prueba **pasa** porque `status.indicator` es `"none"`, lo cual coincide con el patrón.

Con el regex `/^(major|critical|minor)$/`, la prueba **falla** porque `"none"` no está incluido en los valores permitidos.

Para más información sobre `expect()`, consulta la [documentación de Chai expect()][22].

#### Usando dd.should {#using-ddshould}

Usa `dd.should` para escribir afirmaciones con sintaxis de lenguaje natural:

Por ejemplo, para afirmar que un campo `status.indicator` existe y es igual a un valor específico:

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

Esta afirmación:
- Analiza el cuerpo de la respuesta JSON
- Verifica que la propiedad `status` exista
- Extrae el valor del indicador en una variable
- Verifica que `status.indicator` sea igual a `"none"`

La prueba **pasa** porque `status` existe y `status.indicator` es `"none"`.

Para más información sobre `should()`, consulta la [documentación de Chai should()][23].

[20]: https://www.chaijs.com/api/
[21]: https://www.chaijs.com/api/assert/#method_include
[22]: https://www.chaijs.com/guide/styles/#expect
[23]: https://www.chaijs.com/guide/styles/#should

{{% /tab %}}
{{< /tabs >}}

### Seleccione ubicaciones {#select-locations}

Seleccione las **Ubicaciones** desde las cuales ejecutar su prueba HTTP. Las pruebas HTTP pueden ejecutarse desde ubicaciones gestionadas y [privadas][1] dependiendo de su preferencia por ejecutar la prueba desde fuera o dentro de su red.

{{% managed-locations %}}

### Especifique la frecuencia de la prueba {#specify-test-frequency}

Las pruebas HTTP pueden ejecutarse:

* **Según un horario** para asegurar que sus puntos de conexión más importantes siempre sean accesibles para sus usuarios. Seleccione la frecuencia con la que desea que Datadog ejecute su prueba HTTP.
* [**Dentro de sus pipelines de CI/CD**][2] para comenzar a enviar sin temer que un código defectuoso pueda afectar la experiencia de sus clientes.
* **A demanda** para ejecutar sus pruebas cuando tenga más sentido para su equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-downtimes %}}

## Un clic {#one-click}

La creación de pruebas de API sugiere puntos de conexión del [Catálogo][17] y pruebas de API existentes para completar su formulario de prueba con opciones relevantes.
Utilice fuentes de datos existentes de Datadog, como trazas de APM, descubrimiento de puntos de conexión del Catálogo y pruebas Synthetic similares existentes creadas por usuarios.

Comience a escribir en la entrada de **URL** de la prueba de API para obtener sugerencias de puntos de conexión o pruebas similares en Synthetic Monitoring:

   {{< img src="synthetics/api_tests/api-one-click.png" alt="Prueba de API HTTP mostrando una búsqueda GET para una prueba de API existente" style="width:90%;" >}}

Luego, seleccione una sugerencia para completar la configuración de su prueba (opciones de solicitud y encabezados, autenticación y variables):

   {{< img src="synthetics/api_tests/api-test-monitor-search.png" alt="Seleccione" style="width:90%;" >}}

{{% synthetics-variables %}}

### Utilice variables {#use-variables}

Puede usar las [variables globales definidas en la página **Settings**][11] en la URL, opciones avanzadas y afirmaciones de sus pruebas HTTP.

Para mostrar su lista de variables, escriba `{{` en el campo deseado:

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Usando variables en una prueba HTTP" video="true" width="100%" >}}

## Fallo de prueba {#test-failure}

Una prueba se considera `FAILED` si no satisface una o más afirmaciones o si la solicitud falló prematuramente. En algunos casos, la prueba puede fallar sin probar las afirmaciones contra el punto de conexión.

Para una lista completa de códigos de error HTTP y SSL, consulta [Errores de pruebas de API][12].

## Permisos {#permissions}

Por defecto, solo los usuarios con los [Datadog Admin y Datadog Standard roles][13] pueden crear, editar y eliminar pruebas HTTP Synthetic. Para obtener acceso para crear, editar y eliminar pruebas HTTP Synthetic, actualice su rol de usuario a uno de esos dos [default roles][13].

Si está usando la [función de rol personalizado][14], agregue su usuario a cualquiera de los roles personalizados que incluyan los permisos `synthetics_read` y `synthetics_write`.

### Restringir acceso {#restrict-access}

{{% synthetics_grace_permissions %}}

## Lectura adicional {#further-reading}

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