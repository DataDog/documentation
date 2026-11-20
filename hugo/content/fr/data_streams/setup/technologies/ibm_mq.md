---
title: Data Streams Monitoring pour IBM MQ
---

### Prérequis

* [Agent Datadog v7.34.0 ou version ultérieure][1]

| Langage     | Bibliothèque                                                                                        | Version minimale du traceur                                                            | Version recommandée du traceur                                                            |
|--------------|------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|---------------------------------------------------------------------------------------|
| [.NET][2] | [IBMMQDotnetClient][3]           | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="minimal" >}}          | {{< dsm-tracer-version lang="dotnet" lib="ibmmqdotnetclient" type="recommended" >}}          |
| [Java][4]  | [Classes IBM MQ pour Java et JMS][5]  | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="minimal" >}}          | {{< dsm-tracer-version lang="java" lib="ibmmqjmsclient" type="recommended" >}}       |

### Limites
Pour les autres technologies de files d'attente, les traceurs Datadog ajoutent un en-tête de propagation de contexte aux messages. Cependant, la propagation de contexte pour IBM MQ est sujette aux erreurs, car des champs supplémentaires inattendus peuvent apparaître dans les messages. Afin d'éviter tout risque pour les services des clients, Datadog ne propage pas le contexte pour les traces IBM MQ.

En raison de cette limitation, la vue des parcours Data Streams Monitoring ne peut pas filtrer les messages IBM MQ selon le parcours en amont.

Les métriques de latence pour les parcours transitant entièrement par IBM MQ sont disponibles, bien qu'elles soient approximatives. Le débit des messages et la présence complète sur la carte de topologie Data Streams sont entièrement pris en charge.

### Configurer Data Streams Monitoring
Consultez les instructions de configuration pour [.NET][2] ou [Java][4].

[1]: /fr/agent
[2]: /fr/data_streams/setup/language/dotnet
[3]: https://www.nuget.org/packages/IBMMQDotnetClient
[4]: /fr/data_streams/setup/language/java
[5]: https://mvnrepository.com/artifact/com.ibm.mq/com.ibm.mq.jakarta.client