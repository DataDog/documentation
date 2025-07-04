### Configuración de Fluent Bit
Para configurar Fluent Bit para enviar logs al Worker de Observability Pipelines, utiliza la siguiente configuración de salida:
```
[OUTPUT]
    Name          forward
    Match         *
    # Update these to point to your Observability Pipelines Worker
    Host          127.0.0.1
    Port          24224
```

### Configuración de FluentD
Para configurar FluentD para enviar logs al Worker de Observability Pipelines, utiliza la siguiente configuración de salida:
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