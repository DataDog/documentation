---
title: Puis-je collecter des métriques de performance SQL Server au-delà de ce qui est disponible dans la table sys.dm_os_performance_counters? Essayez WMI
kind: faq
---

Notre [check SQL Server](/integrations/sqlserver) est actuellement limitée à la collecte des métriques à partir de la table [sys.dm_os_performance_counters](https://github.com/DataDog/dd-agent/blob/5.9.x/conf.d/sqlserver.yaml.example#L3-L5), et par défaut, il ne recueille que les métriques que nous pensons être les plus susceptibles d'être pertinentes. Il est vrai qu'avec une configuration simple, vous pouvez [étendre les métriques collectées à partir de cette table](/integrations/faq/how-can-i-collect-more-metrics-from-my-sql-server-integration), mais il Il peut s'agir de cas où vous souhaitez collecter plus que ce qui est disponible dans ce tableau.

Dans ces cas, vous pouvez considérer notre [check WMI](/integrations/wmi_check) comme une source supplémentaire de métriques SQL Server (et si vous n'êtes pas encore familier avec le check WMI, [voici un excellent guide pour l'implémenter](/integrations/faq/how-to-retrieve-wmi-metrics)). Certaines classes WMI pouvant contenir des données de performances supplémentaires sur votre serveur SQL (telles que [Win32_PerfFormattedData_SQLSERVERAGENT_SQLAgentJobs](http://wutils.com/wmi/root/cimv2/win32_perfformatteddata_sqlserveragent_sqlagentjobs/) peuvent être disponibles, et vous pouvez utiliser notre WMI vérifier pour les interroger pour la collecte de métriques supplémentaires.

Par exemple, certains utilisateurs utilisent notre check WMI avec la configuration suivante pour collecter une métrique de gauge correspondant au nombre de jobs ayant échoué dans leur SQL Server:

```yaml
init_config: 

instances: 
    - class: Win32_PerfRawData_SQLSERVERAGENT_SQLAgentJobs
      metrics:
        - [Failedjobs, sqlserver.failed_jobs, gauge]
      filters:
        - Name: _Total
      tag_by: Name
```
