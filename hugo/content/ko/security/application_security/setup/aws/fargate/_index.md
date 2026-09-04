---
disable_sidebar: true
further_reading:
- link: /security/application_security/
  tag: 설명서
  text: Datadog App 및 API Protection을 사용하여 위협으로부터 보호합니다.
- link: /security/application_security/add-user-info/
  tag: 설명서
  text: 사용자 활동 추적
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB 앱 및 API 보호 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: 앱 및 API 보호 트러블슈팅
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: Datadog에서 App 및 API Protection이 작동하는 방식
title: AWS Fargate에서 App 및 API Protection 설정
---
{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection은 정부 기관용 Datadog 사이트 US1-FED에서 미리 보기로 제공되고 있습니다.
</div>
{{< /site-region >}}

태스크의 프로그래밍 언어를 선택하여 AWS Fargate 태스크에 App 및 API Protection(AAP)을 설정하는 방법을 알아봅니다.

<div class="alert alert-info">
  <p class="fs-bold m-0">환경이 보이지 않습니까?</p>
  <span>누락된 환경에 대한 요청을 <a href="https://forms.gle/nMGq2Hhe7Z4sCKdy6">여기</a>로 보내주십시오.</span>
</div>

{{< appsec-integrations >}}
  {{< appsec-integration name="Python" avatar="python" link="/security/application_security/setup/python/aws-fargate" >}}
  {{< appsec-integration name="Node.js" avatar="node" link="/security/application_security/setup/nodejs/aws-fargate" >}}
  {{< appsec-integration name="Java" avatar="java" link="/security/application_security/setup/java/aws-fargate" >}}
  {{< appsec-integration name="Go" avatar="go" link="/security/application_security/setup/go/aws-fargate" >}}
  {{< appsec-integration name="Ruby" avatar="ruby" link="/security/application_security/setup/ruby/aws-fargate" >}}
  {{< appsec-integration name=".NET" avatar="dotnet" link="/security/application_security/setup/dotnet/aws-fargate" >}}
  {{< appsec-integration name="PHP" avatar="php" link="/security/application_security/setup/php/aws-fargate" >}}
{{< /appsec-integrations >}}

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}