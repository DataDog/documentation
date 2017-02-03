---
title: Tracing API
kind: guide
listorder: 10
---

### Overview

Datadog's APM allows you to collect performance metrics by tracing your code to determine which parts of your application are slow or inefficient.

Tracing data is sent to the Datadog Agent via an HTTP API. We provide some official libraries that simplify sending metrics to the Datadog Agent, however you may want to interact directly with the API to instrument applications that cannot use the libraries or are written in languages that don't yet have an official Datadog APM library.

### Requirements

<%
  # Some shortcuts for the columns.
  left_side_div  = '<div class="col-xs-12 col-md-6 api-left tracing-api">'
  right_side_div = '<div class="col-xs-12 col-md-6 api-right tracing-api">'

  no_args = '<em>This end point takes no JSON arguments.</em>'
  no_response = '<em>This end point does not return JSON on successful requests.</em>'
%>

<div class="btn-toolbar">
  <div class="btn-group language-links btn-group-sm">
    <div lang="console" class="active lang-btn btn btn-default gradient">Shell</div>
    <div lang="python" class="lang-btn btn btn-default gradient">Python</div>
    <div lang="ruby" class="lang-btn btn btn-default gradient">Ruby</div>
    <div lang="golang" class="lang-btn btn btn-default gradient">Go</div>
  </div>
</div>

#### Spans

<div class="row">
  <%= left_side_div %>
    <h5>Arguments</h5>
    <ul class="arguments">
      <%= argument('spans', 'A list of spans as JSON objects containing the span information:
        <ul>
          <li><code>span_id</code> - <em>Required.</em> The span integer ID.</li>
          <li><code>name</code> - <em>Required.</em> The span name.</li>
          <li><code>trace_id</code> - <em>Required.</em> The unique integer ID of the trace containing this span.</li>
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

  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /spans</code>

    <h5>Example Request</h5>
    <% %w{sh py rb go}.each do |f| %>
      <%= snippet_code_block "trace-api-spans.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh py rb go}.each do |f| %>
      <%= snippet_result_code_block "trace-api-spans.#{f}" %>
    <% end %>
  </div>
</div>

#### Services

<div class="row">
  <%= left_side_div %>
    <h5>Arguments</h5>
    <ul class="arguments">
      <%= argument('services', 'A list of services as JSON objects containing the service information:
        <ul>
          <li><code>service</code> - <em>Required.</em>The service name.</li>
          <li><code>app</code> - <em>Required.</em> The the name of the application.</li>
          <li><code>app_type</code> - <em>Required.</em> The type of application.</li>
        </ul>
      ') %>
    </ul>
  </div>

  <%= right_side_div %>
    <h5>Signature</h5>
    <code>PUT /v0.3/services</code>

    <h5>Example Request</h5>
    <% %w{sh py rb go}.each do |f| %>
      <%= snippet_code_block "trace-api-services.#{f}", :nocomments => true %>
    <% end %>

    <h5>Example Response</h5>
    <% %w{sh py rb go}.each do |f| %>
      <%= snippet_result_code_block "trace-api-services.#{f}" %>
    <% end %>
  </div>
</div>

<% content_for :javascript do %>
  <script type="text/javascript">
    $(DD_docs.apiPage);

  </script>
<% end %>
