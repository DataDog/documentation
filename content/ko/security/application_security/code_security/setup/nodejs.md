---
aliases:
- /ko/security_platform/application_security/getting_started/nodejs
- /ko/security/application_security/getting_started/nodejs
code_lang: nodejs
code_lang_weight: 50
further_reading:
- link: /security/application_security/code_security/#code-level-vulnerabilities-list
  tag: 문서
  text: 지원되는 코드 수준 취약점 목록
- link: https://www.datadoghq.com/blog/iast-datadog-code-security/
  tag: 블로그
  text: Datadog Code Security로 운영 환경에서 애플리케이션 보안 강화
- link: https://www.datadoghq.com/blog/application-code-vulnerability-detection/
  tag: 블로그
  text: Datadog Code Security로 코드 취약점 파악
- link: https://www.datadoghq.com/blog/code-security-owasp-benchmark/
  tag: 블로그
  text: Datadog Code Security는 IAST 접근 방식을 사용하여 OWASP 벤치마크에서 100% 정확도를 달성했습니다.
- link: /security/application_security/troubleshooting
  tag: 문서
  text: 애플리케이션 보안 문제 해결
title: Node.js용 Code Security 활성화
type: multi-code-lang
---

Docker, Kubernetes, Amazon ECS, AWS Fargate에서 실행되는 Node.js 애플리케이션의 코드 수준 취약점을 탐지하고 애플리케이션 보안을 모니터링할 수 있습니다.

서비스에서 Code Security를 활성화하려면 다음 단계를 따르세요.

1. [Datadog Agent][4]를 최소 버전 7.41.1로 업데이트하세요.
2. Code Security을 활성화하는 데 필요한 최소 버전으로 Datadog Tracing Library를 업데이트하세요. 자세한 내용은 [Library Compatibility][3] 페이지를 참고하세요.
3. 애플리케이션 구성에 `DD_IAST_ENABLED=true` 환경 변수를 추가합니다.

   명령줄에서 Node.js에 `--require` 옵션을 사용하여 APM 라이브러리를 초기화하는 경우:

   ```shell
   node --require dd-trace/init app.js
   ```
   그런 다음 환경 변수를 사용하여 ASM을 활성화합니다.
   ```shell
   DD_IAST_ENABLED=true node app.js
   ```
   이 작업을 실행하는 방법은 서비스가 실행되는 위치에 따라 다릅니다.
   {{< tabs >}}
{{% tab "Docker CLI" %}}

```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

컨테이너 도커파일에 다음 환경 변수 값을 추가합니다.

```Dockerfile
ENV DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM의 yaml 파일 컨테이너를 업데이트하고 AppSec 환경 변수를 추가합니다.

```yaml
spec:
  template:
    spec:
      containers:
        - name: <CONTAINER_NAME>
          image: <CONTAINER_IMAGE>/<TAG>
          env:
            - name: DD_IAST_ENABLED
              value: "true"
```

{{% /tab %}}
{{% tab "Amazon ECS" %}}

환경 섹션에서 이를 추가하여 ECS 작업 정의 JSON 파일을 업데이트합니다:

```json
"environment": [
  ...,
  {
    "name": "DD_IAST_ENABLED",
    "value": "true"
  }
]
```

{{% /tab %}}
{{< /tabs >}}

4. 서비스를 다시 시작하세요.
5. Code Security이 실제로 어떻게 작동하는지 확인하려면 서비스를 살펴보세요. [Vulnerability Explorer][5]에 코드 수준 취약점이 나타납니다.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="코드 취약점을 보여주는 동영상" video="true" >}}

추가 지원이 필요할 경우 [Datadog 지원팀][6]에 문의하세요.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-js/blob/master/MIGRATING.md
[2]: /ko/security/application_security/code_security/setup/nodejs/
[3]: /ko/security/application_security/code_security/setup/compatibility/
[4]: /ko/agent/versions/upgrade_between_agent_minor_versions/
[5]: https://app.datadoghq.com/security/appsec/vm/code
[6]: /ko/help