---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
description: Aprende a conectar tu agente de IA al Servidor MCP de Datadog.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentation
  text: Servidor MCP de Datadog
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Herramientas del Servidor MCP de Datadog
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extensión de Datadog para Cursor
title: Configura el Servidor MCP de Datadog
---
Aprende a instalar y configurar el Servidor MCP de Datadog, que te permite recuperar información de telemetría y gestionar las características de la plataforma directamente desde clientes impulsados por IA. Selecciona tu cliente:

{{< tabs >}}
{{% tab "Cursor" %}}

La [extensión de Cursor y VS Code de Datadog][1] incluye acceso integrado al Servidor MCP de Datadog gestionado.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instala la extensión (omite `--profile` y el nombre del perfil para instalar en el perfil predeterminado de Cursor):
    ```shell
    cursor --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativamente, instala la [extensión de Datadog][2]. Si ya tienes la extensión instalada, asegúrate de que sea la última versión.
1. Inicia sesión en tu cuenta de Datadog.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Inicia sesión en Datadog desde la extensión del IDE" style="width:70%;" >}}
1. **Reinicia el IDE.**
1. Confirma que el Servidor MCP de Datadog está disponible y que las [herramientas][3] están listadas: Ve a {{< ui >}}Configuraciones de Cursor{{< /ui >}} (`Shift` + `Cmd/Ctrl` + `J`), selecciona el {{< ui >}}Herramientas y MCP{{< /ui >}} pestaña y expande la lista de herramientas de la extensión.
1. Si previamente instalaste el Servidor MCP de Datadog manualmente, elimínalo de la configuración del IDE para evitar conflictos.
1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[2]: /es/ide_plugins/vscode/?tab=cursor#installation
[3]: /es/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: /es/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Claude Code" %}}

Dirige tu agente de IA al punto de conexión del Servidor MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecuta en la terminal:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agrega a `~/.claude.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, usa <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}

<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Conecta Claude (incluyendo Claude Cowork) al Servidor MCP de Datadog añadiéndolo como un {{< ui >}}conector personalizado{{< /ui >}} con la URL remota de MCP.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1.Sigue la guía del centro de ayuda de Claude sobre [conectores personalizados][1] para agregar un nuevo conector personalizado.

