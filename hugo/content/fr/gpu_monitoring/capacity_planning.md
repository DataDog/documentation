---
description: Suivez l'utilisation du quota GPU par équipes et files d'attente, identifiez
  les types de GPU sursouscrits et comprenez pourquoi certaines charges de travail
  sont en attente ou expulsées.
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentation
  text: Configurez la surveillance GPU
- link: /gpu_monitoring/fleet
  tag: Documentation
  text: Explorez votre parc de GPU avec la page Fleet
- link: /gpu_monitoring
  tag: Documentation
  text: En savoir plus sur ce que propose la surveillance GPU
title: Planifiez la capacité GPU avec la surveillance GPU
---
{{< callout url="https://www.datadoghq.com/product-preview/gpu-monitoring-capacity-planning/" >}}
La planification de la capacité dans la surveillance GPU est en accès anticipé. Remplissez le formulaire pour demander l'accès.
{{< /callout >}}

## Présentation {#overview}

Lorsque de nombreuses équipes partagent des pools de GPU coûteux, il est difficile de voir quelles équipes sous-utilisent leurs appareils. Il est également difficile de repérer la contention des ressources et de savoir pourquoi les jobs restent en attente. La page Planification de la capacité dans la surveillance GPU offre aux équipes de plateforme et aux propriétaires de charges de travail une vue partagée du provisionnement des GPU entre les files d'attente. Aucun filtrage ou requête manuel n'est requis. Utilisez-la pour exécuter des charges de travail de manière fiable et tirer le meilleur parti de votre parc de GPU.

Avec la page Planification de la capacité, vous pouvez répondre à des questions telles que :

- **Quelles équipes ou quels projets utilisent leur quota de manière excessive ou insuffisante ?** Trouvez le quota inutilisé et réallouez la capacité de calcul de manière équitable dans toute votre organisation.
- **Quels types de GPU sont sursouscrits ?** Identifiez où la demande dépasse le quota afin de pouvoir ajouter de la capacité.
- **Quel est l'état actuel d'une charge de travail ?** Découvrez si chaque charge de travail est admise, en attente ou expulsée, et combien de GPU elle utilise.
- **Pourquoi une charge de travail est-elle retardée ou expulsée ?** Corrélez les charges de travail en attente et préemptées avec le quota et la contention dans leur file d'attente.

{{< img src="gpu_monitoring/capacity-planning-page.png" alt="Page Planification de la capacité dans la surveillance GPU affichant des graphiques sur le quota de GPU, les GPU alloués inactifs, la préemption et la couverture du parc au-dessus d'une liste de charges de travail." style="width:100%;" >}}

## Prérequis {#prerequisites}

Pour utiliser la page Planification de la capacité, vous devez remplir les critères suivants :
- Vous exécutez le Datadog Agent version 7.84.1 ou ultérieure avec [la surveillance GPU activée][1]. Pour effectuer une mise à niveau, consultez [Mettre à niveau l'Agent avec Fleet Automation][2].
- Vos charges de travail GPU s'exécutent sur Kubernetes.
- Vous avez activé [l'intégration Kueue][3] dans Datadog. Pour plus de détails, consultez [la documentation de l'intégration Kueue][4].

## Explorez la page Capacity Planning {#explore-the-capacity-planning-page}

Pour commencer, accédez à la [page Capacity Planning][5] dans GPU Monitoring.

### Filtrer par équipe et par file d'attente {#filter-by-team-and-queue}

Utilisez les filtres en haut de la page pour définir le périmètre de la vue. Vous pouvez filtrer par {{< ui >}}Team{{< /ui >}}, {{< ui >}}Cluster Name{{< /ui >}}, {{< ui >}}Cluster Queue{{< /ui >}}, {{< ui >}}Resource Flavor{{< /ui >}}, {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Datacenter{{< /ui >}} et {{< ui >}}Environment{{< /ui >}}. Enregistrez une vue filtrée pour y revenir plus tard.

### Quota et utilisation {#quota-and-utilization}

Les graphiques en haut de la page montrent comment le quota GPU est utilisé dans votre parc :

| Graphique | Description |
|-------|-------------|
| Quota GPU non alloué - Nombre | Nombre de GPU dans le quota qui ne sont pas utilisés, regroupés par ClusterQueue. |
| Quota GPU non alloué - Pourcentage | Pourcentage du quota GPU qui n'est pas utilisé, regroupés par ClusterQueue. |
| GPU alloués inactifs | Nombre de GPU alloués qui n'effectuent pas de travail moteur, regroupés par ClusterQueue. |
| Taux de préemption | Charges de travail expulsées par préemption par charge de travail admise, regroupées par ClusterQueue. |
| Couverture GPU du parc | Quota GPU alloué divisé en périphériques actifs, inactifs et non attribués dans tout le parc. |
| Saturation - GPU au-delà du quota | Paires ClusterQueue et ResourceFlavor classées par le nombre de GPU utilisés au-delà de leur quota nominal. |

Les files d'attente avec un quota non alloué élevé ou de nombreux GPU alloués inactifs sont des candidates à la réallocation. Les files d'attente qui dépassent systématiquement leur quota, ou qui ont un taux de préemption élevé, peuvent avoir besoin de plus de capacité.

### Files d'attente et charges de travail {#queues-and-workloads}

Le tableau en bas de page comporte deux onglets :

- {{< ui >}}Queues{{< /ui >}} : Liste chaque file d'attente avec son quota et son utilisation.
- {{< ui >}}Workloads{{< /ui >}} : Liste chaque charge de travail avec son équipe, son cluster, sa ClusterQueue, son utilisation de GPU par type de ressource et son dernier état, tel que {{< ui >}}Admitted{{< /ui >}}.

Utilisez l'onglet {{< ui >}}Workloads{{< /ui >}} pour vérifier l'état actuel d'une charge de travail et pour examiner les charges de travail en attente ou ayant été expulsées.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/gpu_monitoring/setup
[2]: /fr/agent/guide/upgrade_agent_fleet_automation/
[3]: https://app.datadoghq.com/integrations?search=kueue
[4]: /fr/integrations/kueue/
[5]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=capacity-planning