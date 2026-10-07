---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /es/bits_ai/mcp_server/setup/
description: Aprenda a conectar su agente de IA al Datadog MCP Server.
further_reading:
- link: mcp_server
  tag: Documentación
  text: Datadog MCP Server
- link: mcp_server/tools
  tag: Documentación
  text: Herramientas del Datadog MCP Server
- link: https://www.datadoghq.com/blog/kubernetes-mcp-tools/
  tag: Blog
  text: Investigue los recursos de Kubernetes con las herramientas Datadog MCP.
- link: https://www.datadoghq.com/blog/datadog-ai-agent-integrations/
  tag: Blog
  text: Incorpore telemetría de Datadog en tiempo real a sus agentes de IA con integraciones
    nativas
title: Configure el Datadog MCP Server
---
Aprenda a configurar el Datadog MCP Server, que le permite recuperar información de telemetría y administrar funciones de la plataforma directamente desde clientes con tecnología de IA. Seleccione su cliente:

{{< tabs >}}
{{% tab "ChatGPT" %}}

Conecte Datadog a ChatGPT instalando la [aplicación de Datadog][1] desde el directorio de aplicaciones de ChatGPT. La aplicación se autentica con su organización de Datadog a través de un flujo de OAuth.

{{< site-region region="us" >}}
<div class="alert alert-info">La aplicación de Datadog para ChatGPT está en versión preliminar. Durante la versión preliminar, solo está disponible para clientes de US1.</div>

