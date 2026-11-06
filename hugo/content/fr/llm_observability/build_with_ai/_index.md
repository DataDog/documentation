---
description: Utilisez le Datadog MCP Server, l'interface de ligne de commande (CLI)
  et les compétences Claude Code pour créer et analyser des applications LLM depuis
  votre environnement de développement.
title: Créez avec l'IA
---
Datadog prend en charge les workflows d'agents de codage via le Datadog MCP Server, le Pup CLI et les compétences Claude Code. Utilisez-les pour examiner vos données Agent Observability et itérer sur votre application LLM sans quitter votre environnement de développement.

## Démarrez {#get-started}

### Installer les compétences {#install-the-skills}

{{< code-block lang="shell" >}}
npx skills add datadog-labs/agent-skills/agent-observability --full-depth -y
{{< /code-block >}}

### Choisissez un backend de données {#choose-a-data-backend}

Les compétences lisent vos données Agent Observability via le Datadog MCP Server ou le Pup CLI. Configurez l'un d'entre eux. Chaque compétence détecte le serveur MCP au démarrage et bascule vers le Pup CLI lorsque le serveur MCP n'est pas disponible.

{{% collapse-content title="Option A : Datadog MCP server" level="h4" expanded=true id="option-a-mcp-server" %}}

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Connectez le serveur MCP à votre session Claude Code :

<pre><code>claude mcp add --scope user --transport http datadog-llmo-mcp \
  '{{< region-param key="mcp_server_endpoint" >}}?toolsets=llmobs,core'</code></pre>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Ce produit n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

Pour une configuration complète, incluant les options d'authentification et les outils disponibles, consultez [MCP Server][2].

{{% /collapse-content %}}

{{% collapse-content title="Option B : Pup CLI" level="h4" expanded=false id="option-b-pup-cli" %}}

Installez le Pup CLI avec Homebrew (macOS/Linux) et authentifiez-vous :

{{< code-block lang="shell" >}}
brew tap datadog-labs/pack
brew install datadog-labs/pack/pup
pup auth login
{{< /code-block >}}

Pour d'autres méthodes d'installation, les commandes prises en charge et les options d'authentification, consultez [Pup CLI][1].

{{% /collapse-content %}}

{{< whatsnext desc="Créez avec le Datadog MCP server et les compétences :" >}}
    {{< nextlink href="/llm_observability/build_with_ai/mcp_server" >}}Serveur MCP{{< /nextlink >}}
    {{< nextlink href="/llm_observability/build_with_ai/claude_code_skills" >}}Compétences Claude Code{{< /nextlink >}}
{{< /whatsnext >}}

[1]: /fr/cli/
[2]: /fr/llm_observability/build_with_ai/mcp_server