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
  text: Outils de Datadog MCP Server
- link: ide_plugins/vscode/?tab=cursor
  tag: Documentation
  text: Extension Datadog pour Cursor
title: Configurer le Datadog MCP Server
---
Apprenez à configurer et à paramétrer le Datadog MCP Server, qui vous permet de récupérer des informations de télémétrie et de gérer les fonctionnalités de la plateforme directement depuis des clients alimentés par l'IA. Sélectionnez votre client :

{{< tabs >}}
{{% tab "Cursor" %}}

L'[extension Cursor et VS Code de Datadog][1] inclut un accès intégré au Datadog MCP Server géré.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettre `--profile` et le nom de profil pour installer le profil par défaut de Cursor) :
    ```shell
    cursor --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2] . Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
   {{< img src="bits_ai/mcp_server/ide_sign_in.png" alt="Connectez-vous à Datadog depuis l'extension IDE" style="width:70%;" >}}
1. **Redémarrez l'IDE.**
1. Confirmez que le Datadog MCP Server est disponible et que les [outils][3] sont listés : Allez à {{< ui >}}Paramètres de Cursor{{< /ui >}} (`Shift` + `Cmd/Ctrl` + `J`), sélectionnez le {{< ui >}}Outils & MCP{{< /ui >}} onglet, et développez la liste des outils de l'extension.
1. Si vous avez précédemment installé manuellement le Datadog MCP Server, retirez-le de la configuration de l'IDE pour éviter les conflits.
1. Vérifiez que vous disposez des [permissions](#required-permissions) requises pour accéder aux ressources Datadog que vous souhaitez utiliser.

[2]: /fr/ide_plugins/vscode/?tab=cursor#installation
[3]: /fr/bits_ai/mcp_server/tools
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/ide_plugins/vscode/
{{% /tab %}}

{{% tab "Claude Code" %}}

Dirigez votre agent IA vers le point de terminaison du Datadog MCP Server pour votre [site Datadog][1] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Exécutez dans le terminal :
    <pre><code>claude mcp add --transport http datadog-mcp {{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Alternativement, ajoutez à `~/.claude.json` :
    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
         }
       }
    }</code></pre>

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}

<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Claude" %}}

Connectez Claude (y compris Claude Cowork) au Datadog MCP Server en l'ajoutant en tant que {{< ui >}}connecteur personnalisé{{< /ui >}} avec l'URL MCP distante.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Suivez le guide du centre d'aide de Claude sur [connecteurs personnalisés][1] pour ajouter un nouveau connecteur personnalisé.

1. Lorsque vous êtes invité à entrer une URL, saisissez l'endpoint du Datadog MCP Server pour votre [site Datadog][2] ({{< region-param key="dd_site_name" >}}). Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

   Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Complétez le flux de connexion OAuth lorsque vous y êtes invité.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

[1]: https://support.claude.com/en/articles/11175166-get-started-with-custom-connectors-using-remote-mcp
[2]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre <a href="/getting_started/site/">site Datadog</a> sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{% /tab %}}

{{% tab "Codex" %}}

Dirigez votre agent IA vers le point de terminaison du Datadog MCP Server pour votre [site Datadog][1] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Modifiez `~/.codex/config.toml` (ou votre fichier de configuration Codex CLI) pour ajouter le Datadog MCP Server avec le transport HTTP et l'URL de l'endpoint pour votre site. Exemple :

   <pre><code>[mcp_servers.datadog]
   url = "{{< region-param key="mcp_server_endpoint" >}}"
   </code></pre>

   Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Connectez-vous au Datadog MCP Server :

   ```shell
   codex mcp login datadog
   ```

   Cela ouvre votre navigateur pour compléter le flux OAuth. Codex stocke les identifiants résultants afin que vous n'ayez pas besoin de vous reconnecter jusqu'à ce que le jeton expire.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Gemini CLI" %}}

Dirigez votre agent IA vers le point de terminaison du Datadog MCP Server pour votre [site Datadog][1] régional. Pour les instructions correctes, utilisez le sélecteur **Site Datadog** sur le côté droit de cette page de documentation pour sélectionner votre site.

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

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

Vérifiez que vous avez les 1.permissions[ requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

<div class="alert alert-info">Si l'authentification à distance n'est pas disponible, utilisez <a href="#local-binary-authentication">l'authentification binaire locale</a> à la place.</div>

[1]: /fr/getting_started/site/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Warp" %}}

[Warp][1] est un terminal agentique avec un support MCP intégré. Dirigez l'agent Warp vers le point de terminaison du Datadog MCP Server pour votre [site Datadog][2] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Dans l'application Warp, allez à {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Serveurs MCP{{< /ui >}} et cliquez sur {{< ui >}}+ Ajouter{{< /ui >}}.

1. Collez la configuration suivante :

    <pre><code>{
      "Datadog": {
        "url": "{{< region-param key="mcp_server_endpoint" >}}"
      }
    }</code></pre>

    To enable [product-specific tools](#toolsets), include the `toolsets` query parameter at the end of the endpoint URL. For example, this URL enables _only_ APM and LLM Observability tools (use `toolsets=all` to enable all generally available toolsets, best for clients that support tool filtering):

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez {{< ui >}}Démarrer{{< /ui >}} sur le Datadog MCP Server. Warp ouvre votre navigateur pour compléter le flux de connexion OAuth. Les identifiants sont stockés en toute sécurité sur votre appareil et réutilisés pour les sessions futures.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le Datadog MCP Server n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[1]: https://www.warp.dev/
[2]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "VS Code" %}}

L'[extension Cursor et VS Code de Datadog][1] inclut un accès intégré au Datadog MCP Server géré.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
1. Installez l'extension (omettre `--profile` et le nom de profil pour installer sur le profil par défaut de VS Code) :
    ```shell
    code --install-extension datadog.datadog-vscode --profile <PROFILE_NAME>
    ```
   Alternativement, installez l'[extension Datadog][2]. Si vous avez déjà installé l'extension, assurez-vous qu'elle est à jour.
1. Connectez-vous à votre compte Datadog.
1. **Redémarrez l'IDE.**
1. Confirmez que le Datadog MCP Server est disponible et que les [outils][3] sont listés : ouvrez le panneau de discussion, sélectionnez le mode agent et cliquez sur le {{< ui >}}Configurer les outils{{< /ui >}} bouton.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Bouton Configurer les outils dans VS Code" style="width:70%;" >}}
1. Si vous avez précédemment installé le Datadog MCP Server manuellement, retirez-le de la configuration de l'IDE pour éviter les conflits. Ouvrez la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`) et exécutez `MCP: Open User Configuration`.
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

