---
title: I want my application deployed in a container through ElasticBeanstalk to talk to DogStatsD
kind: faq
---

Beanstalk allows to deploy only a single container per instance and doesn't support docker links as well.

Thus it is not obvious how to have your application talk to [DogStatsD server][1] when deploying it on AWS via Elastic Beanstalk.

We suggest you the following workaround:

1. expose the [DogStatsD server][1] port when you run the `dd-agent` container.
2. use the docker bridge ip address to send data from within a container to this port.

More details on achieving that kind of network traffic can be found here :

http://blog.michaelhamrah.com/2014/06/accessing-the-docker-host-server-within-a-container/
This is not an optimal solution but this should work just fine.

Also if you are going with this solution, putting `dd-agent` inside a container is not really necessary, put it on the docker host by following the regular instructions https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk/

[1]: /developers/dogstatsd
