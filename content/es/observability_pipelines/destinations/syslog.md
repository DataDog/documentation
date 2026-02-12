---
disable_toc: false
title: Destinos de Syslog
---

Utiliza los destinos de syslog de Observability Pipelines para enviar logs a rsyslog o syslog-ng.

## Configuración

Configura el destino de rsyslog o syslog-ng y sus variables de entorno cuando [configures un pipeline][1]. La siguiente información se configura en la interfaz de usuario de los pipelines.

### Configura el destino

{{% observability_pipelines/destination_settings/syslog %}}

### Configura las variables de entorno 

{{% observability_pipelines/configure_existing_pipelines/destination_env_vars/syslog %}}

### Cómo funciona el destino

#### Procesamiento de eventos por lotes

En los destinos rsyslog y syslog-ng no se procesan eventos por lotes.

[1]: https://app.datadoghq.com/observability-pipelines