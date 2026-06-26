---
aliases:
- /ko/security/infrastructure_vulnerabilities/
- /ko/security/vulnerabilities/
further_reading:
- link: /security/cloud_security_management/setup/csm_pro/?tab=aws#configure-the-agent-for-containers
  tag: 설명서
  text: 컨테이너 이미지 취약점 설정
- link: /security/cloud_security_management/setup/csm_enterprise/?tab=aws#hosts
  tag: 설명서
  text: 호스트 취약점 설정
- link: /infrastructure/containers/container_images
  tag: 설명서
  text: 컨테이너 이미지 보기
- link: /security/cloud_security_management/troubleshooting/vulnerabilities
  tag: 설명서
  text: CSM Vulnerabilities 트러블슈팅
- link: https://www.datadoghq.com/blog/csm-vulnerability-management/
  tag: 블로그
  text: Datadog 클라우드 보안 관리로 인프라스트럭처 취약점 완화
- link: https://www.datadoghq.com/blog/datadog-container-image-view/
  tag: 블로그
  text: Datadog 컨테이너 모니터링의 컨테이너 이미지로 트러블슈팅 워크플로우 보강하기
title: 클라우드 보안 관리 취약점
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">Cloud Security Management Vulnerabilities는 선택한 <a href="/getting_started/site">Datadog 사이트</a> ({{< region-param key="dd_site_name" >}})에서 지원되지 않습니다.</div>
{{< /site-region >}}

## 개요

Cloud Security Management Vulnerabilities (CSM Vulnerabilities)는 컨테이너 이미지와 호스트 전체에서 취약점을 감지하고 우선순위를 지정하고 관리하여 클라우드 인프라스트럭처를 사전에 보호하는 데 도움이 됩니다. 심층적인 [옵저버빌리티 컨텍스트][6]와 업계 인사이트를 활용하여 특정 시점에 가장 중요한 취약점을 해결하는 데 도움을 줍니다.

**참고**: 애플리케이션 라이브러리 및 커스텀 애플리케이션 코드에 대한 취약점 관리를 찾고 있다면 [소프트웨어 구성 분석][5]을 참조하세요.

## 취약점 탐색
 [Vulnerabilities Explorer][1]는 인프라스트럭처 전체에서 감지된 취약점 전체 목록을 표시하고 심각도에 따라 순서를 지정하며 그룹화, 필터링 및 분류 기능을 제공하므로 문제를 조사, 할당 및 해결할 수 있습니다.

{{< img src="security/vulnerabilities/csm_vulnerabilities_3.png" alt="사이드 패널을 사용하여 고유한 취약점별로 정렬하는 CSM Vulnerability 페이지" width="100%">}}

특정 취약점을 선택하면 영향을 받는 컨테이너와 호스트, 심각도 분석 점수, 권장 해결 단계 등의 세부 정보를 볼 수 있습니다.
취약점의 심각도는 다음 사항을 고려하여 기본 점수에서 수정됩니다.

- 기본 인프라스트럭처 실행 여부 및 영향이 얼마나 퍼져있는지 확인.
- 기본 인프라스트럭처가 실행되는 환경. 예를 들어 프로덕션 환경이 아닌 경우 심각도 등급이 낮아집니다. 
- [CISA KEV 카탈로그][9]와 같은 소스에서 특정 취약점에 대한 익스플로잇이 있는지 여부.

{{< img src="security/vulnerabilities/container_vulnerability_3.png" alt="다음 단계 및 심각도 분석을 강조하는 특정 취약점 세부 정보" width="100%">}}

[컨테이너 이미지][2] 페이지에서 컨테이너 이미지의 취약점을 볼 수도 있습니다. **source**, **image tag**, **repo digest** 등을 기준으로 정렬합니다. 컨테이너 이미지를 클릭하고 **Vulnerabilities**탭을 통해 취약점에 대한 추가 세부정보를 확인하세요.

{{< img src="security/vulnerabilities/container_images.png" alt="취약점과 컨테이너 열 정렬 기능을 강조하는 Container Images 탭" width="100%">}}

세부 정보 탐색기에서는 CSM의 영향을 받는 리소스를 확인하여 전반적인 위험에 대한 인사이트를 얻을 수 있습니다.

{{< img src="security/vulnerabilities/container_vulnerability_side_panel.png" alt="Vulnerabilities 탭의  Container Images 사이드 패널 세부정보" width="100%">}}

모든 취약점에는 각 취약점의 배경을 이해하는 데 도움이 되는 웹사이트 또는 정보 소스에 대한 링크 및 레퍼런스가 포함되어 있습니다.

## 분류 및 해결

[Vulnerabilities Explorer][1]는 또한 취약점의 상태를 변경하고 수정 및 추적을 위해 팀원에게 할당할 수 있는 감지된 취약성에 대한 분류 옵션을 제공합니다.

**참고**:  더 이상 실행되지 않거나 이전에 취약점이 있었던 패키지의 수정 버전이 포함된 인프라스트럭처에 대해서는 취약점이 자동으로 닫힙니다. 이를 통해 우선순위가 높은 취약점에 집중할 수 있습니다.

{{< img src="security/vulnerabilities/csm_remediate.png" alt="수정하고 팀원에게 할당하는 기능을 강조하는 특정 취약점에 대한 세부 탐색기" width="100%">}}

## 동영상 가이드

다음 영상은 CSM Vulnerabilities 활성화 및 사용 방법에 대한 개요를 제공합니다.

{{< img src="security/csm/how-to-use-csm-vulnerabilities.mp4" alt="CSM Vulnerabilities 활성화 및 사용 방법 가이드 동영상" video=true >}}

[1]: https://app.datadoghq.com/security/csm/vm
[2]: https://app.datadoghq.com/containers/images
[3]: https://app.datadoghq.com/security/csm
[4]: https://app.datadoghq.com/security/infra-vulnerability?query=asset_type%3AHost&group=none
[5]: /ko/security/application_security/software_composition_analysis/
[6]: https://www.datadoghq.com/product/infrastructure-monitoring/
[9]: https://www.cisa.gov/known-exploited-vulnerabilities-catalog


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}