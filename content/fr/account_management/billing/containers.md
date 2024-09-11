---
title: Facturation des conteneurs
---

## Présentation

Les conteneurs sont pris en charge dans les offres Pro et Enterprise. Vous pouvez surveiller gratuitement 5 ou 10 conteneurs pour chaque licence de host, selon l'offre choisie. Le nombre moyen de conteneurs est calculé pour l'ensemble de votre infrastructure.

Les conteneurs supplémentaires sont facturés [en supplément][1], par conteneur et par heure. En outre, vous pouvez acheter des conteneurs prépayés. Contactez le [service commercial][2] ou votre [chargé de compte][3] pour en discuter.

### Kubernetes

Kubernetes crée des conteneurs pause (nécessite l'Agent v5.8+) pour obtenir l'adresse IP du pod respectif et configurer l'espace de nommage du réseau pour tous les autres conteneurs qui rejoigne ce pod. Datadog exclut les conteneurs pause de votre quota et ne les facture pas (nécessite l'Agent v7.20+ pour l'exclusion de conteneurs pause AWS EKS).

### Fargate

Fargate est facturé en fonction du nombre de tâches simultanées. Pour découvrir les tarifs, consultez la section [Infrastructure][4] de la page des tarifs.

### GKE Autopilot

Les environnements [GKE Autopilot][5] sont facturés comme les environnements [GKE Standard][6].

## Questions fréquentes

**Comment l'utilisation à la demande horaire est-elle mesurée par Datadog ?**

Le nombre de conteneurs est mesuré toutes les cinq minutes. On calcule la différence entre le nombre de conteneurs mesurés et le quota maximal du compte. Le quota maximal du compte correspond au nombre total de conteneurs inclus dans l'offre (par défaut, 5 par host pour l'offre Pro et 10 par host pour l'offre Enterprise) plus le nombre de conteneurs souscrits en supplément. Si le nombre de conteneurs dépasse le quota, on calcule le nombre moyen par heure pour obtenir l'utilisation à la demande horaire. Le nombre moyen est déterminé en additionnant les mesures effectuées toutes les cinq minutes sur chaque heure puis en divisant le résultat par douze. Cette méthode permet de corriger les pics d'utilisation à court terme ainsi que les variations entre les hosts.

**Que se passe-t-il si un utilisateur exécute un nombre extrêmement élevé de conteneurs pendant une courte période de temps ?**

Avec la formule de calcul de l'utilisation à la demande horaire décrite ci-dessus, si un utilisateur exécute 1 200 conteneurs à la demande pendant 5 minutes (un douzième d'heure), l'utilisation mesurée correspond à 100 heures (1 200/12).

**Et si les conteneurs ne sont pas répartis uniformément sur les différents hosts ?**

Tant que le nombre total de conteneurs exécutés ne dépasse pas le quota maximal du compte, ils sont inclus dans l'offre infrastructure du compte.

**L'utilisation de groupes autoscaling implique des heures de pic et des heures creuses. Comment ces variations affectent-elles l'utilisation à la demande des conteneurs ?**

Les calculs de l'utilisation à la demande sont effectués en fonction du quota du compte, qui est basé sur le nombre de hosts au sein de l'infrastructure. Étant donné que les groupes autoscaling augmentent le nombre de hosts lors des heures de pic, le quota de conteneurs augmente lui aussi pendant ces périodes.

**Les conteneurs de l'Agent Datadog sont-ils pris en compte dans le quota ?**

Non, les conteneurs de l'Agent Datadog ne sont pas pris en compte pour le calcul du quota de 5 (Pro) ou 10 (Entreprise) conteneurs.

**Les conteneurs qui appartiennent à des pods bloqués en mode `CrashLoopBackoff` sont-ils pris en compte ?**

Si un conteneur au sein du pod est exécuté pendant plus de 10 secondes, il est pris en compte dans le quota lors de la mesure. Étant donné que le pod n'est pas fonctionnel, les données recueillies dans ces situations sont utiles à des fins de dépannage. De plus, les données reçoivent le nom du pod en tant que tag ; par conséquent, chaque fois que les conteneurs sous-jacents tentent de se relancer (avec un nouveau `container_id`), l'ensemble du contexte (tel que les événements et les entrées de log pertinents) est conservé dans la vue du pod.


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