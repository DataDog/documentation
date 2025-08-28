---
title: Azure Configuration
description: Learn how to configure Azure for CloudPrem
further_reading:
- link: "/cloudprem/install/azure-aks/"
  tag: "Documentation"
  text: "Install CloudPrem on Azure AKS"
- link: "/cloudprem/ingest-logs/"
  tag: "Documentation"
  text: "Configure Log Ingestion"
---

## Overview

Before you install CloudPrem in your Azure environment, you will need to set up a set of supporting infrastructure resources. These components provide the foundational compute, storage, database, and networking services that CloudPrem depends on. This page outlines all the resources you must provision in your Azure account before proceeding to the installation steps described in the [Azure AKS Installation Guide](/cloudprem/install/azure-aks/).

## Infrastructure Requirements
- Azure Kubernetes Service (AKS) <!-- A running AKS cluster sized for your expected CloudPrem workload. -->
- PostgreSQL Flexible Server <!-- An Azure Database for PostgreSQL instance that CloudPrem will use to store its metadata. -->
- Blob Storage container <!-- An Azure Storage container to hold CloudPrem logs. -->
- Client Identity and permissions <!-- An Azure AD application with read/write access to the storage container. -->
- NGINX Ingress Controller <!-- Installed on the AKS cluster to route external traffic to CloudPrem services. -->
- Datadog Agent <!-- Deployed on the AKS cluster to collect and send logs to CloudPrem. -->

### Azure Kubernetes Service (AKS)

CloudPrem runs entirely on Kubernetes. You will need an AKS cluster with sufficient CPU, memory, and disk space configured for your workload. See the Kubernetes cluster sizing recommendations for guidance.

#### Deploy an AKS cluster
- [Deploy an AKS cluster with the Azure CLI](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-cli)
- [Deploy an AKS cluster with Terraform](https://learn.microsoft.com/en-us/azure/aks/learn/quick-kubernetes-deploy-terraform?pivots=development-environment-azure-cli)

#### Verify cluster connectivity and health
Run `kubectl get nodes -o wide` to confirm the cluster is reachable and nodes are in `Ready` state.

### Azure PostgreSQL Flexible Server

CloudPrem stores its metadata and configuration in a PostgreSQL database. An Azure Database for PostgreSQL Flexible Server is recommended. It must be reachable from the AKS cluster, ideally with private networking enabled. See the Postgres sizing recommendations for details.

#### Create a PostgreSQL database
- [Create an Azure Database for PostgreSQL Flexible Server using the Azure CLI](https://learn.microsoft.com/en-us/azure/postgresql/flexible-server/quickstart-create-server?tabs=portal-create-flexible%2Cportal-get-connection%2Cportal-delete-resources)
- [Create an Azure Database for PostgreSQL Flexible Server using Terraform](https://learn.microsoft.com/en-us/azure/developer/terraform/deploy-postgresql-flexible-server-database?tabs=azure-cli)

#### Verify database connectivity

Connect to your PostgreSQL database from within the AKS network using the PostgreSQL client, `psql`. First, start an interactive pod in your Kubernetes cluster using an image that includes `psql`:
{{< code-block lang="bash" >}}
kubectl run psql-client \
  -n <NAMESPACE_NAME> \
  --rm -it \
  --image=bitnami/postgresql:latest \
  --command -- bash
{{< /code-block >}}

Then, run the following command directly from the shell, replacing the placeholder values with your actual values:

{{< code-block lang="bash" >}}
psql "host=<HOST> \
      port=<PORT> \
      dbname=<DATABASE> \
      user=<USERNAME> \
      password=<PASSWORD>"
{{< /code-block >}}

If successful, you should see a prompt similar to:
```
psql (15.2)
SSL connection (protocol: TLS...)
Type "help" for help.

<DATABASE>=>
```

👉 For security, create a dedicated database and user for CloudPrem, and grant the user rights only on that database, not cluster-wide.

### Blob Storage Container

CloudPrem uses Azure Blob Storage to persist logs. Create a dedicated container for this purpose.

#### Create a Blob Storage container
- [Create a Blob Storage container using the Azure CLI](https://learn.microsoft.com/en-us/azure/storage/blobs/blob-containers-cli#create-a-container)
- [Create a Blob Storage container using Terraform](https://registry.terraform.io/providers/hashicorp/azurerm/latest/docs/resources/storage_container)

👉 Use a dedicated container per environment (e.g., `cloudprem-prod`, `cloudprem-staging`), and assign least-privilege RBAC roles at the container level, rather than at the storage account scope.

### Client Identity and permissions

An Azure AD application must be granted read/write access to the Blob Storage container. Register a dedicated application for CloudPrem and assign the corresponding service principal the `Contributor` role on the Blob Storage container created above.

#### Register an application
[Register an application in Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity-platform/quickstart-register-app)

#### Assign Contributor role
[Assign an Azure role for access to blob data](https://learn.microsoft.com/en-us/azure/storage/blobs/assign-azure-role-data-access?tabs=portal)


### NGINX Ingress Controller

#### Public NGINX Ingress Controller

The public ingress is essential for enabling Datadog's control plane and query service to manage and query CloudPrem clusters over the public internet. It provides secure access to the CloudPrem gRPC API through the following mechanisms:
- Creates an internet-facing Azure Load Balancer that accepts traffic from Datadog services
- Implements TLS encryption with termination at the ingress controller level
- Uses HTTP/2 (gRPC) for communication between Datadog and CloudPrem clusters
- Requires mutual TLS (mTLS) authentication where Datadog services must present valid client certificates
- Configures the controller in TLS passthrough mode to forward client certificates to CloudPrem pods with the `ssl-client-cert` header
- Rejects requests that are missing valid client certificates or the certificate header

Use the following `nginx-public.yaml` Helm values file in order to create the public NGINX Ingress Controller:

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

Then, install the controller with Helm using the following command:

{{< code-block lang="bash" >}}
helm upgrade --install nginx-public ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-public \
  --create-namespace \
  -f nginx-public.yaml
{{< /code-block >}}

Verify that the controller pod is running:
```bash
kubectl get pods -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

Verify that the service exposes an external IP:
```bash
kubectl get svc -n nginx-ingress-public -l app.kubernetes.io/component=controller
```

#### Internal NGINX Ingress Controller

The internal ingress enables log ingestion from Datadog Agents and other log collectors within your environment through HTTP. Use the following `nginx-internal.yaml` Helm values file in order to create the public NGINX Ingress Controller:

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

Then, install the controller with Helm using the following command:

{{< code-block lang="bash" >}}
helm upgrade --install nginx-internal ingress-nginx \
  --repo https://kubernetes.github.io/ingress-nginx \
  --namespace nginx-ingress-internal \
  --create-namespace \
  -f nginx-internal.yaml
{{< /code-block >}}

Verify that the controller pod is running:
```bash
kubectl get pods -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

Verify that the service exposes an external IP:
```bash
kubectl get svc -n nginx-ingress-internal -l app.kubernetes.io/component=controller
```

### DNS

Optionally, you can add a DNS entry pointing to the IP of the public load balancer, so future IP changes won't require updating the configuration on the Datadog side.

## Next steps

After completing the Azure configuration

1. **Install CloudPrem on Azure AKS** - Follow the [Azure AKS Installation Guide](../install/azure-aks/) to deploy CloudPrem
2. **Set up log ingestion** - Configure [log ingestion](../ingest-logs/) to start sending logs to CloudPrem
