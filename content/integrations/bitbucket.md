---
title: Datadog-Bitbucket Integration
integration_title: Bitbucket
kind: integration
newhlevel: true
---
# Overview

Capture commits and pull requests events directly from your bitbucket to:

  * Keep track of code changes in real time
  * Add code change markers on all of your dashboards
  * Discuss code changes with your team

We've written extensively about the Bitbucket integration on our [blog][1].

![Bitbucket Integration](/static/images/integrations-bitbucket.png)
Once the integration is complete, whatever you select (commits and/or pull requests) will populate
into your Datadog Event Stream.

* When commits are made
* When a PR is created
* When a comment is made/deleted on a PR

If you view a dashboard, in the top left search bar you can type ```sources:bitbucket``` to see bitbucket events overlayed over your the graphs on that dashboard.

# Installation

On the Bitbucket website, create a new user that has **Read** access to the repo you want to monitor. This is the user that Datadog will use to collect information on the repository.

# Configuration

1.  Login to the Datadog application and add the [Bitbucket integration here][2].
2.  Enter the username and password you created above in the Installation section. Click the **Install Integration** button. If the username or password is not correct you will get a error message.
3.  Open the Bitbucket integration again and enter the full name of the repository you want to monitor. If the url for your repository is https://bitbucket.org/groupname/reponame, then enter ```groupname/reponame``` in the Repo full name textbox.
4.  Decide what type of events you would like to collect and click **Update Configuration**.

# Validation

Each entry in the integration tile is validated when you enter it. There is nothing else you need to do.




[1]: https://www.datadoghq.com/2014/06/understand-code-changes-impact-system-performance-bitbucket-datadog/
[2]: https://app.datadoghq.com/account/settings#integrations/bitbucket
