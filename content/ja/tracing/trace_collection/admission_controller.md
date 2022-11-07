---
description: Cluster Agent と Admission Controller を用いたアプリケーションへのトレーシングライブラリの挿入
is_beta: true
kind: documentation
title: Admission Controller を使ったライブラリの挿入
---

{{< beta-callout url="#" btn_hidden="true">}}
  Admission Controller を使ったトレーシングライブラリの挿入はベータ版です。
{{< /beta-callout >}}

## Datadog Agent のインストール
まず、Datadog Agent の設定を行います。Kubernetes 環境での推奨インストール方法は、Helm Charts を経由する方法です。[Datadog Agent in Kubernetes via Helm Charts][3] の構成方法については、当社のドキュメントをご覧ください。

## 統合サービスタグ付け
Datadog Agent にトレースを送信する Kubernetes アプリケーションでは、Java、JavaScript、Python のライブラリを自動的に挿入するように Datadog Admission Controller を構成することができます。Java と Javascript のライブラリを挿入するには、Datadog Cluster Agent v7.39+ を使用します。Python ライブラリを挿入するには、Datadog Cluster Agent v7.40+ を使用します。

Datadog の価値を最大限に引き出すために、インフラストラクチャー、アプリケーション、ログを接続するための統合サービスタグ付けアプローチを使用することを強くお勧めします。[統合サービスタグ付け][4]の適用方法については、当社のドキュメントを参照してください。

## ポッドにアノテーションを付ける
Admission Controller を介したトレーサーライブラリの注入を自動化することで、アプリケーションのイメージを変更する必要がなく、APM の迅速な立ち上げが可能になります。

[Cluster Agent][1] をインストールしたら、次のいずれかを実行します。
- ラベル `admission.datadoghq.com/enabled: "true"` をポッドに追加する。
- `mutateUnlabelled` (コンフィギュレーションメソッドによっては `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定して Cluster Agent の Admission Controller を構成します。

ライブラリ挿入のためにコンテナをオプトインするには、アプリケーションの YAML ファイル内で Pod アノテーションを使用して、言語トレーサーとバージョンを指定します。

アノテーションは、次の形式の `key: value` のペアです。
```yaml
    admission.datadoghq.com/<language>-lib.version: <lib-version>
```

このアノテーションを追加すると、その言語とバージョンのトレーサーライブラリが、コンテナ化されたアプリケーションに挿入されます。
有効な `<language>` の値は以下の通りです。
- `java`
- `js`
- `python`

例えば、Java トレーサー v0.114.0 を挿入するには

```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "v0.114.0"
```

**注**: ライブラリのメジャーリリースは、破壊的な変更をもたらす可能性があるため、`latest` を指定する際には注意が必要です。

あまりないシナリオですが、複数の `<language>-lib.version` アノテーションを追加して、1 つのコンテナに複数の言語トレーサーを挿入することができます。

例えば、Java トレーサー v0.114.0 と Node トレーサー v3.6.0 を挿入するには
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "v0.114.0"
    admission.datadoghq.com/js-lib.version: "v3.6.0"
```

また、以下のアノテーションを使用して、トレーサーライブラリの最新バージョンを挿入することができます。
```yaml
annotations:
    admission.datadoghq.com/java-lib.version: "latest"
    admission.datadoghq.com/js-lib.version: "latest"
    admission.datadoghq.com/python-lib.version: "latest"
```

**注**: `latest` を指定すると、新しく挿入するアプリケーションと既にデプロイされている既存のアプリケーションの間に大きなバージョンの違いがあるため、エラーが発生する可能性があるので注意してください。

Helm チャートに `mutateUnlabelled: true` という Agent 構成を追加すると、Cluster Agent はラベルのないすべてのポッドをインターセプトしようとします。

ポッドで環境変数を受信しないようにするには、ラベル `admission.datadoghq.com/enabled: "false"` を追加します。これは `mutateUnlabelled: true` を設定している場合でも機能します。

`mutateUnlabelled` が `false` に設定されている場合、ポッドラベルは `admission.datadoghq.com/enabled: "true"` とします。

利用可能なオプション:

| mutateUnlabelled | ポッドラベル                               | 挿入可否 |
|------------------|-----------------------------------------|-----------|
| `true`           | ラベルなし                                | 〇       |
| `true`           | `admission.datadoghq.com/enabled=true`  | 〇       |
| `true`           | `admission.datadoghq.com/enabled=false` | ✕        |
| `false`          | ラベルなし                                | ✕        |
| `false`          | `admission.datadoghq.com/enabled=true`  | 〇       |
| `false`          | `admission.datadoghq.com/enabled=false` | ✕        |

## 別のレジストリからトレーサーを構成する
Datadog Cluster Agent の `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数を使って、異なるレジストリから APM ライブラリを引き出すことができます。

デフォルト値は `grc.io/datadoghq` に設定されています。サポートされている値は `docker.io/datadog` と `public.ecr.aws/datadog` です。

[1]: /ja/containers/cluster_agent/setup/?tab=helm
[2]: /ja/containers/cluster_agent/admission_controller/
[3]: /ja/containers/kubernetes/installation/?tab=helm
[4]: /ja/getting_started/tagging/unified_service_tagging/?tab=kubernetes