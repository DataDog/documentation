---
title: Distributed Tracing
kind: faq
further_reading:
- link: "/tracing/setup/"
  tag: "Documentation"
  text: Learn how to setup APM tracing with your application
- link: "/tracing/services/"
  tag: "Documentation"
  text: Discover the list of services reporting to Datadog
- link: "/tracing/services/service"
  tag: "Documentation"
  text: Learn more about services in Datadog
- link: "/tracing/services/resource"
  tag: "Documentation"
  text: Dive into your resource performances and traces
- link: "/tracing/services/trace"
  tag: "Documentation"
  text: Understand how to read a Datadog Trace
---

If you have read the [first example of tracing](/tracing) and want to more deeply understand how tracing works, let's take the following example which represents a simple API **thinker-api** and a micro-service behind it **thinker-microservice**. When the API receives a request with the correct *subject* parameter, it responds with a *thought*, otherwise, it responds with an error:

{{< img src="tracing/product_specs/distributed_tracing/tracing_overview_GS.png" alt="Tracing getting started overview" responsive="true" popup="true" style="width:70%;">}}

* Request:
    ```bash
    curl 'localhost:5000/think/?subject=technology&subject=foo_bar'
    ```

* Response:
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

### Code used

We have two modules:

* **Thinker API**: Catches the users request and forwards it to the **thinker-microservice**
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

* **Thinker Microservice**: Takes a request from **thinker-api** with one or multiple *subjects* and answers with a *thought* if the *subject* is "technology":
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

The code above is already instrumented. Please [refer to the dedicated setup documentation](/tracing/setup) to learn how to instrument your application and configure the Datadog Agent.

### Datadog APM

Once the code is executed, we start to see data in [APM](https://app.datadoghq.com/apm/home). On the [Service List](/tracing/visualization/services_list/), our two services, **thinker-api** and **thinker-microservice**, have appeared with some metrics about their performance:

{{< img src="tracing/product_specs/distributed_tracing/services_GS.png" alt="Services list getting started" responsive="true" popup="true">}}

Clicking on **thinker-api** directs you to it's automatically generated [service dashboard](/tracing/visualization/service). Here we can see more detailed performance data, as well as a list of all of the resources associated with this particular service:

* [Graphs illustrating service performance](/tracing/visualization/service/#out-of-the-box-graphs)
* [A list of resources](/tracing/visualization/resource) attached to this particular service:

{{< img src="tracing/product_specs/distributed_tracing/resources_thinker_api_GS.png" alt="Resources thinker api getting started" responsive="true" popup="true" style="width:80%;">}}

The first function executed in this example is `think_handler()`, which handles the request and forwards it to the **thinker-microservice** service.

Selecting the **thinker_handler** resource directs you to it's automatically generated [resource dashboard](/tracing/visualization/resource) and a list of traces for this particular resource:

* [Graphs illustrating resource performances](/tracing/visualization/resource/#out-of-the-box-graphs)
* [A list of sampled traces](/tracing/getting_further/trace_sampling_and_storage) attached to this particular resource:

{{< img src="tracing/product_specs/distributed_tracing/traces_thinker_api_GS.png" alt="traces thinker api getting started" responsive="true" popup="true" style="width:50%;">}}

Selecting a trace opens the _trace panel_ containing information such as:

* The timestamp of the request
* The status of the request (i.e., `200`)
* The different services encountered by the request: (i.e., **thinker_hander** and **thinker-microservice**)
* The time spent by your application processing the traced functions
* Extra tags such as *http.method* and *http.url* ...

{{< img src="tracing/product_specs/distributed_tracing/trace_thinker_api_GS.png" alt="trace thinker api getting started" responsive="true" popup="true" style="width:80%;">}}

From the above image, we can see how the request is first received by the **thinker-api** service with the `flask.request` [span](/tracing/visualization/trace), which transmits the processed request to the **thinker-microservice** service, which executes the function `think()` twice.

In our code we added:
```
tracer.current_span().set_tag('subject', subject)
```

Which allows us to get more context every time `think()` is called and traced:

* The first time `think` is executed, the *subject* is **technology** and everything goes well:
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_1.png" alt="Thinker microservice getting started 1" responsive="true" popup="true" style="width:80%;">}}

* The second time `think` is executed, the *subject* is **foo_bar** which is not an expected value and leads to an error:
    {{< img src="tracing/product_specs/distributed_tracing/traces_thinker_mircroservice_GS_2.png" alt="Thinker microservice getting started 2" responsive="true" popup="true" style="width:80%;">}}

    The specific display of this error is achieved automatically by the Datadog instrumentation, but you can override it with [special meaning tag rules](/tracing/visualization/trace/#traces-special-meaning-tags).


The Datadog APM allows you to trace all interactions of a request with the different services and resources of any application.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}