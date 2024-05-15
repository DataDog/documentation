---
disable_toc: true
kind: guide
private: true
title: 컨테이너 가이드
---

{{< whatsnext desc="일반 컨테이너 가이드:" >}}
    {{< nextlink href="/containers/guide/kubernetes_daemonset" >}}수동으로 DaemonSet을 사용하여 Kubernetes에 Datadog Agent 설치 및 설정{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-with-jmx" >}}JMX를 사용하여 자동탐지{{< /nextlink >}}
    {{< nextlink href="/containers/guide/build-container-agent" >}}Datadog Agent 이미지 구축{{< /nextlink >}}
    {{< nextlink href="/containers/guide/autodiscovery-management" >}}Agent를 사용하여 컨테이너 검색 관리{{< /nextlink >}}
    {{< nextlink href="/containers/guide/ad_identifiers" >}}ad_identifiers 파라미터를 사용하여 지정된 컨테이너에 자동탐지 설정 파일 템플릿 적용{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-advanced" >}}Datadog Operator 고급 설정{{< /nextlink >}}
    {{< nextlink href="/containers/guide/container-images-for-docker-environments" >}}Docker 환경을 위한 컨테이너 이미지{{< /nextlink >}}
    {{< nextlink href="/containers/guide/compose-and-the-datadog-agent" >}}컴포즈 및 Datadog Agent{{< /nextlink >}}
    {{< nextlink href="/containers/guide/docker-deprecation" >}}Kubernetes에서 Docker 사용 중지{{< /nextlink >}}
    {{< nextlink href="/containers/guide/podman-support-with-docker-integration" >}}Podman 컨테이너 런타임으로 Docker 통합 사용{{< /nextlink >}}
    {{< nextlink href="/containers/guide/changing_container_registry" >}}컨테이너 레지스트리 변경{{< /nextlink >}}
    {{< nextlink href="/containers/guide/template_variables" >}}자동탐지 템플릿 변수{{< /nextlink >}}
    {{< nextlink href="/containers/guide/auto_conf" >}}자동탐지 자동 설정{{< /nextlink >}}
    {{< nextlink href="/containers/guide/how-to-import-datadog-resources-into-terraform/" >}}Datadog 리소스를 Terraform으로 가져오는 방법{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-cluster-name-detection/" >}}Kubernetes 클러스터 이름 감지{{< /nextlink >}}
    {{< nextlink href="/containers/guide/kubernetes-legacy/" >}}Kubernetes 레거시{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Cluster Agent 가이드:" >}}
    {{< nextlink href="/containers/guide/cluster_agent_autoscaling_metrics" >}}Cluster Agent에서 커스텀 및 외부 메트릭을 사용한 자동 확장{{< /nextlink >}}
    {{< nextlink href="/containers/guide/clustercheckrunners" >}}클러스터 검사 러너{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Operator 가이드:" >}}
    {{< nextlink href="/containers/guide/datadogoperator_migration" >}}Datadog Operator 버전 1.0으로의 마이그레이션{{< /nextlink >}}
    {{< nextlink href="/containers/guide/operator-eks-addon" >}}Datadog Operator 애드온을 사용하여 Amazon EKS에 Datadog Agent 설치하기{{< /nextlink >}}
{{< /whatsnext >}}