---
further_reading:
- link: https://www.datadoghq.com/blog/route-logs-with-datadog-log-forwarding/
  tag: 블로그
  text: Datadog 로그 포워딩으로 로그를 타사 시스템으로 라우팅하기
- link: /logs/log_collection
  tag: 설명서
  text: 로그 수집 시작
- link: /logs/log_configuration/pipelines
  tag: 설명서
  text: 로그 파이프라인에 대해 알아보기
- link: /observability_pipelines/
  tag: 설명서
  text: Observability Pipelines로 환경에서 직접 로그를 포워딩하기
- link: https://www.datadoghq.com/blog/microsoft-sentinel-logs/
  tag: 블로그
  text: Datadog에서 로그를 중앙에서 처리하고 관리한 후 Microsoft Sentinel으로 전송하기
- link: /security/events_forwarding
  tag: 설명서
  text: 보안 신호, 스팬 및 기타 이벤트 유형을 사용자 지정 대상으로 전달하기
title: 커스텀 대상으로 로그 전달하기
---
## 개요 {#overview}

로그 포워딩을 사용하면 Datadog에서 Splunk, Elasticsearch, HTTP 엔드포인트와 같은 사용자 지정 대상으로 로그를 전송할 수 있습니다. 즉, [Log Pipelines][1]을 사용하여 Datadog에서 로그를 중앙에서 수집, 처리 및 표준화할 수 있습니다. 그런 다음 Datadog에서 다른 도구로 로그를 전송하여 각 팀의 워크플로우를 지원할 수 있습니다. 인덱싱 여부와 관계없이 수집된 로그 중 원하는 로그를 사용자 지정 대상으로 전달할 수 있습니다. 로그는 기본적으로 JSON 형식으로 전달되며 GZIP으로 압축됩니다.

**참고**: [`logs_write_forwarding_rules`][2] 권한이 있는 Datadog 사용자만 로그 포워딩을 위한 사용자 지정 대상을 [생성][6], [편집][7] 및 [삭제][8]할 수 있습니다.

{{< img src="logs/log_configuration/forwarding/forwarding_page.png" alt="사용자 지정 대상이 강조 표시된 Log Forwarding 페이지 대상 목록에는 Splunk(service:logs-processing으로 필터링됨), HTTP 엔드포인트(source:okta OR source:paloalto로 필터링됨), Elasticsearch(team:acme env:prod로 필터링됨)가 포함됩니다." >}}

로그 포워딩에 실패하면(예: 대상 서비스를 일시적으로 사용할 수 없는 경우) Datadog은 지수 백오프 전략에 따라 2시간 동안 주기적으로 재시도합니다. 첫 재시도는 1분 후에 이루어집니다. 이후 재시도 간격은 점차 늘어나 최대 8~12분(10분을 기준으로 ±20% 분산)까지 증가합니다.

다음 메트릭은 포워딩한 로그를 보고합니다. 재시도 후 포워딩 성공한 로그와 삭제된 로그가 포함됩니다.

- datadog.forwarding.logs.bytes
- datadog.forwarding.logs.count


## 사용자 지정 대상으로 로그 포워딩 설정 {#set-up-log-forwarding-to-custom-destinations}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">로그를 사용자 지정 대상으로 전달하는 작업은 Datadog GovCloud 환경 외부에서 이루어지며, 이는 Datadog의 통제 범위를 벗어납니다. Datadog은 Datadog GovCloud 환경을 벗어난 로그에 대해 책임을 지지 않으며, 여기에는 FedRAMP, DoD Impact Level, ITAR, 수출 규정 준수, 데이터 레지던시 또는 해당 로그에 적용되는 유사 규정과 관련하여 사용자가 부담할 수 있는 의무나 요구 사항이 포함되지만 이에 국한되지 않습니다.
<br><br>
해당 {{< region-param key="dd_datacenter" >}} 사이트의 보안 프로토콜로 인해 로그 포워딩에는 포트 443과 8088만 사용할 수 있습니다. 다른 포트를 사용하려면 <a href="https://www.datadoghq.com/support/">Datadog 지원팀</a>에 문의하세요.</div>
{{< /site-region >}}

