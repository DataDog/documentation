---
title: Tutorial - Enabling Tracing for a Python Application on the Same Host as the Datadog Agent
kind: guide
further_reading:
- link: /tracing/trace_collection/library_config/python/
  tags: Documentation
  text: Additional tracing library configuration options
- link: /tracing/trace_collection/dd_libraries/python/
  tags: Documentation
  text: Detailed tracing library setup instructions
- link: /tracing/trace_collection/compatibility/python/
  tags: Documentation
  text: Supported Python frameworks for automatic instrumentation
- link: /tracing/trace_collection/custom_instrumentation/python/
  tags: Documentation
  text: Manually configuring traces and spans
- link: https://github.com/DataDog/dd-trace-py
  tags: GitHub
  text: Tracing library open source code repository
---

## Overview

This tutorial walks you through the steps for enabling tracing on a sample Python application installed on a host. In this scenario, you install a Datadog Agent on the same host as the application. 

For other scenarios, including applications in containers, Agent in a container, and applications written in different languages, see the other [Enabling Tracing tutorials][1].

See [Tracing Python Applications][2] for general comprehensive tracing setup documentation for Python.

### Prerequisites

- A Datadog account and [organization API key][3]
- Git
- Python that meets the [tracing library requirements][4]

## Install the Agent

If you haven't installed a Datadog Agent on your machine, go to [**Integrations > Agent**][5] and select your operating system. For example, on most Linux platforms, you can install the Agent by running the following script, replacing `<YOUR_API_KEY>` with your [Datadog API key][3]:

{{< code-block lang="bash" >}}
DD_AGENT_MAJOR_VERSION=7 DD_API_KEY=<YOUR_API_KEY> DD_SITE="datadoghq.com" bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script.sh)"
{{< /code-block >}}

To send data to a Datadog site other than `datadoghq.com`, replace the `DD_SITE` environment variable with [your Datadog site][6].

If you have an Agent already installed on the host, ensure it is at least version 7.28. The minimum version of Datadog Agent required to use `ddtrace` to trace Python applications is documented in the [tracing library developer docs][7].

Verify that the Agent is running and sending data to Datadog by going to [**Events > Explorer**][8], optionally filtering by the `Datadog` Source facet, and looking for an event that confirms the Agent installation on the host:

{{< img src="tracing/guide/tutorials/tutorial-python-host-agent-verify.png" alt="Event Explorer showing a message from Datadog indicating the Agent was installed on a host." style="width:70%;" >}}

<div class="alert alert-info">If after a few minutes you don't see your host in Datadog (under <strong>Infrastructure > Host map</strong>), ensure you used the correct API key for your organization, available at <a href="https://app.datadoghq.com/organization-settings/api-keys"><strong>Organization Settings > API Keys</strong></a>.</div>
 

## Install and run a sample Python application

Next, install a sample application to trace. The code sample for this tutorial can be found at [github.com/Datadog/apm-tutorial-python][9]. Clone the git repository by running:

{{< code-block lang="bash" >}}
git clone https://github.com/DataDog/apm-tutorial-python.git
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

The sample `notes_app` application is a basic REST API that stores data in an in-memory database. Open another terminal and use `curl` to send a few API requests:

`curl -X GET 'localhost:8080/notes'`
: Returns `{}` because there is nothing in the database yet

`curl -X POST 'localhost:8080/notes?desc=hello'`
: Adds a note with the description `hello` and an ID value of `1`. Returns `( 1, hello)`.

`curl -X GET 'localhost:8080/notes?id=1'`
: Returns the note with `id` value of `1`: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=otherNote'`
: Adds a note with the description `otherNote` and an ID value of `2`. Returns `( 2, otherNote)`

`curl -X GET 'localhost:8080/notes'`
: Returns the contents of the database: `{ "1": "hello", "2": "otherNote" }`

`curl -X PUT 'localhost:8080/notes?id=1&desc=UpdatedNote'`
: Updates the description value for the first note to `UpdatedNote`.

`curl -X DELETE 'localhost:8080/notes?id=1'`
: Removes the first note from the database.

Run more API calls to see the application in action. When you're done, type Ctrl+C to stop the application.

## Install Datadog tracing

Next, install the tracing library by using Poetry or pip (minimum version 18). From your `apm-tutorial-python` directory, run:

{{% tabs %}}

{{< tab "Poetry" >}}

```bash
poetry add ddtrace
poetry install

```

{{< /tab >}}

{{< tab "pip" >}}

```bash
pip install ddtrace
```

{{< /tab >}}

{{% /tabs %}}

## Launch the Python application with automatic instrumentation

To start generating and collecting traces, restart the sample application in a slightly different way than previously. Run:

{{< code-block lang="bash" >}}DD_SERVICE=notes DD_ENV=dev DD_VERSION=0.1.0 \
 ddtrace-run python -m notes_app.app{{< /code-block >}}

That command sets the `DD_SERVICE`, `DD_VERSION`, and `DD_ENV` environment variables to enable [Unified Service Tagging][10], enabling data correlation across Datadog.

Use `curl` to again send requests to the application:

`curl -X GET 'localhost:8080/notes'`
: `{}`

`curl -X POST 'localhost:8080/notes?desc=hello'`
: `( 1, hello)`

`curl -X GET 'localhost:8080/notes?id=1'`
: `( 1, hello)`

`curl -X POST 'localhost:8080/notes?desc=newNote'`
: `( 2, newNote)`

`curl -X GET 'localhost:8080/notes'`
: `{ “1”: “hello”, “2”: “newNote” }`

Wait a few moments, and take a look at your Datadog UI. Navigate to [**APM > Traces**][11]). The Traces list shows something like this:

