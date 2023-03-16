---
further_reading:
- link: /security/application_security/threats/add-user-info/
  tag: ドキュメント
  text: ユーザーアクティビティの追跡
- link: /security/application_security/threats/setup_and_configure/
  tag: ドキュメント
  text: ASM のセットアップを構成する
- link: /security/application_security/risk_management/
  tag: ドキュメント
  text: リスク管理
- link: /security/application_security/how-appsec-works/
  tag: ドキュメント
  text: ASM の仕組み
kind: documentation
title: Application Threat Monitoring and Protection
---

ASM Threat Monitoring and Protection は、APM でインスツルメンテーションされたアプリケーションからのトレーステレメトリーを使用して、観測された挙動を既知の攻撃パターンと比較することにより、実行中のサービスに対する脅威や攻撃を特定します。

Threat Monitoring によって提起されたセキュリティシグナルは、サービスの健全性とパフォーマンスを監視するために、すでによく訪れているビューに要約され、表示されます。APM の[サービスカタログ][1]と個々のサービスページでは、アプリケーションの脅威シグナルをすばやく把握でき、すばやくクリックしてシグナルを調査し、攻撃者をブロックすることができます。

{{< img src="security/application_security/threats-on-svc-cat.png" alt="脅威シグナルを表示するサービスを含むサービスカタログ" style="width:100%;" >}}

Threat Monitoring and Protection の仕組みについての詳細は、[ASM の仕組み][4]をご覧ください。


## 脅威シグナルを探る

サービスの脅威データが Datadog に取り込まれると、ASM Overview に何が起きているかの概要が表示されます。ここでは、セキュリティモニタリングの範囲を確認したり、サービスの ASM を有効にしたりすることができます。不審なアクティビティのシグナルを調査するには、サービスの **Review** リンクをクリックします。

[シグナルエクスプローラー][2]では、属性とファセットでフィルターをかけて、重要な脅威を見つけることができます。シグナルをクリックすると、ユーザー情報、IP アドレス、トリガーしたルール、関連するトレースや他のセキュリティシグナルなど、シグナルの詳細を確認できます。

このページから、ユーザーや IP のブロックとブロック解除を行ったり、どのインフラストラクチャーが影響を受けたかを調査したりすることができます。

{{< img src="security/application_security/appsec-threat-overview.mp4" alt="シグナルエクスプローラーでの脅威の調査の概要" video="true" >}}


## 攻撃パターンを特定するための In-App WAF ルールの作成

ASM に付属するデフォルトのルールを拡張して、アプリケーションの疑わしい動作を定義する [In-App WAF ルールを作成][5]することができます。そして、これらのルールからトリガーされた攻撃試行からセキュリティシグナルを生成するために[カスタムルールを指定][6]し、調査のために Threat Monitoring ビューでそれらを表示することができます。

## ASM Protect で攻撃と攻撃者の速度を落とす

<div class="alert alert-info"><strong>ベータ版: IP およびユーザーのブロッキング</strong><br>
サービスが<a href="/agent/guide/how_remote_config_works/#enabling-remote-configuration">リモート構成を有効にした Agent とそれをサポートするトレーシングライブラリのバージョン</a>を実行している場合、Agent やトレーシングライブラリの追加構成なしで Datadog UI から攻撃をブロックすることができます。</div>

Datadog ASM は、攻撃や攻撃者を減速させるための保護機能を内蔵しています。

IP とユーザーのブロッキングアクションは、[トレーシングライブラリ][7]を介して実装され、スタックに新たな依存性を導入することはありません。ブロックは Datadog プラットフォームに保存され、[Datadog Agent][8] によって自動的かつ安全にフェッチされ、インフラストラクチャーにデプロイされ、アプリケーションに適用されます。

ASM セキュリティシグナルでフラグが立てられた攻撃者を一時的または恒久的にブロックすることができます。シグナルエクスプローラでシグナルをクリックすると、そのシグナルを生成しているユーザーと IP アドレスが表示され、オプションでそれらをブロックすることができます。

{{< img src="/security/application_security/appsec-block-user-ip.png" alt="Datadog ASM のセキュリティシグナルパネルで、攻撃者の IP をブロックすることができます" width="75%">}}

そこから、ASM によってすでに保護されているすべてのサービスは、指定された期間、ブロックされた IP またはユーザーによって実行される着信リクエストをブロックします。ブロックされたすべてのトレースには `security_response.block_ip` というタグが付けられ、[トレースエクスプローラー][9]に表示されます。ASM が無効になっているサービスは保護されません。

{{% asm-protection-page-configuration %}}

{{< img src="/security/application_security/asm-blocking-page-html.png" alt="ASM がブロックされた IP からのリクエストをブロックする際に表示されるページ" width="75%" >}}


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?lens=Security
[2]: /ja/security/explorer
[4]: /ja/security/application_security/how-appsec-works/
[5]: /ja/security/application_security/threats/inapp_waf_rules/
[6]: /ja/security/application_security/threats/custom_rules/
[7]: /ja/tracing/trace_collection/dd_libraries/
[8]: /ja/agent/guide/how_remote_config_works/
[9]: /ja/tracing/trace_explorer/