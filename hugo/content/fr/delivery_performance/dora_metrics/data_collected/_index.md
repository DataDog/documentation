---
aliases:
- /fr/dora_metrics/data_collected/
description: Découvrez les événements, les champs et les balises associés à DORA Metrics,
  ainsi que les étapes du délai de changement pour la fréquence de déploiement, le
  délai de changement et l'analyse des échecs.
further_reading:
- link: /delivery_performance/dora_metrics/
  tag: Documentation
  text: En savoir plus sur DORA Metrics
- link: /delivery_performance/dora_metrics/setup/
  tag: Documentation
  text: Configurer des sources de données pour DORA Metrics
- link: /metrics/
  tag: Documentation
  text: Découvrez les métriques
- link: /getting_started/tagging/
  tag: Documentation
  text: Commencez avec les balises
title: Données DORA Metrics collectées
---
## Présentation {#overview}

DORA Metrics génère des événements qui ont des champs et des tags associés.

| Type d'événement | Description |
| :--- | :--- |
|Déploiement | Un déploiement de code unique identifié par les balises env, service et version.<br><br>Les déploiements peuvent être [marqués comme ayant échoué][17] et sont utilisés pour calculer la fréquence de déploiement, le taux d'échec de changement et le temps de récupération après un déploiement ayant échoué.
|Pull Request | Une pull request incluse dans un déploiement. Contient des métadonnées telles que l'auteur, les relecteurs, les étiquettes et le temps passé à rédiger, relire et fusionner. Les commits sont imbriqués dans leur pull request associée.<br><br>Les pull requests sont utilisées pour analyser les flux de travail de revue de code et le temps de cycle au niveau des PR.
|Commit | Un événement généré pour chaque commit individuel inclus dans un déploiement. Contient des métadonnées et est automatiquement lié au déploiement correspondant. Les commits sont imbriqués dans leur pull request associée.<br><br>Les commits sont utilisés pour calculer le délai de changement.

**Remarque** : Les événements DORA Metrics ont une période de rétention de 2 ans.

### Balises par défaut {#default-tags}

Tous les événements contiennent les tags suivants si ils sont disponibles :

- `service`
- `team`
- `env`
- `version`
- `source`
- `repository_id`

Pour plus d'informations sur l'utilisation des balises, consultez [Commencez avec les balises][6].

### Balises personnalisées {#custom-tags}

Les événements de déploiement peuvent être enrichis avec des tags personnalisées pour filtrer les métriques DORA Metrics. Il existe deux sources potentielles pour ces tags :

- Catalogue : Si un événement de déploiement est associé à des services dans le Catalogue, il est automatiquement enrichi avec la balise `language` et les [tags personnalisés définis dans les Service Definitions][13].
- API DORA Metrics : Jusqu'à 100 balises personnalisées fournies par l'utilisateur peuvent être ajoutées aux événements de déploiement dans l'[API][7].

Pour plus d'informations sur l'utilisation des tags personnalisés dans DORA Metrics, consultez [Présentation de DORA Metrics][16].

## Champs spécifiques à l'événement {#event-specific-fields}

### Champs de déploiement {#deployment-fields}

