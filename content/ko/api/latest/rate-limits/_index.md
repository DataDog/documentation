---
title: 속도 제한
type: 설명서
---

{{< h2 >}}속도 제한{{< /h2 >}}

많은 API 엔드포인트에는 속도 제한이 있습니다. 특정 기간에 특정 요청 횟수를 초과하면 Datadog은 오류를 반환합니다.

속도 제한이 있는 경우 응답 코드에 429가 표시됩니다. `X-RateLimit-Period` 로 지정된 시간만큼 기다린 후 다시 호출하거나 `X-RateLimit-Limit` 또는 `X-RateLimit-Period` 보다 약간 긴 빈도로 호출하도록 전환할 수 있습니다.

[Datadog 고객 지원팀에 문의][1]하여 기본값에서 속도 제한을 늘릴 수 있습니다.

API 속도 제한 정책 관련:

- Datadog은 데이터 포인트/메트릭 제출에 **제한을 두지 않습니다**(메트릭 제출 속도가 처리되는 방식은 [메트릭 섹션][2] 참조). 제한 발생은 사용자의 동의를 기반으로 [커스텀 메트릭][3] 수량에 따라 달라집니다.
- 로그 전송을 위한 API에는 속도 제한이 없습니다.
- 이벤트 제출에 대한 속도 제한은 조직당 분당 `50,000` 이벤트입니다.
- 엔드포인트에 대한 속도 제한은 다양하며 아래 헤더에서 자세한 내용을 확인하실 수 있습니다. 이러한 제한은 필요에 따라 연장할 수 있습니다.

<div class="alert alert-danger">
위의 목록은 Datadog API의 모든 속도 제한을 포함하고 있지 않습니다. 속도 제한이 발생하는 경우, 사용 중인 API와 속도 제한에 대해 <a href="https://www.datadoghq.com/support/">고객 지원팀</a>에 문의하세요.
</div>

| 속도 제한 헤더      | 설명                                              |
| ----------------------- | -------------------------------------------------------- |
| `X-RateLimit-Limit`     | 특정 기간 동안 허용되는 요청 횟수.             |
| `X-RateLimit-Period`    | 재설정(캘린더 정렬)에 걸리는 시간(초). |
| `X-RateLimit-Remaining` | 현재 기간 동안 남은 허용된 요청 수.  |
| `X-RateLimit-Reset`     | 다음 재설정까지의 시간(초).                        |
| `X-RateLimit-Name`      | 증가 요청에 대한 속도 제한의 이름            |

### Datadog API 사용량 메트릭

모든 Datadog API에는 지정된 기간 동안 사용 제한이 있습니다. API는 고유하고 별개의 속도 제한 버킷을 가질 수 있거나 사용되는 리소스에 따라 단일 버킷으로 그룹화될 수 있습니다. 예를 들어, 모니터 상태 API에는 인간 또는 자동화 스크립트가 분당 일정 횟수만 쿼리할 수 있도록 하는 속도 제한이 있습니다. 엔드포인트는 429 응답 코드와 재설정 기간이 만료될 때까지 백오프하라는 힌트와 함께 과도한 요청을 거부합니다. API 사용 메트릭을 통해 Datadog 사용자는 API 엔드포인트(메트릭, 로그 및 이벤트 제출 엔드포인트 제외)에 대한 API 속도 제한 사용을 셀프로 제공하고 감사할 수 있습니다. 이러한 메트릭은 허용 및 차단된 요청을 보여주며 다음과 같은 차원 및 사용 가능한 태그와 함께 제공됩니다.

