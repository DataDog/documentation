include Nanoc::Helpers::XMLSitemap
include Nanoc::Helpers::Rendering
include Nanoc::Helpers::LinkTo
require 'nokogiri'

# general functions

def collect_example_items
  @items.select { |item| item[:kind] == 'example' && !(item.identifier.match('/ja/')) }
end

def collect_video_items
  @items.select { |item| item[:kind] == 'video' && !(item.identifier.match('/ja/')) }
end

def collect_integration_items
  integrations = @items.select { |item| item[:kind] == 'integration' && (item[:beta]!=true) && !(item.identifier.match('/ja/')) }
  integrations.sort_by { |i| i[:integration_title].downcase }
  # $all_itegration_items = integrations
end

def collect_guide_items
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && (item[:beta]!=true) && !(item.identifier.match('/ja/')) }
  guides.sort_by { |item| item[:listorder] }
end

# Japanese specific functions
def collect_ja_example_items
  @items.select { |item| item[:kind] == 'example' && item[:language] == 'ja' && item.identifier.match('/ja/') }
end

def collect_ja_video_items
  @items.select { |item| item[:kind] == 'video' && item[:language] == 'ja' && item.identifier.match('/ja/') }
end

def collect_ja_integration_items
  integrations = @items.select { |item| item[:kind] == 'integration' && item[:language] == 'ja' && item.identifier.match('/ja/') }
  integrations.sort_by { |i| i[:integration_title].downcase }
end

def collect_ja_guide_items
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && (item[:beta]!=true) && item[:language] == 'ja' && item[:translation_status] == "complete" && item.identifier.match('/ja/') }
  guides.sort_by { |item| item[:listorder] }
end

def ja_guide_items_yet
  guides = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && (item[:beta]!=true) && item[:language] == nil }
  guides_translated = @items.select{ |item| item[:kind] == 'guide' && item[:listorder] != nil && item[:language] == 'ja' && item[:translation_status] == "complete" && item.identifier.match('/ja/') }

  guides_translated.each do |jp_content|
    guides.each do |en_content|
      if jp_content.identifier.split('/')[-1] == en_content.identifier.split('/')[-1]
        guides.delete(en_content)
        # p jp_content.identifier.split('/')[-1]
      end
    end
  end

  guides.sort_by { |item| item[:listorder] }
end


def show_autotoc
  doc = Nokogiri::HTML(@item.compiled_content)
  headers = doc.css("h1, h2, h3, h4, h5, h6")
  if headers.length > 0
    toplevel = headers.min {|a, b| a.name[-1]<=>b.name[-1]}.name[-1].to_i
    headers = headers.map {|h| {level: h.name[-1].to_i - toplevel +1, id: h['id'], title: h.text}}
    
    toc = ""
    toc+= "<li class='nav-header'>Table of Contents</li>"
    headers.each do |header|
      style=""
      case header[:level]
      when 1
        style=""
      when 2
        style="padding: 5px 25px;"
      when 3
        style="padding: 3px 35px;font-size:13px;"
      when 4
        style="padding: 2px 45px;font-size:12px;"
      when 5
        style="padding: 1px 55px;font-size:10px;"
      end
      toc += "<li><a style='#{style}' href='##{header[:id]}' onclick=\"$('#').collapse('show')\">#{header[:title]}</a></li>"
    end
  end
  return toc
end

def show_table_of_contents
  sidebarnav=""
  if (@item[:sidebar] && @item[:sidebar][:nav])&&@item[:autotoc]!=true
    @item[:sidebar][:nav].each do |i|
      if i[:header]
        # sidebarnav += "<li class='nav-header'>#{i[:header]}</li>"
        sidebarnav += "<li class='nav-header'>Table of Contents</li>"
      else
        sidebarnav += "<li><a href='#{i[:href]}' onclick=\"$('##{i[:collapseid]}').collapse('show')\">#{i[:text]}</a></li>"
      end
    end
  else
    sidebarnav = show_autotoc
  end
  # <% @item[:sidebar][:nav].each do |i| %>
  #               <% if i[:header] %>
  #                 <li class="nav-header"><%= i[:header] %></li>
  #               <% else %>
  #                 <li><a href="<%= i[:href]%>" onclick="$('#<%= i[:collapseid] %>').collapse('show')"><%= i[:text] %></a></li>
  #               <% end %>
  #             <% end %>
  return sidebarnav
