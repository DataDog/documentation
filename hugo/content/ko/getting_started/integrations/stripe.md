---
description: Stripe 프로젝트를 사용하여 Stripe CLI에서 Datadog 조직을 프로비저닝하고 관리하세요.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-stripe-projects/
  tag: 블로그
  text: Stripe 프로젝트에서 Datadog 프로비저닝하기
- link: https://docs.stripe.com/projects
  tag: 문서
  text: Stripe 프로젝트 CLI 문서
site_support_id: stripe_projects
title: Stripe Projects에서 Datadog 시작하기
---
## 개요 {#overview}

[Stripe 프로젝트][1]를 사용하여 Stripe CLI에서 Datadog을 프로비저닝하고 관리하세요. 이 흐름은 Datadog 조직을 생성하고 해당 API 키, 사이트 및 조직 이름을 애플리케이션의 `.env` 파일에 추가합니다.

## 전제 조건 {#prerequisites}

- 기존 Datadog 계정과 연결되지 않은 이메일 주소가 있는 Stripe 계정

## 설정 {#setup}

### Stripe CLI 및 프로젝트 플러그인 설치 {#install-the-stripe-cli-and-projects-plugin}

1. [Stripe CLI][2] 버전 1.43.3 이상을 설치합니다.

   ```shell
   npm install -g @stripe/cli
   ```

   다른 설치 방법은 [Stripe CLI 설치][2]를 참조하세요.

1. Stripe Projects 플러그인을 설치합니다.

   ```shell
   stripe plugin install projects
   ```

### Datadog 프로비저닝 {#provision-datadog}

1. Stripe Projects를 초기화합니다. 애플리케이션 리포지토리의 루트와 같이 프로젝트에 사용할 디렉터리에서 이 명령을 실행하세요.

   ```shell
   stripe projects init
   ```

1. Datadog Observability를 추가합니다.

   ```shell
   stripe projects add datadog/observability
   ```

1. 프로젝트 디렉터리의 `.env` 파일에 Datadog API 키, 사이트 및 조직 이름이 포함되어 있는지 확인합니다.

### 플랜 업그레이드 {#upgrade-your-plan}

무료 체험판이 종료된 후에도 Datadog에 계속 액세스하려면 종량제 요금제로 업그레이드하세요. Stripe 계정에 결제 수단이 저장되어 있으면 명령 하나로 완료할 수 있습니다.

```shell
stripe projects upgrade datadog-observability
```

## Datadog 액세스 {#access-datadog}

1. [Datadog 로그인 페이지](https://app.datadoghq.com/account/login)로 이동합니다.
1. Stripe에 로그인할 때 Google 계정을 사용하는 경우 **Sign in with Google**을 선택합니다. 그렇지 않으면 **Forgot password?**를 선택합니다. 그런 다음 Stripe 계정의 이메일 주소를 입력하여 Datadog 비밀번호를 설정합니다.

## Stripe 프로젝트에서 Datadog 제거{#remove-datadog-from-stripe-projects}

Datadog을 제거하면 API 키가 폐기되고 Stripe 프로젝트에서 통합이 해제됩니다. Datadog 조직과 해당 데이터는 삭제되지 않으며 Datadog UI에서 계속 사용할 수 있습니다.

```shell
stripe projects remove datadog-observability
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.stripe.com/projects
[2]: https://docs.stripe.com/cli/install