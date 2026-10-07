---
disable_toc: false
title: App and API Protection のセットアップ
---

## 前提条件

App and API Protection をセットアップする前に、次の前提条件を満たしていることを確認してください:

- **Datadog Agent Installation:** The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- Datadog APM の設定: Datadog APM がアプリケーションまたはサービスに設定されており、`type:web` の Web トレースが Datadog で受信されていること。
- サポートされるトレーシングライブラリ: アプリケーションまたはサービスで使用されている Datadog トレーシングライブラリが、該当アプリケーションまたはサービスの言語向けの App and API Protection 機能に対応している必要があります。詳細については、Library Compatibility のページを参照してください。

## App and API Protection の有効化方法の概要

トレーシングライブラリで App and API Protection を有効化するには、主に 2 つのアプローチがあります。具体的には、シングルステップインストルメンテーションと Datadog トレーシングライブラリです。

## シングルステップインストルメンテーション

1 行のインストールコマンドを実行して、Datadog Agent をインストールし、シングルステップインストルメンテーションで App and API Protection を有効にします。


## Datadog Tracing Libraries

Add an environment variable or a new argument to your Datadog Tracing Library configuration.

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}