---
aliases:
- /fr/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration

title: Recueillir des métriques supplémentaires à partir de l'intégration SQL Server
---

## Présentation

Par défaut, l'intégration SQL Server recueille uniquement [les métriques répertoriées sur la page de la documentation dédiée][1]. Il est toutefois possible de recueillir des métriques supplémentaires en configurant votre fichier `sqlserver.d/conf.yaml`. Pour ce faire, suivez la [syntaxe de notre fichier d'exemple][2] (en ajoutant votre code sous init_config).

À l'heure actuelle, le check sqlserver Datadog interroge uniquement les données de la table [sys.dm_os_performance_counters][3]. Il est néanmoins possible d'[utiliser WMI pour exposer les métriques][4] d'autres tables counter. Pour recueillir des données spécifiques, recherchez le `counter_name` et, le cas échéant, le `instance_name` de la métrique que vous souhaitez récupérer. Après avoir accédé à votre serveur à partir de l'[utilitaire sqlcmd de powershell][5], exécutez ce qui suit, ou une requête similaire, pour obtenir la liste des `count_names` disponibles dans cette table de votre SQL Server.

**Remarque** : la liste renvoyée contient de nombreux éléments.

```text
1> SELECT counter_name, instance_name, cntr_value, cntr_type FROM sys.dm_os_performance_counters;
2> go
```

Vous pouvez alors noter les counter_names qui vous intéressent le plus, les ajouter à la section dédiée aux métriques custom du fichier sqlserver.yaml (dans les options counter_name), puis attribuer un nom approprié à votre métrique dans les options « - name: ». Il peut être utile d'ajouter « sqlserver. » devant le nom des métriques, comme pour toutes les autres métriques sqlserver.

## Exemple

L'exemple de fichier `sqlserver.d/conf.yaml` suivant permet de recueillir des métriques relatives aux propriétés de l'exécution CLR, des requêtes en attente et des requêtes actives :

```yaml
init_config:

  custom_metrics:

    - name: sqlserver.clr.execution
      counter_name: CLR Execution
    - name: sqlserver.requests.queued
      counter_name: Queued requests
      instance_name: internal
    - name: sqlserver.requests.active
      counter_name: Active requests
      instance_name: internal

instances:
  - host: 127.0.0.1,1433
    username: datadog
    password: *******
    tags:
      - test:sqlserver
```

[1]: /fr/integrations/sqlserver/
[2]: https://github.com/DataDog/integrations-core/blob/master/sqlserver/datadog_checks/sqlserver/data/conf.yaml.example
[3]: https://msdn.microsoft.com/en-us/library/ms187743.aspx
[4]: /fr/integrations/guide/use-wmi-to-collect-more-sql-server-performance-metrics/
[5]: https://msdn.microsoft.com/en-us/library/ms188247.aspx