---
description: Un inventaire de tous vos hôtes accélérés par GPU qui vous aide à diagnostiquer
  les problèmes de performance.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez l'infrastructure AI avec la surveillance GPU de Datadog.
private: true
title: Page de surveillance de la flotte GPU
---
## Aperçu

La [page de la flotte GPU][0] fournit un inventaire détaillé de tous vos hôtes accélérés par GPU pour une période spécifiée. Utilisez cette vue pour découvrir les inefficacités grâce à la télémétrie des ressources, allant des performances et des métriques d'utilisation aux coûts. Cette page présente également les recommandations de provisionnement et d'optimisation des performances de Datadog pour vos appareils, afin de vous aider à maximiser la valeur de vos dépenses en GPU. 

## Décomposez votre infrastructure par cluster, hôte ou appareil

Sélectionnez d'abord comment vous souhaitez comprendre votre flotte GPU en utilisant le commutateur qui regroupe votre flotte par cluster Kubernetes (disponible uniquement pour les utilisateurs de Kubernetes), Hôte (Nœud) ou appareil GPU :

{{< img src="gpu_monitoring/fleet-toggle-2.png" alt="Commutateur pour la page de la flotte GPU qui regroupe les résultats du tableau par Cluster Kubernetes, Hôte ou Appareil." style="width:90%;" >}}

Votre sélection est utilisée pour remplir le tableau résultant. Si vous sélectionnez _Cluster_ ou _Hôte_, vous pouvez cliquer sur le bouton **`>`** à côté de chaque entrée du tableau pour voir les hôtes d'un cluster ou les appareils d'un hôte, respectivement. 

{{< img src="gpu_monitoring/host_row_expansion.png" alt="Une entrée d'hôte dans le tableau" style="width:90%;" >}}

**Remarque** : Le tableau des clusters n'est peuplé que si vous utilisez Kubernetes.

### Explorez votre flotte GPU avec des filtres et des regroupements

Utilisez les menus déroulants de filtre rapide en haut de la page pour filtrer par un **Fournisseur**, **Type d'Appareil**, **Cluster**, **Région**, **Service**, **Centre de Données**, **Environnement** ou **Équipe**.

Vous pouvez également **Rechercher** ou **Grouper** par d'autres étiquettes dans les champs indiqués ci-dessous. Par exemple, vous pouvez sélectionner le commutateur pour Hôte et ensuite grouper par `Team` pour voir une entrée de tableau pour chaque équipe unique. Cliquez sur le bouton **`>`** à côté de toute entrée pour voir les hôtes utilisés par cette équipe et les appareils GPU qui accélèrent ces hôtes. 

**Remarque** : Vous ne pouvez grouper que par une étiquette supplémentaire.

{{< img src="gpu_monitoring/filters_and_groupings-2.png" alt="Le menu de filtrage et de regroupement sur la page GPU Fleet" style="width:90%;" >}}

## Vues axées sur les cas d'utilisation
Datadog vous guide à travers vos workflows de provisionnement et d'optimisation des performances en fournissant deux vues dédiées axées sur les cas d'utilisation. 

### Provisionnement
L'onglet Provisionnement affiche des recommandations clés et des aperçus de métriques pour allouer et gérer votre capacité. 

{{< img src="gpu_monitoring/provisioning-tab.png" alt="La vue axée sur les cas d'utilisation du provisionnement" style="width:90%;" >}}

Recommandations OOTB : 
- Datadog détecte de manière proactive le throttling thermique ou les défauts matériels et recommande instantanément des remédiations basées sur des erreurs matérielles telles que les erreurs ECC/XID.
- Datadog détecte si des dispositifs inactifs doivent être provisionnés pour éviter que des dispositifs ne restent inactifs.

Métriques pertinentes pour votre workflow de provisionnement : 
- Compte d'erreurs ECC et XID
- Activité graphique
- Activité SM
- Mémoire GPU
- Dispositifs alloués (disponible uniquement pour les utilisateurs de Kubernetes) 
- Dispositifs actifs
- Coût inactif

### Performance
L'onglet Performance vous aide à comprendre l'exécution des charges de travail et à ajuster l'utilisation des GPU pour utiliser vos dispositifs plus efficacement.

{{< img src="gpu_monitoring/performance-tab.png" alt="La vue axée sur les cas d'utilisation de la performance" style="width:90%;" >}}

