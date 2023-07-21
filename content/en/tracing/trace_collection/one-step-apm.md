---
title: 1-Step APM Onboarding
kind: documentation
is_beta: true
---

<div class="alert alert-info">
<strong>1-Step APM onboarding is in beta!</strong> <p>This feature is available in Datadog Agent version x.x:</p>
<ul>
<li>on Linux hosts and VMs</li>
<li>on Docker containers</li>
<li>installed with Ansible</li>
</ul>
<p>for tracing Java, Python, Node.js, and .NET services. Try it out!</p> 

<p>For Kubernetes deployments, a private beta is available for tracing Java, Python, Node.js, .NET and Ruby services. <a href="tktk">Fill out this form to request access</a>.</p>
</div>

## Enable APM on your services in one step

If you [install or update a Datadog Agent][1] with the **Enable APM Instrumentation (beta)** option selected, the Agent is installed and configured to enable APM (with the `DD_APM_INSTRUMENTATION_ENABLED` parameter) and to inject the Datadog tracing library into your code for automatic instrumentation, without any additional installation or configuration steps. You need only restart the services to start sending trace data to Datadog.

For example, on an Ubuntu host, the one-line install command is:

```shell
DD_API_KEY=<YOUR_DD_API_KEY> DD_SITE=”<YOUR_DD_SITE>” DD_APM_INSTRUMENTATION_ENABLED=host bash -c(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)”
```

For the one-line command that installs the Agent with APM for your Linux host, VM, or Docker container, see the [Agent Installation page][1].

## What's next

Start [exploring the performance observability of your services in Datadog][2].

## Removing 1-Step APM Configuration from your Agent

To remove this configuration from an Agent:

tktk

[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: /tracing/services/

