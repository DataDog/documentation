---
app_id: hcp-terraform
app_uuid: 0b997b89-e3c5-4c82-ab23-fd964cceaf8c
assets:
  dashboards:
    HCP-Terraform-Overview: assets/dashboards/hcp_terraform_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 21176406
    source_type_name: HCP Terraform
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: ayuda@datadoghq.com
categories:
- configuración y despliegue
- herramientas de desarrollo
- recopilación de logs
- orquestación
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: hcp_terraform
integration_id: hcp-terraform
integration_title: HCP Terraform
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: hcp_terraform
public_title: HCP Terraform
short_description: Obtener una visibilidad de los eventos de auditoría HCP Terraform
  de tu organización
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Categoría::Configuración y despliegue
  - Categoría::Herramientas de desarrollo
  - Categoría::Recopilación de logs
  - Categoría::Orquestación
  - Categoría::Seguridad
  - Tipo de datos enviados::Logs
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Obtener una visibilidad de los eventos de auditoría HCP Terraform de
    tu organización
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: HCP Terraform
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->


## Información general

Esta integración permite la recopilación de datos de logs de Audit Trail de HCP Terraform (anteriormente conocido como Terraform Cloud) para Datadog [Cloud SIEM][1].
- Controla la conservación de datos de HCP Terraform.
- Crea widgets y dashboards personalizados.
- Configura reglas de detección de [Cloud SIEM][1] utilizando [pipelines de logs predefinidos][2].
- Realiza una referencia cruzada de eventos de HCP Terraform con datos de otros servicios.

Después de analizar tus logs de HCP Terraform, Datadog rellena el [dashboard de información general predefinido de HCP Terraform][3] con información de eventos relacionados con la seguridad a partir de los valores, elementos y usuarios de HCP Terraform. Los widgets incluyen listas principales que muestran los eventos más frecuentes e infrecuentes y un mapa de geolocalización que muestra el país de origen de los intentos de inicio de sesión.

Para encontrar logs de HCP Terraform, busca tus logs de Datadog con `source:hcp-terraform`. Si instalaste correctamente la integración, deberías poder ver eventos HCP Terraform.

## Configuración

### Instalación

**Paso 1: Crear un token de organización para HCP Terraform**
1. Accede a tu cuenta de Hashicorp en https://app.terraform.io/, luego haz clic en tu organización y en **Settings** (Configuración).
2. Selecciona el enlace **Tokens de API** en **Seguridad**.
3. Selecciona **Crear un token de organización**.
4. Si lo prefieres, define una fecha de caducidad.
5. Haz clic en **Generate token** (Generar token).
6. Copia y guarda el token de organización generado.

**Paso 2: Crear la integración Datadog**
1. Pega el token en el campo **Token de organización** que aparece a continuación.
2. Introduce un nombre para la cuenta.

### Configuración

Si no recibes ningún dato de log, confirma que tienes el atributo **audit-logging** configurado como **true** en tu [conjunto de derechos de la organización][4].

### Validación

Una vez instalada la integración, tus logs de auditoría de HCP Terraform estarán disponibles para su consulta en logs de Datadog, utilizando `source:hcp-terraform`.

## Datos recopilados

### Métricas

hcp-terraform no incluye métricas.

### Checks de servicio

hcp-terraform no incluye checks de servicios.

### Eventos

hcp-terraform no incluye eventos.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog][5].

[1]: https://app.datadoghq.com/security/siem/home
[2]: https://app.datadoghq.com/logs/pipelines?search=hcp-terraform
[3]: https://app.datadoghq.com/dash/integration/31325/hcp-terraform-overview
[4]: https://developer.hashicorp.com/terraform/cloud-docs/api-docs/organizations#show-the-entitlement-set
[5]: https://docs.datadoghq.com/es/help/