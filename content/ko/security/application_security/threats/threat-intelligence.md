---
further_reading:
- link: https://docs.datadoghq.com/security/threat_intelligence/
  tag: 설명서
  text: Datadog 위협 인텔리전스
- link: /security/application_security/
  tag: 설명서
  text: Datadog 애플리케이션 보안 관리로 위협으로부터 보호
title: 위협 인텔리전스
---

## 개요

이 항목에서는 ASM(애플리케이션 보안 관리)에 대한 [위협 인텔리전스][1]에 대해 설명합니다.

Datadog은 ASM을 위한 내장형 위협 인텔리전스[데이터 세트][1]를 제공합니다. 이는 보안 활동에 대한 조치를 취할 때 추가 증거를 제공하고 일부 비즈니스 논리 탐지에 대한 탐지 임계값을 줄입니다.

또한 ASM은 *bring your own threat intelligence*를 지원합니다. 이 기능은 비즈니스별 위협 인텔리전스를 통해 탐지 기능을 강화합니다.

## 모범 사례

Datadog은 위협 인텔리전스를 사용하기 위해 다음 방법을 권장합니다.

1. 크리덴셜 스터핑과 같은 비즈니스 로직 위협에 대한 탐지 규칙 임계값을 줄입니다. 사용자는 기본 [크리덴셜 스터핑][6] 규칙을 복제하고 필요에 맞게 수정할 수 있습니다.
2. 위협 인텔리전스를 보안 활동에 대한 평판 지표로 사용

Datadog은 다음 사항을 권장하지 _않습니다_.
1. 해당 보안 활동 없이 위협 인텔리전스 트레이스를 차단하는 것입니다. IP 주소 뒤에는 많은 호스트가 있을 수 있습니다.  레지덴셜 프록시가 감지된다는 것은 해당 IP 뒤에 있는 호스트가 관련 활동을 관찰했다는 의미입니다. 맬웨어나 프록시를 실행하는 호스트가 서비스와 통신하는 호스트와 동일하지 않을 수 있습니다.
2. 모든 위협 인텔리전스 카테고리를 차단합니다. 이는 기업 VPN의 양성 트래픽을 포함하고 악의적이지 않은 트래픽을 차단합니다.

## ASM의 위협 인텔리전스 필터링

사용자는 패싯 및 검색 창을 사용하여  Signals 및 Traces 탐색기에서 위협 인텔리전스를 필터링할 수 있습니다.

특정 소스로 플래그가 지정된 모든 트레이스를 검색하려면 소스 이름과 함께 다음 쿼리를 사용하세요.

    @threat_intel.results.source.name:<SOURCE_NAME> 

모든 소스의 위협 인텔리전스가 포함된 모든 트레이스를 쿼리하려면 다음 쿼리를 사용하세요.

    @appsec.threat_intel:true 

## Bring your own threat intelligence

ASM은 Datadog 레퍼런스 테이블에 저장된 위협 인텔리전스 침해 지표를 통해 트레이스 강화 및 검색을 지원합니다. [레퍼런스 테이블][2]을 사용하면 메타데이터를 이미 Datadog에 있는 정보와 결합할 수 있습니다.

### 레퍼런스 테이블에 침해 지표 저장

위협 인텔리전스는 CSV 형식으로 지원되며 다음 열이 필요합니다.

**CSV 구조**

| field            | data  | 설명| 필수 | 예시|
|------------------|-------|----|-----|--|
| ip_address       | 텍스트 | IPv4 점 표기법 형식에서 레퍼런스 테이블의 기본 키. | true | 192.0.2.1  |
| additional_data  | json      | 트레이스를 강화하기 위한 추가 데이터입니다. | false | `{"ref":"hxxp://example.org"}`
| category         | 텍스트  | 위협 인텔리전스 [카테고리][7]. 이는 일부 즉시 사용할 수 있는 탐지 규칙에서 사용됩니다. | true | `residential_proxy` |
| intention        | 텍스트 | 위협 인텔리전스 [의도][7]. 이는 일부 즉시 사용할 수 있는 탐지 규칙에서 사용됩니다.| true | malicious | |
| 소스           | 텍스트  | 팀 및 팀 위키와 같은 소스의 이름과 해당 사이트에 대한 링크입니다. | true| `{"name":"internal_security_team", "url":"https://teamwiki.example.org"}` | | 



