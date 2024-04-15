---

title: JBoss EAP 7 と Datadog の JMX 経由のモニタリング
---

## 概要

KP JBoss EAP 7 クラウドイメージに Datadog をインストール、構成し、JMX で JVM を監視するために作成した手順です。

## セットアップ

### 前提条件

Datadog をインストールし、JBoss EAP 7 とインテグレーションするには、以下の条件が満たされていることを確認します。

* KP の JBoss EAP 7/RHEL7.5 バンドルイメージ (C2C または BTO) がインストールされている。
* JBoss EAP 7 が構成され、機能している。
* NTPD のインストールと構成が完了し、使用する各システムで動作している。

### Datadog Agent のインストール

[CentOS/RedHat の Agent インストールに従う][1]

### JBoss EAP 7 の編集

`domain.xml` ファイルに以下の行を追加します。

使用するプロファイルの中で、これらの行を必ず追加してください。

`<subsystem xmlns="urn:jboss:domain:jmx:1.3">` の場合、以下を追加します。

```text
<remoting-connector use-management-endpoint="false"/>
```

`<subsystem xmlns="urn:jboss:domain:remoting:4.0">` の場合、以下を追加します。

```text
<connector name="remoting-connector" socket-binding="remoting" securityrealm="ApplicationRealm"/>
```

`<socket-binding-group name="full-ha-sockets" default-interface="public">` の場合、以下を追加します。

```text
<socket-binding name="remoting" port="4447"/>
```

Application Realm のアプリケーションユーザーを追加します。

```text
JBoss_EAP_INSTALL_DIR/bin/add_user.sh
```

**注**: 必ず Application Realm に追加してください。

jboss プロセスを起動/再起動します。`server.log` ファイルに以下のメッセージが表示されることを確認します。

```text
2018-08-08 16:01:53,354 INFO [org.jboss.as.remoting] (MSC service thread 1-4) WFLYRMT0001: Listening on
xx.xx.xx.xx:4447
```

ドメイン構成を想定し、`JBoss_EAP_INSTALL_DIR/domain/configuration/application.keystore` に Datadog ID による読み取りアクセスがあることを確認します (perms は 644 以上)

###Datadog の編集

`/etc/datadog-agent/datadog.yaml` ファイルを編集し、プロセス収集を有効にします。

```yaml
process_config:
  enabled: "true"
```

`/etc/datadog-agent/conf.d/jmx.d/conf.yaml` ファイルを編集し、jmx インテグレーションを有効にします。

```yaml
init_config:

  custom_jar_paths:
    - JBoss_EAP_INSTALL_LOCATION/bin/client/jboss-cli-client.jar

instances:
  - jmx_url: "service:jmx:remote://{FQDN or IP}:4447"
    user: xxxxxxxx (userid created via jboss add_user.sh)
    password: yyyyyyyy (created via jboss add_user.sh)
    java_bin_path: /etc/alternatives/java
    name: jboss_jmx_instance
    trust_store_path: /apps/jboss/jboss-eap-7.1/domain/configuration/application.keystore
    trust_store_password: password (use password found in domain.xml)
    conf:
      - include:
        domain: my_domain
        bean:
```

その後、[Datadog Agent を `Start/restart`][2] します。

最後に、[Datadog Agent status コマンド][3]を実行し、Datadog が JMX 経由で JBoss JVM に接続できることを確認します。次のような出力が得られるはずです。

```text
========
JMXFetch
========
 Initialized checks
08/10/2018 4
 ==================
 jmx
 instance_name : jboss_jmx_instance
 message :
 metric_count : 13
 service_check_count : 0
 status : OK
 Failed checks
 =============
 no checks
```

[1]: https://app.datadoghq.com/account/settings#agent/centos
[2]: /ja/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[3]: /ja/agent/guide/agent-commands/#agent-status-and-information
