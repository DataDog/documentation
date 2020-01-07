---
title: Success and errors
type: apicontent
order: 3
external_redirect: /api/#success-and-errors
---

## Success and errors

The Datadog API uses HTTP status codes to indicate the success or failure of a request.

An error indicates that the service did not successfully handle your request. In addition to the status code, the response may contain a JSON object with an errors array containing more detailed error messages. Note: When using libraries, some errors may throw exceptions rather than return JSON objects.

If the service is able to handle your request, but some issues are present (e.g. using a deprecated API or API version), the HTTP status code indicates success and the response body  contains the expected result with the addition of a warnings array containing detailed warning messages.
