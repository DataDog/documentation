---
further_reading:
- link: https://www.datadoghq.com/blog/datadog-security-graph/
  tag: 블로그
  text: Datadog Security Graph로 클라우드 보안 관계를 시각화해 보세요.
- link: https://www.datadoghq.com/blog/security-graph-attack-paths
  tag: 블로그
  text: Datadog Cloud Security를 통해 리소스 간 노출 경로 추적
title: Security Graph로 관계 시각화
---
{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">Security Graph는 선택한 사이트에서 사용할 수 없습니다({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

클라우드 보안에서 가장 지속적인 과제 중 하나는 컴퓨팅, 스토리지, ID 및 네트워킹 구성 요소가 서로 상호 작용하는 방식을 이해하는 것입니다. Security Graph를 사용하면 클라우드 환경을 관계 그래프로 모델링할 수 있습니다. Agentless 및 Agent 기반 클라우드 스캔의 데이터를 결합하여 EC2 인스턴스, IAM 역할, S3 버킷 및 보안 그룹과 같은 클라우드 리소스 간의 연결을 시각화하고 쿼리해 보세요. 이러한 관계를 조사하여 간접 액세스 경로를 파악하고 ID 위험을 평가하며 새로운 위협에 보다 효과적으로 대응할 수 있습니다.

**참고**: Security Graph는 AWS 리소스만 지원합니다.

{{< img src="security/csm/security_graph.png" alt="예시 EC2 인스턴스를 표시하는 Security Graph" width="100%">}}

## 쿼리 선택 또는 생성 {#select-or-create-a-query}

Security Graph에서 보고 싶은 리소스 및 관계의 종류를 지정하는 방법에는 다음 두 가지가 있습니다.
<!-- - Write a query in natural language (for example, "Non-admin IAM roles that can assume admin IAM roles") -->
- 홈페이지에서 미리 만들어진 쿼리를 선택합니다.
- 리소스 유형과 이들 사이의 관계를 지정하여 직접 쿼리를 작성합니다.

<!-- If you use a natural language or pre-made query, the technical details automatically populate in the query. You can modify the query to fine-tune your results. -->

미리 만들어진 쿼리를 사용하면 기술적인 세부 정보가 쿼리에 자동으로 채워집니다. 쿼리를 수정하여 결과를 미세 조정할 수 있습니다.

### 쿼리 생성 및 수정 {#create-and-modify-queries}

자동으로 생성된 쿼리를 사용하든 쿼리를 직접 생성하든 쿼리 빌더를 사용하여 결과를 미세 조정할 수 있습니다.

1. **Build your own query** 아래의 **Search for** 옆에 있는 목록에서 리소스 유형을 선택합니다.
1. (선택 사항) 선택한 리소스 유형에 대한 세부 정보를 추가하려면 **+**를 클릭한 다음 **Where**를 클릭합니다. 나타나는 필드에서 태그를 선택하고 필터링할 태그 값을 입력합니다.
1. (선택 사항) 추가 리소스 유형으로 필터링하려면 **+**를 클릭한 다음 **That**을 클릭합니다. 표시되는 필드에서 추가 리소스 유형이 위의 리소스와 맺길 원하는 관계를 선택합니다. 다른 **Where** 필드가 나타나면 이 리소스 유형에 대한 추가 태그 값을 지정합니다.
1. 필요에 따라 추가 리소스 유형 및 태그 값을 추가합니다. **Delete** 아이콘을 클릭하여 조건을 제거하거나 **Clear query**를 클릭하여 처음부터 다시 시작합니다.

쿼리를 수정하면 Security Graph가 자동으로 업데이트되어 관련 리소스를 표시합니다. **View** 옆에서 **Graph**를 클릭하면 리소스를 관계 그래프로 확인할 수 있고, **Table**을 클릭하면 그래프 대신 표 형식으로 확인할 수 있습니다.

## 리소스에 대해 자세히 알아보기 {#learn-more-about-a-resource}

- 그래프 형식으로 리소스를 볼 때 리소스를 클릭하면 자세한 정보를 확인할 수 있습니다.
  - ID, 계정 또는 팀과 같은 리소스에 대한 주요 정보를 복사합니다.
  - 현재 쿼리의 리소스를 특정 태그 값으로 필터링합니다.
  - 리소스에 대한 자세한 내용을 확인합니다.
  - 리소스와 관련된 보안 결과를 확인합니다.
- 표 형식으로 리소스를 볼 때 리소스를 클릭하면 측면 패널에 추가 정보를 표시됩니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}