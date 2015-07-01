---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Jenkins Integration
integration_title: Jenkins
kind: integration
doclevel:
---
---

### Overview
{:#int-overview}

Connect Jenkins to Datadog in order to:

- Add build & deployment markers on all your dashboards.
- Identify trends in your builds.
- Discuss build failures with your team.


From the open-source Agent:

* [Jenkins YAML example](https://github.com/DataDog/dd-agent/blob/master/conf.d/jenkins.yaml.example)
* [Jenkins checks.d](https://github.com/DataDog/dd-agent/blob/master/checks.d/jenkins.py)

Successful Jenkins builds will show up as 'low' priority.
In the left column of the event stream, swith the priority to 'all'
to see both successful and failed builds.
