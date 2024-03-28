---
description: .NET 개발자를 위한 Datadog 확장 기능
disable_toc: false
further_reading:
- link: /getting_started/profiler/
  tag: 설명서
  text: 지속적인 프로파일러 시작하기
is_beta: true
kind: documentation
title: Visual Studio를 위한 Datadog 확장 기능
---

{{< callout url="#" btn_hidden="true">}}
  Visual Studio용 Datadog 확장 기능은 공개 베타 버전입니다. 이 프로그램은 .NET 서비스에서 <a href="https://docs.datadoghq.com/profiler/#pagetitle">지속적인 프로파일러</a>를 사용하는 .NET 개발자를 대상으로 합니다. 예기치 않게 플러그인이 작동을 멈추면 업데이트를 확인하거나 <a href=#feedback>관련 팀에 문의하세요</a>.
{{< /callout >}}

## 개요

Visual Studio용 Datadog 확장 기능은 실시간 통합 가시성 데이터를 기반으로 IDE에서 의미 있는 코드 수준의 인사이트를 제공하여 소프트웨어 성능을 개선할 수 있도록 도와줍니다.

**Code Insights** 보기를 통해 다음과 같은 정보를 얻을 수 있습니다:

- [오류 추적][5]의 문제
- 애플리케이션 보안 관리의 [취약성][6] 보고서
- [Watchdog 인사이트][7]의 프로파일링 인사이트 

**지속적인 프로파일러**는 다음과 같은 코드라인을 강조하여 지연 시간을 줄이고 클라우드 비용을 절감할 수 있도록 도와줍니다:

- CPU 사용량이 가장 많음
- 가장 많은 메모리 할당
- 잠금, 디스크 I/O 및 소켓 I/O에 가장 많은 시간 사용

## 요구 사항

- Windows 10 이상
- .NET Framework 4.7.2 이상
- Visual Studio 2022 커뮤니티, 프로페셔널 또는 엔터프라이즈 에디션 (64비트)
- **Datadog 계정**: 플러그인을 사용하려면 Datadog 계정이 필요합니다. Datadog을 처음 사용하는 경우 [Datadog 웹사이트][3]에서 Datadog의 도구에 대해 자세히 알아보고 무료 평가판에 가입하세요.
- **지속적인 프로파일러**: 프로파일링 데이터와 인사이트를 표시하려면 플러그인에서 서비스에 맞게 지속적인 프로파일러를 설정해야 합니다. 자세한 내용은 [지속적인 프로파일러 시작하기][2]를 확인하세요

## 시작하기

### 확장 기능 다운로드 및 설치

1. Visual Studio에서 **Extensions** > **Manage Extensions**로 이동합니다.
2. `Datadog`를 검색합니다. 
3. **Download**를 클릭합니다.
4. Visual Studio를 재시작합니다.

또는 공식 [Visual Studio Marketplace][4]에서 확장 기능을 다운로드 받을 수 있습니다.

### Datadog 계정으로 로그인합니다.

1. Visual Studio에서 **Tools** > **Options** > **Datadog**으로 이동합니다.
2. **Sign In**을 클릭합니다.
3. 브라우저 창이 열리면 사이트와 조직을 선택하고 플랫폼에 대한 액세스 권한을 부여합니다.

### 링크 서비스

1. Visual Studio로 .NET 솔루션 파일을 엽니다.
2. **Extensions** > **Datadog** > **Linked Services**로 이동합니다.
3. **Add Service**를 클릭합니다.
4. .NET 솔루션과 관련된 서비스를 선택합니다.
5. .NET 솔루션 파일을 저장합니다.

## 피드백 

확장 기능에 대한 피드백을 보내주세요! 저희 [토론 포럼][1]에 제공하거나 `team-ide-integration@datadoghq.com`에 이메일을 보내실 수 있습니다. 

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/datadog-for-visual-studio/discussions
[2]: /ko/getting_started/profiler/
[3]: https://www.datadoghq.com/
[4]: https://marketplace.visualstudio.com/items?itemName=Datadog.VisualStudio
[5]: https://docs.datadoghq.com/ko/tracing/error_tracking/
[6]: https://docs.datadoghq.com/ko/security/application_security/vulnerability_management/
[7]: https://docs.datadoghq.com/ko/watchdog/insights