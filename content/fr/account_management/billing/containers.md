---
title: Facturation des conteneurs
---

## Présentation

Les conteneurs sont inclus dans les offres Pro et Enterprise. Vous pouvez surveiller gratuitement 5 ou 10 conteneurs pour chaque licence de host, selon l'offre choisie. Le nombre moyen de conteneurs est calculé pour l'ensemble de votre infrastructure.

Les conteneurs supplémentaires sont facturés [en supplément][1], par conteneur et par heure. En outre, vous pouvez acheter des conteneurs prépayés. Contactez le [service commercial][2] ou votre [chargé de compte][3] pour en discuter.

Pour limiter les conteneurs surveillés avec Datadog, consultez la section relative à la [gestion de la découverte de conteneurs][8].

### Kubernetes

Kubernetes crée des conteneurs pause (nécessite l'Agent v5.8+) pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoigne ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent v7.20+ pour l'exclusion de conteneurs pause AWS EKS).

### Fargate

Fargate est facturé en fonction du nombre simultané de tâches surveillées dans ECS Fargate et du nombre simultané de pods surveillés dans EKS Fargate. Pour les tarifs, consultez la section [Infrastructure][4] de la page des tarifs.

### GKE Autopilot

La facturation des environnements [GKE Autopilot][5] fonctionne de la même manière que pour les environnements [GKE standard][6].

## Questions fréquentes

**Comment est mesurée l'utilisation horaire à la demande ?**

Les conteneurs sont mesurés par incréments de cinq minutes. La différence est calculée entre le nombre de conteneurs observés et l'allocation du compte. L'allocation du compte correspond au total des conteneurs inclus (5/host pour Pro et 10/host pour Enterprise par défaut) ainsi qu'à tout engagement contractuel de conteneurs.

Tout d'abord, les incréments d'utilisation de cinq minutes sont moyennés sur l'heure en divisant l'utilisation totale par douze. Ensuite, l'allocation est déduite de chaque heure. Enfin, l'utilisation à la demande totale correspond à la somme de l'utilisation à la demande de chaque heure. Cette méthode permet de normaliser l'utilisation à la demande face aux pics de courte durée et aux variations entre hosts.

**Que se passe-t-il si un utilisateur exécute un grand nombre de conteneurs sur une courte période ?**

D'après la méthode de calcul de l'utilisation à la demande ci-dessus, si 1 200 conteneurs sont utilisés à la demande sur un intervalle de cinq minutes (1/12 d'heure), ces conteneurs représentent seulement 100 heures d'exécution de conteneur (1 200 / 12). 

**Que se passe-t-il si les conteneurs sont inégalement répartis sur les hosts ?**

Tant que le nombre total de conteneurs en cours d'exécution ne dépasse pas le quota du compte, ces conteneurs sont inclus dans l'offre infrastructure de votre compte.

**J'utilise des groupes d'autoscaling, qui sont caractérisés par des heures de forte et de faible activité. Quel est l'impact de ces groupes sur l'utilisation à la demande des conteneurs ?**

Les calculs de l'utilisation à la demande tiennent compte du quota de votre compte, qui repose sur le nombre de hosts d'infrastructure. Puisque les groupes d'autoscaling augmentent le nombre de hosts pendant les heures de forte activité, le quota de conteneurs augmente également durant ces périodes.

**Les conteneurs de l'Agent Datadog rentrent-ils dans le calcul du quota ?**

Non, les conteneurs de l'Agent Datadog ne sont pas pris en compte pour le calcul du quota de 5 (Pro) ou 10 (Entreprise) conteneurs.

**Est-ce que les conteneurs appartenant à des pods avec un état `CrashLoopBackoff` constant sont comptabilisés ?**

Si un conteneur dans un pod est exécuté pendant plus de dix secondes, il est comptabilisé dans le quota durant l'intervalle de mesure. Puisque le pod ne fonctionne pas correctement, les données recueillies dans cette situation sont très utiles pour le dépannage. De plus, elles possèdent un tag correspondant au nom du pod ; ainsi, tandis que les conteneurs sous-jacents tentent une nouvelle exécution (avec un nouvel `container_id` à chaque tentative), toutes les informations de contexte (telles que les événements pertinents et les entrées de log) sont conservées au sein de la vue du pod.


## Dépannage

Pour toute question technique, contactez [l'assistance Datadog][7].

Pour toute question concernant la facturation, contactez votre [chargé de compte][3].

[1]: https://www.datadoghq.com/pricing/#tab-faq-infrastructure
[2]: mailto:sales@datadoghq.com
[3]: mailto:success@datadoghq.com
[4]: https://www.datadoghq.com/pricing/#section-infra
[5]: /fr/agent/kubernetes/distributions/?tab=helm#autopilot
[6]: /fr/integrations/google_kubernetes_engine/
[7]: /fr/help/
[8]: /fr/containers/guide/container-discovery-management