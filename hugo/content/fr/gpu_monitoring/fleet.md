---
description: Un inventaire de tous vos hosts accélérés par GPU qui vous aide à diagnostiquer
  les problèmes de performance.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez votre infrastructure IA avec Datadog GPU Monitoring
title: Page du parc GPU
---
## Présentation {#overview}

[GPU Fleet Explorer][0] fournit une ventilation détaillée de l'infrastructure IA (telle que les périphériques GPU, les hosts ou les clusters Ray) et des charges de travail IA (telles que les Pods, les conteneurs Kube ou les exécutions d'entraînement) pour une période donnée. Cette page vous aide à découvrir les inefficacités de provisionnement et les optimisations de performance des charges de travail grâce à la télémétrie des ressources, y compris l'utilisation du GPU, les métriques au niveau du host et les coûts. Elle met également en évidence la détection en temps réel par Datadog des problèmes affectant votre parc et vos charges de travail, avec des conseils sur la manière d'y remédier.

## Détectez les problèmes avec des monitors prêts à l'emploi {#detect-issues-with-out-of-the-box-monitors}

Datadog fournit plusieurs modèles de monitors prêts à l'emploi (OOTB) qui détectent les problèmes GPU courants en temps réel, notamment :

- Pointes de température
- Bridage de la puissance
- Requêtes GPU non satisfaites
- Erreurs XID
- Erreurs ECC
- Charges de travail par rafales
- Appareils inactifs

Vous pouvez personnaliser les seuils de n'importe quel monitor pour répondre aux besoins de votre organisation.

Pour accéder à ces modèles, cliquez sur le menu déroulant {{< ui >}}Monitors{{< /ui >}} dans le coin supérieur droit de la page.

{{< img src="gpu_monitoring/fleet-ootb-monitors.jpg" alt="Menu déroulant Monitors dans le coin supérieur droit de la page GPU Fleet, affichant les modèles de monitors prêts à l'emploi pour la température, la limitation de la puissance, les requêtes GPU non satisfaites, les erreurs XID critiques, les erreurs XID générales, les erreurs ECC, les charges de travail par rafales et les appareils inactifs" style="width:40%;" >}}

## Décomposez votre parc par n'importe quel tag {#break-down-your-fleet-by-any-tag}

GPU Fleet Explorer vous offre une visibilité depuis vos charges de travail IA jusqu'à l'infrastructure IA sous-jacente. Vous pouvez basculer entre des entités de charge de travail telles que des pods et des exécutions d'entraînement, et des entités d'infrastructure telles que des périphériques, des hosts et des clusters.

{{< img src="gpu_monitoring/gpu-fleet-sidenav.jpg" alt="Barre de navigation latérale affichant les entités d'infrastructure IA (Devices, Hosts, Kube Clusters, Ray Clusters) et les entités de charges de travail IA (Pods, Kube Containers, Training Runs)" style="width:30%;" >}}

**Remarque** : Les options Kube Clusters, Pods et Kube Containers dans la navigation latérale ne sont disponibles que si vous utilisez Kubernetes.

