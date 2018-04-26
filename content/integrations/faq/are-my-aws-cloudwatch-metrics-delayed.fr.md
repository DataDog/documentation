---
title: Mes statistiques AWS CloudWatch sont-elles retardées?
kind: faq
---

Lorsque vous utilisez l'intégration AWS, nous récupérons les métriques via l'API CloudWatch. Vous pouvez voir un léger retard dans les métriques d'AWS en raison de certaines contraintes inhérente à leur API.

Si vous recevez des métriques toutes les 5 minutes de CloudWatch, la réception de vos métriques peut être retardée d'environ 15 à 20 minutes. C'est parce que CloudWatch rend vos données disponibles avec une latence de 5 à 10 minutes, et que nous exécutons notre bot toutes les 10 minutes.

In addition, queuing and CloudWatch API limitations can add up to another 5 minutes. If you receive 1-minute metrics with CloudWatch, then their availability delay is about 2 minutes so total latency to view your metrics may be ~10-12 minutes.

Further, the CloudWatch API only offers a metric-by-metric crawl to pull data. The CloudWatch APIs have a rate limit that varies based on the combination of authentication credentials, region, and service. Metrics are made available by AWS dependent on the account level. For example, if you are paying for “detailed metrics” within AWS, they are available more quickly. This level of service for detailed metrics also applies to granularity, with some metrics being available per minute and others per five minutes.

On the Datadog side, we do have the ability to prioritize certain metrics within an account to pull them in faster, depending on the circumstances. Contact [us][1] for more info on this.

To obtain metrics with virtually zero delay, we recommend installing the Datadog Agent on those hosts. We’ve written a bit about [if you should install the Datadog Agent on your AWS isntances][2], especially in relation to CloudWatch.

[1]: /help
[2]: /agent/#why-should-i-install-the-agent-on-my-aws-instances
