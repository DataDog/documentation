---
aliases:
  - /fr/bc4-cbi-lkc
  - /fr/security_monitoring/default_rules/bc4-cbi-lkc
  - /fr/security_monitoring/default_rules/cis-azure-1.3.0-4.1.1
cloud: azure
disable_edit: true
integration_id: azure.sql
kind: documentation
rule_category:
  - Cloud Configuration
security: conformité
source: azure.sql
title: Audits activés sur le serveur SQL
type: security_rules
---
## Description

Activez les audits sur les serveurs SQL

## Raison

La plateforme Azure vous permet de créer un serveur SQL en tant que service. L'activation des audits au niveau du serveur permet de veiller à ce que toutes les bases de données nouvelles et existantes sur l'instance du serveur SQL soient auditées. La stratégie d'audit appliquée à la base de données SQL ne remplace pas la stratégie et les réglages d'audit appliqués au serveur SQL spécifique sur lequel la base de données est hébergée. Les audits effectuent un suivi des événements et les stockent au sein d'un log d'audit dans le compte de stockage Azure. Ils vous permettent également de garantir la conformité réglementaire, de mieux comprendre les activités de vos bases de données et d'obtenir des informations utiles sur les écarts et les anomalies pouvant être liés à des problèmes commerciaux ou à d'éventuelles infractions en matière de sécurité.

## Remédiation

Depuis la console Azure :

1. Accédez aux serveurs SQL.
2. Pour chaque instance de serveur :
3. Cliquez sur Auditing.
4. Définissez Auditing sur On à l'aide d'Azure PowerShell.
5. Récupérez la liste de tous les serveurs SQL avec `Get-AzureRmSqlServer`. Pour chaque serveur, activez les audits :

  ```bash
  Set-AzureRmSqlServerAuditingPolicy -ResourceGroupName <nom_groupe_ressources> -ServerName <nom_serveur> -AuditType <type_audit> -StorageAccountName <nom_compte_stockage>
  ```s

## Références

1. https://docs.microsoft.com/fr-fr/azure/security-center/security-center-enable-auditing-on-sql-servers
2. https://docs.microsoft.com/fr-fr/powershell/module/azurerm.sql/get-azurermsqlserverauditing?view=azurermps-5.2.0
3. https://docs.microsoft.com/fr-fr/powershell/module/azurerm.sql/set-azurermsqlserverauditingpolicy?view=azurermps-5.2.0
4. https://docs.microsoft.com/fr-fr/azure/sql-database/sql-database-auditing
5. https://docs.microsoft.com/fr-fr/azure/security/benchmarks/security-controls-v2-logging-threat-detection#lt-4-enable-logging-for-azure-resources

**Remarque** : une stratégie de serveur s'applique à toutes les bases de données nouvelles et existantes sur le serveur. Si les audits d'objets blob sont activés, ils sont systématiquement activés sur la base de données. La base de données est donc auditée, peu importe ses réglages d'audit. Le tableau des types d'audit n'est plus pris en compte, et seuls les audits d'objets blob sont disponibles. L'activation des audits d'objets blob sur la base de données et sur le serveur ne modifie en aucun cas les réglages de ces audits. Les deux stratégies d'audit sont conservées. Ainsi, la base de données est auditée à deux reprises simultanément : une fois par la stratégie du serveur, et une autre fois par la stratégie de la base de données.

## Contrôles CIS

(Version 7.6.3) Journalisation détaillée : activez la journalisation système de façon à inclure des informations détaillées, comme la source de l'événement, la date, l'utilisateur, le timestamp, les adresses des sources, les adresses des destinations et d'autres éléments utiles.