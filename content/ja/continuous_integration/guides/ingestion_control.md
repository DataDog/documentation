---
description: 特定のイベントを CI Visibility で処理しないための条件を定義する方法について説明します
further_reading:
- link: https://www.datadoghq.com/blog/streamline-ci-testing-with-datadog-intelligent-test-runner/
  tag: ブログ
  text: Datadog Intelligent Test Runner による CI テストの効率化
- link: https://www.datadoghq.com/pricing/?product=ci-visibility#ci-visibility
  tag: 料金
  text: CI Visibility の価格を見る
title: CI Visibility の取り込み制御
---

## 概要

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 CI Visibility は利用できません。</div>
{{< /site-region >}}

除外フィルターは、特定のイベントを Datadog の処理対象から除外する条件を 1 つ以上定義することで、CI Visibility の予算をきめ細かく制御することができます。

### 互換性
Pipeline Visibility にフィルターが用意されています。

## 除外フィルターを追加する
Pipeline Visibility の設定に除外フィルターは必須ではありません。デフォルトでは、すべてのデータが取り込まれ処理されます。

組織用のフィルターを作成するには、ユーザーアカウントに `ci_ingestion_control_write` [権限][1]が必要です。

1. Datadog で、**CI** > **Settings** > **Ingestion Settings** に移動します。
2. **Add an Exclusion Filter** を選択。

{{< img src="ci/add-ci-exclusion-filter.png" alt="除外フィルターの追加ボタン" style="width:90%;">}}

3. フィルターに名前を付けて、クエリを定義します。クエリを定義すると、入力フィールドの上にあるプレビューに、クエリに一致する取り込みデータが表示されます。フィルターが作成され、有効になると、プレビューに表示されているようなイベントは取り込みの対象から除外されます。

{{< img src="ci/exclusion-filter-pipeline.png" alt="特定のパイプラインに対する除外フィルターの作成" style="width:100%;">}}

フィルターを追加すると、このページの各行に以下が表示されます。
- **Filter name** - フィルター名
- **Exclusion query** - そのフィルターに定義されていたクエリ
- [フィルターの有効・無効を切り替える](#enabling-and-disabling-filters) - 新規に作成されたフィルターは、デフォルトでオンに設定されています

1 つ以上のフィルターに一致するすべてのスパンは、Datadog によって取り込まれることも処理されることもありません。

## 除外フィルターのクエリを定義する
フィルターは、クエリエディターインターフェイスで柔軟に定義することができます。[タグ][3]や属性に頼って、フィルターを作成します。

### 除外フィルターの例
以下は、除外フィルターが CI Visibility の使用と請求を最適化するのに役立つ例です。

#### git author のメールアドレスでフィルターする
git author のメールアドレス (`@git.commit.author.email`) をフィルターとして定義することで、特定のコミッターを監視対象から除外することができます。以下のスクリーンショットは、この特定の git author のメールアドレスからのコミットに関連するすべてのスパンを取り込まないようにするフィルターを示しています。

{{< img src="ci/exclusion-filter-email.png" alt="メールアドレスに対する取り込み制御除外フィルター" style="width:100%;">}}

#### git author のメールドメインでフィルターする
また、メールアドレスドメインによって一度に多くのコミッターを除外することもできます (例えば、監視対象のリポジトリにコミットする外部の貢献者を除外したい場合など)。以下のスクリーンショットは、クエリに含まれるメールアドレスドメインと一致しないメールアドレスドメインからのコミットに関連するすべてのスパンを取り込まないようにするフィルターを示しています。

{{< img src="ci/exclusion-filter-domain.png" alt="メールドメインに対する取り込み制御除外フィルター" style="width:100%;">}}

#### リポジトリによるフィルター
リポジトリ名 (`@git.repository.name`) または ID (`@git.repository.id`) でフィルターを定義することで、特定のリポジトリを監視対象から除外することができます (たとえば、内部のテスト用リポジトリなど)。以下のスクリーンショットは、このリポジトリへのコミットに関連するすべてのスパンを取り込まないようにするフィルターを示しています。

{{< img src="ci/exclusion-filter-repo.png" alt="リポジトリに対する取り込み制御除外フィルター" style="width:100%;">}}

## 除外フィルターの更新
除外フィルターは、`ci_ingestion_control_write` [権限][4]を持つユーザーによって有効/無効、更新、削除することができます。これらは組織レベルで適用されます。Datadog [監査証跡][5]を使用すると、誰が除外フィルターを変更したかの詳細情報を見ることができます。

### フィルターの有効化と無効化
各フィルターの右側にあるトグルで、いつでもフィルターの有効・無効を切り替えることができます。新規に作成されたフィルターは、デフォルトでオンになっています。

**注**: ほとんどの場合、フィルターは有効化されてから 1 秒以内 (p95) に取り込みデータに適用されます。ただし、有効化されたフィルターが有効になるまでに数分かかる場合もあります。

### フィルターの更新
フィルター名の変更や除外フィルターのクエリーの変更は、**Ingestion Settings** ページ内でいつでも行うことができます。

{{< img src="ci/exclusion-filter-edit.png" alt="取り込み制御の除外フィルター編集ボタン" style="width:90%;">}}

### フィルターの削除
削除アイコンをクリックすることで、フィルターを削除することができます。

{{< img src="ci/exclusion-filter-delete.png" alt="取り込み制御の除外フィルター削除ボタン" style="width:90%;">}}

## その他の参考資料
{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/account_management/rbac/permissions/#ci-visibility
[3]: /ja/getting_started/tagging/
[4]: /ja/account_management/rbac/permissions/#ci-visibility
[5]: /ja/account_management/audit_trail/events/#ci-visibility-events
[6]: /ja/monitors/types/apm/