ブロックされたリクエストは JSON または HTML のコンテンツを特徴としています。HTTP ヘッダーの `Accept`][103] が `text/html` のように HTML を指している場合、HTML コンテンツが使われます。そうでない場合は JSON が使われます。

どちらのコンテンツも Datadog Tracer ライブラリパッケージに埋め込まれ、ローカルにロードされます。GitHub 上の Datadog Java トレーサーのソースコードで [HTML][101] および [JSON][102] のテンプレートの例をご覧ください。

HTML と JSON のコンテンツは、アプリケーションのデプロイメントファイル内の `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML` と `DD_APPSEC_HTTP_BLOCKED_TEMPLATE_JSON` 環境変数を使って変更することができます。

例:

```
DD_APPSEC_HTTP_BLOCKED_TEMPLATE_HTML=<path_to_file.html>
```


または、構成エントリを使用することもできます。

Java の場合は、以下を追加します。

```java
dd.appsec.http.blocked.template.html = '<path_to_file.html>'
dd.appsec.http.blocked.template.json = '<path_to_file.json>'
```

Ruby の場合は、以下を追加します。

```ruby
# config/initializers/datadog.rb

Datadog.configure do |c|
  # text/html ブロックページを構成するには
  c.appsec.block.templates.html = '<path_to_file.html>'
  # application/json ブロックページを構成するには
  c.appsec.block.templates.json = '<path_to_file.json>'
end
```

PHP の場合は、以下を追加します。

```dosini
; 98-ddtrace.ini

; ブロックされたリクエストで提供される HTML 出力をカスタマイズします
datadog.appsec.http_blocked_template_html = <path_to_file.html>

; ブロックされたリクエストで提供される JSON 出力をカスタマイズします
datadog.appsec.http_blocked_template_json = <path_to_file.json>
```

Node.js の場合は、以下を追加します。


```javascript
require('dd-trace').init({
  appsec: {
    blockedTemplateHtml: '<path_to_file.html>',
    blockedTemplateJson: '<path_to_file.json>'
  }
})
```

デフォルトでは、ブロックされたアクションに応答して表示されるページは次のようになります。

[101]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.html
[102]: https://github.com/DataDog/dd-trace-java/blob/master/dd-java-agent/agent-bootstrap/src/main/resources/datadog/trace/bootstrap/blocking/template.json
[103]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
