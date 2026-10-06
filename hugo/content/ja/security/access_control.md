---
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: Access Control
---
{{< product-availability >}}

## 概要 {#overview}

Datadog のアクセス管理システムはロールベースのアクセス制御を使用しており、Datadog リソースに対するユーザーのアクセスレベルを定義できます。ユーザーには、読み取り可能なデータや変更可能なアカウント管理アセットなど、アカウント管理の権限を定義するロールが割り当てられます。ロールに権限が付与されると、そのロールに関連付けられているすべてのユーザーがその権限を受け取ります。詳細については、[Account Management Access Control][1] のドキュメントを参照してください。

Datadog Security 製品では、[検出ルール](#restrict-access-to-detection-rules)、[抑制](#restrict-access-to-suppression-rules)、および[動的重大度ルール](#restrict-access-to-dynamic-severity-rules)に対して[きめ細かなアクセス制御][3]が利用可能であり、チーム、ロール、またはサービスアカウントごとにアクセスを制限できます。

## 権限 {#permissions}

Security 製品の[権限リスト][2]を参照してください。

## 検出ルールへのアクセスを制限する {#restrict-access-to-detection-rules}

{{% security-products/detection-rules-granular-access %}}

## 抑制ルールへのアクセスを制限する {#restrict-access-to-suppression-rules}

{{% security-products/suppressions-granular-access %}}

## 動的重大度ルールへのアクセスを制限する {#restrict-access-to-dynamic-severity-rules}

{{% security-products/dynamic-severity-granular-access %}}

[1]: /ja/account_management/rbac/#role-based-access-control
[2]: /ja/account_management/rbac/permissions/#cloud-security-platform
[3]: /ja/account_management/rbac/granular_access/