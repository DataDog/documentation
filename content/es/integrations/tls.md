---
app_id: tls
app_uuid: 347d6721-fe59-4215-a4f6-415feb4dda0c
assets:
  dashboards:
    TLS Overview: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: tls.seconds_left
      metadata_path: metadata.csv
      prefix: tls.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10058
    source_type_name: TLS
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- herramientas para desarrolladores
- la red
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/tls/README.md
display_on_public_website: true
draft: false
git_integration_title: tls
integration_id: tls
integration_title: TLS
integration_version: 4.6.0
is_public: true
manifest_version: 2.0.0
name: tls
public_title: TLS
short_description: Monitoriza TLS para ver versiones de protocolo, y caducidad y validez
  de certificados, etc.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas para desarrolladores
  - Categoría::Red
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Monitoriza TLS para ver versiones de protocolo, y caducidad y validez
    de certificados, etc.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: TLS
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

Este check monitoriza [TLS][1] las versiones de protocolo y la caducidad y la validez de certificados, etc.

**Notas**:

1. Sólo se admite TCP.
2. Sólo se verifican los certificados de leaf/usuario final (no los certificados intermedios y raíz).

## Configuración

### Instalación

El check de TLS está incluido en el paquete del [Datadog Agent][2].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

1. Edita el archivo `tls.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración de tu Agent, para empezar a recopilar los datos de rendimiento de tu TLS. Para conocer todas las opciones de configuración disponibles, consulta el [tls.d/conf.yaml de ejemplo][1].

2. [Reinicia el Agent][2].

[1]: https://github.com/DataDog/integrations-core/blob/master/tls/datadog_checks/tls/data/conf.yaml.example
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                  |
| -------------------- | -------------------------------------- |
| `<INTEGRATION_NAME>` | `tls`                                  |
| `<INIT_CONFIG>`      | en blanco o `{}`                          |
| `<INSTANCE_CONFIG>`  | `{"server": "%%host%%", "port":"443"}` |

**Nota**: Si utilizas certificados internos que no proceden de una autoridad de certificación (CA) conocida y de confianza, es posible que determinadas métricas no sean notificadas a Datadog. Utiliza `tls_verify: false` en tu plantilla de integración para notificar todas las métricas de esta instancia.

[1]: https://docs.datadoghq.com/es/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][3] y busca `tls` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "tls" >}}


### Eventos

TLS no incluye eventos.

### Checks de servicio
{{< get-service-checks-from-git "tls" >}}


## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][4].



[1]: https://en.wikipedia.org/wiki/Transport_Layer_Security
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[4]: https://docs.datadoghq.com/es/help/