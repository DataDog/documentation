---
title: Datadog-Github Integration
integration_title: Github
kind: integration
---


## Overview


Capture GitHub commits in Datadog to:

  * Track new features from code changes
  * Identify when new code changes lead to system alerts or build failures
  * Discuss code changes with your team in the Datadog Event Stream

{{< img src="git_integration_screen.png" alt="Git event" >}}

## Configuration

1. Add this URL to your Github Webhook, **Settings>Webhooks>Add new Webhook** with this URL:
```
https://app.datadoghq.com/intake/webhook/github?api_key=<YOUR_DATADOG_API_KEY>
```

2. Select what you want to send to datadog, we support:
     * Push (new commits), 
     * Create and delete (for tags), 
     * Pull requests,
     * Issues, 
     * All comments.

3. Add the branches you wish to monitor for each repository. Wildcards are also supported to add all repositories for a user or Organization.

## What to Expect

Once the integration is complete, whatever you select (commits and/or issues) will populate into your Datadog Event Stream. If you view a dashboard, in the top left search bar you can type `sources:github` to see github events overlayed over your the graphs on that dashboard.

## FAQ

**Why events don't appear to be showing up in my datadog event stream with my github integration?**

If you have setup your webhook on the relevant Github repos and you can see it's sending data but events don't appear to be showing up in the event stream this might come from your webhook settings:

Instead of having your webhook configured with `content-type:application/x-www-form-urlencoded`

You should set your webhook with `content-type:application/json`.
{{< collapse id="collapse_screen_github" >}}click here {{< /collapse >}} to see a screenshoot.

<div class="collapse" id="collapse_screen_github" markdown="1">
  {{< img src="github_webhook.png" alt="github webhook content type" >}}
</div>

   [1]: https://app.datadoghq.com/account/settings