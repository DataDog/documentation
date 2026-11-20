---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: Documentation
  text: Configuration de l'ingress CloudPrem
title: Réseau
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

Ce document fournit une vue d'ensemble de la façon dont CloudPrem et Datadog communiquent entre eux. 

### Comportement par défaut : CloudPrem initie la connexion

Par défaut, CloudPrem initie une connexion WebSocket avec Datadog en utilisant votre clé d'API, sans qu'il soit nécessaire d'ajouter un enregistrement DNS ni de configurer un ingress public. Cette configuration est utile pour les environnements soumis à des politiques réseau strictes qui n'autorisent pas les requêtes entrantes.


### Comportement optionnel : utiliser un ingress public

Il est possible de configurer CloudPrem pour déployer un ingress public afin que Datadog puisse établir une connexion.

L'ingress public permet au plan de contrôle et au service de requêtes de Datadog de gérer et d'interroger les clusters CloudPrem via l'internet public. Il fournit un accès sécurisé à l'API gRPC de CloudPrem grâce à l'authentification mTLS. Pour plus d'informations sur l'ingress CloudPrem, consultez sa [page de configuration](/cloudprem/configure/ingress/).

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}