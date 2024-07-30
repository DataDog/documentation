---
further_reading:
- link: /security/notifications/rules/
  tag: ドキュメント
  text: 通知の概要
- link: /security/notifications/
  tag: ドキュメント
  text: 通知ルール
is_beta: true
title: セキュリティ通知ルールの今後の変更点
---

この記事では、[通知ルール][1]の構成方法に関する今後の変更点について概説します。最も重要な変更は [Cloud Security Management (CSM)][4] に適用されますが、[Application Security Management][5] と [Cloud SIEM][6] にも影響します。

## CSM Misconfigurations におけるシグナルの廃止

現在、[CSM Misconfigurations][2] の通知は、以下の図に示すように、シグナルが有効な検出ルールに対してのみ設定できます。

**現在のワークフロー**:

{{< img src="security/csm/notification_rules_old_workflow.png" alt="CSM Misconfigurations で通知を有効にする現在のワークフローを示す図" width="80%">}}

通知ルールに対する今後の変更の一環として、通知を生成するためにシグナルを有効にする必要がなくなりました。新しいワークフローを下図に示します。

**新しいワークフロー**:

{{< img src="security/csm/notification_rules_new_workflow.png" alt="CSM Misconfigurations で通知を有効にする新しいワークフローを示す図" width="100%">}}

この変更は、CSM Misconfigurations で通知が生成される仕組みに以下のような影響を与えます。

1. 通知ルールを作成する際に、ソースタイプとして誤構成を指定できるようになりました。
2. CSM Misconfigurations では今後シグナルは生成されません。これは、通知を個別の検出ルールに対して有効にできなくなることも意味します。

<div class="alert alert-warning">この動作の変更により、通知の生成数が増加していることに気付くかもしれません。通知ルールに設定された条件により通知の数が多くなる場合は、<strong>Preview of Matching Results</strong> パネルに警告メッセージが表示されます。</div>

3. CSM Misconfigurations シグナルのサポートは、2024 年後半に廃止されます。従来のシグナルはトリガー日から 15 か月間保持されます (無料)。

## 通知ルールのソースタイプセレクター

通知ルールを作成する際には、脆弱性および脅威 (シグナル) という 2 種類のソースタイプから選択する必要があります。

- 脆弱性とは、インフラストラクチャーにおける潜在的なセキュリティ上の欠陥のことです。
- 脅威 (シグナル) とは、インフラストラクチャーに対するアクティブな脅威となる不審なアクティビティを意味します。

{{< img src="security/csm/notification_rules_new_selectors_2.png" alt="通知ルールの新しいソースタイプ" width="75%">}}

## その他の変更

- 通知ルールを、アイデンティティリスクと攻撃経路に対して設定できるようになりました。
- CSM Misconfigurations の通知に、診断結果に関する完全なメタデータが含まれるようになりました。以前は、通知には限られたシグナルのメタデータしか含まれていませんでした。
- レガシーの通知属性を使用した Terraform のカスタム検出ルールはサポートされなくなります。

## 既存の通知の移行方法

### 検出ルールの通知

個別の検出ルールに設定されている通知を移行するには:

1. [Misconfiguration Rules ページ][1]で、通知が有効になっている検出ルールを選択します。
2. **Set severity and notifications** セクションに表示されるバナーで、**Update in 1-Click** をクリックします。

   **Notification Rules** エディターページが表示され、フィールドにはルールの情報があらかじめ入力されています。

3. 必要に応じて設定を変更します。
4. **Save and Activate** をクリックします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/notifications/rules/
[2]: /ja/security/misconfigurations
[3]: https://app.datadoghq.com/security/configuration/compliance/rules
[4]: /ja/security/cloud_security_management/ 
[5]: /ja/security/application_security/
[6]: /ja/security/cloud_siem/