---
aliases:
- /fr/integrations/faq/are-my-aws-cloudwatch-metrics-delayed/
- /fr/integrations/faq/why-is-there-a-delay-in-receiving-my-data/
- /fr/integrations/faq/cloud-metric-delay
description: Comprenez les délais attendus pour les métriques d'intégration cloud
  AWS, Azure, Google Cloud et autres collectées par API.
further_reading:
- link: /agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
  tag: FAQ
  text: Pourquoi installer le Datadog Agent sur mes instances dans le cloud ?
title: Délai de réception des métriques cloud
---
## Présentation {#overview}

Lors de l'utilisation d'une intégration cloud Datadog (AWS, Azure, Google Cloud, etc.), les métriques sont récupérées par API avec un crawler. Vous pouvez constater un délai dans les métriques en raison des contraintes liées à l'API du fournisseur cloud.

## Résumé {#summary}

| Fournisseur   | Crawler par défaut  |
|------------|------------------|
| Alibaba    | Toutes les 10 minutes |
| AWS        | Toutes les 10 minutes (à l'exception des [métriques RDS][3], qui sont collectées toutes les 3 minutes) |
| Azure      | Toutes les 2 minutes  |
| Cloudflare | Toutes les 5 minutes |
| GCP        | Toutes les 5 minutes  |

## Fournisseurs cloud {#cloud-providers}

Vous trouverez ci-dessous les spécificités de certains fournisseurs de cloud.

### Alibaba {#alibaba}

Alibaba émet des métriques avec une granularité d'une minute. Par conséquent, attendez-vous à des délais de métriques d'environ 7 à 8 minutes.

### AWS {#aws}

AWS propose deux niveaux de granularité pour les métriques (5 minutes et 1 minute). Si vous recevez des métriques sur 5 minutes via CloudWatch, il peut y avoir un délai d'environ 15 à 20 minutes avant de les recevoir. Cela est dû au fait que CloudWatch rend vos données disponibles avec une latence de 5 à 10 minutes, en plus du délai par défaut de Datadog de 10 minutes (3 minutes pour les [métriques RDS][3]). La mise en file d'attente et les limitations de l'API CloudWatch peuvent ajouter jusqu'à 5 minutes supplémentaires. Si vous recevez des métriques à 1 minute avec CloudWatch, leur délai de disponibilité est d'environ 2 minutes ; la latence totale pour visualiser vos métriques peut donc être d'environ 10 à 12 minutes.

De plus, l'API CloudWatch ne propose qu'un crawler métrique par métrique pour extraire les données. Les API CloudWatch ont une limite de débit qui varie en fonction de la combinaison des identifiants d'authentification, de la région et du service. Les métriques sont mises à disposition par AWS en fonction du niveau de compte. Par exemple, si vous payez pour des *métriques détaillées* au sein d'AWS, elles sont disponibles plus rapidement. Ce niveau de service pour les métriques détaillées s'applique également à la granularité, certaines métriques étant disponibles par minute et d'autres par cinq minutes.

Sur votre [site Datadog sélectionné][4] ({{< region-param key="dd_site_name" >}}), vous pouvez éventuellement configurer Amazon CloudWatch Metric Streams et Amazon Data Firehose pour obtenir les métriques CloudWatch dans Datadog plus rapidement avec une latence de 2 à 3 minutes. Consultez la [documentation sur le streaming de métriques][5] pour en savoir plus sur cette approche.


### Azure {#azure}

Azure émet des métriques avec une granularité d'une minute. Par conséquent, attendez-vous à des délais de métriques d'environ 4 à 5 minutes.

### GCP {#gcp}

GCP émet des métriques avec une granularité d'une minute. Par conséquent, attendez-vous à des délais de métriques d'environ 7 à 8 minutes.

## monitors {#monitors}

Lors de la création de monitors dans Datadog, un message d'avertissement s'affiche si vous choisissez une métrique retardée. Datadog recommande d'étendre le délai et de retarder l'évaluation du monitor pour ces métriques.

<div class="alert alert-info">Pour les monitors de métriques basés sur AWS, {{< ui >}}Edit{{< /ui >}} peut afficher un délai d'évaluation recommandé (souvent 900 secondes). Cette valeur provient de l'intégration AWS et n'est pas enregistrée tant que vous ne cliquez pas sur {{< ui >}}Save{{< /ui >}}. Pour vérifier la configuration enregistrée, ouvrez la page {{< ui >}}Status{{< /ui >}} du monitor, exportez le JSON et recherchez <code>evaluation_delay</code>. Si le champ est manquant, définissez le délai dans {{< ui >}}Edit{{< /ui >}} et enregistrez le monitor.</div>

## Métriques plus rapides {#faster-metrics}

Pour obtenir des métriques au niveau du système avec un délai pratiquement nul, installez le Datadog Agent sur vos hosts cloud lorsque cela est possible. Pour obtenir une liste complète des avantages de l'installation de l'Agent sur vos instances cloud, consultez la documentation [Pourquoi devrais-je installer le Datadog Agent sur mes instances cloud&nbsp;?][1].

Du côté de Datadog pour les intégrations AWS, Azure et GCP, Datadog peut être en mesure d'accélérer le crawler de métriques par défaut pour toutes les métriques. De plus, pour AWS, Datadog dispose de crawlers spécifiques aux espaces de noms. Contactez le [support Datadog][2] pour plus d'informations.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/faq/why-should-i-install-the-agent-on-my-cloud-instances/
[2]: /fr/help/
[3]: /fr/integrations/amazon-rds/#metrics
[4]: /fr/getting_started/site/
[5]: /fr/integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/