---
title: Tutorial - Enabling Tracing for a Python Application on the Same Host as Datadog Agent
kind: guide
further_reading:
- link: 
  tags: 
  text: 
---

## Overview

This tutorial walks you through step by step enabling tracing on a sample Python application that is installed on a host. In this scenario, you install a Datadog Agent on the same host as the application. 

For other scenarios, including applications in containers, Agent in a container, and applications written in other languages, see the other [Enabling Tracing tutorials][1].

For general comprehensive tracing setup documentation for Python, see [Tracing Python Applications][2].

### Prerequisites

- A Datadog account and Organization API key.
- Git
- Python

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][3] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][4]:

{{< code-block lang="bash" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [the site that you use][5].

If you have an Agent already installed on the host, ensure it is at least version 7.28. The minimum version of Datadog Agent required to use `ddtrace` to trace Python applications is documented in the [tracing library developer docs][6].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][7], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>
 

## Install and run a sample Python application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/Datadog/tutorial-apm-python-host][8]. Clone the git repository by running:

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/apm-tutorial-python-host.git 
{{< /code-block >}}

Setup, configure, and install Python dependencies for the sample using either Poetry or pip. Run one of the following:

{{% tabs %}}

{{< tab "Poetry" >}}

```bash
poetry install
```

{{< /tab >}}

{{< tab "pip" >}}

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

{{< /tab >}}

{{% /tabs %}}

Start the application by running:

{{< code-block lang="bash" >}}
python -m notes_app.app
{{< /code-block >}}

The sample `notes_app` application is a basic REST API that stores data in an in-memory database. Open another terminal and send a few API requests:

`curl -X GET 'localhost:8080/notes'`
: Returns `{}` because there is nothing in the database yet

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Adds a note with the description `hello` and an ID value of `1`.

`curl -X GET 'localhost:8080/notes?id=1'`
: Returns the note with `id` value of `1`: `{ "1": "hello" }`

`curl -X POST 'localhost:8080/notes?desc=otherNote`
: Adds a note with the description `otherNote` and an ID value of `2`.

`curl -X GET 'localhost:8080/notes'`
: Returns the contents of the database: `{ "1": "hello", "2": "otherNote" }`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: Updates the description value for the first note to `UpdatedNote`.

`curl -X DELETE 'localhost:8080/notes?id=1'`
: Removes the first note from the database.

Run more API calls to see the application in action. When you're done, type Ctrl+C to stop the application.

## Enable Datadog tracing

Next, install the tracing library.

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
[8]: https://github.com/Datadog/tutorial-apm-python-host
