---

title: Guide d'utilisation avancée du tagging unifié
---

## Présentation

Ce guide propose des moyens de migrer vers le [tagging de service unifié][1] et de le configurer en fonction de cas d'utilisation spécifiques.

## Tags personnalisés

Vous pouvez continuer à utiliser les tags `env`, `service` et `version` tels qu'ils sont configurés pour le tagging de service unifié. Toutefois, si vous souhaitez utiliser le tagging unifié avec vos propres tags personnalisés, il existe plusieurs options disponibles, énumérées ci-dessous.

**Remarque** : certains produits prennent en charge les tags arbitraires, mais ce n'est pas le cas de tous. Ainsi, la navigation entre les produits peut s'avérer difficile si une source de données comprend un tag qu'une autre ne comprend pas ou ne prend pas en charge.

### Environnements conteneurisés

#### Métriques

Étant donné qu'il est possible d'ajouter des tags à vos points de données, vous bénéficiez d'une grande marge de manœuvre dans la définition des tags souhaités. Les tags identifiés avec Autodiscovery sont automatiquement ajoutés à l'ensemble des métriques recueillies.

#### APM

Les tags `env` et `service` sont essentiels à l'APM : il n'est donc pas possible de les remplacer par des tags de nom différent. Toutefois, l'APM permet d'[agréger des données en utilisant des tags primaires][2] autres que `env`. Les tags de host (tels que `availability-zone`) ajoutés aux traces et aux métriques de trace peuvent également être utilisés.

Les tags de conteneur identifiés avec Autodiscovery sont ajoutés à `container_info` dans les métadonnées de span. Toutefois, ces tags ne font pas partie de la [liste des tags autorisés][3] pour les métriques de trace.

#### Logs

Comme pour l'APM, `service` est un tag essentiel qui permet d'organiser vos données de log. En outre, il n'est pas possible de créer un lien entre un log et le service APM correspondant sans ce tag.

Comme pour les métriques, les tags de conteneur identifiés avec Autodiscovery et les tags de host pour l'Agent sont ajoutés à l'ensemble des logs.

Vous avez également la possibilité d'ajouter des champs personnalisés à vos logs dans le code, et de mapper ces champs à des tags ou des attributs en aval dans un [pipeline de traitement de log Datadog][4].

## Étiquettes standard

Datadog vous conseille d'utiliser à la fois des étiquettes standard et des variables d'environnement. Toutefois, les étiquettes standard peuvent être considérées comme une alternative aux variables d'environnement, en particulier lorsqu'une application ne permet pas l'utilisation de ces variables dans son runtime, comme certains logiciels tiers tels que Redis, MySQL et Nginx. Comme ces services génèrent tout de même des métriques d'infrastructure et des données à partir de checks d'intégration, l'ajout des tags `env`, `service` et `version` à toutes ces données se révèle très utile.

Si vous souhaitez ajouter les tags `env`, `service` et `version` aux métriques Kubernetes State, les étiquettes standard constituent le moyen le plus simple. Les variables d'environnement `DD` d'un conteneur ne pouvant pas être utilisées par l'Agent pour taguer ces métriques, il est plus logique de faire appel aux étiquettes.

### Déclaration d'un environnement en tant qu'étiquette

La configuration du tag `env` à proximité de la source des données (par exemple, les traces de l'APM ou les logs) permet d'éviter toute incohérence lorsque le tag `env` de l'Agent varie. L'intégration du tag `env` à la configuration du service permet d'analyser les données propres à chaque service.

### Utilisation d'étiquettes standard avec annotations de tags Kubernetes existants

Les utilisateurs de Kubernetes peuvent continuer à utiliser ces tags généraux. Toutefois, l'utilisation des étiquettes spécifiques présente quelques avantages :

- Vous pouvez directement y faire référence pour l'injection de variables d'environnement avec l'API Downward de Kubernetes.
- L'étiquette de service standard peut simplifier la définition du service pour les logs.

### Utilisation d'étiquettes standard pour des conteneurs spécifiques

Comme les variables d'environnement `DD` sont injectées au niveau des conteneurs, elles peuvent différer d'un conteneur à l'autre. Si vous souhaitez également utiliser les étiquettes standard pour des conteneurs spécifiques, vous devez utiliser des variantes propres à chaque conteneur :

```yaml
tags.datadoghq.com/<conteneur>.env
tags.datadoghq.com/<conteneur>.service
tags.datadoghq.com/<conteneur>.version
```

### Injection de tags standard

Le [contrôleur d'admission Datadog][5] convertit les étiquettes de tag standard en variables d'environnement et les injecte dans le modèle de pod de l'application de l'utilisateur. Ces variables d'environnement sont utilisées par les traceurs de l'APM, les clients DogStatsD et l'Agent Datadog. L'Agent Datadog effectue un mappage de ces valeurs vers les tags :

```
tags.datadoghq.com/version -> DD_VERSION
tags.datadoghq.com/env -> DD_ENV
tags.datadoghq.com/service -> DD_SERVICE
```

Le contrôleur d'admission recherche ces informations dans les étiquettes des pods. S'il ne trouve rien au niveau du pod, il essaie d'obtenir les informations à partir des étiquettes de l'objet propriétaire du pod (déploiement, tâche, tâche cron, statefulset).

#### Remarques

- Le contrôleur d'admission doit être déployé et configuré avant de créer de nouveaux pods d'application. Il ne peut pas mettre à jour des pods existants.
- Le contrôleur d'admission n'injecte pas les variables d'environnement `DD_VERSION, DD_ENV`, et `DD_SERVICE` si elles existent déjà.
- Pour désactiver la fonctionnalité d'injection du contrôleur d'admission, configurez l'Agent de cluster comme suit : `DD_ADMISSION_CONTROLLER_INJECT_CONFIG_ENABLED=false`


[1]: /fr/getting_started/tagging/unified_service_tagging
[2]: /fr/tracing/guide/setting_primary_tags_to_scope/
[3]: /fr/metrics/distributions/#customize-tagging
[4]: /fr/logs/log_configuration/pipelines
[5]: /fr/agent/cluster_agent/admission_controller/