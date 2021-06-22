---
title: セキュリティホーム
kind: documentation
further_reading:
  - link: security_monitoring/default_rules
    tag: ドキュメント
    text: デフォルトのログ検出ルールについて
  - link: /security_platform/security_monitoring/log_detection_rules
    tag: ドキュメント
    text: 新しいセキュリティモニタリングルールの作成ガイドに従う
---
## 概要

[セキュリティホーム][1]はセキュリティモニタリング環境への入口となるページです。脅威の検知を目的として分析されたログ、[デフォルト][2]または[カスタム][3]ログ検知ルールから生成されたシグナル、確認および修復が必要な脅威などにいつでもアクセスできます。ロギングソースのステータス確認と新しいソースの構成も一箇所で行うことができます。

{{< img src="security_platform/security_monitoring/security_home/overview.png" alt="セキュリティホーム" width="75%">}}

## ログ分析

すべてのソースにおいて分析されたログの概要をすばやく表示します。**Logs Analyzed** を選択すると[ログエクスプローラー][2]で分析されたログのリストが表示され、より粒度の高い情報を確認できます。ログエクスプローラーでは[ログファセット][3]でフィルタリングしたり、[ログを集計][4]して分析されたログの情報をさらに掘り下げることができます。

## シグナルの生成

生成されたシグナル数とシグナルをトリガーするルールの総数を分析します。**Signals Generated** を選択して、[シグナルエクスプローラー][5]のログ検知ルールでフィルタリングを行うこともできます。

シグナルエクスプローラーでは、シグナルが生成された任意のルールをクリックしてそのシグナルをさらに検証することができます。**Message** タブを選択して[生成されたシグナルの優先順位付けや対応][6]方法を確認したり、パネルの上部または **Event Attributes** タブに一覧表示された任意のイベント属性をクリックして、[属性でシグナルをフィルタリング][6]することができます。

## 脅威の検知

[リアルタイムの脅威検知][7]機能により、規則が一致した場合に Datadog が脅威の重大度と通知の送信が必要かどうかを評価します。セキュリティホームページから、お使いの環境におけるすべてのエンティティで検知された脅威の数を確認できます。**Threats Detected** を選択して、シグナルエクスプローラーで悪意のあるエンティティを確認します。任意のエンティティをクリックすると、関連して生成されたシグナルの修復方法やその他の詳細を掘り下げることができます。

## ソースの分析

ソースがいずれかの時点でより多くのシグナルを生成している、またはより頻繁にログを分析しているという場合、Datadog は Sources Analyzed テーブル内のソースグラフ上で自動的にこの瞬間をフラグとして記録し、潜在的な脅威や傾向の特定をサポートします。

グラフ内の任意のバーやテーブル内のデータをクリックし、**View generated signals** または **View generated logs** を選択して詳細を確認します。

このテーブルに新しいソースを構成することもできます。**Configure Source** ボタンをクリックして、新しいソースに対するログの収集を設定します。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/homepage
[2]: /ja/security_platform/default_rules/
[3]: /ja/security_platform/security_monitoring/log_detection_rules
[3]: /ja/logs/explorer/
[3]: /ja/logs/explorer/facets/#overview
[4]: /ja/logs/explorer/#aggregate-and-measure
[5]: /ja/security_platform/explorer
[6]: /ja/security_platform/explorer#inspect-a-security-signal
[7]: https://www.datadoghq.com/blog/announcing-security-monitoring/#real-time-threat-detection