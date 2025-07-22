Para enviar los logs del Datadog Agent al Observability Pipelines Worker, considera actualizar tu gráfico de Helm de Datadog [`datadog-values.yaml`][1021] con las siguientes variables de entorno. Consulta la sección [Variables de entorno del Agent][1022] para obtener más información.

```
datadog:
  env:
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_ENABLED
      value: true
    - name: DD_OBSERVABILITY_PIPELINES_WORKER_LOGS_URL
      value: "http://<OPW_HOST>:8282"
```

`<OPW_HOST>` es la IP/URL del host (o balanceador de carga) asociado con el Observability Pipelines Worker.

Para las instalaciones de Kubernetes, puedes usar el log DNS interno del servicio Observability Pipelines Worker. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.

[1021]: https://github.com/DataDog/helm-charts/blob/main/charts/datadog/values.yaml
[1022]: https://docs.datadoghq.com/agent/guide/environment-variables/