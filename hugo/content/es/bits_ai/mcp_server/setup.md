---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
description: Aprende a conectar tu agente de IA al servidor Datadog MCP.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentación
  text: Servidor Datadog MCP
- link: bits_ai/mcp_server/tools
  tag: Documentación
  text: Herramientas del Servidor Datadog MCP
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentación
  text: Extensión de Datadog para Cursor
title: Configura el Servidor Datadog MCP
---
Aprende a configurar y poner en marcha el Servidor Datadog MCP, que te permite obtener información de telemetría y administrar las funcionalidades de la plataforma directamente desde clientes impulsados por IA. Selecciona tu cliente:

{{< tabs >}}
{{% tab "Claude" %}}

Conecta a Claude (incluyendo Claude Cowork) al Servidor Datadog MCP añadiéndolo como un {{< ui >}}custom connector{{< /ui >}} con la URL remota de MCP.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Sigue la guía del centro de ayuda de Claude sobre [conectores personalizados][1] para añadir un nuevo conector personalizado.

1. Cuando se te pida una URL, ingresa el punto de conexión del Servidor Datadog MCP para tu [sitio de Datadog][2] ({{< region-param key="dd_site_name" >}}). Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Para habilitar [herramientas específicas de producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de Observabilidad APM y LLM (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Completa el flujo de inicio de sesión de OAuth cuando se te pida.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Dirige tu agente de IA al punto de conexión del Servidor Datadog MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecutar en terminal:
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

1. Para habilitar [herramientas específicas de producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, usa <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">El Servidor Datadog MCP no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Codex" %}}

Dirige tu agente de IA al punto de conexión del Servidor Datadog MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edita `~/.codex/config.toml` (o tu archivo de configuración de Codex CLI) para agregar el Servidor Datadog MCP con transporte HTTP y la URL del punto de conexión para tu sitio. Por ejemplo:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Para habilitar [herramientas específicas de producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Inicia sesión en el Servidor Datadog MCP:

   ```shell
   codex mcp login datadog
   ```

   Esto abre tu navegador para completar el flujo de OAuth. Codex almacena las credenciales resultantes para que no necesites iniciar sesión nuevamente hasta que el token expire.

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor Datadog MCP no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Cursor" %}}

Instala el [Plugin de Datadog][1] desde el Cursor Marketplace; el plugin incluye el Servidor Datadog MCP y otros recursos. Si instalaste previamente el Servidor Datadog MCP manualmente, elimínalo de la configuración del IDE para evitar conflictos. 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Puedes instalar el plugin desde el Cursor Marketplace o desde dentro de Cursor:
   - Desde el Cursor Marketplace, abre el [Datadog Plugin][1] y haz clic en **Add to Cursor**.
   - En Cursor, navega a **Cursor Settings** > **Plugins**, luego busca el plugin de Datadog y haz clic en **Add to Cursor**.

1. Después de la instalación del plugin, escribe `/ddsetup` en el chat del agente para realizar la configuración inicial.
1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[1]: https://cursor.com/marketplace/datadog
[2]: /es/ide_plugins/vscode/?tab=cursor#installation
[3]: /es/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Conecta a Devin al servidor MCP de Datadog habilitándolo desde el Marketplace MCP de Devin. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. En Devin, ve a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} y busca `Datadog`.
1. Selecciona tu sitio de Datadog para el {{< ui >}}Server URL{{< /ui >}}; por ejemplo, tu sitio seleccionado es {{< region-param key="dd_site_name" code="true" >}}.
1. Ingresa tus claves de API y de aplicación de Datadog.
1. Instala y habilita el servidor, y completa el flujo de inicio de sesión de OAuth cuando se te pida.
1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Para utilizar conjuntos de herramientas específicos de producto, configura un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">Servidor Datadog MCP personalizado</a> en Devin e incluye el <code>toolsets</code> consulta al final de la URL del punto de conexión. Consulta <a href="#toolsets">conjuntos de herramientas</a> para más información.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor Datadog MCP no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirige tu agente de IA al punto de conexión del Servidor Datadog MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el selector **Datadog Site** en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecutar en terminal:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agrega a `~/.gemini/settings.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el `toolsets` parámetro de consulta al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, usa <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor Datadog MCP no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Dirige tu agente de IA al punto de conexión del Servidor Datadog MCP para tu [sitio de Datadog][3] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agrega el Servidor Datadog MCP a Goose utilizando uno de los siguientes métodos:
   - **Instalación con un clic (recomendado):** Utiliza el servidor MCP de Datadog {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuración manual:** Sigue las instrucciones de Goose para [agregar un servidor MCP][2], utilizando el punto de conexión listado en esta sección como la URL del servidor HTTP transmitible. Para editar la configuración directamente, modifica `~/.config/goose/config.yaml`.

1. Para habilitar [herramientas específicas del producto][1], incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability:

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. En el primer lanzamiento de la sesión, elige tu cuenta de Datadog cuando se te pida autenticar.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[1]: /es/bits_ai/mcp_server#toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "IDEs de JetBrains" %}}

JetBrains ofrece los plugins [Junie][1] y [Asistente de IA][2] para su gama de IDEs. GitHub ofrece el plugin [Copilot][4]. Alternativamente, muchos desarrolladores utilizan un CLI de agente, como Claude Code, Codex o Gemini CLI, junto con su IDE.

Apunta tu complemento al punto de conexión del servidor MCP para tu sitio regional de [Datadog][3]. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto final seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Ve a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} y agrega el siguiente bloque:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Se te solicita iniciar sesión a través de OAuth. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="Asistente de IA de JetBrains" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Ve a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agrega el siguiente bloque:

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

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Ve a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agrega el siguiente bloque:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haz clic en el elemento `Start` que aparece en el editor para iniciar el servidor. Se te solicita iniciar sesión a través de OAuth.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% /collapse-content %}}

