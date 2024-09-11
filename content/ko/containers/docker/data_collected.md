---
aliases:
- /ko/agent/docker/data_collected
title: 수집된 도커 데이터
---

## 도커 통합

### 메트릭

에이전트가 도커 컨테이너에 배포할 때 수집한 메트릭:

{{< get-metrics-from-git "docker_daemon" >}}

### 이벤트

도커 에이전트는 다음 이벤트를 생성합니다:

- Delete Image
- Die
- Error
- Fail
- Kill
- Out of memory (oom)
- Pause
- Restart container
- Restart Daemon
- 업데이트

### 서비스 점검

{{< get-service-checks-from-git "docker" >}}

**참고**: `docker.exit`를 사용하려면 도커 `conf.yaml` 파일에 `collect_exit_codes: true`를 추가하고 에이전트를 다시 시작합니다.

## 컨테이너 통합

### 메트릭
{{< get-metrics-from-git "container" >}}

## 컨테이너 통합

### 메트릭

{{< get-metrics-from-git "containerd" >}}

### 이벤트

컨테이너형 검사는 이벤트를 수집할 수 있습니다. `filters`를 사용하여 관련 이벤트를 선택합니다. 자세한 내용은 샘플 [`containerd.d/conf.yaml`][1]을 참조하세요.

### 서비스 검사

{{< get-service-checks-from-git "containerd" >}}

[1]: https://github.com/DataDog/datadog-agent/blob/master/cmd/agent/dist/conf.d/containerd.d/conf.yaml.default
