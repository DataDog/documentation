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
  text: Extension Datadog pour Cursor
title: Configurer le serveur Datadog MCP
---
Apprenez à configurer et à paramétrer le serveur Datadog MCP, qui vous permet de récupérer des informations de télémétrie et de gérer les fonctionnalités de la plateforme directement depuis des clients alimentés par l'IA. Sélectionnez votre client :

{{< tabs >}}
{{% tab "Cursor" %}}

L'[extension Cursor et VS Code de Datadog][1] inclut un accès intégré au serveur Datadog MCP géré.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettez `--profile` et le nom du profil pour l'installer sur le profil par défaut de Cursor):
    ```shell
    cursor --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2]. Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Connectez-vous à Datadog depuis l'extension IDE" style="width:70%;" >}}
1. **Redémarrez l'IDE.**
1. Confirmez que le serveur Datadog MCP est disponible et que les [outils][3] sont listés : Allez à {{< ui >}}Cursor Settings{{< /ui >}} (`Shift` + `Cmd/Ctrl` + `J`), sélectionnez l'onglet {{< ui >}}Tools & MCP{{< /ui >}} et développez la liste des outils de l'extension.
1. Si vous avez précédemment installé le serveur Datadog MCP manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits.
1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

[2]: /fr/ide_plugins/vscode/?tab=cursor#installation
[3]: /fr/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Claude Code" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}

<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Connectez Claude (y compris Claude Cowork) au serveur Datadog MCP en l'ajoutant comme un {{< ui >}}custom connector{{< /ui >}} avec l'URL MCP distante.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Suivez le guide du centre d'aide de Claude sur [connecteurs personnalisés][1] pour ajouter un nouveau connecteur personnalisé.

1. Lorsque vous êtes invité à entrer une URL, saisissez le point de terminaison du serveur Datadog MCP pour votre [site Datadog][2] ({{< region-param key="dd_site_name" >}}). Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complétez le flux de connexion OAuth lorsque vous y êtes invité.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Modifiez `~/.codex/config.toml` (ou votre fichier de configuration Codex CLI) pour ajouter le serveur Datadog MCP avec le transport HTTP et l'URL du point de terminaison pour votre site. Exemple :

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, ce qui est préférable pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Connectez-vous au serveur Datadog MCP :

   ```shell
   codex mcp login datadog
   ```

   Cela ouvre votre navigateur pour compléter le flux OAuth. Codex stocke les identifiants résultants afin que vous n'ayez pas besoin de vous reconnecter jusqu'à ce que le jeton expire.

1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog régional][1]. Pour les instructions correctes, utilisez le sélecteur **Site Datadog** sur le côté droit de cette page de documentation pour sélectionner votre site:

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] est un terminal agentique avec un support MCP intégré. Dirigez l'agent Warp vers le point de terminaison du serveur MCP pour votre site régional [Datadog][2]. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Dans l'application Warp, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}MCP Servers{{< /ui >}} et cliquez sur {{< ui >}}+ Add{{< /ui >}}.

1. Collez la configuration suivante :

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur {{< ui >}}Start{{< /ui >}} sur le serveur Datadog. Warp ouvre votre navigateur pour compléter le flux de connexion OAuth. Les identifiants sont stockés en toute sécurité sur votre appareil et réutilisés pour les sessions futures.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "VS Code" %}}

L'[extension Cursor et VS Code de Datadog][1] inclut un accès intégré au serveur Datadog MCP géré.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettez `--profile` et le nom du profil pour l'installer sur le profil par défaut de VS Code):
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2]. Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
1. **Redémarrez l'IDE.**
1. Confirmez que le serveur Datadog MCP est disponible et que les [outils][3] sont listés : ouvrez le panneau de discussion, sélectionnez le mode agent et cliquez sur le bouton {{< ui >}}Configure Tools{{< /ui >}}.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Bouton Configurer les Outils dans VS Code" style="width:70%;" >}}
1. Si vous avez précédemment installé manuellement le serveur Datadog MCP, retirez-le de la configuration de l'IDE pour éviter les conflits. Ouvrez la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`) et exécutez `MCP: Open User Configuration`.
1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: /fr/ide_plugins/vscode/?tab=vscode#installation
[3]: /fr/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
{{% /tab %}}

{{% tab "IDE JetBrain" %}}

JetBrains propose les plugins [Junie][1] et [AI Assistant][2] pour sa gamme d'IDEs. GitHub propose le plugin [Copilot][4]. Alternativement, de nombreux développeurs utilisent un agent CLI, tel que Claude Code, Codex ou Gemini CLI, en complément de leur IDE.

