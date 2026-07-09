---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
aliases:
- /fr/cloud_cost_management/recommendations/savings
description: Apprenez à réduire les dépenses des ressources cloud de votre organisation
  avec les recommandations de coûts.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus sur la gestion des coûts Cloud.
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentation
  text: FAQ sur l'intégration AWS et CloudWatch
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog.
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: Blog
  text: Éliminez le gaspillage cloud sur AWS, Azure et Google Cloud avec les recommandations
    de coûts Cloud.
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifie les clés API d'Anthropic sans utilisation
      de prompt caching et recommande d'activer le prompt caching pour réduire les
      coûts d'input tokens.
    recommendation_prerequisites: '[Anthropic integration](/integrations/anthropic/)'
    recommendation_type: Enable Anthropic Prompt Caching
    resource_type: Anthropic API Key
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un groupe d'Auto Scaling qui inclut des types d'instances
      hérités.
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un groupe d'Auto Scaling avec une capacité minimale
      d'instances qui peut être réduite.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Les pistes CloudTrail avec des événements payants
      peuvent être supprimées pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Delete unnecessary CloudTrail trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un index secondaire global (GSI) d'une table DynamoDB
      a 0 lectures consommées.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB a 0 lectures consommées et 0 écritures
      non répliquées consommées.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Table
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB a des frais pour plus de 2 sauvegardes
      à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra On-Demand Backups
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB provisionnée qui utilise moins
      de 80 % de sa capacité de lecture et d'écriture plus de 80 % du temps.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Migrer vers la classe de table d'accès peu fréquent
      (IA) offre plus d'économies potentielles sur les tarifs de stockage par rapport
      aux coûts supplémentaires des tarifs de capacité.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB provisionnée a une consommation
      de capacité de lecture et d'écriture horaire inférieure à 18 % au moins une
      fois au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB à la demande a une consommation
      de capacité de lecture et d'écriture horaire qui est toujours supérieure à 18
      %.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Migrer vers la classe de table standard offre des
      économies potentielles sur les tarifs de capacité par rapport aux coûts supplémentaires
      des tarifs de stockage, ou elle utilise le niveau gratuit de la classe de table
      standard pour le stockage.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des instantanés EBS âgés d'au moins 90 jours et pouvant
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilisant moins de 80 % des IOPS provisionnés
      pour les lectures et les écritures.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilisant moins que le seuil configuré
      du débit provisionné pour les lectures et les écritures.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS avec moins de 20 % de sa capacité de
      stockage utilisée.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volumes EBS GP2 pouvant être mis à niveau vers GP3
      pour réduire les coûts et améliorer les performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volumes EBS IO1 pouvant être mis à niveau vers GP3
      pour réduire les coûts et améliorer les performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volume qui n'est pas attaché à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volume qui n'a aucune activité de lecture ou d'écriture.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Adresses IP élastiques avec des frais d'inactivité
      dans votre rapport de coûts et d'utilisation AWS.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instances EC2 avec une utilisation du CPU et de la
      mémoire inférieure aux ressources disponibles de l'instance la plus petite de
      la famille. Sans l'agent Datadog, cette recommandation est générée à l'aide
      des métriques CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instances EC2 d'une génération précédente qui peuvent
      être mises à niveau vers un type d'instance plus récent.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instances EC2 qui peuvent être migrées vers un type
      d'instance Graviton équivalent.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instances EC2 avec une utilisation du CPU et de la
      mémoire inférieure à un seuil personnalisable. Sans l'agent Datadog, cette recommandation
      est générée à l'aide des métriques CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instances EC2 hébergeant des nœuds Kubernetes qui
      sont bloqués dans la phase en attente, indiquant que le nœud ne fonctionne pas
      correctement.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Dépôt ECR sans activité de pull qui peut être supprimé
      pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une tâche ECS utilisant moins de 50 % de son CPU ou
      de sa mémoire demandée.
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un cluster ElastiCache Redis sans cache hits et sans
      réplication ou un cluster Memcached sans cache hits.
    recommendation_prerequisites: ''
    recommendation_type: Terminate ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Domaine OpenSearch sans activité de requête.
    recommendation_prerequisites: ''
    recommendation_type: Delete OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Équilibreur de charge classique Elastic sans connexions
      actives qui n'est pas attaché à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un équilibreur de charge d'application sans trafic
      traité.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un équilibreur de charge réseau avec 0 octets traités.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Fonction AWS Lambda avec une concurrence provisionnée
      sur-allouée.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Supprimez les autorisations d'écriture pour Lambda
      CloudWatch Logs afin d'éviter des journaux supplémentaires inutiles.
    recommendation_prerequisites: ''
    recommendation_type: Delete Lambda CloudWatch Logs and write permissions
    resource_type: CloudWatch Log Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Réduisez les coûts de stockage des journaux CloudWatch
      en définissant des politiques de rétention appropriées.
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un courtier MQ avec 0 connexions.
    recommendation_prerequisites: ''
    recommendation_type: Terminate MQ Broker
    resource_type: MQ Broker
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instances RDS utilisant moins de 80 % des IOPS provisionnés
      au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Une instance RDS exécutant une version de moteur qui
      n'est plus prise en charge et entraînant des [frais de support prolongé](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html).
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance Engine
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instances RDS pouvant être migrées vers un type d'instance
      Graviton équivalent.
    recommendation_prerequisites: ''
    recommendation_type: Migrate RDS Instance to Graviton
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instance RDS avec 0 connexions à la base de données
      et 0 retard de réplique.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused RDS Instance
    resource_type: RDS Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Cluster Redshift avec 0 connexions à la base de données.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket avec la gestion des versions activée a des
      coûts de stockage significatifs provenant d'anciennes versions d'objets.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket S3 standard sans cycle de vie d'expiration
      pour les versions non courantes et qui ne sert pas de site web contient des
      octets de stockage de versions non courantes âgés de plus de 30 jours.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Buckets S3 avec des téléchargements multipartiels
      incomplets de plus de 7 jours qui consomment de l'espace de stockage.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket a un pourcentage significatif de petits
      fichiers dans des classes de stockage d'accès peu fréquent, augmentant les coûts
      de stockage en raison de la taille minimale de facturation.
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un bucket S3 avec des coûts de stockage minimaux et
      sans requêtes GET ou PUT.
    recommendation_prerequisites: ''
    recommendation_type: Terminate S3 Bucket
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un bucket a des frais de suppression anticipée importants.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Les coûts d'un bucket proviennent presque entièrement
      du stockage standard par Go, mais les GET requests indiquent que peu d'objets
      sont accédés.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Les coûts d'un préfixe de bucket proviennent presque
      entièrement du stockage standard par Go, mais les GET requests indiquent que
      peu d'objets dans le préfixe sont accédés.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources nécessitant une passerelle NAT devraient
      en utiliser une qui se trouve dans la même zone de disponibilité, sinon elles
      peuvent encourir des frais de transfert inter-zone inutiles.
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources dans le même VPC devraient éviter de
      communiquer entre elles par l'intermédiaire d'une passerelle NAT car cela entraîne
      des frais de traitement de passerelle NAT inutiles.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une passerelle NAT qui n'a aucun octet envoyé à travers
      elle.
    recommendation_prerequisites: ''
    recommendation_type: Terminate NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un cluster AKS avec moins de 5 % d'utilisation du
      CPU.
    recommendation_prerequisites: ''
    recommendation_type: Terminate AKS Cluster
    resource_type: AKS Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une Container App a plus de répliques minimales que
      nécessaire.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Équilibreur de charge avec 0 octets transférés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Le disque géré est détaché et peut être supprimé.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Disque géré sans opérations de lecture/écriture, qui
      peut être supprimé.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disque géré utilisant moins que le seuil configuré
      d'IOPS provisionnés.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Managed Disk
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Disque géré utilisant moins que le seuil configuré
      de débit provisionné.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Serveur de base de données sans connexions, qui peut
      être arrêté.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Serveur SQL sans connexions, qui peut être arrêté.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server
    resource_type: SQL Server
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Base de données SQL avec une faible utilisation de
      DTU qui peut être redimensionnée.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Base de données SQL sans connexions réussies et avec
      un CPU très minimal, qui peut être arrêtée.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Instance de VM qui peut être réduite à un type d'instance
      plus petit.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instance de VM avec moins de 5 % de CPU utilisateur
      et plus de 90 % de mémoire utilisable.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifie les clusters Databricks à usage général
      surprovisionnés et suggère de les redimensionner à des types d'instance plus
      petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifie les clusters Databricks à usage général
      surprovisionnés et suggère de les redimensionner à des types d'instance plus
      petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifie les clusters Databricks à usage général
      surprovisionnés et suggère de les redimensionner à des types d'instance plus
      petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifie les jobs Databricks surprovisionnés et suggère
      de les redimensionner à des types d'instance plus petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifie les jobs Databricks surprovisionnés et suggère
      de les redimensionner à des types d'instance plus petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifie les jobs Databricks surprovisionnés et suggère
      de les redimensionner à des types d'instance plus petits pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Les adresses IP de calcul inutilisées peuvent être
      supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Compute Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Disques de calcul qui sont détachés et peuvent être
      supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Disques de calcul qui ne sont pas utilisés et peuvent
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Adresses IP globales de calcul inutilisées peuvent
      être supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instance de calcul avec une faible utilisation de
      CPU et de mémoire qui peut être réduite à un type d'instance plus petit.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instance de calcul avec une faible utilisation de
      CPU, une mémoire disponible élevée et une activité réseau minimale.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Un groupe d'instances de calcul avec un autoscaler
      ayant une capacité minimale d'instances qui peut être réduite.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instances CloudSQL qui sont surdimensionnées et peuvent
      être réduites.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instances CloudSQL avec une utilisation minimale qui
      peuvent être terminées.
    recommendation_prerequisites: ''
    recommendation_type: Terminate CloudSQL Instance
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Buckets Cloud Storage qui bénéficient de règles de
      cycle de vie pour supprimer automatiquement les versions non actuelles d'objets.
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: Les objets dans le bucket de stockage peuvent être
      automatiquement migrés vers des niveaux d'archivage pour bénéficier de meilleurs
      tarifs.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Clusters Kubernetes avec une forte utilisation du
      CPU ou de la mémoire inactifs.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Clusters Kubernetes avec une forte utilisation du
      CPU ou de la mémoire inactifs.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Clusters Kubernetes avec une forte utilisation du
      CPU ou de la mémoire inactifs.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  headers:
  - filter_by: true
    id: category
    name: Catégorie de recommandation
  - filter_by: true
    id: cloud_provider
    name: Fournisseur de cloud
  - filter_by: true
    id: resource_type
    name: Type de ressource
  - id: recommendation_type
    name: Type de recommandation
  - id: recommendation_description
    name: Description de la recommandation
  - id: recommendation_prerequisites
    name: Prérequis de la recommandation
