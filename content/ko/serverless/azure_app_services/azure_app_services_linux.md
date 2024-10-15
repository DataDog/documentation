---
further_reading:
- link: https://www.datadoghq.com/blog/monitor-azure-app-service-linux/
  tag: 블로그
  text: Datadog를 통해 Azure App Service에서 Linux 웹 앱을 모니터링합니다.
title: Azure App Service - Linux 코드
---
## 개요

이 계측 메서드를 사용하면 Linux Azure App Service 워크로드에 다음과 같은 추가 기능을 이용할 수 있습니다:

- 자동 계측을 사용한 전체 분산 APM 추적.
- 관련 Azure App Service 메트릭과 메타데이터를 보여주는 사용자 지정 APM 서비스 및 트레이스 보기.
- 스팬을 사용자 지정할 수 있는 수동 APM 계측 지원.
- 애플리케이션 로그에 `Trace_ID` 삽입.
- [DogStatsD][1]를 이용해 커스텀 메트릭 제출 지원.

이 솔루션에서는 애플리케이션 계측과 설정 관리를 위해 시작 명령 설정 및 Linux Azure App Service에 대한 애플리케이션 설정을 사용합니다. Java, Node, .NET, PHP, Python을 지원합니다.

### 설정
#### 애플리케이션 설정
애플리케이션을 계측하려면, 다음 키-값 쌍을 Azure 설정의 **애플리케이션 설정** 아래에 추가합니다.


{{< img src="serverless/azure_app_service/application-settings.jpg" alt="Azure App Service 설정: Azure UI의 설정 섹션 아래에 애플리케이션 설정. DD_API_KEY, DD_SERVICE, DD_START_APP 3개의 설정이 있음." style="width:80%;" >}}

