---
aliases:
- /ko/continuous_integration/static_analysis/rules
- /ko/static_analysis/rules
- /ko/code_analysis/static_analysis_rules
- /ko/security/code_security/static_analysis_rules
cascade:
  banner:
    link:
      name: Datadog Code Security
      url: https://www.datadoghq.com/product/code-security/
    title: <span>매끄러운 통합.</span> Datadog Code Security를 사용해 보세요
  modal:
    bottom_boxes:
    - cta_title: 확장 프로그램 다운로드
      cta_url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
      icon: vscode
      subtitle: VS Code 편집기에서 직접 코드 취약점을 식별하세요</br>
      title: VS Code 확장 프로그램
    - cta_title: 플러그인 다운로드
      cta_url: https://plugins.jetbrains.com/plugin/19495-datadog
      icon: jetbrains
      subtitle: JetBrains 제품에서 직접 코드 취약점을 식별하세요</br>
      title: JetBrains 플러그인
    footer:
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/
      text: Datadog Code Security를 사용하여 개발 프로세스의 모든 단계에서 코드 문제를 잡으세요
    title: 이 규칙을 시도하고 Datadog Code Security로 코드를 분석하세요
    top_box:
      footer: For more information, please read the <a href="/security/code_security/">Code
        Security documentation</a>
      steps:
      - Create a static-analysis.datadog.yml with the content above at the root of
        your repository
      - Use our free IDE Plugins or add Code Security scans to your CI pipelines
      - Get feedback on your code
      title: 이 규칙을 사용하는 방법
description: 정적 코드 분석을 위한 여러 언어의 규칙을 확인하세요.
further_reading:
- link: /security/code_security/
  tag: Documentation
  text: Datadog Code Security에 대해 알아보기