1. 다음에 나와 있는 웹훅 IP를 {{< region-param key="ip_ranges_url" link="true" text="IP ranges list">}} 허용 목록에 추가합니다.
1. [로그 아카이빙 및 포워딩][4]으로 이동합니다.
3. {{< ui >}}Custom Destinations{{< /ui >}}를 선택합니다.
4. {{< ui >}}New Destination{{< /ui >}}을 클릭합니다.
5. 포워딩할 로그를 필터링하는 쿼리를 입력합니다. 자세한 내용은 [검색 구문][5]을 참조하세요.
6. {{< ui >}}Destination Type{{< /ui >}}을 선택합니다.

{{< img src="logs/log_configuration/forwarding/log-forwarding-gzip-opt-out.png" alt="새 대상의 설정 단계가 표시된 대상 구성 페이지" style="width:70%;">}}

{{< tabs >}}
{{% tab "HTTP" %}}

7. 대상의 이름을 입력합니다.
8. {{< ui >}}Define endpoint{{< /ui >}} 필드에 로그를 전송할 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다.
    - 예를 들어, 로그를 Sumo Logic에 보내려면 [로그 및 메트릭용 HTTP 소스 설정 문서][1]에 따라 컬렉터(Collector)로 데이터를 전송하기 위한 HTTP 소스 주소 URL을 불러옵니다. {{< ui >}}Define endpoint{{< /ui >}} 필드에 HTTP 소스 주소 URL을 입력합니다.
9. (선택 사항) HTTP 엔드포인트가 압축된 페이로드를 지원하지 않는 경우 GZIP 압축을 비활성화합니다.
10. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 다음 인증 유형 중 하나를 선택하고 관련 세부 정보를 입력합니다.
  | 인증 유형      | 설명                                                                                                              | 예시                                                             |
|--------------------------|--------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------|
| {{< ui >}}Basic Authentication{{< /ui >}} | 로그를 전송할 계정의 사용자 이름과 비밀번호를 입력합니다.                                        | 사용자 이름: `myaccount`<br>비밀번호: `mypassword`                       |
| {{< ui >}}Request Header{{< /ui >}}       | 헤더 이름과 값을 입력합니다. 인증 예시:<br>- {{< ui >}}Header Name{{< /ui >}}에 `Authorization`을 입력합니다.<br>- base64로 인코딩된 `Basic username:password` 형식의 헤더 값을 사용합니다. | 헤더 이름: `Authorization`<br>헤더 값: `Basic bXlhY2NvdW50Om15cGFzc3dvcmQ=` |

[1]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/
{{% /tab %}}

{{% tab "Splunk" %}}

7. 대상의 이름을 입력합니다.
8. {{< ui >}}Configure Destination{{< /ui >}} 섹션에서 로그를 전송하고자 하는 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다. 예를 들어, `https://<your_account>.splunkcloud.com:8088`을 입력합니다.  
    **참고**: `/services/collector/event`는 자동으로 엔드포인트에 추가됩니다.
9. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 Splunk HEC 토큰을 입력합니다. Splunk HEC 토큰에 대한 자세한 내용은 [Splunk HTTP Event Collector 설정 및 사용][1]을 참조하세요.  
    **참고**: [인덱서 승인][2]을 비활성화해야 합니다.
10. (선택 사항) {{< ui >}}Configure Sourcetype{{< /ui >}} 섹션에서 전달된 이벤트에 할당할 Splunk 소스 유형을 지정합니다. Splunk 소스 유형에 대한 자세한 내용은 [소스 유형이 중요한 이유][3]를 참조하세요. 설정하지 않으면 기본 소스 유형 `_json`이 사용됩니다. 소스 유형 없이 이벤트를 전송하려면 **Send without sourcetype**을 선택합니다.

