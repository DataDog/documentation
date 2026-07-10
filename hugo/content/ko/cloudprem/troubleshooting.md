---
further_reading:
- link: /cloudprem/architecture/
  tag: 설명서
  text: CloudPrem 아키텍처
title: 트러블슈팅
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

이 페이지는 Datadog CloudPrem을 배포하거나 운영할 때 발생할 수 있는 일반적인 문제 해결 지침을 제공합니다. 여기에는 일반적인 오류 메시지, 진단 단계 뿐 아니라 액세스 권한, 스토리지 구성, 구성 요소 상태와 관련된 문제 해결 팁이 포함되어 있습니다. 이 가이드를 활용해 문제를 빠르게 진단하거나 [Datadog 지원팀][1]에 문의하기 전에 필요한 컨텍스트를 미리 파악하세요.


## 액세스 권한

가장 흔한 오류는 객체 스토리지 또는 메타스토어에 대한 액세스 권한 문제에서 발생합니다. 이 문제를 해결하는 가장 쉬운 방법은 `kubectl`을 사용하고 CloudPrem 구성 요소(인덱서 포드, 메타스토어 포드, 검색 포드)의 로그를  확인하는 것입니다.

## 스토리지 오류

AWS 자격 증명을 잘못 설정하면 인덱서 로그에 `Unauthorized`가 포함된 오류 메시지가 표시됩니다.

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Unauthorized, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

지역을 잘못 선택하면 다음과 같은 오류 메시지가 표시됩니다.

```
Command failed: Another error occurred. `Metastore error`. Cause: `StorageError(kind=Internal, source=failed to fetch object: s3://my-bucket/datadog-index/some-id.split)`
```

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/