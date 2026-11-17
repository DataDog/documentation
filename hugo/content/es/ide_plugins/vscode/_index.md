---
aliases:
- /es/developers/ide_integrations/vscode/
- /es/developers/ide_plugins/vscode/
- /es/ide_plugins/vscode/logs/
description: Integre la telemetría y la información útil de Datadog en su código fuente
  en VS Code y otros editores de código.
further_reading:
- link: /continuous_testing/
  tag: Documentación
  text: Obtenga información sobre Continuous Testing
- link: /integrations/guide/source-code-integration/
  tag: Documentación
  text: Obtenga información sobre la integración de código fuente
- link: /mcp_server/
  tag: Documentación
  text: Obtenga información sobre Datadog MCP Server
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Reduzca el cambio de contexto mientras soluciona problemas con los complementos
    de IDE de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Depure problemas de producción en vivo con la extensión de Datadog para Cursor
is_beta: true
title: Datadog Extension for VS Code & Cursor
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

## Descripción general {#overview}

La extensión de Datadog para VS Code y Cursor lleva Datadog a su editor de código para acelerar su desarrollo.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="Extensión de Datadog para VS Code y Cursor" style="width:100%;" >}}

La extensión incluye estas funciones:

- [**Code Security**](#code-security): Detecte y solucione problemas de seguridad antes de realizar una confirmación (commit) y escriba reglas personalizadas.

- [**Code Insights**](#code-insights): Manténgase informado sobre las vulnerabilidades del código y de las bibliotecas sin salir del código.

- [**View in IDE**](#view-in-ide): Salte directamente desde las referencias de código en Datadog a sus archivos fuente.

- [**Fix in Chat**](?tab=cursor#fix-in-chat): Corrija errores de código, vulnerabilidades y pruebas inestables con sugerencias y explicaciones basadas en IA.

<div class="alert alert-info">A menos que se indique lo contrario, todas las funciones de la extensión están disponibles tanto para VS Code como para cualquier otro IDE basado en bifurcaciones de VS Code, como Cursor.</div>

## Requisitos {#requirements}

- **Cuenta de Datadog**: La mayoría de las funciones requieren una cuenta de Datadog.
    - ¿Es nuevo en Datadog? [Obtenga más información][3] sobre las herramientas de monitoreo y seguridad de Datadog y regístrese para una prueba gratuita.
    - Si su organización utiliza un [subdominio personalizado][18] como `myorg.datadoghq.com`, debe indicarlo mediante la configuración `datadog.connection.oauth.setup.domain` en el IDE.

- **Git**: La extensión funciona mejor cuando Git está habilitado en el IDE. Confirme que la configuración `git.enabled` esté activada.

## Instalación {#installation}

Los pasos de instalación pueden variar para otros editores basados en VS Code.

{{< tabs >}}
{{% tab "VS Code" %}}
Instale la extensión directamente en el IDE o desde la web:

- **En VS Code**: Abra la vista Extensions (`Shift` + `Cmd/Ctrl` + `X`), busque `datadog` y seleccione la extensión oficial de Datadog.

- **Desde la web**: Instale desde la página de la extensión en [Visual Studio Marketplace][1].

### Configuración del Datadog MCP Server {#datadog-mcp-server-setup}

Inicie sesión en Datadog usando la extensión y ejecute el comando `Datadog: Open MCP Configuration Assistant`. Siga las indicaciones para configurar el [Datadog MCP Server][3].

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /es/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
Instale la extensión directamente en el IDE o desde la web:

- **En Cursor**: abra la vista Extensions (`Shift` + `Cmd/Ctrl` + `X`), busque `datadog` y seleccione la extensión oficial de Datadog.

- **Desde la web**: descargue el archivo VSIX desde [Open VSX Registry][2] e instálelo con `Extensions: Install from VSIX` en la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`).

### Configuración del Datadog MCP Server {#datadog-mcp-server-setup-1}

Instale el Datadog Plugin para habilitar el [Datadog MCP Server][3]. Puede instalar el plugin desde [Cursor Marketplace][4] o en **Cursor Settings** > **Plugins**.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /es/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## Características principales {#core-features}

### Code Security {#code-security}

Las características de [**Code Security**][19] analizan su código localmente frente a reglas predefinidas para detectar y corregir problemas de seguridad y vulnerabilidades antes de confirmar los cambios.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Vista previa de Static Code Analysis" style="width:100%" video=true >}}

Obtenga más información en la subsección [Code Security][19].

### Code Insights {#code-insights}

**Code Insights** lo mantiene informado sobre las vulnerabilidades de código y bibliotecas relevantes para su base de código.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="La vista de Code Insights." style="width:100%;" >}}

Obtenga más información en la subsección [Code Insights][21].

### View in IDE {#view-in-ide}

<div class="alert alert-info">Esta función solo está disponible para VS Code y Cursor. Otras bifurcaciones de VS Code no son compatibles.</div>

La función **View in VS Code** o **View in Cursor** proporciona un enlace desde Datadog directamente a sus archivos de código fuente. Busque el botón junto a las entradas de las trazas de pila que se muestran en la interfaz de usuario (por ejemplo, en [Error Tracking][5]):

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Una traza de pila en Datadog que muestra el botón View in VS Code" style="width:100%;" >}}

También puede usar esta función para abrir sus archivos de código fuente desde un hallazgo (como un error de Error Tracking):

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Un problema de Error Tracking en Datadog que muestra el botón View in VS Code" style="width:100%;" >}}

<div class="alert alert-info">Para usar esta función, primero configure la <a href="/integrations/guide/source-code-integration/">integración de código fuente</a> para su servicio.</div>

### Fix in Chat {#fix-in-chat}

El botón **Fix in Chat** aparece en varios contextos cuando la extensión identifica errores o problemas. Haga clic en el botón para generar un mensaje de chat de IA que resuma el problema, incluya detalles y contexto relevantes, y proporcione instrucciones específicas para el agente.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Uso de Fix in Chat para solucionar un error de código en línea" style="width:100%" video=true >}}

La extensión también maneja el {{< ui >}}Fix with Cursor{{< /ui >}} enlace profundo utilizado en Code Security. Cuando hace clic en {{< ui >}}Fix with Cursor{{< /ui >}} en la interfaz de usuario de Datadog o en un comentario de solicitud de extracción, la extensión abre el espacio de trabajo en Cursor. Luego, cambia al repositorio, la rama y la confirmación relevantes, y carga un mensaje de remediación personalizado para el hallazgo.

## Datos y telemetría {#data-and-telemetry}

Datadog recopila información sobre su uso de este IDE. Esto incluye cómo interactúa con él, si ocurrieron errores, qué causó esos errores e identificadores de usuario. La recopilación sigue la [Política de privacidad de Datadog][13] y el [EULA de la extensión de VS Code][12] de Datadog. Datadog utiliza estos datos para mejorar el rendimiento y las funciones de la extensión. También cubre los movimientos entre la extensión y la página de inicio de sesión de Datadog.

Si no desea enviar estos datos a [Datadog][3], puede desactivar la recopilación en cualquier momento en la configuración de la extensión: `Datadog > Telemetry > Setup > Enable Telemetry` y seleccione `disabled`.

<div class="alert alert-info">La extensión de Datadog también respeta la configuración de <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">telemetría de VS Code</a>.</div>

## Ayuda y comentarios {#help-and-feedback}

Para compartir sus comentarios, envíe un correo electrónico a [team-ide-integration@datadoghq.com][14] o cree un problema en el [repositorio público][15] de la extensión.

Verifique la sección de [problemas][16] para descubrir los problemas conocidos.

¿Utiliza [Cursor][17] u otra bifurcación de VS Code? Encuentre la extensión en el [Open VSX Registry][2].

## Licencia {#license}

Lea atentamente el [Acuerdo de licencia de usuario final][12] antes de descargar o utilizar esta extensión.

## Lecturas adicionales {#further-reading}

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
[21]: /es/ide_plugins/vscode/code_insights/