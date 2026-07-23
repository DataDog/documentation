---
aliases:
- /fr/cloudprem/configure/aws_config/
description: Découvrir comment installer et configurer CloudPrem sur AWS EKS
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentation
  text: Configurer l'ingress CloudPrem
- link: /cloudprem/ingest/
  tag: Documentation
  text: Configurer l'ingestion de logs
title: Installer CloudPrem sur AWS EKS
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Ce document vous guide tout au long du processus de configuration de votre environnement AWS et d'installation de CloudPrem sur AWS EKS.

## Prérequis

Pour déployer CloudPrem sur AWS, vous devez configurer les éléments suivants :
- Identifiants et authentification AWS
- Sélection de la région AWS
- Autorisations IAM pour le stockage objet S3
- Base de données RDS PostgreSQL (recommandée)
- Cluster EKS avec AWS Load Balancer Controller

### Identifiants AWS

Au démarrage d'un nœud, CloudPrem tente de trouver des identifiants AWS en utilisant la chaîne de fournisseurs d'identifiants implémentée par [rusoto_core::ChainProvider][2] et recherche les identifiants dans l'ordre suivant :

1. Variables d'environnement `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY` ou `AWS_SESSION_TOKEN` (facultatif).
2. Fichier de profils d'identifiants, généralement situé à `~/.aws/credentials` ou spécifié par les variables d'environnement `AWS_SHARED_CREDENTIALS_FILE` et `AWS_PROFILE` si elles sont définies et non vides.
3. Identifiants de conteneur Amazon ECS, chargés depuis le conteneur Amazon ECS si la variable d'environnement `AWS_CONTAINER_CREDENTIALS_RELATIVE_URI` est définie.
4. Identifiants de profil d'instance, utilisés sur les instances Amazon EC2 et fournis via le service de métadonnées Amazon EC2.

Une erreur est renvoyée si aucun identifiant n'est trouvé dans la chaîne.

### Région AWS

CloudPrem tente de déterminer la région AWS à partir de plusieurs sources, selon l'ordre de priorité suivant :

1. **Variables d'environnement** : vérifie `AWS_REGION`, puis `AWS_DEFAULT_REGION`.
2. **Fichier de configuration AWS** : généralement situé à `~/.aws/config`, ou au chemin spécifié par la variable d'environnement `AWS_CONFIG_FILE` (si elle est définie et non vide).
3. **Métadonnées d'instance EC2** : utilise la région de l'instance Amazon EC2 en cours d'exécution.
4. **Valeur par défaut** : repli sur `us-east-1` si aucune autre source ne fournit de région.

### Autorisations IAM pour S3

Actions autorisées requises :

* `ListBucket` (directement sur le bucket)
* `GetObject`
* `PutObject`
* `DeleteObject`
* `ListMultipartUploadParts`
* `AbortMultipartUpload`

Voici un exemple de politique de bucket :

```json
{
 "Version": "2012-10-17",
 "Statement": [
   {
     "Effect": "Allow",
     "Action": [
       "s3:ListBucket"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket"
     ]
   },
   {
     "Effect": "Allow",
     "Action": [
       "s3:GetObject",
       "s3:PutObject",
       "s3:DeleteObject",
       "s3:ListMultipartUploadParts",
       "s3:AbortMultipartUpload"
     ],
     "Resource": [
       "arn:aws:s3:::my-bucket/*"
     ]
   }
 ]
}
```

### Créer une base de données RDS

Vous pouvez créer une instance RDS micro à l'aide de la commande suivante. Pour les environnements de production, une instance small déployée sur plusieurs zones de disponibilité (multi-AZ) est suffisante.

```shell
# Micro RDS instance for testing purposes. Takes around 5 min.
aws rds create-db-instance --db-instance-identifier cloudprem-postgres --db-instance-class db.t3.micro --engine postgres --engine-version 16.3 --master-username cloudprem --master-user-password 'FixMeCloudPrem' --allocated-storage 20 --storage-type gp2 --db-subnet-group-name <VPC-ID> --vpc-security-group-ids <VPC-SECURITY-GROUP-ID> --db-name cloudprem --backup-retention-period 0 --no-multi-az
```

