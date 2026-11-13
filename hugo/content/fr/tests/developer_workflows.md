---
aliases:
- /fr/continuous_integration/guides/developer_workflows
- /fr/continuous_integration/guides/pull_request_comments
- /fr/continuous_integration/integrate_tests/developer_workflows
- /fr/continuous_integration/tests/developer_workflows
description: Apprenez à utiliser Datadog Test Optimization avec des fonctionnalités
  Datadog supplémentaires pour accélérer votre processus de développement.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-github-actions-ci-visibility/
  tag: Blog
  text: Surveiller les workflows des actions GitHub avec Datadog CI Visibility
- link: /integrations/github/
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: /integrations/guide/source-code-integration
  tag: Documentation
  text: En savoir plus sur l'intégration du code source
- link: /incident_response/work_management
  tag: Documentation
  text: En savoir plus sur Work Management.
title: Améliorer vos workflows de développement avec Datadog
---
## Présentation {#overview}

[Test Optimization][5] s'intègre à d'autres produits Datadog orientés développeurs ainsi qu'à des partenaires externes tels que GitHub pour rationaliser les workflows des développeurs avec des fonctionnalités permettant notamment de :

- [Activer les résumés de tests dans les commentaires des pull requests GitHub](#test-summaries-in-github-pull-requests)
- [Créer et ouvrir des GitHub issues](#create-and-open-github-issues) 
- [Créer des Jira issues via Work Management](#create-jira-issues)
- [Ouvrir des tests dans GitHub et votre IDE](#open-tests-in-github-and-your-ide)

Ces fonctionnalités sont disponibles pour tous les clients de Datadog Test Optimization et elles ne nécessitent pas l'utilisation de l'[intégration Datadog GitHub][4].

## Résumés de tests dans les pull requests GitHub {#test-summaries-in-github-pull-requests}

Datadog Test Optimization s'intègre à GitHub pour afficher des résumés des résultats de tests directement dans les commentaires de vos pull requests. Chaque résumé contient une vue d'ensemble de l'exécution des tests, des informations sur l'instabilité et des messages d'erreur pour les tests ayant échoué.

{{< img src="ci/github_comments_light.png" alt="Aperçu des commentaires de pull request Datadog GitHub" style="width:100%;">}}

Grâce à ces informations, les développeurs obtiennent un retour instantané sur les résultats de leurs tests et peuvent déboguer tout test ayant échoué ou instable sans quitter la vue de la pull request.

<div class="alert alert-info">Cette intégration est uniquement disponible pour les services de test hébergés sur `github.com`.</div>

## Activer les résumés de tests {#enable-test-summaries}

Pour activer les résumés des tests dans les pull requests, suivez ces étapes :

1. Installez l'[intégration GitHub][4] :
   1. Accédez à l'onglet {{< ui >}}Configuration{{< /ui >}} sur la [tuile d'intégration GitHub][6] et cliquez sur {{< ui >}}+ Create GitHub App{{< /ui >}}.
   1. Donnez à l'application des autorisations de lecture et d'écriture pour les pull requests.
1. Ouvrez [{{< ui >}}CI/CD Optimization{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Repositories{{< /ui >}}][3].
1. Choisissez où appliquer le paramètre :
   - Sélectionnez l'onglet {{< ui >}}Organization{{< /ui >}} pour activer les PR Comments pour chaque repository par défaut.
   - Sélectionnez l'onglet {{< ui >}}Repository-specific{{< /ui >}} pour activer les PR Comments pour un seul repository.
1. Sous {{< ui >}}General{{< /ui >}}, activez {{< ui >}}PR Comments{{< /ui >}}.

{{< img src="ci/enable-settings-github-comments-1.png" alt="Le bouton bascule des commentaires de PR sur la page Paramètres CI/CD." style="width:100%;">}}

Les commentaires n'apparaissent que sur les pull requests ayant exécuté au moins un test pour un repository activé.

## Créer et ouvrir des GitHub issues {#create-and-open-github-issues}

Avec Datadog Test Optimization, vous pouvez créer et ouvrir des GitHub issues pré-remplies avec un contexte pertinent dans vos tests ainsi que des liens profonds vers Datadog pour des workflows de débogage plus rationalisés. La création de Jira issues directement depuis Datadog Test Optimization peut vous aider à suivre et à assurer la responsabilisation en cas d'échecs de test et de tests instables.

### Points d'entrée dans l'application {#in-app-entry-points}

Vous pouvez créer des GitHub issues pré-remplies à partir de trois zones dans Datadog Test Optimization :

- [Page Commit Overview (depuis le tableau {{< ui >}}Commits{{< /ui >}})](#commit-overview) 
- [Page Branch Overview](#branch-overview)
- [Panneau latéral Test Details](#test-details-view)

#### Commit Overview {#commit-overview}

Vous pouvez accéder à la page d'aperçu d'un commit depuis n'importe quelle branche ou n'importe quel test spécifique. 

{{< img src="ci/github_issues_commit_overview_updated.png" alt="Aperçu des GitHub issues Datadog" style="width:100%;">}}

Depuis la page Commit Overview, cliquez sur n'importe quelle ligne dans les tableaux `Failed Tests` ou `New Flaky Tests` et sélectionnez {{< ui >}}Open issue in GitHub{{< /ui >}}. 

#### Branch Overview {#branch-overview}
Depuis cette page, cliquez sur n'importe quelle ligne dans le tableau {{< ui >}}Flaky Tests{{< /ui >}} et sélectionnez {{< ui >}}Open issue in GitHub{{< /ui >}}.

{{< img src="ci/github_issues_flaky_test_updated.png" alt="Aperçu du tableau des tests instables des GitHub issues Datadog." style="width:100%;">}}

#### Vue Test Details {#test-details-view}
Depuis une exécution de test spécifique, cliquez sur le bouton {{< ui >}}Actions{{< /ui >}} et sélectionnez {{< ui >}}Open issue in GitHub{{< /ui >}}. 

{{< img src="ci/github_issues_detail_light.png" alt="Aperçu de la vue des détails du test de détection des GitHub issues Datadog" style="width:100%;">}}

Vous avez également la possibilité de copier la description d'une GitHub issue en Markdown pour coller les détails du test ailleurs. La description Markdown contient des informations telles que le lien d'exécution du test, le service, la branche, le commit, l'auteur et l'erreur. 

{{< img src="ci/github_issues_markdown.png" alt="Copier la description de la GitHub issue au format Markdown pour les GitHub issues" style="width:50%;">}}

### Exemple de GitHub issue {#sample-github-issue}
Voici à quoi pourrait ressembler une GitHub issue pré-remplie :
{{< img src="ci/prefilled_github_issue.png" alt="GitHub issue pré-remplie" style="width:80%;">}}

## Créer des Jira issues {#create-jira-issues}

Avec [Work Management][8], vous pouvez créer et ouvrir des Jira issues pré-remplies qui contiennent un contexte pertinent lié à vos tests, ainsi que des liens profonds vers Datadog pour des workflows de débogage plus rationalisés. La création de Jira issues directement depuis Datadog Test Optimization peut vous aider à suivre et à assurer la responsabilisation en cas d'échecs de test et de tests instables. 

Lorsque vous mettez à jour le statut d'une Jira issue, le statut dans Work Management est mis à jour et reflète le dernier statut de l'élément de travail.

### Points d'entrée dans l'application {#in-app-entry-points-1}

Après avoir [configuré l'intégration Jira][7], vous pouvez créer des éléments de travail à partir de trois zones dans Datadog Test Optimization :

- [Page Commit Overview (depuis le tableau {{< ui >}}Commits{{< /ui >}})](#commit-overview-1) 
- [Section Tests instables](#branch-overview-1)
- [Panneau latéral Test Runs](#test-runs-view)

Vous pouvez créer manuellement une Jira issue à partir d'un élément de travail dans [Work Management][9] en cliquant sur `Shift + J`.

### Commit Overview{#commit-overview-1}

Vous pouvez accéder à la page d'aperçu d'un commit depuis n'importe quelle branche ou n'importe quel test spécifique. 

Depuis la page Commit Overview, cliquez sur n'importe quelle ligne dans les tableaux `Failed Tests` ou `New Flaky Tests` et sélectionnez {{< ui >}}Create work item{{< /ui >}}.

#### Branch Overview {#branch-overview-1}
Depuis cette page, cliquez sur n'importe quelle ligne dans le tableau {{< ui >}}Flaky Tests{{< /ui >}} et sélectionnez {{< ui >}}Create work item{{< /ui >}}.

#### Vue Test Runs {#test-runs-view}
Depuis une exécution de test spécifique, cliquez sur le bouton {{< ui >}}Actions{{< /ui >}} et sélectionnez {{< ui >}}Create work item{{< /ui >}}.

Pour plus d'informations sur la configuration de l'intégration Jira, consultez la [documentation Work Management][7].

## Ouvrir des tests dans GitHub et votre IDE {#open-tests-in-github-and-your-ide}

### Points d’entrée dans l’application {#in-app-entry-points-2}

Lorsque vous détectez un test ayant échoué ou un test irrégulier dans Datadog, vous avez la possibilité de l'ouvrir dans GitHub ou votre IDE pour le corriger immédiatement.

Dans la section {{< ui >}}Error Message{{< /ui >}} de l'onglet {{< ui >}}Overview{{< /ui >}} d'une exécution de test, cliquez sur le bouton {{< ui >}}View Code{{< /ui >}} pour afficher les lignes de code pertinentes pour ce test dans Visual Studio Code, IntelliJ ou GitHub.

{{< img src="continuous_integration/error_message_code.png" alt="Un extrait de code en ligne avec un bouton sur lequel vous pouvez cliquer pour afficher le code source dans GitHub ou un IDE" style="width:100%;">}}

L'ordre des options dans ce menu déroulant change en fonction du langage dans lequel votre test a été écrit :

- IntelliJ est prioritaire pour les tests basés sur Java
- Visual Studio Code est prioritaire pour les tests basés sur JavaScript et Python

### Affichage du code source dans GitHub {#viewing-source-code-in-github}

Vous pouvez éventuellement configurer l'[intégration GitHub][10] pour ouvrir le code source d'un test ayant échoué ou instable dans GitHub.

Dans la section {{< ui >}}Source Code{{< /ui >}} de l'onglet {{< ui >}}Overview{{< /ui >}} d'une exécution de test, cliquez sur le bouton {{< ui >}}View on GitHub{{< /ui >}} pour afficher les lignes de code pertinentes pour ce test dans GitHub.

{{< img src="continuous_integration/source_code_integration.png" alt="Un extrait de code en ligne avec un bouton sur lequel vous pouvez cliquer pour afficher le code source dans GitHub ou un IDE" style="width:100%;">}}

### Installation des plugins pour IDE {#installing-ide-plugins}

Des plugins et extensions pour IDE sont requis pour afficher votre test dans votre IDE. 

- Si vous n'avez pas installé l'extension VS Code, cliquez sur {{< ui >}}View in VS Code{{< /ui >}} pour ouvrir l'extension directement dans VS Code pour l'installation.
- Si vous n'avez pas installé l'extension IntelliJ, cliquez sur {{< ui >}}View in IntelliJ{{< /ui >}} pour installer l’extension. Les versions compatibles de Datadog sont disponibles sur la [Plugin Versions page][2].

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/guides/pull_request_comments/
[2]: https://plugins.jetbrains.com/plugin/19495-datadog/versions
[3]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[4]: /fr/integrations/github/
[5]: /fr/continuous_integration/tests/
[6]: https://app.datadoghq.com/integrations/github
[7]: /fr/incident_response/work_management/settings/#jira
[8]: /fr/incident_response/work_management/view_and_manage#take-action
[9]: https://app.datadoghq.com/work
[10]: /fr/integrations/github/#link-a-repository-in-your-organization-or-personal-account