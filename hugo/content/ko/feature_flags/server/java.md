---
description: Java 애플리케이션용 Datadog Feature Flags를 설정하세요.
further_reading:
- link: /feature_flags/server/
  tag: 문서
  text: 서버 측 Feature Flags
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/java/
  tag: 문서
  text: Java APM 및 분산 트레이싱
- link: /feature_flags/guide/server_flag_evaluation_metrics/
  tag: 가이드
  text: 서버 측 플래그 평가 메트릭 설정
- link: /feature_flags/guide/apm_trace_enrichment/
  tag: 가이드
  text: Feature Flags에 대한 APM 트레이스 보강 설정
- link: /feature_flags/concepts/flag_graphs/
  tag: 개념
  text: Feature Flag 그래프
- link: /feature_flags/concepts/configuration_sources/
  tag: 개념
  text: 서버 SDK 구성 소스
title: Java Feature Flags
---
## 개요 {#overview}

이 페이지에서는 Java 애플리케이션에 Datadog Feature Flags를 추가하는 방법을 설명합니다. 버전 1.66.0 이상에서는 `dd-openfeature`가 기본적으로 Datadog 관리 CDN에서 직접 플래그 구성을 로드합니다. 이 Agentless 소스는 Datadog Agent에 연결할 수 없는 장기 실행 서버 및 Serverless 런타임을 지원합니다.

