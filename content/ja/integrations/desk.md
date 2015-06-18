---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Desk Integration
integration_title: Desk
kind: integration
---

### Overview
{:#int-overview}

Connect Desk to Datadog to:

- Receive new case events in the event stream
- Visualize case stats by user and status
- View trends in support tickets alongside DevOps issues

### Configuration
{:#int-configuration}

From your Desk account, add an API application on the Settings -> API -> My Applications page (you made need administrator privileges.

Fill out the form as shown, leaving the latter two URL fields blank. Desk should then generate a consumer key, consumer secret, access token, and access secret for your application.

<img src="/static/images/desk_config.png" style="width:100%; border:1px solid #777777"/>

Then from your Datadog account, enter the corresponding information on the [Desk tile](https://app.datadoghq.com/account/settings#integrations/desk). You will also need to enter your company's unique Desk domain name.

Hit the install button, and then you're all set! You will soon be able to select desk.* metrics on a custom dashboard or view them on the provided [Desk dashboard](https://app.datadoghq.com/screen/integration/desk). (You can also read about this integration on [our blog](https://www.datadoghq.com/2015/02/keep-support-team-page-salesforce-desk-integration/).)
