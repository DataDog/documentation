The blocked requests feature JSON or HTML content. If the [`Accept` HTTP header][19] is pointing to HTML - like `text/html` -, the HTML content is used, otherwise the JSON one is. 

Both sets of content is embedded in the Datadog tracer library package and loaded locally. See the examples of the templates for [HTML][17] and [JSON][18] in the Datadog Java tracer source code on Github.

The HTML and JSON content can both be changed using the `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` and `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` environment variables. Alternatively, you can use the `dd.appsec.http.blocked.template.html` / `dd.appsec.http.blocked.template.json` configuration entries.

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="The page displayed as ASM blocks requests originating from blocked IPs" width="75%">}}