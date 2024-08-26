---
disable_toc: false
further_reading:
- link: https://www.datadoghq.com/blog/datadog-software-composition-analysis/
  tag: ブログ
  text: Datadog Software Composition Analysis でサードパーティライブラリの脆弱性を軽減する
title: Datadog SCA でオープンソースのリスク低減を自動化する
---

Datadog Software Composition Analysis (SCA) を使用すれば、アプリケーションサービスで使用されているサードパーティのオープンソースソフトウェア (OSS) の脆弱性やその他のリスクを簡単に特定し、優先順位を付け、解決することができます。

このトピックでは、SCA を使用してオープンソースライブラリの脆弱性とリスクを表示し、解決する方法について説明します。

## SCA のメリット

SCA は、オープンソースライブラリに関連する以下のリスクに対処します。

- **セキュリティの脆弱性:** 既知の脆弱性、特に CVE (共通脆弱性識別子) を持つ脆弱性。
- **マルウェア:** マルウェアを配布するために、タイポスクワッティングやハイジャックのような手法を用いる悪意のある行為者。
- **ライセンスの問題:** 多岐にわたるオープンソースライセンスの不遵守は、法的問題につながる可能性があります。
- **非推奨のライブラリ:** 古いコンポーネントを使用すると、パッチが適用されていない脆弱性や互換性の問題が発生する可能性があります。
- **ライブラリのメンテナンス不足:** 積極的な開発の欠如が、未解決のバグやセキュリティ上の欠陥につながる可能性があります。
- **セキュリティ衛生状態の悪さ:** プロジェクトによっては、適切なコードレビューなど、セキュリティのベストプラクティスが導入されていません。

Datadog SCA は、リスク低減プロセスの自動化を助け、以下の方法で生産性を向上させます。

- **開発ライフサイクル全体でのインテグレーション:** オープンソースとサードパーティのコンポーネントを分析し、詳細なライブラリカタログを提供します。
- **継続的な評価:** デプロイされたサービスをリアルタイムで可視化し、機密性の高い環境内の脆弱性を優先することで、セキュリティポスチャを強化します。
- **コラボレーション:** サイロ化を打破し、より多くのチーム (DevOps、運用、SRE) をセキュリティに関与させて、コラボレーションの文化を醸成します。


## サービス内で使用されているライブラリの確認

ライブラリカタログには、サービス全体で使用されているライブラリとバージョンが表示されます。

このカタログは、複数の公開データソース (GuardDog、NIST、osv.dev、OpenSSF スコアなど) と非公開データソース (Datadog のセキュリティリサーチグループを含む) を使用して、すべてのライブラリの詳細を明らかにします。

ライブラリカタログを使用するには、[ライブラリ][1]を参照するか、**Security > Application Security > Catalogs > Libraries** を選択してください。

{{< img src="/security/application_security/software_composition_analysis/libraries_catalog.png" alt="ライブラリカタログのダッシュボード" style="width:100%;" >}}


ライブラリカタログでは次のことができます。

- 各サービス内で使用されているすべてのライブラリを確認する。
- **View** で **Runtime** を選択して、実行時に検出されたライブラリを表示する。
- **View** で **Static** を選択して、ソースコードリポジトリ内で検出されたライブラリを表示する。
- **Vulnerability Severity** ファセットを使用して、脆弱性の評価に従ってライブラリをフィルタリングする。
- 各ライブラリのソースリポジトリを表示する。
- サービスで使用されている現在のバージョンや利用可能な最新バージョンなど、ライブラリの詳細を確認する。
- ライブラリの [OpenSSF スコアカード][2]を表示する。


## ライブラリ内の脆弱性とリスクの確認

**Vulnerabilities** エクスプローラーでは、使用しているライブラリの脆弱性とリスクを確認することができます。

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities.png" alt="ライブラリの脆弱性ダッシュボード" style="width:100%;" >}}

### ライブラリの脆弱性

ライブラリの脆弱性とは、ライブラリに存在するセキュリティバグのことです。 

ライブラリの脆弱性を確認するには、[ライブラリの脆弱性][3]を参照するか、**Security > Vulnerabilities > Library Vulnerabilities** に移動します。

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_detail.png" alt="ダッシュボードで展開表示されたライブラリの脆弱性の例" style="width:100%;" >}}

**Library Vulnerabilities** では次のことができます。

- **Vulnerability** ファセットを使用して、さまざまな脆弱性のタイプを確認する。
  - たとえば、脆弱性にはすべて CVE ID が関連付けられており、エクスプローラーおよび各ライブラリの詳細に表示されます。Vulnerability ファセットを使用すれば、CVE ID で並べ替えを行うことができます。
- 以下のような脆弱性の詳細を確認する。
  - 説明
  - サービスと環境
  - 最初と最後の検出
  - 露出期間
  - 重大性の内訳
  - 修復ステップ

{{< img src="/security/application_security/software_composition_analysis/vulnerabilities_library_vulnerabilities_remediation_steps.png" alt="ライブラリの脆弱性の修復ステップ" style="width:100%;" >}}

### ライブラリのリスク

ライブラリのリスクとは、セキュリティとは直接関係のない弱点のことです。たとえば、ライブラリが非推奨であるとか、プロジェクトのライセンスが厳しすぎるとか、チームで適切なセキュリティ対策が採用されていないといったことが挙げられます。

ライブラリのリスクを確認するには、[ライブラリのリスク][4]を参照するか、**Security > Vulnerabilities > Library Risks** を選択します。

{{< img src="/security/application_security/software_composition_analysis/library_risks.png" alt="ライブラリのリスクの例" style="width:100%;" >}}

Library Risks では次のことができます。
- **View** で **Runtime** を選択して、実行時に検出されたリスクを表示する。
- **View** で **Static** を選択して、ソースコードリポジトリ内で検出されたリスクを表示する。
- 以下のようなリスクの詳細を確認する。
  - 説明
  - サービスと環境
  - 最初と最後の検出
  - 露出期間
  - 重大性の内訳


## リスクを軽減するためのベストプラクティス

リスクを軽減するために、以下のベストプラクティスに従ってください。

   - **デューデリジェンス:** オープンソースプロジェクトは、使用前に十分に評価すること。
   - **最新情報を入手:** 定期的にコンポーネントを更新し、セキュリティ勧告を受信する。
   - **脆弱性の管理** 脆弱性のトリアージと修復のプロセスを確立する。
   - **測定:** メトリクスを追跡し、時間をかけてセキュリティポスチャを理解し、改善する。


## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/appsec/inventory/libraries
[2]: https://github.com/ossf/scorecard?tab=readme-ov-file#what-is-scorecard
[3]: https://app.datadoghq.com/security/appsec/vm/library
[4]: https://app.datadoghq.com/security/appsec/vm/library-risk