---
"app_id": "pdh"
"app_uuid": "75f6813c-934c-4f1a-b8f4-71f9f1911165"
"assets":
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "10065"
    "source_type_name": "PDH"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "os & system"
"custom_kind": "integración"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/pdh_check/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "pdh_check"
"integration_id": "pdh"
"integration_title": "Check de PDH"
"integration_version": "4.1.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "pdh_check"
"public_title": "Check de PDH"
"short_description": "Recopila y grafica cualquier contador del rendimiento de Windows"
"supported_os":
- "windows"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Supported OS::Windows"
  - "Category::Sistema operativo y sistema"
  - "Offering::Integración"
  "configuration": "README.md#Configuración"
  "description": "Recopila y grafica cualquier contador del rendimiento de Windows"
  "media": []
  "overview": "README.md#Información general"
  "support": "README.md#Soporte"
  "title": "Check de PDH"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Información general

**Nota:** Se desaconseja el uso del check de PDH. En su lugar, utiliza los [checks de contadores del rendimiento de Windows][1].

Obtén métricas de los contadores del rendimiento de Windows en tiempo real para:

- Visualizar y monitorizar contadores del rendimiento de Windows a través de la API PDH.

## Configuración

### Instalación

El check de PDH está incluido en el paquete del [Datadog Agent][2] . No es necesaria ninguna instalación adicional.

### Configuración

1. Edita el archivo `pdh_check.d/conf.yaml`, que se encuentra en la carpeta `conf.d/` en la raíz del [directorio de configuración del Agent][3], para empezar a recopilar los datos de rendimiento de Windows. Consulta el [mapr.d/conf.yaml de ejemplo][4] para conocer todas las opciones de configuración disponibles.

2. [Reinicia el Agent][5].

### Validación

Ejecuta el [subcomando de estado del Agent][6] y busca `pdh_check` en la sección Checks.

## Datos recopilados

### Métricas

Todas las métricas recopiladas por el check de PDH se reenvían a Datadog como [métricas personalizadas][7], lo que puede afectar a tu [facturación][8].

### Eventos

El check de PDH no incluye eventos.

### Checks de servicio

El check de PDH no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? [Consulta el servicio de asistencia de Datadog][9].

[1]: https://docs.datadoghq.com/integrations/windows_performance_counters/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[4]: https://github.com/DataDog/integrations-core/blob/master/pdh_check/datadog_checks/pdh_check/data/conf.yaml.example
[5]: https://docs.datadoghq.com/agent/guide/agent-commands/#restart-the-agent
[6]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[7]: https://docs.datadoghq.com/developers/metrics/custom_metrics/
[8]: https://docs.datadoghq.com/account_management/billing/custom_metrics/
[9]: https://docs.datadoghq.com/help/

