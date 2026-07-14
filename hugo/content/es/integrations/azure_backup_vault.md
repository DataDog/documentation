---
app_id: azure-backup-vault
app_uuid: 7689f6dd-24d8-44ea-8596-ebbd918837af
assets:
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.dataprotection_backupvaults.count
      metadata_path: metadata.csv
      prefix: azure.dataprotection_backupvaults.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 40187039
    source_type_name: Azure Backup Vault
  monitors:
    Azure Backup Job Errors: assets/monitors/azure_backup_job_errors.json
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
git_integration_title: azure_backup_vault
integration_id: azure-backup-vault
integration_title: Azure Backup Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_backup_vault
public_title: Azure Backup Vault
short_description: Utiliza la integración de Azure Backup Vault para realizar un seguimiento
  de las copias de seguridad y los eventos del estado de restauración ejecutados con
  tus bóvedas de copia de seguridad.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Category::Metrics
  - Submitted Data Type::Metrics
  - Offering::Integration
  configuration: README.md#Installation
  description: Utiliza la integración de Azure Backup Vault para realizar un seguimiento
    de las copias de seguridad y los eventos del estado de restauración ejecutados
    con tus bóvedas de copia de seguridad.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Azure Backup Vault
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Azure Backup Vault aloja los datos de copia de seguridad de las cargas de trabajo más recientes, como Azure Blob y Azure Database para PostgreSQL. Utiliza la integración de Azure Backup Vault para realizar un seguimiento de las copias de seguridad y los eventos del estado de restauración ejecutados con tus bóvedas de copia de seguridad.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero [Microsoft Azure integración][1]. No hay otros pasos de instalación.

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_backup_vault" >}}


### Checks de servicios

Azure Backup Vault no incluye ningún check de servicio.

### Eventos

Azure Backup Vault no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][3].

[1]: https://docs.datadoghq.com/es/integrations/azure/
[2]: https://app.datadoghq.com/account/settings/agent/latest
[3]: https://docs.datadoghq.com/es/help/