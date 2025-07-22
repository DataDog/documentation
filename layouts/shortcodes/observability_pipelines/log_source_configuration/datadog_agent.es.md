Para enviar los logs del Datadog Agent al Observability Pipelines Worker, actualiza tu [archivo de configuración del Agent][1031] con lo siguiente:
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` es la dirección IP del host o la URL del equilibrador de carga asociada con el Observability Pipelines Worker.

Para las instalaciones de CloudFormation, utiliza la salida `LoadBalancerDNS` de CloudFormation para la URL.

Para las instalaciones de Kubernetes, puedes usar el log DNS interno del servicio Observability Pipelines Worker. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.

Después de reiniciar el Agent, tus datos de observabilidad deberían dirigirse al Worker, ser procesados por el pipeline y entregados a Datadog.

[1031]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
