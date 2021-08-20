---
title: 機密情報管理
kind: documentation
further_reading:
  - link: /agent/autodiscovery/
    tag: ドキュメント
    text: オートディスカバリー
---
Agent の構成ファイルにプレーンテキストでシークレットを保存したくない場合は、シークレット管理パッケージを使用できます。

Agent は、`secrets` パッケージを利用してユーザー指定の実行可能ファイルを呼び出し、シークレットの取得と復号化を処理できます。その後、シークレットは Agent によってメモリにロードされます。このアプローチにより、ユーザーはシークレット管理バックエンド（HashiCorp Vault や AWS Secrets Manager など）に依存し、好みの認証方法を選択してイニシャルトラストを確立できます。

バージョン 6.12 以降、シークレット管理パッケージは、メトリクス、APM、プロセスモニタリングのために Linux で、メトリクスと APM のために Windows で一般に利用可能です。

## シークレットの使用

### 構成でのシークレットの定義

`ENC[]` 表記を使用して、構成内の任意の YAML フィールドの値としてシークレットを示します。

シークレットは、あらゆる構成バックエンド（ファイル、etcd、consul など）および環境変数でサポートされています。

また、シークレットは `datadog.yaml` でもサポートされています。Agent は最初にメイン構成をロードし、シークレットを復号化した後にそれをリロードします。これは、シークレットを `secret_*` 設定で使用できないことを意味します。

シークレットは常に文字列です。つまり、シークレットを使用して整数またはブール値を設定することはできません。

例:

```yaml
instances:
  - server: db_prod
    # 2 つの有効なシークレットハンドル
    user: "ENC[db_prod_user]"
    password: "ENC[db_prod_password]"

    # `ENC[]` ハンドルは YAML 値全体である必要があります。これは、
    # 以下がシークレットハンドルとして検出されないことを意味します。
    password2: "db-ENC[prod_password]"
```

ここには、`db_prod_user` と `db_prod_password` という 2 つのシークレットがあります。これらはシークレットの_ハンドル_であり、それぞれがシークレット管理バックエンド内でシークレットを一意に識別します。

角括弧の間では、YAML 構成が有効である限り、あらゆる文字が許可されます。これは、引用符をエスケープする必要があることを意味します。例:

```text
"ENC[{\"env\": \"prod\", \"check\": \"postgres\", \"id\": \"user_password\"}]"
```

上記の例では、シークレットのハンドルは文字列 `{"env": "prod", "check": "postgres", "id": "user_password"}` です。

内部の `[` と `]` をエスケープする必要はありません。例:

```text
“ENC[user_array[1234]]”
```

上記の例では、シークレットのハンドルは文字列 `user_array[1234]` です。

シークレットは[オートディスカバリー][1]テンプレート変数が解決された後に解決されます。つまり、シークレットハンドルで使用できます。例:

```yaml
instances:
  - server: %%host%%
    user: ENC[db_prod_user_%%host%%]
    password: ENC[db_prod_password_%%host%%]
```

### 実行可能ファイルの提供

シークレットを取得するには、シークレット管理バックエンドに対してシークレットを認証してフェッチできる実行可能ファイルを提供する必要があります。

Agent はメモリ内にシークレットを内部的にキャッシュして、呼び出しの回数を減らします（たとえば、コンテナ化された環境で役立ちます）。Agent は、シークレットがまだメモリにロードされていないシークレットハンドルを少なくとも 1 つ含むチェック構成ファイルにアクセスするたびに実行可能ファイルを呼び出します。特に、既にメモリにロードされているシークレットは、実行可能ファイルへの追加の呼び出しをトリガーしません。具体的には、Agent は起動時にシークレットハンドルを含むファイルごとにユーザー提供の実行可能ファイルを 1 回呼び出し、Agent またはインスタンスが再起動された場合、または Agent がシークレットハンドルを含む新しいチェックを動的にロードした場合（オートディスカバリー経由など）、後で実行可能ファイルに対する追加の呼び出しを行う可能性があるということです。

