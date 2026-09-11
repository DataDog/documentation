---
app_id: gitlab-audit-events
app_uuid: 4a1f22c0-6085-491b-a903-b202fd9f3f88
assets:
  dashboards:
    GitLab Audit Events: assets/dashboards/gitlab_audit_events_overview.json
  integration:
    auto_install: false
    events:
      creates_events: false
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_id: 11648998
    source_type_name: Eventos de auditoría de GitLab
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- recopilación de logs
- seguridad
custom_kind: integración
dependencies: []
display_on_public_website: true
draft: false
git_integration_title: gitlab_audit_events
integration_id: gitlab-audit-events
integration_title: Eventos de auditoría de GitLab
integration_version: ''
is_public: true
manifest_version: 2.0.0
name: gitlab_audit_events
public_title: Eventos de auditoría de GitLab
short_description: Recopilar eventos de auditoría de GitLab para evaluar el riesgo,
  la seguridad y el cumplimiento
supported_os:
- linux
- Windows
- macOS
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Category::Log Collection
  - Category::Security
  - Oferta::Integración
  - Sistema operativo compatible::Linux
  - Sistema operativo compatible::Windows
  - Sistema operativo compatible::macOS
  - Submitted Data Type::Logs
  configuration: README.md#Configuración
  description: Recopilar eventos de auditoría de GitLab para evaluar el riesgo, la
    seguridad y el cumplimiento
  media:
  - caption: Dashboard de eventos de auditoría de GitLab
    image_url: images/overview-dashboard.png
    media_type: imagen
  overview: README.md#Información general
  resources:
  - resource_type: Documentación
    url: https://docs.datadoghq.com/integrations/gitlab_audit_events
  support: README.md#Soporte
  title: Eventos de auditoría de GitLab
---

<!--  FUENTE https://github.com/DataDog/integrations-internal-core -->
## Información general

GitLab es una plataforma de control de fuente y DevOps que ayuda a las empresas a crear, proteger y desplegar software. Intégrate con [eventos de auditoría de GitLab][1] para reforzar las medidas de seguridad, responder a incidentes y adherirte a las normas de cumplimiento. Datadog analiza automáticamente eventos de auditoría de GitLab como los logs, para que puedas filtrarlos por ID de usuario, dirección IP o nombre de evento. Esto ayuda a identificar anomalías, como intentos de inicio de sesión sospechosos o actividad inusual. La integración también incluye un dashboard predefinido para las actividades de monitorización, que puedes personalizar según tus necesidades.

Mejora la seguridad y el cumplimiento mediante el seguimiento de todas los eventos de auditoría de GitLab, desde las acciones cotidianas de los usuarios hasta los informes de cumplimiento. Por ejemplo:
 - Realiza un seguimiento de la actividad de solicitud de fusión por usuario y proyecto, incluyendo las acciones de bots y los cambios en las políticas de fusión de proyectos.
 - Genera un informe de claves GPG, tokens de acceso personal y tokens de despliegue, desde su creación hasta su eliminación.

Busca [`source:gitlab-audit-events`][2] para ver tus eventos de auditoría de GitLab en el [producto para la gestión de logs][3] de Datadog y aprovecha las herramientas de análisis de Datadog para mejorar la seguridad, el rendimiento y las perspectivas operativas.

## Configuración

Para integrar los eventos de auditoría de GitLab con Datadog, Datadog se conecta a GitLab utilizando OAuth. El usuario autenticado debe tener privilegios de administrador para configurar esta integración. Estos son los requisitos para el usuario que autentica esta integración:

- Suscripción Premium o Ultimate en GitLab
- Permisos de propietario o administrador de cuenta para acceder a eventos de auditoría de todos los grupos, proyectos y usuarios.

### Instalación

1. Ve a la [página Integraciones][4] y busca la integración "Eventos de auditoría de GitLab".
2. Haz clic en el cuadro.
3. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add GitLab Account** (Añadir una cuenta de GitLab).
4. Luego de leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la página de inicio de sesión de GitLab.
5. Inicia sesión en GitLab utilizando una cuenta de administrador de GitLab.
6. En la pantalla de solicitud de acceso al contexto `api`, haz clic en **Authorize** (Autorizar). Esto permite a Datadog visualizar eventos de auditoría.
7. Se te redirige al cuadro de eventos de auditoría de GitHub de Datadog con una nueva cuenta. Datadog recomienda cambiar el 'Nombre de cuenta' a uno más fácil de recordar.

## Datos recopilados

### Logs

GitLab Audit Events recopila todos los [tipos de eventos de auditoría][5] de GitLab, como logs.

## Resolución de problemas

¿Necesitas ayuda? Ponte en contacto con el [soporte de Datadog][6].


[1]: https://docs.gitlab.com/ee/administration/audit_event_reports.html
[2]: https://app.datadoghq.com/logs?query=source%3Agitlab-audit-events
[3]: https://docs.datadoghq.com/es/logs/
[4]: https://app.datadoghq.com/integrations?search=GitLab%20Audit%20Events
[5]: https://docs.gitlab.com/ee/user/compliance/audit_event_types.html
[6]: https://docs.datadoghq.com/es/help