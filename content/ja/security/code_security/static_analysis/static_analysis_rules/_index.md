---
title: SAST ルール
description: 静的コード解析向けの複数言語に対応したルールを表示します。
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
- /code_analysis/static_analysis_rules
- /security/code_security/static_analysis_rules
is_beta: false
type: static-analysis
rulesets:
  csharp-best-practices:
    title: "C# のベスト プラクティス"
    description: |
      C# のベスト プラクティスを強制するルール。
  csharp-code-style:
    title: "C# のコード スタイル パターンに従う"
    description: |
      C# のコード スタイルを強制するルール。
  csharp-inclusive:
    title: "C# でインクルーシブな言語を使用する"
    description: |
      C# コードをよりインクルーシブにするためのルール。
  csharp-security:
    title: "安全でセキュアな C# コードを書く"
    description: |
      C# コードのセキュリティ上の問題の検出に特化したルール。
  docker-best-practices:
    title: Docker のベスト プラクティスに従う
    description: |
      Docker の使用に関するベスト プラクティス。
  github-actions:
    title: GitHub Actions をセキュアにする
    description: |
      GitHub Actions をチェックし、権限やバージョン固定などの危険なパターンを検出するルール。
  go-best-practices:
    title: Go のベスト プラクティス
    description: |
      Go コードの記述をより高速かつ容易にするためのルール。コード スタイルからバグ防止まで、開発者が高性能で、保守性と効率性に優れた Go コードを書くのを支援します。
  go-inclusive:
    title: Go でインクルーシブな言語を使用する
    description: |
      Go コードの言い回しの問題をチェックするルール。
  go-security:
    title: Go コードが安全かつセキュアであることを確保する
    description: |
      Go のコード ベースで一般的なセキュリティ上の問題 (SQL インジェクション、XSS、シェル インジェクションなど) を検出するルール。
  java-best-practices:
    title: Java のベスト プラクティスに従う
    description: |
      Java のベスト プラクティスを強制するルール。
  java-code-style:
    title: Java のコード スタイル パターンに従う
    description: |
      Java のコード スタイルを強制するルール。
  java-inclusive:
    title: Java でインクルーシブな言語を使用する
    description: |
      コードやコメントにおける不適切な表現を避けるための Java 向けのルール。
  java-security:
    title: Java コードのセキュリティを確保する
    description: |
      Java コードのセキュリティ上の問題の検出に特化したルール。
  javascript-best-practices:
    title: JavaScript コード作成のベスト プラクティスに従う
    description: |
      JavaScript のベスト プラクティスを強制するルール。
  javascript-browser-security:
    title: JavaScript Web アプリケーション向けのセキュリティ ルール
    description: |
      JavaScript Web アプリケーションのセキュリティ上の問題の検出に特化したルール。
  javascript-code-style:
    title: JavaScript のコード スタイルを強制する
    description: |
      JavaScript のコード スタイルを強制するルール。
  javascript-common-security:
    title: JavaScript の一般的なセキュリティ ルール
    description: |
      JavaScript コードのセキュリティ上の問題の検出に特化したルール。
  javascript-express:
    title: Express.js のベスト プラクティスとセキュリティをチェックする
    description: |
      Express.js のベスト プラクティスとセキュリティ向けのルール。
  javascript-inclusive:
    title: JavaScript コードの表現上の問題をチェックする
    description: |
      コードやコメントにおける不適切な表現を避けるための JavaScript 向けのルール。
  javascript-node-security:
    title: Node における潜在的なセキュリティ ホット スポットを特定する
    description: |
      Node における潜在的なセキュリティ ホット スポットを特定するルール。追加のトリアージを要する誤検知が含まれる場合があります。
  jsx-react:
    title: React 固有のリント ルール
    description: |
      このプラグインは React のベスト プラクティスを強制する `recommended` 構成をエクスポートします。
  kotlin-best-practices:
    title: Kotlin コード作成のベスト プラクティスに従う
    description: |
      Kotlin のベスト プラクティスを強制するルール。
  kotlin-code-style:
    title: Kotlin のコード スタイルを強制する
    description: |
      Kotlin のコード スタイルを強制するルール。
  kotlin-security:
    title: 安全な Kotlin コーディングを強制する
    description: |
      Kotlin コードのセキュリティ上の問題の検出に特化したルール。
  php-best-practices:
    title: PHP コード作成のベスト プラクティスに従う
    description: |
      コード スタイルの改善、バグ防止、高性能・保守性・効率性に優れた PHP コードの実現のために、PHP のベスト プラクティスを強制するルール。
  php-code-style:
    title: PHP のコード スタイルを強制する
    description: |
      PHP のコード スタイルを強制するルール。
  php-security:
    title: PHP 向けのセキュリティ ルール
    description: |
      PHP コードのセキュリティ上の問題の検出に特化したルール。
  python-best-practices:
    title: Python コード作成のベスト プラクティスに従う
    description: |
      効率的でバグのないコードを書くための Python のベスト プラクティス。
  python-code-style:
    title: Python のコード スタイルを強制する
    description: |
      Python のコード スタイルを強制するルール。
  python-design:
    title: Python プログラムの構造をチェックする
    description: |
      入れ子のループなどを含む、Python プログラムの構造をチェックするルール。
  python-django:
    title: Django のベスト プラクティスとセキュリティをチェックする
    description: |
      Django のベスト プラクティスとセキュリティ向けのルール。
  python-flask:
    title: Flask のベスト プラクティスとセキュリティをチェックする
    description: |
      Flask のベスト プラクティスとセキュリティ向けのルール。
  python-inclusive:
    title: Python コードの表現上の問題をチェックする
    description: |
      コードやコメントにおける不適切な表現を避けるための Python 向けのルール。
  python-pandas:
    title: pandas を用いたデータ サイエンスの推奨プラクティス
    description: |
      pandas コードが適切に使用されているかをチェックするためのルール セット。

      - `import` 宣言がコーディング ガイドラインに従っていることを保証します。
      - 非推奨のコードやメソッドを避けます。
      - 可能な限り非効率なコードを避けます。
  python-security:
    title: Python コードが安全かつセキュアであることを確保する
    description: |
      Python コードにおけるセキュリティおよび脆弱性の問題の検出に特化したルール。OWASP Top 10 や SANS Top 25 に含まれる問題も対象にします。

      - 不適切な暗号化およびハッシュ プロトコルの使用
      - アクセス コントロールの欠如
      - セキュリティ 構成不備
      - SQL インジェクション
      - ハード コーディングされた認証情報
      - シェル インジェクション
      - 安全でないデシリアライゼーション
  rails-best-practices:
    title: Ruby on Rails コミュニティで広く採用されているパターン
    description: |
      Ruby on Rails コードを書くためのベスト プラクティス。
  ruby-best-practices:
    title: Ruby のベスト プラクティスに従う
    description: |
      Ruby のベスト プラクティスを強制するルール。
  ruby-code-style:
    title: Ruby のコード スタイルを強制する
    description: |
      確立されたコーディング標準に準拠した Ruby コード スタイルのための Code Security のルール。
  ruby-inclusive:
    title: インクルーシブな Ruby コードのためのルール
    description: |
     インクルーシブな Ruby コードを書く
  ruby-security:
    title: Ruby 向けのセキュリティ ルール
    description: |
      Ruby コードのセキュリティ上の問題の検出に特化したルール。
  terraform-aws:
    title: Terraform AWS
    description: |
      AWS 向けの Terraform ベスト プラクティスを強制するルール。
  tsx-react:
    title: TypeScript React のコード品質
    description: |
      このプラグインは React のベスト プラクティスを強制する `recommended` 構成をエクスポートします。
  typescript-best-practices:
    title: TypeScript コード作成のベスト プラクティスに従う
    description: |
      TypeScript のベスト プラクティスを強制するルール。
  typescript-browser-security:
    title: TypeScript Web アプリケーション向けのセキュリティ ルール
    description: |
      TypeScript Web アプリケーションにおけるセキュリティ上の問題の検出に特化したルール。
  typescript-code-style:
    title: TypeScript の意見の強いコード パターン
    description: |
      現代的な TypeScript コード ベースにおけるベスト プラクティスと考えられるが、プログラム ロジックには影響しないルール。これらのルールは、よりシンプルなコード パターンの適用について一般に意見が強いものです。
  typescript-common-security:
    title: TypeScript の一般的なセキュリティ ルール
    description: |
      TypeScript コードのセキュリティ上の問題の検出に特化したルール。
  typescript-express:
    title: Express.js TypeScript のベスト プラクティスとセキュリティをチェックする
    description: |
      Express.js TypeScript のベスト プラクティスとセキュリティ向けのルール。
  typescript-inclusive:
    title: TypeScript コードの表現上の問題をチェックする
    description: |
      コードやコメントにおける不適切な表現を避けるための TypeScript 向けのルール。
  typescript-node-security:
    title: Node における潜在的なセキュリティ ホット スポットを特定する
    description: |
      Node における潜在的なセキュリティ ホット スポットを特定するルール。追加のトリアージを要する誤検知が含まれる場合があります。