지원되는 카테고리 및 의도의 전체 목록은 [Threat Intelligence Facets][3]에서 확인할 수 있습니다.

<div class="alert alert-info">CSV의 JSON에는 큰따옴표가 필요합니다. 다음은 CSV 예시입니다..</div>

```
ip_address,additional_data,category,intention,source
192.0.2.1,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.2,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
192.0.2.3,"{""ref"":""hxxp://example.org""}",scanner,suspicious,"{""name"":""internal_security_team"", ""url"":""https://teamwiki.example.org""}"
```

### 자체 위협 인텔리전스 업로드 및 활성화

Datadog는 수동 업로드를 통해 참조 테이블을 만들거나 [Amazon S3, Azure 스토리지 또는 Google Cloud 스토리지][10]에서 주기적으로 데이터를 검색하여 참조 테이블을 만들 수 있도록 지원합니다.

참고:
- 테이블을 만든 후 ASM 트레이스 보강을 시작하는 데 10~30분 정도 걸릴 수 있습니다.
- 기본 키가 중복된 경우 해당 키는 건너뛰고 키에 대한 오류 메시지가 표시됩니다.

새로운 [레퍼런스 테이블][4] 페이지에서:

1. 테이블 이름을 지정합니다. 테이블 이름은 ASM의 **Threat Intel** 구성에서 참조됩니다.
2. 로컬 CSV를 업로드하거나 클라우드 저장소 버킷에서 CSV를 가져옵니다. 파일이 정규화되고 유효성이 검사됩니다.
3. 테이블 스키마를 미리 확인한 후 IP 주소를 기본 키로 선택합니다.

   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table.png" alt="새 레퍼런스 테이블" style="width:100%;" >}}
4. 테이블을 저장합니다.
5. [Threat Intel][5]에서 새 테이블을 찾은 다음 토글을 선택하여 활성화합니다.

   {{< img src="/security/application_security/threats/threat_intel/threat_intel_ref_table_enabled.png" alt="활성화된 레퍼런스 테이블" style="width:100%;" >}}

#### 클라우드 스토리지 사용

참조 테이블이 클라우드 저장소에서 생성되면 주기적으로 새로 고쳐집니다. 전체 테이블이 *교체*됩니다. 데이터는 병합되지 않습니다.

관련 참조 표 문서를 참조하세요.
- [Amazon S3][11]
- [Azure 스토리지][12]
- [Google Cloud 스토리지][13]

#### 트러블슈팅 클라우드 가져오기

참조 테이블이 새로 고쳐지지 않으면 참조 테이블 세부 정보 페이지의 설정에서 **변경 이벤트 보기** 링크를 선택합니다. 

**변경 이벤트 보기**를 클릭하면 수집에 대한 잠재적 오류 이벤트가 표시된 **이벤트 관리** 페이지가 열립니다. 참조 테이블 이름을 사용하여 **이벤트 관리**에서 필터링할 수도 있습니다.

<div class="alert alert-info">Datadog 이벤트 관리에서는 클라우드에서 데이터를 가져오는 것처럼 보일 수 있지만 이러한 변경 사항을 위협 인텔리전스에 전파하는 데 몇 분 더 걸릴 수 있습니다.</div>

기타 유용한 클라우드 가져오기 세부 정보:

- 소스를 업로드하거나 업데이트할 때 업데이트된 보강 기능을 사용할 수 있기까지 예상되는 지연 시간은 10~30분입니다.
- 업데이트가 언제 적용되는지 확인하는 방법 변경 사항은 참조 테이블 또는 스팬(span)에서 볼 수 있습니다. 참조 테이블 세부 정보 페이지의 설정에서 **변경 이벤트 보기** 링크를 선택하면 관련 이벤트를 볼 수 있습니다.
- 업데이트는 *전체 테이블*을 새 데이터로 대체합니다.
- 기본 키가 중복된 경우 중복된 키가 있는 행은 기록되지 않으며 참조 테이블 상세 페이지에 오류가 표시됩니다.

### 레퍼런스 테이블과 목록을 결합하여 트레이스를 필터링합니다.

트레이스 테이블을 레퍼런스 테이블과 결합하여 Datadog에서 ASM 트레이스를 필터링할 수 있습니다.

레퍼런스 테이블을 트레이스 쿼리와 조인하려면 Datadog 트레이스 테이블과 레퍼런스 테이블 사이의 관련 열을 기반으로 해당 테이블의 행을 결합니다. 트레이스 쿼리는 두 테이블에서 일치하는 항목이 있는 트레이스만 반환합니다.

