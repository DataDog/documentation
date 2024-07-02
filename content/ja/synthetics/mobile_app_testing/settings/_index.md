---
title: モバイルアプリケーションテスト 設定
kind: ドキュメント
is_beta: true
aliases:
- /mobile_testing/settings
- /mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/mobile_app_tests
  tag: ドキュメント
  text: モバイルテストの作成方法
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI パイプラインで Synthetic テストを実行する
---
{{< jqmath-vanilla >}}

{{< site-region region="gov" >}}
<div class="alert alert-warning">このサイトでは、Mobile Application Testing はサポートされていません。</div>
{{< /site-region >}}

## 概要

[Synthetic Monitoring & Continuous Testing Settings ページ][1]で、アップロードしたモバイルアプリケーションと並列化の設定を管理します。

{{< img src="mobile_app_testing/applications_list.png" alt="モバイルアプリケーション設定" style="width:100%;">}}

## アプリケーションの作成

モバイルアプリケーションを追加するには、[**Mobile Applications List** タブ][5]に移動し、**+ Create Application** をクリックします。

{{< tabs >}}
{{% tab "Android" %}}

1. モバイルアプリケーションの OS として **Android** を選択します。
2. モバイルアプリケーションに名前を付けます。
3. `env` タグだけでなく、追加のタグもモバイルアプリケーションに追加してください。これらのタグを使うと、[Synthetic Monitoring & Continuous Testing ページ][101]でモバイルアプリ ケーションのテストをすばやくフィルターできます。
4. オプションで、モバイルアプリケーションの説明を入力します。
5. [`.apk` ファイル][102]をアップロードします。
6. モバイルアプリケーションのバージョン名を入力します。オプションで、**Mark this version as latest** を選択します。
7. **Create Application** をクリックします。

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{% /tab %}}
{{% tab "iOS" %}}

1. モバイルアプリケーションの OS として **iOS** を選択します。
2. モバイルアプリケーションに名前を付けます。
3. `env` タグだけでなく、追加のタグもモバイルアプリケーションに追加してください。これらのタグを使うと、[Synthetic Monitoring & Continuous Testing ページ][101]でモバイルアプリ ケーションのテストをすばやくフィルターできます。
4. オプションで、モバイルアプリケーションの説明を入力します。
5. `.ipa` ファイルをアップロードします。
6. モバイルアプリケーションのバージョン名を入力します。オプションで、**Mark this version as latest** を選択します。
7. **Create Application** をクリックします。

[101]: https://app.datadoghq.com/synthetics/tests

{{% /tab %}}
{{< /tabs >}}

モバイルアプリケーションを編集または削除するには、**Mobile Applications List** でモバイルアプリケーションにカーソルを合わせ、それぞれのアイコンをクリックします。

**Note**: Mobile Application Testing does not provide full support for Flutter applications.

## アプリケーションのバージョン管理

**Mobile Applications List** でモバイルアプリケーションをクリックすると、そのアプリケーションの既存のバージョンが表示されます。バージョンにカーソルを合わせて **+** アイコンをクリックすると、選択したモバイルアプリのバージョンで[モバイルアプリのテストを作成する][6]ことができます。

モバイルアプリケーションのバージョンを編集または削除するには、モバイルアプリケーションのバージョンにカーソルを合わせ、それぞれのアイコンをクリックします。

### バージョンの追加

既存のモバイルアプリケーションのバージョンを追加するには

1. **Mobile Applications List** にあるモバイルアプリケーションの `+` アイコンにカーソルを合わせ、**Add new version** をクリックします。
2. [`.apk`][4] または `.ipa` ファイルをアップロードします。
3. バージョン名を入力します。
4. オプションで、**Mark this version as latest** (このバージョンを最新版としてマークする) を選択します。
5. **Add Version** をクリックします。

{{< img src="mobile_app_testing/add_new_version.png" alt="モバイルアプリケーションの新バージョンを追加" style="width:50%;">}}

## 並列化のカスタマイズ

Synthetic テストの並列化については、[Continuous Testing Settings][7] を参照してください。



## 権限

デフォルトでは、Datadog Admin および Datadog Standard ロールを持つユーザーのみが Synthetic Monitoring の **Applications List** ページにアクセスできます。**Applications List** ページにアクセスするには、ユーザーをこの 2 つの[デフォルトロール][2]のいずれかにアップグレードします。

[カスタムロール機能][3]を使用している場合は、`synthetics_read` および `synthetics_write` 権限を含むカスタムロールにユーザーを追加します。

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/settings/
[2]: /account_management/rbac/#datadog-default-roles
[3]: /account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /mobile_app_testing/mobile_app_tests/
[7]: /continuous_testing/settings/
