---
aliases:
- /ko/developers/integrations/create-an-integration-detection-rule
description: 통합용 클라우드 SIEM 탐지 규칙을 만드는 방법을 알아보세요.
further_reading:
- link: https://docs.datadoghq.com/security/cloud_siem/detection_rules
  tag: 설명서
  text: 로그 탐지 규칙
title: 클라우드 SIEM 탐지 규칙 생성
---

## 개요

이 가이드에서는 Cloud SIEM 탐지 규칙을 만드는 단계와 규칙 구성에 대한 모범 사례를 알아봅니다.

[Datadog Cloud SIEM (Security Information and Event Management)][1]는 개발자, 운영팀, 보안팀을 하나의 플랫폼으로 통합합니다. Datadog은 다양한 기능과 통합에 대한 기본 제공 탐지 규칙 세트를 제공합니다. [SIEM 탐지 규칙 목록][2]에서 확인해 보세요.

Datadog Cloud SIEM 탐지 규칙은 통합에 추가할 수 있는 기본 제공 콘텐츠이며 설치 후 바로 사용할 수 있습니다.

Datadog 통합을 생성하려면 [새 통합 생성][3]을 참고하세요.

## 탐지 규칙 생성
### 탐지 규칙 만들기
사용자의 보안 인사이트를 강화하기 위해 파트너는 Datadog 통합의 일부로 자체적인 기본 탐지 규칙을 생성할 수 있습니다. 탐지 규칙은 통합을 위한 기본 자산으로 추가될 수 있습니다.

Datadog 샌드박스에서 [새 규칙을 만듭니다][4].

{{< img src="developers/integrations/detection_rule.png" alt="Datadog의 Detection Rules 영역에 있는 Create a New Rule 페이지" style="width:100%;" >}}

이 가이드에 설명된 [모범 사례](#configuration-best-practices)를 따라 탐지 규칙을 구성하세요.

### 탐지 규칙 업로드하기

Integration Developer Platform 통합 내에서 Content 탭으로 이동합니다. 여기에서 **Import Detection Rule**을 선택하여 사용 가능한 탐지 규칙 목록에서 선택합니다. 통합에 포함할 탐지 규칙을 최대 10개까지 선택할 수 있습니다.

{{< img src="developers/integrations/content_tab.png" alt="Developer Platform에 있는 Content 탭" style="width:100%;" >}}


## 운영 환경에서 탐지 규칙 확인

기본 탐지 규칙을 보려면 해당 통합 타일이 Datadog에서 `Installed`여야 하며 Cloud SIEM이 활성화되어 있어야 합니다.

1. [Detection Rules 목록][2]에서 탐지 규칙을 찾아 클릭하여 확장합니다.
2. 로고가 올바르게 표현되는지 확인합니다.
3. 규칙이 활성화되어 있는지 확인합니다.

### 잘 정의된 탐지 규칙의 예

규칙 유형 선택 및 검색 쿼리 정의:

{{< img src="developers/integrations/SIEM_detection_rule_top.png" alt="작성된 탐지 규칙 생성 양식의 1-3단계" style="width:90%;" >}}

규칙 사례 설정 및 알림 메시지 작성:

{{< img src="developers/integrations/SIEM_detection_rule_bottom.png" alt="작성된 탐지 규칙 생성 양식의 4단계 및 5단계" style="width:90%;" >}}

자세한 내용은 [탐지 규칙 구성][7] 문서를 참고하세요.

## 검증 메시지 이해하기

### 규칙 JSON 파싱
```
File=<FILE_PATH> in collection=<COLLECTION> is an invalid JSON: error=<ERROR>
```
이 오류는 `<FILE_PATH>`의 JSON이 유효하지 않은 JSON으로 간주되었음을 의미합니다.

### 규칙 ID/규칙 이름
```
partnerRuleId is empty for rule name="<RULE_NAME>" - partnerRuleId=<NEW_RULE_ID> is available
```
각 규칙에 `partnerRuleId`가 필요하지만 누락되었습니다. 생성된 `<NEW_RULE_ID>`를 사용하세요.

```
partnerRuleId=<RULE_ID> is in the incorrect format for rule name="<RULE_NAME>", it must follow the format=^[a-z0-9]{3}-[a-z0-9]{3}-[a-z0-9]{3}$ - partnerRuleId=<NEW_RULE_ID> is available
```
규칙 이름의 형식이 올바르지 않습니다. 생성된 `partnerRuleId: <NEW_RULE_ID>` 규칙을 사용하여 문제를 해결하세요.

```
Duplicate partnerRuleId=<RULE_ID> for rule name="<RULE_NAME>" - <RULE_ID_KEY> must be unique and it is already used in rule_ids="<RULE_IDS>" - <RULE_ID_KEY>=<NEW_RULE_ID> is available
```
각 `partnerRuleId`는 고유해야 합니다. 현재 ID는 이미 사용 중입니다. 새로 생성된 `partnerRuleId`는 사용 가능합니다.

```
Duplicate name="<RULE_NAME>" for <RULE_ID_KEY>=<RULE_ID> - name must be unique.
```
각 규칙 이름은 고유해야 합니다. 현재 이름은 이미 사용 중입니다. 규칙 이름을 고유하게 업데이트하세요.

### MITRE 태그
```
The rule with partnerRuleId=<RULE_ID> contains a MITRE tag tactic but it does not contain the tag `security:attack`, please add it
```
규칙에 MITRE 태그 `tactic:<TAG_VALUE>`가 포함되어 있는 경우 `security:attack` 태그를 태그 목록에 추가해야 합니다.

```
The MITRE tactic/technique tag=<TAG> for partnerRuleId=<RULE_ID> appears to be incorrect (i.e. it does not exist in the MITRE framework).
```
나열된 tactic/technique 태그 `<TAG>`는 [MITRE 프레임워크](https://attack.mitre.org/)를 따르지 않습니다. 유효한 MITRE 태그를 선택하세요.

### 사례
```
The case status <CASE_STATUS> for <RULE_ID_KEY>=<RULE_ID> is incorrect, it should be one of <STATUS_LIST>.
```
케이스 상태는 `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFO` 중 하나여야 합니다.

```
The case ordering for partnerRuleId=<RULE_ID> is incorrect, please modify to order cases from the highest severity to the lowest.
```
각 규칙 정의는 심각도가 높은 순서대로 정렬되어야 합니다. 케이스를 `CRITICAL`, `HIGH`, `MEDIUM`, `LOW`, `INFO`로 다시 정렬하세요.

### 소스 태그
```
source=<SOURCE> in the tags of the rule with partnerRule=<RULE_ID> is not supported by Datadog documentation.
```
이 문제를 해결하려면 Datadog에 문의하세요.

### 규칙 콘텐츠 유효성 검사/규칙 업데이트
```
<RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>" - error=<ERROR>
```
이 문제를 해결하려면 Datadog에 문의하세요.

```
Internal failure for <RULE_ID_KEY>=<RULE_ID> name="<RULE_NAME>"- Contact Datadog Team
```
이 문제를 해결하려면 Datadog에 문의하세요.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/ko/security/cloud_siem/
[2]: https://app.datadoghq.com/security/rules?deprecated=hide&groupBy=tactic&product=siem&sort=rule_name 
[3]: https://docs.datadoghq.com/ko/developers/integrations/agent_integration/
[4]: https://app.datadoghq.com/security/rules/new?product=siem
[5]: https://github.com/DataDog/integrations-extras 
[6]: https://github.com/DataDog/marketplace
[7]: https://docs.datadoghq.com/ko/security/cloud_siem/detection_rules