cascade:
  modal:
    title: このルールを試し、Datadog Code Security でコードを解析する
    top_box:
      title: このルールの使用方法
      steps:
        - リポジトリのルートに、上記の内容で static-analysis.datadog.yml を作成する
        - 無償の IDE プラグインを使用するか、CI パイプラインに Code Security のスキャンを追加する
        - コードに関するフィードバックを受け取る
      footer: 詳細については、<a href="/security/code_security/">Code Security ドキュメント</a> を参照してください
    bottom_boxes:
      - title: VS Code Extension
        icon: vscode
        subtitle: あなたの</br>VS Code エディタ内で直接コードの脆弱性を特定
        cta_title: Download Extension
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: JetBrains Plugin
        icon: jetbrains
        subtitle: JetBrains 製品内で直接コードの脆弱性を特定
        cta_title: Download Plugin
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: 開発プロセスのあらゆる段階でコードの問題を検出するために Datadog Code Security を使用する
      link:
        name: Datadog Code Security
        url: "https://www.datadoghq.com/product/code-security/"

  banner:
    title: <span>シームレスな統合。</span> Datadog Code Security をお試しください
    link:
      name: Datadog Code Security
      url: "https://www.datadoghq.com/product/code-security/"

further_reading:
  - link: /security/code_security/
    tag: ドキュメント
    text: Datadog Code Security について学ぶ
---

{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security は {{< region-param key="dd_site_name" >}} サイトでは利用できません。
</div>
{{% /site-region %}}

## 概要

Datadog Static Code Analysis は、コード ベースにおけるセキュリティ 脆弱性、バグ、保守性の問題を検出するのに役立つ、すぐに使えるルールを提供します。詳細は [セットアップ ドキュメント][1] を参照してください。

[1]: /security/code_security/static_analysis/setup/
