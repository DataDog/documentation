---
aliases:
- /ja/observability_pipelines/reference/sinks/
legacy: true
title: シンク
---

シンクとは、イベントの宛先です。各シンクの設計と送信方法は、それが相互作用するダウンストリームサービスによって決定されます。例えば、`socket` シンクは個々のイベントをストリームし、一方、`aws_s3` シンクはデータをバッファリングし、フラッシュします。