---
categories:
- monitoring
- notification
- web
ddtype: crawler
dependencies: []
description: Consultez les données de disponibilité, les délais de réponse et les
  alertes recueillis par Pingdom dans Datadog.
doc_link: https://docs.datadoghq.com/integrations/pingdom_v3/
draft: false
git_integration_title: pingdom_v3
has_logo: true
integration_id: ''
integration_title: Pingdom
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: pingdom_v3
public_title: Intégration Datadog/Pingdom
short_description: Consultez les données de disponibilité, les délais de réponse et
  les alertes recueillis par Pingdom dans Datadog.
team: web-integrations
version: '1.0'
---

## Présentation

Surveillez les métriques de performance axées sur l'utilisateur de Pingdom dans Datadog, afin de les corréler avec d'autres événements et métriques pertinents.

La version 3 de l'intégration Pingdom fonctionne de la même façon que l'[intégration Datadog/Pingdom (obsolète)][1]. Elle repose néanmoins sur la version 3.1 de l'[API Pingdom][2].

## Configuration

### Générer un token d'API

1. Connectez-vous à votre [compte Pingdom][3].
2. Accédez à _Settings_ > _Pingdom API_.
3. Cliquez sur _Add API token_. Attribuez un nom au token ainsi que les autorisations _Read-Write_. Enregistrez votre token, car vous ne pourrez plus y accéder par la suite.

### Installation et configuration

1. Ouvrez le [carré de l'intégration Pingdom v3][4].
2. Saisissez le nom et le token d'API dans les champs correspondants. Les métriques et checks configurés dans Pingdom sont alors importés dans Datadog.
3. Gérez les tags des checks depuis l'interface Pingdom. Les tags ajoutés à un check dans Pingdom sont automatiquement ajoutés à un check dans Datadog. Pour exclure des checks, utilisez le tag `datadog-exclude`.

## Données collectées

### Métriques
{{< get-metrics-from-git "pingdom_v3" >}}


### Événements

L'intégration Pingdom n'inclut aucun événement.

### Checks de service

L'intégration Pingdom récupère les checks de transaction et les signale en tant que checks de service.

Pour le check `pingdom.status`, les résultats des checks de transaction Pingdom sont corrélés aux résultats des checks de service Datadog de la façon suivante :

| Statut Datadog | Statut Pingdom      |
| -------------- | ------------------- |
| `OK`           | `up`                |
| `CRITICAL`     | `down`              |
| `WARNING`      | `unconfirmed_down`  |
| `UNKNOWN`      | `unknown`, `paused` |

[1]: https://docs.datadoghq.com/fr/integrations/pingdom/
[2]: https://docs.pingdom.com/api/
[3]: https://my.pingdom.com/
[4]: https://app.datadoghq.com/account/settings#integrations/pingdom-v3
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/pingdom_v3/pingdom_v3_metadata.csv