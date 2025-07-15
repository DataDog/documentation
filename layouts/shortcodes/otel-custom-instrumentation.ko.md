## 개요

Datadog 추적 라이브러리는 코드 계측을 위해 [OpenTelemetry API][101]를 구현 기능을 제공합니다. 이에 따라 공급 업체와 무관하게 모든 서비스를 계측하면서도 Datadog의 네이티브 구현, 기능, 제품의 장점을 모두 이용할 수 있습니다. Datadog 스타일 스팬과 트레이스를 생성해 Datadog 추적 라이브러리에서 내 언어에 맞게 처리하여 Datadog로 전송할 수 있습니다.

OpenTelemetry API로 코드를 계측하면 다음을 할 수 있습니다.

- 코드가 공급 업체와 무관하게 API 호출을 할 수 있습니다.
- 컴파일링할 때 코드가 Datadog 추적 라이브러리에 의존하지 않습니다(런타임에만 필요).
- 코드가 사용되지 않는 OpenTracing API를 사용하지 않습니다.

계측된 애플리케이션에서 OpenTelemetry SDK를 Datadog 추적 라이브러리로 대체하세요. 그러면 실행 코드로 생성된 트레이스와 Datadog 전용 제품 내 Datadog 트레이스를 처리, 분석, 모니터링할 수 있습니다.

자세한 내용은 [OpenTelemetry API 상호 운용성 및 Datadog의 계측된 트레이스][103]을 참고하세요.

Datadog 추적 라이브러리를 여기에 안내된 대로 구성하면 OpenTelemetry 계측된 코드로 생성된 스팬과 트레이스를 허용하고, 텔레메트리를 처리해 Datadog로 전송합니다. 예를 들어 코드를 OpenTelemetry API로 이미 계측했거나 OpenTelemetry API로 계측하고 싶고, 코드를 변경하지 않고 Datadog 추적 라이브러리 사용의 장점을 활용하고 싶을 때 이 방법을 사용할 수 있습니다.

OpenTelemetry로 코드를 계측한 후 _Datadog 추적 라이브러리를 통하지 않고_ 스팬 데이터를 Datadog로 전송하는 방법을 모색 중인 경우 [Datadog 내 OpenTelemetry][102]를 참고하세요.


[101]: https://opentelemetry.io/docs/reference/specification/trace/api
[102]: /opentelemetry/
[103]: /opentelemetry/guide/otel_api_tracing_interoperability/