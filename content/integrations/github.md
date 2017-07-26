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

{{< img src="integrations/github/git_integration_screen.png" alt="Git event" >}}

## Configuration

1. Add this URL to your Github Webhook, (**Settings>Webhooks>Add new Webhook**) with this URL:
```
https://app.datadoghq.com/intake/webhook/github?api_key=<YOUR_DATADOG_API_KEY>
```

2. Select what you want to send to datadog, This integration supports:
     * Push (new commits), 
     * Create and delete (for tags), 
     * Pull requests,
     * Issues, 
     * All comments.

3. For each repository, add the branches you wish to monitor. If you want to add all repositories for a user or organization, use wildcards (e.g antirez/redis or antirez/*)

## What to Expect

Once the integration is complete, whatever you select (commits and/or issues) will populate into your Datadog Event Stream. If you view a dashboard, in the top left search bar you can type `sources:github` to see github events overlayed over your the graphs on that dashboard.

## FAQ

**Why aren't Github events showing up in my Datadog event stream?**

If your webhook is configured with `content-type:application/x-www-form-urlencoded`, set it to `content-type:application/json` instead.

  {{< img src="integrations/github/github_webhook.png" alt="github webhook content type" >}}

   [1]: https://app.datadoghq.com/account/settings