1. En ChatGPT, vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} y busque **Datadog**. Si la aplicación de Datadog no está disponible, comuníquese con el administrador de ChatGPT de su organización para obtener la aprobación.
1. Seleccione la aplicación, haga clic en {{< ui >}}Connect{{< /ui >}} y siga la configuración guiada.
1. Complete el flujo de inicio de sesión de OAuth cuando se le solicite.
1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,uk1,gov,gov2" >}}
<div class="alert alert-danger">La aplicación de Datadog para ChatGPT no es compatible con el <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Instale el [conector de Datadog](https://claude.ai/directory/connectors/datadog) desde el directorio de conectores de Claude. El conector oficial es la forma recomendada de conectar Datadog a Claude (incluido Claude Cowork) e incluye aplicaciones Datadog MCP para visualizaciones dentro del producto. Si anteriormente agregó Datadog como un conector personalizado, elimínelo para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. En Claude, haga clic en el icono {{< ui >}}\+{{< /ui >}} en la parte inferior de cualquier prompt, y luego haga clic en {{< ui >}}Add Connector{{< /ui >}}.
1. Busque **Datadog** en el directorio y habilite el conector.
1. Complete el flujo de inicio de sesión OAuth cuando se le solicite.
1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

{{% collapse-content title="Configuración manual con un conector personalizado" level="h4" expanded=false id="claude-custom-connector" %}}
Si el conector de directorio no está disponible para usted, puede agregar Datadog como un [conector personalizado](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) usando la URL de MCP remota para su [sitio de Datadog](/getting_started/site/) ({{< region-param key="dd_site_name" >}}). Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

1. Siga la guía del centro de ayuda de Claude sobre [conectores personalizados](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) para agregar un nuevo conector personalizado.

1. Cuando se le solicite una URL, ingrese:
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles de forma general, lo cual es mejor para clientes que admiten el filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complete el flujo de inicio de sesión OAuth cuando se le solicite.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el <a href="/getting_started/site/">sitio de Datadog</a> seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Instale el complemento de Datadog desde el [Marketplace oficial de complementos de Anthropic](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace). El complemento empaqueta el Datadog MCP Server con habilidades integradas y se actualiza automáticamente cuando se lanzan nuevas versiones del complemento. Para obtener más detalles, consulte el [repositorio del complemento](https://github.com/datadog-labs/claude-code-plugin).

**Nota**: Si anteriormente instaló el Datadog MCP Server manualmente, elimínelo de su configuración de Claude Code para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Instale el complemento de Datadog:
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. Para la configuración inicial, ejecute `/ddsetup` o ingrese cualquier prompt relacionado con Datadog. Durante la configuración, seleccione su [sitio de Datadog](/getting_started/site/) y complete el inicio de sesión OAuth. Alternativamente, establezca el dominio del servidor MCP (y opcionalmente las claves de API y de aplicación de Datadog) como variables de entorno antes de iniciar Claude Code.

1. Ejecute `/ddtoolsets` para habilitar o deshabilitar grupos de [herramientas MCP específicas del producto](#toolsets).

1. Después de realizar cualquier cambio de configuración, ejecute `/reload-plugins` y vuelva a autenticarse abriendo `/plugin` y seleccionando el complemento de Datadog.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Consulte el <a href="https://github.com/datadog-labs/claude-code-plugin">repositorio del complemento</a> para ver todos los comandos de barra y opciones de configuración disponibles.</div>

{{% collapse-content title="Configuración manual del servidor MCP" level="h4" expanded=false id="claudecode-manual" %}}
Si el complemento no está disponible para usted, apunte Claude Code directamente al punto de conexión del servidor MCP para su [sitio de Datadog](/getting_started/site/) regional. Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecute en la terminal:
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agregue a `~/.claude.json`:
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Observabilidad del Agente (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">Si la autenticación remota no está disponible, utilice <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Apunte su agente de IA al punto de conexión del servidor MCP para su [sitio de Datadog][1] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Edite `~/.codex/config.toml` (o su archivo de configuración de la CLI de Codex) para agregar el servidor MCP de Datadog con transporte HTTP y la URL del punto de conexión para su sitio. Por ejemplo:

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Para habilitar [herramientas específicas del producto](#toolsets), defina un encabezado `X-Datadog-MCP-Toolsets` en el archivo `config.toml` en la línea después de la URL. Por ejemplo, este encabezado habilita _solo_ las herramientas de APM y Observabilidad de Agente (use `X-Datadog-MCP-Toolsets = "all"` para habilitar todos los conjuntos de herramientas disponibles de forma general, lo cual es mejor para clientes que admiten el filtrado de herramientas):

   <pre>Claude<code>http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }</code></pre>

1. Inicie sesión en el Datadog MCP Server:

   ```shell
   codex mcp login datadog
   ```

   Esto abre su navegador para completar el flujo de OAuth. Codex almacena las credenciales resultantes para que no necesite iniciar sesión de nuevo hasta que el token expire.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">El <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Codex Plugin (Preview)</a> se puede usar en la aplicación de escritorio de Codex solo en la región US1. Para instalar, use las <a href="?tab=chatgpt">instrucciones de la aplicación ChatGPT</a>. Después de instalar la aplicación ChatGPT, el Codex Plugin también se incluye automáticamente.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Copilot CLI" %}}

Instale el complemento de Datadog desde el [`awesome-copilot`](https://awesome-copilot.github.com/)Marketplace. El complemento empaqueta el Datadog MCP Server con habilidades integradas y se actualiza automáticamente cuando se lanzan nuevas versiones del complemento. Para obtener más detalles, consulte el repositorio [copilot-plugin](https://github.com/datadog-labs/copilot-plugin) de Datadog.

**Nota**: Si instaló previamente el Datadog MCP Server de forma manual, elimínelo de su configuración de Copilot antes de instalar el complemento para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Instale el complemento de Datadog:
    <pre><code>copilot plugin install datadog@awesome-copilot</code></pre>

1. Para la configuración inicial, ejecute `/ddsetup` o ingrese cualquier prompt relacionado con Datadog. Durante la configuración, seleccione su [sitio de Datadog](/getting_started/site/) y complete el inicio de sesión OAuth. Alternativamente, establezca el dominio del MCP Server (y opcionalmente las claves de Datadog API y de aplicación) como variables de entorno antes de iniciar Copilot.

1. Ejecute `/ddtoolsets` para habilitar o deshabilitar grupos de [herramientas MCP específicas del producto](#toolsets).

1. Después de realizar cualquier cambio de configuración, reinicie `copilot` y vuelva a autenticar el Datadog MCP Server.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Consulte el repositorio <a href="https://github.com/datadog-labs/copilot-plugin">copilot-plugin</a> para ver todos los comandos de barra diagonal y opciones de configuración disponibles.</div>

{{% collapse-content title="Configuración manual del servidor MCP" level="h4" expanded=false id="copilot-manual" %}}
Si el complemento no está disponible para usted, apunte Copilot directamente al punto de conexión del MCP Server para su [sitio de Datadog](/getting_started/site/) regional. Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecute en la terminal:
    <pre>Claude<code>copilot mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agregue a `~/.copilot/mcp-config.json`:
    <pre>Claude<code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

   <pre>Claude<code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Cursor" %}}

Instale el [Datadog Plugin][1] desde Cursor Marketplace; el plugin incluye el Datadog MCP Server y otros recursos.

**Nota**: Si instaló previamente el Datadog MCP Server de forma manual, elimínelo de la configuración del IDE para evitar conflictos.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Puede instalar el plugin desde Cursor Marketplace o desde dentro de Cursor:
   - Desde Cursor Marketplace, abra el [Datadog Plugin][1] y haga clic en {{< ui >}}Add to Cursor{{< /ui >}}.
   - En Cursor, navegue a {{< ui >}}Cursor Settings{{< /ui >}} > {{< ui >}}Plugins{{< /ui >}}, luego busque el plugin de Datadog y haga clic en {{< ui >}}Add to Cursor{{< /ui >}}.

1. Después de la instalación del plugin, escriba `/ddsetup` en el chat del agente para realizar la configuración inicial.
1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

[1]: https://cursor.com/marketplace/datadog
[2]: /es/ide_plugins/vscode/?tab=cursor#installation
[3]: /es/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadogClaude
{{% /tab %}}

{{% tab "Devin" %}}

Conecte Devin al Datadog MCP Server habilitándolo desde el Marketplace de MCP de Devin. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. En Devin, vaya a {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} y busque `Datadog`.
1. Seleccione su sitio de Datadog para el {{< ui >}}Server URL{{< /ui >}}; por ejemplo, su sitio seleccionado es {{< region-param key="dd_site_name" code="true" >}}.
1. Ingrese sus claves de Datadog API y de aplicación de Datadog.
1. Instale y habilite el servidor, y complete el flujo de inicio de sesión de OAuth cuando se le solicite.
1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Para usar conjuntos de herramientas específicos del producto, configure un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">servidor MCP personalizado</a> en Devin e incluya el <code>toolsets</code> query al final de la URL del punto de conexión. Consulte <a href="#toolsets">Toolsets</a> para obtener más información.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Apunte su agente de IA al punto de conexión del Datadog MCP Server para su [sitio de Datadog][1] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ejecute en la terminal:
    <pre>Claude<code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativamente, agregue a `~/.gemini/settings.json`:
    <pre>Claude<code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

   <pre>Claude<code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

<div class="alert alert-info">Si la autenticación remota no está disponible, utilice <a href="#local-binary-authentication">autenticación binaria local</a> en su lugar.</div>

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Apunte su agente de IA al punto de conexión del Datadog MCP Server para su [sitio de Datadog][3] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue el Datadog MCP Server a Goose utilizando uno de los siguientes métodos:
   - **Instalación con un solo clic (recomendado):** Use el Datadog MCP Server {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuración manual:** Siga las instrucciones de Goose para [agregar un servidor MCP][2], utilizando el punto de conexión que aparece en esta sección como la URL del servidor HTTP transmitible. Para editar la configuración directamente, modifique `~/.config/goose/config.yaml`.

1. Para habilitar [herramientas específicas del producto][1], incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability:

    <pre>Claude<code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.Claude

1. En el inicio de la primera sesión, elija su cuenta de Datadog cuando se le solicite autenticarse.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Grok Build" %}}

Instale el complemento de Datadog desde el Marketplace de complementos de Grok Build. El complemento incluye el Datadog MCP Server con actualizaciones automáticas cuando se lanzan nuevas versiones del complemento. Para obtener más detalles, consulte el [repositorio del Marketplace][1].

**Nota**: Si instaló previamente el Datadog MCP Server de forma manual, elimínelo de su configuración de Grok Build para evitar conflictos.

[1]: https://github.com/xai-org/plugin-marketplace

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. En Grok Build, escriba `/marketplace` para abrir el catálogo del Marketplace. En xAI Official, busque e instale el complemento de Datadog.

1. Abra la pestaña **MCP Servers** o escriba `/mcps`. En **Plugin: datadog**, busque **datadog-grok** y presione `i` para autenticarse. Seleccione su [sitio de Datadog][2] y complete el flujo de inicio de sesión de OAuth.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

[2]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "IDEs de JetBrains" %}}

JetBrains ofrece los complementos [Junie][1] y [AI Assistant][2] para su gama de IDEs. GitHub ofrece el complemento [Copilot][4]. Alternativamente, muchos desarrolladores utilizan una CLI de agente, como Claude Code, Codex o Gemini CLI, junto con su IDE.

Apunte su complemento al punto de conexión del Datadog MCP Server para su [sitio de Datadog][3] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
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

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Se le solicitará iniciar sesión a través de OAuth. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifique que tiene los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Vaya a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} y agregue el siguiente bloque:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}",
          "headers": {
            "DD_API_KEY": "&lt;YOUR_API_KEY&gt;",
            "DD_APPLICATION_KEY": "&lt;YOUR_APP_KEY&gt;"
          }
        }
      }
    }
    </code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. El indicador de estado en la configuración muestra una marca verde cuando la conexión es exitosa.

