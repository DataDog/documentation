---
description: Découvrez comment utiliser l'analyse des échecs de tâches CI pour identifier
  les causes profondes de défaillance les plus courantes dans les pipelines CI.
further_reading:
- link: /continuous_integration/search/#pipeline-details-and-executions
  tag: Documentation
  text: Apprendre à rechercher et gérer vos exécutions de pipeline
- link: /continuous_integration/guides/identify_highest_impact_jobs_with_critical_path
  tag: Documentation
  text: Identifier les tâches CI sur le chemin critique pour réduire la durée du pipeline
title: Utiliser l'analyse des échecs de tâches CI pour identifier les causes profondes
  des tâches ayant échoué
---

## Section Overview

Ce guide explique comment utiliser l'analyse des échecs de tâches CI pour déterminer la cause profonde la plus courante des tâches CI ayant échoué. Cela peut contribuer à améliorer l'expérience utilisateur avec les pipelines CI.

### Comprendre l'analyse des échecs de tâches CI

CI Visibility utilise un modèle LLM pour générer des messages d'erreur améliorés et les catégoriser avec un domaine et un sous-domaine, en fonction des logs pertinents collectés à partir de chaque tâche CI ayant échoué.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors.png" alt="Tâches CI ayant échoué avec des erreurs générées par LLM" width="90%">}}

#### Comment CI Visibility identifie-t-il les logs pertinents d'une tâche CI ?

CI Visibility considère qu'une ligne de log est pertinente lorsqu'elle n'est pas apparue dans les logs collectés lors des exécutions réussies précédentes de cette tâche CI. La pertinence des logs n'est calculée que pour les logs provenant de tâches CI ayant échoué.

Vous pouvez vérifier si une ligne de log a été considérée comme pertinente en utilisant le tag `@relevant:true` dans le Log Explorer.

#### Quelles informations le modèle LLM utilise-t-il en entrée ?

Si une tâche CI ayant échoué possède des logs pertinents, le modèle LLM utilise les 100 dernières lignes de logs pertinentes en entrée. Si une tâche CI ayant échoué ne possède pas de logs pertinents, CI Visibility envoie les 100 dernières lignes de logs.

Chaque ligne de log est pré-analysée pour expurger toute information potentiellement sensible avant d'être utilisée.

<div class="alert alert-info">
Le modèle LLM peut classer les erreurs avec des messages similaires dans des sous-domaines distincts mais liés. Par exemple, si le message d'erreur est <code>Cannot connect to docker daemon</code>, il est généralement catégorisé sous <code>domain:platform</code> et <code>subdomain:network</code>. Cependant, le modèle LLM peut parfois le classer sous <code>subdomain:infrastructure</code> à la place.
</div>

#### Exigences relatives aux logs pour l'analyse des échecs de tâches

L'analyse des échecs de tâches nécessite l'indexation des logs suivants :
* Tous les logs de la **tâche ayant échoué** analysée.
* Tous les logs d'au **moins une tâche réussie** avec le même nom de tâche, nom de pipeline et référentiel. Cela est nécessaire pour identifier quels logs sont pertinents dans la tâche ayant échoué.

