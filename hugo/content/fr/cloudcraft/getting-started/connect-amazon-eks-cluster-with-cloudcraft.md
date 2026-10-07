---
title: Connecter un cluster Amazon EKS à Cloudcraft
---

En analysant vos clusters Amazon EKS, Cloudcraft permet de générer des diagrammes d'architecture système afin de visualiser vos workloads et pods déployés.

Cloudcraft utilise des [entrées d'accès][1] pour accorder au [rôle de l'entité IAM existante en lecture seule de Cloudcraft][2] un accès à l'API Kubernetes. Cloudcraft ne nécessite pas l'installation d'un logiciel ou d'un Agent spécifique sur votre cluster.

<div class="alert alert-info">La possibilité d'analyser des clusters Amazon EKS et des comptes AWS est réservée aux abonnés Cloudcraft Pro. Consultez <a href="https://www.cloudcraft.co/pricing">la page de tarification</a> pour plus d'informations.</div>

## Prérequis

Avant de connecter vos clusters Amazon EKS à Cloudcraft, il faut connecter votre compte AWS et générer des diagrammes incluant vos clusters. 

Pour connecter votre compte AWS et vous familiariser avec Cloudcraft, consultez les articles suivants :
- [Connecter votre compte AWS à Cloudcraft][3]
- [Créer de meilleurs diagrammes : diagrammes Live et filtrage dans Cloudcraft][4]

[Installez et configurez `kubectl`][6], un outil qui vous permet de contrôler des clusters Kubernetes via la ligne de commande. Cloudcraft recommande d'utiliser la dernière version pour éviter tout problème.

De plus, vous devez [installer et configurer l'interface de ligne de commande AWS][8] pour gérer vos services AWS à partir de la ligne de commande. Comme pour `kubectl`, Cloudcraft recommande d'utiliser la dernière version.

Enfin, pour pouvoir scanner correctement vos clusters, Cloudcraft exige qu'ils aient activé un accès public et qu’aucun filtrage d’IP ne soit appliqué. L'option **Public Access Source Allow List** de la configuration réseau doit rester définie sur sa valeur par défaut, à savoir 0.0.0.0/0.

## Créer des entrées d'accès

Commencez par ouvrir un blueprint avec un cluster Amazon EKS existant, ou créez un blueprint pour analyser un compte avec des clusters Amazon EKS.

Avec votre environnement AWS mappé dans un blueprint, sélectionnez le cluster Amazon EKS que vous souhaitez analyser et cliquez sur le bouton **Enable cluster scanning** qui apparaît dans la barre d'outils du composant.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/enable-cluster-scanning.png" alt="Diagramme interactif Cloudcraft montrant un cluster Amazon EKS avec le bouton Enable cluster scanning mis en évidence." responsive="true" style="width:100%;">}}

L'écran suivant fournit des commandes détaillées à exécuter dans votre application de terminal préférée.

En tant que créateur du cluster Amazon EKS, ou qu'un utilisateur disposant d'un accès admin, exécutez la commande suivante pour mapper le rôle IAM Cloudcraft au groupe Kubernetes `cloudcraft-view-only` :

```
aws eks create-access-entry \
  --cluster-name ${EKS_CLUSTER_NAME} \
  --principal-arn ${CLOUDCRAFT_IAM_ROLE_ARN} \
  --kubernetes-groups 'cloudcraft-view-only'
```

## Accorder un accès en lecture seule au rôle IAM Cloudcraft

Utilisez ensuite [ClusterRoleBinding][5] pour lier le rôle IAM à un rôle Kubernetes.

La liaison ClusterRoleBinding accorde les autorisations définies dans un rôle à un utilisateur, ou à un ensemble d'utilisateurs, dans tous les espaces de nommage d'un cluster. Kubernetes définit certains rôles par défaut pour les utilisateurs. Pour Cloudcraft, utilisez le rôle prédéfini « view », qui permet d'accorder un accès en lecture seule à la plupart des objets d'un espace de nommage.

Saisissez la commande multiligne suivante pour créer le ClusterRoleBinding et accorder l'autorisation de lecture seule aux utilisateurs du groupe **cloudcraft-view-only**.

```
cat << EOF | kubectl apply -f -
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: cloudcraft-view-only
subjects:
  - kind: Group
    name: cloudcraft-view-only
    apiGroup: rbac.authorization.k8s.io
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
EOF
```

## Tester l'accès au cluster

Pour tester si Cloudcraft peut accéder au cluster, cliquez sur **Test cluster access** en bas de l'écran **Enable Kubernetes Cluster Scanning**.

{{< img src="cloudcraft/getting-started/connect-amazon-eks-cluster-with-cloudcraft/test-cluster-access.png" alt="Interface Cloudcraft montrant la configuration d'un rôle de cluster Kubernetes, avec un bouton Test Cluster Access mis en évidence par une flèche." responsive="true" style="width:100%;">}}

Pour analyser d'autres clusters, répétez ce processus autant de fois que nécessaire.

[1]: https://docs.aws.amazon.com/eks/latest/userguide/access-entries.html
[2]: /fr/cloudcraft/faq/how-cloudcraft-connects-to-aws/
[3]: /fr/cloudcraft/getting-started/connect-aws-account-with-cloudcraft/
[4]: /fr/cloudcraft/getting-started/crafting-better-diagrams/
[5]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#rolebinding-and-clusterrolebinding
[6]: https://docs.aws.amazon.com/eks/latest/userguide/install-kubectl.html
[7]: https://kubernetes.io/docs/reference/access-authn-authz/rbac/#default-roles-and-role-bindings
[8]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html