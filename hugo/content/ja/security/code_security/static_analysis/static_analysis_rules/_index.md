---
aliases:
- /ja/continuous_integration/static_analysis/rules
- /ja/static_analysis/rules
- /ja/code_analysis/static_analysis_rules
- /ja/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Datadog Code Security
      url: https://www.datadoghq.com/product/code-security/
    title: <span>シームレスな連携。</span> Datadog Code Security をお試しください
  modal:
    bottom_boxes:
    - cta_title: 拡張機能のダウンロード
      cta_url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
      icon: vscode
      subtitle: VS Code エディターで</br>直接コードの脆弱性を特定する
      title: VS Code 拡張機能
    - cta_title: プラグインのダウンロード
      cta_url: https://plugins.jetbrains.com/plugin/19495-datadog
      icon: jetbrains
      subtitle: JetBrains 製品で</br>直接コードの脆弱性を特定する
      title: JetBrains プラグイン
    footer:
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/
      text: Datadog Code Security を使用して、開発プロセスのあらゆるステップでコードの問題を検出します
    title: このルールを試して、Datadog Code Security でコードを分析してみましょう
    top_box:
      footer: 詳細については、<a href="/security/code_security/">Code Security のドキュメント</a>をお読みください
      steps:
      - リポジトリのルートに、上記内容を含む static-analysis.datadog.yml を作成します
      - 無料の IDE Plugins を使用するか、Code Security スキャンを CI パイプラインに追加します
      - コードに関するフィードバックを受け取る
      title: このルールの使用方法
description: 複数言語に対応した Static Code Analysis のルールを表示します。
further_reading:
- link: /security/code_security/
  tag: ドキュメント
  text: Datadog Code Security について学びましょう
