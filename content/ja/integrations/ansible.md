---
categories:
- automation
- configuration & deployment
- log collection
- orchestration
- provisioning
dependencies: []
description: 失敗したタスクを追跡し、イベントストリームにプレイブックの実行を表示。
doc_link: https://docs.datadoghq.com/integrations/ansible/
draft: false
git_integration_title: ansible
has_logo: true
integration_id: ansible
integration_title: Ansible
integration_version: ''
is_public: true
manifest_version: '1.0'
name: ansible
public_title: Datadog-Ansible インテグレーション
short_description: 失敗したタスクを追跡し、イベントストリームにプレイブックの実行を表示。
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/ansible/ansibledashboard.png" alt="Ansible ダッシュボード" popup="true">}}

## 概要

Datadog Ansible コールバックインテグレーションをインストールすると、以下のことができます。

- Ansible サーバーの実行に関するリアルタイムのレポートを取得できます。
- すべてのサーバーで Ansible のキーパフォーマンスメトリクスを追跡できます。
- 失敗した Ansible の実行をすばやく特定してチームで議論できます。

Datadog の Ansible インテグレーションの使用方法については、ブログ記事 [Ansible + Datadog: 自動化の監視と監視の自動化][1]を参照してください。

## セットアップ

### インストール

1. 以下の必須の Python ライブラリが、サーバーにインストールされていることを確認します。

    - datadogpy
    - pyyaml (`pip install pyyaml` でインストール)
    - Mac OS X ユーザーの場合: OS にインストールされているバージョン 2.7.10 以前の Python を実行している場合は、`pip install pyopenssl idna` を使用して、新しいバージョンの OpenSSL にアップグレードしてください。

2. [ansible-datadog-callback GitHub リポジトリ][2]を複製します。
3. `datadog_callback.py` をプレイブックのコールバックディレクトリ (デフォルトでは、プレイブックのルートディレクトリにある callback_plugins/) にコピーします。このディレクトリがない場合は、作成してください。
4. `datadog_callback.py` と同じ場所に `datadog_callback.yml` ファイルを作成し、このファイルで次のように API キーを設定します。


        api_key: <YOUR_DATADOG_API_KEY>


5. プレイブックが実行されると、Ansible のイベントおよびメトリクスが Datadog に表示されます。

Ansible を使用して Datadog Agent をインストールするには、[Agent インストール手順][3]を参照してください。

### ログの収集

Ansible を使用して、ログ収集を有効にして Datadog Agent をインストールする方法については、[こちらのプレイブックの例を参照][4]してください。

## 収集データ

### メトリクス
{{< get-metrics-from-git "ansible" >}}


### イベント

[ansible-datadog-callback][2] が実行中のプレイブックから Ansible のイベントを取得します。

### サービスのチェック

Ansible インテグレーションには、サービスのチェック機能は含まれません。

## トラブルシューティング

ご不明な点は、[Datadog のサポートチーム][6]までお問合せください。

[1]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring
[2]: https://github.com/datadog/ansible-datadog-callback
[3]: https://app.datadoghq.com/account/settings/agent/latest?platform=ansible
[4]: https://github.com/DataDog/ansible-datadog#example-playbooks
[5]: https://github.com/DataDog/dogweb/blob/prod/integration/ansible/ansible_metadata.csv
[6]: https://docs.datadoghq.com/ja/help/