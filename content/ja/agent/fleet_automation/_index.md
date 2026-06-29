---
aliases:
- /ja/agent/fleet_automation/remote_management
description: 構成ビュー、アップグレード、フレア収集、API キーローテーションで、Datadog Agent と OpenTelemetry コレクターを大規模に一元管理し、リモートで管理します。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: ブログ
  text: Datadog Fleet Automation を使用して、インフラストラクチャーおよびアプリの監視を一元的に設定して規模を拡大する
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: ブログ
  text: Datadog Fleet Automation を使用して、すべての OpenTelemetry コレクターを管理する
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT ゲートウェイを使用して、OpenTelemetry パイプラインを一元管理する
- link: /remote_configuration
  tag: ドキュメント
  text: Remote Configuration についての詳細はこちら
- link: /infrastructure/list/#agent-configuration
  tag: ドキュメント
  text: Agent 構成ビューについての詳細はこちら
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: ブログ
  text: Fleet Automation を使用して、Datadog Agent を大規模に一元管理し、リモートで管理する
title: Fleet Automation
---
## 概要 {#overview}

Datadog Fleet Automation を使用すると、変化する可観測性のニーズに対応するため、Datadog Agent と OpenTelemetry (OTel) コレクターを大規模に一元管理し、リモートで管理することができます。

{{< img src="/agent/fleet_automation/fleet-automation-main.png" alt="Fleet Automation ページには、Agent のバージョン、ステータス、および有効な製品のリストが表示されます。" style="width:100%;" >}}

## 主な機能 {#key-capabilities}

Fleet Automation を使用すると、以下のことが可能です。
- **[Agent および OTel Collector の構成を表示する][3]**。履歴変更を表示し、デプロイの更新を確認し、構成の一貫性を検証します。
- **[Datadog Agent を構成する][4]**。セットアップを一元化し、環境を迅速に可視化します。
- **[フリートを最新の状態に保つ][5]**。古い Agent および OTel Collector バージョンを特定し、アップグレードします。
- **[リモートでサポートフレアを送信する][6]**。Agent または DDOT Collector の問題をデバッグするのにかかる時間を短縮します。

## Fleet Automation API {#fleet-automation-api}

Fleet Automation は、プログラムによって大規模な Datadog Agent の表示および管理を可能にするパブリック API を提供します。完全なエンドポイントの詳細および使用例については、[Fleet Automation API ドキュメント][1]を参照してください。

<div class="alert alert-info">
Fleet Automation API は、すべての Datadog Agent 構成機能をサポートしているわけではありません。
</div>

## Fleet Automation へのアクセスを制御する {#control-access-to-fleet-automation}

Fleet Automation は Datadog 組織内の全ユーザーが利用可能です。特定の機能へのアクセス制御を行うことができます。

| アクセス許可 | 説明 |
|--------------|---------------|
| `API Keys Read`| API キーによって、Agent の表示や検索ができるユーザーを制限します。|
| `Agent Flare Collection` | Fleet Automation からリモートでフレアを送信できるユーザーを制限します。|
| `Agent Upgrade` | Fleet Automation から Agent をアップグレードするアクセス権を持つユーザーを制限します。|
| `Agent Configuration Management` | Fleet Automation から Agent を構成するアクセス権を持つユーザーを制限します。|

ロールと権限のセットアップ方法については、[アクセス制御][2]を参照してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/api/latest/fleet-automation/
[2]: /ja/account_management/rbac/
[3]: /ja/agent/fleet_automation/fleet_view/
[4]: /ja/agent/fleet_automation/configure_agents/
[5]: /ja/agent/fleet_automation/upgrade_agents/
[6]: /ja/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site