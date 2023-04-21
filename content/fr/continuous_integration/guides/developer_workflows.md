---
description: Découvrez comment utiliser CI Visibility et d'autres fonctionnalités
  Datadog pour accélérer votre processus de développement.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Surveiller les workflows des actions GitHub avec CI Visibility Datadog
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
kind: guide
title: Améliorer vos workflows de développement avec Datadog
---

## Présentation

{{< site-region region="gov" >}}
<div class="alert alert-warning">La solution CI Visibility n'est pas encore disponible pour le site que vous avez sélectionné ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

La solution CI Visibility s'intègre à d'autres produits Datadog destinés aux développeurs ainsi qu'à certains partenaires externes comme GitHub pour accélérer vos workflows de développement. Vous pourrez notamment :
- Créer et ouvrir des tickets GitHub
- Ouvrir des tests dans GitHub et dans votre IDE
- [Activer les résumés des tests dans les commentaires des pull requests GitHub][1]

Ces fonctionnalités sont disponibles pour tous les clients CI Visibility et ne nécessitent pas d'utiliser l'intégration Datadog/GitHub.

## Créer et ouvrir des tickets GitHub
Depuis la section Test Visibility, vous pouvez créer et ouvrir des tickets GitHub contenant les données de contexte pertinentes pré-renseignées ainsi que des liens profonds vers Datadog pour améliorer vos workflows de debugging. En créant des tickets directement depuis Test Visibility, vous pourrez plus facilement suivre les tests ayant échoué ou les tests irréguliers, mais aussi les attribuer aux bonnes personnes.

### Points d'entrée dans l'application

Vous pouvez créer des tickets GitHub pré-renseignés depuis trois sections différentes des tests CI Visibility :

1. Aperçu du commit (depuis la table Commits) 
2. Aperçu de la branche
3. Vue détaillée d'un test

#### Aperçu du commit
{{< img src="ci/github_issues_light.png" alt="Aperçu des tickets GitHub dans Datadog" style="width:100%;">}}

Vous pouvez accéder à la page d'aperçu d'un commit depuis n'importe quelle branche ou n'importe quel test spécifique.

Depuis la page d'aperçu du commit, cliquez sur l'une des lignes de la table `Failed Tests` ou `New Flaky Tests` et sélectionnez `Open issue in GitHub`. 

#### Aperçu de la branche
Lorsque vous êtes sur cette page, cliquez sur l'une des lignes de la table `Flaky Tests` et sélectionnez `Open issue in GitHub`.
{{< img src="ci/github_issues_flaky_light.png" alt="Créer un ticket GitHub depuis la table Flaky Tests dans Datadog" style="width:100%;">}}

#### Vue détaillée d'un test
Lorsque vous visualisez une exécution de test spécifique, cliquez sur le bouton `Actions` en haut à droite et sélectionnez `Open issue in GitHub`. 
{{< img src="ci/github_issues_detail_light.png" alt="Créer un ticket GitHub depuis la vue détaillée d'un test dans Datadog" style="width:100%;">}}

Vous avez également la possibilité de copier la description d'un ticket au format Markdown afin de coller les détails d'un test à un autre endroit. La description Markdown contient des informations comme le lien d'exécution du test, le service, la branche, le commit, l'auteur et l'erreur. 
{{< img src="ci/github_issues_markdown.png" alt="Copier la description d'un ticket au format Markdown pour les tickets GitHub" style="width:40%;">}}

### Exemple de ticket GitHub
Voici un exemple de ticket GitHub pré-renseigné :
{{< img src="ci/prefilled_github_issue.png" alt="Ticket GitHub pré-renseigné" style="width:60%;">}}

## Ouvrir des tests dans GitHub et dans votre IDE
### Points d'entrée dans l'application
Lorsque vous détectez un test ayant échoué ou un test irrégulier dans Datadog, vous avez la possibilité de l'ouvrir dans GitHub ou votre IDE pour le corriger immédiatement.

Sous la section Error Message de l'onglet Overview d'une exécution de test, cliquez sur le bouton `View Code` pour voir les lignes de code pertinentes du test dans Visual Studio Code, IntelliJ ou GitHub.
L'ordre des options dans cette liste déroulante change en fonction du langage dans lequel le test a été écrit :

- IntelliJ est affiché en premier pour les tests basés sur Java
- Visual Studio Code est affiché en premier pour les tests basés sur JavaScript et Python
{{< img src="ci/IDE.png" alt="Ouvrir un test dans votre IDE" style="width:30%;">}}

### Installer des extensions pour votre IDE
Pour visualiser votre test dans votre IDE, vous aurez besoin d'un plug-in/d'une extension.
- Si vous n'avez pas installé l'extension VS Code, cliquez sur `View in VS Code` pour ouvrir l'extension directement dans VS Code et l'installer.
- Si vous n'avez pas installé le plug-in IntelliJ, cliquez sur `View in IntelliJ` pour installer l'extension. Les versions compatibles avec Datadog sont disponibles [ici][2].

## Résumés des tests dans les pull requests GitHub
Datadog peut être intégré à GitHub pour afficher les résumés des résultats de test et les messages d'erreur des tests ayant échoué dans les commentaires des pull requests. Pour en savoir plus, consultez ce [guide.][1] 

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/test-service