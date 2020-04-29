---
title: Slack インテグレーションの作成
type: apicontent
order: 20.2
external_redirect: "/api/#create-a-slack-integration"
---

## Slack インテグレーションの作成

Datadog-Slack インテグレーションを作成します。

**注**:

* `POST` メソッドを使用すると、Datadog Organization の既存の構成に新しい構成を**追加**して、インテグレーション構成が更新されます。
* `PUT` メソッドを使用すると、現在の構成を Datadog Organization に送信された新しい構成に**置き換えて**、インテグレーション構成が更新されます。新しい Slack 構成を作成 (`PUT`) する際は、すべての引数が必要です。

**引数**:

* **`service_hooks`** [必須]:
    サービスフックオブジェクトの配列 (Slack アカウントのサービスフックは Slack アカウント管理ページで生成されます)。サービスフックオブジェクトは、以下の要素で構成されます。

    * **`account`** [必須]:
        Slack アカウント名。

    * **`url`** [必須]:
        Slack サービスフックの URL。

**注**: 既存の Slack 構成に追加 (POST) または更新 (PUT) する際に、ペイロードに **`service_hooks`** は必要ありません。
