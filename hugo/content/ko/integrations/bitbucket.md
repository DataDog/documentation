---
categories:
- Source Control
- Collaboration
- issue tracking
dependencies: []
description: 서비스에 영향을 미치는 커밋과 풀 요청 확인하기.
doc_link: https://docs.datadoghq.com/integrations/bitbucket/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/understand-code-changes-impact-system-performance-bitbucket-datadog/
  tag: 블로그
  text: 'Bitbucket + Datadog: 코드 변경으로 인한 인프러스트럭처 변경 사항 확인'
git_integration_title: bitbucket
has_logo: true
integration_id: bitbucket
integration_title: Bitbucket
integration_version: ''
is_public: true
custom_kind: 통합
manifest_version: '1.0'
name: bitbucket
public_title: Datadog-Bitbucket 통합
short_description: 서비스에 영향을 미치는 커밋과 풀 요청 확인하기.
team: 웹-통합
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/bitbucket/integrations-bitbucket.mp4" alt="integrations bitbucket" video="true" >}}

## 개요

커밋과 풀 요청 이벤트를 Bitbucket Cloud나 Server에서 바로 캡처하면 다음을 할 수 있습니다.

- 실시간으로 코드 변경 추적
- 대시보드 전체에 코드 변경 마커 추가
- 팀과 코드 변경 논의

통합을 설정한 후 선택한 항목(커밋 및/또는 풀 요청)이 Datadog 이벤트 스트림에 자동으로 채워집니다.

**예시**:

- 커밋을 했을 때
- PR을 생성했을 때
- PR에 코멘트가 생성/삭제되었을 때

## 설정

### 설치

Datadog에서 추적하고 싶은 Bitbucket 작업이 있으면 Bitbucket 설명서를 참고하여 [웹훅을 관리][1]할 수 있습니다. 웹훅 URL을 다음과 같이 설정하세요.

```text
https://app.datadoghq.com/intake/webhook/bitbucket?api_key=<YOUR_DATADOG_API_KEY>
```

[IP 주소를 관리][2]하려면 Bitbucket 설명서를 참고하세요. 발신 연결에 사용되는 IP 범위의 허용 목록이 정확한지 확인하여 이벤트를 정상적으로 수신할 수 있도록 하세요.

### 구성

통합 타이틀을 통해 [Bitbucket 통합][3]을 구성할 수 있습니다.

1. 모니터링하고 싶은 각 리포지토리의 전체 이름을 입력하세요. 내 리포지토리의 URL이 `https://bitbucket.org/groupname/reponame`이면 **Repository** 텍스트 상자에 `groupname/reponame`을 입력하세ㅐ요.
2. Datadog에 전송할 이벤트 종류를 선택하세요.

    - Bitbucket Cloud: 트리거 전체 목록에서 선택(커밋, 풀 요청, 또는 이슈)
    - Bitbucket Server: 커밋 또는 풀 요청 선택

3. **Update Configuration**을 클릭하세요.

### 검증

입력하면 통합 타이틀의 강 항목이 검증됩니다.

## 사용 사례

좌측 상단에 있는 검색 창에 `sources:bitbucket`을 입력하여 Bitbucket 이벤트를 대시보드 그래프에 겹쳐서 나타나게 하세요. 이 페이지 상단에 있는 GIF 예시를 참고하세요.

## 수집한 데이터

### 메트릭

Bitbucket 통합에는 메트릭이 포함되어 있지 않습니다.

### 이벤트

Bitbucket Cloud와 Server의 커밋과 풀 요청을 포함한 Bitbucket 이벤트가 Datadog로 전송됩니다.

### 서비스 점검

Bitbucket 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원 팀][4]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html
[2]: https://support.atlassian.com/organization-administration/docs/ip-addresses-and-domains-for-atlassian-cloud-products/
[3]: https://app.datadoghq.com/integrations/bitbucket
[4]: https://docs.datadoghq.com/ko/help/