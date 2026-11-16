---
aliases:
- /fr/observability_pipelines/best_practices_for_scaling_observability_pipelines/
description: Apprenez l'architecture d'agrégateur recommandée, l'optimisation des
  instances et les pratiques de planification de la capacité pour la mise à l'échelle
  des Observability Pipelines Workers dans les grands déploiements.
further_reading:
- link: https://www.datadoghq.com/architecture/op-vm-deployment/
  tag: Architecture Center
  text: Déploiement d'Observability Pipelines VM
- link: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/
  tag: Architecture Center
  text: Déploiement d'Observability Pipelines pour Kubernetes
title: Recommandations pour la mise à l'échelle des Observability Pipelines
---
<div class="alert alert-info">
Ce guide est destiné aux déploiements à grande échelle en production.
</div>

## Présentation {#overview}

Déployez l'Observability Pipelines Worker dans votre infrastructure, comme vous le feriez pour tout autre service, afin d'intercepter, de manipuler et de transférer des données vers vos destinations. Chaque instance d'Observability Pipelines Worker est conçue pour fonctionner indépendamment, vous permettant de mettre à l'échelle votre architecture avec l'équilibrage de charge.

Ce guide vous présente le modèle d'agrégateur recommandé pour les nouveaux utilisateurs d'Observability Pipelines Worker, spécifiquement :

