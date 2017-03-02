require 'rake/clean'


CLEAN.include(%w(output tmp code_test tested.code github_metrics fileformaterrors))

CODE_SNIPPETS = 'code_snippets'
CODE_TEST = 'code_test'

desc 'Perform various checks'
task :checks do
  sh 'bundle exec nanoc check ilinks stale no_api_keys'
end

desc 'Perform local checks'
task :localchecks do
  sh 'bundle exec nanoc check ilinks stale no_api_keys integration_format'
end

desc 'Build documentation site'
task :compile do
  sh 'bundle exec nanoc compile'
end

task :view do
  sh 'bundle exec nanoc view'
end

desc 'Clean Compile and Check'
task predeploy: [:clean, :compile, :checks]

namespace :release do
  desc 'Build and release the site to prod (http://docs.datadoghq.com)'
  task prod: [:clean, :compile, :checks, :"deploy:prod"]

  desc 'Build and release the site to staging (http://docs-staging.datadoghq.com)'
  task staging: [:clean, :compile, :checks, :"deploy:staging"]
end

namespace :deploy do
  desc 'Deploy to prod S3 bucket; Should be used by `rake release:prod`'
  task :prod do
    sh('cd output && aws s3 sync --delete --size-only . s3://datadog-docs-prod --acl public-read')
  end

  desc 'Deploy to staging S3 bucket; Should be used by `rake release:staging`'
  task :staging do
    sh("cd output && aws s3 sync --delete --size-only . s3://datadog-docs-staging --acl public-read")
  end
end

desc 'test the code snippets'
task :test do
  require 'digest/md5'
  sh("rm -rf #{CODE_TEST}")
  sh("mkdir #{CODE_TEST}")
  filetype_to_command = {
    'sh' => 'sh',
    'py' => 'python',
    'rb' => 'ruby'
  }
  begin
    unless File.exist?('tested.code')
      File.open("tested.code", "w") {}
    end
    filetype_to_command.each do |t, cmd|
      puts '=' * 10
      puts "Testing #{t} code snippets"
      files = Dir.glob("#{CODE_SNIPPETS}/*.#{t}")
  sh("echo got here")
      files.each do |f|
        # sh("cp #{f} #{CODE_TEST}/")
        text = File.read(f)
        new_contents = text.gsub(/9775a026f1ca7d1c6c5af9d94d9595a4/, ENV['TEST_DD_API_KEY'])
        new_contents = new_contents.gsub(/87ce4a24b5553d2e482ea8a8500e71b8ad4554ff/, ENV['TEST_DD_APP_KEY'])
        if cmd == 'sh'
          new_contents << 'echo $?'
        end
        File.open("#{CODE_TEST}/#{File.basename(f)}", "w") {|file| file.puts new_contents}
      end
      testfiles = Dir.glob("#{CODE_TEST}/*.#{t}")
      testfiles.each do |f|
        unless f.include?('guides-')
          md5 = Digest::MD5.file(f).hexdigest
          if File.read('tested.code').include?("#{f} #{md5}\n")
            print "Already tested #{f}"
          else
            starttime = Time.now()
            sh("#{cmd} #{f}")
            totaltime = Time.now() - starttime
            print "\nExecution Time: #{totaltime}s\n"
            open('tested.code', 'a') do |file|
              file << "#{f} #{md5}\n"
            end
          end
          sh("rm #{f}")
        end
      end
    end
  rescue Exception => e
    sh("rm -rf #{CODE_TEST}")
    raise e
  end
  sh("rm -rf #{CODE_TEST}")
end

desc 'clean code samples'
task :cleancode do
  sh("rm output/api/index.html")
  sh("rm output/api/screenboards/index.html")
  sh 'bundle exec nanoc compile'
end

desc 'Run Guard on Docker environment'
task :dockerguard do
  sh 'bundle exec guard -i -G DockerGuardfile'
end

desc 'Run Guard, autobuilds/reloads site'
task :guard do
  puts 'Auto Compiling and Live Reloading.'
  puts 'Be Patient...the magic takes a few seconds to start'
  sh 'bundle exec guard'
end

desc 'This is a slow connection, dont collect remote stuff'
task :slow do
  ENV['NANOCRUNSLOW'] = "true"
  Rake::Task[:guard].invoke
end

desc 'Enabing Japanese lang-assitant on'
task :jp do
  ENV['JPASSIST'] = "true"
  Rake::Task[:guard].invoke
end

desc 'This is a slow connection, dont collect remote stuff with Japanese lang-assitant files'
task :slowjp do
  ENV['NANOCRUNSLOW'] = "true"
  ENV['JPASSIST'] = "true"
  Rake::Task[:guard].invoke
end

desc 'Build documentation site'
task :compilejp do
  ENV['JPASSIST'] = "true"
  Rake::Task[:compile].invoke
end

desc 'Removing Japanese lang-assitant files'
task :rmjpfiles do
  sh("rm -f updated_files.txt")
  sh("rm -f autogen_files.log")
end

desc 'Clean and remove Japanese lang-assitant files'
task cleanjp: [:clean, :rmjpfiles]

task default: :guard
