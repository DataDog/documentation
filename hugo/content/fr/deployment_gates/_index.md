---
algolia:
  tags:
  - cd gates
description: Réduisez les incidents de déploiement en évaluant automatiquement les
  monitors et les anomalies APM pour interrompre les mises en production lorsque des
  régressions de performance sont détectées.
further_reading:
- link: /deployment_gates/setup
  tag: Documentation
  text: Configurez Deployment Gates
- link: /deployment_gates/explore
  tag: Documentation
  text: En savoir plus sur l'explorer de portes de déploiement
- link: continuous_delivery
  tag: Documentation
  text: En savoir plus sur Continuous Delivery Visibility
- link: continuous_delivery/deployments
  tag: Documentation
  text: Découvrez comment configurer CD Visibility
title: Portes de déploiement
---
Deployment Gates vous permettent de réduire la probabilité et l'impact des incidents causés par les déploiements.

Lors d'un déploiement en production, vous pouvez utiliser Deployment Gates pour évaluer l'impact des nouveaux changements en utilisant des [monitors][1] et des anomalies APM.
Lorsque des anomalies ou des régressions de performance sont détectées, vous pouvez interrompre automatiquement la mise en production, empêchant ainsi le code instable d'atteindre une base d'utilisateurs plus large. De plus, vous pouvez ensuite utiliser Deployment Gates comme point d'entrée pour enquêter sur le problème.

Pour les instructions de configuration, consultez [Set up Deployment Gates][2]. Une fois la configuration terminée, vous pouvez suivre et analyser les évaluations de Deployment Gates via la page [Deployment Gates Evaluations][3] :

{{< img src="/deployment_gates/explore/deployment_gates_explorer.png" text="The Deployment Gate evaluation page in Datadog" style="width:100%" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/
[2]: /fr/deployment_gates/setup
[3]: /fr/deployment_gates/explore