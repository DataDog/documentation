---
title: Videos
kind: Documentation
---
At Datadog, we want to make sure you have all the tools you need to use and understand our product. Some people learn better with text, some with pictures, some with video, and some prefer a mixture of everything. In this section we present the videos we have created. If there is a video you think we need to produce to help solve a common problem, suggest it to our Evangelist on twitter: <%= link_to "@technovangelist",  "http://twitter.com/technovangelist" %>.

The videos are organized by keyword. Click on any of the keywords below to find a relevant video.

<ul>
<% tag_set($video_items).sort().each do |tag| %>
<li><a href="/videos/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags($video_items)[tag] %>)</li>
<% end %>
</ul>
 
