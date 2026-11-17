---
aliases:
- /fr/developers/ide_integrations/vscode/
- /fr/developers/ide_plugins/vscode/
- /fr/ide_plugins/vscode/logs/
description: Intégrez la télémétrie et les informations de Datadog à votre code source
  dans VS Code et d'autres éditeurs de code.
further_reading:
- link: /continuous_testing/
  tag: Documentation
  text: En savoir plus sur les tests continus
- link: /integrations/guide/source-code-integration/
  tag: Documentation
  text: En savoir plus sur Source Code Integration
- link: /mcp_server/
  tag: Documentation
  text: En savoir plus sur Datadog MCP Server
- link: https://www.datadoghq.com/blog/datadog-ide-plugins/
  tag: Blog
  text: Réduisez les changements de contexte lors du dépannage grâce aux extensions
    IDE de Datadog
- link: https://www.datadoghq.com/blog/datadog-cursor-extension/
  tag: Blog
  text: Dépannez les problèmes de production en direct avec l'extension Datadog pour
    Cursor.
is_beta: true
title: Datadog Extension for VS Code & Cursor
---
<!-- TO CONTRIBUTORS: This content also exists in the extension's README file. Remember to update the README when you change anything in this file. -->

## Présentation {#overview}

L'extension Datadog pour VS Code et Cursor intègre Datadog à votre éditeur de code pour accélérer votre développement.

{{< img src="/ide_plugins/vscode/datadog-vscode-3.png" alt="Extension Datadog pour VS Code et Cursor" style="width:100%;" >}}

L'extension inclut ces fonctionnalités :

