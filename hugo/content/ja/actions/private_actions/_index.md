---
aliases:
- /ja/service_management/workflows/private_actions/
- /ja/service_management/app_builder/private_actions/
description: オンプレミスアクションの実行および認証レイヤーとしてプライベートアクションランナーを使用し、Datadog 製品からプライベートネットワーク内のサービスに対してアクションを実行します。
disable_toc: false
further_reading:
- link: actions/private_actions/set_up_agent_based
  tag: ドキュメント
  text: プライベートアクションランナーのセットアップ
- link: actions/private_actions/enroll_runner
  tag: ドキュメント
  text: 登録と所有権
- link: /actions/private_actions/authorize_private_actions/
  tag: ドキュメント
  text: Private Actions の認証
title: Private Actions
---
## 概要 {#overview}

プライベートアクションを使用すると、Kubernetes クラスター、内部ホスト、データベース、内部 API などのプライベートネットワーク内のサービスに対して、それらのサービスをパブリックインターネットに公開することなくアクションを実行できます。これらは、Datadog Agent 内 (推奨) またはスタンドアロンランナーとして環境にデプロイするプライベートアクションランナーを通じて実行できます。プライベートアクションを使用する Datadog 製品には、Workflow Automation、App Builder、Datadog MCP、および Bits AI 調査が含まれます。

プライベートアクションは、次の 2 つのレイヤーに依存します。

- [**プライベートアクションランナー**](#private-action-runner)がアクションを実行します。ネットワーク内で実行され、Datadog からアクションタスクを受信し、ターゲットサービスに対して各タスクを実行し、結果を Datadog に返します。
- [**認証レイヤー**](#authorization-models)は Datadog で管理されます。どのユーザーや製品がどのランナーでどのアクションを実行できるかを定義し、アクションがランナーに到達する前に各アクションの許可または拒否を行います。ランナーが実行を許可されるアクションは、Agent 構成 (`datadog.yaml`) のアクション許可リストによって Agent 側でも制限されます。

## プライベートアクションランナー {#private-action-runner}

プライベートアクションランナーは、プライベートアクションを実行するために環境内にデプロイするコンポーネントです。Datadog へのアウトバウンドコネクションを開き、アクションタスクをポーリングし、ターゲットサービスに対して各タスクを実行し、結果を返します。

プライベートアクションランナーには、自身でデプロイおよび管理するスタンドアロンランナーと、Datadog Agent に組み込まれたランナーの 2 つの形式があります。

| | Datadog Agent 内のランナー| スタンドアロンランナー |
|---|---|---|
| **概要** | 単一の構成フラグで有効化される、Datadog Agent のコンポーネント。| Datadog Agent とは独立してインストールおよび管理できる専用コンテナ。|
| **推奨されるケース** | すでに Datadog Agent を実行しており、Agent のライフサイクルを通じてランナーを管理したい場合。| Agent でまだ利用できないインテグレーションが必要です。|
| **ステータス** | 新規デプロイメントに推奨。| サポート対象 (メンテナンスモード)。|

<div class="alert alert-tip">Datadog では、プライベートアクションランナーを Datadog Agent で実行することを推奨しています</div>

インストール手順については、[Datadog Agent でのプライベートアクションランナーのセットアップ][1] または [スタンドアロンランナーのセットアップ][2] を参照してください。

## 認証モデル {#authorization-models}

Datadog は 2 つの認証モデルを提供しています。ランナーが使用するモデルはランナーの登録時に設定され、ランナーの所有権に基づきます。詳細については、[登録と所有権][3] を参照してください。

- **実行ポリシー**は、Datadog Agent のランナーに適用され、大規模なアクセス管理のために構築されています。各ランナーの各インテグレーションに対して個別のコネクションを作成する代わりに、Agent タグを使用して 1 つ以上のランナーセットをターゲットにします。実行ポリシーでは、きめ細かな制御も可能です。特定のアクションやアクションセットの許可または拒否、および Kubernetes アクションのターゲット Kubernetes ネームスペースなど、インテグレーション固有のスコープを適用できます。
- **コネクション**は、Agent 内のランナーとスタンドアロンランナーの両方で利用できます。これらは最大で 1 つのランナーにのみアタッチできます。コネクションにはサービスの資格情報を保存できます。

2 つのモデルを比較し、どちらがランナーに適用されるかを決定するには、[Private Actions の認証][4] を参照してください。

## 次のステップ {#next-steps}

- **プライベートアクションを初めて使用する場合**: [プライベートアクションの概要][7] に従ってランナーをデプロイし、最初のアクションを実行してください。
- **Datadog Agent にランナーがあり、フリート全体でアクセス制御を行いたい場合**: [実行ポリシー][5] で認証してください。
- **Agent 内のランナーまたはスタンドアロンランナーを持っていて、単一のランナーを認証したい場合**: [コネクション][6] で認証してください。

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/actions/private_actions/set_up_agent_based/
[2]: /ja/actions/private_actions/set_up_standalone/
[3]: /ja/actions/private_actions/enroll_runner/
[4]: /ja/actions/private_actions/authorize_private_actions/
[5]: /ja/actions/private_actions/execution_policies/
[6]: /ja/actions/connections/
[7]: /ja/actions/private_actions/getting_started/