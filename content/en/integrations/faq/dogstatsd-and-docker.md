---
title: DogStatsD and Docker
kind: faq
---

Datadog has a large number of [integrations with common applications][1], but it can also be used to instrument your custom applications. This is typically using one of the many [Datadog libraries][2].

Libraries that communicate over HTTP using the [Datadog API][3] don't require any special configuration with regard to Docker. However, applications using libraries that integrate with DogStatsD or StatsD need the library configured to connect with the Agent. Each library handles this configuration differently, so refer to the individual library's documentation for more details.

After your code is configured, run your custom application container using [the `--link` option][4] to create a network connection between your application container and the Datadog Agent container.

##### Example: Monitoring a basic Python application

To monitor your application, run the Datadog container using the [Basic Docker Agent usage][5] instructions. The `docker run` command sets the name of the container to `dd-agent`.

Next, instrument your code. Here's a basic Flask-based web application:

```python
from flask import Flask
from datadog import initialize, statsd

# Initialize DogStatsD and set the host.
initialize(statsd_host = 'dd-agent')

app = Flask(__name__)

@app.route('/')
def hello():
    # Increment a Datadog counter.
    statsd.increment('my_webapp.page.views')

    return "Hello World!"

if __name__ == "__main__"
    app.run()
```

In our example code above, the DogStatsD host must match the Datadog Agent container name, `dd-agent`.

After building the web application container, run it and use the `--link` argument to setup a network connection to the Datadog Agent container:

```text
docker run -d --name my-web-app \
    --link dd-agent:dd-agent
    my-web-app
```

For another example using DogStatsD, see our [Docker Compose example project on GitHub][6].

[1]: /integrations
[2]: /developers/libraries
[3]: /api
[4]: https://docs.docker.com/engine/reference/run/#expose-incoming-ports
[5]: /agent/docker/#how-to-run-it
[6]: https://github.com/DataDog/docker-compose-example
