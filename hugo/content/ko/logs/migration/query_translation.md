---
description: Splunk SPL 쿼리를 Datadog 구문으로 변환하고 Splunk 알림과 대시보드를 Datadog 모니터와 대시보드로
  전환하세요.
further_reading:
- link: /logs/explorer/search_syntax/
  tag: 설명서
  text: 로그 검색 구문
- link: /ddsql_editor/
  tag: 설명서
  text: DDSQL 에디터
- link: /monitors/types/log/
  tag: 설명서
  text: 로그 모니터
- link: /dashboards/
  tag: 설명서
  text: Dashboards
title: Query Translation
---
## 개요 {#overview}

Migration 앱의 일부인 Query Translation은 Splunk Processing Language(SPL)를 Datadog [로그 검색 구문][1]으로 변환하고 Splunk 자산을 Datadog에서 이에 상응하는 항목으로 마이그레이션합니다. 쿼리 변환 시 두 가지 도구를 이용할 수 있습니다.

| 도구 | 사용 사례 |
|------|-----------|
| [변환][2] | 단일 SPL 쿼리를 변환하고 변환에 대한 설명과 함께 이에 상응하는 Datadog 쿼리를 확인합니다. |
| [가져오기][3] | Splunk 알림과 대시보드에서 내보낸 CSV 파일을 가져오고 해당 쿼리를 로그 검색 구문으로 변환합니다. 결과를 검토한 다음 이에 상응하는 Datadog 모니터와 대시보드를 생성하세요. |

Query Translation은 소스 플랫폼으로 Splunk만 지원합니다. 대규모 언어 모델이 아닌 변환 라이브러리를 사용하여 쿼리를 결정론적으로 구문 분석하고 변환합니다. 각 쿼리는 로그 탐색기, 로그 모니터 및 대시보드 위젯에서 사용할 수 있도록 (가능한 경우) [로그 검색 구문][1]으로 변환됩니다. 분석적으로 복잡하여 로그 검색 구문으로 표현할 수 없는 쿼리는 [DDSQL][4]로 대체됩니다.

## 권한 {#permissions}

Splunk 자산을 가져오려면 `logs_read_config` 권한이 필요합니다. 변환된 리소스를 게시하려면 생성하고 있는 자산에 대한 권한도 필요합니다. 모니터링에는 `monitors_write`, 대시보드에는 `dashboards_write` 권한이 필요합니다. [Datadog 역할 권한][5]을 참조하세요.

## 단일 쿼리 변환 {#translate-a-single-query}

Translate 페이지를 SPL용 샌드박스로 사용하세요. 이 페이지는 자산 인벤토리를 마이그레이션하는 것이 아니라 변환 동작을 탐색하는 용도로 설계되었습니다.

1. [Logs > Translate][2]로 이동합니다.
2. 쿼리 상자에 SPL 쿼리를 붙여넣거나 제공된 예시 중 하나를 선택합니다.
3. {{< ui >}}Translate{{< /ui >}}를 클릭합니다.

그러면 페이지가 다음을 반환합니다.

- **변환된 쿼리**: {{< ui >}}Translation preview{{< /ui >}} 차트 위의 검색 표시줄에 표시되는 로그 검색 구문 또는 DDSQL 형식의 Datadog 쿼리입니다.
- {{< ui >}}Translation preview{{< /ui >}}: 사용자가 지정한 시간 범위 동안 변환된 쿼리와 일치하는 데이터입니다. [로그 탐색기][6]에서 작업을 계속하려면 {{< ui >}}View in Log Explorer{{< /ui >}}를 클릭하세요.
- {{< ui >}}Translated SPL{{< /ui >}}: 제거된 인덱스나 지원되지 않는 명령 등, 변환기가 변경했거나 변환할 수 없었던 내용이 주석으로 달린 원본 SPL입니다.
- {{< ui >}}How did we translate?{{< /ui >}}: 어떤 SPL 명령이 Datadog 쿼리의 어느 부분에 매핑되는지에 대한 설명입니다.

변환된 쿼리로 모니터를 생성하려면 {{< ui >}}Create Monitor{{< /ui >}}를 클릭하세요.

## 자산 일괄 마이그레이션 {#migrate-assets-in-bulk}

Import 페이지에서는 여러 Splunk 자산을 한 번에 마이그레이션합니다. Splunk 인벤토리를 CSV 파일로 업로드하면 도구가 이를 명명된 가져오기 항목으로 그룹화합니다. 그리고 각 자산의 쿼리를 Datadog 구문으로 변환하고 이에 상응하는 Datadog 모니터 또는 대시보드를 생성합니다. 각 결과를 검토한 다음 게시하여 Datadog에서 자산을 생성할 수 있습니다. 지원되는 리소스 유형은 다음과 같습니다.

