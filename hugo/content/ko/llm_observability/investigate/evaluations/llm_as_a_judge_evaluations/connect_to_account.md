---
aliases:
- /ko/llm_observability/evaluations/custom_llm_as_a_judge_evaluations/connect_to_account/
- /ko/llm_observability/configure/evaluations/llm_as_a_judge_evaluations/connect_to_account/
description: judge LLM 기반 평가를 지원하기 위해 LLM 공급자 계정에 연결하는 방법
further_reading:
- link: /llm_observability/investigate/evaluations/llm_as_a_judge_evaluations
  tag: 설명서
  text: 사용자 지정 LLM-as-a-judge 평가에 대해 알아보기
title: LLM 공급자 계정 연결
---
## LLM 공급자 계정 연결 {#connect-your-llm-provider-account}

BYOK(Bring-Your-Own-Key) 평가에 사용할 LLM 공급자를 구성합니다. 이 단계는 한 번만 완료하면 됩니다.

{{< tabs >}}
{{% tab "OpenAI" %}}

<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 OpenAI 계정에만 연결해야 합니다.</div>

OpenAI API 키를 사용하여 OpenAI 계정을 Agent Observability에 연결합니다.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. OpenAI 타일에서 {{< ui >}}Connect{{< /ui >}}를 선택합니다.
1. 타일의 지침을 따릅니다.
   - OpenAI API 키를 제공합니다. 이 키에 {{< ui >}}model capabilities{{< /ui >}}에 대한 {{< ui >}}write{{< /ui >}} 권한이 있는지 확인하세요.
1. {{< ui >}}Use this API key to evaluate your LLM applications{{< /ui >}}를 활성화합니다.
1. Agent Observability는 선택한 모델에 대해 `complete/chat` API 엔드포인트를 사용할 수 있어야 합니다. 이 엔드포인트를 지원하는 모델에 대한 자세한 내용은 [OpenAI의 모델 개요 페이지][3]를 참조하세요.

{{< img src="llm_observability/configuration/openai-tile.png" alt="Agent Observability의 OpenAI 구성 타일. OpenAI를 구성하고 OpenAI API 키를 제공하기 위한 지침을 나열합니다." style="width:100%;" >}}

Agent Observability는 OpenAI에 대한 [데이터 레지던시][2]를 지원하지 않습니다.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/guides/your-data#which-models-and-features-are-eligible-for-data-residency
[3]: https://developers.openai.com/api/docs/models
{{% /tab %}}
{{% tab "Azure OpenAI" %}}

<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 Azure OpenAI 계정에만 연결해야 합니다.</div>

OpenAI API 키를 사용하여 Azure OpenAI 계정을 Agent Observability에 연결합니다. 평가를 위해 `GPT-4o mini` 모델을 사용하는 것이 매우 좋습니다. 선택한 모델 버전은 [구조화된 출력][8]을 지원해야 하며 Chat Completions API를 사용할 수 있어야 합니다. [호환되는 모델의 전체 목록][9]을 참조하세요.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. Azure OpenAI 타일에서 {{< ui >}}Connect{{< /ui >}}를 선택합니다.
1. 타일의 지침을 따릅니다.
   - Azure OpenAI API 키를 제공합니다. 이 키에 {{< ui >}}model capabilities{{< /ui >}}에 대한 {{< ui >}}write{{< /ui >}} 권한이 있는지 확인하세요.
   - 통합을 완료하려면 리소스 이름, 배포 ID 및 API 버전을 제공합니다.

