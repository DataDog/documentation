---
last_modified: 2015/07/15
translation_status: complete
language: ja
title: Datadog Agent 入門
kind: guide
listorder: 1
---

<!-- <div class="alert alert-info">
To get started using the Agent, please select your platform on the sidebar to the left.
</div> -->

<div class="alert alert-info">
Datadog Agent の利用詳細については、左側のサイドバーからプラットフォームとなるOSを選択してください。
</div>

<!--
======================================================
What is the Agent?
======================================================
-->

<!-- <h2 id="what_is_the_agent">What is the Agent?</h2>

The Datadog Agent is piece of software that runs on your hosts. Its job is to faithfully collect events and metrics and bring them to Datadog on
your behalf so that you can do something useful with your monitoring and performance data.

The source code for the Datadog Agent can be found <a href='https://github.com/DataDog/dd-agent'>here</a>.

For information on running the Agent through a proxy please see <a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration">here</a>;
for which ranges to allow, please see <a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration#open-ports">here</a>. -->

## Datadog Agent ってなに ? {#what_is_the_agent}

Datadog Agent は、ターゲットホスト上で動作するソフトウェアです。その役割は、システムの監視データやパフォーマンスデータをビジネスに有効に活用していくために、ターゲットホスト上のイベントやメトリクスを取得し、Datadogに送信することです。

