---
title: Mauvais compte de aws.elb.healthy_host_count?
kind: faq
---

Lorsque l'option Cross-Zone Load Balancing est activée sur un ELB, toutes les instances attachées à cet ELB sont considérées comme faisant partie de toutes les A-Z (du côté cloudwatch), donc si vous avez 2 instances dans 1a et 3 dans 1b, la métrique affichera 5 instances par AZ.

Comme cela peut être contre-intuitif, nous avons ajouté de nouvelles mesures, aws.elb.healthy_host_count_deduped et aws.elb.un_healthy_host_count_deduped, qui affichent le nombre d'instances saines et malsaines par AZ, que cette option d'équilibrage de charge entre zones soit activé ou non. Ces métriques devraient avoir la valeur que vous attendez.

