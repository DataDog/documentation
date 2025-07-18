---
dependencies:
- https://github.com/DataDog/apps/blob/master/docs/en/getting-started.md
further_reading:
- link: https://github.com/DataDog/apps/blob/master/docs/en/ui-extensions-design-guidelines.md
  tag: 깃허브(Githun)
  text: 설계 가이드
- link: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
  tag: 깃허브(Githun)
  text: 프로그래밍 모델
kind: 설명서
title: Datadog 앱
---
## 베타에 함께하세요!
Datadog 앱은 현재 베타 버전입니다. 하지만 쉽게 액세스를 요청할 수 있습니다. [이 양식][5]을 사용하여 지금 요청을 제출하세요. 승인되면 창의성을 발휘하여 사용자, 사용자의 조직을 위해 앱을 개발할 수 있습니다. 또는 당사의 뛰어난 Datadog 앱을 비롯해 전체 Datadog 커뮤니티에 게시할 수 있습니다.

## 앱은 무엇인가요?

Datadog 앱은 개발자가 커스텀 대시보드 위젯을 통해 Datadog의 네이티브 기능을 확장할 수 있도록 지원합니다. 예를 들어, Datadog에서 지원하지 않는 데이터 시각화가 있거나 타사 플랫폼에서 실행하는 일반적인 교정 워크플로가 있는 경우 앱을 작성하여 Datadog 내에서 이 기능을 확장할 수 있습니다.

## 설정

### 로컬 개발 환경 설정

1. Datadog 앱 생성
   ```
   yarn create @datadog/app
   ```

1. 생성한 폴더로 이동:
   ```
   cd starter-kit
   ```

1. 개발 환경 설정:
   ```
   yarn start
   ```

`http://localhost:3000/`으로 로컬 개발 서버가 시작됩니다.

다음 메시지가 보이면 애플리케이션이 실행되고 있는 것입니다.

<img style="max-width:70%" alt="The application controller is running in the background" src="https://user-images.githubusercontent.com/228230/137548156-3c41407d-ee2f-423d-8a6e-8533115d462b.png">

두 개의 페이지가 있으니 참고하세요.
- `http://localhost:3000`: 각기 다른 확장 프로그램(위젯, 메뉴 또는 모달) 모두를 조정할 수 있는 기본 컨트롤러입니다. 앱 기능을 풍부하게 늘리려는 경우 유용합니다.
- `http://localhost:3000/widget`: 전담 디스플레이를 필요로 하는 위젯 또는 모델 등을 위한 구성 요소입니다.

이 아키텍처에 대한 상세 정보는 [개발자 플랫폼 개발자 가이드][3]을 참조하세요.

<div class="alert alert-info">
브라우저에서 직접 로컬 위젯과 상호 작용할 때 JavaScript 콘솔에서 찾아내지 못한 <strong>HandshakeTimeoutError</strong>를 발견할 수 있습니다. 이는 예상된 결과입니다. Datadog 앱 SDK는 Datadog 사용자 인터페이스와 연결된 아이프레임에서 실행되도록 <a href="https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md">설계</a>되었습니다. 위젯과 Datadog UI 간 핸드셰이크 시도는 SDK가 통신해야 하는 Datadog UI가 없는 경우 시간 초과됩니다.</div>

### 개발자 플랫폼에 앱 추가

1. [**통합** > **개발자 플랫폼**][4]으로 이동한 다음 **+ 새 앱**을 클릭합니다.
   <img style="max-width:80%" alt="Add a new app to the developer platform" src="https://user-images.githubusercontent.com/228230/137548671-c0c64c2e-e3cd-494b-990c-8dc8a90d4800.png">

1. 애플리케이션을 위한 고유한 이름을 입력합니다.

