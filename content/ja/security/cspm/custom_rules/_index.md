---
further_reading:
- link: security/cloud_security_management/guide/writing_rego_rules
  tag: ガイド
  text: 独自の Rego ルールを作成する
- link: security/default_rules
  tag: ドキュメント
  text: デフォルトの Posture Management クラウド構成検出ルールを調べる
- link: security/cspm/frameworks_and_benchmarks
  tag: ドキュメント
  text: フレームワークおよび業界のベンチマークの詳細
is_beta: true
kind: documentation
title: カスタムルール
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">
このサイトでは、クラウドセキュリティポスチャ管理は利用できません。
</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true">}}
カスタム CSPM ルールの作成と使用はベータ機能であり、一部の Amazon Web Services (AWS)、Microsoft Azure、Google Cloud Platform (GCP) クラウドリソースで利用できます。詳細については、<a href="https://docs.datadoghq.com/security/cspm/custom_rules/schema/">クラウドリソーススキーマのドキュメント</a>を参照してください。新しいクラウドリソースは、ベータ期間中に追加される予定です。
{{< /callout >}} 


## 概要

自分の環境に適用されているルールを拡張してセキュリティポスチャを評価するために、検出ルールを複製してその複製を編集したり、独自のルールをゼロから作成したりすることができます。

## ルールの複製

ルールを複製するには

1. 次のいずれかの方法でコピーしたいルールを探します。
   - [**Security > Posture Management** に移動し、**Detection Rules** をクリックします][1]。コピーしたいルールを選択し、その詳細ページを開きます。
   - [**Security > Posture Management** に移動し、**Findings** をクリックします][2]。所見を選択してその詳細を開き、**Rule** メニューから **Edit Rule** を選択します。
2. 新しいルールのために必要な変更を行います。
3. 詳細ページの一番下までスクロールして、**Clone Rule** をクリックします。

## ルールの作成

ルールを一から作成するには

1. Datadog で、[**Security > Posture Management** に移動し、**Detection Rules** をクリックします][1]。
2. 右上の **New Rule** をクリックします。
3. ルールの種類として、**Cloud Configuration** を選択します。
4. ルールを記述するクラウドリソースタイプを指定します。
5. Policy as Code 言語である [Rego][3] を使用して、ゼロから、または Datadog のテンプレートを使用して、ルールロジックを記述します。詳しくは、[Rego によるカスタムルールの作成][4]を参照してください。リソースを "pass"、"fail"、"skip" としてマークすることができることに注意してください。マークを付けなかった場合、リソースは "skip" として解釈されます。

   {{< img src="security/cspm/custom_rules/custom_rules_first_half.png" alt="カスタムルールの手順" width="100%">}}

6. 特定のリソースを所見から除外するクエリを指定することで、良性のアクティビティを除外することができます。
7. リソースを選択し、**Test Rule** をクリックすることで、ルールのロジックを検証することができます。どのリソースが合格し、失敗したかを、対応するリソースタグとともに確認できます。
8. ルールの重大度 (`Critical`、`High`、`Medium`、`Low`、または `Info`) を指定します。
9. ファセットを選択し (リソースタイプごと、アカウント ID ごとなど)、シグナルを送る[通知先を指定][5]します。
10. **Say what's happening** では、通知のための説明を書き、通知オプションを使用して有用なものにします。詳しくは、[通知][6]をご覧ください。
11. 結果の所見に適用するタグを指定します。詳しくは、[所見のタグ付け](#tagging-findings)を参照してください。
12. **Save Rule** をクリックします。

    {{< img src="security/cspm/custom_rules/custom_rules_second_half.png" alt="カスタムルールの手順" width="100%">}}

## 所見のタグ付け

CSPM 検出ルールを作成、複製、または修正するときに、所見に適用するタグを指定して、所見をタグでグループ化、フィルター、および検索できるようにすることができます。ルールを複製する場合、一部のタグは新しいルールに引き継がれ、他のタグは引き継がれません (以下の表を参照)。

ほぼすべての Key-Value をタグとして割り当てることができます。次の表は、一般的なセキュリティシナリオで有用なタグを示したものです。

| キー     | 有効な値    | 説明 | 
| ------  | --------------- | ----------- |
| `scored` | `true`、`false` | 組織の総合的なポスチャスコアを計算するときに、ルールを含めるかどうかを示します。複製されたルールに自動的に追加されます。 |
| `security` | `compliance` | [セキュリティシグナルページ][7]での所見を分類しています。削除はできません。 |
| `requirement` | 文字列 | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する要件を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。 |
| `cloud_provider` | `aws`、`gcp`、`azure` | 削除できません。リソースの種類によって自動的に設定されます。  |
| `control` | 文字列 | カスタムルールでは許可されません。コンプライアンスフレームワークに関連する制御を示します。コンプライアンスフレームワークの一部でないルールにこれを追加しないでください。 |
| `source` | [CSPM Findings の Source ファセット][2]に記載されている、クラウドプロバイダーから提供された定義済みのセットからの文字列 | 削除できません。複製されたルールに自動的に追加されます。クラウドプロバイダーごとにルールをグループ化することができます。 |
| `framework` | 文字列 | カスタムルールには許可されません。ルールが属するコンプライアンスフレームワークを示します。複製されたルールには自動的に追加されません。 |


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/rules?query=type%3A%28cloud_configuration%20OR%20infrastructure_configuration%29&all=false&product=cspm&sort=rule_name
[2]: https://app.datadoghq.com/security/compliance
[3]: https://www.openpolicyagent.org/docs/latest/
[4]: /ja/security/cloud_security_management/guide/writing_rego_rules/
[5]: /ja/security/cspm/frameworks_and_benchmarks/#set-notification-targets-for-detection-rules
[6]: /ja/security/notifications/
[7]: https://app.datadoghq.com/security/