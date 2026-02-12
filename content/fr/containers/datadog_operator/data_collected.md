---
dependencies:
- https://github.com/DataDog/datadog-operator/blob/main/docs/data_collected.md
title: Données collectées par le Datadog Operator
---
Le Datadog Operator envoie des métriques et des événements à Datadog pour surveiller le déploiement des composants de l'Agent Datadog dans le cluster.

Pour obtenir une liste de toutes les métriques Kubernetes collectées par Datadog, consultez la section [Données Kubernetes collectées][1].

## Métriques

| Nom de la métrique                                              | Type de la métrique | Rôle                                                                                                                         |
| -------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `datadog.operator.agent.deployment.success`              | gauge       | `1` si le nombre souhaité de réplicas de l'Agent est égal au nombre de pods de l'Agent disponibles, `0` dans le cas contraire.                               |
| `datadog.operator.clusteragent.deployment.success`       | gauge       | `1` si le nombre souhaité de réplicas de l'Agent de cluster est égal au nombre de pods de l'Agent de cluster disponibles, `0` dans le cas contraire.               |
| `datadog.operator.clusterchecksrunner.deployment.success` | gauge       | `1` si le nombre souhaité de réplicas de Cluster Checks Runner est égal au nombre de pods de Cluster Checks Runner disponibles, `0` dans le cas contraire. |
| `datadog.operator.reconcile.success`                     | gauge       | `1` si la dernière erreur de réconciliation enregistrée est nulle, `0` dans le cas contraire. Le tag `reconcile_err` décrit la dernière erreur enregistrée.         |

**Remarque :** les [clés d'API et d'application Datadog][2] sont nécessaires pour transférer les métriques vers Datadog. Elles doivent être fournies dans le champ `credentials` de la définition de ressource personnalisée.

## OpenMetrics

Le Datadog Operator expose les métriques Golang et Controller au format OpenMetrics. Vous pouvez les collecter avec l'[intégration OpenMetrics][3].

Le check OpenMetrics est activé par défaut via les annotations Autodiscovery et est planifié par l'Agent s'exécutant sur le même nœud que le pod du Datadog Operator. Consultez la section [Kubernetes et intégrations][4].

## Événements

- Détecter/Supprimer une ressource personnalisée <Namespace/Name>
- Créer/Mettre à jour/Supprimer un Service <Namespace/Name>
- Créer/Mettre à jour/Supprimer une ConfigMap <Namespace/Name>
- Créer/Mettre à jour/Supprimer un DaemonSet <Namespace/Name>
- Créer/Mettre à jour/Supprimer un ExtendedDaemonSet <Namespace/Name>
- Créer/Mettre à jour/Supprimer un Deployment <Namespace/Name>
- Créer/Mettre à jour/Supprimer un ClusterRole </Name>
- Créer/Mettre à jour/Supprimer un Role <Namespace/Name>
- Créer/Mettre à jour/Supprimer un ClusterRoleBinding </Name>
- Créer/Mettre à jour/Supprimer un RoleBinding <Namespace/Name>
- Créer/Mettre à jour/Supprimer un Secret <Namespace/Name>
- Créer/Mettre à jour/Supprimer un PDB <Namespace/Name>
- Créer/Supprimer un ServiceAccount <Namespace/Name>

[1]: https://docs.datadoghq.com/fr/containers/kubernetes/data_collected/
[2]: https://docs.datadoghq.com/fr/account_management/api-app-keys/
[3]: https://docs.datadoghq.com/fr/integrations/openmetrics/
[4]: https://docs.datadoghq.com/fr/containers/kubernetes/integrations/?tab=annotations