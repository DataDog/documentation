---
aliases:
- /fr/static_analysis/github_pull_requests
description: Découvrir l'utilisation de Code Analysis dans les pull requests GitHub.
further_reading:
- link: /integrations/github/
  tag: Documentation
  text: En savoir plus sur l'intégration GitHub
- link: /code_analysis/
  tag: Documentation
  text: En savoir plus sur Code Analysis
title: Requêtes Pull GitHub
---

## Présentation

Code Analysis s'intègre aux pull requests GitHub de deux manières :
- [Commentaires de pull request pour signaler les violations](#activer-les-commentaires-pr-code-analysis-pour-vos-referentiels) : durant les revues de code sur GitHub, Datadog peut automatiquement vérifier les violations Static Analysis dans les pull requests pour les référentiels auxquels au moins un ensemble de règles est appliqué. Les violations sont signalées par un commentaire de revue intégré sur les lignes de code concernées, accompagné de correctifs suggérés (le cas échéant) pouvant être appliqués directement dans la pull request. Cette fonctionnalité est uniquement disponible pour Static Analysis (SAST).
{{< img src="ci/static-analysis-pr-comment-example.png" alt="Exemple de commentaire Code Analysis sur une pull request" style="width:90%;" >}}

- [Ouvrir une pull request pour corriger un problème directement depuis Datadog](#corriger-une-vulnerabilite-directement-depuis-datadog) : vous pouvez créer une pull request depuis l'interface pour corriger une vulnérabilité de sécurité ou un problème de qualité de code en fonction du correctif de code suggéré par Datadog. Cette fonctionnalité est uniquement disponible pour Static Analysis (SAST).
{{< img src="ci/sast_one_click_light.png" alt="Exemple de remédiation en un clic pour Code Analysis" style="width:90%;" >}}

Pour activer ces fonctionnalités, assurez-vous de disposer des autorisations GitHub requises (Read & Write) pour votre référentiel.

## Configurer Code Analysis pour les pull requests GitHub

### Activer Datadog Code Analysis

Pour utiliser Datadog Code Analysis, ajoutez les fichiers de configuration appropriés à votre référentiel, comme décrit dans les [instructions de configuration][1].

### Configurer une application GitHub

Pour utiliser Code Analysis sur GitHub, vous pouvez effectuer l'une des opérations suivantes :

- Créez une application GitHub dans Datadog.
- Mettez à jour une application GitHub existante, si vous en avez déjà créé une dans Datadog.

Les autorisations que vous accordez à l'application GitHub déterminent les fonctionnalités de l'[intégration GitHub][2] disponibles pour la configuration.

#### Créer et installer une application GitHub

1. Dans Datadog, accédez à [**Integrations > GitHub Applications > Add New GitHub Application**][3].
1. Remplissez tous les détails requis, comme le nom de l'organisation GitHub.
1. Sous **Select Features**, cochez la case **Code Analysis: Pull Request Review Comments**.
1. Sous **Edit Permissions**, vérifiez que l'autorisation **Pull Requests** est définie sur **Read & Write**.
1. Cliquez sur **Create App in GitHub**.
1. Saisissez un nom pour votre application et soumettez-la.
1. Cliquez sur **Install GitHub App**.
1. Choisissez les référentiels dans lesquels l'application doit être installée, puis cliquez sur **Install & Authorize**.

{{< img src="ci/static-analysis-install-github-app.png" alt="Écran d'installation de l'application GitHub" style="width:50%;" >}}

#### Mettre à jour une application GitHub existante

1. Dans Datadog, accédez à [**Integrations > GitHub Applications**][5], et recherchez l'application GitHub que vous souhaitez utiliser pour Code Analysis.
{{< img src="ci/static-analysis-existing-github-app.png" alt="Exemple de commentaire Static Analysis sur une pull request" style="width:90%;" >}}
1. Dans l'onglet **Features**, consultez la section **Code Analysis: Pull Request Comments** pour déterminer si votre application GitHub nécessite des autorisations supplémentaires. Si c'est le cas, cliquez sur **Update permissions in GitHub** pour modifier les paramètres de l'application.
1. Sous **Repository permissions**, définissez l'accès **Pull Requests** sur **Read and write**.
{{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="Le menu déroulant pour l'autorisation en lecture et écriture de pull request" style="width:90%;" >}}
1. Sous le titre **Subscribe to events**, cochez la case **Pull request**.
{{< img src="ci/static-analysis-pr-review-comment.png" alt="La case à cocher pour l'autorisation de commentaire de revue de pull request" style="width:90%;" >}}

### Activer les commentaires PR Code Analysis pour vos référentiels

1. Dans Datadog, accédez à [**CI Settings** > **Code Analysis Settings**][4].
1. Cliquez sur le bouton bascule à côté d'un référentiel donné pour activer **GitHub Comments**. Dans l'exemple ci-dessous, les commentaires sont activés pour le référentiel `demo-static-analysis-gates`.

{{< img src="ci/static-analysis-github-comments.png" alt="Exemple de commentaire Code Analysis sur une pull request" style="width:100%;" >}}

**Remarque :** si vous utilisez [GitHub Actions][6] pour exécuter vos analyses, déclenchez l'action sur `push` afin que les commentaires apparaissent.

### Corriger une vulnérabilité directement depuis Datadog

Si l'autorisation **Pull Requests** de votre application GitHub est définie sur **Read & Write**, la remédiation en un clic est activée pour tous les résultats Static Analysis avec un correctif suggéré disponible.

Suivez ces étapes pour corriger une vulnérabilité et ouvrir une pull request :
1. Affichez un résultat spécifique dans Code Analysis.
2. Cliquez sur **Fix Violation** dans le volet latéral du résultat.
3. Sélectionnez **Open a Pull Request**.
4. Saisissez un titre de pull request et un message de commit.
5. Cliquez sur **Create PR**.

Vous pouvez également corriger une vulnérabilité en validant directement dans la branche où le résultat a été détecté.

Pour valider un correctif suggéré :

1. Affichez un résultat spécifique dans Code Analysis.
2. Cliquez sur **Fix Violation** dans le panneau latéral du résultat.
3. Cliquez sur **Commit to current branch**.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/code_analysis#setup
[2]: /fr/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/ci/settings/static-analysis
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /fr/code_analysis/static_analysis/github_actions/