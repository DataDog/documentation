---
title: Basic Agent Usage for Source Installation
kind: documentation
---

<!--
======================================================
OVERVIEW
======================================================
-->

<h3 id="overview">Overview</h3>

This guide will outline the basic functionality of the Datadog Agent.
If you haven't installed the Agent yet, instructions can be found
<a href='https://app.datadoghq.com/account/settings#agent/source'>here</a>.<br/>

By default, your Agent will be installed in its own sandbox at <code> '~/.datadog-agent'</code>.
You're free to move this folder wherever you like.
However, this guide will assume that the Agent is installed in its default location, so be sure to modify the
instructions accordingly if you decide to move them.


<!--
======================================================
Starting and Stopping the Agent
======================================================
-->

<h3 id="starting_and_stopping_the_agent">Starting and Stopping the Agent</h3>

To manually start the Agent:

{{< highlight console >}}sudo ~/.datadog-agent/bin/agent start{{< /highlight >}}

To stop the Agent: <br/>

{{< highlight console >}}sudo ~/.datadog-agent/bin/agent stop{{< /highlight >}}

To restart the Agent: <br/>

{{< highlight console >}}sudo ~/.datadog-agent/bin/agent restart{{< /highlight >}}

<!--
======================================================
Status and Information
======================================================
-->

<h3 id="status_and_information">Status and Information</h3>

To check if the Agent is running:

{{< highlight console >}}sudo ~/.datadog-agent/bin/agent status{{< /highlight >}}

To receive more information about the Agent's state:

{{< highlight console >}}sudo ~/.datadog-agent/bin/info{{< /highlight >}}

Tracebacks for errors can be retrieved by setting the <code>-v</code> flag: <em>(since 3.8.0)</em>

{{< highlight console >}}sudo ~/.datadog-agent/bin/info -v{{< /highlight >}}

<!--
======================================================
Configuration
======================================================
-->

<h3 id="configuration">Configuration</h3>

The configuration file for the Agent is located at <code>~/.datadog-agent/agent/datadog.conf</code>

Configuration files for integrations are located in <code>~/.datadog-agent/agent/conf.d/</code>

<!--
======================================================
Troubleshooting
======================================================
-->

<h3 id="troubleshooting">Troubleshooting</h3>

First, make sure you are using the correct version of Python. The Agent requires version 2.7. You can check your version by executing:

{{< highlight console >}}python -c 'import sys; print sys.version'{{< /highlight >}}

Next, try running the <a href='#status_and_information'>info</a> command to see the state of the Agent.

Logs for the subsystems are in the following files:

<ul>
  <li><code>~/.datadog-agent/supervisord/logs/supervisord.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/collector.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/dogstatsd.log</code></li>
  <li><code>~/.datadog-agent/supervisord/logs/forwarder.log</code></li>
</ul>

<br/>

If you're still having trouble, our support team will be glad to provide further assistance.
You can contact them in one of the following ways:

{{< partial name="_contact_info" markdown="true" >}}

