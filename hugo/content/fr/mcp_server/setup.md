---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /fr/bits_ai/mcp_server/setup/
description: Apprenez à connecter votre agent IA au Datadog MCP Server.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Datadog MCP Server
- link: mcp_server/tools
  tag: Documentation
  text: Outils de Datadog MCP Server
- link: https://www.datadoghq.com/blog/kubernetes-mcp-tools/
  tag: Blog
  text: Examinez les ressources Kubernetes avec les outils Datadog MCP
- link: https://www.datadoghq.com/blog/datadog-ai-agent-integrations/
  tag: Blog
  text: Intégrez la télémétrie Datadog en temps réel dans vos agents IA grâce à des
    intégrations natives
title: Configurer Datadog MCP Server
---
Apprenez à installer et à configurer le Datadog MCP Server, qui vous permet de récupérer des informations de télémétrie et de gérer les fonctionnalités de la plateforme directement depuis des clients basés sur l'IA. Sélectionnez votre client :

{{< tabs >}}
{{% tab "ChatGPT" %}}

Connectez Datadog à ChatGPT en installant l'[application Datadog][1] depuis le répertoire d'applications de ChatGPT. L'application s'authentifie auprès de votre organisation Datadog via un flux OAuth.

{{< site-region region="us" >}}
<div class="alert alert-info">L'application Datadog pour ChatGPT est en version préliminaire. Pendant la version préliminaire, elle est disponible uniquement pour les clients US1.</div>

1. Dans ChatGPT, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} et recherchez **Datadog**. Si l'application Datadog n'est pas disponible, contactez l'administrateur ChatGPT de votre organisation pour obtenir une approbation.
1. Sélectionnez l'application, cliquez sur {{< ui >}}Connect{{< /ui >}} et suivez la configuration guidée.
1. Terminez le flux de connexion OAuth lorsque vous y êtes invité.
1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,uk1,gov,gov2" >}}
<div class="alert alert-danger">L'application Datadog pour ChatGPT n'est pas prise en charge pour le <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Installez le [connecteur Datadog](https://claude.ai/directory/connectors/datadog) depuis le répertoire des connecteurs Claude. Le connecteur officiel est la méthode recommandée pour connecter Datadog à Claude (y compris Claude Cowork) et inclut des applications MCP pour les visualisations intégrées au produit. Si vous avez précédemment ajouté Datadog en tant que connecteur personnalisé, supprimez-le pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Dans Claude, cliquez sur l'icône {{< ui >}}\+{{< /ui >}} en bas de n'importe quelle invite, puis cliquez sur {{< ui >}}Add Connector{{< /ui >}}.
1. Recherchez **Datadog** dans le répertoire et activez le connecteur.
1. Terminez le flux de connexion OAuth lorsque vous y êtes invité.
1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% collapse-content title="Configuration manuelle avec un connecteur personnalisé" level="h4" expanded=false id="claude-custom-connector" %}}
Si le connecteur de répertoire ne vous est pas accessible, vous pouvez ajouter Datadog en tant que [connecteur personnalisé](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) en utilisant l'URL MCP distante pour votre [site Datadog](/getting_started/site/) ({{< region-param key="dd_site_name" >}}). Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

1. Suivez le guide du centre d'aide Claude sur les [connecteurs personnalisés](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) pour ajouter un nouveau connecteur personnalisé.

