---
title: Static Analysis 규칙
description: Static Analysis에 대한 여러 언어의 규칙을 확인하세요.
aliases:
- /continuous_integration/static_analysis/rules
- /static_analysis/rules
is_beta: false
type: static-analysis
rulesets:
  csharp-best-practices:
    title: "C# 모범 사례"
    description: |
C# 모범 사례 준수를 위한 규칙.  csharp-code-style:
    title: "C# 코드 스타일 패턴 준수"
    description: |
C# 코드 스타일 준수를 위한 규칙.  csharp-inclusive:
    title: "C#에서 포괄적 언어 사용"
    description: |
C# 코드를 더 포괄적으로 만드는 규칙.  csharp-security:
    title: "안전하고 보안이 강화된 C# 코드 작성"
    description: |
C# 코드 보안 문제 식별 규칙.  docker-best-practices:
    title: Docker를 사용하여 모범 사례 준수
    description: |
Docker 사용 모범 사례  github-actions:
    title: GitHub Actions 보안 강화
    description: |
GitHub Actions에서 권한 설정, 버전 고정 등 위험 패턴을 확인하는 규칙.  go-best-practices:
    title: Go 모범 사례
    description: |
Go 코드를 더 빠르고 쉽게 작성할 수 있게 해주는 규칙. 코드 스타일 관리부터 버그 예방까지, 성능과 유지보수성을 갖춘 효율적인 Go 코드 작성에 도움을 줍니다.  go-inclusive:
    title: Go에서 포괄적 언어 사용
    description: |
Go 코드 문구 오류 점검.  go-security:
    title: Go 코드의 안전성과 보안성 확인
    description: |
Go 코드베이스에서 일반적인 보안 문제(SQL 주입, XSS, 셸 주입 등) 감지.  java-best-practices:
    title: Java 모범 사례 준수
    description: |
Java 모범 사례 준수를 위한 규칙.  java-code-style:
    title: Java 코드 스타일 패턴 준수
    description: |
Java 코드 스타일 준수 규칙.  java-inclusive:
    title: Java에서 포괄적 언어 사용
    description: |
코드와 주석에서 부적절한 표현을 피하기 위한 Java 규칙.  java-security:
    title: Java 코드 안전성 확인
    description: |
Java 코드 보안 문제 식별 규칙.  javascript-best-practices:
    title: JavaScript 코드 작성 시 모범 사례 준수
    description: |
JavaScript 모범 사례 준수 규칙.  javascript-browser-security:
    title: JavaScript 웹 애플리케이션용 보안 규칙
    description: |
JavaScript 웹 애플리케이션 보안 문제 식별 규칙.  javascript-code-style:
    title: JavaScript 코드 스타일 준수
    description: |
JavaScript 코드 스타일 준수 규칙.  javascript-common-security:
    title: JavaScript용 일반 보안 규칙
    description: |
JavaScript 코드 보안 문제 식별 규칙.  javascript-express:
    title: Express.js 모범 사례 및 보안 확인
    description: |
Express.js 모범 사례 및 보안 관련 규칙.  javascript-inclusive:
    title: JavaScript 코드에서 표현 문제 확인
    description: |
JavaScript의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.  javascript-node-security:
    title: Node에서 잠재적인 보안 핫스팟 식별
    description: |
Node에서 잠재적인 보안 취약 지점을 식별하는 규칙. 여기에는 추가 분류가 필요한 오탐지가 포함될 수 있습니다.  jsx-react:
    title: React 전용 린팅 규칙
    description: |
이 플러그인은 React 모범 사례를 준수하는 `recommended` 구성을 내보냅니다.  kotlin-best-practices:
    title: Kotlin 코드 작성 시 모범 사례 준수
    description: |
Kotlin 모범 사례 준수 규칙.  kotlin-code-style:
    title: Kotlin 코드 스타일 준수
    description: |
Kotlin 코드 스타일 준수 규칙.  php-best-practices:
    title: PHP 코드 작성 시 모범 사례 준수
    description: |
PHP 모범 사례 적용 규칙. 코드 스타일 개선, 버그 방지, 성능과 유지보수성을 갖춘 효율적인 PHP 코드 작성을 지원합니다.  php-code-style:
    title: PHP 코드 스타일 적용
    description: |
PHP 코드 스타일 적용 규칙.  php-security:
    title: PHP용 보안 규칙
    description: |
PHP 코드 보안 문제 식별 규칙.  python-best-practices:
    title: 모범 사례를 따라 Python 코드 작성하기
    description: |
효율적이고 버그 없는 코드를 작성하기 위한 Python 모범 사례.  python-code-style:
    title: Python 코드 스타일 적용
    description: |
Python 코드 스타일 적용 규칙.  python-design:
    title: Python 프로그램 구조 확인
    description: |
중첩 루프 등을 포함하여 Python 프로그램 구조를 점검하는 규칙  python-django:
    title: Django 모범 사례 및 보안 확인
    description: |
Django 모범 사례 및 보안 관련 규칙.  python-flask:
    title: Flask 모범 사례 및 보안 확인
    description: |
Flask 모범 사례 및 보안 관련 규칙.  python-inclusive:
    title: Python 코드에 표현 문제가 있는지 확인
    description: |
Python의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.  python-pandas:
    title: pandas를 사용한 데이터 과학 모범 사례
    description: |
