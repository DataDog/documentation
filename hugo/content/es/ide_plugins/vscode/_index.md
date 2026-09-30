---
aliases:
- /es/developers/ide_integrations/vscode/
- /es/developers/ide_plugins/vscode/
description: Integra la telemetría y perspectivas de Datadog en tu código fuente en
  VS Code y otros editores de código.
further_reading:
- link: /continuous_testing/
  tag: Documentación
  text: Aprende sobre Continuous Testing
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Aprende sobre la Integración de Código Fuente
- link: /bits_ai/mcp_server/
  tag: Documentación
  text: Aprende sobre el Servidor del Datadog Model Context Protocol (MCP)
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reduce el cambio de contexto mientras solucionas problemas con los complementos
    de IDE de Datadog
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifica la depuración en producción con Repetición de Excepciones de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depura problemas de producción en vivo con la extensión Cursor de Datadog
is_beta: true
title: Extensión de Datadog para VS Code y Cursor
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    La extensión de Datadog para Visual Studio Code no es compatible con tu <a href="/getting_started/site">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Resumen {#overview}

La extensión de Datadog para VS Code y Cursor lleva Datadog a tu editor de código para acelerar tu desarrollo.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="Extensión de Datadog para VS Code y Cursor" style="width:100%;" >}}

La extensión incluye estas características:

