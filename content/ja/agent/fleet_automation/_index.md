---
disable_toc: false
further_reading:
- link: /agent/remote_config
  tag: ドキュメント
  text: リモート構成の詳細はこちら
- link: /infrastructure/list/#agent-configuration
  tag: ドキュメント
  text: Agent 構成ビューについて
- link: https://www.datadoghq.com/blog/fleet-automation/
  tag: ブログ
  text: Fleet Automation を用いて、Datadog Agent を集中的に統制し、リモートで大規模に管理する
title: Fleet Automation
---

## 概要

Datadog Fleet Automation を使用すると、変化する可観測性のニーズに対応するため、Datadog Agent を大規模に一元管理し、リモートで管理することができます。

{{< img src="agent/fleet_automation/fleet-automation.png" alt="Fleet Automation ページ" style="width:100%;" >}}

Fleet Automation プラットフォームを使用すると、以下のことが可能です。
- Agent や Agent インテグレーションの構成を確認し、デプロイ変更をチェックして構成の一貫性を確保できます。
- 組織内からフレアを送信し、 Agent 上の問題のデバッグ時間を短縮できます。
- 古い Agent バージョンを特定することで、 Agent 群が最新の機能強化を利用していることを確認できます。
- API キーのローテーションを支援し、特定のキーを使用している Agent やその数を把握することで、古いキーを影響なく無効にできます。

[**Fleet Automation**][1] ページを使用して、監視されていないホストやアップデートが必要な Agent 、またはインテグレーションの問題がある Agent を確認できます。各 Agent に対して以下の情報を確認可能です。
- Agent のバージョン
- 未構成または誤構成のインテグレーションがあるかどうか
- Agent が監視しているサービス
- Agent の Remote Configuration ステータス
- Agent で有効になっている製品

Agent を選択すると、その構成、接続されているインテグレーション、リモートフレアを送信できるサポートタブなど、詳細な情報が表示されます。

{{< img src="agent/fleet_automation/fleet-automation-agent.png" alt="Agent のインテグレーション情報" style="width:100%;" >}}

## Fleet Automation の構成

Fleet Automation は、 Datadog のいくつかの機能を含んでおり、 Agent バージョン 7.49/6.49 以降ではすべて自動で有効になります。すべての機能にアクセスするには、 Agent をバージョン 7.49/6.49 以降にアップグレードしてください。

古い Agent を使用している場合でも、以下の Datadog 機能を個別に有効にできることがあります。
- **Remote Configuration**: 対応する Agent バージョンと構成手順の詳細は、[Remote Configuration を有効にする][3]を参照してください。
- **Agent 構成**: Agent 構成タブを有効にするには、 Agent バージョン 7.39/6.39 以降が必要です。 Agent バージョン 7.47.0/6.47.0 以降ではデフォルトで有効になっています。手動で Agent 構成を有効にするには、 [Agent コンフィギュレーションファイル][2]内の `inventories_configuration_enabled` を `true` に設定するか、環境変数 `DD_INVENTORIES_CONFIGURATION_ENABLED` を使用してください。
- **Agent インテグレーション構成**: Agent バージョン 7.49/6.49 以降ではデフォルトで有効になっています。手動で Agent インテグレーション構成を有効にするには、[Agent コンフィギュレーションファイル][2]内の `inventories_checks_configuration_enabled` を `true` に設定するか、環境変数 `DD_INVENTORIES_CHECKS_CONFIGURATION_ENABLED` を使用してください。

Datadog では、常に最新の機能にアクセスできるよう、定期的な Agent のアップグレードを推奨しています。

## リモートフレアを送信

フレアを送信する前に、選択した Agent で Remote Configuration が[有効](#configuring-fleet-automation)になっていることを確認してください。

{{% remote-flare %}}

{{< img src="agent/fleet_automation/fleet-automation-flares2.png" alt="Send Ticket ボタンは、既存または新規のサポートチケットに対してフレアを送信するためのフォームを起動します" style="width:100%;" >}}

## Fleet Automation へのアクセスを制御

Fleet Automation は Datadog 組織内の全ユーザーが利用可能です。特定の機能へのアクセス制御を行うことができます。

| アクセス許可 | 説明 |
|--------------|---------------|
| `API keys read`| API キーによって、 Agent の表示や検索ができるユーザーを制限します。 |
| `Agent flare collection` | リモートでフレアを送信できるユーザーを制限します。 |

ロールと権限のセットアップ方法については、 [アクセス制御][5]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/fleet
[2]: /ja/agent/configuration/agent-configuration-files/
[3]: /ja/agent/remote_config#enabling-remote-configuration
[4]: /ja/infrastructure/list/#agent-configuration
[5]: https://docs.datadoghq.com/ja/account_management/rbac/