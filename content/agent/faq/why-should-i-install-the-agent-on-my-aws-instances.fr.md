---
title: Pourquoi devrais-je installer l'Agent Datadog sur mes instances AWS?
kind: faq
---


Si vous utilisez AWS CloudWatch ou un autre fournisseur de métriques basé sur le cloud, vous pouvez déjà obtenir des statistiques pour vos hosts. Toutefois, l'installation de l'agent Datadog sur ces hosts vous apporte un certain nombre d'avantages, notamment:

* **Better resolution** - CloudWatch observes what's happening from the outside by sampling hosts every ~5-25 minutes, whereas the Datadog Agent captures performance statistics every 15 seconds to provide a more accurate understanding of what's happening from the hosts' perspective.

* **Exposed metrics** - AWS only exposes 10+ metrics for EC2 instances, so you'll miss critical KPI's such as memory, disk utilization, swap, network errors, etc. Datadog has over 50 metrics enabled by default. More metrics may be added with Datadog's application-specific integrations.

* **Integrations** - These make it simple to extend our Agent beyond the native metrics so you easily monitor application health, process utilization, and more.

* **Métriques personnalisées avec DogStatsD** - Avec l'Agent Datadog, utilisez le client StatsD intégré pour envoyer des métriques personnalisées à partir de votre application, ce qui facilite la corrélation entre ce qui se passe entre votre application, vos utilisateurs et votre système.{{< img src="agent/faq/Agent_VS_AWSA.jpg" alt="Agent vs AWSA" responsive="true" popup="true" style="width:40%;">}}

The Datadog Agent is lightweight and fully open source, so you can review the code and even contribute by making a pull request.

Also reference this article if you suspect you're seeing [latency reporting AWS metrics][1].

[1]: /integrations/faq/are-my-aws-cloudwatch-metrics-delayed
