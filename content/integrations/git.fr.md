---
categories:
- Source Control
ddtype: crawler
description: Send commits and pull requests from your self-hosted Git server to Datadog.
doc_link: https://docs.datadoghq.com/integrations/git/
git_integration_title: git
has_logo: true
integration_title: Git
is_public: true
kind: integration
manifest_version: '1.0'
name: git
public_title: Datadog-Git Integration
short_description: Send commits and pull requests from your self-hosted Git server
  to Datadog.
version: '1.0'
---

{{< img src="integrations/git/git_event.png" alt="Git event" responsive="true" popup="true">}}

## Overview

Capture Git commits directly from your Git server to:

* Keep track of code changes in real time.
* Add code change markers on all your dashboards.
* Discuss code changes with your team.

## Setup
### Installation

1. Create a new application key for Git: [Generate Application Key](https://app.datadoghq.com/account/settings#api)

2. Download the Datadog Git webhook:
```
sudo easy_install dogapi
curl -L https://raw.github.com/DataDog/dogapi/master/examples/git-post-receive-hook > post-receive
```

3. Set up Git with your [Datadog keys](https://app.datadoghq.com/account/settings#api):
```
git config datadog.api <YOUR_DATADOG_API_KEY>
git config datadog.application <YOUR_DATADOG_APP_KEY>
```   

4. Activate the hook in your repository
```
install post-receive git_repository/.git/hooks/post-receive
```
Assuming your repository is called ```git_repository```

4. Install Integration
