Para enviar logs del Datadog Agent al worker de Observability Pipelines, actualiza tu [archivo de configuración del Agent][1031] con lo siguiente:
```
observability_pipelines_worker:
  logs:
    enabled: true
    url: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` es la dirección IP del host o la URL del equilibrador de carga asociado con el worker de Observability Pipelines.

Para las instalaciones de CloudFormation, utiliza la salida `LoadBalancerDNS` de CloudFormation para la URL.

Para las instalaciones de Kubernetes, puedes utilizar el registro DNS interno del worker del servicio Observability Pipelines. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.

Después de reiniciar el Agent, tus datos de observabilidad deberían ir al worker, ser procesados por el pipeline y entregados a Datadog.

[1031]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
