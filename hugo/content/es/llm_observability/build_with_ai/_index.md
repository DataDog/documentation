---
description: Utilice Datadog MCP, la CLI y las habilidades de Claude Code para crear
  y analizar aplicaciones LLM desde su entorno de desarrollo.
title: Cree con IA
---
Datadog admite flujos de trabajo de agentes de codificación a través de Datadog MCP, la CLI de Pup y las habilidades de Claude Code. Úselos para investigar sus datos de Agent Observability e iterar en su aplicación LLM sin salir de su entorno de desarrollo.

## Comience {#get-started}

### Instale las habilidades {#install-the-skills}

{{< code-block lang="shell" >}}
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
{{< /code-block >}}

### Elija un backend de datos {#choose-a-data-backend}

Las habilidades leen sus datos de Agent Observability a través de Datadog MCP o de Pup CLI. Configure uno de ellos. Cada habilidad detecta el servidor MCP al iniciarse y recurre a Pup CLI cuando dicho servidor no está disponible.

{{% collapse-content title="Opción A: Servidor Datadog MCP" level="h4" expanded=true id="option-a-mcp-server" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Conecte el servidor MCP a su sesión de Claude Code:

<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Este producto no es compatible con el sitio seleccionado ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Para la configuración completa, incluidas las opciones de autenticación y las herramientas disponibles, consulte [MCP Server][2].

{{% /collapse-content %}}

{{% collapse-content title="Opción B: Pup CLI" level="h4" expanded=false id="option-b-pup-cli" %}}

Instale la Pup CLI con Homebrew (macOS/Linux) y autentíquese:

{{< code-block lang="shell" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login
{{< /code-block >}}

Para otros métodos de instalación, comandos admitidos y opciones de autenticación, consulte [Pup CLI][1].

{{% /collapse-content %}}

{{< whatsnext desc="Cree con Servidor Datadog MCP y las habilidades:" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}MCP Server{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Habilidades de Claude Code{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /es/cli/
[2]: /es/llm_observability/build_with_ai/mcp_server