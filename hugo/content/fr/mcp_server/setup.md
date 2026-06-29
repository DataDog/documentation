---
algolia:
  rank: 75
  tags:
  - mcp
  - mcp server
  - setup
aliases:
- /fr/bits_ai/mcp_server/setup/
description: Apprenez à connecter votre agent IA au serveur Datadog MCP.
further_reading:
- link: mcp_server
  tag: Documentation
  text: Serveur Datadog MCP
- link: mcp_server/tools
  tag: Documentation
  text: Outils du serveur Datadog MCP
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extension Datadog pour Cursor
title: Configurer le serveur Datadog MCP
---
Apprenez à configurer et à paramétrer le serveur Datadog MCP, qui vous permet de récupérer des informations de télémétrie et de gérer les fonctionnalités de la plateforme directement depuis des clients alimentés par l'IA. Sélectionnez votre client :

{{< tabs >}}
{{% tab "ChatGPT" %}}

Connectez Datadog à ChatGPT en installant l'[application Datadog][1] depuis le répertoire d'applications de ChatGPT. L'application s'authentifie avec votre organisation Datadog via un flux OAuth.

{{< site-region region="us" >}}
<div class="alert alert-info">L'application Datadog ChatGPT est en aperçu. Pendant l'aperçu, elle est disponible uniquement pour les clients US1.</div>

1. Dans ChatGPT, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Apps{{< /ui >}} > {{< ui >}}Browse Apps{{< /ui >}} et recherchez **Datadog**. Si l'application Datadog n'est pas disponible, contactez l'administrateur ChatGPT de votre organisation pour obtenir une approbation.
1. Sélectionnez l'application, cliquez sur {{< ui >}}Connect{{< /ui >}}, et suivez la configuration guidée.
1. Complétez le flux de connexion OAuth lorsque cela est demandé.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.
{{< /site-region >}}

{{< site-region region="us3,us5,eu,ap1,ap2,gov,gov2" >}}
<div class="alert alert-danger">L'application Datadog ChatGPT n'est pas prise en charge pour votre site <a href="/getting_started/site/">Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://chatgpt.com/apps/datadog--preview/asdk_app_69e8c7f174a08191a28b6da96c8062c4
{{% /tab %}}

{{% tab "Claude" %}}

Installez le [connecteur Datadog](https://claude.ai/directory/connectors/datadog) depuis le répertoire des connecteurs Claude. Le connecteur officiel est la méthode recommandée pour connecter Datadog à Claude (y compris Claude Cowork) et inclut des applications MCP pour des visualisations dans le produit. Si vous avez précédemment ajouté Datadog en tant que connecteur personnalisé, supprimez-le pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Dans Claude, cliquez sur l'icône **+** en bas de n'importe quelle invite, puis cliquez sur {{< ui >}}Add Connector{{< /ui >}}.
1. Trouvez **Datadog** dans le répertoire et activez le connecteur.
1. Complétez le flux de connexion OAuth lorsque cela est demandé.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% collapse-content title="Configuration manuelle avec un connecteur personnalisé" level="h4" expanded=false id="claude-custom-connector" %}}
Si le connecteur du répertoire n'est pas disponible pour vous, vous pouvez ajouter Datadog en tant que [connecteur personnalisé](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) en utilisant l'URL MCP distante pour votre [site Datadog](/getting_started/site/) ({{< region-param key="dd_site_name" >}}). Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}}sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

1. Suivez le guide du centre d'aide Claude sur [les connecteurs personnalisés](https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp) pour ajouter un nouveau connecteur personnalisé.

