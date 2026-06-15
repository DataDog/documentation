---
aliases:
- /fr/database_monitoring/sql_deadlock
further_reading:
- link: /database_monitoring/
  tag: Documentation
  text: Database Monitoring
- link: /database_monitoring/setup_sql_server/
  tag: Documentation
  text: Configurer SQL Server
- link: /database_monitoring/troubleshooting/
  tag: Documentation
  text: Dépannage de la solution Database Monitoring
title: Configurer la surveillance des deadlocks sur SQL Server
---

La vue Deadlock vous permet d'explorer les événements de deadlock dans votre base de données SQL Server.
Un deadlock se produit lorsque deux processus ou plus sont incapables de poursuivre leur exécution, car chacun attend que l'autre libère des ressources.

## Avant de commencer

Configurez Database Monitoring pour votre instance [SQL Server][1] avant de suivre les étapes de ce guide.


Bases de données prises en charge
: SQL Server

Déploiements pris en charge
: Tous les types de déploiement. Azure DB est pris en charge pour les versions 7.64.0 et ultérieures de l'Agent.

Versions de l'Agent prises en charge
: 7.59.0+

## Configuration
{{< tabs >}}
{{% tab "All deployment types except Azure DB" %}}

1. Dans l'instance de base de données SQL Server, créez une session Datadog Extended Events (XE). Exécutez la session sur n'importe quelle base de données de l'instance.

   **Remarque** : si la session Datadog XE n'est pas créée dans la base de données, l'Agent tente tout de même de collecter les événements de deadlock depuis la session XE system health par défaut de SQL Server. 

```sql
  CREATE EVENT SESSION datadog
  ON SERVER
  ADD EVENT sqlserver.xml_deadlock_report
  ADD TARGET package0.ring_buffer
  (
    SET MAX_MEMORY = 1024
  )
  WITH (
      MAX_MEMORY = 1024 KB,
      EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
      MAX_DISPATCH_LATENCY = 30 SECONDS,
      MEMORY_PARTITION_MODE = PER_NODE, -- improves performance on multi-core systems (not supported on RDS)
      STARTUP_STATE = ON
  );
  GO

  ALTER EVENT SESSION datadog ON SERVER STATE = START;
  GO
```

   **Remarque** : si vous utilisez Amazon RDS pour SQL Server, supprimez la ligne `MEMORY_PARTITION_MODE = PER_NODE` de la configuration de session, car cette option n'est pas prise en charge sur les instances RDS. 

2. Dans l'Agent Datadog, activez les deadlocks dans `sqlserver.d/conf.yaml`.
```yaml
  collect_deadlocks: # Renamed from deadlocks_collection in Agent version 7.70.
      enabled: true
```

{{% /tab %}}

{{% tab "Azure DB" %}}

1. Dans la base de données SQL Server, créez une session Datadog Extended Events (XE).

```sql
  CREATE EVENT SESSION datadog
  ON database
  ADD EVENT sqlserver.database_xml_deadlock_report
  ADD TARGET package0.ring_buffer
  (
    SET MAX_MEMORY = 1024
  )
  WITH (
      MAX_MEMORY = 1024 KB,
      EVENT_RETENTION_MODE = ALLOW_SINGLE_EVENT_LOSS,
      MAX_DISPATCH_LATENCY = 30 SECONDS,
      STARTUP_STATE = ON
  );
  GO

  ALTER EVENT SESSION datadog ON DATABASE STATE = START;
  GO
```

2. Dans l'Agent Datadog, activez les deadlocks dans `sqlserver.d/conf.yaml`.
```yaml
  collect_deadlocks: # Renamed from deadlocks_collection in Agent version 7.70.
      enabled: true
```

{{% /tab %}}

{{< /tabs >}}

## Explorer les événements de deadlock

Pour accéder à la vue des deadlocks, accédez à l'onglet **APM** > **Database Monitoring** > **Databases**, puis sélectionnez un Host SQL Server. Sélectionnez ensuite l'onglet **Queries**, puis l'onglet **Deadlocks**.
L'onglet Deadlocks affiche des détails sur les processus victime et survivant, et inclut un lien vers le diagramme de deadlock.

**Remarque** : les deadlocks étant peu fréquents, il est peu probable que des informations à leur sujet soient visibles immédiatement.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/database_monitoring/setup_sql_server/
[2]: https://techcommunity.microsoft.com/blog/sqlserversupport/you-may-not-see-the-data-you-expect-in-extended-event-ring-buffer-targets8230-/315838