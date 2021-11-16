---
aliases:
  - /ja/e7n-akg-cid
  - /ja/security_monitoring/default_rules/e7n-akg-cid
  - /ja/security_monitoring/default_rules/azure_run_command_on_virtual_machine
disable_edit: true
integration_id: azure.compute
kind: documentation
rule_category:
  - ログの検出
scope: azure.compute
security: attack
source: azure
tactic: TA0002-execution
title: Azure ユーザーが仮想マシンでコマンドを実行しました
type: security_rules
---
## **目的**

ユーザーが Azure CLI またはポータルを介して Azure 仮想マシンでコマンドを実行したことを検出します。

## **戦略**

`@evt.outcome` が `Success` の `MICROSOFT.COMPUTE/VIRTUALMACHINES/RUNCOMMAND/ACTION` イベントについて Azure Compute ログを監視します。

## **トリアージと対応*

1. ユーザーに連絡して、アクティビティが正当かどうかを判断します。