JetBrains propose les plugins [Junie][1] et [AI Assistant][2] pour sa gamme d'IDE. GitHub propose le plugin [Copilot][4]. Alternativement, de nombreux développeurs utilisent un agent CLI, tel que Claude Code, Codex ou Gemini CLI, en parallèle avec leur IDE.

Dirigez votre plugin vers le point de terminaison du serveur MCP pour votre [site Datadog][3] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

{{% collapse-content title="Junie" level="h4" expanded=false id="jetbrains-junie" %}}
1. Allez à {{< ui >}}Outils{{< /ui >}} > {{< ui >}}Junie{{< /ui >}} > {{< ui >}}Paramètres MCP{{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Vous êtes invité à vous connecter via OAuth. L'indicateur de statut dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="JetBrains AI Assistant" level="h4" expanded=false id="jetbrains-ai-assistant" %}}
1. Allez à {{< ui >}}Outils{{< /ui >}} > {{< ui >}}AI Assistant{{< /ui >}} > {{< ui >}}Protocole de Contexte de Modèle (MCP){{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
          "headers": {
            "DD_API_KEY": "<YOUR_API_KEY>",
            "DD_APPLICATION_KEY": "<YOUR_APP_KEY>"
          }
        }
      }
    }
    </code></pre>

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. L'indicateur de statut dans les paramètres affiche une coche verte lorsque la connexion est réussie.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="GitHub Copilot" level="h4" expanded=false id="github-copilot" %}}
1. Allez à {{< ui >}}Outils{{< /ui >}} > {{< ui >}}GitHub Copilot{{< /ui >}} > {{< ui >}}Protocole de Contexte de Modèle (MCP){{< /ui >}} et ajoutez le bloc suivant :

    <pre><code>{
      "servers": {
        "datadog": {
          "type": "http",
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }
    </code></pre>

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1. Cliquez sur l'élément `Start` qui apparaît dans l'éditeur pour démarrer le serveur. Vous êtes invité à vous connecter via OAuth.

1. Vérifiez que vous avez les [permissions](#required-permissions) requises pour les ressources Datadog auxquelles vous souhaitez accéder.

{{% /collapse-content %}}

{{% collapse-content title="Agents CLI" level="h4" expanded=false id="jetbrains-agent-clis" %}}
De nombreux développeurs utilisent un CLI d'agent tel que Claude Code, Codex ou Gemini CLI en parallèle avec leur IDE JetBrains. Voir la configuration pour ces outils CLI :
- [Claude Code][4]
- [Codex][5]
- [Gemini CLI][6]

Le [plugin Datadog pour les IDE JetBrains][3] s'intègre avec ces agents CLI. Pour une expérience ininterrompue, installez le plugin en même temps que vous configurez le serveur Datadog MCP.

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

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [Datadog site][3] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Point de terminaison sélectionné ({{< region-param key="dd_site_name" >}}): <code>{{< region-param key="mcp_server_endpoint" >}}</code>.

1. Ajoutez ce qui suit à votre [fichier de configuration Kiro MCP][2] (`~/.kiro/settings/mcp.json` pour une configuration spécifique à l'utilisateur) :

    <pre><code>{
      "mcpServers": {
        "datadog": {
          "url": "{{< region-param key="mcp_server_endpoint" >}}"
        }
      }
    }</code></pre>

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1.Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

[2]: https://kiro.dev/docs/mcp/configuration/
{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

[3]: /fr/getting_started/site/
{{% /tab %}}

{{% tab "Other" %}}

Pour la plupart des autres [clients pris en charge](#supported-clients), utilisez ces instructions pour l'authentification à distance. Pour Cline ou lorsque l'authentification à distance est peu fiable ou non disponible, utilisez [l'authentification binaire locale](#local-binary-authentication).

Dirigez votre agent IA vers le point de terminaison du serveur MCP pour votre [Datadog site][1] régional. Pour les instructions correctes, utilisez le {{< ui >}}Site Datadog{{< /ui >}} sélecteur sur le côté droit de cette page de documentation pour sélectionner votre site.

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

1. Pour activer [des outils spécifiques au produit](#toolsets), incluez le `toolsets`paramètre de requête à la fin de l'URL de l'endpoint. Par exemple, cette URL active _uniquement_ les outils d'Observabilité APM et LLM (utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles, idéal pour les clients qui prennent en charge le filtrage des outils) :

    <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=apm,llmobs</code></pre>

1.Vérifiez que vous avez les [permissions](#required-permissions) requises pour accéder aux ressources Datadog auxquelles vous souhaitez accéder.

{{< /site-region >}}

{{< site-region region="gov" >}}
<div class="alert alert-danger">Le serveur Datadog MCP n'est pas pris en charge pour votre site sélectionné ({{< region-param key="dd_site_name" >}}).</div>

{{< /site-region >}}

[1]: /fr/getting_started/site/
{{% /tab %}}
{{< /tabs >}}

## Ensembles d'outils {#toolsets}

Le serveur Datadog MCP prend en charge _les ensembles d'outils_, ce qui vous permet d'utiliser uniquement les [outils MCP][49] dont vous avez besoin, économisant ainsi de l'espace dans la fenêtre de contexte. Pour utiliser un ensemble d'outils, incluez le `toolsets`paramètre de requête dans l'URL de point de terminaison lors de la connexion au serveur MCP ([authentification à distance](#authentication) uniquement). Utilisez `toolsets=all` pour activer tous les ensembles d'outils généralement disponibles en même temps.

{{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
Par exemple, en fonction de votre [site Datadog sélectionné][17] ({{< region-param key="dd_site_name" >}}) :

- Récupérer uniquement les outils de base (c'est le paramètre par défaut si `toolsets` n'est pas spécifié) :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}</code></pre>

- Récupérer uniquement les outils liés aux tests synthétiques :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=synthetics</code></pre>

- Récupérer les outils de base, les outils de test synthétiques et les outils de livraison de logiciels :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,synthetics,software-delivery</code></pre>

- Récupérer tous les outils généralement disponibles :
  <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=all</code></pre>

<div class="alert alert-info">Activer tous les ensembles d'outils augmente le nombre de définitions d'outils envoyées à votre client IA, ce qui consomme de l'espace dans la fenêtre de contexte. <code>toolsets=all</code> fonctionne le mieux avec des clients qui prennent en charge le filtrage des outils, comme Claude Code.</div>

[17]: /fr/getting_started/site/#navigate-the-datadog-documentation-by-site
{{< /site-region >}}

### Ensembles d'outils disponibles {#available-toolsets}

Ces ensembles d'outils sont généralement disponibles. Voir [Outils du serveur Datadog MCP][49] pour une référence complète des outils disponibles organisés par ensemble d'outils, avec des exemples de requêtes.

- `core`: L'ensemble d'outils par défaut pour les journaux, les métriques, les traces, les tableaux de bord, les moniteurs, les incidents, les hôtes, les services, les événements et les carnets de notes
- `alerting`: Outils pour valider et créer des moniteurs, rechercher des groupes de moniteurs, récupérer des modèles de moniteurs, analyser la couverture des moniteurs et rechercher des SLOs
- `cases`: Outils pour [Gestion des cas][42], y compris la création, la recherche et la mise à jour des cas ; la gestion des projets ; et la liaison avec les tickets Jira :
- `dashboards`: Outils pour récupérer, créer, mettre à jour et supprimer des [tableaux de bord][46], plus référence et validation du schéma des widgets
- `dbm`: Outils pour interagir avec [Surveillance de base de données][33]
- `ddsql`: Outils pour interroger les données Datadog en utilisant [DDSQL][44], un dialecte SQL avec prise en charge des ressources d'infrastructure, des journaux, des métriques, RUM, des spans et d'autres sources de données Datadog
- `error-tracking` : Outils pour interagir avec Datadog [Suivi des erreurs][32]
- `feature-flags`: Outils pour gérer [feature flags][35], y compris créer, lister et mettre à jour les [feature flags] et leurs environnements
- `llmobs`: Outils pour rechercher et analyser les spans et les expériences de [LLM Observability][36]
- `networks`: Outils pour l'analyse de [Cloud Network Monitoring][37] et de [Network Device Monitoring][38]
- `onboarding`: Outils d'intégration agentique pour une installation et une configuration guidées de Datadog
- `product-analytics`: Outils pour interagir avec les requêtes [Product Analytics][41]
- `reference-tables`: Outils pour gérer [Reference Tables][48], y compris lister les tables, lire les lignes, ajouter des lignes et créer des tables à partir du stockage cloud
- `security`: Outils pour le scan de sécurité du code et la recherche de [security signals][39] et [security findings][40]
- `software-delivery`: Outils pour interagir avec Software Delivery ([CI Visibility][30] et [Test Optimization][31])
- `synthetics`: Outils pour interagir avec Datadog [Synthetic tests][29]
- `workflows`: Outils pour [Workflow Automation][43], y compris lister, inspecter, exécuter et configurer les workflows pour une utilisation par les agents

### Outils de prévisualisation {#preview-toolsets}

Ces ensembles d'outils sont en prévisualisation. Inscrivez-vous à un ensemble d'outils en remplissant le formulaire de prévisualisation du produit ou contactez [Datadog support][47] pour demander l'accès.
- `apm`: ([Sign up][45]) Outils pour une analyse approfondie des traces [APM][34], la recherche de spans, les insights de Watchdog et l'investigation des performances

## Clients pris en charge {#supported-clients}

| Client | Développeur | Notes |
|--------|------|------|
| [Cursor][3] | Cursor | Datadog [Cursor & VS Code extension][15] recommandé. |
| [Claude Code][4] | Anthropic | |
| [Claude][19] | Anthropic | Utilisez [configuration de connecteur personnalisé](?tab=claude#installation). Comprend Claude Cowork. |
| [Codex CLI][6] | OpenAI | |
| [Gemini CLI][50] | Google | |
| [Warp][28] | Warp | |
| [VS Code][7] | Microsoft | Datadog [Cursor & VS Code extension][16] recommandé. |
| [JetBrains IDEs][18] | JetBrains | [Plugin Datadog][18] recommandé. |
| [Kiro][9], [Kiro CLI][10] | Amazon Web Services | |
| [Goose][8], [Cline][11] | Divers | Voir l'onglet ci-dessus. {{< ui >}}Other{{< /ui >}} onglet ci-dessus. Utilisez l'authentification binaire locale pour Cline si l'authentification à distance est peu fiable. |

<div class="alert alert-info">Le serveur MCP Datadog est en cours de développement significatif, et d'autres clients pris en charge pourraient devenir disponibles.</div>

## Autorisations requises {#required-permissions}

Les outils du serveur MCP nécessitent les autorisations associées au rôle utilisateur Datadog [22] suivantes :

| Permission | Requise pour |
|------------|-------------|
| <code style="white-space:nowrap">mcp_read</code> | Outils qui lisent des données de Datadog (par exemple, interroger des moniteurs, rechercher des journaux, récupérer des tableaux de bord) |
| <code style="white-space:nowrap">mcp_write</code> | Outils qui créent ou modifient des ressources dans Datadog (par exemple, créer des moniteurs, mettre des hôtes en sourdine) |

En plus de `mcp_read` ou `mcp_write`, les utilisateurs ont besoin des autorisations standard de Datadog pour la ressource sous-jacente. Par exemple, utiliser un outil MCP qui lit des moniteurs nécessite à la fois `mcp_read` et l'autorisation [Monitors Read][24]. Voir [Autorisations des rôles Datadog][25] pour la liste complète des autorisations au niveau des ressources.

Les utilisateurs disposant du **Rôle Standard Datadog** bénéficient par défaut des autorisations du serveur MCP. Si votre organisation utilise [rôles personnalisés][23], ajoutez les autorisations manuellement :
1. Allez à [**Paramètres de l'organisation > Rôles**][26] en tant qu'administrateur, et cliquez sur le rôle que vous souhaitez mettre à jour.
1. Clic {{< ui >}}Modifier le rôle{{< /ui >}} (icône de crayon).
1. Sous la liste des autorisations, sélectionnez le {{< ui >}}MCP Read{{< /ui >}} et {{< ui >}}MCP Write{{< /ui >}} cases à cocher.
1. Sélectionnez toutes les autres autorisations au niveau des ressources dont vous avez besoin pour le rôle.
1. Clic {{< ui >}}Enregistrement{{< /ui >}}.

Les administrateurs d'organisation peuvent gérer l'accès global au MCP et les autorisations d'écriture depuis [Paramètres de l'organisation][27].

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

Pour des raisons de sécurité, utilisez une clé API et une clé d'application à portée limitée provenant d'un [compte de service][13] qui dispose uniquement des autorisations requises.

### Authentification binaire locale {#local-binary-authentication}

L'authentification locale est recommandée pour Cline et lorsque l'authentification à distance est peu fiable ou indisponible. Après l'installation, vous n'avez généralement pas besoin de mettre à jour le binaire local pour bénéficier des mises à jour du serveur MCP, car les outils sont distants.

{{% collapse-content title="Configurez le binaire local du serveur Datadog MCP" level="h5" expanded=false id="mcp-local-binary" %}}

1. Installez le binaire du serveur Datadog MCP (macOS et Linux) :
   ```bash
   curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
   ```
   Cela installe le binaire dans `~/.local/bin/datadog_mcp_cli`.

   Pour Windows, téléchargez la [version Windows][20].

2. Exécutez `datadog_mcp_cli login` manuellement pour passer par le flux de connexion OAuth et choisir un [site Datadog][21].

3. Configurez votre client AI pour utiliser le transport stdio avec `datadog_mcp_cli` comme commande. Par exemple, sur macOS (remplacez `<USERNAME>` par votre nom d'utilisateur OS) :
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

4. Redémarrez complètement votre client IA pour appliquer la configuration et charger le serveur MCP.
{{% /collapse-content %}}

## Testez l'accès au serveur MCP {#test-access-to-the-mcp-server}

1. Installez l'[inspecteur MCP][2], un outil de développement pour tester et déboguer les serveurs MCP.

   ```bash
   npx @modelcontextprotocol/inspector
   ```
2. Dans l'interface web de l'inspecteur, pour {{< ui >}}Type de transport{{< /ui >}}, sélectionnez {{< ui >}}Streamable HTTP{{< /ui >}}.
3. Pour {{< ui >}}URL{{< /ui >}}, entrez le point de terminaison du serveur MCP pour votre site Datadog régional. 
   {{< site-region region="us,us3,us5,eu,ap1,ap2" >}}
   Par exemple, pour {{< region-param key="dd_site_name" >}}: <code>{{< region-param key="mcp_server_endpoint" >}}</code>
   {{< /site-region >}}
4. Cliquez {{< ui >}}Connect{{< /ui >}}, puis allez à {{< ui >}}Outils{{< /ui >}} > {{< ui >}}Liste des outils{{< /ui >}}.
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