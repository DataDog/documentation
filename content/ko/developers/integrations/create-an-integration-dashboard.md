---
description: 통합 대시보드를 생성하는 방법을 알아보세요.
further_reading:
- link: /dashboards/
  tag: 설명서
  text: 대시보드에 대해 알아보기
kind: 설명서
title: 통합 대시보드 만들기
---
## 개요

[Datadog 대시보드][1]를 사용하면 주요 메트릭을 표시하고 추적하여 인프라스트럭처 및 통합을 효율적으로 모니터링할 수 있습니다. Datadog은 다양한 기능과 통합을 위한 기본 대시보드 세트를 제공합니다. [대시보드 목록][12]을 통해 액세스할 수 있습니다.

[Datadog 통합을 생성한 경우][2], 즉시 사용 가능한 대시보드를 생성해 통합 사용자가 더욱 빠르게 통합의 가치를 누리도록 해야 합니다. 이 가이드는 생성 과정에서 통합 대시보드를 생성하는 단계와 모범 사례를 제공합니다.

Datadog 통합을 생성하려면 [에이전트 통합 생성][2]을 참조하세요.

## 통합 대시보드 만들기

### 대시보드 생성

Datadog의 [**대시보드 목록**][12]에서 **+ 새 대시보드**를 클릭하세요.

{{< img src="dashboards/create_dashboard.png" alt="통합을 위한 대시보드 생성" width="80%">}}

