---
aliases:
- /fr/static_analysis/github_pull_requests
- /fr/code_analysis/github_pull_requests/
- /fr/security/code_security/dev_tool_int/github_pull_requests/
description: Apprenez à configurer les commentaires de pull request pour les dépôts
  analysés par Code Security.
title: Commentaires de pull request
---
## Présentation {#overview}
Code Security publie des commentaires directement sur les pull requests (PRs) dans votre système de gestion de code source (SCM) lorsque des vulnérabilités sont détectées sur les dépôts activés. Cela vous aide à voir et à corriger les problèmes dans leur contexte avant de fusionner le code. Les commentaires sont sensibles aux différences (diff-aware), ce qui signifie qu'ils ne signalent que les nouveaux problèmes introduits sur les lignes modifiées dans la PR.

Il existe deux types de commentaires de PR :
- **Commentaire en ligne** : signale une découverte individuelle de Code Security sur des lignes de code spécifiques et suggère une remédiation (si disponible).
        
    {{< img src="/code_security/github_inline_pr_comment_light.png" alt="Un bot Datadog a publié un commentaire en ligne sur une pull request GitHub signalant une « Critical: Code Vulnerability ». Le commentaire suggère de remplacer le code os.system(command) par os.system(shlex.quote(command)) pour assainir l'appel de processus." style="width:100%;" >}}

    For SAST vulnerabilities and code quality violations that don't have an available suggested fix, the inline comment includes a {{< ui >}}Fix with Cursor{{< /ui >}} link. Click it to open the pull request's branch in Cursor with a tailored remediation prompt for the finding. When a suggested fix is available, the comment shows a committable suggestion instead. To handle the Cursor deep link, install the [Datadog extension for VS Code and Cursor](/ide_plugins/vscode/?tab=cursor).

    {{< img src="code_security/dev_tool_int/pull_request_comments/fix-with-cursor.png" alt="Un commentaire en ligne d'un bot Datadog sur une pull request GitHub signalant une violation de la qualité du code, avec un lien « Fix with Cursor » sous la découverte." style="width:100%;" >}}
- **Commentaire récapitulatif** : combine toutes les découvertes de Datadog en un seul commentaire. Ce commentaire n'apparaît que si votre PR contient des problèmes nécessitant une attention particulière. Une fois ces découvertes traitées, le commentaire est automatiquement modifié pour confirmer que votre pull request est désormais exempte de problèmes.
  
    {{< img src="/code_security/github_summary_comment_injections_light.png" alt="Un bot Datadog a publié un commentaire récapitulatif sur une pull request GitHub. Le commentaire comporte une section « Warnings » qui répertorie quatre vulnérabilités de code critiques, telles que des injections SQL et des injections de commandes, avec des liens vers les fichiers et les lignes de code spécifiques." style="width:100%;" >}}

Vous pouvez configurer les commentaires de PR au niveau de l'organisation ou du dépôt dans [Repository Settings][7], avec les contrôles suivants :
- Activation/désactivation des commentaires de PR par type d'analyse (SAST, SCA statique, Secrets, IaC)
- Définition de seuils de gravité pour chaque type d'analyse
- Exclusion des découvertes provenant de fichiers de test ou de dépendances de développement/test
- Filtrage des découvertes identifiées comme des faux positifs par Bits AI

Apprenez-en davantage sur les [commentaires de PR dans Datadog][11].

**Remarque** : les commentaires de PR ne sont pas des vérifications de PR. Pour configurer les vérifications, consultez [PR Gates][10].

## Prérequis {#prerequisites}
- Vous devez avoir activé l'intégration du code source Datadog pour votre fournisseur. Les commentaires de PR sont pris en charge pour les dépôts [GitHub][2], [GitLab][8] et [Azure DevOps][9].  
- Vos dépôts doivent avoir le ou les produits Code Security pertinents activés. Pour activer Code Security dans l'application, accédez à la [{{< ui >}}Code Security{{< /ui >}} page Paramètres][4].

