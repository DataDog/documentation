---
aliases:
- /es/static_analysis/github_pull_requests
description: Aprende a utilizar Code Analysis en solicitudes pull de GitHub.
further_reading:
- link: /integrations/github/
  tag: Documentación
  text: Más información sobre la integración GitHub
- link: /code_analysis/
  tag: Documentación
  text: Más información sobre Code Analysis
title: Solicitudes pull de GitHub
---

## Información general

Code Analysis se integra con las solicitudes pull de GitHub de dos maneras:
- [Comentarios en solicitudes pull para señalar infracciones](#enable-code-analysis-pr-comments-for-your-repositories): Durante las revisiones de código en GitHub, Datadog puede automáticamente comprobar infracciones de Static Analysis en solicitudes pull de repositorios que tienen al menos un conjunto de reglas aplicado. Las infracciones se señalan con un comentario de revisión en línea en la(s) línea(s) de código pertinente(s), junto con sugerencias de corrección (cuando corresponde) que pueden aplicarse directamente en la solicitud pull. Esta opción sólo está disponible para Static Analysis (SAST).
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Ejemplo de comentario de Code Analysis en una solicitud pull" style="width:90%;" >}}

- [Apertura de una solicitud pull para solucionar un problema directamente desde Datadog](#fixing-a-vulnerability-directly-from-Datadog): Puedes crear una solicitud pull desde la interfaz de usuario para solucionar una vulnerabilidad de seguridad o un problema de calidad de código basándote en el método de reparación de código sugerido por Datadog. Esta opción sólo está disponible para Static Analysis (SAST).
{{< img src="ci/sast_one_click_light.png" alt="Ejemplo de reparación en un clic para Code Analysis" style="width:90%;" >}}

Para activar estas funciones, asegúrate de que tienes los permisos de GitHub necesarios (lectura y escritura) para tu repositorio.

## Configurar Code Analysis para solicitudes pull de GitHub

### Activar Datadog Code Analysis

Para utilizar Datadog Code Analysis, añade los archivos de configuración adecuados a tu repositorio, tal y como se describe en las [instrucciones de configuración][1].

### Configuración de una aplicación de GitHub

Para utilizar Code Analysis en GitHub, puedes realizar una de las siguientes acciones:

- Crear una aplicación GitHub en Datadog.
- Actualizar una aplicación GitHub existente, si ya creaste una en Datadog.

Los permisos que concedes a la aplicación GitHub determinan qué funciones de la [integración GitHub][2] están disponibles para la configuración.

#### Crear e instalar una aplicación GitHub

1. En Datadog, ve a [**Integraciones** > **Aplicaciones GitHub** > **Añadir una nueva aplicación GitHub**][3].
1. Rellena los datos necesarios, como el nombre de la organización GitHub.
1. En **Seleccionar funciones**, marca la casilla **Code Analysis: Comentarios de revisión de solicitudes pull**.
1. En **Editar permisos**, comprueba que el permiso **Solicitudes pull** está configurado para **Lectura y escritura**.
1. Haz clic en **Create App in GitHub** (Crear aplicación en GitHub).
1. Introduce un nombre para tu aplicación y envíalo.
1. Haz clic en **Install GitHub App** (Instalar aplicación GitHub).
1. Elige en qué repositorios debe instalarse la aplicación y luego haz clic en **Install & Authorize** (Instalar y autorizar).

{{< img src="ci/static-analysis-install-github-app.png" alt="Pantalla de instalación de la aplicación GitHub" style="width:50%;" >}}

#### Actualizar una aplicación GitHub existente

1. En Datadog, ve a [**Integraciones > Aplicaciones GitHub**][5] y busca la aplicación GitHub que quieres utilizar para Code Analysis.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Ejemplo de comentario de Static Analysis en una solicitud pull" style="width:90%;" >}}
1. En la pestaña **Funciones**, consulta la sección **Code Analysis: Comentarios en solicitudes pull** para determinar si tu aplicación GitHub necesita permisos adicionales. Si es así, haz clic en **Update permissions in GitHub** (Actualizar permisos en GitHub) para editar los parámetros de la aplicación.
1. En **Permisos de repositorio**, configura el acceso a **Solicitudes pull** como **Lectura y escritura**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Desplegable correspondiente al permiso de lectura y escritura en solicitudes pull" style="width:90%;" >}}
1. Bajo el título **Suscribirse a eventos**, marca la casilla **Solicitud pull**.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="Casilla correspondiente al permiso para comentarios de revisión en solicitudes pull" style="width:90%;" >}}

### Habilitar comentarios de Code Analysis en solicitudes pull para tus repositorios

1. En Datadog, ve a [**Parámetros de CI** > **Parámetros de Code Analysis**][4].
1. Haz clic en el interruptor junto a un repositorio dado para activar **Comentarios de GitHub**. En el siguiente ejemplo, los comentarios están habilitados para el repositorio `demo-static-analysis-gates`.

{{< img src="ci/static-analysis-github-comments.png" alt="Ejemplo de comentario de Code Analysis en una solicitud pull" style="width:100%;" >}}

**Nota:** Si utilizas [GitHub Actions][6] para ejecutar tus análisis, activa la acción en `push` para que aparezcan los comentarios.

### Solucionar una vulnerabilidad directamente desde Datadog 

Si el permiso para **Solicitudes pull** de tu aplicación GitHub está configurado para **Lectura y escritura**, la corrección en un clic se habilita para todas las detecciones de Static Analysis con una solución sugerida disponible.

Sigue estos pasos para corregir una vulnerabilidad y abrir una solicitud pull:
1. Visualiza un resultado específico en Code Analysis.
2. Haz clic en **Fix Violation** (Corregir infracción) en el panel lateral del resultado. 
3. Selecciona **Abrir una solicitud pull**.
4. Introduce el título de la solicitud y el mensaje de confirmación.
5. Haz clic en **Create PR** (Crear solicitud pull).

También puedes corregir una vulnerabilidad confirmándola directamente en la rama en la que se encontró el resultado.

Para confirmar una corrección sugerida:

1. Visualiza un resultado específico en Code Analysis.
2. Haz clic en ***Fix Violation** (Solucionar infracción) en el panel lateral del resultado.
3. Haz clic en **Commit to current branch** (Confirmar en la rama actual).

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/code_analysis#setup
[2]: /es/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /es/code_analysis/static_analysis/github_actions/