end

def github_metrics_store_filename
  'github_metrics'
end

def get_all_metrics_from_github
  require 'octokit'
  require 'pp'
  require 'yaml'
  require 'csv'

  allmetrictables = []
  if ENV.has_key?('github_personal_token')
    pp "Getting all metrics from github after a \'rake clean\'. This takes about 20 seconds on a good connection, much longer on JetBlue"
    repo = 'datadog/dogweb'
    reporootdir = $client.contents(repo, :path => "integration/")

    reporootdir.each do |intdir|
      if intdir[:type]=="dir"
        intdirlist = $client.contents(repo, :path => "/integration/#{intdir[:name]}")
        intdirlist.each { |intdircontent|
          if intdircontent[:type] == "file" && intdircontent[:name].end_with?("metadata.csv")
            csvcontent = Base64.decode64($client.contents(repo, :path => "integration/#{intdir[:name]}/#{intdircontent[:name]}").content)

            metric_string = "<table class='table'>"
            CSV.parse(csvcontent, {:headers => true, :converters => :all}) do |row|
              description = row['description']
              if description.nil?
                description = ' '
              end
              metric_string+= "<tr><td><strong>#{row['metric_name']}</strong><br/>(#{row['metric_type']}"
              if row['interval'] != nil
                metric_string += " every #{row['interval']} seconds"
              end
              metric_string += ")</td><td>#{description.gsub '^', ' to the '}"
              if row['unit_name'] != nil
                metric_string += "<br/>shown as #{row['unit_name']}"
                if row['per_unit_name'] != nil
                  metric_string += "/#{row['per_unit_name']}"
                end
              end
              metric_string += "</td></tr>"
            end
            metric_string+="</table>"
            metric_string.force_encoding('utf-8')
            allmetrictables << {"integration" => intdir[:name], "table" =>metric_string}
          end
        }
      end
    end
    serialize_github_metrics(allmetrictables)
  end
  return allmetrictables
end

def serialize_github_metrics(items)
  File.open(github_metrics_store_filename, 'a') do |f|
    Marshal.dump(items, f)
  end
end

def insert_example_links(integration: item[:integration_title], conf:  integration.downcase.tr(" ", "_"), check: integration.downcase.tr(" ", "_"), yaml_extension: "example", include_intro: true)
  example_links = include_intro ? "For more details about configuring this integration refer to the following file(s) on GitHub:\n" : ""
  yaml_example = conf!="none" ? "<li><a href='https://github.com/DataDog/dd-agent/blob/master/conf.d/" + conf + ".yaml."+yaml_extension+"'> "+ integration + " YAML example</a></li>" : ""
  checks_file =  check!="none" ? "<li><a href='https://github.com/DataDog/dd-agent/blob/master/checks.d/" + check + ".py'>" + integration + " checks.d</a></li>" : ""

  example_links += "<ul>" + yaml_example + checks_file + "</ul>\n"
  return example_links
end

def get_metrics_from_git
  require 'octokit'
  require 'base64'
  require 'csv'

  if File.exist?(github_metrics_store_filename)
    allmetrics = Marshal.load(File.binread(github_metrics_store_filename))
  else
    allmetrics = get_all_metrics_from_github
  end

  begin
    # if ENV.has_key?('github_personal_token')
    ititle = @item[:git_integration_title]
    return allmetrics.find { |h| h['integration'] == ititle}["table"]
  rescue Exception => e
    pp "**** There was a problem getting GitHub Metrics for #{@item[:title]} ****"
    pp e
  end
end

def get_units_from_git
  require 'octokit'
  require 'base64'
  require 'csv'

  if ENV.has_key?('github_personal_token')
    itext = $client.contents('datadog/dogweb', :path => "integration/system/units_catalog.csv").content
    unit_string = ""
    units_by_family = Hash.new([])
    CSV.parse(Base64.decode64(itext), :headers => true) do |row|
      # row.each do |unit_id, family, name, plural, short_name, scale_factor|
      if units_by_family.has_key?(row['family'])
        units_by_family[row['family']].push(row['name'])
      else
        units_by_family[row['family']] = [row['name']]
      end

    end

    units_by_family.keys.each do |family|
      unit_string += "<h2>#{family}</h2>"
      units_by_family[family].each do |unit_name|
        unit_string += "<ul>"
        unit_string += "<li>#{unit_name}</li>"
        unit_string += "</ul>"
      end
    end
    output = unit_string
  else
    output = "<strong>Units is auto-populated based on data from a Datadog internal repo. It will be populated when built into production.</strong>"
    # raise "Github personal token required"
  end

