---
title: Creating HTTP Tests with HMAC Authentication
kind: documentation
description: Learn how to create an HTTP test with HMAC.
further_reading:
- link: "/synthetics/api_tests/http_tests"
  tag: "Documentation"
  text: "Learn about HTTP tests"
- link: "/synthetics/api_tests/http_tests#variables"
  tag: "Documentation"
  text: "Learn about Synthetic test variables"
---

## Overview

Synthetic Monitoring allows you to generate variables from JavaScript scripts so you can define custom authentications or encode parameters.

{{< img src="synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.png" alt="HTTP test with HMAC authentication" style="width:100%;" >}}

This guide walks you through how to create an HTTP test with an HMAC signature, using variables from script.

**Note**: There is no standard HMAC authentication, your own HMAC authentication may be slighty different. For instance, it may use a different header name.

## Setup

### Create the building blocks of HMAC authentication using local variables

Create a [Synthetic HTTP test][3] and click **Create a Local Variable** to add the following variables:

`MY_SECRET_KEY`
: The UTF-8 encoded key that is used to sign the message (which can also be imported from a [global variable][4]).

`BODY`
: The request body (which is set in the **Request Body**) and is used to compute the HMAC authentication.

`DATETIME`
: A parameter to compute the HMAC signature. You can create this as a [local variable][1] or create and export this inside the [variable from script script](#compute-the-hmac-signature-with-javascript) with `dd.variable.set('DATETIME', new Date().toISOString())`.

### Define a test URL and request body

Define the URL and the request type for the HTTP test. Then, click **Advanced Options** > **Request Body** to add the `{{ BODY }}` variable as the request body.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="A local variable set as the request body for an HTTP test" style="width:80%;" >}}

### Compute the HMAC Signature with JavaScript

Click **Variable From Script** to generate the HMAC signature for your HTTP request.

{{< img src="synthetics/guide/http-tests-with-hmac/variables_from_script.png" alt="A local variable generated with JavaScript" style="width:80%;" >}}

* To import variables into your script, use `dd.variable.get("<variable_name>")`.
* To define a variable, use either `dd.variable.set("<variable_name>", <value>)` or `dd.variable.setObfuscated("<variable_name>", <value>)`.

You also have access to helper functions, such as:
* Most of the [`std` library][5], accessible with `std.*`. For example, to call the function `encodeHex` defined in `<std>/encoding/hex.ts`, use `std.encoding.hex.encodeHex`.
* Standard JavaScript APIs, such as the [Web Crypto API][6].

**Note**: Some of these APIs are disabled for security reasons.

For example:

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

### Add the HMAC signature to the request header

Use the exported `SIGNATURE` variable to build the HTTP request header.

Under the **Request Options** tab, add a header with `Name` set to `Authentication` and `Value` set to `{{ SIGNATURE }}`, and another one with `Name` set to `Date` and `Value` set to `{{ DATETIME }}`. You can define a different header such as `Authorization`.

Configure the rest of your HTTP test, and click **Create** to save.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /synthetics/settings/?tab=specifyvalue#global-variables
[5]: https://deno.land/std@0.206.0?doc
[6]: https://developer.mozilla.org/en-US/docs/Web/API/Crypto
