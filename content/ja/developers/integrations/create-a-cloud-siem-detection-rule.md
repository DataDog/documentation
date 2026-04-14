---
aliases:
- /ja/developers/integrations/create-an-integration-detection-rule
description: インテグレーション用の Cloud SIEM 検出ルールを作成する方法をご紹介します。
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/detection_rules
  tag: ドキュメント
  text: ログ検出ルール
title: クラウド SIEM 検出ルールの作成
---

## 概要

このガイドでは、Cloud SIEM 検知ルールの作成手順と、ルール構成のベスト プラクティスの概要を示します。

[Datadog Cloud SIEM (セキュリティ情報およびイベント管理)][1] は、1 つのプラットフォームで開発、運用、セキュリティ チームを統合します。Datadog は、多くの機能やインテグレーション向けに、標準の検知ルール セットを提供しています。これらのルールは [SIEM 検知ルール一覧][2] で確認できます。

Datadog Cloud SIEM の検知ルールは、インテグレーションに追加でき、インストール後すぐに使用できる標準コンテンツです。

Datadog インテグレーションを作成するには、[新しいインテグレーションの設定][3]を参照してください。

## 検出ルールを作成
### 検知ルールを作成する
ユーザーのセキュリティ インサイトを高めるために、パートナーは Datadog インテグレーションの一部として独自の標準検知ルールを作成できます。検知ルールは、インテグレーションの標準アセットとして追加できます。

Datadog サンドボックスで、[新しいルールを作成][4] します。

{{< img src="developers/integrations/detection_rule.png" alt="Datadog の Detection Rules エリアにある Create a New Rule ページ" style="width:100%;" >}}

このガイドで示されている [ベスト プラクティス](#configuration-best-practices) に従って、検知ルールを構成します。

### 検知ルールをアップロードする

Integration Developer Platform のインテグレーション内で、Content タブに移動します。ここから **Import Detection Rule** を選択し、利用可能な検知ルールの一覧から選びます。インテグレーションに含められる検知ルールは最大 10 個まで選択できます。

{{< img src="developers/integrations/content_tab.png" alt="Developer Platform の Content タブ" style="width:100%;" >}}


## 本番環境で検知ルールを検証する

標準検知ルールを表示するには、Datadog で該当のインテグレーション タイルが `Installed` になっており、Cloud SIEM が有効化されている必要があります。

1. [Detection Rules list][2] で自分の検知ルールを見つけ、クリックして展開します。
2. ロゴが正しく表示されることを確認します。
3. ルールが有効になっていることを確認します。

### 適切に定義された検知ルールの例

ルール タイプの選択と検索クエリの定義:

{{< img src="developers/integrations/SIEM_detection_rule_top.png" alt="入力済みの検知ルール作成フォームの手順 1-3" style="width:90%;" >}}

ルール ケースの設定と通知メッセージの作成:

{{< img src="developers/integrations/SIEM_detection_rule_bottom.png" alt="入力済みの検知ルール作成フォームの手順 4 と 5" style="width:90%;" >}}

詳細については、[検知ルールの構成][7] に関するドキュメントを参照してください。

## 検証メッセージの理解

### ルール JSON の解析
```
File=<FILE_PATH> in collection=<COLLECTION> is an invalid JSON: error=<ERROR>
```
このエラーは、`<FILE_PATH>` にある JSON が無効な JSON と見なされたことを意味します。

### ルール ID/ルール名
```
partnerRuleId is empty for rule name="<RULE_NAME>" - partnerRuleId=<NEW_RULE_ID> is available
```
`partnerRuleId` は各ルールに必須ですが、欠落しています。生成された `<NEW_RULE_ID>` を使用してください。

```
partnerRuleId=<RULE_ID> is in the incorrect format for rule name="<RULE_NAME>", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId=<NEW_RULE_ID> is available
```
ルール名の形式が正しくありません。生成された `partnerRuleId: <NEW_RULE_ID>` を使用して問題を修正してください。

```
Duplicate partnerRuleId=<RULE_ID> for rule name="<RULE_NAME>" - <RULE_ID_KEY> must be unique and it is already used in rule_ids="<RULE_IDS>" - <RULE_ID_KEY>=<NEW_RULE_ID> is available
```
各 `partnerRuleId` は一意である必要があります。現在の ID はすでに使用されています。新しく生成された `partnerRuleId` を使用してください。

```
Duplicate name="<RULE_NAME>" for <RULE_ID_KEY>=<RULE_ID> - name must be unique.
```
各ルール名は一意である必要があります。現在の名前はすでに使用されています。ルール名を一意になるよう更新してください。

### MITRE タグ
```
The rule with partnerRuleId=<RULE_ID> contains a MITRE tag tactic but it does not contain the tag `security:attack`, please add it
```
ルールに MITRE タグ `tactic:<TAG_VALUE>` が含まれている場合、タグ一覧に `security:attack` を追加する必要があります。

```
The MITRE tactic/technique tag=<TAG> for partnerRuleId=<RULE_ID> appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
記載されている tactic/technique タグ `<TAG>` は [MITRE フレームワーク](https://attack.mitre.org/) に準拠していません。有効な MITRE タグを選択してください。

### ケース
```
The case status <CASE_STATUS> for <RULE_ID_KEY>=<RULE_ID> is incorrect, it should be one of <STATUS_LIST>.
```
ケースのステータスは `CRITICAL` 、 `HIGH` 、 `MEDIUM` 、 `LOW` 、または `INFO` のいずれかである必要があります。

```
The case ordering for partnerRuleId=<RULE_ID> is incorrect, please modify to order cases from the highest severity to the lowest.
```
各ルール定義は重大度の高い順に並んでいる必要があります。ケースを `CRITICAL` 、 `HIGH` 、 `MEDIUM` 、 `LOW` 、 `INFO` の順に並べ替えてください。

### ソース タグ
```
source=<SOURCE> in the tags of the rule with partnerRule=<RULE_ID> is not supported by Datadog documentation.
```
この問題の解決については Datadog にお問い合わせください。

### ルール コンテンツの検証/ルールの更新
```
<RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>" - error=<ERROR>
```
この問題の解決については Datadog にお問い合わせください。

```
Internal failure for <RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>"- Contact Datadog Team
```
この問題の解決については Datadog にお問い合わせください。


## 関連情報

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ja/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/ja/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/ja/security/cloud_siem/detection_rules