{{< img src="llm_observability/configuration/azure-openai-tile.png" alt="Agent Observability의 Azure OpenAI 구성 타일. Azure OpenAI 구성 및 본인의 API 키, 리소스 이름, 배포 ID, API 버전 제공에 대한 지침을 나열합니다." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[8]: https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/structured-outputs
[9]: https://learn.microsoft.com/en-us/azure/foundry/foundry-models/concepts/models-sold-directly-by-azure?tabs=global-standard-aoai%2Cglobal-standard&pivots=azure-openai
{{% /tab %}}
{{% tab "Anthropic" %}}

<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 Anthropic 계정에만 연결해야 합니다.</div>

Anthropic API 키를 사용하여 Anthropic 계정을 Agent Observability에 연결합니다.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. Anthropic 타일에서 {{< ui >}}Connect{{< /ui >}}를 선택합니다.
1. 타일의 지침을 따릅니다.
   - Anthropic API 키를 제공합니다. 이 키에 {{< ui >}}model capabilities{{< /ui >}}에 대한 {{< ui >}}write{{< /ui >}} 권한이 있는지 확인하세요.

{{< img src="llm_observability/configuration/anthropic-tile.png" alt="Agent Observability의 Anthropic 구성 타일. Anthropic 구성 및 자신의 Anthropic API 키 제공에 대한 지침을 나열합니다." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
{{% /tab %}}
{{% tab "Amazon Bedrock" %}}

<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 Amazon Bedrock 계정에만 연결해야 합니다.</div>

AWS 계정을 사용하여 Amazon Bedrock 계정을 Agent Observability에 연결합니다.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. Amazon Bedrock 타일에서 {{< ui >}}Connect{{< /ui >}}를 선택합니다.
1. 타일의 지침을 따릅니다.

   {{< img src="llm_observability/configuration/amazon-bedrock-tile.png" alt="Agent Observability의 Amazon Bedrock 구성 타일. Amazon Bedrock 구성에 대한 지침을 나열합니다." style="width:100%;" >}}

4. 평가를 실행하려면 {{< ui >}}Invoke models from Amazon Bedrock{{< /ui >}} 역할을 구성합니다. InvokeModel 작업에 대한 자세한 내용은 [Amazon Bedrock API 참조 문서][2]에서 확인할 수 있습니다.


   {{< img src="llm_observability/configuration/amazon-bedrock-tile-step-2.png" alt="사용자가 통합 계정에 권한을 추가해야 하는 Amazon Bedrock 구성의 두 번째 단계입니다." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeModel.html
{{% /tab %}}

{{% tab "GCP Vertex AI" %}}

<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 Google Cloud Platform 계정에만 연결해야 합니다.</div>

Google Cloud Platform 계정으로 Vertex AI를 Agent Observability에 연결합니다.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. Google Cloud Vertex AI 타일에서 {{< ui >}}Connect{{< /ui >}}를) 클릭하여 새 GCP 계정을 추가하거나, 기존 계정이 나열된 곳 옆의 {{< ui >}}Configure{{< /ui >}}를 클릭하여 온보딩 프로세스를 시작합니다.
   - 이 페이지에서 Datadog에 연결된 모든 GCP 계정을 확인할 수 있습니다. 하지만 Agent Observability에서 계정을 사용하려면 여전히 온보딩 프로세스를 거쳐야 합니다.
1. 온보딩 지침에 따라 계정을 구성합니다.
   - 계정에 [{{< ui >}}Vertex AI User{{< /ui >}}][2] 역할을 추가하고 [{{< ui >}}Vertex AI API{{< /ui >}}][3]를 활성화합니다.

{{< img src="llm_observability/configuration/vertex-ai-pint.png" alt="Vertex AI 온보딩 워크플로. Agent Observability에서 사용할 수 있도록 올바른 Vertex AI 권한으로 GCP 서비스 계정을 구성하는 단계를 따르세요." style="width:100%;" >}}

**참고**: 평가를 실행할 때 위치 선택기에서 단일 리전, 다중 리전 및 글로벌 옵션을 제공합니다. 각 옵션에 대한 자세한 내용은 [Google Vertex AI 위치 문서][4]를 참조하세요.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://docs.cloud.google.com/vertex-ai/docs/general/access-control#aiplatform.user
[3]: https://console.cloud.google.com/apis/library/aiplatform.googleapis.com
[4]: https://docs.cloud.google.com/gemini-enterprise-agent-platform/resources/locations
{{% /tab %}}

{{% tab "AI Gateway" %}}
<div class="alert alert-danger">HIPAA 적용 대상인 경우 BAA(비즈니스 제휴 계약)의 적용을 받고 HIPAA 규정 준수를 위한 모든 요구 사항을 충족하는 AI Gateway에만 연결해야 합니다.</div>

AI Gateway는 [OpenAI API 사양][2]과 호환되어야 합니다.

기본 URL, API 키 및 헤더를 사용하여 AI Gateway를 Agent Observability에 연결합니다.

1. Datadog에서 [{{< ui >}}Agent Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}} > {{< ui >}}Integrations{{< /ui >}}][1]로 이동합니다.
1. 클릭한 후, {{< ui >}}Configure{{< /ui >}} 탭에서 {{< ui >}}New{{< /ui >}}를 클릭하여 새 게이트웨이를 생성합니다.
1. 타일의 지침을 따릅니다.
   - 게이트웨이 이름을 입력합니다.
   - 공급자를 선택합니다.
   - 기본 URL을 입력합니다.
   - API 키와 필요시 헤더를 입력합니다.

{{< img src="llm_observability/configuration/ai-gateway-tile-3.png" alt="Agent Observability의 AI Gateway 구성 타일. AI Gateway 구성에 대한 지침을 나열합니다." style="width:100%;" >}}

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: https://platform.openai.com/docs/api-reference/introduction
{{% /tab %}}
{{< /tabs >}}

LLM 공급자가 IP 주소를 제한하는 경우 [Datadog의 IP 범위 문서][2]를 방문하여 `Datadog Site`를 선택하고 `GET` URL을 브라우저에 붙여넣은 다음 `webhooks` 섹션을 복사하여 필요한 IP 범위를 얻을 수 있습니다.

[1]: https://app.datadoghq.com/llm/settings/integrations
[2]: /ko/api/latest/ip-ranges/