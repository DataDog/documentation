---
aliases:
- /fr/developers/ide_integrations/vscode/
- /fr/developers/ide_plugins/vscode/
description: Intégrez la télémétrie et les insights de Datadog à votre code source
  dans VS Code et d'autres éditeurs de code.
further_reading:
- link: /continuous_testing/
  tag: Documentation
  text: En savoir plus sur les tests continus
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: Découvrez l'intégration du code source
- link: /bits_ai/mcp_server/
  tag: Documentation
  text: Découvrez le serveur du protocole de contexte du modèle Datadog (MCP)
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Réduisez les changements de contexte lors du dépannage grâce aux plugins IDE
    de Datadog
- link: https://www.datadoghq.com/blog/exception-replay-datadog/
  tag: Blog
  text: Simplifiez le débogage en production avec Exception Replay de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Déboguez les problèmes de production en direct avec l'extension Cursor de
    Datadog
is_beta: true
title: Extension Datadog pour VS Code & Cursor
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">
    L'extension Datadog pour Visual Studio Code n'est pas prise en charge pour votre <a href="/getting_started/site">site Datadog</a> ({{< region-param key="dd_site_name" >}}).
</div>
{{% /site-region %}}

## Aperçu {#overview}

L'extension Datadog pour VS Code et Cursor apporte Datadog à votre éditeur de code pour accélérer votre développement.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="Extension Datadog pour VS Code et Cursor" style="width:100%;" >}}

L'extension comprend ces fonctionnalités :