title: Recommandations de coût cloud
---
## Aperçu {#overview}

[Les recommandations de coût cloud][1] fournissent des recommandations pour réduire vos dépenses cloud en optimisant l'utilisation de vos ressources cloud. Datadog génère un ensemble de recommandations en combinant vos données d'observabilité avec vos données de facturation de fournisseur de cloud sous-jacent pour identifier les ressources cloud orphelines, héritées ou surdimensionnées.

Les recommandations sont exécutées quotidiennement et sont automatiquement mises à jour dans votre compte dès que les recommandations sont publiées.

- Pour **toutes les ressources**, [les métriques de coût cloud][6] sont également extraites pour cette ressource
- Pour toutes les **ressources AWS** à l'exception de Kubernetes et EC2, les métriques AWS sont également extraites de [AWS CloudWatch][7]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Onglet d'aperçu avec des économies mensuelles potentielles, des économies annuelles potentielles et le nombre total de cas ouverts sur la page des recommandations de coût cloud." style="width:100%;" >}}

Vous pouvez voir la logique détaillée pour chaque type de recommandation, ainsi que les métriques d'observabilité ou les données de coût affichées sur cette page.

Les recommandations prennent en charge [Tag Pipelines][11], vous permettant de filtrer, regrouper et analyser les recommandations en utilisant les tags standardisés de votre organisation. Toutes les règles de tags configurées dans Tag Pipelines sont automatiquement appliquées aux recommandations et [sont normalisées][12].