Recommandations OOTB : 
- Si vos charges de travail sont intensives en CPU, Datadog signale les hôtes avec saturation du CPU et recommande des solutions.
- Si vos charges de travail n'utilisent pas efficacement leurs dispositifs GPU alloués, Datadog fournit des recommandations pour ajuster les charges de travail afin d'obtenir plus de valeur de leur capacité.

Métriques pertinentes pour votre flux de travail de performance : 
- Compte d'erreurs ECC et XID
- Activité graphique
- Activité SM
- Mémoire GPU
- Appareils Efficaces
- Puissance
- Température
- PCIe RX
- PCIe Tx
- Utilisation du CPU

## Graphique Résumé

Après avoir basculé entre Cluster, Hôte ou Appareil, le **Graphique Résumé** affiche la télémétrie des ressources clés sur l'ensemble de votre infrastructure GPU regroupée par cette valeur de basculement. Développez la section ci-dessous pour voir un tableau des métriques disponibles et ce qu'elles représentent. 

{{% collapse-content title="Voir la liste complète des métriques GPU" level="h4" expanded=false id="gpu-metrics-table" %}}
| Métrique                | Définition                                                              | Nom de la Métrique                                    |
| ----------------------| ------------------------------------------------------------------------| --------------------------------------------- |
| Utilisation du Cœur      | (Disponible uniquement avec le Système Probe activé pour des métriques eBPF avancées) `Cores Used/Cores Limit` pour les processus GPU. Mesure de l'Utilisation Temporelle du Cœur.| `gpu_core_utilization`  
| Utilisation de la Mémoire    | Mémoire GPU utilisée / Limite de Mémoire GPU pour les processus GPU. | `gpu_memory_utilization`
| Débit PCIe       | Octets reçus et octets transmis via PCI depuis le dispositif GPU par seconde. | `gpu.pci.throughput.rx`,`gpu.pci.throughput.tx` 
| Activité Graphique     | Pourcentage de temps pendant lequel le moteur graphique était actif. | `gpu.gr_engine_active`
| Activité SM           | Pourcentage de temps pendant lequel le multiprocesseur de streaming était actif. | `gpu.sm_active`
| Puissance                 | Utilisation de la puissance pour le dispositif GPU.<br>**Remarque** : Sur les architectures GA100 et précédentes, cela représente la puissance instantanée à ce moment.<br>Pour les architectures plus récentes, cela représente la consommation moyenne de puissance (Watts) sur une seconde. | `gpu.power.usage`
| Température           | Température d'un dispositif GPU. | `gpu.temperature`
| Cœurs Utilisés            | (Émis uniquement si des processus sont actifs) Nombre moyen de cœurs GPU qu'un processus utilisait dans l'intervalle.  | `gpu.core.usage`
| Mémoire Utilisée           | (Émis uniquement si des processus sont actifs) La mémoire utilisée par ce processus au moment où la métrique a été interrogée. | `gpu.memory.usage`
| Total des Dispositifs          | Nombre total de dispositifs envoyant des données pendant cette période. | `gpu.device.total`
{{% /collapse-content %}} 

Si vous avez sélectionné une étiquette supplémentaire pour regrouper---par exemple, _équipe_---chaque série temporelle unique dans le graphique récapitulatif correspond à la valeur d'une équipe pour la métrique sélectionnée.

## Inventaire de votre infrastructure alimentée par GPU

Ce tableau décompose votre infrastructure alimentée par GPU selon l'étiquette de votre choix. Si vous n'avez pas spécifié d'étiquette supplémentaire dans le champ **Grouper par**, les résultats sont regroupés par votre vue sélectionnée : Cluster, Hôte ou Dispositif.

Par défaut, le tableau des résultats affiche les colonnes suivantes : 

- Type de Dispositif 
- Activité du Moteur Graphique 
- Activité SM (Uniquement si le Système de Sonde est activé) 
- Utilisation des Cœurs 
- Utilisation de la Mémoire 
- Coût au Repos
- Recommandation

Vous pouvez cliquer sur l'icône d'engrenage pour personnaliser les métriques affichées dans le tableau. Développez la section ci-dessous pour voir une liste complète des métriques disponibles. 

