---
categories:
- Source Control
- Collaboration
- issue tracking
ddtype: crawler
description: Identify commits and pull requests that affect your services' performance.
doc_link: https://docs.datadoghq.com/integrations/github/
git_integration_title: github
has_logo: true
integration_title: Github
is_public: true
kind: integration
manifest_version: '1.0'
name: github
public_title: Datadog-Github Integration
short_description: Identify commits and pull requests that affect your services' performance.
version: '1.0'
---

{{< img src="integrations/github/git_integration_screen.png" alt="Git event" responsive="true" popup="true">}}

## Overview

Capture GitHub commits in Datadog to:

  * Track new features from code changes
  * Identify when new code changes lead to system alerts or build failures
  * Discuss code changes with your team in the Datadog Event Stream

## Setup
### Installation

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

## Data Collected

Once the integration is complete, whatever you select (commits and/or issues) will populate into your Datadog Event Stream. If you view a dashboard, in the top left search bar you can type `sources:github` to see github events overlayed over your the graphs on that dashboard.

## Troubleshooting
### Why aren't Github events showing up in my Datadog event stream?

If your webhook is configured with `content-type:application/x-www-form-urlencoded`, set it to `content-type:application/json` instead.

  {{< img src="integrations/github/github_webhook.png" alt="github webhook content type" responsive="true" popup="true">}}
