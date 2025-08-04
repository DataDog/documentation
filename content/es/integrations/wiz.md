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

Datadog's integración con Wiz le permite ingestar tanto la auditoría log como los problemas (incluyendo amenazas y combinaciones tóxicas) en Datadog [Cloud SIEM][1] utilizando la API de Wiz.

## loguear Tipos recogidos

### Logs de auditoría

Acciones realizadas por los miembros del equipo, actividad de los informes y actualizaciones de las emisiones. Útil para detectar actividades inusuales y apoyar las investigaciones.

### Problemas

log de combinaciones tóxicas y desconfiguraciones en su nube infraestructura.

## Configuración

## Configuración

### Auditoría log (basada en Pull utilizando Wiz API)

#### Requisitos previos

- Acceso a un inquilino Wiz con permiso para crear cuentas servicio.

#### Paso 1: Añadir una nueva cuenta en Datadog

1. En la siguiente tabla, haga clic en **Añadir nuevo**.
2. Introduzca un único **Datadog Nombre de cuenta**.
3. Pega la URL del token de Wiz:
   ```
   https://auth.app.wiz.io/oauth/token
   ```

#### Paso 2: Introducir la URL de consulta

Wiz utiliza un punto final GraphQL unificado:

```
https://api.<TENANT_REGION>.app.wiz.io/graphql
```

Sustituya `<TENANT_REGION>` por su región real (por ejemplo, us1, eu1, etc.).

Para encontrar tu punto final:

1. [loguear en][2] a Wiz.
2. Vaya a **Configuración del usuario**.
3. Haga clic en **Inquilino** en el menú de la izquierda.
4. Copie su punto final de API.

#### Paso 3: Crear una cuenta servicio en Wiz

1. Vaya a **Configuración** > **Gestión de acceso** > **servicio Cuentas**.
2. Haga clic en **Añadir cuenta servicio **.
3. Rellena:
   - **Nombre**: Por ejemplo, `Datadog integración`
   - **Tipo**: Personalizado integración (GraphQL API)
   - **API contexto**: `admin:audit`, `read:issues`
4. Guarde la cuenta y copie el **ID de cliente** y el **Secreto de cliente** en la tabla siguiente.

**NOTA**: Auditoría log se extraen en cada 12 horas por Wiz requisitos de la API.

### Emisiones (basadas en Push mediante webhooks)

Wiz envía datos de incidencias a Datadog mediante webhooks basados en push.

#### Paso 1: Genere su URL de entrada

1. En Datadog, genere una URL de admisión utilizando una clave API existente o nueva.
2. Haga clic en **Copiar URL de admisión**.

#### Paso 2: Configurar el webhook en Wiz

1. Vaya a **Configuración** > **integraciones** > **Webhooks** en Wiz.
2. Cree un nuevo webhook para Datadog.
3. Pegue la URL de entrada de Datadog en el webhook Configuración.

Para más información sobre los formatos webhook de Wiz, véase:

- [Wiz Issues Webhook Docs][3]
- [Panorama de los problemas del mago][4]

## Validación

Después de la configuración:

1. Vaya a **log Explorer** en Datadog.
2. Búsqueda con `source:wiz`.
3. Si tiene éxito, aparece Wiz log.
4. Si no es así, vaya a **log** > **Indexes** y verifique que tiene un loguear índice para `source:wiz*`.

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

¿Necesita ayuda? Ponte en contacto con [Datadog support][5] o [Wiz support][6].

[1]: https://app.datadoghq.com/security/home
[2]: https://app.wiz.io/login
[3]: https://docs.wiz.io/wiz-docs/docs/webhook-format
[4]: https://docs.wiz.io/wiz-docs/docs/issues-overview
[5]: https://docs.datadoghq.com/es/help/
[6]: https://www.wiz.io/