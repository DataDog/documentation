---
aliases:
- /ja/llm_observability/instrumentation/agentic/python/
title: Python アプリケーションの Agentic インスツルメンテーション
---
## インスツルメンテーション {#instrumentation}

1. インストールされている`ddtrace`バージョンを確認し、必要なインスツルメンテーションAPIがサポートされている場合は、それを再利用してください。更新が必要な場合は、その理由を説明し、既存の依存関係を変更する前に確認してください。オプションのプロンプト管理のみに必要な更新は別の判断事項であり、互換性のあるSDKを使用したインスツルメンテーションを妨げるものではありません。

    `ddtrace`がインストールされていない場合は、アプリケーションの既存のパッケージマネージャーを使用してインストールしてください：

    ```bash
    pip install ddtrace # pip
    poetry add ddtrace # poetry
    uv add ddtrace # uv
    ```

2. Agent Observabilityパッケージを初期化します

    を介して`ddtrace.auto`Agent Observability SDKを初期化します。これ**は**、環境変数や構成の読み込みに関するインポートを除き、アプリケーションのエントリーポイントで最初に行う必要があります。

    **注**：余計なコメントは追加しないでください。

    ```python
    from dotenv import load_dotenv
    load_dotenv() # this might load DD_ environment variables

    import ddtrace.auto # CRUCIAL: this initializes the Agent Observability SDK and instrumentations

    # ... remaining application logic
    ```