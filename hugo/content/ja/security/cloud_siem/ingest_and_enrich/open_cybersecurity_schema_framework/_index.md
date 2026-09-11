---
aliases:
- /ja/security/cloud_siem/open_cybersecurity_schema_framework
disable_toc: false
further_reading:
- link: logs/processing/pipelines
  tag: ドキュメント
  text: ログ処理パイプライン
- link: https://www.datadoghq.com/blog/cloud-siem-ocsf-processor
  tag: ブログ
  text: Datadog の OCSF プロセッサーを使用して Cloud SIEM のログを正規化します。
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: 'Datadog Cloud SIEM: セキュリティ運用におけるイノベーションの推進'
- link: https://www.datadoghq.com/blog/ocsf-common-data-model/
  tag: ブログ
  text: Datadog Cloud SIEM で OCSF 共通データモデルを使用してデータを正規化します。
- link: https://www.datadoghq.com/blog/cloud-siem-claude-compliance-api-integration/
  tag: ブログ
  text: Datadog Cloud SIEM で Claude Enterprise のアクティビティを監視します。
title: Datadog における Open Cybersecurity Schema Framework (OCSF) 共通データモデル
---
## 概要{#overview}

Cloud SIEM は、クラウドサービス、ファイアウォール、ネットワーク、アプリケーション、IT システムなど、幅広いソースからデータを収集および分析します。これらのサービスは異なる形式でデータを出力するため、有意義な脅威分析を行う前にログを正規化して準備するには、多大な労力が必要になることがよくあります。

Open Cybersecurity Schema Framework (OCSF) は、セキュリティイベントデータを整理および分類するためのオープンソースのベンダー中立な標準です。これは、プラットフォームや製品間でセキュリティログの構造を簡素化および統一するように設計されており、一貫した脅威検知と迅速な調査を可能にします。

