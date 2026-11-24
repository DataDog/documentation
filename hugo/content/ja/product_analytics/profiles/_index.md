---
description: 個々のユーザーやユーザーベースのセグメントを分析し、理解します。
further_reading:
- link: /product_analytics/
  tag: ドキュメント
  text: Product Analytics
title: プロファイルの管理とカスタム属性の統合
---
## 概要 {#overview}

[ユーザープロファイル][7]ページと[アカウントプロファイル][8]ページには、製品を操作しているユーザーとアカウントに関する充実したデータが含まれています。

これらのプロファイルページは、収集されたイベントから抽出された属性と、サードパーティソースからの情報を統合します。これらの属性の例には、ユーザーの `first_seen` タイムスタンプや、ユーザーの `last_seen_country` の ISO コードなどがあります。これらを組み合わせることで、包括的で一元化されたプロファイルを作成できます。

これらの充実したプロファイルにより、より正確なセグメンテーションとユーザー行動のより深い分析が可能になり、時間の経過に伴うパターンの特定、主要なコホート (例: 6 か月後もアクティブなユーザー) の追跡、製品に関する意思決定やエンゲージメント戦略の策定に役立ちます。

## プロファイル {#profiles}

ユーザープロファイルとアカウントプロファイルは、RUM SDK を通じて収集された RUM イベントから生成されます。`datadogRum.setUser` を使用して[ユーザー属性を設定][2]し、`datadogRum.setAccount` を使用して[アカウント属性を設定][3]します。

ユーザープロファイルは `user_id` 属性ごとにグループ化され、アカウントプロファイルは `account_id` ごとにグループ化されます。

認証されていないユーザーや `setUser` を呼び出さない訪問者の場合、RUM SDK は `usr.anonymous_id` を使用してアクティビティを自動的に追跡します。詳細については、[認証されていないユーザーの追跡][9]を参照してください。

