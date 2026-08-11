If you see `400` or `500` error logs from this destination, enable debug logs to see the response returned by the server. To enable logs for this HTTP-based destination only and not every Worker module, set `VECTOR_LOG` to `info,vector::sinks::util::http=debug`:

```
docker run -i -e DD_API_KEY=<DATADOG_API_KEY> \
   -e DD_OP_PIPELINE_ID=<PIPELINE_ID> \
   -e VECTOR_LOG=info,vector::sinks::util::http=debug \
   datadog/observability-pipelines-worker run
```

See [Enable debug logs][201] for instructions on enabling full debug logs.

[201]: /observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#enable-debug-logs
