---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - security
creates_events: false
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md'
display_name: Auth0
draft: false
git_integration_title: auth0
guid: 9308a35c-219e-4d24-ac11-af2511e5041a
integration_id: auth0
integration_title: Auth0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: auth0.
metric_to_check: ''
name: auth0
public_title: Intégration Datadog/Auth0
short_description: Visualisez et analysez vos événements Auth0.
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Auth0 est une plateforme de vérification d'identité pour les équipes de développement qui fournit aux développeurs et aux entreprises les éléments dont ils ont besoin pour sécuriser leurs applications.


Cette intégration utilise la fonction Log Streaming d'Auth0 pour envoyer les logs directement à Datadog. Les logs sont envoyés en temps réel à mesure qu'ils sont générés dans Auth0, donnant aux clients des informations à jour sur leur locataire Auth0. L'un des principaux avantages de cette intégration est la possibilité de recueillir et de visualiser les données afin de cerner les tendances. Les équipes techniques l'utilisent pour visualiser les taux d'erreur et les données de trafic, tandis que les équipes de sécurité l'utilisent pour visualiser le trafic des autorisations et mettre en place des alertes pour les actions à haut risque.

### Cas d'utilisation clés de l'intégration

#### Mettre en corrélation les données d'activité et les données d'identité afin de déterminer les tendances

Les données d'identité fournissent des informations essentielles pour identifier l'utilisateur à l'origine de chaque activité. Elles permettent aux équipes de mieux comprendre le comportement des utilisateurs dans leur système.

#### Prendre des décisions éclairées concernant l'architecture système et le développement de produits

En suivant l'évolution des tendances en matière de gestion des identités au fil du temps, les équipes peuvent prendre des décisions éclairées sur le développement de produits ou l'architecture du système. Par exemple, les équipes peuvent déterminer les priorités de développement en fonction des heures de pointe de connexion, des activités d'authentification et des activités géographiques.

####  Réagir rapidement en cas de problème de performance ou de sécurité

Les informations d'identité peuvent être utilisées pour déceler rapidement les problèmes de sécurité et de performance. Par exemple, un nombre important de tentatives de connexion infructueuses peut indiquer une attaque de type « credential stuffing », l'une des menaces les plus courantes visant les systèmes d'identité.

En configurant des seuils, les équipes de sécurité peuvent mettre en place des alertes pour être averties lorsque des événements suspects ont lieu, ce qui leur permet de réagir plus rapidement aux incidents de sécurité.



## Configuration

L'intégralité de la configuration s'effectue sur le [dashboard Auth0][1]. 

1. Connectez-vous au [dashboard Auth0][1].
2. Accédez à **Logs** > **Streams**.
3. Cliquez sur **+ Create Stream**.
4. Sélectionnez Datadog et saisissez un nom unique pour votre nouveau flux d'événements Datadog.
5. Sur l'écran suivant, indiquez les paramètres suivants pour votre flux d'événements Datadog :


    | Paramètre          | Description                                                |
    | ---------------- | ---------------------------------------------------------- |
    | `API Key`        | Saisissez votre [clé d'api Datadog][2].                           |
    | `Region`         | Si vous utilisez le site européen de Datadog (app.datadoghq.eu), le paramètre Region doit être défini sur `EU`. Si ce n'est pas le cas, il doit être défini sur `GLOBAL`   |


6. Cliquez sur Save.

Lors de l'écriture du prochain log de locataire par Auth0, vous recevrez une copie de cet événement de log dans Datadog avec la source et le service définis sur `auth0`.

### Validation

Visualiser vos logs dans Datadog :

1. Accédez à **Logs** > **Livetail**.
2. Visualisez vos logs Auth0 en saisissant `source:auth0`.

## Données collectées

### Logs
Les logs Auth0 sont recueillis et envoyés à Datadog. Les types de logs qui peuvent être renvoyés sont décrits [ici][3].

### Métriques

Auth0 n'inclut aucune métrique.

### Checks de service

Auth0 n'inclut aucun check de service.

### Événements

Auth0 n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].
Consultez notre [article de blog][5] pour en savoir plus à propos de cette intégration.

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://auth0.com/docs/logs/references/log-event-type-codes
[4]: https://docs.datadoghq.com/fr/help/
[5]: https://www.datadoghq.com/blog/monitor-auth0-with-datadog/