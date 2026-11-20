---
title: Connecter un cluster Azure AKS avec Cloudcraft
---

En analysant vos clusters Azure AKS, Cloudcraft permet de générer des diagrammes d'architecture système afin d'aider à visualiser vos workloads et pods déployés.

Cloudcraft utilise le rôle d'utilisateur de cluster Azure Kubernetes Service et ne nécessite aucun logiciel ou agent particulier pour accéder à vos clusters.

<div class="alert alert-info">La possibilité d'analyser des clusters Azure AKS et des comptes Azure est réservée aux abonnés Cloudcraft Pro. Consultez la <a href="https://www.cloudcraft.co/pricing">page des tarifs de Cloudcraft</a> pour plus d'informations.</div>

## Prérequis

Avant de connecter vos clusters Azure AKS avec Cloudcraft, il faut connecter votre compte Azure et générer des diagrammes incluant vos clusters. Pour plus d'informations, consultez [Connecter votre compte Azure avec Cloudcraft][1].

## Autoriser l'utilisateur IAM Cloudcraft à un accès en lecture seule

Commencez par ouvrir un blueprint avec un cluster Azure AKS existant, ou utilisez la fonctionnalité **Auto Layout** pour générer un nouveau blueprint.

Avec votre environnement Azure mappé dans un blueprint, sélectionnez le cluster Azure AKS que vous souhaitez analyser et cliquez sur le bouton **Enable cluster scanning** qui apparaît dans la barre d'outils du composant.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Diagramme interactif Cloudcraft montrant un cluster Azure AKS avec le bouton enable cluster scanning mis en évidence." responsive="true" style="width:100%;">}}

L'écran suivant fournit des instructions étape par étape à réaliser dans Azure.

1. Cliquez sur le premier lien pour ouvrir la page Azure Subscriptions, puis cliquez sur **Access control (IAM)** dans la barre latérale de gauche.
2. Cliquez sur **Add** et sélectionnez **Add role assignment**.
3.  Recherchez et sélectionnez **Azure Kubernetes Service Cluster User Role**, puis cliquez sur **Next**.
4. Cliquez sur **Select members**.
5. Recherchez l'utilisateur IAM auquel vous souhaitez accorder l'accès à votre cluster Azure AKS, généralement nommé cloudcraft, et cliquez sur **Select**.
6. Cliquez deux fois sur **Review + assign** pour terminer le processus.

## Tester l'accès au cluster

Pour tester si Cloudcraft peut accéder au cluster, cliquez sur **Test cluster access** en bas de l'écran **Enable Kubernetes Cluster Scanning**.

{{< img src="cloudcraft/getting-started/connect-an-azure-aks-cluster-with-cloudcraft/test-cluster-access.png" alt="Capture d'écran de l'interface Cloudcraft Enable Kubernetes Cluster Scanning avec les instructions et le bouton Test Cluster Access." responsive="true" style="width:100%;">}}

[1]: /fr/cloudcraft/getting-started/connect-azure-account-with-cloudcraft/