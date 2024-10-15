---
categories:
- automation
- cloud
- configuration & deployment
- outils de développement
dependencies: []
description: Connectez-vous à Travis CI pour visualiser des métriques sur les durées
  et les statuts des builds, les tâches, etc.
doc_link: https://docs.datadoghq.com/integrations/travis_ci/
draft: false
git_integration_title: travis_ci
has_logo: true
integration_id: ''
integration_title: Travis CI
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: travis_ci
public_title: Intégration Datadog/Travis CI
short_description: Connectez-vous à Travis CI pour visualiser des métriques sur les
  durées et les statuts des builds.
team: web-integrations
version: '1.0'
---

## Présentation

Connectez-vous à Travis CI pour visualiser des métriques sur les durées et les statuts des builds, les tâches, etc.

## Implémentation

### Installation

Vous pouvez installer l'intégration Travis CI avec son [carré d'intégration][1].

### Configuration

1. Ajoutez le nom de votre compte, le token d'API (disponible dans l'onglet de profil de Travis CI) et le type de projet. Les types de projets sont définis comme suit :

    - _Open source_ désigne les référentiels connectés à travis-ci.org.
    - _Private_ désigne les référentiels connectés à travis-ci.co.
    - _Enterprise_ désigne les référentiels connectés à un domaine Travis CI personnalisé.

2. Si le compte appartient au type Enterprise de Travis CI, saisissez le nom de votre domaine personnalisé.
3. Ajoutez plusieurs comptes si besoin en cliquant sur « Add row ».
4. Cliquez sur « Install » (installation initiale uniquement).
5. Ajoutez l'organisation et les référentiels dont vous souhaitez recueillir les métriques avec la clé d'API correspondante.
6. Pour recueillir les métriques de tous les référentiels d'une organisation, saisissez `<NOM_ORGANISATION>/*` sous Project.
7. Cliquez sur « Update Configuration ».

## Données collectées

### Métriques
{{< get-metrics-from-git "travis_ci" >}}


### Événements

L'intégration Travis CI n'inclut aucun événement.

### Checks de service

L'intégration Travis CI n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

[1]: https://app.datadoghq.com/account/settings#integrations/travis_ci
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/travis_ci/travis_ci_metadata.csv
[3]: https://docs.datadoghq.com/fr/help/