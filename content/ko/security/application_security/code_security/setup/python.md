---
aliases:
- /ko/security_platform/application_security/getting_started/python
- /ko/security/application_security/getting_started/python
code_lang: 파이썬(Python)
code_lang_weight: 10
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
title: Python용 Code Security 활성화
type: multi-code-lang
---

Docker, Kubernetes, Amazon ECS, AWS Fargate에서 실행되는 Python 애플리케이션의 코드 수준 취약점을 탐지하고 애플리케이션 보안을 모니터링합니다.

참고: Python의 코드 수준 취약점 탐지는 평가판 버전입니다.

서비스에서 Code Security를 활성화하려면 다음 단계를 따르세요.

1. [Datadog Agent][6]를 최소 버전 7.41.1로 업데이트하세요.
2. Code Security을 활성화하는 데 필요한 최소 버전으로 Datadog Tracing Library를 업데이트하세요. 자세한 내용은 [Library Compatibility][3] 페이지를 참고하세요.
3. 애플리케이션 구성에 `DD_IAST_ENABLED=true` 환경 변수를 추가합니다.

   명령줄에서:

   ```shell
   DD_IAST_ENABLED=true ddtrace-run python app.py
   ```

   또는 애플리케이션이 실행되는 위치에 따라 다음 방법 중 하나를 선택합니다.


{{< tabs >}}
{{% tab "Docker CLI" %}}

{{< tabs >}}


```shell
docker run [...] -e DD_IAST_ENABLED=true [...]
```

{{% /tab %}}
{{% tab "Dockerfile" %}}

컨테이너 도커파일에 다음 환경 변수 값을 추가합니다.

```Dockerfile
DD_IAST_ENABLED=true
```

{{% /tab %}}
{{% tab "Kubernetes" %}}

APM용 배포 구성 파일을 업데이트하고 IAST 환경 변수를 추가합니다.

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
5. Code Security가 실제로 어떻게 작동하는지 확인하려면 서비스를 살펴보세요. [Vulnerability Explorer][4]에 코드 수준 취약점이 나타납니다.

{{< img src="/security/application_security/Code-Level-Vulnerability-Details-New.mp4" alt="코드 취약점을 보여주는 동영상" video="true" >}}

추가 지원이 필요하시면 [Datadog 지원팀][5]에 문의하세요.


### 타사 라이브러리 호환성 참고 사항

Code Security는 런타임에서 Python 코드를 수정합니다. 이로 인해 유사한 코드 변환을 수행하는 다른 타사 Python 라이브러리, 특히 다음과 같은 라이브러리와 충돌이 발생할 수 있습니다(이에 국한되지 않음).

- Numba
- JAX
- TorchScript
- TensorFlow
- Bytecode
- Codetransformer
- PyPy

아울러, Code Security는 컴파일된 네이티브 코드에서 오염 범위를 올바르게 전파하지 않습니다. 따라서 코드베이스가 C 또는 C++로 작성된 모듈, CPython API를 사용한 모듈 또는
Cython과 같은 중간 언어 시스템에 크게 의존하는 경우 결과가 예상보다 정확하지 않을 수 있습니다.


## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-py/releases
[2]: /ko/security/application_security/code_security/setup/python
[3]: /ko/security/application_security/code_security/setup/compatibility/
[4]: https://app.datadoghq.com/security/appsec/vm/code
[5]: /ko/help
[6]: /ko/agent/versions/upgrade_between_agent_minor_versions/