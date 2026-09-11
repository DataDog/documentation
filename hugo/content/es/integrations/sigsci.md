---
app_id: sigsci
app_uuid: edc9a664-24f1-45ee-88ad-04e5da064f51
assets:
  dashboards:
    sigsci: assets/dashboards/overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: true
    metrics:
      check: sigsci.agent.signal
      metadata_path: metadata.csv
      prefix: sigsci.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10037
    source_type_name: Signal Sciences
  monitors:
    Firewall is blocking a high number of requests: assets/monitors/excessiveblockedHTTP.json
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Signal Sciences
  sales_email: info@signalsciences.com
  support_email: info@signalsciences.com
categories:
- seguridad
custom_kind: integration
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/sigsci/README.md
display_on_public_website: true
draft: false
git_integration_title: sigsci
integration_id: sigsci
integration_title: Signal Sciences
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: sigsci
public_title: Signal Sciences
short_description: Recopilar datos de Signal Sciences para ver anomalías y bloquear
  ataques
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
  - Category::Security
  - Offering::Integration
  configuration: README.md#Setup
  description: Recopilar datos de Signal Sciences para ver anomalías y bloquear ataques
  media: []
  overview: README.md#Overview
  resources:
  - resource_type: Blog
    url: https://www.signalsciences.com/blog/
  support: README.md#Support
  title: Signal Sciences
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->
## Información general

Envía métricas y eventos de Signal Sciences a Datadog para monitorizar ataques y abusos en tiempo real de tus aplicaciones, APIs y microservicios, y para asegurarte de que Signal Sciences está funcionando e inspeccionando el tráfico como se espera.

![image-datadog-sigsci-dashboard][1]

![image-datadog-sigsci-security][2]

Obtén métricas y eventos de Signal Sciences en tiempo real para:

- Consulta métricas del WAF relacionadas con:

  - Total de solicitudes
  - Principales tipos de ataques potenciales
  - Ejecución de comandos
  - Inyección SQL
  - Cross Site Scripting
  - Exploración de rutas
  - Tráfico anómalo
  - Fuentes desconocidas
  - Servidor 400/500s

- Consulta las IPs que Signal Sciences ha bloqueado o marcado como maliciosas por cualquiera de las siguientes actividades:

  - Ataques de inyección OWASP
  - DoS a nivel de aplicación
  - Ataques de fuerza bruta
  - Abuso y uso incorrecto de las aplicaciones
  - Limitación de la tasa de solicitud
  - Adquisición de cuentas
  - Bots en mal estado
  - Parcheado virtual

- Ver alertas sobre el estado del Agent de Signal Sciences

## Configuración

Para utilizar la integración de Signal Sciences y Datadog, debes ser cliente de Signal Sciences. Para obtener más información sobre Signal Sciences, consulta <https://www.signalsciences.com>.

### Configuración

#### Recopilación de métricas

1. Instala el [Agent de Signal Sciences][3].

2. Configura el Agent de Signal Sciences para utilizar DogStatsD:

    Añade la siguiente línea a cada archivo agent.config del Agent:

   ```shell
   statsd-type = "dogstatsd"
   ```

    Cuando se hace esto, el cliente StatsD del Agent tiene habilitado el etiquetado y las métricas como `sigsci.agent.signal.<SIGNAL_TYPE>` se envían como `sigsci.agent.signal` y se etiquetan con `signal_type:<SIGNAL_TYPE>`.

    _Ejemplo:_ `sigsci.agent.signal.http404` => `sigsci.agent.signal` con etiqueta `signal_type:http404`

    Si utilizas Kubernetes para ejecutar el Datadog Agent, asegúrate de habilitar el tráfico de DogStatsD no local como se describe en la [documentación de Kubernetes DogStatsD][4].

3. Configura el Agent de SigSci para enviar métricas al Datadog Agent:

    Añade la siguiente línea al archivo `agent.config` de cada Agent:

   ```shell
   statsd-address="<DATADOG_AGENT_HOSTNAME>:<DATADOG_AGENT_PORT>"
   ```

4. Pulsa el botón para instalar la integración.

5. En Datadog, comprueba que se ha creado el dashboard "Signal Sciences - Overview" y que empieza a capturar métricas.

#### Recopilación de eventos

1. En Datadog, [crea una clave de API][5].

2. En tu [dashboard de Signal Sciences][6] de la barra de navegación del sitio, haz clic en Manage > Integrations (Gestionar > Integraciones) y haz clic en Add (Añadir) junto a la integración de eventos de Datadog.

3. Introduce la clave de API en el campo _API Key_ (Clave de API).

4. Haz clic en _Add_ (Añadir).

Para más información, consulta la página de la [integración de Datadog y Signal Sciences][7].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "sigsci" >}}


### Eventos

Los eventos son creados y enviados a tu [Flujo de eventos de Datadog][9] cuando una dirección IP es marcada en Signal Sciences.

### Checks de servicio

La integración de Signal Sciences no incluye ningún check de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [equipo de asistencia de Datadog][10].

## Referencias adicionales

Más enlaces, artículos y documentación útiles:

- [Blog de Signal Sciences][11]

[1]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-dashboard.png
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sigsci/images/datadog-sigsci-security.png
[3]: https://docs.signalsciences.net/install-guides/
[4]: https://docs.datadoghq.com/es/agent/kubernetes/dogstatsd/
[5]: https://app.datadoghq.com/organization-settings/api-keys
[6]: https://dashboard.signalsciences.net
[7]: https://docs.signalsciences.net/integrations/datadog/
[8]: https://github.com/DataDog/integrations-extras/blob/master/sigsci/metadata.csv
[9]: https://docs.datadoghq.com/es/events/
[10]: https://docs.datadoghq.com/es/help/
[11]: https://www.signalsciences.com/blog/