| Splunk 리소스 | 이에 상응하는 Datadog 항목 | 참고 |
|-----------------|--------------------|-------|
| 알림(저장된 검색) | [모니터][7] | 가능한 경우 로그 모니터로 변환됩니다. 그렇지 않은 경우에는 DDSQL 쿼리를 사용하는 분석 모니터로 변환됩니다. |
| 대시보드 | [대시보드][8] | Studio(JSON) 및 Classic(XML) 대시보드가 모두 지원됩니다. 각 패널은 별도의 위젯으로 변환됩니다. |
| 검색 매크로 | 없음 | 변환에 앞서, 도구가 알림과 대시보드에 있는 각 매크로 참조를 해당 매크로의 SPL 정의로 바꿉니다. 매크로는 Datadog 자산으로 게시되지 않습니다. |

### Splunk에서 자산 내보내기 {#export-your-assets-from-splunk}

Splunk의 각 리소스 유형을 별도의 CSV 파일로 내보내세요.

1. Splunk에 로그인하고 Search 앱을 엽니다.
2. 내보내려는 리소스 유형에 맞는 쿼리를 실행합니다.

   알림:
   ```
   | rest /services/saved/searches splunk_server=local
   | table
     title
     eai:acl.owner
     eai:acl.app
     search
     triggered_alert_count
     alert_condition
     alert_threshold
     alert_comparator
     alert_type
     actions
     action.email.to
     action.email.message.alert
     action.slack.param.channel
     action.slackparam.message
     description
   ```

   대시보드:
   ```
   | rest /servicesNS/admin/search/data/ui/views
   | spath input=eai:data path=dashboard.definition output=definition
   | spath input=eai:data path=dashboard output=dashboard_xml
   | where isnotnull(definition) OR (isnull(definition) AND isnotnull(dashboard_xml))
   | eval result=if(isnotnull(definition), definition, 'eai:data')
   | eval type=if(isnotnull(definition), "studio", "legacy")
   | eval title=if(type=="studio", json_extract(result, "title"), null())
   | eval description=if(type=="studio", json_extract(result, "description"), null())
   | spath input=result path=dashboard.label output=xml_title
   | spath input=result path=dashboard.description output=xml_description
   | eval title=coalesce(title, xml_title)
   | eval description=coalesce(description, xml_description)
   | fields type,title,description,result
   ```

   매크로:
   ```
   | rest /servicesNS/-/-/admin/macros count=0 splunk_server=local
   | table definition author disabled title args updated eai:appName validation
   ```

3. 결과에 마이그레이션하려는 자산이 포함되어 있는지 확인합니다.
4. 결과 위에서 Export 버튼을 클릭하고 CSV 형식을 선택한 다음 파일을 다운로드합니다.
5. 각 리소스 유형마다 같은 작업을 반복합니다. 알림이나 대시보드가 검색 매크로를 사용하는 경우에는 매크로 쿼리를 내보내세요.

Splunk UI 스크린샷이 포함된 동일한 지침은 {{< ui >}}How to export your assets from Splunk?{{< /ui >}}의 가져오기 마법사에서 확인할 수 있습니다.

### Datadog으로 자산 가져오기 {#import-your-assets-into-datadog}

1. [Logs > Import][3]로 이동하여 {{< ui >}}Get Started{{< /ui >}}을 클릭합니다.
2. {{< ui >}}Select source{{< /ui >}}에서 {{< ui >}}Splunk Processing Language (SPL){{< /ui >}}를 선택합니다.
3. {{< ui >}}Upload your assets from Splunk{{< /ui >}}에서 알림 및 대시보드 CSV 파일을 추가합니다. 필요한 만큼 파일을 업로드하세요. 단, 이 단계에서는 매크로 파일은 제외합니다.
4. 매크로 CSV가 있으면 {{< ui >}}Macros file{{< /ui >}}에서 업로드합니다.
5. 나중에 식별할 수 있도록 {{< ui >}}Name your import{{< /ui >}}에서 가져오기 작업의 이름을 지정합니다.
6. {{< ui >}}Import{{< /ui >}}를 클릭합니다.

가져오기 작업이 생성되는 즉시 변환이 시작되며 백그라운드에서 실행됩니다. 페이지를 닫았다가 나중에 다시 돌아올 수 있습니다.

### 검토 및 게시 {#review-and-publish}

가져오기 작업을 열어 포함된 모든 리소스와 변환 상태를 확인하세요.