Datadog 공급자는 [OpenFeature](https://openfeature.dev/) 표준을 구현합니다. 구성 전달을 위해 `dd-java-agent`를 사용합니다. Agentless 전달을 사용하면 외부 Datadog Agent가 필요하지 않게 되지만, 여전히 JVM에서 `dd-java-agent`를 로드해야 합니다.

Agentless Java는 플래그를 로컬에서 평가하고 실험 노출 이벤트와 집계된 EVP(Event Platform Proxy) 플래그 평가 이벤트를 전송합니다. 이는 호환되는 로컬 텔레메트리 릴레이를 선호합니다. 호환되는 릴레이를 사용할 수 없는 경우 두 이벤트 유형을 모두 직접 전송합니다.

## 호환성 요구 사항 {#compatibility-requirements}

기본 Agentless 설정을 위해서는 다음이 필요합니다.

- **Java 11 이상**
- **Datadog Java Agent**(`dd-java-agent`, `-javaagent`로 로드됨): 버전 **1.66.0** 이상
- **Datadog OpenFeature 공급자**(`com.datadoghq:dd-openfeature`, 빌드 종속성으로 추가됨): 버전 **1.66.0** 이상
- **OpenFeature SDK**: 버전 **1.20.1** 이상
- Datadog [**API 키**][7]
- Datadog [**사이트**][14]

`dd-java-agent` 및 `dd-openfeature`의 동일한 버전을 사용하세요. Agentless 전달은 별도의 Datadog Agent 서비스를 필요로 하지 않습니다.

<div class="alert alert-info">Serverless Java의 경우, 런타임은 <code>-javaagent</code> JVM 옵션을 지원해야 합니다. 이 옵션은 Java 명령에서 전달하거나 <code>JAVA_TOOL_OPTIONS</code>를 통해 전달할 수 있습니다. 예시는 <a href="/serverless/google_cloud_run/functions/java/?tab=maven">Cloud Run 함수</a> 또는 <a href="/serverless/google_cloud_run/containers/in_container/java/">Cloud Run 컨테이너</a>에 대한 Java 설정을 참조하세요.</div>

Datadog의 Java 버전 및 프레임워크 지원 전체 목록은 [호환성 요구 사항](/tracing/trace_collection/compatibility/java/)을 참조하세요.

## 시작하기 {#getting-started}

OpenFeature 종속성을 설치하고 JVM에 Java Agent를 추가하세요.

## 설치 {#installation}

Datadog OpenFeature 공급자와 OpenFeature SDK 종속성이 필요합니다.

{{< tabs >}}
{{% tab "Gradle(Groovy)" %}}
`build.gradle`에 다음 종속성을 추가합니다.

{{< code-block lang="groovy" filename="build.gradle" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation 'dev.openfeature:sdk:1.20.1'

    // Datadog OpenFeature Provider
    implementation 'com.datadoghq:dd-openfeature:1.66.0'
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Gradle(Kotlin)" %}}
`build.gradle.kts`에 다음 종속성을 추가합니다.

{{< code-block lang="kotlin" filename="build.gradle.kts" >}}
dependencies {
    // OpenFeature SDK for flag evaluation
    implementation("dev.openfeature:sdk:1.20.1")

    // Datadog OpenFeature Provider
    implementation("com.datadoghq:dd-openfeature:1.66.0")
}
{{< /code-block >}}
{{% /tab %}}

{{% tab "Maven" %}}
`pom.xml`에 다음 종속성을 추가합니다.

{{< code-block lang="xml" filename="pom.xml" >}}
<dependencies>
    <!-- OpenFeature SDK for flag evaluation -->
    <dependency>
        <groupId>dev.openfeature</groupId>
        <artifactId>sdk</artifactId>
        <version>1.20.1</version>
    </dependency>

    <!-- Datadog OpenFeature Provider -->
    <dependency>
        <groupId>com.datadoghq</groupId>
        <artifactId>dd-openfeature</artifactId>
        <version>1.66.0</version>
    </dependency>
</dependencies>
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

Gradle 및 Maven 설치 예시는 `dd-openfeature` 및 OpenFeature SDK의 특정 버전을 고정합니다. 최소 지원 버전은 [호환성 요구 사항](#compatibility-requirements)을 참조하세요.

플래그 평가 메트릭은 플래그 구성과 별도의 텔레메트리 경로를 사용합니다. [서버 측 플래그 평가 메트릭 설정][8]을 참조하세요.

### JVM에 Java Agent 추가 {#add-the-java-agent-to-the-jvm}

`-javaagent` JVM 옵션으로 `dd-java-agent`를 로드합니다. 설치 지침은 [JVM에 Java SDK 추가](/tracing/trace_collection/automatic_instrumentation/dd_libraries/java/#add-the-java-sdk-to-the-jvm)를 참조하세요.

런타임이 Java 명령을 제어하는 경우 `JAVA_TOOL_OPTIONS`를 통해 옵션을 설정하세요. 예시는 [Cloud Run 함수][15] 또는 [Cloud Run 컨테이너][16]에 대한 Java 설정을 참조하세요.

## 구성 {#configuration}

### Agentless 전달 구성 {#configure-agentless-delivery}

애플리케이션 프로세스에서 API 키, Datadog 사이트 및 환경을 구성하세요.

{{< code-block lang="bash" >}}
export DD_API_KEY=<YOUR_API_KEY>
export DD_SITE=<YOUR_DATADOG_SITE>
export DD_ENV=<YOUR_ENVIRONMENT>
export DD_SERVICE=<YOUR_SERVICE_NAME>
export DD_VERSION=<YOUR_APP_VERSION>

java -javaagent:/path/to/dd-java-agent.jar -jar your-application.jar
{{< /code-block >}}

Feature Flags 활성화 또는 소스 설정이 필요하지 않습니다. 폴링을 시작하려면 Datadog OpenFeature 공급자를 초기화하세요.

## OpenFeature 공급자 초기화 {#initialize-the-openfeature-provider}

애플리케이션 시작 코드에서 Datadog OpenFeature 공급자를 초기화하세요. 공급자가 선택된 구성 소스를 시작합니다.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.Client;
import datadog.trace.api.openfeature.Provider;
import dev.openfeature.sdk.exceptions.ProviderNotReadyError;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class App {
    private static final Logger logger = LoggerFactory.getLogger(App.class);
    private static Client client;

    public static void main(String[] args) throws Exception {
        // Initialize the Datadog provider
        logger.info("Initializing Datadog OpenFeature Provider...");
        OpenFeatureAPI api = OpenFeatureAPI.getInstance();

        try {
            // Set provider and wait for initial configuration (recommended)
            api.setProviderAndWait(new Provider());
            client = api.getClient("my-app");
            logger.info("OpenFeature provider initialized successfully");
        } catch (ProviderNotReadyError e) {
            // Handle gracefully - app will use default flag values
            logger.warn("Provider not ready (configuration unavailable), continuing with defaults", e);
            client = api.getClient("my-app");
            logger.info("App will use default flag values until provider is ready");
        } catch (Exception e) {
            logger.error("Failed to initialize OpenFeature provider", e);
            throw e;
        }

        // Your application code here
    }
}
{{< /code-block >}}

`setProviderAndWait()`을 사용하여 선택된 소스가 초기 플래그 구성을 제공할 때까지 평가를 차단하세요. 이는 애플리케이션이 트래픽 처리를 시작하기 전에 플래그를 로드합니다. 기본 초기화 제한 시간은 30초입니다.

`ProviderNotReadyError` 는 초기화 도중 공급자가 시간 초과될 때 발생하는 OpenFeature SDK 예외입니다. 이를 포착하면 구성 전달을 사용할 수 없는 경우 애플리케이션이 기본 플래그 값으로 시작할 수 있습니다. 포착되지 않으면 예외가 전파되어 애플리케이션 시작을 방해할 수 있습니다. 가용성 요구 사항에 따라 이를 처리하세요.

### 비동기 초기화 {#asynchronous-initialization}

비차단 초기화를 위해서는 `setProvider()`를 사용하고 공급자 이벤트를 수신하세요.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

OpenFeatureAPI api = OpenFeatureAPI.getInstance();
Client client = api.getClient();

// Listen for provider state changes
client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flags ready!");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Provider configuration is stale");
});

// Set provider asynchronously
api.setProvider(new Provider());
{{< /code-block >}}

## 평가 컨텍스트 설정 {#set-the-evaluation-context}

평가 컨텍스트는 플래그 평가를 위한 대상(사용자, 기기, 세션)을 정의합니다. 이는 타겟팅 규칙에 따라 어떤 플래그 변형이 반환될지 결정합니다.

<div class="alert alert-warning">Datadog Feature Flags는 평가 컨텍스트 속성이 문자열, 숫자, 불리언과 같이 중첩되지 않은 기본값이어야 합니다. 중첩된 객체나 배열은 전달하지 마세요. 지원되지 않으며 노출 데이터가 삭제될 수 있습니다.</div>

{{< code-block lang="java" >}}
import dev.openfeature.sdk.EvaluationContext;
import dev.openfeature.sdk.MutableContext;

// Create an evaluation context with a targeting key and attributes
EvaluationContext context = new MutableContext("user-123")
    .add("email", "user@example.com")
    .add("tier", "premium");

// Use the context for flag evaluations (see next section)
{{< /code-block >}}

`targetingKey`(예: `user-123`)는 일관된 플래그 평가 및 백분율 기반 롤아웃에 사용되는 기본 식별자입니다. 일반적으로 사용자 ID, 세션 ID 또는 기기 ID입니다.

## 플래그 평가 {#evaluate-flags}

OpenFeature 클라이언트를 사용하여 Feature Flags를 평가하세요. 불리언, 문자열, 정수, 부동 소수점, 객체 등 모든 플래그 유형이 지원됩니다.

{{< tabs >}}
{{% tab "불리언" %}}
{{< code-block lang="java" >}}
// Simple Boolean evaluation
boolean enabled = client.getBooleanValue("checkout.new", false, context);

if (enabled) {
    // New checkout flow
} else {
    // Old checkout flow
}

// Get detailed evaluation result
import dev.openfeature.sdk.FlagEvaluationDetails;

FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

logger.info("Value: {}", details.getValue());
logger.info("Variant: {}", details.getVariant());
logger.info("Reason: {}", details.getReason());
{{< /code-block >}}
{{% /tab %}}

{{% tab "문자열" %}}
{{< code-block lang="java" >}}
// Evaluate string flags (e.g., UI themes, API endpoints)
String theme = client.getStringValue("ui.theme", "light", context);

String apiEndpoint = client.getStringValue(
    "payment.api.endpoint",
    "https://api.example.com/v1",
    context
);
{{< /code-block >}}
{{% /tab %}}

{{% tab "숫자" %}}
{{< code-block lang="java" >}}
// Integer flags (e.g., limits, quotas)
int maxRetries = client.getIntegerValue("retries.max", 3, context);

// Double flags (e.g., thresholds, rates)
double discountRate = client.getDoubleValue("pricing.discount.rate", 0.0, context);
{{< /code-block >}}
{{% /tab %}}

{{% tab "객체" %}}
{{< code-block lang="java" >}}
import dev.openfeature.sdk.Value;

// Evaluate object/JSON flags for complex configuration
Value config = client.getObjectValue("ui.config", new Value(), context);

// Access structured data
if (config.isStructure()) {
    Value timeout = config.asStructure().getValue("timeout");
    Value endpoint = config.asStructure().getValue("endpoint");
}
{{< /code-block >}}
{{% /tab %}}
{{< /tabs >}}

## 오류 처리 {#error-handling}

OpenFeature SDK는 기본값 패턴을 사용합니다. 어떤 이유로든 평가에 실패하면 제공한 기본값이 반환됩니다.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ErrorCode;

// Check evaluation details for errors
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("checkout.new", false, context);

if (details.getErrorCode() != null) {
    switch (details.getErrorCode()) {
        case FLAG_NOT_FOUND:
            logger.warn("Flag does not exist: {}", "checkout.new");
            break;
        case PROVIDER_NOT_READY:
            logger.warn("Provider not initialized yet");
            break;
        case TARGETING_KEY_MISSING:
            logger.warn("Evaluation context missing targeting key");
            break;
        case TYPE_MISMATCH:
            logger.error("Flag value type doesn't match requested type");
            break;
        default:
            logger.error("Evaluation error for flag: {}", "checkout.new", details.getErrorCode());
    }
}
{{< /code-block >}}

### 일반 오류 코드 {#common-error-codes}

| 오류 코드 | 설명 | 해결 방법 |
|------------|-------------|------------|
| `PROVIDER_NOT_READY` | 초기 구성을 수신하지 못함 | 공급자 초기화를 기다리거나 `setProviderAndWait()` |을 사용하세요.
| `FLAG_NOT_FOUND` | 구성에 플래그가 존재하지 않음 | 플래그 키를 확인하거나 Datadog UI에서 플래그를 생성하세요. |
| `TARGETING_KEY_MISSING` | 평가 컨텍스트에 타겟팅 키가 없음 | 컨텍스트 생성 시 타겟팅 키를 제공하세요. |
| `TYPE_MISMATCH` | 플래그 값을 요청된 유형으로 변환할 수 없음 | 플래그 유형에 맞는 올바른 평가 방법을 사용하세요. |
| `INVALID_CONTEXT` | 평가 컨텍스트가 null임 | 유효한 평가 컨텍스트를 제공하세요. |

## 고급 구성 {#advanced-configuration}

소스 선택 및 운영 설정에 대한 표준 참조로 [서버 SDK 구성 소스][9]를 사용하세요.

- 폴링, 요청 시간 초과 및 엔드포인트 설정을 포함하여 [Agentless 전송을 구성][12]
- 고급 테스트, 로컬 개발 또는 운영자가 관리하는 프록시에 대해 [사용자 지정 Agentless 엔드포인트를 사용][10]
- Agent가 관리하는 전달을 유지하기 위해 [Agent Remote Configuration을 사용][13]
- [기존 Remote Configuration 설정을 마이그레이션][11]하고 더 이상 사용되지 않는 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED` 설정을 제거

Agentless 모드에서 Java는 실험 노출 및 집계된 플래그 평가 이벤트를 위해 호환되는 로컬 텔레메트리 릴레이를 선호합니다. 호환되는 릴레이를 사용할 수 없는 경우 두 이벤트 유형을 모두 직접 전송합니다. 직접 경로는 애플리케이션 `DD_API_KEY` 및 `DD_SITE` 설정을 사용합니다. Agent가 없는 Serverless 환경의 경우, [`serverless-init`][17]를 로컬 텔레메트리 릴레이로 사용할 수 있습니다.

`feature_flag.evaluations` 메트릭은 [서버 측 플래그 평가 메트릭][8] 가이드의 별도 OTLP 설정을 사용합니다.

사용 가능한 그래프 작성에 대한 자세한 내용은 [Feature Flag 그래프](/feature_flags/concepts/flag_graphs/)를 참조하세요.

### 사용자 지정 초기화 시간 초과 {#custom-initialization-timeout}

공급자가 초기 구성을 기다리는 시간을 구성합니다.

{{< code-block lang="java" >}}
import datadog.trace.api.openfeature.Provider;
import java.util.concurrent.TimeUnit;

Provider.Options options = new Provider.Options()
    .initTimeout(10, TimeUnit.SECONDS);

api.setProviderAndWait(new Provider(options));
{{< /code-block >}}

### 구성 변경 이벤트 {#configuration-change-events}

선택한 구성 소스에서 업데이트를 수신하세요.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Flag configuration updated: {}", event.getMessage());
    // Optionally re-evaluate flags or trigger cache refresh
});
{{< /code-block >}}

`PROVIDER_CONFIGURATION_CHANGED`는 선택적인 OpenFeature 이벤트입니다. Datadog 공급자 설명서를 확인하여 해당 버전에서 이 이벤트가 지원되는지 확인하세요.

### 다중 클라이언트 {#multiple-clients}

명명된 클라이언트를 사용하여 도메인 또는 팀별로 컨텍스트와 플래그를 구성하세요.

{{< code-block lang="java" >}}
// Named clients share the same provider instance but can have different contexts
Client checkoutClient = api.getClient("checkout");
Client analyticsClient = api.getClient("analytics");

// Each client can have its own evaluation context
EvaluationContext checkoutContext = new MutableContext("session-abc");
EvaluationContext analyticsContext = new MutableContext("user-123");

boolean newCheckout = checkoutClient.getBooleanValue(
    "checkout.ui.new", false, checkoutContext
);

boolean enhancedAnalytics = analyticsClient.getBooleanValue(
    "analytics.enhanced", false, analyticsContext
);
{{< /code-block >}}

`Provider` 인스턴스는 전역적으로 공유됩니다. 클라이언트 이름은 구성 목적일 뿐이며 별도의 공급자 인스턴스를 생성하지 않습니다. 모든 클라이언트는 동일한 기본 Datadog 공급자 및 플래그 구성을 사용합니다.

## 모범 사례 {#best-practices}

### 조기 초기화 {#initialize-early}
애플리케이션 수명 주기에서 가능한 한 빨리(예: `main()` 또는 애플리케이션 시작 시) OpenFeature 공급자를 초기화하세요. 이렇게 하면 비즈니스 로직이 실행되기 전에 플래그가 준비되도록 할 수 있습니다.

### 의미 있는 기본값 사용 {#use-meaningful-default-values}
플래그 평가가 실패할 경우 안전한 동작을 유지할 수 있는 합리적인 기본값을 항상 제공하세요.

{{< code-block lang="java" >}}
// Good: Safe default that maintains current behavior
boolean useNewAlgorithm = client.getBooleanValue("algorithm.new", false, context);

// Good: Conservative default for limits
int rateLimit = client.getIntegerValue("rate.limit", 100, context);
{{< /code-block >}}

### 컨텍스트 한 번 생성 {#create-context-once}
요청/사용자/세션당 평가 컨텍스트를 한 번만 생성하고 모든 플래그 평가에 재사용하세요.

{{< code-block lang="java" >}}
// In a web filter or request handler
EvaluationContext userContext = new MutableContext(userId)
    .add("email", user.getEmail())
    .add("tier", user.getTier());

// Reuse context for all flags in this request
boolean featureA = client.getBooleanValue("feature.a", false, userContext);
boolean featureB = client.getBooleanValue("feature.b", false, userContext);
{{< /code-block >}}

모든 플래그 평가마다 평가 컨텍스트를 다시 빌드하면 불필요한 오버헤드가 추가됩니다. 요청 수명 주기 시작 시 컨텍스트를 한 번 생성한 다음, 이후의 모든 플래그 평가에 전달하세요.

### 초기화 실패 처리(선택 사항) {#handle-initialization-failures-optional}
애플리케이션이 기본 플래그 값으로 작동할 수 있는 경우 초기화 실패 처리를 고려해 보세요.

{{< code-block lang="java" >}}
try {
    api.setProviderAndWait(new Provider());
} catch (ProviderNotReadyError e) {
    // Log error and continue with defaults
    logger.warn("Feature flags not ready, using defaults", e);
    // Application will use default values for all flags
}
{{< /code-block >}}

Feature Flags가 애플리케이션 작동에 필수적인 경우, 예외를 전파하여 시작을 방지하세요.

### 일관된 타겟팅 키 사용 {#use-consistent-targeting-keys}
타겟팅 키로 일관되고 안정적인 식별자를 사용하세요.
- **좋은 예**: 사용자 ID, 세션 ID, 기기 ID
- **피해야 할 예**: 타임스탬프, 임의 값, 자주 변경되는 ID

### 플래그 평가 모니터링 {#monitor-flag-evaluation}
상세 평가 결과를 로깅 및 디버깅에 활용하세요.

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("feature.critical", false, context);

logger.info("Flag: {} | Value: {} | Variant: {} | Reason: {}",
    "feature.critical",
    details.getValue(),
    details.getVariant(),
    details.getReason()
);
{{< /code-block >}}

## 테스트 {#testing}

실제 `DatadogProvider`를 사용하여 전용 Datadog 테스트 환경에서 테스트하거나, OpenFeature의 `InMemoryProvider`로 교체하여 테스트 코드에서 직접 플래그 값을 제어할 수 있습니다. 이 섹션에는 테스트를 독립적이고 오프라인 상태로 유지하는 인메모리 방식을 설명합니다. `InMemoryProvider`는 `dev.openfeature:sdk`와 함께 제공되므로(이미 테스트 범위 종속성임) 추가 라이브러리가 필요하지 않습니다. 테스트 구성에 `dev.openfeature:sdk`가 아직 없으면 추가하세요.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.Client;
import dev.openfeature.sdk.OpenFeatureAPI;
import dev.openfeature.sdk.providers.memory.Flag;
import dev.openfeature.sdk.providers.memory.InMemoryProvider;
import java.util.Map;
import org.junit.jupiter.api.*;
import static org.junit.jupiter.api.Assertions.*;

class CheckoutFlagTest {
    private Client client;

    @BeforeEach
    void setUp() {
        Map<String, Flag<?>> flags = Map.of(
            "new-checkout-flow", Flag.<Boolean>builder()
                .variant("on", true)
                .variant("off", false)
                .defaultVariant("on")
                .build(),
            "ui-theme", Flag.<String>builder()
                .variant("dark", "dark")
                .variant("light", "light")
                .defaultVariant("light")
                .build()
        );

        OpenFeatureAPI api = OpenFeatureAPI.getInstance();
        api.setProviderAndWait(new InMemoryProvider(flags));
        client = api.getClient();
    }

    @AfterEach
    void tearDown() {
        OpenFeatureAPI.getInstance().shutdown();
    }

    @Test
    void newCheckoutEnabledByDefault() {
        assertTrue(client.getBooleanValue("new-checkout-flow", false));
    }

    @Test
    void missingFlagReturnsDefault() {
        assertFalse(client.getBooleanValue("does-not-exist", false));
    }
}
{{< /code-block >}}

`OpenFeatureAPI.getInstance()`는 싱글톤입니다. 항상 `@AfterEach`에서 `shutdown()`을 호출하세요(또는 동등한 작업 수행). 그렇지 않으면 공급자 상태가 테스트 클래스 간에 유출되어 불안정한 스위트가 발생합니다.

Spring Boot 테스트에서는 `InMemoryProvider`를 `@TestConfiguration` 빈을 통해 등록하거나 `@SpringBootTest` 클래스의 `@BeforeAll` 훅에서 등록하세요. OpenFeature API 싱글톤은 Spring 컨텍스트의 수명 동안 유지되므로 초기화는 한 번만 실행하면 됩니다.

## 문제 해결 {#troubleshooting}

**플래그 지정 플랫폼**에서 선택한 구성 소스를 거쳐 **Java SDK**로 이어지는 플래그 데이터 경로를 따르세요. Agentless와 Remote Configuration은 요구 사항이 다릅니다. 연결 문제를 해결하기 전에 활성 소스를 확인하세요.

### 1. 플래그 지정 플랫폼: 플래그 구성 확인 {#1-flagging-platform-verify-flag-configuration}

인프라를 확인하기 전에 플래그 자체가 올바르게 설정되었는지 확인하세요.

1. 플래그가 대상 환경에 대해 **활성화**되어 있으며 비활성화되어 있지 않습니다. 플래그는 각 환경에서 기본적으로 비활성화되어 있습니다.
2. 플래그가 **올바른 환경**(`DD_ENV`)을 대상으로 합니다. 플래그는 특정 서비스를 대상으로 하지 않으며, 활성화된 환경 내의 모든 서비스에 적용됩니다.
3. `DD_ENV` 값이 [{{< ui >}}Feature Flag Environments{{< /ui >}}][5]에 나타납니다. 환경에 아직 플래그 트래픽이 수신되지 않은 경우, 이 항목은 표시되지 않습니다.

### 2. 구성 소스 확인 {#2-verify-the-configuration-source}

#### Agentless {#agentless}

1. `dd-openfeature` 및 `dd-java-agent`가 버전 1.66.0 이상인지 확인합니다. 두 구성 요소에 동일한 버전을 사용하세요.
2. JVM이 Java 명령 또는 `JAVA_TOOL_OPTIONS`를 통해 `-javaagent`와 함께 `dd-java-agent`를 로드하는지 확인합니다.
3. `DD_FEATURE_FLAGS_ENABLED`가 설정되지 않았거나 `true`로 설정되어 있는지 확인합니다.
4. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=agentless`가 설정되어 있는지 또는 소스 및 레거시 공급자 설정이 설정되어 있지 않은지 확인합니다.
5. 애플리케이션 코드가 Datadog OpenFeature 공급자를 초기화하는지 확인합니다.
6. `DD_API_KEY`, `DD_SITE` 및 `DD_ENV`가 애플리케이션 프로세스에 구성되어 있는지 확인합니다.
7. 애플리케이션이 Datadog으로 아웃바운드 HTTPS 요청을 보낼 수 있는지 확인합니다.
8. `DD_TRACE_DEBUG=true`를 활성화한 후, 인증, 시간 초과 또는 'malformed-payload' 메시지가 Feature Flags Agentless 엔드포인트에서 발생하는지 확인합니다.

#### Agent Remote Configuration {#agent-remote-configuration}

1. `dd-openfeature` 및 `dd-java-agent`가 버전 1.66.0 이상인지 확인합니다. 두 구성 요소에 동일한 버전을 사용하세요.
2. `DD_FEATURE_FLAGS_CONFIGURATION_SOURCE=remote_config`가 설정되어 있는지 확인합니다. 마이그레이션 기간 동안 소스가 설정되지 않은 경우 `DD_EXPERIMENTAL_FLAGGING_PROVIDER_ENABLED=true`도 Remote Configuration을 선택합니다.
3. `DD_FEATURE_FLAGS_ENABLED`가 설정되지 않았거나 `true`로 설정되어 있는지 확인합니다.
4. Agent 7.55 이상 버전이 실행 중이며 연결 가능한지 확인합니다. [애플리케이션 성능 모니터링(APM) 연결 오류][2]를 참조하세요.
5. Agent에서 Remote Configuration이 활성화되어 있는지 확인합니다. 비활성화된 경우, `datadog.yaml` 또는 `DD_REMOTE_CONFIGURATION_ENABLED=true`에서 `remote_configuration.enabled: true`를 설정합니다. [Remote Configuration][1]을 참조하세요.
6. Agent에서 `DD_API_KEY`가 유효하며 대상 조직에 속해 있는지 확인합니다.
7. Agent에서 `DD_SITE`가 올바르게 설정되었는지 확인합니다. [Agent 사이트 문제][3]를 참조하세요.
8. `datadog-agent status`를 실행하고 Remote Configuration 섹션을 검토합니다. [Agent 명령][6]을 참조하세요.

### 3. SDK: Java SDK 상태 확인 {#3-sdk-verify-java-sdk-state}

#### 디버그 로깅 활성화 {#enable-debug-logging}

Feature Flags 시작 메시지를 활성화하려면 `DD_TRACE_DEBUG=true`를 설정하세요. 기본 Agentless 소스의 경우, 공급자 초기화 후에 CDN 폴링이 시작되는지 확인합니다.

`remote_config`를 사용하면 공급자가 Java Agent의 브리지를 사용합니다. 이전 버전의 에이전트는 공급자 초기화 오류를 발생시키며 필수 에이전트 버전을 명시합니다. 이는 CDN 전달로 대체되지 않습니다.

#### 공급자 상태 변경 모니터링{#monitor-provider-state-changes}

공급자 수명 주기 전환을 관찰하려면 애플리케이션 시작 초기에 이벤트 리스너를 추가하세요. 이벤트 리스너는 초기화 후 연결 변경 사항을 탐지합니다.

{{< code-block lang="java" >}}
import dev.openfeature.sdk.ProviderEvent;

client.on(ProviderEvent.PROVIDER_READY, (event) -> {
    logger.info("Feature flag provider is ready");
});

client.on(ProviderEvent.PROVIDER_ERROR, (event) -> {
    logger.error("Feature flag provider error: {}", event.getMessage());
});

client.on(ProviderEvent.PROVIDER_STALE, (event) -> {
    logger.warn("Feature flag provider configuration is stale");
});

client.on(ProviderEvent.PROVIDER_CONFIGURATION_CHANGED, (event) -> {
    logger.info("Feature flag configuration updated");
});
{{< /code-block >}}

정상 작동 후 발생하는 `PROVIDER_ERROR` 또는 `PROVIDER_STALE` 이벤트는 선택한 구성 소스에 중단이 있음을 나타냅니다.

#### 공급자 준비 안 됨{#provider-not-ready}

공급자가 선택한 소스에서 첫 번째 구성을 받기 전에 플래그 평가를 시도하면 `PROVIDER_NOT_READY`가 반환됩니다.

일반적인 원인:

- **비동기 초기화**: `setProvider()`가 `setProviderAndWait()` 대신 사용되었습니다. 첫 번째 구성이 도착하기 전의 평가는 `PROVIDER_NOT_READY`를 반환합니다.
- **초기화 시간 초과**: `setProviderAndWait()`이 시간 초과(기본값 30초)되어 `ProviderNotReadyError`가 발생했으며, 이는 포착되었습니다. 애플리케이션은 첫 번째 구성을 기다리는 동안 플래그 평가를 계속합니다.

`PROVIDER_NOT_READY`가 폴링 및 초기화 간격 이후에도 지속되면 선택한 소스를 다시 확인하세요.

#### 디버그 플래그 평가 {#debug-flag-evaluations}

플래그가 예상치 못한 값을 반환하는 경우 `getBooleanValue()` 대신 `getBooleanDetails()`를 사용하세요. `Details` 변형은 공급자의 내부 상태를 노출하는 `FlagEvaluationDetails` 객체를 반환합니다.

{{< code-block lang="java" >}}
FlagEvaluationDetails<Boolean> details =
    client.getBooleanDetails("your.flag.key", false, context);

logger.info("Flag evaluation details: value={}, variant={}, reason={}, errorCode={}",
    details.getValue(),
    details.getVariant(),
    details.getReason(),
    details.getErrorCode());
{{< /code-block >}}

공급자가 특정 결과를 반환한 이유를 이해하려면 `reason` 및 `errorCode`를 검토하세요.

#### 유형 불일치 오류 {#type-mismatch-errors}

평가 메서드가 플래그의 구성된 유형과 일치하지 않을 때 `TYPE_MISMATCH`가 반환됩니다. `getBooleanValue()`, `getStringValue()`, `getIntegerValue()`, `getDoubleValue()` 등 각 플래그 유형에 맞는 올바른 메서드를 사용하세요.

### 4. 플래깅 플랫폼: Datadog에 데이터가 나타나는지 확인 {#4-flagging-platform-verify-data-appears-in-datadog}

<div class="alert alert-warning">지원되는 텔레메트리 경로가 구성되지 않은 경우, Java는 노출 이벤트 또는 <code>feature_flag.evaluations</code> 메트릭을 내보내지 않습니다. 이러한 이벤트가 없다고 해서 구성 로드나 로컬 평가가 실패한 것은 아닙니다.</div>

#### 플래그 평가 메트릭 {#flag-evaluation-metrics}

플래그 평가 횟수는 Datadog에 플래그 키, 결과 변형, 평가 이유로 태그가 지정된 `feature_flag.evaluations` 카운터 메트릭으로 나타납니다. 전체 설정 가이드 및 문제 해결 단계는 <a href="/feature_flags/guide/server_flag_evaluation_metrics/">서버 측 플래그 평가 메트릭 설정</a>을 참조하세요.

#### 실험 노출 {#experiment-exposures}

선택한 구성 경로가 노출을 지원하는 경우, 노출은 실험과 관련된 플래그에 대해서만 나타납니다. 표준 Feature Flags는 노출 이벤트를 생성하지 않습니다. 노출이 누락된 경우:

1. Datadog UI에서 플래그가 실험과 연결되어 있는지 확인합니다.
2. Agent API 키와 연결 상태를 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/remote_configuration/
[2]: /ko/tracing/troubleshooting/connection_errors/
[3]: /ko/agent/troubleshooting/site/
[5]: https://app.datadoghq.com/feature-flags/settings/environments
[6]: /ko/agent/configuration/agent-commands/
[7]: /ko/account_management/api-app-keys/#api-keys
[8]: /ko/feature_flags/guide/server_flag_evaluation_metrics/
[9]: /ko/feature_flags/concepts/configuration_sources/
[10]: /ko/feature_flags/concepts/configuration_sources/#use-a-custom-agentless-endpoint
[11]: /ko/feature_flags/concepts/configuration_sources/#migrate-an-existing-remote-configuration-setup
[12]: /ko/feature_flags/concepts/configuration_sources/#configure-agentless-delivery
[13]: /ko/feature_flags/concepts/configuration_sources/#use-agent-remote-configuration
[14]: /ko/getting_started/site/
[15]: /ko/serverless/google_cloud_run/functions/java/?tab=maven
[16]: /ko/serverless/google_cloud_run/containers/in_container/java/
[17]: /ko/feature_flags/implementation_patterns/serverless/#send-feature-flag-telemetry