---
aliases:
- /fr/monitors/faq/why-am-i-getting-so-many-no-data-alerts/
- /fr/monitors/faq/why-am-i-getting-so-many-no-data-alerts-for-my-metric-monitor/
further_reading:
- link: /monitors/notify/
  tag: Documentation
  text: Configurer les notifications de vos monitors
- link: /monitors/downtimes/
  tag: Documentation
  text: Planifier un downtime pour désactiver un monitor
kind: guide
title: Régler les alertes No Data pour les monitors de métriques
---

Les alertes *No Data* sont un excellent moyen d'être informé lorsqu'une intégration/application nʼenvoie plus de métriques à Datadog.
Lorsque vous utilisez un [monitor de métrique][1] pour une métrique qui n'est pas toujours rapportée à la même fréquence ou qui est rapportée avec un horodatage un peu ancien, comme une métrique de [lʼintégration AWS][2], il est possible que vous receviez des alertes No Data bien que les valeurs sʼaffichent dans Datadog. Quelques options de configuration pour les monitors peuvent être modifiées pour évaluer correctement ces types de métriques :

{{< img src="monitors/guide/AWS_Monitor_Config.png" alt="Configuration de monitor AWS" >}}

1. L'image ci-dessus montre que la métrique `aws.ec2.cpuutilization` arrive avec un léger retard.
Ceci est dû aux limites relatives au temps que cette métrique met avant dʼêtre disponible dans Cloudwatch.

{{< img src="monitors/guide/require_full_window.png" alt="Exiger une fenêtre complète de données" >}}

2. Option d'évaluation du délai.
Étant donné que les monitors effectuent une évaluation par minute, ils examinent les données des X dernières minutes. Pour les métriques renvoyées, comme celles provenant dʼAWS, le monitor peut analyser une période pendant laquelle les données ne sont pas dans Datadog. Cela entraîne de fausses alertes No Data. En remplissant ce champ, vous permettez au monitor de patienter pendant 900 secondes, de sorte que les métriques AWS disposent de 900 secondes pour se rendre disponibles dans Datadog avant que le monitor ne commence l'évaluation.

3. Cette option correspond à [Exiger une fenêtre complète de données][3] (ou à la possibilité de ne pas l'exiger).
Cette option est généralement recommandée pour les métriques signalées par lʼAgent Datadog et celles qui arrivent avec l'horodatage actuel. Pour les métriques légèrement renvoyées, cette option peut entraîner des événements No Data ou faire en sorte que le monitor ignore la période d'évaluation en cours parce que les valeurs ne sont pas présentes au moment où il procède à l'évaluation. C'est la raison pour laquelle toutes les métriques creuses ou les métriques qui ne transmettent pas à la même fréquence doivent conserver l'option par défaut « Do Not [Require a Full Window of Data][3] ».

Enfin, lors de la création de moniteurs se voulant efficaces, il est important de comprendre ces limites. Les [délais des métriques Cloud][4] sont différents pour chaque fournisseur de cloud. Pour recevoir des métriques avec un délai beaucoup plus court, installez lʼAgent Datadog sur vos hosts dans le cloud lorsque vous le pouvez. Consultez documentation sur [l'installation de lʼAgent Datadog sur vos instances cloud][5].

Contactez-[nous][6] en cas de problème.

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/monitors/types/metric/
[2]: /fr/integrations/amazon_web_services/
[3]: /fr/monitors/types/metric/?tab=threshold#advanced-alert-conditions
[4]: /fr/integrations/guide/cloud-metric-delay/
[5]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[6]: /fr/help/