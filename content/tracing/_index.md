---
title: APM (Tracing)
kind: Documentation
description: Instrument your code to improve performance
further_reading:
- link: "/tracing/setup"
  tag: "Documentation"
  text: Instrument your code
- link: "/tracing/services"
  tag: "Documentation"
  text: Analyse your services
---

## Overview

Datadog's integrated APM tool eliminates the traditional separation between infrastructure and application performance monitoring. This not only provides greater visibility, but also allows you to see the relationship between application code and the underlying infrastructure.

Datadog APM is offered as an upgrade to our Pro and Enterprise plans. A free 14-day trial is available.
Registered users can visit the [APM page of the Datadog application](https://app.datadoghq.com/apm/home) to get started.

## Getting started

To understand how tracing work, let's take the following example:

{{< img src="tracing/tracing_overview_GS.jpg" alt="Tracing getting started overview" responsive="true" popup="true">}}

Which have then following behavior:

* Request:  
    .  
    ```bash
    curl 'localhost:5000/think/?subject=technology&subject=foo_bar'
    ```

* Response:  
    .  
    ```json
    {
        "technology": {
            "error": false,
            "quote": "For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.",
            "author": "Richard Feynman"
        },
        "foo_bar": {
            "error": true,
            "reason": "Subject unknown"
        }
    }
    ```

<!---
[Find the complete demo project on our github]()

We need to opensource workshop code
-->

We have two modules:

* **Thinker API**: Catches the user request and forward it to *Thinker-microservice*  
    .  
    ```python
    import blinker as _
    import requests

    from flask import Flask, Response
    from flask import jsonify
    from flask import request as flask_request

    from ddtrace import tracer
    from ddtrace.contrib.flask import TraceMiddleware

    ## Configuring Datadog tracer
    app = Flask('API')
    traced_app = TraceMiddleware(app, tracer, service='thinker-api')

    @app.route('/think/')
    def think_handler():
        thoughts = requests.get('http://thinker:8000/', headers={
            'x-datadog-trace-id': str(tracer.current_span().trace_id),
            'x-datadog-parent-id': str(tracer.current_span().span_id),
        }, params={
            'subject': flask_request.args.getlist('subject', str),
        }).content
        return Response(thoughts, mimetype='application/json')

    ```

* **Thinker Microservice**: Takes a request with a subject and answer a thought  
    .  
    ```python
    import asyncio

    from aiohttp import web
    from ddtrace import tracer
    from ddtrace.contrib.aiohttp import trace_app

    app = web.Application()
    app.router.add_get('/', handle)

    trace_app(app, tracer, service='thinker-microservice')
    app['datadog_trace']['distributed_tracing_enabled'] = True

    @tracer.wrap(name='think')
    async def think(subject):
        tracer.current_span().set_tag('subject', subject)

        await asyncio.sleep(0.5)
        return thoughts[subject]

    thoughts = {
        'technology': Thought(
            quote='For a successful technology, reality must take precedence over public relations, for Nature cannot be fooled.',
            author='Richard Feynman',
        ),
    }

    async def handle(request):
        response = {}
        for subject in request.query.getall('subject', []):
            await asyncio.sleep(0.2)
            try:
                thought = await think(subject)
                response[subject] = {
                    'error': False,
                    'quote': thought.quote,
                    'author': thought.author,
                }
            except KeyError:
                response[subject] = {
                    'error': True,
                    'reason': 'Subject unknown'
                }

        return web.json_response(response)
    ```

After having [instrumented your application and configure the Datadog Agent](/tracing/setup) we can see the two services: **thinker-api** and **thinker-microservice** reporting in [Datadog services list](/tracing/services):

{{< img src="tracing/services_GS.png" alt="Services list getting started" responsive="true" popup="true">}}

Clicking on **thinker-api** service, leads you to its dedicated [service page](/tracing/services/service), where there is [out-of-the-box graphs with your service performances](/tracing/services/service/#out-of-the-box-graphs) and the list of your service [resources](/tracing/services/resource):

{{< img src="tracing/resources_thinker_api_GS.png" alt="Resources thinker api getting started" responsive="true" popup="true">}}

Selecting the **thinker_handler** resource, brings you to its dedicated [resource page](/tracing/services/resource), where there is [out-of-the-box graphs with your resource performances](/tracing/services/resource/#out-of-the-box-graphs) and the list of traces attached to it:

{{< img src="tracing/traces_thinker_api_GS.png" alt="traces thinker api getting started" responsive="true" popup="true" style="width:50%;">}}

Selecting a [trace](/tracing/services/trace) shows you the time spent by your application processing your two `think` : **technology** and **foo_bar** by measuring the total time needed by `flask.request` to be completed:

{{< img src="tracing/trace_thinker_api_GS.png" alt="trace thinker api getting started" responsive="true" popup="true" style="width:80%;">}}

On the previous image, we can see how our request is first received by the **thinker-api** service with the `flask.request` [span](/tracing/services/trace), which then transmit it to the **thinker-microservice** service that execute the function `think` two times.  

In our code we added:
```
tracer.current_span().set_tag('subject', subject)
```

Which allows us to give us more context:

* The first time `think` is executed, the *subject* is **technology** and everything goes well:
    {{< img src="tracing/traces_thinker_mircroservice_GS_1.png" alt="Thinker microservice getting started 1" responsive="true" popup="true">}}

* The second time `think` is executed, the *subject* is **foo_bar** which is not an expected value and leads to an error.
    {{< img src="tracing/traces_thinker_mircroservice_GS_2.png" alt="Thinker microservice getting started 2" responsive="true" popup="true">}}

    The specific display of this error is achieved automatically by the Datadog instrumentation, but you can override it with [special meaning tags rules](/tracing/services/trace/#traces-special-meaning-tags)

## Additional resources

For additional help from Datadog staff and other Datadog community members, please:

* Join the [*apm* channel](https://datadoghq.slack.com/messages/apm) in our Datadog Slack. 
* Reach our APM team via email at [tracehelp@datadoghq.com](mailto:tracehelp@datadoghq.com).
