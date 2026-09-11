---
description: Découvrir comment configurer Azure pour CloudPrem
further_reading:
- link: /cloudprem/install/azure_aks/
  tag: Documentation
  text: Installer CloudPrem sur Azure AKS
- link: /cloudprem/ingest_logs/
  tag: Documentation
  text: Configurer l'ingestion de logs
title: Configuration Azure
---

## Présentation

Avant d'installer CloudPrem sur Azure, vous devez configurer un ensemble de ressources d'infrastructure de support. Ces composants fournissent les services de calcul, de stockage, de base de données et de réseau fondamentaux dont CloudPrem dépend. Cette documentation présente toutes les ressources à configurer dans votre compte Azure avant de passer aux étapes d'installation décrites dans le [guide d'installation Azure AKS][1].

### Exigences en matière d'infrastructure
Voici les composants que vous devez provisionner :

- [**Azure Kubernetes Service (AKS)**](#azure-kubernetes-service-aks) : un cluster AKS opérationnel dimensionné pour votre charge de travail CloudPrem attendue.
- [**PostgreSQL Flexible Server**](#azure-postgresql-flexible-server) : une instance Azure Database pour PostgreSQL que CloudPrem utilisera pour stocker ses métadonnées.
- [**Conteneur Blob Storage**](#blob-storage-container) : un conteneur Azure Storage pour héberger les logs CloudPrem.
- [**Identité client et autorisations**](#client-identity-and-permissions) : une application Azure AD disposant d'un accès en lecture/écriture au conteneur de stockage.
- [**Contrôleur d'entrée NGINX**](#nginx-ingress-controller) : installé sur le cluster AKS pour router le trafic externe vers les services CloudPrem.
- **Agent Datadog** : déployé sur le cluster AKS pour collecter et envoyer des logs à CloudPrem.

## Azure Kubernetes Service (AKS)

CloudPrem s'exécute entièrement sur Kubernetes. Vous avez besoin d'un cluster AKS avec suffisamment de CPU, de mémoire et d'espace disque configurés pour votre charge de travail. Consultez les recommandations de dimensionnement du cluster Kubernetes pour obtenir des conseils.

### Déployer le cluster AKS

- [Déployer un cluster AKS avec Azure CLI][2]
- [Déployer un cluster AKS avec Terraform][3]

### Vérifier la connectivité et l'état du cluster
Pour confirmer que le cluster est accessible et que les nœuds sont à l'état `Ready`, exécutez la commande suivante :
```shell
kubectl get nodes -o wide
```

## Azure PostgreSQL Flexible Server

CloudPrem stocke ses métadonnées et sa configuration dans une base de données PostgreSQL. Datadog recommande Azure Database pour PostgreSQL Flexible Server. Elle doit être accessible depuis le cluster AKS, idéalement avec la mise en réseau privé activée. Consultez les recommandations de dimensionnement Postgres pour plus de détails.

### Créer la base de données PostgreSQL

- [Créer une instance Azure Database pour PostgreSQL Flexible Server avec Azure CLI][4]
- [Créer une instance Azure Database pour PostgreSQL Flexible Server avec Terraform][5]

### Vérifier la connectivité à la base de données

<div class="alert alert-info">Pour des raisons de sécurité, créez une base de données et un utilisateur dédiés pour CloudPrem, et accordez à cet utilisateur des droits uniquement sur cette base de données, et non à l'échelle du cluster.</div>

Connectez-vous à votre base de données PostgreSQL depuis le réseau AKS à l'aide du client PostgreSQL `psql`. Démarrez d'abord un pod interactif dans votre cluster Kubernetes en utilisant une image incluant `psql` :
```shell
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
```

Puis exécutez la commande suivante directement depuis le shell, en remplaçant les valeurs fictives par vos valeurs réelles :

```shell
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
```

En cas de succès, une invite similaire à la suivante doit s'afficher :
```shell
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

## Conteneur Blob Storage

CloudPrem utilise Azure Blob Storage pour persister les logs. Créez un conteneur dédié à cet usage.

### Créer un conteneur Blob Storage
Utilisez un conteneur dédié par environnement (par exemple, `cloudprem-prod`, `cloudprem-staging`), et attribuez des rôles RBAC avec le principe du moindre privilège au niveau du conteneur, plutôt qu'au niveau du compte de stockage.

- [Créer un conteneur Blob Storage avec Azure CLI][6]
- [Créer un conteneur Blob Storage avec Terraform][7]

## Identité client et autorisations

Une application Azure AD doit disposer d'un accès en lecture/écriture au conteneur Blob Storage. Enregistrez une application dédiée pour CloudPrem et attribuez au principal de service correspondant le rôle `Contributor` sur le conteneur Blob Storage créé précédemment.

### Enregistrer l'application
[Enregistrer une application dans Microsoft Entra ID][8]

### Attribuer le rôle Contributor
[Attribuer un rôle Azure pour l'accès aux données blob][9]

## Contrôleur d'entrée NGINX

### Contrôleur d'entrée NGINX public

L'ingress public est indispensable pour permettre au plan de contrôle et au service de requêtes de Datadog de gérer et d'interroger les clusters CloudPrem via l'internet public. Il fournit un accès sécurisé à l'API gRPC CloudPrem grâce aux mécanismes suivants :
- Crée un Azure Load Balancer accessible depuis internet qui accepte le trafic en provenance des services Datadog
- Implémente le chiffrement TLS avec terminaison au niveau du contrôleur d'entrée
- Utilise HTTP/2 (gRPC) pour la communication entre Datadog et les clusters CloudPrem
- Requiert une authentification TLS mutuelle (mTLS) où les services Datadog doivent présenter des certificats client valides
- Configure le contrôleur en mode TLS passthrough pour transmettre les certificats client aux pods CloudPrem via l'en-tête `ssl-client-cert`
- Rejette les requêtes ne présentant pas de certificats client valides ou l'en-tête de certificat

Utilisez le fichier de valeurs Helm `nginx-public.yaml` suivant pour créer le contrôleur d'entrée NGINX public :

{{< code-block lang="yaml" filename="nginx-public.yaml" >}}
controller:
  electionID: public-ingress-controller-leader
  ingressClass: nginx-public
  ingressClassResource:
    name: nginx-public
    enabled: true
    default: false
    controllerValue: k8s.io/public-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Installez ensuite le contrôleur avec Helm à l'aide de la commande suivante :

```shell
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
```

Vérifiez que le pod du contrôleur est en cours d'exécution :
```shell
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Vérifiez que le service expose une IP externe :
```shell
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

### Contrôleur d'entrée NGINX interne

L'ingress interne permet l'ingestion de logs depuis les Agents Datadog et d'autres collecteurs de logs au sein de votre environnement via HTTP. Utilisez le fichier de valeurs Helm `nginx-internal.yaml` suivant pour créer le contrôleur d'entrée NGINX interne :

{{< code-block lang="yaml" filename="nginx-internal.yaml" >}}
controller:
  electionID: internal-ingress-controller-leader
  ingressClass: nginx-internal
  ingressClassResource:
    name: nginx-internal
    enabled: true
    default: false
    controllerValue: k8s.io/internal-ingress-nginx
  service:
    type: LoadBalancer
    annotations:
      service.beta.kubernetes.io/azure-load-balancer-internal: true
      service.beta.kubernetes.io/azure-load-balancer-health-probe-request-path: /healthz
{{< /code-block >}}

Installez ensuite le contrôleur avec Helm à l'aide de la commande suivante :

```shell
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
```

Vérifiez que le pod du contrôleur est en cours d'exécution :
```shell
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Vérifiez que le service expose une IP externe :
```shell
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

## DNS

Vous pouvez également ajouter une entrée DNS pointant vers l'IP du répartiteur de charge public, afin que les éventuels changements d'IP futurs ne nécessitent pas de mise à jour de la configuration côté Datadog.

## Étapes suivantes

Après avoir finalisé la configuration Azure

1. **Installez CloudPrem sur Azure AKS** - Suivez le [guide d'installation Azure AKS][1] pour déployer CloudPrem
2. **Configurez l'ingestion de logs** - Configurez l'[ingestion de logs][10] pour commencer à envoyer des logs à CloudPrem

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloudprem/install/azure_aks
[2]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli
[3]: https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli
[4]: https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources
[5]: https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli
[6]: https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container
[7]: https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container
[8]: https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app
[9]: https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal
[10]: /fr/cloudprem/ingest_logs/