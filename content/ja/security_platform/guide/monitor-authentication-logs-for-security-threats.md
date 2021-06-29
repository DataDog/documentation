---
title: モニター認証ログによるセキュリティ対策
kind: ガイド
aliases:
  - /ja/security_monitoring/guide/monitor-authentication-logs-for-security-threats/
further_reading:
  - link: 'https://www.datadoghq.com/blog/how-to-monitor-authentication-logs/'
    tag: ブログ
    text: モニター認証ログに関する詳細
---
## 概要

認証イベントのすべてをログに記録し、監視して分析することは、セキュリティ対策および顧客の記録管理を徹底しコンプライアンスを遵守するために大変重要です。さまざまなソースや環境からの認証ログは、さまざまな形式を持ち、さまざまなチームにより管理され、複数のサードパーティサービスにより実装されています。

このガイドでは、[Datadog セキュリティおよびコンプライアンスモニタリング][1]で認証ログデータを使用しセキュリティへの脅威を監視し、検出することができるよう、認証ログの管理およびフォーマット化に役立つベストプラクティスをご紹介します。

## 前提条件

セキュリティおよびコンプライアンスモニタリングを使用するには、ログの収集が有効である必要があります。このガイドでは、ログ収集を[アプリケーションレベル][2]で有効にすることをおすすめしています。

## 認証ログの管理とフォーマット化

セキュリティ上の脅威を監視するには、以下のベストプラクティスを実行し、Datadog へ十分なログデータのフローがあることを確認します。

### すべてのログインフローのログイベント

認証アクティビティのすべてを確認するためには、すべてのログインフローのログイベントがアプリケーションレベルである必要があります。これにより、監視範囲の漏れをなくすことができます。また、認証イベントのログ方法や収集データをより細かく制御することが可能になります。

### 有用なデータを含むログ

