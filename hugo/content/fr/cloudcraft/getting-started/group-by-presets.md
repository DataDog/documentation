---
title: Group By et Presets
---

Les fonctionnalités **Group By** et **Presets** de Cloudcraft permettent de créer des diagrammes personnalisés et pertinents, adaptés à des cas d'utilisation spécifiques comme l'infrastructure, le réseau ou la sécurité. Ces outils facilitent la visualisation de l'architecture cloud, ce qui simplifie l'analyse et la gestion des ressources.

Que ce soit pour résoudre des problèmes, effectuer des audits de sécurité ou évaluer les performances réseau, ces fonctionnalités améliorent l'efficacité des workflows en permettant aux utilisateurs de générer facilement des diagrammes ciblés et précis.

## Group By

Avec **Group By**, Cloudcraft divise votre diagramme en sections distinctes selon différents types de regroupement. Cette fonctionnalité offre une vue claire et organisée de vos ressources, particulièrement utile pour représenter des environnements cloud complexes.

### Options de regroupement pour AWS

Dans AWS, vous pouvez regrouper les ressources par :
- Region
- VPC
- Security Group
- Subnet
- Network ACL

### Options de regroupement pour Azure

Dans Azure, vous pouvez regrouper les ressources par :
- Resource Group
- Region
- VNet
- Subnet

## Presets

Les **presets** offrent un moyen pratique d'appliquer des ensembles prédéfinis de regroupements et de filtres, vous permettant de visualiser rapidement vos ressources sous différents angles. Cette fonctionnalité simplifie l'application des regroupements et filtres à vos diagrammes, pour vous concentrer sur des aspects précis de votre architecture.

**Cloudcraft propose trois presets intégrés :** Infrastructure, Network et Security. Ces presets sont conçus pour répondre à différents besoins opérationnels.

{{< img src="cloudcraft/getting-started/group-by-presets/diagram-presets.png" alt="Interface Cloudcraft affichant les options de preset avec le preset de diagramme infrastructure sélectionné." responsive="true" style="width:100%;">}}

Pour appliquer un preset à votre diagramme :

1. Accédez à l'onglet **Live** dans Cloudcraft.
2. Sélectionnez le preset souhaité dans le menu situé en haut de la vue du diagramme.
3. Le diagramme se met automatiquement à jour selon le preset sélectionné.

### Diagramme Infrastructure

{{< img src="cloudcraft/getting-started/group-by-presets/infrastructure-diagram.png" alt="Diagramme Infrastructure affichant des serveurs, bases de données, composants de sécurité et leurs relations." responsive="true" style="width:100%;">}}

Le preset Infrastructure offre une vue d'ensemble, en regroupant les ressources par Region et VPC dans AWS, et par Region et VNet dans Azure. Ce preset est idéal pour générer rapidement des diagrammes d'architecture à des fins de dépannage ou de revue générale.

- Dans AWS, il exclut des composants comme EBS, NAT Gateway et Transit Gateway, entre autres, afin d'offrir un diagramme épuré qui met en évidence les éléments clés de l'architecture.
- Dans Azure, des composants comme Azure VNGW et Azure Disk ne sont pas affichés.

### Diagramme Security

{{< img src="cloudcraft/getting-started/group-by-presets/security-diagram.png" alt="Diagramme Security affichant des serveurs, bases de données, composants de sécurité et leurs relations." responsive="true" style="width:100%;">}}

Le preset Security se concentre sur les expositions potentielles à la sécurité, en regroupant les ressources par Region, VPC et Security Group dans AWS. Cette vue est essentielle pour identifier les risques de sécurité et comprendre les règles de communication entrante et sortante des services. Elle est idéale pour cartographier les surfaces d'attaque lors de tests d'intrusion ou d'audits de sécurité.

- Ce preset ne prend actuellement pas en charge les configurations Azure.
- Dans AWS, comme pour le preset Infrastructure, il exclut EBS, NAT Gateway et d'autres composants susceptibles d'encombrer la vue. De plus, un composant peut apparaître plusieurs fois s'il appartient à plusieurs subnets.

### Diagramme Network

{{< img src="cloudcraft/getting-started/group-by-presets/network-diagram.png" alt="Diagramme Network affichant des serveurs, bases de données, composants de sécurité et leurs relations." responsive="true" style="width:100%;">}}

Le preset Network ajoute un niveau de détail supplémentaire en introduisant le regroupement par Subnet, ce qui le rend particulièrement utile pour les équipes réseau cherchant à identifier les sources de latence et les schémas de trafic.

- Dans AWS, il exclut des composants comme EBS, S3 et SNS.
- Dans Azure, il exclut les composants Azure Disk et Network Security Group.

## Presets personnalisés

Pour les cas d'utilisation nécessitant une vue adaptée, Cloudcraft vous permet de personnaliser les regroupements et les filtres afin de créer des presets sur mesure.

1. Ajustez les paramètres de filtre et de regroupement selon vos besoins.
2. Enregistrez votre configuration personnalisée en tant que nouveau preset en cliquant sur le bouton **Save as preset**.

Une fois enregistrés, ces presets personnalisés peuvent être réutilisés par toute personne ayant accès au blueprint.