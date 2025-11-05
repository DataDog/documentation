---
app_id: contrastsecurity
app_uuid: 8509e113-cf2e-42f1-b8d4-1261720498a5
assets:
  dashboards:
    Contrast Security Integration Overview: assets/dashboards/contrast_security_protect.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: contrastsecurity.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10084
    source_type_name: contrastsecurity
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Contrast Security
  sales_email: kristiana.mitchell@contrastsecurity.com
  support_email: kristiana.mitchell@contrastsecurity.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/README.md
display_on_public_website: true
draft: false
git_integration_title: contrastsecurity
integration_id: contrastsecurity
integration_title: Contrast Security
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: contrastsecurity
public_title: Contrast Security
short_description: Visualizar ataques y vulnerabilidades en Datadog con Contrast Security
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Recopilación de logs
  - Categoría::Seguridad
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Visualizar ataques y vulnerabilidades en Datadog con Contrast Security
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Contrast Security
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La integración de Contrast con Datadog te permite visualizar tus logs de Contrast en Datadog.

## Configuración

### Recopilación de logs

En plataformas Linux, habilita la recopilación de logs del Datadog Agent en `/etc/datadog-agent/datadog.yaml`. En otras plataformas, consulta la [guía Archivos de configuración del Agent][1] para ver la localización de tu archivo de configuración:

```yaml
logs_enabled: true
```

- Añade este bloque de configuración a tu archivo `contrastsecurity.d/conf.yaml` para empezar a recopilar tus logs de Contrast:
- Crea un nuevo archivo `conf.yaml`.
- Añade un grupo de configuración para la recopilación de logs personalizados.

    ```yaml
    logs:
      - type: file
        path: /path/to/contrast/security.log
        service: contrast
        source: contrastsecurity
    ```

Para obtener más información sobre logs, consulta la [documentación de Contrast Security][2].

- [Reinicia el Datadog Agent][3].

Para obtener más información, consulta la:
- [documentación de logs de Datadog][4]
- [API de dashboards de Datadog][5]

## Datos recopilados

### Métricas

La integración Contrast no incluye métricas.

### Eventos

La integración Contrast no incluye eventos.

### Checks de servicios

La integración Contrast no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [encargado de mantenimiento][6] de esta integración.

[1]: https://docs.datadoghq.com/es/agent/guide/agent-configuration-files/
[2]: https://docs.contrastsecurity.com/
[3]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/es/logs/log_collection/
[5]: https://docs.datadoghq.com/es/api/#create-a-dashboard
[6]: https://github.com/DataDog/integrations-extras/blob/master/contrastsecurity/manifest.json