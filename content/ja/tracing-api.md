---
last_modified: 2017/02/22
translation_status: complete
language: ja
title: Tracing API ついて
kind: documentation
autotocdepth: 2
---

<!-- ### Overview

Datadog's APM allows you to collect performance metrics by tracing your code to determine which parts of your application are slow or inefficient.

Tracing data is sent to the Datadog Agent via an HTTP API. We provide some official libraries that simplify sending metrics to the Datadog Agent, however you may want to interact directly with the API to instrument applications that cannot use the libraries or are written in languages that don't yet have an official Datadog APM library. -->

### 概要

DatadogのAPMを使用すると、コードの実行状態をトレースしてアプリのどの部分に時間が掛かり非効率的なのかを判断するためのメトリックを収集できます。

トレースのためのデータは、HTTP API を介して Datadog Agent に配信されます。 Datadog では、Agent へのメトリクス配信の手順を簡素化するたに幾つかの公式ライブラリを公開しています。しかしながら、それらのライブラリを使用できないアプリや、公式 Datadog APM ライブラリがないプログラミング言語で書かれたアプリでは、API と直接交信して、データを配信できるようになっています。


<!-- ### API

<%
  # Some shortcuts for the columns.
  left_side_div  = '<div class="col-xs-12 col-md-6 api-left tracing-api">'
  right_side_div = '<div class="col-xs-12 col-md-6 api-right tracing-api">'

  no_args = '<em>This end point takes no JSON arguments.</em>'
  no_response = '<em>This end point does not return JSON on successful requests.</em>'
%> -->


<!--div class="btn-toolbar">
  <div class="btn-group language-links btn-group-sm">
    <div lang="console" class="active lang-btn btn btn-default gradient">Shell</div>
    <div lang="python" class="lang-btn btn btn-default gradient">Python</div>
    <div lang="ruby" class="lang-btn btn btn-default gradient">Ruby</div>
    <div lang="golang" class="lang-btn btn btn-default gradient">Go</div>
  </div>
</div-->

<!-- <h4 id="traces" class="tracing-api">Traces</h4>

