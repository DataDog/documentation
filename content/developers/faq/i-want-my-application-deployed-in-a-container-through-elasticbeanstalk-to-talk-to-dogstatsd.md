---
title: I want my application deployed in a container through Elastic Beanstalk to talk to DogStatsD
kind: faq
---

Beanstalk allows you to deploy only a single container per instance, and it also doesn't support Docker links.

Thus, it is not obvious how to have your application talk to the [DogStatsD server][1] when deploying it on AWS via Elastic Beanstalk.

Datadog suggests the following workaround:

1. Expose the [DogStatsD server][1] port when you run the `dd-agent` container.
2. Use the Docker bridge IP address to send data from within a container to this port.

[See this external blog post][2] for more details on achieving this type of network traffic.

If you choose to follow this workaround, putting `dd-agent` inside a container is not necessary. Put it on the Docker host by following the [instructions in this Datadog blog post][3].

[1]: /developers/dogstatsd
[2]: http://blog.michaelhamrah.com/2014/06/accessing-the-docker-host-server-within-a-container/
[3]: https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk/