<div class="alert alert-info">
  Les commentaires de pull request ne sont pas pris en charge pour les pull requests dans les dépôts publics, ni pour celles visant une branche de destination dans un dépôt différent de la branche source (c'est-à-dire les dépôts dérivés cherchant à fusionner dans le dépôt principal).
</div>

## Configurez les commentaires de pull request {#set-up-pull-request-comments}
Suivez les étapes ci-dessous en fonction de votre fournisseur de gestion de code source.

{{< tabs >}}
{{% tab "GitHub" %}}

<div class="alert alert-info">Si vous utilisez l'analyse hébergée par Datadog, activez le bouton pour le type d'analyse souhaité (par exemple, l'analyse de code statique (SAST)) après avoir terminé les étapes de configuration de GitHub.
Si vous utilisez <a href="/security/code_security/static_analysis/github_actions/">GitHub Actions</a> pour exécuter vos analyses, déclenchez l'action sur <code>push</code> pour que les commentaires apparaissent une fois la configuration de GitHub terminée.</div>

### Connectez votre ou vos comptes GitHub à Datadog {#connect-your-github-accounts-to-datadog}
Pour obtenir des instructions de configuration, lisez la documentation sur [l'intégration du code source GitHub de Datadog][2].

### Créez ou mettez à jour une application GitHub {#create-or-update-a-github-app}
Si vous avez déjà une application GitHub connectée à Datadog, mettez-la à jour. Sinon, créez une nouvelle application GitHub.

<div class="alert alert-info">Les autorisations que vous accordez à l'application GitHub déterminent les fonctionnalités de <a href="/integrations/github/">l'intégration GitHub</a> disponibles pour la configuration.</div>

#### Créez et installez une application GitHub {#create-and-install-a-github-app}

1. Dans Datadog, accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}} > {{< ui >}}Add New GitHub Application{{< /ui >}}][3].
2. Remplissez tous les détails requis, tels que le nom de l'organisation GitHub.
3. Sous {{< ui >}}Select Features{{< /ui >}}, cochez la case {{< ui >}}Code Security: Pull Request Review Comments{{< /ui >}}.
4. Sous {{< ui >}}Edit Permissions{{< /ui >}}, vérifiez que l'autorisation {{< ui >}}Pull Requests{{< /ui >}} est définie sur {{< ui >}}Read & Write{{< /ui >}}.
5. Cliquez sur {{< ui >}}Create App in GitHub{{< /ui >}}.
6. Saisissez un nom pour votre application, puis soumettez-le.
7. Cliquez sur {{< ui >}}Install GitHub App{{< /ui >}}.
8. Choisissez les dépôts dans lesquels l'application doit être installée, puis cliquez sur {{< ui >}}Install & Authorize{{< /ui >}}.

    {{< img src="ci/static-analysis-install-github-app.png" alt="Écran d'installation de l'application GitHub" style="width:50%;" >}}

#### Mettre à jour une application GitHub existante {#update-an-existing-github-app}

1. Dans Datadog, accédez à [{{< ui >}}Integrations{{< /ui >}} > {{< ui >}}GitHub Applications{{< /ui >}}][5] et recherchez l'application GitHub que vous souhaitez utiliser pour Code Security.
   {{< img src="ci/static-analysis-existing-github-app.png" alt="Exemple de commentaire d'analyse de code statique sur une pull request" style="width:90%;" >}}
2. Sous l'onglet {{< ui >}}Features{{< /ui >}}, consultez la section {{< ui >}}Code Security: Pull Request Comments{{< /ui >}} pour déterminer si votre application GitHub nécessite des autorisations supplémentaires. Si tel est le cas, cliquez sur {{< ui >}}Update permissions in GitHub{{< /ui >}} pour modifier les paramètres de l'application.
3. Sous {{< ui >}}Repository permissions{{< /ui >}}, définissez l'accès {{< ui >}}Pull Requests{{< /ui >}} sur {{< ui >}}Read and write{{< /ui >}}.
   {{< img src="ci/static-analysis-pr-read-write-permissions.png" alt="La liste déroulante pour l'autorisation de lecture et d'écriture des pull requests." style="width:90%;" >}}
4. Sous la rubrique {{< ui >}}Subscribe to events{{< /ui >}}, cochez la case {{< ui >}}Pull request{{< /ui >}}.
   {{< img src="ci/static-analysis-pr-review-comment.png" alt="La case à cocher pour l'autorisation de commentaire de révision de pull request." style="width:90%;" >}}


[2]: /fr/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[5]: https://app.datadoghq.com/integrations/github/configuration

{{% /tab %}}
{{% tab "GitLab" %}}

Consultez les instructions de configuration du [code source GitLab][8] pour connecter les dépôts GitLab à Datadog.

[8]: /fr/integrations/gitlab-source-code/

{{% /tab %}}
{{% tab "DevOps" %}}

Consultez les [instructions de configuration du code source Azure][9] pour connecter les dépôts Azure DevOps à Datadog.

[9]: /fr/integrations/azure-devops-source-code/#source-code-functionality

{{% /tab %}}
{{< /tabs >}}

## Options de configuration {#configuration-options}

Avant d'activer les commentaires de PR, assurez-vous qu'**au moins une fonctionnalité d'analyse Code Security est activée dans le dépôt.** Même si les commentaires de PR sont configurés au niveau de l'organisation, ils ne sont ajoutés que dans les dépôts où un type d'analyse pris en charge (par exemple, SAST, SCA ou IaC) est actif. Les dépôts sans aucun type d'analyse activé ne recevront pas de commentaires de PR.

Les commentaires de PR peuvent être configurés au niveau de l'organisation ou au niveau du dépôt :
- **Niveau de l'organisation :** Les paramètres s'appliquent à tous les dépôts de l'organisation qui ont au moins une fonctionnalité d'analyse activée.
- **Niveau du dépôt :** Les paramètres remplacent les valeurs par défaut de l'organisation pour le dépôt sélectionné.

