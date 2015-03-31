---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-Jenkins Integration
sidebar:
  nav:
    - header: Integrations
    - text: Back to Overview
      href: "/ja/integrations/"
---

<div id="int-overview">
<h3>Overview</h3>

Connect Jenkins to Datadog in order to:
<ul>
<li> Add build & deployment markers on all your dashboards.</li>
<li> Identify trends in your builds.</li>
<li> Discuss build failures with your team.</li>
</ul>
</div>

From the open-source Agent:

* <a href="https://github.com/DataDog/dd-agent/blob/master/conf.d/jenkins.yaml.example">
Jenkins YAML example</a>
* <a href="https://github.com/DataDog/dd-agent/blob/master/checks.d/jenkins.py">
Jenkins checks.d</a>

<p>Successful Jenkins builds will show up as 'low' priority.
In the left column of the event stream, swith the priority to 'all'
to see both successful and failed builds.</p>