APM とプロセスモニタリングは独自のプロセス/サービスで実行され、プロセスはメモリを共有しないため、それぞれがシークレットをロード/復号化できる必要があります。したがって、`datadog.yaml` にシークレットが含まれている場合、各プロセスが実行可能ファイルを 1 回呼び出すことがあります。たとえば、APM とプロセスモニタリングを有効にして `datadog.yaml` ファイルに `api_key` をシークレットとして格納すると、シークレットバックエンドへの呼び出しが 3 回行われる可能性があります。

設計上、ユーザー提供の実行可能ファイルは、ユーザーが必要とする可能性のあるエラー処理メカニズムを実装する必要があります。逆に、メモリ内でシークレットを更新する必要がある場合は（例: パスワードの失効）、Agent を再起動する必要があります。

ユーザー提供の実行可能ファイルに依存することには、複数の利点があります。

* Agent がシークレットハンドルのないパラメーターをメモリに読み込まないことが保証される。
* ユーザーが Agent の可視性を必要なシークレットに制限できる（たとえば、キー管理バックエンドでアクセス可能なシークレットのリストを制限する）
* ユーザーが Agent を再構築せずに任意のシークレット管理バックエンドを自由かつ柔軟に使用できる。
* 各ユーザーが Agent から自分のシークレット管理バックエンドまでのイニシャルトラスト問題を解決できる。これは、各ユーザーの好みの認証方法を活用し、継続的なインテグレーションワークフローに適合する形で発生します。

#### 構成

`datadog.yaml` で次の変数を設定します。

```text
secret_backend_command: <実行可能ファイルのパス>
```

#### Agent のセキュリティ要件

Agent はサブプロセスとして `secret_backend_command` 実行可能ファイルを実行します。Linux と Windows では実行パターンが異なります。

{{< tabs >}}
{{% tab "Linux" %}}

Linux では、`secret_backend_command` として設定される実行可能ファイルは以下である必要があります。

* Agent を実行しているのと同じユーザーに属している（デフォルトでは `dd-agent`、またはコンテナ内の `root`）。
* グループまたはその他の権限を持っていない。
* 所有者に対して少なくとも実行権限を持っている。

{{% /tab %}}
{{% tab "Windows" %}}

Windows では、`secret_backend_command` として設定される実行可能ファイルは以下である必要があります。

* `ddagentuser`（Agent の実行に使用したユーザー）の読み取り/実行を持っている。
* `Administrators` グループ、ビルトインローカルシステムアカウント、または Agent ユーザーコンテキスト（デフォルトでは `ddagentuser`）以外のユーザーまたはグループの権限を持っていない。
* 有効な Win32 アプリケーションであるため、Agent で実行できます（たとえば、PowerShell または Python スクリプトは機能しません）。

{{% /tab %}}
{{< /tabs >}}

**注**: 実行可能ファイルは、Agent と同じ環境変数を共有します。

絶対に `stderr` に機密情報を出力しないでください。バイナリが `0` 以外のステータスコードで終了する場合、トラブルシューティングを容易にするために、Agent は実行可能ファイルの標準エラー出力をログします。

#### 実行可能 API

実行可能ファイルは単純な API を尊重します。標準入力から JSON を読み取り、復号化されたシークレットを含む JSON を標準出力に出力します。

実行可能ファイルの終了コードが `0` 以外の場合、現在復号化されているインテグレーション構成はエラーと見なされ、ドロップされます。

**入力**:

実行可能ファイルは、取得するシークレットのリストを含む JSON ペイロードを標準入力から受信します。

```json
{"version": "1.0", "secrets": ["secret1", "secret2"]}
```

* `version`: フォーマットバージョン（現在は 1.0）を含む文字列です。
* `secrets`: 文字列のリストです。各文字列は、取得するシークレットに対応する構成からのハンドルです。

**出力**:

実行可能ファイルは、取得したシークレットを含む JSON ペイロードを標準出力に出力することが期待されます。

```json
{
  "secret1": {"value": "secret_value", "error": null},
  "secret2": {"value": null, "error": "シークレットを取得できませんでした"}
}
```

予想されるペイロードは JSON オブジェクトで、各キーは入力ペイロードでリクエストされたハンドルの 1 つです。各ハンドルの値は、2 つのフィールドを持つ JSON オブジェクトです。

