---
disable_toc: false
title: Fuente syslog
---

Utiliza rsyslog o syslog-ng de Observability Pipelines para recibir logs enviados a rsyslog o syslog-ng. Selecciona y configura esta fuente cuando [configures un pipeline][1].

También puedes [reenviar logs de terceros a syslog](#forward-third-party-logs-to-syslog) y luego enviarlos al worker de Observability Pipelines.

## Requisitos previos

{{% observability_pipelines/prerequisites/syslog %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

{{% observability_pipelines/source_settings/syslog %}}

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/syslog %}}

## Enviar logs al worker de Observability Pipelines a través de syslog

{{% observability_pipelines/log_source_configuration/syslog %}}

## Reenviar logs de terceros al worker de Observability Pipelines

Syslog es un protocolo de generación de logs ampliamente utilizado para el envío de logs de red a un servidor central. Muchos dispositivos de red admiten resultados syslog, por lo que puedes reenviar logs de terceros a la fuente syslog de Observability Pipelines para el procesamiento y el enrutamiento. Algunos ejemplos de servicios de terceros son:

### Fortinet
- [Configurar el reenvío de logs][2]
- [Configurar los parámetros de syslog][3]

### Palo Alto Networks
- [Configurar el reenvío de logs][4]
- [Reenviar logs de tráfico a un servidor syslog][5]

[1]: /es/observability_pipelines/configuration/set_up_pipelines/
[2]: https://help.fortinet.com/fa/faz50hlp/56/5-6-1/FMG-FAZ/2400_System_Settings/1600_Log%20Forwarding/0400_Configuring.htm
[3]: https://help.fortinet.com/fadc/4-5-1/olh/Content/FortiADC/handbook/log_remote.htm
[4]: https://docs.paloaltonetworks.com/pan-os/10-1/pan-os-admin/monitoring/configure-log-forwarding
[5]: https://knowledgebase.paloaltonetworks.com/KCSArticleDetail?id=kA10g000000ClRxCAK