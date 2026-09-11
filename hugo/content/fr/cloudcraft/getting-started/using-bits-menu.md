---
title: Utiliser le menu Bits
---

## Présentation

Le menu Bits de Cloudcraft vous permet de basculer en toute simplicité entre les ressources de Cloudcraft et les vues les plus pertinentes de Datadog. Cette fonction permet d'accéder rapidement à des informations pertinentes adaptées à la ressource spécifique que vous examinez. Vous pouvez accéder en un clic aux logs, aux traces APM ou à dʼautres données dans Datadog depuis un diagramme Cloudcraft.

<div class="alert alert-info">Pour accéder à cette fonctionnalité, connectez-vous à Cloudcraft en utilisant votre compte Datadog. Si vous vous connectez en utilisant une autre méthode de connexion, <a href="https://app.cloudcraft.co/app/support">contactez notre équipe d'assistance</a> pour obtenir de l'aide.</div>

## Le menu Bits

Commencez par cliquer sur un [composant pris en charge](#composants-pris-en-charge) dans votre diagramme. Une fois que vous avez sélectionné un composant, le menu Bits apparaît sur le côté droit de l'écran.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu.png" alt="Capture dʼécran montrant lʼinterface de Cloudcraft avec une flèche rouge mettant en évidence le menu Bits." responsive="true" style="width:100%;">}}

Cliquez sur le menu Bits pour afficher les options disponibles pour le composant sélectionné.

{{< img src="cloudcraft/getting-started/using-bits-menu/bits-menu-clicked.png" alt="Capture dʼécran de Cloudcraft. Lʼutilisateur clique sur le menu Bits, ce qui affiche plusieurs options, dont le dashboard Host, Database Monitoring, des métriques de requêtes et le dashboard MySQL." responsive="true" style="width:100%;">}}

Cliquez sur l'une des options pour ouvrir la vue correspondante dans Datadog.

## Composants pris en charge

Le menu Bits est disponible pour les composants Cloudcraft suivants :

**DʼAWS :**

- Cloudfront.
- DocumentDB.
- DynamoDB.
- EBS.
- EC2.
- EKS Cluster.
- ELB/ALB.
- Elasticache.
- Lambda.
- NAT Gateway.
- OpenSearch.
- RDS.
- Redshift.
- S3.
- SNS Topic.
- SQS.
- VPC Endpoint.

**DʼAzure :**

- AKS Cluster.
- Database for MySQL.
- Database for PostgreSQL.
- Function App.
- Managed Disk.
- SQL Database.
- Virtual Machine.
- Web App.

D'autres composants seront bientôt pris en charge.

**Remarque** : pour visualiser les données télémétriques d'un composant dans Datadog, des Agents Datadog ou dʼautres intégrations doivent y être installés et configurés.