* `value`: 文字列。チェック構成で使用される実際のシークレット値（エラーの場合は null にできます）。
* `error`: 文字列。必要に応じて、エラーメッセージ。エラーが null 以外の場合、このハンドルを使用するインテグレーション構成はエラーと見なされ、ドロップされます。

**例**:

以下は、すべてのシークレットの先頭に `decrypted_` を付けたダミーの Go プログラムです。

```go
package main

import (
  "encoding/json"
  "fmt"
  "io/ioutil"
  "os"
)

type secretsPayload struct {
  Secrets []string `json:secrets`
  Version int      `json:version`
}

func main() {
  data, err := ioutil.ReadAll(os.Stdin)

  if err != nil {
    fmt.Fprintf(os.Stderr, "標準入力から読み込めませんでした: %s", err)
    os.Exit(1)
  }
  secrets := secretsPayload{}
  json.Unmarshal(data, &secrets)

  res := map[string]map[string]string{}
  for _, handle := range secrets.Secrets {
    res[handle] = map[string]string{
      "value": "decrypted_" + handle,
    }
  }

  output, err := json.Marshal(res)
  if err != nil {
    fmt.Fprintf(os.Stderr, "res をシリアル化できませんでした: %s", err)
    os.Exit(1)
  }
  fmt.Printf(string(output))
}
```

これにより、この構成（チェックファイル内）

```yaml
instances:
  - server: db_prod
    user: ENC[db_prod_user]
    password: ENC[db_prod_password]
```

が次に更新されます（Agent のメモリ内）。

```yaml
instances:
  - server: db_prod
    user: decrypted_db_prod_user
    password: decrypted_db_prod_password
```

### オートディスカバリーのヘルパースクリプト

多くの Datadog インテグレーションは、メトリクスを取得するために資格情報を必要とします。[オートディスカバリーテンプレート][1]にこれらの資格情報を直接入力しないように、機密情報管理を使用し、資格情報をテンプレートと切り離すことができます。

[スクリプト][2]は Docker イメージ（`/readsecret.py`）として入手できます。

#### スクリプトの使用

スクリプトにはフォルダを引数として渡す必要があります。シークレットのハンドルは、このフォルダに対する相対的なファイル名として識別されます。機密情報の漏えいを避けるために、スクリプトはルートフォルダ以外に置かれたすべてのファイルへのアクセスを（シンボリックリンクのターゲットを含む）拒否します。

このスクリプトは [OpenShift の制限付き SCC オペレーション][3]との互換性を持たないため、Agent を `root` ユーザーとして実行する必要があります。

バージョン 6.10.0 から、構成値に含まれる `ENC[]` トークンを環境変数として渡せるようになりました。以前のバージョンでは、`datadog.yaml` やオートディスカバリーテンプレートに含まれる `ENC[]` トークン以外はサポートされませんでした。

#### セットアップの例

##### Docker Swarm のシークレット

[Docker シークレット][4]は `/run/secrets` フォルダ内でマウントされます。以下の環境変数を Agent コンテナに渡してください。

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/run/secrets
```

`db_prod_password` のシークレット値を使用するには、`/run/secrets/db_prod_password` ファイルで公開してから、テンプレートの `ENC[db_prod_password]` に挿入します。

##### Kubernetes のシークレット

Kubernetes では、ポッド内で[シークレットをファイルとして公開する][5]ことができます。

シークレットが `/etc/secret-volume` 内でマウントされている場合は、以下の環境変数を使用してください。

```
DD_SECRET_BACKEND_COMMAND=/readsecret.py
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```

**注**: Datadog Cluster Agent は Datadog Agent とは異なるコマンドを使用します:

```
DD_SECRET_BACKEND_COMMAND=/readsecret.sh
DD_SECRET_BACKEND_ARGUMENTS=/etc/secret-volume
```
Datadog Cluster Agent はまた、シークレットヘルパーのコマンドも異なるものを使用します。Node Agent で使用する `agent secret` の代わりに、Cluster Agent では `cluster-agent secret-helper` が用いられます。

この例のようにリンクさせると、パスワードフィールドが `/etc/secret-volume/password` ファイルに格納され、`ENC[password]` トークンを介してアクセス可能になります。

**注**: `/var/run/secrets` ではなく、専用のフォルダを使用することをお勧めします。そうすれば、すべてのサブフォルダに（機密性の高い `/var/run/secrets/kubernetes.io/serviceaccount/token` ファイルを含む）スクリプトからアクセスできます。

## トラブルシューティング

### 検出されたシークレットのリスト

Agent CLI の `secret` コマンドは、セットアップに関連するエラーが表示します。たとえば、実行可能ファイルの権限が正しくない場合などです。また、見つかったすべてのハンドルとそれらの場所もリストされます。

Linux では、コマンドは実行可能ファイルのファイルモード、所有者、グループを出力します。Windows では、ACL 権限がリストされます。

Linux の例

```shell
$> datadog-agent secret
=== Checking executable rights ===
Executable path: /path/to/you/executable
Check Rights: OK, the executable has the correct rights

