---
title: Producer and Consumer metrics don't appear in my Datadog application
kind: faq
---

By default we only collect broker based metrics. 

If you're running Java based Producers and Consumers, uncomment this section of the yaml file and point the Agent to the proper ports to start pulling in metrics:

```yaml
# - host: remotehost
    # port: 9998 # Producer
    # tags:
    # kafka: producer0
    # env: stage
    # newTag: test
    # - host: remotehost
    # port: 9997 # Consumer
    # tags:
    # kafka: consumer0
    # env: stage
    # newTag: test
```

If you are using custom Producer and Consumer clients that are not written in Java and/or not exposing mBeans, having this enabled would still collect zero metrics. To still submit your metrics from your code use [DogStatsD][1].

[1]: /developers/dogstatsd