Datadog では、OCSF サポートが Datadog Cloud SIEM に直接統合されているため、手動で構成することなく標準化および正規化されたログデータを取得できます。受信したセキュリティログは、すぐに使える (OOTB) パイプラインを通じて、取り込み時に OCSF 準拠の属性で自動的にエンリッチされます。すべての OCSF 値は専用の `OCSF` 属性に含まれており、ログを変換およびエンリッチする他のプロセスに加えて適用されます。OCSF をサポートする Log Management インテグレーションのリストについては、[サポートされているすぐに使える OCSF パイプライン](#supported-out-of-the-box-ocsf-pipelines)を参照してください。

Datadog の Cloud SIEM における OCSF 統合により、以下が可能になります。

* **検知ルールの簡素化**: 属性構造が統一されているため、検知ロジックを一度記述すれば複数のソースに適用できます。
* **調査の効率化**: 1 つのスキーマでプロバイダー全体にわたる単一クエリでのトリアージが可能になるため、アナリストはソース固有の形式を覚える必要がなくなります。
* **クロスソース相関**: 検知ロジックで、異なるサービス間 (例: フィッシングと権限昇格) のイベントを相関させることができます。
* **スケーラブルな統合メンテナンス**: OCSF を使用すると、新しいデータソースが追加されても、一貫したスキーマ要件を維持できます。

## OCSF モデル {#ocsf-model}

セキュリティデータを正規化するために、OCSF は以下のコンポーネントに基づいてデータを再マッピングします。

1. [データ型、属性、オブジェクト、および配列](#data-types-attributes-objects-and-arrays)
1. [イベントクラスとカテゴリ](#event-categories-and-classes)
1. [プロファイル](#profiles)
1. [拡張機能](#extensions)

### データ型、属性、オブジェクト、および配列 {#data-types-attributes-objects-and-arrays}

データ型、属性、オブジェクト、および配列は、OCSF モデルの主要な構成要素です。

| 名前 | 説明 |
| ---- | ----------- |
| データ型 | データ型は、データ要素を整数、文字列、浮動小数点数、およびブール値として定義します。 |
| 属性 | 属性は、フレームワークの構成要素です。これらは、ソースに関係なく、データに共通の言語を提供するために使用されます。すべての属性のリストについては、[属性辞書][1]を参照してください。 |
| オブジェクト | オブジェクトは、プロセス、デバイス、ユーザー、マルウェア、ファイルなどのエンティティを表す、関連する属性の集合です。 |
| 配列 | 配列は、複合型を含むあらゆるデータ型をサポートします。 |

### イベントカテゴリとクラス {#event-categories-and-classes}

OCSF モデル内のセキュリティイベントはカテゴリに分類されます。カテゴリは、データ型に基づいてイベントを分類する大まかなグループです。詳細および利用可能なカテゴリのリストについては、[OCSF カテゴリ][2]を参照してください。カテゴリは、さらにイベントクラスに分類されます。たとえば、「Identity & Access Management」カテゴリには [6 つのクラス][3]があります。詳細については、[OCSF イベントクラス][4]を参照してください。

### プロファイル {#profiles}

プロファイルは、イベントクラスやそれを参照するオブジェクトに任意でオーバーレイできる属性のクラスです。既存のイベントクラスに追加情報を提供するもので、イベントカテゴーリとは独立しています。プロファイルの一覧については [OCSF プロファイル][5]を、詳細については [OCSF プロファイルのドキュメント][6]を参照してください。

### 拡張機能 {#extensions}

OCSF スキーマには、新しい属性、オブジェクト、カテゴリ、プロファイル、イベントクラスなどの拡張機能を任意で追加できます。詳細については、[OCSF 拡張機能][7]を参照してください。

## サポートされているすぐに使える OCSF パイプライン {#supported-out-of-the-box-ocsf-pipelines}

以下の Log Management インテグレーションは、すぐに使用できる OCSF パイプラインをサポートしています。

{{% cloud-siem-supported-ocsf %}}

## Security Pipelines \- OCSF の表示 {#view-security-pipelines-ocsf}

Cloud SIEM OCSF は、Log Management の[インテグレーションパイプライン][8]内のログデータを再マッピングします。詳細については、[サポートされているすぐに使える OCSF パイプライン](#supported-out-of-the-box-ocsf-pipelines)を参照してください。

ソースのインテグレーションパイプラインライブラリを表示するには、次の手順を実行します。

1. [Logs Pipelines][9] に移動します。
1. [{{< ui >}}Browse Pipeline Library{{< /ui >}}] をクリックします。
1. 目的のインテグレーション (例: Okta) を検索してクリックします。
1. Okta の OCSF パイプラインを表示するには、Okta インテグレーションのプロセッサー一覧の最後までスクロールします。

ソースインテグレーションの読み取り専用 OCSF パイプラインを表示するには、次の手順を実行します。
1. [Logs Pipelines][9] に移動します。
1. パイプラインを選択します。
1. パイプラインのプロセッサーの最後にある OCSF パイプラインまでスクロールします。
1. OCSF パイプラインをクリックして、関連付けられているリマッププロセッサーを表示します。
1. OCSF パイプラインの目のアイコンをクリックして、次のような情報を表示します。
    - OCSF スキーマバージョン
    - クラス
    - プロファイル

**注**: インパイプラインを複製すると、OCSF パイプラインはセキュリティパイプラインではなくログパイプラインに変換されます。

## ログ内の OCSF データを表示 {#view-ocsf-data-in-logs}

ログ内の OCSF データを表示するには、次の手順を実行します。
1. [Logs Explorer][10] に移動します。
1. ログの検索を入力します。
1. ログをクリックします。
1. サイドパネルを下にスクロールして、ocsf JSON 属性まで移動すると、OCSF データを確認できます。

## 関連資料{#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/ocsf/ocsf-schema/blob/4a8ad2fa4a1908f1cad2cbf331a1b49efd5001c2/dictionary.json
[2]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#categories
[3]: https://schema.ocsf.io/1.4.0/categories/iam?extensions=
[4]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#event-classes
[5]: https://schema.ocsf.io/1.4.0/profiles
[6]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#profiles
[7]: https://github.com/ocsf/ocsf-docs/blob/main/overview/understanding-ocsf.md#extensions
[8]: /ja/logs/log_configuration/pipelines/?tab=source#integration-pipelines
[9]: https://app.datadoghq.com/logs/pipelines
[10]: https://app.datadoghq.com/logs