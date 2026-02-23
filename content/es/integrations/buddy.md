---
app_id: buddy
categories:
- automation
- developer tools
- event management
custom_kind: integración
description: Automatización de entregas y previsualizaciones de sitios web funcionales
  para desarrolladores web con un solo clic.
integration_version: 1.0.0
media: []
supported_os:
- linux
- windows
- macos
title: Buddy
---
## Información general

Buddy es una plataforma de automatización de integración continua que se puede utilizar para crear, probar, y desplegar sitios web y aplicaciones.

La integración de Buddy te permite:

- Enviar eventos sobre tus despliegues de Buddy a Datadog.
- Correlacionar los detalles de despliegues con tus métricas de Datadog.
- Detectar fuentes de picos de rendimiento en tus pipelines.

![datadog-integration](https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/datadog-integration.png)

## Configuración

- En la configuración de tu cuenta Datadog ve a [Integraciones -> API](https://app.datadoghq.com/organization-settings/api-keys) y copia el token **Clave de API**.

- [Inicia sesión en tu cuenta de Buddy](https://app.buddy.works/login) y ve al pipeline con la acción de despliegue que quieres rastrear.

- Haz clic en el signo más al final del pipeline y selecciona **Datadog** en la sección **Notifications**.

- Ingresa el nombre de tu cuenta de Datadog y pega la clave API que copiaste.

- Utiliza [parámetros Buddy](https://buddy.works/knowledge/deployments/what-parameters-buddy-use) para definir el título del evento y el contenido enviado, por ejemplo:

```text
# Event title
${'${execution.pipeline.name} execution #${execution.id}'}

# Content
${'${execution.to_revision.revision} - ${execution.to_revision.message}'}
```

- Cuando estés listo, haz clic en **Add action** y ejecuta el pipeline. En cada despliegue exitoso, Buddy envía un evento a Datadog:

![snapshot](https://raw.githubusercontent.com/DataDog/integrations-extras/master/buddy/images/snapshot.png)

## Datos recopilados

### Métricas

El check de Buddy no incluye métricas.

### Eventos

Todos los eventos de despliegues de Buddy se envían a tu [flujo de eventos de Datadog](https://docs.datadoghq.com/events/)

### Checks de servicio

El check de Buddy no incluye checks de servicio.

## Solucionar problemas

¿Necesitas ayuda? Ponte en contacto con el [servicio de asistencia de Datadog](https://docs.datadoghq.com/help/).