참조 테이블과의 조인을 사용하여 기존 트레이스와의 과거 일치를 검색하고 강화 전의 영향을 평가할 수 있습니다.

IP 주소뿐만 아니라 모든 필드를 사용할 수 있습니다. 예를 들어 보안 추적을 레퍼런스 테이블의 특정 URL과 연결하면 애플리케이션의 어느 부분이 공격의 대상이 되는지 식별할 수 있습니다. 이는 애플리케이션 내에서 취약점이나 고위험 영역을 정확히 찾아내는 데 도움이 될 수 있습니다.

예:

- 조사 및 인시던트 대응. 공격의 IP 또는 기타 필드를 업로드하고 병합하여 해당 인시던트와 관련된 트래픽을 확인할 수 있습니다.
- IP 주소를 지리적 위치 또는 조직 세부 정보와 연결하는 등 레퍼런스 테이블의 IP 주소와 함께 보안 트레이스를 사용함으로써 보안 팀은 공격 시도에 대한 더 나은 컨텍스트를 얻을 수 있습니다. 이는 공격의 원인과 잠재적인 동기를 이해하는 데 도움이 됩니다.


레퍼런스 테이블을 사용하여 트레이스를 결합하려면:

1. [자체 위협 인텔리전스 업로드 및 활성화](#uploading-and-enabling-your-own-threat-intel)에 설명된 대로 사용하려는 레퍼런스 테이블을 업로드합니다.
2. 레퍼런스 테이블과 트레이스를 결합하려면 [Traces][9]에서 **Add**를 선택한 다음 **Join with Reference Table**을 선택합니다.
3. **Inner join with reference table**에서 사용할 레퍼런스 테이블을 선택합니다.
4. **where field**에서 병합에 사용할 Datadog 트레이스 필드를 선택합니다.
5. **column**에서 병합에 사용할 레퍼런스 테이블 필드를 선택합니다.

{{< img src="security/application_security/threats/threat_intel/threat_intel_ref_join.png" alt="이미지 설명" style="width:100%;" >}}

### 탐지 규칙에 대한 트레이스 강화

트레이스 강화에는 침해 지표가 ASM 추적의 `http.client_ip` 키 값과 일치할 때 ASM 트레이스의 위협 인텔리전스 속성이 포함됩니다. 이를 통해 기존 패싯을 사용하고 탐지 규칙과 함께 위협 인텔리전스를 사용하여 위협 인텔리전스와 일치하는 트레이스를 검색할 수 있습니다.



## 사용자 인터페이스의 위협 인텔리전스

ASM Traces Explorer에서 트레이스를 볼 때 `@appsec` 속성 아래에서 위협 인텔리전스 데이터를 확인할 수 있습니다. `category` 및 `security_activity` 속성이 모두 설정되었습니다.

{{< img src="security/application_security/threats/threat_intel/threat_intel_appsec.png" alt="위협 인텔리전스 데이터가 포함된 appsec 속성의 예">}}

`@threat_intel.results` 아래에 어떤 소스에서 일치하는지에 대한 세부 정보가 항상 표시됩니다.

 {{< img src="security/application_security/threats/threat_intel/threat_intel_generic.png" alt="위협 인텔리전스 데이터가 포함된 threat_intel 속성의 예">}}

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/security/threat_intelligence/#threat-intelligence-sources
[2]: /ko/integrations/guide/reference-tables
[3]: /ko/security/threat_intelligence/#threat-intelligence-facets
[4]: https://app.datadoghq.com/reference-tables/create
[5]: https://app.datadoghq.com/security/configuration/asm/threat-intel
[6]: https://app.datadoghq.com/security/configuration/asm/rules/edit/kdb-irk-nua?product=appsec
[7]: /ko/security/threat_intelligence#threat-intelligence-categories
[8]: /ko/security/threat_intelligence#threat-intelligence-intents
[9]: https://app.datadoghq.com/security/appsec/traces
[10]: /ko/integrations/guide/reference-tables/?tab=manualupload#create-a-reference-table
[11]: /ko/integrations/guide/reference-tables/?tab=amazons3#create-a-reference-table
[12]: /ko/integrations/guide/reference-tables/?tab=azurestorage#create-a-reference-table
[13]: /ko/integrations/guide/reference-tables/?tab=googlecloudstorage#create-a-reference-table