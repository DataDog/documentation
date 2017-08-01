---
title: Datadog-Git Integration
integration_title: Git
kind: integration
doclevel: basic
---

{{< img src="integrations/git/git_event.png" alt="Git event" >}}

## Overview

Capture Git commits directly from your Git server to:

* Keep track of code changes in real time.
* Add code change markers on all your dashboards.
* Discuss code changes with your team.


## Configuration

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