Dirigez votre plugin vers le point de terminaison du serveur MCP pour votre [Datadog site][3] régional. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur l'élément `Start` qui apparaît dans l'éditeur pour démarrer le serveur. Vous êtes invité à vous connecter via OAuth.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="Agent CLIs" level="h4" expanded=false id="jetbrains-agent-clis" %}}
De nombreux développeurs utilisent un agent CLI tel que Claude Code, Codex ou Gemini CLI en complément de leur IDE JetBrains. Voir la configuration pour ces outils CLI:
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

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://plugins.jetbrains.com/plugin/26104-junie-the-ai-coding-agent-by-jetbrains
[2]: https://plugins.jetbrains.com/plugin/22282-jetbrains-ai-assistant
[3]: /fr/getting_started/site/
[4]: https://plugins.jetbrains.com/plugin/17718-github-copilot--your-ai-pair-programmer
{{% /tab %}}

{{% tab "Kiro" %}}

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [site Datadog][3] régional. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

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

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

Pour la plupart des autres [clients pris en charge](#supported-clients), utilisez ces instructions pour l'authentification à distance. Pour Cline ou lorsque l'authentification à distance est peu fiable ou non disponible, utilisez [l'authentification binaire locale](#local-binary-authentication).

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [Datadog site][1] régional. Pour les instructions correctes, utilisez le sélecteur {{< ui >}}Datadog Site{{< /ui >}} sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez le serveur Datadog MCP au fichier de configuration de votre client en utilisant le transport HTTP et l'URL de point de terminaison de votre site. Exemple :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer les [outils spécifiques au produit](#toolsets), incluez le paramètre de requête `toolsets` à la fin de l'URL du point de terminaison. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Ensembles d'outils {#toolsets}

Le serveur Datadog MCP prend en charge _ensembles d'outils_, ce qui vous permet d'utiliser uniquement les [outils MCP][49] dont vous avez besoin, économisant ainsi de l'espace précieux dans la fenêtre de contexte. Pour utiliser un ensemble d'outils, incluez le paramètre de requête `toolsets` dans l'URL de point de terminaison lors de la connexion au serveur MCP ([authentification à distance](#authentication) uniquement). Utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles en même temps.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [Datadog site][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

- Récupérer uniquement les outils de base (c'est le défaut si `toolsets` n'est pas spécifié) :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Récupérer uniquement les outils liés aux tests synthétiques :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Récupérer les outils de base, de tests synthétiques et de livraison de logiciels :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Récupérer tous les outils généralement disponibles :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info"> Activer tous les ensembles d'outils augmente le nombre de définitions d'outils envoyées à votre client IA, ce qui consomme de l'espace dans la fenêtre de contexte. <code>toolsets=all</code> fonctionne mieux avec des clients qui prennent en charge le filtrage des outils, comme Claude Code.</div>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Ensembles d'outils disponibles {#available-toolsets}

Ces ensembles d'outils sont généralement disponibles. Voir [Outils du serveur Datadog MCP][49] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de requêtes.

- `core` : L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets de notes
- `alerting` : Outils pour valider et créer des moniteurs, rechercher des groupes de moniteurs, récupérer des modèles de moniteurs, analyser la couverture des moniteurs et rechercher des SLOs
- `cases` : Outils pour [Gestion des cas][42], y compris la création, la recherche et la mise à jour de cas ; la gestion de projets ; et la liaison des Jira issues
- `dashboards` : Outils pour récupérer, créer, mettre à jour et supprimer des [tableaux de bord][46], plus référence et validation du schéma des widgets
- `dbm` : Outils pour interagir avec [Surveillance de base de données][33]
- `ddsql` : Outils pour interroger les données Datadog en utilisant [DDSQL][44], un dialecte SQL avec prise en charge des ressources d'infrastructure, des journaux, des métriques, RUM, des spans et d'autres sources de données Datadog
- `error-tracking` : Outils pour interagir avec Datadog [Error Tracking][32]
- `feature-flags` : Outils pour gérer les [drapeaux de fonctionnalités][35], y compris la création, la liste et la mise à jour des drapeaux et de leurs environnements
- `llmobs` : Outils pour rechercher et analyser les spans et les expériences de [LLM Observabilité][36]
- `networks` : Outils pour l'analyse de [Cloud Network Monitoring][37] et de [Network Device Monitoring][38]
- `onboarding`: Outils d'onboarding agentique pour une configuration et une installation guidées de Datadog
- `product-analytics`: Outils pour interagir avec les requêtes [Product Analytics][41]
- `reference-tables`: Outils pour gérer les [Tables de Référence][48], y compris l'énumération des tables, la lecture des lignes, l'ajout de lignes et la création de tables à partir du stockage cloud
- `security`: Outils pour le scan de sécurité du code et la recherche de [signaux de sécurité][39] et de [constatations de sécurité][40]
- `software-delivery`: Outils pour interagir avec Software Delivery ([CI Visibility][30] et [Test Optimization][31])
- `synthetics`: Outils pour interagir avec les [Synthetic tests][29] de Datadog
- `workflows`: Outils pour [Workflow Automation][43], y compris l'énumération, l'inspection, l'exécution et la configuration des flux de travail pour l'utilisation par les agents

### Outils de prévisualisation {#preview-toolsets}

Ces ensembles d'outils sont en prévisualisation. Inscrivez-vous à un ensemble d'outils en remplissant le formulaire de prévisualisation du produit ou contactez [le support Datadog][47] pour demander l'accès.
- `apm`: ([Inscription][45]) Outils pour une analyse approfondie des traces [APM][34], recherche de spans, insights de Watchdog et investigation des performances

## Clients pris en charge {#supported-clients}

| Client | Développeur | Notes |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommended. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Use [ custom connector setup](?tab=claude#installation). Inclut Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommended. |
| [JetBrains IDEs][18] | JetBrains | [Datadog plugin][18] recommended. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8], [Cline][11] | Divers | Voir l'onglet {{< ui >}}Other{{< /ui >}} ci-dessus. Utilisez l'authentification binaire locale pour Cline si l'authentification à distance est peu fiable. |

<div class="alert alert-info"> Le serveur MCP de Datadog est en plein développement, et d'autres clients pris en charge pourraient devenir disponibles.</div>

## Permissions requises {#required-permissions}

Les outils du serveur MCP nécessitent les permissions de rôle utilisateur [Datadog][22] suivantes :

| Permission | Requise pour |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Outils qui lisent des données de Datadog (par exemple, interroger des moniteurs, rechercher des journaux, récupérer des tableaux de bord) |
| <code style="white-space:nowrap">mcp_write</code> | Outils qui créent ou modifient des ressources dans Datadog (par exemple, créer des moniteurs, mettre des hôtes en sourdine) |

En plus de `mcp_read` ou `mcp_write`, les utilisateurs ont besoin des permissions standard de Datadog pour la ressource sous-jacente. Par exemple, utiliser un outil MCP qui lit des moniteurs nécessite à la fois `mcp_read` et la permission [Moniteurs Lire][24]. Voir [Permissions de rôle Datadog][25] pour la liste complète des permissions au niveau des ressources.

Les utilisateurs avec le **Rôle Standard Datadog** ont par défaut les deux permissions du serveur MCP. Si votre organisation utilise [rôles personnalisés][23], ajoutez les permissions manuellement :
1. Allez à [**Paramètres de l'organisation > Rôles**][26] en tant qu'administrateur, et cliquez sur le rôle que vous souhaitez mettre à jour.
1. Cliquez sur {{< ui >}}Edit Role{{< /ui >}} (icône de crayon).
1. Sous la liste des permissions, sélectionnez les cases à cocher {{< ui >}}MCP Read{{< /ui >}} et {{< ui >}}MCP Write{{< /ui >}}.
1. Sélectionnez toutes les autres permissions au niveau des ressources dont vous avez besoin pour le rôle.
1. Cliquez {{< ui >}}Save{{< /ui >}}.

Les administrateurs d'organisation peuvent gérer l'accès global au MCP et les capacités d'écriture depuis [Paramètres de l'organisation][27].

## Authentification {#authentication}

Le serveur MCP utilise OAuth 2.0 pour [l'authentification][14]. Si vous ne pouvez pas passer par le flux OAuth (par exemple, sur un serveur), vous pouvez fournir une clé [API Datadog et une clé d'application][1] en tant que `DD_API_KEY` et `DD_APPLICATION_KEY` en tant qu'en-têtes HTTP.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [site Datadog][17] sélectionné ({{< region-param key="dd_site_name" >}}) :

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}\
      "headers": {
          "DD_API_KEY": "<YOUR_API_KEY>",
          "DD_APPLICATION_KEY": "<YOUR_APPLICATION_KEY>"
      }
    }
  }
}
</code></pre>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