| Champ                      | Description                |
|----------------------------|----------------------------|
| `Duration` | Durée du déploiement. |
| `Avg Change Lead Time`      | La durée moyenne du [délai de changement](#commit-fields) de tous les commits.  |
| `Avg Time to PR Ready`          | La durée moyenne du [temps avant que la PR soit prête](#commit-fields) de tous les commits. |
| `Avg Review Time`       | La durée moyenne du [temps de revue](#commit-fields) de tous les commits. |
| `Avg Merge Time`       | La durée moyenne du [temps de fusion](#commit-fields) de tous les commits. |
| `Avg Time to Deploy`       | La durée moyenne du [temps jusqu'au déploiement](#commit-fields) de tous les commits. |
| `Number of Commits`        | Nombre total de commits inclus dans un déploiement. |
| `Deployment Type` | Type de déploiement (`standard`, `rollback` ou `rollforward`). |
| `Change Failure` | Booléen indiquant si un déploiement est marqué comme un échec de changement. |
| `Recovery Time` | Durée en secondes entre le `finished_at` d'un déploiement ayant échoué et le `finished_at` de sa remédiation. Disponible uniquement pour les déploiements marqués comme échecs de changement. |
| `Remediation Type` | Le type de remédiation appliquée (`rollback` ou `rollforward`). Disponible uniquement pour les déploiements marqués comme échecs de changement. |

### Champs de pull request {#pull-request-fields}

| Champ  | Description                |
|------------|----------------------------|
| `PR Cycle Time`       | Durée totale du premier commit à la fusion. |
| `Time to PR Ready`       | Durée du premier commit jusqu'à ce que la PR soit marquée comme prête pour revue. |
| `Review Time`       | Durée entre le moment où la PR est marquée comme prête pour revue et son approbation. |
| `Merge Time`       | Durée entre l'approbation de la PR et sa fusion. |
| `Time to Deploy`       | Durée entre la fusion et le début du déploiement. |
| `Deploy Time`       | Durée entre le début du déploiement et la fin du déploiement. |
| `Number of Commits`       | Nombre de commits inclus dans la pull request. |
| `Number of Reviewers`       | Nombre de relecteurs ayant examiné la pull request. |
| `Number of Files Changed` | Nombre de fichiers modifiés dans la pull request. Uniquement disponible pour GitHub. |
| `Number of Lines Added` | Nombre de lignes ajoutées dans la pull request. Uniquement disponible pour GitHub. |
| `Number of Lines Deleted` | Nombre de lignes supprimées dans la pull request. Uniquement disponible pour GitHub. |
| `Total Number of Lines Changed` | Nombre total de lignes ajoutées et supprimées dans la pull request. Uniquement disponible pour GitHub. |
| `Time to First Human Review` | Durée jusqu'à ce que la pull request reçoive sa première revue par un humain. Uniquement disponible pour GitHub. |
| `Number of Comments` | Nombre de commentaires sur la pull request. Uniquement disponible pour GitHub. |
| `Number of Human Comments` | Nombre de commentaires humains sur la pull request. Uniquement disponible pour GitHub. |
| `Fully Automated` | Booléen indiquant si la pull request a été créée et fusionnée sans intervention humaine. |
| `Creator Bot Type` | Type de bot ayant créé la pull request. |
| `Creator Bot Name` | Nom du bot ayant créé la pull request. |
| `Time CI Failing` | Durée totale pendant laquelle la CI est restée dans un état d'échec à travers les commits de la pull request. Nécessite CI Visibility. |
| `Test Session Duration` | Durée totale des sessions de test pour le commit de tête ou de fusion de la pull request. Nécessite Test Optimization. |
| `Test Session Duration After Approval` | Durée totale des sessions de test pour le commit de tête ou de fusion de la pull request après l'approbation de celle-ci. Nécessite Test Optimization. |
| `Time to Pass` | Durée entre la première tentative CI et la première exécution réussie du pipeline pour le commit de tête ou de fusion de la pull request. Nécessite CI Visibility. |
| `Time to Pass After Approval` | Durée entre la première tentative CI après l'approbation de la pull request et la première exécution réussie du pipeline pour le commit de tête ou de fusion de la pull request. Nécessite CI Visibility. |
| `Patch Coverage` | Pourcentage de lignes nouvelles ou modifiées dans le commit de tête ou de fusion de la pull request qui sont couvertes par des tests. Nécessite Code Coverage. |


### Champs de commit {#commit-fields}

| Champ  | Description                |
|------------|----------------------------|
| `Change Lead Time`       | Durée nécessaire pour qu'un commit soit mis en production. |
| `Time to PR Ready`       | Durée entre la création du commit et le moment où la PR est marquée comme prête pour examen. |
| `Review Time`       | Durée entre le moment où la PR est marquée comme prête pour examen et son approbation. |
| `Merge Time`       | Durée entre l'approbation de la PR et sa fusion. |
| `Time to Deploy`       | Durée entre la fusion et le début du déploiement. |
| `Deploy Time`       | Durée entre le début du déploiement et la fin du déploiement. |
| `Has Failed Jobs` | Booléen indiquant si une exécution de job CI a échoué pour le commit, y compris les échecs qui ont réussi après une nouvelle tentative. Nécessite CI Visibility. |
| `Has Failed Tests` | Booléen indiquant si une exécution de test a échoué en raison d'un test non instable dans le commit. Nécessite Test Optimization. |
| `Has New Flaky Tests` | Booléen indiquant si de nouveaux tests instables ont été détectés dans les sessions de test du commit. Nécessite Test Optimization. |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/events/explorer/
[2]: /fr/api/latest/metrics/#query-timeseries-points
[3]: /fr/api/latest/metrics/#query-timeseries-data-across-multiple-products
[5]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights
[6]: /fr/getting_started/tagging/
[7]: /fr/api/latest/dora-metrics/
[8]: https://app.datadoghq.com/ci/dora
[9]: https://docs.datadoghq.com/fr/metrics/
[10]: /fr/delivery_performance/dora_metrics/setup/
[11]: https://app.datadoghq.com/event/explorer?query=source%3Asoftware_delivery_insights%20&cols=&messageDisplay=expanded-lg&options=&refresh_mode=sliding&sort=DESC&from_ts=1714391730343&to_ts=1714392630343&live=true
[12]: /fr/delivery_performance/dora_metrics/setup/#limitations
[13]: https://www.datadoghq.com/blog/service-catalog-setup/
[16]: /fr/delivery_performance/dora_metrics/
[17]: /fr/delivery_performance/dora_metrics/change_failure_detection/