Rights Detail:
file mode: 100700
Owner username: dd-agent
Group name: dd-agent

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from postgres.yaml
- db_prod_password: from postgres.yaml
```

Windows の例（管理者の Powershell から）

```powershell
PS C:\> & '%PROGRAMFILES%\Datadog\Datadog Agent\embedded\agent.exe' secret
=== Checking executable rights ===
Executable path: C:\path\to\you\executable.exe
Check Rights: OK, the executable has the correct rights

Rights Detail:
Acl list:
stdout:

Path   : Microsoft.PowerShell.Core\FileSystem::C:\path\to\you\executable.exe
Owner  : BUILTIN\Administrators
Group  : WIN-ITODMBAT8RG\None
Access : NT AUTHORITY\SYSTEM Allow  FullControl
         BUILTIN\Administrators Allow  FullControl
         WIN-ITODMBAT8RG\ddagentuser Allow  ReadAndExecute, Synchronize
Audit  :
Sddl   : O:BAG:S-1-5-21-2685101404-2783901971-939297808-513D:PAI(A;;FA;;;SY)(A;;FA;;;BA)(A;;0x1200
         a9;;;S-1-5-21-2685101404-2783901971-939297808-1001)

=== Secrets stats ===
Number of secrets decrypted: 3
Secrets handle decrypted:
- api_key: from datadog.yaml
- db_prod_user: from sqlserver.yaml
- db_prod_password: from sqlserver.yaml
```

### シークレットが挿入された後の構成の表示

`configcheck` コマンドを使うと、チェックの構成がどのように解決されるかを素早く確認できます。

```shell
sudo -u dd-agent -- datadog-agent configcheck

=== a check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host>
port: <decrypted_port>
password: <decrypted_password>
~
===

=== another check ===
Source: File Configuration Provider
Instance 1:
host: <decrypted_host2>
port: <decrypted_port2>
password: <decrypted_password2>
~
===
```

**注**: 構成ファイルの変更を適用するには、Agent を[再起動][6]する必要があります。

### secret_backend_command のデバッグ

Agent の外部でテストまたはデバッグするには、Agent の実行方法を模倣できます。

#### Linux

```bash
sudo su dd-agent - bash -c "echo '{\"version\": \"1.0\", \"secrets\": [\"secret1\", \"secret2\"]}' | /path/to/the/secret_backend_command"
```

Datadog Agent をインストールすると、`dd-agent` ユーザーが作成されます。

#### Windows

##### 権限関連のエラー

次のいずれかのエラーが発生した場合、セットアップに何かが欠落しています。[Windows の説明](#windows)をご覧ください。

1. 必要以外のグループまたはユーザーが実行可能ファイルに対する権限を持っている場合、次と同様のエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: Invalid executable 'C:\decrypt.exe': other users/groups than LOCAL_SYSTEM, Administrators or ddagentuser have rights on it
   ```

2. `ddagentuser` がファイルの読み取りと実行を行わない場合、同様のエラーがログに記録されます。
   ```
   error while decrypting secrets in an instance: could not query ACLs for C:\decrypt.exe
   ```

