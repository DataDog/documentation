---
description: シーケンス検知メソッドの仕組みについて学びます。
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/cloud-siem-enterprise-security
  tag: ブログ
  text: Datadog Cloud SIEM：セキュリティ運用におけるイノベーションの推進
title: シーケンス
---
## 概要 {#overview}

シーケンスメソッドを使用すると、初期アクセス、権限昇格、データ流出など、関連するイベントの順序付けられたパターンを特定することで、多段階攻撃を検知できます。

ユーザー、ホスト、IPアドレスなどの関連エンティティ間で、定義された時間枠内に発生する必要がある一連のステップを定義できます。各シーケンスは、複数のログやシグナルからの条件を組み合わせて、個別のルールでは見逃される可能性のある調整されたアクティビティを特定できます。

シーケンスルールの設定方法については、[ルールを作成][1]を参照してください。

{{< img src="security/security_monitoring/detection_rules/sequence/preview.png" alt="ステップのプレビューが表示されているシーケンスエディターページ" style="width:100%;" >}}

## シーケンスメソッドの仕組み {#how-the-sequence-method-works}

### 検知ロジック {#detection-logic}

{{< img src="security/security_monitoring/detection_rules/sequence/steps.png" alt="3つのステップが表示されているシーケンスエディターページ" style="width:100%;" >}}

シーケンス検知は、不審な行動の明確なステージを表す一連の定義されたステップを評価します。各ステップは以下に対応しています。

- ログクエリのしきい値やシグナルの一致などの条件
- ステップ間の順序と時間制約を定義する遷移

すべてのステップが指定された順序で、設定された時間枠内に発生すると、ルールがトリガーされます。

### エンティティのリンク {#linking-entities}

{{< img src="security/security_monitoring/detection_rules/sequence/linked_entities.png" alt="「グループ化」フィールドが強調表示されたステップを示すシーケンスエディターページ" style="width:100%;" >}}

ステップのシーケンスは、ユーザー、アカウント、IPアドレス、その他のフィールド間で相関させることができ、`group by` フィールドを通じてリンクされたエンティティを自動的に追跡します。これにより、攻撃者が異なるIDやシステムを横断する経路を追跡できます。

### 評価ウィンドウ {#evaluation-window}

{{< img src="security/security_monitoring/detection_rules/sequence/evaluation_window.png" alt="評価ウィンドウが強調表示されたシーケンスエディターページ" style="width:100%;" >}}

ステップ間の各遷移には、ルールが次のステップの発生を待機する時間を決定する構成可能な評価ウィンドウがあります。たとえば、ルールは `user login from an unusual location` の後に 20 分以内に `privilege escalation` が続いた場合にトリガーされる可能性があります。この場合、ユーザーは標準ロールから管理者ロールに移行した可能性があります。

## 構成オプション {#configuration-options}

[シーケンス検出ルールを作成][1]する際、これらのオプションを構成できます。

| 設定 | 説明 | 影響 |
|---------|-------------|--------|
| {{< ui >}}Data type{{< /ui >}} | 各クエリがログ、シグナル、ルールのいずれを評価するかを指定します。| 検出のデータソースを定義します。|
| {{< ui >}}Steps{{< /ui >}} | クエリやしきい値など、各検出条件を定義します。| 監視対象の動作を決定します。|
| {{< ui >}}Step transitions{{< /ui >}} | ステップ間の順序と時間的関係を定義します。| シーケンスがシグナルの対象となるタイミングを制御します。|
| {{< ui >}}Evaluation window{{< /ui >}} | ステップが発生した後、次のステップを待機する秒数（秒単位）。| ウィンドウを大きくすると検出範囲は広がりますが、ノイズが増える可能性があります。|
| {{< ui >}}Group by fields{{< /ui >}} | ステップ間でアクティビティをリンクするために使用されるフィールド（例: `@usr.email`、`@ip`）。| クエリ間でエンティティを関連付ける方法を決定します。|

## 制限事項 {#limits}

- シーケンス検出は、ルールごとに最大10ステップ、合計評価ウィンドウ24時間までサポートしています。
- ステップは線形シーケンスである必要があります。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/cloud_siem/detect_and_monitor/custom_detection_rules/create_rule?cloud_siem_detection_rule_detection_method=sequence