---
title: Datadog-Zendesk Integration
integration_title: Zendesk
kind: integration
doclevel: basic
newhlevel: true
git_integration_title: zendesk
---
## Overview

{{< img src="zendesk_dash.png" >}}

Zendesk is a customer service and support ticket platform that allows you to receive, track and respond to inquiries and requests from customers. Enable this integration to see ticket metrics in Datadog and to create and update tickets from Datadog.

Integrate with Zendesk to:

* Monitor and graph ticket count metrics by status, user, and satisfaction rating
* Receive a Datadog event each time a new Zendesk ticket is opened
* Create and update tickets using @zendesk mentions

## Installation

To install this integration, you will first need to generate a Zendesk API Token:

1. Navigate to the API settings page by clicking the *Admin* gear icon from the left menu, then selecting *API* from the *Channels* section of the menu item list.
1. Enable Token Access if it is not already enabled.
1. Click the plus symbol to create a new token.
1. Set the API Token description to something informative, e.g. "Datadog-Zendesk Integration"
1. Copy the API Token. ***Important***: You will need to temporarily save this token, as it will be hidden once you click Save.
1. Click Save.

To complete the integration, enter your information in [Datadog](https://app.datadoghq.com):

1. Visit the [Zendesk integration tile](https://app.datadoghq.com/account/settings#integrations/zendesk) or navigate to it by clicking Integrations in the left side menu, then clicking the Zendesk integration tile. Then click on the *Configuration* tab.
1. Enter your Zendesk domain. This is the text that appears before zendesk.com. e.g. If your Zendesk is located at https://*my-company*.zendesk.com, your domain will be *my-company*.
1. Enter your Zendesk username.
1. Paste the Zendesk API Token you received in step 5 above.
1. Click the Install Integration button.

## Metrics


## Events

This integration will generate an event each time a new Zendesk ticket is opened.

## Zendesk Tickets

You can create new Zendesk tickets and assign them to a a group. First add the group name in the Datadog [Zendesk integration tile](https://app.datadoghq.com/account/settings#integrations/zendesk), then use @zendesk-group-name in your Datadog monitors and annotations. e.g. to create a ticket and assign it to the Zendesk group *Support*, you would add the group and use *@zendesk-support*.
