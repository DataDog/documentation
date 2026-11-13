---
further_reading:
- link: /continuous_integration/pipelines
  tag: Documentation
  text: Explorer les résultats et les performances de l'exécution du pipeline
- link: /continuous_integration/pipelines/github/
  tag: Documentation
  text: Configurer CI Visibility pour GitHub Actions
- link: /continuous_integration/pipelines/gitlab/
  tag: Documentation
  text: Configurer CI Visibility pour GitLab
- link: /continuous_integration/troubleshooting/
  tag: Documentation
  text: Dépannage de CI Visibility
title: Réexécutions automatiques de jobs
---
## Présentation {#overview}

Les réexécutions automatiques de jobs permettent aux développeurs de gagner du temps en relançant les échecs susceptibles d'être transitoires, tels que les délais d'attente réseau, les pannes d'infrastructure ou les tests instables. Les défauts de code réels ne font pas l'objet de réexécutions automatiques. Datadog soumet chaque job en échec à un classificateur d'erreurs basé sur l'IA. Lorsque l'échec est identifié comme pouvant faire l'objet d'une réexécution automatique, Datadog déclenche une réexécution via l'API du fournisseur CI sans intervention manuelle.

Les réexécutions automatiques réduisent le nombre de pipelines que les développeurs relancent manuellement, raccourcissent les boucles de rétroaction et permettent aux métriques de succès des pipelines de se concentrer sur les échecs non transitoires.

<div class="alert alert-info">Les réexécutions automatiques de jobs sont disponibles pour <a href="/continuous_integration/pipelines/github/">GitHub Actions</a> et <a href="/continuous_integration/pipelines/gitlab/">GitLab</a>.</div>

## Fonctionnement des réexécutions automatiques de jobs {#how-automatic-job-retries-work}

Lorsqu'un job de votre pipeline CI échoue :
1. Le classificateur d'erreurs IA de Datadog inspecte les logs et le contexte d'erreur du job pour déterminer si l'échec est transitoire.
   - Il s'agit du même classificateur d'erreurs IA utilisé par [Logs Analysis][6], qui lit les logs de job pertinents pour décider si un échec est transitoire.
1. Si l'échec est classé comme pouvant faire l'objet d'une nouvelle tentative, Datadog demande une nouvelle tentative via l'API du fournisseur.
1. Datadog tente à nouveau chaque job en échec jusqu'à un nombre maximal de tentatives (défini par Datadog) pour éviter les boucles de nouvelles tentatives infinies. Les réexécutions automatiques sont comptées par job et par commit ; si le même job échoue à nouveau sur un nouveau commit, le compteur est réinitialisé.
1. Datadog enregistre le résultat de la réexécution sur le pipeline d'origine dans CI Visibility.

## Prérequis {#prerequisites}

Pour utiliser les réexécutions automatiques de jobs :
- CI Visibility doit être activé pour votre intégration [GitHub Actions][1] ou [GitLab][2].
- Pour GitHub Actions, l'application [Datadog GitHub App][8] doit disposer de l'autorisation **Actions: Write**.
- L'[intégration du code source Datadog][3] doit être configurée pour les dépôts où vous souhaitez utiliser les réexécutions automatiques.
- L'analyse des logs doit être configurée pour les dépôts où vous souhaitez utiliser les réexécutions automatiques (voir [Analyse des logs pour GitHub Actions][4] ou [Analyse des logs pour GitLab][5]).
- Pour activer cette fonctionnalité, vous devez disposer de l'autorisation **Écriture des paramètres du fournisseur CI** dans Datadog.

## Activer les reprises automatiques de job {#enable-automatic-job-retries}

Une fois les prérequis remplis, activez les reprises automatiques de job depuis les paramètres d'optimisation CI/CD :

