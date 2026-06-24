---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /es/bits_ai/mcp_server/setup/
description: Aprende a conectar tu agente de IA al Servidor MCP de Datadog.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Servidor MCP de Datadog
- link: mcp_server/tools
  tag: Documentación
  text: Herramientas del Servidor MCP de Datadog
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentación
  text: Extensión de Datadog para Cursor
title: Configura el Servidor MCP de Datadog
---
Aprende a configurar y ajustar el Servidor MCP de Datadog, que te permite recuperar información de telemetría y gestionar características de la plataforma directamente desde clientes impulsados por IA. Selecciona tu cliente:

{{< tabs >}}
{{% tab "ChatGPT" %}}

Conecta Datadog a ChatGPT instalando la [aplicación de Datadog][1] desde el directorio de aplicaciones de ChatGPT. La aplicación se autentica con tu organización de Datadog a través de un flujo de OAuth.

{{< site-region region="us" >}}
<div class="alert alert-info">La aplicación de Datadog ChatGPT está en vista previa. Durante la vista previa, está disponible solo para clientes de US1.</div>

1. En ChatGPT, ve a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} y busca **Datadog**. Si la aplicación de Datadog no está disponible, contacta al administrador de ChatGPT de tu organización para obtener aprobación.
1. Selecciona la aplicación, haz clic en {{< ui >}}Connect{{< /ui >}} y sigue la configuración guiada.
1. Completa el flujo de inicio de sesión de OAuth cuando se te solicite.
1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,gov,gov2" >}}
<div class="alert alert-danger">La aplicación de Datadog ChatGPT no es compatible con tu <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Instala el [Conector de Datadog](https://claude.ai/directory/connectors/datadog) desde el Directorio de Conectores de Claude. El conector oficial es la forma recomendada de conectar Datadog a Claude (incluyendo Claude Cowork) e incluye aplicaciones MCP para visualizaciones dentro del producto. Si previamente agregaste Datadog como un conector personalizado, elimínalo para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. En Claude, haz clic en el **+** ícono en la parte inferior de cualquier aviso, luego haz clic en {{< ui >}}Add Connector{{< /ui >}}.
1. Busca **Datadog** en el directorio y habilita el conector.
1. Completa el flujo de inicio de sesión de OAuth cuando se te solicite.
1. Verifica que tienes los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

{{% collapse-content title="Configuración manual con un conector personalizado" level="h4" expanded=false id="claude-custom-connector" %}}
Si el conector del directorio no está disponible para ti, puedes agregar Datadog como un [conector personalizado](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) utilizando la URL remota de MCP para tu [sitio de Datadog](/getting_started/site/) ({{< region-param key="dd_site_name" >}}). Para las instrucciones correctas, utiliza el {{< ui >}}Datadog Site{{< /ui >}}selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

1. Sigue la guía del centro de ayuda de Claude sobre [conectores personalizados](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) para agregar un nuevo conector personalizado.

1. Cuando se te pida una URL, ingresa:
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Para habilitar [herramientas específicas del producto](#toolsets), incluye el `toolsets` parámetro de consulta al final de la URL del endpoint. Por ejemplo, esta URL habilita _sólo_ herramientas de APM y Observabilidad del Agente (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Completa el flujo de inicio de sesión de OAuth cuando se te solicite.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con tu <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Código de Claude" %}}

Instala el complemento de Datadog desde el [mercado oficial de complementos de Anthropic](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace). El complemento empaqueta el servidor MCP de Datadog con habilidades integradas y se actualiza automáticamente cuando se lanzan nuevas versiones del complemento. Para más detalles, consulta el [repositorio del complemento](https://github.com/datadog-labs/claude-code-plugin). Si instalaste previamente el servidor MCP de Datadog manualmente, elimínalo de tu configuración de Claude Code para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instala el complemento de Datadog:
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. Para la configuración inicial, ejecuta `/ddsetup` o ingresa cualquier aviso relacionado con Datadog. Durante la configuración, selecciona tu [sitio de Datadog](/getting_started/site/) y completa el inicio de sesión de OAuth. Alternativamente, establece el dominio del servidor MCP (y opcionalmente las claves de API y aplicación de Datadog) como variables de entorno antes de iniciar Claude Code.

1. Ejecuta `/ddtoolsets` para habilitar o deshabilitar grupos de [herramientas MCP específicas de productos](#toolsets).

1. Después de realizar cualquier cambio en la configuración, ejecuta `/reload-plugins` y reautentícate abriendo `/plugin` y seleccionando el complemento de Datadog.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">Consulta el <a href="https://github.com/datadog-labs/claude-code-plugin">repositorio del complemento</a> para todos los comandos slash disponibles y opciones de configuración.</div>

{{% collapse-content title="Configuración manual del servidor MCP" level="h4" expanded=false id="claudecode-manual" %}}
Si el complemento no está disponible para ti, apunta Claude Code al punto de conexión del servidor MCP para tu [sitio de Datadog regional](/getting_started/site/) directamente. Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecuta en la terminal:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, añade a `~/.claude.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluye el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">Si la autenticación remota no está disponible, usa <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionaste ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Dirige tu agente de IA al punto de conexión del Servidor MCP para tu [sitio de Datadog][1] regional. Para las instrucciones correctas, utiliza el {{< ui >}}Datadog Site{{< /ui >}}selector en el lado derecho de esta página de documentación para seleccionar tu sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edita `~/.codex/config.toml` (o tu archivo de configuración de Codex CLI) para agregar el Servidor MCP de Datadog con transporte HTTP y la URL del punto de conexión para tu sitio. Por ejemplo:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Para habilitar [herramientas específicas del producto](#toolsets), incluye el `toolsets` parámetro de consulta al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y Observabilidad de Agente (usa `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Inicia sesión en el Servidor MCP de Datadog:

   ```shell
   codex mcp login datadog
   ```

   Esto abre tu navegador para completar el flujo de OAuth. Codex almacena las credenciales resultantes para que no necesites iniciar sesión nuevamente hasta que el token expire.

1. Verifica que tengas los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que deseas acceder.

<div class="alert alert-info">El <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Plugin de Codex (Vista Previa)</a> solo se puede usar en la aplicación de escritorio de Codex en la región US1. Para instalar, usa las <a href="?tab=chatgpt">instrucciones de la aplicación ChatGPT</a>. Después de instalar la aplicación ChatGPT, el Plugin de Codex se incluye automáticamente también.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionaste ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Cursor" %}}

Instala el [Plugin de Datadog][1] desde el Marketplace de Cursor; el plugin incluye el Servidor MCP de Datadog y otros recursos. Si previamente instalaste el Servidor MCP de Datadog manualmente, elimínalo de la configuración del IDE para evitar conflictos. 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Puedes instalar el plugin desde el Marketplace de Cursor o desde dentro de Cursor:
   - Desde el Marketplace de Cursor, abre el [Plugin de Datadog][1] y haz clic en **Agregar a Cursor**.
   - En Cursor, navega a **Configuraciones de Cursor** > **Plugins**, luego busca el plugin de Datadog y haz clic en **Agregar a Cursor**.

1. Después de la instalación del plugin, escribe `/ddsetup` en el chat del agente para realizar la configuración inicial.
1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

[1]: https://cursor.com/marketplace/datadog
[2]: /es/ide_plugins/vscode/?tab=cursor#installation
[3]: /es/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Conecte a Devin al Servidor MCP de Datadog habilitándolo desde el Marketplace MCP de Devin. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. En Devin, vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} y busque `Datadog`.
1. Seleccione su sitio de Datadog para el {{< ui >}}Server URL{{< /ui >}}; por ejemplo, su sitio seleccionado es {{< region-param key="dd_site_name" code="true" >}}.
1. Ingrese sus claves de API y de aplicación de Datadog.
1. Instale y habilite el servidor, y complete el flujo de inicio de sesión de OAuth cuando se le solicite.
1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Para usar conjuntos de herramientas específicos del producto, configure un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">servidor MCP personalizado</a> en Devin e incluya el <code>toolsets</code> consulta al final de la URL del punto de conexión. Consulte <a href="#toolsets">Conjuntos de herramientas</a> para más información.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirija su agente de IA al punto de conexión del Servidor MCP para su [sitio de Datadog][1] regional. Para las instrucciones correctas, utilice el **Sitio de Datadog** selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecute en la terminal:
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, añada a `~/.gemini/settings.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, utilice <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Dirija su plugin al punto de conexión del Servidor MCP para su [sitio de Datadog][3] regional. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue el Servidor MCP de Datadog a Goose utilizando uno de los siguientes métodos:
   - **Instalación con un clic (recomendado):** Utilice el Servidor MCP de Datadog {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuración manual:** Siga las instrucciones de Goose para [agregar un servidor MCP][2], utilizando el punto de conexión listado en esta sección como la URL del servidor HTTP transmitible. Para editar la configuración directamente, modifique `~/.config/goose/config.yaml`.

1. Para habilitar [herramientas específicas del producto][1], incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes:

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. En el primer lanzamiento de la sesión, elija su cuenta de Datadog cuando se le solicite autenticarse.

1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "IDEs de JetBrains" %}}

JetBrains ofrece los plugins [Junie][1] y [AI Assistant][2] para su gama de IDEs. GitHub ofrece el plugin [Copilot][4]. Alternativamente, muchos desarrolladores utilizan un CLI de agente, como Claude Code, Codex o Gemini CLI, junto a su IDE.

Dirija su plugin al punto de conexión del Servidor MCP para su [sitio de Datadog][3] regional. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Vaya a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} y agregue el siguiente bloque:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Se le solicita iniciar sesión a través de OAuth. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{% /collapse-content %}}

{{% collapse-content title="Asistente de IA de JetBrains" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Vaya a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agregue el siguiente bloque:

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

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Vaya a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agregue el siguiente bloque:

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agentes (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haga clic en el elemento `Start` que aparece en el editor para iniciar el servidor. Se le solicita iniciar sesión a través de OAuth.

1. Verifique que tenga los [ permisos ](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{% /collapse-content %}}

{{% collapse-content title="CLIs de agente" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Muchos desarrolladores utilizan un CLI de agente como Claude Code, Codex o Gemini CLI junto con su IDE de JetBrains. Consulte la configuración para esas herramientas CLI:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

El [plugin de Datadog para IDEs de JetBrains][3] se integra con estos CLIs de agente. Para una experiencia ininterrumpida, instale el plugin al mismo tiempo que configure el Servidor MCP de Datadog.

[3]: /es/ide_plugins/idea/
[4]: /es/mcp_server/setup/?tab=claudecode
[5]: /es/mcp_server/setup/?tab=codex
[6]: /es/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /es/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirija su agente de IA al punto de conexión del Servidor MCP para su [sitio de Datadog][3] regional. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue lo siguiente a su [archivo de configuración de Kiro MCP][2] (`~/.kiro/settings/mcp.json` para configuración a nivel de usuario):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agent (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionaste ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Conecte [OpenCode][3] al Servidor MCP de Datadog con el [Plugin oficial de Datadog OpenCode][2] (en vista previa). El plugin escribe y mantiene la entrada del Servidor MCP en su `opencode.json` y expone las herramientas `ddsetup`, `ddconfig` y `ddtoolsets` que el agente utiliza para manejar la configuración, cambios en el sitio y selección de [conjunto de herramientas](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. Agregue el complemento a su archivo de configuración `opencode.json`. Cree el archivo si no existe:

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Reinicie OpenCode. El paquete se obtiene de npm al iniciar.

1. Pida al agente que ejecute `ddsetup`. El complemento guía a través de la selección del sitio.

1. Reinicie OpenCode nuevamente para activar el Servidor MCP y complete el flujo de inicio de sesión de OAuth cuando se le solicite.

1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

1. Para habilitar [herramientas específicas del producto](#toolsets), pida al agente que ejecute `ddtoolsets`.

Después de la configuración, pida al agente que ejecute `ddconfig` para cambiar su sitio de Datadog o solucionar la conexión.

{{% collapse-content title="Configuración manual" level="h4" expanded=false id="opencode-manual" %}}
Para configurar el Servidor MCP sin el complemento, agregue lo siguiente a su archivo de configuración `opencode.json`.

Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ herramientas de APM y de Observabilidad de Agent:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Para habilitar todos los conjuntos de herramientas generalmente disponibles, utilice `toolsets=all`. Esto funciona mejor para clientes que soportan filtrado de herramientas.
{{% /collapse-content %}}

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionó ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

La [extensión de Cursor y VS Code de Datadog][1] incluye acceso integrado al servidor MCP de Datadog administrado. GitHub Copilot también puede acceder al servidor MCP de Datadog en VS Code (requiere una suscripción activa a GitHub Copilot).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instale la extensión (omita `--profile` y el nombre del perfil para instalarla en el perfil predeterminado de VS Code):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativamente, instale la [extensión de Datadog][2]. Si ya tiene la extensión instalada, asegúrese de que sea la última versión.
1. Inicie sesión en su cuenta de Datadog.
1. **Reinicie el IDE.**
1. Confirme que el Servidor MCP de Datadog esté disponible y que las [herramientas][3] estén listadas: Abra el panel de chat, seleccione el modo agente y haga clic en el botón {{< ui >}}Configure Tools{{< /ui >}}.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Botón Configurar Herramientas en VS Code" style="width:70%;" >}}
1. Si instaló previamente el Servidor MCP de Datadog manualmente, elimínelo de la configuración del IDE para evitar conflictos. Abra la paleta de comandos (`Shift` + `Cmd/Ctrl` + `P`) y ejecute `MCP: Open User Configuration`.
1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

[2]: /es/ide_plugins/vscode/?tab=vscode#installation
[3]: /es/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionó ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] es un terminal agente con soporte MCP integrado. Apunte el agente Warp al punto de conexión del Servidor MCP para su [sitio de Datadog][2] regional. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. En la aplicación Warp, vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} y haga clic en {{< ui >}}+ Add{{< /ui >}}.

1. Pegue la siguiente configuración:

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haga clic en {{< ui >}}Start{{< /ui >}} en el servidor de Datadog. Warp abre su navegador para completar el flujo de inicio de sesión OAuth. Las credenciales se almacenan de forma segura en su dispositivo y se reutilizan para sesiones futuras.

1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionó ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Otro" %}}

Para la mayoría de los demás [clientes soportados](#supported-clients), utilice estas instrucciones para la autenticación remota. Para Cline o cuando la autenticación remota no sea confiable o no esté disponible, utilice [la autenticación binaria local](#local-binary-authentication).

Dirija su agente de IA al punto de conexión del Servidor MCP para su [sitio de Datadog][1] regional. Para las instrucciones correctas, utilice el {{< ui >}}Datadog Site{{< /ui >}} selector en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue el Servidor MCP de Datadog al archivo de configuración de su cliente utilizando el transporte HTTP y la URL del punto de conexión de su sitio. Por ejemplo:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas de productos](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _ solo _ herramientas de APM y Agent Observability (utilice `toolsets=all` para habilitar todos los conjuntos de herramientas generalmente disponibles, lo mejor para clientes que soportan filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tenga los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El Servidor MCP de Datadog no es compatible con el sitio que seleccionó ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Conjuntos de herramientas {#toolsets}

El Servidor MCP de Datadog soporta _conjuntos de herramientas_, que le permiten usar solo las [herramientas MCP][49] que necesita, ahorrando valioso espacio en la ventana de contexto. Para usar un conjunto de herramientas, incluya el `toolsets` parámetro de consulta en la URL del punto de conexión al conectarse al Servidor MCP ([autenticación remota](#authentication) solamente). Utilice `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles de una vez.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, basado en su [sitio de Datadog][17] ({{< region-param key="dd_site_name" >}}) :

- Recupere solo las herramientas básicas (este es el valor predeterminado si no se especifica `toolsets`):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Recupere solo herramientas relacionadas con Synthetic Testing:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Recupere herramientas básicas, de Synthetic Testing y de Software Delivery:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Recupere todas las herramientas generalmente disponibles:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Habilitar todos los conjuntos de herramientas aumenta el número de definiciones de herramientas enviadas a su cliente de IA, lo que consume espacio en la ventana de contexto. <code>toolsets=all</code> Funciona mejor con clientes que soportan filtrado de herramientas, como Claude Code.</div>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Omitir herramientas específicas {#omit-specific-tools}

Utilice el `omit_tools`parámetro de consulta para eliminar herramientas específicas de la lista final de herramientas.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Ejemplos para su sitio seleccionado ({{< region-param key="dd_site_name" >}}):

- Omitir herramientas del conjunto predeterminado:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- Seleccione conjuntos de herramientas, luego omita una herramienta:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- Comience desde todos los conjuntos de herramientas generalmente disponibles, luego omita las herramientas de escritura:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

Proporcione nombres de herramientas como una lista separada por comas. Cuando ambos parámetros están presentes, el servidor resuelve `toolsets` primero y luego elimina las herramientas coincidentes en `omit_tools`. Si `omit_tools` incluye nombres de herramientas desconocidos, el servidor advierte y continúa.

### Conjuntos de herramientas disponibles {#available-toolsets}

Estos conjuntos de herramientas están generalmente disponibles. Consulte [Datadog MCP Server Tools][49] para una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de solicitudes.

- `core`: El conjunto de herramientas predeterminado para registros, métricas, trazas, dashboards, monitores, incidentes, hosts, servicios, eventos y notebook
- `alerting`: Herramientas para validar y crear monitores, buscar grupos de monitores, recuperar plantillas de monitores, analizar la cobertura de monitores y buscar SLOs.
- `cases`: Herramientas para [Case Management][42], incluyendo la creación, búsqueda y actualización de casos; gestión de proyectos; y vinculación de Jira issues.
- `dashboards`: Herramientas para recuperar, crear, actualizar y eliminar [dashboards][46], además de referencia y validación de esquemas de widgets.
- `dbm`: Herramientas para interactuar con [Database Monitoring][33].
- `ddsql`: Herramientas para consultar datos de Datadog usando [DDSQL][44], un dialecto SQL con soporte para recursos de infraestructura, registros, métricas, RUM, tramos y otras fuentes de datos de Datadog.
- `error-tracking`: Herramientas para interactuar con [Error Tracking][32] de Datadog.
- `feature-flags`: Herramientas para gestionar [feature flags][35], incluyendo la creación, listado y actualización de flags y sus entornos.
- `kubernetes`: Herramientas para buscar y describir recursos de [Kubernetes][51] y recuperar manifiestos en todos los clústeres.
- `llmobs`: Herramientas para buscar y analizar tramos y experimentos de [Agent Observability][36].
- `networks`: Herramientas para análisis de [Cloud Network Monitoring][37] y [Network Device Monitoring][38].
- `onboarding`: Herramientas agentic de onboarding para la configuración y puesta en marcha guiada de Datadog.
- `product-analytics`: Herramientas para interactuar con consultas de [Product Analytics][41].
- `profiling`: Herramientas para descubrir, explorar y analizar datos de [Continuous Profiler][58].
- `reference-tables`: Herramientas para gestionar [Reference Tables][48], incluyendo listar tablas, leer filas, agregar filas y crear tablas desde almacenamiento en la nube
- `security`: Herramientas para escaneo de seguridad de código y búsqueda de [security signals][39] y [security findings][40]
- `software-delivery`: Herramientas para interactuar con Software Delivery ([CI Visibility][30] y [Test Optimization][31])
- `synthetics`: Herramientas para interactuar con Datadog [Synthetic tests][29]
- `widgets`: Herramientas para la visualización, validación y conversión de tipo de [dashboard][46] y [notebook][54] de widgets.
- `workflows`: Herramientas para [Workflow Automation][43], incluyendo listar, inspeccionar, ejecutar y configurar flujos de trabajo para uso del Agent

### Conjuntos de herramientas de vista previa {#preview-toolsets}

Estos conjuntos de herramientas están en vista previa. Regístrese para un conjunto de herramientas completando el formulario de Vista Previa del Producto o contacte a [soporte de Datadog][47] para solicitar acceso.
- `apm`: ([Regístrese][45]) Herramientas para análisis de traza [APM][34] en profundidad, búsqueda de tramos, insights de Watchdog e investigación de rendimiento
- `code-exec`: ([Regístrese][60]) Una única herramienta que ejecuta TypeScript escrito por agentes en un sandbox gestionado por Datadog con acceso directo a las APIs de Datadog, para investigación multi-señal y exploración de datos ad-hoc en una sola llamada
- `remote-actions`: ([Regístrese][62]) Herramientas para diagnósticos en el servidor, incluyendo leer archivos, listar directorios y ejecutar comandos de shell seguros y de solo lectura directamente en servidores instrumentados a través del Agent
- `rum`: Herramientas para [Real User Monitoring][57], incluyendo resumir el rendimiento de la aplicación, inspeccionar la configuración de la aplicación y realizar investigaciones de rendimiento

## Clientes soportados {#supported-clients}

| Cliente | Desarrollador | Notas |
|--------|------|------|
| [ChatGPT][59] | OpenAI | En vista previa, y disponible solo para clientes de US1. |
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recomendada. |
| [Claude Code][4] | Anthropic | Datadog [Claude Code plugin][55] recomendado. |
| [Claude][19] | Anthropic | Datadog [Claude Connector][56] recomendado. Incluye Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recomendado. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recomendado. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode plugin][53] recomendado. |
| [Cline][11] | Varios | Vea la {{< ui >}}Other{{< /ui >}} pestaña arriba. Utilice la autenticación binaria local para Cline si la autenticación remota no es confiable. |

<div class="alert alert-info">El servidor MCP de Datadog está en un desarrollo significativo, y pueden estar disponibles clientes adicionales compatibles.</div>

## Permisos requeridos {#required-permissions}

Las herramientas del servidor MCP requieren los siguientes [permisos de rol de usuario de Datadog][22]:

| Permiso | Requerido para |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Herramientas que leen datos de Datadog (por ejemplo, consultar monitores, buscar registros, recuperar tableros) |
| <code style="white-space:nowrap">mcp_write</code> | Herramientas que crean o modifican recursos en Datadog (por ejemplo, crear monitores, silenciar hosts) |

Además de `mcp_read` o `mcp_write`, los usuarios necesitan los permisos estándar de Datadog para el recurso subyacente. Por ejemplo, usar una herramienta MCP que lee monitores requiere tanto `mcp_read` como el permiso de [Monitors Read][24]. Consulte [Permisos de Rol de Datadog][25] para la lista completa de permisos a nivel de recurso.

Los usuarios con el **Datadog Standard Role** tienen ambos permisos del servidor MCP por defecto. Si su organización utiliza [custom roles][23], agregue los permisos manualmente:
1. Vaya a [**Organization Settings > Roles**][26] como administrador y haga clic en el rol que desea actualizar.
1. Haga clic en {{< ui >}}Edit Role{{< /ui >}} (icono de lápiz).
1. En la lista de permisos, seleccione las casillas de verificación {{< ui >}}MCP Read{{< /ui >}} y {{< ui >}}MCP Write{{< /ui >}}.
1. Seleccione cualquier otro permiso a nivel de recurso que necesite para el rol.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Los administradores de la organización pueden gestionar el acceso global de MCP y las capacidades de escritura desde [Organization Settings][27].

## Autenticación {#authentication}

El servidor MCP utiliza OAuth 2.0 para [autenticación][14]. Si no puede pasar por el flujo de OAuth (por ejemplo, en un servidor), puede proporcionar una [clave de API de Datadog y clave de aplicación][1] como `DD_API_KEY` y `DD_APPLICATION_KEY` encabezados HTTP.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, basado en su [Datadog site][17] seleccionado ({{< region-param key="dd_site_name" >}}):

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

Por seguridad, utilice una clave de API con contexto y una clave de aplicación de una [cuenta de servicio][13] que tenga solo los permisos requeridos.

### Agregando clientes de OAuth {#adding-oauth-clients}

Puede añadir sus redirect URLs a la allow-list en [Organization Preferences][27] bajo `MCP OAuth Redirect URLs`. 

Si es un socio o proveedor que agrega Datadog a un directorio MCP para su plataforma de agente de IA, envíe su interés a través de [Technology Partner Signup][61].

### Autenticación binaria local {#local-binary-authentication}

Se recomienda la autenticación local para Cline y cuando la autenticación remota no es confiable o no está disponible. Después de la instalación, normalmente no es necesario actualizar el binario local para beneficiarse de las actualizaciones del Servidor MCP, ya que las herramientas son remotas.

{{% collapse-content title="Configure el binario local del Servidor MCP de Datadog" level="h5" expanded=false id="mcp-local-binary" %}}

1. Instale el binario del Servidor MCP de Datadog (macOS y Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Esto instala el binario en `~/.local/bin/datadog_mcp_cli`.

   Para Windows, descargue la [versión de Windows][20].

2. Ejecute `datadog_mcp_cli login` manualmente para recorrer el flujo de inicio de sesión de OAuth y elegir un [sitio de Datadog][21].

3. Configure su cliente de IA para usar el transporte stdio con `datadog_mcp_cli` como el comando. Por ejemplo, en macOS (reemplace `<USERNAME>` con su nombre de usuario del sistema operativo):
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

   Para otros sistemas operativos, reemplace la ruta `command` con la ubicación del binario descargado:
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Para Claude Code, ejecute en su lugar: 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Reinicie completamente su cliente de IA para aplicar la configuración y cargar el Servidor MCP.
{{% /collapse-content %}}

## Pruebe el acceso al Servidor MCP {#test-access-to-the-mcp-server}

1. Instale el [inspector MCP][2], una herramienta para desarrolladores para probar y depurar servidores MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. En la interfaz web del inspector, para {{< ui >}}Transport Type{{< /ui >}}, seleccione {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Para {{< ui >}}URL{{< /ui >}}, ingrese el punto de conexión del Servidor MCP para su sitio regional de Datadog. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   Por ejemplo, para {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Haz clic en {{< ui >}}Connect{{< /ui >}}, luego ve a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
5. Verifique si las [herramientas disponibles][12] aparecen.

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
[12]: /es/mcp_server/tools
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
[49]: /es/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /es/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /es/notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /es/real_user_monitoring/
[58]: https://partners.datadoghq.com/s/login/SelfRegister
[59]: https://chatgpt.com/
[60]: https://www.datadoghq.com/product-preview/mcp-codexec/
[61]: /es/getting_started/profiler/
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/