대시보드에 요소를 추가할 때 [이 가이드의 모범 사례를 따르세요](#대시보드-모범-사례-따르기).

### 대시보드 내보내기

{{< tabs >}}
{{% tab "UI" %}}

**공유** 또는 **설정** 아이콘을 클릭하고 **JSON 대시보드 내보내기**를 선택하여 대시보드를 JSON으로 내보세요.

{{< img src="developers/create-an-integration-dashboard/share-dashboard.png" alt="공유 아이콘과 대시보드 JSON 내보내기를 클릭하여 대시보드를 JSON 파일로 내보내세요." width="100%">}}

대시보드 제목에 따라 파일 이름을 지정합니다. 예: `your_integration_name_overview.json`

통합의 `assets/dashboards` 폴더에 이 파일을 저장합니다. 자산을 `manifest.json` 파일에 추가합니다. 통합 파일의 구조와 매니페스트 파일에 대한 자세한 정보는 [통합 자산 참고 자료][101]를 참조하세요.

[101]: /ko/developers/integrations/check_references/#manifest-file

{{% /tab %}}
{{% tab "Programmatically" %}}

- [Datadog 에이전트 통합 개발 툴][103](`ddev`)을 설치했는지 확인하세요.
- [`ddev` 설정 파일][101]에 대시보드를 포함하는 조직의 경우 `api_key` 및 `app_key`를 설정했는지 확인하세요.

`--extras` 또는 `-e` 플래그 포함 [`ddev meta dash export` 명령][102]을 실행하여 대시보드 정의를 내보내세요.

```shell
ddev meta dash export <URL_OF_DASHBOARD> <INTEGRATION> --extras
```

대시보드 제목에 따라 파일 이름을 지정합니다.

이 명령은 대시보드 정의를 통합의 `manifest.json` 파일에 추가합니다. 통합의 `assets/dashboards` 폴더에서 대시보드 JSON 파일을 찾을 수 있습니다. 

**참고:** 각 지역의 다음 주소(`/dash/integration/<DASHBOARD_KEY>`)에서 대시보드를 사용할 수 있습니다. `<DASHBOARD_KEY>`는 대시보드의 `manifest.json` 파일에 포함된 항목과 일치합니다. 링크를 대시보드 내 또 다른 대시보드에 추가하길 원하는 경우 이 값을 전환할 수 있습니다.

[101]: https://datadoghq.dev/integrations-core/ddev/cli/#ddev-config
[102]: https://datadoghq.dev/integrations-core/ddev/cli/#ddev-meta-dash-export
[103]: /ko/developers/integrations/python/

{{% /tab %}}
{{< /tabs >}}

### 풀 리퀘스트 열기

[`integrations-extras` GitHub 리포지토리][13]와 풀 리퀘스트(PR) 열기를 통해 대시보드 JSON 파일과 업데이트된 매니페스트 파일을 해당하는 통합 폴더에 추가합니다. Datadog는 모든 `integration-extras` PR을 검토합니다. 승인되면 Datadog는 PR을 결합하고 통합 대시보드는 프로덕션으로 푸시됩니다.

### 프로덕션 환경에서 대시보드 확인하기

관련 통합 타일이 Datadog에서 `Installed` 상태인지 확인합니다. 즉시 사용 가능한 연결 대시보드를 보려면 통합을 설치해야 합니다.

[대시보드 목록 페이지][12]에서 대시보드를 찾습니다. 로고가 올바르게 렌더링되어 있고 사전 설정된 대시보드 내에 있는지 확인합니다.

## 대시보드 모범 사례 따르기

{{< img src="developers/create-an-integration-dashboard/dashboard_best_practices_example.png" alt="대시보드 예시" width="100%">}}

통합 대시보드는 다음 시각적 스타일 가이드라인을 준수해야 합니다.

- 배너 이미지, 간결한 카피, 유용한 링크, 우수한 타이포그래피 계층 구조를 포함하고 눈길을 사로잡는 **소개** 그룹 
- 간략한 주석 처리된  **개요** 그룹과 상단에 표시된 가장 중요한 통계
- 간단한 그래프 제목 및  title-case 그룹 이름
- 고밀도 모드에서의 대칭성
- 형식이 잘 갖춰진 간결한 노트
- 관련 그룹, 그룹 안의 노트, 그룹 내 그래프 사이의 색상 조정

### 일반 가이드라인

-  새 대시보드를 만들 때 기본 대시보드 유형을 선택합니다.

-  대시보드 제목에 통합 이름을 입력합니다. 좋은 대시보드 제목의 예는 `Scylla` 또는 `Cilium Overview` 입니다. **참고**: 대시보드 제목에서 대시보드 URL이 생성되므로 대시보드 제목에 `-`(하이픈)을 사용하지 마십시오.

-  대시보드 헤더에 로고를 추가합니다. 아이콘이 이미 존재하고 `integration_id`가 아이콘 이름과 일치하는 경우 통합 로고가 자동으로 헤더에 표시됩니다.

-  간략한 소개와 유용한 링크를 포함하는 통합의 그룹 소개를 포함합니다. 소개 섹션은 데이터가 아닌 콘텐츠를 포함할 수 있습니다. 소개 섹션을 전각으로 만드는 것을 피하세요. 소개 섹션의 콘텐츠를 대시보드 제목 위를 마우스로 가리킬 때 나타나는 팝업 카드에 복사하는 것을 생각해 보세요.

- About 섹션을 수정하고 배너 표시 옵션을 선택합니다. 그런 다음 다음 파일 위치에 따라 배너 이미지에 링크할 수 있습니다: `/static/images/integration_dashboard/your-image.png`

- 몇몇 매우 중요한 메트릭이 있는 **개요** 그룹을 포함하세요. 활성도 또는 준비도 점검이나 이 통합에 대해 사전 존재하는 모니터가 있다면 모니터 요약을 포함할 수 있습니다. 대시보드 상단에 개요 그룹을 놓습니다. 그룹은 데이터를 포함할 수 있습니다.

  {{< img src="developers/create-an-integration-dashboard/about-and-overview-groups.png" alt="대시보드의 소개 섹션 및 개요 섹션 예시" width="100%">}}

- 통합에 대해 로그 수집이 활성화된 경우 시간에 따른 상태 및 `Error` 또는 `Critical` 상태의 로그 스트림 막대 그래프를 보여주는 시계열 위젯을 포함할 수 있습니다. **참고:** 그룹이 통합 유형에 관계없이 대시보드에 반복적으로 표시되는 경우 [파워팩][14]으로 전환하는 것을 고려할 수 있습니다. 전환하면 매번 처음부터 동일한 위젯을 추가하는 대신 몇 번의 클릭만으로 올바른 형식의 전체 그룹을 삽입할 수 있습니다. 

-  대시보드가 1280px 너비와 2560px 너비에서 어떻게 보이는지 확인합니다. 대시보드가 각각 작은 노트북과 큰 모니터에 표시되는 방식입니다. 대시보드의 가장 일반적인 화면 너비는 1920, 1680, 1440, 2560 및 1280px입니다. 모니터가 고밀도 모드를 사용하기에 충분히 크지 않다면 브라우저 확대/축소 컨트롤을 사용하여 축소합니다.

   {{< tabs >}}
   {{% tab "1280픽셀" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-widths.png" alt="1280픽셀의 대시보드 예시" width="80%">}}

   {{% /tab %}}
   {{% tab "2560픽셀" %}}

   {{< img src="developers/create-an-integration-dashboard/qa-large-widths.png" alt="2560픽셀의 대시보드 예시" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

### 위젯 및 그룹화

-  통합에서 지원하는 메트릭을 조사하여 관련 카테고리로 그룹화하는 것을 고려해 보세요. 통합의 성과 및 개요에 핵심이 되는 중요한 메트릭은 맨 위에 표시해야 합니다.

   시스템 내 매크로에서 마이크로 수준으로 이동
   데이터베이스 통합 대시보드의 경우, 예를 들어 한 그룹에 노드 메트릭을, 다음 그룹에 인덱스 메트릭을, 세 번째 그룹에 공유 메트릭을 포함하도록 그룹화할 수 있습니다.

   시스템 내 업스트림에서 다운스트림 섹션으로 이동
   데이터 스트림 통합 대시보드의 경우 예를 들어 한 그룹에 생산자 메트릭, 다음 그룹에 중개인 메트릭, 세 번째 그룹에 소비자 메트릭을 포함하도록 그룹화할 수 있습니다.

   실행 가능한 동일한 인사이트에 도달하는 메트릭을 함께 그룹화
   단일 그룹으로 최적화해야하는 인덱스나 조각을 보여주는 인덱싱 메트릭을 그롭화할 수 있습니다. 별도의 그룹에서 할당 및 재배포 결정을 함께 내릴 수 있도록 디스크 공간 또는 메모리 사용량 등 리소스 활용률 메트릭을 그룹화할 수 있습니다.

-  노트 위젯 대신 그룹 위젯을 사용해 섹션의 제목과 그룹을 지정하세요. 그룹을 나란히 표시하려면 부분 너비 그룹을 사용하세요. 대부분의 대시보드는 그룹 안의 모든 위젯을 표시해야 합니다.

    {{< img src="developers/create-an-integration-dashboard/full-width-grouped-logs.png" alt="그룹 위젯의 예" width="100%">}}

-  시계열 위젯은 작은 디스플레이에서 찌그러져 보이지 않도록 열 너비가 최소 4열 이상이어야 합니다.

-  스트림 위젯은 가독성을 위해 대시보드 너비의 절반인 6열 이상이어야 합니다. 대시보드 끝에 배치하여 스크롤이 걸리지 않도록 합니다. 스트림 위젯을 그룹으로 묶어 접을 수 있도록 배치하는 것이 유용합니다. 대시보드에서 모니터링하는 서비스가 이벤트를 보고하는 경우에만 이벤트 스트림을 추가합니다. `sources:service_name`을 사용하세요.

   {{< img src="developers/create-an-integration-dashboard/stream-widgets.png" alt="대시보드 스트림 위젯 예시" width="100%">}}

-  다양한 위젯 유형과 크기를 결합해 사용해 보세요. 대시보드가 명확한 데이터를 표시하고 있다는 확신이 들 때까지 시각화와 포맷 옵션을 시도해 보세요. 때로 전체 시계열 대비보드도 괜찮지만 다양성이 가독성을 높일 때도 있습니다. 가장 일반적으로 사용되는 메트릭 위젯은 [시계열][4], [쿼리 값][5] 및 [표][6]입니다. 쿼리 값 위젯이 비어 있는 대신 시계열 배경(예: "막대")을 갖도록 하세요. 사용 가능한 위젯 유형에 대한 자세한 정보는 [지원되는 대시보드 위젯 목록][7]을 참조하세요.

-  고집중 모드에서 대시보드 왼쪽 및 오른쪽이 대칭을 이루도록 해보세요. 큰 모니터를 사용하는 사용자는 기본적으로 고집중 모드에서 대시보드를 보게 됩니다. 그러므로 그룹 관계가 이해하기 쉽도록 만드는 것이 중요합니다. 대시보드는 보기 좋아야 합니다. 그룹 높이를 조정하여 이를 달성하고 왼쪽 오른쪽 영역 간에 그룹을 이동해 보세요.

   {{< tabs >}}
   {{% tab "완벽한 대칭" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical-dashboard.png" alt="대칭 대시보드 예시" width="100%">}}

   {{% /tab %}}
   {{% tab "충분히 가까움" %}}

   {{< img src="developers/create-an-integration-dashboard/symmetrical_example_2.png" alt="대칭 대시보드 예시" width="100%">}}

   {{% /tab %}}
   {{< /tabs >}}

-  [템플릿 변수][8]를 사용하면 대시보드에서 하나 이상의 위젯을 동적으로 필터링할 수 있습니다. 템플릿 변수는 범용이어야 하며 통합 기술 유형에 따라 커스터마이즈할 수 있어야 합니다. 또한 모니터링되는 서비스를 사용하는 모든 사용자와 계정에서 액세스 가능해야 합니다.

   | 통합 기술 유형 | 일반적인 템플릿 변수 |
   | - | - |
   | 데이터베이스 | 조각 |
   | 데이터 스트리밍 | 소비자 |
   | ML 모델 서비스 | 모델 |

   모든 관련 그래프가 관련 템플릿 변수 필터와 연계되도록 합니다. **참고**: `*=scope`를 템플릿 변수로 추가하면 사용자가 자체 태그 전체에 액세스할 수 있으므로 유용합니다.

### 복사

-  간결한 그래프 제목을 사용합니다. 제목이 가장 중요한 정보로 시작하도록 합니다. "개수"와 같은 일반적인 구문을 피하고 통합 제목(예: "Memcached 로드")를 포함하지 않습니다.

    | 간결한 제목 (good) | 장황한 제목 (bad) |
    | - | - |
   | 노드당 이벤트 | 노드당 쿠버네티스 이벤트 수
   | 보류 중인 작업: [$node_name] | [$node_name]에서 보류 중인 총 작업 수 |
   | 읽기/쓰기 작업 | 읽기/쓰기 작업 수 |
   | 서버 연결 - 속도 | 서버에 대한 연결 속도 | 
   | 로드 | Memcached 로드 |

-  그룹의 모든 위젯에서 반복되는 그룹 제목이나 통합 이름을 사용하지 않습니다. 특히 위젯이 동일한 이름의 커스텀 유닛을 포함하는 쿼리 값인 경우 주의합니다. 이 예에서 그룹 내 각 위젯 제목에 있는 단어 "조각(shards)"이 "조각(Shards)"이라는 이름으로 지정되어 있음을 참고하세요.

   {{< img src="developers/create-an-integration-dashboard/name-repetition.png" alt="대시보드 반복 용어 예시" width="100%">}}

-  시계열 위젯의 경우 항상 [별칭 수식][9]을 사용합니다.

-  그룹 제목은 title case (전치사, 관사 등을 제외한 제목의 모든 단어를 대문자로 표기), 위젯 제목은 sentence case (문장의 첫 글자만 대문자로 표기)여야 합니다.

-  범례를 표시하는 경우 이해하기 쉬운 별칭을 사용해야 합니다. 

-  그래프 제목은 쿼리한 메트릭을 요약해야 합니다. 단위 유형은 메타데이터에서 자동으로 표시되므로 그래프 제목에 표시하지 마세요. 쿼리 계산이 다른 유형의 단위를 나타내는 경우는 예외입니다.

### 시각적 스타일

-  사용 사례에 맞게 노트의 서식을 지정하세요. 사전 설정된 "캡션", "주석", "헤더"를 사용하거나 원하는 스타일 조합을 선택하세요. 글머리 기호 목록이나 코드 블록처럼 복잡한 서식을 포함하거나 긴 노트에는 가장 작은 글꼴 크기를 사용하지 마세요.

-  색상은 스타일을 위한 것이 아니라 중요한 관계를 강조하고 가독성을 높이기 위해 사용합니다. 여러 그룹이 서로 연관되어 있는 경우, 모든 그룹에 동일한 그룹 헤더 색상을 적용하세요. 한 그룹에 녹색 헤더 색상을 적용했다면 그 노트도 녹색으로 만들어 보세요. 두 그룹이 서로 연관되어 있지만 한 그룹이 더 중요한 경우, 중요한 그룹에는 "선명한" 색상을, 덜 중요한 그룹에는 "옅은" 색상을 사용해 보세요. 그룹 헤더는 흰색으로 두어도 되며, 색상을 과도하게 사용하지 않도록 주의하세요. 예를 들어, 대시보드의 모든 그룹에 선명한 파란색을 적용하지 않으며, 회색 헤더를 사용하지 않습니다.

    {{< img src="developers/create-an-integration-dashboard/color-related-data.png" alt="대시보드의 색상 관련 데이터 예" width="100%">}}

- 명확한 임계값이나 영역이 있는 시각화는 쿼리 값에 대해 그래프 또는 커스텀/노란색/초록색 텍스트 형식의 구문 형식을 사용합니다.

-  범례를 사용해 보세요. 범례를 사용하면 각 계열 위로 마우스를 가져가거나 위젯을 최대화하지 않고도 그래프를 쉽게 읽을 수 있습니다. 범례를 쉽게 읽으려면 시계열 별칭을 사용해야 합니다. 범례 자동 모드는 공간이 부족할 때 범례를 숨기고 여유가 있을 때 표시하는 유용한 옵션입니다.

    {{< img src="developers/create-an-integration-dashboard/well-named-legends.png" alt="대시보드 범례의 예" width="100%">}}

-  사용자가 두 그래프를 나란히 비교하도록 하려면 두 그래프의 x축이 정렬되어 있는지 확인하세요. 한 그래프에 범례가 표시되고 다른 그래프에 범례가 표시되지 않으면 x축이 정렬되지 않습니다. 둘 다 범례가 표시되는지 또는 둘 다 표시되지 않는지 확인합니다.

   {{< img src="developers/create-an-integration-dashboard/x-axes-alignment.png" alt="대시보드에 오정렬된 X축 예시" width="100%">}}

-  시계열의 경우 메트릭 유형에 따라 표시 유형을 결정합니다.

   | 메트릭 유형 | 표시 유형 | 
    | - | - |
   | 볼륨 (예: 연결 수) | `area` |
   | 개수 (예: 오류 수) | `bars` |
   | 여러 그룹 또는 기본값 | `lines` |

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/dashboards/
[2]: /ko/developers/integrations/agent_integration/
[3]: /ko/dashboards/#new-dashboard
[4]: /ko/dashboards/widgets/timeseries/
[5]: /ko/dashboards/widgets/query_value/
[6]: /ko/dashboards/widgets/table/
[7]: /ko/dashboards/widgets/
[8]: /ko/dashboards/template_variables/
[9]: /ko/dashboards/widgets/timeseries/#metric-aliasing
[10]: /ko/dashboards/#copy-import-or-export-dashboard-json
[11]: /ko/developers/integrations/check_references/#manifest-file
[12]: https://app.datadoghq.com/dashboard/lists
[13]: https://github.com/DataDog/integrations-extras
[14]: /ko/dashboards/widgets/powerpack/