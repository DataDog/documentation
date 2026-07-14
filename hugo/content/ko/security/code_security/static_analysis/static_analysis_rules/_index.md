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
    title: <span>원활한 통합.</span> Datadog Code Security 사용해 보기
  modal:
    bottom_boxes:
    - cta_title: 확장 프로그램 다운로드
      cta_url: https://marketplace.visualstudio.com/items?itemName=Datadog.datadog-vscode
      icon: vscode
      subtitle: VS Code 편집기에서 직접</br>코드 취약성 식별
      title: VS Code 확장 프로그램
    - cta_title: 플러그인 다운로드
      cta_url: https://plugins.jetbrains.com/plugin/19495-datadog
      icon: jetbrains
      subtitle: JetBrains 제품에서 직접</br>코드 취약성 식별
      title: JetBrains 플러그인
    footer:
      link:
        name: Datadog Code Security
        url: https://www.datadoghq.com/product/code-security/
      text: Datadog Code Security를 사용해 개발 프로세스의 모든 단계에서 코드 문제 잡아내기
    title: 이 규칙을 사용해 Datadog Code Security로 코드 분석해 보기
    top_box:
      footer: 자세한 정보는 <a href="/security/code_security/">Code Security 설명서</a> 참조
      steps:
      - 리포지토리 루트에서 위의 콘텐츠를 사용해 static-analysis.datadog.yml 생성
      - Datadog의 무료 IDE Plugins를 사용하거나 Code Security 스캔을 CI 파이프라인에 추가
      - 코드에 대한 피드백 받기
      title: 이 규칙의 사용법
description: Static Code Analysis를 위해 여러 언어의 규칙을 봅니다.
further_reading:
- link: /security/code_security/
  tag: 설명서
  text: Datadog Code Security에 대해 알아보기
