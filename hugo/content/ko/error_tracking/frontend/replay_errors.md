---
description: 중요한 문제를 확인할 수 있도록 리플레이 스니펫을 수집하는 방법을 알아보세요.
further_reading:
- link: /error_tracking/suspect_commits
  tag: 문서
  text: Error Tracking에서 의심스러운 커밋을 식별하는 방법 알아보기
- link: /error_tracking
  tag: 문서
  text: Error Tracking 살펴보기
is_beta: true
private: false
title: Error Tracking 리플레이 스니펫
---
{{< callout url="https://www.datadoghq.com/product-preview/error-tracking-replay-snippets/" btn_hidden="false"  >}}
Error Tracking 리플레이 스니펫은 미리 보기로 제공되고 있습니다.
{{< /callout >}}

## 개요 {#overview}

프런트엔드 엔지니어에게 버그 재현은 디버깅 과정에서 필수적이면서도 많은 시간이 소요되는 작업입니다. 하지만 애플리케이션에서 오류가 발생하기 전에 사용자가 어떤 작업을 수행했는지 명확히 파악하지 못하면 버그를 재현하기 어려울 수 있습니다.

Error Tracking 리플레이 스니펫을 사용하면 오류 발생 전후 15초 동안의 사용자 여정을 픽셀 단위로 완벽하게 재현하여 조회할 수 있으므로 버그를 재현하고, 시간을 절약하며, 추측을 배제할 수 있습니다.

## 설정 {#setup}

1. Datadog Frontend Error Tracking을 설정하지 않은 경우, [인앱 설정 지침][1]을 따르거나 [브라우저][2] 및 [모바일][3]에 대한 설정 문서를 참조하세요.
2. SDK 초기화 중에 애플리케이션의 리플레이 샘플링 비율을 구성하세요. 

   {{< tabs >}}
   {{% tab "브라우저" %}}

   `sessionReplaySampleRate`를 1에서 100 사이로 설정하세요. 

   ```javascript
   import { datadogRum } from '@datadog/browser-rum';

   datadogRum.init({
      applicationId: '<APP_ID>',
      clientToken: '<CLIENT_TOKEN>',
      service: '<SERVICE>',
      env: '<ENV_NAME>',
      sessionReplaySampleRate: 20,
      trackResources: true,
      trackUserInteractions: true,
   });
   ```

   {{% /tab %}}
   {{% tab "iOS" %}}
   이 플랫폼에서 모바일 애플리케이션의 오류 리플레이를 설정하고 구성하려면 [다음 단계][4]를 따르세요.

   [4]: /session_replay/setup_and_configuration/?platform=ios
   {{% /tab %}}
   {{% tab "Android" %}}
   이 플랫폼에서 모바일 애플리케이션의 오류 리플레이를 설정하고 구성하려면 [다음 단계][5]를 따르세요.

   [5]: /session_replay/setup_and_configuration/?platform=android
   {{% /tab %}}
   {{% tab "Kotlin Multiplatform" %}}
   이 플랫폼에서 모바일 애플리케이션의 오류 리플레이를 설정하고 구성하려면 [다음 단계][6]를 따르세요.

   [6]: /session_replay/setup_and_configuration/?platform=kotlin_multiplatform
   {{% /tab %}}
   {{% tab "React Native" %}}
   이 플랫폼에서 모바일 애플리케이션의 오류 리플레이를 설정하고 구성하려면 [다음 단계][7]를 따르세요.

   [7]: /session_replay/setup_and_configuration/?platform=react_native
   {{% /tab %}}
   {{</tabs>}}

## 오류 리플레이 {#replay-errors}
오류 메시지 및 스택 트레이스와 같은 오류에 대한 주요 정보를 검토한 후, 이슈 요약에서 오류가 발생한 가장 최근 세션의 실시간 재현으로 바로 전환할 수 있습니다. 스택 트레이스 아래로 스크롤한 후, 리플레이 미리 보기를 클릭하여 오류 발생 전 사용자의 액션을 조회하세요. 

{{< img src="error_tracking/error-replay-2.png" alt="Error Tracking 리플레이 스니펫" style="width:90%" >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/error-tracking/settings/setup/client
[2]: /ko/error_tracking/frontend/browser#setup
[3]: /ko/error_tracking/frontend/mobile