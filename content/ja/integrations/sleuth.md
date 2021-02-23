---
"assets":
  "configuration":
    "spec": assets/configuration/spec.yaml
  "dashboards": {}
  "monitors": {}
  "saved_views": {}
  "service_checks": assets/service_checks.json
"categories":
- orchestration
- issue-tracking
- コラボレーション
- source-control
"creates_events": false
"ddtype": "crawler"
"dependencies":
- "https://github.com/DataDog/integrations-extras/blob/master/sleuth/README.md"
"display_name": "Sleuth"
"draft": false
"git_integration_title": "sleuth"
"guid": "294cd3d0-1412-475a-9c85-d8369719b805"
"integration_id": "sleuth"
"integration_title": "Sleuth"
"is_public": true
"kind": "インテグレーション"
"maintainer": "support@sleuth.io"
"manifest_version": "1.0.0"
"metric_prefix": "sleuth."
"metric_to_check": ""
"name": "sleuth"
"public_title": "Datadog-Sleuth インテグレーション"
"short_description": "Sleuth Deployment Tracker"
"support": "contrib"
"supported_os":
- linux
- mac_os
- windows
---

## 概要

Sleuth は、DevOps スタック全体でソフトウェアのデプロイを追跡できるようにするデプロイ追跡ツールです。Datadog インテグレーションにより、Sleuth は洞察に満ちた有意義で実用的なリアルタイムデータを提供し、コードに加えた変更の影響を明確に確認できるようにします。

## セットアップ

Datadog インテグレーションを追加するには

1. [Sleuth アカウント][1]にログインします。
1. サイドバーの **Integrations** をクリックします。
2. _Metric Trackers_ タブをクリックし、Datadog カードで**有効化**します。
3. Datadog API キーとアプリケーションキーを対応するフィールドに入力します。
4. Datadog サーバーが EU にある場合は、_My Datadog servers are in the EU_ チェックボックスをオンにします。不明な場合は、オフのままにします。
5. **Save** を押します。

> Datadog API キーとアプリケーションキーは、**Integrations** &gt; **API** にあります。または、Sleuth ダイアログボックスの **generate** リンクをクリックして (下図を参照)、Datadog コンソールの API/アプリケーションキー領域に移動できます。

![][2]

> Datadog インテグレーションが成功すると、**Datadog is connected** というメッセージが表示されます。

![][3]

### インストール

Datadog Sleuth インテグレーションは、Sleuth アカウントからのみインストールされます。Sleuth で Datadog API とアプリケーションキーを指定する以外に、Datadog アカウントから行う必要がある設定や追加の構成はありません。

### 構成

* **Add metric** ドロップダウンをクリックし、受信した Datadog アプリケーションメトリクスを処理する Sleuth プロジェクトを選択します。Sleuth 組織内のすべてのプロジェクトがドロップダウンに表示されます。

![][4]

> インテグレーションは Sleuth 組織レベルで行われ、その組織内のすべてのプロジェクトで使用できます。インテグレーションの個々の設定は、プロジェクトレベルで行われます。

以上で、Sleuth はデプロイで Datadog メトリクスの表示を開始します。Sleuth のデプロイカードでメトリクスがどのように伝達されるかについて詳しくは、[**ダッシュボード**][5]を参照してください。


## 収集データ

### メトリクス

Sleuth インテグレーションには、メトリクスは含まれません。

### サービスのチェック

Sleuth インテグレーションには、サービスのチェック機能は含まれません。

### イベント

Sleuth インテグレーションには、イベントは含まれません。

## 削除中

1. Sleuth ダッシュボードで、左側のサイドバーの **Integrations** をクリックし、**Metric Trackers** をクリックします。
2. Datadog インテグレーションカードで、**disable** をクリックします。

Datadog インテグレーションが切断され、その組織内のプロジェクトで使用できなくなります。Datadog インテグレーションに加えたプロジェクトレベルの変更はすべて失われます。
[1]: https://app.sleuth.io/accounts/login/
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration-api-key.png
[3]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-integration.png
[4]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/sleuth/images/datadog-enabled-metric-pick.png
[5]: https://help.sleuth.io/dashboard

