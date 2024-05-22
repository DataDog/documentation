---
aliases:
- /fr/agent/faq/why-should-i-install-the-agent-on-my-aws-instances/
- /fr/integrations/faq/why-is-my-aws-error-count-metric-orders-of-magnitude-lower-in-datadog-than-cloudwatch/
- /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
further_reading:
- link: /integrations/guide/cloud-metric-delay/
  tag: Guide
  text: Délai de réception des métriques cloud
kind: guide
title: Pourquoi installer l'Agent Datadog sur mes instances cloud ?
---

Si vous utilisez AWS, Azure, Google Cloud ou un autre fournisseur de métriques cloud, l'installation de l'Agent Datadog sur vos instances vous permet de bénéficier de nombreux avantages, notamment ce qui suit :

* **Meilleure résolution** : les fournisseurs cloud analysent l'activité externe en échantillonnant des hosts toutes les 5 à 25 minutes. En outre, AWS fournit des métriques toutes les minutes par l'intermédiaire de son API. Puisque l'intégralité des métriques Datadog est stockée avec une résolution d'une seconde, ces métriques sont divisées par 60 lors du post-processing. L'Agent Datadog récupère toutes les 15 secondes des statistiques sur les performances, afin de comprendre précisément ce qu'observent les hosts.

* **Métriques exposées** : par défaut, Datadog active plus de 50 métriques. Il est possible d'ajouter des métriques supplémentaires grâce à des intégrations Datadog liées à différentes applications.

* **Intégrations** : ces outils permettent de renforcer facilement les capacités de l'Agent Datadog, afin de ne pas analyser uniquement les métriques natives. Surveillez l'intégrité d'applications, l'utilisation de processus, etc. 

* **Métriques custom avec DogStatsD** : utilisez le client StatsD intégré conjointement à l'Agent Datadog afin d'envoyer des métriques custom à partir de votre application. Vous pourrez ainsi mettre en corrélation les performances de votre application, les comportements de vos utilisateurs et l'activité de votre système.

  {{< img src="agent/guide/Agent_VS_AWSA.jpg" alt="Comparaison entre l'Agent et AWS CloudWatch" style="width:70%;">}}

L'Agent Datadog est un outil léger et entièrement open source. Vous pouvez donc examiner son code et même y contribuer en envoyant une pull request.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}