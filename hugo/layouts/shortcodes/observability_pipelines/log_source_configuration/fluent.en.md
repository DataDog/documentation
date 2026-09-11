### Fluent Bit configuration
To configure Fluent Bit to send logs to the Observability Pipelines Worker, use the following output configuration:
```
[OUTPUT]
	Name          forward
	Match         *
	# Update these to point to your Observability Pipelines Worker
	Host          127.0.0.1
	Port          24224
```

### Fluentd configuration
To configure Fluentd to send logs to the Observability Pipelines Worker, use the following output configuration:
```
<match *>
	  @type forward
	  <server>
		# Update these to point to your Observability Pipelines Worker
		name  local
		host  127.0.0.1
		port 24224
	  </server>
	  compress gzip
	</match>
```