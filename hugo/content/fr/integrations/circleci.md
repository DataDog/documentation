---
categories:
- cloud
- configuration & deployment
ddtype: crawler
dependencies: []
description: Visualisez le nombre de builds terminés ou la durée moyenne des builds.
doc_link: https://docs.datadoghq.com/integrations/circleci/
draft: false
git_integration_title: circleci
has_logo: true
integration_id: ''
integration_title: CircleCI
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: circleci
public_title: '"Intégration Datadog/CircleCI"'
short_description: Visualisez le nombre de builds terminés ou la durée moyenne des
  builds.
team: web-integrations
version: '1.0'
---

## Présentation

Associez CircleCI pour :

- Visualiser des métriques clés de CircleCI, telles que le nombre de builds terminés ou la durée moyenne des builds
- Analyser des données (comme la répartition des builds par nom de tâche ou référentiel) à l'aide du système de tags de Datadog

## Configuration

### Installation

Vous pouvez installer l'intégration CircleCI avec son [carré d'intégration][1].

### Procédure à suivre

1. Dans vos paramètres CircleCI, accédez à Personal API Tokens et saisissez la clé générée dans le formulaire. Le nom n'a pas besoin d'être identique à l'étiquette CircleCI, mais il doit être unique.
2. Filtrez les référentiels grâce à une expression, telle que « Organisation/nom*référentiel », « Organisation/référentiel*_\* » ou « Organisation/\* ». **Le filtrage est effectué sur la liste des projets suivis, qui doit être définie dans CircleCI.**
3. Indiquez le système de contrôle de versions approprié ainsi que la clé d'API adéquate.

Vous pouvez définir de nombreux tokens d'API et suivre plusieurs projets à partir d'un token donné. Les utilisateurs doivent être définis comme contributeurs pour un référentiel particulier afin de visualiser ses informations dans Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "circleci" >}}


### Événements

L'intégration CircleCI n'inclut aucun événement.

### Checks de service

L'intégration CircleCI n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/circleci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/circleci/circleci_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/