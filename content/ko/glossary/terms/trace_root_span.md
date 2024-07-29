---
core_product:
- apm
title: 트레이스 루트 스팬
---
[스팬][1]은 트레이스의 첫 번째 스팬인 경우 트레이스 루트 스팬입니다. 루트 스팬은 추적된 요청의 엔트리포인트 메서드입니다. 시작은 트레이스의 시작을 나타냅니다.

{{< img src="tracing/visualization/toplevelspans.png" alt="트레이스 루트 스팬" style="width:80%" >}}

이 예시에서 **서비스 엔트리 스팬**은 다음과 같습니다.

- `rack.request` (이는_루트 스팬_이기도 함)
- `aspnet_coremvc.request`
- `aspnet_coremvc.request` 아래의 맨 위 녹색 스팬
- 모든 주황색 `mongodb` 스팬

[1]: /ko/glossary/#span