is_beta: false
rulesets:
  apex-code-style:
    description: '정해진 코딩 표준을 따르는 Apex 규칙을 작성하기 위한 Code Security 규칙.

      '
    title: Apex 코드 스타일과 모범 사례를 강제하기 위한 규칙.
  apex-security:
    description: 'Apex 코드에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: Apex를 위한 보안 규칙
  bash-code-quality:
    description: 'Bash 스크립트의 코드 품질을 강제하기 위한 규칙.

      '
    title: Bash 스크립트의 코드 품질 규칙.
  bash-security:
    description: 'Bash 스크립트의 보안 모범 사례를 강제하기 위한 규칙.

      '
    title: Bash 스크립트에 대한 보안 규칙
  csharp-best-practices:
    description: 'C# 모범 사례를 시행하기 위한 규칙.

      '
    title: C#을 위한 모범 사례
  csharp-code-style:
    description: 'C# 코드 스타일을 시행하기 위한 규칙.

      '
    title: C# 코드 스타일 패턴을 따르십시오
  csharp-inclusive:
    description: 'C# 코드를 더 포괄적으로 만들기 위한 규칙.

      '
    title: C#에서 포괄적인 언어 사용
  csharp-security:
    description: 'C# 코드에서 보안 문제를 찾는 데 집중한 규칙.

      '
    title: 안전하고 보안이 강화된 C# 코드 작성
  docker-best-practices:
    description: 'Docker 사용을 위한 모범 사례.

      '
    title: Docker 사용 시 모범 사례를 따르십시오
  github-actions:
    description: 'GitHub Actions를 검사하여 권한이나 버전 고정 등과 같은 안전하지 않은 패턴을 감지하기 위한 규칙.

      '
    title: GitHub Actions를 안전하게 보호하십시오
  go-best-practices:
    description: 'Go 코드를 더 빠르고 쉽게 작성하기 위한 규칙. 코드 스타일에서 버그 방지에 이르기까지, 이 규칙 세트는 성능이
      뛰어나고 유지 관리가 용이하며 효율적인 Go 코드를 작성하는 개발자에게 도움을 줍니다.

      '
    title: Go를 위한 모범 사례
  go-inclusive:
    description: 'Go 코드에 표현 문제가 있는지 검사합니다.

      '
    title: Go에서 포괄적인 언어 사용
  go-security:
    description: 'Go 코드베이스에서 일반적인 보안 문제(예: SQL 인젝션, XSS 또는 셸 인젝션)를 감지하십시오.

      '
    title: Go 코드가 안전하고 보안이 강화되었는지 확인
  java-best-practices:
    description: 'Java 모범 사례를 준수하기 위한 규칙.

      '
    title: Java에서 모범 사례를 따르십시오.
  java-code-style:
    description: 'Java 코드 스타일을 준수하기 위한 규칙.

      '
    title: Java 코드 스타일 패턴을 따르십시오.
  java-inclusive:
    description: 'Java의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.

      '
    title: Java에서 포괄적인 언어 사용
  java-security:
    description: 'Java 코드에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: Java 코드가 안전한지 확인하십시오.
  javascript-best-practices:
    description: 'JavaScript 모범 사례를 준수하기 위한 규칙.

      '
    title: JavaScript 코드를 작성할 때 모범 사례를 따르십시오.
  javascript-browser-security:
    description: 'JavaScript 웹 애플리케이션에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: JavaScript 웹 애플리케이션을 위한 보안 규칙.
  javascript-code-style:
    description: 'JavaScript 코드 스타일을 강제하는 규칙.

      '
    title: JavaScript 코드 스타일을 강제하십시오.
  javascript-common-security:
    description: 'JavaScript 코드에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: JavaScript를 위한 일반적인 보안 규칙.
  javascript-express:
    description: 'Express.js 모범 사례와 보안을 위한 규칙.

      '
    title: Express.js 모범 사례 및 보안을 검사하십시오.
  javascript-inclusive:
    description: 'JavaScript의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙.

      '
    title: JavaScript 코드에서 표현 문제를 검사하십시오.
  javascript-node-security:
    description: 'Node에서 잠재적인 보안 핫스팟을 식별하는 규칙. 여기에는 추가적인 분류가 필요한 잘못된 긍정이 포함될 수 있습니다.

      '
    title: Node에서 잠재적인 보안 핫스팟을 식별하십시오.
  jsx-react:
    description: '이 플러그인은 React의 모범 사례를 강제하는 `권장` 구성을 내보냅니다.

      '
    title: React 전용 린팅 규칙
  kotlin-best-practices:
    description: 'Kotlin 모범 사례를 강제하는 규칙입니다.

      '
    title: Kotlin 코드 작성을 위한 모범 사례를 따르십시오.
  kotlin-code-style:
    description: 'Kotlin 코드 스타일을 강제하는 규칙입니다.

      '
    title: Kotlin 코드 스타일을 강제하십시오.
  kotlin-security:
    description: 'Kotlin 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: 안전한 Kotlin 코딩을 강제하십시오.
  php-best-practices:
    description: 'PHP 모범 사례를 강제하고, 코드 스타일을 향상시키며, 버그를 방지하고, 성능이 뛰어나고 유지 관리가 용이하며 효율적인
      PHP 코드를 촉진하는 규칙입니다.

      '
    title: PHP 코드 작성을 위한 모범 사례를 따르십시오.
  php-code-style:
    description: 'PHP 코드 스타일을 강제하는 규칙입니다.

      '
    title: PHP 코드 스타일을 강제하십시오.
  php-security:
    description: 'PHP 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: PHP를 위한 보안 규칙입니다.
  python-best-practices:
    description: '효율적이고 버그 없는 코드를 작성하기 위한 Python 모범 사례입니다.

      '
    title: 모범 사례를 따라 Python 코드 작성하기
  python-code-style:
    description: 'Python 코드 스타일을 적용하는 규칙입니다.

      '
    title: Python 코드 스타일 적용
  python-design:
    description: '중첩된 루프 등을 포함해 Python 프로그램 구조를 검사하기 위한 규칙입니다.

      '
    title: Python 프로그램 구조 검사
  python-django:
    description: 'Django 모범 사례 및 보안 전용 규칙입니다.

      '
    title: Django 모범 사례 및 보안 검사
  python-flask:
    description: 'Flask 모범 사례 및 보안 전용 규칙입니다.

      '
    title: Flask 모범 사례 및 보안 검사
  python-inclusive:
    description: 'Python의 코드와 주석에서 부적절한 표현을 피하기 위한 규칙입니다.

      '
    title: Python 코드에 표현 문제가 있는지 검사
  python-pandas:
    description: "pandas 코드가 적절하게 사용되었는지 검사하기 위한 일련의 규칙입니다.\n\n - `import` 선언이 코딩\
      \ 가이드라인을 따르도록 합니다.\n - 더 이상 사용되지 않는 코드와 메서드를 피하십시오.\n - 가능한 한 비효율적인 코드를 피하십시오.\n"
    title: pandas를 사용한 데이터 과학 모범 사례
  python-security:
    description: "Python 코드에서 보안 및 취약성 문제를 찾는 데 중점을 둔 규칙, OWASP10 및 SANS25에서 발견된 문제를\
      \ 포함합니다.\n\n - 나쁜 암호화 및 해싱 프로토콜 사용\n - 접근 제어 부족\n - 보안 잘못 구성\n - SQL 삽입\n -\
      \ 하드코딩된 자격 증명\n - 셸 인젝션\n - 안전하지 않은 역직렬화\n"
    title: Python 코드가 안전하고 보안이 강화되도록 하십시오.
  rails-best-practices:
    description: 'Ruby on Rails 코드를 작성하기 위한 모범 사례입니다.

      '
    title: Ruby on Rails 커뮤니티에서 널리 채택된 패턴
  ruby-best-practices:
    description: 'Ruby 모범 사례를 시행하기 위한 규칙입니다.

      '
    title: Ruby에서 모범 사례를 따르십시오
  ruby-code-style:
    description: '정립된 코딩 표준을 따르는 Ruby 규칙을 작성하기 위한 Code Security 규칙입니다.

      '
    title: Ruby 코드 스타일을 시행하기 위한 규칙입니다.
  ruby-inclusive:
    description: '포괄적인 Ruby 코드를 작성하십시오

      '
    title: 포괄적인 Ruby 코드에 대한 규칙
  ruby-security:
    description: 'Ruby 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: Ruby를 위한 보안 규칙
  swift-code-style:
    description: '정립된 코딩 표준을 따르는 Swift 규칙을 작성하기 위한 Code Security 규칙입니다.

      '
    title: Swift 코드 스타일과 모범 사례를 강제하기 위한 규칙.
  swift-security:
    description: 'Swift 코드에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: Swift를 위한 보안 규칙
  terraform-aws:
    description: 'AWS에 대한 Terraform 모범 사례를 강제하기 위한 규칙.

      '
    title: Terraform AWS
  tsx-react:
    description: '이 플러그인은 React의 모범 사례를 강제하는 `권장` 구성을 내보냅니다.

      '
    title: TypeScript React 코드 품질
  typescript-best-practices:
    description: 'TypeScript 모범 사례를 강제하기 위한 규칙.

      '
    title: TypeScript 코드를 작성할 때 모범 사례를 따르십시오.
  typescript-browser-security:
    description: 'TypeScript 웹 애플리케이션에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: TypeScript 웹 애플리케이션을 위한 보안 규칙
  typescript-code-style:
    description: '현대 TypeScript 코드베이스에 대한 모범 사례로 간주되지만 프로그램 논리에 영향을 미치지 않는 규칙. 이 규칙들은
      일반적으로 더 간단한 코드 패턴을 강제하는 데에 강한 의견을 반영합니다.

      '
    title: TypeScript에서 권장하는 코드 패턴
  typescript-common-security:
    description: 'TypeScript 코드에서 보안 문제를 찾는 데 중점을 둔 규칙.

      '
    title: TypeScript를 위한 일반적인 보안 규칙
  typescript-express:
    description: 'Express.js TypeScript 모범 사례 및 보안을 위한 규칙.

      '
    title: Express.js TypeScript 모범 사례 및 보안을 검사하십시오.
  typescript-inclusive:
    description: '코드와 주석에서 부적절한 표현을 피하기 위한 TypeScript 규칙.

      '
    title: TypeScript 코드에서 표현 문제를 검사하십시오.
  typescript-node-security:
    description: 'Node에서 잠재적인 보안 핫스팟을 식별하는 규칙입니다. 여기에는 추가적인 분류가 필요한 잘못된 긍정이 포함될 수
      있습니다.

      '
    title: Node에서 잠재적인 보안 핫스팟을 식별하십시오.
title: SAST 규칙
type: static-analysis
---
{{% site-region region="gov" %}}
<div class="alert alert-warning">
    Code Security는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요 {#overview}

Datadog 정적 코드 분석은 보안 취약점, 버그 및 코드베이스의 유지 관리 문제를 감지하는 데 도움이 되는 기본 제공 규칙을 제공합니다. 자세한 내용은 [설정 문서][1]를 참조하세요.

[1]: /ko/security/code_security/static_analysis/setup/