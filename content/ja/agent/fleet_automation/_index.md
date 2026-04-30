---
description: 構成ビュー、アップグレード、フレア収集、API キーローテーションを通じて、Datadog Agent と OpenTelemetry Collector
  を大規模環境でも一元的に統制し、リモートで管理できます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/fleet-automation-central-configuration
  tag: ブログ
  text: Datadog Fleet Automation を使って、インフラストラクチャーとアプリのモニタリングを一元的にセットアップし、スケールさせる
- link: https://www.datadoghq.com/blog/manage-opentelemetry-collectors-with-datadog-fleet-automation
  tag: ブログ
  text: Datadog Fleet Automation で、すべての OpenTelemetry コレクターを管理する
- link: https://www.datadoghq.com/blog/ddot-gateway
  tag: ブログ
  text: DDOT gateway を使って OpenTelemetry パイプラインを一元化し、統制する
- link: /remote_configuration
  tag: ドキュメント
  text: Remote Configuration の詳細を確認する
- link: /infrastructure/list/#agent-configuration
  tag: ドキュメント
  text: Agent 構成ビューの詳細を確認する
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: ブログ
  text: Fleet Automation を使って Datadog Agent を大規模に一元統制し、リモートで管理する
title: Fleet Automation
---

## 概要

Datadog Fleet Automation を使用すると、Datadog Agent と OpenTelemetry (OTel) Collector を大規模環境でも一元的に統制し、リモートで管理できます。進化し続ける Observability のニーズに合わせて、運用を柔軟に支援します。

{{< img src="/agent/fleet_automation/fleet_automation2.png" alt="Fleet Automation のページ" style="width:100%;" >}}

## ユース ケース

以下のユース ケースでは、Datadog Agent と OTel Collector のフリートが最新の機能強化を利用できるようにしてください。Fleet Automation を利用すると、次のことが可能になります:
- **最新の Agent と OTel Collector の構成を確認**し、変更履歴もあわせて参照できます。これにより、デプロイ更新の確認や、構成の一貫性維持に役立ちます。
- **古いバージョンを特定してアップグレード**することで、Agent と OTel Collector が最新の機能強化を利用している状態を維持できます。
- **Fleet Automation から Datadog Agent を直接設定**できるため、セットアップを一元化し、環境の可視化までの時間を短縮できます。
- **Datadog UI からリモートでサポート フレアを送信**できるため、Agent または DDOT Collector の問題切り分けにかかる時間を短縮できます。

## セットアップ

### フリートをリモートで管理する

Fleet Automation を使うと、Datadog UI から全ホストの Datadog Agent を一元管理できます。リモート管理により、各 Agent の現在の状態を確認し、構成変更の適用やバージョン アップグレードの展開を、個々のシステムへ直接アクセスすることなく実行できます。これにより、フリートをセキュアで最新の状態に保ち、組織の標準に沿った一貫性のある統制されたワークフローを実現できます。

- **Remotely Upgrade and Configure Agents**: セットアップと有効化の手順については、[Remote Agent Management を有効化する][3] を参照してください。
- **Agent と OTel Collector の構成を表示**:
  - Agent と Datadog Distribution of OTel Collector (DDOT) の構成ビューは、Agent バージョン 7.47.0 以降でデフォルトで有効です。Agent 構成を手動で有効化するには、[Agent 構成ファイル][2] 内の `inventories_configuration_enabled` を `true` に設定します。代わりに、環境変数 `DD_INVENTORIES_CONFIGURATION_ENABLED` を使用することもできます。
  - アップストリームの OTel Collector 構成ビューは、コレクター構成ファイルで [Datadog Extension][8] を設定することで有効になります。
- **View Agent integration configuration**: Agent インテグレーション構成は、Agent バージョン 7.49 以降でデフォルトで有効です。Agent インテグレーション構成を手動で有効化するには、[Agent 構成ファイル][2] 内の `inventories_checks_configuration_enabled` を `true` に設定します。代わりに、環境変数 `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` を使用することもできます。

