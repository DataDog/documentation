---
aliases:
- /ja/mobile_testing/settings
- /ja/mobile_app_testing/settings
further_reading:
- link: /synthetics/mobile_app_testing/
  tag: ドキュメント
  text: モバイルテストの作成方法
- link: /continuous_testing/cicd_integrations
  tag: ドキュメント
  text: CI パイプラインで Synthetic テストを実行する
is_beta: true
title: モバイルアプリケーションテスト設定
---
{{< jqmath-vanilla >}}

## 概要 {#overview}

[Synthetic Monitoring & Continuous Testing 設定ページ][1]で、アップロードしたモバイルアプリケーションと並列化の設定を管理します。

{{< img src="mobile_app_testing/applications_list_2.png" alt="モバイルアプリケーションの設定" style="width:100%;">}}

## アプリケーションを作成する {#create-an-application}

モバイルアプリケーションを追加するには、[{{< ui >}}Mobile Applications List{{< /ui >}} タブ][5]に移動し、{{< ui >}}\+ Create Application{{< /ui >}} をクリックします。

{{< tabs >}}
{{% tab "Android" %}}

1. モバイルアプリケーションの OS として {{< ui >}}Android{{< /ui >}} を選択します。
2. アプリケーション構築用フレームワークを選択します。対応フレームワークは、ネイティブ Android フレームワークおよび React Native です。
3. モバイルアプリケーションに名前を付けます。
4. `env` タグおよび追加のタグをモバイルアプリケーションに追加します。これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][101]でモバイルアプリテストをフィルタリングできます。
5. オプションで、モバイルアプリケーションの説明を入力します。
6. [`.apk` ファイル][102]をアップロードします。
7. モバイルアプリケーションのバージョンの名前を入力します。オプションで、{{< ui >}}Mark this version as latest{{< /ui >}} を選択します。
8. {{< ui >}}Create Application{{< /ui >}} をクリックします。

[101]: https://app.datadoghq.com/synthetics/tests
[102]: https://developer.android.com/tools/bundletool

{{< img src="mobile_app_testing/settings/mobile_app_settings_android.png" alt="Android および Native (デフォルト) を選択してモバイルアプリテストを作成する" height="400px" >}}

{{% /tab %}}
{{% tab "iOS" %}}

1. モバイルアプリケーションの OS として {{< ui >}}iOS{{< /ui >}} を選択します。
2. アプリケーション構築用フレームワークを選択します。対応フレームワークは、ネイティブ iOS フレームワークおよび React Native です。
3. モバイルアプリケーションに名前を付けます。
4. `env` タグおよび追加のタグをモバイルアプリケーションに追加します。これらのタグを使用して、[Synthetic Monitoring & Continuous Testing ページ][101]でモバイルアプリテストをフィルタリングできます。
5. オプションで、モバイルアプリケーションの説明を入力します。
6. `.ipa` ファイルをアップロードします。
7. モバイルアプリケーションのバージョンの名前を入力します。オプションで、{{< ui >}}Mark this version as latest{{< /ui >}} を選択します。
8. {{< ui >}}Create Application{{< /ui >}} をクリックします。

[101]: https://app.datadoghq.com/synthetics/tests

{{< img src="mobile_app_testing/settings/mobile_app_settings_ios.png" alt="iOS および Native (デフォルト) を選択してモバイルアプリテストを作成する" height="400px" >}}

{{% /tab %}}
{{< /tabs >}}

モバイルアプリケーションを編集または削除するには、{{< ui >}}Mobile Applications List{{< /ui >}} でモバイルアプリケーションにカーソルを合わせ、それぞれのアイコンをクリックします。

<div class="alert alert-info">
  <strong>注</strong>: 2025 年 7 月現在、React Native アプリケーションはモバイルアプリケーションテストに正式に対応しています。正式サポート前にアップロードされた React Native アプリケーションに対するアクションは不要です。テストは想定どおりに実行され続けます。Mobile Application Testing は、Flutter アプリケーションに完全には対応していません。
</div>

## アプリケーションのバージョン管理 {#manage-application-versions}

{{< ui >}}Mobile Applications List{{< /ui >}} でモバイルアプリケーションをクリックすると、そのアプリケーションの既存のバージョンが表示されます。バージョンにカーソルを合わせ、{{< ui >}}\+{{< /ui >}} アイコンをクリックして、選択したモバイルアプリケーションのバージョンで[モバイルアプリテストを作成][6]します。

モバイルアプリケーションのバージョンを編集または削除するには、モバイルアプリケーションのバージョンにカーソルを合わせ、それぞれのアイコンをクリックします。

### バージョンを追加する {#add-a-version}

既存のモバイルアプリケーションのバージョンを追加するには、以下の手順を実行します。

1. {{< ui >}}Mobile Applications List{{< /ui >}} 内のモバイルアプリケーションで {{< ui >}}\+{{< /ui >}} アイコンにカーソルを合わせ、{{< ui >}}Add new version{{< /ui >}} をクリックします。
2. [`.apk`][4] または `.ipa` ファイルをアップロードします。
3. バージョン名を入力します。
4. オプションで、{{< ui >}}Mark this version as latest{{< /ui >}} を選択します。
5. {{< ui >}}Add Version{{< /ui >}} をクリックします。

{{< img src="mobile_app_testing/add_new_version.png" alt="モバイルアプリケーションの新しいバージョンを追加する" style="width:50%;">}}

## 並列化のカスタマイズ {#customize-your-parallelization}

Synthetic テストの並列化については、[Continuous Testing Settings][7] を参照してください。



## 権限 {#permissions}

デフォルトでは、Datadog Admin ロールおよび Datadog Standard ロールを持つユーザーのみが、Synthetic Monitoring {{< ui >}}Applications List{{< /ui >}} ページにアクセスできます。{{< ui >}}Applications List{{< /ui >}} ページにアクセスするには、ユーザーをこれら 2 つの[デフォルトロール][2]のいずれかにアップグレードしてください。

[カスタムロール機能][3]を使用している場合は、`synthetics_read` および `synthetics_write` の権限を含むカスタムロールにユーザーを追加してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/synthetics/settings/
[2]: /ja/account_management/rbac/#datadog-default-roles
[3]: /ja/account_management/rbac/#custom-roles
[4]: https://developer.android.com/tools/bundletool
[5]: https://app.datadoghq.com/synthetics/settings/mobile-applications
[6]: /ja/mobile_app_testing/mobile_app_tests/
[7]: /ja/continuous_testing/settings/