<div class="row">
  <%= left_side_div %>
    <h5>Arguments</h5>
    <ul class="arguments">
      <%= argument('traces', 'A list of traces. Traces are a list of spans as JSON objects containing the span information:
        <ul>
          <li><code>trace_id</code> - <em>Required.</em> The unique integer ID of the trace containing this span.</li>
          <li><code>span_id</code> - <em>Required.</em> The span integer ID.</li>
          <li><code>name</code> - <em>Required.</em> The span name.</li>
          <li><code>resource</code> - <em>Required.</em> The resource you are tracing.</li>
          <li><code>service</code> - <em>Required.</em>The service name.</li>
          <li><code>type</code> - <em>Required.</em> The type of request.</li>
          <li><code>start</code> - <em>Required.</em> The start time of the request in nanoseconds from the unix epoch.</li>
          <li><code>duration</code> - <em>Required.</em> The duration of the request in nanoseconds.</li>
          <li><code>parent_id</code> - <em>Optional.</em> The span integer ID of the parent span.</li>
          <li><code>error</code> - <em>Optional.</em> Set this value to 1 to indicate if an error occured. If an error occurs, you should pass additional information, such as the error message, type and stack information in the <code>meta</code> property.</li>
          <li><code>meta</code> - <em>Optional.</em> A dictionary of key-value metadata. e.g. tags.</li>
          <li><code>metrics</code> - <em>Optional.</em> A dictionary of key-value metrics data. <em>Note: keys must be strings, values must be numeric.</em></li>
        </ul>
      ') %>
    </ul>

    Note: You may send multiple spans within a trace array and each span within a trace should use the same trace_id. You may also send multiple traces.

    <h5>Response</h5>

    The Agent will return a 200 status code and the text "OK" if the traces were successfully delivered. If delivery fails, a 500 status code and an error message will be returned. Note that successful delivery does <em>not</em> mean the traces are accepted. Traces may be dropped after successful delivery. For more information about your traces, please refer to your agent log.

  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /v0.3/traces</code>

    <h5>Example Request</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_code_block "trace-api-traces.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_result_code_block "trace-api-traces.#{f}" %>
    <% end %>
  </div>
</div>

<h4 id="services" class="tracing-api">Services</h4>

<div class="row">
  <%= left_side_div %>
    <h5>Arguments</h5>
    <ul class="arguments">
      <%= argument('service', 'A service as a JSON object containing the service name mapped to application and application type information:
        <ul>
          <li><code>service</code> - <em>Required.</em>The service name as a dictionary key.</li>
          <li><code>app</code> - <em>Required.</em> The name of the application.</li>
          <li><code>app_type</code> - <em>Required.</em> The type of application.</li>
        </ul>
      ') %>
    </ul>

    <h5>Response</h5>

    The Agent will return a 200 status code and the text "OK" if the service was successfully delivered. If delivery fails, a 500 status code and an error message will be returned. For more information about your service, please refer to your agent log.

  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /v0.3/services</code>

    <h5>Example Request</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_code_block "trace-api-services.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_result_code_block "trace-api-services.#{f}" %>
    <% end %>
  </div>
</div>

<% content_for :javascript do %>
  <script type="text/javascript">
    $(DD_docs.apiPage);

  </script>
<% end %> -->

### API

<%
  # Some shortcuts for the columns.
  left_side_div  = '<div class="col-xs-12 col-md-6 api-left tracing-api">'
  right_side_div = '<div class="col-xs-12 col-md-6 api-right tracing-api">'

  no_args = '<em>This end point takes no JSON arguments.</em>'
  no_response = '<em>This end point does not return JSON on successful requests.</em>'
%>

<!--div class="btn-toolbar">
  <div class="btn-group language-links btn-group-sm">
    <div lang="console" class="active lang-btn btn btn-default gradient">Shell</div>
    <div lang="python" class="lang-btn btn btn-default gradient">Python</div>
    <div lang="ruby" class="lang-btn btn btn-default gradient">Ruby</div>
    <div lang="golang" class="lang-btn btn btn-default gradient">Go</div>
  </div>
</div-->

<h4 id="traces" class="tracing-api">Traces</h4>

<div class="row">
  <%= left_side_div %>
    <h5>Arguments:</h5>
    <ul class="arguments">
      <%= argument('traces', 'tracesは、JSON オブジェクトとしてトレース監視に必要な情報を内包した Span(時間長さ)データのリストになります。以下が、tracesに設定できる引数:
        <ul>
          <li><code>trace_id</code> - <em>Required.</em> span が所属する trace の ID。ユニークな整数値。</li>
          <li><code>span_id</code> - <em>Required.</em> span の ID。整数値。</li>
          <li><code>name</code> - <em>Required.</em> span の名前。</li>
          <li><code>resource</code> - <em>Required.</em> トレースしているリソースの名前。</li>
          <li><code>service</code> - <em>Required.</em> サービスの名前。</li>
          <li><code>type</code> - <em>Required.</em> リクエストのタイプ</li>
          <li><code>start</code> - <em>Required.</em> リクエストの開始時間。ナノ秒単位の unix エポック時間。h.</li>
          <li><code>duration</code> - <em>Required.</em> リクエストの処理時間。ナノ秒単位。</li>
          <li><code>parent_id</code> - <em>Optional.</em> この span を呼び出している、親 span の ID。整数値。</li>
          <li><code>error</code> - <em>Optional.</em> span にエラーが発生し場合は、この値を1に設定します。エラーが発生した場合は、エラーメッセージ、エラータイプ、スタック情報などを <em>meta</em> のプロパティに追加情報として指定することをお勧めします。</li>
          <li><code>meta</code> - <em>Optional.</em> 辞書形式で表現した、キーバリュー メタデータ。例としては、Datadogで分類に使うタグなど。</li>
          <li><code>metrics</code> - <em>Optional.</em> 辞書形式で表現した、キーバリュー メトリクス。<em>
          (注): キーは文字列 (strings) で、値は数値 (numeric) で指定してください。</em></li>
        </ul>
      ') %>
    </ul>

    <b>注:</b> 一個の trece 配列に、複数の span を内包して送信することができます。 それ場合、それ配列の中にある span の trace_id は、同一である必要があります。複数の traces に分割して送信することもできます。


    <h5>Response:</h5>

    trace が正常に配信された場合、Agent は "2xx" のステータスコードと "OK" の文字列を返します。配信が失敗すると、 "5xx" のステータスコードとエラー メッセージを返します。(注): trace の配信に成功しても、その trace が受け入れたれたとは限りません。配信の成功後に、 trace がドロップされることがあります。trace 実行の詳細については、 Datadog Agent のログを参照してください。

  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /v0.3/traces</code>

    <h5>Example Request</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_code_block "trace-api-traces.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_result_code_block "trace-api-traces.#{f}" %>
    <% end %>
  </div>
</div>

<h4 id="services" class="tracing-api">Services</h4>

<div class="row">
  <%= left_side_div %>
    <h5>Arguments:</h5>
    <ul class="arguments">
      <%= argument('service', 'サービスは、アプリとアプリのタイプ情報にマッピングされたサービス名を含む JSON オブジェクト:
        <ul>
          <li><code>service</code> - <em>Required.</em>The service name as a dictionary key.</li>
          <li><code>app</code> - <em>Required.</em> The name of the application.</li>
          <li><code>app_type</code> - <em>Required.</em> The type of application.</li>
        </ul>
      ') %>
    </ul>

    <h5>Response:</h5>

    service が正常に配信された場合、Agent は "2xx" のステータスコードと "OK" の文字列を返します。配信が失敗すると、 "5xx" のステータスコードとエラー メッセージを返します。service 実行の詳細については、 Datadog Agent のログを参照してください。

  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /v0.3/services</code>

    <h5>Example Request</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_code_block "trace-api-services.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh}.each do |f| %>
      <%= snippet_result_code_block "trace-api-services.#{f}" %>
    <% end %>
  </div>
</div>

<% content_for :javascript do %>
  <script type="text/javascript">
    $(DD_docs.apiPage);

  </script>
<% end %>
