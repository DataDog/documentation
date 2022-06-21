---
title: Suivi des erreurs de navigateur
kind: documentation
further_reading:
  - link: /real_user_monitoring/error_tracking/explorer
    tag: Documentation
    text: Explorateur de suivi des erreurs
  - link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
    tag: Documentation
    text: Référentiel officiel de l'interface de ligne de commande Datadog
  - link: /real_user_monitoring/guide/upload-javascript-source-maps
    tag: Guide
    text: Importer des source maps JavaScript
  - link: https://app.datadoghq.com/error-tracking
    tag: IU
    text: Suivi des erreurs
---
La fonctionnalité Suivi des erreurs traite les erreurs recueillies à partir du navigateur par le SDK RUM. Dès lors qu'une erreur [source][1] ou [personnalisée][2] contenant une stack trace est recueillie, le suivi des erreurs assure son traitement et lui attribue une catégorie de problème afin de la rassembler avec des erreurs similaires. Suivez les étapes ci-dessous pour commencer rapidement à utiliser le suivi des erreurs :

1. Téléchargez la dernière version du [SDK RUM Browser][3].
2. Configurez les paramètres __version__, __env__ et __service__ lors de l'[initialisation de votre SDK][4].
3. Importez des source maps JavaScript en prenant soin de [suivre notre guide][5], afin d'obtenir des stack traces non minifiées.

## Associer des erreurs à votre code source

La nouvelle version de l'[interface de ligne de commande Datadog][6] vous permet non seulement d'envoyer des source maps, mais également d'obtenir des informations Git, comme le hash d'un commit, l'URL d'un référentiel et la liste des chemins de fichiers suivis dans le référentiel de code. Grâce à ces informations, la solution RUM et la fonctionnalité Suivi des erreurs peuvent mettre en corrélation une erreur avec le code source. Vous pouvez ainsi passer du cadre d'une stack trace à la ligne de code pertinente dans [GitHub][7], [GitLab][8] et [BitBucker][9].

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.mp4" alt="Associer le cadre d'une stack trace au code source" video=true >}}

<div class="alert alert-info">L'association des cadres de stack trace au code source est prise en charge par la version <code>0.12.0</code> et les versions ultérieurs de l'<a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">interface de ligne de commande Datadog</a>.</div>

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /fr/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://www.npmjs.com/package/@datadog/browser-rum
[4]: /fr/real_user_monitoring/browser/#initialization-parameters
[5]: /fr/real_user_monitoring/guide/upload-javascript-source-maps
[6]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[7]: https://github.com
[8]: https://about.gitlab.com
[9]: https://bitbucket.org/product