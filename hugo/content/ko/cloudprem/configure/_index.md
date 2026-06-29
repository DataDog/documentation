---
description: 최적의 성능과 보안을 위해 CloudPrem 배포를 구성하고 맞춤 설정하는 방법을 알아보세요.
further_reading:
- link: /cloudprem/install/
  tag: 설명서
  text: CloudPrem 설치
- link: /cloudprem/operate/sizing/
  tag: 설명서
  text: 클러스터 크기 조정
title: CloudPrem 구성
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem을 평가판에서 만나보세요" >}}
  CloudPrem 평가판에 참여하여 새로운 자체 호스팅 로그 관리 기능을 확인해 보세요.
{{< /callout >}}

## 개요

CloudPrem을 설치한 후에는 환경, 보안 및 성능 요구 사항에 맞게 배포를 구성할 수 있습니다. 주요 구성 영역에는 계정 통합, 클라우드 리소스 설정, 클러스터 크기 조정, 인그레스 및 처리 옵션이 포함됩니다. 이러한 설정을 통해 특정 요구 사항에 맞게 CloudPrem을 맞춤 설정할 수 있습니다.

Logs 메뉴에 CloudPrem 항목이 표시되지 않으면 계정에 CloudPrem이 활성화되지 않은 것입니다. 계정에 CloudPrem을 활성화하려면 [CloudPrem Preview][1]에 참여하세요.

{{< whatsnext desc="CloudPrem 배포를 맞춤 설정하세요:">}}
   {{< nextlink href="/cloudprem/configure/indexes/" >}}인덱스 구성{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/pipelines/" >}}처리 구성{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/ingress/" >}}Ingress 구성{{< /nextlink >}}
   {{< nextlink href="/cloudprem/configure/lambda/" >}}Lambda Search Offloading{{< /nextlink >}}
{{< /whatsnext >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/product-preview/cloudprem/