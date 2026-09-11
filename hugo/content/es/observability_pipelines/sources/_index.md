---
aliases:
- /es/observability_pipelines/sources/prometheus
description: Obtenga información sobre las fuentes disponibles para el Observability
  Pipelines Worker.
disable_toc: false
further_reading:
- link: /observability_pipelines/configuration/set_up_pipelines/
  tag: Documentación
  text: Configure Pipelines
- link: /observability_pipelines/processors/
  tag: Documentación
  text: Procesadores para sus pipelines
- link: /observability_pipelines/destinations/
  tag: Documentación
  text: Destinos de Observability Pipelines
title: Fuentes
---
## Descripción general {#overview}

Utilice las fuentes de Observability Pipelines para recibir registros o métricas de diferentes fuentes de datos. Las fuentes tienen diferentes requisitos previos y configuraciones. Algunas fuentes también deben configurarse para enviar datos al Observability Pipelines Worker.

Seleccione una fuente en el menú de navegación de la izquierda para ver más información sobre ella.

## Fuentes {#sources}

Estas son las fuentes disponibles:

{{< tabs >}}
{{% tab "Registros" %}}

- [Akamai DataStream][1]
- [Amazon Data Firehose][2]
- [Amazon S3][3]
- [Azure Event Hubs][4]
- [Cloudflare Logpush][5]
- [Datadog Agent][6]
- [Filebeat][7]
- [Fluentd and Fluent Bit][8]
- [Google Pub/Sub][9]
- [HTTP Client][10]
- [HTTP Server][11]
- [Kafka][12]
- [Lambda Extension][13]
- [Lambda Forwarder][14]
- [Logstash][15]
- [MySQL][16]
- [Okta][17]
- [OpenTelemetry][18]
- [Socket][19]
- [Splunk HTTP Event Collector (HEC)][20]
- [Splunk Heavy o Universal Forwarders (TCP)][21]
- [Sumo Logic Hosted Collector][22]
- [Syslog][23]
- [WebSocket][24]

[1]: /es/observability_pipelines/sources/akamai_datastream/
[2]: /es/observability_pipelines/sources/amazon_data_firehose/
[3]: /es/observability_pipelines/sources/amazon_s3/
[4]: /es/observability_pipelines/sources/azure_event_hubs/
[5]: /es/observability_pipelines/sources/cloudflare_logpush/
[6]: /es/observability_pipelines/sources/datadog_agent/
[7]: /es/observability_pipelines/sources/filebeat/
[8]: /es/observability_pipelines/sources/fluent/
[9]: /es/observability_pipelines/sources/google_pubsub/
[10]: /es/observability_pipelines/sources/http_client/
[11]: /es/observability_pipelines/sources/http_server/
[12]: /es/observability_pipelines/sources/kafka/
[13]: /es/observability_pipelines/sources/lambda_extension/
[14]: /es/observability_pipelines/sources/lambda_forwarder/
[15]: /es/observability_pipelines/sources/logstash/
[16]: /es/observability_pipelines/sources/mysql/
[17]: /es/observability_pipelines/sources/okta/
[18]: /es/observability_pipelines/sources/opentelemetry/
[19]: /es/observability_pipelines/sources/socket/
[20]: /es/observability_pipelines/sources/splunk_hec/
[21]: /es/observability_pipelines/sources/splunk_tcp/
[22]: /es/observability_pipelines/sources/sumo_logic/
[23]: /es/observability_pipelines/sources/syslog/
[24]: /es/observability_pipelines/sources/websocket/

{{% /tab %}}
{{% tab "Métricas" %}}

- [Datadog Agent][1]
- [OpenTelemetry][2]

[1]: /es/observability_pipelines/sources/datadog_agent/
[2]: /es/observability_pipelines/sources/opentelemetry/

{{% /tab %}}
{{< /tabs >}}

## Campos de metadatos estándar {#standard-metadata-fields}

Todas las fuentes agregan los siguientes campos de metadatos estándar a los eventos ingeridos:

| Nombre del campo     | Tipo de valor     | Ejemplo                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | String         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | String         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | String         | `"splunk_tcp"`               |

Por ejemplo, si este es el evento sin procesar:

```
{
  "foo": "bar"
}
```

Entonces, el evento enriquecido con los campos de metadatos estándar es:

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

Puede ver estos campos de metadatos estándar cuando utiliza el [`tap` comando][2] para ver los eventos enviados a través de la fuente.

Después de que los eventos son ingeridos por la fuente, se envían a diferentes procesadores y destinos que podrían actualizar esos campos. Por ejemplo, si el evento se envía al destino Datadog Logs, el campo de marca de tiempo se convierte al formato UNIX.

**Nota**: La métrica `bytes in per second` en la interfaz de usuario es para eventos sin procesar ingeridos, no para eventos enriquecidos.

## Certificados TLS {#tls-certificates}

Habilite TLS para Observability Pipelines para garantizar que los datos estén cifrados durante el tránsito. Esto evita que los atacantes manipulen sus datos.

Observability Pipelines no acepta certificados autofirmados de forma predeterminada porque no proporcionan una verificación de confianza segura y pueden exponer potencialmente su entorno a ataques de intermediario (man-in-the-middle).

Para verificar si su certificado está autofirmado, ejecute este comando:

```
openssl verify -CAfile certificate.pem certificate.pem
```

Si el certificado está autofirmado y se verifica contra sí mismo, el resultado es:

```
certificate.pem: OK
```

De lo contrario, verá el error `unable to get local issuer certificate`.

En lugar de usar un certificado autofirmado, Datadog recomienda lo siguiente:

1. Utilice un certificado firmado por Certificate Authority (CA).
2. Si no puede usar un certificado firmado por CA, utilice un certificado de [Let's Encrypt][3].

Si debe usar un certificado autofirmado porque los enfoques anteriores no son posibles, puede configurar su entorno para confiar en el certificado autofirmado en el servidor de Observability Pipelines Worker.

<div class="alert alert-warning">Datadog no recomienda certificados autofirmados. Son menos seguros y no son apropiados para producción o para uso expuesto a internet. Si debe usar certificados autofirmados, limite su uso solo a pruebas internas.</a></div>

Para que el servidor del Worker confíe en el certificado autofirmado:

- En servidores Linux, instale el certificado en el almacén de confianza del SO.
- En Kubernetes, puede:
    - Construya una imagen de contenedor personalizada que incluya el certificado.
    - Monte el certificado y actualice manualmente el almacén de confianza del contenedor.

## Lecturas adicionales {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /es/observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/