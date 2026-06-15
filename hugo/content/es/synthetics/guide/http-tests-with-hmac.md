---
description: Aprende a crear un test HTTP con HMAC.
further_reading:
- link: /synthetics/api_tests/http_tests
  tag: Documentación
  text: Más información sobre los tests HTTP
- link: /synthetics/api_tests/http_tests#variables
  tag: Documentación
  text: Más información sobre las variables de test Synthetic
title: Creación de tests HTTP con autenticación HMAC
---

## Información general

La monitorización Synthetic te permite generar variables a partir de scripts de JavaScript para que puedas definir autenticaciones personalizadas o codificar parámetros.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="Test HTTP test con autenticación HMAC" style="width:100%;" >}}

Esta guía te muestra cómo crear un test HTTP con una firma HMAC, utilizando las variables de un script.

**Nota**: No existe una autenticación HMAC estándar, por lo que tu propia autenticación HMAC puede ser ligeramente diferente. Por ejemplo, puedes utilizar un nombre de cabecera diferente.

## Configuración

### Crear los componentes básicos de la autenticación HMAC utilizando variables locales

Crea un [test HTTP Synthetic][3] y haz clic en **Create a Local Variable** (Crear una variable local) para añadir las siguientes variables:

`MY_SECRET_KEY`
: La clave codificada en UTF-8 que se utiliza para firmar el mensaje (que también puede importarse desde una [variable global][4]).

`BODY`
: El cuerpo de la solicitud (que se define en el **Cuerpo de la solicitud**) y se utiliza para calcular la autenticación HMAC.

`DATETIME`
: Un parámetro para calcular la firma HMAC. Puedes crearlo como una [variable local][1] o crearlo y exportarlo dentro de la [variable de script](#compute-the-hmac-signature-with-javascript) con `dd.variable.set('DATETIME', new Date().toISOString())`.

### Definir un cuerpo de solicitud y una URL de test

Define la URL y el tipo de solicitud para el test HTTP. A continuación, haz clic en **Advanced Options** > **Request Body** (Opciones avanzadas > Cuerpo de la solicitud) para añadir la variable `{{ BODY }}` como cuerpo de la solicitud.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="Variable local definida como cuerpo de la solicitud de un test HTTP" style="width:80%;" >}}

### Calcular la firma HMAC con JavaScript

Haz clic en **Variable From Script** (Variable del script) para generar la firma HMAC para tu solicitud HTTP.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="Variable local generada con JavaScript" style="width:80%;" >}}

* Para importar variables a tu script, utiliza `dd.variable.get("<variable_name>")`.
* Para definir una variable, utiliza `dd.variable.set("<variable_name>", <value>)` o `dd.variable.setObfuscated("<variable_name>", <value>)`.

También tienes acceso a funciones de ayuda, como:
* La mayoría de las [bibliotecas `std`][5], accesibles con `std.*`. Por ejemplo, para llamar a la función `encodeHex` definida en `<std>/encoding/hex.ts`, utiliza `std.encoding.hex.encodeHex`.
* API estándar JavaScript, como la [API Web Crypto][6].

**Nota**: Algunas de estas API están deshabilitadas por motivos de seguridad.

Por ejemplo:

{{< code-block lang="JavaScript" filename="Variable from Script" collapsible="true" >}}
const datetime = new Date().toISOString();
// Definir una cabecera HTTP de "fecha" utilizando DATETIME como su valor en la interfaz de usuario
dd.variable.set("DATETIME", datetime);

const message = "¡Hola, mundo!";
// Utilizar BODY como el cuerpo de la solicitud en la interfaz de usuario
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

// Definir una cabecera HTTP de "autenticación" utilizando SIGNATURE como su valor en la interfaz de usuario
dd.variable.set("SIGNATURE", std.encoding.hex.encodeHex(rawSignature));

// Alternativa:
dd.variable.set("SIGNATURE_BASE64", std.encoding.base64.encode(rawSignature));
{{< /code-block >}}

### Añadir la firma HMAC a la cabecera de la solicitud

Utiliza la variable exportada `SIGNATURE` para crear la cabecera de la solicitud HTTP.

En la pestaña **Opciones de solicitud**, añade una cabecera con `Name` definido en `Authentication` y `Value` definido en  `{{ SIGNATURE }}`, y otra, con `Name` definido en  `Date` y `Value` definido en  `{{ DATETIME }}`. Puedes definir una cabecera diferente como `Authorization`.

Configura el resto de tu test HTTP y haz clic en **Create** (Crear) para guardarlo.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /es/synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /es/synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://deno.land/std@0.206.0?doc
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto