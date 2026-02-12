---
algolia:
  tags:
  - cloud cost recommendations
  - cloud cost recommendation
  - cost recommendations
  - cost recommendation
  - cloud resources
  - cloud resource
description: Découvrez comment réduire les dépenses de votre organisation liées aux
  ressources cloud grâce aux recommandations de coût.
further_reading:
- link: /cloud_cost_management/
  tag: Documentation
  text: En savoir plus sur Cloud Cost Management
- link: /integrations/guide/aws-integration-and-cloudwatch-faq/
  tag: Documentation
  text: FAQ sur l'intégration AWS et CloudWatch
- link: https://www.datadoghq.com/blog/finops-at-datadog/
  tag: Blog
  text: Comment nous avons mis en place une pratique FinOps efficace chez Datadog
    (en anglais)
- link: https://www.datadoghq.com/blog/cloud-cost-recommendations/
  tag: Blog
  text: Évitez les dépenses inutiles liées à AWS, Azure et Google Cloud grâce aux
    recommandations de coût pour le cloud (en anglais)
multifiltersearch:
  data:
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un groupe d'autoscaling utilise moins de 5 % du CPU
      et de 10 % de la mémoire.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Autoscaling Group
    resource_type: Groupe d'autoscaling
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un groupe d'autoscaling inclut des types d'instances
      obsolètes.
    recommendation_prerequisites: ''
    recommendation_type: Migrate Legacy Autoscaling Group instances to new types
    resource_type: Groupe d'autoscaling
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Le nombre de trails CloudTrail actifs sur un compte
      est supérieur à ce qui est nécessaire.
    recommendation_prerequisites: ''
    recommendation_type: Delete unnecessary Cloudtrail Trails
    resource_type: Trail Cloudtrail
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Vous pouvez retirer l'autorisation d'écriture de logs
      CloudWatch pour une fonction Lambda.
    recommendation_prerequisites: ''
    recommendation_type: Delete Lambda Cloudwatch Logs and write permissions
    resource_type: Logs CloudWatch
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un index secondaire global (GSI ou Global Secondary
      Index) d'une table DynamoDB ne possède aucune lecture.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Global Secondary Index
    resource_type: DynamoDB
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB ne possède aucune lecture ni aucune
      écriture autre qu'une réplique.
    recommendation_prerequisites: ''
    recommendation_type: Delete DynamoDB Table
    resource_type: DynamoDB
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une table DynamoDB engendre des frais pour plus de
      deux sauvegardes à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Delete Extra On-Demand Backups
    resource_type: DynamoDB
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Plus de 80 % du temps, une table DynamoDB provisionnée
      utilise moins de 80 % de sa capacité de lecture et d'écriture.
    recommendation_prerequisites: ''
    recommendation_type: Downsize DynamoDB Capacity
    resource_type: DynamoDB
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: La migration vers la classe de table Infrequent Access
      (IA) permet de réduire davantage vos coûts de stockage en évitant les dépenses
      supplémentaires liées aux tarifs basés sur la capacité.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Infrequent Access Table Class
    resource_type: DynamoDB
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: L'utilisation horaire de la capacité de lecture et
      d'écriture d'une table DynamoDB provisionnée a atteint un niveau inférieur à
      18 % au moins une fois au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to On-Demand Capacity Mode
    resource_type: Table DynamoDB
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: L'utilisation horaire de la capacité de lecture et
      d'écriture d'une table DynamoDB à la demande a systématiquement dépassé 18 %.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Provisioned Capacity Mode
    resource_type: Table DynamoDB
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: La migration vers la classe de table Standard permet
      de réduire potentiellement vos coûts liés à la capacité en évitant les dépenses
      liées aux tarifs basés sur le stockage, ou permet d'utiliser le niveau de classe
      Standard, qui est gratuit, pour le stockage.
    recommendation_prerequisites: ''
    recommendation_type: Migrate DynamoDB to Standard Table Class
    resource_type: Table DynamoDB
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des snapshots EBS datent d'au moins 90 jours et peuvent
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Old EBS Snapshots
    resource_type: Snapshot EBS
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilise moins de 80 % des requêtes d'E/S
      provisionnées par seconde (IOPS) pour les lectures et écritures.
    recommendation_prerequisites: '[Intégration Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned IOPS
    resource_type: Volume EBS
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilise moins de 80 % du débit provisionné
      pour les lectures et écritures.
    recommendation_prerequisites: '[Intégration Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS Volume Provisioned Throughput
    resource_type: Volume EBS
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Un volume EBS utilise moins de 20 % de sa capacité
      de stockage.
    recommendation_prerequisites: '[Intégration Amazon EC2](/integrations/amazon_ec2/)'
    recommendation_type: Downsize EBS volume storage capacity
    resource_type: Volume EBS
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Des volumes EBS de type GP2 peuvent être mis à niveau
      vers GP3 afin de réduire leurs coûts et d'améliorer leurs performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from GP2 to GP3
    resource_type: Volume EBS
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Des volumes EBS de type IO1 peuvent être mis à niveau
      vers GP3 afin de réduire leurs coûts et d'améliorer leurs performances.
    recommendation_prerequisites: ''
    recommendation_type: Migrate EBS Volume from IO1 to GP3
    resource_type: Volume EBS
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un volume n'est pas associé à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unattached EBS Volume
    resource_type: Volume EBS
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un volume n'effectue aucune activité de lecture ou
      d'écriture.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused EBS Volume
    resource_type: Volume EBS
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des adresses IP élastiques engendrent des frais d'inactivité
      dans le rapport sur les coûts et l'utilisation AWS.
    recommendation_prerequisites: ''
    recommendation_type: Delete Idle Elastic IP
    resource_type: IP élastique
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Memcached utilise moins
      de 25 % du CPU utilisateur et n'est pas conteneurisée.
    recommendation_prerequisites: '[Intégration Memcache](/integrations/memcached)'
    recommendation_type: Downsize EC2 Instance Running Memcached
    resource_type: Instance EC2
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute MySQL consomme moins
      de 25 % du CPU utilisateur et plus de 25 % de la mémoire utilisable, et n'est
      pas conteneurisée ni une réplique.
    recommendation_prerequisites: '[Integration MySQL](/integrations/mysql)'
    recommendation_type: Downsize EC2 Instance Running MySQL
    resource_type: Instance EC2
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Postgres consomme moins
      de 25 % du CPU utilisateur et plus de 25 % de la mémoire utilisable, et n'est
      pas conteneurisée ni une réplique.
    recommendation_prerequisites: '[Intégration Postgres](/integrations/postgres)'
    recommendation_type: Downsize EC2 Instance Running Postgres
    resource_type: Instance EC2
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Redis utilise moins de
      25 % du CPU utilisateur, n'est pas conteneurisée et n'est pas une instance primaire
      (leader), une instance secondaire (follower) ni une partition.
    recommendation_prerequisites: '[Intégration Redis](/integrations/redis)'
    recommendation_type: Downsize EC2 Instance Running Redis
    resource_type: Instance EC2
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Des instances EC2 utilisent moins de 50 % du CPU et
      de la mémoire.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize EC2 instance
    resource_type: Instance EC2
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Des instances EC2 appartiennent à une génération précédente
      et peuvent être mises à niveau vers un type d'instance plus récent.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Migrate Legacy EC2 instance
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute MySQL utilise moins d'une
      connexion simultanée et n'est pas conteneurisée ni une réplique.
    recommendation_prerequisites: '[Intégration MySQL](/integrations/mysql)'
    recommendation_type: Terminate EC2 Instance running MySQL
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des instances EC2 utilisent moins de 5 % du CPU et
      moins de 10 % de la mémoire.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Terminate EC2 instance
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Memcached n'engendre
      aucun accès à l'espace de clés et n'est pas conteneurisée.
    recommendation_prerequisites: '[Intégration Memcache](/integrations/memcached)'
    recommendation_type: Terminate EC2 instance running Memcached
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Postgres utilise moins
      d'une connexion simultanée et n'est pas conteneurisée ni une réplique.
    recommendation_prerequisites: '[Intégration Postgres](/integrations/postgres)'
    recommendation_type: Terminate EC2 instance running Postgres
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance EC2 qui exécute Redis n'engendre aucun
      accès à l'espace de clés et n'est pas conteneurisée ni une instance primaire
      (leader), une instance secondaire (follower) ou une partition.
    recommendation_prerequisites: '[Intégration Redis](/integrations/redis)'
    recommendation_type: Terminate EC2 instance running Redis
    resource_type: Instance EC2
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un référentiel ECR n'engendre aucune extraction d'image.
    recommendation_prerequisites: ''
    recommendation_type: Delete ECR Repository
    resource_type: Référentiel ECR
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des octets d'image ECR datent de plus de 180 jours.
    recommendation_prerequisites: ''
    recommendation_type: Delete old ECR Images
    resource_type: Référentiel ECR
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Une tâche ECS utilise moins de 50 % du CPU ou de la
      mémoire demandés.
    recommendation_prerequisites: '[Surveillance des conteneurs](/containers/)'
    recommendation_type: Downsize ECS Task Size
    resource_type: Définition de tâche ECS
  - category: Purchase
    cloud_provider: AWS
    recommendation_description: Un nœud ElastiCache datant de plus de 45 jours est
      toujours facturé sur la base de tarifs à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reserved ElastiCache Node
    resource_type: Cluster ElastiCache
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un cluster Redis ElasticCache n'engendre aucun accès
      à la mémoire tampon ni aucun octet de réplication.
    recommendation_prerequisites: ''
    recommendation_type: Terminate ElastiCache Cluster
    resource_type: Cluster ElastiCache
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Le niveau de simultanéité d'une fonction AWS Lambda
      est trop important.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Lambda Function Provisioned Concurrency
    resource_type: Lambda
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un répartiteur de charge élastique classique ne possède
      aucune connexion active et n'est pas associé à une instance EC2.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Classic Load Balancer
    resource_type: Répartiteur de charge classique
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un répartiteur de charge d'application ne traite aucun
      trafic.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Application Load Balancer
    resource_type: Répartiteur de charge d'application
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un répartiteur de charge réseau ne traite aucun octet.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Network Load Balancer
    resource_type: Répartiteur de charge réseau
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un courtier MQ ne possède aucune connexion.
    recommendation_prerequisites: ''
    recommendation_type: Terminate MQ Broker
    resource_type: Courtier MQ
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un domaine OpenSearch ne possède aucune connexion.
    recommendation_prerequisites: ''
    recommendation_type: Delete OpenSearch Domain
    resource_type: OpenSearch
  - category: Purchase
    cloud_provider: AWS
    recommendation_description: Une instance OpenSearch datant de plus de 45 jours
      est toujours facturée sur la base de tarifs à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reserved OpenSearch Instance
    resource_type: Domaine OpenSearch
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Des instances RDS ont utilisé moins de 80 % des requêtes
      d'E/S provisionnées par seconde (IOPS) au cours des deux dernières semaines.
    recommendation_prerequisites: ''
    recommendation_type: Downsize RDS Instance Provisioned IOPS
    resource_type: Instance RDS
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un RDS utilise une version de moteur qui n'est plus
      prise en charge et qui entraîne des [frais d'assistance additionnels] (https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/extended-support-charges.html).
    recommendation_prerequisites: ''
    recommendation_type: Migrate the RDS Instance Engine
    resource_type: Instance RDS
  - category: Purchase
    cloud_provider: AWS
    recommendation_description: Une instance RDS datant de plus de 45 jours est toujours
      facturée sur la base de tarifs à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reserved RDS Instance
    resource_type: Instance RDS
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Une instance RDS ne possède aucune connexion à une
      base de données ni aucune latence pour les répliques.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Unused RDS Instance
    resource_type: Instance RDS
  - category: Purchase
    cloud_provider: AWS
    recommendation_description: Un nœud de cluster Redshift datant de plus de 45 jours
      est toujours facturé sur la base de tarifs à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reserved Redshift Cluster Node
    resource_type: Redshift
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un cluster Redshift ne possède aucune connexion à
      une base de données.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Redshift Cluster
    resource_type: Redshift
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Un compartiment S3 standard ne possédant pas de cycle
      d'expiration pour les versions non actuelles, et n'étant pas utilisé par un
      site web, contient des octets de stockage de versions non actuelles datant de
      plus de 30 jours.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete S3 non-current version objects
    resource_type: Compartiment S3
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Des compartiments S3 possèdent des chargements partitionnés
      incomplets datant de plus de 7 jours qui consomment de l'espace de stockage.
    recommendation_prerequisites: '[Storage Lens](/integrations/amazon_s3_storage_lens/)'
    recommendation_type: Delete abandoned S3 multipart uploads
    resource_type: Compartiment S3
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Un compartiment engendre des frais de suppression
      anticipée.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 IA and Glacier objects to Intelligent-Tiering
    resource_type: Compartiment S3
  - category: Migrate
    cloud_provider: AWS
    recommendation_description: Les coûts d'un compartiment sont presque entièrement
      calculés en Go de stockage standard, mais des requêtes GET indiquent que peu
      d'objets sont utilisés.
    recommendation_prerequisites: ''
    recommendation_type: Transition S3 Standard objects to Intelligent Tiering
    resource_type: Compartiment S3
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources nécessitant une passerelle NAT doivent
      utiliser une passerelle dans leur zone de disponibilité, sans quoi cela pourrait
      engendrer des frais inutiles de transfert entre zones.
    recommendation_prerequisites: ''
    recommendation_type: Reduce NAT Gateway Cross-Zone Transfers
    resource_type: Passerelle NAT
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Les ressources d'un même VPC doivent éviter de communiquer
      entre elles par l'intermédiaire d'une passerelle NAT, car cela entraîne des
      frais de traitement inutiles liés à la passerelle NAT.
    recommendation_prerequisites: '[NPM](/network_monitoring/performance/setup/)'
    recommendation_type: Reduce NAT Within-VPC Transfers
    resource_type: Passerelle NAT d'un VPC
  - category: Terminate
    cloud_provider: AWS
    recommendation_description: Aucun octet ne transite par une passerelle NAT.
    recommendation_prerequisites: ''
    recommendation_type: Terminate NAT Gateway
    resource_type: Passerelle NAT
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un cluster AKS possède une utilisation du CPU inférieure
      à 5 %.
    recommendation_prerequisites: ''
    recommendation_type: Terminate AKS Cluster
    resource_type: Cluster AKS
  - category: Purchase
    cloud_provider: Azure
    recommendation_description: Un service d'application datant de plus de 45 jours
      est facturé sur la base de tarifs à la demande.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reservation for App Service
    resource_type: Azure App Service
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une application conteneurisée possède un nombre minimum
      de répliques supérieur à ce qui est nécessaire.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Container App
    resource_type: Application conteneurisée
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un répartiteur de charge n'a transféré aucun octet.
    recommendation_prerequisites: ''
    recommendation_type: Delete Load Balancer
    resource_type: Répartiteur de charge
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un disque géré n'est pas associé et peut être supprimé.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Managed Disk
    resource_type: Disque géré
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un disque géré n'effectue aucune opération de lecture/écriture
      et peut être supprimé.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Managed Disk
    resource_type: Disque géré
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Un disque géré utilise moins de 80 % des requêtes
      d'E/S provisionnées par seconde (IOPS).
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk IOPS
    resource_type: Disque géré
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Un disque géré utilise moins de 80 % du débit provisionné.
    recommendation_prerequisites: ''
    recommendation_type: Downsize Managed Disk Throughput
    resource_type: Disque géré
  - category: Purchase
    cloud_provider: Azure
    recommendation_description: Une base de données MySQL ne couvre aucune réservation
      et date de plus de 45 jours.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reservation for MySQL
    resource_type: Base de données MySQL
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un serveur de base de données ne possède aucune connexion
      et peut être abandonné.
    recommendation_prerequisites: ''
    recommendation_type: Terminate Database for MySQL
    resource_type: Base de données MySQL
  - category: Purchase
    cloud_provider: Azure
    recommendation_description: Une base de données PostgreSQL ne couvre aucune réservation
      et date de plus de 45 jours.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reservation for PostgreSQL
    resource_type: Base de données pour PostgreSQL
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un serveur SQL Server ne possède aucune connexion
      et peut être abandonné.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server
    resource_type: SQL Server
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une base de données SQL Server possède une faible
      utilisation des unités de transaction de base de données (DTU) et peut être
      dimensionnée à la baisse.
    recommendation_prerequisites: ''
    recommendation_type: Downsize SQL Server Database DTU
    resource_type: Base de données SQL Server
  - category: Purchase
    cloud_provider: Azure
    recommendation_description: Une base de données SQL Server ne couvre aucune réservation
      et date de plus de 45 jours.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reservation for SQL Server Database
    resource_type: Base de données SQL Server
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Un base de données SQL Server ne possède aucune connexion
      réussie et utilise très peu de CPU, et peut donc être abandonnée.
    recommendation_prerequisites: ''
    recommendation_type: Terminate SQL Server Database
    resource_type: Base de données SQL Server
  - category: Purchase
    cloud_provider: Azure
    recommendation_description: Une réservation d'achat existe pour une instance SQL Server
      gérée qui ne couvre aucune réservation et date de plus de 45 jours.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Reservation for SQL Server Managed Instance
    resource_type: Instance SQL Server gérée
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Une Instance de VM peut être dimensionnée à la baisse
      vers un type d'instance plus petit.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Azure VM Instance
    resource_type: Instance de VM
  - category: Terminate
    cloud_provider: Azure
    recommendation_description: Une instance de VM utilise moins de 5 % du CPU utilisateur
      et plus de 90 % de la mémoire utilisable.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Terminate Azure VM Instance
    resource_type: Instance de VM
  - category: Purchase
    cloud_provider: GCP
    recommendation_description: Des jobs Cloud Run bénéficient de remises flexibles
      sur engagement d'utilisation.
    recommendation_prerequisites: ''
    recommendation_type: Purchase Flexible CUD for Cloud Run Job
    resource_type: Job Cloud Run
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des adresses IP de calcul sont inutilisées et peuvent
      être supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute IP Address
    resource_type: Adresse de calcul
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des disques de calcul ne sont pas associés et peuvent
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unattached Compute Disk
    resource_type: Disque de calcul
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des disques de calcul ne sont pas utilisés et peuvent
      être supprimés.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Disk
    resource_type: Disque de calcul
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des adresses IP de calcul globales ne sont pas utilisées
      et peuvent être supprimées.
    recommendation_prerequisites: ''
    recommendation_type: Delete Unused Compute Global IP Address
    resource_type: Adresse de calcul globale
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Une instance de calcul avec une faible utilisation
      du CPU et de la mémoire peut être dimensionnée à la baisse vers un type d'instance
      plus petit.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Compute Instance
    resource_type: Instance de calcul
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Une instance de calcul possède une faible utilisation
      du CPU, une mémoire à haute disponibilité et une activité réseau minime.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Terminate Compute Instance
    resource_type: Instance de calcul
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Des instances CloudSQL sont surprovisionnées et peuvent
      être dimensionnées à la baisse.
    recommendation_prerequisites: ''
    recommendation_type: Downsize CloudSQL Database
    resource_type: Instance CloudSQL
  - category: Purchase
    cloud_provider: GCP
    recommendation_description: Des instances CloudSQL bénéficient de remises sur
      engagement d'utilisation.
    recommendation_prerequisites: ''
    recommendation_type: Purchase CUD for Cloud SQL
    resource_type: Instance CloudSQL
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des instances CloudSQL possèdent une utilisation minimale
      et peuvent être abandonnées.
    recommendation_prerequisites: ''
    recommendation_type: Terminate CloudSQL Instance
    resource_type: Instance CloudSQL
  - category: Terminate
    cloud_provider: GCP
    recommendation_description: Des compartiments de stockage dans le cloud disposent
      de règles de cycle de vie visant à supprimer automatiquement les versions non
      actuelles des objets.
    recommendation_prerequisites: ''
    recommendation_type: Delete Non-Current Cloud Storage Objects
    resource_type: Compartiment de stockage
  - category: Migrate
    cloud_provider: GCP
    recommendation_description: Des objets d'un compartiment de stockage peuvent être
      automatiquement migrés vers des niveaux d'archive pour bénéficier de tarifs
      plus avantageux.
    recommendation_prerequisites: ''
    recommendation_type: Transition Cloud Storage Bucket to Autoclass
    resource_type: Compartiment de stockage
  - category: Downsize
    cloud_provider: AWS
    recommendation_description: Des conteneurs n'utilisent qu'une fraction du CPU
      ou de la mémoire demandés.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Déploiement Kubernetes
  - category: Downsize
    cloud_provider: Azure
    recommendation_description: Des conteneurs n'utilisent qu'une fraction du CPU
      ou de la mémoire demandés.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Déploiement Kubernetes
  - category: Downsize
    cloud_provider: GCP
    recommendation_description: Des conteneurs n'utilisent qu'une fraction du CPU
      ou de la mémoire demandés.
    recommendation_prerequisites: '[Agent Datadog](/agent/)'
    recommendation_type: Downsize Deployment
    resource_type: Déploiement Kubernetes
  headers:
  - filter_by: true
    id: catégorie
    name: Catégorie de recommandation
  - filter_by: true
    id: cloud_provider
    name: Fournisseur cloud
  - filter_by: true
    id: resource_type
    name: Type de ressource
  - id: recommendation_type
    name: Type de recommandation
  - id: recommendation_description
    name: Description de la recommandation
  - id: recommendation_prerequisites
    name: Prérequis de la recommandation
title: Recommandations de coût pour le cloud
---


## Présentation

La fonctionnalité de [recommandations de coût pour le cloud][1] vous aide à réduire vos dépenses liées au cloud en optimisant l'utilisation de vos ressources cloud. Datadog génère un ensemble de recommandations en combinant vos données d'observabilité avec les données de facturation de vos fournisseurs cloud sous-jacents, afin d'identifier les ressources orphelines, obsolètes ou surprovisionnées.

Les recommandations sont générées quotidiennement et sont automatiquement actualisées dans votre compte dès leur publication.

- Pour **toutes les ressources**, les [métriques de coûts liés au cloud][6] proviennent également de la ressource en question.
- Pour toutes les **ressources AWS** autres que Kubernetes et EC2, les métriques AWS proviennent également d'[AWS CloudWatch][7].

{{< img src="cloud_cost/recommendations/cost_recommendations_1.png" alt="Onglet Overview avec les économies mensuelles potentielles, les économies annuelles potentielles et le nombre de cas ouverts sur la page Cloud Cost Recommendations" style="width:100%;" >}}

Vous pouvez consulter la logique précise de chaque type de recommandation, ainsi que les métriques d'observabilité ou les données de coûts, sur cette page.

Les recommandations prennent en charge les [pipelines de tags][11]. Vous pouvez ainsi filtrer, regrouper et analyser les recommandations à l'aide des tags normalisés de votre organisation. Toutes les règles de tag configurées dans des pipelines de tags sont automatiquement appliquées aux recommandations.

## Catégories de recommandations

Vous trouverez ci-dessous les différentes catégories de recommandations de coût pour le cloud, ainsi que leur description.

| Catégorie de recommandation | Description |
|----------|-------------|
| Terminate | Des ressources possèdent des signaux indiquant que les ressources en question sont inutilisées ou des signaux d'utilisation très faible. Envisagez d'abandonner ou de supprimer ces ressources pour réduire vos coûts. |
| Migrate | Des ressources possèdent des signaux d'utilisation modérément faible ou d'autres inefficacités. Envisagez d'ajuster le type d'instance ou d'autres paramètres. |
| Downsize | Des ressources sont sous-utilisées ou surapprovisionnées. Envisagez d'ajuster la taille ou d'autres paramètres pour réduire vos coûts. |
| Purchase | Des ressources engendrent des frais à la demande et une durée de disponibilité prolongée. L'achat d'une réservation ou d'un programme de remise peut réduire le coût amorti de la ressource. |

## Prérequis

Vous devez disposer des ressources suivantes pour recevoir des recommandations de coût pour le cloud :

- Des comptes de fournisseur cloud (pour toutes les recommandations de coût dans le cloud souhaitées)
- L'[intégration AWS et la collecte des ressources AWS][3] (pour les recommandations AWS)
- L'[intégration d'Azure et la collecte des ressources Azure][8] (pour les recommandations Azure)
- L'[intégration GCP et la collecte des ressources GCP][10] (pour les recommandations GCP)
- [L'intégration de l'Agent Datadog][5] (pour les recommandations de type Downsize)

