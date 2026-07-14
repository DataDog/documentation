---
description: Datadog Agent v7.60 이상에서는 트레이싱을 설정하는 init 컨테이너의 리소스 할당을 자동으로 관리하여, 포드
  스케줄링에 영향을 주지 않으면서도 트레이서가 안정적으로 시작되도록 합니다. 이에 관한 자세한 내용을 확인하세요.
disable_toc: false
title: Init 컨테이너 리소스 사용량
---

### 개요

Agent [v7.60+][1]부터 Datadog는 트레이싱 라이브러리를 주입하는 init 컨테이너에 동적 리소스 계산을 사용합니다. 고정값을 사용하는 대신, init 컨테이너는 포드 스케줄링에 영향을 주지 않으면서 해당 폳느에서 사용 가능한 모든 CPU와 메모리를 일시적으로 요청합니다. (v7.60 이전에는 init 컨테이너가 CPU `50m` 메모리에 `20Mi`와 같은 보수적인 기본값을 사용했습니다.)

이 동작은 Kubernetes 스케줄링 규칙을 준수하면서 트레이서 시작의 안정성을 향상시킵니다. Init 컨테이너는 순차적으로 실행되고 애플리케이션 컨테이너가 시작되기 전에 종료되므로, 런타임 리소스를 두고 경쟁하지 않습니다.

### 포드 스케줄링

Kubernetes는 init 컨테이너를 고려한 계산식을 사용하여 포드를 스케줄링합니다.

<div style="text-align:center">
<pre><code>
유효 CPU/메모리 요청량 =
  일반 컨테이너 전체 요청량의 합과,
      단일 init 컨테이너 중 최대 요청량 중 더 큰 값
</code></pre>
</div>

Init 컨테이너는 애플리케이션 컨테이너보다 먼저 실행되며(동시에 실행되지 않으므로), 포드의 유효 요청량을 증가시키지 않고도 일시적으로 더 많은 리소스를 사용할 수 있습니다. 이는 단일 init 컨테이너가 포드가 감당할 수 있는 수준을 초과하는 리소스를 요청하지 않는 한 유효합니다.

### 기본 동작 덮어쓰기

필요한 경우 Cluster Agent 구성에서 다음 환경 변수를 설정하여 init 컨테이너의 기본 리소스 사용량을 재정의할 수 있습니다.
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_CPU`
  - `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_RESOURCES_MEMORY`

[1]: https://github.com/DataDog/datadog-agent/blob/40f0be0645ae309a07031bd7954fd58a8eb79853/pkg/clusteragent/admission/mutate/autoinstrumentation/auto_instrumentation.go#L611-L626