---
description: Aprenda cómo crear una prueba HTTP con HMAC.
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Obtenga información sobre las pruebas HTTP
- link: /synthetics/api_tests/http_tests#variables
  tag: Documentación
  text: Obtenga información sobre las variables de prueba Synthetic
title: Creación de pruebas HTTP con autenticación HMAC
---
## Descripción general {#overview}

Synthetic Monitoring le permite generar variables a partir de scripts de JavaScript para que pueda definir autenticaciones personalizadas o codificar parámetros.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="Prueba HTTP con autenticación HMAC" style="width:100%;" >}}

Esta guía le muestra cómo crear una prueba HTTP con una firma HMAC, utilizando variables de script.

**Nota**: No existe una autenticación HMAC estándar, su propia autenticación HMAC puede ser ligeramente diferente. Por ejemplo, puede usar un nombre de encabezado diferente.

## Configuración {#setup}

### Cree los componentes básicos de la autenticación HMAC usando variables locales {#create-the-building-blocks-of-hmac-authentication-using-local-variables}

Cree una [prueba Synthetic HTTP][3] y haga clic en {{< ui >}}Create a Local Variable{{< /ui >}} para agregar las siguientes variables:

`MY_SECRET_KEY`
: La clave codificada en UTF-8 que se utiliza para firmar el mensaje (que también se puede importar desde una [variable global][4]).

`BODY`
: El cuerpo de la solicitud (que se establece en {{< ui >}}Request Body{{< /ui >}}) y se utiliza para calcular la autenticación HMAC.

`DATETIME`
: Un parámetro para calcular la firma HMAC. Cree esto como una [variable local][1] o créelo y expórtelo dentro de la [variable de script](#compute-the-hmac-signature-with-javascript) con `dd.variable.set('DATETIME', new Date().toISOString())`.

### Defina una URL de prueba y el cuerpo de la solicitud {#define-a-test-url-and-request-body}

Defina la URL y el tipo de solicitud para la prueba HTTP. Luego, haga clic en {{< ui >}}Advanced Options{{< /ui >}} > {{< ui >}}Request Body{{< /ui >}} para agregar la variable `{{ BODY }}` como el cuerpo de la solicitud.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="Una variable local establecida como el cuerpo de la solicitud para una prueba HTTP" style="width:80%;" >}}

### Calcule la firma HMAC con JavaScript {#compute-the-hmac-signature-with-javascript}

Haga clic en {{< ui >}}Variable From Script{{< /ui >}} para generar la firma HMAC para su solicitud HTTP.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="Una variable local generada con JavaScript" style="width:80%;" >}}

Este script se ejecuta antes de que Datadog envíe la solicitud HTTP. Para validar los datos de respuesta JSON después de que se complete la solicitud, use [aserciones de JavaScript][7] y `dd.response.body`.

* Para importar variables a su script, use `dd.variable.get("<variable_name>")`.
* Para definir una variable, use `dd.variable.set("<variable_name>", <value>)` o `dd.variable.setObfuscated("<variable_name>", <value>)`.

También tiene acceso a funciones auxiliares, tales como:
* La mayor parte de la [biblioteca `std`][5], accesible con `std.*`. Por ejemplo, para llamar a la función `encodeHex` definida en `@std/encoding/hex.ts`, use `std.encoding.hex.encodeHex`.
* APIs estándar de JavaScript, tales como la [Web Crypto API][6].

**Nota**: Algunas de estas APIs están deshabilitadas por razones de seguridad.

Por ejemplo:

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Set a "date" HTTP header using DATETIME as its value in the UI
dd.variable.set("DATETIME", datetime);

const message = "Hello, World!";
// Use BODY as the request body in the UI
dd.variable.set("BODY", message);

const secretKeyUtf8 = dd.variable.get("MY_SECRET_KEY");
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKeyUtf8),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

const rawSignature = await crypto.subtle.sign(
  { name: "HMAC" },
  key,
  new TextEncoder().encode(datetime + "." + message)
);

// Set an "authentication" HTTP header using SIGNATURE as its value in the UI
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternative:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### Agregue la firma HMAC al encabezado de la solicitud {#add-the-hmac-signature-to-the-request-header}

Utilice la variable exportada `SIGNATURE` para construir el encabezado de la solicitud HTTP.

En la pestaña {{< ui >}}Request Options{{< /ui >}}, agregue un encabezado con {{< ui >}}Name{{< /ui >}} establecido en `Authentication` y {{< ui >}}Value{{< /ui >}} establecido en `{{ SIGNATURE }}`, and another one with {{< ui >}}Name{{< /ui >}} establecido en `Date` and {{< ui >}}Value{{< /ui >}} establecido en `{{ DATETIME }}`. You can define a different header such as `Authorization`.

Configure el resto de su prueba HTTP y haga clic en {{< ui >}}Create{{< /ui >}} para guardar.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /es/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://jsr.io/@std
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
[7]: /es/synthetics/api_tests/http_tests/#define-assertions