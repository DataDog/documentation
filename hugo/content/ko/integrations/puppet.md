---
categories:
- provisioning
- configuration & deployment
custom_kind: 통합
dependencies: []
description: 'Puppet 실행 추적: 실패, 성공 또는 큰 변화의 시점을 파악하세요.'
doc_link: https://docs.datadoghq.com/integrations/puppet/
draft: false
git_integration_title: puppet
has_logo: true
integration_id: puppet
integration_title: Puppet
integration_version: ''
is_public: true
manifest_version: '1.0'
name: puppet
public_title: Datadog-퍼펫 통합
short_description: 'Puppet 실행 추적: 실패, 성공 또는 큰 변화의 시점을 파악하세요.'
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## 개요

Puppet을 Datadog에 연결하여 다음 혜택을 누리세요.

- Puppet 에이전트 실행에 대한 실시간 보고서를 받아보세요.
- 모든 서버에서 주요 Puppet 성능 메트릭 을 추적하세요.
- 실패한 Puppet 실행을 빠르게 파악하고 팀과 논의하세요.

## 설정

### 설치

Puppet이 포함된 Datadog 에이전트를 설치하려면 GitHub의 [Datadog Puppet 에이전트 리포지토리][1]를 참조하세요.

## 수집한 데이터

### 메트릭
{{< get-metrics-from-git "puppet" >}}


### 이벤트

Puppet 통합에는 실패, 성공, 변경 및 변경되지 않은 리소스에 대한 상태 이벤트가 포함되어 있습니다.

### 서비스 점검

Puppet 통합에는 서비스 점검이 포함되어 있지 않습니다.

## 트러블슈팅

도움이 필요하신가요? [Datadog 지원팀][3]에 문의하세요.

[1]: https://github.com/datadog/puppet-datadog-agent
[2]: https://github.com/DataDog/dogweb/blob/prod/integration/puppet/puppet_metadata.csv
[3]: https://docs.datadoghq.com/ko/help/