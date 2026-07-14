---
app_id: azure-backup
app_uuid: 5116675d-48b4-4ec4-a65f-94ce56caed37
assets:
  dashboards:
    azure-backup: assets/dashboards/azure_backup_overview.json
  integration:
    auto_install: true
    events:
      creates_events: false
    metrics:
      check:
      - azure.recoveryservices_vaults.count
      metadata_path: metadata.csv
      prefix: azure.recoveryservices_vaults
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 7440181
    source_type_name: Azure Backup
  monitors:
    Azure Backup Job Errors: assets/monitors/recovery_vault_backup_error.json
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- azure
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: azure_backup
integration_id: azure-backup
integration_title: Azure Backup
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: azure_backup
public_title: Azure Backup
short_description: Azure Backup proporciona servicios de copias de seguridad y de
  restauración para almacenes de Recovery Services y almacenes de Backup.
supported_os: []
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Azure
  - Offering::Integration
  configuration: README.md#Installation
  description: Azure Backup proporciona servicios de copias de seguridad y de restauración
    para almacenes de Recovery Services y almacenes de Backup.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Azure Backup
---

<!--  CON ORIGEN EN https://github.com/DataDog/integrations-internal-core -->


## Información general

La integración de Datadog con el [servicio de Azure Backup][1] monitoriza el estado de un [almacén de Recovery Services][2] que se ejecuta en Microsoft Azure.

## Configuración

### Instalación

Si aún no lo has hecho, configura primero la [integración de Microsoft Azure][3]. No hay otros pasos de instalación.

Aunque la integración de Microsoft Azure puede recopilar métricas de un almacén de Azure Recovery Services, Datadog recomienda que también instales el Datadog Agent en tus máquinas virtuales. Para obtener más información, consulta el blog sobre [monitorización basada en el Agent][4].

## Datos recopilados

### Métricas
{{< get-metrics-from-git "azure_backup" >}}


### Checks de servicio

La integración de Azure Backup Service no incluye ningún check de servicio.

### Eventos

La integración de Azure Backup no incluye ningún evento.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con [asistencia técnica de Datadog][6].

[1]: https://learn.microsoft.com/en-us/azure/backup/backup-overview
[2]: https://learn.microsoft.com/en-us/azure/backup/backup-azure-recovery-services-vault-overview
[3]: https://docs.datadoghq.com/es/integrations/azure/
[4]: https://www.datadoghq.com/blog/dont-fear-the-agent/
[5]: https://github.com/DataDog/integrations-internal-core/blob/main/azure_backup/metadata.csv
[6]: https://docs.datadoghq.com/es/help/