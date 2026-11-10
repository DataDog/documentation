---
description: コンポーネントコード、コンポーネント入力 Props、およびコンポーネントの初期状態を定義することで、カスタム React コンポーネントをレンダリングします。
disable_toc: false
further_reading:
- link: /actions/app_builder/components/
  tag: ドキュメント
  text: コンポーネント
- link: /actions/app_builder/build/
  tag: ドキュメント
  text: アプリの構築
title: React Renderer
---
React レンダラーを使用すると、ユーザーは使い慣れた言語やライブラリを使用して、完全にカスタムな UI コンポーネントを作成できます。このコンポーネントにより、ビルダーは [React APIs][1] にアクセスできるため、App Builder で柔軟性が高く、動的で視覚的にインパクトのあるアプリを作成できます。

このページでは、React レンダラーコンポーネントの使用例を紹介します。React レンダラーのすべてのフィールドの詳細なリファレンスについては、[Components][2] を参照してください。

## カスタム React コンポーネント定義の例 {#example-component-definition}

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

### コンポーネント入力 Props の例 {#example-component-input-props}

```json
${{
  queryData: query0.outputs,
  name: global?.user?.name,
  state: self.state,
}}
```

### コンポーネントの初期状態の例 {#example-initial-component-state}

```json
${{
  count: 0,
  items: [],
  isLoading: false,
  selectedId: null,
}}
```

## 参考資料 {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://react.dev/reference/react/apis
[2]: /ja/actions/app_builder/components/#general-11