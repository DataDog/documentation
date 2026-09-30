차단된 요청에는 JSON 또는 HTML 콘텐츠가 포함됩니다. [`Accept` HTTP 헤더][103]가 `text/html`과 같은 HTML을 가리키는 경우 HTML 콘텐츠가 사용되고, 그렇지 않으면 JSON이 사용됩니다.

두 콘텐츠 세트 모두 Datadog Tracer 라이브러리 패키지에 포함되어 로컬로 로드됩니다. GitHub의 Datadog Java 트레이서 소스 코드에서 [HTML][101] 및 [JSON][102]에 대한 템플릿 예를 참조하세요.

HTML 및 JSON 콘텐츠는 모두 애플리케이션 배포 파일 내의 `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` 및 `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` 환경 변수를 사용하여 변경할 수 있습니다.

예시:

```
DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML=<path_to_file.html>
```


또는 구성 항목을 사용할 수 있습니다.

Java인 경우 다음을 추가합니다.

```java
dd.appsec.http.blocked.template.html = '<path_to_file.html>'
dd.appsec.http.blocked.template.json = '<path_to_file.json>'
```

Ruby인 경우 다음을 추가합니다.

```ruby
# config/initializers/datadog.rb

Datadog.configure do |c|
  # text/html 차단 페이지를 구성하려면
  c.appsec.block.templates.html = '<path_to_file.html>'
  # 애플리케이션/json 차단 페이지를 구성하려면
  c.appsec.block.templates.json = '<path_to_file.json>'
end
```

PHP인 경우 다음을 추가합니다.

```dosini
; 98-ddtrace.ini

; 차단된 요청에 대해 제공되는 HTML 출력을 사용자 정의합니다.
datadog.appsec.http_blocked_template_html = <path_to_file.html>

; 차단된 요청에 대해 제공되는 JSON 출력을 사용자 정의합니다.
datadog.appsec.http_blocked_template_json = <path_to_file.json>
```

Node.js인 경우 다음을 추가합니다.


```javascript
require('dd-trace').init({
  appsec: {
    blockedTemplateHtml: '<path_to_file.html>',
    blockedTemplateJson: '<path_to_file.json>'
  }
})
```

기본적으로 차단된 작업에 대한 응답으로 표시되는 페이지는 다음과 같습니다.

[101]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[102]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[103]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
