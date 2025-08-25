---
title: Static Analysis ルール
description: Static Analysis の複数言語のルールを表示します。
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
is_beta: false
type: static-analysis
rulesets:
  csharp-best-practices:
    title: "C# のベストプラクティス"
    description: |
C# のベストプラクティスを実施するためのルール。
  csharp-code-style:
    title: "C# コードスタイルパターンに従う"
    description: |
C# のコードスタイルを強制するルール。
  csharp-inclusive:
    title: "C# では包括的な言語を使用する"
    description: |
C# コードをより包括的にするためのルール。
  csharp-security:
    title: "安全でセキュアな C# コードを記述する"
    description: |
C# コードのセキュリティ問題を特定することに重点を置いたルール。
  docker-best-practices:
    title: Docker を使用する際のベストプラクティスに従う
    description: |
Docker を使うためのベストプラクティス。
  github-actions:
    title: GitHub Actions を保護する
    description: |
GitHub Actions を検査し、権限設定やバージョン ピニングなどの危険なパターンを検出するためのルール。
  go-best-practices:
    title: Go のベストプラクティス
    description: |
Go コードをより速く、簡単に書くためのルールです。コードスタイルからバグの防止まで、このルールセットは、開発者がパフォーマンスに優れ、保守性が高く、効率的な Go コードを書くための支援をします。
  go-inclusive:
    title: Go でインクルーシブな表現を使用する
    description: |
Go コードの表現に問題がないか確認します。
  go-security:
    title: Go コードの安全性とセキュリティを確保
    description: |
Go コードベースにおける一般的なセキュリティ問題 (SQL インジェクション、XSS、シェルインジェクションなど) を検出します。
  java-best-practices:
    title: Java のベストプラクティスに従う
    description: |
Java のベストプラクティスを実施するためのルール。
  java-code-style:
    title: Java コードスタイルパターンに従う
    description: |
Java のコードスタイルを強制するルール。
  java-inclusive:
    title: Java では包括的な言語を使用する
    description: |
Java のコードやコメントで不適切な表現を避けるためのルール。
  java-security:
    title: Java コードの安全性を確保する
    description: |
Java コードのセキュリティ問題を特定することに重点を置いたルール。
  javascript-best-practices:
    title: JavaScript コードを書くためのベストプラクティスに従う
    description: |
JavaScript のベストプラクティスを強制するためのルール。
  javascript-browser-security:
    title: JavaScript Web アプリケーションのセキュリティルール
    description: |
JavaScript Web アプリケーションのセキュリティ問題を見つけることに焦点を当てたルール。
  javascript-code-style:
    title: JavaScript コードスタイルの強制
    description: |
JavaScript コードスタイルを強制するためのルール。
  javascript-common-security:
    title: JavaScript の一般的なセキュリティルール
    description: |
JavaScript コードのセキュリティ問題を見つけることに焦点を当てたルール。
  javascript-express:
    title: Express.js のベストプラクティスとセキュリティをチェックする
    description: |
Express.js のベストプラクティスとセキュリティに特化したルール。
  javascript-inclusive:
    title: 表現に問題がないか JavaScript コードをチェックする
    description: |
コードやコメントにおける不適切な表現を避けるための JavaScript のルールです。
  javascript-node-security:
    title: Node における潜在的なセキュリティホットスポットを特定する
    description: |
Node における潜在的なセキュリティホットスポットを特定するためのルール。これには、さらなるトリアージが必要な誤検知も含まれる場合があります。
  jsx-react:
    title: React 固有のリンティングルール
    description: |
このプラグインは、React のグッドプラクティスを強制する`recommended` 構成をエクスポートします。
  kotlin-best-practices:
    title: Kotlin コード記述のベスト プラクティスに従う
    description: |
Kotlin のベスト プラクティスを強制するためのルール。
  kotlin-code-style:
    title: Kotlin コード スタイルを強制する
    description: |
Kotlin のコード スタイルを強制するためのルール。
  php-best-practices:
    title: PHP コードの記述におけるベストプラクティスに従う
    description: |
PHP のベストプラクティスを徹底し、コードスタイルを向上させ、バグを防止し、パフォーマンス、保守性、効率性に優れた PHP コードを書くためのルールです。
  php-code-style:
    title: PHP コードスタイルの強化
    description: |
PHP コードスタイルを強制するルールです。
  php-security:
    title: PHP のセキュリティルール
    description: |
PHP コードのセキュリティ問題を発見するためのルールです。
  python-best-practices:
    title: Python コードを書くためのベストプラクティスに従う
    description: |
効率的でバグのないコードを書くための Python のベストプラクティス。
  python-code-style:
    title: Python コードスタイルの強制
    description: |
Python コードスタイルを強制するルール。
  python-design:
    title: Python プログラムの構造チェック
    description: |
ネストされたループのようなものを含む、Python プログラムの構造をチェックするためのルール。
  python-django:
    title: Django のベストプラクティスとセキュリティをチェックする
    description: |
Django のベストプラクティスとセキュリティに特化したルール。
  python-flask:
    title: Flask のベストプラクティスとセキュリティをチェックする
    description: |
Flask のベストプラクティスとセキュリティに特化したルール。
  python-inclusive:
    title: 表現に問題がないか Python コードをチェックする
    description: |
