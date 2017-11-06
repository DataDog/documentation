---
title: I want my application deployed in a container through ElasticBeanstalk to talk to DogStatsD
kind: faq
customnav: developersnav
---

Beanstalk allows to deploy only a single container per instance and doesn't support docker links as well.

Thus it is not obvious how to have your application talk to DogStatsD when deploying it on AWS via Elastic Beanstalk.

We suggest you the following workaround:

1. expose the dogstatsd port when you run the dd-agent container.
2. use the docker bridge ip address to send data from within a container to this port.

More details on achieving that kind of network traffic can be found here :

http://blog.michaelhamrah.com/2014/06/accessing-the-docker-host-server-within-a-container/
This is not an optimal solution but this should work just fine.

Also if you are going with this solution, putting dd-agent inside a container is not really necessary, you could simply put it on the docker host by following the regular instructions https://www.datadoghq.com/blog/deploy-datadog-aws-elastic-beanstalk/