판다스 코드가 적절하게 사용되었는지 확인하는 규칙 세트.

 - `import` 선언이 코딩 가이드라인을 따르도록 합니다.
 - 더 이상 사용되지 않는 코드와 메서드를 사용하지 마세요.
 - 가능한 한 비효율적인 코드 사용을 피하세요.
  python-security:
    title: Python 코드의 안전성과 보안성 확인
    description: |
OWASP10 및 SANS25에서 발견된 문제 등 Python 코드에서 보안 및 취약성 문제 식별을 위한 규칙.

 - 잘못된 암호화 및 해싱 프로토콜 사용
 - 접근 제어 부족
 - 보안 설정 오류
 - SQL 삽입
 - 하드코딩된 크리덴셜
 - Shell 삽입
 - 안전하지 않은 역직렬화
  rails-best-practices:
    title: Ruby on Rails 커뮤니티에서 많이 사용되는 패턴
    description: |
Ruby on Rails 코드 작성 모범 사례  ruby-best-practices:
    title: Ruby 모범 사례 준수
    description: |
Ruby 모범 사례 적용 규칙.  ruby-code-style:
    title: Ruby 코드 스타일 적용 규칙.
    description: |
기존 코딩 표준을 따르는 Ruby 규칙 작성을 위한 Code Analysis 규칙.
  ruby-inclusive:
    title: 포괄적인 Ruby 코드에 대한 규칙
    description: |
포괄적인 Ruby 코드 작성  ruby-security:
    title: Ruby 보안 규칙
    description: |
Ruby 코드 보안 문제 식별 규칙.  terraform-aws:
    title: Terraform AWS
    description: |
AWS에 대한 Terraform 모범 사례 적용 규칙.  tsx-react:
    title: TypeScript React 코드 품질
    description: |
이 플러그인은 React 모범 사례를 준수하는 `recommended` 구성을 내보냅니다.  typescript-best-practices:
    title: TypeScript 코드 작성 시 모범 사례 준수
    description: |
TypeScript 모범 사례 적용 규칙.  typescript-browser-security:
    title: TypeScript 웹 애플리케이션용 보안 규칙
    description: |
TypeScript 웹 애플리케이션 보안 문제 식별 규칙.  typescript-code-style:
    title: TypeScript 권장 코드 패턴
    description: |
최신 TypeScript 코드베이스 모범 사례로 간주되지만 프로그램 로직에는 영향을 미치지 않는 규칙. 이 규칙은 대체로 더 단순한 코드 패턴을 적용하도록 권장합니다.  typescript-common-security:
    title: TypeScript용 일반 보안 규칙
    description: |
TypeScript 코드 보안 문제 식별 규칙.  typescript-express:
    title: Express.js TypeScript 모범 사례 및 보안 확인
    description: |
Express.js TypeScript 모범 사례 및 보안 관련 규칙.  typescript-inclusive:
    title: TypeScript 코드에 표현 문제가 있는지 확인
    description: |
TypeScript의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.  typescript-node-security:
    title: Node에서 잠재적인 보안 핫스팟 식별
    description: |
Node에서 잠재적인 보안 취약 지점을 식별하는 규칙. 여기에는 추가 분류가 필요한 오탐지가 포함될 수 있습니다.cascade:
  modal:
    title: 이 규칙을 사용해 Datadog Code Analysis로 코드를 분석하세요
    top_box:
      title: 규칙 사용 방법
      steps:
        - 리포지토리 루트에 위의 내용을 포함하는 static-analysis.datadog.yml을 만듭니다.
        - 무료 IDE 플러그인을 사용하거나 CI 파이프라인에 Code Analysis 스캔을 추가합니다
        - 코드에 대한 피드백을 받습니다
      footer: 자세한 내용은 <a href="/code_analysis">Code Analysis 문서</a>를 참고하세요
    bottom_boxes:
      - title: VS Code 확장 프로그램
        icon: vscode
        subtitle: </br>VS Code 에디터에서 직접 코드 취약점을 식별하세요
        cta_title: 확장 프로그램 다운로드
        cta_url: "https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode"
      - title: JetBrains 플러그인
        icon: jetbrains
        subtitle: </br>JetBrain 제품에서 직접 코드 취약점을 식별하세요
        cta_title: 플러그인 다운로드
        cta_url: "https://plugins.jetbrains.com/plugin/19495-datadog"
    footer:
      text: Datadog Code Analysis를 ​​사용하여 개발 프로세스의 모든 단계에서 코드 문제를 파악하세요
      link:
        name: Datadog Code Analysis
        url: "https://www.datadoghq.com/code-analysis/"

  banner:
    title: <span>원활한 통합을 제공해 드립니다.</span> Datadog Code Analysis를 경험해 보세요
    link:
      name: Datadog Code Analysis
      url: "https://www.datadoghq.com/code-analysis/"

further_reading:
  - link: /code_analysis/
    tag: 설명서
    text: Datadog Code Analysis에 대해 알아보기
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
코드 분석은 미리 보기에 있습니다.
{{< /callout >}}

{{% site-region region="gov" %}}
<div class="alert alert-danger">
    {{< region-param key="dd_site_name" >}} 사이트에서는 코드 분석 기능을 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요

Datadog Static Analysis는 코드 리뷰에서 CI/CD 파이프라인의 위반 사항을 감지하고, 버그, 보안, 유지 관리 문제를 파악하도록 도와 드리는 즉시 사용 가능한 규칙을 제공합니다. 자세한 정보는 [설정 설명서][1]를 참조하세요.

[1]: /code_analysis/static_analysis/setup