1. Lorsque vous êtes invité à saisir une URL, entrez :
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Pour activer des [outils spécifiques au produit](#toolsets), ajoutez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint : Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Terminez le flux de connexion OAuth lorsque vous y êtes invité.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Installez le plugin Datadog depuis l'[Anthropic Plugin Marketplace officielle](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace). Le plugin regroupe le Datadog MCP Server avec des compétences intégrées et se met à jour automatiquement lors de la sortie de nouvelles versions du plugin. Pour plus de détails, consultez le [dépôt du plugin](https://github.com/datadog-labs/claude-code-plugin).

**Remarque** : Si vous avez précédemment installé le Datadog MCP Server manuellement, supprimez-le de votre configuration Claude Code pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Installez le plugin Datadog :
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. Pour une première configuration, exécutez `/ddsetup` ou saisissez n'importe quelle invite liée à Datadog . Lors de la configuration, sélectionnez votre [site Datadog](/getting_started/site/) et terminez la connexion OAuth. Sinon, définissez le domaine du serveur MCP (et éventuellement les clés d'API et d'application Datadog) en tant que variables d'environnement avant de démarrer Claude Code.

1. Exécutez `/ddtoolsets` pour activer ou désactiver des groupes d'[outils MCP spécifiques au produit](#toolsets) .

1. Après avoir effectué toute modification de configuration, exécutez `/reload-plugins` et réauthentifiez-vous en ouvrant `/plugin` et en sélectionnant le plugin Datadog.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Consultez le <a href="https://github.com/datadog-labs/claude-code-plugin">dépôt du plugin</a> pour connaître toutes les commandes slash et options de configuration disponibles.</div>

{{% collapse-content title="Configuration manuelle du serveur MCP" level="h4" expanded=false id="claudecode-manual" %}}
Si le plugin ne vous est pas accessible, indiquez directement à Claude Code l'endpoint du serveur MCP pour votre [site Datadog](/getting_started/site/) régional. Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Sinon, ajoutez à `~/.claude.json` :
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez plutôt <a href="#local-binary-authentication">l'authentification binaire locale</a>.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Indiquez à votre agent IA l'endpoint du serveur MCP pour votre [site Datadog][1] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Modifiez `~/.codex/config.toml` (ou votre fichier de configuration CLI Codex) pour ajouter le Datadog MCP Server avec le transport HTTP et l'URL de l'endpoint pour votre site. Exemple :

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Pour activer des [outils spécifiques au produit](#toolsets), définissez un en-tête `X-Datadog-MCP-Toolsets` dans le fichier `config.toml` sur la ligne après l'URL. Par exemple, cet en-tête active _uniquement_ les outils APM et Agent Observability (utilisez `X-Datadog-MCP-Toolsets = "all"` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>http_headers = { "X-Datadog-MCP-Toolsets" = "apm,llmobs" }</code></pre>

1. Connectez-vous au Datadog MCP Server :

   ```shell
   codex mcp login datadog
   ```

   Cela ouvre votre navigateur pour terminer le flux OAuth. Codex stocke les identifiants résultants afin que vous n'ayez pas besoin de vous reconnecter avant l'expiration du jeton.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Le <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">plugin Codex (Aperçu)</a> ne peut être utilisé que dans l'application Codex Desktop dans la région US1. Pour l'installer, suivez les <a href="?tab=chatgpt">instructions de l'application ChatGPT</a>. Après avoir installé l'application ChatGPT, le plugin Codex est également inclus automatiquement.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Copilot CLI" %}}