1. Lorsque vous êtes invité à entrer une URL, saisissez :
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Pour activer [des outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complétez le flux de connexion OAuth lorsque cela est demandé.
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Claude Code" %}}

Installez le Datadog plugin depuis le [official Anthropic Plugin Marketplace](https://code.claude.com/docs/en/discover-plugins#official-anthropic-marketplace). Le plugin regroupe le serveur MCP Datadog avec des compétences intégrées et se met à jour automatiquement lorsque de nouvelles versions de plugins sont publiées. Pour plus de détails, consultez le [dépôt de plugins](https://github.com/datadog-labs/claude-code-plugin). Si vous avez précédemment installé le serveur MCP Datadog manuellement, retirez-le de votre configuration Claude Code pour éviter les conflits.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez le plugin Datadog :
    <pre><code>/plugin install datadog@claude-plugins-official</code></pre>

1. Pour la première configuration, exécutez `/ddsetup` ou entrez toute invite liée à Datadog. Lors de la configuration, sélectionnez votre [site Datadog](/getting_started/site/) et complétez la connexion OAuth. Alternativement, définissez le domaine du serveur MCP (et éventuellement les clés API et d'application Datadog) comme variables d'environnement avant de démarrer Claude Code.

1. Exécutez `/ddtoolsets` pour activer ou désactiver des groupes d'[outils MCP spécifiques au produit](#toolsets).

1. Après avoir effectué tout changement de configuration, exécutez `/reload-plugins` et réauthentifiez-vous en ouvrant `/plugin` et en sélectionnant le plugin Datadog.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

<div class="alert alert-info">Consultez le <a href="https://github.com/datadog-labs/claude-code-plugin">dépôt de plugins</a> pour toutes les commandes slash disponibles et les options de configuration.</div>

{{% collapse-content title="Configuration manuelle du serveur MCP" level="h4" expanded=false id="claudecode-manual" %}}
Si le plugin n'est pas disponible pour vous, pointez Claude Code vers le point de terminaison du serveur MCP pour votre [site Datadog](/getting_started/site/) régional directement. Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}

<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [Datadog site][1] régional. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}}sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Modifiez `~/.codex/config.toml` (ou votre fichier de configuration Codex CLI) pour ajouter le serveur MCP Datadog avec transport HTTP et l'URL de point de terminaison pour votre site. Exemple :

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Pour activer [des outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Connectez-vous au serveur MCP Datadog :

   ```shell
   codex mcp login datadog
   ```

   Cela ouvre votre navigateur pour compléter le flux OAuth. Codex stocke les identifiants résultants afin que vous n'ayez pas besoin de vous reconnecter jusqu'à l'expiration du jeton.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Le <a href="https://github.com/openai/plugins/tree/main/plugins/datadog">Plugin Codex (Aperçu)</a> ne peut être utilisé que dans l'application de bureau Codex dans la région US1. Pour installer, utilisez les <a href="?tab=chatgpt">instructions de l'application ChatGPT</a>. Après avoir installé l'application ChatGPT, le plugin Codex est automatiquement inclus.
</div>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Cursor" %}}

Installez le [Datadog Plugin][1] depuis le Cursor Marketplace—le plugin inclut le serveur MCP Datadog et d'autres ressources. Si vous avez précédemment installé le serveur MCP Datadog manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits. 

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Vous pouvez installer le plugin depuis le Cursor Marketplace ou depuis l'intérieur de Cursor :
   - Depuis le Cursor Marketplace, ouvrez le [Datadog Plugin][1] et cliquez sur **Ajouter à Cursor**.
   - Dans Cursor, accédez à **Paramètres de Cursor** > **Plugins**, puis recherchez le plugin Datadog et cliquez sur **Ajouter à Cursor**.

1. Après l'installation du plugin, tapez `/ddsetup` dans le chat de l'agent pour effectuer la configuration initiale.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

[1]: https://cursor.com/marketplace/datadog
[2]: /fr/ide_plugins/vscode/?tab=cursor#installation
[3]: /fr/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://cursor.com/marketplace/datadog
{{% /tab %}}

{{% tab "Devin" %}}

Connectez Devin au Datadog MCP Server en l'activant depuis le Devin MCP Marketplace. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}}sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Dans Devin, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Marketplace{{< /ui >}} et recherchez `Datadog`.
1. Sélectionnez votre site Datadog pour le {{< ui >}}Server URL{{< /ui >}} ; par exemple, votre site sélectionné est {{< region-param key="dd_site_name" code="true" >}}.
1. Entrez vos clés API et d'application Datadog.
1. Installez et activez le serveur, et complétez le flux de connexion OAuth lorsque cela est demandé.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Pour utiliser des ensembles d'outils spécifiques au produit, configurez un <a href="https://docs.devin.ai/work-with-devin/mcp#setting-up-a-custom-mcp-server">serveur MCP personnalisé</a> dans Devin et incluez le <code>toolsets</code> requête à la fin de l'URL de l'endpoint. Voir <a href="#toolsets">Ensembles d'outils</a> pour plus d'informations.
</div>

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog][1] régional. Pour les instructions correctes, utilisez le sélecteur **Site Datadog** sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Goose" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog][3] régional. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le serveur MCP Datadog à Goose en utilisant l'une des méthodes suivantes :
   - **Installation en un clic (recommandée) :** Utilisez le serveur MCP Datadog {{< region-param key="goose_mcp_install_deeplink" link="true" text="install deeplink" >}}.
   - **Configuration manuelle :** Suivez les instructions de Goose pour [ajouter un serveur MCP][2], en utilisant l'endpoint listé dans cette section comme l'URL du serveur HTTP diffusé. Pour modifier la configuration directement, modifiez `~/.config/goose/config.yaml`.

1. Pour activer [des outils spécifiques au produit][1], incluez le paramètre de requête `toolsets` à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

    To enable all generally available toolsets, use `toolsets=all`. This works best for clients that support tool filtering.

1. Lors du premier lancement de session, choisissez votre compte Datadog lorsque cela est demandé pour l'authentification.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[1]: #toolsets
[2]: https://goose-docs.ai/docs/getting-started/using-extensions#mcp-servers
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "IDE JetBrain" %}}

