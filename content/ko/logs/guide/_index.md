---
cascade:
  algolia:
    category: 지침
    rank: 20
    subcategory: 로그 지침
disable_toc: true
kind: 지침
private: true
title: 로그 지침
---

{{< whatsnext desc="LimitsTM 없이 로그 수집" >}}
    {{< nextlink href="logs/guide/access-your-log-data-programmatically" >}}로그 검색 API를 이용해 로그 데이터에 프로그래밍을 활용해 액세스{{< /nextlink >}}
    {{< nextlink href="logs/guide/getting-started-lwl" >}}LimitsTM 지침 없이 로그 수집{{< /nextlink >}}
    {{< nextlink href="logs/guide/correlate-logs-with-metrics" >}}메트릭과 로그 연관짓기{{< /nextlink >}}
    {{< nextlink href="logs/guide/best-practices-for-log-management" >}}로그 관리 모범 사례{{< /nextlink >}}
    {{< nextlink href="logs/guide/manage_logs_and_metrics_with_terraform" >}}Terraform으로 로그 및 메트릭 관리{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="로그 수집" >}}
    {{< nextlink href="/agent/logs/advanced_log_collection" >}}고급 로그 수집 설정{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/" >}}Datadog Kinesis Firehose 대상으로 AWS 서비스 로그 전송하기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/sending-events-and-logs-to-datadog-with-amazon-eventbridge-api-destinations/" >}}Amazon EventBridge API 대상으로 Datadog에 이벤트 및 로그 전송하기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/forwarder/" >}}Datadog Lambda 포워더 설정{{< /nextlink >}}
    {{< nextlink href="/logs/guide/apigee" >}}Apigee 로그 수집{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-logging-guide/" >}}Datadog에 Azure 로그 전송{{< /nextlink >}}
    {{< nextlink href="/logs/guide/azure-native-logging-guide/" >}}Datadog 리소스에 Azure 로그 전송{{< /nextlink >}}
    {{< nextlink href="/integrations/google_cloud_platform/#log-collection" >}}Datadog 데이터플로우 템플릿으로  Google Cloud 로그 수집{{< /nextlink >}}
    {{< nextlink href="/logs/guide/collect-google-cloud-logs-with-push/" >}}Pub/Sub 푸시 구독으로 Google Cloud 로그 수집{{< /nextlink >}}    
    {{< nextlink href="logs/guide/collect-heroku-logs" >}}Heroku 로그 수집{{< /nextlink >}}
    {{< nextlink href="/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/" >}}Datadog Lambda 함수로 AWS 서비스 로그 전송하기{{< /nextlink >}}
    {{< nextlink href="logs/guide/log-collection-troubleshooting-guide" >}}로그 수집 트러블슈팅 지침{{< /nextlink >}}
    {{< nextlink href="logs/guide/docker-logs-collection-troubleshooting-guide" >}}도커 로그 수집 트러블슈팅 지침{{< /nextlink >}}
    {{< nextlink href="logs/guide/lambda-logs-collection-troubleshooting-guide" >}}Lambda 로그 수집 트러블슈팅 지침{{< /nextlink >}}
    {{< nextlink href="logs/guide/setting-file-permissions-for-rotating-logs" >}}로그 회전용 파일 권한 설정(Linux){{< /nextlink >}}
    {{< nextlink href="/logs/guide/how-to-set-up-only-logs" >}}로그 수집에만 Datadog 에이전트 사용하기{{< /nextlink >}}
    {{< nextlink href="logs/guide/increase-number-of-log-files-tailed" >}}에이전트가 테일링(tailing)하는 로그 파일 개수 늘리기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/container-agent-to-tail-logs-from-host" >}}컨테이너 에이전트를 사용하여 호스트의 로그 추적{{< /nextlink >}}
    {{< nextlink href="/logs/guide/mechanisms-ensure-logs-not-lost" >}}로그 데이터가 손실되지 않도록 하는 메커니즘{{< /nextlink >}}
    {{< nextlink href="/logs/guide/custom-log-file-with-heightened-read-permissions" >}}읽기 권한 강화로 사용자 지정 로그 파일에서 로그 전송하기{{< /nextlink >}}   
    {{< nextlink href="/logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose" >}}Kinesis Data Firehose로 AWS EKS Fargate 로그 전송하기{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="로그 처리" >}}
    {{< nextlink href="logs/guide/log-parsing-best-practice" >}}로그 파싱 모범 사례{{< /nextlink >}}
    {{< nextlink href="/logs/guide/commonly-used-log-processing-rules" >}}일반적으로 사용되는 로그 처리 규칙{{< /nextlink >}}
    {{< nextlink href="/logs/guide/logs-not-showing-expected-timestamp" >}}예상되는 타임스탬프가 표시되지 않는 로그{{< /nextlink >}}
    {{< nextlink href="/logs/guide/remap-custom-severity-to-official-log-status" >}}공식 로그 상태에 사용자 지정 심각도 값 리맵핑하기{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-show-info-status-for-warnings-or-errors" >}}경고 또는 오류 상태 정보를 표시하는 로그{{< /nextlink >}} 
{{< /whatsnext >}}

<br>

{{< whatsnext desc="로그 쿼리" >}}
    {{< nextlink href="logs/guide/collect-multiple-logs-with-pagination" >}}로그 목록 API 및 페이지 지정 기능으로 다중 로그 수집하기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/build-custom-reports-using-log-analytics-api/?tab=table" >}}로그 분석 API를 활용해 사용자 지정 리포트 생성하기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/detect-unparsed-logs/" >}}언파싱 로그 모니터링 및 쿼리{{< /nextlink >}}
{{< /whatsnext >}}

<br>

{{< whatsnext desc="민감한 데이터 관리" >}}
    {{< nextlink href="logs/guide/logs-rbac" >}}로그용 RBAC 설정 방법{{< /nextlink >}}
    {{< nextlink href="logs/guide/logs-rbac-permissions" >}}로그 RBAC 권한에 대해 더 알아보기{{< /nextlink >}}
    {{< nextlink href="/logs/guide/restrict-access-to-sensitive-data-with-rbac/" >}}쿼리 기반 액세스 컨트롤로 민감한 데이터 접근 제한하기{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog 통합" >}}
    {{< nextlink href="logs/guide/ease-troubleshooting-with-cross-product-correlation" >}}범프로덕트 상관관계를 활용한 쉬운 트러블슈팅{{< /nextlink >}}
{{< /whatsnext >}}