## Configuration

Pour chaque compte cloud pour lequel vous souhaitez recevoir des recommandations, procédez comme suit :

1. Configurez [Cloud Cost Management][2] de façon à envoyer vos données de facturation à Datadog.
   - Pour recueillir les données de facturation Azure, vous devez utiliser la méthode reposant sur un enregistrement d'application.
1. Activez la [collecte des ressources][3] pour les recommandations.
   - Pour AWS, activez la collecte des ressources dans l'onglet **Resource Collection** du [carré de l'intégration AWS][4].
   - Pour Azure, activez la collecte des ressources avec l'intégration appropriée. Si votre organisation utilise le site US3 Datadog, l'[intégration native Azure][9] recueille automatiquement les ressources en même temps que la collecte des métriques. Pour tous les autres sites, il est nécessaire d'activer la collecte des ressources dans le [carré de l'intégration Azure][8].
   - Pour GCP, activez la collecte des ressources dans l'onglet **Resource Collection** du [carré de l'intégration Google Cloud Platform][10].
1. Installez l'[Agent Datadog][5] (nécessaire pour les recommandations de type Downsize).

**Remarque** : les recommandations de coût dans le cloud prennent en charge la facturation dans les devises autres que l'USD.

## Prendre des mesures suite aux recommandations
Vous pouvez prendre des mesures en vous basant sur des recommandations afin de réaliser des économies et d'optimiser vos coûts. Les recommandations de coût pour le cloud prennent en charge Jira, les processus Workflow Automation en un seul clic et la solution Case Management de Datadog. Les recommandations sur les volumes EBS et GP2 EBS inutilisés prennent également en charge les processus Workflow Automation en un seul clic. Chaque type de mesure est détaillé ci-dessous :