1. 선택적으로 새로운 애플리케이션을 위한 대시보드가 표시된 경우 앱 이름을 변경하고, 더 상세한 설명을 앱에 제공하거나, 앱 아이콘을 변경할 수 있습니다.
   <img style="max-width:80%" alt="Edit app information from the app dashboard" src="https://user-images.githubusercontent.com/17037651/163401812-d21a9d3a-e73f-49b0-bda4-e7c447295784.png">


### 대시보드에 앱 추가

1. 앱을 대시보드에 추가하기 전 **UI 확장**을 클릭하여 이를 지원할 수 있습니다.
   <img style="max-width:80%" alt="App Edit Enable UI Extensions" src="https://user-images.githubusercontent.com/17037651/163401958-153f6c80-d7ba-4b47-a40d-1cf08913602d.png">

   이 보기가 로드되면 **UI 확장 활성화** 버튼을 클릭합니다.

1. 앱을 위한 더 많은 옵션이 표시되면 **루트 URL** 및 **디버그 모드 루트 URL**를 변경하여 실행하는 `localhost` 위젯 버전과 일치시킵니다. 기본 컨트롤러 경로는 `/widget`입니다. 이러한 URL 값은 애플리케이션을 빌드하고 자체적인 인프라에 호스트하기 시작하면서 변경할 수 있습니다.

1. 토글을 **대시보드 커스텀 위젯**으로 켭니다. 이는 앱용 JSON 파일을 생성합니다. 

   <img style="max-width:80%" alt="App Edit UI Extensions" src="https://user-images.githubusercontent.com/17037651/163402086-a3afbecd-c9c0-4608-bb91-6cb5391fec93.png">

   이 예에서 JSON 출력은 `Your first widget` 값을 포함합니다. 대시보드에 추가할 수 있도록 메뉴에 표시되는 위젯 이름입니다.

1. 대시보드에 이동하여 위젯에 추가합니다.

   <img style="max-width:80%" alt="Add widget to your Dashboard" src="https://user-images.githubusercontent.com/228230/137550297-3f98c5e0-0826-4109-b6e4-bf6dd1209aa2.png">


1. **커스텀 위젯** 섹션은 사이드 바 아래에 있습니다. 목록에서 위젯을 찾고 대시보드에 추가합니다.

   <img style="max-width:80%" alt="Add your widget from the custom widgets section" src="https://user-images.githubusercontent.com/228230/137550380-7b9b222d-c848-4d17-9060-cd0345780a11.png">

1. 몇몇 옵션과 함께 새로운 위젯 미리 보기가 나타납니다. 아래로 스크롤하여 **완료**를 클릭하여 대시보드에 추가합니다.

   <img style="max-width:80%" alt="Click Done to add your widget to the dashboard" src="https://user-images.githubusercontent.com/228230/137550741-669f69c6-4a9b-4253-afc4-be3257a1084e.png">

1. 애플리케이션을 빌드하려면 터미널에서 `yarn build`를 실행합니다. 그러면 통계 생성 사이트가 선택한 호스팅 플랫폼으로 이동되며 앱 설정에서 URL이 업데이트됩니다.

### OAuth API 액세스

OAuth API 액세스가 활성화되면 사용자는 앱을 사용하기 전 인증을 받아야 합니다. 이 기능을 통해 기존 인증 메커니즘(예를 들어 쿠키 기반 사용자 이름 및 비밀번호)을 개발자 플랫폼에 통합할 수 있습니다. 

### 샘플 애플리케이션

- [시작 키트][1]
- [감정 분석][2]

## 참고 자료

- [Datadog 개발자 플랫폼에 대한 자세한 내용](https://docs.datadoghq.com/developers/authorization/oauth2_in_datadog/)
- [UI 확장에 대한 자세한 내용](https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md#oauth-api-access)

[1]: https://github.com/DataDog/apps/tree/master/examples/starter-kit
[2]: https://github.com/DataDog/apps/tree/master/examples/sentiment
[3]: https://github.com/DataDog/apps/blob/master/docs/en/programming-model.md
[4]: https://app.datadoghq.com/apps
[5]: https://dtdg.co/3E5iHd8