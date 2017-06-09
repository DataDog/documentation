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
  integrations = @items.select { |item| item[:kind] == 'integration' && item[:language] == 'ja' && (item[:beta]!=true) && item.identifier.match('/ja/') }
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
  maxdepth = @item.attributes.include?(:autotocdepth) ? @item[:autotocdepth]:5
  headers = doc.css("h1, h2, h3, h4, h5, h6")
  if headers.length > 0
    toplevel = headers.min {|a, b| a.name[-1]<=>b.name[-1]}.name[-1].to_i
    headers = headers.map {|h| {level: h.name[-1].to_i - toplevel +1, id: h['id'], title: h.text}}

    toc = ""
    toc+= "<li class='nav-header'>Table of Contents</li>"
    headers.each do |header|
      if header[:level] <= maxdepth
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

  $allmetrics = {}
  if ENV.has_key?('github_personal_token') && $goodconnection
    pp "Getting all metrics from github after a \'rake clean\'. This takes about 20-60 seconds on a good connection"
    repo = 'datadog/dogweb'
    ref = ENV['branch'] || 'prod'
    pp "Metrics will be pulled from repo '" + repo + "', branch '" + ref + "'"
    reporootdir = $client.contents(repo, :path => "integration/", :ref => ref)

    reporootdir.each do |intdir|
      if intdir[:type] == "dir"
        intdirlist = $client.contents(repo, :path => "/integration/#{intdir[:name]}", :ref => ref)
        intdirlist.each {|intdircontent|
          if intdircontent[:type] == "file" && intdircontent[:name].end_with?("metadata.csv")
            csvcontent = Base64.decode64($client.contents(repo, :path => "integration/#{intdir[:name]}/#{intdircontent[:name]}", :ref => ref).content)
            metrics = []
            begin
              CSV.parse(csvcontent, {:headers => true, :converters => :all}) do |row|
                description = row['description'].nil? ? '' : row['description']
                metric_name = row['metric_name']
                metric_type = row['metric_type']
                metric_unit = row['unit_name'].nil? ? '' : row['unit_name']
                metric_per_unit = row['per_unit_name'].nil? ? '' : row['per_unit_name']
                metric_interval = row['interval'].nil? ? 0 : row['interval'].to_i
                metrics << {
                  :name => metric_name,
                  :type => metric_type,
                  :interval => metric_interval,
                  :description => description,
                  :unit => metric_unit,
                  :per_unit => metric_per_unit
                  }
              end
              $allmetrics[intdir['name']] = metrics
            rescue
              pp "An error occured while trying to parse the csv file " + intdircontent[:name] + " from dogweb integrations!"
            end
          end
        }
      end
    end
    serialize_github_metrics($allmetrics, github_metrics_store_filename)
  end
  return $allmetrics
end

def serialize_github_metrics(items, filename)
  File.open(filename, 'a') do |f|
    Marshal.dump(items, f)
  end
end

def insert_example_links(integration: item[:integration_title], conf:  integration.downcase.tr(" ", "_"), check: integration.downcase.tr(" ", "_"), yaml_extension: "example", include_intro: true)
  example_links = include_intro ? "For more details about configuring this integration refer to the following file(s) on GitHub:\n" : ""
  integrationwebroot='https://github.com/Datadog/integrations-core/blob/master/'

  yaml_example = ""
  if conf!="none"
    url = integrationwebroot + conf + "/conf.yaml.example"
    yaml_example = "<li><a href='" + url + "'>" + integration + " YAML example</a></li>"
  end

  checks_file = ""
  if check != "none"
    url = integrationwebroot + check + "/check.py"
    checks_file = "<li><a href='" + url + "'>" + integration + " checks.d</a></li>"
  end

  example_links += "<ul>" + yaml_example + checks_file + "</ul>\n"
  return example_links
end

def get_metrics_from_git(itemintegration=@item[:git_integration_title], items_to_include="")
  items_to_include = items_to_include.split(/\s*,\s*/)
  if $allmetrics == nil
    if File.exist?(github_metrics_store_filename)
      $allmetrics = Marshal.load(File.binread(github_metrics_store_filename))
    else
      $allmetrics = get_all_metrics_from_github()
    end
  end
  selectedmetrics = []
  allmetricsforintegration = $allmetrics[itemintegration]
  if items_to_include.count > 0 && $goodconnection
    items_to_include.each do |item_to_include|
      selectedmetrics = selectedmetrics + allmetricsforintegration.select {|metric| metric[:name].include?(item_to_include)}
    end
  else
    selectedmetrics = allmetricsforintegration
  end
  return formatmetrics(selectedmetrics)
