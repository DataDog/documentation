---
description: Cluster Agent と Admission Controller を用いたアプリケーションへのインスツルメンテーションライブラリの挿入
is_beta: true
kind: documentation
title: Admission Controller を使ったライブラリの挿入
---

{{< beta-callout url="#" btn_hidden="true">}}
  Admission Controller を使ったトレーシングライブラリの挿入はベータ版です。
{{< /beta-callout >}}

## 概要

Kubernetes 環境では、アプリケーションをインスツルメントする方法が 2 つあります。
* このページで説明されているように、[Admission Controller][1] を使用してインスツルメンテーションライブラリを挿入する、または
* [アプリケーションでインスツルメンテーションライブラリを手動で追加する][2]。

Admission Controller のアプローチでは、Agent は Kubernetes Admission Controller を使用して Kubernetes API へのリクエストをインターセプトし、指定されたインスツルメンテーションライブラリを挿入するために新しいポッドを変異させます。

<div class="alert alert-warning">ライブラリ挿入は新しいポッドにのみ適用され、実行中のポッドには影響を与えません。</div>

Kubernetes Admission Controller の詳細については、[Kubernetes Admission Controllers リファレンス][3]をご覧ください。

## 要件

* Kubernetes v1.14+
* Datadog Admission Controller を有効化した Datadog [Cluster Agent v7.40+][4]。**注**: Helm chart v2.35.0 以降では、Cluster Agent で Datadog Admission Controller がデフォルトでアクティブになります。
* サポートされているアーキテクチャを持つ Linux 上にデプロイされた Java、JavaScript、Python のアプリケーション。言語ごとにサポートされているアーキテクチャの完全なリストについては、[対応するコンテナレジストリ](#container-registries)を確認してください。


## コンテナレジストリ

Datadog は、インスツルメンテーションライブラリのイメージを gcr.io、Docker Hub、AWS ECR で公開しています。
| 言語   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][5]   | [hub.docker.com/r/datadog/dd-lib-java-init][6]   | [gallery.ecr.aws/datadog/dd-lib-java-init][7]   |
| JavaScript | [gcr.io/datadoghq/dd-lib-js-init][8]     | [hub.docker.com/r/datadog/dd-lib-js-init][9]     | [gallery.ecr.aws/datadog/dd-lib-js-init][10]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][11] | [hub.docker.com/r/datadog/dd-lib-python-init][12] | [gallery.ecr.aws/datadog/dd-lib-python-init][13] |

Datadog Cluster Agent の構成にある `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` 環境変数は、Admission Controller が使用するレジストリを指定します。デフォルト値は、`grc.io/datadoghq` です。

ローカルコンテナレジストリでイメージをホストしている場合は、`docker.io/datadog`、`public.ecr.aws/datadog`、または他の URL に変更することで、別のレジストリからトレーシングライブラリを引き出すことができます。

## インスツルメンテーションライブラリの挿入の構成

Datadog にトレースを送信したい Kubernetes アプリケーションに対して、Java、JavaScript、または Python のインスツルメンテーションライブラリを自動的に挿入するように Datadog Admission Controller を構成します。大まかに言うと、これには次の手順が含まれます。詳細は以下で説明します。

1. Datadog Admission Controller を有効にして、ポッドのミュートを行います。
2. ポッドにアノテーションを付けて、どのインスツルメンテーションライブラリを挿入するか選択します。
3. 統合サービスタグ付けにより、ポッドにタグを付け、Datadog のテレメトリーを結び付け、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートします。
4. 新しい構成を適用します。

<div class="alert alert-info">ライブラリを挿入するために、新しいアプリケーションイメージを生成する必要はありません。ライブラリの挿入はインスツルメンテーションライブラリの追加を引き受けているので、アプリケーションイメージの変更は必要ありません。</div>

### ステップ 1 - Datadog Admission Controller を有効にして、ポッドのミュートを行います

デフォルトでは、Datadog Admission Controller は、特定のラベルでラベル付けされたポッドのみをミュートします。ポッドでミュートを有効にするには、ポッドの仕様にラベル `admission.datadoghq.com/enabled: "true"` を追加します。

**注**: Datadog Admission Controller で、Cluster Agent で `clusterAgent.admissionController.mutateUnlabelled` (または `DD_ADMISSION_CONTROLLER_MUTATE_UNLABELLED`) を `true` に設定すると、このポッドラベルがなくても挿入設定を有効にすることが可能です。

構成方法の詳細については、[Datadog Admission Controller のページ][1]をご覧ください。

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
  containers:
  -  ...
```

### ステップ 2 - ライブラリ挿入のためにポッドにアノテーションを付ける

ライブラリ挿入用のポッドを選択するには、ポッドの仕様で、アプリケーション言語に対応する以下のアノテーションを付けます。

| 言語   | ポッドアノテーション                                              |
|------------|-------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<lib-version>"`   |
| JavaScript | `admission.datadoghq.com/js-lib.version: "<lib-version>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<lib-version>"` |

