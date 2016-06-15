---
title: Datadog-Jenkins Integration
integration_title: Jenkins
kind: integration
git_integration_title: jenkins
---

### Deprecation Warning

This documentation refers to the _deprecated_ Jenkins agent check. Please use this [Jenkins Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Datadog+Plugin) instead.

### Overview

Connect Jenkins to Datadog in order to discuss build failures with your team.

From the open-source Agent:

* [ Jenkins YAML example][1]
* [ Jenkins checks.d][2]

Successful Jenkins builds will show up as 'low' priority. In the left column of the event stream, swith the priority to 'all' to see both successful and failed builds.

## Metrics

<%= get_metrics_from_git() %>

   [1]: https://github.com/DataDog/dd-agent/blob/master/conf.d/jenkins.yaml.example
   [2]: https://github.com/DataDog/dd-agent/blob/master/checks.d/jenkins.py


