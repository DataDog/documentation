---
title: Facturation des conteneurs
kind: documentation
---
## Présentation

Les conteneurs sont pris en charge dans les offres Pro et Enterprise. Vous pouvez surveiller gratuitement 10 ou 20 conteneurs pour chaque licence de host, selon l'offre choisie. Le nombre moyen de conteneurs est calculé pour l'ensemble de votre infrastructure.

Les conteneurs supplémentaires sont facturés [en supplément][1], par conteneur et par heure. En outre, vous pouvez acheter des conteneurs prépayés. Contactez le [service commercial][2] ou votre [chargé de compte][3] pour en discuter.

### Kubernetes

Kubernetes crée des conteneurs pause (nécessite l'Agent v5.8+) pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoigne ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent v7.20+ pour l'exclusion de conteneurs pause AWS EKS).

### Fargate

Fargate est facturé en fonction du nombre de tâches simultanées. Pour découvrir les tarifs, consultez la section [Infrastructure][4] de la page des tarifs.

## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][5].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /fr/help/