利用可能なライブラリのバージョンは、各コンテナレジストリに記載されています。

<div class="alert alert-warning"><strong>注</strong>: <code>最新の</code>タグを使用することはサポートされていますが、主要なライブラリのリリースでは、壊れるような変更が導入されることがあるので、注意して使用してください。</div>

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    ...
...
template:
  metadata:
    labels:
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Java インスツルメンテーション (バージョン0.114.0) 挿入を有効にします
  containers:
  -  ...
```

### ステップ 3 - 統合サービスタグ付けによるポッドへのタグ付け

[統合サービスタグ付け][14]を使用すると、Datadog のテレメトリーを結びつけ、一貫したタグでトレース、メトリクス、ログをシームレスにナビゲートすることができます。デプロイメントオブジェクトとポッドテンプレートの両方の仕様に、統合サービスタグ付けを設定します。
以下のラベルを使用して、統合サービスタグを設定します。

```yaml
...
    metadata:
        labels:
            tags.datadoghq.com/env: "<ENV>"
            tags.datadoghq.com/service: "<SERVICE>"
            tags.datadoghq.com/version: "<VERSION>"
...
```

**注**: ユニバーサルサービスタグ付けに必要な環境変数 (`DD_ENV`、`DD_SERVICE`、`DD_VERSION`) をポッドテンプレートの仕様で設定する必要はありません。これは、Admission Controller がライブラリにタグ値を挿入する際に環境変数として伝搬させるためです。

例:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    tags.datadoghq.com/env: "prod" # 統合サービスタグ - デプロイメント環境タグ
    tags.datadoghq.com/service: "my-service" # 統合サービスタグ - デプロイメントサービスタグ
    tags.datadoghq.com/version: "1.1" # 統合サービスタグ - デプロイメントバージョンタグ
...
template:
  metadata:
    labels:
        tags.datadoghq.com/env: "prod" # 統合サービスタグ - ポッド環境タグ
        tags.datadoghq.com/service: "my-service" # 統合サービスタグ - ポッドサービスタグ
        tags.datadoghq.com/version: "1.1" # 統合サービスタグ - ポッドバージョンタグ
        admission.datadoghq.com/enabled: "true" # Admission Controller を有効にしてこのデプロイメントに含まれる新しいポッドを変異させます
    annotations:
        admission.datadoghq.com/java-lib.version: "v0.114.0" # Java インスツルメンテーション (バージョン0.114.0) 挿入を有効にします
  containers:
  -  ...
```

### ステップ 4 - 構成を適用する

新しい構成が適用されると、ポッドはインスツルメンテーションを受ける準備が整います。

<div class="alert alert-warning">ライブラリは新しいポッドにのみ挿入され、実行中のポッドには影響を与えません。</div>

## ライブラリ挿入が成功したことを確認する

ライブラリ挿入は、ポッド内の専用 `init` コンテナの挿入を利用します。
挿入が成功すると、ポッド内に `datadog-lib-init` という `init` コンテナが作成されるのが確認できます。

{{< img src="tracing/trace_collection/datadog-lib-init-container.jpg" alt="ポッド内の init コンテナを表示した Kubernetes 環境の詳細ページ。">}}

または、`kubectl describe pod <my-pod>` を実行すると、`datadog-lib-init` init コンテナがリストアップされます。

インスツルメンテーションは、Datadog へのテレメトリーの送信も開始します (例えば、[APM][15] へのトレースなど)。

## ライブラリの構成

トレーシングライブラリのサポートされる機能や構成オプションは、他のインストール方法と同様に、ライブラリ挿入でも環境変数で設定することが可能です。詳しくは、お使いの言語の [Datadog ライブラリの構成ページ][16]をお読みください。



[1]: /ja/containers/cluster_agent/admission_controller/
[2]: /ja/tracing/trace_collection/
[3]: https://kubernetes.io/docs/reference/access-authn-authz/admission-controllers/
[4]: /ja/containers/kubernetes/installation/?tab=helm
[5]: http://gcr.io/datadoghq/dd-lib-java-init
[6]: http://hub.docker.com/r/datadog/dd-lib-java-init
[7]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[8]: http://gcr.io/datadoghq/dd-lib-js-init
[9]: http://hub.docker.com/r/datadog/dd-lib-js-init
[10]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[11]: http://gcr.io/datadoghq/dd-lib-python-init
[12]: http://hub.docker.com/r/datadog/dd-lib-python-init
[13]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[14]: /ja/getting_started/tagging/unified_service_tagging/
[15]: https://app.datadoghq.com/apm/traces
[16]: /ja/tracing/trace_collection/library_config/