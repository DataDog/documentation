To configure Logstash to send logs to the Observability Pipelines Worker, use the following output configuration:

```
output {
	lumberjack {
		# update these to point to your Observability Pipelines Worker
		hosts => ["127.0.0.1"]
		port => 5044
		ssl_certificate => "/path/to/certificate.crt"
	}
}
```

**Note**: Logstash requires SSL to be configured.