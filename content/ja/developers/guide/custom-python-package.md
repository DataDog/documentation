---
title: Agent へのカスタム Python パッケージの追加
kind: documentation
aliases:
  - /ja/agent/custom_python_package
  - /ja/agent/faq/custom_python_package
further_reading:
  - link: /logs/
    tag: ドキュメント
    text: ログの収集
  - link: /infrastructure/process/
    tag: ドキュメント
    text: プロセスの収集
  - link: /tracing/
    tag: ドキュメント
    text: トレースの収集
---
{{< tabs >}}
{{% tab "Linux" %}}

Agent には、埋め込み Python 環境が `/opt/datadog-agent/embedded/` に含まれています。`python`、`pip` などの共通バイナリは `/opt/datadog-agent/embedded/bin/` に含まれています。

Python パッケージは、埋め込み `pip` からインストールできます。

```shell
sudo -u dd-agent /opt/datadog-agent/embedded/bin/pip install <package_name>
```

{{% /tab %}}
{{% tab "macOS" %}}

Agent には、埋め込み Python 環境が `/opt/datadog-agent/embedded/` に含まれています。`python`、`pip` などの共通バイナリは `/opt/datadog-agent/embedded/bin/` に含まれています。

Python パッケージは、埋め込み `pip` からインストールできます。

```shell
sudo dd-agent /opt/datadog-agent/embedded/bin/pip install <package_name>
```

{{% /tab %}}

{{% tab "Windows" %}}

カスタム Python パッケージは、Agent の埋め込み Python を使用して、以下のコマンドにより PowerShell でインストールできます。

Agent バージョン <= 6.11 の場合

```powershell
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded\python -m pip install <パッケージ名>
```

Agent バージョン >= 6.12 の場合

```powershell
%PROGRAMFILES%\Datadog\"Datadog Agent"\embedded<PYTHON_MAJOR_VERSION>\python -m pip install <パッケージ名>
```

または、次の場所にある zip 形式ライブラリフォルダーにパッケージを追加できます。

```powershell
%PROGRAMFILES%\Datadog\Datadog Agent\files
```

その後、[Agent を再起動][1]します。

{{< img src="agent/windows_python_package.png" alt="Windows Python パッケージ"  >}}

[1]: /ja/agent/basic_agent_usage/windows/
{{% /tab %}}
{{< /tabs >}}

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}