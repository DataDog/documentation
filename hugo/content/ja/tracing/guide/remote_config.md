---
description: アプリケーションを再起動することなく、SDK 設定を動的に管理するための Remote Configuration の設定方法と使用方法を学びます。
further_reading:
- link: remote_configuration
  tag: ドキュメント
  text: Remote Configuration
site_support_id: tracing_remote_configuration
title: トレースの Remote Configuration を設定する
---
このガイドでは、SDK を使用した Remote Configuration の設定と使用について説明しています。Remote Configuration の仕組みの詳細については、[Remote Configuration][1] を参照してください。

## 前提条件 {#prerequisites}

- [Datadog Agent][2] 7.47.0 以上がホストまたはコンテナにインストールされていること。
- SDK を Remote Configuration 対応バージョンにアップグレードすること。詳細については、[サポートされている構成オプション][7]セクションを参照してください。
- RBAC 権限に [`org_management`][3] が含まれていることを確認し、組織の Remote Configuration を有効にできるようにします。
- RBAC 権限に [`api_keys_write`][4] が含まれていることを確認し、Remote Configuration 機能を持つ新しい API キーを作成できるようにするか、既存の API キーにその機能を追加できるようにします。権限がない場合は、組織の Datadog 管理者に連絡して権限を更新してもらいます。この機能を持つキーを使用すると、Agent が Remote Configuration を使用するための認証と認可を行うことができます。
- `APM Remote Configuration Read` および `APM Remote Configuration Write` [権限][3]があることを確認します。
  **注**: これらの権限がない場合は、Datadog Admin に組織の設定から権限を更新してもらうよう依頼してください。

## Remote Configuration の設定 {#set-up-remote-configuration}

1. [Remote Configuration が組織で有効になっていること][5]を確認します。これにより、組織全体の Datadog コンポーネントが Datadog から構成を受信できるようになります。
1. 既存の API キーを選択するか、新しい API キーを作成し、そのキーで Remote Configuration 機能が有効になっていない場合は有効にします。

   {{<img src="agent/remote_config/RC_Key_updated.png" alt="API キープロパティと Remote Configuration 機能の Enable ボタン。" width="90%" style="center">}}
1. Agent を再起動します。

## SDK の Remote Configuration ステータスの確認 {#review-remote-configuration-status-of-sdks}

[Remote Configuration UI][5] から、SDK の Remote Configuration ステータスを確認できます。

以下のテーブルは、SDK の各ステータスの意味を示しています。

  | SDK ステータス | 説明                                      |
  |------------------|--------------------------------------------------|
  | CONNECTED      | SDK は、関連付けられた Agent を通じて Remote Configuration サービスに正常に接続されています。これは、Remote Configuration における SDK の最適な状態です。                                              |
  | UNAUTHORIZED          | SDK は、API キーに `APM Remote Configuration Read` 権限がない Agent に関連付けられています。この問題を解決するには、SDK に関連付けられた Agent が使用する API キーで Remote Configuration 機能を有効にする必要があります。|
  | CONNECTION ERROR        |   環境でデプロイされた SDK は、`datadog.yaml` 構成ファイルで `remote_config.enabled` が true に設定されている Agent に関連付けられていますが、その Agent が Remote Configuration サービスで見つかりません。このエラーの最も可能性の高い原因は、関連付けられた Agent が Remote Configuration [エンドポイント][6]に到達できないことです。この問題を解決するには、環境から Remote Configuration エンドポイントへのアウトバウンド HTTPS アクセスを許可する必要があります。
  | DISABLED       |   環境でデプロイされた SDK は、`datadog.yaml` 構成ファイルで `remote_config.enabled` が false に設定されている Agent に関連付けられています。これは意図的な設定である場合も、誤った設定である可能性もあります。関連付けられた Agent で Remote Configuration を有効にするには、`remote_config.enabled` を true に設定してください。 |
  | NOT CONNECTED       | SDK が Remote Configuration サービスで見つかりません。また、関連付けられている Agent の `datadog.yaml` 構成ファイルで `remote_config.enabled` が true または false に設定されている可能性があります。ローカル Agent 構成またはプロキシ設定を確認してください。|
  | UNSUPPORTED AGENT   | SDK は、Remote Configuration に対応していない Agent に関連付けられています。この問題を解決するには、関連付けられている Agent のソフトウェアを最新の利用可能なバージョンに更新してください。|
  | NOT DETECTED   | SDK は Remote Configuration をサポートしていません。この問題を解決するには、SDK のソフトウェアを最新の利用可能なバージョンに更新してください。|
  | 不明   | SDK ステータスが不明であり、Agent が SDK に関連付けられているかどうかを判断できません。たとえば、Agent が AWS Fargate のようなフルマネージド型のサーバーレスコンテナサービスでデプロイされている場合に発生する可能性があります。|

## Fleet Automation の Remote Configuration のオプトアウト {#opting-out-of-remote-configuration-for-fleet-automation}

Remote Configuration 機能を無効にすることができます。
- API キーレベル
- Agent レベル
- 組織レベル (**非推奨**)

### API キーレベル {#at-the-api-key-level}

[API キー][8]ページで、任意の API キーを無効にします。API キーで Remote Configuration を無効にするには、[`api_keys_write`][4] 権限が必要です。

### Agent レベル {#at-the-agent-level}

Agent バージョン 7.47.0 以降、Agent で `remote_configuration.enabled` はデフォルトで `true` に設定されています。この設定により、Agent は Datadog サイトに構成の更新をリクエストするようになります。

Agent から Datadog に構成リクエストを送信したくない場合は、Agent で `remote_configuration.enabled` を `false` に設定します。

{{< tabs >}}
{{% tab "構成 YAML ファイル" %}}
[構成 YAML ファイル][101]で `remote_configuration.enabled` を `true` から `false` に変更します。

```yaml
remote_configuration:
  enabled: false
```

[101]: /ja/agent/configuration/agent-configuration-files/?tab=agentv6v7#agent-main-configuration-file
{{% /tab %}}
{{% tab "環境変数" %}}
Datadog Agent マニフェストに以下を追加します。

```yaml
DD_REMOTE_CONFIGURATION_ENABLED=false
```

{{% /tab %}}
{{% tab "Helm" %}}
Helm チャートに以下を追加します。

```yaml
datadog:
  remoteConfiguration:
    enabled: false
```

{{% /tab %}}
{{< /tabs >}}

### 組織レベル {#at-the-organization-level}

<div class="alert alert-warning"><strong>Datadog は、組織レベルで Remote Configuration を無効にすることを推奨していません。組織レベルで Remote Configuration を無効にすると、組織全体の複数の製品で Datadog コンポーネントが Datadog から構成を受信できなくなります。</strong></div>

組織レベルで Remote Configuration を無効にするには:
1. 必要な `org_management` 権限があることを確認します。
1. [Remote Configuration][5] 設定ページに移動します。
1. {{< ui >}}Disable{{< /ui >}} をクリックします。
1. 警告メッセージが表示されたら、もう一度 {{< ui >}}Disable{{< /ui >}} をクリックします。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/remote_configuration
[2]: /ja/agent/
[3]: /ja/account_management/rbac/permissions/
[4]: /ja/account_management/rbac/permissions#api-and-application-keys
[5]: https://app.datadoghq.com/organization-settings/remote-config
[6]: /ja/agent/configuration/network
[7]: /ja/tracing/trace_collection/runtime_config/#supported-configuration-options
[8]: https://app.datadoghq.com/organization-settings/api-keys