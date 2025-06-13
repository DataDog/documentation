---
app_id: hcp-vault
app_uuid: ad48fccf-95f1-4ead-ae7f-efac1757418a
assets:
  dashboards:
    HCPVault Overview: assets/dashboards/hcp_vault_overview.json
  integration:
    auto_install: true
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: []
      metadata_path: metadata.csv
      prefix: hcp_vault.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10223
    source_type_name: HCPVault
author:
  homepage: https://github.com/DataDog/integrations-extras
  name: Datadog
  sales_email: help@datadoghq.com
  support_email: help@datadoghq.com
categories: []
custom_kind: integración
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/hcp_vault/README.md
display_on_public_website: true
draft: false
git_integration_title: hcp_vault
integration_id: hcp-vault
integration_title: HCP Vault
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hcp_vault
public_title: HCP Vault
short_description: La integración HCP Vault proporciona una visión general de tus
  clústeres Vault
supported_os:
- Linux
- macOS
- Windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::macOS
  - Sistema operativo compatible::Windows
  - Oferta::Integración
  configuration: README.md#Configuración
  description: La integración HCP Vault proporciona una visión general de tus clústeres
    Vault
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: HCP Vault
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-extras -->


## Información general

La integración HCP Vault proporciona información general de tus clústeres Vault para que puedas monitorizar el rendimiento y el estado del clúster.

El streaming de métricas de HCP Vault está disponible para todos los clústeres de nivel de producción. La función no está disponible para clústeres de nivel de desarrollo.

Para obtener más detalles sobre contextos e interpretación de métricas, consulta la [guía sobre métricas de HCP Vault][1].

## Configuración

### Instalación

Sigue las siguientes instrucciones de configuración.

### Requisitos previos
- Un clúster de nivel de producción HCP Vault
- Tu región Datadog y tu [clave de API Datadog][2]
- Una cuenta con un rol de administrador o contribuyente [asignado en HCP][3]

### Configuración

Para activar el streaming de métricas:

1. En la información general del clúster HCP Vault, selecciona la vista Metrics (Métricas).

   ![Streaming de métricas][4]

2. Si aún no has configurado el streaming de métricas, haz clic en Enable streaming (Activar streaming).

3. En la vista del flujo (stream) de métricas de Vault, selecciona Datadog como proveedor.

4. En la configuración de Datadog, introduce tu clave de API y selecciona la región del sitio Datadog que coincide con tu entorno Datadog.

   ![Elegir el proveedor][5]

5. Haz clic en Save (Guardar).
**Nota**: HCP Vault admite el streaming de métricas a un solo endpoint de métricas a la vez.

6. Ve a Datadog y activa la integración haciendo clic en Install (Instalar) en el cuadro de la integración. Esta acción instala un dashboard de HCP Vault con widgets que aprovechan al máximo tu telemetría HCP Vault. Puedes encontrar el dashboard buscando "HCP Vault Overview" (Información general de HCP Vault) en la lista de dashboards.
   **Nota**: En el dashboard, indica los valores de `cluster` y `project_id` para seleccionar métricas para el clúster correcto. `cluster` es el nombre de clúster que has configurado al crear el clúster. `project_id` es el ID actual de la URL que aparece en `https://portal.cloud.hashicorp.com/orgs/xxxx/projects/xxxx` del portal HCP

## Datos recopilados

### Métricas

Para obtener más detalles sobre contextos e interpretación de métricas, consulta la [guía sobre métricas de HCP Vault][1].

### Checks de servicios

La integración HCP Vault no incluye checks de servicio.

### Eventos

La integración HCP Vault no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].

[1]: https://learn.hashicorp.com/collections/vault/cloud
[2]: https://docs.datadoghq.com/es/account_management/api-app-keys/
[3]: https://cloud.hashicorp.com/docs/hcp/access-control
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/metrics-streaming.png
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/hcp_vault/images/choose-provider.png
[6]: https://docs.datadoghq.com/es/help/