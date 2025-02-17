---
aliases:
- /es/static_analysis/github_pull_requests
- /es/code_analysis/github_pull_requests/
description: Aprende a utilizar Code Security en solicitudes de extracción de GitHub.
title: Solicitudes de extracción de GitHub
---

## Información general

Code Security se integra con las solicitudes de extracción de GitHub de dos maneras:
- [Comentarios de solicitudes de extracción para señalar infracciones](#enable-code-security-pr-comments-for-your-repositories)
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Ejemplo de comentario de Code Security en una solicitud de extracción" style="width:90%;" >}}
- [Abre una solicitud de extracción para solucionar un problema directamente desde Datadog](#fixing-a-vulnerability-directly-from-datadog): Puedes crear una solicitud de extracción desde la interfaz de usuario para corregir una vulnerabilidad de seguridad o un problema de calidad de código a través de la corrección de código sugerida por Datadog. Esta opción sólo está disponible para Static Code Analysis (SAST).
{{< img src="ci/sast_one_click_light.png" alt="Ejemplo de corrección en un clic en Code Security" style="width:90%;" >}}

Para activar estas funciones, asegúrate de que tienes los permisos de GitHub necesarios (lectura y escritura) para tu repositorio.

## Configurar la seguridad del código para solicitudes de extracción de GitHub

### Habilitar Datadog Code Security

Para activar Code Security en la aplicación, ve a la página [**Code Security**][4].

### Configuración de una aplicación de GitHub

Para utilizar Code Security en GitHub, puedes hacer una de las siguientes cosas:

- Crear una aplicación GitHub en Datadog.
- Actualizar una aplicación GitHub existente, si ya has creado una en Datadog.

Los permisos que concedes a la aplicación GitHub determinan qué funciones de la [integración GitHub][2] están disponibles para la configuración.

#### Crear e instalar una aplicación GitHub

1. En Datadog, ve a [**Integraciones > Aplicaciones GitHub > Añadir nueva aplicación GitHub**][3].
1. Rellena los datos necesarios, como el nombre de la organización GitHub.
1. En **Seleccionar función**, marca la casilla **Code Security: Comentarios de revisión de solicitudes de extracción**.
1. En **Editar permisos**, comprueba que el permiso **Solicitudes de extracción** está configurado en **Lectura y escritura**.
1. Haz clic en **Create App in GitHub* (Crear aplicación en GitHub).
1. Ingresa un nombre para tu aplicación y envíalo.
1. Haz clic en **Install GitHub App** (Instalar aplicación GitHub).
1. Elige en qué repositorios debe instalarse la aplicación y luego haz clic en **Install & Authorize** (Instalar y autorizar).

{{< img src="ci/static-analysis-install-github-app.png" alt="Pantalla de instalación de la aplicación GitHub" style="width:50%;" >}}

#### Actualizar una aplicación GitHub existente

1. En Datadog, ve a [**Integraciones > Aplicaciones GitHub**][5] y busca la aplicación GitHub que quieres utilizar para la seguridad del código.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Ejemplo de comentario de Static Code Analysis en una solicitud de extracción" style="width:90%;" >}}
1. En la pestaña **Características**, observa la sección **Code Security: Comentarios de solicitudes de extracción** para determinar si tu aplicación GitHub necesita permisos adicionales. Si es así, haz clic en **Update permissions in GitHub** (Actualizar permisos en GitHub) para editar la configuración de la aplicación.
1. En **Permisos de repositorio**, configura el acceso a **Solicitudes de extracción** en **Lectura y escritura**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Menú desplegable del permiso de lectura y escritura de una solicitud de extracción" style="width:90%;" >}}
1. Bajo el encabezado **Suscribirse a eventos**, marca la casilla **Solicitud de extracción**.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="Casilla del permiso para comentarios de revisión de solicitudes de extracción" style="width:90%;" >}}

### Habilitar comentarios en solicitudes de extracción de Code Security para tus repositorios

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][4].
2. En **Activar el análisis de tus repositorios**, selecciona **Editar** junto a un repositorio determinado.
3. Habilita la opción **Activar análisis estático**.

**Nota:** Si utilizas [Acciones de GitHub][6] para ejecutar tus análisis, activa la acción en `push` para que aparezcan los comentarios.

### Solucionar una vulnerabilidad directamente desde Datadog 

Si el permiso **Solicitudes de extracción** de tu aplicación GitHub está configurado como **Lectura y escritura**, se habilita la corrección en un clic para todos los hallazgos de Static Code Analysis con una corrección sugerida disponible.

Sigue estos pasos para solucionar una vulnerabilidad y abrir una solicitud pull:
1. Ve a **Code Security > Repositorios**.
2. Haz clic en un repositorio.
3. En la página del repositorio, haz clic en las pestañas **Vulnerabilidades del código** o **Calidad del código**.
4. Haz clic en una infracción.
5. Si existe una sugerencia de corrección para esa infracción, la corrección en un clic está disponible en el panel lateral, en la pestaña **Corrección**.

[1]: /es/security/code_security/
[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /es/security/code_security/static_analysis/github_actions/