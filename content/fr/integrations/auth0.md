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

Utilisez l'intégration Datadog/Auth0 pour visualiser et analyser vos événements de logs provenant d'Auth0.

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