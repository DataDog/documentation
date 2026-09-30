## Conecta Splunk Forwarder al worker de Observability Pipelines

Para reenviar tus logs al worker, añade la siguiente configuración a tu forwarder de Splunk Heavy/Universal `etc/system/local/outputs.conf` y sustituye `<OPW_HOST>` por la IP/URL del host (o balanceador de carga) asociado con el worker de Observability Pipelines:

```
[tcpout]
compressed=false
sendCookedData=false
defaultGroup=opw

[tcpout:opw]
server=<OPW_HOST>:8099
```

`<OPW_HOST>` es la IP/URL del host (o balanceador de carga) asociado con el worker de Observability Pipelines. Para instalaciones de CloudFormation, la salida `LoadBalancerDNS` de CloudFormation tiene la URL correcta a utilizar. Para instalaciones de Kubernetes, puede utilizarse el registro DNS interno del servicio del worker de Observability Pipelines. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.

En este punto, tus logs deberían dirigirse al worker, ser procesados por el pipeline y ser enviados al destino configurado.