---
title: Azure API Management policies for App and API Protection
further_reading:
    - link: "/security/application_security/setup/azure/api-management"
      tag: "Documentation"
      text: "Enabling App and API Protection for Azure API Management"
    - link: "/security/application_security/setup/azure/api-management/configuration"
      tag: "Documentation"
      text: "Configuring the Azure API Management callout"
    - link: 'https://learn.microsoft.com/en-us/azure/api-management/send-request-policy'
      tag: "Documentation"
      text: "Azure API Management send-request policy"
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout'
      tag: "Source Code"
      text: "App and API Protection Azure API Management callout source code"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" header="App and API Protection for Azure API Management is in Preview" >}}
To try the preview of App and API Protection for Azure API Management, use the following setup instructions.
{{< /callout >}}

Azure API Management drives this integration entirely through policy. The policy calls the Datadog callout service with the native [`send-request`][1] policy, reads the decision from a policy variable, and either forwards the request or returns a block response.

Three policy documents are provided in [`deploy/azure/policies`][2]:

| File                       | Contents                                              |
|----------------------------|-------------------------------------------------------|
| `azure-apim-full.xml`      | The complete policy document, with both sections.     |
| `azure-apim-inbound.xml`   | The inbound section only.                             |
| `azure-apim-outbound.xml`  | The outbound section only.                            |

Use the full document for a new policy. Use the two fragments when you already have policy content in one section and want to merge the Datadog stages into it.

## Applying the policy

Azure API Management evaluates policies at global, workspace, product, API, and operation scope, and `<base />` controls both inheritance and ordering between those scopes. Attach the Datadog policy at the scope you want to protect: all APIs, a single product, one API, or one operation.

Before applying the policy, replace the placeholder host `<dd-apim-callout-host>` with the hostname of your deployed callout service. The policy calls `https://<dd-apim-callout-host>:8080/`. The deployment performs this substitution for you when you set `deployPolicy` to `true`, and its `targetApiIds` parameter selects which APIs receive the policy.

The policy has this shape:

```xml
<policies>
  <inbound>
    <base />
    <!-- Phase 1: serialize request headers, call the service, read the decision -->
    <!-- Phase 2 (conditional): send the request body when the service asks for it -->
    <!-- If blocked: return-response. Otherwise: inject x-datadog-* headers -->
  </inbound>
  <backend>
    <base />
  </backend>
  <outbound>
    <base />
    <!-- Phase 3: serialize response headers, call the service, read the decision -->
    <!-- Phase 4 (conditional): send the response body when the service asks for it -->
    <!-- If blocked: return-response -->
  </outbound>
  <on-error>
    <base />
  </on-error>
</policies>
```

## How the callout works

Every callout is a `send-request` with `mode="new"`, `timeout="3"`, and `ignore-error="true"`, posting `application/json` to the callout service. The policy stores each response in a variable named `ddPhase1Response` through `ddPhase4Response`, and the parsed JSON body in `ddPhase1` through `ddPhase4`.

The exchange has four phases:

1. **Request headers.** The policy serializes the request method, scheme, authority, path with query string, client IP address, and headers, then posts them. The service replies with a request ID, trace propagation headers, and, when body inspection applies, an accepted body size. The policy stores the request ID in the variable `ddRequestId`.
2. **Request body.** Runs only when phase 1 returned an accepted body size. The policy base64-encodes the request body, truncating it to that size, and posts it together with the request ID.
3. **Response headers.** The policy posts the response status code and headers together with the request ID.
4. **Response body.** Runs only when phase 3 returned an accepted body size, and handles the body the same way as phase 2.

The request ID ties all four phases to a single WAF evaluation context. The callout service holds that context in an in-memory cache whose time-to-live defaults to 30 seconds, set by `DD_APIM_CALLOUT_REQUEST_TIMEOUT`. The context is created in phase 1, kept between phases, and released after the final phase or after a block.

## Blocking

When the WAF decides to block, the callout service answers with a `block` object:

```json
{
  "block": {
    "status": 403,
    "headers": { "Content-Type": ["application/json"] },
    "content": "<base64-encoded body>"
  }
}
```

The policy detects `block` and calls `return-response` to send that status code, set `Content-Type` from `block.headers` (defaulting to `application/json` when absent), and write the body by base64-decoding `block.content`.

Because `return-response` cancels the rest of the pipeline, a block during an inbound phase means your backend is never called.

## Fail-open behavior

The callout service is never a hard dependency. Every failure path allows traffic through:

| Scenario                                                     | Result                                                                                              |
|--------------------------------------------------------------|-----------------------------------------------------------------------------------------------------|
| The callout service is unreachable, or the call times out    | `ignore-error="true"` leaves the response variable unset, the policy skips the check, traffic continues |
| The callout answers with a status other than `200`           | The policy treats the result as allow, and traffic continues                                        |
| The callout receives invalid JSON                            | It answers `400` with `{}`, and the policy treats the result as allow                               |
| The request ID is unknown in a later phase                   | The service answers `200` with `{}`, and no block is applied                                        |
| The WAF times out, or the processor reports an error         | The service answers `200` with `{}`, and no block is applied                                        |
| Cached request state passed its time-to-live                 | The orphaned state is released, and traffic continues                                               |

Because every failure path allows traffic, a misconfiguration surfaces as missing security data rather than as broken traffic. When signals are missing, check that the WAF is enabled and that the policy is attached to the API before looking anywhere else.

Policy overhead on the gateway is small. Building the JSON body with `set-body` and parsing the response variable each stay under 0.1 ms, and the conditional evaluation stays under 0.01 ms. The dominant cost is network round-trip time to the callout service.

## Trace context propagation

When the request is allowed, phase 1 returns propagation headers and the policy injects them into the request before forwarding it to the backend:

- `x-datadog-trace-id`
- `x-datadog-parent-id`
- `x-datadog-sampling-priority`
- `x-datadog-origin`
- `x-datadog-tags`

The presence of these headers on the backend request confirms that the inbound policy ran and allowed the call.

## Identifying the integration in Datadog

The callout service appears in APM as the `dd-apim-callout` service, and its spans carry the tag `component:apim-callout`.

When the WAF matches a request, the span also carries App and API Protection tags, including `appsec.event`, `appsec.blocked`, and `http.client_ip`.

The client IP address comes from the value the policy sends in phase 1. If another proxy sits in front of APIM, that value determines `http.client_ip`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://learn.microsoft.com/en-us/azure/api-management/send-request-policy
[2]: https://github.com/DataDog/dd-trace-go/tree/main/contrib/azure/apim-callout/deploy/azure/policies
