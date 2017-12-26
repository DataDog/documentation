---
title: How to Make a Trello Card using Webhooks
kind: faq
---

You can easily use our [Webhook Integration](https://app.datadoghq.com/account/settings#integrations/webhooks) to instantly create a trello card using our @-notification feature.

This flow utilizes the Trello REST POST card api endpoint to post the @notification to a relevant Trello list.

### Steps to Success

* Get the Trello App key and Token

* Find the List in the Board you'd like to submit cards to

* Configure Webhook


#### Getting the Keys

To get the Trello App Key and Token, simply [navigate to Trello's relevant page](https://trello.com/app-key). If you are logged in, you should be able to see the [App key](https://cl.ly/2A40141c0p2Z) immediately:

NOTE: Trello mentions API key in the url. For this article, API and APP keys are one and the same

Authorize a token with the Trello Account you are currently logged into, [the Green Arrow](https://cl.ly/2A40141c0p2Z).

#### Designate the Trello List

In trello, click on a [card](https://cl.ly/0F3u1U3H0q3c) in the list you'd like to add cards to and append `.json` to the url and navigate to that url.
From there, find the [value](https://cl.ly/0R2n1A0V280s) for idList.

#### Configure the Webhook

[Consult the API documentation for Trello cards](https://developers.trello.com/advanced-reference/card#put-1-cards-card-id-or-shortlink) and our webhook integration [dedicated documentation page](https://app.datadoghq.com/account/settings#integrations/webhooks).

In the configuration:

* name is the alias for how you reference this hook. (@webhook-NAME)

* URL is `https://api.trello.com/1/cards`

Enable Custom Payload and fill in a json object that looks like:
```
{
"name": "$USER : $EVENT_TITLE",
"desc": "$EVENT_MSG",
"key": "{APP_KEY}",
"token": "{TOKEN_KEY}",
"pos":"bottom",
"idList": "{ID_LIST_VALUE}"
}
```

*__name__ corresponds to the title of the card

*__desc__ corresponds to the description of the card

*__key__ corresponds to the application key

*__token__ corresponds to the token key

*__pos__ corresponds to the relative position of the card on the list

*__idList__ corresponds to the list id

The resulting config should look like [this](https://cl.ly/260U152G3h09) and you are all set! @-notify away!

#### Some points to consider

This flow involves Trello generating a server token for our application. As you can see in the the [token disclaimer](https://cl.ly/380G120f0W0R).

The token provides read/write access to all your boards and teams, so this is a potential concern if you do not want to give away access like that.

A good workaround would be to create a specific trello user that is only joined to the board you designate. Have that user receive the server token.