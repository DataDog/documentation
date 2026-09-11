---
aliases:
- /fr/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /fr/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /fr/integrations/faq/cloud-metric-delay
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: Pourquoi installer l'Agent Datadog sur mes instances cloud ?

title: Délai de réception des métriques cloud
---

## Présentation

Lors de l'utilisation d'une intégration cloud Datadog (AWS, Azure, GCP, etc.), les métriques sont récupérées par l'API à l'aide d'un crawler. Il se peut que vous observiez un délai de réception des métriques dû aux contraintes imposées par l'API du fournisseur de cloud.

## Résumé

| Fournisseur   | Crawler par défaut  |
|------------|------------------|
| Alibaba    | Toutes les 10 minutes |
| AWS        | Toutes les 10 minutes |
| Azure      | Toutes les 2 minutes  |
| Cloudflare | Toutes les 15 minutes |
| GCP        | Toutes les 5 minutes  |

## Fournisseurs de cloud

Vous trouverez ci-dessous les spécificités de certains fournisseurs de cloud.

### Alibaba

Alibaba génère ses métriques avec une granularité d'une minute. Par conséquent, un délai de réception des métriques d'environ 7 à 8 minutes est à prévoir.

### AWS

AWS propose deux niveaux de granularité pour ses métriques (1 et 5 minutes). Pour les métriques générées toutes les 5 minutes, le délai de réception peut atteindre environ 15 à 20 minutes. CloudWatch transmet en effet vos données avec un délai de 5 à 10 minutes, auquel s'ajoute le délai par défaut de Datadog, qui est de 10 minutes. 5 minutes supplémentaires peuvent être nécessaires en raison de la mise en file d'attente et des limitations de l'API CloudWatch. Pour les métriques générées toutes les minutes, le délai de transmission est d'environ 2 minutes, la latence totale pour l'affichage de vos métriques peut alors atteindre 10 à 12 minutes.

En outre, l'API CloudWatch propose uniquement une analyse métrique par métrique afin d'extraire des données. Les API CloudWatch prévoient une limite de débit qui varie en fonction des informations d'authentification, de la région et du service. Les métriques sont transmises par AWS en fonction du niveau du compte. Par exemple, si vous payez pour des *métriques détaillées* dans AWS, vous y avez accès plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité. Ainsi, certaines métriques sont transmises toutes les minutes, tandis que d'autres sont envoyées toutes les cinq minutes.

### Azure

Azure génère ses métriques avec une granularité d'une minute. Par conséquent, un délai de réception des métriques d'environ 4 à 5 minutes est à prévoir.

### GCP

GCP génère ses métriques avec une granularité d'une minute. Par conséquent, un délai de réception des métriques d'environ 7 à 8 minutes est à prévoir.

## Monitors

Lors de la création de monitors dans Datadog, un message d'avertissement s'affiche si vous choisissez une métrique dont la réception est différée. Nous vous recommandons d'augmenter l'intervalle et de retarder l'évaluation du monitor pour ces métriques.

## Réception plus rapide des métriques

Pour obtenir des métriques au niveau du système quasiment en temps réel, installez l'Agent Datadog sur vos hosts cloud lorsque cela est possible. Pour obtenir la liste complète des avantages qu'apporte l'installation de l'Agent sur vos instances cloud, consultez la documentation [Pourquoi installer l'Agent Datadog sur mes instances cloud ?][1].

De son côté, Datadog peut être en mesure d'accélérer le crawler par défaut pour toutes les métriques pour les intégrations AWS, Azure et GCP. En outre, pour AWS, Datadog propose des crawlers propres aux espaces de nommage. Contactez [l'assistance Datadog][2] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /fr/help/