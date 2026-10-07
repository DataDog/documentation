---
aliases:
- /fr/cloudprem/architecture/
further_reading:
- link: /cloudprem/install/
  tag: Documentation
  text: Prérequis à l'installation de CloudPrem
title: Architecture
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

{{< img src="/cloudprem/overview_architecture.png" alt="Architecture CloudPrem avec des composants d'indexeurs, de chercheurs, de metastore et de plan de contrôle interagissant avec un stockage d'objets" style="width:100%;" >}}

CloudPrem utilise une architecture découplée qui sépare le calcul (indexation et recherche) des données sur un stockage d'objets. Cela permet la mise à l'échelle et l'optimisation indépendantes des différents composants du cluster, en fonction des besoins du workload.

## Composants

Le cluster CloudPrem, qui est généralement déployé sur Kubernetes (EKS), comporte plusieurs composants :

**Indexeurs**
: Les indexeurs sont chargés de recevoir les logs des Agents Datadog. Ils traitent, indexent et stockent les logs dans des fichiers d'index, ou _splits_, dans le stockage d'objets (par exemple, Amazon S3).

**Chercheurs**
: Les chercheurs gèrent les requêtes de recherche à partir de l'IU Datadog, lisent les métadonnées du metastore et récupèrent les données à partir du stockage d'objets.

**Metastore**
: Le metastore stocke les métadonnées sur les index, y compris les emplacements des splits sur le stockage d'objets. CloudPrem utilise PostgreSQL à cette fin.

**Plan de contrôle**
: Le plan de contrôle planifie des tâches d'indexation appelées _pipelines d'indexation_ sur les indexeurs.

**Agent d'entretien**
: L'agent d'entretien effectue des tâches de maintenance. Il applique des stratégies de rétention, nettoie les splits expirés et exécute les tâches de requête de suppression.


## Connexion à l'IU Datadog

Il existe deux façons de connecter l'IU Datadog à CloudPrem :
- [**Inverser la connexion**][1] : faites en sorte que CloudPrem initie des requêtes gRPC bilatérales vers Datadog.
- [**Accepter des requêtes externes de Datadog**][2] : renseignez dans Datadog un endpoint DNS pour les requêtes gRPC et configurez un Ingress public pour accepter ces requêtes.


## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/cloudprem/introduction/connectivity/
[2]: /fr/cloudprem/configure/ingress/