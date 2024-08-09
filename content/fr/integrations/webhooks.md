---
categories:
- notification
dependencies: []
description: Utilisez n'importe quel webhook comme canal de notification pour les
  alertes et les événements Datadog.
doc_link: https://docs.datadoghq.com/integrations/webhooks/
draft: false
git_integration_title: webhooks
has_logo: true
integration_id: ''
integration_title: Webhooks
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: webhooks
public_title: Intégration Datadog/Webhooks
short_description: Utilisez n'importe quel webhook comme canal de notification pour
  les alertes et les événements Datadog.
version: '1.0'
---

## Présentation

Les webhooks vous permettent de :

-   Vous connecter à vos services.
-   Être informé lorsqu'une alerte de métrique se déclenche pour un service.

## Configuration

Accédez au [carré d'intégration Webhooks][1] et saisissez l'URL et le nom du webhook que vous souhaitez utiliser.

## Utilisation

Pour utiliser votre webhook, ajoutez `@webhook-<NOM_WEBHOOK>` dans le texte de l'alerte de métrique qui déclenchera le webhook. Une requête POST sera envoyée à l'URL que vous avez spécifiée avec le contenu suivant au format JSON. Toutes les requêtes individuelles expirent au bout de 15 secondes. Datadog n'effectue une nouvelle tentative qu'en cas d'erreur interne (message de notification incorrect) ou en cas de réception d'une réponse 5XX de la part de l'endpoint du webhook. Si un échec de connexion se produit, 5 nouvelles tentatives sont effectuées.

**Remarque** : les en-têtes personnalisés doivent être au format JSON.

Pour ajouter vos propres champs personnalisés à la requête, vous pouvez également spécifier votre propre charge utile dans le champ Payload. Si vous souhaitez encoder votre charge utile pour une URL, cochez la case **Encode as form** et indiquez votre charge utile au format JSON. Utilisez les variables de la section suivante.

### Variables

$AGGREG_KEY
: ID permettant d'agréger des événements connexes.<br />
**Exemple** : `9bd4ac313a4d1e8fae2482df7b77628`

$ALERT_CYCLE_KEY
: ID permettant d'associer des événements depuis le déclenchement d'une alerte jusqu'à sa résolution.

$ALERT_ID
: ID de l'alerte.<br />
**Exemple** : `1234`

$ALERT_METRIC
: Nom de la métrique s'il s'agit d'une alerte.<br />
**Exemple** : `system.load.1`

$ALERT_PRIORITY
: Priorité du monitor envoyant l'alerte.<br />
**Exemple** : `P1`, `P2`

$ALERT_QUERY
: Requête du monitor qui a déclenché le webhook.

$ALERT_SCOPE
: Liste des tags déclenchant l'alerte séparés par des virgules.<br />
**Exemple** : `availability-zone:us-east-1a, role:computing-node`

$ALERT_STATUS
: Résumé du statut d'alerte.<br />
**Exemple** : `system.load.1 over host:my-host was > 0 at least once during the last 1m`
**Remarque** : pour ajouter cette variable dans des charges utiles de webhook depuis des alertes de monitor de log, vous devez ajouter manuellement `$ALERT_STATUS` au carré de l'intégration Webhook.

$ALERT_TITLE
: Titre de l'alerte.<br />
**Exemple** : `error`, `warning`, `success`, `info`

$ALERT_TRANSITION
: Type de notification de l'alerte.<br />
**Exemple** : `Recovered`, `Triggered`/`Re-Triggered`, `No Data`/`Re-No Data`, `Warn`/`Re-Warn`, `Renotify`

$ALERT_TYPE
: Type de l'alerte.

$DATE
: Date _(epoch)_ à laquelle l'événement s'est produit.<br />
**Exemple** : `1406662672000`

$EMAIL
: Adresse e-mail de l'utilisateur publiant l'événement qui a déclenché le webhook.

$EVENT_MSG
: Texte de l'événement.<br />
**Exemple** : `@webhook-url Sending to the webhook`

$EVENT_TITLE
: Titre de l'événement.<br />
**Exemple** : `[Triggered] [Memory Alert]`

$EVENT_TYPE
: Type de l'événement.<br />
**Exemple** : `metric_alert_monitor`, `event_alert` ou `service_check`.

$HOSTNAME
: Hostname du serveur associé à l'événement (le cas échéant).

$ID
: ID de l'événement.<br />
**Exemple** : `1234567`

$INCIDENT_ATTACHMENTS
: Liste d'objets JSON comportant les pièces jointes de l'incident, notamment les analyses post-mortem et les documents associés.<br />
**Exemple** : `[{"attachment_type": "postmortem", "attachment": {"url": "https://app.datadoghq.com/notebook/123","title": "Postmortem IR-1"}}]` 

$INCIDENT_COMMANDER
: Objet JSON comportant le handle, l'uuid, le nom, l'adresse e-mail et l'icône du responsable de l'incident.

$INCIDENT_CUSTOMER_IMPACT
: Objet JSON comportant le statut de l'impact client, la durée et la portée de l'incident.<br />
**Exemple** : `{"customer_impacted": true, "customer_impact_duration": 300 ,"customer_impact_scope": "scope here"}`

$INCIDENT_FIELDS
: Objet JSON mappant chaque champ de l'incident à sa valeur respective.<br />
**Exemple** : `{"state": "active", "datacenter": ["eu1", "us1"]}`

$INCIDENT_PUBLIC_ID
: ID public de l'incident associé.<br />
**Exemple** : `123`

$INCIDENT_TITLE
: Titre de l'incident.

$INCIDENT_SEVERITY
: Gravité de l'incident

$INCIDENT_STATUS
: Statut de l'incident

$INCIDENT_URL
: URL de l'incident.<br />
**Exemple** : `https://app.datadoghq.com/incidents/1`

$INCIDENT_MSG
: Message de la notification de l'incident.<br />

$LAST_UPDATED
: Date de la dernière mise à jour de l'événement.

$LINK
: URL de l'événement.<br />
**Exemple** : `https://app.datadoghq.com/event/jump_to?event_id=123456`

$LOGS_SAMPLE
: Échantillon de logs provenant d'alertes de log monitor.

$METRIC_NAMESPACE
: Espace de nommage de la métrique s'il s'agit d'une alerte.

$ORG_ID
: ID de votre organisation.<br />
**Exemple** : `11023`

$ORG_NAME
: Nom de votre organisation.<br />
**Exemple** : `Datadog`

$PRIORITY
: Priorité de l'événement.<br />
**Exemple** : `normal` or `low`

$SECURITY_RULE_NAME
: Nom de la règle de sécurité.

$SECURITY_SIGNAL_ID
: Identifiant unique du signal.<br />
**Exemple** : `AAAAA-AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA`

$SECURITY_SIGNAL_SEVERITY
: Gravité du signal de sécurité.<br />
**Exemple** : `medium`

$SECURITY_SIGNAL_TITLE
: Titre du signal de sécurité.

$SECURITY_SIGNAL_MSG
: Message du signal de sécurité.

$SECURITY_SIGNAL_ATTRIBUTES
: Attributs du signal de sécurité.<br />
**Exemple** : `{"network":{"client":{"ip":"1.2.3.4"}}, "service": ["agent"]}`

$SECURITY_RULE_ID
: ID de la règle de sécurité.<br />
**Exemple** : `aaa-aaa-aaa`

$SECURITY_RULE_QUERY
: Requête(s) associée(s) à la règle de sécurité.<br />
**Exemple** : `["@evt.name:authentication"]`

$SECURITY_RULE_GROUP_BY_FIELDS
: Groupe de sécurité en fonction des paires key/value.<br />
**Exemple** : `{"@usr.name":"john.doe@your_domain.com"}`

$SECURITY_RULE_TYPE
: Type de règle de sécurité.<br />
**Exemple** : `log_detection`

$SNAPSHOT
: URL de l'image si l'événement contient un snapshot.<br />
**Exemple** : `https://p.datadoghq.com/path-to-snapshot`

$SYNTHETICS_TEST_NAME
: Nom du test Synthetic.

$SYNTHETICS_FIRST_FAILING_STEP_NAME 
: Nom de la première étape qui échoue du test Synthetic.

$SYNTHETICS_SUMMARY
: Synthèse des informations sur le test Synthetic.<br />
**Exemple** :
```
{
  "result_id": "1871796423670117676",
  "test_type": "browser",
  "test_name": "Nom du test",
  "date": "Nov 05, 2021, 09:49AM UTC",
  "test_url": "https://app.datadoghq.com/synthetics/edit/apc-ki3-jwx",
  "result_url": "https://app.datadoghq.com/synthetics/details/anc-ki2-jwx?resultId=1871796423670117676",
  "location": "Frankfurt (AWS)",
  "browser": "Chrome",
  "device": "Laptop Large"
  "failing_steps": [
    {
      "error_message": "Erreur : le contenu de l'élément devrait inclure une valeur donnée.",
      "name": "Span test #title content",
      "is_critical": true,
      "number": "3.1"
    }
  ],
}
```

$TAGS
: Liste des tags associés à l'événement séparés par des virgules.<br />
**Exemple** : `monitor, name:myService, role:computing-node`

$TAGS[key]
: Valeur du tag `key` tag. S'il n'y a pas de tag `key`, ou s'il ne possède aucune valeur, cette expression renvoie une chaîne vide.
**Exemple** : si `$TAGS` inclut `role:computing-node`, alors `$TAGS[role]` renvoie `computing-node`.

$TEXT_ONLY_MSG
: Texte de l'événement sans mise en forme markdown.

$USER
: Utilisateur publiant l'événement qui a déclenché le webhook.<br />
**Exemple** : `rudy`

$USERNAME
: Nom de l'utilisateur publiant l'événement qui a déclenché le webhook.

### Authentification

Si vous souhaitez envoyer vos webhooks vers un service nécessitant une authentification, vous pouvez utiliser l'authentification HTTP standard en remplaçant votre URL `https://mon.service.example.com` par `https://<NOMUTILISATEUR>:<MOTDEPASSE>@mon.service.example.com`.

### Multiples webhooks

Dans une alerte de monitor, si au moins 2 endpoints de webhook sont notifiés, une file d'attente de webhooks est alors créée pour chaque service. Cela signifie que si vous communiquez avec Pagerduty et Slack (par exemple), une nouvelle tentative sur le webhook Slack n'affectera pas le webhook Pagerduty.

Néanmoins, dans le contexte Pagerduty, certains événements passent toujours avant les autres. En particulier, une charge utile « Acknowledge » passe toujours avant « Resolution ». De cette manière, si un ping « Acknowledge » échoue, le ping « Resolution » sera mis en attente conformément à la logique de nouvelle tentative.

## Exemples

### Envoi de SMS par Twilio

Utilisez l'URL :
`https://<ID_COMPTE>:<TOKEN_AUTH>@api.twilio.com/2010-04-01/Accounts/<ID_COMPTE>/Messages.json`

et comme charge utile :

```json
{
    "To": "+1347XXXXXXX",
    "From": "+1347XXXXXX",
    "Body": "$EVENT_TITLE \n Graphique correspondant : $SNAPSHOT"
}
```

Assurez-vous de remplacer `To` par votre numéro de téléphone et `From` par le numéro que Twilio vous a attribué. Cochez la case **Encode as form**.

### Créer un ticket dans Jira

Utilisez l'URL :
`https://<NOM_UTILISATEUR_JIRA>:<MOTDEPASSE_JIRA>@<VOTRE_DOMAINE>.atlassian.net/rest/api/2/issue`

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
        "description": "Une erreur s'est produite. Consultez le graphique $SNAPSHOT ainsi que l'événement $LINK",
        "summary": "$EVENT_TITLE"
    }
}
```

Ne cochez pas la case « Encode as form ».

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks