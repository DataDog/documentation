---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
  - cost recommendation risk
  - cost recommendation effort
  - cost recommendation level of effort
aliases:
- /fr/cloud_cost_management/recommendations/savings
description: Découvrez comment réduire les dépenses liées aux ressources cloud de
  votre organisation avec Cost Recommendations.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: Découvrez Cloud Cost Management.
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentation
  text: FAQ sur l'intégration AWS et CloudWatch
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons créé une pratique FinOps réussie chez Datadog
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: Blog
  text: Éliminez le gaspillage cloud sur AWS, Azure et Google Cloud avec Cloud Cost
    Recommendations.
multifiltersearch:
  data:
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifie les clés d'API Anthropic sans utilisation
      de mise en cache des invites et recommande d'activer la mise en cache des invites
      pour réduire les coûts des jetons d'entrée.
    recommendation_prerequisites: ''
    recommendation_type: Enable Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifie les clés d'API Anthropic utilisant déjà
      la mise en cache des invites en dessous du taux de réussite cible et recommande
      d'améliorer la configuration du cache pour réduire les coûts des jetons d'entrée.
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: Anthropic
    recommendation_description: Identifie les utilisateurs Entreprise dont les dépenses
      sont concentrées sur les modèles les plus coûteux et recommande d'utiliser un
      modèle moins onéreux.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Top-Tier Model Usage
    resource_type: Enterprise User
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Groupes Auto Scaling avec des charges de travail non
      conteneurisées ayant une faible utilisation du processeur et de la mémoire et
      pouvant être réduits en ajustant leurs stratégies de mise à l'échelle.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Auto Scaling Group
    resource_type: Auto Scaling Group
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un groupe Auto Scaling qui inclut des types d'instances
      hérités.
    recommendation_prerequisites: ''
    recommendation_type: Migrate ASG Legacy Instances
    resource_type: Auto Scaling Group
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un groupe Auto Scaling avec une capacité minimale
      d'instances pouvant être réduite.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Minimum Capacity
    resource_type: Auto Scaling Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Les journaux CloudTrail avec des événements payants
      peuvent être supprimés pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unnecessary CloudTrail Trails
    resource_type: CloudTrail Trail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un index secondaire global (GSI) d'un tableau DynamoDB
      a 0 lectures consommées.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un tableau DynamoDB présente des frais pour plus de
      2 sauvegardes à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra DynamoDB On-Demand Backups
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un tableau DynamoDB a 0 lectures consommées et 0 écritures
      non répliquées consommées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused DynamoDB Table
    resource_type: DynamoDB Table
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un tableau DynamoDB provisionnée utilise moins de
      80 % de sa capacité de lecture et d'écriture plus de 80 % du temps.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: La migration vers la classe de tableau Accès peu fréquent
      (IA) offre davantage d'économies potentielles sur les tarifs de stockage par
      rapport aux coûts supplémentaires liés aux tarifs de capacité.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un tableau DynamoDB provisionné a une consommation
      horaire de capacité de lecture et d'écriture inférieure à 18 % au moins une
      fois au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un tableau DynamoDB à la demande a une consommation
      horaire de capacité de lecture et d'écriture toujours supérieure à 18 %.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: DynamoDB Table
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: La migration vers la classe de tableau Standard offre
      des économies potentielles sur les tarifs de capacité par rapport aux coûts
      supplémentaires liés aux tarifs de stockage, ou utilise le niveau gratuit de
      la classe de tableau Standard pour le stockage.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: DynamoDB Table
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des instantanés EBS datant d'au moins 90 jours peuvent
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: EBS Snapshot
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volume qui n'est pas attaché à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached EBS Volume
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Volume qui n'a aucune activité de lecture ou d'écriture.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused EBS Volume
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilise moins de 80 % des IOPS provisionnées
      pour les lectures et les écritures.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Volume EBS utilisant moins que le seuil configuré
      du débit provisionné pour les lectures et les écritures.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: EBS Volume
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS dont moins de 20 % de la capacité de
      stockage est utilisée.
    recommendation_prerequisites: '[Amazon EC2 integration](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Storage Capacity
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volumes EBS de type GP2 pouvant être mis à niveau
      vers GP3 pour réduire les coûts et améliorer les performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: EBS Volume
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Volumes EBS de type IO1 pouvant être mis à niveau
      vers GP3 pour réduire les coûts et améliorer les performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: EBS Volume
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Adresses IP élastiques avec des frais d'inactivité
      dans votre rapport de coûts et d'utilisation AWS.
    recommendation_prerequisites: ''
    recommendation_type: Release Idle Elastic IP
    resource_type: Elastic IP
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instances EC2 dont l'utilisation du processeur et
      de la mémoire est inférieure aux ressources disponibles de l'instance la plus
      petite suivante de la famille. Sans le Datadog Agent, cette recommandation est
      générée à l'aide des métriques CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instances EC2 d'une génération précédente pouvant
      être mises à niveau vers un type d'instance plus récent.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance
    resource_type: EC2 Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Instances EC2 pouvant être migrées vers un type d'instance
      Graviton équivalent.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EC2 Instance to Graviton Type
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instances EC2 hébergeant des nœuds Kubernetes bloqués
      dans la phase en attente, indiquant que le nœud ne fonctionne pas correctement.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate EC2 Instance with Stuck Node
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Instances EC2 dont l'utilisation du processeur et
      de la mémoire est inférieure à un seuil personnalisable. Sans le Datadog Agent,
      cette recommandation est générée à l'aide des métriques CloudWatch.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Terminate Unused EC2 Instance
    resource_type: EC2 Instance
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Référentiel ECR sans activité de tirage pouvant être
      supprimé pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: ECR Repository
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Tâche ECS utilisant moins de 50 % de son processeur
      ou de sa mémoire demandés.
    recommendation_prerequisites: '[Container Monitoring](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: ECS Task Definition
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Cluster ElastiCache Redis sans succès de cache et
      sans réplication, ou cluster Memcached sans succès de cache.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused ElastiCache Cluster
    resource_type: ElastiCache Cluster
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Domaine OpenSearch sans activité de requête.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused OpenSearch Domain
    resource_type: OpenSearch Domain
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Classic Elastic Load Balancer sans connexions actives
      qui n'est pas attaché à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Classic Load Balancer
    resource_type: Classic Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un équilibreur de charge d'application sans trafic
      traité.
    recommendation_prerequisites: ''
    recommendation_type: Delete Application Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un équilibreur de charge réseau avec 0 octets traités.
    recommendation_prerequisites: ''
    recommendation_type: Delete Network Load Balancer
    resource_type: Load Balancer
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Fonction AWS Lambda avec une concurrence provisionnée
      surallouée.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Provisioned Concurrency
    resource_type: Lambda
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Réduisez les coûts de stockage CloudWatch Logs en
      définissant des politiques de rétention appropriées.
    recommendation_prerequisites: ''
    recommendation_type: Set CloudWatch Logs Retention Policy
    resource_type: CloudWatch Log Group
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un courtier MQ avec 0 connexions.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused MQ Broker
    resource_type: MQ Broker
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance RDS avec 0 connexions à la base de données
      et 0 délai de réplication.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instances RDS qu'AWS Compute Optimizer suggère de
      réduire vers un type d'instance plus petit.
    recommendation_prerequisites: '[AWS Cost Optimization Hub permissions](/cloud_cost_management/setup/aws/#permissions-for-aws-cost-optimization-hub-recommendations)'
    recommendation_type: Downsize RDS Instance
    resource_type: RDS Instance
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Instances RDS utilisant moins de 80 % des IOPS provisionnées
      au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: RDS Instance
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Une instance RDS exécutant une version de moteur qui
      n'est plus prise en charge et entraînant des [frais de support étendu](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html).
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
    recommendation_description: Un cluster Redshift avec 0 connexions à la base de
      données.
    recommendation_prerequisites: ''
    recommendation_type: Delete Redshift Cluster
    resource_type: Redshift Cluster
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un compartiment avec le versionnage activé génère
      des coûts de stockage importants en raison d'anciennes versions d'objets.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Clean up old versions to reduce storage costs
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un compartiment S3 avec des coûts de stockage minimes
      et aucune utilisation significative de l'API d'objets (activité Get, Put, Copy,
      Head ou téléchargement partitionné).
    recommendation_prerequisites: '[Cloud Cost Management](https://www.datadoghq.com/product/cloud-cost-management)
      or [Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Delete S3 Bucket
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un compartiment S3 standard sans cycle de vie d'expiration
      des versions non actuelles et qui ne sert pas de site web contient des octets
      de stockage de versions non actuelles datant de plus de 30 jours.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 noncurrent version objects
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Compartiments S3 avec des téléchargements partitionnés
      incomplets datant de plus de 7 jours qui consomment de l'espace de stockage.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un compartiment contient un pourcentage important
      de petits fichiers dans des classes de stockage à accès peu fréquent, ce qui
      augmente les coûts de stockage en raison de la taille de facturation minimale.
    recommendation_prerequisites: ''
    recommendation_type: Reduce small file count to reduce storage costs
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un compartiment entraîne des frais de suppression
      anticipée élevés.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Les coûts d'un compartiment proviennent presque entièrement
      du per-GB standard storage, mais les requêtes GET indiquent que peu d'objets
      sont consultés.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Les coûts d'un préfixe de compartiment proviennent
      presque entièrement du per-GB standard storage, mais les requêtes GET indiquent
      que peu d'objets dans le préfixe sont consultés.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition S3 objects to Infrequent Access by Prefix
    resource_type: S3 Bucket
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un préfixe de compartiment contient d'anciennes données
      de classe Standard sans règle de transition de cycle de vie pour les déplacer
      vers un stockage moins coûteux.
    recommendation_prerequisites: '[Storage Management](https://www.datadoghq.com/product/storage-management)'
    recommendation_type: Transition old Standard-class data
    resource_type: S3 Bucket
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un endpoint SageMaker avec zéro invocation.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Points de terminaison d'inférence en temps réel SageMaker
      dont l'utilisation du processeur et de la mémoire correspond aux ressources
      de l'instance immédiatement inférieure de la famille. Les points de terminaison
      utilisant des instances GPU ou accélérateurs, ou la mise à l'échelle gérée,
      sont exclus.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SageMaker Endpoint
    resource_type: SageMaker Endpoint
  - category: Configure
    cloud_provider: AWS
    recommendation_description: Travaux d'entraînement SageMaker pouvant utiliser
      l'entraînement spot géré pour réduire les coûts lorsque les scripts d'entraînement
      prennent en charge la création de points de contrôle.
    recommendation_prerequisites: ''
    recommendation_type: Enable SageMaker Managed Spot Training
    resource_type: SageMaker Training Job
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une passerelle NAT sans octets transmis.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused NAT Gateway
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources nécessitant une passerelle NAT doivent
      en utiliser une située dans la même zone de disponibilité, sous peine de frais
      de transfert interzone inutiles.
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: VPC NAT Gateway
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources situées dans le même VPC doivent éviter
      de communiquer entre elles via une passerelle NAT, car cela entraîne des frais
      de traitement de passerelle NAT inutiles.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Gateway Within-VPC Transfers
    resource_type: VPC NAT Gateway
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un cluster AKS avec une utilisation du processeur
      inférieure à 5 %.
    recommendation_prerequisites: ''
    recommendation_type: Delete AKS Cluster
    resource_type: AKS Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Plans App Service sans application déployée qu'Azure
      Advisor recommande de supprimer.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused App Service Plan
    resource_type: App Service Plan
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: L'instantané est stocké sur un stockage Premium. La
      migration vers un stockage Standard réduit les coûts de 60 % sans modifier la
      durabilité des données.
    recommendation_prerequisites: ''
    recommendation_type: Migrate Disk Snapshot to Standard Storage
    resource_type: Managed Disk Snapshot
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une application de conteneur a un nombre minimal de
      réplicas plus élevé que nécessaire.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Une application de conteneur Azure n'a reçu aucune
      requête au cours de la période de rétrospection configurée.
    recommendation_prerequisites: ''
    recommendation_type: Scale to Zero Azure Container App Replicas
    resource_type: Container App
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un registre de conteneurs qui n'a jamais fait l'objet
      de tirages réussis.
    recommendation_prerequisites: ''
    recommendation_type: Delete Container Registry
    resource_type: Container Registry
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un cluster est considéré comme inutilisé et arrêté
      s'il est arrêté depuis au moins 60 jours. La recommandation est de supprimer
      le cluster pour réduire les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused Stopped Data Explorer Cluster
    resource_type: Data Explorer Cluster
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un équilibreur de charge avec 0 octets transférés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Load Balancer
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Le disque géré n'est pas attaché et peut être supprimé.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Managed Disk
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un disque géré sans opérations de lecture/écriture,
      qui peut être supprimé.
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
    recommendation_description: Un serveur de base de données sans connexions, qui
      peut être arrêté.
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for MySQL
    resource_type: MySQL Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un serveur Azure Database for PostgreSQL sans connexions,
      qui peut être arrêté.
    recommendation_prerequisites: ''
    recommendation_type: Delete Database for PostgreSQL
    resource_type: Database for PostgreSQL
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un cache Azure Managed Redis sans opérations get ou
      set.
    recommendation_prerequisites: ''
    recommendation_type: Delete Azure Managed Redis
    resource_type: Azure Managed Redis
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Une base de données SQL Server sans connexions réussies
      et avec une utilisation très minimale du processeur, qui peut être arrêtée.
    recommendation_prerequisites: ''
    recommendation_type: Delete SQL Server Database
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une base de données SQL Server avec une faible utilisation
      des DTU pouvant être redimensionnée.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: SQL Server Database
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Base de données SQL Server utilisant moins de 20 %
      de la capacité de stockage provisionnée.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database Storage
    resource_type: SQL Server Database
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un compte de stockage sans transactions et avec une
      capacité utilisée négligeable au cours des 14 derniers jours.
    recommendation_prerequisites: ''
    recommendation_type: Delete Storage Account
    resource_type: Storage Account
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instance de VM avec moins de 5 % de processeur utilisateur
      et plus de 90 % de mémoire utilisable. Sans le Datadog Agent, cette recommandation
      est générée à l'aide des métriques de processeur Azure Monitor.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une instance de VM pouvant être redimensionnée vers
      un type d'instance plus petit.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: Instance de VM pouvant être migrée vers un type d'instance
      Arm équivalent pour un prix inférieur.
    recommendation_prerequisites: ''
    recommendation_type: Migrate Azure VM Instance to Arm
    resource_type: VM Instance
  - category: Migrate
    cloud_provider: Azure
    recommendation_description: Instance de VM exécutée sur une série de génération
      héritée qui dispose d'un remplacement moderne recommandé.
    recommendation_prerequisites: ''
    recommendation_type: Upgrade Azure VM Instance
    resource_type: VM Instance
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Des instances de VM à faible utilisation pouvant être
      redimensionnées.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Instances de VM à faible utilisation pouvant être
      arrêtées.
    recommendation_prerequisites: ''
    recommendation_type: Shutdown Azure VM Scale Set
    resource_type: VM Scale Set
  - category: Configure
    cloud_provider: Cursor
    recommendation_description: Identifie les sièges Cursor avec des dépenses importantes
      liées aux modèles non automatiques et recommande l'utilisation du mode automatique
      comme choix de modèle.
    recommendation_prerequisites: ''
    recommendation_type: Enable Cursor Auto Mode
    resource_type: Cursor Seat
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifie les clusters Databricks polyvalents surprovisionnés
      et suggère un redimensionnement vers des types d'instance plus petits pour réduire
      les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifie les clusters Databricks polyvalents surprovisionnés
      et suggère un redimensionnement vers des types d'instance plus petits pour réduire
      les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifie les clusters Databricks polyvalents surprovisionnés
      et suggère un redimensionnement vers des types d'instance plus petits pour réduire
      les coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks All-Purpose
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Identifie les Databricks jobs surprovisionnés et suggère
      un redimensionnement vers des types d'instance plus petits pour réduire les
      coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Identifie les Databricks jobs surprovisionnés et suggère
      un redimensionnement vers des types d'instance plus petits pour réduire les
      coûts.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Databricks Job
    resource_type: Databricks Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Identifie les Databricks jobs surprovisionnés et suggère
      un redimensionnement vers des types d'instance plus petits pour réduire les
      coûts.
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
    recommendation_description: Les disques de calcul non attachés et pouvant être
      supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Les disques de calcul inutilisés et pouvant être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Compute Disk
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Les adresses IP globales de calcul inutilisées peuvent
      être supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Compute Global Address
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instance de calcul avec une faible utilisation du
      CPU, une mémoire disponible élevée et une activité réseau minimale.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Delete Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instance de calcul avec une faible utilisation du
      CPU et de la mémoire qui peut être redimensionnée vers un type d'instance plus
      petit.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Compute Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Groupes d'instances de calcul avec des charges de
      travail non conteneurisées ayant une faible utilisation du CPU et de la mémoire
      et pouvant être redimensionnés en ajustant leurs stratégies de mise à l'échelle.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Compute Instance Group
    resource_type: Compute Instance Group
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Un autoscaler de groupe d'instances de calcul avec
      une capacité minimale d'instances qui peut être réduite.
    recommendation_prerequisites: ''
    recommendation_type: Reduce Minimum Capacity
    resource_type: Compute Instance Group
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Instances CloudSQL avec une utilisation minimale qui
      peuvent être supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Cloud SQL Instance
    resource_type: CloudSQL Instance
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Instances CloudSQL surprovisionnées qui peuvent être
      redimensionnées.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: CloudSQL Instance
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Buckets Cloud Storage qui bénéficient de règles de
      cycle de vie pour supprimer automatiquement les versions d'objets non actuelles.
    recommendation_prerequisites: ''
    recommendation_type: Delete Noncurrent Cloud Storage Objects
    resource_type: Storage Bucket
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: Les objets dans le bucket de stockage peuvent être
      automatiquement migrés vers des niveaux d'archivage pour de meilleurs tarifs.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Storage Bucket
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Clusters Kubernetes avec une forte capacité inutilisée
      en CPU ou en mémoire.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Clusters Kubernetes avec une forte capacité inutilisée
      en CPU ou en mémoire.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Clusters Kubernetes avec une forte capacité inutilisée
      en CPU ou en mémoire.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Reduce Cluster Idle
    resource_type: Kubernetes Cluster
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou de leur mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou de leur mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Les conteneurs n'utilisent qu'une fraction de leur
      CPU ou de leur mémoire demandés.
    recommendation_prerequisites: '[Datadog Agent](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Kubernetes Deployment
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: Identifie les clés d'API OpenAI qui utilisent déjà
      le prompt caching en dessous du taux de hit ciblé et recommande d'améliorer
      la configuration du cache pour réduire les coûts des jetons d'entrée.
    recommendation_prerequisites: ''
    recommendation_type: Optimize Prompt Caching
    resource_type: API Key
  - category: Configure
    cloud_provider: OpenAI
    recommendation_description: Identifie les clés d'API OpenAI avec des dépenses
      significatives de priority-processing et recommande de déplacer le trafic tolérant
      à la latence vers le standard afin de supprimer la prime de priorité.
    recommendation_prerequisites: ''
    recommendation_type: Reduce OpenAI Priority Processing
    resource_type: API Key
  headers:
  - filter_by: true
    id: category
    name: Catégorie de recommandation
  - filter_by: true
    id: cloud_provider
    name: Fournisseur
  - filter_by: true
    id: resource_type
    name: Type de ressource
  - id: recommendation_type
    name: Type de recommandation
  - id: recommendation_description
    name: Description de la recommandation
  - id: recommendation_prerequisites
    name: Prérequis de la recommandation
title: Cloud Cost Recommendations
---
## Vue d'ensemble {#overview}

[Cloud Cost Recommendations][1] fournit des recommandations pour réduire vos dépenses cloud et IA en optimisant l'utilisation de vos ressources cloud et de vos API IA/LLM. Datadog génère un ensemble de recommandations en combinant vos données d'observabilité avec vos données de facturation du fournisseur sous-jacent pour identifier les ressources cloud orphelines, héritées ou surdimensionnées, ainsi qu'une utilisation non optimisée de l'IA.

Les recommandations sont exécutées quotidiennement et sont automatiquement actualisées dans votre compte dès qu'elles sont publiées.

- Pour **toutes les ressources**, des [métriques de coût cloud][6] sont également extraites pour ces ressources
- Pour toutes les **ressources AWS**, à l'exception de Kubernetes et EC2, les métriques AWS sont également extraites de [AWS CloudWatch][7]

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Onglet Vue d'ensemble avec les économies mensuelles potentielles, les économies annuelles potentielles et le nombre total de cas ouverts sur la page Cloud Cost Recommendations." style="width:100%;" >}}

Vous pouvez consulter la logique détaillée pour chaque type de recommandation, ainsi que les métriques d'observabilité ou les données de coût affichées sur cette page.

Les recommandations prennent en charge [Tag Pipelines][11], vous permettant de filtrer, regrouper et analyser les recommandations en utilisant les tags standardisés de votre organisation. Toutes les règles de tag configurées dans Tag Pipelines sont automatiquement appliquées aux recommandations et [sont normalisées][12].

Vous pouvez également interroger vos recommandations à partir d'un agent IA avec l'outil [`cost_recommendations`][17] dans le Datadog MCP Server.

## Catégories de recommandations {#recommendation-categories}

Vous trouverez ci-dessous les catégories de recommandations de coûts cloud disponibles ainsi que leurs descriptions.

| Catégorie de recommandation | Description |
|----------|-------------|
| Terminer | Ressources présentant des signaux indiquant qu'elles sont inutilisées ou très peu utilisées. Envisagez de terminer ou de supprimer ces ressources pour réduire vos coûts. |
| Migrer | Ressources présentant des signaux d'utilisation modérément faible ou d'autres inefficacités. Envisagez d'ajuster le type d'instance ou d'autres paramètres. |
| Réduire la taille | Ressources sous-utilisées ou surprovisionnées. Envisagez d'ajuster la taille ou d'autres paramètres pour réduire les coûts. |
| Acheter | Ressources avec des frais à la demande et une disponibilité prolongée. L'achat d'une réservation ou d'un Savings Plan peut réduire le coût amorti de la ressource. |
| Configurez | les ressources avec des options de configuration qui peuvent être ajustées pour réduire les coûts sans modifier la capacité ni supprimer la ressource. |

## Prérequis {#prerequisites}

Voici les exigences nécessaires pour recevoir des recommandations Cloud Cost :

- Comptes de fournisseur (pour toutes les recommandations Cloud Cost souhaitées)
- [Intégration AWS et collecte de ressources][3] (pour les recommandations AWS)
- [Intégration Azure et collecte de ressources][8] (pour les recommandations Azure)
- [Intégration GCP et collecte de ressources][10] (pour les recommandations GCP)
- [Intégration OpenAI][18] (pour les recommandations OpenAI)
- [Intégration Anthropic][19] (pour les recommandations Anthropic)
- [Intégration de Datadog Agent][5] (pour les recommandations de réduction de taille)

## Configuration {#setup}

Pour chaque compte cloud pour lequel vous souhaitez recevoir des recommandations :

1. Configurez [Cloud Cost Management][2] pour envoyer les données de facturation à Datadog.
   - Pour Azure, cela nécessite l'utilisation de la méthode d'enregistrement d'application pour collecter les données de facturation.
1. Activez la [collecte de ressources][3] pour les recommandations.
   - Pour AWS, activez la collecte de ressources dans l'onglet {{< ui >}}Resource Collection{{< /ui >}} sur la [tuile d'intégration AWS][4].
   - Pour Azure, activez la collecte de ressources avec l'intégration appropriée. Si votre organisation se trouve sur le site Datadog US3, l'[intégration native Azure][9] active cela automatiquement via la collecte de métriques. Pour tous les autres sites, l'activation de la collecte de ressources dans la [tuile d'intégration Azure][8] est requise.
   - Pour GCP, activez la collecte de ressources dans l'onglet {{< ui >}}Resource Collection{{< /ui >}} sur la [tuile d'intégration Google Cloud Platform][10].
1. Installez [Datadog Agent][5] (requis pour les recommandations de réduction de taille).

**Remarque** : Cloud Cost Recommendations prend en charge la facturation dans les devises autres que l'USD des clients.

## Risque et niveau d'effort {#risk-and-level-of-effort}

Chaque recommandation inclut un score de **Risque** et un score de **Niveau d'effort** pour vous aider à hiérarchiser les recommandations à traiter en priorité. Les deux scores utilisent une échelle de {{< ui >}}Low{{< /ui >}}, {{< ui >}}Medium{{< /ui >}} et {{< ui >}}High{{< /ui >}}. Ils apparaissent sous forme de colonnes {{< ui >}}Risk{{< /ui >}} et {{< ui >}}Effort{{< /ui >}} dans le tableau {{< ui >}}Active Recommendations{{< /ui >}} et dans le panneau latéral de chaque recommandation.

| Risque | Description |
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | Sûr et facilement annulable : aucune donnée en jeu ou entièrement récupérable, ressource facilement recréable, isolée, aucun impact sur l'exécution. |
| {{< ui >}}Medium{{< /ui >}} | Récupérable mais nécessite des efforts : données ou ressources restaurables via un instantané ou un reprovisionnement, impact limité à une application ou une charge de travail, perturbation brève uniquement. |
| {{< ui >}}High{{< /ui >}} | Difficile à annuler ou à fort impact en cas d'erreur : perte de données irréversible, ressource impossible à recréer, large rayon d'action ou downtime possible d'une charge de travail en direct. |


| Niveau d'effort | Description |
|--------|-------------|
| {{< ui >}}Low{{< /ui >}} | Un changement rapide qui prend quelques minutes. Généralement un simple bouton à basculer dans la console ou un appel API, et entièrement automatisable. |
| {{< ui >}}Medium{{< /ui >}} | Un effort modéré qui prend de quelques heures à quelques jours. Nécessite un peu de script, de tests ou de coordination avec une autre équipe. |
| {{< ui >}}High{{< /ui >}} | Un effort majeur qui prend des semaines. Un changement architectural ou une coordination entre plusieurs équipes.|

Utilisez les colonnes {{< ui >}}Risk{{< /ui >}} et {{< ui >}}Effort{{< /ui >}} pour hiérarchiser les recommandations à faible risque, à faible effort, ou les deux. 

## Statuts des recommandations {#recommendation-statuses}

Attribuez un statut à chaque recommandation pour suivre la progression de l'optimisation des coûts au sein de vos équipes. Les statuts sont conservés lorsque les recommandations sont régénérées quotidiennement. Vous n'avez pas besoin de retrier les mêmes recommandations.

| Statut | Description |
|--------|-------------|
| {{< ui >}}Open{{< /ui >}} | (Par défaut) La recommandation n'a pas été triée. |
| {{< ui >}}In Progress{{< /ui >}} | Un travail est en cours pour traiter cette recommandation. |
| {{< ui >}}Completed{{< /ui >}} | L'action recommandée a été effectuée ou n'est plus pertinente. |
| {{< ui >}}Dismissed{{< /ui >}} | Aucun travail n'est prévu pour cette recommandation sur la période spécifiée lors du rejet. |

### Filtrer les recommandations par statut {#filter-recommendations-by-status}

Utilisez les onglets de statut en haut de la page [{{< ui >}}Cloud Cost Recommendations{{< /ui >}}][1] pour filtrer la liste par statut. Les onglets disponibles sont {{< ui >}}Open{{< /ui >}}, {{< ui >}}In Progress{{< /ui >}}, {{< ui >}}Completed{{< /ui >}} et {{< ui >}}Dismissed{{< /ui >}}. Chaque onglet affiche le total des économies estimées pour les recommandations ayant ce statut.

### Suivre les économies par statut {#track-savings-by-status}

Chaque onglet de statut affiche le total des économies estimées pour les recommandations ayant ce statut :

- {{< ui >}}Open{{< /ui >}} : Économies potentielles issues des recommandations qui n'ont pas été triées.
- {{< ui >}}In Progress{{< /ui >}} : Économies estimées issues des recommandations en cours de traitement.
- {{< ui >}}Completed{{< /ui >}} : Économies réalisées issues des recommandations pour lesquelles l'action recommandée a été effectuée.
- {{< ui >}}Dismissed{{< /ui >}} : Économies estimées issues des recommandations qui ont été ignorées.

### Modifier le statut d'une recommandation {#change-a-recommendation-status}