- [Modèles et approches d'architecture](#architecture)
- [Optimisation de l'instance](#optimize-the-instance) afin que vous puissiez mettre à l'échelle horizontalement l'agrégateur Observability Pipelines Worker.
- Points de départ pour estimer votre capacité de ressources pour la [planification de la capacité et la mise à l'échelle](#capacity-planning-and-scaling) du Observability Pipelines Worker.

## Architecture {#architecture}

Cette section couvre :

- Modèles d'architecture :
	- [Modèle basé sur des VM](#vm-based-architecture)
	- [Modèle basé sur Kubernetes](#kubernetes-based-architecture)
- [Approche centralisée vs décentralisée](#centralized-vs-decentralized-approach)
- [Choisir entre une architecture basée sur des VM et une architecture basée sur Kubernetes](#choosing-a-vm-based-vs-kubernetes-based-architecture)

### Modèles d'architecture {#architecture-models}

Il existe deux modèles d'architecture courants :

- **Architecture basée sur des machines virtuelles (basée sur des VM)** : un modèle basé sur l'host, précédé d'un équilibreur de charge.
- **Architecture basée sur Kubernetes** : un modèle basé sur des conteneurs qui peut éventuellement être placé derrière un contrôleur d'entrée ou un équilibreur de charge (pour les sources externes au cluster, un service Kubernetes gère les requêtes internes au cluster).

Les deux modèles peuvent être appliqués à une approche centralisée ou décentralisée. Dans une approche centralisée, les Workers fonctionnent à l'échelle mondiale, à travers des centres de données ou des régions. Dans une approche décentralisée, les Workers fonctionnent à l'échelle locale, c'est-à-dire dans la région, le centre de données ou le cluster où se trouve la source de données. Pour les environnements à grande échelle couvrant de nombreux centres de données, régions ou comptes de fournisseurs cloud, un modèle hybride peut être approprié.

En règle générale, Datadog recommande de faire fonctionner le Worker aussi près que possible de la source de données. Cela peut nécessiter davantage de frais administratifs et d'infrastructure, mais cela réduit les préoccupations concernant les problèmes de transit réseau et les points de défaillance uniques.

Pour les deux modèles, Datadog recommande de mettre à l'échelle les Workers [horizontalement][1] pour gérer une charge accrue et maintenir une haute disponibilité. Vous pouvez y parvenir en utilisant un groupe d'instances géré (tel qu'un autoscaling group) ou horizontal pod autoscaling.

Le Worker peut également être mis à l'échelle [verticalement][2], ce qui tire parti de cœurs et de mémoire supplémentaires sans aucune configuration additionnelle. Pour certains processeurs, tels que le processeur Sensitive Data Scanner avec de nombreuses règles activées, ou pour des cas d'utilisation à traitement intensif, le Worker bénéficie de cœurs supplémentaires pour permettre l'exécution de threads en parallèle. Lors d'une mise à l'échelle verticale, Datadog recommande de limiter la taille d'une instance afin qu'elle ne traite pas plus de 33 % de votre volume total. Cela permet une haute disponibilité en cas de défaillance d'un nœud.

#### Architecture basée sur VM {#vm-based-architecture}

Le diagramme d'architecture suivant concerne une architecture basée sur l'host, où un équilibreur de charge accepte le trafic provenant de sources basées sur le push. Si seules des sources basées sur le pull sont utilisées, un équilibreur de charge n'est pas requis. Dans le diagramme, le Worker fait partie d'un groupe d'instances géré qui s'adapte en fonction des besoins de traitement. Consultez [Déploiement de VM Observability Pipelines][9] pour plus de détails.

{{< img src="observability_pipelines/scaling_best_practices/vm-infra.png" alt="Diagramme montrant le Worker faisant partie d'un groupe d'instances géré" style="width:100%;" >}}


#### Architecture basée sur Kubernetes {#kubernetes-based-architecture}

Le diagramme d'architecture suivant concerne une architecture basée sur des conteneurs, où le service Kubernetes agit comme routeur vers le statefulset et accepte le trafic provenant de sources basées sur le push. Si vous envoyez de la télémétrie depuis l'extérieur du cluster, définissez le [service.type sur `LoadBalancer`][3] ou installez un [ingress controller][4] et configurez une [ingress][5] pour le routage. Le Worker s'exécute dans le cadre d'un statefulset et prend en charge la mise à l'échelle horizontale des pods pour ajuster la capacité en fonction des besoins de traitement. Comme pour l'architecture basée sur des VM, les Workers peuvent également évoluer verticalement et tirer parti de plusieurs cœurs pour le traitement parallèle. Consultez [Déploiement d'Observability Pipelines pour Kubernetes][10] pour plus de détails.

{{< img src="observability_pipelines/scaling_best_practices/containerized-infra.png" alt="Diagramme montrant le Worker dans le cadre d'un statefulset" style="width:100%;" >}}

### Choisir entre une architecture basée sur des VM et une architecture basée sur Kubernetes {#choosing-a-vm-based-vs-kubernetes-based-architecture}

Choisissez l'architecture basée sur Kubernetes si :

- Vos sources de logs se trouvent au sein d'un cluster Kubernetes et vous souhaitez utiliser l'approche décentralisée
- Votre organisation utilise intensivement Kubernetes et le maîtrise parfaitement

Choisissez l'architecture basée sur des VM si votre organisation est davantage centrée sur les VM et ne maîtrise pas Kubernetes.

Le choix entre les deux modèles dépend de ce que votre organisation est la mieux équipée pour faire du point de vue de l'infrastructure. Chaque modèle offre la possibilité de mettre à l'échelle automatiquement en fonction de l'utilisation du CPU, qui constitue généralement la contrainte principale pour Observability Pipelines. Consultez [Optimiser l'instance][6] pour plus d'informations.

### Approche centralisée vs décentralisée {#centralized-vs-decentralized-approach}

Datadog recommande l'approche décentralisée consistant à déployer les Workers aussi près que possible de la source de données. Cela signifie placer les Workers au sein de chaque emplacement où les données sont générées, comme la région, le cluster ou le centre de données. Le modèle décentralisé est préférable pour les environnements avec de grands volumes de données :

- Minimise le transit réseau inter-région ou inter-centre de données
- Évite les problèmes de performance potentiels liés au transfert de données inter-région ou inter-compte
- Aide à réduire les coûts de transfert de données en maintenant le traitement localement au niveau des sources de données
- Réduit la latence de livraison des logs en traitant les données à la source avant leur transfert

Un déploiement centralisé exécute les Workers dans un emplacement unique, agrégeant les données provenant de plusieurs régions, clusters ou centres de données. Un pool unique de Workers peut recevoir des données provenant de plusieurs clusters Kubernetes ou comptes AWS. Cette approche fonctionne mieux pour des volumes de données plus faibles ou lorsque le peering réseau existe déjà entre ces environnements. Sachez que les transferts de données à haut volume entre régions ou comptes peuvent entraîner des coûts supplémentaires.

Un modèle hybride est un bon compromis entre les approches décentralisée et centralisée, en particulier pour les déploiements d'infrastructures vastes et étendues. Par exemple, si vous avez six régions et que dans chaque région vous avez 10 clusters Kubernetes, plutôt que :

- Déployer des Workers dans chaque cluster, ce qui entraîne 60 déploiements
- Déployer des Workers dans une seule région et acheminer le trafic entre les régions, ce qui introduit un point de défaillance unique

Une approche hybride utilise un cluster Kubernetes dédié ou un groupe d'instances géré dans chaque région, ce qui ne nécessite que six déploiements. Les 10 clusters au sein de chaque région envoient leurs données au déploiement régional de l'Observability Pipelines Worker (OPW).

## Optimiser l'instance {#optimize-the-instance}

### Dimensionnement de l'instance {#instance-sizing}

Sur la base d'analyses de performance pour un pipeline utilisant 12 processeurs pour transformer les données, le Worker peut traiter environ 1 To par vCPU par jour. Par exemple, si vous avez 4 To d'événements par jour, vous devez provisionner suffisamment de ressources de calcul, avec une marge de sécurité, pour couvrir vos volumes. Cela pourrait correspondre à trois machines ou conteneurs à deux cœurs, ou à une machine ou un conteneur à six cœurs. 

L'Observability Pipelines Worker est presque toujours limité par le CPU et, comme les métriques d'utilisation du CPU ne produisent pas de faux positifs, elles constituent le signal le plus fiable pour la mise à l'échelle automatique. Datadog recommande de déployer les Workers dans le cadre d'un groupe de mise à l'échelle automatique ou avec [Horizontal Pod Autoscaling][7] activé. Ne vous reposez pas sur un nombre de machines virtuelles ou de conteneurs configuré de manière statique. Cela permet de garantir que vous pouvez gérer en toute sécurité les pics de trafic sans perte de données et maintenir une haute disponibilité si un Worker tombe en panne.

Pour les environnements à haut débit, Datadog recommande des types de machines plus grands car ils disposent généralement d'une bande passante réseau plus élevée. Consultez la documentation de votre fournisseur cloud pour plus de détails (par exemple, [bande passante réseau des instances Amazon EC2][8]).

| Fournisseur cloud| Recommandation (minimum) |
| ------------- | ------------------------ |
| AWS           | c7i.xlarge               |
| Azure         | F4s v2       	           |
| Google Cloud  | c2-standard-4            |

**Remarque** : 1 vCPU = 1 processeur physique ARM ou 0,5 processeur physique Intel avec hyperthreading.

### Dimensionnement du processeur {#cpu-sizing}

La plupart des charges de travail des Observability Pipelines Worker sont limitées par le processeur et bénéficient des processeurs modernes.

| Fournisseur cloud| Recommandation                                                        |
| ------------- | --------------------------------------------------------------------- |
| AWS           | Intel Xeon de dernière génération, 8 vCPUs (recommandé), au moins 4 vCPUs |
| Azure         | Intel Xeon de dernière génération, 8 vCPUs (recommandé), au moins 4 vCPUs |
| Google Cloud  | Intel Xeon de dernière génération, 8 vCPUs (recommandé), au moins 4 vCPUs |
| Private       | Intel Xeon de dernière génération, 8 vCPUs (recommandé), au moins 4 vCPUs |

### Architectures de processeur {#cpu-architectures}

L'Observability Pipelines Worker fonctionne sur des architectures processeur x86 et ARM modernes.

### Dimensionnement de la mémoire {#memory-sizing}

En raison du système de typage affine de l'Observability Pipelines Worker, la mémoire est rarement limitée pour les charges de travail de l'Observability Pipelines Worker. Par conséquent, Datadog recommande un minimum de ≥2 Gio de mémoire par vCPU. L'utilisation de la mémoire augmente avec le nombre de destinations en raison de la mise en mémoire tampon et du traitement par lots. Si vous avez un grand nombre de destinations, envisagez d'augmenter la mémoire.

### Dimensionnement du disque {#disk-sizing}

Vous avez besoin de 500 Mo d'espace disque pour installer l'Observability Pipelines Worker.

## Planification de la capacité et mise à l'échelle {#capacity-planning-and-scaling}

### Unités pour les estimations {#units-for-estimations}

Les unités suivantes servent de points de départ pour estimer la capacité de vos ressources, mais elles peuvent varier en fonction de votre workload.

| Unité                  | Taille      | Débit d'Observability Pipelines Worker*|
| ----------------------| --------- | ----------------------------------------- |
| Événement de log non structuré| ~512 octets| ~10 MiB/s/vCPU                            |
| Événement de log structuré  | ~1,5 Ko   | ~25 MiB/s/vCPU                            |

*Ces chiffres sont conservateurs à des fins d'estimation. 1 vCPU = 1 processeur physique ARM et 0,5 processeur physique Intel.

### Mise à l'échelle {#scaling}

#### Mise à l'échelle horizontale {#horizontal-scaling}

La mise à l'échelle horizontale consiste à répartir le trafic entre plusieurs instances d'Observability Pipelines Worker. Observability Pipelines Worker possède une architecture sans partage et ne nécessite pas de nœuds principaux ni aucune coordination de ce type qui pourrait compliquer la mise à l'échelle.

Pour les sources basées sur une méthode push, placez un répartiteur de charge réseau en amont de vos instances de l'Observability Pipelines Worker et dimensionnez-les en fonction des besoins.

Un équilibreur de charge n'est pas requis pour les sources basées sur le modèle pull. Déployez Observability Pipelines Worker et adaptez sa taille à la hausse ou à la baisse selon vos besoins. Votre système de publication-abonnement coordonne l'accès exclusif aux données lorsque Observability Pipelines Worker demande à les lire.

##### Équilibrage de charge {#load-balancing}

Un équilibreur de charge n'est requis que pour les sources basées sur le modèle push, telles que les agents. Vous n'avez pas besoin d'un équilibreur de charge si vous utilisez exclusivement des sources basées sur le modèle pull, comme Kafka.

###### Équilibrage de charge côté client {#client-side-load-balancing}

L'équilibrage de charge côté client n'est pas recommandé. L'équilibrage de charge côté client fait référence aux clients qui effectuent l'équilibrage de charge du trafic entre plusieurs instances d'Observability Pipelines Worker. Bien que cette approche semble plus simple, elle peut être moins fiable et plus compliquée car :

- L'équilibrage de charge avec basculement approprié est complexe. Les problèmes dans ce domaine sont sensibles car ils peuvent entraîner une perte de données ou des incidents qui perturbent vos services. Cela est exacerbé si vous travaillez avec plusieurs types de clients.
- L'intérêt de l'agrégateur Observability Pipelines Worker est de décharger vos agents, et la prise en charge de l'équilibrage de charge permet d'y parvenir.

###### Types d'équilibreur de charge {#load-balancer-types}

Datadog recommande des équilibreurs de charge de couche 4 (L4) (équilibreurs de charge réseau) car ils prennent en charge les protocoles d'Observability Pipelines Worker (TCP, UDP et HTTP). Même si vous envoyez exclusivement du trafic HTTP (couche 7), Datadog recommande des équilibreurs de charge L4 pour leurs performances et leur simplicité.

| Fournisseur cloud| Recommandation                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | AWS Network Load Balancer (NLB)                               |
| Azure         | Internal Azure Load Balancer                                  |
| Google Cloud  | Internal TCP/UDP Network Load Balancer                        |
| Private       | HAProxy, NGINX, ou un autre load balancer avec prise en charge de la couche 4 |

###### Configurations de l'équilibreur de charge {#load-balancer-configurations}

Lors de la configuration des clients et des équilibreurs de charge, Datadog recommande les paramètres généraux suivants :

- Utilisez une stratégie d'équilibrage de charge round-robin simple.
- N'activez pas l'équilibrage de charge inter-zones à moins que le trafic entre les zones ne soit très déséquilibré.
- Configurez les équilibreurs de charge pour utiliser l'endpoint de l'API health d'Observability Pipelines Worker pour l'état de la cible.
- Assurez-vous que vos instances d'Observability Pipelines Worker s'enregistrent ou se désenregistrent automatiquement lors de leur mise à l'échelle.
- Activez le keep-alive avec un délai d'inactivité d'une minute maximum pour vos clients et vos équilibreurs de charge.
- Si cela est pris en charge, activez la simultanéité et le regroupement de connexions sur vos agents. Si cela n'est pas pris en charge, envisagez l'architecture unifiée qui déploie Observability Pipelines Worker à la périphérie. Le regroupement de connexions garantit que de grands volumes de données sont répartis sur plusieurs connexions pour aider à équilibrer le trafic.

###### Points chauds de l'équilibreur de charge {#load-balancer-hot-spots}

Les points chauds d'équilibrage de charge se produisent lorsqu'une ou plusieurs instances d'Observability Pipelines Worker reçoivent un trafic disproportionné. Les points chauds surviennent généralement pour l'une des deux raisons suivantes :

1. Une quantité importante de trafic est envoyée via une seule connexion.
2. Le trafic dans une zone de disponibilité est beaucoup plus élevé que dans les autres.

Dans ces cas, les tactiques d'atténuation respectives suivantes sont recommandées :

1. Divisez les connexions volumineuses en plusieurs connexions. La plupart des clients autorisent la simultanéité et le regroupement de connexions qui répartissent les données sur plusieurs connexions. Cette tactique permet à votre équilibreur de charge de répartir la connexion sur plusieurs instances d'Observability Pipelines Worker. Si votre client ne prend pas cela en charge, envisagez l'architecture unifiée, où Observability Pipelines Worker peut être déployé en plus à la périphérie.
2. Activez l'équilibrage de charge inter-zones sur votre équilibreur de charge. L'équilibrage inter-zones répartit tout le trafic des zones de disponibilité sur toutes les instances d'Observability Pipelines Worker.

#### Mise à l'échelle verticale {#vertical-scaling}

Le modèle de concurrence d'Observability Pipelines Worker s'adapte automatiquement pour tirer parti de tous les vCPUs. Aucun paramètre de concurrence ni aucune modification de configuration ne sont requis. Lors d'une mise à l'échelle verticale, Datadog recommande de limiter la taille d'une instance pour traiter au maximum 50 % de votre volume total et de déployer au moins deux instances d'Observability Pipelines Worker pour assurer la haute disponibilité.

#### Mise à l'échelle automatique {#auto-scaling}

La mise à l'échelle automatique doit être basée sur l'utilisation moyenne du processeur. Pour la grande majorité des charges de travail, Observability Pipelines Worker est limité par le processeur. L'utilisation du processeur est le signal le plus fiable pour la mise à l'échelle automatique car elle ne produit pas de faux positifs. Datadog vous recommande d'utiliser les paramètres suivants, en les ajustant si nécessaire :

- CPU moyen avec un objectif d'utilisation de 85 %.
- Une période de stabilisation de cinq minutes pour le passage à l'échelle supérieure et inférieure.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#horizontal-scaling
[2]: /fr/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#vertical-scaling
[3]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L208-L209
[4]: https://kubernetes.io/docs/concepts/services-networking/ingress-controllers/
[5]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L238
[6]: /fr/observability_pipelines/scaling_and_performance/best_practices_for_scaling_observability_pipelines/#optimize-the-instance
[7]: https://github.com/DataDog/helm-charts/blob/main/charts/observability-pipelines-worker/values.yaml#L70-L85
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-network-bandwidth.html
[9]: https://www.datadoghq.com/architecture/op-vm-deployment/
[10]: https://www.datadoghq.com/architecture/observability-pipelines-kubernetes-deployment/