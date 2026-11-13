---
description: Des informations en temps réel sur l'ensemble de votre parc de GPU pour
  un meilleur provisionnement et une optimisation des coûts
further_reading:
- link: https://www.datadoghq.com/blog/datadog-gpu-monitoring/
  tag: Blog
  text: Optimisez et dépannez votre infrastructure IA avec Datadog GPU Monitoring
- link: /gpu_monitoring/explorer
  tag: Documentation
  text: GPU Monitoring Explorer
title: Page de résumé de GPU Monitoring
---
## Présentation {#overview}

La [GPU Monitoring Summary page][0] analyse l'ensemble de votre parc de GPU et met en évidence des informations unifiées sur vos appareils sur site et dans le cloud pour la période sélectionnée. Cette page répond à des questions clés telles que :
- Quelle part de votre parc est utilisée efficacement ou est complètement inactive ?
- Quelles équipes, quels services ou quels clusters gaspillent le plus de ressources, au regard des heures d'inactivité ?
- Comment pouvez-vous mieux provisionner ces appareils en fonction des besoins des charges de travail et de l'efficacité d'utilisation des quotas ?
- Quelles actions d'optimisation pouvez-vous entreprendre pour tirer davantage de valeur de votre parc de GPU existant ?

Cliquez sur les titres de section ci-dessous pour accéder à la section correspondante :
- [Usage Across Fleet](#usage-across-fleet)
- [Cost & Utilization](#cost--utilization)
- [Allocation and Provisioning](#allocation-and-provisioning)
- [Workload Optimization Opportunities](#workload-optimization-opportunities)

## Usage across Fleet {#usage-across-fleet}

L'efficacité opérationnelle est un facteur clé du coût global. Comprendre l'utilisation de votre parc de GPU peut aider à éviter le surprovisionnement et à réduire les dépenses liées aux GPU inactifs.

### Visualisation en entonnoir du parc de GPU {#gpu-fleet-funnel-visualization}

Datadog GPU Monitoring offre une observabilité pour les appareils sur site et dans le cloud au sein d'une vue unique et unifiée.

Cette visualisation présente la répartition de l'ensemble de votre parc de GPU, qu'il soit hébergé chez un grand fournisseur cloud (AWS, GCP, Azure, Oracle Cloud), sur site ou chez un fournisseur de GPUaaS comme Coreweave ou Lambda Labs -- et affiche tous vos clusters Kubernetes, hosts et appareils GPU.

L'entonnoir met également en évidence les problèmes de performance ou les inefficacités de provisionnement dans les efforts d'utilisation des ressources de vos équipes, tels que les appareils inactifs, les cœurs GPU sous-utilisés ou la pénurie de ressources nécessitant un rééquilibrage.

{{< img src="gpu_monitoring/funnel-5.jpg" alt="Visualisation en entonnoir intitulée « Votre parc GPU en un coup d'œil ». Affiche le nombre total d'appareils, d'appareils actifs et d'appareils utilisés efficacement, ainsi que l'allocation Kubernetes et l'allocation des appareils au fil du temps, avec une prévision sur une semaine." style="width:90%;" >}}

Les étapes de l'entonnoir sont définies comme suit :
- {{< ui >}}Total Devices{{< /ui >}} : nombre d'appareils GPU pour lesquels GPU Monitoring est correctement configuré et qui transmettent des métriques
- {{< ui >}}Active Devices{{< /ui >}} : nombre d'appareils GPU activement utilisés pour une charge de travail et qui apportent de la valeur
- {{< ui >}}Effective Devices{{< /ui >}} : nombre d'appareils GPU qui fonctionnent pendant plus de 50 % de la période sélectionnée

Si vous utilisez Kubernetes et avez activé l'intégration Kubernetes, vous verrez des informations supplémentaires sur Kubernetes Allocation, qui vous permettront de déterminer combien de vos appareils GPU sont {{< ui >}}Allocated{{< /ui >}} aux charges de travail Kubernetes.

### Device allocation over time {#device-allocation-over-time}

Les charges de travail IA peuvent subir des pics imprévisibles d'utilisation des ressources. Par conséquent, il est important d'aligner les GPU disponibles avec les charges de travail entrantes. Cette section vous aide à identifier si vous surallouez des GPU qui finissent par rester inactifs, ou si vous sous-provisionnez des ressources qui bloquent des jobs critiques.

Par exemple, si vous constatez un pic dans les valeurs prévisionnelles du nombre d'appareils alloués, vos futures charges de travail pourraient nécessiter des appareils GPU supplémentaires.

## Cost & Utilization {#cost-utilization}

{{< img src="gpu_monitoring/cost-and-utilization2.jpg" alt="Page Cost & Utilization affichant le nombre total d'heures GPU et le coût estimé au fil du temps, regroupés par cluster, ainsi qu'une répartition des GPU inactifs avec les principaux clusters selon leurs heures d'inactivité et leur coût estimé lié à l'inactivité." style="width:90%;" >}}

Utilisez cette section pour suivre vos dépenses totales en GPU dans le cloud et l'efficacité de leur utilisation, et les attribuer aux clusters, équipes ou services qui gaspillent le plus de ressources.

**Remarque** : pour voir les dépenses totales en GPU cloud, vous devez activer les intégrations cloud [AWS][3], [Google Cloud][4], [Azure][5] ou [Oracle][6] dans votre interface utilisateur Datadog.

Cliquez sur le nombre total d'heures GPU ou sur les dépenses cloud GPU estimées pour voir leur évolution au fil du temps. Vous pouvez également les ventiler selon des tags clés, tels que service ou cluster, sur des périodes de 1 semaine, 1 mois ou 3 mois. Sous {{< ui >}}Idle GPU Breakdown{{< /ui >}}, vous pouvez identifier les équipes, services ou clusters qui gaspillent le plus de ressources en laissant des appareils complètement inactifs. Cliquez sur n'importe quelle entité pour l'ouvrir dans l'[Explorer][1] et effectuer d'autres optimisations. Par exemple, si un cluster particulier est coûteux, vous pouvez consulter l'utilisation au niveau des pods sur la page [Explorer][1] pour arrêter des pods ou redimensionner votre cluster.

## Allocation and Provisioning {#allocation-and-provisioning}

Utilisez cette section pour obtenir des informations sur l'allocation et la capacité des GPU. Cela vous aide à résoudre les problèmes de charges de travail ayant échoué en raison de contraintes GPU et à améliorer l'efficacité opérationnelle de votre parc.

### Cloud provider instance breakdown {#cloud-provider-instance-breakdown}

Si vous utilisez des GPU déployés par les principaux fournisseurs de cloud, ce widget présente la répartition des types d'instances cloud au sein de votre parc.

{{< img src="gpu_monitoring/instance_breakdown.png" alt="Le widget Cloud provider instance breakdown" style="width:90%;" >}}

### Device type breakdown {#device-type-breakdown}

Lorsque des charges de travail IA échouent, cela peut être dû au nombre d'appareils GPU disponibles plutôt qu'aux performances du code. Ce widget affiche la disponibilité de tous vos types d'appareils GPU et met en évidence les pools de types d'appareils entièrement saturés (ce qui indique que des appareils supplémentaires pourraient être nécessaires).

Pour savoir si des pools de types d'appareils nécessitent un provisionnement supplémentaire, comparez ces données avec le widget {{< ui >}}Unmet GPU requests{{< /ui >}} situé en dessous.

**Remarque** : si le nombre d'appareils disponibles pour un type d'appareil est inférieur à 5 % du nombre total d'appareils, ce type d'appareil est mis en surbrillance en rouge.

{{< img src="gpu_monitoring/device_type.png" alt="Disponibilité par type d'appareil GPU" style="width:90%;" >}}

### Identifiez les zones où les ressources GPU sont insuffisantes pour orienter vos décisions de provisionnement (Kubernetes requis) {#pinpoint-areas-with-insufficient-gpu-resources-to-guide-provisioning-decisions-kubernetes-required}

**Remarque** : cette section est uniquement disponible pour les utilisateurs de Kubernetes. 

Utilisez cette section pour identifier le nombre de demandes GPU non satisfaites pour vos clusters Kubernetes.

{{< img src="gpu_monitoring/unmet-requests-2.png" alt="Classement des principaux clusters Kubernetes selon le nombre de demandes GPU non satisfaites." style="width:90%;" >}}

Si vous avez des clusters Kubernetes avec un grand nombre de demandes GPU non satisfaites, vous pouvez également consulter leur widget {{< ui >}}Device Type Breakdown{{< /ui >}} pour comprendre de quel type d'appareil dépend le service concerné, et le widget {{< ui >}}Device Allocation over time{{< /ui >}} pour suivre l'historique des demandes. Cela vous aide à confirmer si ces clusters et types d'appareils sont systématiquement sous-provisionnés.

**Remarque** : si aucun service ou cluster n'est répertorié et que vous émettez les tags appropriés, cela indique que tous vos services et clusters disposent de ressources GPU suffisantes pendant la période sélectionnée.

## Workload optimization opportunities {#workload-optimization-opportunities}

L'optimisation des coûts de vos charges de travail GPU est cruciale, car les GPU sont souvent les éléments les plus coûteux du budget d'infrastructure d'une équipe. Cette section révèle les charges de travail qui utilisent les GPU de manière inefficace et associe les dépenses inutiles à des charges de travail précises et à leur utilisation des ressources.

### Ineffective pods (Kubernetes requis) {#ineffective-pods-kubernetes-required}

**Remarque** : cette section est uniquement disponible pour les utilisateurs de Kubernetes. 

Pour maximiser la valeur de vos dépenses d'infrastructure GPU, il est important de maintenir vos appareils GPU constamment occupés. Ce widget révèle quels pods utilisent leurs appareils GPU associés de manière inefficace. Par défaut, le tableau est trié selon {{< ui >}}SM activity{{< /ui >}}.

{{< img src="gpu_monitoring/inefficient_pods.png" alt="Tableau des pods inefficaces triés par niveau de SM Engine Activity." style="width:90%;" >}}

Cliquer sur n'importe quel pod inefficace ouvre un menu avec une option pour l'afficher sur la page Kubernetes Explorer. Sur la page Kubernetes Explorer, vous pouvez accéder à la vue détaillée du pod et cliquer sur l'onglet {{< ui >}}GPU{{< /ui >}} pour voir ses appareils GPU associés.

Par exemple, vous pouvez remarquer que le graphique de la série temporelle de l'activité SM passe sous les 50 %. Vous pouvez ensuite vérifier si les valeurs {{< ui >}}Memory Utilization{{< /ui >}} et {{< ui >}}Graphics Activity{{< /ui >}} de vos appareils ont atteint un pic au cours de cette période ; si tel est le cas, cela explique la faible SM Engine Activity (appareils inactifs). Pour remédier à cela, vous pouvez contacter le propriétaire du pod pour lui proposer de consolider la charge de travail sur un plus petit nombre d'appareils, d'utiliser un GPU plus petit ou d'optimiser son code afin d'obtenir un meilleur débit avec le GPU existant.

Ce widget vous aide également à identifier les « noisy neighbors » (cas où un ou plusieurs pods consomment une quantité disproportionnée de ressources partagées sur un host). Par exemple, un autre pod peut utiliser la totalité du CPU d'un host donné, au détriment des autres pods présents sur ce host.

### Processus zombies (Live Processes requis) {#zombie-processes-live-processes-required}

**Remarque** : Cette section est uniquement disponible pour les clients ayant installé le produit [Live Processes][2]. 

Les processus zombies sont souvent la principale source de dépenses GPU inutiles, car ils réservent indûment de la capacité GPU. Ce widget répertorie tous les processus zombies qui devraient être terminés pour libérer cette capacité GPU pour d'autres charges de travail.

{{< img src="gpu_monitoring/zombie_processes.png" alt="Tableau des processus zombies à terminer pour libérer de la capacité GPU, trié par SM Engine Activity." style="width:90%;" >}}

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[0]: https://app.datadoghq.com/gpu-monitoring
[1]: https://app.datadoghq.com/gpu-monitoring?mConfigure=false&mPage=fleet
[2]: /fr/infrastructure/process/?tab=linuxwindows
[3]: /fr/getting_started/integrations/aws/
[4]: /fr/getting_started/integrations/google_cloud/?tab=orglevel
[5]: /fr/getting_started/integrations/azure/?tab=createanappregistration
[6]: /fr/getting_started/integrations/oci/