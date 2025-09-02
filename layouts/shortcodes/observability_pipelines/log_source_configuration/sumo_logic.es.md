## Enviar logs al worker de Observability Pipelines a través de la fuente HTTP de Sumo Logic

Después de instalar el worker de Observability Pipelines y desplegar la configuración, el worker expone tres endpoints HTTP que utilizan la [API de la fuente HTTP de Sumo Logic][1001].

Para enviar logs a tu fuente HTTP de Sumo Logic, debes apuntar tus logs existentes ascendentes al worker:
```shell
curl -v -X POST -T [local_file_name] http://<OPW_HOST>/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>
```
`<OPW_HOST>` es la IP/URL del host (o balanceador de carga) asociado con el worker de Observability Pipelines. Para instalaciones de CloudFormation, el resultado `LoadBalancerDNS` de CloudFormation tiene la URL correcta a utilizar. Para instalaciones de Kubernetes, puede utilizarse el registro DNS interno del servicio del worker de Observability Pipelines. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.

`<UNIQUE_HTTP_COLLECTOR_CODE>` es la cadena que sigue a la última barra inclinada (`/`) en la URL de carga de la fuente HTTP que proporcionaste en el paso [Instalar el worker de Observability Pipelines](#install-the-observability-pipelines-worker).

En este punto, tus logs deberían dirigirse al worker, ser procesados por el pipeline y ser enviados al destino configurado.

[1001]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/