[1]: https://docs.splunk.com/Documentation/Splunk/9.0.1/Data/UsetheHTTPEventCollector
[2]: https://docs.splunk.com/Documentation/Splunk/9.0.3/Data/AboutHECIDXAck
[3]: https://help.splunk.com/en/splunk-enterprise/get-started/get-data-in/10.4/configure-source-types/why-source-types-matter
{{% /tab %}}

{{% tab "Elasticsearch" %}}

7. 대상의 이름을 입력합니다.
8. {{< ui >}}Configure Destination{{< /ui >}} 섹션에 다음 세부 정보를 입력합니다.
  | 설정                        | 설명                                                                                                  | 예시                                  |
|--------------------------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------|
| {{< ui >}}Endpoint{{< /ui >}}                   | 로그를 전송할 엔드포인트를 입력합니다. 엔드포인트는 `https://`로 시작해야 합니다.               | `https://<your_account>.us-central1.gcp.cloud.es.io` (Elasticsearch) |
| {{< ui >}}Destination Index Name{{< /ui >}}     | 로그를 전송할 대상 인덱스의 이름을 지정합니다.                                   | `your_index_name`                        |
| {{< ui >}}Index Rotation{{< /ui >}}             | 필요시 새 인덱스를 생성할 주기를 `No Rotation`, `Every Hour`, `Every Day`, `Every Week`, `Every Month` 중에서 선택합니다. 기본값은 `No Rotation`입니다. | `Every Day`                              |
9. {{< ui >}}Configure Authentication{{< /ui >}} 섹션에서 Elasticsearch 계정의 사용자 이름과 비밀번호를 입력합니다.

{{% /tab %}}

{{% tab "Microsoft Sentinel" %}}

7. 대상의 이름을 입력합니다.
8. Microsoft Sentinel 포워더를 인증하려면 Datadog Azure 통합을 통해 구성된 앱 등록이 필요합니다. Azure 통합을 위한 앱 등록이 이미 있는 경우, 새로 만드는 대신 재사용할 수 있습니다.
9. {{< ui >}}Configure Destination{{< /ui >}} 섹션에서 다음 세부 정보를 입력합니다.
  | 설정                   | 설명                                                                                                          | 예시                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Logs Ingestion Endpoint{{< /ui >}} | 로그가 전송되는 데이터 수집 엔드포인트(DCE)의 엔드포인트를 입력합니다. 이는 DCE 개요 페이지에서 'Logs Ingestion'으로 표시됩니다. | `https://my-dce-5kyl.eastus-1.ingest.monitor.azure.com`   |
| {{< ui >}}Immutable ID{{< /ui >}}           | 로그 라우팅 경로가 정의된 데이터 수집 규칙(DCR)의 변경 불가능한 ID를 지정합니다. 이 ID는 DCR 개요 페이지에서 'Immutable Id'로 표시됩니다.  **참고**: DCR IAM 설정에서 Monitoring Metrics Publisher 역할이 할당되었는지 확인합니다. | `dcr-000a00a000a00000a000000aa000a0aa`                     |
| {{< ui >}}Stream Declaration Name{{< /ui >}}| DCR의 리소스 JSON에서 `streamDeclarations` 아래에 있는 대상 스트림 선언의 이름을 입력합니다. | `Custom-MyTable`                                          |

{{% /tab %}}

{{% tab "Google SecOps(Chronicle)" %}}

7. 대상의 이름을 입력합니다.
8. Google Chronicle Forwarder를 인증하려면 Chronicle 쓰기 권한이 있는 GCP 서비스 계정을 사용해야 합니다.
9. {{< ui >}}Configure Destination{{< /ui >}} 섹션에서 다음 세부 정보를 입력합니다.
  | 설정                   | 설명                                                                                                          | 예시                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Customer ID{{< /ui >}} | Google에서 제공한 Chronicle 고객 ID입니다. | `abcd1234`   |
