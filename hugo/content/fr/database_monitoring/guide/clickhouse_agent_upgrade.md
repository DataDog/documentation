---
aliases:
- /fr/database_monitoring/clickhouse_agent_upgrade
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/setup_clickhouse/
  tag: Documentation
  text: Configuration de ClickHouse
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage de la solution Database Monitoring
title: Mise à niveau de l'intégration ClickHouse depuis des versions de l'Agent antérieures
  à 7.84
---
## Présentation {#overview}

Database Monitoring pour ClickHouse nécessite Datadog Agent 7.84 ou une version ultérieure. Si vous avez configuré l'intégration avec une version antérieure de l'Agent, suivez ce guide pour effectuer la mise à niveau.

À partir de la version 7.84 de l'Agent, Database Monitoring pour ClickHouse indique quel nœud de votre cluster a exécuté chaque requête. Les métriques de requête, les échantillons de requête, les requêtes terminées et les erreurs de requête sont marqués avec le nœud qui les a traités, ce qui vous permet de :

- Comparer les performances d'une même requête entre les nœuds.
- Trouvez le nœud responsable d'une requête lente ou en échec.
- Repérez une charge inégale entre les nœuds d'un cluster.

Pour identifier les nœuds, l'Agent signale également le cluster auquel chaque instance appartient et indique si elle s'exécute sur ClickHouse Cloud ou si elle est auto-hébergée. Ces informations sont ajoutées sous forme des tags suivants :

| Tag | Description |
|---|---|
| `clickhouse_node` | Le nœud qui a exécuté la requête. |
| `clickhouse_cluster` | Le cluster ClickHouse auquel l'instance appartient. |
| `hosting_type` | `clickhouse-cloud` ou `self-hosted`. |

L'Agent lit ces informations à partir des tables système de ClickHouse auxquelles les instructions de configuration précédentes ne donnaient pas accès. Si vous avez configuré l'intégration avec une version de l'Agent antérieure à 7.84, accordez les autorisations supplémentaires ci-dessous avant de mettre à niveau l'Agent. L'Agent ne prend en compte les nouvelles autorisations qu'au démarrage ; par conséquent, si vous les accordez après la mise à niveau, [redémarrez l'Agent](#restart-the-agent).

## Accordez les autorisations supplémentaires {#grant-the-additional-permissions}

Connectez-vous à ClickHouse en tant qu'administrateur et exécutez les instructions suivantes. Si votre utilisateur de surveillance ne s'appelle pas `datadog`, remplacez ce nom par celui de votre utilisateur.

```sql
GRANT SELECT ON system.macros TO datadog;
GRANT SELECT ON system.clusters TO datadog;
GRANT SELECT ON system.settings TO datadog;
GRANT SELECT ON system.table_engines TO datadog;
GRANT SELECT ON system.one TO datadog;
GRANT REMOTE ON *.* TO datadog;
```

## Redémarrez l'Agent {#restart-the-agent}

L'Agent recherche le cluster une fois au démarrage et continue d'utiliser ce résultat jusqu'à son redémarrage. Si vous avez appliqué les autorisations avant la mise à niveau, la mise à niveau redémarre l'Agent et aucune autre action n'est nécessaire. Si vous les avez appliqués après la mise à niveau, [redémarrez l'Agent][1].

## Vérifiez la mise à niveau {#verify-the-upgrade}

Une fois l'Agent redémarré, ouvrez l'instance ClickHouse dans [Database Monitoring][2] et confirmez que :

- Les données de requête sont marquées avec `clickhouse_node`.
- Le tag `hosting_type` est `clickhouse-cloud` pour un service ClickHouse Cloud, ou `self-hosted` pour tout autre déploiement.

Si le tag `clickhouse_node` est manquant :

- Exécutez la [commande de statut de l'Agent][3] et vérifiez le check ClickHouse pour les erreurs d'autorisation.
- Confirmez que les autorisations ci-dessus sont appliquées à l'utilisateur avec lequel l'Agent se connecte, sur chaque nœud.
- Confirmez que votre cluster définit une macro `{cluster}` ou une entrée `<remote_servers>` qui inclut le nœud auquel l'Agent se connecte. Si aucun des deux n'est configuré, l'Agent ne peut pas identifier le cluster et le tag `clickhouse_cluster` n'est pas signalé.

Si le tag `hosting_type` est `unknown`, l'Agent n'a pas pu lire `system.settings` ou `system.table_engines`. Confirmez que les instructions `GRANT SELECT` pour les deux tables sont appliquées, puis [redémarrez l'Agent][1].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/configuration/agent-commands/#restart-the-agent
[2]: https://app.datadoghq.com/databases
[3]: /fr/agent/configuration/agent-commands/#agent-status-and-information