---
aliases:
- /ko/agent/cluster_agent/build
- /ko/containers/cluster_agent/build
kind: faq
title: Datadog 클러스터 에이전트 빌드
---

컨테이너화된 에코시스템에서 Datadog 클러스터 에이전트를 사용해야 합니다. 다음과 같이 빌드하세요.

1. [DataDog/datadog-agent GitHub 리포지토리][1]를 복제합니다.
2. 다운로드한 `datadog-agent/` 폴더 내에 `inv -e cluster-agent.build`를 실행해 바이너리를 생성합니다. 그러면 `./bin/datadog-cluster-agent/`에 바이너리가 추가됩니다.
3. 같은 폴더에서 `inv -e cluster-agent.image-build`를 실행합니다.

[1]: https://github.com/DataDog/datadog-agent/