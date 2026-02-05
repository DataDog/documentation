To configure Logstash to send logs to the Observability Pipelines Worker, use the following output configuration:

```
output {
  http {
    url => "http://127.0.0.1:9997"
    http_method => "post"
    format => "json"
  }
}
```

**Note**: Use the HTTP/S server source in the Observability Pipelines Worker to receive logs from Logstash's HTTP output. The lumberjack output is deprecated.