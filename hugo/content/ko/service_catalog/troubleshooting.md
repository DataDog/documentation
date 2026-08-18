---
aliases:
- /ko/tracing/service_catalog/troubleshooting
- /ko/service_catalog/guides/troubleshooting
- /ko/api_catalog/troubleshoot/
further_reading:
- link: /tracing/service_catalog/setup/
  tag: 설명서
  text: Service Catalog 설정
title: Service Catalog 문제 해결
---

Datadog Service Catalog에서 예기치 않은 동작이 발생하는 경우 이 가이드가 문제 해결에 도움이 될 수 있습니다. 계속 문제가 발생하면 [Datadog 지원팀][4]에 문의하여 도움을 받으세요.

## 서비스

### APM-계측 서비스가 표시되지 않음

APM에 대해 계측되는 것으로 알고 있는 서비스가 Service Catalog 목록에 나타나지 않는 경우, 선택한 `env`(또는 선택한 기본 태그 값) 또는 [보조 기본 태그][1]에 지난 한 시간 동안 성능 데이터를 전송하지 않았기 때문일 수 있습니다. 확인하려면 **Performance** 탭에서 성능 지표가 표시될 것으로 예상되는 열 위로 마우스를 가져가 서비스가 활성화된 환경 정보를 확인합니다. 

{{< img src="tracing/service_catalog/svc_cat_troubleshooting_1.png" alt="지난 1시간 동안 성능 데이터가 보고되지 않았음을 표시하는 메시지 위에서 마우스를 움직입니다." >}}

### 설정 안내 섹션에 없는 SLO

Service Catalog 설정 안내 섹션의 개수에는 `service` 태그가 있는 SLO의 수가 반영되어 있습니다. SLO가 목록에 없는 경우에는 `service` 태그 값이 지정되어 있는지, APM 및 USM과 같은 다른 제품의 서비스 이름과 일치하는지 확인하세요.

### 서비스에 추가 원격 분석 기능을 사용할 수 있으나 목록에 없음

Service Catalog는 모든 텔레메트리 유형(인프라 메트릭, 로그, 클라우드 네트워크 모니터링)에서 `DD_SERVICE` 태그를 사용하여 특정 서비스의 정보를 수집합니다. Service Catalog에 예상하는 원격 분석 유형이 표시되지 않는 경우 [통합 서비스 태그 지정][2]의 지침에 따라 `DD_SERVICE` 태그를 구성했는지 확인하세요. 

### RUM 서비스의 메타데이터를 추가할 수 없습니다.

RUM 서비스에 메타데이터 추가는 지원되지 않습니다. 

### 여러 서비스가 동일한 메타데이터를 공유함

동일한 메타데이터를 공유하는 서비스가 여러 개 있는 경우 각 서비스마다 별도의 `service.datadog.yaml` 파일이 필요하지 않습니다. 각 서비스를 `---` 구분 기호로 구분하여 하나의 `service.datadog.yaml` 파일에 여러 서비스를 정의할 수 있습니다. 관련 dd-서비스 엔터티의 공유 메타데이터를 복사하여 붙여넣습니다.

### 설정 안내 섹션에 표시되지 않는 연결된 모니터

Service Catalog는 모니터가 서비스 또는 [APM 기본 태그][3]로 태그 또는 범위가 지정되거나 그룹화될 때 서비스에 연결합니다. 

단일 서비스에 대한 **Setup Guidance** 탭에 표시되는 총 모니터 개수에는 음소거된 모니터 및 그룹이 포함되지 않습니다. 

## 엔드포인트

### 누락된 엔드포인트

엔드포인트 목록은 APM 추적을 기반으로 하므로 [서비스가 계측되어 있는지][7] 확인하세요.

### 정의와 일치하는 서비스가 너무 많음

기본적으로 엔드포인트 목록은 정의된 경로에 맞는 모든 인스턴스에 정의를 일치시킵니다.
API 정의에 [서비스 파라미터][6]를 추가하여 특정 서비스로 정의 범위를 지정할 수 있습니다.

### OpenAPI 파일의 원격 분석 데이터 없음

엔드포인트 목록은 APM 추적에서 파생되므로 엔드포인트 추적을 사용할 수 있는 경우에만 트래픽 정보가 표시됩니다. OpenAPI 파일을 업로드한 후 Datadog에서 엔드포인트의 스팬을 수집하면 배포 데이터가 표시됩니다.

### 새 모니터의 데이터 없음

엔드포인트 목록은 APM 추적에 의존하므로 트래픽 정보는 엔드포인트 추적을 사용할 수 있는 경우에만 표시됩니다. 모니터 그래프에 데이터가 표시되지 않는 경우 다음 중 하나가 해당될 수 있습니다.
- 엔드포인트가 OpenAPI를 통해 등록 및 업로드된 이후 엔드포인트에 액세스하지 못했습니다.
- 추적이 Agent측에서 샘플링됩니다. 자세한 내용은 [수집 제어][5]를 참조하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/tracing/guide/setting_primary_tags_to_scope/#add-a-second-primary-tag-in-datadog
[2]: /ko/getting_started/tagging/unified_service_tagging
[3]: /ko/tracing/guide/setting_primary_tags_to_scope
[4]: /ko/help/
[5]: /ko/tracing/trace_pipeline/ingestion_controls/
[6]: /ko/api_catalog/add_metadata/
[7]: /ko/tracing/trace_collection/