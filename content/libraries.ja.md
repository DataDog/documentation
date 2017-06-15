---
last_modified: 2015/03/31
translation_status: complete
language: ja
title: APIライブラリー
kind: documentation
sidebar:
  nav:
    - header: 公式ライブラリー
    - text: Python
      href: "#python"
    - text: Ruby
      href: "#ruby"
    - text: PHP
      href: "#php"
    - text: C#
      href: "#c#"
    - header: コミュニティーライブラリー
    - text: Java
      href: "#community-java"
    - text: Node.js
      href: "#community-node"
    - text: Perl
      href: "#community-perl"
    - text: Ruby
      href: "#community-ruby"
    - text: PHP
      href: "#community-php"
    - text: Go
      href: "#community-go"
    - text: Python
      href: "#community-python"
---

<!-- There are many libraries available to help you interact with the Datadog API.

<h4 id="python">Python</h4>
<ul>
  <li><a href="https://github.com/DataDog/dogapi">DogApi</a> - A Python Datadog API wrapper.</a></li>
  <li><a href="https://github.com/DataDog/dogstatsd-python">dogstatsd-python</a> - A Python DogStatsD client.</li>
</ul>

<h4 id="ruby">Ruby</h4>
<ul>
  <li><a href="https://github.com/DataDog/dogapi-rb">DogApi</a> - A Ruby Datadog API wrapper.</a></li>
  <li><a href="https://github.com/DataDog/dogstatsd-ruby">dogstatsd-ruby</a> - A Ruby DogStatsD client.</li>
</ul>

<h4 id="php">PHP</h4>
<ul>
  <li><a href="https://github.com/DataDog/php-datadogstatsd">php-datadogstatsd</a> - A
  PHP DogStatsD client.</li>
</ul>

<h4 id="c#">C#</h4>
<ul>
  <li><a href="https://github.com/DataDog/dogstatsd-csharp-client">dogstatsd-csharp-client</a> - A
  C# DogStatsD client.</li>
</ul>

<br/>　-->

<h3 class="official">公式ライブラリー</h3>

Datadog APIを操作するために、Datadogが公式に公開しているライブラリーです。


#### Python {#python}

