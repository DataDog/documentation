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

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    La extensión de Datadog para Visual Studio no es compatible con tu <a href="/getting_started/site">sitio de Datadog seleccionado</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Información general

La extensión de Datadog para Visual Studio te ayuda a encontrar y corregir errores, problemas de seguridad y cuellos de botella de rendimiento basados en datos de observabilidad en tiempo real desde tus servicios y entornos de tiempo de ejecución.

{{< img src="/developers/ide_plugins/visual_studio/datadog-for-visual-studio.png" alt="Extensión de Datadog para Visual Studio">}}

### Code Insights

Mantente informado sobre problemas de [Error Tracking][5], [Security Vulnerabilities][6] y [Flaky Tests][10] sin salir de Visual Studio.

{{< img src="/developers/ide_plugins/visual_studio/code-insights.png" alt="La vista de Code Insights" >}}

### Continuous Profiler

Analiza y mejora el rendimiento de tus aplicaciones con métricas de perfilado en tiempo real para CPU, Memoria, E/S y otras.

{{< img src="/developers/ide_plugins/visual_studio/top-list.png" alt="La vista de Code Insights">}}

### Navegación de logs

Puedes navegar al [Log Explorer][18] en la plataforma de Datadog directamente desde tus archivos fuente de C#. Observa el ícono cliqueable antes de las cadenas de mensaje desde afirmaciones de log dentro de tu código fuente:

{{< img src="/developers/ide_plugins/visual_studio/logs-navigation.png" alt="Un archivo fuente que muestra líneas de log con íconos cliqueables." style="width:100%;" >}}

Al hacer clic en el ícono se abre el **Log Explorer** con una consulta que coincide lo más posible con el nombre del registrador, el nivel de log y mensaje de log.

### Abrir código en Visual Studio desde Datadog

Navega desde Datadog a tu código fuente con un clic.

{{< img src="/developers/ide_plugins/visual_studio/view-in-visual-studio.png" alt="Un stack trace en la plataforma de Datadog que muestra la vista en el botón Visual Studio.">}}

### Static Analysis

La extensión de Datadog ejecuta las reglas de [Static Analysis][19] en los archivos fuente que has abierto en tu solución. La meta es detectar y corregir problemas, como errores de mantenibilidad, errores o vulnerabilidad de seguridad en tu código antes de confirmar los cambios.

Static Analysis admite el escaneo para muchos lenguajes de programación. Para obtener una lista completa, consulta [Static Analysis Rules][20]. Para los tipos de archivos que pertenecen a los lenguajes compatibles, las violaciones de reglas se resaltan en el editor de código fuente y los cambios sugeridos se pueden aplicar directamente:

{{< img src="/developers/ide_plugins/visual_studio/static-analysis-issue.png" alt="Una violación de regla del análisis estático." style="width:100%;" >}}

Cuando comiences a editar un archivo fuente compatible con Static Analysis, la extensión comprueba `static-analysis.datadog.yml` en la raíz del repositorio fuente. El analizador estático se ejecuta automáticamente en segundo plano.

<div class="alert alert-info">La característica Static Analysis no requiere una cuenta de Datadog, ya que los archivos fuente se analizan localmente.</div>

## Empezando

### Requisitos

* Sistema operativo Windows de 64 bits
* Visual Studio 2022 edición Community, Professional o Enterprise de 64 bits
* Cuenta de Datadog con [Continuous Profiler][8] e [integración de código fuente][12] activados. Para obtener más información, consulta [Activación de Profiler][13].

### Configuración e instalación

1. Descarga e instala la extensión desde [Visual Studio Marketplace][17].
1. En Visual Studio, ve a **Tools > Options > Datadog** (Herramientas > Opciones > Datadog) para configurar la extensión.
1. Inicia sesión en Datadog haciendo clic en el icono del signo más (**+**). Los cambios no afectan a las conexiones existentes a Datadog.

Después de configurar esta extensión, abre una solución en Visual Studio. Puedes ir a **Extensions > Datadog > Code Insights** (Extensiones > Datadog > Code Insights) para ver Code Insights para la solución actual y el repositorio git. Para filtrar la información por servicio, ve a **Extensions > Datadog > Filter by Service** (Extensiones > Datadog > Filtrar por servicio) y selecciona uno o más servicios de tus entornos de ejecución.

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
[6]: /es/security/code_security/software_composition_analysis/
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