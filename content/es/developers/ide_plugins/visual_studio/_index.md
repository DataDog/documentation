---
aliases:
- /es/developers/ide_integrations/visual_studio/
further_reading:
- link: /getting_started/profiler/
  tag: Documentación
  text: Empezando con el Continuous Profiler
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Más información sobre la integración del código fuente
- link: /security/code_security/static_analysis
  tag: Documentación
  text: Más información sobre el análisis estático
- link: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
  tag: Sitio externo
  text: Visual Studio Marketplace
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reducir el cambio de contexto y solucionar problemas con plugins de entorno
    de desarrollo integrado de Datadog
is_beta: true
title: Extensión de Datadog para Visual Studio
---

## Información general

La extensión de Datadog para Visual Studio te ayuda a encontrar y corregir errores, problemas de seguridad y cuellos de botella en el rendimiento según los datos de observabilidad en tiempo real de tus servicios y entornos de ejecución.

{{< img src="/developers/ide_plugins/visual_studio/datadog-for-visual-studio.png" alt="Extensión de Datadog para Visual Studio">}}

### Información del código

Mantente informado sobre [Error Tracking][5], [Vulnerabilidades de seguridad][6] y [Flaky Tests][10] sin salir de Visual Studio.

{{< img src="/developers/ide_plugins/visual_studio/code-insights.png" alt="La vista Información de código" >}}

### Continuous Profiler

Analiza y mejora el rendimiento de tus aplicaciones con métricas de perfil en tiempo real para CPU, memoria, E/S y otros.

{{< img src="/developers/ide_plugins/visual_studio/top-list.png" alt="La vista Información del código">}}

### Navegación de logs

Puedes navegar al [Log Explorer][18] en la plataforma de Datadog directamente desde tus archivos fuente C#. Busca el icono clicable que precede a las cadenas de mensajes de las sentencias de log dentro de tu código fuente:

{{< img src="/developers/ide_plugins/visual_studio/logs-navigation.png" alt="Un archivo fuente que muestra líneas de log con íconos clicables." style="width:100%;" >}}

Al hacer clic en el icono se abre el **Log Explorer** con una consulta que coincide lo más posible con el nombre del registrador, el nivel de log y el mensaje de log.

### Abrir código en Visual Studio desde Datadog

Navega desde Datadog a tu código fuente con un solo clic.

{{< img src="/developers/ide_plugins/visual_studio/view-in-visual-studio.png" alt="Un stack trace en la plataforma de Datadog que muestra el botón Vista en Visual Studio.">}}

### Análisis estático

La extensión de Datadog ejecuta reglas de [Análisis estático][13] en los archivos fuente que tienes abiertos en tu solución. El objetivo es detectar y corregir problemas de mantenimiento, errores o vulnerabilidades de seguridad en el código antes de confirmar los cambios.

El análisis estático admite la exploración de muchos lenguajes de programación. Si deseas consultar la lista completa, consulta [Reglas del análisis estático][20]. Para los tipos de archivos pertenecientes a los lenguajes compatibles, las infracciones de las reglas se resaltan en el editor de código fuente, y las correcciones sugeridas se pueden aplicar directamente:

{{< img src="/developers/ide_plugins/visual_studio/static-analysis-issue.png" alt="Una infracción a una regla del análisis estático." style="width:100%;" >}}

Cuando empieces a editar un archivo fuente admitido por el Análisis estático, la extensión comprueba `static-analysis.datadog.yml` en la raíz de tu repositorio fuente. El analizador estático se ejecuta automáticamente en segundo plano.

<div class="alert alert-info">La función de Análisis estático no requiere una cuenta en Datadog, ya que los archivos fuente se analizan localmente.</div>

## Empezando

### Requisitos

* Sistema operativo Windows de 64 bits
* Visual Studio 2022 edición Community, Professional o Enterprise de 64 bits
* Cuenta de Datadog con [Continuous Profiler][8] e [integración de código fuente][12] activados. Para obtener más información, consulta [Activación de Profiler][13].

### Configuración e instalación

1. Descarga e instala la extensión desde el [Visual Studio Marketplace][17] oficial.
2. En Visual Studio, ve a **Tools > Options > Datadog** (Herramientas > Opciones > Datadog).
3. Inicia sesión con tu cuenta de Datadog, o [regístrate para una prueba gratuita][14].
4. Abre una solución en Visual Studio.
5. Ve a **Extensions > Datadog > Linked Services** (Extensiones > Datadog > Servicios vinculados).
6. Añade servicios y guarda tu solución.
7. Ve a **Tools > Options > Datadog** (Herramientas > Opciones > Datadog) y activa **Code Insights** (Información del código).
8. Inicia sesión en Datadog haciendo clic en el icono del signo más (**+**). Los cambios no afectan a las conexiones existentes a Datadog.

### Subdominios personalizados

Si tu organización utiliza un [subdominio personalizado][23], establece la URL personalizada como dirección del servidor de Datadog en la configuración de la extensión:
1. Haz clic en **Tools > Options > Datadog** (Herramientas > Opciones > Datadog).
1. Si estás editando una conexión existente a Datadog, cierra la sesión de la conexión antes de editar la dirección del servidor. Los cambios no afectan a las conexiones existentes.
1. En **Advanced** (Avanzado), establece tu URL personalizada como dirección del servidor de Datadog.
1. Haz clic en el icono más (**+**) para iniciar sesión.

## Comentarios

Informa de un error, solicita una nueva función o pide ayuda en el [Foro de debate][15] y el [Issue Tracker][16] de GitHub. También puedes enviar un correo electrónico a `team-ide-integration@datadoghq.com`.

## Datos y telemetría
Datadog recopila de forma anónima información sobre el uso que haces de este IDE, incluyendo cómo interactúas con él, si se han producido errores durante el uso y cuál ha sido la causa de dichos errores, de acuerdo con la [Política de privacidad de Datadog][21] y [EULA de Datadog][22].

Si no deseas enviar estos datos a Datadog, puedes excluirte en cualquier momento en los ajustes: `Options > Datadog > General > Data Sharing` y desactiva la opción `Send usage statistics`.

## Referencias adicionales

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /es/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: /es/tracing/error_tracking/
[6]: /es/security/application_security/vulnerability_management/
[8]: /es/profiler/
[10]: /es/continuous_integration/guides/flaky_test_management/
[12]: /es/integrations/guide/source-code-integration/
[13]: /es/profiler/enabling/dotnet/?tab=linux#enabling-the-profiler
[14]: https://www.datadoghq.com/lpg/
[15]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[16]: https://github.com/DataDog/datadog-for-visual-studio/issues
[17]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[18]: /es/logs/explorer/
[19]: /es/security/code_security/static_analysis/
[20]: /es/security/code_security/static_analysis/static_analysis_rules/
[21]: https://www.datadoghq.com/legal/privacy/
[22]: https://www.datadoghq.com/legal/eula/
[23]: /es/account_management/multi_organization/#custom-sub-domains