is_beta: false
rulesets:
  apex-code-style:
    description: '確立されたコーディング規約に従った Apex のルールを記述するための Code Security ルールです。

      '
    title: Apex コードスタイルとベストプラクティスを徹底するためのルールです。
  apex-security:
    description: 'Apex コードのセキュリティ問題を発見するためのルールです。

      '
    title: Apex のセキュリティルール
  bash-code-quality:
    description: 'Bash スクリプトのコード品質を強制するルールです。

      '
    title: Bash スクリプトのコード品質ルールです。
  bash-security:
    description: 'Bash スクリプトのセキュリティベストプラクティスを徹底するためのルールです。

      '
    title: Bash スクリプトのセキュリティルール
  csharp-best-practices:
    description: 'C# のベストプラクティスを徹底するためのルールです。

      '
    title: C# のベストプラクティス
  csharp-code-style:
    description: 'C# コードスタイルを強制するルールです。

      '
    title: C# コードスタイルパターンに従いましょう
  csharp-inclusive:
    description: 'C# コードをよりインクルーシブにするためのルールです。

      '
    title: C# でインクルーシブな表現を使用する
  csharp-security:
    description: 'C# コードのセキュリティ問題を発見するためのルールです。

      '
    title: 安全でセキュアな C# コードを書く
  docker-best-practices:
    description: 'Docker を使うためのベストプラクティス。

      '
    title: Docker を使用する際のベストプラクティスに従う
  github-actions:
    description: 'GitHub Actions をチェックし、権限やバージョンピンニングなどの安全でないパターンを検出するためのルールです。

      '
    title: GitHub Actions を安全に保つ
  go-best-practices:
    description: 'Go コードをより速く、簡単に書くためのルールです。コードスタイルからバグの防止まで、このルールセットは、開発者がパフォーマンスに優れ、保守性が高く、効率的な
      Go コードを書くための支援をします。

      '
    title: Go のベストプラクティス
  go-inclusive:
    description: 'Go コードの表現に問題がないか確認します。

      '
    title: Go でインクルーシブな表現を使用する
  go-security:
    description: 'Go コードベースにおける一般的なセキュリティ問題 (SQL インジェクション、XSS、シェルインジェクションなど) を検出します。

      '
    title: Go コードの安全性とセキュリティを確保
  java-best-practices:
    description: 'Java のベストプラクティスを徹底するためのルールです。

      '
    title: Java におけるベストプラクティスに従う
  java-code-style:
    description: 'Java コードスタイルを強制するルールです。

      '
    title: Java コードスタイルのパターンに従う
  java-inclusive:
    description: 'Java のコードとコメントで不適切な表現を避けるためのルールです。

      '
    title: Java でインクルーシブな表現を使用する
  java-security:
    description: 'Java コードのセキュリティ問題を発見するためのルールです。

      '
    title: Java コードが安全であることを確認する
  javascript-best-practices:
    description: 'JavaScript のベストプラクティスを強制するためのルール。

      '
    title: JavaScript コードを書くためのベストプラクティスに従う
  javascript-browser-security:
    description: 'JavaScript Web アプリケーションのセキュリティ問題を見つけることに焦点を当てたルール。

      '
    title: JavaScript Web アプリケーションのセキュリティルール
  javascript-code-style:
    description: 'JavaScript コードスタイルを強制するためのルール。

      '
    title: JavaScript コードスタイルの強制
  javascript-common-security:
    description: 'JavaScript コードのセキュリティ問題を見つけることに焦点を当てたルール。

      '
    title: JavaScript の一般的なセキュリティルール
  javascript-express:
    description: 'Express.js のベストプラクティスとセキュリティに特化したルール。

      '
    title: チェックExpress.js のベストプラクティスとセキュリティをチェックする
  javascript-inclusive:
    description: 'JavaScript のコードとコメントで不適切な表現を避けるためのルール。

      '
    title: 表現に問題がないか JavaScript コードをチェックする
  javascript-node-security:
    description: 'Node における潜在的なセキュリティホットスポットを特定するためのルールです。これには、さらなるトリアージが必要な誤検知が含まれる場合があります。

      '
    title: Node における潜在的なセキュリティホットスポットを特定する
  jsx-react:
    description: 'このプラグインは、React のグッドプラクティスを強制する `recommended` 構成をエクスポートします。

      '
    title: React 固有のリンティングルール
  kotlin-best-practices:
    description: 'Kotlin のベストプラクティスを徹底するためのルールです。

      '
    title: Kotlin コードを書くためのベストプラクティスに従う
  kotlin-code-style:
    description: 'Kotlin コードスタイルを強制するためのルール。

      '
    title: Kotlin コードスタイルを強制する。
  kotlin-security:
    description: 'Kotlin コードのセキュリティ問題を発見するためのルール。

      '
    title: 安全な Kotlin コーディングを強制する。
  php-best-practices:
    description: 'PHP のベストプラクティスを徹底し、コードスタイルを向上させ、バグを防止し、パフォーマンス、保守性、効率性に優れた PHP コードを書くためのルールです。

      '
    title: PHP コードの記述におけるベストプラクティスに従う
  php-code-style:
    description: 'PHP コードスタイルを強制するルールです。

      '
    title: PHP コードスタイルの強化
  php-security:
    description: 'PHP コードのセキュリティ問題を発見するためのルールです。

      '
    title: PHP のセキュリティルール
  python-best-practices:
    description: '効率的でバグのないコードを書くための Python のベストプラクティス。

      '
    title: Python コードを書くためのベストプラクティスに従う
  python-code-style:
    description: 'Python コードスタイルを強制するルール。

      '
    title: Python コードスタイルの強制
  python-design:
    description: 'ネストされたループのようなものを含む、Python プログラムの構造をチェックするためのルール。

      '
    title: Python プログラムの構造チェック
  python-django:
    description: 'Django のベストプラクティスとセキュリティに特化したルール。

      '
    title: Django のベストプラクティスとセキュリティをチェックする
  python-flask:
    description: 'Flask のベストプラクティスとセキュリティに特化したルール。

      '
    title: Flask のベストプラクティスとセキュリティをチェックする
  python-inclusive:
    description: 'Python のコードとコメントで不適切な表現を避けるためのルール。

      '
    title: 表現に問題がないか Python コードをチェックする
  python-pandas:
    description: "pandas コードが適切に使用されていることを確認するための一連のルール。\n\n - `import` 宣言がコーディングガイドラインに従っていることを確認する。\n\
      \ - 非推奨のコードやメソッドを避ける。\n - 可能な限り非効率なコードを避ける。\n"
    title: pandas を使ったデータサイエンスのグッドプラクティス
  python-security:
    description: "OWASP10 および SANS25 に記載されているものを含め、Python コード内のセキュリティや脆弱性の問題を発見することに焦点を当てたルール。\n\
      \n - 粗悪な暗号化およびハッシュ化プロトコルの使用\n - アクセス制御の欠如\n - セキュリティの誤構成\n - SQL インジェクション\n\
      \ - 資格情報のハードコーディング\n - シェルインジェクション\n - 安全でない逆シリアル化\n"
    title: Python コードが安全でセキュアなことを確認する
  rails-best-practices:
    description: 'Ruby on Rails コードを書くためのベストプラクティス。

      '
    title: Ruby on Rails コミュニティで広く採用されているパターン
  ruby-best-practices:
    description: 'Ruby のベストプラクティスを徹底するためのルールです。

      '
    title: Ruby におけるベストプラクティスに従う
  ruby-code-style:
    description: 'Code Security のルールは、確立されたコーディング規約に従う Ruby のルールを作成するためのものです。

      '
    title: Ruby コードスタイルを強制するルールです。
  ruby-inclusive:
    description: 'インクルーシブな Ruby コードを書く

      '
    title: インクルーシブな Ruby コードのためのルール
  ruby-security:
    description: 'Ruby コードのセキュリティ問題を発見するためのルールです。

      '
    title: Ruby のセキュリティルール
  swift-code-style:
    description: 'Code Security のルールは、確立されたコーディング規約に従う Swift のルールを作成するためのものです。

      '
    title: Swift コードスタイルとベストプラクティスを強制するためのルール。
  swift-security:
    description: 'Swift コードのセキュリティ問題を発見するためのルール。

      '
    title: Swift のセキュリティルール。
  terraform-aws:
    description: 'AWS のための Terraform ベストプラクティスを強制するためのルール。

      '
    title: Terraform AWS
  tsx-react:
    description: 'このプラグインは、React のグッドプラクティスを強制する `recommended` 構成をエクスポートします。

      '
    title: TypeScript React のコード品質
  typescript-best-practices:
    description: 'TypeScript のベストプラクティスを強制するためのルール。

      '
    title: TypeScript コードを書くためのベストプラクティスに従う
  typescript-browser-security:
    description: 'TypeScript Web アプリケーションのセキュリティ問題を見つけることに焦点を当てたルール。

      '
    title: TypeScript Web アプリケーションのセキュリティルール
  typescript-code-style:
    description: '現代の TypeScript コードベースにおけるベストプラクティスと見なされるルールですが、プログラムのロジックには影響しません。これらのルールは、一般的によりシンプルなコードパターンを強制することに関して意見が分かれています。

      '
    title: TypeScript の意見主義的コードパターン
  typescript-common-security:
    description: 'TypeScript コードのセキュリティ問題を見つけることに焦点を当てたルール。

      '
    title: TypeScript の一般的なセキュリティルール
  typescript-express:
    description: 'Express.js TypeScript のベストプラクティスとセキュリティに特化したルール。

      '
    title: Express.js TypeScript のベストプラクティスとセキュリティをチェックする
  typescript-inclusive:
    description: 'TypeScript のコードやコメントにおける不適切な表現を避けるためのルールです。

      '
    title: TypeScript コードの表現の問題をチェック
  typescript-node-security:
    description: 'Node における潜在的なセキュリティホットスポットを特定するためのルールです。これには、さらなるトリアージが必要な誤検知が含まれる場合があります。

      '
    title: Node における潜在的なセキュリティホットスポットを特定する
title: SAST ルール
type: static-analysis
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security は、このサイトでは利用 {{< region-param key="dd_site_name" >}} できません。
</div>
{{% /site-region %}}

## 概要 {#overview}

Datadog 静的コード分析は、コードベース内のセキュリティ脆弱性、バグ、および保守性の問題を検出するための即時利用可能なルールを提供します。詳細については、[Setup documentation][1] を参照してください。

[1]: /ja/security/code_security/static_analysis/setup/