Utilisez les menus déroulants de filtrage en haut de la page pour filtrer par un {{< ui >}}Provider{{< /ui >}}, {{< ui >}}Device Type{{< /ui >}}, {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Region{{< /ui >}}, {{< ui >}}Service{{< /ui >}}, {{< ui >}}Data Center{{< /ui >}}, {{< ui >}}Environment{{< /ui >}} ou {{< ui >}}Team{{< /ui >}} spécifique.

Vous pouvez également {{< ui >}}Search{{< /ui >}} ou {{< ui >}}Group{{< /ui >}} à l'aide d'autres tags en utilisant les champs de recherche et de regroupement. Par exemple, vous pouvez regrouper par {{< ui >}}Service{{< /ui >}} pour afficher une ligne dans le tableau pour chaque service unique. Cliquez sur le bouton {{< ui >}}\>{{< /ui >}} à côté de n'importe quelle entrée pour voir les périphériques de ce service.

{{< img src="gpu_monitoring/host_row_expansion-2.png" alt="Tableau du parc GPU affichant les services avec leurs types de périphériques, avec le bouton d'extension de ligne mis en surbrillance" style="width:90%;" >}}

{{< img src="gpu_monitoring/filters_and_groupings-3.png" alt="Menus déroulants de filtrage et sélecteur de regroupement en haut de la page Parc GPU" style="width:90%;" >}}

## Vues et recommandations axées sur les cas d'utilisation {#use-case-driven-views-and-recommendations}
La page Fleet Explorer de GPU Monitoring propose deux vues dédiées axées sur les cas d'utilisation :

- **Provisionnement** : Allouez de la capacité et gérez les quotas.
- **Performance** : Optimisez l'efficacité et le débit de la charge de travail.

### Provisionnement {#provisioning}
L'onglet {{< ui >}}Provisioning{{< /ui >}} détecte tout problème de santé du matériel ayant un impact sur l'allocation de vos périphériques aux charges de travail et fournit des conseils sur la façon d'y remédier.

{{< img src="gpu_monitoring/provisioning-tab-3.jpg" alt="La vue axée sur le cas d'utilisation Provisionnement" style="width:90%;" >}}

Pour chaque problème détecté, Datadog recommande des actions de remédiation étape par étape pour vous aider à le résoudre.

{{< img src="gpu_monitoring/critical-xid-recommendation.jpg" alt="Actions de remédiation recommandées pour une erreur XID critique" style="width:60%;" >}}

#### Graphique récapitulatif du provisionnement {#provisioning-summary-graph}

Le graphique récapitulatif fournit des visualisations prêtes à l'emploi (OOTB) pour la télémétrie clé liée à votre vue axée sur le cas d'utilisation sélectionné. Pour le cas d'utilisation Provisioning, cela décompose vos appareils provisionnés, alloués et actifs afin que vous puissiez récupérer les dépenses inutiles liées à l'inactivité et redécouvrir les appareils disponibles pouvant être alloués aux charges de travail.

{{< img src="gpu_monitoring/summary-graph.jpg" alt="Graphique récapitulatif montrant les répartitions des appareils provisionnés, des appareils alloués et des appareils actifs" style="width:90%;" >}}

Développez cette section ci-dessous pour voir un tableau des options disponibles et ce qu'elles représentent.

{{% collapse-content title="Voir la liste complète des options du graphique récapitulatif de provisionnement" level="h5" expanded=false id="provisioning-summary-graph-table" %}}
| Option              | Définition                                                |
| -------------------- | ---------------------------------------------------------- |
| Appareils provisionnés  | Répartition des appareils provisionnés et des appareils actifs.       |
| Appareils alloués    | Répartition des appareils disponibles par alloués vs non alloués. |
| Appareils actifs       | Répartition des appareils alloués par actifs vs inactifs.          |
{{% /collapse-content %}}

### Performance {#performance}
L'onglet {{< ui >}}Performance{{< /ui >}} détecte tout problème de santé du matériel ou de charge de travail qui ralentit les charges de travail s'exécutant sur vos appareils GPU. Cela fournit une source unique de vérité et des conseils aux ingénieurs de plateforme et aux équipes IA/ML sur la manière de remédier à ces problèmes.

{{< img src="gpu_monitoring/performance-tab-3.jpg" alt="La vue axée sur le cas d'utilisation Performance" style="width:90%;" >}}

Pour chaque problème détecté, Datadog recommande des actions de remédiation étape par étape pour vous aider à le résoudre.

{{< img src="gpu_monitoring/power-cap-recommendation.jpg" alt="Actions de remédiation recommandées pour un problème de bridage de la puissance du GPU" style="width:60%;" >}}

#### Graphique récapitulatif des performances {#performance-summary-graph}

Le graphique récapitulatif fournit des visualisations prêtes à l'emploi (OOTB) pour la télémétrie clé liée à votre vue axée sur le cas d'utilisation sélectionné. Pour le cas d'utilisation Performance, cela décompose les métriques clés d'utilisation des ressources telles que l'utilisation du GPU ou la saturation du GPU, ainsi que les métriques de la structure réseau, de l'alimentation, de la température, et plus encore.

{{< img src="gpu_monitoring/summary-graph-performance.jpg" alt="Graphique récapitulatif montrant les répartitions de l'utilisation du GPU, de la saturation du GPU et de la mémoire GPU" style="width:90%;" >}}

Développez la section ci-dessous pour voir un tableau des options disponibles et ce qu'elles représentent.

{{% collapse-content title="Voir la liste complète des options du graphique récapitulatif des performances" level="h5" expanded=false id="performance-summary-graph-table" %}}
| Option              | Définition                                                                                                                                                                                                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utilisation CPU            | Pourcentage de temps que le processeur a passé à exécuter des processus en espace utilisateur.                                                                                                                                                        |
| Mémoire du host         | Pourcentage de mémoire utilisable en cours d'utilisation.                                                                                                                                                                                    |
| Utilisation GPU            | Pourcentage moyen de temps pendant lequel chaque multiprocesseur de flux était actif (des valeurs plus faibles indiquent un temps d'inactivité).                                                                                                                |
| Saturation GPU      | Mesure dans quelle mesure la capacité d'exécution parallèle du GPU est utilisée pendant la période donnée (rapport moyen des warps actifs par rapport au nombre maximal de warps pris en charge par multiprocesseur de flux sur l'ensemble des SM).            |
| Mémoire GPU          | Pourcentage de mémoire GPU utilisée par rapport à la limite totale de mémoire GPU.                                                                                                                                                               |
| PCIe RX             | Octets reçus via PCI depuis le périphérique GPU par seconde.                                                                                                                                                             |
| PCIe TX             | Octets transmis via PCI vers le périphérique GPU par seconde.                                                                                                                                                            |
| NVLink RX           | Total RX de tous les liens NVLINK.                                                                                                                                                                                          |
| NVLink TX           | Total TX de tous les liens NVLINK.                                                                                                                                                                                          |
| Activité graphique   | Fraction de temps pendant laquelle le GPU effectuait un travail de calcul au cours de l'intervalle. Un signal approximatif indiquant si le GPU est occupé ou inactif.                                                                                     |
| Puissance               | Consommation électrique du périphérique GPU. Sur les architectures GA100 et antérieures, cela représente la puissance instantanée à ce moment précis. Pour les architectures plus récentes, cela représente la consommation électrique moyenne (en Watts) sur une seconde. |
| Température         | Température d'un périphérique GPU.                                                                                                                                                                                            |
| Horloge SM            | Fréquence d'horloge SM en MHz.                                                                                                                                                                                             |
| Liens NVLINK actifs | Nombre de liens NVLINK actifs pour le périphérique.                                                                                                                                                                          |
| Erreurs ECC          | Nombre total d'erreurs ECC non corrigées.                                                                                                                                                                                 |
| Erreurs XID          | Nombre d'erreurs NVIDIA XID, indiquant des problèmes matériels ou au niveau du pilote.                                                                                                                                                |
{{% /collapse-content %}}

## Inventaire de votre infrastructure basée sur GPU {#inventory-of-your-gpu-powered-infrastructure}

Ce tableau détaille votre infrastructure basée sur GPU selon le tag de votre choix. Si vous n'avez pas spécifié de tag supplémentaire dans le champ {{< ui >}}Group by{{< /ui >}}, les résultats sont regroupés selon la vue sélectionnée : {{< ui >}}Cluster{{< /ui >}}, {{< ui >}}Host{{< /ui >}} ou {{< ui >}}Device{{< /ui >}}.

Vous pouvez cliquer sur l'icône en forme d'engrenage pour personnaliser les métriques affichées dans le tableau. Développez la section ci-dessous pour voir la liste complète des métriques disponibles. 

{{% collapse-content title="Voir la liste complète des métriques disponibles" level="h3" expanded=false id="metric-full-list" %}}
| Métrique                   | Définition                                                                                                                                                                                                              | Nom de la métrique                                        | Onglet Provisionnement | Onglet Performance |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------- | ---------------- | --------------- |
| Coût d'inactivité                | (Uniquement non nul pour des périodes supérieures à 2 jours) Le coût des ressources GPU réservées et allouées, mais non utilisées.                                                                                              | `gpu_monitoring.estimated_idle_cost`               | ✓                 | ✓               |
| Nombre total de périphériques            | Périphériques GPU avec Datadog GPU Monitoring correctement configuré et rapportant des métriques.                                                                                                                                    | `kubernetes_state.node.gpu_capacity`               | ✓                 | —               |
| Kubernetes disponible     | Périphériques GPU sains qui sont sous tension et disponibles pour l'allocation, selon l'orchestrateur Kubernetes.                                                                                                          | `kubernetes_state.node.gpu_allocatable`            | ✓                 | —               |
| Périphériques alloués        | (Uniquement disponible si vous utilisez Kubernetes) Nombre de périphériques ayant été alloués à une charge de travail.                                                                                                                           | `gpu.device.total`                                 | ✓                 | —               |
| Périphériques non alloués      | Nombre de périphériques non alloués et disponibles pour une utilisation pendant la période donnée.                                                                                                                                                 |                                                    | ✓                 | —               |
| Périphériques actifs           | Nombre de périphériques activement utilisés pour une charge de travail ou occupés. Si vous utilisez Kubernetes : nombre de périphériques alloués activement utilisés pour une charge de travail.                                                                   | `gpu.gr_engine_active`                             | ✓                 | —               |
| Périphériques inactifs             | Périphériques GPU alloués à des charges de travail mais n'effectuant aucun travail pendant la période donnée. Un périphérique est considéré comme inactif si `gpu.gr_engine_active` est égal à 0.                                                                        | `gpu.gr_engine_active`                             | ✓                 | —               |
| Utilisation du processeur          | Pourcentage de temps que le processeur a passé à exécuter des processus en espace utilisateur.                                                                                                                                       | `system.cpu.user`                                  | —                 | ✓               |
| Mémoire du host              | Pourcentage de mémoire utilisable en cours d'utilisation.                                                                                                                                                                                    | `system.mem.pct_usable`                            | —                 | ✓               |
| Utilisation du GPU          | Pourcentage moyen de temps pendant lequel chaque multiprocesseur de flux était actif (les valeurs inférieures indiquent un temps d'inactivité).                                                                                                                           | `gpu.sm_active`                                    | —                 | ✓               |
| Saturation du GPU           | Mesure à quel point la capacité d'exécution parallèle du GPU est utilisée pendant la période donnée (ratio moyen des warps actifs par rapport au nombre maximal de warps pris en charge par multiprocesseur de flux sur l'ensemble des SM).                 | `gpu.sm_occupancy`                                 | —                 | ✓               |
| Mémoire GPU               | Pourcentage de mémoire GPU utilisée par rapport à la limite totale de mémoire GPU.                                                                                                                                                                 | `100 - (gpu.memory.free / gpu.memory.limit * 100)` | —                 | ✓               |
| Débit de réception PCIe       | Octets reçus via PCI depuis le périphérique GPU par seconde.                                                                                                                                                              | `gpu.pci.throughput.rx`                            | —                 | ✓               |
| Débit de transmission PCIe       | Octets transmis via PCI vers le périphérique GPU par seconde.                                                                                                                                                             | `gpu.pci.throughput.tx`                            | —                 | ✓               |
| Réception NVLink                | Réception totale de tous les liens NVLINK.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.rx`                     | —                 | ✓               |
| Transmission NVLink                | Transmission totale de tous les liens NVLINK.                                                                                                                                                                                           | `gpu.nvlink.throughput.raw.tx`                     | —                 | ✓               |
| Puissance                    | Puissance du périphérique GPU.<br>**Remarque** : Sur les architectures GA100 et antérieures, cela représente la puissance instantanée à ce moment-là.<br>Pour les architectures plus récentes, cela représente la puissance moyenne (Watts) sur une seconde. | `gpu.power.usage`                                  | —                 | ✓               |
| Température              | Température d'un périphérique GPU.                                                                                                                                                                                            | `gpu.temperature`                                  | —                 | ✓               |
{{% /collapse-content %}} 

## Panneau latéral des détails {#details-side-panel}

Cliquer sur n'importe quelle ligne du tableau Fleet permet d'ouvrir un panneau latéral contenant plus de détails sur le cluster, le host ou le périphérique sélectionné.

### Entités connectées {#connected-entities}

Le GPU Monitoring de Datadog n'a pas besoin de s'appuyer sur le DCGM Exporter de NVIDIA. Il utilise le Datadog Agent pour observer directement les GPU, offrant un aperçu de l'utilisation des GPU et de leurs coûts pour les pods et les processus. Dans la section {{< ui >}}Connected Entities{{< /ui >}} de n'importe quelle vue détaillée, vous pouvez voir l'activité des SM, l'utilisation des cœurs GPU (uniquement si System Probe est activé) et l'utilisation de la mémoire des pods, des processus et des travaux Slurm. Cela vous aide à identifier les charges de travail à réduire ou à optimiser pour diminuer les dépenses totales. 

**Remarque** : L'onglet {{< ui >}}Pods{{< /ui >}} n'est disponible que si vous utilisez Kubernetes.

{{< tabs >}}
{{% tab "Panneau latéral du cluster" %}}

Dans ce panneau latéral, vous disposez d'un entonnoir spécifique au cluster qui identifie :

- Nombre total, alloué (utilisateurs Kubernetes uniquement), actif et effectif de périphériques au sein de ce cluster particulier
- Coût total et coût inactif estimés de ce cluster
- Entités connectées à ce cluster : pods, processus et travaux Slurm
- Quatre métriques clés (personnalisables) pour ce cluster : utilisation du cœur (uniquement si System Probe est activé), utilisation de la mémoire, débit PCIe et activité graphique.
- Tableau des hosts associés à ce cluster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Panneau latéral spécifique au cluster qui détaille les périphériques inactifs, les coûts et les entités connectées" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panneau latéral du host" %}}

Dans ce panneau latéral, vous disposez d'une vue spécifique au host qui identifie :

- Métadonnées relatives au host telles que le fournisseur, le type d'instance, l'utilisation du CPU, la mémoire système utilisée, la mémoire système totale, l'utilisation des E/S système, l'activité SM et la température
- (disponible uniquement pour les utilisateurs Kubernetes) Les périphériques GPU spécifiques alloués à ce host, triés par activité du moteur graphique
- Entités connectées à ce host : pods, processus et travaux Slurm

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Panneau latéral spécifique au host qui affiche les périphériques GPU liés à ce host et les entités connectées" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panneau latéral du périphérique" %}}

Dans ce panneau latéral, vous disposez d'une vue spécifique au périphérique qui identifie :

- Recommandations (le cas échéant) sur la manière d'utiliser ce périphérique plus efficacement 
- Détails relatifs au périphérique : type de périphérique, activité SM et température
- Quatre métriques clés liées aux GPU : activité SM, utilisation de la mémoire, puissance et activité du moteur graphique 
- Entités connectées à ce cluster : pods et processus

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Panneau latéral spécifique au périphérique qui affiche des recommandations sur la manière d'utiliser le périphérique plus efficacement et d'autres télémétries clés." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Recommandations d'installation {#installation-recommendations}

Datadog surveille activement votre infrastructure et détecte les lacunes d'installation susceptibles de réduire la valeur que vous tirez de GPU Monitoring. Dans cette fenêtre modale, vous trouverez des recommandations de mise à jour de l'installation pour obtenir une valeur optimale de GPU Monitoring. Par exemple, s'assurer que vos hosts disposent de la [dernière version][1] du Datadog Agent installée, que la dernière version du pilote NVIDIA est installée, et vérifier qu'il n'y a pas de hosts mal configurés.

<div class="alert alert-danger">N'utilisez pas Datadog Agent v7.82.0, qui peut provoquer des paniques du noyau inattendues.</div>

Pour afficher les fonctionnalités avancées de GPU Monitoring, telles que l'attribution des ressources GPU par processus associés ou par travaux SLURM, vous devez activer respectivement [Live Processes][3] et l'intégration [Slurm][4].

{{< img src="gpu_monitoring/installation.png" alt="Fenêtre modale contenant des conseils d'installation pour une expérience utilisateur de GPU Monitoring plus fluide." style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[3]: /fr/infrastructure/process/
[4]: /fr/integrations/slurm/