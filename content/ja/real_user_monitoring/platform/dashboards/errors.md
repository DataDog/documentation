---
aliases:
- /ja/real_user_monitoring/platform/dashboards/errors_dashboard
further_reading:
- link: /real_user_monitoring/explorer
  tag: ドキュメント
  text: RUM エクスプローラーについて
kind: ドキュメント
title: RUM エラーダッシュボード
---

## Web アプリのエラー


RUM Web アプリエラーダッシュボードは、アプリケーションのエラーに関する洞察を提供します。これにより、最も多くのエラーを発生させているビューまたはバージョンに焦点を当てることができます。以下が表示されます。

- **Code errors**:
  アプリケーションのどの部分が最も多くのエラーを発生させているか、概要を把握できます。さらに詳しく知りたい場合は、[エラー追跡][1]を参照して、フロントエンドの重大なエラーを調査し、新しいエラーが発生したときに知ることができます。
- **Network errors**:
  どのリソースが最もエラーを発生させているかを監視します。

{{< img src="real_user_monitoring/dashboards/dashboard-errors-web.png" alt="すぐに使える RUM Web アプリエラーダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、[RUM ブラウザデータ収集][2]を参照してください。

## モバイルアプリのクラッシュとエラー


RUM モバイルアプリクラッシュおよびエラーダッシュボードは、モバイルアプリケーションのエラーに関する洞察を提供します。これにより、最も多くのエラーを発生させているビューまたはバージョンに焦点を当てることができます。以下が表示されます。

- **Code errors**:
  アプリケーションのどの部分が最も多くのエラーを発生させているか、概要を把握できます。さらに詳しく知りたい場合は、[エラー追跡][1]を参照して、フロントエンドの重大なエラーを調査し、新しいエラーが発生したときに知ることができます。
- **Network errors**:
  どのリソースが最もエラーを発生させているかを監視します。

{{< img src="real_user_monitoring/dashboards/dashboard-errors-mobile.png" alt="すぐに使える RUM モバイルアプリエラーダッシュボード" style="width:100%" >}}

表示されるデータの詳細については、各プラットフォームのドキュメントをご覧ください: [iOS RUM][3]、[Android RUM][4]、[React Native RUM][5]、[Flutter RUM][6]

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/rum/error-tracking
[2]: /ja/real_user_monitoring/data_collected/
[3]: /ja/real_user_monitoring/ios/data_collected/
[4]: /ja/real_user_monitoring/android/data_collected/
[5]: /ja/real_user_monitoring/reactnative/data_collected/
[6]: /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/flutter