Vous pouvez modifier le statut d'une recommandation de trois manières :

- **Mise à jour en masse** : sélectionnez une ou plusieurs recommandations dans {{< ui >}}Active Recommendations{{< /ui >}}, puis choisissez un statut dans la barre d'outils au-dessus du tableau pour l'appliquer à toutes les recommandations sélectionnées.
- **Depuis le tableau** : utilisez le menu déroulant de statut dans la colonne {{< ui >}}Status{{< /ui >}} pour sélectionner un nouveau statut directement depuis la liste des recommandations.
- **Depuis le panneau latéral** : cliquez sur une recommandation pour ouvrir le panneau latéral, puis utilisez le menu déroulant de statut pour sélectionner un nouveau statut.

## Prise d'action sur les recommandations{#recommendation-action-taking}
Vous pouvez agir sur les recommandations pour économiser de l'argent et optimiser les coûts. Cloud Cost Recommendations prend en charge Jira, 1-click Workflow Automation et Datadog Work Management. Les recommandations de volumes EBS inutilisés et GP2 EBS prennent également en charge 1-click Workflow Automation. Consultez les détails suivants pour chaque option de prise d'action :

- **Jira** : créez des tickets Jira directement depuis le panneau latéral des recommandations ou en sélectionnant plusieurs recommandations dans la liste {{< ui >}}Active Recommendations{{< /ui >}} et en cliquant sur {{< ui >}}Create Jira issue{{< /ui >}}. Les tickets créés sont étiquetés et renvoient à la recommandation dans Datadog.

  Pour filtrer les recommandations par statut Jira, utilisez les options de requête suivantes :
  - `@jira_issues.issue_key:*` - Afficher uniquement les recommandations avec un ticket Jira
  - `-@jira_issues.issue_key:*` - Afficher uniquement les recommandations sans ticket Jira
  - `jira_issues.issue_key:ABC*` - Filtrer par préfixe de projet Jira spécifique

