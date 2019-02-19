---
title: Use our Webhook Integration to create a trello card
kind: faq
---

You can easily use our [Webhook Integration][1] to instantly create a trello card using our [@-notification feature][2].

This flow uses the Trello REST POST card api endpoint to post the @notification to a relevant Trello list.

## Steps to Success

* Get the Trello App key and Token

* Find the List in the Board you'd like to submit cards to

* Configure Webhook

## Getting the Keys

To get the Trello App Key and Token, [navigate to Trello's relevant page][3]. If you are logged in, you should be able to see the App key immediately:

NOTE: Trello mentions API key in the url. For this article, API and APP keys are one and the same

{{< img src="developers/faq/developer_api_key.png" alt="developer_api_key" responsive="true" >}}

To get the Token , click the Token link (Green Arrow) above, authorize a token with the Trello Account you are currently logged into, and grab the token in the subsequent link:
{{< img src="developers/faq/trello_api_key.png" alt="trello_api_key" responsive="true" >}}

## Designate the Trello List

Click on a card in the list you'd like to add cards to and append `.json` to the url and navigate to that url
{{< img src="developers/faq/card_url.png" alt="card_url" responsive="true" >}}

From there, find the value of idList
{{< img src="developers/faq/id_list.png" alt="id_list" responsive="true" >}}

## Configure the Webhook

See [the API documentation for Trello cards][4] and our [webhook integration][1]

In the configuration:

* name is the alias for how you references this hook. (@webhook-NAME)

* URL is `https://api.trello.com/1/cards`

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

* **name**: title of the card
* **desc**: description of the card
* **key**: application key
* **token**: token key
* **pos**: relative position of the card on the list
* **idList**: list id

The resulting config should look like this:
{{< img src="developers/faq/integration_config.png" alt="integration_config" responsive="true" >}}

## Some points to consider

This flow involves Trello generating a server token for our application. As you can see in the the token disclaimer:
{{< img src="developers/faq/trello_disclaimer.png" alt="trello_disclaimer" responsive="true" >}}

The token provides read/write access to all your boards and teams, so this is a potential concern if you do not want to give away access like that.

A good workaround would be to create a specific trello user that is only joined to the board you designate. Have that user receive the server token.

[1]: /integrations/webhooks
[2]: /monitors/notifications
[3]: https://trello.com/app-key
[4]: https://trello.com/guide
