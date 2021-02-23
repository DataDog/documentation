---
title: Use the webhooks integration to create a Trello card
kind: faq
---

You can easily use the [webhooks integration][1] to instantly create a Trello card using the [@-notification feature][2].

This flow uses the Trello REST POST card API endpoint to post an @notification to a relevant Trello list.

## Overview of steps

* Locate your Trello app key and token

* Find the list in the board to which you want to submit cards

* Configure a webhook

## Getting your Trello app key and token

To get the Trello app key and token, [navigate to Trello's application key page][3]. If you are logged in, you will be able to see the app key immediately.

**NOTE**: Trello mentions API key in the URL. For this article, API and app keys are one and the same.

{{< img src="developers/faq/developer_api_key.png" alt="developer_api_key"  >}}

To get the token, click the token link (green arrow) above, authorize a token with the Trello account you are currently logged into, and grab the token in the subsequent link:
{{< img src="developers/faq/trello_api_key.png" alt="trello_api_key"  >}}

## Designate the Trello list

Click on a card in the list you'd like to add cards to. Append `.json` to the URL, and then navigate to that URL.
{{< img src="developers/faq/card_url.png" alt="card_url"  >}}

From there, find the value of `idList`:
{{< img src="developers/faq/id_list.png" alt="id_list"  >}}

## Configure the Webhook

See [the API documentation for Trello cards][4] and Datadog's [webhooks integration][1]

In the configuration:

* "name" is the alias for how you references this hook (@webhook-NAME)

* "URL" is `https://api.trello.com/1/cards`

Enable Custom Payload and fill in a JSON object that looks like:

```json
{
  "name": "$USER : $EVENT_TITLE",
  "desc": "$EVENT_MSG",
  "key": "{APP_KEY}",
  "token": "{TOKEN_KEY}",
  "pos": "bottom",
  "idList": "{ID_LIST_VALUE}"
}
```

* **name**: title of the card
* **desc**: description of the card
* **key**: application key
* **token**: token key
* **pos**: relative position of the card on the list
* **idList**: list ID

The resulting config looks like this:
{{< img src="developers/faq/integration_config.png" alt="integration_config"  >}}

## Some points to consider

This flow involves Trello generating a server token for the application. As you can see in the the token disclaimer:
{{< img src="developers/faq/trello_disclaimer.png" alt="trello_disclaimer"  >}}

The token provides read/write access to all your boards and teams, so this is a potential concern if you do not want to give away access in this way.

To avoid this, consider creating a specific Trello user that is only joined to the board you designate. Have that user receive the server token.

[1]: /integrations/webhooks/
[2]: /monitors/notifications/
[3]: https://trello.com/app-key
[4]: https://trello.com/guide
