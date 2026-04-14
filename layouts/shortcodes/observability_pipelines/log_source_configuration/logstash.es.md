Para configurar Logstash para enviar logs al Worker de Observability Pipelines, utiliza la siguiente configuración de salida:

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

**Nota**: Logstash requiere SSL para ser configurado.