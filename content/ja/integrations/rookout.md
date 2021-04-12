---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - 例外
creates_events: true
ddtype: crawler
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/rookout/README.md'
display_name: Rookout
draft: false
git_integration_title: rookout
guid: ad342dd9-4fe8-44e6-8bee-1e1cc64b1d28
integration_id: rookout
integration_title: Rookout
is_public: true
kind: インテグレーション
maintainer: support@rookout.com
manifest_version: 1.0.0
name: rookout
public_title: Datadog-Rookout インテグレーション
short_description: 製品のデバッグ、ログ、アラート
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## 概要

数回のクリックでアプリケーションからカスタムメトリクスを収集します。コードの記述、アプリの再起動や再デプロイを行う必要はありません。

- Rookout のオンデマンドデータ収集を使用して、監視機能を強化し、製品のデバッグを効率よく行うことができます。
- 新しいインスツルメンテーションを必要とすることなく、Rookout からカスタムメトリクスを随時収集できます。

**注: このインテグレーションによってカスタムメトリクスを収集できるため、収集されるカスタムメトリクスの数に応じて課金に影響する場合があります。カスタムメトリクスの詳細については、[こちらをご覧ください][1]。**

## セットアップ

### インストール

Rookout は、Datadog Agent の DogStatsD サービスから Datadog にデータを送信します。

1. [Datadog Agent][2] と [Rookout][3] をインストールします。

2. [Rookout シェルの Web アプリ][4]にログインします

3. 右のパネル (Rules) でメニューボタンをクリックします。

    ![Rule action メニュー][5]

4. _Create new template_ をクリックして新しいルールテンプレートを編集します。

    ![Create new template ボタン][6]

5. [ここにある][7] Datadog カスタムメトリクスルールテンプレートをエディターにコピーして、デフォルトのルールテンプレートを置き換えます。

    ![Datadog カスタムメトリクスルールテンプレート][8]

6. 保存アイコンをクリックしてテンプレートを保存します。

    ![保存アイコンをクリック][9]

7. 通常のように、新しく作成したルールをアプリケーションに追加します。

### コンフィギュレーション

特定のアクションを使用するようにルールを構成できますが、各ルールは、`processing.operations` オブジェクトに以下の属性を含んでいる必要があります。

```json
{
  "name": "dogstatsd",
  "action": "<アクション>",
  "metric": "<メトリクス名>",
  "target": {
    "host": "<ホスト名>",
    "port": 8125
  }
}
```

アクションに応じて、必要な追加属性は異なります。

| Datadog のアクション |  属性 |
|----------------|-------------|
|    インクリメント   | 値       |
|    デクリメント   | 値       |
|      イベント     | タイトル、テキスト |
|      gauge     | 値       |
|    histogram   | 値       |
|     時間     | 値       |
|  ディストリビューション  | 値       |

これらのアクションの詳細については、[Dogstatsd のドキュメント][10]を参照してください。

ルールで正しく使用するには、属性は以下の形式である必要があります。

```json
"value": {
    "name": "calc",
    "path": "123"
}
```

```json
"value": {
    "name": "calc",
    "path": "\"string\""
}
```

## 収集データ

Rookout ルールに Datadog 出力を作成することで、カスタムメトリクスおよびイベントを収集できます。次のパターンがよく使用されます。

- メソッドが呼び出された回数をカウントする (増分)
- DataDog で開始されたプロセスを記述する (イベント)
- バッチサイズを記録する (ヒストグラム)

## トラブルシューティング

ご質問は、support@rookout.com までお問合わせください。

[1]: https://docs.datadoghq.com/ja/getting_started/custom_metrics/
[2]: https://docs.datadoghq.com/ja/agent/
[3]: https://docs.rookout.com/docs/getting-started.html
[4]: https://app.rookout.com
[5]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_rule_action.png
[6]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_new_template.png
[7]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/rule-template.json
[8]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/datadog_rule_template.png
[9]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/rookout/images/click_save.png
[10]: https://docs.datadoghq.com/ja/developers/dogstatsd/