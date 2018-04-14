---
title: Utiliser l'intégration Webhook pour créer une carte trello
kind: faq
---

You can easily use our [Webhook Integration][1] to instantly create a trello card using our [@-notification feature][2].

This flow utilizes the Trello REST POST card api endpoint to post the @notification to a relevant Trello list.

## Étapes à suivre pour réussir

* Get the Trello App key and Token

* Find the List in the Board you'd like to submit cards to

* Configurer un Webhook

## Getting the Keys

To get the Trello App Key and Token, [navigate to Trello's relevant page][3]. If you are logged in, you should be able to see the App key immediately:

NOTE: Trello mentions API key in the url. For this article, API and APP keys are one and the same

{{< img src="developers/faq/developer_api_key.png" alt="developer_api_key" responsive="true" popup="true">}}

To get the Token , click the Token link (Green Arrow) above, authorize a token with the Trello Account you are currently logged into, and grab the token in the subsequent link:
{{< img src="developers/faq/trello_api_key.png" alt="trello_api_key" responsive="true" popup="true">}}

## Designate the Trello List

Cliquez sur une carte dans la liste à laquelle vous souhaitez ajouter des cartes, ajoutez `.json` à l'URL puis naviguez jusqu'à cette URL
{{< img src="developers/faq/card_url.png" alt="card_url" responsive="true" popup="true">}}

De là, trouvez la valeur de idList
{{< img src="developers/faq/id_list.png" alt="id_list" responsive="true" popup="true">}}

## Configurer le Webhook

See [the API documentation for Trello cards][4] and our [webhook integration][1]

Dans la configuration:

* name is the alias for how you references this hook. (@webhook-NAME)

* l'URL est `https://api.trello.com/1/cards`

Enable Custom Payload and fill in a json object that looks like:

```json
{
"name": "$USER : $EVENT_TITLE",
"desc": "$EVENT_MSG",
"key": "{APP_KEY}",
"token": "{TOKEN_KEY}",
"pos":"bottom",
"idList": "{ID_LIST_VALUE}"
}
```

* **name**: titre de la carte
* **desc**: description of the card
* **key**: application key
* **token**: token key
* **pos**: relative position of the card on the list
* **idList**: list id

Le résultat de la configuration ressemble à:
{{< img src="developers/faq/integration_config.png" alt="integration_config" responsive="true" popup="true">}}

## Some points to consider

This flow involves Trello generating a server token for our application. As you can see in the the token disclaimer:
{{< img src="developers/faq/trello_disclaimer.png" alt="trello_disclaimer" responsive="true" popup="true">}}

The token provides read/write access to all your boards and teams, so this is a potential concern if you do not want to give away access like that.

A good workaround would be to create a specific trello user that is only joined to the board you designate. Have that user receive the server token.

[1]: /integrations/webhooks
[2]: /monitors/notifications
[3]: https://trello.com/app-key
[4]: https://trello.com/guide
