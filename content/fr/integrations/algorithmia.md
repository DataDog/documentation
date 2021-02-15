---
"assets":
  "dashboards":
    "Algorithmia": assets/dashboards/algorithmia.json
  "logs": {}
  "metrics_metadata": metadata.csv
  "monitors":
    "Algorithmia": assets/monitors/algorithm_duration.json
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- monitoring
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/algorithmia/README.md"
"display_name": "Algorithmia"
"draft": false
"git_integration_title": "algorithmia"
"guid": "bb9defff-03ae-4a22-93a7-6db498d37cd7"
"integration_id": "algorithmia"
"integration_title": "Algorithmia"
"is_public": true
"kind": "integration"
"maintainer": "support@algorithmia.io"
"manifest_version": "1.0.0"
"metric_prefix": "algorithmia."
"metric_to_check": "algorithmia.duration_milliseconds"
"name": "algorithmia"
"public_title": "Intégration Datadog/Algorithmia "
"short_description": "Surveillez des métriques liées à vos modèles d'apprentissage automatique en production"
"support": "contrib"
"supported_os":
- linux
---



## Présentation

[Algorithmia][1] est une plateforme MLOps qui permet aux data scientists, aux développeurs d'applications et aux opérateurs IT de déployer, de gérer, de gouverner et de sécuriser des modèles d'apprentissage automatique ainsi que d'autres modèles probabilistes en production.

![Algorithmia Insights dans Datadog][2]

Algorithmia Insights est une fonctionnalité d'Algorithmia Enterprise qui fournit un pipeline de métriques pouvant être utilisé pour instrumenter, mesurer et surveiller vos modèles d'apprentissage automatique. Les métriques liées à des inférences issues de modèles d'apprentissage automatique peuvent être utilisées à diverses fins : détection des dérives de modèle, des dérives de données, des biais de modèle, etc.

Cette intégration vous permet de diffuser, depuis Algorithmia vers Kafka puis vers l'API des métriques dans Datadog, des métriques opérationnelles ainsi que des métriques liées à des inférences définies par l'utilisateur.

## Configuration

1. À partir de votre instance Algorithmia, configurez Algorithmia Insights pour qu'il se connecte à
   un broker Kafka (externe à Algorithmia).

2. Référez-vous à la
   [documentation dans le référentiel des intégrations Algorithmia][3]
   pour installer, configurer et lancer le service de transfert de message Datadog utilisé
   dans cette intégration, qui transférera les métriques d'une rubrique Kafka vers
   l'API des métriques dans Datadog.


### Validation

1. À partir d'Algorithmia, faites une requête auprès d'un algorithme sur lequel Insights est activé.
2. Dans l'interface Datadog, naviguez vers la page de résumé **Métriques**.
3. Vérifiez que les métriques d'Insights sont présentes dans Datadog en appliquant le filtre
   `algorithmia`.

### Diffusion de métriques

Cette intégration diffuse des métriques d'Algorithmia lorsqu'un modèle sur lequel Insights est activé fait l'objet d'une requête. Chaque entrée de log comprend des métriques opérationnelles et des métriques liées à des inférences.

La métrique `duration_milliseconds` est l'une des métriques opérationnelles qui est incluse dans la charge utile par défaut d'Algorithmia. Pour vous aider à vous lancer, cette intégration intègre également un dashboard et un monitor pour cette métrique par défaut.

Il est également possible de recueillir des métriques liées à des inférences, définies par l'utilisateur et spécifiées dans Algorithmia par le développeur de l'algorithme. Les métriques définies par l'utilisateur dépendent de votre framework d'apprentissage automatique et de vos cas d'utilisation spécifiques, mais elles peuvent inclure des valeurs comment les probabilités de prédiction d'un modèle de régression dans scikit-learn, les scores de confiance d'un classificateur d'images dans TensorFlow ou des données d'entrée issues de requêtes d'API entrantes. Notez que le script de transfert de message fourni dans cette intégration applique le préfixe `algorithmia.` aux métriques définies par l'utilisateur dans Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "algorithmia" >}}


### Checks de service

Le check Algorithmia n'inclut aucun check de service.

### Événements

Le check Algorithmia n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Algorithmia][5].

[1]: https://algorithmia.com/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/algorithmia/images/algorithmia-insights-datadog.png
[3]: https://github.com/algorithmiaio/integrations
[4]: https://github.com/DataDog/integrations-extras/blob/master/algorithmia/metadata.csv
[5]: https://algorithmia.com/contact

