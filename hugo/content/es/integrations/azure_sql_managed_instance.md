---
app_id: azure-sql-managed-instance
app_uuid: 877e3fb4-8192-4f54-942d-0d11363ab525
assets:
  dashboards:
    azure-sql-managed-instance-overview: assets/dashboards/azure_sql_managed_instance_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.sql_managedinstances.count
      metadata_path: metadata.csv
      prefix: azure.sql_managedinstances
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 39934830
    source_type_name: Azure SQL Managed Instance
  monitors:
    Azure SQL Managed Instance CPU Utilization: assets/monitors/azure_sql_managed_instance_cpu_utilization.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- azure
- métricas
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_sql_managed_instance
integration_id: azure-sql-managed-instance
integration_title: Azure SQL Managed Instance
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_sql_managed_instance
public_title: Azure SQL Managed Instance
short_description: Utiliza la integración de SQL Managed Instance para realizar un
  seguimiento de la utilización y la actividad de tus bases de datos de SQL Managed
  Instance.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Utiliza la integración de SQL Managed Instance para realizar un seguimiento
    de la utilización y la actividad de tus bases de datos de SQL Managed Instance.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure SQL Managed Instance
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Azure SQL Managed Instance es una versión totalmente gestionada del motor de base de datos empresarial de SQL Server. Utiliza la integración de SQL Managed Instance para realizar un seguimiento de la utilización y la actividad de tus bases de datos de SQL Managed Instance.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_sql_managed_instance" >}}


### Checks de servicios

Azure SQL Managed Instance no incluye ningún check de servicio.

### Eventos

Azure SQL Managed Instance no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

## Referencias adicionales

Documentación útil adicional, enlaces y artículos:

- [Optimiza el rendimiento de SQL Server con Datadog Database Monitoring][4]
- [Documentación de Database Monitoring][5]
- [Mejora el host de base de datos y el rendimiento de las consultas con las recomendaciones de Database Monitoring][6].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/help/
[4]: https://www.datadoghq.com/blog/optimize-sql-server-performance-with-datadog/
[5]: https://docs.datadoghq.com/es/database_monitoring/
[6]: https://www.datadoghq.com/blog/database-monitoring-recommendations/