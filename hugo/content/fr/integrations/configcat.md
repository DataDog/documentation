---
assets:
  dashboards: {}
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - notification
creates_events: true
ddtype: crawler
dependencies:
  - https://github.com/DataDog/integrations-extras/blob/master/configcat/README.md
description: L'intégration Datadog/ConfigCat permet de s'assurer que chaque modification des paramètres dans ConfigCat est envoyée à Datadog en tant qu'événement. Il est ainsi possible de surveiller le comportement de votre système après la modification des paramètres. Vous pouvez configurer l'intégration Datadog pour un produit dans ConfigCat.
display_name: ConfigCat
draft: false
git_integration_title: configcat
guid: 5e98d95a-519d-460c-945a-5e3a4e1f8d72
integration_id: configcat
integration_title: ConfigCat
integration_version: ''
is_public: true
custom_kind: integration
maintainer: developer@configcat.com
manifest_version: 1.0.0
name: configcat
public_title: Intégration Datadog/ConfigCat
short_description: Recevez un événement dans Datadog après chaque modification des paramètres
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Gérez les fonctionnalités et modifiez la configuration de votre programme à l'aide des [feature flags ConfigCat][1], le tout sans redéployer votre code. Un [dashboard][2] qui ne nécessite que 10 minutes de formation peut même être utilisé par le personnel non technique pour gérer directement les fonctionnalités. Déployez votre code à tout moment, puis rendez les fonctionnalités publiques lorsque vous êtes prêt. Commencez par proposer vos nouvelles idées à un groupe d'utilisateurs spécifiques. Effectuez des tests A/B/n et des soft launches. Des [SDK open  source][3] sont disponibles pour une intégration facile avec n'importe quelle application Web, mobile ou backend.

Cette intégration permet de s'assurer que chaque modification des paramètres dans ConfigCat est envoyée à Datadog en tant qu'événement.

*Exemple :*
![Événement Datadog][4]

## Configuration

1. [Souscrivez une offre Datadog][5].
2. Récupérez une [clé d'API Datadog][6].
    ![Événement Datadog][7] 
4. Accédez à l'onglet [integrations][8] du dashboard ConfigCat.
5. Cliquez sur le bouton _CONNECT_ de Datadog, et entrez votre clé d'API Datadog.
6. C'est tout ! Modifiez vos feature flags comme bon vous semble et vérifiez vos événements dans Datadog.


### Désinstallation

1. Accédez à l'onglet [integrations][8] du dashboard ConfigCat.
2. Cliquez sur le bouton _DISCONNECT_ de Datadog, et entrez votre clé d'API Datadog.

## Données collectées

### Métriques

L'intégration ConfigCat n'inclut aucune métrique.

### Événements

Tous les événements recueillis à partir de ConfigCat apparaissent sur votre flux d'événements Datadog, avec la propriété `source:configcat` et les tags correspondant au nom de votre produit, votre configuration et votre environnement.

Par exemple, pour rechercher les événements associés à votre environnement de production, utilisez `sources:configcat production` :

![Filtrage][9]

### Checks de service

L'intégration ConfigCat n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Consultez la [documentation ConfigCat][10] (en anglais) ou contactez l'[assistance ConfigCat][11].

[1]: https://configcat.com
[2]: https://app.configcat.com
[3]: https://github.com/configcat
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_event.png
[5]: https://www.datadoghq.com
[6]: https://docs.datadoghq.com/fr/account_management/api-app-keys/#api-keys
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_apikey.png
[8]: https://app.configcat.com/product/integrations
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/configcat/images/datadog_filtering.png
[10]: https://configcat.com/docs/integrations/datadog/
[11]: https://configcat.com/support