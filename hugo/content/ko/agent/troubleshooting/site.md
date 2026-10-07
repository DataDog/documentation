---
title: Agent 사이트 문제
---

기본적으로 Agent는 데이터를 Datadog US 사이트(`app.datadoghq.com`)로 전송합니다. 조직이 다른 사이트에 있는 경우 [Agent 기본 설정 파일][1]에서 `site` 파라미터를 업데이트하거나 `DD_SITE` 환경 변수를 설정해야 합니다.

사용자 사이트에 맞추어 Datadog 설명서를 업데이트하려면 오른쪽의 선택기를 사용하세요. 현재 {{< region-param key="dd_full_site" code="true" >}}의 설명서를 보고 계십니다.

`DD_SITE` 변수를 {{< region-param key="dd_site" code="true" >}}로 설정하거나 `datadog.yaml`에서 `site` 파라미터를 업데이트하세요. 

```yaml
## @param site - string - optional - default: datadoghq.com
## The site of the Datadog intake to send Agent data to.
#
site: {{< region-param key="dd_site" >}}
```


[1]: /ko/agent/configuration/agent-configuration-files/#agent-main-configuration-file