すべての認証イベントをアプリケーションレベルで記録することで、[セキュリティ上の脅威の検出および監視](#monitor-and-detect-security-threats)に最も有用なデータをログに含めることができます。

{{< code-block lang="bash" >}}
2020-01-01 12:00:01 google oauth login success by John Doe from 1.2.3.4
{{< /code-block >}}

イベントについて、「誰が」(John Doe)、「何を」(login success)、「いつ」(2020-01-01 12:00:01) を含むログは、Datadog で複雑な分析を行うために最高レベルの情報を提供します。

### 標準的な、解析可能な形式でログイン

アプリケーションでは、必ず `=` をセパレーターとして使用する key-value 形式でログを作成します。この形式を使用すると、Datadog の [Grok Parser][3] などの key-value パーサーの処理が簡単になります。たとえば、ログが以下の形式の場合:

{{< code-block lang="bash" >}}
INFO 2020-01-01 12:00:01 usr.id="John Doe" evt.category=authentication evt.name="google oauth" evt.outcome=success network.client.ip=1.2.3.4
{{< /code-block >}}

Datadog で以下の JSON として解析できます。

{{< code-block lang="json" >}}
{
  "usr": {
    "id": "John Doe"
  },
  "evt": {
    "category": "authentication",
    "name": "google oauth",
    "outcome": "success",
  },
  "network": {
    "client": {
      "ip": "1.2.3.4"
    }
  }
}
{{< /code-block >}}

送信元に関わらずすべての属性のデータを検索、収集できるよう、ログの属性には[標準的な命名規則][4]を使用することが重要です。認証ログには、以下の[標準属性][5]を含めることが推奨されています。

- [`usr.id`][6]
- [`evt.category`][7]
- [`evt.name`][7]
- [`evt.outcome`][7]
- [`network.client.ip`][8]

Datadog でログ属性を適切に使用しログデータを絞り込んだり管理したりできるよう、すべての認証ログには同じ形式を使用します。たとえば、標準属性を使用すると、最も多くログインに失敗した (`evt.outcome:failure`) ユーザー (`usr.id`) を検索できます。

また、key-value 形式を使用することで、ログにカスタム属性を追加しやすくなります。たとえば、[reCAPTCHA v3][9] スコアを追加して、ボットアクティビティの可能性を特定します。スペースを含む属性値を囲むには、引用符を使用します。こうすることで、解析しやすい方法で全値をキャプチャできます。

## セキュリティ上の脅威の監視、検出

セキュリティ上の脅威を適切に監視し検出するには、気を付けるべき重要なパターンがあります。たとえば、短期間内に 1 人のユーザーのログイン試行が相当回数失敗している場合、[**ブルートフォース攻撃**][10]の可能性があります。このログイン失敗の連続が最終的に成功した場合、アカウントの乗っ取りの可能性があるため、ただちに調査する必要があります。

認証システムへの攻撃として一般的な方法には、他に[**クレデンシャルスタッフィング**][11]があります。クレデンシャルスタッフィングは、セキュリティ侵害を受けたログイン情報をランダムに使用して、本当に動作するユーザーアカウントを見つけ出す攻撃です。このタイプの攻撃を検出するには、同じ `network.client.ip` から送信されてくる複数の `usr.id` の値を使用したログインをチェックします。

{{< img src="security_platform/security_monitoring/guide/monitor-authentication-logs-for-security-threats/credential-stuffing-attack-signal.png" alt="セキュリティシグナルエクスプローラーに表示されたクレデンシャルスタッフィング攻撃のサイン">}}

Datadog では、上記のような一般的な攻撃に対し、収集されたログをリアルタイムでスキャンすることのできる、事前設定済みの[検出ルール][12]を提供しています。このルールをトリガーするログがあると、Datadog により自動的に[セキュリティシグナル][13]が生成されます。このシグナルには、検出された攻撃の種類や対応方法、状況への対処方法など、イベントに関する重要なデータが含まれます。セキュリティシグナルは、エクスプローラーで表示、絞り込み、並べ替えることが可能で、情報をトリアージして重点的に作業をすべき点を確認できます。

`Credential Stuffing Attack` 検出ルールによりトリガーされたシグナルには、対応および対処に[すぐに使える Runbook][14] があります。この Runbook を使うと、クレデンシャルスタッフィング攻撃の可能性を調査することが可能で、関連ログのグラフが含まれています。Runbook を使用するには、コピーを保存して時間枠を設定し、マークダウンで調査を記録します。チームメイトに共有すると[コメントを入力][15]できます。

### 調査にはダッシュボードを使用

Datadog では、[IP 調査ダッシュボード][16]や[ユーザーアカウント調査ダッシュボード][17]など、すぐに使用できるダッシュボードを提供しています。ここでは、認証ログの重要なデータを環境内の他の関連データと結びつけ、調査に役立てることができます。

たとえば、特定の IP アドレスまたはユーザーが複数のセキュリティシグナルをトリガーしている場合、ダッシュボードのリストまたはグラフでその IP アドレスまたはユーザーをクリックし、**View related Security Signals** を選択します。すると、該当する IP アドレスまたはユーザーにトリガーされたすべてのセキュリティシグナルがセキュリティシグナルエクスプローラーに表示されます。十分なデータがあれば、このビューで IP アドレスをユーザーに、またはその逆を関連付けることができます。そして、各ルールの詳細を確認して攻撃に対処します。ルールをクリックして **Message** タブでトリアージおよび対処に関する情報を確認し、この問題を適切に評価して対処を実行します。

{{< img src="security_platform/security_monitoring/guide/monitor-authentication-logs-for-security-threats/investigation-dashboard-example.gif" alt="IP 調査ダッシュボードで、トリガーされたセキュリティシグナルを分析">}}

カスタムダッシュボードを作成して、キーとなる認証データ（ソース別ログイン回数と結果など）を視覚化することも可能です。ユーザーベース全体のアクティビティを高いレベルで確認し、トレンドを理解して調査すべき疑わしいスパイクを検出することができます。

### Log Rehydration&trade; で今後の調査に利用

Datadog では、[すべてのログ][18]を取り込み分析し、環境全体において脅威を検出します。[インデックス化の必要のない][19]ログはアーカイブし、調査や監査、またはコンプライアンスのために必要になった時に、すばやく[リハイドレート][20]できます。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/security_monitoring/
[2]: /ja/logs/log_collection/?tab=http#application-log-collection
[3]: /ja/logs/processing/processors/?tab=ui#grok-parser
[4]: https://www.datadoghq.com/blog/logs-standard-attributes/
[5]: /ja/logs/processing/attributes_naming_convention/
[6]: /ja/logs/processing/attributes_naming_convention/#user-related-attributes
[7]: https://docs.datadoghq.com/ja/logs/processing/attributes_naming_convention/#events
[8]: /ja/logs/processing/attributes_naming_convention/#network
[9]: https://developers.google.com/recaptcha/docs/v3
[10]: https://app.datadoghq.com/security/configuration/rules?query=brute%20force%20attack&sort=rule
[11]: https://app.datadoghq.com/security/configuration/rules?query=credential%20stuffing%20attack&sort=rule
[12]: /ja/security_monitoring/default_rules/
[13]: /ja/security_monitoring/explorer
[14]: https://app.datadoghq.com/notebook/credentialstuffingrunbook
[15]: /ja/notebooks/#commenting
[16]: https://app.datadoghq.com/screen/integration/security-monitoring-ip-investigation
[17]: https://app.datadoghq.com/screen/integration/security-monitoring-user-investigation
[18]: https://www.datadoghq.com/blog/logging-without-limits/
[19]: /ja/logs/indexes/#exclusion-filters
[20]: https://www.datadoghq.com/blog/efficient-log-rehydration-with-datadog/