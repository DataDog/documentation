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
- link: https://app.datadoghq.com/release-notes?category=Serverless
  tag: 릴리스 노트
  text: 최신 서버리스 릴리스를 확인해 보세요! (앱 로그인 필요)
- link: https://www.datadoghq.com/state-of-serverless
  tag: 블로그
  text: 서버리스 상태
- link: /serverless/installation/
  tag: 설명서
  text: 서버리스 모니터링 설치
- link: https://www.datadoghq.com/blog/azure-container-apps/
  tag: 블로그
  text: Datadog으로 Azure 컨테이너 앱 모니터링
- link: https://dtdg.co/fe
  tag: 기초 활성화
  text: 대화형 세션에 참여해 서버리스 모니터링에 대해 자세히 알아보세요.
kind: 설명서
title: 서버리스
---

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/543362476/rendition/1080p/file.mp4?loc=external&signature=4927d13b131aea1e3b4f77efca5af49bb509f5e7f1d6ca06a5267ba02a8c194a" poster="/images/poster/serverless.png" >}}

<br/>

<div class="alert alert-info"><a href="https://chat.datadoghq.com/">Datadog Slack 커뮤니티</a>의 <a href="https://datadoghq.slack.com/archives/CFDPB83M4">#serverless</a> 채널에서 토론에 참여해 보세요.</div>

[Datadog 서버리스 모니터링][1]은 서버리스 컴퓨팅의 실시간 메트릭, 로그, 트레이스는 물론 완전 관리형 API, 대기열, 스트림, 데이터 저장소를 통합하여 서버리스 애플리케이션을 구동하는 모든 관리형 서비스에 대한 완벽한 가시성을 제공합니다.

Datadog에서는 [AWS Lambda](#aws-lambda), [Azure App Service](#azure-app-service), [Azure Container Apps](#azure-container-apps), [Google Cloud Run](#google-cloud-run)을 모니터링할 수 있는 솔루션을 제공합니다.

### AWS Lambda

[AWS Lambda 서버리스 모니터링][2]을 이용하면 AWS 리소스에서 높은 수준의 메트릭을 Lamda 함수와 연결할 수 있어 문제를 빠르게 발견하고, 문제 해결을 위한 조사를 시작할 수 있습니다.

[향상된 Lambda 메트릭][3]은 Datadog에서 접두사 `aws.lambda.enhanced`로 표시되며, 실시간 초 단위로 이용할 수 있습니다. Lambda 함수 전반에서 콜드 스타트, AWS 예상 비용, 시간 제한, 메모리 부족 오류, 메모리 사용 등에 알림이나 SLO을 설정해 향상된 Lambda 메트릭을 사용할 수 있습니다.

Datadog Lambda Extension이나 Datadog Forwarder Lambda를 사용해 로그와 트레이스에서 메트릭을 생성하여 Lamda 함수로부터 [커스텀 메트릭][4]을 전송할 수 있습니다.

[분산 추적][5]을 이용하면 서버리스 트레이스를 메트릭에 연결해 애플리케이션 성능에 대한 컨텍스트를 충분히 확인할 수 있습니다. Datadog Python, Node.js, Ruby, Go, Java, .NET 추적 라이브러리에서 AWS Lambda용 분산 추적을 지원합니다.

[디플로이먼트 추적][6]을 사용하면 서버리스 코드, 설정, 디플로이먼트 변경 사항을 함수의 메트릭, 트레이스, 로그와 연결할 수 있어 변경 사항이 애플리케이션 상태와 성능에 미치는 영향을 실시간으로 확인할 수 있습니다.

### AWS Step Functions (공개 베타)

AWS Step Functions는 개발자가 AWS에서 다단계 애플리케이션 워크플로를 생성하고 관리할 수 있게 해주는 서버리스 오케스트레이션 서비스입니다.

[AWS Step Functions 통합][13]의 메트릭과 로그를 모니터링하여 서버리스 앱 보기 내에서 클라우드 기반 텔레메트리를 확인하세요.

[실행 추적][14]을 통해 버그와 병목 현상을 식별합니다. 계단 함수에 대한 트레이스는 Step Function 로그에서 생성될 수 있으며 상태 시스템 실행 경로, 각 단계의 입력 및 출력, 단계 실행 길이를 포함한 세부적인 실행 정보를 제공합니다.

Datadog에 접두사 `aws.states.enhanced`가 붙은 강화된 Step Function 메트릭은 두 번째 세부 수준에서 사용 가능하며 Datadog 내에서 직접 생성됩니다.

### Azure 앱 서비스

[Azure 앱 서비스용 Datadog 확장][7]은 Azure 웹 앱에 대한 추적 기능을 제공합니다.

[Azure 앱 서비스 보기][8]를 사용하면:

- 지연 시간이 길거나 오류가 있는 앱을 빠르게 식별할 수 있습니다.

- 웹 앱, 함수 앱, 앱 서비스 플랜 사용을 추적할 수 있습니다.

- 활성 인스턴스 수를 시각화하고 어떤 앱이 실행 중이며, 어떤 앱이 Datadog에 트레이스 또는 로그를 제출하는지 확인하여 앱 서비스 요금제 비용에 대한 인사이트를 얻을 수 있습니다.

- 앱 서비스 플랜에서 실행 중인 앱을 매핑하여 비용이나 성능에 영향을 미칠 수 있는 앱을 식별할 수 있습니다.

Azure 앱 서비스용 Datadog 확장을 사용하여 Azure 웹 앱 추적할 수 있습니다. Azure에서 추적을 설정하는 방법은 [Azure 앱 서비스][7]를 참고하세요.

### Azure 컨테이너 앱

Azure 컨테이너 앱은 컨테이너 기반 애플리케이션을 배포하고 확장하기 위한 완전 관리형 서버리스 플랫폼입니다. Datadog은 [Azure 통합][9]을 통해 컨테이너 앱에 대한 모니터링 및 로그 수집을 제공합니다.

또 Datadog에서는 [컨테이너 앱 애플리케이션을 계측][10]하는 솔루션을 베타로 제공합니다. 추적, 커스텀 메트릭, 직접 로그 수집이 가능한 전용 에이전트를 지원합니다.

### Google Cloud Run

Google Cloud Run은 소규모의 단일 목적 함수를 만들 수 있는 경량 이벤트 기반 비동기 컴퓨팅 솔루션입니다. Google 클라우드 플랫폼에서 실행 중인 서버리스 함수를 모니터링하려면 [Google 클라우드 플랫폼 통합][11]을 활성화하세요.

또 Datadog에서는 [Cloud Run 애플리케이션을 계측][12]하는 솔루션을 공용 베타로 제공합니다. 추적, 커스텀 메트릭, 직접 로그 수집이 가능한 전용 에이전트를 지원합니다.

## 참고 자료

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://app.datadoghq.com/functions
[2]: /ko/serverless/aws_lambda
[3]: /ko/serverless/enhanced_lambda_metrics
[4]: /ko/serverless/custom_metrics
[5]: /ko/serverless/distributed_tracing
[6]: /ko/serverless/deployment_tracking
[7]: /ko/infrastructure/serverless/azure_app_services/#overview
[8]: https://app.datadoghq.com/functions?cloud=azure&config_serverless-azure-app=true&group=service
[9]: /ko/integrations/azure/#log-collection
[10]: /ko/serverless/azure_container_apps
[11]: /ko/integrations/google_cloud_platform/
[12]: /ko/serverless/google_cloud_run
[13]: /ko/integrations/amazon_step_functions
[14]: /ko/serverless/step_functions/installation