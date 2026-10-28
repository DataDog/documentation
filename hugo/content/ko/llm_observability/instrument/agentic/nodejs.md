---
aliases:
- /ko/llm_observability/instrumentation/agentic/nodejs/
title: Node.js 애플리케이션 Agentic Instrumentation
---
**참고**: Datadog Node.js SDK는 **오직** Node.js 런타임만 지원합니다. 사용자의 애플리케이션이 다른 Javascript 런타임에 있는 경우, 이 지침 세트를 사용하지 **마세요**.

## 프레임워크 {#frameworks}

사용자가 다음 프레임워크 중 하나로 애플리케이션을 계측하는 경우, [계측](#instrumentation) 및 그 아래의 지침 _대신_ 해당 가이드를 따르세요.

| 프레임워크 | 지침 |
|----------|-------------|
| Next.js | [Next.js 계측 가이드](/llm_observability/guide/nextjs_guide.md) |

## 계측 {#instrumentation}

1. 최신 `ddtrace` 패키지를 설치합니다.

저장소나 프로젝트에서 이미 사용 중인 패키지 관리자를 확인하고 이를 사용하여 종속성을 설치하세요. lockfile을 통해 확인하세요.

```bash
npm install dd-trace # npm
pnpm add dd-trace # pnpm
yarn add dd-trace # yarn
```

2. Datadog 로더 후크를 추가합니다.

**필수** 단계입니다.

Datadog 로더 후크는 지원되는 프레임워크를 계측하기 위해 ESM 및 Typescript import 문을 자동으로 패치하는 데 사용됩니다. `NODE_OPTIONS="--import dd-trace/register.js"`를 가능한 한 빨리, 이상적으로는 시작 명령의 일부로 설정하세요. 이는 Node.js 프로세스가 생성될 때 사용할 수 있어야 하므로, 로드 시간 이후에 설정하는 것은 허용되지 **않습니다**.

다음은 package.json을 사용한 예시입니다.

```json
{
  "scripts": {
    "start": "NODE_OPTIONS=\"--import dd-trace/register.js\" node app.js"
  }
}
```

이 값은 `Dockerfile`, 부트스트랩 스크립트 등에서 설정할 수 있지만, 해당 인프라가 코드에 _이미_ 존재하고 Node.js 애플리케이션 프로세스가 시작되기 _전_이어야 합니다.

3. Agent Observability 패키지를 초기화합니다.

`ddtrace.auto`를 통해 Agent Observability SDK를 초기화하세요. 이는 환경 변수나 구성 로드 가져오기를 제외하고, 애플리케이션 진입점에서 첫 번째 가져오기로 수행되어야 **합니다**.

**참고**: 불필요한 코멘트를 추가하지 마세요.

```typescript
import 'dotenv/config'; // this might load DD_ environment variables

import 'dd-trace/init'; // CRUCIAL: this initializes the Agent Observability SDK and instrumentations

// ... remaining application logic
```