### Fleet Automation API
Fleet Automation には、Datadog Agent を大規模にプログラムで参照 / 管理できる Public API が用意されています。エンドポイントの詳細と利用例については、[Fleet Automation API ドキュメント][9] を参照してください。

**注**: Fleet Automation API は、Datadog Agent 構成のすべての機能をサポートしているわけではありません。

<div class="alert alert-info">
コンテナ化されたワークロードにおける Agent のリモート管理はサポートされていません。
</div>


## フリートを可視化する

[**Fleet Automation**][1] ページを使用して、ホスト上の Observability のギャップ、古い Agent または OTel Collector、インテグレーションに問題を抱える Agent を把握できます。

各 Datadog Agent について、以下を確認できます:
- Agent バージョン
- 未設定または誤設定のインテグレーションがあるかどうか
- Agent が監視しているサービス
- Agent の Remote Configuration ステータス
- Agent で有効化されているプロダクト
- 構成変更、アップグレード、フレアなどを含む Agent Audit Trail イベント

各 OTel Collector について、以下を確認できます:
- Collector バージョン
- Collector のディストリビューション
- Collector の構成 YAML

### Datadog Agent または OpenTelemetry Collector を詳しく確認する

Datadog Agent または OTel Collector を選択すると、構成、接続されているインテグレーション、監査イベント、さらにリモート フレアの送信に使える Support タブなど、より詳細な情報を確認できます。

{{< img src="agent/fleet_automation/fleet-automation-view-config.png" alt="Agent のインテグレーション情報" style="width:100%;" >}}

### Agent の Audit Trail イベントを表示する

The Audit Events タブには、選択した Agent に関連付けられた Audit Trail イベントが表示されます。
このタブでできること:
- 構成変更、API キー更新、インストール、アップグレード、サポート フレアを特定する。
- 変更がいつ、どこから行われたかを確認する。

Audit Trail イベントの可視性はご利用プランによって異なります。組織で Audit Trail が有効な場合、Audit Trail の保持設定に基づき最大 90 日分の Agent イベントを確認できます。組織で Audit Trail が有効でない場合、過去 24 時間分のイベントを確認できます。

### リモート フレアを送信する

Agent で Remote Configuration を有効化した後、Datadog Agent または DDOT Collector からフレアを送信できます。フレアの送信手順については、[Datadog サイトからフレアを送信する][7] を参照してください。

Agent で Remote Configuration を有効にした状態で Datadog Support に問い合わせると、Support チームが迅速な支援のために、環境からフレアを開始する場合があります。フレアはトラブルシューティング情報を Datadog Support に提供し、問題の解決を支援します。

{{< img src="agent/fleet_automation/fleet_automation_remote_flare.png" alt="リモート フレアを送信" style="width:100%;" >}}

## Fleet Automation へのアクセスを制御する

Fleet Automation は、Datadog 組織内のすべてのユーザーが利用できます。特定の機能へのアクセスは次のように制御できます:

| 権限 | 説明 |
|--------------|---------------|
| `API Keys Read`| API キーで Agent を閲覧 / 検索できるユーザーを制限します。 |
| `Agent Flare Collection` | Fleet Automation からリモートでフレアを送信できるユーザーを制限します。 |
| `Agent Upgrade` | Fleet Automation から Agent をアップグレードできるユーザーを制限します。 |
| `Agent Configuration Management` | Fleet Automation から Agent を設定できるユーザーを制限します。 |

ロールと権限の設定については、[Access Control][5] を参照してください。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/agent/fleet_automation/remote_management/#setup
[4]: /ja/infrastructure/list/#agent-configuration
[5]: /ja/account_management/rbac/
[6]: /ja/agent/fleet_automation/remote_management/
[7]: /ja/agent/troubleshooting/send_a_flare/#send-a-flare-from-the-datadog-site
[8]: https://docs.datadoghq.com/ja/opentelemetry/integrations/datadog_extension/#setup
[9]: https://docs.datadoghq.com/ja/api/latest/fleet-automation/