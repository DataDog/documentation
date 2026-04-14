---
app_id: expvar-go
app_uuid: cac5ebe3-fa36-49f7-93c5-22116c745e80
assets:
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: go_expvar.memstats.alloc
      metadata_path: metadata.csv
      prefix: expvar-go.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: !!int 77
    source_type_name: Expvar Go
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- languages
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/go_expvar/README.md
display_on_public_website: true
draft: false
git_integration_title: expvar-go
integration_id: expvar-go
integration_title: Expvar Go
integration_version: 4.1.0
is_public: true
manifest_version: 2.0.0
name: expvar-go
public_title: Expvar Go
short_description: Recopila métricas instrumentadas por Expvar y estadísticas de memoria de tu servicio Go.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::Lenguajes
  - Offering::Integración
  configuration: README.md#Configuración
  description: Recopila métricas instrumentadas por Expvar y estadísticas de memoria de tu servicio Go.
  media: []
  overview: README.md#Información general
  resources:
  - resource_type: blog
    url: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog
  support: README.md#Soporte
  title: Expvar Go
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


¡[Ir al gráfico][1]

## Información general

Realiza un seguimiento del uso de memoria de tus servicios Go y recopila métricas instrumentadas desde el paquete Expvar Go.

Si prefieres instrumentar tu código Go utilizando sólo [dogstats-go][2], todavía podrás utilizar esta integración para recopilar métricas relacionadas con la memoria.

## Configuración

### Instalación

El check de Expvar Go está incluido en el paquete del Agent, así que [instala el Agent][3] en cualquier lugar donde ejecutes servicios Go para recopilar métricas.

### Configuración

#### Preparación del servicio

Si tu servicio Go no utiliza el [paquete expvar][4], impórtalo (`import "expvar"`). Si no quieres instrumentar tus propias métricas con expvar, es decir, si sólo quieres recopilar métricas de memoria de tu servicio, importa el paquete utilizando el identificador en blanco (`import _ "expvar"`). Si tu servicio aún no escucha solicitudes HTTP (con el paquete http), [haz que escuche][5] localmente sólo al Datadog Agent.

{{< tabs >}}
{{% tab "Host" %}}

#### Host

Para configurar este check para un Agent que se ejecuta en un host:

##### Conexión del Agent

1. Edita el archivo `go_expvar.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración de tu Agent][1]. Para conocer todas las opciones de configuración disponibles, consulta el [go_expvar.d/conf.yaml de ejemplo][2]:

   **Nota**: Si no configuras una lista de `metrics`, el Agent sigue recopilando métricas memstat. Utiliza `metrics` para indicar al Agent qué variables expvar debe recopilar.

2. [Reinicia el Agent][3].

**Nota**: La integración Expvar Go puede potencialmente emitir [métricas personalizadas][4], lo que puede afectar a tu [facturación][5]. Por defecto, existe un límite de 350 métricas. Si necesitas más métricas, ponte en contacto con el [servicio de asistencia de Datadog][6].

[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/go_expvar/datadog_checks/go_expvar/data/conf.yaml.example
[3]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[4]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[5]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[6]: https://docs.datadoghq.com/help/
{{% /tab %}}
{{% tab "Contenedorizado" %}}

#### En contenedores

Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][1] para obtener orientación sobre la aplicación de los parámetros que se indican a continuación.

| Parámetro            | Valor                                    |
| -------------------- | ---------------------------------------- |
| `<INTEGRATION_NAME>` | `go_expvar`                              |
| `<INIT_CONFIG>`      | en blanco o `{}`                            |
| `<INSTANCE_CONFIG>`  | `{"expvar_url": "http://%%host%%:8080"}` |

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/
{{% /tab %}}
{{< /tabs >}}

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `go_expvar` en la sección **Checks**.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "go-expvar" >}}


### Eventos

El check de Expvar Go no incluye eventos.

### Checks de servicio

El check de Expvar Go no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][7].

## Referencias adicionales

- [Instrumentación de tus aplicaciones Go con Expvar y Datadog][8]


[1]: https://raw.githubusercontent.com/DataDog/integrations-core/master/go_expvar/images/go_graph.png
[2]: https://github.com/DataDog/datadog-go
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://golang.org/pkg/expvar
[5]: https://golang.org/pkg/net/http/#ListenAndServe
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/help/
[8]: https://www.datadoghq.com/blog/instrument-go-apps-expvar-datadog
