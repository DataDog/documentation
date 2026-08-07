---
app_id: gatling-enterprise
app_uuid: 019662ce-ced4-7e23-9738-bd4c09f38b64
assets:
  dashboards:
    Gatling Enterprise Overview: assets/dashboards/gatling_enterprise_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check:
      - gatling_enterprise.user.start_count
      metadata_path: metadata.csv
      prefix: gatling_enterprise
    process_signatures: []
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 45953787
    source_type_name: gatling-enterprise
    supports_ddr_coordinated_failover: false
author:
  homepage: https://gatling.io
  name: Gatling Corp
  sales_email: contact@gatling.io
  support_email: contact@gatling.io
  vendor_id: gatling-corp
categories:
- herramientas de desarrollo
- tests
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/gatling_enterprise/README.md
display_on_public_website: true
draft: false
git_integration_title: gatling_enterprise
integration_id: gatling-enterprise
integration_title: Gatling Enterprise
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gatling_enterprise
public_title: Gatling Enterprise
short_description: Recopilación de métricas de tests de carga de Gatling Enterprise
supported_os:
- linux
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Herramientas de desarrollo
  - Categoría::Tests
  - Offering::Integration
  - Supported OS::Linux
  - Submitted Data Type::Metrics
  configuration: README.md#Configuración
  description: Recopilación de métricas de tests de carga de Gatling Enterprise
  media:
  - caption: 'Dashboard de información general de Gatling Enterprise: respuestas y
      solicitudes'
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1.png
    media_type: imagen
  - caption: 'Dashboard de información general de Gatling Enterprise: tiempo de respuesta'
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1-1.png
    media_type: imagen
  - caption: 'Dashboard de información general de Gatling Enterprise: usuarios'
    image_url: images/app.datadoghq.com_dashboard_n9p-inx-6jn_gatling-enterprise-overview_fromUser=false&refresh_mode=sliding&from_ts=1747402829806&to_ts=1747403729806&live=true
      (2) 1-2.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Gatling Enterprise
  uninstallation: README.md#Desinstalación
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

Gatling Enterprise es una plataforma de tests de carga diseñada para ayudar a los equipos a validar la escalabilidad y el rendimiento de las aplicaciones en condiciones de tráfico reales.

Con la integración de Datadog, los equipos pueden investigar problemas de rendimiento correlacionando métricas de carga de tests como tiempos de respuesta, rendimiento y errores con datos de infraestructura rastreados en Datadog.

Gatling Enterprise envía métricas a Datadog, lo que permite a los equipos de ingeniería y SRE centralizar las perspectivas de rendimiento y mejorar la toma de decisiones en torno a la escalabilidad y la fiabilidad.


## Configuración

> Nota**: Esta integración está disponible para los clientes de Gatling Enterprise. Para obtener más información sobre Gatling Enterprise y empezar de forma gratuita, visita [gatling.io/products][1].

1. En Datadog, ve a **Integrations** (INtegraciones), selecciona el cuadro de Gatling Enterprise y haz clic en **Install Integration** (Instalar integración).

2. En tu instalación del plano de control de Gatling, edita tu [archivo de configuración][2]. En la sección `system-properties`, añade los parámetros siguientes. Sustituye YOUR_API_KEY por tu [clave de API de Datadog][3] y utiliza el [sitio de Datadog][4] correcto para tu organización:

```bash
control-plane {
  locations = [
    {
      id = "prl_example"
      # ... other configuration for your location
      system-properties {
        "gatling.enterprise.dd.api.key" = "YOUR_API_KEY" # Fill your API key here
        "gatling.enterprise.dd.site" = "datadoghq.com"  # Replace with your Datadog site
      }
    }
  ]
}
```

3. Despliega y reinicia tu plano de control


## Datos recopilados

La integración de Gatling Enterprise recopila todas las métricas de bases de datos, nodos y particiones.


### Métricas

Para ver la lista de métricas proporcionadas por esta integración, consulta [metadata.csv][5].

## Desinstalación

1. En Datadog, ve a **Integrations** (Integraciones), selecciona el cuadro de Gatling Enterprise y haz clic en **Uninstall Integration** (Desinstalar integración).

2. En tu instalación del plano de control de Gatling, edita tu [archivo de configuración][6]. En la sección `system-properties`, elimina las líneas que contienen `gatling.enterprise.dd`.

3. Despliega y reinicia tu plano de control.

## Soporte

¿Necesitas ayuda? Ponte en contacto con el [soporte de Gatling Enterprise][7].



[1]: https://gatling.io/products
[2]: https://docs.gatling.io/reference/install/cloud/private-locations/introduction/
[3]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[4]: https://docs.datadoghq.com/es/getting_started/site/
[5]: https://github.com/DataDog/integrations-extras/blob/master/gatling_enterprise/metadata.csv
[6]: https://docs.gatling.io/reference/install/cloud/private-locations/introduction
[7]: https://gatlingcorp.atlassian.net/servicedesk/customer/portal/8