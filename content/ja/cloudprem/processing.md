---
description: CloudPrem で処理パイプラインを設定する方法を学びます
further_reading:
- link: /logs/log_configuration/processors/
  tag: ドキュメント
  text: Datadog Log Management Processors
- link: /cloudprem/
  tag: ドキュメント
  text: CloudPrem 概要
- link: /cloudprem/installation/
  tag: ドキュメント
  text: CloudPrem をインストールして Agent でログを送信する
- link: /cloudprem/ingress/
  tag: ドキュメント
  text: CloudPrem Ingress を構成する
- link: /cloudprem/aws_config
  tag: ドキュメント
  text: AWS を構成する
- link: /cloudprem/cluster/
  tag: ドキュメント
  text: クラスター サイズと運用の詳細
- link: /cloudprem/architecture/
  tag: ドキュメント
  text: CloudPrem アーキテクチャの詳細
- link: /cloudprem/troubleshooting/
  tag: ドキュメント
  text: トラブルシューティング
private: true
title: 処理設定
---

<div class="alert alert-warning">CloudPrem はプレビュー版です。</div>

## 概要

CloudPrem には、ログを解析・強化する処理機能が含まれています。JSON 形式でフォーマットされたログは自動的に解析されます。半構造化テキストから意味のある情報や属性を抽出するために、パイプラインとプロセッサを定義できます。これらの情報は集計に利用できます。

<div class="alert alert-info">CloudPrem のログ パイプラインとプロセッサは、Datadog の <a href="/logs/log_configuration/pipelines/?tab=source">クラウド ベースのログ パイプラインとプロセッサ</a> と同等になるよう設計されています。</div>

サポートされているプロセッサとサポートされていないプロセッサの一覧については、[クラウド ベース パイプラインとの互換性](#compatibility-with-cloud-based-pipelines) を参照してください。

ログ処理パイプラインは、Datadog のパイプライン構成と同じフォーマットに準拠した JSON ファイルで設定できます。

## 処理の設定

1. (任意)** すでに Datadog でクラウド ベース パイプラインを使用している場合は、[Logs Pipelines API][2] を使用して構成を取得できます。

   ```bash
   curl -X GET "https://api.datadoghq.com/api/v1/logs/config/pipelines" \
    -H "Accept: application/json" \
    -H "DD-API-KEY: ${DD_API_KEY}" \
    -H "DD-APPLICATION-KEY: ${DD_APP_KEY}" > pipelines-config.json
   ```

取得した JSON ファイルは、そのまま CloudPrem で利用できます。

2. Helm Chart で構成を設定するには、CloudPrem の Helm Chart の `pipelinesConfig` パラメーターに JSON 構成ファイルへのパスを指定します。

   ```bash
   helm repo update
   helm upgrade <RELEASE_NAME> -n <NAMESPACE_NAME> --set-file pipelinesConfig=./pipelines-config.json -f datadog-values.yaml
   ```

   CloudPrem が構成ファイルを正常に読み取ると、情報メッセージ (`Successfully read pipeline config file`) がログに出力されます。ファイル内で CloudPrem がサポートしていないプロセッサは、起動時に無視されます。
   **注**: Helm は基盤の etcd ストレージの制限により、構成ファイルに 1 MB のサイズ制限を課しています。

## 構成ファイル形式

構成は JSON 配列であり、各要素がプロセッサまたはネストされたパイプラインを表します。

配列内の要素の順序が、プロセッサの実行 順序を定義します。構造は Datadog API エンドポイント `api/v1/logs/config/pipelines` の出力と同じです。


```json
[
  {
    // プロセッサ 1 の詳細
  },
  {
    // プロセッサ 2 の詳細
  }
]
```

```json
[
  {
    "type": "pipeline",
    "id": "U73LOMZ9QG2iM-04OcXypA",
    "name": "cluster agent logs parsing",
    "enabled": true,
    "filter": {
      "query": "service:cluster-agent"
    },
    "processors": [
      {
        "type": "grok-parser",
        "id": "xn2WAzysQ1asaasdfakjf",
        "enabled": true,
        "grok": {
          "supportRules": "",
          "matchRules": "agent_rule %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\) \\|( %{data::keyvalue(\":\")} \\|)?( - \\|)?( \\(%{notSpace:pyFilename}:%{number:pyLineno}\\) \\|)?%{data}\nagent_rule_pre_611 %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{word:level} \\| \\(%{notSpace:filename}:%{number:lineno} in %{word:process}\\)%{data}\njmxfetch_rule     %{date(\"yyyy-MM-dd HH:mm:ss z\"):timestamp} \\| %{notSpace:agent} \\| %{word:level}\\s+\\| %{word:class} \\| %{data}"
        }
      },
      {
        "id": "xnsd5oanXq2893utcsQ",
        "type": "status-remapper",
        "enabled": true,
        "sources": ["level"]
      },
      {
        "type": "date-remapper",
        "id": "xn2WAzysQ1asdjJsb9dfb",
        "enabled": true,
        "sources": ["timestamp"]
      }
    ]
  }
]
```

## クラウド ベース パイプラインとの互換性

CloudPrem の処理機能は、クラウド ベースの [Datadog Log Management][3] とほぼ同じになるよう設計されており、既存のログ パイプライン構成をそのまま使用できます。未知または非対応のプロセッサは無視することでこれを実現しています。ただし、いくつかの相違点があります。
- ワイルドカードを組み合わせたフィルター (例: `@data.message:+*`) など、一部のフィルター クエリは解析できません。
- `message` へのフィルターは一致動作が異なります (category プロセッサにも影響)。
- CloudPrem は正規表現で単語を grep しますが、本来はトークン化して一致させる必要があります。フレーズは無視されます。
- Grok は内部で正規表現を使用します。Regex エンジンがわずかに異なる一致動作をする場合があります。
- 一部の Grok パターンは解析できません (例: `%{?>notSpace:db.severity}`)。

無視されたプロセッサは、インデクサ ログに警告として表示されます。

### サポートされているプロセッサ
- attribute-remapper
- category-processor
- date-remapper
- grok-parser (limited compatibility)
- message-remapper
- pipeline
- service-remapper
- status-remapper
- string-builder-processor
- trace-id-remapper

### Unsupported Processors:
- arithmetic-processor
- geo-ip-parser
- lookup-processor
- url-parser
- user-agent-parser

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/pipelines/?tab=source
[2]: /ja/api/latest/logs-pipelines/#get-all-pipelines
[3]: /ja/logs/log_configuration/processors/