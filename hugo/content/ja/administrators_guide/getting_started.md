---
description: 新しい Datadog のインストールを開始するための戦略を学びます。
further_reading:
- link: /getting_started/support/
  tag: ドキュメント
  text: Datadog サポートの概要
title: はじめに
---
## 概要 {#overview}

この「はじめに」ガイドでは、組織で Datadog を効果的に実装するための戦略を紹介します。サポートのためのリソース、知識を深めるためのラーニングセンターコース、テスト環境をセットアップするための手順を確認できます。

## ヘルプの利用 {#getting-help}

### セルフサービスリソース {#self-service-resources}

このガイドを進めるにあたり、以下のセルフサービスリソースを参照できます。

* [Datadog トレーニング](#learn-datadog-basics) コース。
* Datadog [ドキュメント][16] (特に [はじめに][17] ページ) を参照して、プラットフォームについてさらに理解を深めることができます。 
* [Datadog UI][18] では、コンテキストに応じたヘルプ、特定の構成フィールドに関する情報、リリースノート、その他のリソースが提供されます。アプリ全体、または製品ナビゲーションの下部にある <kbd>?</kbd>アイコンをクリックしてください。

{{< img src="/administrators_guide/help_center.png" alt="Datadog UI のヘルプセンターのスクリーンショット" style="width:90%;">}} 

### サポートチケットをファイルする {#file-a-support-ticket}

問題が発生した際にサポートを受けるには、以下を参照してください。

* [**Datadog Support**][20]: 困難な問題の解決、インストールのガイド、ローカル環境に合わせた問題の解釈、バグの特定、および機能リクエストのログでサポートします。
* [**Datadog Agent フレア**][21]: この CLI ツールは、自動的に新しいサポートチケットを作成し、関連するログファイル (機密情報を除外)、デバッグレベル設定、およびローカル構成の圧縮ファイルを Datadog support に送信します。ログインは不要です。フレアの使用方法と Datadog サポートへの送信方法については、[フレアの送信][21] を参照してください。 
* [**Fleet Automation**][5]: プラットフォーム UI からリモートでフレアを生成できます。

## Datadog の基礎知識を学ぶ {#learn-datadog-basics}

ご自身のユースケースにとって最も重要な Datadog の機能についての理解を深めましょう。まずは、無料の [ラーニングセンター][1] コースに登録してください。以下のコースをオンボーディングワークフローに組み込んでください。

**はじめに**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog Foundation{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}タグ付けのベストプラクティス{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}カタログの管理{{< /nextlink >}}
{{< /whatsnext >}}

**管理者**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}ホスト上の Agent{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Kubernetes クラスターの監視{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: 自動化と Infrastructure as Code{{< /nextlink >}}
{{< /whatsnext >}} 

**ユーザーインターフェイス**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}ダッシュボードの紹介{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}グラフウィジェットの発見{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}ダッシュボードおよび SLO の使用{{< /nextlink >}}
{{< /whatsnext >}}

**サイト信頼性エンジニア**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog の基本: サイト信頼性エンジニア{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM モニターとアラート{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}コアウェブバイタルを追跡するための Datadog RUM の使用{{< /nextlink >}}
{{< /whatsnext >}}

**開発者**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Java アプリケーション用の APM を設定する{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog の基本: 開発者{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}JavaScript Web Applications の RUM を使用したエラーの追跡{{< /nextlink >}}
{{< /whatsnext >}}

## テスト環境を作成する {#create-a-test-environment}

いくつかのコースを修了したら、学んだことを実際の環境に適用してください。低リスクのサンドボックス環境で Datadog をインストールして試し、環境に慣れてください。より広範なインストールを行う前に、監視設定を開発するためのシンプルでアクセスしやすい環境を作成してください。

### テスト環境の構成 {#configuring-your-test-environment}

#### アプリ内 {#in-app}

[Datadog UI][18] は、テスト環境の構築を開始する上で最適な場所です。このプラットフォームでは、構成支援、ライブデータの自動パーサー、コンテキストに応じた提案など、多くのツールが提供されています。Datadog UI では、これらのタスクの一部を完了するために役立つリソースが提供されています。

いくつかの例を以下に示します。

* [Synthetic Monitoring テスト][14] を作成して、アプリケーションで重要なビジネストランザクションのテストを開始します。
* いくつかの [Service Level Objectives][15] (SLO) を作成して、アプリケーションパフォーマンスの目標を定義します。
* [APM Service Setup][9] ページを確認し、ステップバイステップの手順に従ってサービスのインスツルメンテーションを開始します。
* [Log Pipelines][8] を構成およびテストして、インフラストラクチャーやアプリケーションから送信されるさまざまなログセットの取り込み方法を決定します。
* [Monitor Templates][10] ページを確認して、テスト環境へのアラートの追加を開始します。

#### Agent 構成テンプレートをホストする {#host-agent-config-templates}

[Datadog Agent][2] はオープンソースであり、GitHub で公開されています。Agent GitHub リポジトリは、環境の構築を支援するための構成テンプレートや仕様を確認する上で役立つリソースです。

いくつかの例を以下に示します。

* [Agent Config Examples][3]
* [Integration Config Specs][4]   
* [Fleet Automation][5]

## 次のステップ {#next-steps}

新しい Datadog のインストールを正常に完了するには、[プラン][11] ページを確認してください。スコーピング演習の作成方法、[リソースのタグ付け][12] の設定、製品のベストプラクティス、製品の追加、スムーズなインストールを実現するためのデータ収集の最適化について学びます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/tree/main/pkg/config/example
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /ja/getting_started/tagging/unified_service_tagging/
[7]: /ja/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/templates
[11]: /ja/administrators_guide/plan
[12]: /ja/administrators_guide/plan/#resource-tagging
[13]: https://github.com/DataDog/datadog-agent/tree/main/examples
[14]: https://app.datadoghq.com/synthetics/tests
[15]: https://app.datadoghq.com/slo/manage
[16]: https://docs.datadoghq.com
[17]: /ja/getting_started
[18]: https://app.datadoghq.com
[19]: /ja/bits_ai/
[20]: /ja/help
[21]: /ja/agent/troubleshooting/send_a_flare/?tab=agent