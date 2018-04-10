---
title: Métriques AWS additionnelles -  Min/Max/Sum
kind: faq
---

Globalement, min/max/moy ont une signification différente dans AWS que dans Datadog.

Dans AWS, la latence moyenne, la latence minimale et la latence maximale sont trois mesures distinctes collectées par AWS. Lorsque Datadog extrait les métriques d'AWS Cloudwatch, nous obtenons uniquement la latence moyenne sous la forme d'une seule série temporelle par ELB.

Dans Datadog, lorsque vous sélectionnez 'min', 'max' ou 'avg', vous contrôlez la façon dont plusieurs séries temporelles sont combinées. Par exemple, si vous demandez system.cpu.idle sans aucun filtre, une série sera renvoyée pour chaque host qui signale cette métrique et ces séries doivent être combinées pour être représentées graphiquement. D'un autre côté, si vous avez demandé system.cpu.idle à partir d'un seul host, aucune agrégation ne serait nécessaire et la commutation entre moyenne et max donnerait le même résultat.

Si vous souhaitez collecter le Min / Max / Sum / Avg d'AWS (Component Specific - Ec2, ELB, Kinesis, etc.), contactez support@datadoghq.com. L'activation de cette fonctionnalité fournirait des métriques supplémentaires sous le format d'espace de noms suivant:

aws.elb.healthy_host_count.sum

aws.elb.healthy_host_count.min

aws.elb.healthy_host_count.max

Notez que l'activation de cette fonctionnalité augmente le nombre de requêtes d'API et d'informations extraites de CloudWatch et peut potentiellement affecter votre facturation AWS.

Plus d'informations sur ce comportement et la facturation AWS peuvent être trouvés ici:

* [Croyez-vous constater un écart entre vos données dans CloudWatch et Datadog?][1]

* [Comment puis-je surveiller mes informations de facturation AWS?][2]

[1]: /integrations/faq/do-you-believe-you-re-seeing-a-discrepancy-between-your-data-in-cloudwatch-and-datadog
[2]: /integrations/faq/how-do-i-monitor-my-aws-billing-details
