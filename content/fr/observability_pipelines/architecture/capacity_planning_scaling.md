---
kind: Documentation
title: Planification et dimensionnement des capacités
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">Les pipelines d'observabilité ne sont pas disponibles pour le site Datadog US1-FED.</div>
{{< /site-region >}}

<div class="alert alert-info">
Ce guide concerne les déploiements de production à grande échelle.
</div>

## Unités d'estimation

Les unités suivantes servent de points de départ pour estimer la capacité de vos ressources, mais elles peuvent varier en fonction de votre workload.

| Unité                  | Taille      | Débit du worker de pipelines d'observabilité*|
| ----------------------| --------- | ----------------------------------------- |
| Événement de log non structuré| ~512 octets| ~10 MiB/s/vCPU                            |
| Événement de log structuré  | ~1,5 Ko   | ~25 MiB/s/vCPU                            |
| Événement de métrique          | ~256 octets| ~25 MiB/s/vCPU                            |
| Événement de span de trace      | ~1,5 Ko   | ~25 MiB/s/vCPU                            |

* Ces chiffres constituent une évaluation prudente. 1 vCPU = 1 CPU physique ARM et un demi CPU physique Intel.

## Dimensionnement

### Dimensionnement horizontal

Le dimensionnement horizontal désigne la distribution du trafic sur plusieurs instances du worker de pipelines d'observabilité. Ce dernier possède une architecture « shared-nothing » (au sein de laquelle aucune ressource n'est partagée) et ne nécessite aucun nœud leader ni aucune coordination similaire qui pourraient compliquer le dimensionnement.

Pour les sources basées sur une méthode push, placez un répartiteur de charge réseau en amont de vos instances du worker de pipelines d'observabilité et dimensionnez-les en fonction des besoins.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="Un diagramme affichant une région cloud décomposées en agents, en répartiteurs de charge réseau et en un agrégateur du worker de pipelines d'observabilité. Les données des agents sont envoyées au répartiteur de charge, aux workers de pipelines d'observabilité, puis vers d'autres destinations" style="width:60%;" >}}

Le répartiteur de charge n'est pas requis pour les sources basées sur une méthode pull. Déployez le worker de pipelines d'observabilité et dimensionnez-le en fonction des besoins. Votre système de publication/abonnement coordonne l'accès exclusif aux données lorsque le worker de pipelines d'observabilité demande à les consulter.

{{< img src="observability_pipelines/production_deployment_overview/horizontal_scaling_push.png" alt="Un diagramme affichant une région cloud décomposées en agents, en brokers et en un agrégateur de pipelines d'observabilité. Les données des agents sont envoyées aux brokers, puis envoyées et reçues entre le broker et les workers de pipelines d'observabilité, avant d'être envoyées depuis les workers vers d'autres destinations" style="width:60%;" >}}

Consultez les [configurations avancées][1] pour en savoir plus sur les workloads mixtes (sources basées sur une méthode push et pull).

#### Équilibrage des charges

Un répartiteur de charge est requis uniquement pour les sources basées sur une méthode push, telles que les agents. Vous n'avez pas besoin d'un répartiteur de charge si vous utilisez exclusivement des sources basées sur une méthode pull, telles que Kafka.

##### Équilibrage des charges côté client

L'équilibrage des charges côté client n'est pas recommandé. Ce sont alors les clients qui procèdent à l'équilibrage des charges du trafic sur plusieurs instances du worker de pipelines d'observabilité. Si cette approche semble plus simple, elle peut s'avérer moins fiable et plus complexe pour les raisons suivantes :

- Parvenir à équilibrer les charges avec un failover adéquat est une opération complexe. Les problèmes rencontrés dans ce cas de figure sont délicats, car ils peuvent entraîner une perte de données ou des incidents qui interrompent vos services. Le risque est encore plus grand si vous travaillez avec plusieurs types de clients.
- L'objectif de l'agrégateur du worker de pipelines d'observabilité consiste à délester vos agents de toute responsabilité, et cela passe notamment par la prise en charge de l'équilibrage des charges.

##### Types de répartiteurs de charge

Datadog recommande l'utilisation de répartiteurs de charge de type L4 (layer 4, ou répartiteurs de charge réseau) étant donné qu'ils prennent en charge les protocoles du worker de pipelines d'observabilité (TCP, UDP et HTTP). Même si vous envoyez exclusivement du trafic HTTP (L7), Datadog recommande les répartiteurs de charge L4 en raison de leurs bonnes performances et de leur simplicité. 

