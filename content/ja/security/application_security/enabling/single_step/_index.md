---
disable_toc: true
title: シングルステップインスツルメンテーションを使用した ASM の有効化
---

<div class="alert alert-info">シングルステップインスツルメンテーションを使用した ASM の有効化はベータ版です。</div>

## 概要

アプリケーションをインスツルメントし、ASM を有効にすることで、標準的なオペレーションおよび一般的なフレームワークから幅広く、手作業を最小限に抑えて、セキュリティに関するインサイトを迅速に得ることができます。Datadog Agent をシングルステップインスツルメンテーションでインストールする際、または、コードに [Datadog トレースライブラリを手動で追加][1]する際に、アプリケーションを自動的にインスツルメントすることができます。

以下のドキュメントでは、脅威の検出と保護機能、およびコードのセキュリティ確保のために、シングルステップインスツルメンテーションで ASM を有効にする手順を説明しています。 

{{< whatsnext desc=" " >}}
    {{< nextlink href="/security/application_security/enabling/single_step/threat_detection" >}}シングルステップインスツルメンテーションを使用して、脅威の検出と保護のために ASM を有効化する{{< /nextlink >}}

     {{< nextlink href="/security/application_security/enabling/single_step/code_security" >}}シングルステップインスツルメンテーションを使用して、コードのセキュリティ確保のために ASM を有効化する{{< /nextlink >}}
{{< /whatsnext >}}

[1]:/ja/security/application_security/enabling/tracing_libraries/