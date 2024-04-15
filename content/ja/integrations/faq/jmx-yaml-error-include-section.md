---

title: jmx.yaml エラー、Include Section
---

`jmx.yaml` ファイルの構成中に、次のエラーメッセージが表示される場合があります。

```text
initialize check class [ERROR]: "Each configuration must have an 'include' section. See https://docs.datadoghq.com/integrations/java/ for more information"
```

ここでは、yaml ファイルのインデントが正しくないためにエラーが投げられています。例えば、次のスクリーンショットでは、'include' の後の 'domain' のインデントがないことがわかります。これによってエラーが投げられます。

{{< img src="integrations/faq/incorrect_jmx_include.png" alt="incorrect_jmx_include" >}}

上記のコードを [Online YAML Parser][1] に入力すると、右側のウィンドウに JSON オブジェクトが出力され、"include" の値が null になっていることが確認できるでしょう。

これを修正するには、下記のように 'include' の下の行にスペースを 2 つ入れて右側に字下げします。こうすれば、'include' が null で登録されることはありません。
{{< img src="integrations/faq/correct_jmx_include.png" alt="correct_jmx_include" >}}

[1]: http://yaml-online-parser.appspot.com
