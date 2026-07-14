---
aliases:
- /fr/developers/faq/calling-on-datadog-s-api-with-the-webhooks-integration

title: Appeler l'API de Datadog avec l'intégration Webhooks
---

Vous pouvez utiliser l'[intégration Webhooks][1] pour déclencher des webhooks à partir de monitors et d'événements Datadog. Vous avez ainsi la possibilité de faire communiquer votre compte Datadog avec votre équipe à l'aide d'outils de communication personnalisés, ou encore de [transférer des alertes de monitor sous forme de messages texte][2].

Il est également possible de configurer des notifications de webhook pour appeler l'[API Datadog][3], par exemple si vous souhaitez envoyer une métrique ou un événement à votre compte Datadog chaque fois qu'un monitor est déclenché.

## Marche à suivre

Chaque webhook doit être configuré avec un nom (qui doit être spécifié dans les monitors) et une URL (qui doit être ping par le webhook). Pour envoyer un appel à l'API Datadog, sélectionnez « Use custom payload » et ajoutez votre charge utile personnalisée dans le champ correspondant.

* Champ **Name** : indiquez le nom de votre choix, tant qu'il n'est pas utilisé par un autre webhook.

* Champ **URL** : l'URL utilisée pour ping l'API. Ressemble à :
`https://api.datadoghq.com/api/v1/<ENDPOINT_API>?api_key=<CLÉ_API_DATADOG>`

* Champ **Custom payload** : contient le JSON avec toutes les options que vous souhaitez inclure dans l'appel d'API. Les options appropriées dépendent du type d'appel. Il est parfois possible d'utiliser le contenu `$symbol` du monitor pour remplir une partie des valeurs des options.

## Exemple

Imaginez qu'un membre de votre équipe souhaite connaître le nombre de monitors dont le statut est OK et le nombre de monitors dont le statut est CRITICAL parmi une série de monitors exécutés. Vous pouvez configurer une notification de webhook de façon à envoyer un appel d'API « check_run » chaque fois que le statut de l'un de ces monitors passe à OK ou CRITICAL. Ensuite, vous pouvez ajouter un widget « Check status » dans un [screenboard][4] pour permettre à votre coéquipier de visualiser le statut de l'ensemble de ces monitors à tout moment.

Dans ce cas, vous avez besoin de deux webhooks distincts, un pour « mymonitorgroup-alert-check » et un autre pour « mymonitorgroup-ok-check ». Les deux utilisent le même endpoint d'API. Leur nom et leur URL doivent respecter les formats suivants :

* Name : mymonitorgroup-alert-check
    URL : `https://api.datadoghq.com/api/v1/check_run?api_key=<CLÉ_API_DATADOG>`

* Name : mymonitorgroup-ok-check
    URL : `https://api.datadoghq.com/api/v1/check_run?api_key=<CLÉ_API_DATADOG>`

La charge utile personnalisée est l'endroit où le nom et les tags du check_run sont appliqués. Pour le webhook « alert », consultez l'exemple suivant :

```json
{
  "check": "mymonitorgroup.status",
  "status": 2,
  "host_name": "$HOSTNAME",
  "tags": "[monitor:$ALERT_TITLE]"
}
```

Avec cette charge utile personnalisée, chaque fois que @webhook-mymonitorgroup-alert-check est déclenché par un monitor, un check_run appelé « mymonitorgroup.status » est envoyé avec le statut CRITICAL. Celui-ci est tagué avec le nom du monitor et, le cas échéant, le nom du host sur lequel le monitor est déclenché.

Vous pouvez alors appliquer la même charge utile personnalisée pour le check « mymonitorgroup-ok-check », mais en définissant le « status » sur « 0 » au lieu de « 2 » pour spécifier le statut « OK ».

Une fois ces deux webhooks définis, accédez à vos monitors (ceux que votre coéquipier souhaite visualiser rapidement) et ajoutez les références de la notification de webhook en les entourant du tag de logique conditionnelle approprié, comme suit :

```text
{{#is_alert}} @webhook-mymonitorgroup-alert-check {{/is_alert}}
{{#is_recovery}} @webhook-mymonitorgroup-ok-check {{/is_recovery}}
```

Une fois vos monitors configurés et prêts à envoyer des alertes (ils doivent avoir envoyé au moins une alerte avec un statut OK ou CRITICAL pour être inclus dans le nombre total de statuts), vous pouvez alors configurer un widget Statut de check dans un [screenboard][4] pour votre « mymonitorgroup.check ». Ici, le regroupement se fait en fonction du tag « monitor ».

Voici un exemple de ce widget (même si, dans cet exemple, le nom du check est « composite.status » et un seul monitor dans le groupe s'est déclenché avec le statut « Alert » puis « OK ») :

{{< img src="developers/faq/check_status_editor.png" alt="check_status_editor" >}}

[1]: /fr/integrations/webhooks/
[2]: https://www.datadoghq.com/blog/send-alerts-sms-customizable-webhooks-twilio
[3]: /fr/api/
[4]: /fr/dashboards/#screenboards