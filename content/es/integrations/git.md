---
categories:
- collaboration
- developer tools
- issue tracking
- source control
custom_kind: integración
dependencies: []
description: Envía confirmaciones y solicitudes pull desde tu servidor de Git autohospedado
  a Datadog.
doc_link: https://docs.datadoghq.com/integrations/git/
draft: false
git_integration_title: git
has_logo: true
integration_id: git
integration_title: Git
integration_version: ''
is_public: true
manifest_version: '1.0'
name: git
public_title: Integración de Datadog con Git
short_description: Envía confirmaciones y solicitudes pull desde tu servidor de Git
  autohospedado a Datadog.
version: '1.0'
---

<!--  FUENTE https://github.com/DataDog/dogweb -->
{{< img src="integrations/git/git_event.png" alt="Git event" popup="true">}}

## Información general

Captura las confirmaciones de Git directamente desde tu servidor de Git para:

- Hacer un seguimiento de los cambios de código en tiempo real.
- Añadir marcadores de cambio de código en todos tus dashboards.
- Comentar los cambios de código con tu equipo.

## Configuración

### Instalación

1. Crea una clave de aplicación nueva para Git: [Generar clave de aplicación][1]

2. Descarga el webhook de Git para Datadog:

    ```shell
    sudo easy_install dogapi
    curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
    ```

3. Configura Git con tus [claves de Datadog][1]:

    ```shell
    git config datadog.api <YOUR_DATADOG_API_KEY>
    git config datadog.application <YOUR_DATADOG_APP_KEY>
    ```

4. Activa el enlace en tu repositorio de Git con el `<GIT_REPOSITORY_NAME>`:

    ```shell
    install post-receive <GIT_REPOSITORY_NAME>/.git/hooks/post-receive
    ```

5. [Instala la integración de Datadog con Git][2]

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/integrations/git