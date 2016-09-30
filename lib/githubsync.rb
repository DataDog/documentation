def localfiles 
 {
  'git_metrics_storename' => 'localmetricsstore',
  'extras_repo' => 'integrations_extras',
  'core_repo' => 'integrations_core',
  'dogweb_repo' => 'dogweb'
}
end

def get_all_metrics_from_localgit
  require 'pp'
  require 'csv'

  $allmetrics = {}  
  docrepodir = Dir.pwd
  parentdir = File.expand_path('..', docrepodir)
  integrations_dir = "#{parentdir}/#{localfiles['dogweb_repo']}/integration/"
  all_integration_dirs = Dir.entries(integrations_dir).select{|entry| File.directory?("#{integrations_dir}/#{entry}") and !(entry == '.' || entry == '..')}
  pp "Getting all metrics from local git repos after a \'rake clean\'."
  all_integration_dirs.each do |intdir|
    intdirlist = Dir.entries("#{integrations_dir}/#{intdir}")
    metadata = intdirlist.grep(/metadata.csv/)    
    if !metadata.empty?
      metrics = []
      CSV.foreach("#{integrations_dir}/#{intdir}/#{metadata[0]}", {:headers => true, :converters => :all}) do |row|
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
      $allmetrics[intdir] = metrics
    end
  end

  serialize_localgit_metrics($allmetrics, localfiles['git_metrics_storename'])
  return $allmetrics
end

def serialize_localgit_metrics(items, filename)
  File.open(filename, 'a') do |f|
    Marshal.dump(items, f)
  end
end

def get_metrics_from_git(itemintegration=@item[:git_integration_title], items_to_include="")
  items_to_include = items_to_include.split(/\s*,\s*/)
  if $allmetrics == nil
    if File.exist?(localfiles['git_metrics_storename'])
      $allmetrics = Marshal.load(File.binread(localfiles['git_metrics_storename']))
    else
      $allmetrics = get_all_metrics_from_localgit()
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

def get_units_from_git
  require 'octokit'
  require 'base64'
  require 'csv'

  unit_string = ""
  units_by_family = Hash.new([])
  parentdir = File.expand_path('..', Dir.pwd)

  CSV.foreach("#{parentdir}/#{localfiles['dogweb_repo']}/integration/system/units_catalog.csv", {:headers => true, :converters => :all}) do |row|
    # row.each do |unit_id, family, name, plural, short_name, scale_factor|
    if units_by_family.has_key?(row['family'])
      units_by_family[row['family']].push(row['name'])
    else
      units_by_family[row['family']] = [row['name']]
    end

    units_by_family.keys.each do |family|
      unit_string += "<h2>#{family}</h2>"
      units_by_family[family].each do |unit_name|
        unit_string += "<ul>"
        unit_string += "<li>#{unit_name}</li>"
        unit_string += "</ul>"
      end
    end
    return unit_string
  end
return output
end
