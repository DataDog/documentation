---
title: Gestion des coûts liés au trafic cloud avec la solution NPM
aliases:
  - /fr/network_performance_monitoring/guide/manage_traffic_costs_with_npm/
---
Le trafic entraîne d'importants coûts, notamment dans le cloud. Les tarifs des différents prestataires de solutions cloud ne sont pas les mêmes pour les flux vers une zone de disponibilité, les flux entre deux zones de disponibilité, les flux entre des régions précises ou encore les flux vers un site public. Le trafic entre plusieurs régions et le trafic de sortie ne sont pas seulement les plus onéreux : ce sont également ceux qui souffrent le plus d'erreurs et de latence et qui font face au plus grand nombre de menaces de sécurité.

La solution Network Performance Monitoring (NPM) vous permet d'effectuer un suivi de l'ensemble de ces types de trafics en associant des dépendances à des tags dans Datadog sur les services, conteneurs, zones de disponibilités, régions ou encore datacenters. Grâce à ces informations sur vos dépendances et sur le volume de trafic qu'elles génèrent (et qui détermine le tarif des prestataires cloud), vous pouvez surveiller et optimiser les coûts associés à votre trafic.

## Utilisation par l'équipe Datadog

Lorsque Datadog a migré vers Kubernetes, comme on pouvait s'y attendre, il a été bien plus simple et rapide de migrer les services sans état par rapport aux services avec état (comme Kafka). Cette différence a généré un téraoctet de nouveau trafic d'une zone de disponibilité à une autre entre les services avec état (tous situés dans une seule zone de disponibilité) et les services sans état (répartis dans plusieurs zones de disponibilité). Par conséquent, cela a entraîné une augmentation conséquente et imprévue de nos coûts relatifs au cloud. Nous nous sommes servis de notre propre solution NPM pour identifier ce qui causait ce problème, à savoir une stratégie de migration imparfaite donnant lieu à des communications réseau inefficaces et onéreuses. En partitionnant nos services avec état, nous sommes parvenus à réduire de façon significative les coûts du trafic cloud.

## Marché à suivre pour gérer les coûts du trafic

1. Pour identifier des problèmes similaires au sein de votre environnement, vous pouvez commencer par filtrer votre vue afin d'afficher le trafic entre les régions,
   les zones de disponibilité
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/availability_zone.png" alt="Groupe de flux par zone de disponibilité">}}
    et les datacenters :
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/datacenter.png" alt="Groupe de flux par datacenter">}}
    Lorsque vos coûts liés au trafic augmentent, cela s'explique dans la grande majorité des cas par une augmentation de l'un de ces types de trafics. Généralement, il est conseillé de regrouper le trafic par terme de recherche asymétrique. En d'autres termes, vous devez visualiser la source du trafic selon un tag et la destination selon un autre tag. Ce type de requête asymétrique vous permet d'identifier les dépendances coûteuses entre vos datacenters sur site et les régions cloud,
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/aws_account.png" alt="Identifier les dépendances entres les datacenters et les régions cloud">}}
    mais également entre les clouds. Il est notamment intéressant de regrouper la source du trafic par service et de définir la destination sur les différentes zones de disponibilité.

2. Isolez ensuite les services avec le plus de trafic entre plusieurs zones de disponibilité. Vous pouvez appliquer des filtres dans la barre de recherche afin de restreindre votre requête. Par exemple, il est possible d'afficher uniquement les services qui sont situés dans une zone de disponibilité et qui génèrent du trafic vers une autre zone de disponibilité.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/service_availability_zone.png" alt="Mettre en évidence les services qui communiquent avec plusieurs zones de disponibilité">}}
    La requête ci-dessus met en évidence les services qui communiquent depuis la zone `us-east4-a` vers toutes les autres destinations. Les données du tableau étant triées par volume, les premières lignes présentent les services qui génèrent le plus de trafic entre plusieurs zones de disponibilité. SI vous souhaitez étudier l'impact de l'utilisation de différentes zones de disponibilité sur l'un des services fautifs, vous pouvez définir la **Source** sur ce service et visualiser son trafic vers toutes les autres zones de disponibilité.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/single_service.png" alt="Effectuer une recherche pour un seul service">}}

3. De même, vous pouvez utiliser le tag « team » pour identifier les équipes d'ingénieurs qui génèrent, par exemple, le plus de trafic entre plusieurs régions
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/team_region.png" alt="Utiliser le tag team">}}
ou encore surveiller les sorties de votre propre équipe.
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/region_region.png" alt="Utiliser le tag region">}}

4. Pour surveiller les coûts associés au trafic externe, utilisez la facette **IP Type** de façon à limiter vos endpoints de destination aux IP publiques.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/scope_destination_points.png" alt="Utiliser le type de facette">}}
    Regroupez ensuite vos destinations par `domain` afin de détailler le volume du trafic externe par destination. Bien qu'il ne soit pas possible d'installer un Agent Datadog sur des serveurs publics, vous pouvez résoudre les adresses IP représentant des endpoints externes et cloud afin d'obtenir des noms de domaine lisibles.
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/dns_resolution.png" alt="Regrouper par DNS">}}
    L'exemple de requête ci-dessus filtre le trafic vers AWS S3, vers les équilibreurs de charge élastiques, vers les API et vers les domaines externes `.com` à l'aide d'entrées comportant des wildcards de sous-chaîne (par exemple, `dns:*s3*`).
    {{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/wildcard.png" alt="Effectuer une recherche avec des wildcards">}}

## Visualisation des coûts liés au trafic

Vous pouvez visualiser le trafic entre plusieurs zones de disponibilité et le trafic au sein d'une même zone de disponibilité à l'aide de la Network Map. Les équipes Datadog se servent de cette vue pour vérifier qu'il n'y a pas de communication entre les zones de disponibilité en Europe et aux États-Unis, pour garantir le respect du RGPD et pour protéger les données des clients.
Trafic entre plusieurs zones de disponibilité :
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/cross-az-traffic.png" alt="Trafic entre plusieurs zones de disponibilité">}}
Trafic au sein d'une zone de disponibilité d'un service à un autre :
{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/inter-az-service-to-service-traffic.png" alt="Trafic au sein d'une zone de disponibilité d'un service à un autre">}}
Les lignes épaisses entre les nœuds de la map représentent les zones de disponibilité. Cela indique que vos zones de disponibilité échangent beaucoup de trafic, ce qui augmente vos coûts.

Vous pouvez modifier vos préférences à l'aide du bouton **Filter traffic**. Pour les environnements de grande taille, nous vous conseillons de restreindre la vue aux sources de trafic importantes. Pour ce faire, déplacez le curseur de façon à inclure uniquement les dépendances avec un volume élevé.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/filter-traffic.png" alt="Restreindre le trafic">}}

## Représentation graphique des coûts liés au trafic

Datadog recommande de surveiller l'évolution des métriques de volume du trafic dans des dashboards et des notebooks. Il est possible de représenter le trafic entre deux endpoints à l'aide des mêmes requêtes que sur la page Network. Pour y parvenir, créez un **widget Série temporelle** et sélectionnez la source **Network Traffic** dans le menu déroulant.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/timeseries.png" alt="Créer une série temporelle">}}

Partagez ensuite vos résultats et les éventuels problèmes identifiés avec vos collègues à l'aide de dashboards et de notebooks.

{{< img src="network_performance_monitoring/guide/manage_traffic_costs_with_npm/network-traffic.png" alt="Afficher votre trafic réseau">}}