| {{< ui >}}Regional Endpoint{{< /ui >}}           | 리전에 따라 결정되는 Chronicle 수집 API 엔드포인트 URL입니다.  **참고**: DCR IAM 설정에서 Monitoring Metrics Publisher 역할이 할당되었는지 확인합니다. | `https://us.chronicle.googleapis.com`              |
| {{< ui >}}Namespace{{< /ui >}}| Chronicle 로그를 수집할 네임스페이스입니다.  | `default`                                          |

10. {{< ui >}}Configure authentication settings{{< /ui >}} 섹션에서 다음 세부 정보를 입력합니다.
  | 설정                   | 설명                                                                                                          | 예시                                                   |
|---------------------------|----------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------|
| {{< ui >}}Project ID{{< /ui >}}| Chronicle 인스턴스와 연결된 GCP 프로젝트 ID입니다.  | `my-gcp-chronicle-project`                                          |
| {{< ui >}}Private Key ID{{< /ui >}}| 서비스 계정 자격 증명의 비공개 키 ID입니다.  | `0123456789abcdef`                                          |
| {{< ui >}}Private Key{{< /ui >}}| 서비스 계정 자격 증명의 비공개 키입니다.  | `-----BEGIN PRIVATE KEY-----\nMIIE...`                                          |
| {{< ui >}}Client Email{{< /ui >}}| 서비스 계정의 이메일 주소입니다.  | `chronicle-writer@my-gcp-chronicle-project.iam.gserviceaccount.com`                                          |
| {{< ui >}}Client ID{{< /ui >}}| 서비스 계정 자격 증명의 클라이언트 ID입니다.  | `123456789012345678901`                                          |

{{% /tab %}}

{{< /tabs >}}

10. {{< ui >}}Select Tags to Forward{{< /ui >}} 섹션에서 다음을 수행합니다.
    1. {{< ui >}}All tags{{< /ui >}}, {{< ui >}}No tags{{< /ui >}} 또는 {{< ui >}}Specific Tags{{< /ui >}} 중 무엇을 포함할지 선택합니다.
    1. {{< ui >}}Include{{< /ui >}} 또는 {{< ui >}}Exclude specific tags{{< /ui >}} 중 무엇을 할지 선택하고 포함하거나 제외할 태그를 지정합니다.
11. {{< ui >}}Save{{< /ui >}}를 클릭합니다.


[로그 포워딩][4] 페이지에서 대상의 상태 위로 마우스를 올리면 필터 기준과 일치하고 지난 1시간 동안 포워딩된 로그의 퍼센테이지를 확인할 수 있습니다.

## 대상 편집 {#edit-a-destination}
1. [로그 포워딩][4]으로 이동합니다.
2. {{< ui >}}Custom Destinations{{< /ui >}}를 선택하여 기존 대상의 전체 목록을 확인합니다.
3. 편집하려는 대상의 {{< ui >}}Edit{{< /ui >}} 버튼을 클릭합니다.
4. 설정 페이지에서 필요한 사항을 변경합니다.
5. {{< ui >}}Save{{< /ui >}}를 클릭합니다.

## 대상 삭제 {#delete-a-destination}
1. [로그 포워딩][4]으로 이동합니다.
2. {{< ui >}}Custom Destinations{{< /ui >}}를 선택하여 기존 대상의 전체 목록을 확인합니다.
3. 삭제하려는 대상의 {{< ui >}}Delete{{< /ui >}} 버튼을 클릭하고 {{< ui >}}Confirm{{< /ui >}}을 클릭합니다. 이렇게 하면 구성된 대상 목록에서 해당 대상이 제거되고 더 이상 로그가 해당 대상으로 포워딩되지 않습니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/log_configuration/pipelines/
[2]: /ko/account_management/rbac/permissions/?tab=ui#log-management
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding/custom-destinations
[5]: /ko/logs/explorer/search_syntax/
[6]: /ko/logs/log_configuration/forwarding_custom_destinations#set-up-log-forwarding-to-custom-destinations
[7]: /ko/logs/log_configuration/forwarding_custom_destinations#edit-a-destination
[8]: /ko/logs/log_configuration/forwarding_custom_destinations#delete-a-destination
[9]: /ko/security/events_forwarding/