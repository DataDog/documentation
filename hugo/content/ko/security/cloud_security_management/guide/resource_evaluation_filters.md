---
further_reading:
- link: /security/cloud_security_management/guide
  tag: 설명서
  text: Cloud Security Management 가이드
- link: /security/cloud_security_management/setup
  tag: 설명서
  text: 클라우드 보안 관리 설정
title: 필터를 사용하여 평가에서 리소스 제외
---

리소스 태그를 사용하여 CSM(클라우드 보안 관리)의 평가에서 리소스를 포함하거나 제외하는 필터를 생성할 수 있습니다. 필터는 쉼표로 구분된 `key:value` 쌍 목록으로 지정되어야 합니다.

**참조**:

- 리소스 평가 필터는 클라우드 통합에 의해 스캔되는 호스트에만 사용할 수 있습니다.
- 태그는 리소스에 직접 적용되어야 합니다. 필터는 Datadog에 추가된 사용자 태그를 고려하지 않습니다. AWS 및 Google Cloud Platform용 통합 타일에 추가된 태그는 예외입니다.

| 형식                       | 값        |
|------------------------------|--------------|
| 허용 목록                    | `key:value`  |
| 차단 목록                    | `!key:value` |
| 싱글 문자 와일드카드    | `?`          |
| 멀티 문자 와일드카드 | `*`          |

허용 목록을 사용하면 CSM이 리소스를 평가하기 위해 리소스에 적용해야 하는 태그를 지정할 수 있습니다. 허용 목록 태그는 OR 문으로 평가됩니다. 즉, 리소스를 평가하려면 허용 목록 태그 중 하나 이상이 있어야 합니다. 반면, 차단 목록에 있는 태그는 AND 문으로 평가되며 허용 목록 태그보다 우선 적용됩니다.

**예시**:

- `!env:staging`는 `env:staging` 태그가 있는 리소스를 제외합니다.
- `datadog:monitored, env:prod*`는 이러한 태그 중 하나 이상을 가진 리소스에 대한 메트릭을 수집합니다.
- `!env:staging, !testing`은 `env:staging` 및 `testing` 태그가 있는 리소스를 제외합니다.
- `datadog:monitored !region:us-east1`는 리소스에 `region:us-east1` 태그가 적용되지 않은 경우 `datadog:monitored` 태그가 있는 리소스에 대한 메트릭을 수집합니다.

## 평가에서 리소스 제외

{{< tabs >}}
{{% tab "AWS" %}}

1. [**Cloud Security Management Setup** 페이지][1]에서 **Cloud accounts**를 클릭합니다.
2. **AWS** 섹션을 확장합니다.
3. **Resource Evaluation Filters (Optional)**에서 필터를 추가하려는 계정에 대한 **Plus** (+) 아이콘을 클릭합니다.
4. 허용 목록 또는 차단 목록에 추가할 태그의 `key:value`쌍을 쉼표로 구분한 목록을 입력합니다.
5. **저장**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Azure" %}}

1. [**Cloud Security Management Setup** 페이지][1]에서 **Cloud accounts**를 클릭합니다.
2. **Azure** 섹션을 확장합니다.
3. 구독을 확장합니다.
3. **Resource Evaluation Filters (Optional)**에서 **Plus** (+) 아이콘을 클릭합니다.
4. 허용 목록 또는 차단 목록에 추가할 태그의 `key:value`쌍을 쉼표로 구분한 목록을 입력합니다
5. **저장**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{% tab "Google Cloud" %}}

1. [**Cloud Security Management Setup** 페이지][1]에서 **Cloud accounts**를 클릭합니다.
2. **GCP** 섹션을 확장합니다.
3. 프로젝트를 확장합니다.
3. **Resource Evaluation Filters (Optional)**에서 **Plus** (+) 아이콘을 클릭합니다.
4. 허용 목록 또는 차단 목록에 추가할 태그의 `key:value`쌍을 쉼표로 구분한 목록을 입력합니다
5. **저장**을 클릭합니다.

[1]: https://app.datadoghq.com/security/configuration/csm/setup

{{% /tab %}}
{{< /tabs >}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}