- `DD_API_KEY`는 Datadog API 키입니다.
- `DD_CUSTOM_METRICS_ENABLED`(선택)은 [커스텀 메트릭](#custom-metrics)을 활성화합니다.
- `DD_SITE`는 Datadog 사이트 [파라미터][2]입니다. 귀하의 사이트는 {{< region-param key="dd_site" code="true" >}}입니다. 기본값은 `datadoghq.com`입니다.
- `DD_SERVICE`는 이 프로그램에 사용된 서비스 이름입니다. 기본값은 `package.json`의 이름 필드 값입니다.
- `DD_START_APP`는 애플리케이션을 시작할 때 사용되는 명령입니다. 예를 들어, `node ./bin/www`입니다(Tomcat에서 실행하는 애플리케이션에는 필요 없음).

### 시작 명령 확인

기본 제공 런타임의 코드 배포 옵션으로 빌드된 Linux Azure App Service Web Apps의 경우 언어에 따라 시작 명령이 다릅니다. 기본값은 [Azure 설명서][7]에 안내되어 있습니다. 다음 예를 참고하세요.

`DD_START_APP` 환경 변수에서 이 값을 설정하세요. 아래 예는 `datadog-demo`라는 이름의 애플리케이션에 대한 예입니다.

| 런타임   | `DD_START_APP` 예시 값                                                               | 설명                                                                                                                                                                                                                        |
|-----------|--------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Node.js   | `node ./bin/www`                                                                           | [Node PM2 설정 파일][12]이나 스크립트 파일 실행.                                                                                                                                                                   |
| .NET Core | `dotnet datadog-demo.dll`                                                                  | 기본값으로 내 웹 앱 이름을 사용하는 `.dll` 파일 실행.<br /><br /> **참고**: 명령에서 사용하는 `.dll` 파일 이름이 내 `.dll` 파일 이름과 일치해야 합니다. 경우에 따라 일치하지 않을 수도 있습니다.         |
| PHP       | `cp /home/site/wwwroot/default /etc/nginx/sites-available/default && service nginx reload` | 스크립트를 바른 위치로 복사하고 애플리케이션 실행.                                                                                                                                                                           |
| 파이썬(Python)    | `gunicorn --bind=0.0.0.0 --timeout 600 quickstartproject.wsgi`                             | 커스텀 [시작 스크립트][13]. 이 예시에서는 Gunicorn 명령을 실행해 Django 앱을 시작합니다.                                                                                                                                      |
| Java      | `java -jar /home/site/wwwroot/datadog-demo.jar`                                            | 앱을 시작하는 명령. Tomcat에서 실행하는 애플리케이션에는 필요하지 않습니다.                                                                                                                                                                                                  |

[7]: https://learn.microsoft.com/en-us/troubleshoot/azure/app-service/faqs-app-service-linux#what-are-the-expected-values-for-the-startup-file-section-when-i-configure-the-runtime-stack-
[12]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux#configure-nodejs-server
[13]: https://learn.microsoft.com/en-us/azure/app-service/configure-language-php?pivots=platform-linux#customize-start-up


**참고**: 새 설정을 저장하면 애플리케이션이 재시작됩니다.

#### 일반 설정

{{< tabs >}}
{{% tab "Node, .NET, PHP, Python" %}}
**일반 설정**으로 가서 다음을 **시작 명령** 필드에 추가하세요:

```
curl -s https://raw.githubusercontent.com/DataDog/datadog-aas-linux/v1.7.0/datadog_wrapper | bash
```

{{< img src="serverless/azure_app_service/startup-command-1.jpeg" alt="Azure App Service 설정: Azure UI 설정 섹션 아래에 있는 스택 설정. 스택 아래 주 버전과 부 버전 필드에 '시작 명령' 필드가 있고 위의 curl 명령이 입력되어 있음." style="width:100%;" >}}
{{% /tab %}}
{{% tab "Java" %}}
릴리스에서 [`datadog_wrapper`][8] 파일을 다운로드하고 Azure CLI 명령을 사용하여 애플리케이션에 업로드합니다:

```
  az webapp deploy --resource-group <group-name> --name <app-name> --src-path <path-to-datadog-wrapper> --type=startup
```

[8]: https://github.com/DataDog/datadog-aas-linux/releases
{{% /tab %}}
{{< /tabs >}}

### 트레이스 보기

새 애플리케이션이 저장되면 Azure는 애플리케이션을 재시작합니다. 시작 명령을 추가하고 저장한 경우에는 재시작이 필요할 수 있습니다.

애플리케이션을 재시작한 후 Datadog의 [APM 서비스 페이지][4]에서 서비스 이름(`DD_SERVICE`)을 검색하여 트레이스를 볼 수 있습니다.

### 커스텀 메트릭

DogStatsD를 사용해 애플리케이션에 대한 커스텀 메트릭을 활성화하려면 애플리케이션 설정에서 `DD_CUSTOM_METRICS_ENABLED`를 추가하고 `true`로 설정하세요.

메트릭을 제출하도록 애플리케이션을 설정하려면 런타임에 맞는 적절한 단계를 따르세요.

- [Java][9]
- [Node][5]
- [.NET][6]
- [PHP][10]
- [Python][11]

## 문제 해결

예상과 다른 트레이스나 커스텀 메트릭 데이터일 경우, **App Service 로그**를 활성화하여 디버깅 로그를 받으세요.

{{< img src="serverless/azure_app_service/app-service-logs.png" alt="Azure App Service 설정: Azure UI 설정의 모니터링 섹션 아래에 있는 App Service 로그. '애플리케이션 로깅' 옵션이 '파일 시스템'으로 설정되어 있음." style="width:100%;" >}}

**로그 스트림**의 내용을 [Datadog 고객 지원팀][14]과 공유하세요.
## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/developers/dogstatsd
[2]: /ko/getting_started/site/#access-the-datadog-site
[3]: https://www.datadoghq.com/blog/azure-app-service-datadog-serverless-view/
[4]: /ko/tracing/services/service_page/
[5]: https://github.com/brightcove/hot-shots
[6]: /ko/developers/dogstatsd/?tab=hostagent&code-lang=dotnet#code
[9]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=hostagent&code-lang=java
[10]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=hostagent&code-lang=php
[11]: https://docs.datadoghq.com/ko/developers/dogstatsd/?tab=hostagent&code-lang=python
[14]: /ko/help