{{% site-region region="us" %}}[Datadog API 속도 제한 사용 대시보드](https://app.datadoghq.com/dash/integration/31668/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="eu1" %}}[Datadog API 속도 제한 사용 대시보드](https://app.datadoghq.eu/dash/integration/1386/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="us3" %}}[Datadog API 속도 제한 사용 대시보드](https://us3.datadoghq.com/dash/integration/2248/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="us5" %}}[Datadog API 속도 제한 사용 대시보드](https://us5.datadoghq.com/dash/integration/1421/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="ap1" %}}[Datadog API 속도 제한 사용 대시보드](https://ap1.datadoghq.com/dash/integration/2698/datadog-api-rate-limit-usage){{% /site-region %}}
{{% site-region region="gov" %}}[Datadog API 속도 제한 사용 대시보드](https://app.ddog-gov.com/dash/integration/1330/datadog-api-rate-limit-usage){{% /site-region %}}

#### 사용 가능한 메트릭

<table>
  <thead>
    <th>차원</th>
    <th>사용 메트릭</th>
    <th>설명</th>
    <th>사용 가능한 태그</th>
  </thead>
  <tr>
    <td rowspan="2"><strong>조직</strong></td>
    <td><code>datadog.apis.usage.per_org</code></td>
    <td>특정 엔드포인트의 API 요청 수에 대한 조직 전체의 속도 제한</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_org_ratio</code></td>
    <td>허용된 총 요청 수(<code>limit_count</code>)에 대한 사용 가능한 차원별 API 요청의 비율</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>사용자 (UUID)</strong></td>
    <td><code>datadog.apis.usage.per_user</code></td>
    <td>고유 사용자당 속도가 제한되는 특정 API 엔드포인트에 대한 API 요청 횟수</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_user_ratio</code></td>
    <td>허용된 총 요청 수(<code>limit_count</code>)에 대한 사용 가능한 차원별 API 요청의 비율</td>
    <td>
    <ul>
      <li><code>app_key_id</code><br /></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code><br /></li>
      <li><code>limit_name</code><br /></li>
      <li><code>limit_period</code><br /></li>
      <li><code>rate_limit_status</code><br /></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td rowspan="2"><strong>API 키</strong></td>
    <td><code>datadog.apis.usage.per_api_key</code></td>
    <td>사용된 고유 API 키당 속도가 제한된 특정 API 엔드포인트에 대해 수행된 API 요청 수</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
  <tr>
    <td><code>datadog.apis.usage.per_api_key_ratio</code></td>
    <td>허용된 총 요청 수(<code>limit_count</code>)에 대한 사용 가능한 차원별 API 요청의 비율</td>
    <td>
    <ul>
      <li><code>app_key_id</code></li>
      <li><code>child_org</code> (on parent only)</li>
      <li><code>limit_count</code></li>
      <li><code>limit_name</code></li>
      <li><code>limit_period</code></li>
      <li><code>rate_limit_status</code></li>
      <li><code>user_uuid</code></li>
    </ul>
    </td>
  </tr>
</table>


#### 태그 키


| 태그 이름            | 설명                                                                                                               |
|---------------------|---------------------------------------------------------------------------------------------------------------------------|
| `app_key_id`        | API 클라이언트가 사용하는 애플리케이션 키 ID. 웹 또는 모바일 사용자와 오픈 엔드포인트에 대해 `N/A`일 수 있습니다.                      |
| `child_org`         | 상위 조직에서 확인할 때의 하위 조직 이름. 해당되지 않으면 `N/A`로 설정합니다. 이는 동일한 데이터 센터 내에서만 적용됩니다. |
| `limit_count`       | 요청 기간 동안 각 속도 제한 이름에 대해 사용 가능한 요청 수.                                             |
| `limit_name`        | 속도 제한의 이름. 다른 엔드포인트는 동일한 이름을 공유할 수 있습니다.                                                          |
| `limit_period`      | 각 속도 제한 이름에 대한 사용 횟수가 재설정되기 전의 시간(초).                                           |
| `rate_limit_status` | `passed`: 요청이 차단되지 않았습니다.<br />`blocked`: 속도 제한 위반으로 인해 요청이 차단되었습니다.                       |
| `user_uuid`         | API 사용을 위한 사용자의 UUID.                                                                                         |

#### 위젯에서 롤업

일반적으로 메트릭 시각화는 sum(60s)를 사용하여 분 단위로 집계하여 분당 총 요청 수를 집계해야 합니다.

비율 메트릭은 이미 해당 `limit_period`로 정규화되어 있습니다.

##### 사용 사례

속도 제한 이름별 요청
: `limit_name`별 `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user`, `datadog.apis.usage.per_api_key`의 합계를 그래프로 표시<br /><br />
  **예시:** `default_zero(sum:datadog.apis.usage.per_org{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{*} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{*} by {limit_name})`

속도 제한 이름으로 차단됨
: `rate_limit_status:blocked`를 사용해 `limit_name`별 `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user`, `datadog.apis.usage.per_api_key`의 합계를 그래프로 표시<br /><br />
  **예시:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked} by {limit_name}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked} by {limit_name})`

사용자가 차단한 엔드포인트
: `rate_limit_status:blocked` 및  `limit_name:example`을 사용해 `user_uuid`별 `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user`, `datadog.apis.usage.per_api_key`의 합계를 그래프로 표시<br /><br />
  **예시:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {user_uuid}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {user_uuid})`

