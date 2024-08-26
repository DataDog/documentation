---
categories:
- cloud
dependencies: []
description: Alibaba Cloud 서비스를 Datadog와 통합
doc_link: https://docs.datadoghq.com/integrations/alibaba_cloud/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-alibaba-cloud-datadog/
  tag: 블로그
  text: Datadog로 Alibaba Cloud 모니터링하기
git_integration_title: alibaba_cloud
has_logo: true
integration_id: alibaba-cloud
integration_title: Alibaba Cloud
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: alibaba_cloud
public_title: Datadog-Alibaba Cloud 통합
short_description: Alibaba Cloud 서비스를 Datadog와 통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< site-region region="gov" >}}
<div class="alert alert-warning">Datadog Alibaba Cloud 통합은 Datadog for Government 사이트를 지원하지 않습니다.</div>
{{< /site-region >}}

## 개요

Alibaba Cloud를 연결해 다음에서 메트릭을 얻을 수 있습니다.

- Alibaba Cloud Servers Load Balancer(SLB)
- Alibaba Elastic Compute Service 인스턴스
- RDS 인스턴스용 Alibaba Cloud ApsaraDB
- Redis 인스턴스용 Alibaba Cloud ApsaraDB 
- Alibaba Cloud Content Delivery Network(CDN) 인스턴스
- Alibaba Cloud Container Service 클러스터
- Alibaba Cloud Express Connect 인스턴스

## 설정

### 설치

[Datadog-Alibaba Cloud 통합 구성 타이틀][1]로 이동해 _add account_를 누릅니다.

### 설정

다음 파라미터를 입력해 Datadog와 Alibaba Cloud API를 통합합니다.

- **`Account Id`**

Alibaba Cloud 콘솔 우측 상단에 있는 아바타에 마우스 커서를 올리고 _Security Settings_를 선택해 찾을 수 있습니다. 계정 ID가 상단 페이지에 표시됩니다.

{{< img src="integrations/alibaba_cloud/account_id_ac.png" alt="계정 ID AC" style="width:30%;">}}

- **`Access Key Id`** & **`Access Key Secret`**

Alibaba Cloud Account에서 다음을 실행하세요.

1. 다음 파라미터를 사용해 _RAM_ 탭에서 새 사용자를 생성하세요.

    - `Logon Name`: Datadog
    - `display name`: Datadog
    - `description`: Datadog-Alibaba Cloud 통합의 Datadog 사용자

2. _Programmatic Access_를 선택합니다.

    {{< img src="integrations/alibaba_cloud/ac_programmatic_access.png" alt="프로그램적 액세스" style="width:40%;">}}

3. _OK_를 누르고 `AccessKeyID`와 `AccessKeySecret`을 [Datadog-Alibaba Cloud 통합 타이틀][1]에 복사 및 붙여넣기 한 후 _install integration_을 클릭합니다.

    {{< img src="integrations/alibaba_cloud/ac_access_keys.png" alt="AC 액세스 키" style="width:40%;">}}

4. Alibaba Cloud Account에서 방금 생성한 사용자에 `Add Permissions`를 선택하고 다음 권한을 모두 추가합니다.

    ```text
    AliyunCloudMonitorReadOnlyAccess
    AliyunECSReadOnlyAccess
    AliyunKvstoreReadOnlyAccess
    AliyunRDSReadOnlyAccess
    AliyunSLBReadOnlyAccess
    AliyunCDNReadOnlyAccess
    AliyunCSReadOnlyAccess
    AliyunExpressConnectReadOnlyAccess
    ```

5. _Update_를 누르고 15분 정도가 지나면 Datadog-Alibaba Cloud 통합 타이틀의 _Metrics_ 탭에 나타난 메트릭이 [메트릭 탐색기 페이지][2]에 나타납니다. 기존 태그와 더불어 리소스에 추가한 커스텀 태그를 여기에서 찾을 수 있습니다.

    - [kvstore/redis DescribeInstances][3]
    - [ECS DescribeInstances][4]
    - [DescribeDBInstances][5]
    - [DescribeLoadBalancers][6]

6. 선택 사항 - [Datadog-Alibaba Cloud 통합 타이틀][1]에서 `Optionally Limit Metrics Collection`을 설정하세요. 이 Alibaba Cloud 태그 목록은 쉼표로 분리되어 있고, `<KEY:VALUE>` 형식이며, Alibaba Cloud에서 메트릭을 수집할 때 사용할 필터를 정의합니다. 단일 문자에 `?`를 사용하거나 다수 문자에 `*`를 사용하는 등, 와일드 카드를 사용할 수 있습니다. 정의된 레이블과 일치하는 호스트만  Datadog로 가져오고, 나머지는 무시됩니다. 해당 레이블과 일치하는 호스트의 레이블 앞에 `!`를 붙여 제외할 수 있습니다.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "alibaba_cloud" >}}


### 이벤트

Alibaba Cloud 이벤트는 Alibaba Cloud 서비스 별로 수집됩니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원센터][8]로 연락하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/integrations/alibaba_cloud
[2]: https://app.datadoghq.com/metric/explorer
[3]: https://www.alibabacloud.com/help/doc-detail/60933.htm
[4]: https://www.alibabacloud.com/help/doc-detail/25506.htm
[5]: https://www.alibabacloud.com/help/doc-detail/26232.htm
[6]: https://www.alibabacloud.com/help/doc-detail/27582.htm
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/alibaba_cloud/alibaba_cloud_metadata.csv
[8]: https://docs.datadoghq.com/ko/help/