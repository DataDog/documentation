---
description: 게시된 Datadog 앱을 대시보드, 노트북, Internal Developer Portal 홈페이지 및 Catalog 사이드
  패널에 임베드합니다.
further_reading:
- link: /actions/datadog_apps/
  tag: 문서
  text: Datadog 앱
- link: /actions/app_builder/embedded_apps/
  tag: 문서
  text: App Builder 앱 임베드
- link: https://www.npmjs.com/package/@datadog/apps-frontend
  tag: 외부 사이트
  text: npm의 @datadog/apps-frontend 패키지
title: 앱 임베드
---
{{< callout url="https://www.datadoghq.com/product-preview/apps/" btn_hidden="false" header="미리 보기에 참여하세요!">}}
Datadog Apps는 미리 보기 상태입니다. 액세스를 요청하려면 이 양식을 사용하세요.
{{< /callout >}}

[Datadog 앱][1]을 다른 Datadog 제품에 임베드하여 사용자가 문제를 조사하고 조치를 취하는 화면에 운영 도구를 직접 배치합니다. 임베드된 앱은 기존 환경을 표시하거나 대시보드의 시간 범위 및 템플릿 변수 등 호스트에서 제공하는 실시간 컨텍스트에 따라 동작할 수 있습니다.

## 전제 조건 {#prerequisites}

- 빌드, 업로드 및 게시된 Datadog 앱
- 앱을 사용하고 대상 화면을 편집할 수 있는 권한

앱 빌드, 업로드 및 게시 방법에 대한 자세한 내용은 [Datadog 앱][1]을 참조하세요.

## 앱 임베드 {#embed-an-app}

<div class="alert alert-info">앱은 Datadog UI에서만 임베드할 수 있습니다. AI 에이전트는 앱을 임베드할 수 없습니다.</div>

앱을 업로드하고 게시한 후에는 앱을 수정하지 않고도 지원되는 Datadog 화면에 추가할 수 있습니다.

앱 자체에서 또는 앱을 표시할 화면에서 앱을 임베드할 수 있습니다.

### 앱에서 임베드 {#embed-from-the-app}

1. [App 목록][2]에서 임베드하려는 게시된 앱을 엽니다.
1. 페이지 상단에서 **+ Add to Dashboard**를 클릭하거나, 그 옆의 아래쪽 화살표를 클릭하고 메뉴에서 대상 유형을 선택합니다.
1. 대상을 선택한 다음 **Save**를 클릭합니다.

### 대상에서 임베드 {#embed-from-the-destination}

{{< tabs >}}
{{% tab "대시보드" %}}

1. 앱을 추가하려는 대시보드를 엽니다.
1. **Add Widgets**를 클릭하여 위젯 트레이를 엽니다.
1. **Apps** 탭을 선택한 다음 **Apps** 위젯을 대시보드로 드래그합니다.
1. 편집기에서 **Select app** 드롭다운을 사용하여 앱을 선택합니다. 본인이 소유한 앱만 목록에 표시하려면 **My Apps Only**를 활성화합니다.
1. 위젯의 크기를 조절한 다음 대시보드를 저장합니다.

{{% /tab %}}
{{% tab "노트북" %}}

1. 앱을 추가할 노트북을 엽니다.
1. 셀을 추가하고 **Apps** 셀 유형을 선택합니다.
1. 드롭다운에서 앱을 선택합니다.
1. 노트북을 저장합니다.

**Apps** 셀은 노트북의 시간 범위를 사용합니다. 앱에서 시간 범위를 읽으려면 `datadogNotebook` 입력값을 사용합니다.

{{% /tab %}}
{{% tab "Catalog" %}}

1. [Catalog][1]로 이동하여 서비스를 선택합니다.
1. 서비스의 사이드 패널에서 **+ Add App** 탭을 선택합니다.
1. 드롭다운에서 앱을 선택합니다. 본인이 소유한 앱만 목록에 표시하려면 **My Apps Only**를 활성화합니다.

[1]: https://app.datadoghq.com/services

{{% /tab %}}
{{< /tabs >}}

