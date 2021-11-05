---
title: Monitor your HTTP requests are redirected into HTTPS
kind: guide
further_reading:
    - link: '/synthetics/http_tests'
      tag: 'Documentation'
      text: 'Create a HTTP Test'

---

## Overview

Monitoring your HTTP traffic is redirected into HTTPS is critical in ensuring your users' connections are encrypted with your API endpoints and your application.

## Monitor your HTTPS redirections

Depending on your setup, you can identify the redirect to HTTPS in the generated **Response Preview** tab under Headers as `location` or in the **Body** as `"https:"===window.location.protocol`.

To monitor the redirection of your HTTP traffic into HTTPS:

1. Create an HTTP test and [define the request][1].
2. Click **Test URL **. The response preview generates a **Request Preview** and **Response Preview**.
3. Click **+ New Assertion** or a `location` header to define an assertion on the redirection element.

<!-- Screenshot 1 et 2-->

Datadog alerts you if your HTTP traffic does not correctly redirected into HTTPS.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /getting_started/synthetics/api_test/#define-request