Datadog Agent のソースコードは、[Github](https://github.com/DataDog/dd-agent)で公開しています。

プロキシが設置されている環境で、Datadog Agent がデータを送信する必要がある場合は、次の<a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Proxy-Configuration">ドキュメント"Network Traffic and Proxy Configuration"</a>を参照してください。プロキシで開放するポートの情報に関しては、<a target="_blank" href="https://github.com/DataDog/dd-agent/wiki/Network-Traffic-and-Proxy-Configuration#open-ports">"Open Ports"</a>の項目を参照してください。

Datadog Agent は、次の３つの要素で構成されています: **Collector**, **Dogstatsd**, **Forwarder**

<!-- <ul>
<li>The collector runs checks on the current machine for whatever integrations you have
and it will capture system metrics like memory and CPU.
</li>
<li>Dogstatsd is a statsd backend server you can send custom metrics to from an application.
</li>
<li>The forwader is pushed data from both dogstatsd and the collector and queues
it up to be sent to Datadog.
</li>
</ul>
This is all controlled by one supervisor process. We keep this separate so you don't have to have the
overhead of each application if you don't want to run all parts (though we generally recommend you do). -->

- **Collector** は、ターゲットホストのCPU やメモリ等の一般的なシステムメトリクスを取得すると共に、インストールされているIntegrations の情報を取得します。
- **Dogstatsd** は、ターゲットホストで実行されているアプリケーションやコマンドラインスクリプトからカスタムメトリクスを送信することができるstatsdのサーバです。
- **Forwader** は、dogstatsd とCollector の両方からデータを受け取り、queueの順番に従ってDatadogに送信します。

**Collector**, **Dogstatsd**, **Forwarder** は、1つのスーパーバイザープロセスによって制御されています。このようにDatadog Agent のプロセスを要素単位で分割しているのは、不要な要素プロセスを停止することにより、Datadog Agent 全体の間接負荷(オーバーヘッド)を削減することができるようにしているためです。(但し一般的な用途では、要素毎のプロセスの停止はお勧めしません。)


<!--
======================================================
Agent Troubleshooting
======================================================
-->

<!-- <h3 id="troubleshooting">Agent Troubleshooting</h3>
<p>
If you ended up at this page and have not yet installed the Datadog Agent, please go <a href="https://app.datadoghq.com/account/settings#agent" target="_blank">here</a> for installation instructions.
If you just installed the Agent, it might take a few moments before you start seeing metrics appear.
The first place you can check for metrics is the <a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a>.
</p>
<p>
If you think you might be experiencing issues, the first thing to do is run the info command and check the Agent logs.
The info command and the log locations are dependent on your OS, which you can select from the navigation to the left for further information.
</p>

<h4 id="issue_installing">Issues getting the Agent installed</h4>

If you encountered an issue during the Agent installation that prevented any installation whatsoever from occurring, please reach out to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>.
Please let us know your OS and version, as well as how you are installing the Agent (and which agent version).
Also, please include the errors you encountered along the way.


<h4 id="issue_reporting">Issues getting the Agent reporting</h4>

If you get the Agent installed but are not seeing any data in Datadog, you can troubleshoot in the following manner.
First, run the info command. Select your OS in the nav column on the left of this page to see how to run this.
Does running the info command show any errors?

If not, you should also check the logs (location of the logs again depends on OS). Errors in the logs may also reveal the cause of any issues.

If not, please send both the full output of the info command and the logs as attachments to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>.



<h4 id="machine_time">Check your machine's time</h4>
We have also seen a few cases where machines have their clock set further in the future or the past, which can sometimes cause problems with metric submission.
To check for this, run:

<code>date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date</code>
<p>
This will output the current system’s date, and then make a request to our endpoint and grab the date on our end.
If these are more than a few minutes apart, you may want to look at the time settings on your server.
</p>


<h4 id="integrations">Issues getting integrations working</h4>

Datadog has quite a few <a href="http://www.datadoghq.com/integrations/" target="_blank">integrations</a> which are set
up through <a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">YAML files in the Agent</a>.

Here is a quick guide for troubleshooting getting integrations installed:

1. Run the info command (find this based on your OS in the left column above).
<br>
2. Is the integration showing up in the info command?

	+ <strong>No, it's not.</strong>
		* Check the configuration file, make sure it is in the right location and named correctly.
		* Check it in a YAML parser to make sure it has the correct syntax. Example files can be found <a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">here</a>.
		* If you moved or changed the file, restart the Agent and then rerun the info command to see if it is now showing up.
	+ <strong>Yes, it's there.</strong>
		* Check the <a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a> to see if system metrics are showing up from the host. For example, look for system.cpu.user from the host that is running the Agent and has that integration setup.
		* If there are still no metrics, check the logs for errors and please send them along, with the info command output, to <a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>. -->

### Datadog Agent のトラブルシューティング {#troubleshooting}

まだDatadog Agent をインストールしていない場合は、こちらの<a href="https://app.datadoghq.com/account/settings#agent" target="_blank">インストール手順</a>をご覧ください。このページにたどり着く直前にDatadog Agent をインストールした場合は、メトリクスが表示されるようになるまでに数分かかることがあります。

インストールが完了し、基本的なメトリクスを確認するには、<a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a> のページが最適です。

問題が発生していることが疑われる場合は、info コマンドを実行し、Datadog Agentのログを確認してください。 info コマンドと各ログの場所は、OSによって異なります。詳細については、左側のナビゲーションからお使いのOSを選択し、**トラブルシューティング**の項目を参照してください。


<h4 id="issue_installing">Datadog Agent のインストールに関わる問題</h4>

Datadog Agentのインストールプロセスが実行されない状況に遭遇した場合は、<a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>にご連絡ください。
その際に、Datadog Agent をインストールしようとしているホストのOS名とバージョン、Datadog Agent のインストール方法とバージョンもご連絡ください。
更に、エラーメッセージを添付してください。

<h4 id="issue_reporting">Datadog Agent のレポーティングに関わる問題</h4>

Datadog Agent のインストールは完了しているがダッシュボードにデータが表示さない場合は、infoコマンドを使ってトラブルシューティングをすることができます。各OSでのコマンドの使い方については、このページの左側のナビゲーションからお使いのOSを選択し確認してください。

**問題に関連するエラーの内容は、infoコマンドを使って表示できましたか？**

問題を探るためのエラー情報がinfoコマンドによって表示されない場合は、ログをチェックすると、エラー情報を発見できるかもしれません。ログの場所についても、先のOSのページをご確認ください。

ログをチェックしても問題が解決しない場合は、<a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a>宛に、infoコマンドの出力結果とlogファイルを添付し、ご連絡ください。

<h4 id="machine_time">まずは、ホストの時刻を確認してください!</h4>

これまでの経験から、ホストの時刻が大幅に進んでいたり、遅れていたりした場合、メトリクスの送信に問題が起きることが確認されています。まずは、ホストが持っいる時刻が正常に設定されているかを確認してください。

ホストとDatadog側の時刻の差をチェックするには、次のコマンドを実行します:

<code>date -u && curl -s -v https://app.datadoghq.com/intake 2>&1 | grep Date</code>
<p>
このコマンドは、ホストの日付・時刻を表示し、その後Datadog側にリクエストを実行し、リクエストの結果からDatadog側の日付・時刻を取得し表示します。もし、ホストとDatadog側の時刻の差が数分以上ある場合は、ホストの時刻を正常に設定してください。
</p>

<h4 id="integrations">Integrationsの動作に関連する問題</h4>

Dataddogが提供している<a href="http://docs.datadoghq.com/ja/integrations/" target="_blank">Integrations</a> には、Datadog Agent の<a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">設定ファイル</a>への追記が必要なものがあります。

**以下は、Integrationsのインストールに関連する問題のトラブルシュートのクイックガイドです:**

1. infoコマンドを実行します。 (コマンドの使い方は、各OSのページで確認してください）
2. トラブルシューティング中のIntegrations名は、infoコマンドで表示されましたか？

    + <strong>いいえ、表示されていません。</strong>
        * 設定ファイルが正しい場所にあり、正しい名前であるか確認してください。
        * YAML のパーサやシンタックスチェッカーを使って文法を確認してください。各Integrationsの<a href="https://github.com/DataDog/dd-agent/tree/master/conf.d" target="_blank">YAML設定ファイルのサンプル</a>は、Githubのリポジトリを参照してください。
        * 　YAML設定ファイルを移動したり、変更した場合は、Datadog Agent を再起動した後、再度infoコマンド実行し、Integrationsが表示されるか確認してください。
    + <strong>はい、表示されています。</strong>
        * <a href="https://app.datadoghq.com/metric/explorer" target="_blank">Metrics Explorer</a> のページでそのホストの一般的なメトリクス(CPU, HDD, メモリ等)が表示されているかを確認してください。例えば、Integrationsの設定を進めているホストの`system.cpu.user`選んでみてください。
        * メトリクスが全く表示されない場合は、ログファイルでエラー情報の状況を出力している部分がないか確認してください。その上で、エラー情報を含んでいそうなログファイルとinfoコマンドの出力ファイルとを添付し、<a href="mailto:support@datadoghq.com?Subject=Agent%20issues" target="_top">support@datadoghq.com</a> までお問い合わせください。　
