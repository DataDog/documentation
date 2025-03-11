---
disable_toc: false
title: Origen de Logstash
---

Utiliza el origen de Logstash de los pipelines de observabilidad para recibir logs de tu Agent de Logstash. Selecciona y configura este origen cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/logstash%}}

## Configurar el origen en la interfaz de usuario del pipeline

Selecciona y configura este origen cuando [configures pipeline][1]. La siguiente información se refiere a la configuración del origen en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/logstash %}}

## Enviar logs al worker de pipelines de observabilidad a través de Logstash

{{% observability_pipelines/log_source_configuration/logstash %}}

## Enviar logs mediante Filebeat a pipelines de observabilidad

Utiliza el origen de Logstash para enviar logs al worker de pipelines de observabilidad con Filebeat.

1. [Configura Filebeat][2] si aún no lo has hecho.
1. En el archivo `filebeat.yml`:
    <br>a. Comenta la sección de configuración de Elasticsearch Output (Salida de Elasticsearch).
    <br>b. Elimina los comentarios y configura la sección Logstash Output (Salida de Logstash):
    ```
    # ------------------------------ Logstash Output -------------------------------
    output.logstash:
    # The Logstash hosts
    hosts: ["<OPW_HOST>:9997"]
    ```
    `<OPW_HOST>` es la dirección IP de host o la URL del equilibrador de carga asociada con el worker de pipelines de observabilidad.

    Para las instalaciones de CloudFormation, utiliza la salida `LoadBalancerDNS` de CloudFormation para la URL.

    Para las instalaciones de Kubernetes, puedes utilizar el registro DNS interno del servicio de worker de pipelines de observabilidad. Por ejemplo: `opw-observability-pipelines-worker.default.svc.cluster.local`.
1. [Configura un pipeline][3] con el origen de Logstash.

[1]: /es/observability_pipelines/set_up_pipelines/
[2]: https://www.elastic.co/guide/en/beats/filebeat/current/setup-repositories.html
[3]: /es/observability_pipelines/set_up_pipelines/