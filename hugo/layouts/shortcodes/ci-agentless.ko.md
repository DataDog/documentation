GitHub Actions나 CircleCI와 같이 기본 작업자 노드에 액세스하지 않고 클라우드 CI 공급자를 사용할 경우, 라이브러리를 구성해 에이전트리스 모드로 사용하세요. 이 모드를 이용하려면 다음 환경 변수를 설정하세요.

`DD_CIVISIBILITY_AGENTLESS_ENABLED=true` (필수)
: 에이전트리스 모드 활성화 또는 비활성화<br/>
**기본값**: `false`

`DD_API_KEY` (필수)
: 테스트 결과를 업로드하는 데 사용되는 [Datadog API 키][101]<br/>
**기본값**: `(empty)`

추가로 데이터를 보낼 [Datadog 사이트][102]를 구성하세요.

`DD_SITE` (필수)
: 결과를 업로드할 [Datadog 사이트][102]<br/>
**기본값**: `datadoghq.com`<br/>


[101]: https://app.datadoghq.com/organization-settings/api-keys
[102]: /getting_started/site/