| Fournisseur de cloud| Recommandation                                                |
| ------------- | --------------------------------------------------------------|
| AWS           | Répartiteur de charge réseau AWS (NLB, pour Network Load Balancer)                               |
| Azure         | Répartiteur de charge interne Azure                                  |
| Google Cloud  | Répartiteur de charge réseau interne TCP/UDP                        |
| Private       | HAProxy, Nginx ou un autre répartiteur de charge prenant en charge les données layer 4 |

##### Configurations du répartiteur de charge

Lors de la configuration des clients et des répartiteurs de charge, Datadog recommande les paramètres généraux suivants :

- Utilisez une stratégie de répartiteur de charge de type round-robin.
- N'activez pas la fonctionnalité d'équilibrage de charge entre zones, sauf en cas de déséquilibre du trafic entre plusieurs zones.
- Configurez les répartiteurs de charge de sorte qu'ils utilisent l'endpoint de l'API de santé du worker de pipelines d'observabilité pour la santé cible.
- Assurez-vous que les instances de votre worker de pipelines d'observabilité sont enregistrées ou désenregistrées automatiquement lors de leur dimensionnement. Consultez la section [Réseau][2] pour en savoir plus.
- Appliquez un intervalle de conservation avec un délai d'inactivité d'une minute maximum pour vos clients et répartiteurs de charge.
- Activez la simultanéité et la mise en pool des connexions sur vos agents si ces fonctionnalités sont prises en charge. Si elles ne sont pas prises en charge, envisagez d'utiliser l'architecture unifiée qui déploie le worker de pipelines d'observabilité en périphérie. La mise en pool des connexions permet de garantir la répartition de grandes quantités de données sur plusieurs connexions pour mieux équilibrer le trafic.

##### Zones sensibles du répartiteur de charge

Des zones sensibles peuvent apparaître sur le répartiteur de charge lorsqu'une ou plusieurs instances du worker de pipelines d'observabilité reçoivent une quantité de trafic disproportionnée. Ce problème peut généralement survenir pour deux raisons différentes :

1. Une grande quantité de trafic est envoyée sur une seule connexion.
2. Le trafic présent dans une zone de disponibilité est beaucoup plus élevé que dans les autres zones de disponibilité.

Dans ces cas de figure, nous vous recommandons de mettre en œuvre les stratégies respectives suivantes pour atténuer ces zones sensibles :

1. Divisez les connexions volumineuses en plusieurs connexions de plus petite taille. La plupart des clients prennent en charge la simultanéité ainsi que la mise en pool des connexions, qui permettent la répartition des données sur plusieurs connexions. En procédant de la sorte, votre répartiteur de charge est capable de répartir la connexion sur plusieurs instances du worker de pipelines d'observabilité. Si votre client ne prend pas en charge ces fonctionnalités, nous vous conseillons d'utiliser l'architecture unifiée, qui permet le déploiement du worker de pipelines d'observabilité en périphérie.
2. Activez la fonctionnalité d'équilibrage de charge entre zones sur votre répartiteur de charge. Cette fonctionnalité répartit la totalité du trafic des zones de disponibilité de manière équitable sur l'ensemble des instances du worker de pipelines d'observabilité.

### Dimensionnement vertical

Le modèle de simultanéité du worker de pipelines d'observabilité s'adapte automatiquement pour tirer parti de tous les vCPU. Il n'est pas nécessaire d'ajuster les paramètres de simultanéité ni de modifier la configuration. En cas de dimensionnement vertical, Datadog recommande d'appliquer une limite de taille à une instance de sorte qu'elle ne traite pas plus de la moitié du volume total, et de disposer d'au moins deux instances du worker de pipelines d'observabilité pour garantir une haute disponibilité.

### Autoscaling

L'autoscaling dépend de l'utilisation moyenne du CPU. Pour la plupart des workloads, le worker de pipelines d'observabilité est limité par le CPU. L'activation ou non de l'autoscaling est déterminée avant tout par l'utilisation du CPU, car elle ne produit aucun faux positif. Datadog recommande d'utiliser les paramètres suivants, en les ajustant au besoin :

- CPU moyen avec un objectif d'utilisation de 85 %.
- Une période de stabilisation de cinq minutes pour le dimensionnement.

[1]: /fr/observability_pipelines/architecture/advanced_configurations
[2]: /fr/observability_pipelines/architecture/networking