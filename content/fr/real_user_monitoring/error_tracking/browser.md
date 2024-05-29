---
aliases:
- /fr/real_user_monitoring/error_tracking/browser_errors
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
  tag: GitHub
  text: Code source datadog-ci
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: Documentation
  text: Importer des source maps JavaScript
- link: /real_user_monitoring/error_tracking/explorer
  tag: Documentation
  text: En savoir plus sur l'Explorateur de suivi des erreurs
kind: documentation
title: Signalement de pannes du navigateur et suivi des erreurs
---

## Présentation

Le suivi des erreurs traite des erreurs recueillies dans le navigateur par le SDK RUM Browser. Lorsquʼune erreur [source][1] ou [personnalisée][2] contenant une stack trace est recueillie, le suivi des erreurs la traite et lʼajoute à un problème, ou la regroupe avec dʼautres erreurs similaires. 

Vos rapports de crash sont disponibles dans l'interface [**Error Tracking**][3].

## Configuration

Si vous nʼavez pas encore configuré le SDK Browser, suivez les [instructions de configuration dans lʼapp][4] ou consultez la [documentation relative à la configuration de Browser RUM][5].

1. Téléchargez la dernière version du [SDK Browse RUM][6].
2. Configurez les tags `version`, `env` et `service` de votre application lors de l'[initialisation du SDK][7].
3. [Chargez vos source maps JavaScript][8] pour accéder à des stack traces non minifiées.

## Associer des erreurs à votre code source

En plus dʼenvoyer des source maps, [lʼinterface de ligne de commande de Datadog][9] signale des informations Git, comme le hash du commit, lʼURL du répertoire et la liste des chemins des fichiers suivis dans le répertoire du code. 

Le suivi des erreurs et la solution RUM peuvent utiliser ces informations pour corréler des erreurs avec votre code source, ce qui vous permet de passer nʼimporter quelle frame de stack trace à la ligne de code associée dans [GitHub][10], [GitLab][11] et [Bitbucket][12]. 

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.mp4" alt="Associer le frame d'une stack trace au code source" video=true >}}

<div class="alert alert-info">L'association des frames de stack trace au code source est prise en charge par la version <code>0.12.0</code> et les versions ultérieurs de l'<a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">interface de ligne de commande Datadog</a>.</div>

Pour en savoir plus, consultez la section [Datadog Source Code Integration][13] (en anglais).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://app.datadoghq.com/rum/error-tracking
[4]: https://app.datadoghq.com/rum/application/create
[5]: /fr/real_user_monitoring/browser/#setup
[6]: https://www.npmjs.com/package/@datadog/browser-rum
[7]: /fr/real_user_monitoring/browser/#initialization-parameters
[8]: /fr/real_user_monitoring/guide/upload-javascript-source-maps
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[10]: https://github.com
[11]: https://about.gitlab.com
[12]: https://bitbucket.org/product
[13]: /fr/integrations/guide/source-code-integration/