JetBrains propose les plugins [Junie][1] et [AI Assistant][2] pour sa gamme d'IDE. GitHub propose le plugin [Copilot][4]. Alternativement, de nombreux développeurs utilisent un agent CLI, tel que Claude Code, Codex ou Gemini CLI, en complément de leur IDE.

Dirigez votre plugin vers le point de terminaison du serveur MCP pour votre site régional [Datadog][3]. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur l'élément `Start` qui apparaît dans l'éditeur pour démarrer le serveur. Vous êtes invité à vous connecter via OAuth.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="Agents CLI" level="h4" expanded=false id="jetbrains-agent-clis" %}}
De nombreux développeurs utilisent un agent CLI tel que Claude Code, Codex ou Gemini CLI avec leur IDE JetBrains. Voir la configuration de ces outils CLI :
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

Le [plugin Datadog pour les IDE JetBrains][3] s'intègre à ces agents CLI. Pour une expérience ininterrompue, installez le plugin en même temps que vous configurez le serveur MCP Datadog.

[3]: /fr/ide_plugins/idea/
[4]: /fr/mcp_server/setup/?tab=claudecode
[5]: /fr/mcp_server/setup/?tab=codex
[6]: /fr/mcp_server/setup/?tab=geminicli
{{% /collapse-content %}}
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /fr/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog][3] régional. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez ce qui suit à votre [fichier de configuration Kiro MCP][2] (`~/.kiro/settings/mcp.json` pour la configuration spécifique à l'utilisateur) :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "OpenCode" %}}

Connectez [OpenCode][3] au serveur MCP Datadog avec le [plugin Datadog OpenCode][2] officiel (en aperçu). Le plugin écrit et maintient l'entrée du serveur MCP dans votre `opencode.json` et expose les outils `ddsetup`, `ddconfig` et `ddtoolsets` que l'agent utilise pour gérer la configuration, les changements de site et la sélection de [toolset](#toolsets).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}

1. Ajoutez le plugin à votre fichier de configuration `opencode.json`. Créez le fichier s'il n'existe pas :

   <pre><code>{
     "plugin": ["@datadog/opencode-plugin"]
   }</code></pre>

    If a `plugin` array already exists, add `"@datadog/opencode-plugin"` to it.

    If you previously configured the Datadog MCP Server manually in `opencode.json`, remove or disable that entry to avoid conflicts with the plugin.

1. Redémarrez OpenCode. Le package est récupéré depuis npm au démarrage.

1. Demandez à l'agent d'exécuter `ddsetup`. Le plugin guide la sélection du site.

1. Redémarrez OpenCode à nouveau pour activer le serveur MCP et complétez le flux de connexion OAuth lorsque cela est demandé.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

1. Pour activer les [outils spécifiques au produit](#toolsets), demandez à l'agent d'exécuter `ddtoolsets`.

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

Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent :

<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Pour activer tous les ensembles d'outils généralement disponibles, utilisez `toolsets=all`. Cela fonctionne mieux pour les clients qui prennent en charge le filtrage des outils.
{{% /collapse-content %}}

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[2]: https://github.com/datadog-labs/opencode-plugin
[3]: https://opencode.ai/
{{% /tab %}}

{{% tab "VS Code" %}}

L'extension [Cursor et VS Code de Datadog][1] inclut un accès intégré au serveur MCP géré par Datadog. GitHub Copilot peut également accéder au serveur MCP de Datadog dans VS Code (nécessite un abonnement actif à GitHub Copilot).

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettez `--profile` et le nom de profil pour l'installer sur le profil par défaut de VS Code) :
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2]. Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
1. **Redémarrez l'IDE.**
1. Confirmez que le serveur MCP de Datadog est disponible et que les [outils][3] sont listés : ouvrez le panneau de discussion, sélectionnez le mode agent et cliquez sur le bouton {{< ui >}}Configure Tools{{< /ui >}}.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Bouton Configurer les outils dans VS Code" style="width:70%;" >}}
1. Si vous avez précédemment installé le serveur MCP de Datadog manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits. Ouvrez la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`) et exécutez `MCP: Open User Configuration`.
1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: /fr/ide_plugins/vscode/?tab=vscode#installation
[3]: /fr/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] est un terminal agentique avec un support MCP intégré. Dirigez l'agent Warp vers le point de terminaison du serveur MCP pour votre [site Datadog][2] régional. Pour les instructions correctes, utilisez le {{< ui >}}Datadog Site{{< /ui >}}sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Dans l'application Warp, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} et cliquez sur {{< ui >}}+ Add{{< /ui >}}.

1. Collez la configuration suivante :

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and Agent Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur {{< ui >}}Start{{< /ui >}} sur le serveur Datadog. Warp ouvre votre navigateur pour compléter le flux de connexion OAuth. Les identifiants sont stockés en toute sécurité sur votre appareil et réutilisés pour les sessions futures.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

Pour la plupart des [clients pris en charge](#supported-clients), utilisez ces instructions pour l'authentification à distance. Pour Cline ou lorsque l'authentification à distance est peu fiable ou non disponible, utilisez [l'authentification binaire locale](#local-binary-authentication).

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre site [Datadog][1]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}) : <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le serveur Datadog MCP au fichier de configuration de votre client en utilisant le transport HTTP et l'URL de point de terminaison de votre site. Exemple :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils APM et d'observabilité de l'agent (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Le serveur MCP Datadog n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Ensembles d'outils {#toolsets}

Le serveur Datadog MCP prend en charge _les ensembles d'outils_, ce qui vous permet d'utiliser uniquement les [outils MCP][49] dont vous avez besoin, économisant ainsi de l'espace précieux dans la fenêtre de contexte. Pour utiliser un ensemble d'outils, incluez le `toolsets` paramètre de requête dans l'URL de point de terminaison lors de la connexion au serveur MCP ([authentification à distance](#authentication) uniquement). Utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles en même temps.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [Datadog site] sélectionné ({{< region-param key="dd_site_name" >}}) :

- Récupérez uniquement les outils principaux (c'est le paramètre par défaut si `toolsets` n'est pas spécifié) :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Récupérez uniquement les outils liés aux tests synthétiques :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Récupérez les outils principaux, les outils de test synthétiques et les outils de livraison de logiciels :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Récupérez tous les outils généralement disponibles :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Activer tous les ensembles d'outils augmente le nombre de définitions d'outils envoyées à votre client AI, ce qui consomme de l'espace dans la fenêtre de contexte. <code>toolsets=all</code> fonctionne mieux avec des clients qui prennent en charge le filtrage des outils, comme Claude Code.</div>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Omettez des outils spécifiques {#omit-specific-tools}

Utilisez le `omit_tools` paramètre de requête pour supprimer des outils spécifiques de la liste finale des outils.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Exemples pour votre site sélectionné ({{< region-param key="dd_site_name" >}}) :

- Omettez des outils de l'ensemble par défaut :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?omit_tools=search_datadog_logs,search_datadog_spans</code></pre>

- Sélectionnez des ensembles d'outils, puis omettez un outil :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,software-delivery&omit_tools=search_datadog_incidents</code></pre>

- Commencez par tous les ensembles d'outils généralement disponibles, puis omettez les outils d'écriture :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all&omit_tools=create_datadog_notebook,edit_datadog_notebook</code></pre>
{{< /site-region >}}

Fournissez les noms des outils sous forme de liste séparée par des virgules. Lorsque les deux paramètres sont présents, le serveur résout d'abord `toolsets` puis supprime les outils correspondants dans `omit_tools`. Si `omit_tools` inclut des noms d'outils inconnus, le serveur avertit et continue.

### Ensembles d'outils disponibles {#available-toolsets}

Ces ensembles d'outils sont généralement disponibles. Consultez [Datadog MCP Server Tools][49] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de requêtes.

- `core` : L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets de notes
- `alerting` : Outils pour valider et créer des moniteurs, rechercher des groupes de moniteurs, récupérer des modèles de moniteurs, analyser la couverture des moniteurs et rechercher des SLOs.
- `cases` : Outils pour [Case Management][42], y compris la création, la recherche et la mise à jour des cas ; la gestion des projets ; et le lien avec les problèmes Jira.
- `dashboards` : Outils pour récupérer, créer, mettre à jour et supprimer des [dashboards][46], ainsi que pour la référence et la validation du schéma des widgets.
- `dbm` : Outils pour interagir avec [Database Monitoring][33].
- `ddsql` : Outils pour interroger les données Datadog en utilisant [DDSQL][44], un dialecte SQL avec support pour les ressources d'infrastructure, les journaux, les métriques, RUM, les spans et d'autres sources de données Datadog.
- `error-tracking` : Outils pour interagir avec [Suivi des erreurs][32] de Datadog.
- `feature-flags` : Outils pour gérer les [feature flags][35], y compris la création, l'énumération et la mise à jour des flags et de leurs environnements.
- `kubernetes` : Outils pour rechercher et décrire les ressources [Kubernetes][51] et récupérer des manifests à travers tous les clusters.
- `llmobs` : Outils pour rechercher et analyser les spans et les expériences [Agent Observability][36].
- `networks` : Outils pour l'analyse de [Cloud Network Monitoring][37] et [Network Device Monitoring][38].
- `onboarding` : Outils d'intégration agentique pour une configuration et une mise en place guidées de Datadog.
- `product-analytics` : Outils pour interagir avec les requêtes de [Product Analytics].
- `profiling` : Outils pour découvrir, explorer et analyser les données de [Continuous Profiler][58].
- `reference-tables` : Outils pour gérer [Reference Tables][48], y compris l'énumération des tables, la lecture des lignes, l'ajout de lignes et la création de tables à partir du stockage cloud.
- `security` : Outils pour l'analyse de la sécurité du code et la recherche de [security signals][39] et de [security findings][40].
- `software-delivery` : Outils pour interagir avec la livraison de logiciels ([CI Visibility][30] et [Test Optimization][31]).
- `synthetics` : Outils pour interagir avec les [Synthetic tests][29] de Datadog.
- `widgets` : Outils pour la visualisation, la validation et la conversion de type des widgets de [dashboard][46] et de [notebook][54].
- `workflows` : Outils pour [Workflow Automation][43], y compris l'énumération, l'inspection, l'exécution et la configuration des workflows pour l'utilisation par les agents.

###  : Ensembles d'outils de prévisualisation {#preview-toolsets}

Ces ensembles d'outils sont en prévisualisation. Inscrivez-vous à un ensemble d'outils en remplissant le formulaire de prévisualisation du produit ou contactez [Datadog support][47] pour demander l'accès.
- `apm` : ([Inscrivez-vous][45]) Outils pour une analyse approfondie des traces [APM][34], la recherche de spans, les Watchdog insights et l'enquête sur les performances.
- `code-exec` : ([Inscrivez-vous][60]) Un outil unique qui exécute du TypeScript écrit par des agents dans un bac à sable géré par Datadog avec un accès direct aux API de Datadog, pour une enquête multi-signaux et une exploration de données ad hoc en un seul appel.
- `remote-actions`: ([Inscrivez-vous][62]) Outils pour les diagnostics sur hôte, y compris la lecture de fichiers, la liste des répertoires et l'exécution de commandes shell en lecture seule directement sur les hôtes instrumentés via l'Agent
- `rum`: Outils pour [Real User Monitoring][57], y compris la synthèse des performances applicatives, l'inspection de la configuration des applications et la réalisation d'analyses de performance

## Clients pris en charge {#supported-clients}

| Client | Développeur | Remarques |
|--------|------|------|
| [ChatGPT][59] | OpenAI | En prévisualisation, et disponible uniquement pour les clients US1. |
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommandée. |
| [Claude Code][4] | Anthropic | Datadog [Claude Code plugin][55] recommandé. |
| [Claude][19] | Anthropic | Datadog [Claude Connector][56] recommandé. Inclut Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommandée. |
| [JetBrains IDEs][18] | JetBrains | Datadog [Datadog plugin][18] recommandé. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8] | Agentic AI Foundation | |
| [OpenCode][52] | SST | Datadog [OpenCode plugin][53] recommandé. |
| [Cline][11] | Divers | Voir l'onglet {{< ui >}}Other{{< /ui >}} ci-dessus. Utilisez l'authentification binaire locale pour Cline si l'authentification à distance est peu fiable. |

<div class="alert alert-info">Le serveur Datadog MCP est en plein développement, et d'autres clients pris en charge pourraient devenir disponibles.</div>

## Permissions requises {#required-permissions}

Les outils du serveur MCP nécessitent les [permissions de rôle utilisateur Datadog][22] suivantes :

| Permission | Requise pour |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Outils qui lisent des données de Datadog (par exemple, interroger des moniteurs, rechercher des journaux, récupérer des tableaux de bord) |
| <code style="white-space:nowrap">mcp_write</code> | Outils qui créent ou modifient des ressources dans Datadog (par exemple, créer des moniteurs, mettre des hôtes en sourdine) |

En plus de `mcp_read` ou `mcp_write`, les utilisateurs ont besoin des permissions standard Datadog pour la ressource sous-jacente. Par exemple, utiliser un outil MCP qui lit des moniteurs nécessite à la fois `mcp_read` et la permission [Monitors Read][24] : Voir [Datadog Role Permissions][25] pour la liste complète des permissions au niveau des ressources.

Les utilisateurs ayant le **Datadog Standard Role** disposent par défaut des autorisations du serveur MCP. Si votre organisation utilise des [custom roles][23], ajoutez les autorisations manuellement :
1. Allez dans [**Organization Settings > Roles**][26] en tant qu'administrateur, et cliquez sur le rôle que vous souhaitez mettre à jour.
1. Cliquez sur {{< ui >}}Edit Role{{< /ui >}} (icône de crayon).
1. Sous la liste des autorisations, sélectionnez les cases à cocher {{< ui >}}MCP Read{{< /ui >}} et {{< ui >}}MCP Write{{< /ui >}}.
1. Sélectionnez toutes les autres autorisations au niveau des ressources dont vous avez besoin pour le rôle.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

Les administrateurs d'organisation peuvent gérer l'accès global au MCP et les capacités d'écriture depuis [Organization Settings][27].

## Authentification {#authentication}

Le serveur MCP utilise OAuth 2.0 pour [l'authentification][14]. Si vous ne pouvez pas passer par le flux OAuth (par exemple, sur un serveur), vous pouvez fournir une [API key and application key][1] en tant qu'en-têtes HTTP `DD_API_KEY` et `DD_APPLICATION_KEY`.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [Datadog site][17] ({{< region-param key="dd_site_name" >}}) :

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

Pour des raisons de sécurité, utilisez une clé API et une clé d'application à portée limitée provenant d'un [service account][13] qui dispose uniquement des autorisations requises.

### Ajout de clients OAuth {#adding-oauth-clients}

Vous pouvez autoriser vos URL de redirection dans [Organization Preferences][27] sous `MCP OAuth Redirect URLs`. 

Si vous êtes un partenaire ou un fournisseur ajoutant Datadog à un annuaire MCP pour votre plateforme d'agent IA, soumettez votre intérêt via le [Technology Partner Signup][61].

### Authentification binaire locale {#local-binary-authentication}

L'authentification locale est recommandée pour Cline et lorsque l'authentification à distance est peu fiable ou indisponible. Après l'installation, vous n'avez généralement pas besoin de mettre à jour le binaire local pour bénéficier des mises à jour du serveur MCP, car les outils sont à distance.

{{% collapse-content title="Configurez le binaire local du serveur Datadog MCP" level="h5" expanded=false id="mcp-local-binary" %}}

1. Installez le binaire du serveur Datadog MCP (macOS et Linux) :
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Cela installe le binaire dans `~/.local/bin/datadog_mcp_cli`.

   Pour Windows, téléchargez la [version Windows][20].

2. Exécutez `datadog_mcp_cli login` manuellement pour suivre le flux de connexion OAuth et choisir un [Datadog site][21].

3. Configurez votre client AI pour utiliser le transport stdio avec `datadog_mcp_cli` comme commande. Par exemple, sur macOS (remplacez `<USERNAME>` par votre nom d'utilisateur OS) :
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

   Pour d'autres systèmes d'exploitation, remplacez le chemin `command` par l'emplacement du binaire téléchargé :
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

## Lecture complémentaire : {#further-reading}

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
[49]: /fr/mcp_server/tools
[50]: https://github.com/google-gemini/gemini-cli
[51]: /fr/containers/monitoring/kubernetes_explorer/
[52]: https://opencode.ai/
[53]: https://github.com/datadog-labs/opencode-plugin
[54]: /fr/notebooks/
[55]: https://claude.com/plugins/datadog
[56]: https://claude.ai/directory/connectors/datadog
[57]: /fr/real_user_monitoring/
[58]: https://partners.datadoghq.com/s/login/SelfRegister
[59]: https://chatgpt.com/
[60]: https://www.datadoghq.com/product-preview/mcp-codexec/
[61]: /fr/getting_started/profiler/
[62]: https://www.datadoghq.com/product-preview/datadog-agent-mcp/