Pour des raisons de sécurité, utilisez une clé API et une clé d'application à portée limitée provenant d'un [compte de service][13] qui a uniquement les autorisations requises.

### Authentification binaire locale {#local-binary-authentication}

L'authentification locale est recommandée pour Cline et lorsque l'authentification à distance est peu fiable ou indisponible. Après l'installation, vous n'avez généralement pas besoin de mettre à jour le binaire local pour bénéficier des mises à jour du serveur MCP, car les outils sont distants.

{{% collapse-content title="Configurez le binaire local du serveur Datadog MCP" level="h5" expanded=false id="mcp-local-binary" %}}

1. Installez le binaire du serveur Datadog MCP (macOS et Linux) :
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Cela installe le binaire à `~/.local/bin/datadog_mcp_cli`.

   Pour Windows, téléchargez la [version Windows][20].

2. Exécutez `datadog_mcp_cli login` manuellement pour suivre le flux de connexion OAuth et choisir un [site Datadog][21].

3. Configurez votre client AI pour utiliser le transport stdio avec `datadog_mcp_cli` comme commande. Par exemple, sous macOS (remplacez `<USERNAME>` par votre nom d'utilisateur OS) :
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

   Pour d'autres systèmes d'exploitation, remplacez le chemin `command` par l'emplacement du binaire téléchargé :
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