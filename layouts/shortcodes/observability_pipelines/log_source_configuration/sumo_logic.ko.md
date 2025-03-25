## 로그를 Sumo Logic HTTP Source을 통해 Observability Pipelines Worker로 보내기

Observability Pipelines Worker를 설치하고 구성을 배포하면  Worker에서는 Sumo Logic HTTP Source API][1001]를 사용하는 HTTP 엔드포인트를 노출합니다.

Sumo Logic HTTP Source로 로그를 전송하려면 기존 로그 업스트림을 Worker로 가리켜야 합니다.
```shell
curl -v -X POST -T [local_file_name] http://<OPW_HOST>/receiver/v1/http/<UNIQUE_HTTP_COLLECTOR_CODE>
```
`<OPW_HOST>`는 Observability Pipelines Worker와 연결된 호스트(또는 로드 밸런서)의 IP/URL입니다. CloudFormation를 설치할 때 `LoadBalancerDNS` CloudFormation 출력에 사용할 바른 URL이 있으니 참고하세요. Kubernetes를 설치할 경우에는 Observability Pipelines Worker의 내부 DNS 레코드를 사용할 수 있습니다(예: `opw-observability-pipelines-worker.default.svc.cluster.local`).

`<UNIQUE_HTTP_COLLECTOR_CODE>`는 [Observability Pipelines Worker](#install-the-observability-pipelines-worker) 단계에서 입력한 HTTP 소스의 업로드 URL에서 슬래시(`/`) 뒤에 오는 문자열입니다. 

이 지점부터 로그가 Worker로 이동하고 파이프라인에서 처리된 후 구성된 대상으로 전달됩니다.

[1001]: https://help.sumologic.com/docs/send-data/hosted-collectors/http-source/logs-metrics/upload-logs/