チームにとって最も重要な属性を追加して、これらのページをカスタマイズすることもできます。プロファイルデータをニーズに合わせて調整する方法については、[カスタム属性セクション](#use-custom-attributes-to-enrich-profiles)を参照してください。


### ユーザープロファイル {#user-profiles}

[User Profiles][7] ページには、アプリケーションを操作しているユーザーが一覧表示されます。ユーザーを選択すると、そのユーザーが最も頻繁にアクセスしたページ、よく行う操作、セッション履歴など、アクティビティに関する詳細なインサイトを表示できます。

{{< img src="product_analytics/user_profile2ui.png" alt="ユーザープロファイルページのビュー。" style="width:80%;" >}}

各プロファイルには、ユーザーをより適切にセグメント化するのに役立つ属性があります。これらの属性のいずれかに基づいて、全文検索を行ったり、並べ替えやフィルタリングを行ったりすることができます。分析のニーズに関連する属性を使用して、このページをカスタマイズすることもできます。その方法については、[カスタム属性セクション](#use-custom-attributes-to-enrich-profiles)を参照してください。


{{% collapse-content title="ユーザープロファイル属性のリスト" level="h4" expanded=true id="user-profile-attributes" %}}

<!-- #### User attributes  -->
ユーザー ID`REQUIRED`
: `type:string` <br>一意のユーザー識別子。<br>

ユーザーの電子メール
: `type:string` <br>ユーザーのメールアドレス。

ユーザー名
: `type:string` <br>ユーザーのフルネーム。

<!-- #### Time based attributes  -->
初回アクセス
: `type:timestamp` <br>ユーザーの初めてのセッションの日付。

最終アクセス
: `type:timestamp`  <br>ユーザーの最終セッションの日付。


<!-- #### application based attributes  -->
初回アクセス時のアプリケーション
: `type:string`  <br>ユーザーが初めてアクセスしたアプリケーションの ID。

最終アクセス時のアプリケーション
: `type:string`  <br>ユーザーが最後にアクセスしたアプリケーションの ID。


<!-- #### Geo based attributes  -->
初回アクセス時の都市
: `type:string` <br>ユーザーの初めてのセッションで使用された都市。

最終アクセス時の都市
: `type:string` <br>ユーザーの最終セッションで使用された都市。

初回アクセス時の国
: `type:string` <br>ユーザーの初めてのセッションで使用された国の ISO コード。国のコードはバックエンドに保存され、国名は UI に表示されます。

最終アクセス時の国
: `type:string` <br>ユーザーの最終セッションで使用された国の ISO コード。国のコードはバックエンドに保存され、国名は UI に表示されます。

初回アクセス時の地域
: `type:string` <br>ユーザーの初めてのセッションで使用された地域。

最終アクセス時の地域
: `type:string` <br>ユーザーの最終セッションで使用された地域。


<!-- #### Device related attributes  -->
初回アクセス時のデバイスタイプ
: `type:string` <br>ユーザーの初めてのセッションで使用されたデバイス (例:  デスクトップ、タブレット)。

最終アクセス時のデバイスタイプ
: `type:string` <br>ユーザーの最終セッションで使用されたデバイス (例: デスクトップ、タブレット)。


<!-- #### OS related attributes  -->
初回アクセス時の OS 名
: `type:string` <br>ユーザーの初めてのセッションで使用されたオペレーティングシステム (例:  Windows、iOS)。

最終アクセス時の OS 名
: `type:string` <br>ユーザーの最終セッションで使用されたオペレーティングシステム (例:  Windows、iOS)。

初回アクセス時の OS バージョン
: `type:string` <br>ユーザーの最初のセッションで使用された OS バージョン。

最終アクセス時の OS バージョン
: `type:string` <br>ユーザーの最終セッションで使用された OS バージョン。


<!-- #### Browser related attributes  -->
初回アクセス時のブラウザ名
: `type:string` <br>ユーザーの初めてのセッションで使用されたブラウザ (例:  Chrome、Safari)。

最終アクセス時のブラウザ名
: `type:string` <br>ユーザーの最終セッションで使用されたブラウザ (例:  Chrome、Safari)。

初回アクセス時のブラウザバージョン
: `type:string` <br>ユーザーの初めてのセッションで使用されたブラウザバージョン。

最終アクセス時のブラウザバージョン
: `type:string` <br>ユーザーの最終セッションで使用されたブラウザバージョン。

{{% /collapse-content %}}
<br>


### アカウントプロファイル {#account-profiles}
Account Profiles ページには、アプリケーションを操作している組織のリストが表示されます。

{{< img src="product_analytics/account_profile_ui3.png" alt="ユーザープロファイルページのビュー。" style="width:80%;" >}}

各プロファイルには、時間の経過に伴うアカウントアクティビティを特定および追跡するのに役立つ 4 つのデフォルト属性が含まれています。これらのデフォルト属性は以下のとおりです。
- `account_id`
- `account_name`
- `first_seen`
- `last_seen`

Account Profiles ページをカスタマイズして、追加属性を含めることで、監視可能性や製品分析ニーズに合わせて表示する内容を柔軟に調整できます。



## カスタム属性を使用してプロファイルを充実させる {#use-custom-attributes-to-enrich-profiles}

### Integrations を使用してカスタム属性を構成する方法 {#how-to-configure-custom-attributes-using-integrations}

Integrations または Reference Table を使用して、カスタム属性データをプロファイルに自動的にインポートします。このデータは定期的なスケジュールで同期され、ソースシステムの最新の値が反映されるため、プロファイルは最新かつ正確な状態に保たれます。

[Integrations ページ][4]では、カスタム属性と互換性のある Integrations を検索できます。

同じページで、[{{< ui >}}Custom Attributes{{< /ui >}}][5] タブを選択すると、ユーザープロファイルおよびアカウントプロファイル用にインポートされた属性を表示することができます。

{{< img src="product_analytics/integration_page5.png" alt="Product Analytics と互換性のある Integrations を参照してください。" style="width:80%;" >}}

Reference Table または Salesforce や Snowflake などの Integration から属性をインポートするには、{{< ui >}}Add Attributes{{< /ui >}} ボタンを選択し、属性がユーザープロファイル用かアカウントプロファイル用かを選択します。次に、プロンプトに従って


{{< img src="product_analytics/add_attribute2_button.png" alt="新しい属性を追加して、プロファイルを充実させます。" style="width:80%;" >}}


1. インポートする {{< ui >}}source of the data{{< /ui >}} を選択します。

{{< img src="product_analytics/choose_integration1.png" alt="インポートするデータのソースを選択する。" style="width:80%;" >}}


2. 目的のユーザーデータが含まれている {{< ui >}}table{{< /ui >}} を選択します。

{{< img src="product_analytics/add_table_and_key3.png" alt="プロファイルにマージするデータを選択する。" style="width:80%;" >}}


3. {{< ui >}}join key{{< /ui >}} と {{< ui >}}Product Analytics key{{< /ui >}} を選択して、テーブルをプロファイルにマージします。次に、リストからプロファイルに追加する {{< ui >}}attributes{{< /ui >}} を選択します。各行には、プロファイルと一致させるための結合キー列の値が必要です。値がない行はスキップされます。行に結合キー値がない場合、スケジュールされた同期は正常に完了しますが、属性はインポートされません。この場合は、結合キーがテーブル内の正しい列に設定されていることを確認してください。

{{< img src="product_analytics/select_integration_attributes5.png" alt="Snowflake の Configure import モーダルには、結合キーの構成と、列名、タイプ、サンプル値を含む選択可能な属性のリストが表示されています。" style="width:80%;" >}}


<br>

## カスタム属性をクエリする方法 {#how-to-query-your-custom-attributes}

これらのカスタム属性は、事前に[セグメント][6]に追加しなくても、製品分析プラットフォーム全体でフィルタリングすることができます。たとえば、$100 を超える金額を支払ったユーザーのセッション数を表示する分析チャートを作成することができます。

{{< img src="product_analytics/query_custom_attribute_analytics3.png" alt="分析チャートでカスタム属性をクエリします。" style="width:80%;" >}}


## 参考資料 {#further-reading}
{{< partial name="whats-next/whats-next.html" >}}


[2]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-user-session
[3]: https://docs.datadoghq.com/ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/?tab=npm#identify-account
[4]: https://app.datadoghq.com/product-analytics/integrations
[5]: https://app.datadoghq.com/product-analytics/integrations/custom-attributes
[6]: https://app.datadoghq.com/product-analytics/segments
[7]: https://app.datadoghq.com/product-analytics/profiles
[8]: https://app.datadoghq.com/product-analytics/profiles/accounts
[9]: /ja/real_user_monitoring/application_monitoring/browser/advanced_configuration/#track-unauthenticated-users