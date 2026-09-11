---
aliases:
- /ja/security/cloud_security_management/mute_issues
further_reading:
- link: security/default_rules
  tag: ドキュメント
  text: すぐに使えるセキュリティ検知ルールを確認する
products:
- icon: cloud-security-management
  name: Cloud Security Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: Cloud Security Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Cloud Security で Issue をミュートする
---

{{< product-availability >}}

誤構成や Issue、Identity Risk が自社の運用に合わない場合や、既知のリスクとして受け入れる判断をする場合があります。そうした項目を無視したいときは、影響を受けるリソースに対して、該当する誤構成 / Issue / Identity Risk をミュートできます。

たとえば Cloud Security Misconfigurations のルール [S3 バケットでは 'Block Public Access' を有効にするべき][1] は、S3 バケットが公開状態になっているかどうかを評価します。もし公開共有を前提とした静的アセット用の S3 バケットがあるなら、その S3 バケットについては誤構成をミュートできます。

**注**: 誤構成をミュートすると、ポスチャ スコアの算出から除外されます。

{{< img src="security/csm/mute_issue-3.png" alt="Mute Issue のダイアログ ボックスには、ミュートの理由と期間を指定するフィールドがある" style="width:70%;">}}

1. 対象リソースの triage status のドロップダウンを見つけます。
   - Misconfigurations / Identity Risks / Vulnerabilities の各エクスプローラーでは、各リソースの **Triage** 列にドロップダウンがあります。あるいは 1 つ以上のリソースを選択し、表示される **Set State** ドロップダウンをクリックすると、選択したものをまとめてミュートできます。
   - サイド パネルでリソースを表示している場合は、**Next Steps** の下にある **Triage** の配下にドロップダウンがあります。
2. 現在の triage status が表示されているドロップダウンを開き、**Muted** をクリックします。**Mute issue** ウィンドウが開きます。
3. ミュートの理由を選択します (例: false positive、accepted risk、修正待ちなど)。
4. 必要に応じて **Description** を入力します (任意)。
5. ミュートの期間を選択します。
6. **Mute** をクリックします。**Mute issue** ウィンドウが閉じます。

条件に一致する Issue を自動でミュートする方法については、[ミュート ルール][2] を参照してください。

## Issue のミュートを解除する

ミュートされた Issue は、指定したミュート期間が終了すると自動的にミュート解除されます。手動で解除することもできます。

1. 対象リソースの triage status のドロップダウンを見つけます。
   - Misconfigurations / Identity Risks / Vulnerabilities の各エクスプローラーでは、各リソースの **Triage** 列にドロップダウンがあります。あるいは 1 つ以上のリソースを選択し、表示される **Set State** ドロップダウンをクリックすると、選択したものをまとめてミュート解除できます。
   - サイド パネルでリソースを表示している場合は、**Next Steps** の下にある **Triage** の配下にドロップダウンがあります。
2. **Muted** をクリックしてドロップダウンを開き、新しい triage status を選択します。選択したリソースの triage status は即座に更新されます。

## ミュートした Issue を監査する

組織でミュートされている Issue を確認するには、次の手順を実行します。

1. デフォルトでは、すべての Issue Explorer でミュートされた Issue は非表示です。Misconfigurations と Identity Risks の Issue Explorer でミュートされた Issue を表示するには、検索バーから `@workflow.triage.status:(open OR in-progress)` フィルターを削除します。
1. 使用している Issue Explorer に応じて、Issue の並べ替えやフィルタリングを行います。
   - Misconfigurations Issue Explorer では、**Muted** 列でソートします。
   - Misconfigurations または Identity Risks の Issue Explorer では、**Muted** ファセットで Issue をフィルターします。
   - Vulnerabilities Issue Explorer では、**Muted** タブをクリックします。

誤構成のミュート履歴を監査するには、次の手順を実行します。

1. 誤構成のサイド パネルを開きます。
2. ミュートされた誤構成を含むリソースを選択します。
3. **Timeline** タブをクリックして、誤構成の時系列履歴を確認します。ミュート / ミュート解除の操作にカーソルを合わせると、ミュート理由、ミュート予定期間、誰がミュートしたかなどの追加情報を確認できます。

{{< img src="security/csm/muted_finding_timeline-2.png" alt="Timeline タブには、誤構成がミュートされたタイミングを含む誤構成の時系列履歴が表示される" style="width:90%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/hkp-p6b-f7w/
[2]: /ja/security/automation_pipelines/mute