1. Cuando se te pida una URL, ingresa el punto de conexión del Servidor MCP de Datadog para su [sitio de Datadog][2] ({{< region-param key="dd_site_name" >}}). Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Para habilitar las [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de Observabilidad APM y LLM (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Completa el flujo de inicio de sesión de OAuth cuando se te solicite.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con tu <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Dirige tu agente de IA al punto de conexión del Servidor MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edita `~/.codex/config.toml` (o tu archivo de configuración de Codex CLI) para agregar el Servidor MCP de Datadog con transporte HTTP y la URL del punto de conexión para tu sitio. Por ejemplo:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Para habilitar las [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de Observabilidad APM y LLM (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Inicia sesión en el Servidor MCP de Datadog:

   ```shell
   codex mcp login datadog
   ```

   Esto abre tu navegador para completar el flujo de OAuth. Codex almacena las credenciales resultantes para que no necesites iniciar sesión nuevamente hasta que el token expire.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirige tu agente de IA al punto de conexión del Servidor MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, usa el selector **Sitio de Datadog** en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecuta en la terminal:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agrega a `~/.gemini/settings.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, usa <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] es un terminal con capacidades de agente y soporte MCP integrado. Apunta el agente Warp al punto de conexión del Servidor MCP de Datadog para tu sitio regional de [Datadog][2]. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. En la aplicación Warp, ve a {{< ui >}}Configuraciones{{< /ui >}} > {{< ui >}}Servidores MCP{{< /ui >}} y haz clic en {{< ui >}}+ Agregar{{< /ui >}}.

1. Pega la siguiente configuración:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haz clic {{< ui >}}Iniciar{{< /ui >}} en el servidor Datadog. Warp abre tu navegador para completar el flujo de inicio de sesión OAuth. Las credenciales se almacenan de forma segura en tu dispositivo y se reutilizan para futuras sesiones.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "VS Code" %}}

La [extensión de Cursor y VS Code de Datadog][1] incluye acceso integrado al Servidor MCP de Datadog gestionado.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instala la extensión (omite `--profile` y el nombre del perfil para instalar en el perfil predeterminado de VS Code):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativamente, instala la [extensión de Datadog][2]. Si ya tienes la extensión instalada, asegúrate de que sea la última versión.
1. Inicia sesión en tu cuenta de Datadog.
1. **Reinicia el IDE.**
1. Confirma que el servidor Datadog MCP está disponible y que las [herramientas][3] están listadas: Abre el panel de chat, selecciona el modo agente y haz clic en el {{< ui >}}Configura las herramientas{{< /ui >}} botón.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón de configurar herramientas en VS Code" style="width:70%;" >}}
1. Si previamente instalaste el Servidor MCP de Datadog manualmente, elimínalo de la configuración del IDE para evitar conflictos. Abre la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`) y ejecuta `MCP: Open User Configuration`.
1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[2]: /es/ide_plugins/vscode/?tab=vscode#installation
[3]: /es/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: /es/ide_plugins/vscode/
{{% /tab %}}

{{% tab "IDEs de JetBrains" %}}

JetBrains ofrece los plugins [Junie][1] y [Asistente de IA][2] para su gama de IDEs. GitHub ofrece el plugin [Copilot][4]. Alternativamente, muchos desarrolladores utilizan un CLI de agente, como Claude Code, Codex o Gemini CLI, junto con su IDE.

Dirige tu plugin al punto de conexión del servidor MCP para tu [sitio de Datadog][3] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Ve a {{< ui >}}Herramientas{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings -> Configuración de MCP{{< /ui >}} y agrega el siguiente bloque:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para los clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Se te solicita iniciar sesión a través de OAuth. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="Asistente de IA de JetBrains" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Ve a {{< ui >}}Herramientas{{< /ui >}} > {{< ui >}}Asistente de IA{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agrega el siguiente bloque:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
          "headers": {
            "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
            "DD_APPLICATION_KEY": "&lt;YOUR_APP_KEY&gt;"
          }
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para los clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Ve a {{< ui >}}Herramientas{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agrega el siguiente bloque:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para los clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haz clic en el elemento `Start` que aparece en el editor para iniciar el servidor. Se te solicita que inicies sesión a través de OAuth.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="CLIs de agente" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Muchos desarrolladores utilizan un CLI de agente como Claude Code, Codex o Gemini CLI junto con su IDE de JetBrains. Vea la configuración para esas herramientas CLI:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

El [plugin de Datadog para IDEs de JetBrains][3] se integra con estos CLIs de agente. Para una experiencia ininterrumpida, instala el plugin al mismo tiempo que configuras el Servidor MCP de Datadog.

[3]: /es/ide_plugins/idea/
[4]: /es/bits_ai/mcp_server/setup/?tab=claudecode
[5]: /es/bits_ai/mcp_server/setup/?tab=codex
[6]: /es/bits_ai/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /es/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirige tu agente de IA al punto de conexión del Servidor MCP de Datadog para tu [sitio de Datadog][3] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agrega lo siguiente a tu [archivo de configuración de Kiro MCP][2] (`~/.kiro/settings/mcp.json` para configuración específica del usuario):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y LLM Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para los clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ("{{< region-param key="dd_site_name" >}}").</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Otros" %}}

Para la mayoría de los otros [clientes soportados](#supported-clients), usa estas instrucciones para la autenticación remota. Para Cline o cuando la autenticación remota no es confiable o no está disponible, usa [autenticación binaria local](#local-binary-authentication).

Dirige tu agente de IA al punto de conexión del Servidor MCP de Datadog para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Sitio de Datadog{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agrega el Servidor MCP de Datadog al archivo de configuración de tu cliente utilizando el transporte HTTP y la URL del punto de conexión de tu sitio. Por ejemplo:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _ solo _ herramientas APM y LLM Observability (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Conjuntos de herramientas {#toolsets}

El servidor Datadog MCP soporta _conjuntos de herramientas_, que le permiten usar solo las [herramientas MCP][49] que necesita, ahorrando valioso espacio en la ventana de contexto. Para usar un conjunto de herramientas, incluya el `toolsets` parámetro de consulta en la URL del endpoint al conectarse al servidor MCP ([solo autenticación remota](#authentication)). Utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles a la vez.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, según el [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

- Recupere solo las herramientas básicas (este es el valor predeterminado si no se especifica `toolsets`):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Recupere solo herramientas relacionadas con Synthetic Testing:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Recupere herramientas básicas, de Synthetic Testing y de entrega de software:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Recupere todas las herramientas generalmente disponibles:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Habilitar todos los conjuntos de herramientas aumenta el número de definiciones de herramientas enviadas a su cliente de IA, lo que consume espacio en la ventana de contexto. <code>toolsets=all</code> funciona mejor con clientes que soportan filtrado de herramientas, como Claude Code.</div>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Conjuntos de herramientas disponibles {#available-toolsets}

Estos conjuntos de herramientas están generalmente disponibles. Consulte [Herramientas del Servidor MCP de Datadog][49] para una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de solicitudes.

- `core`: El conjunto de herramientas predeterminado para registros, métricas, trazas, tableros, monitores, incidentes, hosts, servicios, eventos y cuadernos
- `alerting`: Herramientas para validar y crear monitores, buscar grupos de monitores, recuperar plantillas de monitores, analizar la cobertura de monitores y buscar SLOs
- `cases`: Herramientas para [Gestión de Casos][42], incluyendo la creación, búsqueda y actualización de casos; gestión de proyectos; y vinculación de problemas de Jira
- `dashboards`: Herramientas para recuperar, crear, actualizar y eliminar [tableros][46], además de referencia y validación de esquemas de widgets
- `dbm`: Herramientas para interactuar con [Database Monitoring][33]
- `ddsql`: Herramientas para consultar datos de Datadog usando [DDSQL][44], un dialecto SQL con soporte para recursos de infraestructura, registros, métricas, RUM, tramos y otras fuentes de datos de Datadog
- `error-tracking`: Herramientas para interactuar con Datadog [Error Tracking][32]
- `feature-flags`: Herramientas para gestionar [feature flags][35], incluyendo la creación, listado y actualización de banderas y sus entornos
- `llmobs`: Herramientas para buscar y analizar tramos y experimentos de [LLM Observability][36]
- `networks`: Herramientas para análisis de [Cloud Network Monitoring][37] y [Network Device Monitoring][38]
- `onboarding`: Herramientas de incorporación agentic para la configuración y puesta en marcha guiada de Datadog
- `product-analytics`: Herramientas para interactuar con consultas de [Product Analytics][41]
- `reference-tables`: Herramientas para gestionar [Tablas de Referencia][48], incluyendo el listado de tablas, lectura de filas, adición de filas y creación de tablas desde almacenamiento en la nube
- `security`: Herramientas para escaneo de seguridad de código y búsqueda de [señales de seguridad][39] y [hallazgos de seguridad][40]
- `software-delivery`: Herramientas para interactuar con Software Delivery ([CI Visibility][30] y [Test Optimization][31])
- `synthetics`: Herramientas para interactuar con Datadog [pruebas Synthetic][29]
- `workflows`: Herramientas para [Workflow Automation][43], incluyendo listar, inspeccionar, ejecutar y configurar flujos de trabajo para uso de agente

### Conjuntos de herramientas en Preview {#preview-toolsets}

Estos conjuntos de herramientas están en Preview. Regístrese para un conjunto de herramientas completando el formulario de Product Preview o contacte a [Datadog support][47] para solicitar acceso.
- `apm`: ([Regístrate][45]) Herramientas para análisis de traza [APM][34], búsqueda de tramos, insights de Watchdog e investigación de rendimiento

## Clientes compatibles {#supported-clients}

| Cliente | Desarrollador | Notas |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor y extensión de VS Code][15] recomendado. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Utilice [ configuración de conector personalizado](?tab=claude#installation). Incluye Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor y la extensión de VS Code][16] recomendado. |
| [JetBrains IDEs][18] | JetBrains | [plugin de Datadog][18] recomendado. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8], [Cline][11] | Varios | Consulte la {{< ui >}}Otro{{< /ui >}} la pestaña de arriba. Utilice la autenticación binaria local para Cline si la autenticación remota no es confiable. |

<div class="alert alert-info">El servidor MCP de Datadog está en pleno desarrollo, y podrían estar disponibles clientes adicionales.</div>

## Permisos requeridos {#required-permissions}

Las herramientas del servidor MCP requieren los siguientes [permisos de rol de usuario de Datadog][22]:

| Permiso | Requerido para |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Herramientas que leen datos de Datadog (por ejemplo, consultar monitores, buscar registros, recuperar tableros) |
| <code style="white-space:nowrap">mcp_write</code> | Herramientas que crean o modifican recursos en Datadog (por ejemplo, crear monitores, silenciar hosts) |

Además de `mcp_read` o `mcp_write`, los usuarios necesitan los permisos estándar de Datadog para el recurso subyacente. Por ejemplo, usar una herramienta MCP que lee monitores requiere tanto `mcp_read` como el permiso [Monitors Read][24]. Consulte [Permisos de Rol de Datadog][25] para la lista completa de permisos a nivel de recurso.

Los usuarios con el **Rol Estándar de Datadog** tienen ambos permisos del servidor MCP por defecto. Si su organización utiliza [roles personalizados][23], agregue los permisos manualmente:
1. Vaya a [**Configuración de la Organización > Roles**][26] como administrador, y haga clic en el rol que desea actualizar.
1. Haga clic {{< ui >}}Editar rol{{< /ui >}} (ícono de lápiz).
1. En la lista de permisos, seleccione el {{< ui >}}MCP Read{{< /ui >}} y {{< ui >}}MCP Write{{< /ui >}} casillas de verificación.
1. Seleccione cualquier otro permiso a nivel de recurso que necesite para el rol.
1. Haga clic {{< ui >}}Guardar{{< /ui >}}.

Los administradores de la organización pueden gestionar el acceso global de MCP y las capacidades de escritura desde [Configuración de la Organización][27].

## Autenticación {#authentication}

El servidor MCP utiliza OAuth 2.0 para [autenticación][14]. Si no puede pasar por el flujo de OAuth (por ejemplo, en un servidor), puede proporcionar una clave de API de Datadog [y clave de aplicación][1] como `DD_API_KEY` y `DD_APPLICATION_KEY` encabezados HTTP.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, según el [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
          "DD_APPLICATION_KEY": "&lt;YOUR_APPLICATION_KEY&gt;"
      }
    }
  }
}
</code></pre>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

Por seguridad, utiliza una clave de API y una clave de aplicación con contexto limitado de una [cuenta de servicio][13] que tenga solo los permisos requeridos.

### Autenticación binaria local {#local-binary-authentication}

Se recomienda la autenticación local para Cline y cuando la autenticación remota no es confiable o no está disponible. Después de la instalación, normalmente no necesitas actualizar el binario local para beneficiarte de las actualizaciones del servidor MCP, ya que las herramientas son remotas.

{{% collapse-content title="Configura el binario local del servidor MCP de Datadog" level="h5" expanded=false id="mcp-local-binary" %}}

1. Instala el binario del servidor MCP de Datadog (macOS y Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Esto instala el binario en `~/.local/bin/datadog_mcp_cli`.

   Para Windows, descarga la [versión para Windows][20].

2. Ejecuta `datadog_mcp_cli login` manualmente para seguir el flujo de inicio de sesión de OAuth y elige un [sitio de Datadog][21].

3. Configura tu cliente de IA para usar el transporte stdio con `datadog_mcp_cli` como el comando. Por ejemplo, en macOS (reemplaza `<USERNAME>` con tu nombre de usuario del sistema operativo):
   ```json
   {
     "mcpServers": {
       "datadog": {
         "type": "stdio",
         "command": "/Users/<USERNAME>/.local/bin/datadog_mcp_cli",
         "args": [],
         "env": {}
       }
     }
   }
   ```

   Para otros sistemas operativos, reemplaza la ruta `command` con la ubicación del binario descargado:
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip"> Para Claude Code, puedes ejecutar en su lugar: 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Reinicia completamente tu cliente de IA para aplicar la configuración y cargar el servidor MCP.
{{% /collapse-content %}}

## Prueba el acceso al servidor MCP {#test-access-to-the-mcp-server}

1. Instala el [inspector de MCP][2], una herramienta para desarrolladores para probar y depurar servidores MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. En la interfaz web del inspector, para {{< ui >}}Tipo de Transporte{{< /ui >}}, selecciona {{< ui >}}HTTP transmitible{{< /ui >}}.
3. Para {{< ui >}}URL{{< /ui >}}, ingrese el punto de conexión del servidor MCP para su sitio regional de Datadog. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   Por ejemplo, para {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Haz clic {{< ui >}}Conectar{{< /ui >}}, luego ve a {{< ui >}}Herramientas{{< /ui >}} > {{< ui >}}Lista de herramientas{{< /ui >}}.
5. Verifica si las [herramientas disponibles][12] aparecen.

## Lectura adicional {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /es/account_management/api-app-keys/
[2]: https://github.com/modelcontextprotocol/inspector
[3]: https://cursor.com
[4]: https://claude.com/product/claude-code
[5]: https://claude.com/download
[6]: https://chatgpt.com/codex
[7]: https://code.visualstudio.com/
[8]: https://github.com/block/goose
[9]: https://kiro.dev/
[10]: https://kiro.dev/cli/
[11]: https://cline.bot/
[12]: /es/bits_ai/mcp_server/tools
[13]: /es/account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: /es/ide_plugins/vscode/?tab=cursor
[16]: /es/ide_plugins/vscode/
[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
[18]: /es/ide_plugins/idea/
[19]: https://claude.ai
[20]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[21]: /es/getting_started/site/
[22]: /es/account_management/rbac/permissions/#mcp
[23]: /es/account_management/rbac/?tab=datadogapplication#custom-roles
[24]: /es/account_management/rbac/permissions/#monitors
[25]: /es/account_management/rbac/permissions/
[26]: https://app.datadoghq.com/organization-settings/roles
[27]: https://app.datadoghq.com/organization-settings/preferences
[28]: https://www.warp.dev/
[29]: /es/synthetics/
[30]: /es/continuous_integration/
[31]: /es/tests/
[32]: /es/error_tracking/
[33]: /es/database_monitoring/
[34]: /es/tracing/
[35]: /es/feature_flags/
[36]: /es/llm_observability/mcp_server/
[37]: /es/network_monitoring/cloud_network_monitoring/
[38]: /es/network_monitoring/devices/
[39]: /es/security/threats/security_signals/
[40]: /es/security/misconfigurations/findings/
[41]: /es/product_analytics
[42]: /es/service_management/case_management/
[43]: /es/actions/workflows/
[44]: /es/ddsql_editor/
[45]: https://www.datadoghq.com/product-preview/apm-mcp-toolset/
[46]: /es/dashboards/
[47]: /es/help/
[48]: /es/reference_tables/
[49]: /es/bits_ai/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli