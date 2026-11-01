---
aliases:
- /fr/quality_gates/setup/
description: Apprenez à configurer les règles PR Gate dans Datadog.
further_reading:
- link: /pr_gates
  tag: Documentation
  text: Découvrez les PR Gates
title: Configurez les règles PR Gate
---
## Présentation {#overview}

Pour utiliser les PR Gates de Datadog, vous pouvez définir une ou plusieurs règles sur la page [{{< ui >}}PR Gate Rules{{< /ui >}}][1].

{{< img src="pr_gates/rules_list_3.png" alt="Page des PR Gates dans Datadog" style="width:100%" >}}

Les PR Gates garantissent que seuls les changements de code qui respectent vos normes de sécurité et de qualité sont fusionnés.

## Créer une règle {#create-a-rule}

Pour créer une règle PR Gates dans Datadog :

1. Accédez à [{{< ui >}}Software Delivery{{< /ui >}} > {{< ui >}}PR Gates{{< /ui >}} > {{< ui >}}PR Gate Rules{{< /ui >}}][1] et cliquez sur {{< ui >}}New Rule{{< /ui >}}.

1. Sous {{< ui >}}Select your source{{< /ui >}}, sélectionnez un type de règle :
   - {{< ui >}}Static Code Analysis (SAST){{< /ui >}}
   - {{< ui >}}Software Composition Analysis (SCA){{< /ui >}}
   - {{< ui >}}Code Coverage{{< /ui >}}
   - {{< ui >}}Infrastructure as Code Scanning (IaC){{< /ui >}}
   - {{< ui >}}Secret Scanning{{< /ui >}}
   - {{< ui >}}New Flaky Tests{{< /ui >}}

1. Sous {{< ui >}}Define scope{{< /ui >}}, définissez les dépôts que la règle doit évaluer:
   - {{< ui >}}All repositories{{< /ui >}} : La règle évalue tous les dépôts configurés pour le type de règle.
   - {{< ui >}}Selected repositories{{< /ui >}} : La règle évalue uniquement les dépôts que vous spécifiez. Utilisez `IN` pour inclure uniquement les dépôts spécifiés, ou `NOT IN` pour évaluer tous les dépôts configurés _à l'exception de_ ceux que vous spécifiez.

1. Sous {{< ui >}}Define condition{{< /ui >}}, définissez les conditions qui entraîneront l'échec de la règle. Chaque type de règle possède ses propres options de condition, et vous pouvez utiliser les paramètres de condition par défaut existants lorsque vous sélectionnez un type de règle.

   L'exemple suivant illustre une règle d'analyse de code statique (SAST) qui échoue lorsqu'une pull request introduit au moins une violation de vulnérabilité de code d'analyse de code statique avec une gravité d'au moins `Critical`. La règle évalue tous les dépôts configurés pour l'analyse de code statique :

   {{< img src="pr_gates/setup/static_analysis_4.png" alt="Une règle d'analyse de code statique qui s'exécute sur tous les dépôts et échoue lorsqu'une PR présente au moins une vulnérabilité de code d'analyse de code statique avec une gravité d'au moins `Critical`" style="width:100%" >}}

1. Sous {{< ui >}}Preview checks{{< /ui >}}, sélectionnez votre fournisseur de gestion de code source pour prévisualiser le check d'état à ajouter aux pull requests. Pour bloquer les PR lorsqu'une règle échoue, suivez les instructions de votre fournisseur pour exiger que les PR Gates soient validées avant la fusion. Dans GitHub, Azure DevOps et Bitbucket Cloud, cela s'effectue en définissant les checks des PR Gates comme obligatoires. Dans GitLab, cela s'effectue en définissant le compte de service Datadog que vous avez créé lors de l'installation de l'intégration GitLab Source Code en tant qu'approbateur requis :

   - [GitHub][2]
   - [GitLab][9]
   - [Azure DevOps][3]
   - [Bitbucket Cloud][10]

   Les règles non bloquantes peuvent être utiles lorsque vous déployez une nouvelle règle et souhaitez vérifier son comportement avant de la rendre bloquante.

1. Cliquez sur {{< ui >}}Create Rule{{< /ui >}}.

