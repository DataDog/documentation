---
aliases:
- /es/static_analysis/github_pull_requests
- /es/code_analysis/github_pull_requests/
description: Aprende a utilizar Code Security en solicitudes de extracción de GitHub.
title: Solicitudes de extracción de GitHub
---

## Información general

Code Security se integra con las solicitudes de extracción de GitHub de dos maneras:
- [Comentarios en solicitudes de extracción para señalar infracciones](#enable-code-security-pr-comments-for-your-repositories)
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Ejemplo de comentario de Code Security en una solicitud de extracción" style="width:90%;" >}}
- [Abre una solicitud de extracción para solucionar un problema directamente desde Datadog](#fixing-a-vulnerability-directly-from-datadog): Puedes crear una solicitud de extracción desde la interfaz de usuario para corregir una vulnerabilidad de seguridad o un problema de calidad de código a través de la corrección de código sugerida por Datadog. Esta opción sólo está disponible para Static Code Analysis (SAST).

Para activar estas funciones, asegúrate de que tienes los permisos de GitHub necesarios (lectura y escritura) para tu repositorio.

## Configurar la seguridad del código para solicitudes de extracción de GitHub

### Habilitar Datadog Code Security

Para activar Code Security en la aplicación, ve a la página [**Code Security**][4].

### Configuración de una aplicación de GitHub

Para utilizar Code Security en GitHub, puedes hacer una de las siguientes cosas:

- Crear una aplicación GitHub en Datadog.
- Actualizar una aplicación GitHub existente, si ya creaste una en Datadog.

Los permisos que concedes a la aplicación GitHub determinan qué funciones de la [integración GitHub][2] están disponibles para la configuración.

#### Crear e instalar una aplicación GitHub

1. En Datadog, ve a [**Integraciones** > **Aplicaciones GitHub** > **Añadir una nueva aplicación GitHub**][3].
1. Rellena los datos necesarios, como el nombre de la organización GitHub.
1. En **Seleccionar función**, marca la casilla **Code Security: Comentarios de revisión de solicitudes de extracción**.
1. En **Editar permisos**, comprueba que el permiso **Solicitudes de extracción** está configurado para **Lectura y escritura**.
1. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub).
1. Introduce un nombre para tu aplicación y envíalo.
1. Haz clic en **Install GitHub App** (Instalar aplicación GitHub).
1. Elige en qué repositorios debe instalarse la aplicación y luego haz clic en **Install & Authorize** (Instalar y autorizar).

{{< img src="ci/static-analysis-install-github-app.png" alt="Pantalla de instalación de la aplicación GitHub" style="width:50%;" >}}

#### Actualizar una aplicación GitHub existente

1. En Datadog, ve a [**Integraciones > Aplicaciones GitHub**][5] y busca la aplicación GitHub que quieres utilizar para la seguridad del código.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Ejemplo de comentario de Static Code Analysis en una solicitud de extracción" style="width:90%;" >}}
1. En la pestaña **Características**, observa la sección **Code Security: Comentarios de solicitudes de extracción** para determinar si tu aplicación GitHub necesita permisos adicionales. Si es así, haz clic en **Update permissions in GitHub** (Actualizar permisos en GitHub) para editar la configuración de la aplicación.
1. En **Permisos de repositorio**, configura el acceso a **Solicitudes de extracción** como **Lectura y escritura**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Desplegable correspondiente al permiso de lectura y escritura en solicitudes de extracción" style="width:90%;" >}}
1. Bajo el título **Suscribirse a eventos**, marca la casilla **Solicitud de extracción**.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="Casilla correspondiente al permiso para comentarios de revisión en solicitudes de extracción" style="width:90%;" >}}

### Habilitar comentarios en solicitudes de extracción de Code Security para tus repositorios

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][4].
2. En **Activar el análisis de tus repositorios**, selecciona **Editar** junto a un repositorio determinado.
3. Habilita la opción **Activar análisis estático**.

**Nota:** Si utilizas [GitHub Actions][6] para ejecutar tus análisis, activa la acción en `push` para que aparezcan los comentarios.

### Configurar parámetros de comentarios en solicitudes de extracción para tus repositorios

Configura parámetros de comentarios en solicitudes de extracción para todos los repositorios o adáptalos individualmente para un único repositorio. Puedes habilitar comentarios para diferentes tipos de análisis y definir umbrales mínimos de gravedad para controlar cuándo aparecen los comentarios en solicitudes de extracción, lo que te permite excluir la aparición de comentarios en los casos de menor gravedad.

Para configurar comentarios en solicitudes de extracción para todos los repositorios:

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][7].
1. En **Configuración del repositorio**, haz clic en **Global PR Comment Configuration** (Configuración global de comentarios en solicitudes de extracción).
1. Configura los parámetros:
    - **Activar comentarios en solicitudes de extracción para todos los tipos y gravedades de análisis**: Activa esta opción para aplicar comentarios en solicitudes de extracción para todos los tipos y gravedades.
    - **Activar para Static Analysis (SAST)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SAST. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en archivos de test** para evitar comentarios sobre problemas encontrados en archivos de test.
    - **Activar para Software Composition Analysis (SCA)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SCA. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en dependencias de test o desarrollo** para evitar comentarios sobre problemas encontrados en dependencias existentes, sólo en entornos de test o desarrollo.
    - **Activar para Infrastructure-as-Code (IaC)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para IaC. Si está activada, especifica un umbral de gravedad mínimo.
1. Haz clic en **Save** (Guardar).

Para configurar comentarios en solicitudes de extracción para un único repositorio:

1. En Datadog, ve a [**Seguridad** > **Code Security** > **Configuración**][7].
1. En **Configuración del repositorio**, selecciona un repositorio de la lista.
1. Configura los parámetros:
    - **Activar comentarios en solicitudes de extracción para todos los tipos y gravedades de análisis**: Habilita esta opción para aplicar comentarios en solicitudes de extracción para todos los tipos y gravedades.
    - **Activar para Static Analysis (SAST)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SAST. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en archivos de test** para evitar comentarios sobre problemas encontrados en archivos de test.
    - **Activar para Software Composition Analysis (SCA)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para SCA. Si está activada, especifica un umbral de gravedad mínimo. Además, selecciona **Excluir comentarios en solicitudes de extracción, si se detectan infracciones en dependencias de test o desarrollo** para evitar comentarios sobre problemas encontrados en dependencias existentes, sólo en entornos de test o desarrollo.
    - **Activar para Infrastructure-as-Code (IaC)**: Activa esta opción para habilitar comentarios en solicitudes de extracción para IaC. Si está activada, especifica un umbral de gravedad mínimo.
    - **Bloquear todos los comentarios en este repositorio**: Activa esta opción para desactivar todos los comentarios de este repositorio, anulando la configuración global.
1. Haz clic en **Save configuration** (Guardar configuración).

### Solucionar una vulnerabilidad directamente desde Datadog

Si el permiso **Solicitudes de extracción** de tu aplicación GitHub está configurado como **Lectura y escritura**, se habilita la corrección en un clic para todos los hallazgos de Static Code Analysis con una corrección sugerida disponible.

Sigue estos pasos para corregir una vulnerabilidad y abrir una solicitud de extracción:
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
[7]: https://app.datadoghq.com/security/configuration/code-security/settings