return output
end

def get_cache_bust_fingerprints
  cbfingerprints = Hash.new()
  @items.each do |item|
    if item.identifier.match("bootstrap3")
      cbfingerprints["bootstrap3"] = fingerprint(item[:filename])
    elsif item.identifier.match("style")
      cbfingerprints["style"] = fingerprint(item[:filename])
    end
  end
  return cbfingerprints
end

def create_redirect_pages
  if @config.key?(:redirects)
    if !@config[:redirects].to_a.empty?
      @config[:redirects].each do |redirect|
        raw_content = <<EOF
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8"/>
    <title>#{redirect[:from]}</title>
    <meta http-equiv="refresh" content="0;URL='#{redirect[:to]}'" />
  </head>
  <body>
    <p>This page has moved to <a href="#{redirect[:to]}">#{redirect[:to]}</a>.</p>
  </body>
</html>
EOF
        @items << Nanoc::Item.new(
            raw_content,
            {
              :title => "redirect"
            },
            redirect[:from],
            :binary => false
          )
      end
    end
  end
end

def create_tag_pages(items=nil, options={})
  options[:tag_pattern]     ||= "%%tag%%"
  options[:title]           ||= options[:tag_pattern]
  options[:identifier]      ||= "/tags/#{options[:tag_pattern]}/"
  options[:template]        ||= "tag"

  tag_set(items).each do |tagname|
    raw_content = "<%= render('#{options[:template]}', :tag => '#{tagname}') %>"
    attributes  = { :title => options[:title].gsub(options[:tag_pattern], tagname) }
    identifier  = options[:identifier].gsub(options[:tag_pattern], tagname)

    @items << Nanoc::Item.new(raw_content, attributes, identifier, :binary => false)
  end
end

def tag_set(items=nil)
  items ||= @items
  items.map { |i| i[:tags] }.flatten.uniq.delete_if{|t| t.nil?}
end

def tag_links_for(item, omit_tags=[], options={})
  tags = []
  return tags unless item[:tags]

  options[:tag_pattern]     ||= "%%tag%%"
  options[:title]           ||= options[:tag_pattern]
  options[:file_extension]  ||= ".html"
  options[:url_format]      ||= "/tags/#{options[:tag_pattern]}#{options[:file_extension]}"

  tags = item[:tags] - omit_tags

  tags.map! do |tag|
      title = options[:title].gsub(options[:tag_pattern], tag.downcase)
      url = options[:url_format].gsub(options[:tag_pattern], tag.downcase)
      content_tag('a', title, {:href => url})
  end
end

def content_tag(name, content, options={})
  "<#{name}#{tag_options(options) if options}>#{content}</#{name}>"
end

def tag_options(options)
  unless options.empty?
    attributes = []
    options.each do |key, value|
      attributes << %(#{key}="#{value}")
    end
    ' ' + attributes.join(' ')
  end
end

def count_tags(items=nil)
  items ||= @items
  tags = items.map { |i| i[:tags] }.flatten.delete_if{|t| t.nil?}
  tags.inject(Hash.new(0)) {|h,i| h[i] += 1; h }
end

def items_with_tag(tag, items=nil)
  items = sorted_articles if items.nil?
  items.select { |item| has_tag?( item, tag ) }
end

def has_tag?(item, tag)
  return false if item[:tags].nil?
  item[:tags].include? tag
end
# def create_tag_pages(items=nil, options={})
#       options[:tag_pattern]     ||= "%%tag%%"
#       options[:title]           ||= options[:tag_pattern]
#       options[:identifier]      ||= "/tags/#{options[:tag_pattern]}/"
#       options[:template]        ||= "tag"

#       tag_set(items).each do |tagname|
#         raw_content = "<%= render('#{options[:template]}', :tag => '#{tagname}') %>"
#         attributes  = { :title => options[:title].gsub(options[:tag_pattern], tagname) }
#         identifier  = options[:identifier].gsub(options[:tag_pattern], tagname)

#         @items << Nanoc::Item.new(raw_content, attributes, identifier, :binary => false)
#       end
#     end