{{% collapse-content title="Voir la liste complète des métriques disponibles" level="h4" expanded=false id="metric-full-list" %}}
| Métrique                | Définition                                                              | Nom de la Métrique                                    |
| ----------------------| ------------------------------------------------------------------------| ---------------------------------------------  |
| Utilisation du CPU       | Le pourcentage de temps que le CPU a passé à exécuter des processus en espace utilisateur. Affiché en pourcentage. | `system.cpu.user`
| Type de dispositif           | Type de dispositif GPU. | `gpu_device`
| Total des dispositifs         | Nombre total de dispositifs envoyant des données pendant cette période. | `gpu.device.total`
| Dispositifs alloués     | (disponible uniquement si Kubernetes est utilisé) Nombre de dispositifs qui ont été alloués à une charge de travail. | `gpu.device.total`
| Dispositifs actifs        | Nombre de dispositifs qui sont utilisés activement pour une charge de travail / occupés. Si Kubernetes est utilisé : nombre de dispositifs alloués qui sont utilisés activement pour une charge de travail. | `gpu.gr_engine_active`
| Dispositifs efficaces     | Nombre de dispositifs qui sont utilisés et fonctionnent plus de 50 % de leur durée de vie. | `gpu.sm_active`
| Activité du moteur graphique| Pourcentage de temps pendant lequel le moteur graphique était actif. | `gpu.gr_engine_active`
| Activité SM           | Pourcentage de temps pendant lequel le multiprocesseur de streaming était actif. | `gpu.sm_active`
| Horloge SM              | Fréquence de l'horloge SM en MHz. | `gpu.clock_speed.sm`
| Débit PCIe RX    | Octets reçus via PCI depuis le dispositif GPU par seconde. | `gpu.pci.throughput.rx`
| Débit PCIe TX    | Octets transmis via PCI au dispositif GPU par seconde. | `gpu.pci.throughput.tx`
| Puissance                 | Utilisation de la puissance pour le dispositif GPU.<br>**Remarque** : Sur les architectures GA100 et précédentes, cela représente la puissance instantanée à ce moment.<br>Pour les architectures plus récentes, cela représente la consommation moyenne de puissance (Watts) sur une seconde. | `gpu.power.usage`
| Température           | Température d'un dispositif GPU. | `gpu.temperature`
| Cœurs utilisés            | (Émis uniquement si des processus sont actifs) Nombre moyen de cœurs GPU qu'un processus utilisait dans l'intervalle.  | `gpu.core.usage`
| Limite de cœurs           | Nombre de cœurs GPU que le processus, le conteneur ou le dispositif a à sa disposition. | `gpu.core.limit`
| Mémoire utilisée           | (Émis uniquement si des processus sont actifs) La mémoire utilisée par ce processus au moment où la métrique a été soumise. | `gpu.memory.usage`
| Limite de mémoire          | La quantité maximale de mémoire qu'un processus, un conteneur ou un dispositif pourrait allouer. | `gpu.memory.limit`
| Tonnes métriques de CO2       | Les tonnes métriques d'équivalent en dioxyde de carbone (MTCO2e) sont une unité de mesure qui compare les émissions de gaz à effet de serre en fonction de leur potentiel de réchauffement climatique (PRC). Il est calculé en multipliant la quantité d'un gaz par son GWP. Par exemple, si le méthane a un GWP de 21, alors 1 million de tonnes métriques de méthane équivaut à 21 millions de tonnes de dioxyde de carbone. | Formule basée sur `gpu.power.usage`
| Utilisation du cœur      | (Disponible uniquement si le système Probe est activé) `Cores Used/Cores Limit` pour les processus GPU. Mesure de l'utilisation du cœur temporel. | `gpu_core_utilization`  
| Utilisation de la mémoire    | Mémoire GPU utilisée / Limite de mémoire GPU pour les processus GPU. | `gpu_memory_utilization`
| Coût d'inactivité             | (Non nul uniquement pour les périodes de temps supérieures à 2 jours) Le coût des ressources GPU qui sont réservées et allouées, mais non utilisées.
{{% /collapse-content %}} 

## Panneau latéral des détails 

Cliquer sur n'importe quelle ligne dans le tableau de la flotte ouvre un panneau latéral avec plus de détails pour le cluster, l'hôte ou le dispositif sélectionné.

### Entités connectées 

