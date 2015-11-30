---
title: Datadog-Bitbucket Integration
integration_title: Bitbucket
kind: integration
doclevel: basic
---
### Overview

Capture commits and pull requests events directly from your bitbucket to:

  * Keep track of code changes in real time
  * Add code change markers on all of your dashboards
  * Discuss code changes with your team

We've written extensively about the Bitbucket integration on our [blog][1].


### Configuration
{: #int-configuration}

Select 'Bitbucket' [here][2] and link your account.
You can then select which repos you would like to integrate, and if you'd like to receive commits and/or pull requests.

### What to Expect

Once the integration is complete, whatever you select (commits and/or pull requests) will populate
into your Datadog Event Stream.

* When commits are made
* When a PR is created
* When a comment is made/deleted on a PR

If you view a dashboard, in the top left search bar you can type ```sources:bitbucket``` to see bitbucket events overlayed over your the graphs on that dashboard.


[1]: https://www.datadoghq.com/2014/06/understand-code-changes-impact-system-performance-bitbucket-datadog/
[2]: https://app.datadoghq.com/account/settings
