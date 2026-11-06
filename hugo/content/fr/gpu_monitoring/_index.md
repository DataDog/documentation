---
further_reading:
- link: /gpu_monitoring/setup
  tag: Documentation
  text: Configurez la surveillance GPU
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez votre infrastructure IA avec Datadog GPU Monitoring
- link: https://www.datadoghq.com/blog/monitor-tas-and-gang-scheduling-for-ai-training-in-kubernetes/
  tag: Blog
  text: Surveillez TAS et la planification de groupe (gang scheduling) pour l'entraînement
    d'IA dans Kubernetes
- link: https://www.datadoghq.com/architecture/gpu-monitoring/
  tag: Architecture Center
  text: Architecture de référence pour la surveillance GPU
title: Surveillance GPU
---
## Présentation {#overview}
La [surveillance GPU][1] de Datadog offre une vue centralisée de l'état, du coût et des performances de votre parc GPU. Elle permet aux équipes de prendre de meilleures décisions de provisionnement, d'optimiser et de dépanner les performances des charges de travail d'IA, et d'éliminer les coûts liés aux GPU inactifs sans avoir à configurer manuellement les outils de chaque fournisseur (comme DCGM de NVIDIA). La surveillance GPU prend en charge les parcs déployés chez les principaux fournisseurs cloud (AWS, GCP, Azure, Oracle Cloud), hébergés sur site ou provisionnés via des plateformes GPU-as-a-Service comme Coreweave et Lambda Labs. 

Vous pouvez accéder à des informations sur votre parc GPU en déployant le Datadog Agent sur vos hosts accélérés par GPU. Pour les instructions de configuration, consultez [Set up GPU Monitoring][2].

## Fonctionnalités clés {#key-capabilities}
### Prenez des décisions d'allocation et de provisionnement GPU basées sur les données {#make-data-driven-gpu-allocation-and-provisioning-decisions}
Grâce à une vue complète de l'ensemble de votre parc et de la capacité disponible, la surveillance GPU de Datadog vous aide à attribuer et à gérer votre infrastructure et votre capacité de manière équitable au sein de votre organisation. 

{{< img src="gpu_monitoring/funnel-3.png" alt="Visualisation en entonnoir intitulée « Votre parc GPU en un coup d'œil ». Affiche le nombre total de périphériques, ainsi que le nombre de périphériques actifs et effectifs. Met en évidence les cœurs GPU sous-utilisés et les périphériques inactifs." style="width:100%;" >}}

Vous pouvez également comprendre la disponibilité actuelle de vos périphériques et prévoir le nombre de périphériques nécessaires pour certaines équipes ou charges de travail afin d'éviter les échecs de charges de travail dus à la contention des ressources.

{{< img src="gpu_monitoring/device_allocation.png" alt="Graphiques pour aider à visualiser l'allocation GPU. Un graphique linéaire intitulé « Allocation des périphériques au fil du temps », traçant le nombre total/alloué/actif de périphériques, incluant une prévision à 4 semaines. Un graphique en anneau intitulé « Répartition des instances par fournisseur cloud », affichant la prévalence des instances de fournisseurs cloud dans tout le parc. Une « Répartition par type de périphérique » affichant le nombre alloué/total pour divers périphériques GPU." style="width:100%;" >}}

### Optimisez les performances des modèles et des applications {#maximize-model-and-application-performance}
Grâce à la télémétrie des ressources de la surveillance GPU, vous pouvez analyser les tendances des ressources et des métriques GPU (notamment l'utilisation, la puissance et la mémoire du GPU) par host, nœud ou pod au fil du temps, ce qui vous aide à comprendre l'impact des périphériques sur les performances de vos modèles et de vos applications. Par exemple, vous pouvez identifier les points chauds ou la sous-utilisation d'une infrastructure GPU coûteuse qui pourraient constituer des goulots d'étranglement pour l'exécution de vos charges de travail.

{{< img src="gpu_monitoring/device_metrics.png" alt="Vue détaillée d'un appareil, affichant des visualisations de séries temporelles configurables pour l'activité SM, l'utilisation de la mémoire, la puissance et l'activité du moteur." style="width:100%;" >}}

### Détectez de manière proactive les problèmes matériels {#proactively-detect-hardware-issues}
Les GPU sont une ressource coûteuse et rare qui présentent des taux de défaillance plus élevés que les serveurs standard. La solution de surveillance GPU de Datadog fournit des monitors prêts à l'emploi et des recommandations proactives pour vous aider à détecter et à résoudre les problèmes matériels avant qu'ils n'affectent vos charges de travail critiques.

### Identifiez et éliminez les coûts GPU inutiles et inactifs {#identify-and-eliminate-wasted-idle-gpu-costs}
Identifiez les dépenses totales liées à l'infrastructure GPU et attribuez ces coûts à des charges de travail et des instances spécifiques. Corrélez directement l'utilisation du GPU aux pods ou processus associés.

{{< img src="gpu_monitoring/fleet_costs.png" alt="Vue détaillée d'un cluster, affichant une visualisation en entonnoir des périphériques (total/alloué/actif/effectif), le coût cloud total, le coût cloud inactif, ainsi que des visualisations et des détails sur diverses entités connectées (pods, processeurs, jobs SLURM)." style="width:100%;" >}}

## Prêt à commencer ? {#ready-to-start}

Consultez [Set up GPU Monitoring][2] pour obtenir des instructions sur la configuration de la surveillance GPU de Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/gpu-monitoring
[2]: /fr/gpu_monitoring/setup