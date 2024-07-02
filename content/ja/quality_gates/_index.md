---
description: Quality Gates を使用することで、チームが本番環境で使用するコードを管理する方法を説明します。
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Software%20Delivery
  tag: リリースノート
  text: Software Delivery の最新リリースをチェック！ (アプリログインが必要です)。
- link: /quality_gates/search
  tag: ドキュメント
  text: Quality Gates ルールの検索方法について
- link: /quality_gates/explorer
  tag: ドキュメント
  text: Quality Gates Explorer について
- link: /account_management/audit_trail/
  tag: ドキュメント
  text: 監査証跡について
is_beta: true
title: クエリメトリクスの確認
---

{{< site-region region="gov" >}}
<div class="alert alert-warning">選択したサイト ({{< region-param key="dd_site_name" >}}) では現在 Quality Gates は利用できません。</div>
{{< /site-region >}}

{{< callout url="#" btn_hidden="true" >}}
Quality Gates は公開ベータ版です。
{{< /callout >}}

## 概要

Quality Gates を使用すると、Datadog のシグナルに基づいてワークフローを制御することができます。
Quality Gates を使用すると、以下のことが可能になります。

* Datadog のデータを使用することで、ワークフローをブロックできるルールを作成します。
* 本番環境で使用するコードと使用しないコードをチームがコントロールできるようにします。
* 的確な実施により、コード品質を継続的に改善します。

Quality Gates を使用すると、デフォルトブランチにマージしてデプロイする内容を制御できます。本番環境で動作するコードが高い品質基準を満たしていることを確認し、インシデントを減らし、不要な動作を最小限に抑えることができます。

## ルールの作成

新しい[不安定なテスト][1]、コードセキュリティ違反、または通常 CI/CD パイプラインで失敗しない他の問題が本番環境にデプロイされることを防ぐため、コードのマージをブロックするルールを作成できます。

Quality Gates ルールを作成するには、[セットアップドキュメント][2]を参照してください。

## ルールの検索

Quality Gates ルールにアクセスするには、[検索と管理のドキュメント][5]を参照してください。

## ルール変更の追跡

[監査証跡][3]では、Quality Gates ルールを作成した人、変更した人、削除した人の情報を確認できます。

詳細については、[監査証跡ドキュメント][4]を参照してください。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/tests/guides/flaky_test_management/
[2]: /ja/quality_gates/setup/
[3]: /ja/account_management/audit_trail/
[4]: /ja/account_management/audit_trail/events/#ci-visibility-events
[5]: /ja/quality_gates/search/