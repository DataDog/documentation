---
aliases:
- /ko/agent/faq/getting-further-with-docker/
further_reading:
- link: /agent/docker/
  tag: 설명서
  text: Datadog Docker 에이전트에 대해 자세히 알아보기
kind: faq
title: 컨테이너 에이전트를 사용한 호스트 메트릭
---

## 디스크 점검

컨테이너 에이전트의 [디스크 점검][1]을 사용하면 호스트에 연결되어 있고 볼륨으로써 컨테이너에 노출된 모든 스토리지의 호스트 메트릭을 보고합니다. 추가 설정이 필요없습니다.

### 파티션 메트릭

Linux 스토리지의 계층화 특성(블록 디바이스, 논리 볼륨, 파티션)으로 인해 사용 가능한 공간을 보고하려면 파티션을 연결해야 합니다.

컨테이너 에이전트에서는 액세스할 수 있는 파티션의 전체 또는 부분의 메트릭과 속도를 모두 보고합니다. Cgroups와 Docker에서 이와 같은 분리를 강제 실행합니다. 파티션의 디스크 사용량 보고를 허용하려면 `-v` argument to `docker run`를 사용해 Docker 볼륨을 디스크를 노출해야 합니다. 다음 옵션을 사용할 수 있습니다.

* 파일 시스템에 더미 파일을 만들고 Docker를 통해 노출합니다. 에이전트가 이 파티션의 다른 파일에 액세스할 수 없습니다.
    ```
    -v /mnt/loop/dummyfile:/host/loop0:ro
    ```

* 전체 연결 지점을 읽기 전용으로 노출합니다. 에이전트가 폴더 계층 구조와 전체 읽기용 파일에 액세스할 수 있습니다.
    ```
    -v /mnt/loop:/host/loop0:ro
    ```

* 연결 경로를 알 수 없는데(동적으로 연결된 볼륨) 상위 디렉터리가 일정한 경우에는 상위 폴더를 노출합니다. 에이전트가 이 폴더의 하위에 연결된 모든 볼륨에 액세스할 수 있습니다.
    ```
    -v /mnt/:/host/mnt:ro
    ```

### 트러블슈팅

#### 디스크 메트릭 누락

Docker 이미지를 사용자 정의하거나 커스텀 디렉터리를 에이전트 `conf.d` 폴더에 연결한 경우, 디스크 점검을 위해 다음 중 하나를 실행할 수 있습니다.

* 기본값 `conf.yaml`이 있는지 확인합니다.
* 사용자 지정된 `conf.yaml`을 활성화합니다.
* 점검을 비활성화합니다.

#### 사용 권한 거부 오류

특정 가상 연결 지점에서 디스크 메트릭을 수집할 때 컨테이너화된 에이전트에서 사용 권한 거부 오류가 나타날 수 있습니다. 이 문제는 일반적으로 호스트의 전체 루트 파일 시스템이 컨테이너에 노출된 경우에 발생합니다. 에이전트가 메트릭을 생성할 수 없는 연결 지점인 `shm`이나 `netns`을 찾습니다.

다음은 에이전트에서 보고하는 관련 로그 예시입니다.

```bash
10:12:52 PST | WARN | (datadog_agent.go:149 in LogMessage) | (disk.py:114) | Unable to get disk metrics for /run/docker/netns/9ec58235910c: [Errno 13] Permission denied: '/run/docker/netns/9ec58235910c'
```

필요한 경로만 에이전트의 컨테이너에 노출하는 것이 좋습니다. 필요한 경우 다음 파라미터 중 하나를 사용해 디스크 점검의 `conf.yaml`를 업데이트하세요. 그러면 에이전트가 보고할 때 관련 파일 시스템을 제외하고 보고합니다.

* `file_system_exclude`(에이전트 v6.24.0+ 및 v7.24.0+)
* `file_system_blacklist`(에이전트 v6.8.0 ~ v6.23.1/7.23.1)
* `excluded_filesystems`(오래된 에이전트 버전)

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/integrations/disk/