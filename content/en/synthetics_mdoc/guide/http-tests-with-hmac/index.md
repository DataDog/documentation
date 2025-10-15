---
title: Creating HTTP Tests with HMAC Authentication
description: Learn how to create an HTTP test with HMAC.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Creating HTTP Tests with HMAC Authentication
sourceUrl: https://docs.datadoghq.com/synthetics/guide/http-tests-with-hmac/index.html
---

# Creating HTTP Tests with HMAC Authentication

## Overview{% #overview %}

Synthetic Monitoring allows you to generate variables from JavaScript scripts so you can define custom authentications or encode parameters.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/http-tests-with-hmac/test_with_hmac_authentication.f86bca3c8c0be0e70e1402eadb036918.png?auto=format"
   alt="HTTP test with HMAC authentication" /%}

This guide walks you through how to create an HTTP test with an HMAC signature, using variables from script.

**Note**: There is no standard HMAC authentication, your own HMAC authentication may be slighty different. For instance, it may use a different header name.

## Setup{% #setup %}

### Create the building blocks of HMAC authentication using local variables{% #create-the-building-blocks-of-hmac-authentication-using-local-variables %}

Create a [Synthetic HTTP test](https://app.datadoghq.com/synthetics/create) and click **Create a Local Variable** to add the following variables:

{% dl %}

{% dt %}
`MY_SECRET_KEY`
{% /dt %}

{% dd %}
The UTF-8 encoded key that is used to sign the message (which can also be imported from a [global variable](https://docs.datadoghq.com/synthetics/settings/?tab=specifyvalue#global-variables)).
{% /dd %}

{% dt %}
`BODY`
{% /dt %}

{% dd %}
The request body (which is set in the **Request Body**) and is used to compute the HMAC authentication.
{% /dd %}

{% dt %}
`DATETIME`
{% /dt %}

{% dd %}
A parameter to compute the HMAC signature. You can create this as a [local variable](https://docs.datadoghq.com/synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables) or create and export this inside the variable from script script with `dd.variable.set('DATETIME', new Date().toISOString())`.
{% /dd %}

{% /dl %}

### Define a test URL and request body{% #define-a-test-url-and-request-body %}

Define the URL and the request type for the HTTP test. Then, click **Advanced Options** > **Request Body** to add the `{{ BODY }}` variable as the request body.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/http-tests-with-hmac/request_body.b9b80c7521bc192205c8e579be7d5a74.png?auto=format"
   alt="A local variable set as the request body for an HTTP test" /%}

### Compute the HMAC Signature with JavaScript{% #compute-the-hmac-signature-with-javascript %}

Click **Variable From Script** to generate the HMAC signature for your HTTP request.

{% image
   source="https://datadog-docs.imgix.net/images/synthetics/guide/http-tests-with-hmac/variables_from_script.6bafc1939b7bfde1476e77c237ae9ca7.png?auto=format"
   alt="A local variable generated with JavaScript" /%}

- To import variables into your script, use `dd.variable.get("<variable_name>")`.
- To define a variable, use either `dd.variable.set("<variable_name>", <value>)` or `dd.variable.setObfuscated("<variable_name>", <value>)`.

You also have access to helper functions, such as:

- Most of the [`std` library](https://jsr.io/@std), accessible with `std.*`. For example, to call the function `encodeHex` defined in `@std/encoding/hex.ts`, use `std.encoding.hex.encodeHex`.
- Standard JavaScript APIs, such as the [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Crypto).

**Note**: Some of these APIs are disabled for security reasons.

For example:

In the `Variable from Script` file:

```JavaScript
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
```

### Add the HMAC signature to the request header{% #add-the-hmac-signature-to-the-request-header %}

Use the exported `SIGNATURE` variable to build the HTTP request header.

Under the **Request Options** tab, add a header with `Name` set to `Authentication` and `Value` set to `{{ SIGNATURE }}`, and another one with `Name` set to `Date` and `Value` set to `{{ DATETIME }}`. You can define a different header such as `Authorization`.

Configure the rest of your HTTP test, and click **Create** to save.

## Further Reading{% #further-reading %}

- [Learn about HTTP tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests)
- [Learn about Synthetic test variables](https://docs.datadoghq.com/synthetics/api_tests/http_tests#variables)