앱 키 ID로 차단된 엔드포인트
: `rate_limit_status:blocked` 및 `limit_name:example`을 사용해 `app_key_id`별 `datadog.apis.usage.per_org`, `datadog.apis.usage.per_user`, `datadog.apis.usage.per_api_key`의 합계를 그래프로 표시<br /><br />
  **예시:** `default_zero(sum:datadog.apis.usage.per_org{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_user{rate_limit_status:blocked,limit_name:example} by {app_key_id}) + default_zero(sum:datadog.apis.usage.per_api_key{rate_limit_status:blocked,limit_name:example} by {app_key_id})`

속도 제한 이름별 사용된 속도 제한 비율
: `limit_name`별 `datadog.apis.usage.per_org_ratio`, `datadog.apis.usage.per_user_ratio`, `datadog.apis.usage.per_api_key_ratio`의 합계를 그래프로 표시<br /><br />
  **예시:** `default_zero(max:datadog.apis.usage.per_org_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_user_ratio{*} by {limit_name}) + default_zero(max:datadog.apis.usage.per_api_key_ratio{*} by {limit_name})`


### 속도 제한 늘리기
**Help** > **New Support Ticket**에서 Support 티켓을 생성하여 속도 제한 증가를 요청할 수 있습니다. 속도 제한 증가 요청을 받으면 Support Engineering 팀이 사례별로 요청을 검토하고 필요한 경우 내부 엔지니어링 리소스와 협력하여 속도 제한 증가 요청의 실행 여부를 확정합니다.

    제목:
        Request to increase rate limit on endpoint: X (엔드포인트: X에 대한 속도 제한 증가 요청)

    세부 내용:
        API 엔드포인트: X에 대한 속도 제한 증가를 요청하고 싶습니다.
        사용 사례/쿼리 예시:
            예제 페이로드가 포함된 cURL 또는 URL 형태의 예시 API 호출

        속도 제한 증가 요청 사유:
            예시 - Our organization uses this endpoint to right size a container before we deploy. This deployment takes place every X hours or up to Y times per day. (우리 조직은 배포 전 이 엔드포인트를 사용하여 컨테이너 크기를 조정합니다. 이 배포는 X시간마다 또는 하루에 최대 Y번까지 이루어집니다.)

        원하는 속도 제한:
            팁 - 원하는 특정 제한 또는 비율 증가를 제시하면 Support Engineering 팀과 내부 엔지니어링 팀이 신속하게 검토하는 데 도움이 됩니다.

Datadog 지원팀이 사용 사례를 검토하고 승인한 후, 백그라운드에서 속도 제한 증가를 적용할 수 있습니다. Datadog의 SaaS 특성상 속도 제한 증가에 대한 최대 한도가 있다는 점을 유의해 주세요. Datadog 지원팀은 사용 사례 및 엔지니어링 권장 사항에 따라 속도 제한 증가를 거부할 권리가 있습니다.

### 감사 로그
API 제한 및 사용 메트릭은 사용 패턴과 차단된 요청에 대한 인사이트를 제공합니다. 추가 정보가 필요한 경우 Audit Trail에서 API 활동에 대해 자세히 확인해 보세요.

Audit Trail을 사용해 다음과 같은 데이터를 확인할 수 있습니다.
* **IP 주소 및 지리적 위치** – API 요청이 시작된 위치를 식별합니다.
* **액터 유형** – 서비스 계정과 사용자 계정을 구분합니다.
* **API vs. 앱 키 인증** – 요청이 API 키를 통해 이루어졌는지, 아니면 사용자가 직접 했는지 확인합니다.
* **상관된 이벤트** – 구성 변경이나 보안 관련 작업 등 동시에 발생하는 다른 이벤트를 확인합니다.

Audit Trail이 제공하는 API 사용 및 차단된 요청에 대한 컨텍스트는 속도 제한 문제를 해결하는데 도움이 됩니다. 또한 보안 및 규정 준수 목적으로 조직 전체에서 API 사용을 추적할 수 있습니다.

API 활동을 더 자세히 확인하려면 **[Audit Trail][4]**을 사용하는 것이 좋습니다.


[1]: /ko/help/
[2]: /ko/api/v1/metrics/
[3]: /ko/metrics/custom_metrics/
[4]: /ko/account_management/audit_trail/events/