---
aliases:
- /es/developers/ide_integrations/vscode/
- /es/developers/ide_plugins/vscode/
description: Integra la telemetría e insights de Datadog en tu código fuente en VS
  Code y otros editores de código.
further_reading:
- link: /continuous_testing/
  tag: Documentación
  text: Aprende sobre Continuous Testing
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Aprende sobre la integración del código fuente
- link: /bits_ai/mcp_server/
  tag: Documentación
  text: Aprende sobre el Servidor del Protocolo de Contexto del Modelo (MCP) de Datadog
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reduce el cambio de contexto mientras solucionas problemas con los complementos
    de IDE de Datadog
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifica la depuración en producción con la Reproducción de Excepciones
    de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depura problemas de producción en vivo con la extensión Cursor de Datadog
is_beta: true
title: Extensión de Datadog para VS Code y Cursor
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov" %}}

<div class="alert alert-danger">
    La extensión de Datadog para Visual Studio Code no es compatible con el sitio de Datadog seleccionado <a href="/getting_started/site">sitio de Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Resumen {#overview}

La extensión de Datadog para VS Code y Cursor lleva Datadog a tu editor de código para acelerar tu desarrollo.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="Extensión de Datadog para VS Code y Cursor" style="width:100%;" >}}

La extensión incluye estas características:

