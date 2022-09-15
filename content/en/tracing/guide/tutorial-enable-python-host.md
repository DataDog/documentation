---
title: Tutorial - Enabling Tracing for a Python Application on the Same Host as Datadog Agent
kind: guide
further_reading:
- link: 
  tags: 
  text: 
---

## Overview

This tutorial walks you through step by step enabling tracing on a Python application that is installed on a host. In this scenario, you install a Datadog Agent on the same host as the application. 

For other scenarios, including applications in containers, Agent in containers, and applications written in other languages, see the other [Enabling Tracing tutorials][1].

For general comprehensive tracing setup documentation for Python, see [Tracing Python Applications][2].

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][3] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][4]:

{{< code-block lang="bash" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [the site that you use][5].

If you have an Agent already installed on the host, ensure it is at least version 7.28. The minimum version of Datadog Agent required to use `ddtrace` to trace Python applications is documented in the [tracing library developer docs][6].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][7], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

## Install a Python application

## Enable Datadog tracing

## Launch the Python application with automatic instrumentation

## Add custom instrumentation to the Python application

## Add a second application to see distributed traces

## Add more custom instrumentation

## Explore the Datadog UI

## Additional `ddtrace` configuration options


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/python/
[3]: https://app.datadoghq.com/account/settings#agent/overview
[4]: /account_management/api-app-keys/
[5]: /getting_started/site/
[6]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[7]: https://app.datadoghq.com/event/explorer
