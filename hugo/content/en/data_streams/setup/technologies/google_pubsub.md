---
title: Data Streams Monitoring for Google Pub/Sub 
---

### Prerequisites

* [Datadog Agent v7.34.0 or later][1]

| Language     | Library                                                                                        | Minimal tracer version                                                            | Recommended tracer version                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [Java][2]    | [google-cloud/pubsub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub) | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="minimal" >}}         | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="recommended" >}}         |
| [Node.js][3] | [google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)                      | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="minimal" >}} | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="recommended" >}} |
| [Python][4]  | [google-cloud-pubsub](https://pypi.org/project/google-cloud-pubsub/)                           | {{< dsm-tracer-version lang="python" lib="google-cloud-pubsub" type="minimal" >}} | {{< dsm-tracer-version lang="python" lib="google-cloud-pubsub" type="recommended" >}} |

### Setting up Data Streams Monitoring
See setup instructions for [Java][2], [Node.js][3], or [Python][4].


[1]: /agent
[2]: /data_streams/setup/language/java
[3]: /data_streams/setup/language/nodejs
[4]: /data_streams/setup/language/python