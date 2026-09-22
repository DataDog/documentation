---
aliases:
- /ja/security/vulnerability_pipeline/security_inbox
further_reading:
- link: /security/security_inbox
  tag: ドキュメント
  text: Security Inbox
- link: /security/automation_pipelines
  tag: ドキュメント
  text: 自動化パイプライン
products:
- icon: cloud-security-management
  name: Cloud Security
  url: /security/cloud_security_management/
- icon: security-code-security
  name: Code Security
  url: /security/code_security/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
- icon: security-workload-security
  name: Workload Protection
  url: /security/workload_protection/
title: Security Inbox のルールに追加
---
{{< product-availability >}}

受信トレイルールを設定して Security Inbox を効果的に管理し、最も関連性の高いセキュリティ問題のみが強調表示されるようにします。条件をカスタマイズすることで、重要な懸念事項に集中し、主要なリスクに優先順位を付け、コンプライアンスをサポートし、見過ごされがちな問題に注意を向けることができます。

## デフォルトの受信トレイルール {#default-inbox-rules}

Datadog は、Datadog Security Research チームが作成したデフォルトの Security Inbox ルールを提供しており、これらは [Security Inbox][3] に自動的に追加されます。これらのルールは、一般的な環境において実際のリスクを表す可能性が最も高い検知結果を対象としています。

デフォルトのルールは、[Findings Automation][2] ページで独自のルールと並んで表示されます。組織のトリアージ方法と一致しない場合はデフォルトのルールを無効にすることができ、デフォルトでカバーされていないケースを補うために独自のルールを追加することもできます。

## Security Inbox ルールの作成 {#create-an-inbox-rule}

1. Datadog で、**Security** > **Settings** > [Findings Automation][2] に移動します。**Add a New Rule** をクリックし、**Security Inbox への追加**を選択します。[Create a New Rule] ページが開きます。
1. Under **Rule name** に、ルールの説明的な名前を入力します (例:「Cloud インフラストラクチャー 異常警告」)。
1. 以下のフィールドにルール条件を追加します。
    - **Any of these types**: ルールがチェックする検知結果のタイプ。利用可能なタイプは以下のとおりです。
      - Runtime Code Vulnerability
      - Static Code Vulnerability
      - Library Vulnerability
      - Secrets (Code)
      - Infrastructure as Code
      - コンテナイメージの脆弱性
      - ホストの脆弱性
      - 誤構成
      - 攻撃パス
      - アイデンティティリスク
      - API セキュリティ
      - ワークロードアクティビティ
    - **これらのタグまたは属性のいずれか**: ルールを適用するために一致する必要があるリソースタグまたは属性。
1. ルールに重大度基準を追加するには、**重大度の追加**をクリックします。
1. **Save** をクリックします。このルールは新しい検知結果に直ちに適用され、既存の検知結果に対しては 1 時間以内にチェックを開始します。

## ルールの一致順序 {#rule-matching-order}

Datadog が検知結果を特定すると、その検知結果を Security Inbox ルールのシーケンスに沿って評価します。最初のルールから順に確認し、一致するものがあれば、Datadog はその検知結果を Security Inbox に追加し、それ以降の評価を停止します。一致するものがない場合、Datadog は次のルールに進みます。このプロセスは、一致が見つかるか、すべてのルールがチェックされ、一致するものがなくなるまで続きます。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[2]: https://app.datadoghq.com/security/configuration/findings-automation?opened-sections=add_to_inbox
[3]: /ja/security/security_inbox/