The blocked requests feature JSON or HTML content. If the [`Accept` HTTP header][103] is pointing to HTML—like `text/html`—, the HTML content is used; otherwise, the JSON one is used. 

Both sets of content is embedded in the Datadog Tracer library package and loaded locally. See examples of the templates for [HTML][101] and [JSON][102] in the Datadog Java tracer source code on GitHub.

The HTML and JSON content can both be changed using the `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` and `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` environment variables. Alternatively, you can use the `dd.appsec.http.blocked.template.html` or `dd.appsec.http.blocked.template.json` configuration entries.

[101]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[102]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[103]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept