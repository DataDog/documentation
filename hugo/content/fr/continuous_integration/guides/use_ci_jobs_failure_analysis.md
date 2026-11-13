---
description: Apprenez à utiliser Logs Analysis pour identifier les causes profondes
  les plus courantes d'échec dans les pipelines CI.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentation
  text: Apprenez à rechercher et à gérer vos exécutions de pipeline.
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
  tag: Documentation
  text: Identifiez les jobs CI sur le chemin critique pour réduire la durée du pipeline.
title: Utilisez Logs Analysis pour identifier les causes profondes dans les jobs CI
  ayant échoué.
---
## Présentation {#overview}

Ce guide explique comment utiliser Logs Analysis pour déterminer la cause profonde la plus courante des jobs CI ayant échoué. Cela peut aider à améliorer l'expérience utilisateur avec les pipelines CI.

Datadog utilise également ce classifieur pour alimenter [automatic job retries][10], qui relance les jobs dont les échecs sont probablement transitoires.

### Comprendre Logs Analysis {#understanding-logs-analysis}

CI Visibility utilise un modèle LLM pour générer des messages d'erreur améliorés et les catégoriser avec un domaine et un sous-domaine, en se basant sur les logs pertinents collectés à partir de chaque job CI ayant échoué.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="Jobs CI ayant échoué avec des erreurs générées par LLM" width="90%">}}

#### Comment CI Visibility identifie-t-il les logs pertinents d'un job CI ? {#how-does-ci-visibility-identify-the-relevant-logs-of-a-ci-job}

CI Visibility considère qu'une ligne de log est pertinente lorsqu'elle n'est pas apparue dans les logs collectés lors des exécutions réussies précédentes de ce job CI. La pertinence des logs est uniquement calculée pour les logs provenant de jobs CI ayant échoué.

Vous pouvez vérifier si une ligne de log a été considérée comme pertinente en utilisant le tag `@relevant:true` dans le Log Explorer.

#### Quelles informations le modèle LLM utilise-t-il en entrée ? {#what-information-does-the-llm-model-use-as-input}

Si un job CI ayant échoué contient des logs pertinents, le modèle LLM utilise les 100 dernières lignes de log pertinentes en entrée. Si un job CI ayant échoué ne contient pas de logs pertinents, CI Visibility envoie les 100 dernières lignes de log.

Chaque ligne de log est pré-analysée afin de masquer toute information potentiellement sensible avant d'être utilisée.

<div class="alert alert-info">
Le modèle LLM peut classer les erreurs avec des messages similaires dans des sous-domaines distincts mais apparentés. Par exemple, si le message d'erreur est <code>Cannot connect to docker daemon</code>, il est généralement classé sous <code>domain:platform</code> et <code>subdomain:network</code>. Cependant, le modèle LLM peut parfois le classer sous <code>subdomain:infrastructure</code> à la place.
</div>

#### Domaines et sous-domaines {#domains-and-subdomains}

Les erreurs sont classées avec un domaine et un sous-domaine :

##### Domaines {#domains}

| Domaine | Description |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | Échecs causés par le code en cours de construction et de test dans le pipeline CI. Ils doivent être corrigés par le développeur ayant modifié le code.           |
| `platform` | Échecs causés par des raisons externes au code en cours de construction et de test. Ces échecs peuvent provenir du fournisseur CI, de l'infrastructure sous-jacente ou de dépendances externes. Ils ne sont pas liés aux modifications de code du développeur et doivent souvent être corrigés par l'équipe responsable de l'ensemble du système CI. |
| `unknown`  | Utilisé lorsque les logs ne révèlent pas de cause racine claire de l'échec d'un job CI.                                                                                                |

##### Sous-domaines {#subdomains}

Cliquez sur un onglet de domaine pour voir les sous-domaines correspondants :

{{< tabs >}}
{{% tab "Code" %}}

