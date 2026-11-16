---
aliases:
- /ja/real_user_monitoring/mobile_and_tv_monitoring/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/advanced_configuration/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/data_collected/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/integrated_libraries/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/other_frameworks/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/setup/
- /ja/real_user_monitoring/mobile_and_tv_monitoring/troubleshooting/
description: ブラウザ、モバイル、TVアプリケーションからRUMデータを収集します。
further_reading:
- link: /session_replay/
  tag: ドキュメント
  text: Session Replay
title: アプリケーションモニタリング
---
## 概要 {#overview}

Datadog Real User Monitoring (RUM) は、アプリケーションのフロントエンドパフォーマンスに関する詳細なインサイトを提供します。実際のユーザーデータを監視してWebエクスペリエンスを最適化し、優れたユーザーエクスペリエンスを提供します。Synthetic テスト、バックエンドメトリクス、トレース、ログを1か所で関連付け、スタック全体のパフォーマンス問題を特定してトラブルシューティングします。

Datadogは、現在のユーザーエクスペリエンスのレベルを把握し、改善が必要な領域を特定し、各変更やデプロイの成功を測定するのに役立ちます。この情報を活用して、ユーザーに影響が及ぶ前に予期しないフロントエンドの問題を特定・解決し、最高のエクスペリエンスを提供します。

ユーザーデータのセキュリティを維持する責任は、Datadog と RUM SDK を活用する開発者の双方が負います。[Shared responsibility][1]の詳細をご覧ください。

## 始める {#get-started}

プラットフォームを選択して、アプリケーションの RUM データ収集を開始します。

{{< card-grid image_width="200" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/browser/setup" src="integrations_logos/javascript_large.svg" alt="ブラウザ" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_large.svg" alt="android" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/android/setup" src="integrations_logos/android_tv_large.svg" alt="android tv" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/cpp/setup/" src="integrations_logos/cpp_large.svg" alt="C / C++" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/flutter/setup/" src="integrations_logos/flutter_large.svg" alt="flutter" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/ios_large.svg" alt="ios" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/ios/setup/" src="integrations_logos/tv_os_large.svg" alt="tv OS" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/kotlin_multiplatform/setup/" src="integrations_logos/kotlin-multiplatform_large.svg" alt="kotlin-multiplatform" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/maui/setup/" src="integrations_logos/maui_large.svg" alt=".NET MAUI" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/" src="integrations_logos/react-native_large.svg" alt="react-native" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/codepush/" src="integrations_logos/react-codepush_large.svg" alt="react-codepush" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/react_native/setup/expo/" src="integrations_logos/rum-expo_large.svg" alt="rum-expo" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/roku/setup/" src="integrations_logos/roku_large.svg" alt="Roku" >}}
  {{< image-card href="/real_user_monitoring/application_monitoring/unity/setup" src="integrations_logos/rum-unity_large.svg" alt="rum-unity" >}}
{{< /card-grid >}}

[1]: /ja/data_security/real_user_monitoring/#shared-responsibility