3. 実行可能ファイルは有効な Win32 アプリケーションである必要があります。そうでない場合、次のエラーがログに記録されます。
   ```
   error while running 'C:\decrypt.py': fork/exec C:\decrypt.py: %1 is not a valid Win32 application.
   ```

##### 実行可能ファイルのテスト

実行可能ファイルは、シークレットを取得するときに Agent によって実行されます。Datadog Agent は `ddagentuser` を使用して実行されます。このユーザーには特定の権限はありませんが、`Performance Monitor Users` グループの一部です。このユーザーのパスワードはインストール時にランダムに生成され、どこにも保存されることはありません。

これは、実行可能ファイルがデフォルトのユーザーまたは開発ユーザーで動作する可能性があることを意味しますが、`ddagentuser` にはより制限された権限があるため、Agent によって実行されるときは動作しません。

Agent と同じ条件で実行可能ファイルをテストするには、開発ボックスの `ddagentuser` のパスワードを更新します。このようにして、`ddagentuser` として認証し、Agent が実行するのと同じコンテキストで実行可能ファイルを実行できます。

これを行うには、次の手順を実行します。

1. `Local Security Policy` の `Local Policies/User Rights Assignement/Deny Log on locally` リストから `ddagentuser` を削除します。
2. `ddagentuser` に新しいパスワードを設定します（インストール時に生成されたパスワードはどこにも保存されないため）。Powershell で、次を実行します。

  ```powershell
  $user = [ADSI]"WinNT://./ddagentuser";
  $user.SetPassword("a_new_password")
  ```

3. サービスコントロールマネージャーの `DatadogAgent` サービスで使用されるパスワードを更新します。Powershell で、次を実行します。

  ```powershell
  sc.exe config DatadogAgent password= "a_new_password"
  ```

これで、`ddagentuser` としてログインして実行可能ファイルをテストできます。Datadog には、実行可能ファイルを別のユーザーとしてテストするのに役立つ [Powershell スクリプト][7]があります。これはユーザーコンテキストを切り替え、Agent が実行可能ファイルを実行する方法を模倣します。

使用方法の例

```text
.\secrets_tester.ps1 -user ddagentuser -password a_new_password -executable C:\path\to\your\executable.exe -payload '{"version": "1.0", "secrets": ["secret_ID_1", "secret_ID_2"]}'
Creating new Process with C:\path\to\your\executable.exe
Waiting a second for the process to be up and running
Writing the payload to Stdin
Waiting a second so the process can fetch the secrets
stdout:
{"secret_ID_1":{"value":"secret1"},"secret_ID_2":{"value":"secret2"}}
stderr: None
exit code:
0
```

### Agent が起動を拒否した場合

Agent が起動時に最初に行うことは、`datadog.yaml` をロードし、その中のシークレットを復号化することです。これは、ロギングを設定する前に行われます。これは、Windows のようなプラットフォームでは、`datadog.yaml` の読み込み時に発生するエラーはログに書き込まれず、`stderr` に書き込まれることを意味します。これは、シークレット用に Agent に提供された実行可能ファイルがエラーを返したときに発生する可能性があります。

`datadog.yaml` にシークレットがあり、Agent が起動を拒否した場合は

* `stderr` を表示できるように、Agent を手動で起動してみます。
* `datadog.yaml` からシークレットを削除し、最初にチェック構成ファイルでシークレットをテストします。

## その他の参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/agent/kubernetes/integrations/
[2]: https://github.com/DataDog/datadog-agent/blob/master/Dockerfiles/agent/secrets-helper/readsecret.py
[3]: https://github.com/DataDog/datadog-agent/blob/6.4.x/Dockerfiles/agent/OPENSHIFT.md#restricted-scc-operations
[4]: https://docs.docker.com/engine/swarm/secrets/
[5]: https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#create-a-pod-that-has-access-to-the-secret-data-through-a-volume
[6]: /ja/agent/guide/agent-commands/#restart-the-agent
[7]: https://github.com/DataDog/datadog-agent/blob/master/docs/agent/secrets_scripts/secrets_tester.ps1