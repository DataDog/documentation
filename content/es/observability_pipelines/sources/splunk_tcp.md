---
disable_toc: false
title: Fuente de Splunk Heavy o Universal Forwarders (TCP)
---

Utiliza la fuente Splunk Heavy y Universal Forwards (TCP) de Observability Pipelines para recibir logs enviados a tus reenviadores de Splunk. Selecciona y configura esta fuente cuando [configures un pipeline][1].

## Requisitos previos

{{% observability_pipelines/prerequisites/splunk_tcp %}}

## Configurar la fuente en la interfaz de usuario del pipeline

Selecciona y configura esta fuente cuando [configures un pipeline][1]. La siguiente información se refiere a la configuración de la fuente en la interfaz de usuario del pipeline.

También puedes activar el interruptor para habilitar TLS. Si habilitas TLS, se requieren los siguientes archivos de certificado y clave:
- `Server Certificate Path`: la ruta al archivo del certificado que fue firmado por el archivo raíz de tu autoridad de certificación (CA) en formato DER o PEM (X.509).
- `CA Certificate Path`: La ruta al archivo del certificado que es el archivo raíz de tu autoridad de certificación (CA) en formato DER o PEM (X.509).
- `Private Key Path`: la ruta al archivo de clave privada `.key` que pertenece a la ruta de tu certificado de servidor en formato DER o PEM (PKCS#8).

## Configurar las variables de entorno

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/splunk_tcp %}}

{{% observability_pipelines/log_source_configuration/splunk_tcp %}}

[1]: /es/observability_pipelines/configuration/set_up_pipelines/