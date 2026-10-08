---
further_reading:
- link: /security/ai_guard/setup/automatic_integrations/
  tag: ドキュメント
  text: 自動インテグレーション
- link: /security/ai_guard/setup/sdk/
  tag: ドキュメント
  text: SDK
title: 手動インテグレーション
---
{{< site-region region="gov" >}}<div class="alert alert-danger">AI Guard は {{< region-param key="dd_site_name" >}} サイトでは利用できません。</div>
{{< /site-region >}}

手動インテグレーションでは、AI Guard 保護を有効にするために追加の構成が必要です。各フレームワークの手順に従って、AI Guard の評価を設定します。

## サポート対象のフレームワークとライブラリ {#supported-frameworks-and-libraries}

<div class="alert alert-tip">Amazon Strands および LiteLLM Proxy では、手動インテグレーションがサポートされています。その他のフレームワーク、またはカスタム LLM やツール呼び出しコードについては、<a href="/security/ai_guard/setup/sdk/">SDK</a> を使用して <code>evaluate()</code> コード内で呼び出します。</div>

### Python {#python}

| フレームワーク                         | サポートされているバージョン | SDK バージョン |
| --------------------------------- | ------------------ | -------------- |
| [Amazon Strands](#amazon-strands) | >= 1.29.0          | >= 4.7.0       |
| [LiteLLM Proxy](#litellm-proxy)   | >= 1.78.5          | >= 4.8.0       |

{{< partial name="security-platform/aiguard-sdk-setup.html" target="manual" >}}

## Integrations {#integrations}

### Amazon Strands {#amazon-strands}
#### Python {#python-1}

Amazon Strands インテグレーションにより、[Amazon Strands Agents SDK][1] で構築されたアプリケーションで AI Guard の評価を実行できます。

##### セットアップ {#setup}

dd-trace-py v4.7.0 以降をインストールします。

```shell
pip install ddtrace>=4.7.0
```

次に、プラグインまたはフックプロバイダーを使用して、インテグレーションのエントリポイントを定義します。

* プラグイン (推奨):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsPlugin

agent = Agent(
    model=model,
    plugins=[AIGuardStrandsPlugin()]
)
```

* HookProvider (レガシー):

```python
from ddtrace.appsec.ai_guard import AIGuardStrandsHookProvider

agent = Agent(
    model=model,
    hooks=[AIGuardStrandsHookProvider()]
)
```

[1]: https://github.com/strands-agents/sdk-python

### LiteLLM Proxy {#litellm-proxy}
#### Python {#python-2}

LiteLLM Proxy インテグレーションにより、[LiteLLM Proxy][1] を使用するアプリケーションで AI Guard の評価を実行できます。

##### セットアップ {#setup-1}

dd-trace-py v4.8.0 以降をインストールします。

```shell
pip install ddtrace>=4.8.0
```

構成ファイルの横に Datadog の LiteLLM ガードレールをインポートします (例: `guardrails.py`)。

```python
from ddtrace.appsec.ai_guard.integrations.litellm import DatadogAIGuardGuardrail

__all__ = ["DatadogAIGuardGuardrail"]
```

インポートしたガードレールを構成ファイルに追加します。

```yaml
guardrails:
  - guardrail_name: datadog_ai_guard
    litellm_params:
      guardrail: guardrails.DatadogAIGuardGuardrail
      mode: [pre_call, post_call]
      on_input: true
      on_output: true
      block: true
```

このガードレールは、`pre_call`、`post_call`、`during_call` の 3 つのモードすべてをサポートしています。

デフォルトでは、ガードレールは AI Guard サービスの設定で指定されたブロック設定に従います。ブロックを無効にするには、`block` パラメーターを `false` に設定します ([SDK][2] および [REST API][3] の `block` オプションと同等です)。

[1]: https://docs.litellm.ai/docs/simple_proxy
[2]: /ja/security/ai_guard/setup/sdk/
[3]: /ja/security/ai_guard/setup/http_api/

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}