1. Verifique que tiene los [permisos](#required-permissions) requeridos para los recursos de Datadog a los que desea acceder.

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

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Haga clic en el elemento {{< ui >}}Start{{< /ui >}} que aparece en el editor para iniciar el servidor. Se le solicitará iniciar sesión a través de OAuth.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

{{% /collapse-content %}}

{{% collapse-content title="CLIs de Agent" level="h4" expanded=false id="jetbrains-agent-clis" %}}
Muchos desarrolladores utilizan una CLI de Agent como Claude Code, Codex o Gemini CLI junto con su IDE de JetBrains. Consulte la configuración para esas herramientas de CLI:
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

El [complemento de Datadog para IDE de JetBrains][3] se integra con estas CLIs de Agent. Para una experiencia ininterrumpida, instale el complemento al mismo tiempo que configura el Datadog MCP Server.

[3]: /es/ide_plugins/idea/
[4]: /es/mcp_server/setup/?tab=claudecode
[5]: /es/mcp_server/setup/?tab=codex
[6]: /es/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /es/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Apunte su agente de IA al punto de conexión del Datadog MCP Server para su [sitio de Datadog][3] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue lo siguiente a su [archivo de configuración de Kiro MCP][2] (`~/.kiro/settings/mcp.json` para la configuración con alcance de usuario):

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /es/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Conecte [OpenCode][3] al Datadog MCP Server con el [complemento oficial de Datadog para OpenCode][2] (en vista previa). El complemento escribe y mantiene la entrada del Datadog MCP Server en su `opencode.json` y expone las herramientas `ddsetup`, `ddconfig` y `ddtoolsets` que el agente utiliza para gestionar la configuración, los cambios de sitio y la selección del [conjunto de herramientas](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}

1. Agregue el complemento a su archivo de configuración `opencode.json`. Cree el archivo si no existe:

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Reinicie OpenCode. El paquete se obtiene de npm al iniciar.

1. Pídale al agente que ejecute `ddsetup`. El complemento recorre la selección del sitio.

1. Reinicie OpenCode de nuevo para activar el Datadog MCP Server, y complete el flujo de inicio de sesión de OAuth cuando se le solicite.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

1. Para habilitar [herramientas específicas del producto](#toolsets), pídale al agente que ejecute `ddtoolsets`.

Después de la configuración, pídale al agente que ejecute `ddconfig` para cambiar su sitio de Datadog o solucionar problemas de la conexión.

{{% collapse-content title="Configuración manual" level="h4" expanded=false id="opencode-manual" %}}
Para configurar el Datadog MCP Server sin el complemento, agregue lo siguiente a su archivo de configuración `opencode.json`.

Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability:

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Para habilitar todos los conjuntos de herramientas disponibles de forma general, use `toolsets=all`. Esto funciona mejor para clientes que admiten el filtrado de herramientas.
{{% /collapse-content %}}

[1]: /es/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

Para Copilot, instale el [complemento de Datadog Copilot][2] desde el marketplace. Para obtener más información, consulte las instrucciones para la [CLI de Copilot][3].

Para otras extensiones y CLI, la [extensión de Cursor y VS Code][1] de Datadog proporciona un asistente de configuración para el Datadog MCP Server.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Instale la [extensión de Datadog][2]. Si ya tiene instalada la extensión, asegúrese de que sea la versión más reciente.
1. Inicie sesión en su cuenta de Datadog.
1. **Reinicie el IDE.**
1. Ejecute el {{< ui >}}Datadog: Open MCP Configuration Assistant{{< /ui >}} y siga las indicaciones para configurar el Datadog MCP Server.
1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

La conexión del Datadog MCP Server es administrada por Copilot (o cualquier agente que esté utilizando), no por la extensión de Datadog. Debe autorizar el Datadog MCP Server independientemente de la extensión.

[2]: /es/ide_plugins/vscode/?tab=vscode#installation
[3]: /es/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Datadog MCP Server is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /es/ide_plugins/vscode/
[2]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[3]: /es/mcp_server/setup/?tab=copilot-cli
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] es una terminal agentica con soporte MCP integrado. Apunte el agente de Warp al punto de conexión del Datadog MCP Server para su [sitio de Datadog][2] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
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

1. Haga clic en {{< ui >}}Start{{< /ui >}} en el Datadog MCP Server. Warp abre su navegador para completar el flujo de inicio de sesión OAuth. Las credenciales se almacenan de forma segura en su dispositivo y se reutilizan para futuras sesiones.

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /es/getting_started/site/
{{% /tab %}}

{{% tab "Otro" %}}

Para la mayoría de los otros [clientes compatibles](#supported-clients), utilice estas instrucciones para la autenticación remota. Para Cline o cuando la autenticación remota no sea confiable o no esté disponible, use [autenticación binaria local](#local-binary-authentication).

Apunte su agente de IA al punto de conexión del servidor MCP para su [sitio de Datadog][1] regional. Para obtener las instrucciones correctas, use el selector {{< ui >}}Datadog Site{{< /ui >}} en el lado derecho de esta página de documentación para seleccionar su sitio.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Punto de conexión seleccionado ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Agregue el servidor MCP de Datadog al archivo de configuración de su cliente usando el transporte HTTP y la URL del punto de conexión de su sitio. Por ejemplo:

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Para habilitar [herramientas específicas del producto](#toolsets), incluya el parámetro de consulta `toolsets` al final de la URL del punto de conexión. Por ejemplo, esta URL habilita _solo_ las herramientas de APM y Agent Observability (use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles generalmente, ideal para clientes que admiten el filtrado de herramientas):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Verifique que tiene los [permisos](#required-permissions) necesarios para los recursos de Datadog a los que desea acceder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">El servidor MCP de Datadog no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /es/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Conjuntos de herramientas {#toolsets}

El servidor MCP de Datadog admite _conjuntos de herramientas_, que le permiten usar solo las [herramientas MCP][49] que necesita, ahorrando un valioso espacio en la ventana de contexto. Para usar un conjunto de herramientas, incluya el parámetro de consulta `toolsets` en la URL del punto de conexión al conectarse al servidor MCP (solo [autenticación remota](#authentication)). Use `toolsets=all` para habilitar todos los conjuntos de herramientas disponibles de forma general a la vez.

<div class="alert alert-info">Para la CLI de Codex, use la <code>X-Datadog-MCP-Toolsets</code> encabezado descrito en las <a href="?tab=codex">instrucciones de configuración de Codex</a>, no el parámetro de consulta descrito aquí.</div>

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Por ejemplo, según su [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

- Recupere solo las herramientas principales (esta es la opción predeterminada si no se especifica `toolsets`):
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Recupere solo las herramientas relacionadas con Synthetic Testing:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Recupere las herramientas principales, de Synthetic Testing y de Software Delivery:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Recupere todas las herramientas disponibles de forma general:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Habilitar todos los conjuntos de herramientas aumenta la cantidad de definiciones de herramientas enviadas a su cliente de IA, lo que consume espacio en la ventana de contexto. <code>toolsets=all</code> funciona mejor con clientes que admiten el filtrado de herramientas, como Claude Code.</div>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Omitir herramientas específicas {#omit-specific-tools}

Use el parámetro de consulta `omit_tools` para eliminar herramientas específicas de la lista.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Ejemplos para su sitio seleccionado ({{< region-param key="dd_site_name" >}}):

- Omitir herramientas del conjunto predeterminado:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- Seleccione conjuntos de herramientas y, a continuación, omita una herramienta:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- Comience con todos los conjuntos de herramientas generalmente disponibles y, a continuación, omita las herramientas de escritura:
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

Proporcione los nombres de las herramientas como una lista separada por comas. Cuando ambos parámetros están presentes, el servidor resuelve `toolsets` primero y luego elimina las herramientas coincidentes en `omit_tools`. Si `omit_tools` incluye nombres de herramientas desconocidos, el servidor envía una advertencia y continúa.

### Conjuntos de herramientas disponibles {#available-toolsets}

Estos conjuntos de herramientas están generalmente disponibles. Consulte [Datadog MCP Server Tools][49] para obtener una referencia completa de las herramientas disponibles organizadas por conjunto de herramientas, con ejemplos de prompts.

- `core`: El conjunto de herramientas predeterminado para logs, métricas, trazas, dashboards, monitores, incidentes, hosts, servicios, eventos y notebooks.
- `alerting`: Herramientas para validar y crear monitores, buscar grupos de monitores, recuperar plantillas de monitores, analizar la cobertura de monitores y buscar SLO.
- `audit-trail`: Herramientas para [Audit Trail][70], que incluyen la búsqueda y recuperación de eventos de Audit Trail y la creación de consultas de búsqueda de Audit Trail.
- `code-exec`: Una única herramienta que ejecuta TypeScript creado por el agente en un entorno aislado gestionado por Datadog con acceso directo a las API de Datadog, para la investigación de múltiples señales y la exploración de datos ad-hoc en una sola llamada.
- `cost`: Herramientas para [Cloud Cost Management][63], que incluyen el listado de recomendaciones de ahorro de costos clasificadas por los ahorros diarios potenciales estimados.
- `dashboards`: Herramientas para recuperar, crear, actualizar y eliminar [dashboards][46], además de referencia y validación de esquemas de widgets.
- `data-observability`: Herramientas para [Data Observability][69], que incluyen búsqueda en el catálogo de datos, análisis de linaje, monitoreo de calidad de datos y recomendaciones de costo y rendimiento para almacenes de datos y trabajos de Spark.
- `dbm`: Herramientas para interactuar con [Database Monitoring][33].
- `ddsql`: Herramientas para consultar datos de Datadog mediante [DDSQL][44], un dialecto SQL con soporte para recursos de infraestructura, logs, métricas, RUM, spans y otras fuentes de datos de Datadog.
- `error-tracking`: Herramientas para interactuar con [Error Tracking][32] de Datadog.
- `feature-flags`: Herramientas para gestionar [feature flags][35], que incluyen crear, listar y actualizar flags y sus entornos
- `kubernetes`: Herramientas para buscar y describir recursos de [Kubernetes][51] y recuperar manifiestos en todos los clústeres.
- `llmobs`: Herramientas para buscar y analizar spans y experimentos de [Agent Observability][36]
- `networks`: Herramientas para el análisis de [Cloud Network Monitoring][37] y [Network Device Monitoring][38]
- `notebooks`: Herramientas extendidas para [notebooks][54], más allá de las herramientas de notebook incluidas en el conjunto de herramientas `core`.
- `onboarding`: Herramientas de incorporación de agentes para la configuración y el ajuste guiados de Datadog
- `product-analytics`: Herramientas para interactuar con consultas de [Product Analytics][41]
- `profiling`: Herramientas para descubrir, explorar y analizar datos de [Continuous Profiler][58]
- `reference-tables`: Herramientas para gestionar [Reference Tables][48], que incluyen listar tablas, leer filas, añadir filas y crear tablas desde el almacenamiento en la nube
- `rum`: Herramientas para [Real User Monitoring][57], que incluyen resolver aplicaciones, resumir el rendimiento, mostrar información agregada, monitorear y gestionar operaciones, explorar métricas, gestionar filtros de retención y gestionar métricas personalizadas de RUM
- `security`: Herramientas para el escaneo de seguridad de código y la búsqueda de [security signals][39] y [security findings][40]
- `software-delivery`: Herramientas para interactuar con Software Delivery ([CI Visibility][30] y [Test Optimization][31])
- `synthetics`: Herramientas para interactuar con [Synthetic tests][29] de Datadog
- `widgets`: Herramientas para la visualización, validación y conversión de tipos de widgets de [dashboard][46] y de [notebook][54].
- `workflows`: Herramientas para [Workflow Automation][43], que incluyen listar, inspeccionar, ejecutar y configurar flujos de trabajo para el uso del Agent

### Conjuntos de herramientas en versión preliminar {#preview-toolsets}

Estos conjuntos de herramientas están en versión preliminar y no se incluyen en el alias `all`; solicítelos explícitamente por su nombre. Los requisitos de acceso varían según el conjunto de herramientas, como se indica a continuación. Cuando se indique un formulario de vista previa del producto, regístrese a través de él o comuníquese con [Datadog support][47] para solicitar acceso.
- `apm`: ([Sign up][45]) Herramientas para el análisis detallado de trazas de [APM][34], búsqueda de span, informes de Watchdog e investigación de rendimiento
- `cases`: Herramientas para [Case Management][42], que incluyen crear, buscar y actualizar casos; gestionar proyectos; y vincular incidencias de Jira. No se requiere registro ni solicitud de acceso.
- `remote-actions`: ([Regístrese][62]) Herramientas para diagnósticos en el host, que incluyen leer archivos, listar directorios y ejecutar comandos de shell de solo lectura seguros directamente en los hosts instrumentados a través del Agent

## Clientes compatibles {#supported-clients}

| Cliente | Desarrollador | Notas |
|--------|------|------|
| [ChatGPT][59] | OpenAI | En vista previa y disponible solo para clientes de US1. |
| [Cursor][3] | Cursor | Se recomienda el [plugin de Cursor][15] de Datadog. |
| [Claude Code][4] | Anthropic | Se recomienda el [plugin de Claude Code][55] de Datadog. |
| [Claude][19] | Anthropic | Se recomienda el [conector de Claude][56] de Datadog. Incluye Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Copilot CLI][64] | Microsoft | Se recomienda el [plugin de Copilot][16] de Datadog. |
| [Gemini CLI][50] | Google | |
| [Grok Build][71] | SpaceXAI | Se recomienda el [plugin de Grok Build][72] de Datadog. |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Se recomienda el [plugin de Copilot][16] de Datadog. |
| [JetBrains IDEs][18] | JetBrains | Se recomienda el [Datadog plugin][18]. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Fundación de IA Agéntica | |
| [OpenCode][52] | SST | Se recomienda el [complemento OpenCode][53] de Datadog. |
| [Cline][11] | Varios | Consulte la pestaña {{< ui >}}Other{{< /ui >}} de arriba. Utilice la autenticación binaria local para Cline si la autenticación remota no es confiable. |

<div class="alert alert-info">El Datadog MCP Server está bajo un desarrollo significativo y es posible que haya clientes compatibles adicionales disponibles.</div>

## Permisos requeridos {#required-permissions}

Las herramientas del Servidor MCP requieren los siguientes [permisos de usuario de Datadog][22]:

| Permiso | Requerido para |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Herramientas que leen datos de Datadog (por ejemplo, consultar monitores, buscar registros, recuperar tableros) |
| <code style="white-space:nowrap">mcp_write</code> | Herramientas que crean o modifican recursos en Datadog (por ejemplo, crear monitores, silenciar hosts) |

Además de `mcp_read` o `mcp_write`, los usuarios necesitan los permisos estándar de Datadog para el recurso subyacente. Por ejemplo, usar una herramienta MCP que lee monitores requiere tanto `mcp_read` como el permiso de [Lectura de Monitores][24]. Consulte [Permisos de Rol de Datadog][25] para obtener la lista completa de permisos a nivel de recurso.

Los usuarios con {{< ui >}}Datadog Standard Role{{< /ui >}} tienen ambos permisos del Servidor MCP de forma predeterminada. Si su organización utiliza [roles personalizados][23], agregue los permisos manualmente:
1. Vaya a [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][26] como administrador y haga clic en el rol que desea actualizar.
1. Haga clic en {{< ui >}}Edit Role{{< /ui >}} (icono de lápiz).
1. En la lista de permisos, seleccione las casillas de verificación {{< ui >}}MCP Read{{< /ui >}} y {{< ui >}}MCP Write{{< /ui >}}.
1. Seleccione cualquier otro permiso a nivel de recurso que necesite para el rol.
1. Haga clic en {{< ui >}}Save{{< /ui >}}.

Los administradores de la organización pueden administrar el acceso global a MCP y las capacidades de escritura desde [Configuración de la organización][27].

### Restringir el acceso a la red {#restrict-network-access}

Para controlar qué redes pueden conectarse al servidor MCP de Datadog, habilite la [lista de permitidos de IP][68]. Esto evita que los usuarios se conecten al servidor MCP desde orígenes no aprobados, incluso si tienen los permisos necesarios.

## Autenticación {#authentication}

Para la mayoría de los usuarios, OAuth 2.0 es el método de autenticación recomendado, y su cliente MCP lo maneja durante la configuración. Utilice uno de los métodos basados en encabezados a continuación solo cuando no pueda completar el flujo de OAuth, por ejemplo, en un servidor o en un entorno de CI.

### OAuth 2.0 (recomendado) {#oauth-20-recommended}

La mayoría de los clientes completan el flujo de OAuth 2.0 automáticamente durante la configuración. Seleccione su cliente en la parte superior de esta página para obtener instrucciones. Con OAuth, usted no administra credenciales de larga duración directamente. Para obtener más detalles, consulte la [especificación de autorización de MCP][14].

### Token de acceso personal o de servicio {#personal-or-service-access-token}

Para la autenticación basada en encabezados, un [Token de acceso personal (PAT)][66] o un [Token de acceso de servicio (SAT)][67] de Datadog es la opción preferida. Pase el token como un token Bearer en el encabezado `Authorization`. No se requiere una clave de API.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Por ejemplo, según su [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "headers": {
          "Authorization": "Bearer &lt;YOUR_ACCESS_TOKEN&gt;"
      }
    }
  }
}
</code></pre>

[17]: /es/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

Use un PAT para un usuario individual o un SAT para una [cuenta de servicio][13]. Para alcances, gestión de tokens y otros métodos de autenticación, consulte la documentación de [PAT][66] y [SAT][67].

### Claves de API y de aplicación {#api-and-application-keys}

Alternativamente, proporcione una [clave de API y clave de aplicación][1] de Datadog como encabezados HTTP `DD_API_KEY` y `DD_APPLICATION_KEY`:

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Por ejemplo, según su [sitio de Datadog][17] seleccionado ({{< region-param key="dd_site_name" >}}):

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

Por seguridad, use una clave de API y una clave de aplicación con alcance limitado de una [cuenta de servicio][13] que solo tenga los permisos requeridos.

### Agregar clientes OAuth {#adding-oauth-clients}

Puede incluir sus URL de redireccionamiento en la lista de permitidos en [{{< ui >}}Organization Preferences{{< /ui >}}][27] bajo {{< ui >}}MCP OAuth Redirect URLs{{< /ui >}}.

Si usted es un socio o proveedor que agrega Datadog a un directorio MCP para su plataforma de agentes de IA, envíe su interés a través del [Registro de socios tecnológicos][61] de Datadog.

### Autenticación binaria local {#local-binary-authentication}

La autenticación local se recomienda para Cline y cuando la autenticación remota no es confiable o no está disponible. Después de la instalación, normalmente no necesita actualizar el binario local para beneficiarse de las actualizaciones del servidor MCP, ya que las herramientas son remotas.

{{% collapse-content title="Configure el binario local del servidor MCP de Datadog" level="h4" expanded=false id="mcp-local-binary" %}}

1. Instale el binario del servidor MCP de Datadog (macOS y Linux):
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Esto instala el binario en `~/.local/bin/datadog_mcp_cli`.

   Para Windows, descargue la [versión de Windows][20].

2. Ejecute `datadog_mcp_cli login` manualmente para seguir el flujo de inicio de sesión de OAuth y elegir un [sitio de Datadog][21].

3. Configure su cliente de IA para usar el transporte stdio con `datadog_mcp_cli` como comando. Por ejemplo, en macOS (reemplace `<USERNAME>` con su nombre de usuario del sistema operativo):
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

   <div class="alert alert-tip">Para Claude Code, puede ejecutar en su lugar:
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Reinicie completamente su cliente de IA para aplicar la configuración y cargar el servidor MCP.
{{% /collapse-content %}}

## Pruebe el acceso al servidor MCP {#test-access-to-the-mcp-server}

1. Instale el [inspector de MCP][2], una herramienta de desarrollo para probar y depurar servidores MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. En la interfaz de usuario web del inspector, para {{< ui >}}Transport Type{{< /ui >}}, seleccione {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Para {{< ui >}}URL{{< /ui >}}, introduzca el punto de conexión del servidor MCP para su sitio regional de Datadog.
   {{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
   Por ejemplo, para {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Haga clic en {{< ui >}}Connect{{< /ui >}}, luego vaya a {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
5. Verifique si las [herramientas disponibles][12] aparecen.

## Lecturas adicionales {#further-reading}

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
[15]: https://cursor.com/marketplace/datadog
[16]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
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
[36]: /es/llm_observability/build_with_ai/mcp_server/
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
[58]: /es/getting_started/profiler/
[59]: https://chatgpt.com/
[61]: https://partners.datadoghq.com/s/login/SelfRegister
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/
[63]: /es/cloud_cost_management/
[64]: https://github.com/features/copilot/cli
[65]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[66]: /es/account_management/personal-access-tokens/
[67]: /es/account_management/service-access-tokens/
[68]: /es/account_management/org_settings/ip_allowlist/
[69]: /es/data_observability/
[70]: /es/account_management/audit_trail/
[71]: https://x.ai/build 
[72]: https://github.com/xai-org/plugin-marketplace