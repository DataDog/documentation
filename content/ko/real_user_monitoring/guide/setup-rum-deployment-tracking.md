---
aliases:
- /ko/real_user_monitoring/guide/getting-started-rum-deployment-tracking/
description: Datadog에서 새 릴리스를 캡처하고, 배포를 추적하며, 성능을 분석하기 위해 RUM을 설정하는 방법을 알아보세요.
further_reading:
- link: /real_user_monitoring/explorer
  tag: 설명서
  text: RUM 탐색기에서 RUM 데이터 시각화
- link: /tracing/version_tracking
  tag: 설명서
  text: Datadog APM에서 버전 태그로 배포 모니터링하기
- link: https://www.datadoghq.com/blog/datadog-rum-deployment-tracking
  tag: 블로그
  text: RUM의 배포 추적을 통해 잘못된 프론트엔드 배포 문제 해결
kind: guide
title: RUM 배포 추적 시작하기
---


## 개요
팀이 빠르게 반복 작업을 수행하고 코드를 배포할 때 오류가 급증하거나 페이지 로드 시간이 느려진 정확한 변경 사항을 찾기가 어려울 수 있습니다. RUM 배포 추적을 사용하면 최근 배포 또는 릴리스가 애플리케이션 내에서 성능 문제를 일으키는 시점을 식별하고 문제의 원인을 파악할 수 있습니다.

## 설정
`version` 태그를 사용하여 소프트웨어 배포 전략을 지원하는 배포 및 서비스 동작을 모니터링할 수 있습니다. RUM 배포 추적을 시작하려면 애플리케이션에 RUM 버전을 추가해야 합니다.

### 브라우저 RUM
{{< tabs >}}
{{% tab "npm" %}}

```javascript
import { datadogRum } from '@datadog/browser-rum';

// Initialize Datadog Browser SDK
datadogRum.init({
  ...
  version: '1.0.0',
  ...
});
```

{{% /tab %}}
{{% tab "CDN async" %}}

```javascript
window.DD_RUM.onReady(function() {
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
})
```

{{% /tab %}}
{{% tab "CDN sync" %}}

```javascript
window.DD_RUM &&
    window.DD_RUM.init({
      ...
      version: '1.0.0',
      ...
    })
```
{{% /tab %}}
{{< /tabs >}}

### 모바일 RUM

#### Android RUM

버전 태그는 애플리케이션의 매니페스트에서 자동으로 캡처됩니다.

#### iOS RUM

버전 태그는 애플리케이션의 `info.plist`에서 자동으로 캡처됩니다.

## RUM에서 배포 성능 분석

{{< tabs >}}
{{% tab "Browser RUM" %}}

### 애플리케이션 개요 페이지에서 버전 태그 사용

버전 태그로 설정된 애플리케이션은 애플리케이션 개요 페이지에 **Deployment Tracking** 섹션이 있습니다. **Deployment Tracking** 섹션에는 선택한 시간 간격 동안 활성화된 모든 버전의 애플리케이션과 서비스가 표시됩니다.

이를 통해 문제가 발견되는 즉시 릴리스 후보를 롤백할 수 있으므로 부정적인 사용자 경험을 피할 수 있습니다. 이러한 기본 그래프는 여러 버전에 걸쳐 집계되므로 심각한 문제로 발전하기 전에 애플리케이션의 문제를 더 쉽게 식별할 수 있습니다.

다음을 볼 수 있습니다:
- P75 버전별 로딩 시간
- 버전별 총 사용자 세션 수
- 버전별 오류율

위젯 아래 표에는 다음과 같은 내용이 표시됩니다:
- 일정 기간 동안 애플리케이션 및 해당 서비스에 대해 배포된 버전 이름.
- 해당 버전의 사용자 세션 수
- 보기당 평균 오류 수
- P75 로딩 시간
- Core Web Vitals 용 P75

이러한 위젯은 대시보드 및 모니터로 내보낼 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-rum-app-overview-deployment-tracking.png" alt="RUM 애플리케이션의 브라우저 배포 추적 개요" style="width:100%;">}}


### 배포 비교

**List of Versions** 테이블에서 버전 행을 클릭하면 버전 비교 페이지가 열리며, 동일한 서비스의 두 버전을 비교할 수 있습니다. 기본적으로 선택한 버전은 모든 이전 버전과 비교됩니다. 선택 항목을 변경하여 지난 30일 동안의 두 버전을 비교할 수 있습니다.

**Application Overview** 페이지의 그래프와 유사하게 **User Sessions**, **Core Web Vitals** 및 **Errors** 그래프는 배포 롤아웃 또는 오류율 급증에 대한 개요를 보여줍니다. 이 페이지에서 그래프는 비교를 위해 선택된 버전을 강조 표시하고 추가 컨텍스트를 위해 다른 모든 버전을 회색으로 표시합니다.

