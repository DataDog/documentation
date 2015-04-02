---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Videos(日本語)
kind: Documentation
---
In this section you will find videos we have created for every part of the product. If there is something missing you would like to see, let us know.

<ul>
<% tag_set(@items.select { |i| i[:kind] == "video"}).sort().each do |tag| %>
<li><a href="/ja/videos/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags()[tag] %>)</li>
<% end %>
</ul>


<ul>
<% tag_set(@items.select { |i| i[:kind] == "video" && i[:language] == "ja" }).sort().each do |tag| %>
<li><a href="/ja/videos/<%= tag.downcase %>/"><%= tag %></a> - (<%=count_tags()[tag] %>)</li>
<% end %>
</ul>
