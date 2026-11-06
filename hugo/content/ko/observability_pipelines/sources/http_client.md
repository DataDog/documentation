---
description: Observability Pipelines Worker를 사용하여 업스트림 HTTP/S 서버에서 로그를 가져오는 방법을 알아보세요.
disable_toc: false
products:
- icon: logs
  name: 로그
  url: /observability_pipelines/configuration/?tab=logs#pipeline-types
title: HTTP/S 클라이언트 소스
---
{{< product-availability >}}

## 개요 {#overview}

Observability Pipelines의 HTTP/S 클라이언트 소스를 사용하여 업스트림 HTTP/S 서버에서 로그를 가져오세요.

## 전제 조건 {#prerequisites}

{{% observability_pipelines/prerequisites/http_client %}}

## 설정 {#setup}

<div class="alert alert-danger">시크릿 관리: HTTP/S 클라이언트 엔드포인트 URL의 식별자와 해당하는 경우 인증 방식에 사용되는 시크릿 및 TLS 키 암호의 식별자만 입력하세요. 실제 값은 입력하지 <b>마세요</b>.</div>

[파이프라인을 설정할 때][1] 이 소스를 설정하세요. 파이프라인은 [UI][3], [API][4] 또는 [Terraform][5]을 사용하여 설정할 수 있습니다. 이 섹션의 지침은 UI에서 소스를 설정하기 위한 것입니다.

파이프라인 UI에서 HTTP/S 클라이언트 소스를 선택한 후 다음 단계를 따르세요.

1. HTTP/S 클라이언트 엔드포인트 URL의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. 인증 방식을 선택합니다. 선택한 방식에 따라 다음을 설정하세요.
   - {{< ui >}}Basic{{< /ui >}}:
      - HTTP/S 클라이언트 사용자 이름의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
      - HTTP/S 클라이언트 비밀번호의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
   - {{< ui >}}Bearer{{< /ui >}}: 베어러 토큰의 식별자를 입력합니다. 비워두면 [기본값](#secret-defaults)이 사용됩니다.
1. HTTP 메시지에 사용할 디코더를 선택합니다. HTTP 소스에서 가져온 로그는 이 형식이어야 합니다.

{{% observability_pipelines/secrets_env_var_note %}}

### 선택적 설정 {#optional-settings}

#### TLS 활성화 {#enable-tls}

{{% observability_pipelines/tls_settings %}}

#### 스크랩 설정 {#scrape-settings}

- 스크랩 간격을 입력합니다.
   - HTTP 서버는 이 간격으로 GET 요청을 처리할 수 있어야 합니다.
   - 요청은 동시에 실행되므로 스크랩에 지정된 간격보다 오래 걸리면 새 스크랩이 시작되어 추가 리소스가 소비될 수 있습니다. 이를 방지하려면 타임아웃을 스크랩 간격보다 짧게 설정하세요.
- 각 스크랩 요청의 타임아웃을 입력합니다.

## 시크릿 기본값 {#secret-defaults}

{{% observability_pipelines/set_secrets_intro %}}

{{< tabs >}}
{{% tab "시크릿 관리" %}}

- HTTP/S 클라이언트 엔드포인트 URL 식별자:
	- Observability Pipelines Worker가 로그 이벤트를 수집하는 엔드포인트를 참조합니다.
	- 기본 식별자는 `SOURCE_HTTP_CLIENT_ENDPOINT_URL`입니다.
- HTTP/S 클라이언트 TLS 암호 식별자(TLS가 활성화된 경우):
	- 기본 식별자는 `SOURCE_HTTP_CLIENT_KEY_PASS`입니다.
- 기본 인증을 사용하는 경우:
	- HTTP/S 클라이언트 사용자 이름 식별자:
		- 기본 식별자는 `SOURCE_HTTP_CLIENT_USERNAME`입니다.
	- HTTP/S 클라이언트 비밀번호 식별자:
		- 기본 식별자는 `SOURCE_HTTP_CLIENT_PASSWORD`입니다.
- Bearer 인증을 사용하는 경우:
	- HTTP/S 클라이언트 베어러 토큰 식별자:
		- 기본 식별자는 `SOURCE_HTTP_CLIENT_BEARER_TOKEN`입니다.

{{% /tab %}}

{{% tab "환경 변수" %}}

{{% observability_pipelines/configure_existing_pipelines/source_env_vars/http_client %}}

{{% /tab %}}
{{< /tabs >}}

[1]: /ko/observability_pipelines/configuration/set_up_pipelines/
[3]: https://app.datadoghq.com/observability-pipelines
[4]: /ko/api/latest/observability-pipelines/
[5]: https://registry.terraform.io/providers/datadog/datadog/latest/docs/resources/observability_pipeline