- **Jira** : vous pouvez créer un problème Jira depuis le volet latéral d'une recommandation et dans la liste Active Recommendations. Pour créer un problème Jira, cliquez sur Create Jira Issue dans le volet latéral, ou sélectionnez plusieurs recommandations dans la liste Active Recommendations. Des tags sont automatiquement appliqués aux problèmes Jira créés afin d'indiquer leur relation avec une recommandation de coût. Les problèmes Jira comprennent un lien qui renvoie vers la recommandation liée.
- **Mesures Workflow Automation en un seul clic** : vous pouvez prendre des mesures pour un ensemble limité de recommandations. Cela permet aux utilisateurs d'effectuer des actions suggérées, par exemple en cliquant sur l'option Delete EBS Volume, directement depuis la solution Cloud Cost Management.
- **Solution Case Management de Datadog** : les utilisateurs peuvent accéder au volet latéral des recommandations et cliquer sur Create Case pour générer un cas, afin de gérer des recommandations et de prendre des mesures à partir de celles-ci.
- **Option Dismiss** : utilisez l'option Dismiss dans le volet latéral des recommandations pour masquer une recommandation pendant une période donnée et en indiquer la raison. Les recommandations ignorées sont déplacées vers l'onglet Dismissed.

## Descriptions des recommandations et ressources

{{< multifilter-search >}}

## Pour aller plus loin

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
[11]: /fr/cloud_cost_management/tags/tag_pipelines/