Installez le plugin Datadog depuis la [`awesome-copilot`](https://awesome-copilot.github.com/) marketplace de plugins. Le plugin regroupe le Datadog MCP Server avec des compétences intégrées et se met à jour automatiquement lors de la sortie de nouvelles versions du plugin. Pour plus de détails, consultez le dépôt [copilot-plugin](https://github.com/datadog-labs/copilot-plugin) de Datadog.

**Remarque** : Si vous avez précédemment installé le Datadog MCP Server manuellement, supprimez-le de votre configuration Copilot avant d'installer le plugin pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez le plugin Datadog :
    <pre><code>copilot plugin install datadog@awesome-copilot</code></pre>

1. Pour une première configuration, exécutez `/ddsetup` ou saisissez n'importe quelle invite liée à Datadog . Lors de la configuration, sélectionnez votre [site Datadog](/getting_started/site/) et terminez la connexion OAuth. Alternativement, définissez le domaine du serveur MCP (et éventuellement les clés d'API et d'application Datadog) en tant que variables d'environnement avant de démarrer Copilot.

1. Exécutez `/ddtoolsets` pour activer ou désactiver des groupes d'[outils MCP spécifiques au produit](#toolsets) .

1. Après avoir effectué toute modification de configuration, redémarrez `copilot` et réauthentifiez le Datadog MCP Server.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Consultez le dépôt <a href="https://github.com/datadog-labs/copilot-plugin">copilot-plugin</a> pour connaître toutes les commandes slash et options de configuration disponibles.</div>

{{% collapse-content title="Configuration manuelle du serveur MCP" level="h4" expanded=false id="copilot-manual" %}}
Si le plugin ne vous est pas accessible, pointez directement Copilot vers l'endpoint du serveur MCP pour votre [site Datadog](/getting_started/site/) régional. Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>copilot mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Sinon, ajoutez à `~/.copilot/mcp-config.json` :
    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Cursor" %}}

Installez le [Datadog Plugin][1] depuis la Cursor Marketplace — le plugin inclut le Datadog MCP Server et d'autres ressources.

**Remarque** : Si vous avez précédemment installé le Datadog MCP Server manuellement, supprimez-le de la configuration de l'IDE pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Vous pouvez installer le plugin depuis la Cursor Marketplace ou depuis Cursor :
   - Depuis la Cursor Marketplace, ouvrez le [Datadog Plugin][1] et cliquez sur {{< ui >}}Add to Cursor{{< /ui >}} .
   - Dans Cursor, accédez à {{< ui >}}Cursor Settings{{< /ui >}} > {{< ui >}}Plugins{{< /ui >}}, puis recherchez le plugin Datadog et cliquez sur {{< ui >}}Add to Cursor{{< /ui >}} .

1. Après l'installation du plugin, tapez `/ddsetup` dans le chat de l'agent pour effectuer la configuration initiale.
1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[1]: https://cursor.com/marketplace/datadog
[2]: /fr/ide_plugins/vscode/?tab=cursor#installation
[3]: /fr/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Connectez Devin au Datadog MCP Server en l'activant depuis la MCP Marketplace de Devin. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Dans Devin, allez dans {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} et recherchez `Datadog`.
1. Sélectionnez votre site Datadog pour le {{< ui >}}Server URL{{< /ui >}} ; par exemple, votre site sélectionné est {{< region-param key="dd_site_name" code="true" >}}.
1. Saisissez vos clés d'API et d'application Datadog.
1. Installez et activez le Datadog MCP Server, et terminez le flux de connexion OAuth lorsque vous y êtes invité.
1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Pour utiliser des ensembles d'outils spécifiques à un produit, configurez un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">serveur MCP personnalisé</a> dans Devin et incluez le <code>toolsets</code> requête à la fin de l'URL de l'endpoint. Consultez <a href="#toolsets">Toolsets</a> pour plus d'informations.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Indiquez à votre agent IA l'endpoint du serveur MCP pour votre [site Datadog][1] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>gemini mcp add --transport http datadog {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Sinon, ajoutez à `~/.gemini/settings.json` :
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "httpUrl": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez plutôt <a href="#local-binary-authentication">l'authentification binaire locale</a>.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Pointez votre agent IA vers l'endpoint du serveur MCP pour votre [site Datadog][3] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le Datadog MCP Server à Goose en utilisant l'une des méthodes suivantes :
   - **Installation en un clic (recommandé) :** Utilisez le Datadog MCP Server {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuration manuelle :** Suivez les instructions de Goose pour [ajouter un serveur MCP][2], en utilisant l'endpoint listé dans cette section comme URL du serveur HTTP diffusable. Pour modifier la configuration directement, modifiez `~/.config/goose/config.yaml`.

1. Pour activer les [outils spécifiques au produit][1], incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. Lors du lancement de la première session, choisissez votre compte Datadog lorsque vous êtes invité à vous authentifier.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Grok Build" %}}

Installez le plugin Datadog depuis la Grok Build Plugin Marketplace. Le plugin intègre le Datadog MCP Server avec des mises à jour automatiques lors de la sortie de nouvelles versions du plugin. Pour plus de détails, consultez le [dépôt Plugin Marketplace][1].

**Remarque** : Si vous avez précédemment installé le Datadog MCP Server manuellement, supprimez-le de votre configuration Grok Build pour éviter les conflits.

[1]: https://github.com/xai-org/plugin-marketplace

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Dans Grok Build, tapez `/marketplace` pour ouvrir le catalogue Marketplace. Sous xAI Official, recherchez et installez le plugin Datadog.

1. Ouvrez l'onglet **MCP Servers** ou tapez `/mcps`. Sous **Plugin: datadog**, recherchez **datadog-grok** et appuyez sur `i` pour vous authentifier. Sélectionnez votre [site Datadog][2] et terminez le processus de connexion OAuth.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "IDE JetBrain" %}}

JetBrains propose les plugins [Junie][1] et [AI Assistant][2] pour sa gamme d'IDE. GitHub propose le plugin [Copilot][4]. Alternativement, de nombreux développeurs utilisent une CLI d'agent, telle que Claude Code, Codex ou Gemini CLI, parallèlement à leur IDE.

Pointez votre plugin vers l'endpoint du serveur MCP pour votre [site Datadog][3] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Allez dans {{< ui >}}Tools{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}MCP Settings{{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vous êtes invité à vous connecter via OAuth. L'indicateur d'état dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Allez dans {{< ui >}}Tools{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} et ajoutez le bloc suivant :

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

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. L'indicateur d'état dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Allez dans {{< ui >}}Tools{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Model Context Protocol (MCP){{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur l'élément {{< ui >}}Start{{< /ui >}} qui apparaît dans l'éditeur pour démarrer le serveur. Vous êtes invité à vous connecter via OAuth.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="CLI d'Agent" level="h4" expanded=false id="jetbrains-agent-clis" %}}
De nombreux développeurs utilisent une CLI d'agent telle que Claude Code, Codex ou Gemini CLI avec leur IDE JetBrains. Consultez la configuration de ces outils CLI :
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

Le [plugin Datadog pour les IDE JetBrains][3] s'intègre à ces CLI d'agent. Pour une expérience ininterrompue, installez le plugin en même temps que vous configurez le Datadog MCP Server.

[3]: /fr/ide_plugins/idea/
[4]: /fr/mcp_server/setup/?tab=claudecode
[5]: /fr/mcp_server/setup/?tab=codex
[6]: /fr/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /fr/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Pointez votre agent IA vers l'endpoint du serveur MCP pour votre [site Datadog][3] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez ce qui suit à votre [fichier de configuration Kiro MCP][2] (`~/.kiro/settings/mcp.json` pour une configuration au niveau de l'utilisateur) :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Connectez [OpenCode][3] au Datadog MCP Server avec le [plugin officiel Datadog OpenCode][2] (en préversion). Le plugin écrit et maintient l'entrée du serveur MCP dans votre `opencode.json` et expose les outils `ddsetup`, `ddconfig` et `ddtoolsets` que l'agent utilise pour gérer la configuration, les changements de site et la sélection de l'[ensemble d'outils](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}

1. Ajoutez le plugin à votre fichier de configuration `opencode.json`. Créez le fichier s'il n'existe pas :

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Redémarrez OpenCode. Le paquet est récupéré depuis npm au démarrage.

1. Demandez à l'agent d'exécuter `ddsetup`. Le plugin parcourt la sélection du site.

1. Redémarrez OpenCode pour activer le serveur MCP et terminez le flux de connexion OAuth lorsque vous y êtes invité.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

1. Pour activer les [outils spécifiques au produit](#toolsets), demandez à l'agent d'exécuter `ddtoolsets`.

Après la configuration, demandez à l'agent d'exécuter `ddconfig` pour changer votre site Datadog ou résoudre les problèmes de connexion.

{{% collapse-content title="Configuration manuelle" level="h4" expanded=false id="opencode-manual" %}}
Pour configurer le serveur MCP sans le plugin, ajoutez ce qui suit à votre fichier de configuration `opencode.json`.

Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

<pre><code>{
  "mcp": {
    "datadog": {
      "type": "remote",
      "url": "{{< region-param key="mcp_server_endpoint" >}}",
      "enabled": true
    }
  }
}</code></pre>

Pour activer des [outils spécifiques au produit](#toolsets), ajoutez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint : Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability :

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Pour activer tous les ensembles d'outils généralement disponibles, utilisez `toolsets=all`. Cela fonctionne mieux pour les clients qui prennent en charge le filtrage des outils.
{{% /collapse-content %}}

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

Pour Copilot, installez le [plugin Datadog Copilot][2] depuis la marketplace. Pour plus d'informations, consultez les instructions relatives à la [Copilot CLI][3].

Pour les autres extensions et CLI, l'[extension Cursor et VS Code][1] de Datadog fournit un assistant de configuration pour le Datadog MCP Server.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
1. Installez l'[extension Datadog][2]. Si l'extension est déjà installée, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
1. **Redémarrez l'IDE.**
1. Exécutez {{< ui >}}Datadog: Open MCP Configuration Assistant{{< /ui >}} et suivez les instructions pour configurer le Datadog MCP Server.
1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

La connexion au Datadog MCP Server est gérée par Copilot (ou l'agent que vous utilisez), et non par l'extension Datadog. Vous devez autoriser le Datadog MCP Server indépendamment de l'extension.

[2]: /fr/ide_plugins/vscode/?tab=vscode#installation
[3]: /fr/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
[2]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[3]: /fr/mcp_server/setup/?tab=copilot-cli
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] est un terminal agentique avec prise en charge native de MCP. Pointez l'agent Warp vers l'endpoint du serveur MCP pour votre [site Datadog][2] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Dans l'application Warp, accédez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} et cliquez sur {{< ui >}}+ Add{{< /ui >}}.

1. Collez la configuration suivante :

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur {{< ui >}}Start{{< /ui >}} sur le serveur Datadog. Warp ouvre votre navigateur pour terminer le flux de connexion OAuth. Les informations d'identification sont stockées en toute sécurité sur votre appareil et réutilisées pour les sessions futures.

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

Pour la plupart des autres [clients pris en charge](#supported-clients), utilisez ces instructions pour l'authentification distante. Pour Cline ou lorsque l'authentification distante n'est pas fiable ou n'est pas disponible, utilisez [l'authentification binaire locale](#local-binary-authentication).

Indiquez à votre agent IA l'endpoint du serveur MCP pour votre [site Datadog][1] régional. Pour obtenir les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation afin de sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le Datadog MCP Server au fichier de configuration de votre client en utilisant le transport HTTP et l'URL de l'endpoint de votre site. Exemple :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer des [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et Agent Observability (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients prenant en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous disposez des [autorisations](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour le site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Ensembles d'outils {#toolsets}

Le Datadog MCP Server prend en charge les _ensembles d'outils_, qui vous permettent d'utiliser uniquement les [outils MCP][49] dont vous avez besoin, économisant ainsi un espace précieux dans la fenêtre de contexte. Pour utiliser un ensemble d'outils, incluez le paramètre de requête `toolsets` dans l'URL de l'endpoint lors de la connexion au serveur MCP ([authentification distante](#authentication) uniquement). Utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles en une seule fois.

<div class="alert alert-info">Pour l'interface de ligne de commande Codex, utilisez le <code>X-Datadog-MCP-Toolsets</code> en-tête décrit dans les <a href="?tab=codex">instructions de configuration de Codex</a>, et non le paramètre de requête décrit ici.</div>

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Par exemple, en fonction de votre [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

- Récupérer uniquement les outils principaux (c'est la valeur par défaut si `toolsets` n'est pas spécifié) :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Récupérer uniquement les outils liés à Synthetic Testing :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Récupérer les outils principaux, Synthetic Testing et Software Delivery :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Récupérer tous les outils généralement disponibles :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">L'activation de tous les ensembles d'outils augmente le nombre de définitions d'outils envoyées à votre client IA, ce qui consomme de l'espace dans la fenêtre de contexte. <code>toolsets=all</code> fonctionne mieux avec les clients qui prennent en charge le filtrage des outils, tels que Claude Code.</div>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Omettez des outils spécifiques {#omit-specific-tools}

Utilisez le paramètre de requête `omit_tools` pour supprimer des outils spécifiques de la liste finale des outils.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Exemples pour votre site sélectionné ({{< region-param key="dd_site_name" >}}) :

- Omettez des outils de l'ensemble par défaut :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- Sélectionnez des ensembles d'outils, puis omettez un outil :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- Commencez par tous les ensembles d'outils généralement disponibles, puis omettez les outils d'écriture :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

Fournissez les noms des outils sous forme de liste séparée par des virgules. Lorsque les deux paramètres sont présents, le serveur résout `toolsets` en premier, puis supprime les outils correspondants dans `omit_tools`. Si `omit_tools` inclut des noms d'outils inconnus, le serveur émet un avertissement et continue.

### Ensembles d'outils disponibles {#available-toolsets}

Ces ensembles d'outils sont généralement disponibles. Consultez [Datadog MCP Server Tools][49] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de prompts.

- `core` : L'ensemble d'outils par défaut pour les logs, les métriques, les traces, les dashboards, les monitors, les incidents, les hosts, les services, les événements et les notebooks
- `alerting` : Outils pour valider et créer des monitors, rechercher des groupes de monitors, récupérer des modèles de monitors, analyser la couverture des monitors et rechercher des SLOs
- `audit-trail` : Outils pour [Audit Trail][70], incluant la recherche et la récupération d'événements Audit Trail et la formation de requêtes de recherche Audit Trail
- `code-exec` : Un outil unique qui exécute du TypeScript créé par l'agent dans un bac à sable géré par Datadog avec un accès direct aux API Datadog, pour l'investigation multi-signal et l'exploration de données ad hoc en un seul appel
- `cost` : Outils pour [Cloud Cost Management][63], incluant la liste des recommandations d'économies de coûts classées par économies quotidiennes potentielles estimées
- `dashboards` : Outils pour récupérer, créer, mettre à jour et supprimer des [dashboards][46], ainsi que pour la référence et la validation du schéma des widgets
- `data-observability` : Outils pour [Data Observability][69], incluant la recherche dans le catalogue de données, l'analyse de lignage, la surveillance de la qualité des données, ainsi que des recommandations de coût et de performance pour les entrepôts de données et les jobs Spark
- `dbm` : Outils pour interagir avec [Database Monitoring][33]
- `ddsql` : Outils pour interroger les données Datadog à l'aide de [DDSQL][44], un dialecte SQL prenant en charge les ressources d'infrastructure, les logs, les métriques, le RUM, les spans et d'autres sources de données Datadog
- `error-tracking` : Outils pour interagir avec Datadog [Error Tracking][32]
- `feature-flags` : Outils pour gérer les [feature flags][35], incluant la création, la liste et la mise à jour des flags et de leurs environnements
- `kubernetes` : Outils pour rechercher et décrire les ressources [Kubernetes][51] et récupérer les manifestes sur tous les clusters
- `llmobs` : Outils pour rechercher et analyser les spans et les expériences d'[Agent Observability][36].
- `networks` : Outils pour l'analyse de [Cloud Network Monitoring][37] et de [Network Device Monitoring][38].
- `notebooks` : Outils étendus pour les [notebooks][54], au-delà des outils de [notebooks] inclus dans l'ensemble d'outils `core`.
- `onboarding` : Outils d'intégration Agentic pour la configuration guidée de Datadog.
- `product-analytics` : Outils pour interagir avec les requêtes de [Product Analytics][41].
- `profiling` : Outils pour découvrir, explorer et analyser les données du [Continuous Profiler][58].
- `reference-tables` : Outils pour gérer les [Reference Tables][48], y compris la liste des tables, la lecture des lignes, l'ajout de lignes et la création de tables à partir du stockage cloud.
- `rum` : Outils pour le [Real User Monitoring][57], y compris la résolution des applications, la synthèse des performances, la présentation d'informations agrégées, la surveillance et la gestion des opérations, l'exploration des métriques, la gestion des filtres de rétention et la gestion des métriques RUM personnalisées.
- `security` : Outils pour l'analyse de la sécurité du code et la recherche de [signaux de sécurité][39] et de [résultats de sécurité][40].
- `software-delivery` : Outils pour interagir avec la Software Delivery ([CI Visibility][30] et [Test Optimization][31]).
- `synthetics` : Outils pour interagir avec les [tests Synthetic][29] de Datadog.
- `widgets` : Outils pour la visualisation, la validation et la conversion de type des widgets de [dashboard][46] et de [notebooks][54].
- `workflows` : Outils pour le [Workflow Automation][43], y compris la liste, l'inspection, l'exécution et la configuration des workflows pour une utilisation par l'agent.

###  : Prévisualisez les ensembles d'outils {#preview-toolsets}

Ces ensembles d'outils sont en préversion et ne sont pas inclus dans l'alias `all` ; demandez-les explicitement par leur nom. Les exigences d'accès varient selon l'ensemble d'outils, comme indiqué ci-dessous. Lorsqu'un formulaire de préversion de produit est indiqué, inscrivez-vous via celui-ci ou contactez le [support Datadog][47] pour demander l'accès.
- `apm` : ([S'inscrire][45]) Outils pour l'analyse approfondie des traces [APM][34], la recherche de spans, les Watchdog insights et l'investigation des performances
- `cases` : Outils pour le [Case Management][42], y compris la création, la recherche et la mise à jour de cas ; la gestion de projets ; et la liaison d'issues Jira. Aucune inscription ni demande d'accès requise.
- `remote-actions` : ([S'inscrire][62]) Outils pour les diagnostics on-host, y compris la lecture de fichiers, la liste des répertoires et l'exécution de commandes shell sécurisées en lecture seule directement sur les hosts instrumentés via l'Agent

## Clients pris en charge {#supported-clients}

| Client | Développeur | Notes |
|--------|------|------|
| [ChatGPT][59] | OpenAI | En préversion, et disponible uniquement pour les clients US1. |
| [Cursor][3] | Cursor | [Plugin Cursor][15] Datadog recommandé. |
| [Claude Code][4] | Anthropic | [Plugin Claude Code][55] Datadog recommandé. |
| [Claude][19] | Anthropic | [Claude Connector][56] Datadog recommandé. Inclut Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Copilot CLI][64] | Microsoft | [Copilot plugin][16] Datadog recommandé. |
| [Gemini CLI][50] | Google | |
| [Grok Build][71] | SpaceXAI | [Grok Build plugin][72] Datadog recommandé. |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | [Copilot plugin][16] Datadog recommandé. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recommandé. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode plugin][53] recommandé. |
| [Cline][11] | Divers | Voir l'onglet {{< ui >}}Other{{< /ui >}} ci-dessus. Utilisez l'authentification binaire locale pour Cline si l'authentification à distance n'est pas fiable. |

<div class="alert alert-info">Le Datadog MCP Server est en cours de développement avancé, et d'autres clients pris en charge pourraient devenir disponibles.</div>

## Autorisations requises {#required-permissions}

Les outils du serveur MCP nécessitent les [autorisations de rôle utilisateur Datadog][22] suivantes :

| Autorisation | Requis pour |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Outils qui lisent des données depuis Datadog (par exemple, interroger des monitors, rechercher des logs, récupérer des dashboards) |
| <code style="white-space:nowrap">mcp_write</code> | Outils qui créent ou modifient des ressources dans Datadog (par exemple, créer des monitors, mettre en sourdine des hosts) |

En plus de `mcp_read` ou `mcp_write`, les utilisateurs ont besoin des autorisations Datadog standard pour la ressource sous-jacente. Par exemple, l'utilisation d'un outil MCP qui lit les monitors nécessite à la fois `mcp_read` et l'autorisation [Monitors Read][24]. Consultez [Datadog Role Permissions][25] pour obtenir la liste complète des autorisations au niveau de la ressource.

Les utilisateurs disposant du {{< ui >}}Datadog Standard Role{{< /ui >}} ont les deux autorisations du serveur MCP par défaut. Si votre organisation utilise des [rôles personnalisés][23], ajoutez les autorisations manuellement :
1. Accédez à [{{< ui >}}Organization Settings{{< /ui >}} > {{< ui >}}Roles{{< /ui >}}][26] en tant qu'administrateur et cliquez sur le rôle que vous souhaitez mettre à jour.
1. Cliquez sur {{< ui >}}Edit Role{{< /ui >}} (icône crayon).
1. Sous la liste des autorisations, cochez les cases {{< ui >}}MCP Read{{< /ui >}} et {{< ui >}}MCP Write{{< /ui >}}.
1. Sélectionnez toute autre autorisation au niveau de la ressource dont vous avez besoin pour le rôle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Les administrateurs de l'organisation peuvent gérer l'accès MCP global et les capacités d'écriture depuis [Organization Settings][27].

### Restreindre l'accès réseau {#restrict-network-access}

Pour contrôler quels réseaux peuvent se connecter au Datadog MCP Server, activez la [liste d'autorisation IP][68]. Cela empêche les utilisateurs de se connecter au serveur MCP depuis des origines non approuvées, même s'ils disposent des autorisations requises.

## Authentification {#authentication}

Pour la plupart des utilisateurs, OAuth 2.0 est la méthode d'authentification recommandée, et votre client MCP la gère lors de la configuration. Utilisez l'une des méthodes basées sur les en-têtes ci-dessous uniquement lorsque vous ne pouvez pas terminer le flux OAuth, par exemple sur un serveur ou dans un environnement CI.

### OAuth 2.0 (recommandé) {#oauth-20-recommended}

La plupart des clients terminent automatiquement le flux OAuth 2.0 lors de la configuration. Sélectionnez votre client en haut de cette page pour obtenir des instructions. Avec OAuth, vous ne gérez pas directement les identifiants à longue durée de vie. Pour plus de détails, consultez la [spécification d'autorisation MCP][14].

### Jeton d'accès personnel ou de service {#personal-or-service-access-token}

Pour une authentification basée sur les en-têtes, un [Jeton d'accès personnel (PAT)][66] ou un [Jeton d'accès de service (SAT)][67] Datadog est l'option privilégiée. Transmettez le jeton en tant que jeton bearer dans l'en-tête `Authorization`. Aucune clé d'API n'est requise.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

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

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

Utilisez un PAT pour un utilisateur individuel ou un SAT pour un [compte de service][13]. Pour les périmètres, la gestion des jetons et d'autres méthodes d'authentification, consultez la documentation sur les [PAT][66] et les [SAT][67].

### Clés d'API et d'application {#api-and-application-keys}

Alternativement, fournissez une clé d'API Datadog et une clé d'application Datadog [API key and application key][1] en tant qu'en-têtes HTTP `DD_API_KEY` et `DD_APPLICATION_KEY` :

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Par exemple, en fonction de votre [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

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

Pour des raisons de sécurité, utilisez une clé d'API et une clé d'application à périmètre limité provenant d'un [compte de service][13] qui ne dispose que des autorisations requises.

### Ajout de clients OAuth {#adding-oauth-clients}

Vous pouvez ajouter vos URL de redirection à la liste d'autorisation dans [{{< ui >}}Organization Preferences{{< /ui >}}][27] sous {{< ui >}}MCP OAuth Redirect URLs{{< /ui >}}.

Si vous êtes un partenaire ou un fournisseur ajoutant Datadog à un répertoire MCP pour votre plateforme d'agent IA, soumettez votre demande via le [formulaire d'inscription des partenaires technologiques][61] de Datadog.

### Authentification binaire locale {#local-binary-authentication}

L'authentification locale est recommandée pour Cline et lorsque l'authentification à distance est peu fiable ou indisponible. Après l'installation, vous n'avez généralement pas besoin de mettre à jour le binaire local pour bénéficier des mises à jour du serveur MCP, car les outils sont distants.

{{% collapse-content title="Configurer le binaire local du Datadog MCP Server" level="h4" expanded=false id="mcp-local-binary" %}}

1. Installez le binaire du Datadog MCP Server (macOS et Linux) :
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Ceci installe le binaire dans `~/.local/bin/datadog_mcp_cli`.

   Pour Windows, téléchargez la [version Windows][20].

2. Exécutez `datadog_mcp_cli login` manuellement pour suivre le processus de connexion OAuth et choisir un [site Datadog][21].

3. Configurez votre client IA pour utiliser le transport stdio avec `datadog_mcp_cli` comme commande. Par exemple, sous macOS (remplacez `<USERNAME>` par votre nom d'utilisateur système) :
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

   Pour les autres systèmes d'exploitation, remplacez le chemin `command` par l'emplacement du binaire téléchargé :
   - Linux: `/home/<USERNAME>/.local/bin/datadog_mcp_cli`
   - Windows: `<USERNAME>\bin\datadog_mcp_cli.exe`

   <div class="alert alert-tip">Pour Claude Code, vous pouvez plutôt exécuter:
   <pre><code>claude mcp add datadog --scope user -- ~/.local/bin/datadog_mcp_cli</code></pre></div>

4. Redémarrez complètement votre client IA pour appliquer la configuration et charger le serveur MCP.
{{% /collapse-content %}}

## Tester l'accès au serveur MCP {#test-access-to-the-mcp-server}

1. Installez l'[inspecteur MCP][2], un outil de développement pour tester et déboguer les serveurs MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. Dans l'interface utilisateur web de l'inspecteur, pour {{< ui >}}Transport Type{{< /ui >}}, sélectionnez {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Pour {{< ui >}}URL{{< /ui >}}, saisissez l'endpoint du serveur MCP pour votre site Datadog régional.
   {{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
   Par exemple, pour {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Cliquez sur {{< ui >}}Connect{{< /ui >}}, puis accédez à {{< ui >}}Tools{{< /ui >}} > {{< ui >}}List Tools{{< /ui >}}.
5. Vérifiez si les [outils disponibles][12] apparaissent.

## Pour aller plus loin {#further-reading}

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
[12]: /fr/mcp_server/tools
[13]: /fr/account_management/org_settings/service_accounts/
[14]: https://modelcontextprotocol.io/specification/draft/basic/authorization
[15]: https://cursor.com/marketplace/datadog
[16]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
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
[36]: /fr/llm_observability/build_with_ai/mcp_server/
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
[49]: /fr/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /fr/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /fr/notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /fr/real_user_monitoring/
[58]: /fr/getting_started/profiler/
[59]: https://chatgpt.com/
[61]: https://partners.datadoghq.com/s/login/SelfRegister
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/
[63]: /fr/cloud_cost_management/
[64]: https://github.com/features/copilot/cli
[65]: https://awesome-copilot.github.com/plugins/#file=plugins%2Fdatadog
[66]: /fr/account_management/personal-access-tokens/
[67]: /fr/account_management/service-access-tokens/
[68]: /fr/account_management/org_settings/ip_allowlist/
[69]: /fr/data_observability/
[70]: /fr/account_management/audit_trail/
[71]: https://x.ai/build 
[72]: https://github.com/xai-org/plugin-marketplace