- **[Bits Code][14] correctifs de code** : Des correctifs de code sont disponibles pour les recommandations S3 et DynamoDB applicables ainsi que pour la recommandation Downsize Kubernetes Deployment. Dans ces situations, Bits Code crée des pull requests prêtes pour la production afin de mettre en œuvre les changements de ressources cloud et les optimisations de coûts dans Terraform ou dans Helm charts, respectivement. [Set up Bits Code][13] pour utiliser cette fonctionnalité.
- **1-click Workflow Automation actions** : Des actions sont disponibles pour un ensemble limité de recommandations, permettant aux utilisateurs d'exécuter les actions suggérées, telles que cliquer sur {{< ui >}}Delete EBS Volume{{< /ui >}}, directement dans Cloud Cost Management.
- **[Cost Optimization Automations][15]** : Configurez des automatisations qui agissent sur les recommandations en continu selon un planning récurrent. Les automatisations sont limitées à des comptes, des régions et des étiquettes spécifiques et incluent des mesures de protection telles que des instantanés avant action et une approbation humaine facultative via Slack ou Microsoft Teams.
- **[Notifications][16]** : configurez des règles de notification qui envoient un résumé Slack récurrent des recommandations correspondantes, sans effectuer aucune action.
- **Datadog Case Management** : Les utilisateurs peuvent accéder au panneau latéral des recommandations et cliquer sur {{< ui >}}Create Case{{< /ui >}} pour générer un cas afin de gérer les recommandations et d'agir sur celles-ci.
- **Dismiss** : Utilisez {{< ui >}}Dismiss{{< /ui >}} dans le panneau latéral des recommandations pour masquer une recommandation pendant une période choisie et fournir une raison. Les recommandations ignorées sont déplacées vers l'onglet {{< ui >}}Dismissed{{< /ui >}}.

## Descriptions des recommandations et des ressources {#recommendation-and-resource-descriptions}

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
[13]: /fr/bits_ai/bits_code/setup
[14]: /fr/bits_ai/bits_code/
[15]: /fr/cloud_cost_management/recommendations/cost_optimization_automation/
[16]: /fr/cloud_cost_management/recommendations/notifications/
[17]: /fr/mcp_server/tools/#cost_recommendations
[18]: /fr/cloud_cost_management/setup/saas_costs/?tab=openai#configure-your-saas-accounts
[19]: /fr/cloud_cost_management/setup/saas_costs/?tab=anthropic#configure-your-saas-accounts