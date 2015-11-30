---
title: Datadog-Google App Engine Integration
integration_title: Google App Engine
kind: integration
---


### Overview

Install the Google App Engine integration in your Python project to:

* See your Google App Engine services metrics: memcache, task queues, datastores
* See metrics about requests: display percentiles, latency, cost
* Tag Google App Engine metrics by version and compare the performance of different versions

You can also send custom metrics to Datadog.


### Installation

Ensure that Billing is enabled on your Google App Engine project to collect all metrics

1. Change directory into to your project's application directory.
2. Clone our Google App Engine module

        git clone https://github.com/DataDog/gae_datadog
{: .lang-shell}

3. Edit your project's app.yaml file

    a. Add the Datadog handler to your app.yaml file:

        handlers:
          # Should probably be at the beginning of the list
          # so it's not clobbered by a catchall route
          - url: /datadog
            script: gae_datadog.datadog.app
    {: .lang-yaml}


    b. Set your API key. This should be at the top level of the file and not in the handler section.

        env_variables:
          DATADOG_API_KEY: 'YOUR_API_KEY_HERE'

    c. Since the dogapi module sends metrics and events through a secure TLS connection, add the ssl module in the app.yaml:

        libraries:
          - name: ssl
            version: "latest"

4. Add ```dogapi``` to the requirements.txt file.

        echo "dogapi" >> requirements.txt

5. Ensure the requirements are installed.

        pip install -r requirements.txt -t lib/

6. Deploy your application. Refer to the Google App Engine documentation for language specific deployment command. For Python apps, it's:

        appcfg.py -A <project id> update app.yaml

7. Enter the URL for your application in the first text box on the integration configuration screen. If you are using Task queues in the Google Developers Console, you can add them here as well.

At this point you will get a number of metrics for your environment. You can also choose to further instrument your app using the library for whatever language your app is written in.

For Python apps, you might use the dogapi library. Here is the Getting Started Flask-based Python app, modified to increment a counter each time the main page has been hit:


    """`main` is the top level module for your Flask application."""
    import os

    # Import the Flask Framework
    from flask import Flask
    app = Flask(__name__)
    # Note: We don't need to call run() since our application is embedded within
    # the App Engine WSGI application server.

    from dogapi import dog_stats_api as dog
    dog.start(
        api_key=os.environ['DATADOG_API_KEY'],
        flush_in_thread=False
    )

    @app.route('/')
    def hello():
        """Return a friendly HTTP greeting."""
        dog.increment('testapp.metric', 1)
        dog.flush()
        return 'Hello World dd!'

    @app.errorhandler(404)
    def page_not_found(e):
        """Return a custom 404 error."""
        return 'Sorry, Nothing at this URL.', 404


    @app.errorhandler(500)
    def application_error(e):
        """Return a custom 500 error."""
        return 'Sorry, unexpected error: {}'.format(e), 500
{:.lang-python}

### Metrics

Upon installation of the integration you get a number of metrics before instrumenting your app.

* gae.memcache.byte_hits
* gae.memcache.bytes
* gae.memcache.hits
* gae.memcache.items
* gae.memcache.misses
* gae.memcache.oldest_item_age
* gae.requests.cost.95percentile
* gae.requests.cost.avg
* gae.requests.cost.count
* gae.requests.cost.max
* gae.requests.cost.min
* gae.requests.latency.95percentile
* gae.requests.latency.avg
* gae.requests.latency.count
* gae.requests.latency.max
* gae.requests.latency.min
* gae.requests.mcycles.95percentile
* gae.requests.mcycles.avg
* gae.requests.mcycles.count
* gae.requests.mcycles.max
* gae.requests.mcycles.min
* gae.requests.pending_time.95percentile
* gae.requests.pending_time.avg
* gae.requests.pending_time.count
* gae.requests.pending_time.max
* gae.requests.pending_time.min
* gae.requests.response_size.95percentile
* gae.requests.response_size.avg
* gae.requests.response_size.count
* gae.requests.response_size.max
* gae.requests.response_size.min
* gae.task_queue.tasks


-------------------------

*This documentation verified on November 3, 2015*