is_beta: false
rulesets:
  apex-code-style:
    description: '정립된 코딩 표준을 따르는 Apex 규칙을 작성하기 위한 Code Security 규칙입니다.

      '
    title: Apex 코드 스타일 및 모범 사례를 적용하는 규칙입니다.
  apex-security:
    description: 'Apex 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: Apex 보안 규칙
  bash-code-quality:
    description: 'Bash 스크립트의 코드 품질을 적용하는 규칙입니다.

      '
    title: Bash 스크립트의 코드 품질 규칙입니다.
  bash-security:
    description: 'Bash 스크립트의 보안 모범 사례를 적용하는 규칙입니다.

      '
    title: Bash 스크립트 보안 규칙
  csharp-best-practices:
    description: 'C# 모범 사례를 적용하는 규칙입니다.

      '
    title: C# 모범 사례
  csharp-code-style:
    description: 'C# 코드 스타일을 적용하는 규칙입니다.

      '
    title: C# 코드 스타일 패턴 따르기
  csharp-inclusive:
    description: 'C# 코드의 포용성을 강화하기 위한 규칙

      '
    title: C#에서 포용적 언어 사용
  csharp-security:
    description: 'C# 코드에서 보안 문체를 찾는 데 중점을 둔 규칙입니다.

      '
    title: 안전하고 보안이 확보된 C# 코드 쓰기
  docker-best-practices:
    description: 'Docker 사용 모범 사례입니다.

      '
    title: Docker 사용 시 모범 사례 따르기
  github-actions:
    description: 'GitHub Actions를 검사하고 권한 또는 버전 고정과 같이 안전하지 않은 패턴을 감지하는 규칙입니다.

      '
    title: GitHub Actions 보안 확보
  go-best-practices:
    description: 'Go 코드를 더 빠르고 간편하게 작성하게 해 주는 규칙입니다. 이 규칙 세트는 코드 스타일부터 버그 방지까지, 개발자가
      성능이 우수하고 유지 관리가 용이하며 효율적인 Go 코드를 작성하는 데 도움이 됩니다.

      '
    title: Go 모범 사례
  go-inclusive:
    description: 'Go 코드에 표현 문제가 있는지 검사합니다.

      '
    title: Go에서 포용적 언어 사용
  go-security:
    description: 'Go 코드베이스에서 일반적인 보안 문제(예를 들어 SQL 인젝션, XSS 또는 셸 인젝션)를 감지합니다.

      '
    title: Go 코드가 안전하고 보안이 확보되도록 보장
  java-best-practices:
    description: 'Java 모범 사례를 적용하는 규칙입니다.

      '
    title: Java 모범 사례 따르기
  java-code-style:
    description: 'Java 코드 스타일을 적용하는 규칙입니다.

      '
    title: Java 코드 스타일 패턴 따르기
  java-inclusive:
    description: 'Java에서 코드 및 주석의 부적절한 표현을 피하기 위한 규칙입니다.

      '
    title: Java에서 포용적 언어 사용
  java-security:
    description: 'Java 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: Java 코드 보안 보장
  javascript-best-practices:
    description: 'JavaScript 모범 사례를 적용하는 규칙입니다.

      '
    title: JavaScript 코드 작성 시 모범 사례 따르기
  javascript-browser-security:
    description: 'JavaScript 웹 애플리케이션에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: JavaScript 웹 애플리케이션의 보안 규칙
  javascript-code-style:
    description: 'JavaScript 코드 스타일을 적용하는 규칙입니다.

      '
    title: JavaScript 코드 스타일 적용
  javascript-common-security:
    description: 'JavaScript 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: JavaScript 일반 보안 규칙
  javascript-express:
    description: 'Express.js 모범 사례 및 보안에 국한한 규칙입니다.

      '
    title: Express.js 모범 사례 및 보안 검사
  javascript-inclusive:
    description: 'JavaScript에서 코드 및 주석의 부적절한 표현을 피하기 위한 규칙입니다.

      '
    title: JavaScript 코드의 표현 문제 검사
  javascript-node-security:
    description: 'Node에서 잠재적인 보안 핫스팟을 식별하기 위한 규칙입니다. 여기에는 추가 분류가 필요한 오탐이 포함될 수 있습니다.

      '
    title: Node의 잠재적 보안 핫스팟 식별
  jsx-react:
    description: '이 플러그인은 React 모범 사례를 적용하는 `권장` 구성을 내보냅니다.

      '
    title: React 전용 린팅 규칙
  kotlin-best-practices:
    description: 'Kotlin 모범 사례를 적용하는 규칙입니다.

      '
    title: Kotlin 코드 작성 시 모범 사례 따르기
  kotlin-code-style:
    description: 'Kotlin 코드 스타일을 적용하는 규칙입니다.

      '
    title: Kotlin 코드 스타일 적용
  kotlin-security:
    description: 'Kotlin 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: 보안 Kotlin 코딩 적용
  php-best-practices:
    description: 'PHP 모범 사례를 적용하여 코드 스타일을 개선하고, 버그를 방지하며, 성능이 우수하고 유지 관리가 용이하며 효율적인
      PHP 코드를 촉진하는 규칙입니다.

      '
    title: PHP 코드 작성 시 모범 사례 따르기
  php-code-style:
    description: 'PHP 코드 스타일을 적용하는 규칙입니다.

      '
    title: PHP 코드 스타일 적용
  php-security:
    description: 'PHP 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: PHP 보안 규칙
  python-best-practices:
    description: '효율적이고 버그 없는 코드를 쓰기 위한 Python 모범 사례입니다.

      '
    title: Python 코드 작성 시 모범 사례 따르기
  python-code-style:
    description: 'Python 코드 스타일을 적용하는 규칙입니다.

      '
    title: Python 코드 스타일 적용
  python-design:
    description: '중첩된 루프와 같은 Python 프로그램 구조를 검사하는 규칙입니다.

      '
    title: Python 프로그램 구조 검사
  python-django:
    description: 'Django 모범 사례 및 보안에 국한한 규칙입니다.

      '
    title: Django 모범 사례 및 보안 검사
  python-flask:
    description: 'Flask 모범 사례 및 보안에 국한한 규칙입니다.

      '
    title: Flask 모범 사례 및 보안 검사
  python-inclusive:
    description: '코드 및 코멘트의 부적절한 표현을 피하기 위한 Python 규칙입니다.

      '
    title: Python 코드의 표현 문제 검사
  python-pandas:
    description: "pandas 코드가 적절하게 사용되었는지 검사하는 규칙 세트입니다.\n\n - `import` 선언이 코딩 가이드라인을\
      \ 따르도록 합니다.\n - 사용이 중단된 코드 및 메서드를 피합니다.\n - 가능하다면 항상 비효율적인 코드를 피합니다.\n"
    title: pandas를 사용한 데이터 과학 모범 사례
  python-security:
    description: "Python 코드에서 보안 및 취약성 문제를 찾는 데 중점을 둔 규칙입니다. 여기에는 OWASP10 및 SANS25에서\
      \ 찾은 문제가 포함됩니다.\n\n - 잘못된 암호화 및 해싱 프로토콜 사용\n - 액세스 제어 부족\n - 보안 구성 오류\n - SQL\
      \ 인젝션\n - 하드코딩된 자격 증명\n - 셸 인젝션\n - 안전하지 않은 역직렬화\n"
    title: Python 코드가 안전하고 보안이 확보되도록 보장
  rails-best-practices:
    description: 'Ruby on Rails 코드 작성 시 모범 사례입니다.

      '
    title: Ruby on Rails 커뮤니티에서 폭넓게 채택되는 패턴
  ruby-best-practices:
    description: 'Ruby 모범 사례를 적용하는 규칙입니다.

      '
    title: Ruby 모범 사례 따르기
  ruby-code-style:
    description: '정립된 코딩 표준을 따르는 Ruby 규칙을 작성하기 위한 Code Security 규칙입니다.

      '
    title: Ruby 코드 스타일을 적용하는 규칙입니다.
  ruby-inclusive:
    description: '포용적 Ruby 코드 작성

      '
    title: 포용적 Ruby 코드의 규칙
  ruby-security:
    description: 'Ruby 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: Ruby 보안 규칙
  swift-code-style:
    description: '정립된 코딩 표준을 따르는 Swift 규칙을 작성하기 위한 Code Security 규칙입니다.

      '
    title: Swift 코드 스타일 및 모범 사례를 적용하는 규칙입니다.
  swift-security:
    description: 'Swift 코드에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: Swift 보안 규칙
  terraform-aws:
    description: 'AWS의 Terraform 모범 사례를 적용하는 규칙입니다.

      '
    title: Terraform AWS
  tsx-react:
    description: '이 플러그인은 React 모범 사례를 적용하는 `권장` 구성을 내보냅니다.

      '
    title: TypeScript React 코드 품질
  typescript-best-practices:
    description: 'TypeScript 모범 사례를 적용하는 규칙입니다.

      '
    title: TypeScript 코드 작성 시 모범 사례 따르기
  typescript-browser-security:
    description: 'TypeScript 웹 애플리케이션에서 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: TypeScript 웹 애플리케이션 보안 규칙
  typescript-code-style:
    description: '최신 TypeScript 코드베이스의 모범 사례로 간주되지만, 프로그램 로직에 영향을 미치지 않는 규칙입니다. 이러한
      규칙에는 일반적으로 더 단순한 코드 패턴을 적용하는 데 관한 의견이 포함되어 있습니다.

      '
    title: TypeScript 의견형 코드 패턴
  typescript-common-security:
    description: 'TypeScript 코드의 보안 문제를 찾는 데 중점을 둔 규칙입니다.

      '
    title: TypeScript 일반 보안 규칙
  typescript-express:
    description: 'Express.js TypeScript 모범 사례 및 보안에 국한한 규칙입니다.

      '
    title: Express.js TypeScript 모범 사례 및 보안 검사
  typescript-inclusive:
    description: 'TypeScript에서 코드 및 주석의 부적절한 표현을 피하기 위한 규칙입니다.

      '
    title: TypeScript 코드의 표현 문제 검사
  typescript-node-security:
    description: 'Node에서 잠재적인 보안 핫스팟을 식별하기 위한 규칙입니다. 여기에는 추가 분류가 필요한 오탐이 포함될 수 있습니다.

      '
    title: Node의 잠재적 보안 핫스팟 식별
title: SAST 규칙
type: static-analysis
---
{{% site-region region="gov,gov2" %}}
<div class="alert alert-warning">
    Code Security는 {{< region-param key="dd_site_name" >}} 사이트에서 사용할 수 없습니다.
</div>
{{% /site-region %}}

## 개요 {#overview}

Datadog Static Code Analysis는 코드베이스에서 보안 취약성, 버그 및 유지 관리 용이성을 감지하는 데 도움을 주는, 즉시 사용 가능한 규칙을 제공합니다. 자세한 내용은 [설정 설명서][1]를 참조하세요.

[1]: /ko/security/code_security/static_analysis/setup/