---
further_reading:
- link: /cloudprem/configure/ingress/
  tag: 설명서
  text: CloudPrem Ingress 구성
title: 네트워크
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 Preview에서 만나보세요" >}}
  CloudPrem Preview에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

이 문서에서는 CloudPrem과 Datadog이 서로 통신하는 방식을 다룹니다.

### 기본 동작: CloudPrem이 연결을 시작합니다.

기본적으로 CloudPrem은 DNS 레코드를 추가하거나 퍼블릭 수신를 구성할 필요 없이 API 키를 사용하여 Datadog과 WebSocket 연결을 시작합니다. 이 설정은 인바운드 요청을 허용하지 않는 엄격한 네트워크 정책이 있는 환경에 유용합니다.


### 선택적 동작: 퍼블릭 수신 사용

CloudPrem을 구성하여 Datadog이 연결을 수립할 수 있도록 퍼블릭 수신를 배포할 수 있습니다.

퍼블릭 수신은 Datadog의 컨트롤 플레인 및 쿼리 서비스가 퍼블릭 인터넷을 통해 CloudPrem 클러스터를 관리하고 쿼리할 수 있도록 합니다. mTLS 인증을 사용하여 CloudPrem gRPC API에 대한 안전한 액세스를 제공합니다. CloudPrem 수신에 대한 자세한 내용은 [구성 페이지](/cloudprem/configure/ingress/)에서 확인할 수 있습니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}