Python のコードとコメントで不適切な表現を避けるためのルール。
  python-pandas:
    title: pandas を使ったデータサイエンスのグッドプラクティス
    description: |
pandas コードが適切に使用されていることを確認するための一連のルール。

 - `import` 宣言がコーディングガイドライン違反に従っていることを確認する。
 - 非推奨のコードやメソッドを避ける。
 - 可能な限り非効率なコードを避ける。
  python-security:
    title: Python コードが安全でセキュアなことを確認する
    description: |
OWASP10 および SANS25 に記載されているものを含め、Python コード内のセキュリティや脆弱性の問題を発見することに焦点を当てたルール。

 - 粗悪な暗号化およびハッシュ化プロトコルの使用
 - アクセス制御の欠如
 - セキュリティの誤構成
 - SQL インジェクション
 - 資格情報のハードコーディング
 - シェルインジェクション
 - 安全でない逆シリアル化
  rails-best-practices:
    title: Ruby on Rails コミュニティで広く採用されているパターン
    description: |
Ruby on Rails コードを書くためのベストプラクティス。
  ruby-best-practices:
    title: Ruby におけるベストプラクティスに従う
    description: |
Ruby のベストプラクティスを徹底するためのルールです。
  ruby-code-style:
    title: Ruby コードスタイルを強制するルールです。
    description: |
確立されたコーディング規約に従う Ruby のルールを記述するための Code Analysis のルールです。
  ruby-inclusive:
    title: インクルーシブな Ruby コードのためのルール
    description: |
インクルーシブな Ruby コードを書く
  ruby-security:
    title: Ruby のセキュリティルール
    description: |
Ruby コードのセキュリティ問題を発見するためのルールです。
  terraform-aws:
    title: Terraform AWS
    description: |
AWS 向けの Terraform のベスト プラクティスを強制するためのルール。
  tsx-react:
    title: TypeScript React のコード品質
    description: |
このプラグインは、React のグッドプラクティスを強制する`recommended` 構成をエクスポートします。
  typescript-best-practices:
    title: TypeScript コードを書くためのベストプラクティスに従う
    description: |
TypeScript のベストプラクティスを強制するためのルール。
  typescript-browser-security:
    title: TypeScript Web アプリケーションのセキュリティルール
    description: |
TypeScript Web アプリケーションのセキュリティ問題を見つけることに焦点を当てたルール。
  typescript-code-style:
    title: TypeScript の意見主義的コードパターン
    description: |
モダンな TypeScript コードベースにおいてベストプラクティスと考えられているルールだが、プログラムロジックには影響を与えないルール。これらのルールは一般に、より単純なコードパターンを強制するための意見主義的なものです。
  typescript-common-security:
    title: TypeScript の一般的なセキュリティルール
    description: |
TypeScript コードのセキュリティ問題を見つけることに焦点を当てたルール。
  typescript-express:
    title: Express.js TypeScript のベストプラクティスとセキュリティをチェックする
    description: |
Express.js TypeScript のベストプラクティスとセキュリティに特化したルール。
  typescript-inclusive:
    title: TypeScript コードの表現の問題をチェック
    description: |
TypeScript のコードやコメントにおける不適切な表現を避けるためのルールです。
  typescript-node-security:
    title: Node における潜在的なセキュリティホットスポットを特定する
    description: |
Node における潜在的なセキュリティホットスポットを特定するためのルール。これには、さらなるトリアージが必要な誤検知も含まれる場合があります。
cascade:
  modal:
    title: このルールを試して、Datadog Code Analysis でコードを分析してみましょう
    top_box:
      title: このルールの使用方法
      steps:
        - リポジトリのルートに、上記内容を含む static-analysis.datadog.yml を作成します
        - 無料の IDE プラグインを使用するか、Code Analysis スキャンを CI パイプラインに追加します
        - コードに関するフィードバックを受け取る
      footer: 詳細については、<a href="/code_analysis">Code Analysis ドキュメント</a>をご覧ください
    bottom_boxes:
      - title: VS Code 拡張機能
        icon: vscode
        subtitle: VS Code エディタで</br>直接コードの脆弱性を特定する
        cta_title: 拡張機能のダウンロード
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: JetBrains プラグイン
        icon: jetbrains
        subtitle: JetBrains 製品で</br>直接コードの脆弱性を特定する
        cta_title: プラグインのダウンロード
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: Datadog Code Analysis を使用して、開発プロセスの各ステップでコードの問題を検出します
      link:
        name: Datadog Code Analysis
        url: "https://www.datadoghq.com/code-analysis/"

  banner:
    title: <span>シームレスなインテグレーション。</span>Datadog Code Analysis をお試しください
    link:
      name: Datadog Code Analysis
      url: "https://www.datadoghq.com/code-analysis/"

further_reading:
  - link: /code_analysis/
    tag: ドキュメント
    text: Datadog Code Analysis について
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Code Analysis is in Preview.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis は、{{< region-param key="dd_site_name" >}} サイトでは使用できません。
</div>
{{% /site-region %}}

## 概要

Datadog Static Analysis は、すぐに使えるルールを提供し、CI/CD パイプラインの違反をコードレビューで検出し、バグ、セキュリティ、保守性の問題を特定するのに役立ちます。詳細については、[セットアップのドキュメント][1]を参照してください。

[1]: /code_analysis/static_analysis/setup
