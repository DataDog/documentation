---
description: Kube Proxy 팩에 대해 자세히 알아보세요.
title: Kube Proxy
---
## 개요 {#overview}

{{< img src="observability_pipelines/packs/kube_proxy.png" alt="Kube Proxy 팩" style="width:25%;" >}}

이 팩은 kube-proxy 오류 및 경고만 유지하고 매 주기마다 발생하는 일상적인 iptables 동기화 노이즈를 삭제합니다.

이 팩의 기능

- 동기화 실패 유지
- 일상적인 동기화 노이즈 삭제
- 로그 수준 추출