Vous pouvez récupérer les informations RDS en exécutant les commandes shell suivantes :

```shell
# Get RDS instance details
RDS_INFO=$(aws rds describe-db-instances --db-instance-identifier cloudprem-demo-postgres --query 'DBInstances[0].{Status:DBInstanceStatus,Endpoint:Endpoint.Address,Port:Endpoint.Port,Database:DBName}' --output json 2>/dev/null)

STATUS=$(echo $RDS_INFO | jq -r '.Status')
ENDPOINT=$(echo $RDS_INFO | jq -r '.Endpoint')
PORT=$(echo $RDS_INFO | jq -r '.Port')
DATABASE=$(echo $RDS_INFO | jq -r '.Database')

echo ""
echo "🔗 Full URI:"
echo "postgres://cloudprem:FixMeCloudPrem@$ENDPOINT:$PORT/$DATABASE"
echo ""
```

## Étapes d'installation

1. [Installer le chart Helm CloudPrem](#installer-le-chart-helm-cloudprem)
2. [Vérifier l'installation](#verification)

## Installer le chart Helm CloudPrem

1. Ajoutez et mettez à jour le référentiel Helm Datadog :
   ```shell
   helm repo add datadog https://helm.datadoghq.com
   helm repo update
   ```

1. Créez un namespace Kubernetes pour le chart :
   ```shell
   kubectl create namespace <NAMESPACE_NAME>
   ```

   Par exemple, pour créer un namespace `cloudprem` :
   ```shell
   kubectl create namespace cloudprem
   ```

   **Remarque** : vous pouvez définir un namespace par défaut pour votre contexte actuel afin d'éviter de saisir `-n <NAMESPACE_NAME>` à chaque commande :
   ```shell
   kubectl config set-context --current --namespace=cloudprem
   ```

1. Stockez votre clé d'API Datadog en tant que secret Kubernetes :

   ```shell
   kubectl create secret generic datadog-secret \
   -n <NAMESPACE_NAME> \
   --from-literal api-key="<DD_API_KEY>"
   ```

1. Stockez la chaîne de connexion à la base de données PostgreSQL en tant que secret Kubernetes :
   ```shell
   kubectl create secret generic cloudprem-metastore-uri \
   -n <NAMESPACE_NAME> \
   --from-literal QW_METASTORE_URI="postgres://<USERNAME>:<PASSWORD>@<ENDPOINT>:<PORT>/<DATABASE>"
   ```

1. Personnaliser le chart Helm

   Créez un fichier `datadog-values.yaml` pour remplacer les valeurs par défaut par votre configuration personnalisée. C'est ici que vous définissez les paramètres spécifiques à l'environnement, tels que le tag d'image, l'ID de compte AWS, le compte de service, la configuration de l'ingress, les demandes et limites de ressources, etc.

   Tout paramètre non explicitement remplacé dans `datadog-values.yaml` utilise les valeurs par défaut définies dans le fichier `values.yaml` du chart.

   ```shell
   # Show default values
   helm show values datadog/cloudprem
   ```

   Voici un exemple de fichier `datadog-values.yaml` avec ces valeurs personnalisées :

   ```yaml
   aws:
     accountId: "123456789012"

   # Environment variables
   # Any environment variables defined here are available to all pods in the deployment
   environment:
     AWS_REGION: us-east-1

   # Datadog configuration
   datadog:
      # The Datadog [site](https://docs.datadoghq.com/getting_started/site/) to connect to. Defaults to `datadoghq.com`.
      # site: datadoghq.com
      # The name of the existing Secret containing the Datadog API key. The secret key name must be `api-key`.
      apiKeyExistingSecret: datadog-secret

   # Service account configuration
   # If `serviceAccount.create` is set to `true`, a service account is created with the specified name.
   # The service account will be annotated with the IAM role ARN if `aws.accountId` and serviceAccount.eksRoleName` are set.
   # Additional annotations can be added using serviceAccount.extraAnnotations.
   serviceAccount:
     create: true
     name: cloudprem
     # The name of the IAM role to use for the service account. If set, the following annotations will be added to the service account:
     # - eks.amazonaws.com/role-arn: arn:aws:iam::<aws.accountId>:role/<serviceAccount.eksRoleName>
     # - eks.amazonaws.com/sts-regional-endpoints: "true"
     eksRoleName: cloudprem
     extraAnnotations: {}

   # CloudPrem node configuration
   config:
     # The root URI where index data is stored. This should be an S3 path.
     # All indexes created in CloudPrem are stored under this location.
     default_index_root_uri: s3://<BUCKET_NAME>/indexes

   # Internal ingress configuration for access within the VPC
   # The ingress provisions an Application Load Balancers (ALBs) in AWS which is created in private subnets.
   #
   # Additional annotations can be added to customize the ALB behavior.
   ingress:
     internal:
       enabled: true
       name: cloudprem-internal
       host: cloudprem.acme.internal
       extraAnnotations:
         alb.ingress.kubernetes.io/load-balancer-name: cloudprem-internal

   # Metastore configuration
   # The metastore is responsible for storing and managing index metadata.
   # It requires a PostgreSQL database connection string to be provided by a Kubernetes secret.
   # The secret should contain a key named `QW_METASTORE_URI` with a value in the format:
   # postgresql://<username>:<password>@<host>:<port>/<database>
   #
   # The metastore connection string is mounted into the pods using extraEnvFrom to reference the secret.
   metastore:
     extraEnvFrom:
       - secretRef:
           name: cloudprem-metastore-uri

   # Indexer configuration
   # The indexer is responsible for processing and indexing incoming data it receives data from various sources (for example, Datadog Agents, log collectors)
   # and transforms it into searchable files called "splits" stored in S3.
   #
   # The indexer is horizontally scalable - you can increase `replicaCount` to handle higher indexing throughput.
   # The `podSize` parameter sets vCPU, memory, and component-specific settings automatically.
   # See the sizing guide for available tiers and their configurations.
   indexer:
     replicaCount: 2
     podSize: xlarge

   # Searcher configuration
   # The searcher is responsible for executing search queries against the indexed data stored in S3.
   # It handles search requests from Datadog's query service and returns matching results.
   #
   # The searcher is horizontally scalable - you can increase `replicaCount` to handle more concurrent searches.
   # Resource requirements for searchers are highly workload-dependent and should be determined empirically.
   # Key factors that impact searcher performance include:
   # - Query complexity (for example, number of terms, use of wildcards or regex)
   # - Query concurrency (number of simultaneous searches)
   # - Amount of data scanned per query
   # - Data access patterns (cache hit rates)
   #
   # Memory is particularly important for searchers as they cache frequently accessed index data in memory.
   searcher:
     replicaCount: 2
     podSize: xlarge
   ```

1. Installer ou mettre à jour le chart Helm

   ```shell
   helm upgrade --install <RELEASE_NAME> datadog/cloudprem \
   -n <NAMESPACE_NAME> \
   -f datadog-values.yaml
   ```

## Vérification

### Vérifier le statut du déploiement

Vérifiez que tous les composants CloudPrem sont en cours d'exécution :

```shell
kubectl get pods -n <NAMESPACE_NAME>
kubectl get ingress -n <NAMESPACE_NAME>
kubectl get services -n <NAMESPACE_NAME>
```

## Désinstallation

Pour désinstaller CloudPrem :

```shell
helm uninstall <RELEASE_NAME>
```

## Prochaine étape

**[Configurer l'ingestion de logs avec l'Agent Datadog][8]** - configurer l'Agent Datadog pour envoyer des logs à CloudPrem

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://aws.amazon.com/eks/
[2]: https://docs.rs/rusoto_credential/latest/rusoto_credential/struct.ChainProvider.html
[3]: https://aws.amazon.com/rds/
[8]: /fr/cloudprem/ingest/agent/