Le [filtre d'exclusion][9] suivant est compatible avec l'analyse des échecs de tâches :
* Requête : `datadog.product:cipipeline @ci.is_failure:false`
* Règle d'échantillonnage : exclure 90 % de `@ci.job.id`

Cette configuration réduit le volume de logs tout en continuant à prendre en charge l'analyse des échecs de tâches, tant que votre pipeline CI exécute suffisamment de tâches réussies pour garantir que les logs sont indexés pour au moins l'une d'entre elles.

#### Domaines et sous-domaines

Les erreurs sont catégorisées avec un domaine et un sous-domaine :

##### Domaines

| Domaine   | Description                                                                                                                                                       |
|----------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `code`     | Défaillances causées par le code en cours de génération et de test dans le pipeline CI. Elles doivent être corrigées par le développeur qui a modifié le code.           |
| `platform` | Défaillances causées par des raisons externes au code en cours de génération et de test. Ces défaillances peuvent provenir du fournisseur CI, de l'infrastructure sous-jacente ou de dépendances externes. Elles ne sont pas liées aux modifications du code du développeur et doivent souvent être corrigées par l'équipe responsable de l'ensemble du système CI. |
| `unknown`  | Utilisé lorsque les logs ne révèlent pas de cause profonde claire de l'échec de la tâche.                                                                                                |

##### Sous-domaines

Cliquez sur un onglet de domaine pour voir les sous-domaines correspondants :

{{< tabs >}}
{{% tab "Code" %}}

| Sous-domaine | Cause                                     | Exemples                                                                                                                   |
|-----------|-------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| `build`     | Erreurs de compilation ou de génération. | `Compilation error in processor_test.go:28:50`                                                                             |
| `test`      | Échecs de tests.              | `7 failed tests. Error: Can't find http.request.headers.x-amzn-trace-id in span's meta.`                                   |
| `quality`   | Échecs de mise en forme ou de linting.     | `Detected differences in files after running 'go fmt'. To fix, run 'go fmt' on the affected files and commit the changes.` |
| `security`  | Violations de sécurité.         | `Security violation: Use of weak SHA1 hash for security. Consider usedforsecurity=False.`                                  |

{{% /tab %}}
{{% tab "Platform" %}}

| Sous-domaine      | Cause                                                                                         | Exemples                                                                                                                                              |
|----------------|-----------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| `assembly`       | Erreurs dans la génération d'artefacts ou erreurs d'assemblage lors d'une exécution de script. | `Artifact generation failed due to rejected file 'domains/backend/cart-shopping-proto/mod.info' that exists in the repository.`                       |
| `deployment`     | Erreurs lors des déploiements, ou liées aux configurations de déploiements.             | `Subprocess command returned non-zero exit status 1 during deployment config generation.`                                                             |
| `infrastructure` | Erreurs liées à l'infrastructure sur laquelle la tâche a été exécutée.                 | `Invalid docker image reference format for tag 'registry.gitlab.com/cart-shopping/infrastructure/backend-deploy-image:AE/create-kubectl-image'.`      |
| `network`        | Erreurs de connectivité avec d'autres dépendances.                                  | `Connection refused when accessing localhost:8080.`                                                                                                   |
| `credentials`    | Erreurs d'authentification ; identifiants manquants ou incorrects.                          | `Failed to get image auth for docker.elastic.co. No credentials found. Unable to pull image 'docker.elastic.co/elasticsearch/elasticsearch:7.17.24'.` |
| `dependencies`   | Erreurs lors de l'installation ou de la mise à jour des dépendances requises pour exécuter la tâche.       | `Package 'systemd-container' cannot be installed. Depends on 'libsystemd-shared' v255.4-1ubuntu8.4 but v255.4-1ubuntu8.5 is to be installed.`         |
| `git`            | Erreurs lors de l'exécution de commandes git.                                                   | `Automatic merge failed due to conflicts between branches 'cart-shopping-new-feature' and 'staging'.`                                                 |
| `checks`         | Erreurs lors de la réalisation requise de checks pendant l'exécution de la tâche CI.            | `Release note not found during changelog validation`                                                                                                  |
| `setup`          | Erreurs lors de la configuration de la tâche CI.                                                 | `Execution failed during the TLS setup or client dialing process.`                                                                                    |
| `script`         | Erreurs syntaxiques dans le script de la tâche CI.                                    | `No tests ran due to file or directory not found.`                                                                                                    |

{{% /tab %}}
{{% tab "Unknown" %}}

| Sous-domaine | Description                     | Exemple                                                 |
|-----------|---------------------------------|---------------------------------------------------------|
| unknown   | L'erreur n'a pas pu être catégorisée. | `Job failed with exit code 1. View full logs or trace.` |

{{% /tab %}}
{{< /tabs >}}

### Fournisseurs CI pris en charge

L'analyse des échecs de tâches CI est disponible pour les fournisseurs CI suivants :

* [GitHub Actions][1]
* [GitLab][2]
* [Azure Pipeline][8]

**Remarque :** vous devez activer la collecte de logs de tâches CI, et les logs doivent être indexés. Pour configurer la collecte de logs de tâches CI, sélectionnez votre fournisseur CI sur [Pipeline Visibility][6] et suivez les instructions pour collecter les logs de tâches.

<div class="alert alert-info">Si l'analyse des échecs de tâches CI vous intéresse mais que votre fournisseur CI n'est pas encore pris en charge, remplissez <a href="https://forms.gle/vSrqS5QwitgHf9wG6" target="_blank">ce formulaire</a>.</div>

## Identifier les erreurs les plus récurrentes dans vos pipelines CI

### Utiliser la page CI Health

[CI Health][3] fournit une vue d'ensemble de la santé et des performances de vos pipelines CI. Elle aide les équipes DevOps et d'ingénierie à surveiller les tâches CI, détecter les défaillances et optimiser les performances de génération.

Sur cette page, vous pouvez voir une répartition des erreurs dans vos pipelines CI divisée par domaine d'erreur. Cliquez sur un pipeline CI, et vérifiez la colonne `Breakdown` dans la section `Failed Executions`.

{{< img src="continuous_integration/ci_health_failed_executions_breakdown.png" alt="Répartition de l'analyse des échecs de tâches CI dans CI Health" width="90%">}}

### Utiliser les facettes

Utilisez les facettes `@error.message`, `@error.domain` et `@error.subdomain` pour identifier les erreurs les plus récurrentes dans vos pipelines CI. En utilisant ces facettes, vous pouvez créer des dashboards et des notebooks personnalisés.

{{< img src="continuous_integration/failed_jobs_ai_gen_errors_facets.png" alt="Tâches CI ayant échoué filtrées par error.domain et error.subdomain" width="90%">}}

Ces facettes sont uniquement disponibles lors de l'utilisation de `ci_level:job` dans une requête. Si l'analyse des échecs de tâches CI ne peut pas être calculée (par exemple, si vous n'utilisez pas un fournisseur CI pris en charge), ces facettes contiendront les informations d'erreur provenant du fournisseur CI.

### Utiliser le modèle de dashboard

Vous pouvez importer le modèle de dashboard **CI Visibility - CI Jobs Failure Analysis** :

1. Ouvrez le modèle de dashboard [civisibility-ci-jobs-failure-analysis-dashboard.json][4] et copiez le contenu dans le presse-papiers.
2. Créez un [nouveau dashboard][5] dans Datadog.
3. Collez le contenu copié dans le nouveau dashboard.
4. Enregistrez le dashboard.

{{< img src="continuous_integration/ci_jobs_failure_analysis_dashboard.png" alt="Dashboard d'analyse des échecs de tâches CI" width="90%">}}

### Utiliser les commentaires de PR

Vous pouvez ajouter l'analyse des échecs de tâches dans vos commentaires de PR.

Pour que les commentaires de PR soient publiés, vos référentiels doivent être intégrés à Datadog. Pour en savoir plus sur l'intégration de référentiels avec Datadog, consultez la documentation [Connect your Git repositories to Datadog][7].

{{< img src="continuous_integration/pr_comment.png" alt="Commentaire de PR avec analyse des échecs de tâches incluse" width="90%">}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/continuous_integration/pipelines/github/
[2]:/fr/continuous_integration/pipelines/gitlab/
[3]:https://app.datadoghq.com/ci/pipelines/health/
[4]:/resources/json/civisibility-ci-jobs-failure-analysis-dashboard.json
[5]:/fr/dashboards/
[6]:/fr/continuous_integration/pipelines/#setup
[7]:/fr/integrations/guide/source-code-integration/#connect-your-git-repositories-to-datadog
[8]:/fr/continuous_integration/pipelines/azure/
[9]:/fr/logs/log_configuration/indexes#exclusion-filters