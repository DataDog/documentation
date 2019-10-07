---
categories:
- notification
ddtype: crawler
dependencies: []
description: Utilisez n'importe quel webhook comme canal de notification pour les alertes et les événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/webhooks/
git_integration_title: webhooks
has_logo: true
integration_title: Webhooks
is_public: true
kind: integration
manifest_version: '1.0'
name: webhooks
public_title: Intégration Datadog/Webhooks
short_description: Utilisez n'importe quel webhook comme canal de notification pour les alertes et les événements Datadog.
  events.
version: '1.0'
---

## Présentation

Utilisez les Webhooks pour :

* Vous connecter à vos services.
* Être informé lorsqu'une alerte de métrique se déclenche pour un service.

## Implémentation
### Configuration

Accédez au [carré d'intégration Webhook][1] et saisissez l'URL et le nom du webhook que vous souhaitez utiliser

## Utilisation

Pour utiliser votre webhook, ajoutez **@webhook-*nom_de_votre_webhook*** dans le texte de l'alerte de métrique qui déclenchera le webhook. Une requête POST sera envoyée à l'URL que vous avez spécifiée avec le contenu suivant au format JSON. Toutes les requêtes individuelles expirent au bout de 15 secondes.

Vous pouvez également spécifier votre propre charge utile afin d'ajouter vos propres champs personnalisés à la requête. Cochez la case **Use Custom Payload** et spécifiez votre charge utile personnalisée en utilisant les variables ci-dessous. Si vous souhaitez encoder votre charge utile dans une URL, cochez la case **Encode as form** et spécifiez votre charge utile au format json.

|Variable|Signification|
|-----|-----|
|$AGGREG_KEY| ID pour agréger des événements connexes *(p. ex., 9bd4ac313a4d1e8fae2482df7b77628)*|
|$ALERT_CYCLE_KEY|ID permettant d'associer les événements depuis le déclenchement d'une alerte jusqu'à sa résolution|
|$ALERT_ID| ID de l'alerte *(p. ex., 1234)*|
|$ALERT_METRIC| Nom de la métrique s'il s'agit d'une alerte *(p. ex., `system.load.1`)*|
|$ALERT_QUERY| Requête du monitor qui a déclenché le webhook|
|$ALERT_SCOPE| Liste des tags déclenchant l'alerte séparés par des virgules *(p. ex., `availability-zone:us-east-1a, role:computing-node`)*|
|$ALERT_STATUS| Résumé du statut d'alerte *(p. ex., system.load.1 over host:my-host était > 0 au moins une fois lors de la dernière minute)*|
|$ALERT_TITLE| Titre de l'alerte|
|$ALERT_TRANSITION| Type de notification d'alerte *(valeurs : `Recovered`, `Triggered`/`Re-Triggered`, `No Data`/`Re-No Data`, `Warn`/`Re-Warn`, `Null`, `Renotify`)*|
|$ALERT_TYPE| Type de l'alerte|
|$DATE| Date *(epoch)* à laquelle l'événement s'est produit *(p. ex., 1406662672000)*|
|$EMAIL| E-mail de l'utilisateur publiant l'événement qui a déclenché le webhook|
|$EVENT_MSG| Texte de l'événement *(p. ex., @webhook-url Envoi au webhook)*|
|$EVENT_TITLE| Titre de l'événement *(p. ex., \[Triggered] \[Memory Alert])*|
|$EVENT_TYPE| Type de l'événement *(valeurs : `metric_alert_monitor`, `event_alert`, ou `service_check`)*|
|$HOSTNAME|Le hostname du serveur associé à l'événement (le cas échéant)|
|$ID | ID de l'événement *(p. ex., 1234567)*|
|$LAST_UPDATED| Date de la dernière mise à jour de l'événement|
|$LINK| URL de l'événement *(p. ex., `https://app.datadoghq.com/event/jump_to?event_id=123456`)*|
|$LOGS_SAMPLE| Échantillon des logs à partir des alertes de Log Monitor|
|$METRIC_NAMESPACE|Espace de nommage de la métrique s'il s'agit d'une alerte|
|$ORG_ID| ID de votre organisation *(p. ex., 11023)*|
|$ORG_NAME| Nom de votre organisation *(p. ex., Datadog)*|
|$PRIORITY| Priorité de l'événement *(valeurs : `normal` ou `low`)*|
|$SNAPSHOT| URL de l'image si l'événement contient un snapshot *(p. ex., `https://url.vers.snapshot.com/`)*|
|$TAGS| Liste des tags associés à l'événement séparés par des virgules *(p. ex., `monitor, name:myService, role:computing-node`)*|
|$TEXT_ONLY_MSG|Texte de l'événement sans mise en forme markdown|
|$USER| Utilisateur publiant l'événement qui a déclenché le webhook *(p. ex., thomas)*|
|$USERNAME|Nom d'utilisateur de l'utilisateur publiant l'événement qui a déclenché le webhook|

Si vous souhaitez envoyer vos Webhooks vers un service nécessitant une authentification, vous pouvez utiliser l'authentification HTTP standard en modifiant votre URL de `https://mon.service.com` à `https://utilisateur:motdepasse@mon.service.com`.

### Multiples webhooks
Dans une alerte de monitor, si au moins 2 endpoints de webhook sont notifiés, une file d'attente de webhooks est alors créée pour chaque service. Cela signifie que si vous communiquez avec Pagerduty et Slack (par exemple), une nouvelle tentative sur le webhook Slack n'affectera pas le webhook Pagerduty.

Néanmoins, dans le contexte Pagerduty, certains événements passent toujours avant les autres. En particulier, une charge utile « Acknowledge » passe toujours avant « Resolution » : si un ping d'accusé de réception échoue, le ping de résolution sera mis en attente conformément à la logique de nouvelle tentative.

#### Quel est le comportement de la file d'attente en cas d'échec d'un webhook ?
En cas d'échec d'un webhook du service X, le webhook du service Y ne devrait pas être affecté

#### Quelle est la cause d'un échec de webhook (réponse 5XX ou erreur interne) ?
Une nouvelle tentative est effectuée uniquement en cas d'erreur interne (message de notification incorrect) ou en cas de réception d'une réponse 5XX de la part de l'endpoint du webhook.

### Exemples
#### Envoi de SMS par Twilio

Utilisez comme URL :
`https://{Votre-ID-compte}:{Votre-jeton-auth}@api.twilio.com/2010-04-01/Accounts/{Votre-ID-compte}/Messages.json`
et comme charge utile :

    {
        "To":"+1347XXXXXXX",
        "From":"+1347XXXXXX",
        "Body":"$EVENT_TITLE \n Graphique correspondant : $SNAPSHOT"
    }



Assurez-vous de remplacer `To` par votre numéro de téléphone et `From` par le numéro que Twilio vous a attribué. Cochez la case **Encode as form**.

#### Créer un ticket dans Jira

Utilisez comme URL :
`https://{Votre-utilisateur-Jira}:{Votre-motdepasse-Jira}@{Votre-domaine}.atlassian.net/rest/api/2/issue`
et comme charge utile :
```json
{
    "fields": {
        "project": {
            "key": "VOTRE-CLÉ-PROJET"
            },
        "issuetype": {
            "name": "Task"
        },
        "description": "Un problème a été identifié. Consultez le graphique : $SNAPSHOT et l'événement : $LINK",
        "summary": "$EVENT_TITLE"
    }
}
```
Ne cochez pas la case « Encode as form ».

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks


{{< get-dependencies >}}
