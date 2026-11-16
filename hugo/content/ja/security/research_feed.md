---
description: Datadog Security Research Feed を理解し、新たな脆弱性や脅威の基準を確認した上で、Bits Chat を使用してそれらがご自身の環境にどのような影響を与えるかを調査します。
title: Security Research Feed
---
Datadog Security Research Feed は、組織が新たな脅威や脆弱性に先んじて対応できるよう、継続的に更新されるセキュリティ関連コンテンツを提供します。Datadog の Security Research チームおよび Detection Engineering チームによって管理されているこのフィードは、以下を含む重要なセキュリティ動向に関するタイムリーなインサイトを提供します。

- **新たな脆弱性と脅威**: インフラストラクチャーに影響を与える可能性のある、新たに発見された脆弱性やアクティブな攻撃キャンペーンに関する最新情報。これらの更新情報は、セキュリティチームが検知カバレッジを評価し、影響を受けるシステムを特定し、潜在的な影響を判断するのに役立ちます。
- **新しい検知コンテンツ**: Datadog の Detection Engineering チームがリリースした最新の検知コンテンツです。これには、新しい戦術、技術、手順 (TTPs) や、サポートされている検知パックが含まれます。
- **製品アップデート**: 環境の監視および保護能力を向上させる、Datadog のセキュリティ機能の強化。

{{< img src="security/security_research_feed.png" alt="ブログ記事、製品アップデート、新たな脆弱性、新しい検知機能などのセキュリティ更新情報を表示する Security Research Feed" width="100%">}}

## 仕組み {#how-it-works}

Security Research チームと Detection Engineering チームは、脅威の状況を継続的に監視し、新たな脅威が発生し次第、更新情報を公開します。これにより、セキュリティ専門家は以下にアクセスできるようになります。

- 最新のセキュリティトレンドに関する専門的な分析。
- 脆弱性や脅威の影響を評価するためのコンテキスト情報。
- 効果的な検知および対応戦略を実装するためのガイダンス。

## 新たな脆弱性の基準 {#criteria-for-emerging-vulnerabilities}

新たな脆弱性とは、ビジネス運営を著しく脅かす、技術的なセキュリティ上の弱点です。以下の基準の 1 つ以上によって定義されます。

- **広範な影響**: その脆弱性が多数のシステムや組織に影響を及ぼし、広範な攻撃対象領域を生み出していること。
- **深刻度が高い**: 悪用されやすさと潜在的な被害の大きさから、直ちに対処すべきセキュリティ上の懸念事項となっていること。
- **高い注目度**: その問題がセキュリティコミュニティや一般のニュースメディアで広く取り上げられており、認知度が高まり、緊急性も増していること。

## 新たな脅威の基準 {#criteria-for-emerging-threats}

新たな脅威とは、ビジネス運営を混乱させた、あるいは重大な脅威をもたらす、新規または進化し続ける攻撃キャンペーンやサプライチェーン攻撃のことです。これは、以下の基準の 1 つ以上によって定義されます。

- **広範な影響**: 広範な日和見的攻撃や標的型キャンペーンを通じて、すでに多数のシステムや組織に影響を及ぼしていること。
- **差し迫った脅威**: すでに影響を及ぼしているか、今後の拡大が予想され、近いうちに多くの組織が攻撃の影響を受ける可能性が高いこと。
- **高い注目度**: その問題がセキュリティコミュニティや一般のニュースメディアで広く取り上げられており、認知度が高まり、緊急性も増していること。

## Bits Chat で新たな脆弱性や脅威を調査する {#investigate-emerging-vulnerabilities-and-threats-with-bits-chat}

**要件**: **Bits Chat Access** 権限。

Security Research Feed では、[Bits Chat][1] を使用して、新たな脆弱性や脅威がご自身の環境にどのような影響を与えるかを調査できます。Bits Chat は記事を読み取り、脆弱性の検出結果、セキュリティシグナル、APM サービス、コンテナイメージなど、記事に記載されているデータソースを確認して、影響を受けるリソースを特定します。次に、Bits Chat は影響を受けるリソースを要約し、それらの修復手順を提案します。

{{< ui >}}Investigate with Bits{{< /ui >}} ボタンは、新たな脆弱性および新たな脅威の記事でのみ利用可能です。

Bits Chat で記事を調査するには、以下の手順を実行します。

1. Security Research Feed で、新たな脆弱性または新たな脅威の記事を開きます。
2. サイドパネルの {{< ui >}}Impact Assessment{{< /ui >}} セクションで、{{< ui >}}Investigate with Bits{{< /ui >}} をクリックします。Bits Chat が新しい会話を開始し、その記事がコンテキストとして添付されます。調査中、ボタンには {{< ui >}}Bits is investigating…{{< /ui >}} と表示されます。
3. Bits Chat の回答を確認します。回答には、Bits Chat が確認した各データソース、クエリの内容、およびその結果を記載したカバレッジテーブルが含まれます。

{{< img src="security/research_feed_investigate_with_bits.png" alt="サイドパネルで開かれた新たな PHP 脆弱性に関する Security Research Feed の記事と、[Impact Assessment] セクションにある [Investigate with Bits] ボタン" width="100%">}}

<div class="alert alert-info">Bits Chat の結果は、Datadog 内のデータのみに基づいています。Datadog Agent がインストールされていないホストや APM のないサービスなど、Datadog が監視していないリソースは結果に表示されません。結果に基づいて対応する前に、内容を確認してください。</div>

記事を調査すると、サイドパネルに 2 つのボタンが表示されます。

- {{< ui >}}View existing investigation{{< /ui >}}: その記事に関する以前の Bits Chat の会話を再開します。
- {{< ui >}}Start a new investigation{{< /ui >}}: その記事に関する新しい Bits Chat の会話を開始します。

調査は Bits Chat で実行され、[AI クレジット][2]を消費します。

### Security Research Feed の記事について Bits Chat に質問する {#ask-bits-chat-about-a-security-research-feed-article}

Security Research Feed の記事が開かれている場合、Bits Chat はその記事をコンテキストとして自動的に添付します。記事について Bits Chat に質問するには、サイドパネルで記事を開いた状態で <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd> を押します。これはすべての記事タイプで機能します。

[1]: /ja/bits_ai/bits_chat/
[2]: /ja/account_management/billing/ai_credits/