릴리스를 모니터링할 때 기존 라이브 코드와 코드 배포 성능을 비교하여 새 코드가 제대로 작동하는지, 버전 간에 새로운 오류가 나타나지 않았는지 확인하는 데 도움이 됩니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison.png" alt="브라우저 배포 추적 비교" style="width:75%;">}}

**Issues** 탭은 두 버전에서 감지된 오류의 차이를 보여 주며 다음을 강조 표시합니다:
- 버전별 오류 수
- 버전별 오류가 있는 뷰의 비율
- 오류 추적 문제

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-comparison-error.png" alt="브라우저 배포 추적 비교 오류" style="width:75%;">}}

### RUM 배포 추적 파워팩 탐색
대시보드의 파워팩 메뉴를 사용하고 "Deployment Version Tracking" 파워팩을 검색하여 RUM 서비스에 대한 배포 추적을 대시보드에 추가할 수 있습니다. 그런 다음 대시보드에 다른 위젯을 반복하고 추가하여 팀이 새로운 기능을 안전하게 출시하도록 지원할 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/browser-deployment-tracking-powerpack.png" alt="브라우저 배포 추적 파워팩" style="width:75%;">}}

{{% /tab %}}
{{% tab "모바일 RUM" %}}

### 애플리케이션 개요 페이지에서 버전 태그 사용

버전 태그로 구성된 애플리케이션에는 애플리케이션 개요 페이지에 **Deployment Tracking** 섹션이 있습니다. **Deployment Tracking** 섹션에는 선택한 시간 간격 동안 활성화된 애플리케이션 및 서비스의 모든 버전이 표시됩니다.

이를 통해 문제를 발견하는 즉시 릴리스 후보를 신속하게 롤백할 수 있으므로 부정적인 사용자 경험을 피할 수 있습니다. 이러한 기본 그래프는 여러 버전에 걸쳐 집계되므로 심각한 문제로 발전하기 전에 애플리케이션의 문제를 더 쉽게 식별할 수 있습니다.

다음을 볼 수 있습니다:
- 버전별 평균 애플리케이션 시작 시간
- 버전별 총 사용자 세션 수
- 버전별 오류율

위젯 아래 표에는 다음과 같은 내용이 표시됩니다:
- 일정 기간 동안 애플리케이션 및 해당 서비스에 대해 배포된 버전 이름.
- 해당 버전의 앱 실행 횟수
- 오류율
- 충돌율
- P90 애플리케이션 시작 시간

이러한 위젯은 대시보드 및 모니터로 내보낼 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-rum-app-overview-deployment-tracking.png" alt="RUM 애플리케이션에서의 모바일 배포 추적 개요" style="width:100%;">}}

### 배포 비교

**List of Version** 테이블에서 버전 행을 클릭하면 동일한 서비스의 두 버전을 비교할 수 있는 버전 비교 페이지가 열립니다. 기본적으로 선택한 버전은 모든 이전 버전과 비교됩니다. 선택 항목을 변경하여 지난 30일 동안의 두 버전을 비교할 수 있습니다.

**Application Overview** 페이지의 그래프와 유사하게 **User Sessions**, **Mobile Vitals** 및 **Errors** 그래프는 배포 롤아웃 또는 오류율 급증에 대한 개요를 보여줍니다. 이 페이지에서 그래프는 비교를 위해 선택된 버전을 강조 표시하고 추가 컨텍스트를 위해 다른 모든 버전을 회색으로 표시합니다.

릴리스를 모니터링할 때 기존 라이브 코드와 코드 배포 성능을 쉽게 비교하여 새 코드가 제대로 작동하는지, 버전 간에 새로운 오류가 나타나지 않았는지 확인할 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison.png" alt="모바일 배포 추적 비교" style="width:75%;">}}

**Issues** 탭은 두 버전에서 감지된 오류의 차이를 보여 주며 다음을 강조 표시합니다:
- 버전별 오류 수
- 버전별 오류가 있는 뷰의 비율
- 오류 추적 문제

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-comparison-error.png" alt="모바일 배포 추적 비교 오류" style="width:75%;">}}

### RUM 배포 추적 파워팩 탐색
대시보드의 파워팩 메뉴를 사용하고 "Deployment Version Tracking" 파워팩을 검색하여 RUM 서비스에 대한 배포 추적을 대시보드에 추가할 수 있습니다. 그런 다음 대시보드에 다른 위젯을 반복하고 추가하여 팀이 새로운 기능을 안전하게 출시하는 데 도움을 줄 수 있습니다.

{{< img src="real_user_monitoring/guide/setup-rum-deployment-tracking/mobile-deployment-tracking-powerpack.png" alt="브라우저 배포 추적 파워팩" style="width:75%;">}}


{{% /tab %}}
{{< /tabs >}}

## 참고 자료
{{< partial name="whats-next/whats-next.html" >}}