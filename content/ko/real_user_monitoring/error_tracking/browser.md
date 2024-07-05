---
aliases:
- /ko/real_user_monitoring/error_tracking/browser_errors
further_reading:
- link: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps
  tag: GitHub
  text: datadog-ci Source code
- link: /real_user_monitoring/guide/upload-javascript-source-maps
  tag: 설명서
  text: Javascript 소스 맵 업로드
- link: /real_user_monitoring/error_tracking/explorer
  tag: 설명서
  text: 오류 추적 탐색기에 대해 알아보기
title: 브라우저 충돌 보고 및 오류 추적
---

## 개요

오류 추적은 RUM Browser SDK에 의해 브라우저에서 수집된 오류를 처리합니다. 스택 트레이스가 포함된 [소스][1] 또는 [커스텀][2] 오류가 수집될 때마다 오류 추적은 이를 처리하여 이슈 또는 유사한 오류 그룹으로 그룹화합니다.

충돌 보고서가 [**Error Tracking**][3]에 나타납니다.

## 설정

Browser SDK를 아직 설정하지 않은 경우 [인앱 설정 지침][4]을 따르거나 [Browser RUM 설정 문서][5]를 참조하세요.

1. [RUM Browser SDK][6]의 최신 버전을 다운로드합니다.
2. [SDK를 초기화][7]할 때 애플리케이션의 `version`, `env`및 `service`을 설정합니다. 
3. [JavaScript 소스 맵을 업로드하여][8] 축소되지 않은 스택 트레이스에 액세스합니다.

## 오류를 소스 코드와 연결

소스 맵 전송 외에도 [Datadog CLI][9]는 코드 리포지토리에서 커밋 해시, 리포지토리 URL 및 추적된 파일 경로 목록과 같은 Git 정보를 보고합니다.

오류 추적 및 RUM은 이 정보를 사용하여 오류와 소스 코드의 상관관계를 파악할 수 있으므로 [GitHub][10], [GitLab][11] 및 [Bitbucket][12]의 모든 스택 추적 프레임에서 관련 코드 줄로 피벗할 수 있습니다.

{{< img src="real_user_monitoring/error_tracking/link_to_git_js_example.mp4" alt="스택 프레임에서 소스 코드에 링크하기" video=true >}}

<div class="alert alert-info">스택 프레임에서 소스 코드로의 연결은 <a href="https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command">Datadog CLI</a> 버전 <code>0.12.0</code> 이상에서 지원됩니다.</div>

자세한 내용은 [Datadog 소스 코드 통합][13]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/real_user_monitoring/browser/data_collected/?tab=error#source-errors
[2]: /ko/real_user_monitoring/browser/collecting_browser_errors/?tab=npm#collect-errors-manually
[3]: https://app.datadoghq.com/rum/error-tracking
[4]: https://app.datadoghq.com/rum/application/create
[5]: /ko/real_user_monitoring/browser/#setup
[6]: https://www.npmjs.com/package/@datadog/browser-rum
[7]: /ko/real_user_monitoring/browser/#initialization-parameters
[8]: /ko/real_user_monitoring/guide/upload-javascript-source-maps
[9]: https://github.com/DataDog/datadog-ci/tree/master/src/commands/sourcemaps#sourcemaps-command
[10]: https://github.com
[11]: https://about.gitlab.com
[12]: https://bitbucket.org/product
[13]: /ko/integrations/guide/source-code-integration/