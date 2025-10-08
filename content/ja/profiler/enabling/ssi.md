---
private: true
title: Single Step Instrumentation によるプロファイリング
---

<div class="alert alert-info">Single Step Instrumentation を用いたプロファイリング機能は現在プレビュー版です。</div>

## 概要

作業を開始する前に、[Single Step APM Instrumentation][1] (以下、SSI) を十分に理解してください。

[Continuous Profiler][3] は SSI のセットアップの一部として有効化できます。このページでは、その設定方法について説明します。

## サポートされるオペレーティングシステムと環境

SSI がサポートされるのは Linux だけで、`x86_64` と `arm64` (ARM v8) アーキテクチャに対応します。SSI と併用する Continuous Profiler のプレビュー版は、ホスト、コンテナ、Kubernetes でのデプロイに対応します。

SSI を使用した Continuous Profiler は、以下の言語で有効化できます。

| 言語           | トレーサーライブラリバージョン |
|--------------------|------------------------|
| Java               | 1.37.0+                |
| .NET (x86_64 のみ) | 3.3.1+                 |
| Node.js            | 4.39.0+, 5.15.0+       |

Kubernetes でのデプロイには最低でも Datadog Agent 7.57.0 が必要です。ホストやコンテナでのデプロイの場合は、Datadog Agent 7.56.x を使用できます。

## SSI を使って Continuous Profiler を有効化する

以下の手順に従うことで、SSI のセットアップの一部として Continuous Profiler を有効化できます。

{{< tabs >}}
{{% tab "Host and container" %}}

1. [Agent インストールページ][2]にアクセスし、Linux プラットフォームまたは Docker のいずれかを選択します。
1. 「Enable APM Instrumentation」スイッチをオンにします (スイッチがない場合、そのプラットフォームは SSI 非対応)。スイッチをオンにすると、インストールコマンドに環境変数 `DD_APM_INSTRUMENTATION_ENABLED=` が追加され、インストールされた Agent がプロセスにトレーサーライブラリを挿入できるようになります。
1. インストールコマンドをテキストエディタにコピーします。
1. コピーしたコマンドの `DD_APM_INSTRUMENTATION_ENABLED` の後に、追加の環境変数として `DD_PROFILING_ENABLED=auto` を追記します。これにより、プロファイリング対象となる新規プロセスに対して自動的にプロファイラが有効になります。
1. 修正したインストールコマンドを使用し、残りのインストール手順に進んでください。

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Helm Chart" %}}

1. [Agent インストールページ][2]にアクセスし、Kubernetes を選択したうえで Helm Chart を選択します。
1. APM のドロップダウンを開き、「Enable APM Instrumentation」スイッチをオンにします。
1. インストールページで示されている値に加えて、以下の値を `datadog-values.yaml` に追加します。`datadog.profiling.enabled: auto` を設定すると、プロファイリング対象となる新規プロセスに対してプロファイラが
自動的に有効になります。
1. 残りのインストール手順を続行します。

```
agents:
  image:
    tag: latest
clusterAgent:
  image:
    tag: latest
datadog:
  profiling:
    enabled: auto
```

すでに Datadog Helm チャートを使用している場合は、バージョン 3.71.0 以上に更新されていることを確認してください。Datadog Helm チャートはデフォルトで古い Agent バージョンを参照するため、プロファイリング対応版を導入するには "latest" タグを指定してください。

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{% tab "Kubernetes with Datadog Operator" %}}

1. [Agent インストールページ][2]にアクセスし、Kubernetes を選択し、次に Operator を選択します。
1. APM のドロップダウンを開き、「Enable APM Instrumentation」スイッチをオンにします。
1. インストールページに示されている内容に加えて、以下の値を `datadog-values.yaml` に追加してください。Cluster Agent 上の環境変数 `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED=auto` は、
プロファイリング対象となる新規プロセスに対して自動的にプロファイラを有効にします。
1. 残りのインストール手順に進みます。

```
spec:
  override:
    nodeAgent:
      image:
        tag: latest
    clusterAgent:
      image:
        tag: latest
      env:
        - name: DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_PROFILING_ENABLED
          value: "auto"
```

プロファイリングをサポートする新しい Agent バージョンをインストールするには、"latest" イメージタグを使用してください。Datadog Operator は古い Agent バージョンをデフォルトとしているためです。

[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
{{% /tab %}}
{{< /tabs >}}

## SSI におけるプロファイリングの動作

インストール後は、すべての新しいプロセスが `DD_PROFILING_ENABLED=auto` という環境変数付きで実行されます。すでに実行中のプロセスには影響しません。Datadog ライブラリは、プロファイリングに適したプロセスを動的に判断してプロファイラを有効にします。

どのようなプロセスがプロファイリング対象となるかのロジックは言語によって異なります。Java では、通常ホスト上に単一の Java プロセスとしてアプリケーションがデプロイされるため、すべてのプロセスがプロファイリングされます。Node や Python では、アプリケーションが 30 秒以上動作し、少なくとも 1 つのトレーススパンを作成している場合にのみプロファイラが有効になります。

また、`auto` の代わりに `true` を設定すると、すべてのプロセスに対してプロファイリングを挿入するよう SSI を構成できます。

**注**: 価値の低いプロセスをプロファイリングしないためにも、Datadog は `auto` の使用を推奨しています。

# 元に戻す

[Single Step APM Instrumentation][1] のページには、すべてのインスツルメンテーションを削除する手順が記載されています。インスツルメンテーションを削除すると、プロファイリングも同時に削除されます。

さらに、以下のいずれかの手順を実行してプロファイリングを無効化することもできます。
* `auto` の代わりに `false` を設定してインストール手順を再度行う。
* ホストやコンテナでのデプロイにおいて、ホスト上の `/etc/environment` ファイルから `DD_PROFILING_ENABLED` の設定を削除する。

最後に、特定のプロセスだけプロファイリングを無効にするには、そのコマンドラインで明示的に `DD_PROFILING_ENABLED=false` を設定します。

## Systemd サービスに関する特記事項

ホストへのインストールでは、`DD_PROFILING_ENABLED` 環境変数は `/etc/environment` ファイルに保存され、ほとんどの Linux システムはすべてのプロセスに対してこのファイルを自動的に読み込みます。ただし、systemd サービスはこのファイルを無視する場合があります。systemd サービスとしてデプロイされるアプリケーションでは、アプリケーションの `.service` ファイルに以下の行を追加する必要があります。
```
EnvironmentFile=/etc/environment
```
ホスト上で systemd サービス以外の方法でデプロイされるアプリケーションや、コンテナでデプロイされるアプリケーションには、この追加手順は不要です。

[1]: /ja/tracing/trace_collection/automatic_instrumentation/single-step-apm
[3]: /ja/profiler/