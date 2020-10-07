---
assets:
  dashboards: {}
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - security
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/auth0/README.md'
display_name: Auth0
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

Auth0, la plateforme de vérification d'identité pour les équipes de développement, fournit aux développeurs et aux entreprises les éléments dont ils ont besoin pour sécuriser leurs applications.



L'intégration avec Datadog est mise en œuvre par la fonction Log Streaming d'Auth0, qui envoie des lots d'événements de log à mesure qu'ils sont générés dans Auth0, donnant aux clients des informations à jour sur leur locataire Auth0. La fonction Log Streaming est capable d'envoyer 10 fois plus de logs et garantit leur livraison grâce au traitement des erreurs. Dorénavant, vous pouvez aussi utiliser un webhook générique pour envoyer vos logs en temps quasi-réel à la plupart des outils tiers.


#### L'intégration avec Datadog offre plusieurs avantages importants :

Visualiser les données Auth0 sans temps de développement supplémentaire

L'un des principaux avantages de l'utilisation de Datadog est la possibilité de collecter et de visualiser les données afin de cerner les tendances. Les équipes techniques l'utilisent pour visualiser les taux d'erreur et les données de trafic, tandis que les équipes de sécurité l'utilisent pour visualiser le trafic des autorisations et mettre en place des alertes pour les actions à haut risque.


#### Données d'identité

Les données d'identité offrent des informations essentielles pour répondre à ces besoins, permettant aux équipes de mieux cerner les problèmes et de prendre des décisions éclairées.

#### Prendre des décisions éclairées sur l'architecture système et le développement des produits

En suivant l'évolution des tendances en matière de gestion des identités au fil du temps, les équipes peuvent prendre des décisions éclairées sur le développement de produits ou l'architecture du système, par exemple en utilisant les données d'authentification pour déterminer les appareils sur lesquels concentrer les efforts de développement. De même, en suivant les heures de pointe de connexion et les zones géographiques à partir desquelles les utilisateurs accèdent à l'application, les équipes d'architecture système peuvent déterminer quand et où affecter des ressources plus importantes.


####  Réagir rapidement en cas de problème de performance ou de sécurité

Outre le suivi des données historiques pour cerner les tendances, il est tout aussi important d'utiliser les informations d'identité pour déceler rapidement les problèmes de sécurité et de performance. Par exemple, un nombre important de tentatives de connexion infructueuses peut indiquer une attaque de type « credential stuffing », l'une des menaces les plus courantes visant les systèmes d'identité.

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

[1]: https://manage.auth0.com
[2]: https://app.datadoghq.com/account/settings#api
[3]: https://auth0.com/docs/logs/references/log-event-type-codes
[4]: https://docs.datadoghq.com/fr/help/