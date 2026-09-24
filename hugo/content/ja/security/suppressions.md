---
disable_toc: false
further_reading:
- link: security/detection_rules/
  tag: ドキュメント
  text: 検出ルールについて詳しくはこちら
products:
- icon: siem
  name: Cloud SIEM
  url: /security/cloud_siem/
- icon: cloud-security-management
  name: Workload Protection
  url: /security/workload_protection/
- icon: app-sec
  name: App and API Protection
  url: /security/application_security/
title: 抑制
---
{{< product-availability >}}

## 概要 {#overview}

抑制とは、シグナルを生成しない条件を定義するもので、生成されるシグナルの精度と関連性を向上させることができます。

{{< callout btn_hidden="true" header="抑制の評価" respect-site-support="false" >}}
抑制クエリには、**シグナル属性**に基づく抑制と、**ログまたはイベント属性**に基づく抑制の 2 種類があります。シグナルベースの抑制は、シグナルの作成時にのみ評価されます。シグナルの更新時には再評価されません。ログおよびイベント属性の抑制は、一致するイベントが、新しいシグナルや更新された既存のシグナルに含まれることを防ぎます。Datadog では、特定のアクティビティを確実に除外するために、ログおよびイベント属性の抑制を使用することを推奨しています。
{{< /callout >}}

## 抑制の設定方法{#suppression-routes}

個別の[検出ルール](#detection-rules)内で抑制クエリを設定することも、個別の[抑制ルール](#suppression-rules)を定義して 1 つ以上の検出ルールに対するシグナルを抑制することも可能です。

### 検出ルール{#detection-rules}

検出ルールを [作成][1] または [変更][2] する際に、シグナルの生成を防ぐための抑制クエリを定義できます。たとえば、検出ルールがセキュリティシグナルをトリガーするタイミングを判定するために、ルールクエリを追加します。また、抑制クエリをカスタマイズして、特定の属性値に対するシグナルを抑制することもできます。

{{< img src="security/security_monitoring/suppressions/detection_suppression_rule.png" alt="抑制クエリの追加セクションが表示されている検出ルールエディター" style="width:65%;" >}}

### 抑制ルール{#suppression-rules}

抑制ルールを使用すると、個々の検出ルールごとに抑制条件を設定する代わりに、複数の検出ルール全体に適用される一般的な抑制条件を設定できます。たとえば、特定の IP アドレスを含むすべてのシグナルを抑制する抑制ルールを設定できます。

## 抑制の構成{#suppressions-configuration}

### 抑制リスト{#suppression-list}

[抑制リスト][3] では、複数の検出ルールにわたる抑制を一元的かつ整理された方法で管理できます。

{{< img src="security/security_monitoring/suppressions/suppression_list.png" alt="抑制ルールを一覧表示する抑制ページ" style="width:90%;" >}}

## 抑制ルールを作成する {#create-a-suppression-rule}

1. [[Suppressions][3]] (抑制) ページに移動します。
1. [{{< ui >}}\+ New Suppression{{< /ui >}}] (新しい抑制) をクリックします。
1. 抑制クエリの名前を入力します。
1. この抑制が適用される理由の説明を追加します。
1. オプションで、この抑制が無効になる有効期限の日付を追加します。
1. この抑制を適用する検出ルールを選択します。複数の検出ルールを選択できます。
1. [{{< ui >}}Add Suppression Query{{< /ui >}}] (抑制クエリの追加) セクションでは、指定した値に一致した場合にシグナルが生成されないように、抑制クエリを入力するオプションがあります。たとえば、ユーザー `john.doe` がシグナルをトリガーしているものの、そのアクションが無害であり、このユーザーからシグナルがトリガーされないようにする場合は、ログクエリ `@user.username:john.doe` を入力します。
{{< img src="security/security_monitoring/suppressions/suppression_query.png" alt="@user.username:john.doe というクエリを使用した抑制クエリの追加" style="width:65%;" >}}
  抑制ルールのクエリは、**シグナル属性**に基づいています。
1. さらに、ログ除外クエリを追加して、ログが分析対象から除外されるようにすることもできます。これらのクエリは、**ログ属性**に基づいています。**注**: 従来の抑制はログ除外クエリに基づいていましたが、現在は抑制ルールの [{{< ui >}}Add a suppression query{{< /ui >}}] (抑制クエリの追加) ステップに含まれています。

### 編集権限を制限する{#restrict-edit-permissions}

{{% security-products/suppressions-granular-access %}}

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/configuration/siem/rules/new
[2]: /ja/security/detection_rules/
[3]: https://app.datadoghq.com/security/configuration/suppressions
[4]: https://app.datadoghq.com/security/siem/rules
[5]: /ja/logs/explorer/facets/#log-side-panel