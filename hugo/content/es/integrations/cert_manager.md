---
app_id: cert-manager
app_uuid: d8bac6db-8cf7-49ca-a4b8-643714fbc7b9
assets:
  dashboards:
    Cert-Manager Overview Dashboard: assets/dashboards/certmanager_overview.json
  integration:
    auto_install: true
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: cert_manager.clock_time
      metadata_path: metadata.csv
      prefix: cert_manager.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10161
    source_type_name: cert-manager
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- configuración y despliegue
- contenedores
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/cert_manager/README.md
display_on_public_website: true
draft: false
git_integration_title: cert_manager
integration_id: cert-manager
integration_title: cert-manager
integration_version: 5.3.0
is_public: true
manifest_version: 2.0.0
name: cert_manager
public_title: cert-manager
short_description: Rastreo de tus métricas de cert-manager con Datadog
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
  - Category::Configuration & Deployment
  - Category::Containers
  - Offering::Integration
  configuration: README.md#Instalación
  description: Rastreo de tus métricas de cert-manager con Datadog
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: cert-manager
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-core -->


## Información general

Este check recopila métricas de [cert-manager][1].

![Dashboard de información general sobre Cert-Manager][2]

## Configuración

Sigue las instrucciones a continuación para instalar y configurar este check para un Agent que se ejecuta en un host. Para entornos en contenedores, consulta las [plantillas de integración de Autodiscovery][3] para obtener orientación sobre la aplicación de estas instrucciones.

### Instalación

El check de cert_manager está incluido en el paquete del [Datadog Agent][3].
No es necesaria ninguna instalación adicional en tu servidor.

### Configuración

1. Edita el archivo `cert_manager.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del directorio de configuración del Agent, para empezar a recopilar los datos de rendimiento de tu cert_manager. Para conocer todas las opciones de configuración disponibles, consulta el [cert_manager.d/conf.yaml de ejemplo][4].

2. [Reinicia el Agent][5].

### Validación

[Ejecuta el subcomando de estado del Agent][6] y busca `cert_manager` en la sección Checks.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "cert-manager" >}}


### Eventos

La integración de cert_manager no incluye ningún evento.

### Checks de servicio
{{< get-service-checks-from-git "cert-manager" >}}


## Solucionar problemas

### Duplicar etiquetas (tags) de nombre

Cada nombre de certificado se expone dentro de la etiqueta `name` en la carga útil de Prometheus y el Datadog Agent lo convierte en una etiqueta. Si tus hosts también usan la etiqueta `name` (por ejemplo, recopilada automáticamente por la [integración de AWS][9]), las métricas provenientes de esta integración presentarán ambos valores. Para evitar etiquetas `name` duplicadas, puedes usar el [parámetro de configuración `rename_labels`][10] para asignar la etiqueta `name` de Prometheus a la etiqueta `cert_name` de Datadog. Esto garantiza que tengas un solo valor dentro de la etiqueta `cert_name` para identificar tus certificados:
```yaml
init_config:
instances:
- openmetrics_endpoint: <OPENMETRICS_ENDPOINT>
  rename_labels:
    name: cert_name
```

¿Necesitas más ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][11].

[1]: https://github.com/jetstack/cert-manager
[2]: https://raw.githubusercontent.com/DataDog/integrations-core/master/cert_manager/images/overview_dashboard.png
[3]: https://app.datadoghq.com/account/settings/agent/latest
[4]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example
[5]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[6]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[7]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/metadata.csv
[8]: https://github.com/DataDog/integrations-core/blob/master/cert_manager/assets/service_checks.json
[9]: https://docs.datadoghq.com/es/integrations/amazon_web_services/
[10]: https://github.com/DataDog/integrations-core/blob/81b91a54328f174c5c1e92cb818640cba1ddfec3/cert_manager/datadog_checks/cert_manager/data/conf.yaml.example#L153-L155
[11]: https://docs.datadoghq.com/es/help/