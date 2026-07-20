---
aliases:
- /ko/observability_pipelines/reference/sinks/
legacy: true
title: 싱크(Sink)
---

싱크(Sink)는 이벤트의 목적지입니다. 각 싱크의 설계 및 전송 방법은 상호 작용하는 다운스트림 서비스 에 의해 결정됩니다. 예를 들어 `socket` 싱크는 개별 이벤트를 스트리밍하고 `aws_s3` 싱크는 버퍼로 데이터를 플러시합니다.