## Catégories de recommandations {#recommendation-categories}

Voici les catégories de recommandations de coûts cloud disponibles et leurs descriptions :

| Catégorie de recommandation | Description |
|----------|-------------|
| Terminer | les ressources présentant des signaux indiquant qu'elles ne sont pas utilisées ou signalant une utilisation très faible. Envisagez de terminer ou de supprimer ces ressources pour réduire vos coûts. |
| Migrer | les ressources présentant des signaux d'une utilisation modérément faible ou d'autres inefficacités. Envisagez d'ajuster le type d'instance ou d'autres paramètres. |
| Réduire | Les ressources qui sont sous-utilisées ou sur-provisionnées. Envisagez d'ajuster la taille ou d'autres paramètres pour réduire les coûts. |
| Acheter | Des ressources avec des frais à la demande et un temps de disponibilité prolongé. L'achat d'une réservation ou d'un plan d'économies peut réduire le coût amorti de la ressource. |
| Configurer | Les ressources avec des options de configuration qui peuvent être ajustées pour réduire les coûts sans changer la capacité ou terminer la ressource. |

## Prérequis {#prerequisites}

Les éléments suivants sont des exigences nécessaires pour recevoir des recommandations de coûts cloud :

- Comptes de fournisseur cloud (pour toutes les recommandations de coûts cloud souhaitées)
- [Intégration AWS et collecte de ressources][3] (pour les recommandations AWS)
- [Intégration Azure et collecte de ressources][8] (pour les recommandations Azure)
- [Intégration GCP et collecte de ressources][10] (pour les recommandations GCP)
- [Intégration de l'Agent Datadog][5] (pour les recommandations de réduction)

## Configurer {#setup}

Pour chaque compte cloud pour lequel vous souhaitez recevoir des recommandations :

1. Configurer [Cloud Cost Management][2] pour envoyer les données de facturation à Datadog.
   - Pour Azure, cela nécessite d'utiliser la méthode App Registration pour collecter les données de facturation.
1. Activer [la collecte de ressources][3] pour les recommandations.
   - Pour AWS, activez la collecte de ressources dans l'onglet {{< ui >}}Resource Collection{{< /ui >}} sur la [tuile d'intégration AWS][4].
   - Pour Azure, activez la collecte de ressources avec l'intégration appropriée. Si votre organisation est sur le site Datadog US3, l'[Azure Native Integration][9] l'active automatiquement via la collecte de métriques. Pour tous les autres sites, l'activation de la collecte de ressources dans la [Azure integration tile][8] est requise.
   - Pour GCP, activez la collecte de ressources dans l'onglet {{< ui >}}Resource Collection{{< /ui >}} sur la [Google Cloud Platform integration tile][10].
