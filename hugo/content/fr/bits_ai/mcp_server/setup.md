---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
description: Apprenez à connecter votre agent IA au serveur Datadog MCP.
further_reading:
- link: bits_ai/mcp_server
  tag: Documentation
  text: Serveur Datadog MCP
- link: bits_ai/mcp_server/tools
  tag: Documentation
  text: Outils du serveur Datadog MCP
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extension Datadog for Cursor
title: Configurer le serveur Datadog MCP
---
Découvrez comment configurer le serveur Datadog MCP pour récupérer des données télémétriques et gérer directement les fonctionnalités de la plateforme depuis des clients alimentés par l’IA. Sélectionnez votre client :

{{< tabs >}}
{{% tab "Claude" %}}

Connectez Claude (y compris Claude Cowork) au serveur Datadog MCP en l'ajoutant en tant que {{< ui >}}custom connector{{< /ui >}} avec l'URL MCP distante.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Suivez le guide du centre d'aide de Claude sur [connecteurs personnalisés][1] pour ajouter un nouveau connecteur personnalisé.

1. Lorsque vous êtes invité à entrer une URL, saisissez le point de terminaison du serveur Datadog MCP pour votre [site Datadog][2] ({{< region-param key="dd_site_name" >}}). Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complétez le flux de connexion OAuth lorsque vous y êtes invité.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Dirigez votre agent IA vers le point de terminaison du serveur Datadog MCP pour votre site [Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativement, ajoutez à `~/.claude.json` :
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Codex" %}}

Dirigez votre agent IA vers le point de terminaison du serveur Datadog MCP pour votre site [Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Modifiez `~/.codex/config.toml` (ou votre fichier de configuration Codex CLI) pour ajouter le serveur Datadog MCP avec transport HTTP et l'URL du point de terminaison pour votre site. Exemple :

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Connectez-vous au serveur Datadog MCP :

   ```shell
   codex mcp login datadog
   ```

   Cela ouvre votre navigateur pour compléter le flux OAuth. Codex stocke les identifiants résultants afin que vous n'ayez pas besoin de vous reconnecter jusqu'à l'expiration du jeton.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Cursor" %}}

Installez le [plugin Datadog][1] depuis le marché Cursor—le plugin inclut le serveur Datadog MCP et d'autres ressources. Si vous avez précédemment installé le serveur Datadog MCP manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits. 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Vous pouvez installer le plugin depuis le marché Cursor ou depuis l'intérieur de Cursor :
   - Depuis le marché Cursor, ouvrez le [plugin Datadog][1] et cliquez sur **Ajouter à Cursor**.
   - Dans Cursor, naviguez vers **Paramètres de Cursor** > **Plugins**, puis recherchez le plugin Datadog et cliquez sur **Ajouter à Cursor**.

1. Après l'installation du plugin, tapez `/ddsetup` dans le chat de l'agent pour effectuer la configuration initiale.
1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

[1]: https://cursor.com/marketplace/datadog
[2]: /fr/ide_plugins/vscode/?tab=cursor#installation
[3]: /fr/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Connectez Devin au serveur Datadog MCP en l'activant depuis le marché MCP de Devin. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Dans Devin, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} et recherchez `Datadog`.
1. Sélectionnez votre site Datadog pour le {{< ui >}}Server URL{{< /ui >}}; par exemple, votre site sélectionné est {{< region-param key="dd_site_name" code="true" >}}.
1. Entrez vos clés API et d'application Datadog.
1. Installez et activez le serveur, et complétez le flux de connexion OAuth lorsque cela est demandé.
1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

<div class="alert alert-info">Pour utiliser des ensembles d'outils spécifiques au produit, configurez un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">serveur MCP personnalisé</a> dans Devin et incluez le <code>toolsets</code> requête à la fin de l'URL du point de terminaison. Voir <a href="#toolsets">Ensembles d'outils</a> pour plus d'informations.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirigez votre agent IA vers le point de terminaison du serveur Datadog MCP pour votre site [Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur **Site Datadog** sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativement, ajoutez à `~/.gemini/settings.json` :
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Dirigez votre agent IA vers le point de terminaison du serveur Datadog MCP pour votre site [Datadog régional][3]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le serveur Datadog MCP à Goose en utilisant l'une des méthodes suivantes :
   - **Installation en un clic (recommandée) :** Utilisez le serveur Datadog MCP {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuration manuelle :** Suivez les instructions de Goose pour [ajouter un serveur Datadog MCP][2], en utilisant le point de terminaison listé dans cette section comme l'URL du serveur HTTP diffusé. Pour modifier la configuration directement, modifiez `~/.config/goose/config.yaml`.

1. Pour activer les [outils spécifiques au produit][1], incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. Lors du premier lancement de la session, choisissez votre compte Datadog lorsque vous êtes invité à vous authentifier.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

[1]: /fr/bits_ai/mcp_server#toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "IDE JetBrain" %}}

JetBrains propose les plugins [Junie][1] et [AI Assistant][2] pour sa gamme d'IDEs. GitHub propose le plugin [Copilot][4]. Alternativement, de nombreux développeurs utilisent un agent CLI, tel que Claude Code, Codex ou Gemini CLI, en complément de leur IDE.

Dirigez votre plugin vers le point de terminaison du serveur Datadog MCP pour votre [site Datadog][3] régional : Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Allez à {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer [les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilite9 APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils ge9ne9ralement disponibles, ide9al pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vous êtes invité à vous connecter via OAuth. L'indicateur de statut dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Allez à {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} et ajoutez le bloc suivant :

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

1. Pour activer [les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. L'indicateur de statut dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Allez à {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer [les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur l'élément `Start` qui apparaît dans l'éditeur pour démarrer le serveur. Vous êtes invité à vous connecter via OAuth.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

{{% /collapse-content %}}

{{% collapse-content title="Agents CLIs" level="h4" expanded=false id="jetbrains-agent-clis" %}}
De nombreux développeurs utilisent un agent CLI tel que Claude Code, Codex ou Gemini CLI en complément de leur IDE JetBrains. Consultez la configuration pour ces outils CLI :
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

Le [plugin Datadog pour les IDE JetBrains][3] s'intègre à ces CLIs d'agent. Pour une expérience ininterrompue, installez le plugin en même temps que vous configurez le serveur Datadog MCP.

[3]: /fr/ide_plugins/idea/
[4]: /fr/bits_ai/mcp_server/setup/?tab=claudecode
[5]: /fr/bits_ai/mcp_server/setup/?tab=codex
[6]: /fr/bits_ai/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /fr/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre site [Datadog régional][3]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez ce qui suit à votre [fichier de configuration Kiro MCP][2] (`~/.kiro/settings/mcp.json` pour la configuration au niveau de l'utilisateur) :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer [les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Connectez [OpenCode][3] au serveur Datadog MCP avec le [Plugin Datadog OpenCode][2] (en aperçu). Le plugin écrit et maintient l'entrée du serveur MCP dans votre `opencode.json` et expose les outils `ddsetup`, `ddconfig` et `ddtoolsets` que l'agent utilise pour gérer la configuration, les changements de site et la sélection de [l'ensemble d'outils](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. Ajoutez le plugin à votre fichier de configuration `opencode.json`. Créez le fichier s'il n'existe pas :

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Redémarrez OpenCode. Le package est récupéré depuis npm au démarrage.

1. Demandez à l'agent d'exécuter `ddsetup`. Le plugin guide à travers la sélection de site.

1. Redémarrez OpenCode à nouveau pour activer le serveur MCP et complétez le flux de connexion OAuth lorsque cela est demandé.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

1. Pour activer [les outils spécifiques au produit](#toolsets), demandez à l'agent d'exécuter `ddtoolsets`.

Après la configuration, demandez à l'agent d'exécuter `ddconfig` pour changer votre site Datadog ou résoudre le problème de connexion.

{{% collapse-content title="Configuration manuelle" level="h4" expanded=false id="opencode-manual" %}}
Pour configurer le serveur MCP sans le plugin, ajoutez ce qui suit à votre fichier de configuration `opencode.json`.

Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

[Pour activer les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM :

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Pour activer tous les ensembles d'outils généralement disponibles, utilisez `toolsets=all`. Cela fonctionne mieux pour les clients qui prennent en charge le filtrage des outils.
{{% /collapse-content %}}

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

L'[extension Cursor et VS Code de Datadog][1] inclut un accès intégré au serveur MCP Datadog géré. GitHub Copilot peut également accéder au serveur MCP Datadog dans VS Code (nécessite un abonnement actif à GitHub Copilot).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettez `--profile` et le nom du profil pour installer sur le profil par défaut de VS Code):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2]. Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
1. **Redémarrez l'IDE.**
1. Confirmez que le serveur MCP Datadog est disponible et que les [outils][3] sont listés : ouvrez le panneau de chat, sélectionnez le mode agent et cliquez sur le bouton {{< ui >}}Configure Tools{{< /ui >}}.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Bouton Configurer les outils dans VS Code" style="width:70%;" >}}
1. Si vous avez précédemment installé le serveur MCP Datadog manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits. Ouvrez la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`) et exécutez `MCP: Open User Configuration`.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: /fr/ide_plugins/vscode/?tab=vscode#installation
[3]: /fr/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] est un terminal agentique avec un support MCP intégré. Dirigez l'agent Warp vers le point de terminaison du serveur MCP pour votre [site Datadog régional][2]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Dans l'application Warp, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} et cliquez sur {{< ui >}}+ Add{{< /ui >}}.

1. Collez la configuration suivante :

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez {{< ui >}}Start{{< /ui >}} sur le serveur Datadog. Warp ouvre votre navigateur pour compléter le flux de connexion OAuth. Les identifiants sont stockés en toute sécurité sur votre appareil et réutilisés pour les sessions futures.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

Pour la plupart des autres [clients pris en charge](#supported-clients), utilisez ces instructions pour l'authentification à distance. Pour Cline ou lorsque l'authentification à distance est peu fiable ou non disponible, utilisez [l'authentification binaire locale](#local-binary-authentication).

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre site [Datadog régional][1]. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le serveur Datadog MCP à votre fichier de configuration client en utilisant le transport HTTP et l'URL de point de terminaison de votre site. Exemple :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer [les outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, mieux adapté aux clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [autorisations](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez consulter.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Ensembles d'outils {#toolsets}

Le serveur Datadog MCP prend en charge _les ensembles d'outils_, ce qui vous permet d'utiliser uniquement les [outils MCP][49] dont vous avez besoin, permettant ainsi d'économiser un espace précieux dans la fenêtre de contexte. Pour utiliser un ensemble d'outils, incluez le `toolsets` paramètre de requête dans l'URL de point de terminaison lors de la connexion au serveur MCP ([authentification à distance](#authentication) uniquement). Utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles en même temps.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction du [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

- Récupérez uniquement les outils principaux (il s'agit de la valeur par défaut si `toolsets` n'est pas spécifié) :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Récupérez uniquement les outils liés aux tests synthétiques :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Récupérez les outils principaux, les outils de test synthétiques et les outils de livraison de logiciels :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Récupérez tous les outils généralement disponibles :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Activer tous les ensembles d'outils augmente le nombre de définitions d'outils envoyées à votre client IA, ce qui consomme de l'espace dans la fenêtre de contexte. <code>toolsets=all</code> fonctionne mieux avec des clients qui prennent en charge le filtrage des outils, comme Claude Code.</div>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Ensembles d'outils disponibles {#available-toolsets}

Ces ensembles d'outils sont généralement disponibles. Voir [Outils du serveur Datadog MCP][49] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de requêtes.

- `core`: L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets de notes.
- `alerting`: Outils pour valider et créer des moniteurs, rechercher des groupes de moniteurs, récupérer des modèles de moniteurs, analyser la couverture des moniteurs et rechercher des SLO.
Outils pour [Gestion des cas][42], y compris la création, la recherche et la mise à jour des cas ; la gestion des projets ; et la liaison avec les problèmes Jira.
- `dashboards`: Outils pour récupérer, créer, mettre à jour et supprimer des [tableaux de bord][46], ainsi que pour la référence et la validation du schéma des widgets.
- `dbm`: Outils pour interagir avec [Surveillance de base de données][33].
- `ddsql`: Outils pour interroger les données Datadog en utilisant [DDSQL][44], un dialecte SQL prenant en charge les ressources d'infrastructure, les journaux, les métriques, RUM, les spans et d'autres sources de données Datadog.
- `error-tracking`: Outils pour interagir avec le suivi des erreurs de Datadog [Error Tracking][32]
- `feature-flags`: Outils pour gérer les [drapeaux de fonctionnalités][35], permettant de créer, lister et mettre à jour les drapeaux ainsi que leurs environnements.
- `kubernetes`: Outils pour rechercher et décrire les ressources [Kubernetes][51] et récupérer des manifestes dans tous les clusters.
- `llmobs`: Outils pour rechercher et analyser les spans et les expériences [LLM Observability][36].
- `networks`: Outils pour l'analyse de [Surveillance du réseau cloud][37] et [Surveillance des appareils réseau][38].
- `onboarding`: Outils d'intégration agentique pour une configuration et une installation guidées de Datadog.
- `product-analytics`: Outils pour interagir avec les requêtes d'analyse de produit [Product Analytics][41].
- `reference-tables`: Outils pour gérer les [Tables de référence][48], y compris lister les tables, lire les lignes, ajouter des lignes et créer des tables à partir du stockage cloud.
- `security`: Outils pour l'analyse de sécurité du code et la recherche de [signaux de sécurité][39] et de [constatations de sécurité][40].
- `software-delivery`: Outils pour interagir avec la livraison de logiciels ([Visibilité CI][30] et [Optimisation des tests][31]).
- `synthetics`: Outils pour interagir avec les [tests synthétiques][29] de Datadog.
- `workflows`: Outils pour [Automatisation des flux de travail][43], y compris lister, inspecter, exécuter et configurer les flux de travail pour l'utilisation par l'agent.

###  Aperçu des ensembles d'outils {#preview-toolsets}

Ces ensembles d'outils sont en préversion. Inscrivez-vous à un ensemble d'outils en remplissant le formulaire de préversion du produit, ou contactez [Datadog support][47] pour demander l'accès.
- `apm`: Outils pour une analyse approfondie des traces [APM][34], la recherche de spans, l'accès aux insights Watchdog et l'investigation des performances.

##  Clients pris en charge {#supported-clients}

| Client | Développeur | Notes |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommandé. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Utilisez [la configuration du connecteur personnalisé](?tab=claude#installation). Comprend Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Extension [Cursor & VS Code] de Datadog [16] recommandée. |
| [JetBrains IDEs][18] | JetBrains | Plugin Datadog [18] recommandé. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode plugin][53] recommandé. |
| [Cline][11] | Divers | Voir l'{{< ui >}}Other{{< /ui >}} onglet ci-dessus. Utilisez l'authentification binaire locale pour Cline si l'authentification à distance est peu fiable. |

<div class="alert alert-info">Le serveur MCP de Datadog est en cours de développement important, et d'autres clients pris en charge pourraient devenir disponibles.</div>

## Permissions requises {#required-permissions}

Les outils du serveur MCP nécessitent les permissions du rôle utilisateur [Datadog][22] suivantes :

| Permission | Requise pour |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Outils qui lisent des données de Datadog (par exemple, interroger des moniteurs, rechercher des journaux, récupérer des tableaux de bord) |
| <code style="white-space:nowrap">mcp_write</code> | Outils qui créent ou modifient des ressources dans Datadog (par exemple, créer des moniteurs, mettre des hôtes en sourdine) |

En plus de `mcp_read` ou `mcp_write`, les utilisateurs ont besoin des permissions standard de Datadog pour la ressource sous-jacente. Par exemple, l'utilisation d'un outil MCP qui lit des moniteurs nécessite à la fois `mcp_read` et la permission [Lecture des moniteurs][24]. Voir [Permissions de rôle Datadog][25] pour la liste complète des permissions au niveau des ressources.

Les utilisateurs disposant du **Rôle standard Datadog** bénéficient par défaut des permissions du serveur MCP. Si votre organisation utilise [des rôles personnalisés][23], ajoutez les permissions manuellement :
1. Allez à [**Paramètres de l'organisation > Rôles**][26] en tant qu'administrateur, et cliquez sur le rôle que vous souhaitez mettre à jour.
1. Cliquez sur {{< ui >}}Edit Role{{< /ui >}} (icône de crayon).
1. Sous la liste des permissions, sélectionnez les cases à cocher {{< ui >}}MCP Read{{< /ui >}} et {{< ui >}}MCP Write{{< /ui >}}.
1. Sélectionnez toutes les autres permissions au niveau des ressources dont vous avez besoin pour le rôle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Les administrateurs d'organisation peuvent gérer l'accès global au MCP et les capacités d'écriture depuis [Paramètres de l'organisation][27].

## Authentification {#authentication}

Le serveur MCP utilise OAuth 2.0 pour [l'authentification][14]. Si vous ne pouvez pas passer par le flux OAuth (par exemple, sur un serveur), vous pouvez fournir une [clé API Datadog et une clé d'application][1] sous forme d'en-têtes HTTP `DD_API_KEY` et `DD_APPLICATION_KEY`.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction du [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

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

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

Pour des raisons de sécurité, utilisez une clé API et une clé d'application à portée limitée provenant d'un [compte de service][13] qui dispose uniquement des autorisations requises.

### Authentification binaire locale {#local-binary-authentication}

L'authentification locale est recommandée pour Cline et lorsque l'authentification à distance est peu fiable ou indisponible. Après l'installation, vous n'avez généralement pas besoin de mettre à jour le binaire local pour bénéficier des mises à jour du serveur MCP, car les outils sont distants.

{{% collapse-content title="Configurez le binaire local du serveur Datadog MCP" level="h5" expanded=false id="mcp-local-binary" %}}

1. Installez le binaire du serveur Datadog MCP (macOS et Linux) :
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Cela installe le binaire dans `~/.local/bin/datadog_mcp_cli`.

   Pour Windows, téléchargez la [version Windows][20] :

2. Exécutez `datadog_mcp_cli login` manuellement pour suivre le flux de connexion OAuth et choisir un [site Datadog][21].

3. Configurez votre client AI pour utiliser le transport stdio avec `datadog_mcp_cli` comme commande. Par exemple, sous macOS (remplacez `<USERNAME>` par votre nom d'utilisateur) :
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

   Pour d'autres systèmes d'exploitation, remplacez le chemin `command` par l'emplacement du binaire téléchargé:
   - Linux : `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows : `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Pour Claude Code, vous pouvez plutôt exécuter : 
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Redémarrez complètement votre client AI pour appliquer la configuration et charger le serveur MCP.
{{% /collapse-content %}}

## Testez l'accès au serveur MCP {#test-access-to-the-mcp-server}

1. Installez l'[inspecteur MCP][2], un outil de développement pour tester et déboguer les serveurs MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. Dans l'interface web de l'inspecteur, pour {{< ui >}}Transport Type{{< /ui >}}, sélectionnez {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Pour {{< ui >}}URL{{< /ui >}}, entrez le point de terminaison du serveur MCP pour votre site Datadog régional. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   Par exemple, pour {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Cliquez sur {{< ui >}}Connect{{< /ui >}}, puis allez à {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
5. Vérifiez si les [outils disponibles][12] apparaissent.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/account_management/api-app-keys/
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
[12]: /fr/bits_ai/mcp_server/tools
[13]: /fr/account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: /fr/ide_plugins/vscode/?tab=cursor
[16]: /fr/ide_plugins/vscode/
[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
[18]: /fr/ide_plugins/idea/
[19]: https://claude.ai
[20]: https://coterm.datadoghq.com/mcp-cli/datadog_mcp_cli.exe
[21]: /fr/getting_started/site/
[22]: /fr/account_management/rbac/permissions/#mcp
[23]: /fr/account_management/rbac/?tab=datadogapplication#custom-roles
[24]: /fr/account_management/rbac/permissions/#monitors
[25]: /fr/account_management/rbac/permissions/
[26]: https://app.datadoghq.com/organization-settings/roles
[27]: https://app.datadoghq.com/organization-settings/preferences
[28]: https://www.warp.dev/
[29]: /fr/synthetics/
[30]: /fr/continuous_integration/
[31]: /fr/tests/
[32]: /fr/error_tracking/
[33]: /fr/database_monitoring/
[34]: /fr/tracing/
[35]: /fr/feature_flags/
[36]: /fr/llm_observability/mcp_server/
[37]: /fr/network_monitoring/cloud_network_monitoring/
[38]: /fr/network_monitoring/devices/
[39]: /fr/security/threats/security_signals/
[40]: /fr/security/misconfigurations/findings/
[41]: /fr/product_analytics
[42]: /fr/service_management/case_management/
[43]: /fr/actions/workflows/
[44]: /fr/ddsql_editor/
[45]: https://www.datadoghq.com/product-preview/apm-mcp-toolset/
[46]: /fr/dashboards/
[47]: /fr/help/
[48]: /fr/reference_tables/
[49]: /fr/bits_ai/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /fr/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin