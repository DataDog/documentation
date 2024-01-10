---
description: VMware Tanzu용 Datadog 클러스터 모니터링
further_reading:
- link: https://www.datadoghq.com/blog/collecting-pcf-logs/
  tag: 블로그
  text: Pivotal 플랫폼 로그 및 메트릭 수집
- link: https://www.datadoghq.com/blog/pcf-monitoring-with-datadog/
  tag: 블로그
  text: Datadog으로 Pivotal 플랫폼 모니터링
- link: /integrations/guide/application-monitoring-vmware-tanzu/
  tag: documentation
  text: VMware Tanzu용 Datadog 애플리케이션 모니터링
kind: guide
title: VMware Tanzu용 Datadog 클러스터 모니터링
---


## 개요

VMware Tanzu용 Datadog 클러스터 모니터링은 [Datadog Firehose Nozzle][6]과 [Datadog Agent][7]를 결합합니다. 이를 통해 VMware Tanzu 사용자와 관리자가 VMware Tanzu 클러스터의 상태와 성능을 모니터링할 수 있습니다.
다음 세 가지 요소로 구성됩니다:

* Datadog Firehose Nozzle
* Datadog Agent
* Datadog Cluster Agent

Datadog Firehose Nozzle은 [클라우드 파운드리][8] 구성 요소로, [Loggregator Firehose][14]의 메트릭을 Datadog 모니터링 플랫폼으로 전달합니다. 모든 클라우드 파운드리 배포는 메트릭과 이벤트를 Datadog으로 전송할 수 있습니다. 이 데이터는 배포에 있는 모든 노드의 상태와 가용성을 추적하고, 노드가 실행하는 작업을 모니터링하며, Loggregator Firehose에서 메트릭을 수집하는 등의 작업을 수행하는 데 도움이 됩니다.

## 필수 요구 사항

VMware Tanzu용 Datadog 클러스터 모니터링에는 다음의 요구 사항이 있습니다.

* 타일을 설정하기 전에 [Datadog 계정][4]을 가지고 있거나 생성해야 합니다.
* [Datadog API 키][3]를 생성해야 합니다.
* Datadog의 [Pivotal 플랫폼 문서][5]에 설명된 대로 Datadog Agent BOSH 릴리스를 설치합니다.
* [Datadog Cluster Agent][15] BOSH 릴리스를 설치합니다.

## 주요 기능

VMware Tanzu용 Datadog 클러스터 모니터링은 다음과 같은 주요 기능을 포함합니다:

* 모든 클러스터 수준의 운영 메트릭 및 KPI를 시각화합니다.
* VMware Tanzu 클러스터 및 구성 요소 상태에 대해 경고합니다.
* 작업을 모니터링합니다.
* BOSH 이벤트를 추적하고 보고합니다.
* 통합을 자동 탐지합니다.

## 설치

1. [BOSH Health Monitor][10]를 설치하세요.
2. [Pivotal Network][11]에서 **Datadog Cluster Monitoring for VMware Tanzu** 제품 파일을 다운로드합니다.
3. Tanzu Ops Manager 설치 대시보드로 이동, **Import a Product**를 클릭하여 제품 파일을 업로드합니다.
4. **Import a Product**를 클릭하여 제품 파일을 업로드합니다.
5. **2** 단계에서 다운로드한 제품 파일을 선택합니다. 이렇게 하면 타일이 스테이징 영역에 추가됩니다.
6. 새로 추가된 **Datadog Cluster Monitoring for VMware Tanzu** 타일을 클릭합니다.
7. **Datadog Config** 섹션에 [Datadog API 키][3]를 입력하세요. [Datadog 지원팀][2]에서 별도로 지정하지 않는 한 Datadog API URL을 변경하지 않고 그대로 둡니다.
8. [UAA CLI][12]를 사용하여 Datadog용 UAA 클라이언트 계정을 생성합니다. Firehose Nozzle에는 Loggregator Firehose에 대한 액세스가 필요합니다.
    ```sh
    $ uaac client add datadog-firehose-nozzle \
         --name datadog-firehose-nozzle \
         --scope doppler.firehose,cloud_controller.admin_read_only,oauth.login \
         --authorities doppler.firehose,cloud_controller.admin_read_only,openid,oauth.approvals \
         --authorized_grant_types client_credentials,refresh_token \
         --access_token_validity 1209600 \
         -s $CLIENT_SECRET
    ```

9. **Cloud Foundry Settings** 섹션에서 이전 단계의 UAA 클라이언트 및 UAA 비밀을 지정합니다.
10. Ops Manager에서 stemcell 업로드를 요구하는 경우 621 릴리스 라인에서 [stemcell을 다운로드][13]하세요. 그런 다음 **Import Stemcell** 버튼을 사용하여 Ops Manager에 업로드하세요.
11. **Datadog Firehose Nozzle Config** 섹션에는 Nozzle에 대한 설정(선택 사항)이 포함되어 있고, **Datadog Agent Config** 섹션에는 Agent에 대한 설정(선택 사항)이 포함되어 있습니다. 두 섹션 모두에서 아무것도 설정할 필요가 없습니다.
    <p class='note'><strong>참고:</strong> 하나의 Datadog 계정을 사용하여 여러 기반을 모니터링하는 경우 <strong>Use UUID Hostname</strong> 체크박스를 확인해야 합니다.</p>
12. **Datadog Cluster Agent Settings** 섹션에는 통합 및 애플리케이션 컨테이너 기능의 자동 탐지를 제공하는 [Datadog Cluster Agent][15]에 대한 설정이 포함되어 있습니다.

13. Tanzu Ops Manager Installation Dashboard로 돌아가서 **Apply Changes**를 클릭하여 Datadog Cluster Monitoring for the VMware Tanzu tile을 설치합니다.

## 메트릭 및 대시보드 보기

1. Cloud Foundry [Overview][18] Dashboard를 검토합니다.

 {{< img src="/integrations/guide/vmware_tanzu/cloud-foundry-dashboard_2.png" alt="The Cloud Foundry Overview dashboard" >}}

2. [메트릭 탐색기][19] 페이지에서 개별 메트릭을 탐색하고 `cloudfoundry.nozzle`로 시작하는 메트릭을 검색합니다:

 {{< img src="/integrations/guide/vmware_tanzu/metrics-explorer-cloud-foundry.png" alt="cloudfoundry.nozzle로 시작하는 클라우드 파운드리 메트릭" >}}

3. 클라우드 파운드리 메트릭에 대한 [알림을 생성합니다][16].
4. 트러블슈팅 단계는 [Datadog 클라우드 파운드리 통합][17]을 참조하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[2]: /ko/help/
[3]: https://app.datadoghq.com/account/settings#api
[4]: https://app.datadoghq.com/signup
[5]: /ko/integrations/pivotal_platform/#monitor-your-pivotal-platform-cluster/
[6]: https://github.com/DataDog/datadog-firehose-nozzle
[7]: /ko/agent/
[8]: /ko/integrations/guide/cloud-foundry-setup/
[10]: /ko/integrations/cloud_foundry/#configure-the-datadog-plugin-for-bosh-health-monitor
[11]: https://network.pivotal.io/products/datadog/
[12]: https://docs.pivotal.io/application-service/uaa/uaa-user-management.html
[13]: https://network.pivotal.io/products/stemcells-ubuntu-xenial/#/releases/721399
[14]: https://www.datadoghq.com/blog/pivotal-cloud-foundry-architecture/#loggregator
[15]: https://github.com/DataDog/datadog-cluster-agent-boshrelease#datadog-cluster-agent-bosh-release
[16]: /ko/guides/monitors/
[17]: /ko/integrations/cloud_foundry/
[18]: https://app.datadoghq.com/screen/integration/cloudfoundry
[19]: https://app.datadoghq.com/metric/explorer