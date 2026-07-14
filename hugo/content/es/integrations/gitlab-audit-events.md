---
aliases:
- /es/integrations/gitlab_audit_events
app_id: gitlab-audit-events
categories:
- recopilación de logs
- seguridad
custom_kind: integración
description: Recopilar eventos de auditoría de GitLab para evaluar el riesgo, la seguridad
  y el cumplimiento
further_reading:
- link: https://docs.datadoghq.com/integrations/gitlab_audit_events
  tag: documentación
  text: Documentación sobre eventos de auditoría de GitLab
integration_version: 1.0.0
media:
- caption: Dashboard de eventos de auditoría de GitLab
  image_url: images/overview-dashboard.png
  media_type: imagen
supported_os:
- linux
- windows
- macos
title: Eventos de auditoría de GitLab
---
## Información general

GitLab es una plataforma fuente de control y DevOps que ayuda a las empresas a crear, proteger y desplegar software. Intégrate con los [eventos de auditoría de GitLab](https://docs.gitlab.com/ee/administration/audit_event_reports.html) para reforzar las medidas de seguridad, responder a incidentes y adherirte a las normas de cumplimiento. Datadog analiza automáticamente eventos de auditoría de GitLab, como por ejemplo los logs, para que puedas filtrarlos por ID de usuario, dirección IP o nombre de evento. Esto ayuda a identificar anomalías, como intentos de inicio de sesión sospechosos o actividad inusual. La integración también incluye un dashboard predefinido para las actividades de monitorización, que puedes personalizar según tus necesidades.

Mejora la seguridad y el cumplimiento mediante el seguimiento de todas los eventos de auditoría de GitLab, desde las acciones cotidianas de los usuarios hasta los informes de cumplimiento. Por ejemplo:

- Realiza un seguimiento de la actividad de solicitud de fusión por usuario y proyecto, incluyendo las acciones de bots y los cambios en las políticas de fusión de proyectos.
- Genera un informe de claves GPG, tokens de acceso personal y tokens de despliegue, desde su creación hasta su eliminación.

Busca [`source (fuente):gitlab-audit-events`](https://app.datadoghq.com/logs?query=source%3Agitlab-audit-events) para ver tus eventos de auditoría de GitLab en los [productos de gestión de logs](https://docs.datadoghq.com/logs/) de Datadog y aprovecha las herramientas de análisis de Datadog para mejorar la seguridad, el rendimiento y la información operativa.

## Configuración

Para integrar los eventos de auditoría de GitLab con Datadog, Datadog se conecta a GitLab utilizando OAuth. El usuario autenticado debe tener privilegios de administrador para configurar esta integración. Estos son los requisitos para el usuario que autentica esta integración:

- Suscripción Premium o Ultimate en GitLab
- Permisos de propietario o administrador de cuenta para acceder a eventos de auditoría de todos los grupos, proyectos y usuarios.

### Instalación

1. Ve a la página [Integraciones](https://app.datadoghq.com/integrations?search=GitLab%20Audit%20Events) y busca la integración "GitLab Audit Events" (Eventos de auditoría de GitLab).
1. Haz clic en el cuadro.
1. Para añadir una cuenta para instalar la integración, haz clic en el botón **Add GitLab Account** (Añadir una cuenta de GitLab).
1. Luego de leer las instrucciones del modal, haz clic en el botón **Authorize** (Autorizar), que te redirigirá a la página de inicio de sesión de GitLab.
1. Inicia sesión en GitLab utilizando una cuenta de administrador de GitLab.
1. En la pantalla de solicitud de acceso al contexto `api`, haz clic en **Authorize** (Autorizar). Esto permite a Datadog visualizar eventos de auditoría.
1. Se te redirige al cuadro de eventos de auditoría de GitHub de Datadog con una nueva cuenta. Datadog recomienda cambiar el 'Nombre de cuenta' a uno más fácil de recordar.

## Datos recopilados

### Logs

Los eventos de auditoría de GitLab recopilan todos los [tipos de eventos de auditoría](https://docs.gitlab.com/ee/user/compliance/audit_event_types.html) de GitLab, en forma de logs.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help).