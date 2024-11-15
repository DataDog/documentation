---
algolia:
  category: Documentación
  rank: 70
  subcategory: Tests API Synthetic
  tags:
  - http
  - test http
  - tests http
aliases:
- /es/synthetics/http_test
- /es/synthetics/http_check
- /es/synthetics/guide/or-logic-api-tests-assertions
description: Simula solicitudes HTPP para monitorizar endpoints de API públicos e
  internos.
further_reading:
- link: https://www.datadoghq.com/blog/introducing-synthetic-monitoring/
  tag: Blog
  text: Presentación de la monitorización Synthetic de Datadog
- link: https://learn.datadoghq.com/courses/intro-to-synthetic-tests
  tag: Centro de aprendizaje
  text: Introducción a los tests Synthetic
- link: /getting_started/synthetics/api_test
  tag: Documentación
  text: Empezando con los tests HTTP
- link: /synthetics/private_locations
  tag: Documentación
  text: Ejecutar tests HTTP en endpoints internos
- link: /synthetics/multistep
  tag: Documentación
  text: Ejecutar tests HTTP de varios pasos
- link: /synthetics/guide/synthetic-test-monitors
  tag: Documentación
  text: Más información sobre los monitores de test Synthetic
title: Tests HTTP
---
## Información general

Los tests HTTP te permiten enviar solicitudes HTTP a los endpoints de API de tus aplicaciones para verificar las respuestas y las condiciones definidas, como el tiempo de respuesta global, el código de estado esperado, la cabecera o el contenido del cuerpo.

