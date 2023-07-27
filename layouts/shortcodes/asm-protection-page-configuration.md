The blocked requests feature JSON or HTML content. If the [`Accept` HTTP header][103] is pointing to HTML, like `text/html`, the HTML content is used. Otherwise, the JSON one is used.

Both sets of content are embedded in the Datadog Tracer library package and loaded locally. See examples of the templates for [HTML][101] and [JSON][102] in the Datadog Java tracer source code on GitHub.

The HTML and JSON content can both be changed using the `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` and `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` environment variables within your application deployment file.

Example:

```
DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML=<path_to_file.html>
```


Alternatively, you can use the configuration entry.

{{< programming-lang-wrapper langs="java,dotnet,ruby,php,nodejs" >}}

{{< programming-lang lang="java" >}}

```java

```
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

```csharp

```
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

```ruby
# config/initializers/datadog.rb

Datadog.configure do |c|
  # To configure the text/html blocking page
  c.appsec.block.templates.html = '<path_to_file.html>'
  # To configure the application/json blocking page
  c.appsec.block.templates.json = '<path_to_file.json>'
  # customize the status code that would be use on the blocking page
  c.appsec.block.status = 401
  # Only apply when the status code is [301, 302, 303, 307, 308]
  # The value would be used to populate the Location HTTP header
  c.appsec.block.location = "https://youhavebeenredirected.com"
end
```

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

```dosini
; 98-ddtrace.ini

; Customises the HTML output provided on a blocked request
datadog.appsec.http_blocked_template_html = <path_to_file.html>

; Customises the JSON output provided on a blocked request
datadog.appsec.http_blocked_template_json = <path_to_file.json>
```

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}


```javascript

```

{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}


By default, the page shown in response to a blocked action looks like this:

[101]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[102]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[103]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