- [**Code Security**](#code-security) : détectez et corrigez les problèmes de sécurité avant d'effectuer un commit, et rédigez des règles personnalisées.

- [**Code Insights**](#code-insights) : restez informé des vulnérabilités du code et des bibliothèques sans quitter le code.

- [**View in IDE**](#view-in-ide) : accédez directement à vos fichiers sources depuis les références au code dans Datadog.

- [**Fix in Chat**](?tab=cursor#fix-in-chat) : corrigez les erreurs de code, les vulnérabilités et les tests instables grâce à des suggestions et des explications générées par l'IA.

<div class="alert alert-info">Sauf indication contraire, toutes les fonctionnalités de l'extension sont disponibles à la fois pour VS Code et pour tout autre IDE basé sur des forks de VS Code, tel que Cursor.</div>

## Prérequis {#requirements}

- **Compte Datadog** : la plupart des fonctionnalités nécessitent un compte Datadog.
    - Vous découvrez Datadog ? [En savoir plus][3] sur les outils de surveillance et de sécurité de Datadog et inscrivez-vous pour un essai gratuit.
    - Si votre organisation utilise un [sous-domaine personnalisé][18] tel que `myorg.datadoghq.com`, vous devez l'indiquer à l'aide du paramètre `datadog.connection.oauth.setup.domain` dans l'IDE.

- **Git** : l'extension fonctionne mieux lorsque Git est activé dans l'IDE. Vérifiez que le paramètre `git.enabled` est activé.

## Installation {#installation}

Les étapes d'installation peuvent varier pour d'autres éditeurs basés sur VS Code.

{{< tabs >}}
{{% tab "VS Code" %}}
Installez l'extension directement dans l'IDE ou depuis le Web :

- **Dans VS Code** : ouvrez la vue Extensions (`Shift` + `Cmd/Ctrl` + `X`), recherchez `datadog` et sélectionnez l'extension officielle de Datadog.

- **Depuis le Web** : installez-la depuis la page de l'extension sur [Visual Studio Marketplace][1].

### Configuration de Datadog MCP Server {#datadog-mcp-server-setup}

Connectez-vous à Datadog en utilisant l'extension et exécutez la commande `Datadog: Open MCP Configuration Assistant`. Suivez les instructions pour configurer [Datadog MCP Server][3].

[1]: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
[3]: /fr/mcp_server/

{{% /tab %}}

{{% tab "Cursor" %}}
Installez l'extension directement dans l'IDE ou depuis le Web :

- **Dans Cursor** : ouvrez la vue Extensions (`Shift` + `Cmd/Ctrl` + `X`), recherchez `datadog` et sélectionnez l'extension officielle de Datadog.

- **Depuis le Web** : téléchargez le fichier VSIX depuis [Open VSX Registry][2] et installez-le avec `Extensions: Install from VSIX` dans la palette de commandes (`Shift` + `Cmd/Ctrl` + `P`).

### Configuration de Datadog MCP Server {#datadog-mcp-server-setup-1}

Installez le plugin Datadog pour activer [Datadog MCP Server][3]. Vous pouvez installer le plugin depuis le [Cursor Marketplace][4] ou dans **Cursor Settings** > **Plugins**.

[2]: https://open-vsx.org/extension/datadog/datadog-vscode
[3]: /fr/mcp_server/setup/?tab=cursor
[4]: https://cursor.com/marketplace/datadog

{{% /tab %}}
{{< /tabs >}}

## Fonctionnalités principales {#core-features}

### Code Security {#code-security}

Les fonctionnalités de [**Code Security**][19] analysent votre code localement à l'aide de règles prédéfinies pour détecter et corriger les problèmes de sécurité et les vulnérabilités avant que vous n'effectuiez un commit.

{{< img src="/ide_plugins/vscode/static_analysis.mp4" alt="Aperçu de Static Analysis" style="width:100%" video=true >}}

Pour en savoir plus, consultez la sous-section [Code Security][19].

### Code Insights {#code-insights}

**Code Insights** vous tiennent informé des vulnérabilités du code et des bibliothèques pertinentes pour votre base de code.

{{< img src="/ide_plugins/vscode/code-insights-2.png" alt="La vue Code Insights." style="width:100%;" >}}

Pour en savoir plus, consultez la sous-section [Code Insights][21].

### View in IDE {#view-in-ide}

<div class="alert alert-info">Cette fonctionnalité est uniquement disponible pour VS Code et Cursor. Les autres versions dérivées de VS Code ne sont pas prises en charge.</div>

La fonctionnalité **View in VS Code** ou **View in Cursor** fournit un lien depuis Datadog directement vers vos fichiers sources. Recherchez le bouton à côté des cadres de pile dans les traces de pile affichées dans l'interface utilisateur (par exemple, dans [Error Tracking][5]) :

{{< img src="/ide_plugins/vscode/view-in-vscode-2.png" alt="Une trace de pile dans Datadog affichant le bouton View in VS Code" style="width:100%;" >}}

Vous pouvez également utiliser cette fonctionnalité pour ouvrir vos fichiers sources à partir d'un insight (tel qu'une erreur provenant d'Error Tracking) :

{{< img src="/ide_plugins/vscode/view-in-vscode-error.png" alt="Un problème détecté par Error Tracking dans Datadog affichant le bouton View in VS Code" style="width:100%;" >}}

<div class="alert alert-info">Pour utiliser cette fonctionnalité, configurez d'abord <a href="/integrations/guide/source-code-integration/">l'intégration du code source</a> pour votre service.</div>

### Fix in Chat {#fix-in-chat}

Le bouton **Fix in Chat** apparaît dans plusieurs contextes lorsque l'extension identifie des erreurs ou des problèmes. Cliquez sur le bouton pour générer une invite de chat IA qui résume le problème, inclut les détails et le contexte pertinents, et donne des instructions spécifiques à l'agent.

{{< img src="/ide_plugins/vscode/cursor_fix_in_chat.mp4" alt="Utilisation de Fix in Chat pour corriger une erreur de code en ligne" style="width:100%" video=true >}}

L'extension gère également le deep link {{< ui >}}Fix with Cursor{{< /ui >}} utilisé dans Code Security. Lorsque vous cliquez sur {{< ui >}}Fix with Cursor{{< /ui >}} dans l'interface utilisateur de Datadog ou dans un commentaire de pull request, l'extension ouvre l'espace de travail dans Cursor. Elle effectue ensuite un checkout du dépôt, de la branche et du commit concernés, puis charge un prompt de remédiation adapté au problème détecté.

## Données et télémétrie {#data-and-telemetry}

Datadog collecte des informations sur votre utilisation de cet IDE. Cela inclut votre façon d'interagir avec celui-ci, la survenue d'erreurs, la cause de ces erreurs et les identifiants utilisateur. La collecte est conforme à la [politique de confidentialité de Datadog][13] et au [contrat de licence utilisateur final de l'extension VS Code][12] de Datadog. Datadog utilise ces données pour améliorer les performances et les fonctionnalités de l'extension. Cela couvre également les passages entre l'extension et la page de connexion Datadog.

Si vous ne souhaitez pas envoyer ces données à [Datadog][3], vous pouvez désactiver cette option à tout moment dans les paramètres de l'extension : `Datadog > Telemetry > Setup > Enable Telemetry`, puis sélectionnez `disabled`.

<div class="alert alert-info">L'extension Datadog respecte également le paramètre <a href="https://code.visualstudio.com/docs/configure/telemetry#_output-channel-for-telemetry-events">VS Code telemetry</a>.</div>

## Aide et commentaires {#help-and-feedback}

Pour partager vos commentaires, envoyez un e-mail à [team-ide-integration@datadoghq.com][14] ou créez un ticket dans le [dépôt public][15] de l'extension.

Consultez la section [issues][16] pour découvrir les problèmes connus.

Utilisez-vous [Cursor][17] ou une autre version dérivée de VS Code ? Retrouvez l'extension sur [Open VSX Registry][2].

## Licence {#license}

Lisez attentivement le [contrat de licence utilisateur final][12] avant de télécharger ou d'utiliser cette extension.

## Pour aller plus loin {#further-reading}

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
[21]: /fr/ide_plugins/vscode/code_insights/