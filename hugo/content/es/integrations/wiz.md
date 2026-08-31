---
app_id: wiz
app_uuid: 9c1be915-7583-4294-8c3b-a49d2d32e05b
assets:
  dashboards:
    Wiz-Overview: assets/dashboards/Wiz-Overview_dashboard.json
  integration:
    auto_install: false
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 10440
    source_type_name: Wiz
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- seguridad
- recopilación de logs
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: wiz
integration_id: wiz
integration_title: Wiz
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: wiz
public_title: Wiz
short_description: Logs y problemas de auditoría de Wiz que incluyen combinaciones
  tóxicas y amenazas.
supported_os:
- Linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Categoría::Seguridad
  - Categoría::Recopilación de logs
  - Oferta::Integración
  configuration: README.md#Configuración
  description: Logs y problemas de auditoría de Wiz que incluyen combinaciones tóxicas
    y amenazas.
  media: []
  overview: README.md#Información general
  support: README.md#Soporte
  title: Wiz
---

<!--  EXTRAÍDO DE https://github.com/DataDog/integrations-internal-core -->
## Información general

La integración de Datadog con Wiz te permite ingerir tanto logs de auditoría como los problemas (incluyendo amenazas y combinaciones tóxicas) en Datadog [Cloud SIEM][1] utilizando la API de Wiz.

## Tipos de logs recopilados

### Logs de auditoría

Acciones realizadas por los miembros del equipo, actividad de los informes y actualizaciones de los problemas. Útil para detectar actividades inusuales y apoyar las investigaciones.

### Problemas

Logs de combinaciones tóxicas y errores de configuración en tu infraestructura en la nube.

## Configuración

## Configuración

### Logs de auditoría (basados en Pull utilizando la API de Wiz)

#### Requisitos previos

- Acceso a un inquilino de Wiz con permiso para crear cuentas de servicio.

#### Paso 1: Añadir una nueva cuenta en Datadog

1. En la siguiente tabla, haz clic en **Add New** (Añadir nuevo).
2. Introduce un único **Datadog Account Name** (Nombre de cuenta de Datadog).
3. Pega la URL del token de Wiz:
   ```
   https://auth.app.wiz.io/oauth/token
   ```

#### Paso 2: Introducir la URL de consulta

Wiz utiliza un endpoint de GraphQL unificado:

```
https://api.<TENANT_REGION>.app.wiz.io/graphql
```

Sustituye `<TENANT_REGION>` por tu región real (por ejemplo, us1, eu1, etc.).

Para encontrar tu endpoint:

1. [Inicia sesión en][2] a Wiz.
2. Ve a **User Settings** (Configuración del usuario).
3. Haz clic en **Tenant** (Inquilino) en el menú de la izquierda.
4. Copia tu endpoint de API.

#### Paso 3: Crear una cuenta servicio en Wiz

1. Ve a **Settings** > **Access Management** > **Service Accounts** (Configuración > Gestión de acceso > Cuentas de servicio).
2. Haz clic en **Add Service Account** (Añadir cuenta de servicio).
3. Rellena:
   - **Name** (Nombre): por ejemplo, `Datadog Integration`
   - **Type** (Tipo): integración personalizada (API de GraphQL)
   - **API Scopes** (Contextos de API): `admin:audit`, `read:issues`
4. Guarda la cuenta y copia el **Client ID** y **Client Secret** (ID de cliente y Secreto de cliente) en la tabla siguiente.

**NOTA**: Los logs de auditoría se extraen cada 12 horas por requisitos de la API de Wiz.

### Problemass (basados en Push mediante webhooks)

Wiz envía datos de problemas a Datadog mediante webhooks basados en push.

#### Paso 1: Generar tu URL de entrada

1. En Datadog, genera una URL de entrada utilizando una clave de API existente o nueva.
2. Haz clic en **Copy Intake URL** (Copiar URL de entrada).

#### Paso 2: Configurar el webhook en Wiz

1. Ve a **Settings** > **Integrations** > **Webhooks** (Configuración > Integraciones > Webhooks) en Wiz.
2. Crea un nuevo webhook para Datadog.
3. Pega la URL de entrada de Datadog en la configuración del webhook.

Para más información sobre los formatos de webhook de Wiz, consulta:

- [Documentos de problemas del webhook en Wiz][3]
- [Información general de los problemas de Wiz][4]

## Validación

Después de la configuración:

1. Ve al **Log Explorer** en Datadog.
2. Busca `source:wiz`.
3. Si tienes éxito, aparece el log de Wiz.
4. Si no es así, ve a **Logs** > **Indexes** (Logs > Índices) y verifica que tienes un índice de log para `source:wiz*`.

### Datos recopilados

### Métricas

La integración Wiz no incluye métricas.

### Checks de servicio

La integración Wiz no incluye checks de servicios.

### Eventos

La integración Wiz no incluye eventos.

### Logs

La integración Wiz recopila logs y problemas de auditoría.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][5] o el [soporte de Wiz][6].

[1]: https://app.datadoghq.com/security/home
[2]: https://app.wiz.io/login
[3]: https://docs.wiz.io/wiz-docs/docs/webhook-format
[4]: https://docs.wiz.io/wiz-docs/docs/issues-overview
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.wiz.io/