---
aliases:
- /ko/observability_pipelines/reference/sinks/
legacy: true
title: 싱크(Sink)
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">옵저버빌리티 파이프라인은 US1-FED Datadog 사이트에서 사용할 수 없습니다.</div>
{{< /site-region >}}

싱크(Sink)는 이벤트의 목적지입니다. 각 싱크의 설계 및 전송 방법은 상호 작용하는 다운스트림 서비스 에 의해 결정됩니다. 예를 들어 `socket` 싱크는 개별 이벤트를 스트리밍하고 `aws_s3` 싱크는 버퍼로 데이터를 플러시합니다.