end

def arraytoenglishlist(inputarray)
  outputstring = ""

  if inputarray.size == 1
    outputstring = inputarray[0]
  elsif inputarray.size == 2
    outputstring = "#{inputarray[0]} and #{inputarray[1]}"
  elsif inputarray.size > 2
    outputstring = "#{inputarray[0..-2].join(', ')}, and #{inputarray[-1]}"
  end

  return outputstring
end

def formatmetrics(selectedmetrics)
  platformmetrics = @item.attributes.has_key?(:platformmetrics)?@item[:platformmetrics]:{}
  metrictable = "<table class='table'>"
  if $goodconnection
    selectedmetrics.each do |metric|
      platformexceptions = ""
      if platformmetrics.has_key?(:"#{metric[:name]}")
        platformexceptions = " <i>**#{arraytoenglishlist(platformmetrics[:"#{metric[:name]}"])} only</i>"
      end

      metrictable += "<tr><td><strong>#{metric[:name]}</strong>#{platformexceptions}<br/>(#{metric[:type]}"
      if metric[:interval]>0
        metrictable += " every #{metric[:interval]} seconds"
      end

      metrictable += ")</td><td>#{metric[:description].gsub '^', ' to the '}"
      metrictable += metric[:unit].length>0 ? "<br/><em>shown as #{metric[:unit]}" : "<em>"
      metrictable += metric[:per_unit].length>0 ? "/#{metric[:per_unit]}</em>" : "</em>"
      metrictable += "</td></tr>"
    end
  else
    metrictable += "<tr><td>Metrics would go here if you didn't type rake slow</td></tr>"
  end
  metrictable += "</table>"

  return metrictable.force_encoding("utf-8")
end

def print_classic_library_table
  require 'yaml'

  table_markdown = "|Language|Library|Datadog-supported?|API|DogStatsD|Notes|\n|---\n"
  libraries = YAML.load_file('libraries.yml')
  libraries = libraries['Classic']
  libraries.each do |lang, libs|
    libs.each_with_index do |lib, i|
      first_col = i == 0 ? "**#{lang}**" : ''
      api = lib.has_key?('api') ? 'yes' : 'no'
      dogstatsd = lib.has_key?('dogstatsd') ? 'yes' : 'no'
      official = lib.has_key?('official') ? '**yes**' : 'no'
      authors = ''
      if lib.has_key?('authors')
        if lib['authors'].respond_to?(:join)
          authors = "Written by #{lib['authors'].join(', ')}"
        else
          authors = "Written by #{lib['authors']}"
        end
      end
      notes = lib.has_key?('notes') ? lib['notes'] : ''
      if notes != '' && !notes.end_with?('.')
        notes = "#{notes}."
      end
      last_col = "#{notes} #{authors}".strip!
      table_markdown += "|#{first_col}|[#{lib['name']}](#{lib['link']})|#{official}|#{api}|#{dogstatsd}|#{last_col}\n"
    end
    table_markdown += "|---\n"
  end

  table_markdown += "{:.table}"
  return table_markdown
end

def print_tracing_library_table
  require 'yaml'

  table_markdown = "|Language|Library|Datadog-supported?|Notes|\n|---\n"
  libraries = YAML.load_file('libraries.yml')
  libraries = libraries['Tracing']
  libraries.each do |lang, libs|
    libs.each_with_index do |lib, i|
      first_col = i == 0 ? "**#{lang}**" : ''
      official = lib.has_key?('official') ? '**yes**' : 'no'
      authors = ''
      if lib.has_key?('authors')
        if lib['authors'].respond_to?(:join)
          authors = "Written by #{lib['authors'].join(', ')}"
        else
          authors = "Written by #{lib['authors']}"
        end
      end
      notes = lib.has_key?('notes') ? lib['notes'] : ''
      if notes != '' && !notes.end_with?('.')
        notes = "#{notes}."
      end
      last_col = "#{notes} #{authors}".strip!
      table_markdown += "|#{first_col}|[#{lib['name']}](#{lib['link']})|#{official}|#{last_col}\n"
    end
    table_markdown += "|---\n"
  end

  table_markdown += "{:.table}"
  return table_markdown
end

def get_units_from_git
  require 'octokit'
  require 'base64'
  require 'csv'

  if ENV.has_key?('github_personal_token') && $goodconnection
    repo = 'datadog/dogweb'
    ref = ENV['branch'] || 'prod'
    itext = $client.contents(repo, :path => "integration/system/units_catalog.csv", :ref => ref).content
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
