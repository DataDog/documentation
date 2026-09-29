---
description: Datadog がキュレーションしたコンテンツパックを有効にすると、特定のソフトウェアスタックや脅威ベクトルに対するオプションの検知機能をデプロイできます。
disable_toc: false
further_reading:
- link: /security/workload_protection/detect_and_monitor/agent_rules/policy_management
  tag: ドキュメント
  text: ポリシーを使用して Agent ルールをデプロイする
- link: /security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
  tag: ドキュメント
  text: Workload Protection の検知ルール
- link: /security/workload_protection/investigate_and_triage/security_signals
  tag: ドキュメント
  text: セキュリティシグナルを調査する
title: コンテンツパック
---
すべての検知ルールがすべてのワークロードに関連するわけではありません。特定の制約がある環境では一部の検知機能がノイズ過多になる可能性があり、また特定のソフトウェアスタックには適用されない場合もあります。同時に、新たな脅威が定期的に出現しており、Datadog のセキュリティリサーチチームは、新しい攻撃や脆弱性を検知するためのルールを継続的に開発しています。

Workload Protection の [コンテンツパック][1] は、これら両方の課題に対処します。各コンテンツパックは、特定のソフトウェアスタック、脅威ベクトル、または新たな脆弱性のために構築された、オプションの [Agent ルール][2]、[検知ルール][3]、およびサポートコンテンツをまとめた Datadog 製のバンドルです。必要なコンテンツパックにオプトインし、適用対象となるワークロードにのみデプロイします。

## メリット {#benefits}

- **関連するワークロードに対象を絞った検知機能をデプロイする:** 特定のワークロードや環境向けに構築されたポリシーにオプトインし、適用対象となる場所にのみデプロイします。これにより、それらの検知機能が適用されないワークロードにおける不要なノイズやパフォーマンスへの影響を回避できます。
- **新たな脅威に先手を打つ:** Datadog のセキュリティリサーチチームが新たな脅威や脆弱性を特定するたびに新しいルールを利用でき、デフォルトのポリシーで提供されるカバレッジを補完します。

## 含まれるコンテンツ {#included-content}

コンテンツパックに応じて、バンドルには以下が含まれます。

- **Agent ルール**は、コンテンツパックが対象とするワークロードを対象範囲とする [ポリシー][4] にパッケージ化されています。
- **検知ルール**: 一致するアクティビティが検知された際に [セキュリティシグナル][5] を発生させます
- **Finding ルール**: 対象となるユースケースのランタイムセキュリティ態勢を評価します。
- 環境にコンテンツパックをデプロイするための構成ガイダンス

## コンテンツパックを有効にする {#enable-a-content-pack}

1. [コンテンツパック][1] に移動します。
2. 利用可能なコンテンツパックを参照し、1 つ選択します。
3. 含まれている Agent ルール、検知ルール、およびデプロイ要件を確認します。
4. {{< ui >}}Enable{{< /ui >}}をクリックしてコンテンツパックを有効にし、関連付けられているポリシーページに移動します。

コンテンツパックを有効にすると、関連付けられているポリシーとルールが組織に追加されます。脅威の検出を開始するには、関連付けられているポリシーをインフラストラクチャーにデプロイします。

## コンテンツパックをデプロイする{#deploy-a-content-pack}

コンテンツパックは [ポリシー][4] を通じてデプロイされます。コンテンツパックを有効にした後、検知が適用されるワークロードを対象として、そのポリシーのスコープを設定します。

1. [ポリシー][6] に移動します。
2. 有効にしたコンテンツパックに関連付けられているポリシーを開きます。
3. デプロイのスコープの横にある {{< ui >}}Edit{{< /ui >}} をクリックします。
4. 特定のホスト、クラスター、または環境を対象にするには、[タグ][7] を追加します。
5. ポリシーを有効に切り替えて、デプロイを確定します。

ポリシーのデプロイの詳細については、[ポリシー管理][4] を参照してください。

## コンテンツパックを無効にする{#deactivate-a-content-pack}

1. [コンテンツパック][1] に移動します。
2. 利用可能なコンテンツパックを参照し、有効になっているものを選択します。
3. {{< ui >}}Deactivate{{< /ui >}} をクリックして、ポリシーページから関連付けられているポリシーを削除します。

[1]: https://app.datadoghq.com/security/workload-protection/overview#content-packs
[2]: /ja/security/workload_protection/detect_and_monitor/agent_rules
[3]: /ja/security/workload_protection/detect_and_monitor/detection_and_finding_rules/detection_rules
[4]: /ja/security/workload_protection/detect_and_monitor/agent_rules/policy_management
[5]: /ja/security/workload_protection/investigate_and_triage/security_signals
[6]: https://app.datadoghq.com/security/workload-protection/policies
[7]: /ja/getting_started/tagging/