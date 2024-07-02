---
title: Agent Runtime Configuration Management
further_reading:
- link: /agent/troubleshooting/debug_mode/
  tag: ドキュメント
  text: Agent Debug Mode
---

Agent 6.19+/7.19+ を実行している場合は、コンフィギュレーションの変更を反映するために Agent を再起動する必要はなく、ランタイム時に一部の設定を動的に変更できます。

**注**: 動的に行われた変更は保持されません。Agent を再起動するとすぐに失われます。

コマンド `config list-runtime` を使用して、ランタイム時に変更できるコンフィギュレーションパラメーターを一覧表示します。各種プラットフォームでの完全なコマンドについては、以下の表を参照してください。

| プラットフォーム   | コマンド                                                |
|------------|--------------------------------------------------------|
| Docker     | `docker exec datadog-agent agent config list-runtime`  |
| macOS      | `datadog-agent config list-runtime`                    |
| CentOS     | `sudo datadog-agent config list-runtime`               |
| Debian     | `sudo datadog-agent config list-runtime`               |
| Kubernetes | `kubectl exec <POD_NAME> agent config list-runtime`    |
| Fedora     | `sudo datadog-agent config list-runtime`               |
| Redhat     | `sudo datadog-agent config list-runtime`               |
| Suse       | `sudo datadog-agent config list-runtime`               |
| ソース     | `sudo datadog-agent config list-runtime`               |
| Windows    | [Windows][1]に関する個別のドキュメントをご参照ください。       |

ランタイム時に変更できる 1 つのパラメーターは、ログレベルです。これは、コンテナ化された環境でデバッグを行う場合に便利です。この場合、Agent を実行しているコンテナを破棄して再作成する必要がないため、Agent のコンフィギュレーションを変更できません。Kubernetes デプロイメントでデバッグするログレベルを動的に設定するには、次のコマンドを呼び出します。

```text
kubectl exec <ポッド名> agent config set log_level debug
```

`config get <設定>` を使用すると、ランタイム編集が可能な設定の現在の値を取得できます。たとえば、Linux システムで現在のログレベルを取得するには、次のコマンドを使用します。

```text
sudo datadog-agent config get log_level
```

完全なランタイムコンフィギュレーションは、`config` コマンドを使用して表示することもできます。


## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/basic_agent_usage/windows/#agent-v6
