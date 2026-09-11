---
app_id: git
categories:
- colaboración
- herramientas de desarrollo
- seguimiento de problemas
- control de fuentes
custom_kind: integración
description: Envía commits y solicitudes pull a Datadog desde tu servidor Git autoalojado.
title: Git
---
{{< img src="integrations/git/git_event.png" alt="Evento Git" popup="true">}}

## Información general

Captura las confirmaciones de Git directamente desde tu servidor de Git para:

- Hacer un seguimiento de los cambios de código en tiempo real.
- Añadir marcadores de cambio de código en todos tus dashboards.
- Comentar los cambios de código con tu equipo.

## Configuración

### Instalación

1. Crear una nueva clave de aplicación para Git: [Generar clave de aplicación](https://app.datadoghq.com/organization-settings/api-keys)

1. Descarga el webhook de Git para Datadog:

   ```shell
   sudo easy_install dogapi
   curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
   ```

1. Configura Git con tus [claves Datadog](https://app.datadoghq.com/organization-settings/api-keys):

   ```shell
   git config datadog.api <YOUR_DATADOG_API_KEY>
   git config datadog.application <YOUR_DATADOG_APP_KEY>
   ```

1. Activa el enlace en tu repositorio de Git con el `<GIT_REPOSITORY_NAME>`:

   ```shell
   install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
   ```

1. [Instalar la integración Datadog-Git](https://app.datadoghq.com/integrations/git)