1. Il est recommandé de tester votre règle PR Gate en créant une nouvelle branche et une nouvelle PR qui introduisent délibérément des modifications de code qui violeraient la condition de la règle. Veuillez noter que les PR Gates ne vont pas :
   - Bloquer rétroactivement les PR existantes, sauf si de nouveaux commits y sont poussés après la création de la règle PR Gate
   - Bloquer les nouvelles PR qui n'introduisent pas de violations dans le cadre de leurs lignes modifiées

### Gérer les checks de PR {#manage-pr-checks}

Les PR Gates créent automatiquement des checks de PR dans les pull requests (merge requests dans GitLab) [GitHub][4], [GitLab][11], [Azure DevOps][5] ou [Bitbucket Cloud][12] pour chaque type de règle évalué. Le check contient des informations supplémentaires sur l'évaluation de la règle, telles que le motif de l'échec et les événements correspondants dans Datadog. Dans GitLab, les PR Gates utilisent également un compte de service Datadog pour approuver les demandes de fusion lorsque toutes les conditions de vos règles PR Gate sont remplies. Le compte de service est celui que vous avez créé lors de l'installation de l'intégration GitLab Source Code.

<div class="alert alert-info"><strong>Remarque</strong> : Relancer un check dans l'interface utilisateur de la pull request ne relance pas la règle PR Gates correspondante.</div>

Pour vous assurer que les PR Gates sont en mesure de créer des checks de PR, vous devez installer l'intégration pour votre fournisseur SCM. Si l'intégration n'est pas installée, suivez la documentation d'intégration [GitHub][6], [GitLab Source Code][13], [Azure DevOps Source Code][7] ou [Bitbucket Cloud Source Code][14] pour en configurer une.

### Configurer les checks de PR pour qu'ils soient bloquants {#configure-pr-checks-to-be-blocking}

<div class="alert alert-info">
Pour Bitbucket Cloud, les checks ne peuvent être configurés comme bloquants que si vous utilisez <strong>Bitbucket Cloud Premium</strong>.
</div>

Pour rendre ces checks bloquants, ils doivent être définis comme obligatoires dans les politiques de branche de votre fournisseur de gestion de code source (ou le compte de service doit être défini comme approbateur requis de vos demandes de fusion dans le cas de GitLab) :

- [GitHub][2]
- [GitLab][9]
- [Azure DevOps][3]
- [Bitbucket Cloud][10]

## Gérer les règles {#manage-rules}

Vous pouvez modifier ou supprimer une règle PR Gates en survolant celle-ci dans la liste [{{< ui >}}PR Gates Rules{{< /ui >}}][1] et en cliquant sur l'icône {{< ui >}}Edit{{< /ui >}} ou {{< ui >}}Delete{{< /ui >}}.

{{< img src="pr_gates/setup/delete_3.png" alt="Modifier, cloner ou supprimer une règle PR Gates" style="width:100%;">}}

## Autorisations {#permissions}

Seuls les utilisateurs disposant de l'autorisation `quality_gate_rules_write` peuvent créer et modifier des règles PR Gate. Les utilisateurs disposant de l'autorisation `quality_gate_rules_read` peuvent consulter les règles PR Gate.

Pour plus d'informations, consultez la documentation sur les autorisations RBAC [8].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/ci/pr-gates
[2]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches
[3]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pr-status-policy?view=azure-devops
[4]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/collaborating-on-repositories-with-code-quality-features/about-status-checks
[5]: https://learn.microsoft.com/en-us/azure/devops/repos/git/pull-request-status?view=azure-devops
[6]: /fr/integrations/github/
[7]: /fr/integrations/azure-devops-source-code/
[8]: /fr/account_management/rbac/permissions
[9]: https://docs.gitlab.com/user/project/merge_requests/approvals/rules/
[10]: https://support.atlassian.com/bitbucket-cloud/docs/suggest-or-require-checks-before-a-merge/
[11]: https://docs.gitlab.com/ci/ci_cd_for_external_repos/external_commit_statuses/
[12]: https://support.atlassian.com/bitbucket-cloud/docs/check-build-status-in-a-pull-request/
[13]: /fr/integrations/gitlab-source-code/
[14]: /fr/integrations/bitbucket-source-code/