-   [**Servidor del Protocolo de Contexto del Modelo (MCP)**](?tab=cursor#installation): Conecta el agente de IA del editor a la telemetría de producción, herramientas y contexto de Datadog.

-   [**Logs**](#logs): Evalúa los volúmenes de registros y realiza búsquedas en ellos desde tu código.

-   [**Perspectivas de Código**](#code-insights): Mantente informado sobre errores en tiempo de ejecución, vulnerabilidades y pruebas inestables sin salir del código.

-   [**Ver en IDE**](#view-in-ide): Salta directamente desde las referencias de código en Datadog a tus archivos fuente.

-   [**Code Security**](#code-security): Detecta y corrige problemas de seguridad antes de que hagas commit, y escribe reglas personalizadas.

-   [**Reproducción de Excepciones**](#exception-replay): Depura tu código de producción.

-   [**Fix in Chat**](?tab=cursor#fix-in-chat): Corrige errores de código, vulnerabilidades y pruebas inestables con sugerencias y explicaciones impulsadas por IA.

<div class="alert alert-info">A menos que se indique lo contrario, todas las funciones de extensión están disponibles tanto para VS Code como para cualquier otro IDE basado en forks de VS Code, como Cursor.</div>

## Requisitos {#requirements}

-   **Cuenta de Datadog**: La mayoría de las funciones requieren una cuenta de Datadog.

    -   ¿Nuevo en Datadog? [Aprende más][3] sobre las herramientas de monitoreo y seguridad de Datadog y regístrate para una prueba gratuita.
    -   Si tu organización utiliza un [subdominio personalizado][18] como `myorg.datadoghq.com`, debes indicarlo utilizando la configuración `datadog.connection.oauth.setup.domain` en el IDE.

-   **Git**: La extensión funciona mejor cuando Git está habilitado en el IDE. Asegúrate de que esto esté habilitado revisando la configuración `git.enabled`.

## Instalación {#installation}

Los pasos de instalación pueden variar para otros editores basados en VS Code.

{{< tabs >}}
{{% tab "VS Code" %}}
Instala la extensión directamente en el IDE o desde la web:

-   **En VS Code**: Abre la vista de Extensiones (`Shift` + `Cmd/Ctrl` + `X`), busca `datadog` y selecciona la extensión oficial de Datadog.

-   **Desde la web**: Instala desde la página de la extensión en [Visual Studio Marketplace][1].

### Configuración del Servidor MCP {#mcp-server-setup}

La extensión incluye acceso al [Servidor del Protocolo de Contexto del Modelo (MCP) de Datadog][3]. Asegúrate de que el Servidor MCP esté habilitado para mejorar las capacidades de IA del editor con tu entorno específico de Datadog:

1. Abre el panel de chat, selecciona el modo agente y haz clic en el botón **Configurar Herramientas**.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón Configurar Herramientas en VS Code" style="width:60%;" >}}

1. Encuentra el servidor y las herramientas de Datadog en la lista y marca las casillas para habilitarlas (expande o actualiza si es necesario).

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /es/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
Instala la extensión directamente en el IDE o desde la web:

-   **En Cursor**: Abre la vista de Extensiones (`Shift` + `Cmd/Ctrl` + `X`), busca `datadog` y selecciona la extensión oficial de Datadog.

-   **Desde la web**: Descarga el archivo VSIX desde [Open VSX Registry][2] e instálalo con `Extensions: Install from VSIX` en la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`).

### Configuración del Servidor MCP {#mcp-server-setup-1}

La extensión incluye acceso al [Servidor del Protocolo de Contexto del Modelo (MCP) de Datadog][3]. Asegúrate de que el Servidor MCP esté habilitado para mejorar las capacidades de IA del editor con tu entorno específico de Datadog:

1. Ve a **Configuración de Cursor** (`Shift` + `Cmd/Ctrl` + `J`) y selecciona la pestaña **MCP**.
1. Encuentra el servidor de Datadog y activa el interruptor para habilitarlo. Se muestra una lista de herramientas disponibles (expande o actualiza si es necesario).

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /es/bits_ai/mcp_server/

{{% /tab %}}
{{< /tabs >}}

## Características principales {#core-features}

### Registros {#logs}

Usa **Logs** para evaluar el volumen de registros generados por una línea específica en tu código. La extensión añade anotaciones sobre tu código para resaltar los patrones de registro detectados que coinciden con los registros en Datadog.

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="Vista previa de la Navegación de Registros" style="width:100%" video=true >}}

Descubre más en la subsección de [Registros][20].

### Perspectivas de Código {#code-insights}

**Perspectivas de Código** te mantienen informado con insights generados por Datadog relevantes para tu base de código, incluyendo errores en tiempo de ejecución, vulnerabilidades y pruebas inestables.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="La vista de Perspectivas de Código." style="width:100%;" >}}

Descubre más en la subsección de [Perspectivas de Código][21].

### Seguridad del Código {#code-security}

Las características de [**Code Security**][19] analizan tu código localmente contra reglas predefinidas para detectar y corregir problemas de seguridad y vulnerabilidades antes de que hagas commit.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa del Análisis Estático" style="width:100%" video=true >}}

Descubre más en la subsección de [Code Security][19].

### Reproducción de Excepciones {#exception-replay}

**Reproducción de Excepciones** te permite inspeccionar los marcos de la traza de pila de cualquier insight de Error Tracking y obtener información sobre los valores de las variables del código que se ejecuta en producción.

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="Vista previa de la Reproducción de Excepciones" style="width:100%" video=true >}}

Descubre más en la subsección de [Reproducción de Excepciones][22].

## Otras características {#other-features}

### Ver en IDE {#view-in-ide}

<div class="alert alert-info">Esta característica solo está disponible para VS Code y Cursor. Otros forks de VS Code no son compatibles.</div>

La característica **Ver en VS Code** o **Ver en Cursor** proporciona un enlace desde Datadog directamente a tus archivos fuente. Busque el botón junto a los marcos en las trazas de pila mostradas en la interfaz de usuario (por ejemplo, en [Seguimiento de Errores][5]):

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Una traza de pila en Datadog que muestra el botón Ver en VS Code" style="width:100%;" >}}

También puede usar esta característica para abrir sus archivos fuente desde una información (como un error del Seguimiento de Errores):

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Un problema de Seguimiento de Errores en Datadog que muestra el botón Ver en VS Code" style="width:100%;" >}}

<div class="alert alert-info">Para usar esta característica, primero configura <a href="/integrations/guide/source-code-integration/">la integración del código fuente</a> para tu servicio.</div>

### Fix in Chat {#fix-in-chat}

**Fix in Chat** aparece en varios contextos cuando la extensión identifica errores o problemas. Haz clic en el botón para generar un aviso de chat de IA que resuma el problema, incluya detalles y contexto relevantes, y proporcione instrucciones específicas para el agente.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Usando Fix en Chat para corregir un error de código en línea" style="width:100%" video=true >}}

## Datos y telemetría {#data-and-telemetry}

Datadog recopila cierta información sobre tu uso de este IDE, incluyendo cómo interactúas con él, si se producen errores al usarlo, qué los causó y los identificadores de usuario, de acuerdo con la [Política de Privacidad de Datadog][13] y el [EULA de la extensión de Datadog para VS Code][12]. Estos datos se utilizan para ayudar a mejorar el rendimiento y las características de la extensión, incluyendo las transiciones hacia y desde la extensión y la página de inicio de sesión de Datadog aplicable para acceder a los Servicios.

Si no deseas enviar estos datos a [Datadog][3], puedes desactivarlo en cualquier momento en la configuración de la extensión: `Datadog > Telemetry > Setup > Enable Telemetry` y seleccionar `disabled`.

<div class="alert alert-info">La extensión de Datadog también respeta la configuración de <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">telemetría de VS Code</a>.</div>

## Ayuda y comentarios {#help-and-feedback}

Para compartir sus comentarios, envíe un correo electrónico a [team-ide-integration@datadoghq.com][14] o cree un problema en el [repositorio público][15] de la extensión.

Consulta la sección de [issues][16] para conocer los problemas conocidos.

¿Utiliza [Cursor][17] o algún otro fork de VS Code? Encuentre la extensión en el [Open VSX Registry][2].

## Licencia {#license}

Lea el [Acuerdo de Licencia de Usuario Final][12] cuidadosamente antes de descargar o usar esta extensión.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: https://www.datadoghq.com/
[5]: /es/tracing/error_tracking/
[12]: https://www.datadoghq.com/legal/eula/
[13]: https://www.datadoghq.com/legal/privacy/
[14]: mailto:team-ide-integration@datadoghq.com
[15]: https://github.com/DataDog/datadog-for-vscode
[16]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[17]: https://www.cursor.com/
[18]: /es/account_management/multi_organization/#custom-sub-domains
[19]: /es/ide_plugins/vscode/code_security/
[20]: /es/ide_plugins/vscode/logs/
[21]: /es/ide_plugins/vscode/code_insights/
[22]: /es/ide_plugins/vscode/exception_replay/