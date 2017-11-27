---
title: I'm having problems with DogStatsD - where is the log for this?
kind: faq
customnav: agentnav
further_reading:
- link: "/agent/"
  tag: "Documentation"
  text: Learn more about the Datadog Agent
- link: "/developers/dogstatsd"
  tag: "Documentation"
  text: Learn more about the DogStatsD
---

Because DogStatsD can potentially receive a huge amount of data and logging the incoming UDP packets will likely put heavy load onto your resources we don't provide a logging mechanism.

That said, for debug purposes with DogStatsD submission there is a workaround using:

https://gist.githubusercontent.com/remh/deed8245ba74784f51de/raw/de858c35e3e1bcfeca167a18483fffde79045ee1/dogstatsd_debug.py.patch

To apply this:
```
cd /
curl https://gist.githubusercontent.com/remh/deed8245ba74784f51de/raw/de858c35e3e1bcfeca167a18483fffde79045ee1/dogstatsd_debug.py.patch | sudo patch -p 0
```
and then restart your agent:
```
sudo service datadog-agent restart 
```

Check the contents of the log here: `/var/log/datadog/dogstatsd.log`

Once done, remember to remove this using:
```
cd /
curl https://gist.githubusercontent.com/remh/deed8245ba74784f51de/raw/de858c35e3e1bcfeca167a18483fffde79045ee1/dogstatsd_debug.py.patch | sudo patch -p 0 -R
```
and then restart your agent:
```
sudo service datadog-agent restart
```

{{< partial name="whats-next/whats-next.html" >}}