La surveillance GPU de Datadog n'a pas besoin de s'appuyer sur l'exportateur DCGM de NVIDIA. Elle utilise l'Agent Datadog pour observer directement les GPU, fournissant des informations sur l'utilisation des GPU et les coûts pour les pods et les processus. Sous la section **Entités connectées** dans n'importe quelle vue détaillée, vous pouvez voir l'activité SM, l'utilisation des cœurs GPU (uniquement si le système Probe est activé) et l'utilisation de la mémoire des pods, des processus et des travaux Slurm. Cela vous aide à identifier quels workloads réduire ou optimiser pour diminuer les dépenses totales. 

**Remarque** : L'onglet **Pods** n'est disponible que si vous utilisez Kubernetes.

{{< tabs >}}
{{% tab "Panneau latéral du cluster" %}}

Dans ce panneau latéral, vous avez un entonnoir spécifique au cluster qui identifie :

- Nombre total, alloué (utilisateurs Kubernetes uniquement), actif et efficace de dispositifs au sein de ce cluster particulier
- Coût total estimé et coût d'inactivité de ce cluster
- Entités connectées de ce cluster : pods, processus et travaux Slurm.
- Quatre indicateurs clés (personnalisables) pour ce cluster : Utilisation du cœur (uniquement si la sonde système est activée), Utilisation de la mémoire, Débit PCIe et Activité graphique
- Tableau des hôtes associés à ce cluster

{{< img src="gpu_monitoring/cluster_sidepanel.png" alt="Panneau latéral spécifique au cluster qui décompose les appareils inactifs, les coûts et les entités connectées" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panneau latéral de l'hôte" %}}

Dans ce panneau latéral, vous avez une vue spécifique à l'hôte qui identifie :

- Métadonnées liées à l'hôte telles que le fournisseur, le type d'instance, l'utilisation du CPU, la mémoire système utilisée, la mémoire système totale, l'utilisation des E/S système, l'activité SM et la température
- (uniquement disponible pour les utilisateurs de Kubernetes) Les dispositifs GPU spécifiques alloués à cet hôte triés par Activité du moteur graphique
- Entités connectées de cet hôte : pods, processus et travaux Slurm

{{< img src="gpu_monitoring/host_sidepanel.png" alt="Panneau latéral spécifique à l'hôte qui affiche les dispositifs GPU liés à cet hôte et les entités connectées" style="width:100%;" >}}

{{% /tab %}}

{{% tab "Panneau latéral du dispositif" %}}

Dans ce panneau latéral, vous avez une vue spécifique au dispositif qui identifie :

- Recommandations (le cas échéant) sur la manière d'utiliser ce dispositif plus efficacement 
- Détails liés au dispositif : type de dispositif, activité SM et température
- Quatre indicateurs clés liés aux GPU : Activité SM, Utilisation de la mémoire, Puissance et Activité du moteur graphique 
- Entités connectées de ce cluster : pods et processus

{{< img src="gpu_monitoring/device_sidepanel.png" alt="Panneau latéral spécifique au dispositif qui affiche des recommandations sur la manière d'utiliser le dispositif plus efficacement et d'autres télémetries clés." style="width:100%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Recommandations d'installation

Datadog surveille activement votre infrastructure et détecte les lacunes d'installation qui peuvent diminuer la valeur que vous tirez de la surveillance des GPU. Dans ce modal, vous pouvez trouver des recommandations de mise à jour d'installation pour obtenir la valeur optimale de la surveillance des GPU. Par exemple, s'assurer que vos hôtes ont la [dernière version][1] de l'Agent Datadog installé, installer la dernière version du pilote NVIDIA et vérifier les hôtes mal configurés.

Pour voir les fonctionnalités avancées de surveillance GPU, telles que l'attribution des ressources GPU par les processus ou les tâches SLURM associés, vous devez activer [Live Processes][3] et l'intégration [Slurm][4], respectivement.

{{< img src="gpu_monitoring/installation.png" alt="Modal contenant des instructions d'installation pour une expérience utilisateur de surveillance GPU plus fluide." style="width:90%;" >}}

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[1]: https://github.com/DataDog/datadog-agent/releases
[2]: https://www.nvidia.com/drivers/
[3]: /fr/infrastructure/process/
[4]: /fr/integrations/slurm/