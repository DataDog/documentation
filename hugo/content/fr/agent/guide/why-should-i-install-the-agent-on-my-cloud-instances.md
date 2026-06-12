---
aliases:
- /fr/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /fr/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
description: Ce guide décrit les avantages découlant de l'installation de l'Agent
  Datadog sur des instances dans le cloud, notamment une résolution améliorée, un
  plus grand nombre de métriques, de nouvelles intégrations et des capacités de surveillance
  personnalisées.
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: Guide
  text: Délai de réception des métriques cloud
title: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
---

L'Agent Datadog est un logiciel qui s'exécute sur vos hosts. Il recueille les événements et les métriques des hosts et les envoie à la plateforme Datadog, à partir de laquelle vous pouvez analyser vos données de surveillance et de performance. L'Agent Datadog est open source et son code source est disponible sur GitHub dans [DataDog/datadog-agent][1].

Si vous utilisez AWS, Azure, Google Cloud ou un autre fournisseur de métriques cloud, l'installation de l'Agent Datadog sur vos instances vous permet de bénéficier de nombreux avantages, notamment ce qui suit :

* **Meilleure résolution** : les fournisseurs cloud surveillent vos hosts de façon externe en les échantillonnant toutes les 5 à 25 minutes. De plus, AWS fournit des métriques toutes les minutes par l'intermédiaire de son API. Puisque l'intégralité des métriques est stocké par Datadog avec une résolution d'une seconde, une moyenne sur 60 secondes est calculée pour les métriques AWS après leur traitement. Pour bénéficier d'insights plus précises sur les performances des hosts, l'Agent Datadog recueille des statistiques de performance toutes les 15 secondes. Vous pouvez ainsi visualiser précisément ce qui se passe au niveau de vos hosts.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Comparaison entre l'Agent et AWS CloudWatch" style="width:70%;">}}

* **Métriques exposées** : par défaut, Datadog active plus de 50 métriques. Il est possible d'ajouter des métriques supplémentaires grâce à des [intégrations][2] Datadog propres à différentes applications.

* **Intégrations** : plus de [{{< translate key="integration_count" >}} intégrations][2] viennent accroître les fonctionnalités de l'Agent Datadog, en plus des métriques natives.

* **Tagging cohérent entre les différents services** : les tags appliqués au niveau de l'Agent sont ajoutés à l'ensemble des métriques, logs et traces transmis par l'Agent.

* **Métriques custom avec DogStatsD** : utilisez le [client StatsD][4] intégré conjointement à l'Agent Datadog afin d'envoyer des métriques custom à partir de votre application. Vous pourrez ainsi mettre en corrélation les performances de votre application, les comportements de vos utilisateurs et l'activité de votre système.

* **Checks d'Agent custom** : pour personnaliser encore plus votre surveillance, exécutez des [checks d'Agent custom][5] afin de recueillir des métriques et d'autres données à partir de vos systèmes ou applications personnalisés et de les envoyer à Datadog.

* **Logs d'application** : l'Agent Datadog [recueille et transmet des logs d'application créés localement][6] à propos de vos VM ou de vos conteneurs dans le cloud. Il n'est donc pas nécessaire de passer par l'intégration du fournisseur cloud. Ces logs comportent également des tags au niveau de l'Agent.

* **Application Performance Monitoring (APM)** : [les traces recueillies par l'intermédiaire de l'Agent][4] offrent une visibilité complète sur vos applications, ce qui vous aide à mieux comprendre les performances de vos services de bout en bout et à identifier les potentiels goulots d'étranglement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-agent
[2]: https://docs.datadoghq.com/fr/integrations/
[3]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=hostagent
[4]: https://docs.datadoghq.com/fr/tracing/
[5]: https://docs.datadoghq.com/fr/developers/custom_checks/
[6]: https://docs.datadoghq.com/fr/agent/logs/?tab=tailfiles