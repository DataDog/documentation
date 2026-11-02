---
description: 구성 요소 코드, 입력 props, 초기 구성 요소 상태를 정의하여 사용자 지정 React 구성 요소를 렌더링합니다.
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: 설명서
  text: 구성 요소
- link: /actions/app_builder/build/
  tag: 설명서
  text: 앱 빌드하기
title: React 렌더러
---
React 렌더러를 사용하면 사용자가 이미 알고 있는 언어와 라이브러리를 활용하여 완전한 맞춤형 UI 구성 요소를 만들 수 있습니다. 이 구성 요소를 통해 빌더는 [React API][1]에 액세스하여 App Builder에서 유연하고 동적이며 시각적으로 임팩트 있는 앱을 만들 수 있습니다.

이 페이지에서는 React 렌더러 구성 요소의 사용 예시를 제공합니다. React 렌더러의 모든 필드에 대한 전체 참조는 [구성 요소][2]에서 확인하세요.

## 구성 요소 정의 예시 {#example-component-definition}

```js
const App = (props) => {
  // Local component state
  const [localState, setLocalState] = React.useState(0);
  
  // Access shared state from props
  const { count = 0 } = props.state;
  
  const incrementShared = () => {
  // Update shared state that persists outside component
        
props.setComponentState({...props.state, count: count + 1});
};
  
  return (
    <div>
      <h3>Shared Count: {count}</h3>
      <button onClick={incrementShared}>Increment Shared</button>
    </div>
);
}
return App;
```

### 구성 요소 입력 props 예시 {#example-component-input-props}

```json
${{
  queryData: query0.outputs,
  name: global?.user?.name,
  state: self.state,
}}
```

### 초기 구성 요소 상태 예시 {#example-initial-component-state}

```json
${{
  count: 0,
  items: [],
  isLoading: false,
  selectedId: null,
}}
```

## 추가 자료 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react.dev/reference/react/apis
[2]: /ko/actions/app_builder/components/#general-11