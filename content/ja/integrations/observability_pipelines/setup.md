---
dependencies:
- https://github.com/DataDog/documentation/blob/master/content/en/integrations/observability_pipelines/setup.md
further_reading:
- link: /integrations/observability_pipelines/vector_configurations/
  tag: ドキュメント
  text: Vector の構成の詳細
- link: https://vector.dev/docs/setup/going-to-prod/
  tag: ドキュメント
  text: 観測可能性パイプラインのキャパシティプランニングを行い、本番に移行する
- link: https://vector.dev/releases/
  tag: ドキュメント
  text: Vector の新リリースをチェックする
- link: https://vector.dev/docs/reference/configuration/sources/datadog_agent/
  tag: ドキュメント
  text: Vector のソースとなる Datadog Agent
- link: /agent/vector_aggregation/
  tag: ドキュメント
  text: Vector アグリゲーターにデータを送信するための Datadog Agent の構成
kind: ドキュメント
title: 観測可能性パイプラインを設定する
---

## 概要

観測可能性パイプラインは、オープンソースの [Vector][1] プロジェクトと接続し、インフラストラクチャー全体のログ、メトリクス、トレースのフローを管理および監視することができます。

観測可能性パイプラインの設定は、まず [Vector のインストール](#install-vector)と [Vector の設定](#set-up-vector-configurations)を行い、Datadog API を使って [Vector の構成を観測可能性パイプラインに接続する](#connect-vector-to-observability-pipelines)ことが必要です。

## Vector のインストール

### クイックスタート

#### ターミナル
ターミナルで以下の OS に依存しないコマンドを実行すると、Vector の設定方法が表示されます。

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash
```

#### コンテナ
コンテナ型の本番環境では、以下のコマンドを実行し、Vector をダウンロード、インストールします。

```
curl --proto '=https' --tlsv1.2 -sSf https://sh.vector.dev | bash -s -- -y
```

また、[パッケージマネージャー](#using-package-managers)や[特定のプラットフォームやオペレーティングシステム](#specific-platforms-and-operating-systems)に基づいて、Vector をインストールすることもできます。

`vector --version` コマンドを実行し、インストールが成功したことを確認します。

### パッケージマネージャーの使用

Vector は、様々な OS やプラットフォームに対応したパッケージマネージャーを幅広くサポートしています。お好みのパッケージマネージャーを使用して Vector をインストールしてください。

- [APT][2]
- [dpkg][3]
- [Helm][4]
- [Homebrew][5]
- [MSI][6]
- [Nix][7]
- [RPM][8]
- [YUM][9]

### 特定のプラットフォームやオペレーティングシステム

多くのユーザーは [Kubernetes プラットフォームへのインストール][10]を選択しますが、Vector は以下のプラットフォームや OS にインストールすることが可能です。

- [Docker][11]
- [Kubernetes][10]
- [Amazon Linux][12]
- [CentOS][13]
- [Debian][14]
- [NixOS][15]
- [RHEL][16]
- [Raspbian][17]
- [Ubuntu][18]
- [Windows][19]
- [macOS][20]

より詳細な、プラットフォーム別の手順については、[Vector のドキュメント][21]を参照してください。

## Vector のコンフィギュレーションを設定する

Vector トポロジーは、データの収集、変換、ルーティングの方法を指示するコンフィギュレーションファイルによって定義されます。Vector トポロジーは、ソース、トランスフォーム、シンクの 3 種類のコンポーネントで構成されています。

Vector の構成は TOML、YAML、JSON をサポートしています。Vector のコンフィギュレーションファイルの場所はインストール方法によって異なりますが、ほとんどの Linux ベースのシステムでは、ファイルは `/etc/vector/vector.toml` で見つけることができます。

Vector の構成が完了している場合は、[Vector と観測可能性パイプラインの接続](#connect-vector-to-observability-pipelines)に進んでください。

### 構成例

例として簡単なパイプラインを設定するために、`vector.yaml` というコンフィギュレーションファイルを以下のように作成します。

```
sources:
  in:
    type: stdin
sinks:
  out:
    inputs:
      - in
    type: console
    encoding:
      codec: text
```

Vector コンフィギュレーションファイルは、複数の Vector コンポーネントを含むことができます。各コンポーネントには、コンポーネントの種類を示すプレフィックスが付き、一意の ID を持ちます。この例では、最初のコンポーネントに `sources` があり、ID が `in` のソースコンポーネントを使用しています。このコンポーネント `sources.in` は `stdin` ソースを使用しており、Vector に `stdin` 経由でデータを受信するように指示しています。

2 つ目のコンポーネント `sinks.out` はコンソールシンクを使用し、データを標準出力にプリントするように Vector に指示します。`encoding.codec` オプションは、データをプレーンテキスト (エンコードされていない状態) で表示するように Vector に指示します。

`sinks.out` コンポーネントの `inputs` オプションは、このシンクのイベントがどこから来るのかを Vector に知らせます。この場合、イベントはもう 1 つのコンポーネントである `sources` の ID `in` から受け取ります。

コマンド `vector --config ./vector.yaml` を実行し、コンフィギュレーションファイルとともに Vector を起動します。

次のコマンドを実行すると、`Hello world!` という 1 つのイベントが構成にパイプされます。

`echo 'Hello world!' | vector --config ./vector.yaml`

Vector の 3 大構成要素であるソース、トランスフォーム、シンクの設定例については、[Vector の構成][22]を参照してください。

## Vector と観測可能性パイプラインの接続

以下の手順で、Vector の構成を観測可能性パイプラインに接続します。

- Datadog で、まだ持っていない場合は、[サービスアカウントを作成します][23]。サービスアカウントは、Vector と観測可能性パイプラインを接続するために必要なアプリケーションキーを生成するために必要です。
- [Observability Pipelines][24] に進みます。
- **Create Configuration** をクリックし、アプリ内の説明に従って構成の設定を行います。

設定が完了すると、Vector は観測可能性パイプラインに接続され、データは Datadog アプリに表示されます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/vectordotdev/vector
[2]: https://vector.dev/docs/setup/installation/package-managers/apt/
[3]: https://vector.dev/docs/setup/installation/package-managers/dpkg/
[4]: https://vector.dev/docs/setup/installation/package-managers/helm/
[5]: https://vector.dev/docs/setup/installation/package-managers/homebrew/
[6]: https://vector.dev/docs/setup/installation/package-managers/msi/
[7]: https://vector.dev/docs/setup/installation/package-managers/nix/
[8]: https://vector.dev/docs/setup/installation/package-managers/rpm/
[9]: https://vector.dev/docs/setup/installation/package-managers/yum/
[10]: https://vector.dev/docs/setup/installation/platforms/kubernetes/
[11]: https://vector.dev/docs/setup/installation/platforms/docker/
[12]: https://vector.dev/docs/setup/installation/operating-systems/amazon-linux/
[13]: https://vector.dev/docs/setup/installation/operating-systems/centos/
[14]: https://vector.dev/docs/setup/installation/operating-systems/debian/
[15]: https://vector.dev/docs/setup/installation/operating-systems/nixos/
[16]: https://vector.dev/docs/setup/installation/operating-systems/rhel/
[17]: https://vector.dev/docs/setup/installation/operating-systems/raspbian/
[18]: https://vector.dev/docs/setup/installation/operating-systems/ubuntu/
[19]: https://vector.dev/docs/setup/installation/operating-systems/windows/
[20]: https://vector.dev/docs/setup/installation/operating-systems/macos/
[21]: https://vector.dev/docs/setup/installation/
[22]: /ja/integrations/observability_pipelines/vector_configurations
[23]: https://app.datadoghq.com/organization-settings/service-accounts/new
[24]: https://app.datadoghq.com/observability-pipelines