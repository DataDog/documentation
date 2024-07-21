---
disable_toc: true
kind: 설명서
title: 단일 단계 계측을 사용하여 ASM 활성화
---

<div class="alert alert-info">단일 단계 계측을 사용한 ASM 활성화는 베타 버전입니다.</div>

## 개요

애플리케이션을 계측하고 ASM을 활성화하면 수동 개입을 최소화하면서 광범위한 표준 작업 및 널리 사용되는 프레임워크에서 보안에 대한 인사이트를 빠르게 확보할 수 있습니다. 단일 단계 계측으로 Datadog Agent를 설치하거나 코드에 [Datadog 추적 라이브러리를 수동으로 추가][1]할 때 애플리케이션을 자동으로 계측할 수 있습니다.

다음 문서에서는 위협 탐지 및 보호 기능과 코드 보안을 위해 단일 단계 계측으로 ASM을 활성화하는 지침을 제공합니다.

{{< whatsnext desc=" " >}}
    {{< nextlink href="/security/application_security/enabling/single_step/threat_detection" >}}단일 단계 계측을 사용하여 위협 탐지 및 보호를 위해 ASM 활성화{{< /nextlink >}}

     {{< nextlink href="/security/application_security/enabling/single_step/code_security" >}}단일 단계 계측을 사용하여 코드 보안을 위해 ASM 활성화{{< /nextlink >}}
{{< /whatsnext >}}

[1]:/ko/security/application_security/enabling/tracing_libraries/