| 상태 | 의미 |
|--------|---------|
| 진행 중 | 리소스가 변환되는 중입니다. |
| 변환됨 | 이에 상응하는 Datadog 항목을 검토하고 게시할 준비가 되었습니다. |
| 게시됨 | 리소스가 Datadog에 존재합니다. 가져오기 작업이 해당 리소스에 연결됩니다. |
| 생략됨 | 리소스를 변환할 수 없습니다. |

리소스를 클릭하여 원본 SPL, 변환된 쿼리 및 변환에 대한 설명을 확인하세요. 변환된 쿼리는 Splunk 원본과 동일한 결과를 반환하지 않을 수도 있습니다. 모니터나 대시보드를 게시하기 전에 각 변환을 검토해야 합니다.

대시보드는 각 위젯의 상태를 표시하며 단일 대시보드로 게시됩니다. 대시보드를 열어 변환된 위젯과 오류가 발생한 위젯을 확인하세요.

‘생략됨’ 상태의 모니터와 대시보드는 게시할 수 없으며, 변환을 게시하기 전에는 Datadog에서 편집할 수 없습니다. ‘생략됨’ 상태의 리소스나 오류가 발생한 대시보드 위젯을 수정하려면 원본에서 수정하고 다시 가져오세요.

1. Splunk에서 자산을 수정하고 다시 내보내거나, 내보낸 CSV를 직접 편집합니다. 인덱스나 속성 이름을 Datadog의 이름과 일치하도록 변경하는 등 간단한 수정의 경우 CSV를 직접 편집하는 것이 더 빠를 때가 많습니다.
2. (선택 사항) 원래 가져오기 작업을 삭제하여 이름을 재사용합니다. [Import][3] 페이지에서 가져오기 작업 위로 마우스를 가져간 다음 휴지통 아이콘을 클릭하고 {{< ui >}}Delete current migration{{< /ui >}}을 클릭하세요.
3. 수정된 파일을 새로운 가져오기 작업으로 업로드합니다.

## 변환 차이 {#translation-gaps}

변환은 SPL을 Datadog 로그 검색 구문으로 변환하지만 동일한 결과를 보장하지는 않습니다. 이러한 차이는 대부분의 차이점을 설명합니다.

각 플랫폼의 로그는 형태가 다릅니다
: 두 플랫폼의 파이프라인, 프로세서, 로그 전송 에이전트는 서로 다릅니다. 따라서 로그에서 사용할 수 있는 속성도 다릅니다. 변환기는 [표준 속성][9]을 매핑하는 경우를 제외하고는 속성 이름을 그대로 유지합니다. Datadog 파이프라인이 Splunk 쿼리가 의존하는 속성을 생성하지 않으면 변환된 쿼리는 결과를 반환하지 않습니다. 이를 해결하려면 Datadog 파이프라인에 해당 속성을 생성하는 [프로세서][10]를 추가하세요. 예를 들자면 Grok 파서를 사용하여 메시지에서 해당 속성을 추출하거나 리매퍼를 사용하여 기존 속성의 이름을 변경할 수 있습니다.

인덱스가 일치하지 않음
: Splunk 인덱스 이름은 Datadog [로그 인덱스][11]와 일대일로 매핑되는 경우가 거의 없습니다. 해결되지 않는 인덱스 필터는 쿼리 오류를 발생시킵니다. 변환기는 Datadog에 상응하는 항목이 없는 인덱스 용어를 제거하고 플래그를 추가하여 경고 표시합니다. 경고를 검토하고, 태그나 속성을 대신 사용해서 쿼리 범위를 지정하세요.

샘플 데이터가 충분하지 않음
: 일치하는 데이터가 거의 없는 인덱스에 대해 실행되는 쿼리는 빈 미리보기를 반환합니다. 미리보기가 비어 있으면 변환을 확인하기가 어렵습니다. 변환을 평가하기 전에 관련 로그가 Datadog에 있는지 확인하세요.

SPL 명령은 지원되지 않음
: Query Translation은 다양한 SPL 명령을 지원합니다. 명령에 상응하는 Datadog 기능이 없는 경우, 변환기는 쿼리에서 변환할 수 있는 부분을 최대한 반환하고 플래그를 추가하여 지원되지 않는 명령이라고 표시합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/logs/explorer/search_syntax/
[2]: https://app.datadoghq.com/logs/query-translator/translator
[3]: https://app.datadoghq.com/logs/batch-migration
[4]: /ko/ddsql_editor/
[5]: /ko/account_management/rbac/permissions/
[6]: /ko/logs/explorer/
[7]: /ko/monitors/types/log/
[8]: /ko/dashboards/
[9]: /ko/standard-attributes/
[10]: /ko/logs/log_configuration/processors/
[11]: /ko/logs/log_configuration/indexes/