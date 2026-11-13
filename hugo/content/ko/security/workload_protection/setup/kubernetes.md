---
aliases:
- /ko/security/workload_protection/setup/agent/kubernetes
description: Kubernetes에서 Datadog Operator, Helm 또는 DaemonSet을 사용하여 Workload Protection을
  활성화하세요.
disable_toc: false
title: Kubernetes에서 Workload Protection 설정
---
다음 지침을 따라 Workload Protection을 활성화하세요.

<div class="alert alert-info">Fargate 컴퓨팅 옵션이 구성된 Amazon EKS에 Workload Protection을 배포하려면 <a href="/security/workload_protection/setup/fargate/">Fargate 배포 페이지</a>를 참조하세요.</div>

{{< partial name="security-platform/WP-billing-note.html" >}}

## 전제 조건 {#prerequisites}

- 최신 Datadog Agent 버전. 설치 지침은 [Agent 시작하기][5]를 참조하거나 [Datadog UI][6]에서 Agent를 설치하세요.

**참고**: SBOM 수집은 Google Kubernetes Engine(GKE)의 이미지 스트리밍 기능과 호환되지 않습니다. 비활성화하려면 GKE 설명서의 [이미지 스트리밍 비활성화][7] 섹션을 참조하세요.

## 설치 {#installation}

{{< tabs >}}

{{% tab "Datadog Operator" %}}

1. `datadog-agent.yaml` 파일의 `spec` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-agent.yaml file
    apiVersion: datadoghq.com/v2alpha1
    kind: DatadogAgent
    metadata:
      name: datadog
    spec:
      features:
        # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
        admissionController:
          enabled: true
          cwsInstrumentation:
            enabled: true

        remoteConfiguration:
          enabled: true
        # Enables Threat Detection
        cws:
          enabled: true
        # Enables Misconfigurations
        cspm:
          enabled: true
          hostBenchmarks:
            enabled: true
        # Enables the image metadata collection and Software Bill of Materials (SBOM) collection
        sbom:
          enabled: true
          # Enables Container Vulnerability Management
          # Image collection is enabled by default with Datadog Operator version `>= 1.3.0`
          containerImage:
            enabled: true

            # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
            # uncompressedLayersSupport: true

          # Enables Host Vulnerability Management
          host:
            enabled: true
    ```

2. 변경 사항을 적용하고 Agent를 재시작합니다.

[2]: https://github.com/DataDog/datadog-operator/blob/main/docs/configuration.v2alpha1.md

{{% /tab %}}

{{% tab "Helm" %}}

1. `datadog-values.yaml` 파일의 `datadog` 섹션에 다음을 추가합니다.

    ```yaml
    # datadog-values.yaml file

    # (Optional) Integrate with Kubernetes to enrich Workload Protection events with Kubernetes user identities
    clusterAgent:
      admissionController:
        enabled: true
        cwsInstrumentation:
          enabled: true

    datadog:
      remoteConfiguration:
        enabled: true
      securityAgent:
        # Enables Threat Detection
        runtime:
          enabled: true
        # Enables Misconfigurations
        compliance:
          enabled: true
          host_benchmarks:
            enabled: true
      sbom:
        containerImage:
          enabled: true

          # Uncomment the following line if you are using Google Kubernetes Engine (GKE) or Amazon Elastic Kubernetes (EKS)
          # uncompressedLayersSupport: true

        # Enables Host Vulnerability Management
        host:
          enabled: true

        # Enables Container Vulnerability Management
        # Image collection is enabled by default with Datadog Helm version `>= 3.46.0`
        # containerImageCollection:
        #   enabled: true
    ```

2. Agent를 재시작합니다.

RBAC 문제를 해결하려면 `clusterRole.allowCreatePodsExec` 옵션을 활성화한 상태로 `clusterRole`에 대해 차트를 실행하세요.

```sh
helm install datadog-operator datadog/datadog-operator --set clusterRole.allowCreatePodsExec=true
```

{{% /tab %}}

{{% tab "DaemonSet" %}}

1. `daemonset.yaml`파일에서 `security-agent` 및 `system-probe`의 `env` 섹션에 다음 설정을 추가하세요. Workload Protection 이벤트를 Kubernetes 사용자 ID로 보강하려면 `cluster-agent-deployment.yaml`에서 선택 사항인 `DD_ADMISSION_CONTROLLER_ENABLED` 및 `DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED` 변수를 추가로 설정하세요.

    ```bash
      # Source: datadog/templates/daemonset.yaml
      apiVersion:app/1
      kind: DaemonSet
      [...]
      spec:
      [...]
      spec:
          [...]
            containers:
            [...]
              - name: agent
                [...]
                env:
                  - name: DD_REMOTE_CONFIGURATION_ENABLED
                    value: "true"
              - name: system-probe
                [...]
                env:
                  - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_SECURITY_CONFIG_REMOTE_CONFIGURATION_ENABLED
                    value: "true"
                  - name: DD_COMPLIANCE_CONFIG_ENABLED
                    value: "true"
                  - name: DD_COMPLIANCE_CONFIG_HOST_BENCHMARKS_ENABLED
                    value: "true"
                  - name: DD_SBOM_CONTAINER_IMAGE_USE_MOUNT
                    value: "true"
              [...]

      # Source: datadog/templates/cluster-agent-deployment.yaml
      apiVersion:app/1
      kind: Deployment
      [...]
      spec:
        [...]
        template:
          [...]
          spec:
            [...]
            containers:
            [...]
              - name: cluster-agent
                [...]
                env:
                  - name: DD_ADMISSION_CONTROLLER_ENABLED
                    value: "true"
                  - name: DD_RUNTIME_ADMISSION_CONTROLLER_CWS_INSTRUMENTATION_ENABLED
                    value: "true"
    ```

{{% /tab %}}
{{< /tabs >}}


[5]: /ko/getting_started/agent
[6]: https://app.datadoghq.com/account/settings/agent/latest
[7]: https://cloud.google.com/kubernetes-engine/docs/how-to/image-streaming#disable