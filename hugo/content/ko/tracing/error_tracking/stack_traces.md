---
description: Error Tracking이 스택 트레이스를 사용하여 오류를 지문으로 식별하고 그룹화하는 방법을 알아봅니다.
further_reading:
- link: /tracing/error_tracking/
  tag: 설명서
  text: 백엔드 서비스 Error Tracking에 대해 알아보기
- link: /tracing/error_tracking/error_grouping/
  tag: 설명서
  text: 오류 그룹화에 대해 알아보기
title: Error Tracking의 스택 트레이스
---
## 개요 {#overview}

Error Tracking은 오류 스팬의 스택 트레이스를 사용하여 오류를 지문으로 식별하고, 이를 이슈로 그룹화하며, 발생 위치를 표시합니다. 이 페이지에서는 Error Tracking이 스택 트레이스를 위해 어떤 스팬 속성을 읽는지, 그리고 Error Tracking이 서비스의 언어와 트레이서 버전에 따라 어떻게 달라지는지 설명합니다.

## 스택 트레이스 스팬 속성 {#stack-trace-span-attributes}

오류 스팬은 `error.stack` [스팬 속성][1]에 스택 트레이스를 보고합니다. 대부분의 트레이서에서 `error.stack`에는 오류가 처리될 때(예: `catch` 블록 또는 미들웨어에서) 캡처된 스택 트레이스가 포함됩니다. 이것이 항상 오류가 발생한 지점은 아닙니다.

`dd-trace-go` v2.7.0 이상으로 계측된 Go 서비스의 경우, 처리 스택 트레이스가 `error.handling_stack` 속성에 별도로 보고됩니다. 이때, `error.stack`에는 오류가 발생한 시점에 캡처된 스택 트레이스가 사용 가능하다면 대신 포함됩니다.

## Error Tracking에서 사용하는 스택 트레이스 {#which-stack-trace-is-used-by-error-tracking}

### Go 서비스의 경우 {#for-go-services}

Go 서비스의 경우, Error Tracking에는 사용할 스택 트레이스를 결정하기 위한 대체 메커니즘이 있습니다.

- Go 트레이서 v2.7.0 이상
  - 발생 스택 트레이스는 `error.stack`에 보고됩니다. 이 스택 트레이스는 사용 가능한 경우에 사용됩니다.
  - 처리 스택 트레이스는 `error.handling_stack`에 보고됩니다. 이 스택 트레이스는 발생 스택 트레이스를 사용할 수 없는 경우에 사용됩니다.
- v2.7.0 이전의 Go 트레이서
  - 발생 스택 트레이스는 `error.details`에 보고됩니다. 이 스택 트레이스는 사용 가능한 경우에 사용됩니다.
  - 처리 스택 트레이스는 `error.stack`에 보고됩니다. 이 스택 트레이스는 발생 스택 트레이스를 사용할 수 없는 경우에 사용됩니다.

### 기타 모든 언어의 경우 {#for-all-other-languages}

기타 모든 언어의 경우, 처리 스택 트레이스가 캡처되어 `error.stack`에 보고됩니다. 이 속성은 Error Tracking에서 이슈를 그룹화하고 의심되는 커밋과 같은 정보를 도출하는 데 사용됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/visualization/trace/?tab=spantags#more-information