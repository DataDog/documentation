---
further_reading:
- link: /security/code_security/iac_security/setup
  tag: 설명서
  text: IaC 보안 설정
- link: /security/code_security/iac_security/configuration
  tag: 설명서
  text: IaC 보안 구성
title: IaC 보안 규칙
type: iac_security
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-danger">이 제품은 선택한 <a href="/getting_started/site">Datadog 사이트</a>({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{% /site-region %}}

[인프라 코드(IaC) 보안][1]은 배포 전에 IaC 파일에서 잘못된 구성 및 보안 위험을 식별하여 클라우드 환경이 안전하고 규정을 준수하도록 보장합니다.

<div class="alert alert-info">Helm 의 의존성 해결이 올바르게 작동하려면, 각 차트 디렉토리에는 해당 차트가 의존하는 차트가 포함되어야 합니다. 자세한 내용은 Helm 문서의 <a href="https://helm.sh/docs/topics/charts/#the-chart-file-structure">차트 파일 구조</a>를 참조하세요.</div>

[1]: /ko/security/code_security/iac_security/

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}