| Sous-domaine | Cause | Exemples |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | Erreurs de compilation ou de construction. | `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | Échecs de tests.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | Échecs de formatage ou de linting.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | Violations de sécurité.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "Plateforme" %}}

| Sous-domaine      | Cause                                                                                         | Exemples                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | Erreurs dans la génération d'artefacts ou erreurs d'assemblage lors de l'exécution d'un script. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | Erreurs lors des déploiements, ou liées aux configurations de déploiement.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | Erreurs liées à l'infrastructure sur laquelle le job CI a été exécuté.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | Erreurs de connectivité avec d'autres dépendances.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | Erreurs d'authentification ; identifiants manquants ou incorrects.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | Erreurs lors de l'installation ou de la mise à jour des dépendances nécessaires à l'exécution du job CI.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | Erreurs lors de l'exécution des commandes git.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | Erreurs lors du respect des checks requis pendant l'exécution du job CI.            | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | Erreurs lors de la configuration du job CI.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | Erreurs syntaxiques dans le script du job CI.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "Unknown" %}}

| Sous-domaine | Description                     | Exemple                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| inconnu   | L'erreur n'a pas pu être catégorisée. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### Fournisseurs CI pris en charge {#supported-ci-providers}

Logs Analysis est disponible pour les fournisseurs CI suivants :

* [Azure Pipelines][8]
* [Buildkite][12]
* [CircleCI][13]
* [GitHub Actions][1]
* [GitLab][2]

**Remarque :** Logs Analysis peut nécessiter une configuration spécifique au fournisseur CI. Vérifiez la section **Logs Analysis** sur la [page de configuration de Pipeline Visibility][6] pour votre fournisseur.

<div class="alert alert-info">Si Logs Analysis vous intéresse mais que votre fournisseur CI n'est pas encore pris en charge, remplissez <a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">ce formulaire</a>.</div>

## Identifiez les erreurs les plus récurrentes dans vos pipelines CI {#identify-the-most-recurrent-errors-in-your-ci-pipelines}

### Utilisation de la page CI Health {#using-the-ci-health-page}

[CI Health][3] fournit une vue d'ensemble de la santé et des performances de vos pipelines CI. Il aide les équipes DevOps et d'ingénierie à surveiller les jobs CI, à détecter les échecs et à optimiser les performances des builds.

Sur cette page, vous pouvez voir une répartition des erreurs dans vos pipelines CI, classées par domaine d'erreur. Cliquez sur un pipeline CI et vérifiez la colonne {{< ui >}}Breakdown{{< /ui >}} dans la section {{< ui >}}Failed Executions{{< /ui >}}.

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="Répartition de l'analyse des échecs de jobs CI dans CI Health" width="90%">}}

### Utilisation des facettes {#using-facets}

Utilisez les facettes `@error.message`, `@error.domain` et `@error.subdomain` pour identifier les erreurs les plus récurrentes dans vos pipelines CI. En utilisant ces facettes, vous pouvez créer des dashboards et des notebooks personnalisés.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="Jobs CI échoués filtrés par error.domain et error.subdomain" width="90%">}}

Ces facettes ne sont disponibles que lors de l'utilisation de `ci_level:job` dans une requête. Si l'analyse des échecs des jobs CI ne peut pas être calculée (par exemple, si vous n'utilisez pas un fournisseur CI pris en charge), ces facettes contiendront les informations d'erreur provenant du fournisseur CI.

### Utilisation du modèle de dashboard {#using-the-dashboard-template}

Vous pouvez importer le modèle de dashboard {{< ui >}}CI Visibility - CI Jobs Failure Analysis{{< /ui >}} :

1. Ouvrez le modèle de dashboard [civisibility-ci-jobs-failure-analysis-dashboard.json][4] et copiez le contenu dans le presse-papiers.
2. Créez un [New Dashboard][5] dans Datadog.
3. Collez le contenu copié dans le nouveau dashboard.
4. Enregistrez le dashboard.

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="Logs Analysis dashboard" width="90%">}}

### Utilisation des commentaires de PR {#using-pr-comments}

Vous pouvez ajouter Logs Analysis dans vos commentaires de PR.

{{< img src="continuous_integration/pr_comment.png" alt="Commentaire de PR avec Logs Analysis incluse" width="90%">}}

Pour que les commentaires de PR soient publiés, vos dépôts doivent être intégrés à Datadog. Pour en savoir plus, consultez [Connecter vos dépôts Git à Datadog][7].

Activez les commentaires de PR depuis [**CI/CD Optimization** > **Settings** > **Repositories**][11] :

1. Choisissez où appliquer le paramètre :
   - Sélectionnez l'onglet **Organization** pour activer les commentaires de PR pour chaque dépôt par défaut.
   - Sélectionnez l'onglet **Repository-specific** pour activer les commentaires de PR pour un seul dépôt.
1. Sous **General**, activez **PR Comments**.


## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/continuous_integration/pipelines/github/
[2]:/fr/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/fr/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/fr/dashboards/
[6]:/fr/continuous_integration/pipelines/#setup
[7]:/fr/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
[8]:/fr/continuous_integration/pipelines/azure/
[10]:/fr/continuous_integration/pipelines/automatic_retries/
[11]:https://app.datadoghq.com/ci/settings/ci-cd/repositories
[12]:/fr/continuous_integration/pipelines/buildkite/
[13]:/fr/continuous_integration/pipelines/circleci/