- [DogApi](https://github.com/DataDog/dogapi) - Python Datadog API ラッパー.
- [dogstatsd-python](https://github.com/DataDog/dogstatsd-python) - Python DogStatsD クライアント.


#### Ruby {#ruby}

- [DogApi](https://github.com/DataDog/dogapi-rb) - Ruby Datadog API ラッパー.
- [dogstatsd-ruby](https://github.com/DataDog/dogstatsd-ruby) - Ruby DogStatsD クライアント.


#### PHP {#php}

- [php-datadogstatsd](https://github.com/DataDog/php-datadogstatsd) - PHP DogStatsD クライアント.


<h4 id="c#">C#</h4>

- [dogstatsd-csharp-client](https://github.com/DataDog/dogstatsd-csharp-client) C# DogStatsD クライアント.

<br />


<!-- <h3 class="community">Community Libraries</h3>

Some great folks have written their own libraries to help interact with
Datadog. Check them out:

<h4 id="community-java">Java</h4>
<ul>
  <li>
    <a
    href="https://github.com/indeedeng/java-dogstatsd-client">java-dogstatsd-client</a>
     - a DogStatsD Client for Java written by <a
    href="http://www.indeed.com/">Indeed</a>.
  </li>

  <li>
    <a href="https://github.com/coursera/metrics-datadog">metrics-datadog</a> -
    a backend to yammers's <a
    href="https://github.com/coursera/metrics-datadog">metrics</a> library written by
    <a href="https://www.coursera.org/">Coursera</a>.
  </li>

  <li>
    <a href="https://github.com/bazaarvoice/metrics-datadog">metrics-datadog</a> -
    a backend to codahale's <a
    href="https://github.com/bazaarvoice/metrics-datadog">metrics</a> library extended by
    <a href="http://www.bazaarvoice.com/">Bazaarvoice</a>.
  </li>

  <li>
    <a href="https://github.com/bazaarvoice/lassie">Lassie</a>
     - a Java screenboard API client by <a href="http://www.bazaarvoice.com/">Bazaarvoice</a>.
  </li>
</ul>
<h4 id="community-node">Node.js</h4>
<ul>
  <li>
    <a href="https://github.com/HashGo/node-datadog">node-datadog</a> -
    a Node.js API client, contributed by <a href="https://github.com/HashGo">HashGo</a>.
  </li>

  <li>
    <a href="https://github.com/joybro/node-dogstatsd">node-dogstatsd</a>
    - a Node.js DogStatsD client, contributed by <a
    href="https://github.com/joybro">Young Han Lee</a>.
  </li>

  <li>
    <a href="https://github.com/brettlangdon/node-dogapi">node-dogapi</a>
    - a Node.js API client, contributed by
    <a href="https://github.com/brettlangdon">Brett Langdon</a>.
  </li>
</ul>
<h4 id="community-perl">Perl</h4>
<ul>
  <li>
    <a href="https://github.com/jpinkham/webservice-datadog">webservice-datadog</a> -
    a Perl API client, contributed by <a href="https://github.com/jpinkham">Jennifer Pinkham</a>.
  </li>

  <li>
    <a href="https://github.com/zipkid/dogstatsd-perl">dogstatsd-perl</a>  -
    a Perl DogStatsD client, contributed by <a
      href="https://github.com/zipkid">Stefan Goethals</a>.
  </li>
</ul>
<h4 id="community-ruby">Ruby</h4>
<ul>
  <li>
    <a
    href="https://github.com/mavenlink/metriks-dogstatsd">metricks-dogstatsd</a> -
    a backend for the popular <a href="https://github.com/eric/metriks">Metriks</a> gem, written by
    <a href="https://www.mavenlink.com/">Mavenlink</a>.
  </li>
</ul>
<h4 id="community-php">PHP</h4>
<ul>
  <li>
    <a
    href="https://github.com/isra00/plesk_datadog_metrics">plesk_metrics_datadog</a> -
    a PHP script to collect metrics from <a
    href="http://www.parallels.com/products/plesk/">Plesk</a> by
    <a href="https://github.com/isra00">Israel Viana</a>.
  </li>
</ul>
<h4 id="community-go">Go</h4>
<ul>
  <li>
    <a
      href="https://github.com/xb95/go-datadog-api">go-datadog-api</a> - a
    Go wrapper for our API by
    <a href="https://github.com/xb95">Mark Smith</a>.
  </li>
  <li>
      <a
      href="https://github.com/ooyala/go-dogstatsd/">go-dogstatsd</a> - a
    dogstatsd client written in Go by
    <a href="https://github.com/ooyala">Ooyala</a>.
  </li>
</ul>
<h4 id="community-python">Python</h4>
<ul>
  <li>
    <a
      href="https://github.com/tbarbugli/scales_datadog">scales_datadog</a> - a
    Datadog backend for the <a href="https://github.com/Cue/scales">Scales</a>
    library, written by <a href="https://github.com/tbarbugli">Tommaso Barbugli</a>.
  </li>
</ul>
<h4 id="community-scala">Scala</h4>
<ul>
  <li>
    <a href="https://github.com/gphat/datadog-scala">datadgog-scala</a> - a
      Scala API client, written by <a href="https://github.com/gphat">Cory Watson</a>.
  </li>
</ul>

<br /> -->


<h3 class="community">コミュニティーライブラリー</h3>

Datadog APIを操作するために、コミュニティーのメンバーが開発/公開しているライブラリーです。

#### Java {#community-java}

- [java-dogstatsd-client](https://github.com/indeedeng/java-dogstatsd-client) - Jave向けDogStatsDクライエント by [Indeed](http://www.indeed.com/).
- [metrics-datadog](https://github.com/coursera/metrics-datadog) - codahale'の[metrics](https://github.com/coursera/metrics-datadog)ライブラーリのバックエンド by [Coursera](https://github.com/coursera).
- [Lassie](https://github.com/bazaarvoice/lassie) - Jave向け screenboard APIクライエント by [Bazaarvoice](http://www.bazaarvoice.com/).

#### Node.js {#community-node}

- [node-datadog](https://github.com/HashGo/node-datadog) - Node.js向け APIクライエント by [HashGo](https://github.com/HashGo).
- [node-dogstatsd](https://github.com/joybro/node-dogstatsd) - Node.js向け DogStatsDクライエント by [Young Han Lee](https://github.com/joybro).
- [node-dogapi](https://github.com/brettlangdon/node-dogapi) - Node.js向け APIクライエント by [Brett Langdon](https://github.com/brettlangdon).


#### Perl {#community-perl}
- [webservice-datadog](https://github.com/jpinkham/webservice-datadog) -　Perl向け APIクライエント by [Jennifer Pinkham](https://github.com/jpinkham).

- [dogstatsd-perl](https://github.com/zipkid/dogstatsd-perl) - a Perl DogStatsD client, contributed by [Stefan Goethals](https://github.com/zipkid).
- [dogstatsd-perl](https://github.com/zipkid/dogstatsd-perl) - Perl向け DogStatsDクライエント by [Stefan Goethals](https://github.com/zipkid).

#### Ruby {#community-ruby}

- [metricks-dogstatsd](https://github.com/mavenlink/metriks-dogstatsd) - 有名な[Metriks](https://github.com/eric/metriks)　gemのバックエンド by [Mavenlink](https://www.mavenlink.com/).


#### PHP {#community-php}

- [plesk_metrics_datadog](https://github.com/isra00/plesk_datadog_metrics) - [Plesk](http://www.parallels.com/products/plesk/)からメトリクスを収集するためのPHPのスクリプト by [Israel Viana](https://github.com/isra00).


#### Go {#community-go}

- [go-datadog-api](https://github.com/xb95/go-datadog-api) - Go向け APIラッパーwrapper　by [Mark Smith](https://github.com/xb95).
- [go-dogstatsd](https://github.com/ooyala/go-dogstatsd/) - Goで開発されたdogstatsdクライエント by [Ooyala](https://github.com/ooyala).


#### Python {#community-python}

- [scales_datadog](https://github.com/tbarbugli/scales_datadog) - [Scales](https://github.com/Cue/scales)ライブラリーのDatadogバックエンド by [Tommaso Barbugli](https://github.com/tbarbugli).

<br />


<!-- <h3 class="community">Integration Libraries</h3>
<h4 id="community-saltstack">Saltstack</h4>
<ul>
  <li>
    <a
      href="https://github.com/DataDog/datadog-formula">Datadog Salstack Formula</a>
  </li>
  <li>
      <a
      href="https://gist.github.com/mastrolinux/6175280">Datadog Saltstack</a> written by
    <a href="https://gist.github.com/mastrolinux">Luca Cipriani</a>.
  </li>
</ul>
<h4 id="ansible">Ansible</h4>
<ul>
  <li>
    This <a
      href="https://gist.github.com/alekstorm/6350729">Ansible script </a> is a
    callback plugin that posts events to your Datadog event stream as you deploy
    and is written by <a href="https://gist.github.com/alekstorm">Alek Storm</a>.
  </li>
</ul>
<h4 id="community-freeswitch">FreeSwitch</h4>
<ul>
  <li>
    This is for a <a
      href="https://github.com/wimactel/FreeSwitch-DataDog-Metrics">FreeSwitch ESL </a>
      application to export statistics to DataDog using the dogstatsd API
    and is written by <a href="https://github.com/wimactel">WiMacTel</a>.
  </li>
</ul>

<h4 id="community-google">Google Analytics</h4>
<ul>
  <li>
    You can get data into Datadog from Google Analytics using our API with <a
      href="https://github.com/adamdunkley/casperjs-google-analytics-realtime-scrape">this library</a>.
  </li>
</ul>

<h4 id="community-pidstats">Pid-stats</h4>
<ul>
  <li>
    This <a
      href="https://github.com/gitterHQ/pid-stats">library</a> will allow you to generate process information from StatsD, given pid files. It was created by <a
      href="https://github.com/gitterHQ">GitterHQ</a>.
  </li>
</ul>

<h4 id="community-logstash">Logstash</h4>
<ul>
  <li>
    <a
      href="https://gist.github.com/conorbranagan/c001078d148d2cab38a0">This script </a> will allow you to get data in from Logstash and was written by Datadog's very own <a href="https://gist.github.com/conorbranagan/">Conor Branagan</a>.
  </li>
</ul>

<h4 id="community-colorscheme">Reverse Color Scheme</h4>
<ul>
  <li>
    To get a darker background than default, you can use
    <a href="http://stylebot.me/styles/4320">this CSS library</a> to flip the colors.
  </li>
</ul>

<br /> -->



<h3 class="community">インテグレーションライブラリー</h3>

#### Saltstack {#community-saltstack}

- [Datadog Salstack Formula](https://github.com/DataDog/datadog-formula)
- [Datadog Saltstack](https://gist.github.com/mastrolinux/6175280) by [Luca Cipriani](https://gist.github.com/mastrolinux)


#### Ansible {#ansible}

- [Ansible script](https://gist.github.com/alekstorm/6350729) - Datadogのイベントストリームにイベントを投稿するためのコールバックプラグイン by [Alek Storm](https://gist.github.com/alekstorm).


#### FreeSwitch {#community-freeswitch}

- [FreeSwitch-DataDog-Metrics](https://github.com/wimactel/FreeSwitch-DataDog-Metrics) - FreeSwitch ESLアプリケーションの統計情報をDogStatsD APIを使ってDatadogに書きすための仕組みです。 by [WiMacTel](https://github.com/wimactel).

#### Google Analytics {#community-google}

- [casperjs-google-analytics-realtime-scrape](https://github.com/adamdunkley/casperjs-google-analytics-realtime-scrape) - Datadog APIを使って、Google Analyticsからデータを取り込むためのライブラリー.


#### Pid-stats {#community-pidstats}

- [pid-stats](https://github.com/gitterHQ/pid-stats) - StatsDからプロセス情報を生成するライブラリー by [GitterHQ](https://github.com/gitterHQ).


#### Logstash {#community-logstash}

- [dogstatsd.rb](https://gist.github.com/conorbranagan/c001078d148d2cab38a0) - Logstashからデータを取り込むためのライブラリー by Datadogメンバーの[Conor Branagan](https://gist.github.com/conorbranagan/).


#### Reverse Color Scheme {#community-colorscheme}

- デフォルトより暗い背景色を設定するためのに、サイトの色味を変更する [CSSライブラリー](http://stylebot.me/styles/4320).

<br />


<!-- <p class="alert alert-warning">
If you've written a Datadog library, write us at <a
href="mailto:code@datadoghq.com">code@datadoghq.com</a> and we'll be happy
to add it to the list.
</p> -->

<p class="alert alert-warning">
Datadogのライブラリーを開発した場合は、<a
href="mailto:code@datadoghq.com">code@datadoghq.com</a>へ是非ご連絡ください。
上記リストへ追加していきたいと思います。
</p>
