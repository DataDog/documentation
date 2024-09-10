---
aliases:
- /ko/agent/autodiscovery/troubleshooting
further_reading:
- link: /agent/troubleshooting/
  tag: 설명서
  text: Agent 트러블슈팅
- link: /agent/troubleshooting/debug_mode/
  tag: 설명서
  text: Agent 디버그 모드
- link: /agent/troubleshooting/send_a_flare/
  tag: 설명서
  text: Agent Flare 보내기
title: 자동탐지 트러블슈팅
---

도커(Docker) Agent 자동탐지 트러블슈팅을 시작하려면 `configcheck` init 스크립트 명령어를 실행하세요.

```shell
docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
```

**참조**: `-v` 옵션을 사용하면 해결되지 않은(unresolved) 것을 포함하여 모든 템플릿을 확인할 수 있습니다.

예를 들어 다음의 예시는 기본 `redisdb.d/auto_conf.yaml` 파일이 아닌, 도커 라벨 어노테이션에서 불러온 Redis 템플릿에 유효한 자동탐지 설정을 보여줍니다.

```text
# docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
.
..
...
=== Provider: Docker container labels ===

--- redisdb check ---
Instance 1:
host: 172.17.0.3
port: "6379"
tags:
- short_image:redis
- image_tag:latest
- docker_image:redis:latest
- image_name:redis
~
Auto-discovery IDs:
* docker://81e66fd4c948a502b4428417d8cf2ebc58caaff55a6e5879a41887057342aec2
```

다음 예시는 Redis 템플릿에 유효한 자동탐지 설정을 불러올 수 없을 때 표시되는 문제입니다.

```text
# docker exec -it <AGENT_CONTAINER_NAME> agent configcheck -v
.
..
...
=== Resolve warnings ===

redisdb
* No service found with this AD identifier: redis
* Can't resolve the template for redisdb at this moment.

=== Unresolved Configs ===

Auto-discovery IDs: redis
Template:
init_config:
instances:
- host: '%%host%%'
  port: '%%port%%'
```

아직 문제를 정확하게 파악할 수 없다면 Agent  [Flare][2]를 사용해 [Datadog 지원팀][1]으로 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/help/
[2]: /ko/agent/troubleshooting/send_a_flare/