---
further_reading:
- link: /security/application_security/how-it-works/
  tag: 설명서
  text: App and API Protection의 작동 방식
- link: /security/default_rules/?category=cat-application-security
  tag: 설명서
  text: OOTB App and API Protection 규칙
- link: /security/application_security/troubleshooting
  tag: 설명서
  text: App and API Protection 문제 해결
- link: /security/application_security/threats/
  tag: 설명서
  text: App and API Protection
- link: https://www.datadoghq.com/blog/datadog-security-google-cloud/
  tag: 블로그
  text: Datadog Security가 Google Cloud 기능의 규정을 준수하고 위협으로부터 보호하도록 확장됨
title: Ruby에서 Google Cloud Run 함수에 대한 App and API Protection 활성화
---
<div class="alert alert-info">Google Cloud Run에 대한 AAP 지원은 미리 보기로 제공되고 있습니다.</a></div>

## 작동 방식 {#how-it-works}

`serverless-init` 애플리케이션은 프로세스를 래핑하고 하위 프로세스로 실행합니다. 메트릭용 DogStatsD 리스너와 트레이스용 Trace Agent 리스너를 시작합니다. 애플리케이션의 stdout/stderr 스트림을 래핑하여 로그를 수집합니다. 부트스트래핑 완료 후 `serverless-init`은 명령을 하위 프로세스로 실행합니다.

전체 계측을 수행하려면 Docker 컨테이너 내에서 실행되는 첫 번째 명령으로 `datadog-init`을 호출해야 합니다. 엔트리 포인트로 설정하거나 CMD의 첫 번째 인수로 설정하는 방식으로 이 작업을 수행할 수 있습니다.

## 호환성 {#compatibility}

<div class="alert alert-info">App and API Protection(서버리스)에 대한 Google Cloud Run 지원은 미리 보기로 제공되고 있습니다.</div>

**참고**: Remote Configuration을 통한 위협 보호는 지원되지 않습니다. [Workflows][5]를 사용하여 [WAF][6]에서 IP를 차단합니다.

## 시작하기 {#get-started}

애플리케이션을 배포하기 전에 Ruby 트레이서를 [수동으로 설치][1]하세요. [예시 애플리케이션][2]을 참조하세요.

Dockerfile에 다음 명령과 인수를 추가합니다.

```dockerfile
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["rails", "server", "-b", "0.0.0.0"]
```

### 설명{#explanation}

1. Datadog `serverless-init`을 Docker 이미지에 복사합니다.
   ```dockerfile
   COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
   ```

2. (선택 사항) Datadog 태그를 추가합니다.
   ```dockerfile
   ENV DD_SERVICE=datadog-demo-run-ruby
   ENV DD_ENV=datadog-demo
   ENV DD_APPSEC_ENABLED=1
   ENV DD_VERSION=1
   ```

3. 이 환경 변수는 Cloud Run에서 트레이스 전파가 제대로 작동하는 데 필요합니다. Datadog으로 계측된 모든 다운스트림 서비스에 이 변수를 설정합니다.
   ```dockerfile
   ENV DD_TRACE_PROPAGATION_STYLE=datadog
   ```

4. Datadog `serverless-init` 프로세스에서 애플리케이션을 래핑하도록 엔트리 포인트를 변경합니다.
   **참고**: Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 [대체 구성 방법](#alt-ruby)을 참조하세요.
   ```dockerfile
   ENTRYPOINT ["/app/datadog-init"]
   ```

5. 엔트리 포인트에 래핑된 바이너리 애플리케이션을 실행합니다. 상황에 맞게 명령줄을 수정하세요.
   ```dockerfile
   CMD ["rails", "server", "-b", "0.0.0.0"]
   ```
### 대체 구성 방법{#alt-ruby}
Dockerfile에 이미 정의된 엔트리 포인트가 있는 경우 대신 CMD 인수를 수정할 수 있습니다.

{{< highlight dockerfile "hl_lines=7" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
CMD ["/app/datadog-init", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

엔트리 포인트도 계측해야 하는 경우, 대신 엔트리 포인트와 CMD 인수를 바꿀 수 있습니다. 자세한 내용은 [`serverless-init`작동 방식](#how-serverless-init-works)을 참조하세요.

{{< highlight dockerfile "hl_lines=7-8" >}}
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
ENV DD_SERVICE=datadog-demo-run-ruby
ENV DD_ENV=datadog-demo
ENV DD_VERSION=1
ENV DD_APPSEC_ENABLED=1
ENV DD_TRACE_PROPAGATION_STYLE=datadog
ENTRYPOINT ["/app/datadog-init"]
CMD ["your_entrypoint.sh", "rails", "server", "-b", "0.0.0.0"]
{{< /highlight >}}

실행할 명령이 `datadog-init` 인수로 전달되는 한, 전체 계측을 적용할 수 있습니다.

[1]: /ko/tracing/trace_collection/dd_libraries/ruby/?tab=containers#instrument-your-application
[2]: https://github.com/DataDog/crpb/tree/main/ruby-on-rails

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/services?query=type%3Afunction%20&env=prod&groupBy=&hostGroup=%2A&lens=Security&sort=-attackExposure&view=list
[2]: /ko/serverless/distributed_tracing/
[3]: https://app.datadoghq.com/security/appsec
[4]: /ko/security/application_security/serverless/compatibility
[5]: /ko/actions/workflows/
[6]: /ko/security/application_security/waf-integration/
[apm-lambda-tracing-setup]: https://docs.datadoghq.com/serverless/aws_lambda/distributed_tracing/