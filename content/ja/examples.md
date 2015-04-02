---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Examples(日本語)
kind:
---
In this section you will find examples of configurations from across the entire product. Each example may include screenshots, code, output, and/or data. If there is something missing you would like to see, let us know.

<ul>
<% tag_set(@items.select { |i| i[:kind] == "example" }).sort().each do |tag| %>
<li><a href="/ja/examples/<%= tag.downcase %>/"><%= tag %></a> - (<%= count_tags()[tag]/2 %>)</li>
<% end %>
</ul>
