---
aliases:
- /ko/graphing/infrastructure/cloudfunctions
- /ko/graphing/infrastructure/serverless_functions
- /ko/graphing/infrastructure/serverless/
- /ko/infrastructure/serverless/
- /ko/tracing/serverless_functions/datadog_apm
- /ko/integrations/amazon_lambda/docs.datadoghq.com/serverless/
cascade:
  algolia:
    rank: 70
further_reading:
- link: /serverless/installation/
  tag: 문서
  text: Serverless Monitoring 설치
- link: https://dtdg.co/fe
  tag: 기반 활성화
  text: 대화형 세션에 참여해 Serverless Monitoring 더 알아보기
- link: https://www.datadoghq.com/state-of-serverless
  tag: 블로그
  text: Serverless 상태
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: 블로그
  text: Datadog으로 Azure 컨테이너 앱 모니터링
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: 릴리스 노트
  text: 최신 Serverless 릴리스를 확인해 보세요! (앱 로그인 필요).
title: Serverless
---
{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info"><a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> 채널에서 진행 중인 논의를 <a href="https://chat.datadoghq.com/">Datadog Slack 커뮤니티</a>에서 확인해 보세요.</div>

{{< learning-center-callout header="활성화 웨비나 세션 참가" hide_image="true" btn_title="등록" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Serverless">}}
Serverless Monitoring을 통해 팀이 민첩성을 유지하고 운영 오버헤드를 줄이면서 수익을 창출하는 애플리케이션 구축에 시간을 집중하는 방법을 알아보세요.
{{< /learning-center-callout >}}

[Datadog Serverless Monitoring][1]은 Serverless 컴퓨팅의 실시간 메트릭, 로그, 트레이스는 물론 완전 관리형 API, 대기열, 스트림, 데이터 저장소를 통합하여 서버리스 애플리케이션을 구동하는 모든 관리형 서비스에 대한 완벽한 가시성을 제공합니다.

Datadog은 [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure 컨테이너 앱](#azure-container-apps) 및 [Google Cloud Run](#google-cloud-run)을 모니터링하기 위한 솔루션을 제공합니다.

### AWS Lambda {#aws-lambda}

[AWS Lambda용 Serverless Monitoring][2]을 이용하면 AWS 리소스에서 높은 수준의 메트릭을 Lambda 함수와 연결할 수 있어 문제를 빠르게 발견하고, 문제 해결을 위한 조사를 시작할 수 있습니다.

Datadog에 접두사 `aws.lambda.enhanced`가 붙은 [향상된 Lambda 메트릭][3]은 초 단위로 세분화되어 거의 실시간으로 제공됩니다. 향상된 Lambda 메트릭을 사용하여 모든 Lambda 함수에 걸쳐 콜드 스타트, 예상 AWS 비용, 시간 초과, 메모리 부족 오류 및 메모리 사용량에 대한 경보나 SLO를 설정할 수 있습니다.

Datadog Lambda Extension이나 Datadog Forwarder Lambda를 사용해 로그와 트레이스에서 메트릭을 생성하여 Lambda 함수로부터 [사용자 지정 메트릭][4]을 전송할 수 있습니다.

[분산 트레이싱][5]을 사용하면 Serverless 트레이스를 메트릭에 연결하여 애플리케이션 성능에 대한 풍부한 컨텍스트를 파악할 수 있습니다. Datadog Python, Node.js, Ruby, Go, Java 및 .NET SDK는 AWS Lambda에 대한 분산 트레이싱을 지원합니다.

[배포 추적][6]을 사용하면 Serverless 코드, 구성, 배포 변경 사항을 함수의 메트릭, 트레이스, 로그와 연결할 수 있어 변경 사항이 애플리케이션 상태와 성능에 미치는 영향을 실시간으로 확인할 수 있습니다.

### AWS Step Functions {#aws-step-functions}

AWS Step Functions는 개발자가 AWS에서 다단계 애플리케이션 워크플로를 생성하고 관리할 수 있게 해주는 Serverless 오케스트레이션 서비스입니다.

[AWS Step Functions 통합][13]의 메트릭과 로그를 모니터링하여 {{< ui >}}Serverless{{< /ui >}} 앱 뷰 내에서 클라우드 네이티브 텔레메트리를 확인하세요.

[실행 추적][14]을 통해 버그와 병목 현상을 파악할 수 있습니다. Step Functions에 대한 트레이스는 Step Function 로그에서 생성될 수 있으며 상태 머신 실행 경로, 각 단계의 입력 및 출력, 단계 실행 길이를 포함한 세부적인 실행 정보를 제공합니다.

Datadog에 접두사 `aws.states.enhanced`가 붙은 향상된 Step Function 메트릭은 초 단위 세분화로 제공되며 Datadog 내에서 직접 생성됩니다.

### Azure App Service {#azure-app-service}

[Azure App Service용 Datadog 확장][7]은 Azure 웹 앱에 대한 트레이싱 기능을 제공합니다.

[{{< ui >}}Azure App Service{{< /ui >}} 뷰][8]를 사용하여 다음을 수행하세요.

- 지연 시간이 길거나 오류가 있는 앱을 빠르게 식별

- 웹 앱, 함수 앱 및 App Service 플랜 사용 추적

- 활성 인스턴스 수를 시각화하고 트레이스 또는 로그를 Datadog으로 전송하는 앱을 실행 중인 인스턴스를 확인하여 App Service 플랜 비용에 대한 인사이트 획득

- App Service 플랜에서 실행 중인 앱을 매핑하여 비용이나 성능에 영향을 미칠 수 있는 앱 식별

Azure App Service용 Datadog 확장은 Azure 웹 앱에 대한 트레이싱 기능을 제공합니다. Azure에서 트레이싱을 설정하는 방법에 대한 자세한 내용은 [Azure App Service][7]를 참조하세요.

### Azure 컨테이너 앱 {#azure-container-apps}

Azure 컨테이너 앱은 컨테이너 기반 애플리케이션을 배포하고 확장하기 위한 완전 관리형 Serverless 플랫폼입니다. Datadog은 [Azure 통합][9]을 통해 컨테이너 앱에 대한 모니터링 및 로그 수집을 제공합니다.

또한 Datadog은 Serverless Agent를 사용하여 [컨테이너 앱을 계측][10]하고 트레이싱, 사용자 지정 메트릭, 직접 로그 수집을 가능하게 하는 솔루션을 제공합니다.

### Google Cloud Run {#google-cloud-run}

Google Cloud Run은 소규모의 단일 기능 함수를 생성할 수 있는 이벤트 기반 비동기식 경량 컴퓨팅 솔루션입니다. Google Cloud Platform에서 실행되는 Serverless 함수를 모니터링하려면 [Google Cloud Platform 통합][11]을 활성화하세요.

또한 Datadog은 Serverless Agent를 사용하여 [Cloud Run 애플리케이션을 계측][12]하고 트레이싱, 사용자 지정 메트릭, 직접 로그 수집을 가능하게 하는 솔루션을 제공합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ko/serverless/aws_lambda
[3]: /ko/serverless/enhanced_lambda_metrics
[4]: /ko/serverless/custom_metrics
[5]: /ko/serverless/distributed_tracing
[6]: /ko/serverless/deployment_tracking
[7]: /ko/serverless/azure_app_service/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /ko/integrations/azure/#log-collection
[10]: /ko/serverless/azure_container_apps
[11]: /ko/integrations/google_cloud_platform/
[12]: /ko/serverless/google_cloud_run
[13]: /ko/integrations/amazon_step_functions
[14]: /ko/serverless/step_functions/installation