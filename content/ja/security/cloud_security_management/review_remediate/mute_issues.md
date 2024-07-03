---
aliases:
- /ja/security/cloud_security_management/mute_issues
further_reading:
- link: security/default_rules
  tag: Documentation
  text: Explore out-of-the-box security detection rules
products:
- icon: cloud-security-management
  name: CSM Misconfigurations
  url: /security/cloud_security_management/misconfigurations/
- icon: cloud-security-management
  name: CSM Identity Risks
  url: /security/cloud_security_management/identity_risks/
title: Mute Issues in Cloud Security Management
---

{{< product-availability >}}

誤構成、問題、またはアイデンティティのリスクがビジネスのユースケースに一致しない場合や、既知のリスクとして受け入れることを選択する場合があります。これらを無視するには、影響を受けるリソースの基底の誤構成、問題、またはアイデンティティリスクをミュートします。

例えば、CSM Misconfigurations ルール ['Block Public Access' feature is enabled for S3 bucket][1] は、S3 バケットが一般にアクセス可能かどうかを評価します。一般に共有されることを意図した静的アセットを持つ S3 バケットがある場合、その S3 バケットに対する誤構成をミュートすることができます。

**注**: ミュートした誤構成は、ポスチャスコアの計算から除外されます。

{{< img src="security/csm/mute_issue.png" alt="Mute Issue ダイアログボックスには、ミュートの理由と期間を指定するためのフィールドがあります" style="width:100%;">}}

1. 誤構成、問題、またはアイデンティティリスクのサイドパネルで、1 つまたは複数のリソースを選択します。
2. **Actions** > **Mute for...** を選択します。
3. ミュートの理由を選択します。例えば、修正待ち、誤検出、受容されたリスクなどです。
4. オプションで **Description** を入力します。
5. ミュートの継続時間を選択します。
6. **Mute** をクリックします。

### 問題のミュート解除

ミュートされた問題は、指定されたミュート時間が経過すると自動的にミュートが解除されます。また、手動でミュートを解除することもできます。

1. 誤構成、問題、またはアイデンティティリスクのサイドパネルで、ミュートされている問題があるリソースを選択します。
2. **Actions** > **Unmute** を選択します。
3. ミュート解除の理由を選択します。例えば、未解決の修正がない、ヒューマンエラーである、または受け入れ可能なリスクでなくなった、などです。
4. オプションで **Description** を入力します。
5. **Unmute** をクリックします。

### ミュートされた問題を監査する

組織のミュートされた問題を表示するには

- Security Inbox と Misconfigurations の問題エクスプローラーの **Muted** 列でソートします。
- **Muted** ファセットを使用して、Security Inbox、Misconfigurations、Identity Risks の問題エクスプローラーをフィルターします。

誤構成のミュート履歴を監査するには

1. 誤構成サイドパネルを開きます。
2. ミュートされた誤構成のあるリソースを選択します。
3. **Overview** タブで、**Resource evaluation over time** のタイムラインを使用して、指定した期間 (最大 6 か月) にミュートまたはミュート解除された誤構成を表示します。

{{< img src="security/csm/muted_finding_evaluation_over_time.png" alt="時間経過によるリソース評価のタイムラインは、ミュートされた期間を含む誤構成の履歴を表示します" style="width:90%;">}}

4. **Timeline** タブをクリックすると、誤構成の履歴が時系列で表示されます。ミュートまたはミュート解除のアクションにカーソルを合わせると、ミュートの理由、ミュートの時間、ミュートした人など、詳細が表示されます。

{{< img src="security/csm/muted_finding_timeline.png" alt="Timeline タブには、誤構成がミュートされた時間の詳細を含む時系列履歴が表示されます" style="width:90%;">}}

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security/default_rules/cis-aws-1.5.0-2.1.5/