Los tests HTTP pueden ejecutarse tanto desde [localizaciones gestionadas](#select-locations) como de [localizaciones privadas][1] dependiendo de tu preferencia de ejecución de tests desde fuera o dentro de tu red. Los tests HTTP pueden ejecutarse de forma programada, bajo demanda o directamente dentro de tus [pipelines CI/CD][2].

## Configuración

Cuando decidas crear un test `HTTP`, define la solicitud de tu test.

### Definición de la solicitud

1. Elige el **Método HTTP** y especifica la **URL** a consultar. Los métodos disponibles son: `GET`, `POST`, `PATCH`, `PUT`, `HEAD`, `DELETE` y `OPTIONS`. Tanto las URL `http` como `https` son compatibles.

   <div class="alert alert-info">Para ver más opciones, consulta <a href=#advanced-options>Opciones avanzadas</a>.</div>

2. **Pon un nombre** a tu test HTTP.

3. Añade **Etiquetas** (tags) `env` así como cualquier otra etiqueta a tu test HTTP. Luego, puedes utilizar estas etiquetas para filtrar tus tests Synthetic en la [página de monitorización y tests continuos Synthetic][3].

   {{< img src="synthetics/api_tests/http_test_config.png" alt="Definir una solicitud HTTP" style="width:90%;" >}}

Haz clic en **Test de URL** para probar la configuración de la solicitud. Aparecerá una vista previa de la respuesta en la parte derecha de la pantalla.

### Opciones avanzadas

{{< tabs >}}

{{% tab "Opciones de solicitud" %}}
   * **Versión HTTP**: Selecciona `HTTP/1.1 only`, `HTTP/2 only` o `HTTP/2 fallback to HTTP/1.1`.
   * **Seguir redirecciones**: Selecciona esta opción para que tu test HTTP pueda acceder a un máximo de diez redirecciones al realizar la solicitud.
   * **Ignorar error de certificado del servidor**: Selecciona esta opción para que tu test HTTP continúe con la conexión, aunque se produzcan errores al validar el certificado SSL.
   * **Tiempo de espera**: Especifica la cantidad de tiempo en segundos antes de que se inicie un tiempo de espera en el test.
   * **Cabeceras de solicitud**: Define las cabeceras a añadir a tu solicitud HTTP. También puedes anular las cabeceras predeterminadas (por ejemplo, la cabecera `user-agent`).
   * **Cookies**: Define cookies para añadir a tu solicitud HTTP. Define varias cookies utilizando el formato `<COOKIE_NAME1>=<COOKIE_VALUE1>; <COOKIE_NAME2>=<COOKIE_VALUE2>`

{{% /tab %}}

{{% tab "Autenticación" %}}

   * **Certificado de cliente**: Autentícate a través de mTLS cargando tu certificado de cliente (`.crt`) y la clave privada asociada (`.key`) en formato `PEM`. Puedes utilizar la biblioteca `openssl` para convertir tus certificados. Por ejemplo, puedes convertir un certificado `PKCS12` en certificados y claves privadas en formato `PEM`.

      ```
      openssl pkcs12 -in <CERT>.p12 -out <CERT_KEY>.key -nodes -nocerts
      openssl pkcs12 -in <CERT>.p12 -out <CERT>.cert -nokeys
      ```

   * **Autenticación básica HTTP**: Añade credenciales de autenticación básica HTTP.
   * **Autenticación Digest**: Añade credenciales de autenticación Digest. 
   * **NTLM**: Añade credenciales de autenticación NTLM. Esto es compatible con NTLMv2 y con NTLMv1.
   * **AWS Signature v4**: Introduce tu ID de clave de acceso y tu clave de acceso secreta. Datadog genera la firma para tu solicitud. Esta opción utiliza la implementación básica de SigV4. Las firmas específicas, como Amazon S3, no son compatibles de forma predefinida.
     Para las solicitudes de transferencia "Single Chunk" a buckets de Amazon S3, añade `x-amz-content-sha256` con el cuerpo de la solicitud codificado con sha256 como cabecera (para un cuerpo vacío: `x-amz-content-sha256: e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`).
   * **OAuth 2.0**: Elige entre conceder credenciales de cliente o una contraseña de propietario de recurso e introduce una URL de token de acceso. Dependiendo de tu selección, introduce un ID de cliente y un secreto o un nombre de usuario y una contraseña. En el menú desplegable, selecciona una opción para enviar el token de API como cabecera de autenticación básica o envía las credenciales de cliente en el cuerpo. También puedes proporcionar información adicional como el público, el recurso y el contexto (así como el ID de cliente y el secreto, si has seleccionado **Contraseña del propietario del recurso**).

{{% /tab %}}

{{% tab "Parámetros de consulta" %}}

   * **Codificar parámetros**: Añade el nombre y el valor de los parámetros de consulta que requieren codificación.

{{% /tab %}}

{{% tab "Cuerpo de la consulta" %}}

   * **Tipo de cuerpo**: Selecciona el tipo de cuerpo de la solicitud (`application/json`, `application/octet-stream`, `application/x-www-form-urlencoded`, `multipart/form-data`, `text/html`, `text/plain`, `text/xml`, `GraphQL` o `None`) que quieres añadir a tu solicitud HTTP.
   * **Cuerpo de la solicitud**: Añade el contenido del cuerpo de tu solicitud HTTP.
       * El cuerpo de la solicitud está limitado a un tamaño máximo de 50 kilobytes para `application/json`, `application/x-www-form-urlencoded`, `text/html`, `text/plain`, `text/xml`, `GraphQL`.
       * El cuerpo de la solicitud está limitado a un archivo de 3 megabytes para `application/octet-stream`.
       * El cuerpo de la solicitud está limitado a tres archivos de 3 megabytes cada uno para `multipart/form-data`. 
{{% /tab %}}

{{% tab "Proxy" %}}

   * **URL de proxy**: Especifica la URL del proxy por el que debe pasar la solicitud HTTP (`http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
   * **Cabecera de proxy**: Añade cabeceras para incluir en la solicitud HTTP al proxy.

{{% /tab %}}

{{% tab "Privacidad" %}}

   * **No guardar el cuerpo de la respuesta**: Selecciona esta opción para evitar que se guarde el cuerpo de la respuesta en tiempo de ejecución. Esta opción es útil para garantizar que no se muestren datos confidenciales en los resultados del test, pero debes utilizarla con prudencia ya que puede dificultar la resolución de problemas. Para obtener recomendaciones de seguridad, consulta [Seguridad en la monitorización Synthetic][1].


[1]: /es/data_security/synthetics
{{% /tab %}}

{{% tab "Javascript" %}}

Define variables para tus tests API HTTP con JavaScript:

  {{< img src="synthetics/api_tests/http_javascript.png" alt="Definir tests API HTTP con JavaScript" style="width:90%;" >}}

{{% /tab %}}

{{< /tabs >}}

### Definir aserciones

Las aserciones definen cuál es el resultado esperado de un test. Después de hacer clic en **URL del test**, se añaden aserciones básicas de `response time`, `status code` y `header` `content-type` basadas en la respuesta obtenida. Debes definir al menos una aserción para que sea monitorizada por tu test.

| Tipo          | Operador                                                                                               | Tipo de valor                                                      |
|---------------|--------------------------------------------------------------------------------------------------------|----------------------------------------------------------------|
| cuerpo          | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`, <br> [`jsonpath`][4], [`xpath`][5] | _String_ <br> _[Regex][6]_ |
| cabecera        | `contains`, `does not contain`, `is`, `is not`, <br> `matches`, `does not match`                       | _String_ <br> _[Regex][6]_                                      |
| tiempo de respuesta | `is less than`                                                                                         | _Integer (ms)_                                                  |
| código de estado   | `is`, `is not`, <br> `matches`, `does not match`                                                                                         | _Integer_ <br> _[Regex][6]_                                                     |

Los tests HTTP pueden descomprimir cuerpos con las siguientes cabeceras `content-encoding`: `br`, `deflate`, `gzip` y `identity`.

Puedes crear hasta 20 aserciones por test API haciendo clic en **Nueva aserción** o haciendo clic directamente en la vista previa de la respuesta:

{{< img src="synthetics/api_tests/assertions_http.png" alt="Definir aserciones en las que tu test HTTP tenga éxito o falle" style="width:90%;" >}}

Para aplicar una lógica `OR` en una aserción, utiliza el comparador `matches regex` para definir una expresión regular con varios valores esperados, como `(200|302)`. Por ejemplo, te podría interesar que tu test HTTP tenga éxito cuando el servidor responde con un código de estado `200` o `302`. La aserción `status code` tiene éxito si el código de estado es 200 o 302. También puedes añadir la lógica `OR` en una aserción de `body` o `header`.

Si un test no contiene una aserción en el cuerpo de la respuesta, la carga útil del cuerpo cae y devuelve un tiempo de respuesta asociado para la solicitud, dentro del límite de tiempo de espera establecido por el worker de Synthetics.

Si un test contiene una aserción en el cuerpo de la respuesta y se alcanza el límite de tiempo de espera, aparece un error `Assertions on the body/response cannot be run beyond this limit`.

### Seleccionar localizaciones

Selecciona las **Localizaciones** desde donde ejecutar tu test HTTP. Los tests HTTP pueden ejecutarse desde localizaciones gestionadas y también [privadas][1], en función de si prefieres ejecutar el test desde fuera o desde dentro de tu red.

{{% managed-locations %}} 

### Indicar la frecuencia del test

Los tests HTTP se pueden ejecutar:

* **De forma programada** para garantizar que los endpoints más importantes siempre resulten accesibles para tus usuarios. Selecciona la frecuencia con la que quieres que Datadog ejecute tu test HTTP.
* [**En tus pipelines CI/CD**][2] para empezar a realizar envíos sin temer que un código defectuoso pueda afectar a la experiencia de tus clientes.
* **Bajo demanda** para ejecutar tus tests cuando sea más conveniente para tu equipo.

{{% synthetics-alerting-monitoring %}}

{{% synthetics-variables %}}

### Uso de variables

Puedes utilizar las [variables globales definidas en la página **Parámetros**][8] en la URL, las opciones avanzadas y las aserciones de tus tests HTTP.

Para visualizar tu lista de variables, escribe `{{` en el campo de tu elección.

{{< img src="synthetics/api_tests/http_use_variable.mp4" alt="Uso de variables en un test HTTP" video="true" width="100%" >}}

## Fallo del test

Un test se considera `FAILED` si no satisface una o más aserciones o si la solicitud ha fallado prematuramente. En algunos casos, el test puede fallar sin comprobar las aserciones respecto al endpoint.

Los errores más comunes incluyen los siguientes:

`CONNREFUSED`
: No se ha podido establecer una conexión, ya que la máquina de destino la ha rechazado continuamente.

`CONNRESET`
: El servidor remoto ha finalizado bruscamente la conexión. Entre las posibles causas se incluyen que el servidor web haya encontrado un error o falla al responder, o que se haya perdido la conectividad del servidor web.

`DNS`:
No se ha encontrado la entrada DNS para la URL del test. Entre las posibles causas se incluyen una URL de test mal configurada o una configuración incorrecta de las entradas DNS.

`Error performing HTTP/2 request`
: No se ha podido realizar la solicitud. Para obtener más información, consulta la página de [errores][16] específicos.

`INVALID_REQUEST` 
: La configuración del test no es válida (por ejemplo, un error tipográfico en la URL).

`SSL`
: No se ha podido realizar la conexión SSL. [Para obtener más información, consulta la página de errores específica][12].

`TIMEOUT`
: La solicitud no se ha podido completar en un plazo razonable. Pueden ocurrir dos tipos de `TIMEOUT`:
  - `TIMEOUT: The request couldn't be completed in a reasonable time.` indica que la duración de la solicitud ha alcanzado el tiempo de espera definido en el test (por defecto se define en 60 segundos).
  Para cada solicitud, en la cascada de la red sólo se muestran las etapas completadas de la solicitud. Por ejemplo, en el caso de que sólo se muestre `Total response time`, el tiempo de espera se produjo durante la resolución DNS.
  - `TIMEOUT: Overall test execution couldn't be completed in a reasonable time.` indica que la duración del test (solicitud + aserciones) alcanza la duración máxima (60,5 segundos).

`MALFORMED_RESPONSE` 
: El servidor remoto ha respondido con una carga útil que no cumple con las especificaciones HTTP.

## Permisos

De manera predeterminada, sólo los usuarios con los roles de [administrador de Datadog y estándar de Datadog][13] pueden crear, editar y eliminar tests HTTP Synthetic. Para crear, editar y eliminar tests HTTP Synthetic, actualiza tu usuario a uno de esos dos [roles predeterminados][13].

Si estás utilizando la [función de rol personalizado][14], añade tu usuario a cualquier rol que incluya permisos `synthetics_read` y `synthetics_write`.

### Restringir el acceso

La restricción del acceso está disponible para clientes que utilizan [roles personalizados][15] en sus cuentas.

Puedes restringir el acceso a un test HTTP en función de los roles de tu organización. Al crear un test HTTP, elige qué roles (además de tu usuario) pueden leer y escribir tu test.

{{< img src="synthetics/settings/restrict_access_1.png" alt="Definir permisos para tu test" style="width:70%;" >}}

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/private_locations
[2]: /es/synthetics/cicd_integrations
[3]: /es/synthetics/search/#search
[4]: https://restfulapi.net/json-jsonpath/
[5]: https://www.w3schools.com/xml/xpath_syntax.asp
[6]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions
[7]: /es/monitors/notify/#configure-notifications-and-automations
[8]: https://www.markdownguide.org/basic-syntax/
[9]: /es/monitors/notify/?tab=is_recoveryis_alert_recovery#conditional-variables
[10]: /es/synthetics/guide/synthetic-test-monitors
[11]: /es/synthetics/settings/#global-variables
[12]: /es/synthetics/api_tests/errors/#ssl-errors
[13]: /es/account_management/rbac/
[14]: /es/account_management/rbac#custom-roles
[15]: /es/account_management/rbac/#create-a-custom-role
[16]: /es/synthetics/api_tests/errors/#http-errors