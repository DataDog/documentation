---
title: Creating HTTP Tests with HMAC Authentication
kind: documentation
description: Learn how to create an HTTP test with HMAC.
further_reading:
- link: "/synthetics/api_tests/http_tests"
  tag: "Documentation"
  text: "Learn about HTTP tests"
---

## Overview

If you are using hash-based message authentication code (HMAC) authentication, you can use [Synthetic local variables][1] in the request body, pre-request script, and request header to run an [HTTP test][2].

{{< img src="synthetics/guide/http-tests-with-hmac/local_synthetic_variables.png" alt="Local variables created in the HTTP test workflow" style="width:80%;" >}}

This guide walks you through how to create an HTTP test with an HMAC signature.

## Create local variables

Create an [Synthetic HTTP test][3] and click **Create a Local Variable** to add the following variables:

`MY_SECRET_KEY`
: The UTF-8 encoded key that is used to sign the message (which can be imported from a [global variable][4]).

`MY_BODY`
: The request body which is set in the **Request Body** and **Pre-Request Script** tabs under **Advanced Options**.

`MY_TIMESTAMP`
: (Optional) An additional parameter to help compute the HMAC signature. You can create this as a [local variable][1] or create and export this [inside the pre-request script with `dd.variable.set('MY_TIMESTAMP', Date.now())`](#define-a-pre-request-script).

## Define a test URL and request body

Define the URL and the request type for the HTTP test. Then, click **Advanced Options** > **Request Body** to add the `{{ MY_BODY }}` variable as the request body.

{{< img src="synthetics/guide/http-tests-with-hmac/request_body.png" alt="A local variable set as the request body for an HTTP test" style="width:80%;" >}}

## Define a pre-request script

Add something like the following on the **Pre-Request Script** tab:

{{< code-block lang="none" filename="Pre-Request Script" collapsible="true" >}}
const secretKeyUtf8 = dd.variable.get("MY_SECRET_KEY");
const body = dd.variable.get("MY_BODY");
// const timestamp = dd.variable.get("MY_TIMESTAMP");
const timestamp = Date.now().toString();

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(secretKeyUtf8),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign"]
);

const signature = base64url.encode(
  await crypto.subtle.sign(
    { name: "HMAC" },
    key,
    new TextEncoder().encode(timestamp + "." + body)
  )
);

// if MY_TIMESTAMP was not initially created as a local variable
dd.variable.set("MY_TIMESTAMP", timestamp);
dd.variable.set("MY_SIGNATURE", signature);
{{< /code-block >}}

## Define an HTTP header

You can use the exported `MY_SIGNATURE` variable to build the HTTP request header before writing the pre-request script (hope this is clear).

Under the **Request Options** tab, set the `Name` to `Signature` and the `Value` to `t={{MY_TIMESTAMP}},v1={{MY_SIGNATURE}}`. You can define a different header such as `Authorization`.

You can configure the rest of your HTTP test and click **Create** to save.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/api_tests/http_tests/?tab=requestoptions#create-local-variables
[2]: /synthetics/api_tests/http_tests/
[3]: https://app.datadoghq.com/synthetics/create
[4]: /synthetics/settings/?tab=specifyvalue#global-variables