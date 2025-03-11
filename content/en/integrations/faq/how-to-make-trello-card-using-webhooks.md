---
title: How to Make a Trello Card using Webhooks

---

You can use the Datadog [Webhook Integration][1] to instantly create a Trello card using the `@-notification` feature.

This flow uses the Trello REST POST card api endpoint to post the @notification to a relevant Trello list.

### Steps to success

* Get the Trello App key and Token

* Find the List in the Board you'd like to submit cards to

* Configure Webhook

#### Getting the keys

To get the Trello App Key and Token, [navigate to Trello's relevant page][2]. If you are logged in, you should be able to see the [App key][3] immediately:

NOTE: Trello mentions API key in the url. For this article, API and APP keys are one and the same

Authorize a token with the Trello Account you are currently logged into, [the Green Arrow][3].

#### Designate the Trello list

In trello, click on a [card][4] in the list you'd like to add cards to and append `.json` to the url and navigate to that url.
From there, find the [value][5] for idList.

#### Configure the Webhook

[Consult the API documentation for Trello cards][6] and our webhook integration [dedicated documentation page][1].

In the configuration:

* name is the alias for how you reference this hook. (@webhook-NAME)

* URL is `https://api.trello.com/1/cards`

Enable Custom Payload and fill in a json object that looks like:

```json
{
  "name": "$USER : $EVENT_TITLE",
  "desc": "$EVENT_MSG",
  "key": "{DATADOG_APPLICATION_KEY}",
  "token": "{TOKEN_KEY}",
  "pos": "bottom",
  "idList": "{ID_LIST_VALUE}"
}
```

* `name`: corresponds to the title of the card
* `desc`: corresponds to the description of the card
* `key`: corresponds to the application key
* `token`: corresponds to the token key
* `pos`: corresponds to the relative position of the card on the list
* `idList`: corresponds to the list id

The resulting config should look like [this][7] and you are all set! @-notify away!

#### Some points to consider

This flow involves Trello generating a server token for our application. As you can see in the [token disclaimer][8].

The token provides read/write access to all your boards and teams, so this is a potential concern if you do not want to give away access like that.

A good workaround would be to create a specific trello user that is only joined to the board you designate. Have that user receive the server token.

[1]: https://app.datadoghq.com/account/settings#integrations/webhooks
[2]: https://trello.com/app-key
[3]: https://cl.ly/2A40141c0p2Z
[4]: https://cl.ly/0F3u1U3H0q3c
[5]: https://cl.ly/0R2n1A0V280s
[6]: https://developers.trello.com/reference/#cards
[7]: https://cl.ly/260U152G3h09
[8]: https://cl.ly/380G120f0W0R