{{% collapse-content title="CLIs de agente" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Muchos desarrolladores utilizan un CLI de agente, como Claude Code, Codex o Gemini CLI, junto con su IDE de JetBrains. Consulta la configuración para esas herramientas CLI:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

El [complemento de Datadog para IDEs de JetBrains][3] se integra con estos CLIs de agente. Para una experiencia ininterrumpida, instala el complemento al mismo tiempo que configuras el servidor MCP de Datadog.

[3]: /es/ide_plugins/idea/
[4]: /es/bits_ai/mcp_server/setup/?tab=claudecode
[5]: /es/bits_ai/mcp_server/setup/?tab=codex
[6]: /es/bits_ai/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /es/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirige tu agente de IA al punto de conexión del servidor MCP para tu [sitio de Datadog][3] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto final seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agrega lo siguiente a tu [archivo de configuración de Kiro MCP][2] (`~/.kiro/settings/mcp.json` para configuración específica del usuario):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Conecta [OpenCode][3] al Servidor MCP de Datadog con el plugin oficial [Datadog OpenCode Plugin][2] (en versión preliminar). El plugin escribe y mantiene la entrada del Servidor MCP en tu `opencode.json` y expone las herramientas `ddsetup`, `ddconfig` y `ddtoolsets` que el agente utiliza para manejar la configuración, cambios en el sitio y selección de [conjunto de herramientas](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. Agrega el plugin a tu archivo de configuración `opencode.json`. Crea el archivo si no existe:

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Reinicia OpenCode. El paquete se obtiene de npm al iniciar.

1. Pide al agente que ejecute `ddsetup`. El plugin guía a través de la selección del sitio.

1. Reinicia OpenCode nuevamente para activar el Servidor MCP y completa el flujo de inicio de sesión de OAuth cuando se te solicite.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

1. Para habilitar [herramientas específicas del producto](#toolsets), pide al agente que ejecute `ddtoolsets`.

Después de la configuración, pide al agente que ejecute `ddconfig` para cambiar tu sitio de Datadog o solucionar la conexión.

{{% collapse-content title="Configuración manual" level="h4" expanded=false id="opencode-manual" %}}
Para configurar el Servidor MCP sin el plugin, agrega lo siguiente a tu archivo de configuración `opencode.json`.

Punto final seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Agent Observability:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Para habilitar todos los conjuntos de herramientas generalmente disponibles, usa `toolsets=all`. Esto funciona mejor para clientes que soportan filtrado de herramientas.
{{% /collapse-content %}}

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

La extensión de Datadog para [Cursor y VS Code][1] incluye acceso integrado al servidor MCP de Datadog administrado. GitHub Copilot también puede acceder al servidor MCP de Datadog en VS Code (requiere una suscripción activa a GitHub Copilot).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instala la extensión (omite `--profile` y el nombre de perfil para instalar en el perfil predeterminado de VS Code):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativamente, instala la [extensión de Datadog][2]. Si ya tienes la extensión instalada, asegúrate de que sea la última versión.
1. Inicia sesión en tu cuenta de Datadog.
1. **Reinicia el IDE.**
1. Confirma que el servidor MCP de Datadog esté disponible y que las [herramientas][3] aparezcan: Abre el panel de chat, selecciona el modo agente y haz clic en el botón {{< ui >}}Configure Tools{{< /ui >}}.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón Configurar Herramientas en VS Code" style="width:70%;" >}}
1. Si instalaste previamente el servidor MCP de Datadog manualmente, elimínalo de la configuración del IDE para evitar conflictos. Abre la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`) y ejecuta `MCP: Open User Configuration`.
1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

[2]: /es/ide_plugins/vscode/?tab=vscode#installation
[3]: /es/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] es un terminal agente con soporte MCP integrado. Dirige el agente Warp al punto de conexión del servidor MCP para tu [sitio de Datadog][2] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto final seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. En la aplicación Warp, ve a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} y haz clic en {{< ui >}}+ Add{{< /ui >}}.

1. Pega la siguiente configuración:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haz clic en {{< ui >}}Start{{< /ui >}} en el servidor de Datadog. Warp abre tu navegador para completar el flujo de inicio de sesión de OAuth. Las credenciales se almacenan de forma segura en tu dispositivo y se reutilizan para sesiones futuras.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Otro" %}}

Para la mayoría de los otros [clientes soportados](#supported-clients), utiliza estas instrucciones para la autenticación remota. Para Cline o cuando la autenticación remota es poco confiable o no está disponible, utiliza [la autenticación binaria local](#local-binary-authentication).

Dirige tu agente de IA al punto de conexión del servidor MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto final seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agrega el Servidor MCP de Datadog al archivo de configuración de tu cliente utilizando el transporte HTTP y la URL del punto de conexión de tu sitio. Por ejemplo:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el `toolsets` parámetro de consulta al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas APM y Agent Observability (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, ideal para clientes que admiten filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Conjuntos de herramientas {#toolsets}

El Servidor MCP de Datadog soporta _conjuntos de herramientas_, que te permiten usar solo las [herramientas MCP][49] que necesitas, ahorrando valioso espacio en la ventana de contexto. Para usar un conjunto de herramientas, incluye el `toolsets` parámetro de consulta en la URL del punto de conexión al conectarte al servidor MCP ([autenticación remota](#authentication) solamente). Usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles a la vez.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, basado en tu [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

- Recupera solo las herramientas básicas (este es el valor predeterminado si no se especifica `toolsets`):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Recupera solo herramientas relacionadas con Synthetic Testing:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Recupera herramientas básicas, de Synthetic Testing y de Entrega de Software:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Recupera todas las herramientas generalmente disponibles:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Habilitar todos los conjuntos de herramientas aumenta el número de definiciones de herramientas enviadas a tu cliente de IA, lo que consume espacio en la ventana de contexto. <code>toolsets=all</code> funciona mejor con clientes que soportan filtrado de herramientas, como Claude Code.</div>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Conjuntos de herramientas disponibles {#available-toolsets}

Estos conjuntos de herramientas son generalmente disponibles. Consulta [Datadog MCP Server Tools][49] para una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de indicaciones.

- `core`: El conjunto de herramientas predeterminado para registros, métricas, trazas, tableros, monitores, incidentes, hosts, servicios, eventos y notebooks.
- `alerting`: Herramientas para validar y crear monitores, buscar grupos de monitores, recuperar plantillas de monitores, analizar la cobertura de monitores y buscar SLOs.
- `cases`: Herramientas para [Gestión de Casos][42], que incluyen crear, buscar y actualizar casos; gestionar proyectos; y vincular problemas de Jira.
- `dashboards`: Herramientas para recuperar, crear, actualizar y eliminar [tableros][46], además de referencia y validación de esquemas de widgets.
- `dbm`: Herramientas para interactuar con [Database Monitoring][33].
- `ddsql`: Herramientas para consultar datos de Datadog utilizando [DDSQL][44], un dialecto SQL con soporte para recursos de infraestructura, registros, métricas, RUM, tramos y otras fuentes de datos de Datadog.
- `error-tracking`: Herramientas para interactuar con Datadog [Error Tracking][32]
- `feature-flags`: Herramientas para gestionar [banderas de características][35], que incluyen crear, listar y actualizar banderas y sus entornos.
- `kubernetes`: Herramientas para buscar y describir recursos de [Kubernetes][51] y recuperar manifiestos en todos los clústeres.
- `llmobs`: Herramientas para buscar y analizar tramos y experimentos de [Agent Observability][36].
- `networks`: Herramientas para análisis de [Cloud Network Monitoring][37] y [Network Device Monitoring][38].
- `onboarding`: Herramientas de incorporación agencial para la configuración e incorporación guiada de Datadog.
- `product-analytics`: Herramientas para interactuar con consultas de [Product Analytics][41].
- `reference-tables`: Herramientas para gestionar [Reference Tables][48], que incluyen listar tablas, leer filas, agregar filas y crear tablas desde almacenamiento en la nube.
- `security`: Herramientas para escaneo de seguridad de código y búsqueda de [señales de seguridad][39] y [hallazgos de seguridad][40].
- `software-delivery`: Herramientas para interactuar con la entrega de software ([CI Visibility][30] y [Test Optimization][31]).
- `synthetics`: Herramientas para interactuar con pruebas Synthetic de Datadog.
- `workflows`: Herramientas para [Workflow Automation][43], que incluyen listar, inspeccionar, ejecutar y configurar flujos de trabajo para uso de agentes.

### Vista previa de conjuntos de herramientas {#preview-toolsets}

Estos conjuntos de herramientas están en vista previa. Regístrate para un conjunto de herramientas completando el formulario de vista previa del producto o contacta a [soporte de Datadog][47] para solicitar acceso.
- `apm`: ([Regístrate][45]) Herramientas para un análisis en profundidad de trazas [APM][34], búsqueda de tramos, obtención de información de Watchdog e investigación de rendimiento.

## Clientes soportados {#supported-clients}

| Cliente | Desarrollador | Notas |
|--------|------|------|
| [Cursor][3] | Cursor | Se recomienda la extensión de Datadog [Cursor & VS Code][15]. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Usa [la configuración del conector personalizado](?tab=claude#installation). Incluye Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Se recomienda la extensión de Datadog [Cursor & VS Code][16]. |
| [JetBrains IDEs][18] | JetBrains | Se recomienda el [plugin de Datadog][18]. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Se recomienda el [plugin de OpenCode de Datadog][53]. |
| [Cline][11] | Varios | Consulta la {{< ui >}}Other{{< /ui >}} pestaña superior. Utiliza autenticación binaria local para Cline si la autenticación remota no es confiable. |

<div class="alert alert-info">El Servidor MCP de Datadog se encuentra en desarrollo activo, y podrían estar disponibles clientes adicionales.</div>

## Permisos requeridos {#required-permissions}

Las herramientas del Servidor MCP requieren los siguientes [permisos de rol de usuario de Datadog][22]:

| Permiso | Requerido para |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Herramientas que leen datos de Datadog (por ejemplo, consultando monitores, buscando registros, recuperando tableros) |
| <code style="white-space:nowrap">mcp_write</code> | Herramientas que crean o modifican recursos en Datadog (por ejemplo, creando monitores, silenciando servidores) |

Además de `mcp_read` o `mcp_write`, los usuarios necesitan los permisos estándar de Datadog para el recurso subyacente. Por ejemplo, usar una herramienta MCP que lee monitores requiere tanto `mcp_read` como el permiso de [Lectura de Monitores][24]. Consulta [Permisos de Rol de Datadog][25] para la lista completa de permisos a nivel de recurso.

Los usuarios con el **Rol Estándar de Datadog** tienen ambos permisos del Servidor MCP por defecto. Si tu organización utiliza [roles personalizados][23], agrega los permisos manualmente:
1. Ve a [**Configuración de la Organización > Roles**][26] como administrador, y haz clic en el rol que deseas actualizar.
1. Haz clic en {{< ui >}}Edit Role{{< /ui >}} (ícono de lápiz).
1. Bajo la lista de permisos, selecciona las casillas {{< ui >}}MCP Read{{< /ui >}} y {{< ui >}}MCP Write{{< /ui >}}.
1. Selecciona cualquier otro permiso a nivel de recurso que necesites para el rol.
1. Haz clic {{< ui >}}Save{{< /ui >}}.

Los administradores de la organización pueden gestionar el acceso global de MCP y las capacidades de escritura desde [Configuración de la Organización][27].

## Autenticación {#authentication}

El Servidor MCP utiliza OAuth 2.0 para [autenticación][14]. Si no puedes pasar por el flujo de OAuth (por ejemplo, en un servidor), puedes proporcionar una clave de API de Datadog y una clave de aplicación a través de los encabezados HTTP `DD_API_KEY` y `DD_APPLICATION_KEY`.

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

Por seguridad, utiliza una clave de API con contexto y una clave de aplicación de una [cuenta de servicio][13] que tenga solo los permisos requeridos.

### Autenticación binaria local {#local-binary-authentication}

Se recomienda la autenticación local para Cline y cuando la autenticación remota no es confiable o no está disponible. Después de la instalación, normalmente no necesitas actualizar el binario local para beneficiarte de las actualizaciones del Servidor MCP, ya que las herramientas son remotas.

{{% collapse-content title="Configura el binario local del Servidor MCP de Datadog" level="h5" expanded=false id="mcp-local-binary" %}}

1. Instala el binario del Servidor MCP de Datadog (macOS y Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Esto instala el binario en `~/.local/bin/datadog_mcp_cli`.

   Para Windows, descarga la [versión de Windows][20].

2. Ejecuta `datadog_mcp_cli login` manualmente para seguir el flujo de inicio de sesión de OAuth y elegir un [sitio de Datadog][21].

3. Configura tu cliente de IA para usar el transporte stdio con `datadog_mcp_cli` como comando. Por ejemplo, en macOS (reemplaza `<USERNAME>` con tu nombre de usuario):
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

   <div class="alert alert-tip">Para Claude Code, puedes ejecutar en su lugar: 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Reinicia completamente tu cliente de IA para aplicar la configuración y cargar el Servidor MCP.
{{% /collapse-content %}}

## Prueba el acceso al Servidor MCP {#test-access-to-the-mcp-server}

1. Instala el [inspector de MCP][2], una herramienta para desarrolladores para probar y depurar el Servidor MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. En la interfaz web del inspector, para {{< ui >}}Transport Type{{< /ui >}}, selecciona {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Para {{< ui >}}URL{{< /ui >}}, ingresa el punto de conexión del Servidor MCP para tu sitio regional de Datadog. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   Por ejemplo, para {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Haz clic en {{< ui >}}Connect{{< /ui >}}, luego ve a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
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
[51]: /es/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin