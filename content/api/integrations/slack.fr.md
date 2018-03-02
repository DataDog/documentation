---
title: Slack
type: apicontent
order: 13.3
external_redirect: /api/#slack
---

## Slack

Configure your Datadog-Slack integration directly through Datadog API.  
[Read more about Datadog-Slack integration](/integrations/slack)

##### ARGUMENTS

* `service_hooks` [*required*]:  
    Array of service hook objects (the service hook is generated for your slack account in your Slack account administration page). A service hook object is composed by:

    * `account` [*required*]:  
        Your Slack account name.

    * `url` [*required*]:  
        Your Slack Service Hook URL. 



* `channels` [*required*]:  
    Array of slack channel objects to post to. A slack channel object is composed by:

    * `channel_name` [*required*]:  
        Your channel name e.g: `#general`, `#private`

    * `transfer_all_user_comments` [*optional*, *default*=**False**]:  
        To be notified for every comment on a graph, set it to `true`. If set to `False` use the `@slack-channel_name` syntax [for comments to be posted to slack](/monitors/notifications/#slack-integration).

    * `account` [*required*]:  
        Account to which the channel belongs to.

* `run_check` [*optional*, *default*=**false**]:  
    Determines if the integration install check is run before returning a response.

    * If **true**:

        - The install check is run
        - If there’s an error in the configuration the error is returned
        - If there’s no error, *204 No Content* response code is returned

    * If **false**:

        - We return a *202 accepted*
        - Install check is run after returning a response