{{< img src="tracing/guide/tutorials/tutorial-python-host-traces.png" alt="Traces view shows trace data coming in from host." style="width:100%;" >}}

If you don't see traces, clear any filter in the Traces Search field (sometimes it filters on an environment variable such as `ENV` that you aren't using).

### Examine a trace

In the Traces page, click on a `POST /notes` trace and you'll see a flame graph that shows how long each span took and what other spans occurred before a span completed. The bar at the top of the graph is the span you selected on the previous screen (in this case, the initial entry point into our notes application). 

The width of a bar indicates how long it took to complete. A bar at a lower depth represents a span that completes during the lifetime of a bar at a higher depth. 

The flame graph for a `POST` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-python-host-post-flame.png" alt="A flame graph for a POST trace." style="width:100%;" >}}

A `GET /notes` trace looks something like this:

{{< img src="tracing/guide/tutorials/tutorial-python-host-get-flame.png" alt="A flame graph for a GET trace." style="width:100%;" >}}


## Add custom instrumentation to the Python application

While automatic instrumentation is convenient, sometimes you want more fine-grained spans. Datadog's Python DD Trace API allows you to specify spans within your code using annotations or code.

The following steps walk you through adding annotations to the code to trace some sample methods.

1. Open `notes_app/notes_helper.py`.
2. Add the following import:
   {{< code-block lang="python" >}}
from ddtrace import tracer{{< /code-block >}}

3. Inside the `NotesHelper` class, add a tracer wrapper called `notes_helper` to better see how the `notes_helper.long_running_process` method works:
   {{< code-block lang="python" >}}class NotesHelper:

    @tracer.wrap(service="notes_helper")
    def long_running_process(self):
        time.sleep(.3)
        logging.info("Hello from the long running process")
        self.__private_method_1(){{< /code-block >}}

    Now, the tracer automatically labels the resource with the function name it is wrapped around, in this case, `long_running_process`.

4. Resend some HTTP requests, specifically some `GET` requests.
5. On the Trace Explorer, click into one of the new `GET` requests, and see a flame graph like this:

   {{< img src="tracing/guide/tutorials/tutorial-python-host-custom-flame.png" alt="A flame graph for a GET trace with custom instrumentation." style="width:100%;" >}}
   
   Note the higher level of detail in the stack trace now that the `get_notes` function has custom tracing.

For more information, read [Custom Instrumentation][12].

## Add a second application to see distributed traces

Tracing a single application is a great start, but the real value in tracing is seeing how requests flow through your services. This is called _distributed tracing_. 

The sample project includes a second application called `calendar_app` that returns a random date whenever it is invoked. The `POST` endpoint in the Notes application has a second query parameter named `add_date`. When it is set to `y`, Notes calls the calendar application to get a date to add to the note.

1. Start the calendar application by running:

   {{< code-block lang="bash" >}}
DD_SERVICE=calendar DD_ENV=dev DD_VERSION=0.1.0 \
ddtrace-run python -m calendar_app.app
   {{< /code-block >}}

2. Send a POST request with the `add_date` parameter:

`curl -X POST 'localhost:8080/notes?desc=hello_again&add_date=y'`
: `(2, hello_again with date 2022-11-06)`


3. In the Trace Explorer, click this latest trace to see a distributed trace between the two services:

   {{< img src="tracing/guide/tutorials/tutorial-python-host-distributed.png" alt="A flame graph for a distributed trace." style="width:100%;" >}}

## Add more custom instrumentation

You can add custom instrumentation by using code. Suppose you want to further instrument the calendar service to better see the trace:

1. Open `notes_app/notes_logic.py`. 
2. Add the following import

   ```python
   from ddtrace import tracer
   ```
3. Inside the `try` block, at about line 28, add the following `with` statement:

   ```python
   with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
   ```
   Resulting in this:
   {{< code-block lang="python" >}}
def create_note(self, desc, add_date=None):
        if (add_date):
            if (add_date.lower() == "y"):
                try:
                    with tracer.trace(name="notes_helper", service="notes_helper", resource="another_process") as span:
                        self.nh.another_process()
                    note_date = requests.get(f"http://localhost:9090/calendar")
                    note_date = note_date.text
                    desc = desc + " with date " + note_date
                    print(desc)
                except Exception as e:
                    print(e)
                    raise IOError("Cannot reach calendar service.")
        note = Note(description=desc, id=None)
        note.id = self.db.create_note(note){{< /code-block >}}

4. Send more HTTP requests, specifically `POST` requests, with the `add_date` argument.
5. In the Trace Explorer, click into one of these new `POST` traces to see a custom trace across multiple services:
   {{< img src="tracing/guide/tutorials/tutorial-python-host-cust-dist.png" alt="A flame graph for a distributed trace with custom instrumentation." style="width:100%;" >}}
   Note the new span labeled `notes_helper.another_process`.

If you're not receiving traces as expected, set up debug mode in the `ddtrace` Python package. Read [Enable debug mode][13] to find out more.


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/guide/#enabling-tracing-tutorials
[2]: /tracing/trace_collection/dd_libraries/python/
[3]: /account_management/api-app-keys/
[4]: /tracing/trace_collection/compatibility/python/
[5]: https://app.datadoghq.com/account/settings#agent/overview
[6]: /getting_started/site/
[7]: https://ddtrace.readthedocs.io/en/stable/versioning.html
[8]: https://app.datadoghq.com/event/explorer
[9]: https://github.com/DataDog/apm-tutorial-python
[10]: /getting_started/tagging/unified_service_tagging/#non-containerized-environment
[11]: https://app.datadoghq.com/apm/traces
[12]: /tracing/trace_collection/custom_instrumentation/python/
[13]: /tracing/troubleshooting/tracer_debug_logs/#enable-debug-mode
