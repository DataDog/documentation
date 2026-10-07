---
title: Data Streams Monitoring pour Google Pub/Sub
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][1]

| Langage     | Bibliothèque                                                                                        | Version minimale du traceur                                                            | Version recommandée du traceur                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [Java][2]    | [google-cloud/pubsub](https://mvnrepository.com/artifact/com.google.cloud/google-cloud-pubsub) | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="minimal" >}}         | {{< dsm-tracer-version lang="java" lib="google-pubsub" type="recommended" >}}         |
| [Node.js][3] | [google-cloud/pubsub](https://www.npmjs.com/package/@google-cloud/pubsub)                      | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="minimal" >}} | {{< dsm-tracer-version lang="nodejs" lib="google-cloud-pubsub" type="recommended" >}} |

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [Java][2] ou [Node.js][3].


[1]: /fr/agent
[2]: /fr/data_streams/setup/language/java
[3]: /fr/data_streams/setup/language/nodejs