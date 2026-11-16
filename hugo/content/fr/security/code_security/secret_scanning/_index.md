---
algolia:
  tags:
  - secrets scanning
  - secret scanning
  - datadog static analysis
  - SAST
description: Utilisez Datadog Secret Scanning pour trouver les secrets exposés dans
  le code source.
further_reading:
- link: https://www.datadoghq.com/blog/code-security-secret-scanning
  tag: Blog
  text: Détectez et bloquez les identifiants exposés avec Datadog Secret Scanning.
is_beta: true
title: Secret Scanning
---
{{< callout url="https://www.datadoghq.com/product-preview/generic-secret-scanning-in-code/" header="Trouvez les Generic Secrets dans votre code" >}}
Generic Secret Scanning est en préversion. Il recherche les jetons et mots de passe internes qui ne correspondent pas à un modèle de fournisseur.
{{< /callout >}}

Datadog Secret Scanning analyse le code pour trouver les secrets exposés. Datadog tente également de valider les secrets et d'afficher leur statut (valide, invalide) pour vous aider à hiérarchiser la correction des secrets.

## Configurer Secret Scanning {#set-up-secret-scanning}

Les analyses peuvent s'exécuter dans vos pipelines CI/CD ou directement dans Datadog avec l'analyse hébergée (prise en charge pour GitHub, Azure DevOps et GitLab). Pour commencer, accédez à [{{< ui >}}Code Security Setup{{< /ui >}}][1] et cliquez sur {{< ui >}}Activate scanning for your repositories{{< /ui >}} ou apprenez à configurer Secret Scanning en utilisant [GitHub actions][5] ou avec [d'autres fournisseurs CI][6].

## Règles de Secret Scanning {#secret-scanning-rules}

Datadog Secret Scanning est propulsé par [Sensitive Data Scanner (SDS)][3] et inclut toutes les règles de la
[catégorie Secrets et identifiants de SDS][4]. Pour un sous-ensemble de détections, Secret Scanning vérifie automatiquement si les clés détectées sont actives avec la [validation active par des tiers][17]. 

## Fonctionnement {#how-it-works}

Secret Scanning s'intègre directement à vos dépôts pour détecter en continu les secrets divulgués dans votre code. Basé sur l'analyseur statique de Datadog, il analyse chaque commit sur toutes les branches de chaque dépôt configuré. Les résultats sont présentés avec le contexte du dépôt, de la branche et du chemin de fichier afin que votre équipe puisse identifier, hiérarchiser et corriger les secrets exposés à la source.

Chaque analyse examine le contenu complet de chaque fichier concerné au niveau du commit analysé, et pas seulement les lignes ou les fichiers modifiés par le commit. Lorsque Datadog analyse un dépôt pour la première fois avec l'analyse hébergée, il analyse également l'historique Git complet du dépôt. Voir [Détecter les secrets dans l'historique Git](#detect-secrets-in-git-history).

L'analyse prenant en compte les différences, disponible pour [Static Code Analysis][18], n'est pas prise en charge pour Secret Scanning.

## Fonctionnalités clés {#key-capabilities}

### Détecter les secrets dans l'historique Git {#detect-secrets-in-git-history}

La suppression d'un secret d'un fichier ne le supprime pas du dépôt. Le secret demeure dans les commits précédents, où toute personne ayant accès au dépôt peut le récupérer.

Lorsqu'un dépôt est analysé pour la première fois avec l'analyse hébergée, Datadog analyse l'intégralité de son historique Git sur toutes les branches, en plus du dernier commit. Les secrets qui ne sont plus présents au niveau du dernier commit de la branche par défaut sont signalés comme des découvertes d'historique uniquement.

Les découvertes d'historique uniquement sont étiquetées {{< ui >}}Detected in Git History{{< /ui >}} dans la liste des découvertes. Pour les examiner :

- **Sur tous les dépôts** : Accédez à [{{< ui >}}Vulnerabilities{{< /ui >}} > {{< ui >}}Secret Scanning (Secrets){{< /ui >}}][15] et filtrez selon la facette {{< ui >}}Is Git History{{< /ui >}}.
- **Pour un seul dépôt** : Accédez à [{{< ui >}}Repositories{{< /ui >}}][14], sélectionnez le dépôt et ouvrez l'onglet {{< ui >}}Leaked Secrets{{< /ui >}}.

Le panneau de détails de la découverte indique où se trouve le secret dans l'historique du dépôt :

- {{< ui >}}Introduced in{{< /ui >}} : Le commit qui a ajouté le secret, et l'auteur de ce commit.
- {{< ui >}}Removed in{{< /ui >}} : Le commit qui a supprimé le secret. Si le secret est toujours présent sur une branche ou un tag non fusionné, cela indique {{< ui >}}Not removed{{< /ui >}}.

<div class="alert alert-info">L'historique Git est analysé une fois, lors de la première analyse d'un dépôt avec l'analyse hébergée. Un secret toujours présent sur une branche ou un tag non fusionné, mais pas sur la branche par défaut, est signalé comme une découverte d'historique uniquement. Les analyses CI n'analysent que le commit analysé.</div>

<div class="alert alert-warning">Les découvertes d'historique uniquement ne sont pas fermées automatiquement par les analyses ultérieures, et la réécriture de l'historique Git ne les ferme pas. Faites pivoter ou révoquez l'identifiant exposé, puis <a href="#mute-findings">mettez en sourdine la découverte</a>.</div>

### Examinez les secrets exposés dans les pull requests {#review-exposed-secrets-in-pull-requests}

Lorsqu'une pull request introduit un secret divulgué, Datadog ajoute automatiquement des commentaires en ligne pour signaler l'exposition. Vous pouvez également ouvrir une nouvelle pull request depuis Datadog pour corriger directement la découverte. Pour plus d'informations, consultez [Commentaires sur les pull requests][7]. 

### Bloquez automatiquement les fuites avec les PR Gates {#automatically-block-leaks-with-pr-gates}

Utilisez les [PR Gates][11] pour empêcher que des secrets divulgués ne soient fusionnés dans votre branche principale. Datadog analyse chaque pull request à la recherche de secrets exposés et signale un statut de réussite ou d'échec directement à GitHub, Azure DevOps ou GitLab (en préversion).

Par défaut, les checks sont informatifs, mais vous pouvez les rendre bloquants pour empêcher la fusion lorsque des secrets sont détectés. Pour obtenir des instructions de configuration, consultez [Set up PR Gate Rules][12].

### Exclusions en ligne {#inline-exclusions}

Vous pouvez ajouter des exclusions en ligne pour empêcher certaines découvertes d'apparaître dans les résultats d'analyse. Commentez `no-dd-secrets` pour ignorer les secrets détectés sur la ligne suivante.

### Afficher et filtrer les constats {#view-and-filter-findings}

Après avoir configuré le Secret Scanning, chaque commit vers un dépôt analysé déclenche une analyse. Les découvertes sont résumées sur la page [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] et regroupées par dépôt sur la page [{{< ui >}}Code Security Repositories{{< /ui >}}][14].

Sous l'onglet {{< ui >}}Secret Scanning (Secrets){{< /ui >}}, utilisez des filtres pour affiner les résultats par facettes telles que :

- Gravité
- Statut (open, muted, fixed)
- {{< ui >}}Validation Status{{< /ui >}}
- Équipe
- Visibilité du dépôt
- {{< ui >}}Is Git History{{< /ui >}}

### Créer des tickets Jira à partir des constats {#create-jira-tickets-from-findings}

Vous pouvez créer un ticket Jira bidirectionnel directement à partir de n'importe quel constat pour suivre et corriger les problèmes dans vos workflows existants. Le statut du ticket reste synchronisé entre Datadog et Jira. Pour plus d'informations, consultez [Synchronisation bidirectionnelle des tickets avec Jira][16].

### Déclarez un incident à partir d'un secret divulgué {#declare-an-incident-from-a-leaked-secret}
[Déclarer un incident][13] à partir d'une découverte en cliquant sur {{< ui >}}Declare incident{{< /ui >}} dans le panneau latéral de Secret Scanning. L'incident est pré-rempli avec toutes les métadonnées de détection.

### Masquer les résultats {#mute-findings}

Pour masquer un constat, cliquez sur {{< ui >}}Mute{{< /ui >}} dans le panneau de détails du constat. Cela ouvre un workflow où vous pouvez [créer une règle de mise en sourdine][10] pour un filtrage contextuel par valeurs de tag (par exemple, par `repository`). Mettre un constat en mode mute le masque et l'exclut des rapports.

Pour restaurer un constat en mode mute, cliquez sur {{< ui >}}Unmute{{< /ui >}} dans le panneau de détails. Vous pouvez également utiliser le filtre {{< ui >}}Status{{< /ui >}} sur la page [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15] pour examiner les découvertes mises en sourdine.

## Étapes suivantes {#next-steps}

1. [Mettez en place Secret Scanning][1] dans votre environnement.
2. Configurez [Automation Pipelines][10] pour automatiser le tri initial.
3. Examinez les résultats sur la page [{{< ui >}}Code Security Vulnerabilities{{< /ui >}}][15].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://app.datadoghq.com/security/configuration/code-security/setup
[2]: /fr/security/code_security/static_analysis/setup
[3]: /fr/security/sensitive_data_scanner/
[4]: /fr/security/sensitive_data_scanner/scanning_rules/library_rules/?category=Secrets+and+credentials#overview
[5]: /fr/security/code_security/secret_scanning/github_actions
[6]: /fr/security/code_security/secret_scanning/generic_ci_providers
[7]: /fr/security/code_security/dev_tool_int/pull_request_comments/
[8]: /fr/security/automation_pipelines/mute
[9]: https://app.datadoghq.com/integrations/github/
[10]: /fr/security/automation_pipelines/
[11]: /fr/pr_gates/
[12]: /fr/pr_gates/setup
[13]: /fr/incident_response/incident_management/investigate/declare/#from-a-leaked-secret
[14]: https://app.datadoghq.com/ci/code-analysis?
[15]: https://app.datadoghq.com/security/code-security/secrets
[16]: /fr/security/ticketing_integrations#bidirectional-ticket-syncing-with-jira
[17]: /fr/security/code_security/secret_scanning/secret_validation/
[18]: /fr/security/code_security/static_analysis/setup/#diff-aware-scanning