---
title: Static Analysis ルール
description: Static Analysis の複数言語のルールを表示します。
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
is_beta: true
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
  go-best-practices:
    title: Best Practices for Go
    description: |
      Rules to make writing Go code faster and easier. From code style to preventing bugs, this ruleset helps developers writing performant, maintainable, and efficient Go code.
  go-inclusive:
    title: Use inclusive language in Go
    description: |
      Check Go code for wording issues.
  go-security:
    title: Ensure your Go code is safe and secure
    description: |
      Detect common security issues (such as SQL injection, XSS, or shell injection) in your Go codebase.
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
      Rules for JavaScript to avoid inappropriate wording in the code and comments.
  javascript-node-security:
    title: Node における潜在的なセキュリティホットスポットを特定する
    description: |
      Node における潜在的なセキュリティホットスポットを特定するためのルール。これには、さらなるトリアージが必要な誤検知も含まれる場合があります。
  jsx-react:
    title: React 固有のリンティングルール
    description: |
      このプラグインは、React のグッドプラクティスを強制する`recommended` 構成をエクスポートします。
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
    title: Patterns widely adopted by the Ruby on Rails community
    description: |
      Best practices to write Ruby on Rails code.
  ruby-best-practices:
    title: Follow best practices in Ruby
    description: |
      Rules to enforce Ruby best practices.
  ruby-code-style:
    title: Rules to enforce Ruby code style.
    description: |
      Code Analysis rules to write Ruby rules that follows established coding standards.
  ruby-inclusive:
    title: Rules for inclusive Ruby code
    description: |
      Write inclusive Ruby code
  ruby-security:
    title: Security rules for Ruby
    description: |
      Rules focused on finding security issues in your Ruby code.
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
    title: Check TypeScript code for wording issues
    description: |
      Rules for TypeScript to avoid inappropriate wording in the code and comments.
  typescript-node-security:
    title: Node における潜在的なセキュリティホットスポットを特定する
    description: |
      Node における潜在的なセキュリティホットスポットを特定するためのルール。これには、さらなるトリアージが必要な誤検知も含まれる場合があります。
cascade:
  modal:
    title: Try this rule and analyze your code with Datadog Code Analysis
    top_box:
      title: How to use this rule
      steps:
        - Create a static-analysis.datadog.yml with the content above at the root of your repository
        - Use our free IDE Plugins or add Code Analysis scans to your CI pipelines
        - Get feedback on your code
      footer: For more information, please read the <a href="/code_analysis">Code Analysis documentation</a>
    bottom_boxes:
      - title: VS Code Extension
        icon: vscode
        subtitle: Identify code vulnerabilities directly in your</br>VS Code editor
        cta_title: Download Extension
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: JetBrains Plugin
        icon: jetbrains
        subtitle: Identify code vulnerabilities directly in</br>JetBrains products
        cta_title: Download Plugin
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: Use Datadog Code Analysis to catch code issues at every step of your development process
      link:
        name: Datadog Code Analysis
        url: "https://www.datadoghq.com/code-analysis/"

  banner:
    title: <span>Seamless integrations.</span> Try Datadog Code Analysis
    link:
      name: Datadog Code Analysis
      url: "https://www.datadoghq.com/code-analysis/"

further_reading:
  - link: /code_analysis/
    tag: ドキュメント
    text: Learn about Datadog Code Analysis
---

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    Code Analysis is not available for the {{< region-param key="dd_site_name" >}} site.
</div>
{{% /site-region %}}

{{< callout url="#" btn_hidden="true" header="Try the Beta!" >}}
Code Analysis is in public beta.
{{< /callout >}}

## Overview

Datadog Static Analysis provides out-of-the-box rules to help detect violations in your CI/CD pipelines in code reviews and identify bugs, security, and maintainability issues. For more information, see the [Setup documentation][1].

[1]: /code_analysis/static_analysis/setup