1. Installer le [Datadog Agent][5] (nécessaire pour les recommandations de réduction).

**Remarque** : Les recommandations de coûts cloud prennent en charge la facturation dans les devises non-USD des clients.

## Statuts des recommandations {#recommendation-statuses}

Attribuez un statut à chaque recommandation pour suivre les progrès de l'optimisation des coûts au sein de vos équipes. Les statuts persistent lorsque les recommandations se régénèrent quotidiennement. Vous n'avez pas besoin de re-trier les mêmes recommandations.

| Statut | Description |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (Par défaut) La recommandation n'a pas été triée. |
| {{< ui >}}In Progress{{< /ui >}} | Des travaux sont en cours pour répondre à cette recommandation. |
| {{< ui >}}Completed{{< /ui >}} | L'action recommandée a été prise ou n'est plus pertinente. |
| {{< ui >}}Dismissed{{< /ui >}} | Aucun travail n'est prévu pour cette recommandation pendant la période spécifiée lors du rejet. |

### Filtrer les recommandations par statut {#filter-recommendations-by-status}

Utilisez les onglets de statut en haut de la page [{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] pour filtrer la liste par statut. Les onglets disponibles sont {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Completed{{< /ui >}} et {{< ui >}}Dismissed{{< /ui >}}. Chaque onglet affiche les économies totales estimées pour les recommandations dans ce statut.

### Suivre les économies par statut {#track-savings-by-status}

Chaque onglet de statut affiche les économies totales estimées pour les recommandations dans ce statut :

- {{< ui >}}Open{{< /ui >}} : Économies potentielles des recommandations qui n'ont pas été triées.
- {{< ui >}}In Progress{{< /ui >}} : Économies estimées des recommandations pour lesquelles des travaux sont en cours.
- {{< ui >}}Completed{{< /ui >}} : Économies réalisées des recommandations où l'action recommandée a été prise.
- {{< ui >}}Dismissed{{< /ui >}} : Économies estimées des recommandations qui ont été rejetées.

### Changer le statut d'une recommandation {#change-a-recommendation-status}

Vous pouvez changer le statut d'une recommandation de trois manières :

- **Mise à jour en masse** : Sélectionnez une ou plusieurs recommandations dans {{< ui >}}Active Recommendations{{< /ui >}}, puis choisissez un statut dans la barre d'outils au-dessus du tableau pour l'appliquer à toutes les recommandations sélectionnées.
- **Depuis le tableau** : Utilisez le menu déroulant de statut dans la colonne {{< ui >}}Status{{< /ui >}} pour sélectionner un nouveau statut directement dans la liste des recommandations.
- **Depuis le panneau latéral** : Cliquez sur une recommandation pour ouvrir le panneau latéral, puis utilisez le menu déroulant de statut pour sélectionner un nouveau statut.

## Prise d'action sur les recommandations {#recommendation-action-taking}
Vous pouvez agir sur les recommandations pour économiser de l'argent et optimiser les coûts. Les recommandations de coût cloud prennent en charge Jira, l'automatisation des workflows en un clic et la gestion des cas Datadog. Les recommandations de volumes EBS inutilisés et de volumes GP2 EBS prennent également en charge l'automatisation des workflows en un clic. Voir les détails suivants pour chaque option d'action :

- **Jira** : Créez des tickets Jira directement depuis le panneau latéral des recommandations ou en sélectionnant plusieurs recommandations dans la {{< ui >}}Active Recommendations{{< /ui >}} liste et en cliquant sur {{< ui >}}Create Jira issue{{< /ui >}}. Les tickets Jira créés sont étiquetés et renvoient à la recommandation dans Datadog.

  Pour filtrer les recommandations par statut Jira, utilisez les options de requête suivantes :
  - `@jira_issues.issue_key:*` - Afficher uniquement les recommandations avec un ticket Jira
  - `-@jira_issues.issue_key:*` - Afficher uniquement les recommandations sans ticket Jira
  - `jira_issues.issue_key:ABC*` - Filtrer par préfixe de projet Jira spécifique

- **[Corrections de code Bits][14]** : Des corrections de code sont disponibles pour les recommandations S3 et DynamoDB applicables, ainsi que pour la recommandation Downsize Kubernetes Deployment. Dans ces situations, Bits Code crée des pull requests prêtes pour la production afin de mettre en œuvre des modifications de ressources cloud et des optimisations de coûts dans Terraform ou Helm charts, respectivement. [Set up Bits Code][13] pour utiliser cette fonctionnalité.
- **Actions d'automatisation des workflows en un clic** : Des actions sont disponibles pour un ensemble limité de recommandations, permettant aux utilisateurs d'exécuter des actions suggérées, telles que cliquer sur {{< ui >}}Delete EBS Volume{{< /ui >}}, directement dans [Cloud Cost Management].
- **[Cost Optimization Automation][15]** : Configurez des automatisations qui agissent sur les recommandations en continu selon un calendrier récurrent. Les automatisations sont limitées à des comptes, régions et étiquettes spécifiques et incluent des mesures de sécurité telles que des instantanés préalables à l'action et une approbation humaine optionnelle via Slack ou Microsoft Teams.
- **Datadog Case Management** : Les utilisateurs peuvent se rendre dans le panneau latéral des recommandations et cliquer sur {{< ui >}}Create Case{{< /ui >}} pour générer un cas afin de gérer et d'agir sur les recommandations.
- **Ignorer** : Utilisez {{< ui >}}Dismiss{{< /ui >}} dans le panneau latéral des recommandations pour masquer une recommandation pendant une période choisie et fournir une raison. Les recommandations ignorées passent à l'onglet {{< ui >}}Dismissed{{< /ui >}}.

## Recommandation et descriptions des ressources {#recommendation-and-resource-descriptions}

{{< multifilter-search >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/cost/recommendations
[2]: /fr/cloud_cost_management/setup/aws/#setup
[3]: /fr/integrations/amazon_web_services/#resource-collection
[4]: https://app.datadoghq.com/integrations/aws
[5]: /fr/agent/
[6]: /fr/cloud_cost_management/container_cost_allocation/?tab=aws#cost-metrics
[7]: /fr/integrations/amazon_s3_storage_lens/
[8]: https://app.datadoghq.com/integrations/azure
[9]: /fr/integrations/azure/
[10]: https://app.datadoghq.com/integrations/gcp
[11]: /fr/cloud_cost_management/allocation/tag_pipelines/
[12]: /fr/cloud_cost_management/tags/#how-tags-are-normalized
[13]: /fr/bits_ai/bits_ai_dev_agent/setup
[14]: /fr/bits_ai/bits_ai_dev_agent/
[15]: /fr/cloud_cost_management/recommendations/cost_optimization_automation/