앱을 임베드한 후 필요시 호스트의 컨텍스트, 테마 또는 공유 링크 상태에 따라 동작하도록 [앱을 구성할 수 있습니다](#customize-the-embedded-experience). 그런 다음 [앱이 정상적으로 작동하는지 확인합니다](#verify-the-app). 임베드된 앱은 가장 최근에 게시된 버전으로 표시되므로 임베드하기 전에 변경 사항을 게시합니다.

## 임베드된 앱 환경 사용자 지정{#customize-the-embedded-experience}

아직 설치하지 않았다면 앱에 [`@datadog/apps-frontend`][3] 패키지를 설치합니다.

```shell
npm install @datadog/apps-frontend
```

임베드된 앱이 Datadog 호스트에 반응하도록 하려면 애플리케이션 루트에 `DatadogAppProvider`를 유지합니다. 공급자는 Datadog 호스트와의 통신을 설정하고, 훅에서 호스트 입력을 사용할 수 있도록 하며, 공유 Datadog 링크에서 앱의 URL 상태를 유지합니다.

```typescript
import { DatadogAppProvider } from '@datadog/apps-frontend/embedding/react';

export function Root() {
  return (
    <DatadogAppProvider>
      <App />
    </DatadogAppProvider>
  );
}
```

표준 Datadog Apps 스캐폴드에는 이 공급자가 기본적으로 포함되어 있습니다. 모든 `@datadog/apps-frontend` 훅은 이 공급자의 하위에서 렌더링되어야 하므로 앱 구조를 변경할 때도 공급자를 유지합니다.

### 호스트 입력 읽기 {#read-host-inputs}

호스트 입력은 앱을 포함하는 Datadog 제품에서 제공하는 값과 함수입니다. 예를 들어, 대시보드는 현재 시간 범위와 템플릿 변수를 제공하고 Catalog 사이드 패널은 현재 표시 중인 서비스 정보를 제공할 수 있습니다.

호스트 값은 해당 제품의 컨텍스트가 변경되면 자동으로 업데이트됩니다.

`useDatadogAppInput` 및 해당 제품 화면의 입력 스키마를 가져옵니다.

```typescript
import { useDatadogAppInput } from '@datadog/apps-frontend/inputs/react';
import {
  datadogDashboard,
  datadogIdp,
  datadogNotebook,
  datadogServicePanel,
  datadogTheme,
} from '@datadog/apps-frontend/inputs/schema';
```

전체 TypeScript 정의는 [npm의 `@datadog/apps-frontend` 소스][4]를 참조합니다.

#### 입력 상태 {#input-states}

`useDatadogAppInput`은 `status` 값이 `pending`, `ready`, `unavailable` 또는 `failed`인 상태 객체를 반환합니다. 상태가 `ready`인 경우에만 `fields`에서 값을 사용할 수 있습니다.

`unavailable` 은 오류가 아닌 정상적인 결과입니다. 이는 노트북에서 `datadogDashboard`를 읽으려는 경우처럼 앱이 해당 입력을 제공하지 않는 화면에서 실행되고 있음을 의미합니다. 이 경우 폴백을 렌더링합니다.

예시는 다음과 같습니다.

```typescript
function PanelHeader() {
  const panel = useDatadogAppInput(datadogServicePanel);

  switch (panel.status) {
    case 'pending':
      return <Spinner />;
    case 'unavailable':
      return <p>Open this app from a Catalog side panel.</p>;
    case 'failed':
      return <p>{panel.error.message}</p>;
    case 'ready':
      return (
        <header>
          {panel.fields.service}
          <button onClick={() => panel.fields.close()}>×</button>
        </header>
      );
  }
}
```

### 사용 가능한 입력 {#available-inputs}

{{< tabs >}}
{{% tab "테마" %}}

`datadogTheme`을 사용하여 Datadog 호스트에서 현재 사용하는 테마에 따라 동작하도록 합니다.

```typescript
const theme = useDatadogAppInput(datadogTheme);
```

상태가 `ready`이면 `fields`에서 다음을 제공합니다.

```typescript
{
  theme: 'light' | 'dark';
}
```

사용자가 Datadog 테마를 변경하면 값이 업데이트됩니다.

앱이 [DRUIDS][1]를 사용하는 경우 `DruidsEnvironmentWithThemeInput`을 사용하여 호스트 테마를 자동으로 적용할 수 있습니다.

```typescript
import { DruidsEnvironmentWithThemeInput } from '@datadog/apps-frontend/druids/react';

<DatadogAppProvider>
  <DruidsEnvironmentWithThemeInput defaultThemePreference="light">
    <App />
  </DruidsEnvironmentWithThemeInput>
</DatadogAppProvider>
```

[1]: /ko/actions/datadog_apps/#ui-components

{{% /tab %}}
{{% tab "대시보드" %}}

`datadogDashboard`를 사용하여 대시보드의 현재 시간 범위와 템플릿 변수를 읽습니다.

```typescript
const dashboard = useDatadogAppInput(datadogDashboard);
```

상태가 `ready`이면 `fields`에서 다음을 제공합니다.

```typescript
{
  dashboard: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

시간 범위를 사용하여 앱의 쿼리 범위를 대시보드에 맞게 설정합니다. 템플릿 변수를 사용하여 해당 대시보드에 적용된 서비스, 환경, 팀 등의 필터를 앱에도 동일하게 적용합니다.

{{% /tab %}}
{{% tab "노트북" %}}

`datadogNotebook`을 사용하여 노트북의 현재 시간 범위와 템플릿 변수를 읽습니다.

```typescript
const notebook = useDatadogAppInput(datadogNotebook);
```

상태가 `ready`이면 `fields`에서 다음을 제공합니다.

```typescript
{
  notebook: {
    timeframe: {
      start: number;
      end: number;
      isLive: boolean;
    };
    templateVariables: {
      name: string;
      value: string;
      values?: string[];
      availableValues?: string[];
      prefix?: string;
      default?: string;
    }[];
  };
}
```

이 컨텍스트를 사용하여 앱의 시간 범위와 필터를 해당 노트북에 적용된 설정과 동기화합니다.

{{% /tab %}}
{{% tab "IDP 홈페이지" %}}

`datadogIdp`를 사용하여 Internal Developer Portal 홈페이지에서 앱의 위치를 확인하고 변경합니다.

```typescript
const idp = useDatadogAppInput(datadogIdp);
```

상태가 `ready`이면 `fields`에서 다음을 제공합니다.

```typescript
{
  position: number;
  move: (inputs: { delta: number }) => number;
}
```

`position`을 사용하여 홈페이지에서 앱의 현재 위치를 확인합니다. `move()`를 호출하여 앱을 지정한 칸 수만큼 이동합니다. 호출 결과로 앱의 새 위치가 반환됩니다.

```typescript
const newPosition = await idp.fields.move({ delta: 1 });
```

{{% /tab %}}
{{% tab "Catalog 사이드 패널" %}}

`datadogServicePanel`을 사용하여 Catalog 사이드 패널에 표시된 서비스를 식별합니다.

```typescript
const servicePanel = useDatadogAppInput(datadogServicePanel);
```

상태가 `ready`이면 `fields`에서 다음을 제공합니다.

```typescript
{
  service: string;
  close: () => undefined;
}
```

`service`를 사용하여 앱에 표시할 콘텐츠를 선택한 서비스로 제한합니다. 앱의 액션으로 사이드 패널을 닫아야 하는 경우 `close()`를 호출합니다.

{{% /tab %}}
{{< /tabs >}}

특정 제품 화면에서 사용할 수 있는 입력을 다른 제품 화면에서도 사용할 수 있다고 가정하지 않습니다. 앱에 필요한 컨텍스트만 요청하고 해당 컨텍스트가 없는 경우에도 앱을 유용하게 사용할 수 있도록 합니다.

## 공유 링크에서 상태 유지 {#preserve-state-in-shared-links}

`DatadogAppProvider`는 공유 Datadog 링크에서 앱의 쿼리 문자열과 URL 프래그먼트를 유지합니다. 선택한 서비스, 필터, 레코드 또는 앱 내 경로 등 공유 가능한 상태를 URL에 저장합니다. 다른 사용자가 공유 링크를 열면 임베드된 앱이 동일한 상태를 복원할 수 있습니다. [Deep links][5]는 앱이 `DatadogAppProvider`로 래핑되어 있는 한 추가 구성없이 특정 앱 상태로 연결됩니다.

## 앱 검증 {#verify-the-app}

앱을 임베드한 후, 앱을 임베드한 화면에서 다음 사항을 확인합니다.

- **액세스**: 앱을 사용할 권한은 있지만 앱을 직접 임베드하지 않은 사용자 계정으로 해당 화면을 엽니다. 권한 오류가 발생하지 않고 앱이 렌더링되는지 확인합니다.
- **크기**: 사용자가 설정할 것으로 예상되는 최소 크기로 앱의 크기를 조절합니다. 콘텐츠가 영역을 벗어나거나 잘리지 않고 읽기 쉽게 표시되는지 확인합니다.
- **호스트 컨텍스트**: 대시보드의 시간 범위나 템플릿 변수 값 등 호스트 컨텍스트를 변경하고 앱이 업데이트되는지 확인합니다. 앱이 대신 `unavailable` 폴백을 렌더링한다면 해당 화면에서 제공하지 않는 입력을 읽고 있다는 의미입니다.
- **공유 링크**: 앱 내부의 상태를 변경한 다음 Datadog 공유 링크를 복사하여 새 브라우저 세션에서 엽니다. 앱이 동일한 상태를 복원하는지 확인합니다.

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ko/actions/datadog_apps/
[2]: https://app.datadoghq.com/app-builder/apps/list
[3]: https://www.npmjs.com/package/@datadog/apps-frontend
[4]: https://www.npmjs.com/package/@datadog/apps-frontend?activeTab=code
[5]: /ko/actions/datadog_apps/#share-embedded-app-state-with-deep-links