1. Ouvrez [**Optimisation CI/CD** > **Paramètres** > **Dépôts**][7].
1. Choisissez où appliquer le paramètre :
   - Sélectionnez l'onglet **Organisation** pour activer les réexécutions automatiques de jobs par défaut pour chaque dépôt.
   - Sélectionnez l'onglet **Spécifique au dépôt** pour activer les réexécutions automatiques de jobs pour un seul dépôt. Pour appliquer à plusieurs dépôts à la fois, sélectionnez-les et utilisez **Appliquer les paramètres en masse**.
1. Sous **Atte9nuation**, activez **Reprises automatiques de job**.

{{< img src="continuous_integration/auto_job_retries_settings.png" alt="Bascule des réexécutions automatiques de jobs dans les paramètres CI/CD." style="width:100%" >}}

## Comportement spécifique au fournisseur {#provider-specific-behavior}

{{< tabs >}}
{{% tab "GitHub Actions" %}}

### Reprises automatiques de job GitHub Actions {#github-actions-automatic-job-retries}

GitHub Actions impose deux limitations au niveau du fournisseur qui déterminent le fonctionnement des réexécutions automatiques de jobs :

- **Les réexécutions automatiques de jobs ont lieu une fois le workflow terminé.** L'API GitHub ne permet pas de relancer un job individuel tant que le reste du workflow est en cours d'exécution. Datadog attend que le workflow atteigne un état final avant d'émettre des réexécutions automatiques de jobs.
- **Tous les jobs ayant échoué sont réexécutés ensemble, même ceux classés comme non réexécutables.** L'API GitHub ne prend pas en charge la réexécution d'un seul job lorsque d'autres jobs du workflow ont également échoué. Datadog réexécute chaque job ayant échoué dans le workflow via un seul appel d'API GitHub. Cela peut augmenter votre utilisation de calcul GitHub Actions.

### Branches protégées {#protected-branches}

Les autorisations par défaut de l'application Datadog GitHub ne permettent pas la réexécution automatique de jobs sur les branches protégées. Pour activer la réexécution automatique de jobs sur une branche protégée (par exemple, votre branche par défaut), accordez à l'application un accès de niveau Maintainer à l'échelle de l'organisation. Examinez les politiques de votre organisation avant d'étendre les autorisations.

{{% /tab %}}
{{% tab "GitLab" %}}

### Reprises automatiques de job GitLab {#gitlab-automatic-job-retries}

Dès qu'un job échoue dans GitLab, Datadog réexécute ce job spécifique (s'il est classé comme réexécutable). Les autres jobs ayant échoué (qui ne sont pas classés comme réexécutables) et les jobs réussis ne sont pas affectés. Il n'y a aucun coût CI supplémentaire au-delà du ou des jobs réexécutés.

Les réexécutions automatiques de jobs fonctionnent à la fois pour les instances SaaS (GitLab.com) et pour les instances GitLab auto-hébergées.

{{% /tab %}}
{{< /tabs >}}

## Quand un job ayant échoué n'est-il pas relancé ? {#when-is-a-failed-job-not-retried}

Un job ayant échoué n'est pas relancé lorsque :

- Le classificateur IA catégorise l'échec comme non relançable (par exemple, erreurs de compilation ou échecs de tests déclarés).
- Le job a déjà été relancé manuellement ou par des règles de nouvelle tentative natives du fournisseur.

**Remarque :** Sur GitHub Actions, les jobs ayant échoué non réexécutables peuvent tout de même être réexécutés si un autre job dans le même workflow est classé comme réexécutable. Datadog émet un seul appel d'API GitHub « rerun failed jobs », qui réexécute chaque job ayant échoué dans le workflow, y compris ceux qui ne sont pas réexécutables.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/continuous_integration/pipelines/github/
[2]: /fr/continuous_integration/pipelines/gitlab/
[3]: /fr/integrations/guide/source-code-integration/
[4]: /fr/continuous_integration/pipelines/github/#logs-analysis
[5]: /fr/continuous_integration/pipelines/gitlab/#logs-analysis
[6]: /fr/continuous_integration/guides/use_ci_jobs_failure_analysis/
[7]: https://app.datadoghq.com/ci/settings/ci-cd/repositories
[8]: /fr/continuous_integration/pipelines/github/#configure-a-github-app