-   [**Servidor del Model Context Protocol (MCP)**](?tab=cursor#installation): Conecta el agente de IA del editor a la telemetría de producción, herramientas y contexto de Datadog.

-   [**Registros**](#logs): Mide los volúmenes de registro y busca registros desde tu código.

-   [**Perspectivas de Código**](#code-insights): Mantente informado sobre errores en tiempo de ejecución, vulnerabilidades y pruebas inestables sin salir del código.

-   [**Ver en IDE**](#view-in-ide): Salta directamente desde las referencias de código en Datadog a tus archivos fuente.

-   [**Code Security**](#code-security): Detecta y corrige problemas de seguridad antes de que realices el commit, y escribe reglas personalizadas.

-   [**Repetición de Excepciones**](#exception-replay): Depura tu código de producción.

-   [**Depurador en Vivo**](#live-debugger): Agrega puntos de registro no intrusivos a los servicios en ejecución para capturar datos en tiempo de ejecución sin necesidad de redeplegar.

-   [**Fix in Chat**](?tab=cursor#fix-in-chat): Corrige errores de código, vulnerabilidades y pruebas inestables con sugerencias y explicaciones impulsadas por IA.

<div class="alert alert-info">A menos que se indique lo contrario, todas las características de la extensión están disponibles tanto para VS Code como para cualquier otro IDE basado en forks de VS Code, como Cursor.</div>

## Requisitos {#requirements}

-   **Cuenta de Datadog**: La mayoría de las características requieren una cuenta de Datadog.

    -   ¿Nuevo en Datadog? [Aprende más][3] sobre las herramientas de monitoreo y seguridad de Datadog y regístrate para una prueba gratuita.
    -   Si tu organización utiliza un [subdominio personalizado][18] como `myorg.datadoghq.com`, debes indicarlo utilizando la configuración `datadog.connection.oauth.setup.domain` en el IDE.

-   **Git**: La extensión funciona mejor cuando Git está habilitado en el IDE. Asegúrate de que esto esté habilitado verificando la configuración `git.enabled`.

## Instalación {#installation}

Los pasos de instalación pueden variar para otros editores basados en VS Code.

{{< tabs >}}
{{% tab "VS Code" %}}
Instala la extensión directamente en el IDE o desde la web:

-   **En VS Code**: Abre la vista de Extensiones (`Shift` + `Cmd/Ctrl` + `X`), busca `datadog` y selecciona la extensión oficial de Datadog.

-   **Desde la web**: Instala desde la página de la extensión en [Visual Studio Marketplace][1].

### Configuración del Servidor MCP{#mcp-server-setup}

La extensión incluye acceso al [Servidor del Model Context Protocol (MCP)][3]. Asegúrate de que el Servidor del Model Context Protocol (MCP) esté habilitado para mejorar las capacidades de IA del editor con tu entorno específico de Datadog:

1. Abre el panel de chat, selecciona el modo agente y haz clic en el botón **Configurar Herramientas**.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón Configurar Herramientas en VS Code" style="width:60%;" >}}

1. Encuentra el servidor y las herramientas de Datadog en la lista y marca las casillas para habilitarlas (expande o actualiza si es necesario).

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /es/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
Instala la extensión directamente en el IDE o desde la web:

-   **En Cursor**: Abre la vista de Extensiones (`Shift` + `Cmd/Ctrl` + `X`), busca `datadog` y selecciona la extensión oficial de Datadog.

-   **Desde la web**: Descarga el archivo VSIX desde el [Registro de Open VSX][2] e instálalo con `Extensions: Install from VSIX` en la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`).

### Configuración del Servidor del Model Context Protocol (MCP) de Datadog {#datadog-mcp-server-setup}

Instala el Plugin de Datadog para habilitar el [Servidor del Model Context Protocol (MCP)][3]. Puedes instalar el plugin desde el [Mercado de Cursor][4] o en **Configuración de Cursor** > **Plugins**.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /es/bits_ai/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## Características principales {#core-features}

### Registros {#logs}

Usa **Registros** para MIDE el volumen de registros generados por una línea de registro en tu código. La extensión añade anotaciones sobre tu código para resaltar los patrones de registro que coinciden con los registros en Datadog.

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="Vista previa de la navegación de registros" style="width:100%" video=true >}}

Descubre más en la sub-sección de [Registros][20].

### Perspectivas de Código {#code-insights}

**Code insights** te mantienen informado con información generada por Datadog, relevante para tu base de código, incluyendo errores en tiempo de ejecución, vulnerabilidades y pruebas inestables.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="La vista de perspectivas de código." style="width:100%;" >}}

Descubre más en la sub-sección de [Perspectivas de Código][21].

### Code Security {#code-security}

Las características de [**Code Security**][19] analizan tu código localmente contra reglas predefinidas para detectar y corregir problemas de seguridad y vulnerabilidades antes de que realices cambios.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa del Análisis Estático" style="width:100%" video=true >}}

Descubre más en la sub-sección de [Code Security][19].

### Repetición de Excepciones {#exception-replay}

**La Repetición de Excepciones** te permite inspeccionar los marcos de la traza de pila de cualquier insight de Error Tracking y obtener información sobre los valores de las variables del código que se ejecuta en producción.

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="Vista previa de la Repetición de Excepciones" style="width:100%" video=true >}}

Descubre más en la sub-sección de [Repetición de Excepciones][22].

### Depurador en Vivo {#live-debugger}

El **Depurador en Vivo** te permite agregar puntos de registro—puntos de interrupción no rompientes y de expiración automática— a tus servicios en ejecución para capturar datos en tiempo de ejecución para depuración sin necesidad de volver a desplegar tu código.

{{< img src="/ide_plugins/vscode/live_debugger_overview.mp4" alt="Resumen de la actividad del Depurador en Vivo de Datadog" style="width:100%" video=true >}}

Descubre más en la sub-sección de [Live Debugger][23].

## Otras características {#other-features}

### Ver en IDE {#view-in-ide}

<div class="alert alert-info">Esta función solo está disponible para VS Code y Cursor. Otros forks de VS Code no son compatibles.</div>

La característica **Ver en VS Code** o **Ver en Cursor** proporciona un enlace desde Datadog directamente a tus archivos fuente. Busca el botón junto a los marcos en las trazas de pila que se muestran en la interfaz de usuario (por ejemplo, en [Error Tracking][5]):

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Una traza de pila en Datadog que muestra el botón Ver en VS Code" style="width:100%;" >}}

También puedes usar esta función para abrir tus archivos fuente desde un insight (como un error de Error Tracking):

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Un problema de Error Tracking en Datadog que muestra el botón Ver en VS Code" style="width:100%;" >}}

<div class="alert alert-info">Para usar esta función, primero configura <a href="/integrations/guide/source-code-integration/">la integración del código fuente</a> para tu servicio.</div>

### Fix in Chat {#fix-in-chat}

El botón **Fix in Chat** aparece en varios contextos cuando la extensión identifica errores o problemas. Haz clic en el botón para generar un aviso de chat de IA que resume el problema, incluye detalles y contexto relevantes, y proporciona instrucciones específicas para el agente.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Usando Fix in Chat para solucionar un error de código en línea" style="width:100%" video=true >}}

## Datos y telemetría {#data-and-telemetry}

Datadog recopila cierta información sobre tu uso de este IDE, incluyendo cómo interactúas con él, si se producen errores mientras lo usas, qué causó esos errores y los identificadores de usuario, de acuerdo con la [Datadog Privacy Policy][13] y el [VS Code extension EULA de Datadog][12]. Estos datos se utilizan para ayudar a mejorar el rendimiento y las características de la extensión, incluyendo transiciones hacia y desde la extensión y la página de inicio de sesión de Datadog aplicable para acceder a los Servicios.

Si no deseas enviar estos datos a [Datadog][3], puedes desactivarlo en cualquier momento en la configuración de la extensión: `Datadog > Telemetry > Setup > Enable Telemetry` y seleccionar `disabled`.

<div class="alert alert-info">La extensión de Datadog también respeta la configuración de <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">telemetría de VS Code</a>.</div>

## Ayuda y comentarios {#help-and-feedback}

Para compartir tus comentarios, envía un correo electrónico a [team-ide-integration@datadoghq.com][14] o crea un issue en el [repositorio público][15] de la extensión.

Revisa la sección de [issues][16] para descubrir problemas conocidos.

¿Usas [Cursor][17] o algún otro fork de VS Code? Encuentra la extensión en el [Open VSX Registry][2].

## Licencia {#license}

Lee cuidadosamente el [Acuerdo de Licencia de Usuario Final][12] antes de descargar o usar esta extensión.

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
[23]: /es/ide_plugins/vscode/live_debugger/