-   [**Serveur du protocole de contexte du modèle (MCP)**](?tab=cursor#installation) : Connectez l'agent d'IA de l'éditeur à la télémétrie de production, aux outils et au contexte de Datadog.

-   [**Logs**](#logs) : Évaluez les volumes de logs et recherchez des logs depuis votre code.

-   [**Code Insights**](#code-insights) : Restez informé des erreurs d'exécution, des vulnérabilités et des tests instables sans quitter le code.

-   [**Voir dans l'IDE**](#view-in-ide) : Passez directement des références de code dans Datadog à vos fichiers sources.

-   [**Sécurité du code**](#code-security) : Détectez et corrigez les problèmes de sécurité avant de valider, et écrivez des règles personnalisées.

-   [**Exception Replay**](#exception-replay) : Déboguez votre code de production.

-   [**Débogueur en direct**](#live-debugger) : Ajoutez des points de log non intrusifs aux services en cours d'exécution pour capturer des données d'exécution sans redéployer.

-   [**Fix in Chat**](?tab=cursor#fix-in-chat) : Corrigez les erreurs de code, les vulnérabilités et les tests instables avec des suggestions et des explications alimentées par l'IA.

<div class="alert alert-info">Sauf indication contraire, toutes les fonctionnalités de l'extension sont disponibles pour VS Code et pour tout autre IDE basé sur des forks de VS Code, comme Cursor.</div>

## Exigences {#requirements}

-   **Compte Datadog** : La plupart des fonctionnalités nécessitent un compte Datadog.

    -   Nouveau sur Datadog ? [En savoir plus][3] sur les outils de surveillance et de sécurité de Datadog et inscrivez-vous pour un essai gratuit.
    -   Si votre organisation utilise un [sous-domaine personnalisé][18] tel que `myorg.datadoghq.com`, vous devez l'indiquer en utilisant le paramètre `datadog.connection.oauth.setup.domain` dans l'IDE.

-   **Git** : L'extension fonctionne mieux lorsque Git est activé dans l'IDE. Assurez-vous que cela est activé en vérifiant le paramètre `git.enabled`.

## Installation {#installation}

Les étapes d'installation peuvent varier pour d'autres éditeurs basés sur VS Code.

{{< tabs >}}
{{% tab "VS Code" %}}
Installez l'extension soit directement dans l'IDE, soit depuis le web :

-   **Dans VS Code** : Ouvrez la vue des extensions (`Shift` + `Cmd/Ctrl` + `X`), recherchez `datadog` et sélectionnez l'extension officielle de Datadog.

-   **Depuis le web** : Installez depuis la page de l'extension sur [Visual Studio Marketplace][1].

### Configuration du serveur MCP {#mcp-server-setup}

L'extension inclut l'accès au [Serveur du Protocole de Contexte de Modèle Datadog (MCP)][3]. Assurez-vous que le serveur MCP est activé pour améliorer les capacités d'IA de l'éditeur avec votre environnement Datadog spécifique :

1. Ouvrez le panneau de chat, sélectionnez le mode agent et cliquez sur le bouton **Configurer les outils**.
   {{< img src="bits_ai/mcp_server/vscode_configure_tools_button.png" alt="Bouton Configurer les outils dans VS Code" style="width:60%;" >}}

1. Trouvez le serveur et les outils Datadog dans la liste et cochez les cases pour les activer (développez ou actualisez si nécessaire).

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /fr/bits_ai/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
Installez l'extension soit directement dans l'IDE, soit depuis le web :

-   **Dans Cursor**: Ouvrez la vue Extensions (`Shift` + `Cmd/Ctrl` + `X`), recherchez `datadog` et sélectionnez l'extension officielle de Datadog.

-   **Depuis le web** : Téléchargez le fichier VSIX depuis [Open VSX Registry][2] et installez-le avec `Extensions: Install from VSIX` dans la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`).

### Configuration du serveur Datadog MCP {#datadog-mcp-server-setup}

Installez le plugin Datadog pour activer le [Serveur Datadog MCP][3]. Vous pouvez installer le plugin depuis le [Marché Cursor][4] ou dans **Paramètres de Cursor** > **Plugins**.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /fr/bits_ai/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## Fonctionnalités principales {#core-features}

### Logs {#logs}

Utilisez **Logs** pour évaluer le volume de logs générés par une ligne de log donnée dans votre code. L'extension ajoute des annotations au-dessus de votre code pour les modèles de journalisation détectés qui correspondent aux enregistrements de journaux dans Datadog.

{{< img src="/ide_plugins/vscode/logs_navigation.mp4" alt="Aperçu de la navigation dans les Logs" style="width:100%" video=true >}}

En savoir plus dans la sous-section [Logs][20].

### Code Insights {#code-insights}

**Code Insights** vous tiennent informé des erreurs d'exécution, des vulnérabilités de code et des tests instables.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="La vue des Code Insights." style="width:100%;" >}}

En savoir plus dans la sous-section [Code Insights][21].

### Sécurité du code {#code-security}

Les fonctionnalités [**Sécurité du code**][19] analysent votre code localement selon des règles prédéfinies pour détecter et corriger les problèmes de sécurité et les vulnérabilités avant que vous ne validiez les modifications.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Aperçu de l'analyse statique" style="width:100%" video=true >}}

En savoir plus dans la sous-section [Code Security][19].

### Exception Replay {#exception-replay}

**Exception Replay** vous permet d'inspecter les frames de la trace de pile de tout code de suivi d'erreur et d'obtenir des informations sur les valeurs des variables du code s'exécutant en production.

{{< img src="/ide_plugins/vscode/exception_replay.mp4" alt="Aperçu d'Exception Replay" style="width:100%" video=true >}}

Pour en savoir plus, consultez la sous-section [Exception Replay][22].

### Débogueur en direct {#live-debugger}

Le **Débogueur en direct** vous permet d'ajouter des points de journalisation—des points d'arrêt non bloquants et à expiration automatique—à vos services en cours d'exécution pour capturer des données d'exécution pour le débogage sans redéployer votre code.

{{< img src="/ide_plugins/vscode/live_debugger_overview.mp4" alt="Aperçu de l'activité du Débogueur en direct de Datadog" style="width:100%" video=true >}}

Pour en savoir plus, consultez la sous-section [Live Debugger][23].

## Autres fonctionnalités {#other-features}

### Voir dans l'IDE {#view-in-ide}

<div class="alert alert-info">Cette fonctionnalité est uniquement disponible pour VS Code et Cursor. D'autres forks de VS Code ne sont pas pris en charge.</div>

La fonctionnalité **Voir dans VS Code** ou **Voir dans Cursor** fournit un lien de Datadog directement vers vos fichiers source. Recherchez le bouton à côté des frames dans les traces de pile affichées dans l'interface utilisateur (par exemple, dans [Error Tracking][5]) :

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Une trace de pile dans Datadog montrant le bouton Voir dans VS Code" style="width:100%;" >}}

Vous pouvez également utiliser cette fonctionnalité pour ouvrir vos fichiers source à partir d'une vue (comme une erreur d'[Error Tracking]) :

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Un problème d'[Error Tracking] dans Datadog montrant le bouton Voir dans VS Code" style="width:100%;" >}}

<div class="alert alert-info">Pour utiliser cette fonctionnalité, configurez d'abord <a href="/integrations/guide/source-code-integration/">l'intégration du code source</a> pour votre service.</div>

### Fix in Chat {#fix-in-chat}

Le bouton **Fix in Chat** apparaît dans plusieurs contextes lorsque l'extension identifie des erreurs ou des problèmes. Cliquez sur le bouton pour générer un prompt de chat AI qui résume le problème, inclut des détails et un contexte pertinents, et donne des instructions spécifiques pour l'agent.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Utilisez Fix in Chat pour corriger une erreur de code en ligne." style="width:100%" video=true >}}

## Données et télémétrie {#data-and-telemetry}

Datadog collecte certaines informations sur votre utilisation de cet IDE, y compris comment vous interagissez avec lui, si des erreurs se sont produites lors de son utilisation, ce qui a causé ces erreurs, et des identifiants d'utilisateur conformément à la [Politique de Confidentialité de Datadog][13] et au [EULA de l'extension VS Code de Datadog][12]. Ces données sont utilisées pour aider à améliorer les performances et les fonctionnalités de l'extension, y compris les transitions vers et depuis l'extension et la page de connexion Datadog applicable pour accéder aux Services.

Si vous ne souhaitez pas envoyer ces données à [Datadog][3], vous pouvez désactiver cela à tout moment dans les paramètres de l'extension : `Datadog > Telemetry > Setup > Enable Telemetry` et sélectionner `disabled`.

<div class="alert alert-info">L'extension Datadog respecte également le paramètre <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">télémétrie VS Code</a>.</div>

## Aide et retour d'information {#help-and-feedback}

Pour partager vos retours, envoyez un e-mail à [team-ide-integration@datadoghq.com][14] ou créez un problème dans le [dépôt public][15] de l'extension.

Consultez la section [issues][16] pour découvrir les problèmes connus.

Utilisez-vous [Cursor][17], ou un autre fork de VS Code ? Trouvez l'extension sur le [Registre Open VSX][2].

## Licence {#license}

Lisez attentivement le [contrat de licence de l'utilisateur final][12] avant de télécharger ou d'utiliser cette extension.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: https://www.datadoghq.com/
[5]: /fr/tracing/error_tracking/
[12]: https://www.datadoghq.com/legal/eula/
[13]: https://www.datadoghq.com/legal/privacy/
[14]: mailto:team-ide-integration@datadoghq.com
[15]: https://github.com/DataDog/datadog-for-vscode
[16]: https://github.com/DataDog/datadog-for-vscode/issues?q=is%3Aissue+label%3A%22known+issue%22
[17]: https://www.cursor.com/
[18]: /fr/account_management/multi_organization/#custom-sub-domains
[19]: /fr/ide_plugins/vscode/code_security/
[20]: /fr/ide_plugins/vscode/logs/
[21]: /fr/ide_plugins/vscode/code_insights/
[22]: /fr/ide_plugins/vscode/exception_replay/
[23]: /fr/ide_plugins/vscode/live_debugger/