Lors de la configuration des commentaires de PR, vous pouvez :
- Activer ou désactiver les commentaires pour des types d'analyse spécifiques (SAST, SCA, IaC).
- Définissez des seuils de gravité minimaux pour contrôler l'apparition des commentaires.
- Excluez les commentaires pour les résultats trouvés dans les fichiers de test ou les dépendances de développement/test afin d'éviter le bruit généré par les problèmes de faible priorité.
- Filtrez les résultats identifiés comme des faux positifs par Bits AI.

## Configurez les commentaires de PR au niveau de l'organisation {#configure-pr-comments-at-the-organization-level}

1. Dans Datadog, accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7].
1. Dans {{< ui >}}Repository Settings{{< /ui >}}, cliquez sur {{< ui >}}Global PR Comment Configuration{{< /ui >}}.
1. Configurez les paramètres :
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}} : Activez cette option pour appliquer les commentaires de PR à tous les types et niveaux de gravité.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}} : Activez cette option pour autoriser les commentaires de PR pour SAST. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les fichiers de test. Sélectionnez {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} pour exclure les découvertes que Bits AI a identifiées comme des faux positifs. Sélectionnez {{< ui >}}Include public repositories{{< /ui >}} pour commenter les dépôts publics.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour SCA. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les dépendances existant uniquement dans les environnements de développement ou de test. Sélectionnez {{< ui >}}Include public repositories{{< /ui >}} pour commenter les dépôts publics.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour Secrets. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}} pour empêcher les commentaires sur les secrets trouvés dans les fichiers de test. Sélectionnez {{< ui >}}Include public repositories{{< /ui >}} pour commenter les dépôts publics.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour IaC. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les fichiers de test. Sélectionnez {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} pour exclure les découvertes que Bits AI a identifiées comme des faux positifs. Sélectionnez {{< ui >}}Include public repositories{{< /ui >}} pour commenter les dépôts publics.
1. Cliquez sur {{< ui >}}Save{{< /ui >}}.

## Configurer les commentaires de PR au niveau du dépôt {#configure-pr-comments-at-the-repository-level}

1. Dans Datadog, accédez à [{{< ui >}}Security{{< /ui >}} > {{< ui >}}Code Security{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][7].
1. Dans {{< ui >}}Repository Settings{{< /ui >}}, sélectionnez un dépôt dans la liste.
1. Configurez les paramètres :
    - {{< ui >}}Enable PR comments for all scan types and severities{{< /ui >}} : Activez cette option pour appliquer les commentaires de PR à tous les types et niveaux de gravité.
    - {{< ui >}}Enable for Static Analysis (SAST){{< /ui >}} : Activez cette option pour autoriser les commentaires de PR pour SAST. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les fichiers de test. Sélectionnez {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} pour exclure les découvertes que Bits AI a identifiées comme des faux positifs.
    - {{< ui >}}Enable for Software Composition Analysis (SCA){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour SCA. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test or dev dependencies{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les dépendances existant uniquement dans les environnements de développement ou de test.
    - {{< ui >}}Enable for Secret Scanning (Secrets){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour Secrets. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if secrets are detected in test files{{< /ui >}} pour empêcher les commentaires sur les secrets trouvés dans les fichiers de test.
    - {{< ui >}}Enable for Infrastructure-as-Code (IaC){{< /ui >}} : Activez cette option pour activer les commentaires de PR pour IaC. Si cette option est activée, spécifiez un seuil de gravité minimal. De plus, sélectionnez {{< ui >}}Exclude PR comments if violations are detected in test files{{< /ui >}} pour empêcher les commentaires sur les problèmes trouvés dans les fichiers de test. Sélectionnez {{< ui >}}Filter out findings identified as false positives by Bits AI{{< /ui >}} pour exclure les découvertes que Bits AI a identifiées comme des faux positifs.
    - {{< ui >}}Block all comments in this repository{{< /ui >}} : Activez cette option pour désactiver tous les commentaires pour ce dépôt, en remplaçant les paramètres globaux.
1. Cliquez {{< ui >}}Save Configuration{{< /ui >}}.

[1]: /fr/security/code_security/
[2]: /fr/integrations/github/
[3]: https://app.datadoghq.com/integrations/github/add
[4]: https://app.datadoghq.com/security/configuration/code-security/setup
[5]: https://app.datadoghq.com/integrations/github/configuration
[6]: /fr/security/code_security/static_analysis/github_actions/
[7]: https://app.datadoghq.com/security/configuration/code-security/settings
[8]: /fr/integrations/gitlab-source-code/
[9]: https://docs.datadoghq.com/fr/integrations/azure-devops-source-code/#source-code-functionality
[10]: /fr/quality_gates/?tab=staticanalysis#setup
[11]: /fr/integrations/guide/source-code-integration/?tab=codesecurity#pr-comments