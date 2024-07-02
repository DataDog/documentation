---
title: Setting Up Cloud SIEM for AWS
aliases:
  - /security_platform/guide/setting-up-security-monitoring-for-aws
  - /security_platform/cloud_siem/guide/setting-up-security-monitoring-for-aws
---

## 概要

Datadog Cloud SIEM を使用すると、検出ルールがすべての処理済みログに適用されます。AWS サービスログは、Datadog Lambda 関数で収集されます。この Lambda は S3 バケットでトリガーし、ログを Datadog へ送信します。使用を開始するには、下記の手順でセットアップします。

## セットアップ

1. Datadog アプリの [Security Configuration Setup ページ][1] へ移動します。
2. **Cloud SIEM** を選択します。
3. **Secure your cloud environment** で、AWS を選択します。
4. **Detect threats with cloud logs** のセットアップを完了します。
5. (オプション) **Secure your hosts and containers** セットアップを完了します。
6. (オプション) **Detect threats in additional logging sources** セットアップを完了します。


[1]: https://app.datadoghq.com/security/configuration
