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

**Note**: Logstash requires SSL to be configured.