---
algolia:
  subcategory: Integraciones de Marketplace
app_id: crest-data-systems-integration-backup-and-restore-tool
app_uuid: bac70338-c588-4766-90ea-3ca10fe259d1
assets:
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 28271702
    source_type_name: crest_data_systems_integration_backup_and_restore_tool
author:
  homepage: https://www.crestdata.ai
  name: Crest Data
  sales_email: datadog-sales@crestdata.ai
  support_email: datadog.integrations@crestdata.ai
  vendor_id: crest-data-systems
categories:
- marketplace
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: crest_data_systems_integration_backup_and_restore_tool
integration_id: crest-data-systems-integration-backup-and-restore-tool
integration_title: Backup and Restore Tool
integration_version: ''
is_public: true
legal_terms:
  eula: assets/EULA.pdf
manifest_version: 2.0.0
name: crest_data_systems_integration_backup_and_restore_tool
pricing:
- billing_type: tarifa_plana
  includes_assets: true
  product_id: integration-backup-and-restore-tool
  short_description: Tarifa plana mensual para Backup and Restore Tool (IBRT).
  unit_price: 499.0
public_title: Integration Backup and Restore Tool
short_description: Realiza copias de seguridad de todos tus archivos de configuración
  del Agent, integraciones y dependencias, y restáuralas rápidamente.
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Marketplace
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Realiza copias de seguridad de todos tus archivos de configuración
    del Agent, integraciones y dependencias, y restáuralas rápidamente.
  media:
  - caption: Información general de Integration Backup and Restore
    image_url: images/integration_backup_restore_overview.png
    media_type: imagen
  overview: README.md#Información general
  support: README.md#Soporte
  title: Integration Backup and Restore Tool
  uninstallation: README.md#Desinstalación
---

<!--  SOURCED FROM https://github.com/DataDog/marketplace -->


## Información general

Lleva tu experiencia de Datadog al siguiente nivel con Integration Backup and Restore Tool (IBRT). Esta potente herramienta te ayuda a agilizar tu flujo de trabajo permitiéndote crear fácilmente copias de seguridad de tu configuración de Datadog, asegurando que puedas restaurar rápidamente tu configuración después de actualizaciones o migraciones del Agent.

### Funciones

- Crea una copia de seguridad completa de tu configuración de Datadog, incluyendo:
    - Integraciones
    - Dependencias
    - Archivos de configuración (por ejemplo, archivos `datadog.yaml` y `conf.yaml` de las integraciones)
- Admite varias localizaciones de copias de seguridad, lo que te permite almacenar tus copias de seguridad en las localizaciones que mejor se adapten a tus necesidades.
- Programación flexible de las copias de seguridad:
    - Ejecuta copias de seguridad on-demand según sea necesario
    - Programa copias de seguridad periódicas para que se ejecuten automáticamente, en función de tus necesidades específicas.
- Ofrece opciones durante la restauración:
    1. **Migración o reinstalación del Agent**: instala todas las integraciones y copia los archivos YAML, incluyendo el `conf.yaml` y `datadog.yaml` de la integración, para una experiencia de migración sin fisuras.
    2. **Actualización del Agent**: instala integraciones como configuraciones YAML y preserva las dependencias durante el proceso de actualización.

### Localizaciones de copia de seguridad compatibles

- Máquina local
- Máquina remota
- Servicios en la nube:
    - Buckets de AWS S3
    - Almacenamiento de Azure Blob
    - Almacenamiento en la nube de Google

### Facilidad de uso

A diferencia de los métodos tradicionales de copia de seguridad que requieren una instalación y configuración manual, la IBRT ofrece una forma sencilla y cómoda de crear copias de seguridad. Puedes crear fácilmente una copia de seguridad de tu configuración de Datadog ejecutando un comando on-demand en el nivel del Agent, o programando copias de seguridad periódicas para que se ejecuten automáticamente. Además, restaurar la copia de seguridad es igual de fácil, ya que sólo se necesita un script para que la configuración vuelva a funcionar.

## Asistencia

Para obtener asistencia o realizar solicitudes de funciones, ponte en contacto con Crest Data a través de los siguientes canales:

* Correo electrónico de asistencia: [datadog.integrations@crestdata.ai][7]
* Correo electrónico de ventas: [datadog-sales@crestdata.ai][8]
* Página web: [crestdata.ai][3]
* FAQ: [Crest Data Datadog Marketplace Integrations FAQ][6]

[1]: https://docs.datadoghq.com/es/agent/guide/agent-commands/?tab=agentv6v7#start-stop-and-restart-the-agent
[2]: https://docs.datadoghq.com/es/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.crestdata.ai/
[4]: https://docs.crestdata.ai/datadog-integrations-readme/IBRT.pdf
[5]: https://docs.datadoghq.com/es/agent/
[6]: https://docs.crestdata.ai/datadog-integrations-readme/Crest_Data_Datadog_Integrations_FAQ.pdf
[7]: mailto:datadog.integrations@crestdata.ai
[8]: mailto:datadog-sales@crestdata.ai

---
Esta aplicación está disponible a través de Datadog Marketplace y cuenta con el apoyo de un socio tecnológico de Datadog. Para utilizarla, <a href="https://app.datadoghq.com/marketplace/app/crest-data-systems-integration-backup-and-restore-tool" target="_blank">adquiere esta aplicación en el Marketplace</a>.